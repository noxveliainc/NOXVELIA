import api from '../services/api';
import { readCookieConsent } from './cookieConsent';

const SESSION_KEY = 'noxvelia:funnel-session';
const EVENTS = new Set([
  'landing_view',
  'search_start',
  'listing_view',
  'whatsapp_click',
  'publish_start',
  'publish_complete',
]);

const getSessionId = () => {
  if (typeof window === 'undefined') return '';

  try {
    const current = window.localStorage.getItem(SESSION_KEY);
    if (current) return current;

    const generated = typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 18)}`;
    window.localStorage.setItem(SESSION_KEY, generated);
    return generated;
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 18)}`;
  }
};

const buildPayload = (event, details = {}) => ({
  event,
  sessionId: getSessionId(),
  path: typeof window !== 'undefined' ? window.location.pathname.slice(0, 180) : '',
  vertical: ['carro', 'imovel'].includes(details.vertical) ? details.vertical : 'all',
  ...(details.listingId ? { listingId: String(details.listingId) } : {}),
});

export const trackFunnelEvent = (event, details = {}) => {
  if (typeof window === 'undefined' || !EVENTS.has(event)) return;
  if (readCookieConsent()?.external !== true) return;

  const payload = buildPayload(event, details);
  const endpoint = `${String(api.defaults.baseURL || '/api').replace(/\/+$/, '')}/analytics/events`;
  const body = new URLSearchParams(payload);

  try {
    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(endpoint, body);
      return;
    }
  } catch {
    // O fallback abaixo mantém a medição disponível em browsers restritivos.
  }

  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
    keepalive: true,
    credentials: 'include',
  }).catch(() => {});
};
