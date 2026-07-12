import express from 'express';
import mongoose from 'mongoose';
import Anuncio from '../models/Anuncio.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';
import { metricsSnapshot } from '../middleware/metrics.js';
import { anuncioPath } from '../utils/seo.js';

const router = express.Router();
const SITE_URL = process.env.CLIENT_URL || 'https://www.noxvelia.com';
const xmlEscape = (value) => String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]));

router.get('/health', async (_req, res) => {
  let database = 'down';
  try {
    if (mongoose.connection.readyState === 1) { await mongoose.connection.db.admin().ping(); database = 'up'; }
  } catch { database = 'down'; }
  const ok = database === 'up';
  res.status(ok ? 200 : 503).json({ status: ok ? 'ok' : 'degraded', database, uptimeSeconds: Math.floor(process.uptime()), timestamp: new Date().toISOString() });
});

router.get('/metrics', verificarToken, verificarAdmin, (_req, res) => res.json(metricsSnapshot()));

router.get('/sitemap.xml', async (_req, res, next) => {
  try {
    const anuncios = await Anuncio.find({ estado: 'ativo' }).select('_id tipo carro.marca carro.modelo imovel.tipoImovel imovel.tipologia localizacao.cidade updatedAt').sort({ updatedAt: -1 }).limit(45000).lean();
    const fixed = ['/', '/carros', '/imoveis', '/privacidade'];
    const entries = [
      ...fixed.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: null })),
      ...anuncios.map((item) => ({ loc: `${SITE_URL}${anuncioPath(item)}`, lastmod: item.updatedAt?.toISOString() })),
    ];
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(({ loc, lastmod }) => `  <url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`;
    res.type('application/xml').set('Cache-Control', 'public, max-age=3600').send(body);
  } catch (error) { next(error); }
});

export default router;

