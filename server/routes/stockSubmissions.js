import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import StockSubmission from '../models/StockSubmission.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';

const router = express.Router();

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedExtensions = new Set(['.csv', '.xls', '.xlsx', '.json', '.xml', '.txt']);
const allowedFormats = new Set(['csv', 'xlsx', 'xls', 'json', 'xml', 'outro']);
const allowedVolumes = new Set(['1-10', '11-30', '31-80', '80+', 'nao_sei']);
const allowedStockOrigins = new Set(['excel', 'mystand', 'website', 'outro', 'nao_sei']);
const allowedUrgencies = new Set(['esta_semana', 'este_mes', 'sem_pressa']);
const allowedStates = new Set(['novo', 'em_analise', 'importado', 'rejeitado']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  fileFilter: (_req, file, cb) => {
    const lowerName = String(file.originalname || '').toLowerCase();
    const ext = lowerName.includes('.') ? lowerName.slice(lowerName.lastIndexOf('.')) : '';
    if (!allowedExtensions.has(ext)) {
      return cb(new Error('Envia um ficheiro CSV, Excel, XML ou JSON.'));
    }
    return cb(null, true);
  },
});

const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Recebemos muitos pedidos deste endereço. Tenta novamente mais tarde.' },
});

const cleanString = (value, max = 300) => String(value || '').trim().slice(0, max);
const normalizeEmail = (value) => cleanString(value, 180).toLowerCase();

const publicSubmission = (item) => ({
  id: item._id,
  empresa: item.empresa,
  nome: item.nome,
  email: item.email,
  telefone: item.telefone,
  website: item.website,
  mensagem: item.mensagem,
  volume: item.volume,
  origemStock: item.origemStock,
  urgencia: item.urgencia,
  formato: item.formato,
  estado: item.estado,
  notasAdmin: item.notasAdmin,
  ficheiro: {
    nomeOriginal: item.ficheiro?.nomeOriginal,
    mimeType: item.ficheiro?.mimeType,
    tamanho: item.ficheiro?.tamanho || 0,
  },
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  revistoEm: item.revistoEm,
});

router.post('/', submissionLimiter, upload.single('ficheiro'), async (req, res) => {
  try {
    const empresa = cleanString(req.body.empresa, 140);
    const nome = cleanString(req.body.nome, 120);
    const email = normalizeEmail(req.body.email);
    const telefone = cleanString(req.body.telefone, 40);
    const website = cleanString(req.body.website, 300);
    const mensagem = cleanString(req.body.mensagem, 1200);
    const volumeRaw = cleanString(req.body.volume, 20);
    const volume = allowedVolumes.has(volumeRaw) ? volumeRaw : 'nao_sei';
    const origemStockRaw = cleanString(req.body.origemStock, 30);
    const origemStock = allowedStockOrigins.has(origemStockRaw) ? origemStockRaw : 'nao_sei';
    const urgenciaRaw = cleanString(req.body.urgencia, 30);
    const urgencia = allowedUrgencies.has(urgenciaRaw) ? urgenciaRaw : 'este_mes';
    const formatoRaw = cleanString(req.body.formato, 20).toLowerCase();
    const formato = allowedFormats.has(formatoRaw) ? formatoRaw : 'outro';

    if (!empresa || !nome || !email) {
      return res.status(400).json({ erro: 'Indica empresa, nome e email para podermos responder.' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ erro: 'Indica um email válido.' });
    }
    if (!req.file?.buffer?.length) {
      return res.status(400).json({ erro: 'Anexa o ficheiro de stock.' });
    }

    const submission = await StockSubmission.create({
      empresa,
      nome,
      email,
      telefone,
      website,
      mensagem,
      volume,
      origemStock,
      urgencia,
      formato,
      ficheiro: {
        nomeOriginal: cleanString(req.file.originalname, 220),
        mimeType: cleanString(req.file.mimetype, 120),
        tamanho: req.file.size,
        conteudo: req.file.buffer,
      },
      origem: {
        ip: cleanString(req.ip || req.headers['x-forwarded-for'], 80),
        userAgent: cleanString(req.get('user-agent'), 300),
      },
    });

    res.status(201).json({ sucesso: true, pedido: publicSubmission(submission) });
  } catch (error) {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ erro: 'O ficheiro não pode ultrapassar 10 MB.' });
    }
    res.status(500).json({ erro: error.message || 'Erro ao receber o pedido de stock.' });
  }
});

router.get('/admin', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const estado = cleanString(req.query.estado, 30);
    const filtro = allowedStates.has(estado) ? { estado } : {};
    const pedidos = await StockSubmission.find(filtro)
      .select('-ficheiro.conteudo')
      .sort({ createdAt: -1 })
      .limit(80)
      .lean();

    res.json({ pedidos: pedidos.map(publicSubmission) });
  } catch {
    res.status(500).json({ erro: 'Erro ao listar pedidos de stock.' });
  }
});

router.get('/admin/:id/download', verificarToken, verificarAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ erro: 'Pedido inválido.' });
    }

    const pedido = await StockSubmission.findById(req.params.id).select('+ficheiro.conteudo').lean();
    if (!pedido?.ficheiro?.conteudo) return res.status(404).json({ erro: 'Ficheiro não encontrado.' });

    const fileName = encodeURIComponent(pedido.ficheiro.nomeOriginal || 'stock-noxvelia.csv');
    res.setHeader('Content-Type', pedido.ficheiro.mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"; filename*=UTF-8''${fileName}`);
    res.send(Buffer.from(pedido.ficheiro.conteudo.buffer || pedido.ficheiro.conteudo));
  } catch {
    res.status(500).json({ erro: 'Erro ao descarregar o ficheiro.' });
  }
});

router.patch('/admin/:id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ erro: 'Pedido inválido.' });
    }

    const estado = cleanString(req.body.estado, 30);
    if (estado && !allowedStates.has(estado)) {
      return res.status(400).json({ erro: 'Estado inválido.' });
    }

    const update = {
      notasAdmin: cleanString(req.body.notasAdmin, 1200),
      revistoPor: req.user.id,
      revistoEm: new Date(),
    };
    if (estado) update.estado = estado;

    const pedido = await StockSubmission.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true })
      .select('-ficheiro.conteudo')
      .lean();
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado.' });

    res.json({ pedido: publicSubmission(pedido) });
  } catch {
    res.status(500).json({ erro: 'Erro ao atualizar o pedido.' });
  }
});

export default router;
