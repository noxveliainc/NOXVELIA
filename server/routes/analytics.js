import express from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import Anuncio from '../models/Anuncio.js';
import FunnelEvent, { FUNNEL_EVENTS } from '../models/FunnelEvent.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

const eventLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Limite de eventos atingido. Tenta novamente dentro de instantes.' },
});

export const funnelEventSchema = z.object({
  event: z.enum(FUNNEL_EVENTS),
  sessionId: z.string().regex(/^[A-Za-z0-9_-]{16,96}$/),
  path: z.string().max(180).regex(/^[\w\-/.?=&%:;,#@+]*$/).optional().default(''),
  vertical: z.enum(['all', 'carro', 'imovel']).optional().default('all'),
  listingId: z.string().regex(/^[a-f0-9]{24}$/i).optional(),
});

const dayKeyFromDate = (date) => date.toISOString().slice(0, 10);

router.post('/events', eventLimiter, async (req, res) => {
  const parsed = funnelEventSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ erro: 'Evento analítico inválido.' });
  }

  try {
    const occurredAt = new Date();
    const data = parsed.data;
    await FunnelEvent.create({
      event: data.event,
      sessionId: data.sessionId,
      path: data.path,
      vertical: data.vertical,
      listingId: data.listingId || null,
      dayKey: dayKeyFromDate(occurredAt),
      occurredAt,
    });

    return res.status(202).json({ recebido: true });
  } catch (erro) {
    console.warn('[ANALYTICS] Falha ao guardar evento:', erro.message);
    return res.status(202).json({ recebido: false });
  }
});

// Cache simples em memória — evita bater na base de dados a cada visita da landing.
// Reinicia quando o processo reinicia; suficiente para um endpoint público de baixo custo.
let siteVisitsCache = { data: null, expiresAt: 0 };
const SITE_VISITS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

router.get('/site-visitas', async (_req, res) => {
  try {
    const agora = Date.now();
    if (siteVisitsCache.data && siteVisitsCache.expiresAt > agora) {
      res.set('Cache-Control', 'public, max-age=300');
      return res.json(siteVisitsCache.data);
    }

    const desde = new Date(agora - 30 * 24 * 60 * 60 * 1000);

    const [totalRows, diarioRows] = await Promise.all([
      FunnelEvent.aggregate([
        { $match: { event: 'landing_view', occurredAt: { $gte: desde } } },
        { $group: { _id: null, sessions: { $addToSet: '$sessionId' } } },
        { $project: { _id: 0, total: { $size: '$sessions' } } },
      ]),
      FunnelEvent.aggregate([
        { $match: { event: 'landing_view', occurredAt: { $gte: desde } } },
        { $group: { _id: '$dayKey', sessions: { $addToSet: '$sessionId' } } },
        { $project: { _id: 0, dia: '$_id', visitas: { $size: '$sessions' } } },
        { $sort: { dia: 1 } },
      ]),
    ]);

    const payload = {
      totalVisitas30Dias: totalRows[0]?.total || 0,
      diario: diarioRows,
      atualizadoEm: new Date().toISOString(),
    };

    siteVisitsCache = { data: payload, expiresAt: agora + SITE_VISITS_CACHE_TTL_MS };
    res.set('Cache-Control', 'public, max-age=300');
    res.json(payload);
  } catch (erro) {
    console.warn('[ANALYTICS] Falha ao compilar visitas públicas:', erro.message);
    res.status(500).json({ erro: 'Erro ao carregar estatísticas do site.' });
  }
});

router.get('/anuncio/:id', verificarToken, async (req, res) => {
  try {
    const anuncio = await Anuncio.findOne({ _id: req.params.id, utilizador: req.user.id });
    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado ou revogado.' });

    // Gerar array dos últimos 7 dias garantindo dados estruturados
    const ultimos7Dias = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dataStr = d.toISOString().split('T')[0]; // YYYY-MM-DD

      const registoOriginal = anuncio.historicoVisitas.find(h => h.data === dataStr);
      ultimos7Dias.push({
        dataLabel: d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric' }),
        visitas: registoOriginal ? registoOriginal.quantidade : 0
      });
    }

    res.json({
      totalVisitas: anuncio.visitas || 0,
      contactosGerados: anuncio.contactos || 0,
      guardadoEmFavoritos: anuncio.guardados || 0,
      graficoSeteDias: ultimos7Dias
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao computar métricas analíticas.' });
  }
});

export default router;