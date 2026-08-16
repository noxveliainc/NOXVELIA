import express from 'express';
import User from '../models/User.js';
import Anuncio from '../models/Anuncio.js';
import FunnelEvent from '../models/FunnelEvent.js';
import PartnershipReply from '../models/PartnershipReply.js';
import PartnershipContact from '../models/PartnershipContact.js';
import Pagamento from '../models/Pagamento.js';
import AdminFinance from '../models/AdminFinance.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';
import { criarNotificacao } from '../controllers/notificacaoController.js';
import adminPartnershipsRoutes from './adminPartnerships.js';
import adminBannersRoutes from './adminBanners.js';
import adminStockIntegrationsRoutes from './adminStockIntegrations.js';

const router = express.Router();

const FINANCE_KEY = 'principal';

const arredondarEuro = (valor) => Math.round(valor * 100) / 100;

const normalizarValorFinanceiro = (valor) => {
  const numero = Number(String(valor ?? 0).replace(',', '.'));
  if (!Number.isFinite(numero) || numero < 0 || numero > 999999999) return null;
  return arredondarEuro(numero);
};

const serializarFinanceiro = (doc) => {
  const gastoSite = arredondarEuro(Number(doc?.gastoSite || 0));
  const entradaSite = arredondarEuro(Number(doc?.entradaSite || 0));
  return {
    gastoSite,
    entradaSite,
    saldo: arredondarEuro(entradaSite - gastoSite),
    notas: doc?.notas || '',
    atualizadoEm: doc?.updatedAt || null,
    atualizadoPor: doc?.atualizadoPor || null,
  };
};

const obterFinanceiro = async () => {
  const existente = await AdminFinance.findOne({ chave: FINANCE_KEY }).lean();
  if (existente) return existente;
  return AdminFinance.create({ chave: FINANCE_KEY });
};
router.use(verificarToken);
router.use(verificarAdmin);
router.use('/partnerships', adminPartnershipsRoutes);
router.use('/banners', adminBannersRoutes);
router.use('/stock-integrations', adminStockIntegrationsRoutes);


router.get('/financeiro', async (req, res) => {
  try {
    const financeiro = await obterFinanceiro();
    res.json({ financeiro: serializarFinanceiro(financeiro) });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar balanço financeiro.' });
  }
});

router.put('/financeiro', async (req, res) => {
  try {
    const gastoSite = normalizarValorFinanceiro(req.body?.gastoSite);
    const entradaSite = normalizarValorFinanceiro(req.body?.entradaSite);
    const notas = String(req.body?.notas || '').trim().slice(0, 1000);

    if (gastoSite === null || entradaSite === null) {
      return res.status(400).json({ erro: 'Valores financeiros inválidos.' });
    }

    const financeiro = await AdminFinance.findOneAndUpdate(
      { chave: FINANCE_KEY },
      { gastoSite, entradaSite, notas, atualizadoPor: req.user.id },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    res.json({ sucesso: true, financeiro: serializarFinanceiro(financeiro) });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao guardar balanço financeiro.' });
  }
});
// 1. MÉTRICAS GLOBAIS E RECEITA
router.get('/dashboard/stats', async (req, res) => {
  try {
    const agora = new Date();
    const haSeteDias = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
    const haTrintaDias = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
    const filtroUtilizadoresReais = { tipo: { $ne: 'admin' } };

    const [
      totalUsers,
      novosUsers7d,
      contasAdmin,
      premiumAtivos,
      profissionais,
      totalAnuncios,
      anunciosAtivos,
      anunciosPendentes,
      anunciosPausados,
      carrosAtivos,
      imoveisAtivos,
      destacadosAtivos,
      visitasAgregadas,
      receitaAgregada,
      receita30DiasAgregada,
      pagamentosPendentes,
      topAnuncios
    ] = await Promise.all([
      User.countDocuments(filtroUtilizadoresReais),
      User.countDocuments({ ...filtroUtilizadoresReais, createdAt: { $gte: haSeteDias } }),
      User.countDocuments({ tipo: 'admin' }),
      User.countDocuments({ premiumAtivo: true, tipo: { $ne: 'admin' } }),
      User.countDocuments({ tipoConta: 'profissional', tipo: { $ne: 'admin' } }),
      Anuncio.countDocuments({ estado: { $ne: 'apagado' } }),
      Anuncio.countDocuments({ estado: 'ativo' }),
      Anuncio.countDocuments({ estado: 'pendente' }),
      Anuncio.countDocuments({ estado: 'pausado' }),
      Anuncio.countDocuments({ tipo: 'carro', estado: 'ativo' }),
      Anuncio.countDocuments({ tipo: 'imovel', estado: 'ativo' }),
      Anuncio.countDocuments({
        destacado: true,
        estado: 'ativo',
        $or: [
          { dataExpiracaoDestaque: { $gt: agora } },
          { dataExpiracaoDestaque: null }
        ]
      }),
      Anuncio.aggregate([
        { $match: { estado: { $ne: 'apagado' } } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$visitas', 0] } } } }
      ]),
      Pagamento.aggregate([
        { $match: { estado: 'pago' } },
        { $group: { _id: null, total: { $sum: '$valor' } } }
      ]),
      Pagamento.aggregate([
        { $match: { estado: 'pago', createdAt: { $gte: haTrintaDias } } },
        { $group: { _id: null, total: { $sum: '$valor' } } }
      ]),
      Pagamento.countDocuments({ estado: 'pendente' }),
      Anuncio.find({ estado: 'ativo' })
        .sort({ visitas: -1, guardados: -1, contactos: -1 })
        .limit(5)
        .select('titulo tipo visitas guardados contactos fotos utilizador')
        .populate('utilizador', 'nome')
        .lean()
    ]);

    res.json({
      totalUsers,
      novosUsers7d,
      contasAdmin,
      premiumAtivos,
      profissionais,
      totalAnuncios,
      anunciosAtivos,
      anunciosPendentes,
      anunciosPausados,
      carrosAtivos,
      imoveisAtivos,
      destacadosAtivos,
      totalVisitas: visitasAgregadas[0]?.total || 0,
      receitaTotal: (receitaAgregada[0]?.total || 0) / 100,
      receita30Dias: (receita30DiasAgregada[0]?.total || 0) / 100,
      pagamentosPendentes,
      topAnuncios
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao compilar métricas.' });
  }
});

// 2. LISTAR UTILIZADORES
router.get('/utilizadores', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    res.json(users.map((user) => {
      if (user.tipo !== 'admin') return user;
      return {
        ...user,
        email: '',
        telefone: '',
      };
    }));
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar utilizadores.' });
  }
});

// 3. BANIR UTILIZADOR
router.delete('/utilizadores/:id', async (req, res) => {
  try {
    if (req.params.id === req.user.id) return res.status(400).json({ erro: 'Não podes banir a ti próprio!' });
    await User.findByIdAndDelete(req.params.id);
    res.json({ sucesso: true, mensagem: 'Utilizador banido.' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao eliminar utilizador.' });
  }
});

// 4. GESTÃO ANÚNCIOS (LISTAR E ELIMINAR)
router.get('/anuncios', async (req, res) => {
  try {
    const anuncios = await Anuncio.find().sort({ createdAt: -1 }).populate('utilizador', 'nome email');
    res.json(anuncios);
  } catch (err) { res.status(500).json({ erro: 'Erro ao listar anúncios.' }); }
});

router.delete('/anuncios/:id', async (req, res) => {
  try {
    await Anuncio.findByIdAndDelete(req.params.id);
    res.json({ sucesso: true, mensagem: 'Anúncio eliminado.' });
  } catch (err) { res.status(500).json({ erro: 'Erro ao eliminar anúncio.' }); }
});

router.get('/dashboard/funnel', async (req, res) => {
  try {
    const requestedDays = Number.parseInt(req.query.days, 10);
    const days = [7, 30, 90].includes(requestedDays) ? requestedDays : 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [
      eventRows,
      dailyRows,
      dailyVisitorsRows,
      periodVisitorsRows,
      professionalReplyCount,
      professionalReplyPeopleRows,
      professionalContacts,
    ] = await Promise.all([
      FunnelEvent.aggregate([
        { $match: { occurredAt: { $gte: since } } },
        { $group: { _id: '$event', total: { $sum: 1 }, sessions: { $addToSet: '$sessionId' } } },
        { $project: { _id: 1, total: 1, sessoes: { $size: '$sessions' } } },
      ]),
      FunnelEvent.aggregate([
        { $match: { occurredAt: { $gte: since } } },
        { $group: { _id: { day: '$dayKey', event: '$event' }, total: { $sum: 1 }, sessions: { $addToSet: '$sessionId' } } },
        { $project: { _id: 0, day: '$_id.day', event: '$_id.event', total: 1, sessoes: { $size: '$sessions' } } },
        { $sort: { day: 1 } },
      ]),
      FunnelEvent.aggregate([
        { $match: { occurredAt: { $gte: since }, sessionId: { $type: 'string', $ne: '' } } },
        { $group: { _id: '$dayKey', sessions: { $addToSet: '$sessionId' }, eventos: { $sum: 1 } } },
        { $project: { _id: 0, day: '$_id', visitantes: { $size: '$sessions' }, eventos: 1 } },
        { $sort: { day: 1 } },
      ]),
      FunnelEvent.aggregate([
        { $match: { occurredAt: { $gte: since }, sessionId: { $type: 'string', $ne: '' } } },
        { $group: { _id: null, sessions: { $addToSet: '$sessionId' } } },
        { $project: { _id: 0, visitantes: { $size: '$sessions' } } },
      ]),
      PartnershipReply.countDocuments({ receivedAt: { $gte: since } }),
      PartnershipReply.aggregate([
        { $match: { receivedAt: { $gte: since }, fromEmail: { $nin: ['', null] } } },
        { $group: { _id: '$fromEmail' } },
        { $count: 'total' },
      ]),
      PartnershipContact.countDocuments({
        estado: { $in: ['contactado', 'respondeu', 'interessado', 'convertido'] },
        ultimoContactoEm: { $gte: since },
      }),
    ]);

    const byEvent = Object.fromEntries(eventRows.map((row) => [row._id, {
      total: row.total || 0,
      sessoes: row.sessoes || 0,
    }]));
    const metric = (event) => byEvent[event] || { total: 0, sessoes: 0 };

    const dailyMap = dailyRows.reduce((acc, row) => {
      if (!acc[row.day]) acc[row.day] = { data: row.day };
      acc[row.day][row.event] = { total: row.total || 0, sessoes: row.sessoes || 0 };
      return acc;
    }, {});

    dailyVisitorsRows.forEach((row) => {
      if (!dailyMap[row.day]) dailyMap[row.day] = { data: row.day };
      dailyMap[row.day].visitantesReais = row.visitantes || 0;
      dailyMap[row.day].eventosTotais = row.eventos || 0;
    });

    const daily = Object.values(dailyMap).sort((a, b) => String(a.data).localeCompare(String(b.data)));
    const visitantesPorDia = Object.fromEntries(dailyVisitorsRows.map((row) => [row.day, row.visitantes || 0]));
    const hojeKey = new Date().toISOString().slice(0, 10);
    const ontemKey = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const somaVisitantesDiarios = dailyVisitorsRows.reduce((total, row) => total + (row.visitantes || 0), 0);
    const mediaDiaria = Number((somaVisitantesDiarios / Math.max(dailyVisitorsRows.length || days, 1)).toFixed(1));

    const entradas = metric('landing_view').sessoes;
    const pesquisas = metric('search_start').sessoes;
    const anunciosAbertos = metric('listing_view').sessoes;
    const publicacoesIniciadas = metric('publish_start').sessoes;
    const publicacoesConcluidas = metric('publish_complete').sessoes;
    const percentagem = (value, base) => base > 0 ? Number(((value / base) * 100).toFixed(1)) : 0;

    res.json({
      periodo: { dias: days, desde: since.toISOString() },
      visitasReais: {
        hoje: visitantesPorDia[hojeKey] || 0,
        ontem: visitantesPorDia[ontemKey] || 0,
        periodo: periodVisitorsRows[0]?.visitantes || 0,
        somaDiaria: somaVisitantesDiarios,
        mediaDiaria,
        diario: dailyVisitorsRows,
        explicacao: 'Sessões anónimas únicas por dia. Refreshes e múltiplas ações da mesma sessão no mesmo dia contam uma vez.',
      },
      metricas: {
        entradas: metric('landing_view'),
        pesquisas: metric('search_start'),
        anunciosAbertos: metric('listing_view'),
        cliquesWhatsapp: metric('whatsapp_click'),
        publicacoesIniciadas: metric('publish_start'),
        publicacoesConcluidas: metric('publish_complete'),
        respostasProfissionais: { total: professionalReplyCount, sessoes: professionalReplyPeopleRows[0]?.total || 0 },
        profissionaisContactados: { total: professionalContacts, sessoes: professionalContacts },
      },
      conversoes: {
        entradaParaPesquisa: percentagem(pesquisas, entradas),
        pesquisaParaAnuncio: percentagem(anunciosAbertos, pesquisas),
        anuncioParaWhatsapp: percentagem(metric('whatsapp_click').sessoes, anunciosAbertos),
        inicioParaConclusao: percentagem(publicacoesConcluidas, publicacoesIniciadas),
      },
      diario: daily,
    });
  } catch (erro) {
    console.error('[ADMIN FUNNEL] Erro ao compilar funil:', erro);
    res.status(500).json({ erro: 'Erro ao compilar o funil.' });
  }
});
router.put('/anuncios/:id/estado', async (req, res) => {
  try {
    const estadosPermitidos = ['ativo', 'pendente', 'pausado', 'expirado'];
    const { estado } = req.body || {};

    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ erro: 'Estado de anúncio inválido.' });
    }

    const anuncio = await Anuncio.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    ).populate('utilizador', 'nome email');

    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });

    res.json({ sucesso: true, mensagem: `Anúncio marcado como ${estado}.`, anuncio });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o estado do anúncio.' });
  }
});

// 5. LISTAR PEDIDOS DE DESTAQUE
router.get('/destaques/pedidos', async (req, res) => {
  try {
    const pedidos = await Anuncio.find({ 'pedidoDestaque.ativo': true })
      .sort({ 'pedidoDestaque.dataPedido': 1 })
      .populate('utilizador', 'nome email');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar pedidos de destaque.' });
  }
});

// 6. APROVAR DESTAQUE (Com Notificação Transacional)
router.put('/anuncios/:id/aprovar-destaque', async (req, res) => {
  try {
    const seteDiasNoFuturo = new Date();
    seteDiasNoFuturo.setDate(seteDiasNoFuturo.getDate() + 7);

    const anuncio = await Anuncio.findByIdAndUpdate(
      req.params.id,
      {
        destacado: true,
        dataExpiracaoDestaque: seteDiasNoFuturo,
        'pedidoDestaque.ativo': false 
      },
      { new: true }
    ).populate('utilizador', '_id nome');

    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });

    // Enviar notificação transacional
    await criarNotificacao(
      anuncio.utilizador._id,
      "Destaque Aprovado! 👑",
      `O teu anúncio "${anuncio.titulo}" já está em destaque e terá mais visibilidade por 7 dias.`,
      'destaque_aprovado',
      `/anuncio/${anuncio._id}`,
      req.io
    );

    res.json({ sucesso: true, mensagem: 'Destaque ativado.', anuncio });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao aprovar o destaque.' });
  }
});

// 7. REJEITAR DESTAQUE (Com Notificação de Performance)
router.put('/anuncios/:id/rejeitar-destaque', async (req, res) => {
  try {
    const anuncio = await Anuncio.findByIdAndUpdate(
      req.params.id,
      { 'pedidoDestaque.ativo': false },
      { new: true }
    ).populate('utilizador', '_id nome');

    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });

    // Notificar que o pedido foi revisto e rejeitado
    await criarNotificacao(
      anuncio.utilizador._id,
      "Pedido de Destaque Revisto",
      `O teu pedido de destaque para "${anuncio.titulo}" não foi aprovado. Contacta o suporte para mais info.`,
      'sistema',
      `/anuncio/${anuncio._id}`,
      req.io
    );

    res.json({ sucesso: true, mensagem: 'Pedido de destaque rejeitado.', anuncio });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao rejeitar o destaque.' });
  }
});

export default router;
