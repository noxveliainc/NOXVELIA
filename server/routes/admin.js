import express from 'express';
import User from '../models/User.js';
import Anuncio from '../models/Anuncio.js';
import Pagamento from '../models/Pagamento.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';
import { criarNotificacao } from '../controllers/notificacaoController.js';

const router = express.Router();

router.use(verificarToken);
router.use(verificarAdmin);

// 1. MÉTRICAS GLOBAIS E RECEITA
router.get('/dashboard/stats', async (req, res) => {
  try {
    const agora = new Date();
    const haSeteDias = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
    const haTrintaDias = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      novosUsers7d,
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
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: haSeteDias } }),
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
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
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
      'alerta_sistema',
      `/anuncio/${anuncio._id}`,
      req.io
    );

    res.json({ sucesso: true, mensagem: 'Pedido de destaque rejeitado.', anuncio });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao rejeitar o destaque.' });
  }
});

export default router;
