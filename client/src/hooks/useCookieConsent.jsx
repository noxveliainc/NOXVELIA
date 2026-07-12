import { useEffect, useState } from 'react';
import {
  CONSENT_KEY,
  COOKIE_CONSENT_CHANGED_EVENT,
  readCookieConsent,
} from '../utils/cookieConsent';

export default function useCookieConsent() {
  const [consent, setConsent] = useState(() => readCookieConsent());

  useEffect(() => {
    const syncConsent = (event) => {
      setConsent(event?.detail || readCookieConsent());
    };
    const syncStorage = (event) => {
      if (event.key === CONSENT_KEY) setConsent(readCookieConsent());
    };

    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
    window.addEventListener('storage', syncStorage);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  return consent;
}
