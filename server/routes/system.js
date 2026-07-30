import express from 'express';
import mongoose from 'mongoose';
import crypto from 'node:crypto';
import rateLimit from 'express-rate-limit';
import Anuncio from '../models/Anuncio.js';
import ClientIssue from '../models/ClientIssue.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';
import { metricsSnapshot } from '../middleware/metrics.js';
import { anuncioPath } from '../utils/seo.js';

const router = express.Router();
const SITE_URL = process.env.CLIENT_URL || 'https://www.noxvelia.com';
const xmlEscape = (value) => String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]));
const textLimit = (value, max) => String(value || '').slice(0, max);

const publicSitemapPages = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/carros', changefreq: 'daily', priority: '0.9' },
  { path: '/imoveis', changefreq: 'daily', priority: '0.9' },
  { path: '/profissionais', changefreq: 'daily', priority: '0.7' },
  { path: '/planos', changefreq: 'weekly', priority: '0.6' },
  { path: '/patrocinios', changefreq: 'weekly', priority: '0.6' },
  { path: '/sobre-nos', changefreq: 'monthly', priority: '0.4' },
  { path: '/privacidade', changefreq: 'yearly', priority: '0.2' },
];

const clientIssueLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Limite temporario atingido.' },
});

const hashValue = (value) => crypto
  .createHash('sha256')
  .update(`${process.env.CLIENT_ISSUE_SALT || process.env.JWT_SECRET || 'noxvelia'}:${value || ''}`)
  .digest('hex');

const clientIp = (req) => String(req.headers['cf-connecting-ip'] || req.ip || req.socket?.remoteAddress || '');

router.get('/health', async (_req, res) => {
  let database = 'down';
  try {
    if (mongoose.connection.readyState === 1) { await mongoose.connection.db.admin().ping(); database = 'up'; }
  } catch { database = 'down'; }
  const ok = database === 'up';
  res.status(ok ? 200 : 503).json({ status: ok ? 'ok' : 'degraded', database, uptimeSeconds: Math.floor(process.uptime()), timestamp: new Date().toISOString() });
});

router.get('/metrics', verificarToken, verificarAdmin, (_req, res) => res.json(metricsSnapshot()));

router.get('/robots.txt', (_req, res) => {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /perfil',
    'Disallow: /favoritos',
    'Disallow: /editar/',
    'Disallow: /sucesso/',
    'Disallow: /premium-confirmar',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Sitemap: ${SITE_URL}/api/system/sitemap.xml`,
  ];
  res.type('text/plain').set('Cache-Control', 'public, max-age=3600').send(`${lines.join('\n')}\n`);
});

router.get('/sitemap.xml', async (_req, res, next) => {
  try {
    const anuncios = await Anuncio.find({ estado: 'ativo' })
      .select('_id tipo destacado carro.marca carro.modelo imovel.tipoImovel imovel.tipologia localizacao.cidade updatedAt')
      .sort({ updatedAt: -1 })
      .limit(45000)
      .lean();
    const entries = [
      ...publicSitemapPages.map((item) => ({ loc: `${SITE_URL}${item.path}`, changefreq: item.changefreq, priority: item.priority })),
      ...anuncios.map((item) => ({
        loc: `${SITE_URL}${anuncioPath(item)}`,
        lastmod: item.updatedAt?.toISOString(),
        changefreq: 'daily',
        priority: item.destacado ? '0.8' : '0.6',
      })),
    ];
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(({ loc, lastmod, changefreq, priority }) => `  <url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}${priority ? `<priority>${priority}</priority>` : ''}</url>`).join('\n')}\n</urlset>`;
    res.type('application/xml').set('Cache-Control', 'public, max-age=3600').send(body);
  } catch (error) { next(error); }
});

router.post('/client-issues', clientIssueLimiter, async (req, res) => {
  if (process.env.CLIENT_ISSUES_ENABLED === 'false') return res.sendStatus(204);

  try {
    const body = req.body || {};
    const kind = ['runtime_error', 'unhandled_rejection', 'api_error', 'resource_error', 'manual'].includes(body.kind)
      ? body.kind
      : 'runtime_error';
    const message = textLimit(body.message || body.erro || 'Erro no cliente', 1000);
    if (!message || message === 'Erro no cliente') return res.sendStatus(204);

    const path = textLimit(body.path, 600);
    const source = textLimit(body.source, 500);
    const endpoint = textLimit(body.endpoint, 600);
    const status = Number(body.status) || undefined;
    const fingerprint = hashValue([kind, message.slice(0, 180), path, source, endpoint, status].filter(Boolean).join('|'));

    await ClientIssue.create({
      kind,
      message,
      stack: textLimit(body.stack, 5000),
      source,
      lineno: Number(body.lineno) || undefined,
      colno: Number(body.colno) || undefined,
      path,
      url: textLimit(body.url, 1200),
      userAgent: textLimit(body.userAgent || req.get('User-Agent'), 700),
      viewport: body.viewport && typeof body.viewport === 'object' ? {
        width: Number(body.viewport.width) || undefined,
        height: Number(body.viewport.height) || undefined,
      } : undefined,
      buildId: textLimit(body.buildId, 200),
      status,
      method: textLimit(body.method, 20),
      endpoint,
      fingerprint,
      ipHash: hashValue(clientIp(req)),
      extra: body.extra && typeof body.extra === 'object' ? body.extra : undefined,
    });
  } catch (error) {
    console.warn('[CLIENT-ISSUES] Falha ao registar evento:', error.message);
  }

  return res.sendStatus(204);
});

router.get('/client-issues', verificarToken, verificarAdmin, async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
    const desde = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [items, ultimas24h, porTipo] = await Promise.all([
      ClientIssue.find({}).sort({ createdAt: -1 }).limit(limit).lean(),
      ClientIssue.countDocuments({ createdAt: { $gte: desde } }),
      ClientIssue.aggregate([
        { $match: { createdAt: { $gte: desde } } },
        { $group: { _id: '$kind', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
      ]),
    ]);

    res.json({
      resumo: {
        ultimas24h,
        porTipo: porTipo.map((item) => ({ tipo: item._id, total: item.total })),
      },
      items,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
