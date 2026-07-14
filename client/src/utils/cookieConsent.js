export const CONSENT_KEY = 'noxvelia_cookies_accepted';
export const LEGACY_KEY = '@Noxvelia:cookie-consent';
export const CONSENT_VERSION = '2026-07-13.1';
export const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_DURATION_SECONDS = Math.floor(CONSENT_DURATION_MS / 1000);
export const OPEN_COOKIE_SETTINGS_EVENT = 'noxvelia:open-cookie-settings';
export const COOKIE_CONSENT_CHANGED_EVENT = 'noxvelia:cookie-consent-changed';

export const createConsentRecord = (external) => {
  const now = new Date();
  return {
    version: CONSENT_VERSION,
    accepted: true,
    external: Boolean(external),
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_DURATION_MS).toISOString(),
  };
};

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const encodeCookieValue = (record) => encodeURIComponent(JSON.stringify(record));

const decodeCookieValue = (value) => {
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
};

const readStoredCookie = () => {
  if (!isBrowser()) return null;
  const prefix = `${CONSENT_KEY}=`;
  const cookie = document.cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(prefix));

  if (!cookie) return null;
  return decodeCookieValue(cookie.slice(prefix.length));
};

const writeStoredCookie = (record) => {
  if (!isBrowser()) return;
  const secure = window.location.protocol === 'https:' ? 'Secure' : '';
  document.cookie = [
    `${CONSENT_KEY}=${encodeCookieValue(record)}`,
    `Max-Age=${CONSENT_DURATION_SECONDS}`,
    'Path=/',
    'SameSite=Lax',
    secure,
  ].filter(Boolean).join('; ');
};

const clearStoredCookie = () => {
  if (!isBrowser()) return;
  document.cookie = `${CONSENT_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
};

const isValidConsentRecord = (record) => {
  const expiresAt = new Date(record?.expiresAt).getTime();
  return record?.accepted === true
    && record?.version === CONSENT_VERSION
    && Number.isFinite(expiresAt)
    && expiresAt > Date.now();
};

const readLocalConsent = () => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw === 'true') return createConsentRecord(true);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const writeLocalConsent = (record) => {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Cookie persistence can still keep the choice across reloads.
  }
};

const removeLocalValue = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage failures; cookie cleanup still runs where possible.
  }
};

const hasLegacyConsent = () => {
  try {
    return Boolean(localStorage.getItem(LEGACY_KEY));
  } catch {
    return false;
  }
};

export const readCookieConsent = () => {
  if (!isBrowser()) return null;

  const localRecord = readLocalConsent();
  if (isValidConsentRecord(localRecord)) {
    writeStoredCookie(localRecord);
    return localRecord;
  }

  if (localRecord) {
    removeLocalValue(CONSENT_KEY);
    clearStoredCookie();
    return null;
  }

  const cookieRecord = readStoredCookie();
  if (isValidConsentRecord(cookieRecord)) {
    writeLocalConsent(cookieRecord);
    return cookieRecord;
  }

  if (cookieRecord) {
    clearStoredCookie();
  }

  if (hasLegacyConsent()) {
    removeLocalValue(LEGACY_KEY);
    return null;
  }

  return null;
};

export const writeCookieConsent = (external) => {
  const record = createConsentRecord(external);
  writeLocalConsent(record);
  removeLocalValue(LEGACY_KEY);
  try {
    writeStoredCookie(record);
  } catch {
    // localStorage is enough for this page when cookies are blocked.
  }
  return record;
};

export const dispatchCookieConsentChanged = (record) => {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: record }));
};
