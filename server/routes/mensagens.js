import express from 'express';
import mongoose from 'mongoose';
import Mensagem from '../models/Mensagem.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// [NOVO] 1. CONTADOR GLOBAL DE MENSAGENS NÃO LIDAS (GET /api/mensagens/nao-lidas)
router.get('/nao-lidas', verificarToken, async (req, res) => {
  try {
    const userId = req.user.id;
    // Conta quantas mensagens têm o utilizador como destinatário e ainda não foram lidas
    const totalNaoLidas = await Mensagem.countDocuments({
      destinatario: userId,
      lida: false
    });
    return res.json({ totalNaoLidas });
  } catch (erro) {
    console.error('❌ Erro ao contar mensagens não lidas:', erro);
    return res.status(500).json({ erro: 'Erro ao contar notificações.' });
  }
});

// 2. LISTAR TODAS AS CONVERSAS COMPACTADAS (GET /api/mensagens/conversas)
router.get('/conversas', verificarToken, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const conversas = await Mensagem.aggregate([
      { $match: { $or: [{ remetente: userId }, { destinatario: userId }] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$conversa',
          ultimaMensagem: { $first: '$$ROOT' },
          // [NOVO] Conta quantas mensagens não lidas existem nesta conversa específica para este utilizador
          naoLidasDestaConversa: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$destinatario', userId] }, { $eq: ['$lida', false] }] },
                1,
                0
              ]
            }
          }
        }
      },
      { $lookup: { from: 'anuncios', localField: 'ultimaMensagem.anuncio', foreignField: '_id', as: 'anuncio' } },
      { $unwind: '$anuncio' },
      { $lookup: { from: 'users', localField: 'ultimaMensagem.remetente', foreignField: '_id', as: 'remetenteObj' } },
      { $lookup: { from: 'users', localField: 'ultimaMensagem.destinatario', foreignField: '_id', as: 'destinatarioObj' } },
      { $unwind: '$remetenteObj' },
      { $unwind: '$destinatarioObj' }
    ]);

    const resultadoFormatado = conversas.map(c => {
      const isMeRemetente = c.ultimaMensagem.remetente.toString() === req.user.id;
      const interlocutor = isMeRemetente ? c.destinatarioObj : c.remetenteObj;

      return {
        conversaId: c._id,
        anuncio: {
          _id: c.anuncio._id,
          titulo: c.anuncio.titulo,
          preco: c.anuncio.preco,
          fotos: c.anuncio.fotos
        },
        interlocutor: {
          _id: interlocutor._id,
          nome: interlocutor.nome,
          avatarUrl: interlocutor.avatarUrl
        },
        ultimaMensagemTexto: c.ultimaMensagem.texto,
        createdAt: c.ultimaMensagem.createdAt,
        naoLidas: c.naoLidasDestaConversa, // [NOVO] Enviado para colocar a bolinha na barra lateral
        foiLidaUltima: c.ultimaMensagem.lida,
        souODonoDaUltimaMsg: isMeRemetente
      };
    });

    return res.json(resultadoFormatado);
  } catch (erro) {
    console.error('❌ Erro ao compilar a caixa de conversas:', erro);
    return res.status(500).json({ erro: 'Erro ao carregar a lista de conversas.' });
  }
});

// 3. ENVIAR UMA MENSAGEM (POST /api/mensagens)
router.post('/', verificarToken, async (req, res) => {
  try {
    const { anuncioId, destinatarioId, texto } = req.body;
    const remetenteId = req.user.id;

    if (!anuncioId || !destinatarioId || !texto || !texto.trim()) {
      return res.status(400).json({ erro: 'Campos obrigatórios em falta.' });
    }

    const participantes = [remetenteId, destinatarioId].sort().join('_');
    const conversaId = `${participantes}_${anuncioId}`;

    const novaMensagem = new Mensagem({
      anuncio: anuncioId,
      remetente: remetenteId,
      destinatario: destinatarioId,
      conversa: conversaId,
      texto: texto.trim(),
      lida: false // Força explicitamente false ao criar
    });

    const mensagemGuardada = await novaMensagem.save();
    return res.status(201).json(mensagemGuardada);

  } catch (erro) {
    console.error('❌ Erro crítico ao guardar mensagem:', erro);
    return res.status(500).json({ erro: 'Erro interno ao processar a mensagem.' });
  }
});

// 4. LISTAR HISTÓRICO E MARCAR COMO LIDO (GET /api/mensagens/:conversaId)
router.get('/:conversaId', verificarToken, async (req, res) => {
  try {
    const { conversaId } = req.params;
    const userId = req.user.id;

    if (!conversaId.includes(userId)) {
      return res.status(403).json({ erro: 'Acesso negado a esta conversa.' });
    }

    // [NOVO] Assim que o utilizador abre a conversa, atualiza todas as mensagens recebidas nela para LIDA
    await Mensagem.updateMany(
      { conversa: conversaId, destinatario: userId, lida: false },
      { $set: { lida: true } }
    );

    const mensagens = await Mensagem.find({ conversa: conversaId })
      .sort({ createdAt: 1 })
      .populate('remetente', 'nome avatarUrl');

    return res.json(mensagens);
    
  } catch (erro) {
    console.error('❌ Erro ao carregar histórico:', erro);
    return res.status(500).json({ erro: 'Erro ao carregar conversa.' });
  }
});

export default router;