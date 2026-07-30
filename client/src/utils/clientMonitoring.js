const CLIENT_ISSUE_KEY = '@Noxvelia:client-issue-count';
const CLIENT_ISSUE_MAX_PER_SESSION = 8;

const isLocalApiUrl = (url = '') =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(url);

const getApiBaseURL = () => {
  const configuredUrl = import.meta.env.VITE_API_URL;
  if (import.meta.env.PROD && isLocalApiUrl(configuredUrl)) return '/api';
  return configuredUrl || '/api';
};

const monitoringDisabled = () =>
  import.meta.env.VITE_CLIENT_MONITORING_DISABLED === 'true' ||
  typeof window === 'undefined';

const getBuildId = () => {
  const asset = document.querySelector('script[type="module"][src*="/assets/"]');
  return asset?.getAttribute('src') || import.meta.env.VITE_APP_VERSION || 'dev';
};

const isStaleChunkMessage = (message = '') =>
  message.includes('error loading dynamically imported module') ||
  message.includes('Failed to fetch dynamically imported module') ||
  message.includes('Importing a module script failed') ||
  message.includes('Unable to preload CSS');

const canSendIssue = () => {
  try {
    const current = Number(window.sessionStorage.getItem(CLIENT_ISSUE_KEY) || 0);
    if (current >= CLIENT_ISSUE_MAX_PER_SESSION) return false;
    window.sessionStorage.setItem(CLIENT_ISSUE_KEY, String(current + 1));
    return true;
  } catch {
    return true;
  }
};

const normaliseReason = (reason) => {
  if (reason instanceof Error) {
    return {
      message: reason.message,
      stack: reason.stack,
      source: reason.name,
    };
  }
  if (typeof reason === 'object' && reason !== null) {
    return {
      message: String(reason.message || reason.erro || reason.error || 'Erro no cliente'),
      stack: typeof reason.stack === 'string' ? reason.stack : undefined,
      source: reason.name || reason.code,
      extra: {
        status: reason.status || reason.response?.status,
        code: reason.code,
      },
    };
  }
  return { message: String(reason || 'Erro no cliente') };
};

export const reportClientIssue = (payload = {}) => {
  if (monitoringDisabled()) return;

  const message = String(payload.message || payload.erro || 'Erro no cliente');
  if (!message || isStaleChunkMessage(message) || !canSendIssue()) return;

  const body = {
    kind: payload.kind || 'manual',
    message: message.slice(0, 1000),
    stack: payload.stack ? String(payload.stack).slice(0, 5000) : undefined,
    source: payload.source ? String(payload.source).slice(0, 500) : undefined,
    lineno: payload.lineno,
    colno: payload.colno,
    path: window.location.pathname + window.location.search,
    url: window.location.href,
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    buildId: getBuildId(),
    status: payload.status,
    method: payload.method,
    endpoint: payload.endpoint,
    extra: payload.extra,
  };

  try {
    window.fetch(`${getApiBaseURL().replace(/\/+$/, '')}/system/client-issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
      credentials: 'include',
    }).catch(() => {});
  } catch {
    // Monitoring must never affect the user experience.
  }
};

export const installClientMonitoring = () => {
  if (monitoringDisabled() || window.__NOXVELIA_CLIENT_MONITORING__) return;
  window.__NOXVELIA_CLIENT_MONITORING__ = true;

  window.addEventListener('error', (event) => {
    const target = event.target;
    const isResourceError = target && target !== window && (target.src || target.href);
    reportClientIssue({
      kind: isResourceError ? 'resource_error' : 'runtime_error',
      message: event.message || `Falha ao carregar recurso: ${target?.src || target?.href || 'desconhecido'}`,
      stack: event.error?.stack,
      source: event.filename || target?.src || target?.href,
      lineno: event.lineno,
      colno: event.colno,
    });
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const normalised = normaliseReason(event.reason);
    reportClientIssue({
      kind: 'unhandled_rejection',
      ...normalised,
    });
  });
};
