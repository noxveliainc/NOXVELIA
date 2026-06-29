import express from 'express';
import fetch from 'node-fetch'; // ← certifica-te que tens: npm install node-fetch
import Anuncio from '../models/Anuncio.js';
import User from '../models/User.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// HELPER: Geocoding no backend via Nominatim
// ─────────────────────────────────────────────────────────────
async function resolverCoordenadas(cidade, distrito) {
  try {
    const query = `${cidade}, ${distrito}, Portugal`;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      { headers: { 'User-Agent': 'NOXVELIA/1.0 (noxvelia.pt)' } } // Nominatim exige User-Agent
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
    const {
      page = 1, limit = 12, sort = 'relevancia', q,
      tipo, distrito, cidade, precoMax,
      marca, modelo, combustivel, transmissao, tipologia
    } = req.query;

    const query = { estado: { $ne: 'apagado' } };

    if (tipo && tipo !== 'Todos') query.tipo = tipo;
    if (distrito && distrito !== 'Todos') query['localizacao.distrito'] = distrito;
    if (cidade) query['localizacao.cidade'] = cidade;
    if (precoMax) query.preco = { $lte: Number(precoMax) };
    if (q) query.$text = { $search: q };

    if (tipo === 'carro') {
      if (marca) query['carro.marca'] = marca;
      if (modelo) query['carro.modelo'] = modelo;
      if (combustivel) query['carro.combustivel'] = { $in: combustivel.split(',') };
      if (transmissao) query['carro.transmissao'] = { $in: transmissao.split(',') };
    }

    if (tipo === 'imovel') {
      if (tipologia) query['imovel.tipologia'] = { $in: tipologia.split(',') };
    }

    let sortOption = { destacado: -1, createdAt: -1 };
    if (sort === 'preco_asc')  sortOption = { preco: 1 };
    if (sort === 'preco_desc') sortOption = { preco: -1 };
    if (q && sort === 'relevancia') sortOption = { score: { $meta: 'textScore' } };

    const skip = (Number(page) - 1) * Number(limit);

    const anuncios = await Anuncio.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('utilizador', 'nome avatarUrl tipo telefone premiumAtivo');

    const totalAnuncios = await Anuncio.countDocuments(query);
    res.json({ anuncios, totalAnuncios });

  } catch (error) {
    res.status(500).json({ erro: 'Erro interno ao processar a pesquisa.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 2. MAPA DE RESULTADOS
// ─────────────────────────────────────────────────────────────
router.get('/pesquisa/mapa', async (req, res) => {
  try {
    const { tipo, distrito, cidade, q } = req.query;
    const query = { estado: { $ne: 'apagado' } };
    if (tipo) query.tipo = tipo;
    if (distrito && distrito !== 'Todos') query['localizacao.distrito'] = distrito;
    if (cidade) query['localizacao.cidade'] = cidade;
    if (q) query.$text = { $search: q };

    const anuncios = await Anuncio.find(query).select('_id titulo preco localizacao fotos tipo');
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
      estado: { $ne: 'apagado' }
    }).populate('utilizador', 'nome avatarUrl');

    res.json(anunciosFavoritos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao carregar favoritos.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 4. OBTER ANÚNCIO POR ID
// ─────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const anuncio = await Anuncio.findById(req.params.id)
      .populate('utilizador', 'nome email avatarUrl tipo telefone premiumAtivo');
    if (!anuncio || anuncio.estado === 'apagado')
      return res.status(404).json({ erro: 'Anúncio removido.' });

    anuncio.visitas += 1;
    await anuncio.save({ validateBeforeSave: false });
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
//    - Utilizador FREE  → máx 10 anúncios ativos
//    - Utilizador PREMIUM → ilimitado + destacado: true automático
//    - Admin → ilimitado + destacado: true automático
//
//    Segurança:
//    - O campo `destacado` enviado pelo body é SEMPRE ignorado.
//      O servidor decide o valor com base no papel real do utilizador.
//    - Geocoding é resolvido aqui no backend; o frontend envia apenas
//      `cidade` e `distrito` (sem coordenadas).
// ─────────────────────────────────────────────────────────────
router.post('/', verificarToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    const ehAdmin   = user.tipo === 'admin';
    const ehPremium = user.premiumAtivo === true;

    // ── Verificar limite para utilizadores FREE ──────────────
    if (!ehAdmin && !ehPremium) {
      const totalAtivos = await Anuncio.countDocuments({
        utilizador: req.user.id,
        estado: { $ne: 'apagado' }
      });

      if (totalAtivos >= 10) {
        return res.status(403).json({
          erro: 'LIMITE_ATINGIDO',
          mensagem: 'Atingiste o limite de 10 anúncios gratuitos. Adere ao Plano Premium para publicares sem limites.'
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
    // prevenir manipulação via body (ex: {destacado: true}).
 // Dentro do router.post('/')
// ...
// ── Sanitização do body ──────────────────────────────────
    const {
      destacado: _ignorado,
      dataExpiracaoDestaque: _ignore2,
      utilizador: _ignore3,
      visitas: _ignore4,
      guardados: _ignore5,
      estado: _ignore6,
      ...bodyLimpo
    } = req.body;

    // ── Construir o payload final ────────────────────────────
    const dadosAnuncio = {
      ...bodyLimpo,
      garantia: req.body.garantia || null,
      aceitaRetoma: !!req.body.aceitaRetoma,
      utilizador: req.user.id,
      localizacao: {
        cidade,
        distrito,
        ...(coordenadas ? { coordenadas } : {}),
      },
      // AUTO-DESTAQUE: só o servidor decide
      ...(ehPremium || ehAdmin
        ? { destacado: true, dataExpiracaoDestaque: null }
        : { destacado: false }
      ),
    };

    const novoAnuncio = new Anuncio(dadosAnuncio);
    await novoAnuncio.save();
    res.status(201).json(novoAnuncio);

    const novoAnuncio = new Anuncio(dadosAnuncio);
    await novoAnuncio.save();
    res.status(201).json(novoAnuncio);

  } catch (err) {
    console.error('❌ Erro ao publicar anúncio:', err);
    res.status(500).json({ erro: 'Erro ao publicar o anúncio.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 7. ATUALIZAR ANÚNCIO
//    Nota: também protege o campo `destacado` contra alteração
//    direta pelo utilizador (apenas admin/premium via lógica
//    interna pode promover anúncios).
// ─────────────────────────────────────────────────────────────
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const anuncio = await Anuncio.findById(req.params.id);
    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });
    if (String(anuncio.utilizador) !== req.user.id && req.user.tipo !== 'admin')
      return res.status(403).json({ erro: 'Acesso negado.' });

    // Sanitizar campos protegidos
    const {
      destacado: _ig1,
      dataExpiracaoDestaque: _ig2,
      utilizador: _ig3,
      visitas: _ig4,
      guardados: _ig5,
      ...bodyLimpo
    } = req.body;

    // Atualizar com os novos campos de confiança
    const atualizado = await Anuncio.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          ...bodyLimpo, 
          garantia: req.body.garantia || null, 
          aceitaRetoma: !!req.body.aceitaRetoma 
        } 
      },
      { new: true, runValidators: true }
    );
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o anúncio.' });
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
// 10. REGISTAR VISITA
// ─────────────────────────────────────────────────────────────
router.post('/:id/visita', async (req, res) => {
  try {
    await Anuncio.findByIdAndUpdate(req.params.id, { $inc: { visitas: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao contabilizar visita.' });
  }
});

export default router;