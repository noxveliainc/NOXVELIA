import express from 'express';
import rateLimit from 'express-rate-limit';
import crypto from 'node:crypto';
import Anuncio from '../models/Anuncio.js';
import AnuncioView from '../models/AnuncioView.js';
import User from '../models/User.js';
import Alerta from '../models/Alerta.js';
import Notificacao from '../models/Notificacao.js';
import { verificarToken } from '../middleware/auth.js';
import { parsePagination } from '../utils/pagination.js';
import { analisarPreco, calcularQualidadeAnuncio } from '../utils/anuncioInsights.js';
import { normalizarCarro, normalizarEquipamento, normalizarImovel } from '../utils/anuncioNormalize.js';
import { attachImagesToOwnerByUrls, deleteImagesByOwner } from '../services/imageService.js';
import { buildPlanPayloadForUser, getFreeListingLimit, userHasProAccess } from '../config/plans.js';
import { MARCAS, getNomesModelosPorMarca, isOpcaoOutroVeiculo } from '../../client/src/data/marcasModelos.js';

const router = express.Router();
const obterLimiteAnunciosGratuitos = getFreeListingLimit;
const visitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Limite de visitas atingido temporariamente.' },
});
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Limite de contactos atingido temporariamente.' },
});

const normalizarFiltroTexto = (valor) => String(valor || '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace('electrico', 'eletrico');

const dividirFiltroTexto = (valor) => String(valor || '')
  .split(',')
  .map(normalizarFiltroTexto)
  .filter(Boolean);
const normalizarSessionIdVisita = (valor) => {
  const texto = String(valor || '').trim();
  return /^[A-Za-z0-9_-]{12,120}$/.test(texto) ? texto : '';
};
const CANAIS_CONTACTO_VALIDOS = ['phone_reveal', 'email_reveal', 'whatsapp_click'];
const normalizarCanalContacto = (valor) => {
  const canal = String(valor || '').trim().toLowerCase();
  const aliases = {
    contacto: 'phone_reveal',
    telefone: 'phone_reveal',
    phone: 'phone_reveal',
    revelar_telefone: 'phone_reveal',
    phone_reveal: 'phone_reveal',
    email: 'email_reveal',
    mail: 'email_reveal',
    revelar_email: 'email_reveal',
    email_reveal: 'email_reveal',
    whatsapp: 'whatsapp_click',
    whats_app: 'whatsapp_click',
    whatsapp_click: 'whatsapp_click',
  };
  return CANAIS_CONTACTO_VALIDOS.includes(aliases[canal]) ? aliases[canal] : 'phone_reveal';
};

const obterIpCliente = (req) => String(
  req.ip ||
  req.headers['cf-connecting-ip'] ||
  req.headers['x-real-ip'] ||
  String(req.headers['x-forwarded-for'] || '').split(',')[0] ||
  ''
).trim();

const criarChaveVisitante = (req) => {
  const sessionId = normalizarSessionIdVisita(req.body?.sessionId || req.get('x-noxvelia-session'));
  const userAgent = String(req.get('user-agent') || '').slice(0, 220);
  const ip = obterIpCliente(req).slice(0, 80);
  return crypto.createHash('sha256').update(`${sessionId}|${ip}|${userAgent}`).digest('hex');
};

const dividirTipoImovelFiltro = (valor) => {
  const tipos = dividirFiltroTexto(valor);
  return [...new Set(tipos.flatMap((tipo) => (
    tipo === 'loja' || tipo === 'comercial' ? ['loja', 'comercial'] : [tipo]
  )))];
};

const filtroBooleanoAtivo = (valor) => ['true', '1', 'sim', 'yes'].includes(normalizarFiltroTexto(valor));
const escapeRegex = (valor) => String(valor || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regexTextoExato = (valor) => new RegExp(`^${escapeRegex(String(valor || '').trim())}$`, 'i');
const adicionarCondicaoAnd = (query, condicao) => {
  query.$and = Array.isArray(query.$and) ? [...query.$and, condicao] : [condicao];
};
const MARCAS_CATALOGO_NORMALIZADAS = new Set(MARCAS.map(normalizarFiltroTexto));
const marcaCatalogoConhecida = (marca) => MARCAS_CATALOGO_NORMALIZADAS.has(normalizarFiltroTexto(marca));
const obterMarcaCatalogo = (marca) => MARCAS.find((item) => normalizarFiltroTexto(item) === normalizarFiltroTexto(marca));
const modeloCatalogoConhecido = (marca, modelo) => {
  const marcaCatalogo = obterMarcaCatalogo(marca);
  if (!marcaCatalogo || !modelo) return false;
  return getNomesModelosPorMarca(marcaCatalogo).some((item) => normalizarFiltroTexto(item) === normalizarFiltroTexto(modelo));
};
const condicoesCampoForaCatalogo = (campo, valores) => ({
  $nor: valores.map((valor) => ({ [campo]: regexTextoExato(valor) })),
});

const normalizarContactosAnuncio = ({ telefone, email }, { ehAdmin }) => {
  const telefoneLimpo = String(telefone || '').trim();
  const emailLimpo = String(email || '').trim().toLowerCase();

  if (ehAdmin) {
    if (!telefoneLimpo && !emailLimpo) {
      const erro = new Error('Indica pelo menos um contacto autorizado: telemóvel ou email.');
      erro.status = 400;
      throw erro;
    }
    return { telefone: telefoneLimpo, email: emailLimpo };
  }

  if (!telefoneLimpo || !emailLimpo) {
    const erro = new Error('Indica o telemóvel e o email de contacto.');
    erro.status = 400;
    throw erro;
  }

  return { telefone: telefoneLimpo, email: emailLimpo };
};

const aplicarIntervaloNumerico = (query, campo, { min, max }) => {
  const minimo = min !== undefined && min !== '' ? Number(min) : null;
  const maximo = max !== undefined && max !== '' ? Number(max) : null;
  const intervalo = {};

  if (Number.isFinite(minimo)) intervalo.$gte = minimo;
  if (Number.isFinite(maximo)) intervalo.$lte = maximo;
  if (Object.keys(intervalo).length) query[campo] = { ...(query[campo] || {}), ...intervalo };
};

const aplicarFiltrosPesquisa = async (query, filtros = {}) => {
  const {
    tipo, distrito, cidade, q, precoMin, precoMax,
    marca, modelo, combustivel, transmissao, tipoVeiculo,
    tipologia, tipoImovel, anoMin, anoMax, kmMax,
    potenciaMin, potenciaMax, garantia, aceitaRetoma,
    tipoAnunciante, areaMin, quartosMin, garagem,
  } = filtros;

  const tipoFiltro = tipo && tipo !== 'Todos' ? tipo : null;

  if (tipoFiltro) query.tipo = tipoFiltro;
  if (distrito && distrito !== 'Todos') query['localizacao.distrito'] = distrito;
  if (cidade) query['localizacao.cidade'] = cidade;
  aplicarIntervaloNumerico(query, 'preco', { min: precoMin, max: precoMax });
  if (q) query.$text = { $search: q };

  if (filtroBooleanoAtivo(garantia)) query.garantia = { $exists: true, $nin: [null, ''] };
  if (filtroBooleanoAtivo(aceitaRetoma)) query.aceitaRetoma = true;

  if (tipoAnunciante === 'profissional') {
    const profissionais = await User.find({
      tipo: { $ne: 'admin' },
      $or: [{ tipoConta: 'profissional' }, { premiumAtivo: true }],
    }).distinct('_id');
    query.utilizador = { $in: profissionais };
  }

  if (tipoAnunciante === 'particular') {
    const particulares = await User.find({
      tipo: { $ne: 'admin' },
      tipoConta: { $ne: 'profissional' },
      premiumAtivo: { $ne: true },
    }).distinct('_id');
    query.utilizador = { $in: particulares };
  }

  if (tipoFiltro === 'carro') {
    if (marca) {
      if (isOpcaoOutroVeiculo(marca)) {
        adicionarCondicaoAnd(query, condicoesCampoForaCatalogo('carro.marca', MARCAS));
      } else {
        query['carro.marca'] = marca;
      }
    }
    if (modelo) {
      if (isOpcaoOutroVeiculo(modelo)) {
        const marcaCatalogo = marca && !isOpcaoOutroVeiculo(marca) ? obterMarcaCatalogo(marca) : null;
        const modelosCatalogo = marcaCatalogo ? getNomesModelosPorMarca(marcaCatalogo) : [];
        if (modelosCatalogo.length) adicionarCondicaoAnd(query, condicoesCampoForaCatalogo('carro.modelo', modelosCatalogo));
      } else {
        query['carro.modelo'] = modelo;
      }
    }
    if (combustivel) query['carro.combustivel'] = { $in: dividirFiltroTexto(combustivel) };
    if (transmissao) query['carro.transmissao'] = { $in: dividirFiltroTexto(transmissao) };
    if (tipoVeiculo) query['carro.tipoVeiculo'] = { $in: dividirFiltroTexto(tipoVeiculo) };
    aplicarIntervaloNumerico(query, 'carro.ano', { min: anoMin, max: anoMax });
    aplicarIntervaloNumerico(query, 'carro.km', { max: kmMax });
    aplicarIntervaloNumerico(query, 'carro.potencia', { min: potenciaMin, max: potenciaMax });
  }

  if (tipoFiltro === 'imovel') {
    if (tipologia) query['imovel.tipologia'] = { $in: tipologia.split(',') };
    if (tipoImovel) query['imovel.tipoImovel'] = { $in: dividirTipoImovelFiltro(tipoImovel) };
    aplicarIntervaloNumerico(query, 'imovel.area', { min: areaMin });
    aplicarIntervaloNumerico(query, 'imovel.quartos', { min: quartosMin });
    if (filtroBooleanoAtivo(garagem)) query['imovel.garagem'] = true;
  }
};
const ESTADOS_PUBLICOS = ['ativo'];
const filtroPublico = () => ({ estado: { $in: ESTADOS_PUBLICOS } });

const compararTexto = (a, b) => normalizarFiltroTexto(a) === normalizarFiltroTexto(b);
const listaIncluiTexto = (lista, valor) => Array.isArray(lista)
  && lista.map(normalizarFiltroTexto).includes(normalizarFiltroTexto(valor));

const alertaCombinaComAnuncio = (alerta, anuncio) => {
  const filtros = alerta.filtros || {};
  const preco = Number(anuncio.preco || 0);

  if (alerta.tipo !== anuncio.tipo) return false;
  if (filtros.precoMin && preco < Number(filtros.precoMin)) return false;
  if (filtros.precoMax && preco > Number(filtros.precoMax)) return false;
  if (filtros.distrito && !compararTexto(filtros.distrito, anuncio.localizacao?.distrito)) return false;
  if (filtros.cidade && !compararTexto(filtros.cidade, anuncio.localizacao?.cidade)) return false;

  if (filtros.q) {
    const texto = normalizarFiltroTexto(`${anuncio.titulo || ''} ${anuncio.descricao || ''}`);
    if (!texto.includes(normalizarFiltroTexto(filtros.q))) return false;
  }

  if (anuncio.tipo === 'carro') {
    if (filtros.marca) {
      if (isOpcaoOutroVeiculo(filtros.marca)) {
        if (marcaCatalogoConhecida(anuncio.carro?.marca)) return false;
      } else if (!compararTexto(filtros.marca, anuncio.carro?.marca)) return false;
    }
    if (filtros.modelo) {
      if (isOpcaoOutroVeiculo(filtros.modelo)) {
        if (modeloCatalogoConhecido(anuncio.carro?.marca, anuncio.carro?.modelo)) return false;
      } else if (!compararTexto(filtros.modelo, anuncio.carro?.modelo)) return false;
    }
    if (filtros.kmMax && Number(anuncio.carro?.km || 0) > Number(filtros.kmMax)) return false;
    if (filtros.combustiveis?.length && !listaIncluiTexto(filtros.combustiveis, anuncio.carro?.combustivel)) return false;
    if (filtros.transmissao?.length && !listaIncluiTexto(filtros.transmissao, anuncio.carro?.transmissao)) return false;
  }

  if (anuncio.tipo === 'imovel') {
    const tipologias = filtros.tipologias?.length ? filtros.tipologias : [filtros.tipologia].filter(Boolean);
    const tiposImovel = filtros.tiposImovel?.length ? filtros.tiposImovel : [filtros.tipoImovel].filter(Boolean);
    if (tipologias.length && !listaIncluiTexto(tipologias, anuncio.imovel?.tipologia)) return false;
    if (tiposImovel.length && !listaIncluiTexto(tiposImovel, anuncio.imovel?.tipoImovel)) return false;
  }

  return true;
};

const notificarAlertasPesquisa = async (anuncio, ownerId) => {
  try {
    const alertas = await Alerta.find({
      ativo: true,
      tipo: anuncio.tipo,
      utilizador: { $ne: ownerId },
    }).lean();

    const compativeis = alertas
      .filter((alerta) => alertaCombinaComAnuncio(alerta, anuncio))
      .slice(0, 80);

    if (!compativeis.length) return;

    const link = anuncio.tipo === 'carro'
      ? `/carros?marca=${encodeURIComponent(anuncio.carro?.marca || '')}&modelo=${encodeURIComponent(anuncio.carro?.modelo || '')}`
      : `/imoveis?tipologia=${encodeURIComponent(anuncio.imovel?.tipologia || '')}&distrito=${encodeURIComponent(anuncio.localizacao?.distrito || '')}`;

    await Notificacao.insertMany(compativeis.map((alerta) => ({
      utilizador: alerta.utilizador,
      tipo: 'alerta_pesquisa',
      titulo: 'Novo anuncio no teu alerta',
      mensagem: `${anuncio.titulo || 'Novo anuncio'} corresponde ao alerta "${alerta.nome || 'Pesquisa guardada'}".`,
      link,
    })), { ordered: false });

    await Alerta.updateMany(
      { _id: { $in: compativeis.map((alerta) => alerta._id) } },
      { $set: { ultimoMatchEm: new Date() }, $inc: { totalMatches: 1 } }
    );
  } catch (erro) {
    console.warn('Falha ao processar alertas de pesquisa:', erro.message);
  }
};

// ─────────────────────────────────────────────────────────────
// HELPER: Geocoding no backend via Nominatim
// ─────────────────────────────────────────────────────────────
async function resolverCoordenadas(cidade, distrito) {
  try {
    const query = `${cidade}, ${distrito}, Portugal`;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      { headers: { 'User-Agent': 'NOXVELIA/1.0 (noxvelia.com)' } } // Nominatim exige User-Agent
    );
    const data = await res.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (e) {
    console.warn('⚠️  Geocoding falhou silenciosamente:', e.message);
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// 1. PESQUISA AVANÇADA
// ─────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { sort = 'relevancia', q } = req.query;
    const query = filtroPublico();

    await aplicarFiltrosPesquisa(query, req.query);

    let sortOption = { destacado: -1, createdAt: -1 };
    if (sort === 'recentes') sortOption = { createdAt: -1 };
    if (sort === 'preco_asc') sortOption = { preco: 1, createdAt: -1 };
    if (sort === 'preco_desc') sortOption = { preco: -1, createdAt: -1 };
    if (sort === 'ano_desc') sortOption = { 'carro.ano': -1, createdAt: -1 };
    if (sort === 'km_asc') sortOption = { 'carro.km': 1, createdAt: -1 };
    if (sort === 'qualidade_desc') sortOption = { scoreQualidade: -1, destacado: -1, createdAt: -1 };
    if (q && sort === 'relevancia') sortOption = { score: { $meta: 'textScore' } };

    const { page, limit, skip } = parsePagination(req.query);

    const anuncios = await Anuncio.find(query)
      .select('_id titulo preco fotos tipo estado destacado garantia aceitaRetoma utilizador scoreQualidade scoreDetalhes carro.marca carro.modelo carro.ano carro.km carro.combustivel carro.transmissao carro.cilindrada carro.potencia carro.tipoVeiculo imovel.tipoImovel imovel.tipologia imovel.area imovel.areaTerreno imovel.quartos imovel.casasBanho imovel.garagem localizacao.cidade localizacao.distrito createdAt')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate('utilizador', 'nome avatarUrl tipo tipoConta premiumAtivo verificado')
      .lean();

    const [totalAnuncios, resumoPrecoAgregado] = await Promise.all([
      Anuncio.countDocuments(query),
      Anuncio.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            media: { $avg: '$preco' },
            min: { $min: '$preco' },
            max: { $max: '$preco' },
            amostra: { $sum: 1 },
          }
        }
      ])
    ]);

    const resumoPreco = resumoPrecoAgregado?.[0] || null;
    const anunciosComInsights = anuncios.map((anuncio) => {
      const qualidade = anuncio.scoreQualidade > 0
        ? {}
        : calcularQualidadeAnuncio(anuncio);

      return {
        ...anuncio,
        ...qualidade,
        precoAnalise: analisarPreco(anuncio.preco, resumoPreco),
      };
    });

    res.json({
      anuncios: anunciosComInsights,
      totalAnuncios,
      resumoPreco,
      pagination: { page, limit, totalPages: Math.ceil(totalAnuncios / limit), hasNextPage: page * limit < totalAnuncios }
    });

  } catch (error) {
    res.status(500).json({ erro: 'Erro interno ao processar a pesquisa.' });
  }
});
// Anúncios reais com maior interesse nos últimos 7 dias para a landing page.
// Em caso de empate, privilegiamos o interesse acumulado, os favoritos e a recência.
router.get('/em-alta/semana', async (req, res) => {
  try {
    const inicio = new Date();
    inicio.setUTCDate(inicio.getUTCDate() - 6);
    const inicioStr = inicio.toISOString().slice(0, 10);

    const ranking = [
      {
        $addFields: {
          visitasSemana: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: { $ifNull: ['$historicoVisitas', []] },
                    as: 'visita',
                    cond: { $gte: ['$$visita.data', inicioStr] }
                  }
                },
                as: 'visita',
                in: { $ifNull: ['$$visita.quantidade', 0] }
              }
            }
          }
        }
      },
      { $sort: { visitasSemana: -1, visitas: -1, guardados: -1, createdAt: -1 } },
      { $limit: 2 }
    ];

    const [resultado] = await Anuncio.aggregate([
      { $match: { estado: { $in: ESTADOS_PUBLICOS }, tipo: { $in: ['carro', 'imovel'] } } },
      {
        $facet: {
          carro: [{ $match: { tipo: 'carro' } }, ...ranking],
          imovel: [{ $match: { tipo: 'imovel' } }, ...ranking]
        }
      }
    ]);

    const [carro, imovel] = await Promise.all([
      Anuncio.populate(resultado?.carro || [], {
        path: 'utilizador',
        select: 'nome avatarUrl tipo premiumAtivo'
      }),
      Anuncio.populate(resultado?.imovel || [], {
        path: 'utilizador',
        select: 'nome avatarUrl tipo premiumAtivo'
      })
    ]);

    res.json({ carro, imovel });
  } catch (error) {
    console.error('Erro ao carregar anúncios em alta:', error);
    res.status(500).json({ erro: 'Erro ao carregar os anúncios em alta.' });
  }
});

router.get('/resumo-publico', async (_req, res) => {
  try {
    const semana = new Date();
    semana.setUTCDate(semana.getUTCDate() - 7);

    const publico = filtroPublico();
    const [
      totalAnuncios,
      carros,
      imoveis,
      profissionaisAtivos,
      destaques,
      comGarantia,
      comRetoma,
      novos7d,
    ] = await Promise.all([
      Anuncio.countDocuments(publico),
      Anuncio.countDocuments({ ...publico, tipo: 'carro' }),
      Anuncio.countDocuments({ ...publico, tipo: 'imovel' }),
      Anuncio.aggregate([
        { $match: publico },
        { $group: { _id: '$utilizador' } },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'utilizador',
          },
        },
        { $unwind: '$utilizador' },
        {
          $match: {
            'utilizador.tipo': { $ne: 'admin' },
            $or: [
              { 'utilizador.tipoConta': 'profissional' },
              { 'utilizador.premiumAtivo': true },
            ],
          },
        },
        { $count: 'total' },
      ]),
      Anuncio.countDocuments({ ...publico, destacado: true }),
      Anuncio.countDocuments({ ...publico, garantia: { $exists: true, $nin: [null, ''] } }),
      Anuncio.countDocuments({ ...publico, aceitaRetoma: true }),
      Anuncio.countDocuments({ ...publico, createdAt: { $gte: semana } }),
    ]);

    res.json({
      totalAnuncios,
      carros,
      imoveis,
      profissionais: profissionaisAtivos[0]?.total || 0,
      destaques,
      comGarantia,
      comRetoma,
      novos7d,
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao carregar o resumo público.' });
  }
});
// ─────────────────────────────────────────────────────────────
// 2. MAPA DE RESULTADOS
// ─────────────────────────────────────────────────────────────
router.get('/pesquisa/mapa', async (req, res) => {
  try {
    const query = filtroPublico();
    await aplicarFiltrosPesquisa(query, req.query);

    const anuncios = await Anuncio.find(query)
      .select('_id titulo preco localizacao fotos tipo garantia aceitaRetoma carro.marca carro.modelo carro.ano imovel.tipologia imovel.tipoImovel')
      .slice('fotos', 1)
      .limit(700)
      .lean();

    res.json(anuncios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao carregar mapa.' });
  }
});
// ─────────────────────────────────────────────────────────────
// 3. FAVORITOS
// ─────────────────────────────────────────────────────────────
router.get('/favoritos', verificarToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.favoritos || user.favoritos.length === 0) return res.status(200).json([]);

    const anunciosFavoritos = await Anuncio.find({
      _id: { $in: user.favoritos },
      estado: 'ativo'
    }).populate('utilizador', 'nome avatarUrl tipo tipoConta premiumAtivo verificado').lean();

    res.json(anunciosFavoritos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao carregar favoritos.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 4.1 RESUMO DO LIMITE DE PUBLICAÇÃO
// ─────────────────────────────────────────────────────────────
router.get('/limite-publicacao', verificarToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('tipo tipoConta premiumAtivo limiteAnuncios');
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    const ilimitado = userHasProAccess(user);
    const ativos = await Anuncio.countDocuments({ utilizador: req.user.id, estado: 'ativo' });
    const limiteGratis = obterLimiteAnunciosGratuitos(user);
    const limite = ilimitado ? null : limiteGratis;
    const restantes = ilimitado ? null : Math.max(0, limite - ativos);

    res.json({
      ativos,
      limite,
      restantes,
      proximo: ilimitado ? null : Math.min(ativos + 1, limite),
      ilimitado,
      premiumAtivo: user.premiumAtivo === true,
      admin: user.tipo === 'admin',
      plano: buildPlanPayloadForUser(user),
    });
  } catch {
    res.status(500).json({ erro: 'Erro ao verificar limite de publicação.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 4. OBTER ANÚNCIO POR ID
// ─────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const anuncio = await Anuncio.findOne({
      _id: req.params.id,
      estado: { $ne: 'apagado' }
    }).populate('utilizador', 'nome email avatarUrl tipo tipoConta telefone mostrarTelefonePublico premiumAtivo verificado rating totalAvaliacoes createdAt').lean();

    if (!anuncio)
      return res.status(404).json({ erro: 'Anúncio removido.' });

    if (anuncio.utilizador?.tipo === 'admin') {
      delete anuncio.utilizador.email;
      delete anuncio.utilizador.telefone;
    } else if (anuncio.utilizador?.mostrarTelefonePublico === false) {
      delete anuncio.utilizador.telefone;
    }

    res.json(anuncio);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar o anúncio.' });
  }
});


// ─────────────────────────────────────────────────────────────
// 5. CHECK GUARDADO
// ─────────────────────────────────────────────────────────────
router.get('/:id/check-guardado', verificarToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ guardado: user.favoritos?.includes(req.params.id) || false });
  } catch (err) {
    res.status(500).json({ erro: 'Erro de verificação.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 6. CRIAR NOVO ANÚNCIO
//    Regras:
//    - Conta gratuita  → máx 5 anúncios ativos
//    - Conta PRO → ilimitado + destaque automático
//    - Admin → ilimitado + destaque opcional pelo painel
//
//    Segurança:
//    - O campo `destacado` enviado pelo body só é aceite para admin.
//      O servidor decide o valor com base no papel real do utilizador.
//    - Geocoding é resolvido aqui no backend; o frontend envia apenas
//      `cidade` e `distrito` (sem coordenadas).
// ─────────────────────────────────────────────────────────────
router.post('/', verificarToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    const ehAdmin   = user.tipo === 'admin';
    const ehPremium = userHasProAccess(user);
    const limiteGratis = obterLimiteAnunciosGratuitos(user);

    // ── Verificar limite para utilizadores FREE ──────────────
    if (!ehAdmin && !ehPremium) {
      const totalAtivos = await Anuncio.countDocuments({
        utilizador: req.user.id,
        estado: 'ativo'
      });

      if (totalAtivos >= limiteGratis) {
        return res.status(403).json({
          erro: 'LIMITE_ATINGIDO',
          mensagem: `Atingiste o limite de ${limiteGratis} anúncios ativos gratuitos. Adere ao PRO para publicares sem limite enquanto o plano estiver ativo.`
        });
      }
    }

    // ── Geocoding no backend ─────────────────────────────────
    // O frontend envia apenas cidade + distrito. As coordenadas
    // são resolvidas aqui para garantir consistência mesmo em
    // pedidos diretos via API (Postman, etc.).
    const { cidade, distrito } = req.body.localizacao || {};
    let coordenadas = undefined;
    if (cidade && distrito) {
      const coords = await resolverCoordenadas(cidade, distrito);
      if (coords) coordenadas = coords;
    }

    // ── Sanitização do body ──────────────────────────────────
    // Remover campos que só o servidor deve definir para
    // prevenir manipulação direta via API.
    const {
      destacado: _ignorado,
      dataExpiracaoDestaque: _ignore2,
      utilizador: _ignore3,
      visitas: _ignore4,
      guardados: _ignore5,
      estado: _ignore6,
      contactos: _ignore7,
      contactosPorCanal: _ignore7b,
      historicoVisitas: _ignore8,
      historicoContactos: _ignore8b,
      scoreQualidade: _ignore9,
      scoreDetalhes: _ignore10,
      scoreAnaliseAssistida: _ignore11,
      planoPublicacao: _ignore12,
      expiresAt: _ignore13,
      apagadoEm: _ignore14,
      vendidoEm: _ignore15,
      ...bodyLimpo
    } = req.body;

    const bodyNormalizado = {
      ...bodyLimpo,
      ...normalizarContactosAnuncio(bodyLimpo, { ehAdmin }),
      equipamento: normalizarEquipamento(bodyLimpo.equipamento),
      ...(bodyLimpo.tipo === 'imovel' ? { imovel: normalizarImovel(bodyLimpo.imovel) } : {}),
      ...(bodyLimpo.tipo === 'carro' ? { carro: normalizarCarro(bodyLimpo.carro, { obrigatorio: true }) } : {}),
    };

    // ── Construir o payload final ────────────────────────────
    const dadosAnuncio = {
      ...bodyNormalizado,
      garantia: req.body.garantia || null,
      aceitaRetoma: !!req.body.aceitaRetoma,
      utilizador: req.user.id,
      estado: 'ativo',
      localizacao: {
        cidade,
        distrito,
        ...(coordenadas ? { coordenadas } : {}),
      },
      // Destaque: PRO destaca automaticamente; admin escolhe no painel.
      ...((ehAdmin ? req.body.destacado === true : ehPremium)
        ? { destacado: true, dataExpiracaoDestaque: null }
        : { destacado: false }
      ),
    };

    Object.assign(dadosAnuncio, calcularQualidadeAnuncio(dadosAnuncio));

    const novoAnuncio = new Anuncio(dadosAnuncio);
    await novoAnuncio.save();
    await attachImagesToOwnerByUrls({ urls: novoAnuncio.fotos || [], ownerType: 'listing', ownerId: novoAnuncio._id });
    await notificarAlertasPesquisa(novoAnuncio.toObject(), user._id);
    res.status(201).json(novoAnuncio);

  } catch (err) {
    console.error('❌ Erro ao publicar anúncio:', err);
    res.status(err.status || 500).json({ erro: err.status ? err.message : 'Erro ao publicar o anúncio.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 7. ATUALIZAR ANÚNCIO
//    Nota: também protege o campo `destacado` contra alteração
//    direta pelo utilizador (apenas admin/PRO via lógica
//    interna pode promover anúncios).
// ─────────────────────────────────────────────────────────────
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const anuncio = await Anuncio.findById(req.params.id);
    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });
    const utilizadorAtual = await User.findById(req.user.id).select('tipo premiumAtivo');
    if (!utilizadorAtual) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    const ehAdmin = utilizadorAtual.tipo === 'admin' || req.user.tipo === 'admin';
    const ehDono = String(anuncio.utilizador) === req.user.id;
    if (!ehDono && !ehAdmin)
      return res.status(403).json({ erro: 'Acesso negado.' });

    if (anuncio.estado === 'ativo' && !ehAdmin && utilizadorAtual.premiumAtivo !== true) {
      return res.status(403).json({
        erro: 'EDICAO_ATIVA_PREMIUM',
        mensagem: 'Editar anúncios ativos é uma funcionalidade PRO. Podes marcar como vendido ou aderir ao PRO para atualizar dados publicados.'
      });
    }

    // Sanitizar campos protegidos
    const {
      destacado: _ig1,
      dataExpiracaoDestaque: _ig2,
      utilizador: _ig3,
      visitas: _ig4,
      guardados: _ig5,
      estado: _ig6,
      contactos: _ig7,
      contactosPorCanal: _ig7b,
      historicoVisitas: _ig8,
      historicoContactos: _ig8b,
      scoreQualidade: _ig9,
      scoreDetalhes: _ig10,
      scoreAnaliseAssistida: _ig11,
      planoPublicacao: _ig12,
      expiresAt: _ig13,
      apagadoEm: _ig14,
      vendidoEm: _ig15,
      ...bodyLimpo
    } = req.body;

    // Atualizar com os novos campos de confiança
    const tipoAtual = bodyLimpo.tipo || anuncio.tipo;
    const bodyNormalizado = { ...bodyLimpo };
    if (Object.prototype.hasOwnProperty.call(bodyLimpo, 'telefone') || Object.prototype.hasOwnProperty.call(bodyLimpo, 'email')) {
      Object.assign(bodyNormalizado, normalizarContactosAnuncio({
        telefone: Object.prototype.hasOwnProperty.call(bodyLimpo, 'telefone') ? bodyLimpo.telefone : anuncio.telefone,
        email: Object.prototype.hasOwnProperty.call(bodyLimpo, 'email') ? bodyLimpo.email : anuncio.email,
      }, { ehAdmin }));
    }
    if (Object.prototype.hasOwnProperty.call(bodyLimpo, 'equipamento')) {
      bodyNormalizado.equipamento = normalizarEquipamento(bodyLimpo.equipamento);
    }
    if (tipoAtual === 'imovel' && bodyLimpo.imovel) {
      bodyNormalizado.imovel = normalizarImovel(bodyLimpo.imovel);
    }
    if (tipoAtual === 'carro' && bodyLimpo.carro) {
      bodyNormalizado.carro = normalizarCarro(bodyLimpo.carro);
    }

    const camposAtualizados = {
      ...bodyNormalizado,
      garantia: req.body.garantia || null,
      aceitaRetoma: !!req.body.aceitaRetoma,
    };
    const qualidadeAtualizada = calcularQualidadeAnuncio({
      ...anuncio.toObject(),
      ...camposAtualizados,
    });

    const atualizado = await Anuncio.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...camposAtualizados,
          ...qualidadeAtualizada,
        }
      },
      { new: true, runValidators: true }
    );
    await attachImagesToOwnerByUrls({ urls: atualizado.fotos || [], ownerType: 'listing', ownerId: atualizado._id });
    res.json(atualizado);
  } catch (err) {
    res.status(err.status || 500).json({ erro: err.status ? err.message : 'Erro ao atualizar o anúncio.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 7.1 ALTERAR ESTADO DO ANÚNCIO
// ─────────────────────────────────────────────────────────────
router.patch('/:id/estado', verificarToken, async (req, res) => {
  try {
    const estado = String(req.body?.estado || '').trim();
    if (!['ativo', 'pausado', 'vendido'].includes(estado)) {
      return res.status(400).json({ erro: 'Estado inválido.' });
    }

    const anuncio = await Anuncio.findOne({ _id: req.params.id, estado: { $ne: 'apagado' } });
    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });

    const user = await User.findById(req.user.id).select('tipo premiumAtivo limiteAnuncios');
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    const ehAdmin = user.tipo === 'admin' || req.user.tipo === 'admin';
    const ehDono = String(anuncio.utilizador) === req.user.id;
    if (!ehDono && !ehAdmin) return res.status(403).json({ erro: 'Acesso negado.' });

    const temPro = userHasProAccess(user);
    if (estado !== 'vendido' && !temPro) {
      return res.status(403).json({
        erro: 'PRO_NECESSARIO',
        mensagem: 'Pausar e reativar anúncios faz parte do plano PRO. Podes marcar como vendido a qualquer momento.',
        plano: buildPlanPayloadForUser(user),
      });
    }

    anuncio.estado = estado;
    anuncio.vendidoEm = estado === 'vendido' ? new Date() : null;
    await anuncio.save();

    res.json({ anuncio });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao alterar estado do anúncio.' });
  }
});
// ─────────────────────────────────────────────────────────────
// 8. ELIMINAR ANÚNCIO
// ─────────────────────────────────────────────────────────────
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const anuncio = await Anuncio.findById(req.params.id);
    if (!anuncio) return res.status(404).json({ erro: 'Não encontrado.' });
    if (String(anuncio.utilizador) !== req.user.id && req.user.tipo !== 'admin')
      return res.status(403).json({ erro: 'Acesso negado.' });

    await deleteImagesByOwner({ ownerType: 'listing', ownerId: anuncio._id });
    await Anuncio.findByIdAndDelete(req.params.id);
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 9. GUARDAR / REMOVER DOS FAVORITOS
// ─────────────────────────────────────────────────────────────
router.post('/:id/guardar', verificarToken, async (req, res) => {
  try {
    const user  = await User.findById(req.user.id);
    const index = user.favoritos?.indexOf(req.params.id);
    let guardado = false;

    if (index === -1 || index === undefined) {
      if (!user.favoritos) user.favoritos = [];
      user.favoritos.push(req.params.id);
      await Anuncio.findByIdAndUpdate(req.params.id, { $inc: { guardados: 1 } });
      guardado = true;
    } else {
      user.favoritos.splice(index, 1);
      await Anuncio.findByIdAndUpdate(req.params.id, { $inc: { guardados: -1 } });
    }

    await user.save({ validateBeforeSave: false });
    res.json({ sucesso: true, guardado });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao processar favorito.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 9.1 REGISTAR CONTACTO DIRETO
// ─────────────────────────────────────────────────────────────
router.post('/:id/contacto', contactLimiter, async (req, res) => {
  try {
    const hoje = new Date().toISOString().slice(0, 10);
    const canal = normalizarCanalContacto(req.body?.canal);
    const incrementoCanal = {
      phone_reveal: canal === 'phone_reveal' ? 1 : 0,
      email_reveal: canal === 'email_reveal' ? 1 : 0,
      whatsapp_click: canal === 'whatsapp_click' ? 1 : 0,
    };

    const atualizado = await Anuncio.findOneAndUpdate(
      { _id: req.params.id, estado: { $ne: 'apagado' } },
      [
        {
          $set: {
            contactos: { $add: [{ $ifNull: ['$contactos', 0] }, 1] },
            [`contactosPorCanal.${canal}`]: { $add: [{ $ifNull: [`$contactosPorCanal.${canal}`, 0] }, 1] },
            historicoContactos: {
              $let: {
                vars: { historico: { $ifNull: ['$historicoContactos', []] } },
                in: {
                  $cond: [
                    { $in: [hoje, { $map: { input: '$$historico', as: 'contacto', in: '$$contacto.data' } }] },
                    {
                      $map: {
                        input: '$$historico',
                        as: 'contacto',
                        in: {
                          $cond: [
                            { $eq: ['$$contacto.data', hoje] },
                            {
                              $mergeObjects: [
                                '$$contacto',
                                {
                                  phone_reveal: { $add: [{ $ifNull: ['$$contacto.phone_reveal', 0] }, incrementoCanal.phone_reveal] },
                                  email_reveal: { $add: [{ $ifNull: ['$$contacto.email_reveal', 0] }, incrementoCanal.email_reveal] },
                                  whatsapp_click: { $add: [{ $ifNull: ['$$contacto.whatsapp_click', 0] }, incrementoCanal.whatsapp_click] },
                                  total: { $add: [{ $ifNull: ['$$contacto.total', 0] }, 1] },
                                }
                              ]
                            },
                            '$$contacto'
                          ]
                        }
                      }
                    },
                    {
                      $concatArrays: [
                        '$$historico',
                        [{
                          data: hoje,
                          phone_reveal: incrementoCanal.phone_reveal,
                          email_reveal: incrementoCanal.email_reveal,
                          whatsapp_click: incrementoCanal.whatsapp_click,
                          total: 1,
                        }]
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      ],
      { new: false }
    );

    if (!atualizado) return res.status(404).json({ erro: 'Anúncio removido.' });
    res.json({ success: true, canal, evento: canal });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao contabilizar contacto.' });
  }
});
// ─────────────────────────────────────────────────────────────
// 10. REGISTAR VISITA
// ─────────────────────────────────────────────────────────────
router.post('/:id/visita', visitLimiter, async (req, res) => {
  try {
    const hoje = new Date().toISOString().slice(0, 10);
    const visitorKey = criarChaveVisitante(req);

    try {
      await AnuncioView.create({ anuncio: req.params.id, visitorKey, dayKey: hoje });
    } catch (erro) {
      if (erro?.code === 11000) return res.json({ success: true, counted: false });
      throw erro;
    }

    const atualizado = await Anuncio.findOneAndUpdate(
      { _id: req.params.id, estado: { $ne: 'apagado' } },
      [
        {
          $set: {
            visitas: { $add: [{ $ifNull: ['$visitas', 0] }, 1] },
            historicoVisitas: {
              $let: {
                vars: { historico: { $ifNull: ['$historicoVisitas', []] } },
                in: {
                  $cond: [
                    { $in: [hoje, { $map: { input: '$$historico', as: 'visita', in: '$$visita.data' } }] },
                    {
                      $map: {
                        input: '$$historico',
                        as: 'visita',
                        in: {
                          $cond: [
                            { $eq: ['$$visita.data', hoje] },
                            { $mergeObjects: ['$$visita', { quantidade: { $add: [{ $ifNull: ['$$visita.quantidade', 0] }, 1] } }] },
                            '$$visita'
                          ]
                        }
                      }
                    },
                    { $concatArrays: ['$$historico', [{ data: hoje, quantidade: 1 }]] }
                  ]
                }
              }
            }
          }
        }
      ],
      { new: false }
    );
    if (!atualizado) {
      await AnuncioView.deleteOne({ anuncio: req.params.id, visitorKey, dayKey: hoje }).catch(() => {});
      return res.status(404).json({ erro: 'Anúncio removido.' });
    }
    res.json({ success: true, counted: true });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao contabilizar visita.' });
  }
});

export default router;
