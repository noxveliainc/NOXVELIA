import crypto from 'node:crypto';

export const CONTACT_TYPES = ['stand', 'imobiliaria', 'outro'];
export const CONTACT_STATES = ['novo', 'valido', 'invalido', 'contactado', 'respondeu', 'interessado', 'convertido', 'removido', 'bloqueado'];
export const CAMPAIGN_STATES = ['rascunho', 'programada', 'em_processamento', 'pausada', 'concluida', 'cancelada'];
export const SEND_STATES = ['pendente', 'enviado', 'entregue', 'aberto', 'clicado', 'devolvido', 'reclamado', 'falhou', 'removido', 'ignorado'];

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

export const isValidEmail = (value) => EMAIL_PATTERN.test(normalizeEmail(value));

export const cleanText = (value, max = 500) => String(value || '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, max);

export const cleanMultiline = (value, max = 8000) => String(value || '')
  .replace(/\r\n/g, '\n')
  .replace(/\r/g, '\n')
  .replace(/[^\S\n]+/g, ' ')
  .trim()
  .slice(0, max);

export const normalizeContactType = (value) => {
  const raw = String(value || '').trim().toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (['stand', 'stands', 'automovel', 'automoveis', 'carro', 'carros'].includes(raw)) return 'stand';
  if (['imobiliaria', 'imobiliarias', 'imovel', 'imoveis', 'agencia'].includes(raw)) return 'imobiliaria';
  return 'outro';
};

export const normalizeContactState = (value) => (
  CONTACT_STATES.includes(value) ? value : 'novo'
);

export const ensureHttpsUrl = (value, { allowEmpty = true } = {}) => {
  const trimmed = cleanText(value, 500);
  if (!trimmed) return allowEmpty ? '' : null;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    if (url.protocol === 'http:' && !/^localhost(:\d+)?$/i.test(url.host)) url.protocol = 'https:';
    return url.toString();
  } catch {
    return null;
  }
};

export const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[char]));

export const stripHtml = (value) => String(value || '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export const textToEmailHtml = (value) => {
  const text = cleanMultiline(value);
  if (!text) return '';

  const lines = text.split('\n');
  const chunks = [];
  let list = [];

  const flushList = () => {
    if (!list.length) return;
    chunks.push(`<ul style="margin: 0 0 18px 22px; padding: 0; color: #334155;">${list.map((item) => `<li style="margin: 0 0 8px;">${escapeHtml(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    const bullet = trimmed.match(/^[*\-\u2022]\s*(.+)$/);
    if (bullet) {
      list.push(bullet[1]);
      continue;
    }
    flushList();
    chunks.push(`<p style="margin: 0 0 18px; color: #334155; line-height: 1.65; font-size: 15px;">${escapeHtml(trimmed)}</p>`);
  }
  flushList();
  return chunks.join('\n');
};

export const sanitizeSubject = (value) => cleanText(value, 180).replace(/[\r\n]+/g, ' ');

export const safeFromAddress = (value, fallback) => {
  const from = cleanText(value, 220).replace(/[\r\n]/g, '');
  const match = from.match(/<([^>]+)>$/);
  if (match && isValidEmail(match[1])) return from;
  if (isValidEmail(from)) return from;
  return fallback;
};

export const safeReplyTo = (value, fallback) => {
  const reply = cleanText(value, 220).replace(/[\r\n]/g, '');
  return isValidEmail(reply.replace(/^.*<([^>]+)>$/, '$1')) ? reply : fallback;
};

export const contactAreaText = (type) => {
  if (type === 'stand') return 'automoveis';
  if (type === 'imobiliaria') return 'imoveis';
  return 'imoveis ou automoveis';
};

export const personalizeText = (template, contact = {}, unsubscribeUrl = '') => {
  const nome = cleanText(contact.nomePessoa || contact.nome || '', 120);
  const empresa = cleanText(contact.nomeEmpresa || contact.empresa || '', 160);
  const website = cleanText(contact.website || '', 260);
  const tipo = contactAreaText(contact.tipoEmpresa || contact.tipo);

  let output = String(template || '');
  output = output.replace(/a\s+\{\{empresa\}\}/gi, empresa ? `a ${empresa}` : 'a sua empresa');
  output = output.replace(/da\s+\{\{empresa\}\}/gi, empresa ? `da ${empresa}` : 'da sua empresa');
  output = output.replace(/\{\{nome\}\}/g, nome);
  output = output.replace(/\{\{empresa\}\}/g, empresa || 'a sua empresa');
  output = output.replace(/\{\{website\}\}/g, website);
  output = output.replace(/\{\{tipo\}\}/g, tipo);
  output = output.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl);
  output = output.replace(/Olá\s+,/g, 'Olá,');
  output = output.replace(/Ola\s+,/g, 'Ola,');
  output = output.replace(/os seus imóveis ou automóveis/gi, `os seus ${tipo}`);
  output = output.replace(/os seus imoveis ou automoveis/gi, `os seus ${tipo}`);
  return output;
};

export const signToken = (payload, secret) => {
  if (!secret || secret.length < 16) throw new Error('Secret de unsubscribe ausente ou demasiado curto.');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
};

export const verifyToken = (token, secret) => {
  if (!token || !secret) return null;
  const [body, sig] = String(token).split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  const safeSig = Buffer.from(sig);
  const safeExpected = Buffer.from(expected);
  if (safeSig.length !== safeExpected.length || !crypto.timingSafeEqual(safeSig, safeExpected)) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
};

export const parsePositiveInt = (value, fallback, { min = 1, max = 10000 } = {}) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
};

export const buildCsv = (rows) => {
  const escapeCell = (cell) => {
    const text = String(cell ?? '');
    return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return rows.map((row) => row.map(escapeCell).join(',')).join('\n');
};
