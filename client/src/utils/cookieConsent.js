export const CONSENT_KEY = 'noxvelia_cookies_accepted';
export const LEGACY_KEY = '@Noxvelia:cookie-consent';
export const CONSENT_VERSION = '2026-07-13.1';
export const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;
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

export const readCookieConsent = () => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw === 'true') return createConsentRecord(true);
    if (raw) {
      const record = JSON.parse(raw);
      const expiresAt = new Date(record?.expiresAt).getTime();
      const valid = record?.accepted === true
        && record?.version === CONSENT_VERSION
        && Number.isFinite(expiresAt)
        && expiresAt > Date.now();
      if (valid) return record;
      localStorage.removeItem(CONSENT_KEY);
    }

    if (localStorage.getItem(LEGACY_KEY)) {
      localStorage.removeItem(LEGACY_KEY);
      return null;
    }
  } catch {
    return null;
  }
  return null;
};

export const writeCookieConsent = (external) => {
  const record = createConsentRecord(external);
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // Keep the choice active for the current page when storage is unavailable.
  }
  return record;
};

export const dispatchCookieConsentChanged = (record) => {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: record }));
};
