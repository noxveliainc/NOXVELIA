import express from 'express';
import mongoose from 'mongoose';
import Anuncio from '../models/Anuncio.js';
import User from '../models/User.js';
import { verificarToken } from '../middleware/auth.js';
import { buildPlanPayloadForUser, userHasProAccess } from '../config/plans.js';
import { calcularQualidadeAnuncio } from '../utils/anuncioInsights.js';
import { importarConteudoStockManual } from '../services/stockImportService.js';

const router = express.Router();

const ESTADOS_STOCK = ['ativo', 'pausado', 'vendido', 'pendente', 'expirado'];
const ESTADOS_GESTAO = ['ativo', 'pausado', 'vendido'];
const CANAIS_CONTACTO = ['phone_reveal', 'email_reveal', 'whatsapp_click'];
const MAX_STOCK_LIMIT = 200;
const SCORE_ALVO_PRO = 90;

const escapeRegex = (valor) => String(valor || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const parseInteiro = (valor, fallback) => {
  const valorNumerico = Number(valor);
  return Number.isFinite(valorNumerico) && valorNumerico > 0 ? Math.floor(valorNumerico) : fallback;
};
const numero = (valor) => (Number.isFinite(Number(valor)) ? Number(valor) : 0);
const arredondar = (valor) => Math.round(numero(valor));
const contarPalavras = (texto = '') => String(texto).trim().split(/\s+/).filter(Boolean).length;

const obterUtilizadorAtual = (req) => User.findById(req.user.id)
  .select('nome email telefone localidade tipo tipoConta premiumAtivo limiteAnuncios verificado rating totalAvaliacoes stripeCustomerId stripeSubscriptionId');

const exigirPlanoPro = (user, res) => {
  if (userHasProAccess(user)) return true;
  res.status(403).json({
    erro: 'PRO_NECESSARIO',
    mensagem: 'Esta funcionalidade faz parte do plano PRO.',
    plano: buildPlanPayloadForUser(user),
  });
  return false;
};

const criarConjuntoDias = (dias, offset = 0) => {
  const hoje = new Date();
  return new Set(Array.from({ length: dias }).map((_, index) => {
    const data = new Date(hoje);
    data.setUTCDate(hoje.getUTCDate() - (offset + index));
    return data.toISOString().slice(0, 10);
  }));
};

const compararPeriodo = (atual, anterior) => {
  const valorAtual = numero(atual);
  const valorAnterior = numero(anterior);
  if (valorAnterior <= 0) {
    return {
      atual: valorAtual,
      anterior: valorAnterior,
      percentagem: valorAtual > 0 ? null : 0,
      direcao: valorAtual > 0 ? 'up' : 'flat',
      semBase: valorAtual > 0,
    };
  }
  const percentagem = Math.round(((valorAtual - valorAnterior) / valorAnterior) * 100);
  return {
    atual: valorAtual,
    anterior: valorAnterior,
    percentagem,
    direcao: percentagem > 0 ? 'up' : percentagem < 0 ? 'down' : 'flat',
    semBase: false,
  };
};

const somarVisitasPeriodo = (anuncios, dias, offset = 0) => {
  const chaves = criarConjuntoDias(dias, offset);
  return anuncios.reduce((total, anuncio) => total + (anuncio.historicoVisitas || []).reduce((subtotal, visita) => (
    chaves.has(visita.data) ? subtotal + numero(visita.quantidade) : subtotal
  ), 0), 0);
};

const somarContactosPeriodo = (anuncios, dias, offset = 0) => {
  const chaves = criarConjuntoDias(dias, offset);
  return anuncios.reduce((acc, anuncio) => {
    (anuncio.historicoContactos || []).forEach((linha) => {
      if (!chaves.has(linha.data)) return;
      acc.phone_reveal += numero(linha.phone_reveal);
      acc.email_reveal += numero(linha.email_reveal);
      acc.whatsapp_click += numero(linha.whatsapp_click);
      acc.total += numero(linha.total) || CANAIS_CONTACTO.reduce((soma, canal) => soma + numero(linha[canal]), 0);
    });
    return acc;
  }, { total: 0, phone_reveal: 0, email_reveal: 0, whatsapp_click: 0 });
};

const somarContactosPorCanal = (anuncios) => anuncios.reduce((acc, anuncio) => {
  CANAIS_CONTACTO.forEach((canal) => { acc[canal] += numero(anuncio.contactosPorCanal?.[canal]); });
  acc.total += numero(anuncio.contactos);
  return acc;
}, { total: 0, phone_reveal: 0, email_reveal: 0, whatsapp_click: 0 });

const normalizarScore100 = (valor) => {
  const score = numero(valor);
  if (score <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round(score <= 10 ? score * 10 : score)));
};

const contarCamposTecnicos = (anuncio = {}) => {
  const campos = anuncio.tipo === 'carro'
    ? [anuncio.carro?.marca, anuncio.carro?.modelo, anuncio.carro?.ano, anuncio.carro?.km, anuncio.carro?.combustivel, anuncio.carro?.transmissao, anuncio.carro?.cilindrada, anuncio.carro?.potencia]
    : [anuncio.imovel?.tipoImovel, anuncio.imovel?.tipologia, anuncio.imovel?.area, anuncio.imovel?.quartos, anuncio.imovel?.casasBanho, anuncio.imovel?.certificadoEnergetico, anuncio.imovel?.garagem, anuncio.imovel?.anoConstrucao];
  return campos.filter((valor) => valor !== undefined && valor !== null && valor !== '').length;
};

const vendedorConfiavel = (vendedor = {}) => Boolean(
  vendedor?.verificado ||
  vendedor?.premiumAtivo ||
  vendedor?.tipoConta === 'profissional' ||
  vendedor?.tipo === 'profissional' ||
  vendedor?.tipo === 'admin'
);

const criarItemScore = ({ key, label, pontos, max, melhorar }) => {
  const normalizado = Math.max(0, Math.min(max, arredondar(pontos)));
  return {
    key,
    label,
    pontos: normalizado,
    max,
    ok: normalizado >= max,
    ganho: Math.max(0, max - normalizado),
    melhorar,
  };
};

const somarCategoria = (categoria) => ({
  ...categoria,
  pontos: categoria.itens.reduce((total, item) => total + item.pontos, 0),
  max: categoria.itens.reduce((total, item) => total + item.max, 0),
});

const construirQualityScore = (anuncio = {}, vendedor = {}) => {
  const calculado = Number(anuncio.scoreQualidade || 0) > 0 ? {} : calcularQualidadeAnuncio(anuncio);
  const scoreLegado = normalizarScore100(anuncio.scoreQualidade || calculado.scoreQualidade);
  const fotos = Array.isArray(anuncio.fotos) ? anuncio.fotos.filter(Boolean).length : 0;
  const palavras = contarPalavras(anuncio.descricao);
  const tituloLen = String(anuncio.titulo || '').trim().length;
  const tecnicos = contarCamposTecnicos(anuncio);
  const temLocalizacaoCompleta = Boolean(anuncio.localizacao?.cidade && anuncio.localizacao?.distrito);
  const temLocalizacaoParcial = Boolean(anuncio.localizacao?.cidade || anuncio.localizacao?.distrito);
  const temTelefone = Boolean(anuncio.telefone);
  const temEmail = Boolean(anuncio.email);
  const vendedorOk = vendedorConfiavel(vendedor || anuncio.utilizador);

  const categorias = [
    somarCategoria({
      key: 'conteudo',
      label: 'Conteúdo',
      itens: [
        criarItemScore({ key: 'titulo', label: 'Título', max: 8, pontos: tituloLen >= 22 ? 8 : tituloLen >= 12 ? 5 : tituloLen > 0 ? 2 : 0, melhorar: 'Torne o título mais específico e pesquisável.' }),
        criarItemScore({ key: 'descricao', label: 'Descrição', max: 16, pontos: palavras >= 80 ? 16 : palavras >= 35 ? 12 : palavras >= 12 ? 6 : 0, melhorar: 'Complete a descrição com estado, extras, condições e detalhes úteis.' }),
      ],
    }),
    somarCategoria({
      key: 'informacao',
      label: 'Informação',
      itens: [
        criarItemScore({ key: 'preco', label: 'Preço', max: 8, pontos: numero(anuncio.preco) > 0 ? 8 : 0, melhorar: 'Defina um preço claro.' }),
        criarItemScore({ key: 'localizacao', label: 'Localização', max: 8, pontos: temLocalizacaoCompleta ? 8 : temLocalizacaoParcial ? 4 : 0, melhorar: 'Complete cidade e distrito.' }),
        criarItemScore({ key: 'caracteristicas', label: 'Características', max: 14, pontos: Math.min(14, tecnicos * 2.5), melhorar: anuncio.tipo === 'carro' ? 'Complete marca, modelo, ano, km, combustível e transmissão.' : 'Complete tipologia, área, quartos e características principais.' }),
      ],
    }),
    somarCategoria({
      key: 'fotografias',
      label: 'Fotografias',
      itens: [
        criarItemScore({ key: 'quantidade', label: 'Quantidade', max: 16, pontos: fotos >= 8 ? 16 : fotos >= 5 ? 12 : fotos >= 2 ? 7 : fotos >= 1 ? 4 : 0, melhorar: 'Adicione mais fotografias.' }),
        criarItemScore({ key: 'qualidade', label: 'Qualidade', max: 10, pontos: fotos >= 6 ? 10 : fotos >= 3 ? 7 : fotos >= 1 ? 4 : 0, melhorar: 'Inclua fotografias claras de ângulos, detalhes e interiores/exteriores.' }),
      ],
    }),
    somarCategoria({
      key: 'conversao',
      label: 'Conversão',
      itens: [
        criarItemScore({ key: 'contacto', label: 'Contacto', max: 10, pontos: temTelefone && temEmail ? 10 : temTelefone || temEmail ? 7 : 0, melhorar: 'Adicione telefone e email de contacto.' }),
        criarItemScore({ key: 'vendedor', label: 'Vendedor', max: 10, pontos: vendedorOk ? 10 : 6, melhorar: 'Complete ou valide o perfil profissional do vendedor.' }),
      ],
    }),
  ];

  const scoreCategorias = categorias.reduce((total, categoria) => total + categoria.pontos, 0);
  const score = Math.max(scoreCategorias, Math.min(scoreLegado, 100));
  const oportunidades = categorias
    .flatMap((categoria) => categoria.itens.map((item) => ({ ...item, categoria: categoria.label })))
    .filter((item) => item.ganho > 0)
    .sort((a, b) => b.ganho - a.ganho);

  let acumulado = score;
  const acoesPara90 = [];
  oportunidades.forEach((item) => {
    if (acumulado >= SCORE_ALVO_PRO || acoesPara90.length >= 4) return;
    acoesPara90.push(item);
    acumulado += item.ganho;
  });

  const primeiraAcao = acoesPara90[0]?.melhorar || oportunidades[0]?.melhorar;
  return {
    score,
    alvo: SCORE_ALVO_PRO,
    faltamPara90: Math.max(0, SCORE_ALVO_PRO - score),
    estado: score >= 90 ? 'excelente' : score >= 75 ? 'forte' : score >= 60 ? 'medio' : 'fraco',
    categorias,
    itens: categorias.flatMap((categoria) => categoria.itens.map((item) => ({ ...item, categoria: categoria.label }))),
    para90: {
      alvo: SCORE_ALVO_PRO,
      faltam: Math.max(0, SCORE_ALVO_PRO - score),
      acoes: acoesPara90,
    },
    recomendacao: score >= SCORE_ALVO_PRO
      ? 'Anúncio preparado para competir no topo.'
      : primeiraAcao || 'Melhore este anúncio para aumentar a probabilidade de contacto.',
  };
};

const enriquecerAnuncioPro = (anuncio = {}, vendedor = {}) => {
  const qualidade = construirQualityScore(anuncio, vendedor);
  return {
    ...anuncio,
    contactosPorCanal: {
      phone_reveal: numero(anuncio.contactosPorCanal?.phone_reveal),
      email_reveal: numero(anuncio.contactosPorCanal?.email_reveal),
      whatsapp_click: numero(anuncio.contactosPorCanal?.whatsapp_click),
    },
    scoreQualidade100: qualidade.score,
    qualidade,
  };
};

const serializarResumo = (anuncios, vendedor) => {
  const totais = anuncios.reduce((acc, anuncio) => {
    acc.total += 1;
    acc[anuncio.estado] = (acc[anuncio.estado] || 0) + 1;
    acc[anuncio.tipo] = (acc[anuncio.tipo] || 0) + 1;
    acc.visitas += numero(anuncio.visitas);
    acc.guardados += numero(anuncio.guardados);
    acc.contactos += numero(anuncio.contactos);
    if (anuncio.destacado) acc.destacados += 1;
    const score = construirQualityScore(anuncio, vendedor).score;
    if (score > 0) {
      acc.somaQualidade += score;
      acc.comQualidade += 1;
    }
    return acc;
  }, {
    total: 0,
    ativo: 0,
    pausado: 0,
    vendido: 0,
    pendente: 0,
    expirado: 0,
    carro: 0,
    imovel: 0,
    destacados: 0,
    visitas: 0,
    guardados: 0,
    contactos: 0,
    somaQualidade: 0,
    comQualidade: 0,
  });

  return {
    total: totais.total,
    ativos: totais.ativo,
    pausados: totais.pausado,
    vendidos: totais.vendido,
    pendentes: totais.pendente,
    expirados: totais.expirado,
    carros: totais.carro,
    imoveis: totais.imovel,
    destacados: totais.destacados,
    visitas: totais.visitas,
    guardados: totais.guardados,
    contactos: totais.contactos,
    qualidadeMedia: totais.comQualidade ? Math.round(totais.somaQualidade / totais.comQualidade) : 0,
  };
};

const construirSerieSemanal = (anuncios) => {
  const hoje = new Date();
  const dias = Array.from({ length: 7 }).map((_, index) => {
    const data = new Date(hoje);
    data.setUTCDate(hoje.getUTCDate() - (6 - index));
    const key = data.toISOString().slice(0, 10);
    return {
      data: key,
      label: data.toLocaleDateString('pt-PT', { weekday: 'short' }),
      visitas: 0,
      contactos: 0,
    };
  });
  const mapa = new Map(dias.map((dia) => [dia.data, dia]));

  anuncios.forEach((anuncio) => {
    (anuncio.historicoVisitas || []).forEach((visita) => {
      const dia = mapa.get(visita.data);
      if (dia) dia.visitas += numero(visita.quantidade);
    });
    (anuncio.historicoContactos || []).forEach((contacto) => {
      const dia = mapa.get(contacto.data);
      if (dia) dia.contactos += numero(contacto.total);
    });
  });

  return dias;
};

const construirMetricas = (anuncios, resumo, vendedor = {}) => {
  const contactosTotais = somarContactosPorCanal(anuncios);
  const contactosHoje = somarContactosPeriodo(anuncios, 1);
  const contactosOntem = somarContactosPeriodo(anuncios, 1, 1);
  const contactos7Dias = somarContactosPeriodo(anuncios, 7);
  const contactos7DiasAnterior = somarContactosPeriodo(anuncios, 7, 7);
  const contactos30Dias = somarContactosPeriodo(anuncios, 30);
  const contactos30DiasAnterior = somarContactosPeriodo(anuncios, 30, 30);
  const visitasHoje = somarVisitasPeriodo(anuncios, 1);
  const visitasOntem = somarVisitasPeriodo(anuncios, 1, 1);
  const visitas7Dias = somarVisitasPeriodo(anuncios, 7);
  const visitas7DiasAnterior = somarVisitasPeriodo(anuncios, 7, 7);
  const visitas30Dias = somarVisitasPeriodo(anuncios, 30);
  const visitas30DiasAnterior = somarVisitasPeriodo(anuncios, 30, 30);
  const aMelhorar = anuncios.filter((anuncio) => construirQualityScore(anuncio, vendedor).score < SCORE_ALVO_PRO && anuncio.estado !== 'vendido').length;

  return {
    visitas: {
      hoje: visitasHoje,
      seteDias: visitas7Dias,
      trintaDias: visitas30Dias,
      total: resumo.visitas,
      comparacao: {
        hoje: compararPeriodo(visitasHoje, visitasOntem),
        seteDias: compararPeriodo(visitas7Dias, visitas7DiasAnterior),
        trintaDias: compararPeriodo(visitas30Dias, visitas30DiasAnterior),
      },
    },
    contactos: {
      hoje: contactosHoje.total,
      seteDias: contactos7Dias.total,
      trintaDias: contactos30Dias.total,
      total: resumo.contactos,
      telefone: contactosTotais.phone_reveal,
      email: contactosTotais.email_reveal,
      whatsapp: contactosTotais.whatsapp_click,
      canais: contactosTotais,
      canais30Dias: contactos30Dias,
      comparacao: {
        hoje: compararPeriodo(contactosHoje.total, contactosOntem.total),
        seteDias: compararPeriodo(contactos7Dias.total, contactos7DiasAnterior.total),
        trintaDias: compararPeriodo(contactos30Dias.total, contactos30DiasAnterior.total),
      },
      canaisComparacao: {
        phone_reveal: compararPeriodo(contactos30Dias.phone_reveal, contactos30DiasAnterior.phone_reveal),
        email_reveal: compararPeriodo(contactos30Dias.email_reveal, contactos30DiasAnterior.email_reveal),
        whatsapp_click: compararPeriodo(contactos30Dias.whatsapp_click, contactos30DiasAnterior.whatsapp_click),
      },
    },
    favoritos: {
      total: resumo.guardados,
      historicoDisponivel: false,
      comparacao: null,
    },
    stock: {
      ativos: resumo.ativos,
      pausados: resumo.pausados,
      vendidos: resumo.vendidos,
      aMelhorar,
    },
  };
};

const construirFunil = (metricas) => {
  const views = metricas.visitas.trintaDias || 0;
  const contactos = metricas.contactos.trintaDias || 0;
  const taxaContacto = views ? Math.round((contactos / views) * 1000) / 10 : 0;
  return {
    periodo: '30_dias',
    taxaContacto,
    etapas: [
      { key: 'visualizacao', label: 'Visualização', valor: views },
      { key: 'contact_reveal', label: 'Revelou contacto', valor: contactos },
      { key: 'phone_reveal', label: 'Telefone', valor: metricas.contactos.canais30Dias.phone_reveal },
      { key: 'email_reveal', label: 'Email', valor: metricas.contactos.canais30Dias.email_reveal },
      { key: 'whatsapp_click', label: 'WhatsApp', valor: metricas.contactos.canais30Dias.whatsapp_click },
      { key: 'contacto', label: 'Contacto', valor: contactos },
    ],
  };
};

const ordenarPorPerformance = (vendedor) => (a, b) => (
  (numero(b.contactos) * 6 + numero(b.visitas) + numero(b.guardados) * 2 + construirQualityScore(b, vendedor).score / 10)
  - (numero(a.contactos) * 6 + numero(a.visitas) + numero(a.guardados) * 2 + construirQualityScore(a, vendedor).score / 10)
);

const construirPerformance = (anuncios, vendedor) => ({
  topAnuncios: [...anuncios].sort(ordenarPorPerformance(vendedor)).slice(0, 5).map((anuncio) => enriquecerAnuncioPro(anuncio, vendedor)),
  topContactos: [...anuncios]
    .sort((a, b) => numero(b.contactos) - numero(a.contactos) || numero(b.visitas) - numero(a.visitas))
    .slice(0, 5)
    .map((anuncio) => enriquecerAnuncioPro(anuncio, vendedor)),
  topVisualizacoes: [...anuncios]
    .sort((a, b) => numero(b.visitas) - numero(a.visitas) || numero(b.contactos) - numero(a.contactos))
    .slice(0, 5)
    .map((anuncio) => enriquecerAnuncioPro(anuncio, vendedor)),
});

const construirQueryStock = (userId, filtros = {}) => {
  const query = { utilizador: userId, estado: { $ne: 'apagado' } };
  const estado = String(filtros.estado || '').trim();
  if (ESTADOS_STOCK.includes(estado)) query.estado = estado;
  const tipo = String(filtros.tipo || '').trim();
  if (['carro', 'imovel'].includes(tipo)) query.tipo = tipo;
  const q = String(filtros.q || '').trim();
  if (q) {
    const regex = new RegExp(escapeRegex(q), 'i');
    query.$or = [
      { titulo: regex },
      { descricao: regex },
      { 'carro.marca': regex },
      { 'carro.modelo': regex },
      { 'localizacao.cidade': regex },
      { 'localizacao.distrito': regex },
    ];
  }
  return query;
};

const sortStock = (sort = 'recentes') => {
  if (sort === 'preco_asc') return { preco: 1, createdAt: -1 };
  if (sort === 'preco_desc') return { preco: -1, createdAt: -1 };
  if (sort === 'visitas') return { visitas: -1, createdAt: -1 };
  if (sort === 'contactos') return { contactos: -1, createdAt: -1 };
  if (sort === 'qualidade') return { scoreQualidade: 1, createdAt: -1 };
  return { createdAt: -1 };
};

const selecionarCamposStock = '_id titulo descricao preco fotos tipo estado destacado visitas guardados contactos contactosPorCanal historicoContactos scoreQualidade scoreDetalhes createdAt updatedAt vendidoEm carro.marca carro.modelo carro.ano carro.km carro.combustivel carro.transmissao carro.cilindrada carro.potencia imovel.tipoImovel imovel.tipologia imovel.area imovel.areaTerreno imovel.quartos imovel.casasBanho imovel.garagem imovel.certificadoEnergetico localizacao.cidade localizacao.distrito garantia aceitaRetoma telefone email utilizador';

router.get('/dashboard', verificarToken, async (req, res) => {
  try {
    const user = await obterUtilizadorAtual(req);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    const anuncios = await Anuncio.find({ utilizador: req.user.id, estado: { $ne: 'apagado' } })
      .select(selecionarCamposStock + ' historicoVisitas')
      .sort({ createdAt: -1 })
      .lean();

    const vendedor = user.toObject ? user.toObject() : user;
    const resumo = serializarResumo(anuncios, vendedor);
    const metricas = construirMetricas(anuncios, resumo, vendedor);
    const performance = construirPerformance(anuncios, vendedor);
    const melhorar = anuncios
      .filter((anuncio) => construirQualityScore(anuncio, vendedor).score < SCORE_ALVO_PRO && anuncio.estado !== 'vendido')
      .sort((a, b) => construirQualityScore(a, vendedor).score - construirQualityScore(b, vendedor).score)
      .slice(0, 5)
      .map((anuncio) => enriquecerAnuncioPro(anuncio, vendedor));

    res.json({
      plano: buildPlanPayloadForUser(user),
      temPro: userHasProAccess(user),
      resumo,
      metricas,
      funil: construirFunil(metricas),
      performance,
      serieSemanal: construirSerieSemanal(anuncios),
      maisContactos: performance.topContactos,
      melhorar,
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao carregar painel PRO.' });
  }
});

router.get('/stock', verificarToken, async (req, res) => {
  try {
    const user = await obterUtilizadorAtual(req);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    if (!exigirPlanoPro(user, res)) return;

    const page = parseInteiro(req.query.page, 1);
    const limit = Math.min(parseInteiro(req.query.limit, 40), MAX_STOCK_LIMIT);
    const skip = (page - 1) * limit;
    const query = construirQueryStock(req.user.id, req.query);

    const [anuncios, total] = await Promise.all([
      Anuncio.find(query)
        .select(selecionarCamposStock)
        .populate('utilizador', 'nome avatarUrl tipo tipoConta premiumAtivo verificado rating totalAvaliacoes')
        .sort(sortStock(req.query.sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      Anuncio.countDocuments(query),
    ]);

    const vendedor = user.toObject ? user.toObject() : user;
    res.json({
      anuncios: anuncios.map((anuncio) => enriquecerAnuncioPro(anuncio, anuncio.utilizador || vendedor)),
      total,
      pagination: { page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page * limit < total },
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao carregar stock.' });
  }
});

router.patch('/stock/bulk', verificarToken, async (req, res) => {
  try {
    const user = await obterUtilizadorAtual(req);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    if (!exigirPlanoPro(user, res)) return;

    const ids = Array.isArray(req.body.ids) ? req.body.ids.filter((id) => mongoose.isValidObjectId(id)).slice(0, 100) : [];
    const estado = String(req.body.estado || '').trim();
    if (!ids.length) return res.status(400).json({ erro: 'Seleciona pelo menos um anúncio.' });
    if (!ESTADOS_GESTAO.includes(estado)) return res.status(400).json({ erro: 'Estado inválido.' });

    const set = { estado };
    if (estado === 'vendido') set.vendidoEm = new Date();
    else set.vendidoEm = null;

    const resultado = await Anuncio.updateMany(
      { _id: { $in: ids }, utilizador: req.user.id, estado: { $ne: 'apagado' } },
      { $set: set }
    );

    res.json({ sucesso: true, alterados: resultado.modifiedCount || 0 });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar stock.' });
  }
});

router.patch('/stock/:id/estado', verificarToken, async (req, res) => {
  try {
    const user = await obterUtilizadorAtual(req);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    if (!exigirPlanoPro(user, res)) return;

    const estado = String(req.body.estado || '').trim();
    if (!ESTADOS_GESTAO.includes(estado)) return res.status(400).json({ erro: 'Estado inválido.' });

    const anuncio = await Anuncio.findOne({ _id: req.params.id, utilizador: req.user.id, estado: { $ne: 'apagado' } });
    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });

    anuncio.estado = estado;
    anuncio.vendidoEm = estado === 'vendido' ? new Date() : null;
    await anuncio.save();

    res.json({ anuncio });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao alterar estado.' });
  }
});

router.post('/stock/:id/duplicar', verificarToken, async (req, res) => {
  try {
    const user = await obterUtilizadorAtual(req);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    if (!exigirPlanoPro(user, res)) return;

    const original = await Anuncio.findOne({ _id: req.params.id, utilizador: req.user.id, estado: { $ne: 'apagado' } }).lean();
    if (!original) return res.status(404).json({ erro: 'Anúncio não encontrado.' });

    const {
      _id, id, createdAt, updatedAt, visitas, guardados, contactos, contactosPorCanal, historicoVisitas, historicoContactos,
      origemImportacao, vendidoEm, apagadoEm, dataExpiracaoDestaque, ...resto
    } = original;
    void _id; void id; void createdAt; void updatedAt; void visitas; void guardados; void contactos; void contactosPorCanal;
    void historicoVisitas; void historicoContactos; void origemImportacao; void vendidoEm; void apagadoEm; void dataExpiracaoDestaque;

    const copia = {
      ...resto,
      titulo: `${original.titulo || 'Anúncio'} (cópia)`.slice(0, 180),
      utilizador: req.user.id,
      estado: 'pausado',
      destacado: false,
      dataExpiracaoDestaque: null,
      visitas: 0,
      guardados: 0,
      contactos: 0,
      contactosPorCanal: { phone_reveal: 0, email_reveal: 0, whatsapp_click: 0 },
      historicoVisitas: [],
      historicoContactos: [],
      origemImportacao: undefined,
      vendidoEm: null,
      apagadoEm: null,
      planoPublicacao: 'basico',
    };

    Object.assign(copia, calcularQualidadeAnuncio(copia));
    const novo = await Anuncio.create(copia);
    res.status(201).json({ anuncio: novo });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao duplicar anúncio.' });
  }
});

router.post('/importar-stock', verificarToken, async (req, res) => {
  try {
    const user = await obterUtilizadorAtual(req);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    if (!exigirPlanoPro(user, res)) return;

    const resultado = await importarConteudoStockManual({
      nome: String(req.body.nome || 'Importação PRO').trim(),
      utilizador: req.user.id,
      conteudo: String(req.body.conteudo || ''),
      formato: ['auto', 'json', 'xml', 'csv'].includes(req.body.formato) ? req.body.formato : 'auto',
      fileName: String(req.body.fileName || '').trim(),
      defaultDistrito: String(req.body.defaultDistrito || user.localidade || '').trim(),
      defaultCidade: String(req.body.defaultCidade || user.localidade || '').trim(),
      defaultTelefone: String(req.body.defaultTelefone || user.telefone || '').trim(),
      defaultEmail: String(req.body.defaultEmail || user.email || '').trim().toLowerCase(),
      criadoPor: req.user.id,
    });

    res.status(201).json(resultado);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.status ? error.message : (error.message || 'Erro ao importar stock.') });
  }
});

export default router;


