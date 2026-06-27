import express from 'express';
import { enviarMensagem, listarConversas, carregarChat } from '../controllers/mensagemController.js';
import { verificarToken } from '../middleware/auth.js'; // O teu middleware de proteção

const router = express.Router();

// Todas as rotas de chat exigem autenticação obrigatória (verificarToken)
router.post('/', verificarToken, enviarMensagem);
router.get('/conversas', verificarToken, listarConversas);
router.get('/conversa/:conversaId', verificarToken, carregarChat);

export default router;