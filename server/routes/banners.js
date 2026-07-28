import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import BannerPatrocinado from '../models/BannerPatrocinado.js';

const router = express.Router();

const metricLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

const clean = (value, max = 120) => String(value || '').trim().slice(0, max);

const publicBannerDto = (banner) => ({
  _id: banner._id,
  titulo: banner.titulo,
  imagemUrl: banner.imagemUrl,
  linkDestino: banner.linkDestino,
  posicao: banner.posicao,
  vertical: banner.vertical,
  ativoAte: banner.ativoAte,
});

const activeFilter = ({ posicao, vertical }) => {
  const now = new Date();
  const filter = {
    ativo: true,
    posicao,
    estado: { $in: ['manual', 'ativo'] },
    $or: [
      { ativoAte: null },
      { ativoAte: { $gt: now } },
    ],
  };

  if (['carro', 'imovel'].includes(vertical)) {
    filter.vertical = { $in: ['todos', vertical] };
  }

  return filter;
};

router.get('/ativo', async (req, res) => {
  try {
    const posicao = clean(req.query.posicao, 80);
    const vertical = clean(req.query.vertical, 20);
    if (!posicao) return res.status(400).json({ erro: 'Posição obrigatória.' });

    const banners = await BannerPatrocinado.find(activeFilter({ posicao, vertical }))
      .sort({ updatedAt: -1 })
      .limit(8)
      .lean();

    if (!banners.length) return res.json({ banner: null });

    const escolhido = banners[Math.floor(Math.random() * banners.length)];
    return res.json({ banner: publicBannerDto(escolhido) });
  } catch (error) {
    console.error('[BANNERS] Erro ao obter banner ativo:', error.message);
    return res.status(500).json({ erro: 'Erro ao obter publicidade.' });
  }
});

router.post('/:id/impressao', metricLimiter, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: 'Banner inválido.' });
    }

    await BannerPatrocinado.updateOne(
      { _id: req.params.id },
      { $inc: { visualizacoes: 1 } },
    );

    return res.json({ sucesso: true });
  } catch (error) {
    console.error('[BANNERS] Erro ao registar impressão:', error.message);
    return res.status(500).json({ erro: 'Erro ao registar visualização.' });
  }
});

router.post('/:id/clique', metricLimiter, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: 'Banner inválido.' });
    }

    await BannerPatrocinado.updateOne(
      { _id: req.params.id },
      { $inc: { cliques: 1 } },
    );

    return res.json({ sucesso: true });
  } catch (error) {
    console.error('[BANNERS] Erro ao registar clique:', error.message);
    return res.status(500).json({ erro: 'Erro ao registar clique.' });
  }
});

export default router;
