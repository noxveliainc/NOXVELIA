const CACHE_MS = Number(process.env.MARKET_NEWS_CACHE_MS || 1000 * 60 * 60 * 3);
const FETCH_TIMEOUT_MS = Number(process.env.MARKET_NEWS_TIMEOUT_MS || 8000);
const MAX_ITEMS_PER_FEED = 6;

const DEFAULT_FEEDS = [
  {
    id: 'automoveis',
    label: 'Automóveis',
    url: 'https://news.google.com/rss/search?q=autom%C3%B3veis%20Portugal%20carros%20usados&hl=pt-PT&gl=PT&ceid=PT:pt-150',
  },
  {
    id: 'imoveis',
    label: 'Imóveis',
    url: 'https://news.google.com/rss/search?q=mercado%20imobili%C3%A1rio%20Portugal%20habita%C3%A7%C3%A3o&hl=pt-PT&gl=PT&ceid=PT:pt-150',
  },
];

let cache = { updatedAt: 0, payload: null };

const decodeXml = (value = '') => String(value)
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
  .trim();

const stripHtml = (value = '') => decodeXml(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const extractTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decodeXml(match[1]) : '';
};
const extractTextTag = (xml, tag) => stripHtml(extractTag(xml, tag));
const normalizarTitulo = (titulo = '') => titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const escapeRegExp = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const limparTitulo = (titulo, fonte) => {
  let clean = stripHtml(titulo);
  if (fonte) clean = clean.replace(new RegExp(`\\s+-\\s+${escapeRegExp(fonte)}$`, 'i'), '').trim();
  return clean.replace(/\s+/g, ' ').slice(0, 160);
};

const limitarResumo = (descricao, titulo) => {
  const clean = stripHtml(descricao).replace(titulo, '').replace(/\s+-\s+$/, '').trim();
  if (!clean || clean.length < 32) return '';
  return clean.slice(0, 180).replace(/\s+\S*$/, '').trim();
};

const parseRss = (xml, feed) => {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];
  return items.slice(0, MAX_ITEMS_PER_FEED).map((item) => {
    const fonte = extractTextTag(item, 'source') || feed.label;
    const titulo = limparTitulo(extractTag(item, 'title'), fonte);
    const link = extractTextTag(item, 'link');
    const publishedAt = extractTextTag(item, 'pubDate');
    const date = publishedAt ? new Date(publishedAt) : null;
    const resumo = limitarResumo(extractTag(item, 'description'), titulo);
    return {
      id: `${feed.id}:${normalizarTitulo(titulo).slice(0, 90)}`,
      vertical: feed.id,
      verticalLabel: feed.label,
      title: titulo,
      summary: resumo,
      source: fonte,
      url: /^https?:\/\//i.test(link) ? link : '',
      publishedAt: date && !Number.isNaN(date.getTime()) ? date.toISOString() : null,
    };
  }).filter((item) => item.title && item.url && item.title.length >= 16);
};

const fetchFeed = async (feed) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8',
        'user-agent': 'NoxveliaMarketNews/1.0 (+https://www.noxvelia.com)',
      },
    });
    if (!response.ok) throw new Error(`Feed ${feed.id} respondeu ${response.status}`);
    return parseRss(await response.text(), feed);
  } finally {
    clearTimeout(timeout);
  }
};

export const obterAtualidadeMercado = async ({ limit = 6, force = false } = {}) => {
  const now = Date.now();
  const max = Math.min(Math.max(Number(limit) || 6, 1), 8);
  if (!force && cache.payload && now - cache.updatedAt < CACHE_MS) {
    return { ...cache.payload, items: cache.payload.items.slice(0, max), cached: true };
  }

  const settled = await Promise.allSettled(DEFAULT_FEEDS.map(fetchFeed));
  const seen = new Set();
  const items = settled
    .flatMap((result) => (result.status === 'fulfilled' ? result.value : []))
    .filter((item) => {
      const key = normalizarTitulo(item.title);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));

  if (items.length === 0 && cache.payload) {
    return { ...cache.payload, items: cache.payload.items.slice(0, max), cached: true, stale: true };
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    sources: DEFAULT_FEEDS.map(({ id, label }) => ({ id, label })),
    items,
  };
  cache = { updatedAt: now, payload };
  return { ...payload, items: items.slice(0, max), cached: false };
};

export const limparCacheAtualidadeMercado = () => {
  cache = { updatedAt: 0, payload: null };
};
