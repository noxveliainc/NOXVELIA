import express from 'express';
import mongoose from 'mongoose';
import BannerPatrocinado, { BANNER_POSICOES } from '../models/BannerPatrocinado.js';

const router = express.Router();

const POSICOES_SET = new Set(BANNER_POSICOES);
const VERTICAIS_SET = new Set(['todos', 'carro', 'imovel']);

const clean = (value, max = 120) => String(value || '').trim().slice(0, max);

const isSafeUrl = (value, { allowRelative = false } = {}) => {
  const raw = clean(value, 1200);
  if (!raw) return false;
  if (allowRelative && raw.startsWith('/')) return true;
  try {
    const url = new URL(raw);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const parseDateOrNull = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const normalizePayload = (body = {}) => {
  const titulo = clean(body.titulo, 120);
  const imagemUrl = clean(body.imagemUrl, 1200);
  const linkDestino = clean(body.linkDestino, 1200);
  const posicao = clean(body.posicao, 80);
  const vertical = clean(body.vertical || 'todos', 20);
  const ativoAte = parseDateOrNull(body.ativoAte ?? body.ativoAté);

  if (!titulo) return { erro: 'Indica um título para a campanha.' };
  if (!isSafeUrl(imagemUrl, { allowRelative: true })) return { erro: 'Indica uma URL de imagem válida.' };
  if (!isSafeUrl(linkDestino)) return { erro: 'Indica um link de destino válido, começado por http:// ou https://.' };
  if (!POSICOES_SET.has(posicao)) return { erro: 'Escolhe uma posição válida.' };
  if (!VERTICAIS_SET.has(vertical)) return { erro: 'Escolhe uma vertical válida.' };
  if (ativoAte === undefined) return { erro: 'Data de fim inválida.' };

  return {
    data: {
      titulo,
      imagemUrl,
      linkDestino,
      posicao,
      vertical,
      ativo: body.ativo !== false,
      ativoAte,
    },
  };
};

router.get('/', async (req, res) => {
  try {
    const banners = await BannerPatrocinado.find()
      .sort({ ativo: -1, updatedAt: -1 })
      .lean();
    res.json({ banners, posicoes: BANNER_POSICOES });
  } catch (error) {
    console.error('[ADMIN BANNERS] Erro ao listar:', error.message);
    res.status(500).json({ erro: 'Erro ao listar banners patrocinados.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const normalized = normalizePayload(req.body);
    if (normalized.erro) return res.status(400).json({ erro: normalized.erro });

    const banner = await BannerPatrocinado.create({
      ...normalized.data,
      criadoPor: req.user.id,
    });

    res.status(201).json({ sucesso: true, banner });
  } catch (error) {
    console.error('[ADMIN BANNERS] Erro ao criar:', error.message);
    res.status(500).json({ erro: 'Erro ao criar banner patrocinado.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: 'Banner inválido.' });
    }

    const normalized = normalizePayload(req.body);
    if (normalized.erro) return res.status(400).json({ erro: normalized.erro });

    const banner = await BannerPatrocinado.findByIdAndUpdate(
      req.params.id,
      normalized.data,
      { new: true },
    );

    if (!banner) return res.status(404).json({ erro: 'Banner não encontrado.' });
    res.json({ sucesso: true, banner });
  } catch (error) {
    console.error('[ADMIN BANNERS] Erro ao atualizar:', error.message);
    res.status(500).json({ erro: 'Erro ao atualizar banner patrocinado.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: 'Banner inválido.' });
    }

    await BannerPatrocinado.findByIdAndDelete(req.params.id);
    res.json({ sucesso: true });
  } catch (error) {
    console.error('[ADMIN BANNERS] Erro ao apagar:', error.message);
    res.status(500).json({ erro: 'Erro ao apagar banner patrocinado.' });
  }
});

export default router;
