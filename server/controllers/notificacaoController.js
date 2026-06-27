import Notificacao from '../models/Notificacao.js';

// Criar uma notificação (usado pelos outros controllers)
export const criarNotificacao = async (userId, titulo, mensagem, tipo, link = null, io = null) => {
  const notif = await Notificacao.create({ userId, titulo, mensagem, tipo, link });
  
  // Se o Socket.IO estiver ligado, enviamos em tempo real
  if (io) {
    io.to(String(userId)).emit('nova_notificacao', notif);
  }
  return notif;
};

// Ler todas as notificações do user
export const getNotificacoes = async (req, res) => {
  try {
    const notificacoes = await Notificacao.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notificacoes);
  } catch (err) { res.status(500).json({ erro: 'Erro ao buscar notificações' }); }
};

// Marcar como lida
export const marcarComoLida = async (req, res) => {
  try {
    await Notificacao.findByIdAndUpdate(req.params.id, { lida: true });
    res.json({ sucesso: true });
  } catch (err) { res.status(500).json({ erro: 'Erro ao atualizar' }); }
};