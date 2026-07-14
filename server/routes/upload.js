import express from 'express';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import mongoose from 'mongoose';
import Anuncio from '../models/Anuncio.js';
import upload from '../middleware/upload.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';
import { IMAGE_UPLOAD_LIMITS, normalizeImageKind } from '../config/imageStorage.js';
import { deleteImageAsset, publicImageDto, uploadImageFile } from '../services/imageService.js';

const router = express.Router();

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadArray = upload.array('imagens', IMAGE_UPLOAD_LIMITS.maxFilesPerRequest);

const runUpload = (req, res, next) => {
  uploadArray(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      const message = error.code === 'LIMIT_FILE_SIZE'
        ? 'Imagem demasiado grande.'
        : 'Upload invalido. Usa JPEG, PNG ou WebP e respeita o limite de ficheiros.';
      return res.status(400).json({ sucesso: false, erro: message });
    }
    if (error) return next(error);
    return next();
  });
};

const parseOwnerId = (value) => (mongoose.Types.ObjectId.isValid(value) ? value : undefined);

const resolveUploadOwner = async ({ kind, body, userId }) => {
  if (kind === 'avatar' || kind === 'cover') {
    return { ownerType: 'user', ownerId: userId };
  }

  if (kind === 'listing') {
    const requestedOwnerId = parseOwnerId(body.ownerId);
    if (!requestedOwnerId) return { ownerType: 'temporary', ownerId: undefined };
    const anuncio = await Anuncio.findOne({ _id: requestedOwnerId, utilizador: userId }).select('_id').lean();
    if (!anuncio) throw Object.assign(new Error('Sem permissao para associar imagens a este anuncio.'), { status: 403 });
    return { ownerType: 'listing', ownerId: requestedOwnerId };
  }

  return { ownerType: 'temporary', ownerId: undefined };
};

router.post('/imagens', verificarToken, uploadLimiter, runUpload, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ sucesso: false, erro: 'Nenhuma imagem enviada.' });
    }
    if (req.files.length > IMAGE_UPLOAD_LIMITS.maxFilesPerRequest) {
      return res.status(400).json({ sucesso: false, erro: `Maximo de ${IMAGE_UPLOAD_LIMITS.maxFilesPerRequest} imagens por pedido.` });
    }

    const kind = normalizeImageKind(req.body.kind || 'listing');
    const { ownerType, ownerId } = await resolveUploadOwner({ kind, body: req.body, userId: req.user.id });
    const uploaded = [];

    for (const [index, file] of req.files.entries()) {
      const asset = await uploadImageFile({
        file,
        uploadedBy: req.user.id,
        kind,
        ownerType,
        ownerId,
        altText: req.body.altText || '',
        sortOrder: Number(req.body.sortOrder || index),
        isPrimary: String(req.body.isPrimary || '').toLowerCase() === 'true' || index === 0,
      });
      uploaded.push(publicImageDto(asset));
    }

    return res.json({
      sucesso: true,
      images: uploaded,
      urls: uploaded.map((image) => image.urls.large || image.url),
      url: uploaded[0]?.urls.large || uploaded[0]?.url || '',
    });
  } catch (error) {
    console.error('[IMAGES] Erro no upload:', error.message);
    return res.status(error.status || 500).json({ sucesso: false, erro: error.status ? error.message : 'Erro interno no upload.' });
  }
});

router.delete('/imagens/:id', verificarToken, async (req, res) => {
  try {
    const result = await deleteImageAsset({ assetId: req.params.id, userId: req.user.id, force: req.user.tipo === 'admin' });
    return res.json({ sucesso: true, ...result });
  } catch (error) {
    return res.status(error.status || 500).json({ sucesso: false, erro: error.status ? error.message : 'Erro ao eliminar imagem.' });
  }
});

router.delete('/admin/imagens/:id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const result = await deleteImageAsset({ assetId: req.params.id, userId: req.user.id, force: true });
    return res.json({ sucesso: true, ...result });
  } catch (error) {
    return res.status(error.status || 500).json({ sucesso: false, erro: 'Erro ao eliminar imagem.' });
  }
});

export default router;
