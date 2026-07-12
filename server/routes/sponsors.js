import express from 'express';

const router = express.Router();
const PLACEMENTS = new Set([
  'landing_between_highlights',
  'search_results_top',
  'listing_before_suggestions',
  'comparator_footer',
]);
const VERTICALS = new Set(['all', 'carro', 'imovel']);

const texto = (value, max) => String(value || '').trim().slice(0, max);
const urlHttp = (value) => {
  try {
    const parsed = new URL(String(value || '').trim());
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
};

const obterCampanhas = () => {
  if (!process.env.SPONSOR_CAMPAIGNS_JSON) return [];

  try {
    const raw = JSON.parse(process.env.SPONSOR_CAMPAIGNS_JSON);
    if (!Array.isArray(raw)) return [];
    const agora = Date.now();

    return raw.slice(0, 30).map((campaign) => {
      const start = campaign.startAt ? Date.parse(campaign.startAt) : null;
      const end = campaign.endAt ? Date.parse(campaign.endAt) : null;
      const targetUrl = urlHttp(campaign.targetUrl);
      const imageUrl = urlHttp(campaign.imageUrl);
      const placements = Array.isArray(campaign.placements)
        ? campaign.placements.filter((item) => PLACEMENTS.has(item))
        : [];

      if (
        campaign.active === false || !texto(campaign.id, 80) || !texto(campaign.title, 100)
        || !targetUrl || !imageUrl || placements.length === 0
        || (start && start > agora) || (end && end < agora)
      ) return null;

      return {
        id: texto(campaign.id, 80),
        label: texto(campaign.label || 'Patrocinado', 30),
        title: texto(campaign.title, 100),
        description: texto(campaign.description, 180),
        cta: texto(campaign.cta || 'Saber mais', 35),
        imageUrl,
        targetUrl,
        placements,
        vertical: VERTICALS.has(campaign.vertical) ? campaign.vertical : 'all',
        priority: Math.max(0, Math.min(100, Number(campaign.priority) || 0)),
      };
    }).filter(Boolean).sort((a, b) => b.priority - a.priority);
  } catch {
    console.error('[SPONSORS] SPONSOR_CAMPAIGNS_JSON inválido. Nenhuma campanha foi publicada.');
    return [];
  }
};

router.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  res.json({ campaigns: obterCampanhas() });
});

export default router;
