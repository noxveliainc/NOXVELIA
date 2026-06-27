import express from 'express';
import Notificacao from '../models/Notificacao.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Obter notificações do utilizador logado
router.get('/', verificarToken, async (req, res) => {
  try {
    const alertas = await Notificacao.find({ utilizador: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(alertas);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar central de alertas.' });
  }
});

// Marcar uma notificação específica como lida
router.put('/:id/ler', verificarToken, async (req, res) => {
  try {
    await Notificacao.findOneAndUpdate(
      { _id: req.params.id, utilizador: req.user.id },
      { lida: true }
    );
    res.json({ sucesso: true });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar alerta.' });
  }
});

// Marcar TODAS como lidas de uma vez só (Limpeza do Sino)
router.put('/ler-todas', verificarToken, async (req, res) => {
  try {
    await Notificacao.updateMany(
      { utilizador: req.user.id, lida: false },
      { lida: true }
    );
    res.json({ sucesso: true });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao limpar inbox de alertas.' });
  }
});

export default router;