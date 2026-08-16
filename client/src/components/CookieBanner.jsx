import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CONSENT_KEY,
  COOKIE_CONSENT_CHANGED_EVENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  dispatchCookieConsentChanged,
  readCookieConsent,
  writeCookieConsent,
} from '../utils/cookieConsent';
import { removeAdsenseScript } from '../utils/googleAdsense';

const BMC_SCRIPT_ID = 'noxvelia-bmc-widget';

const removeExternalWidget = () => {
  document.getElementById('bmc-wbtn')?.remove();
  const iframe = document.getElementById('bmc-iframe');
  if (iframe?.parentElement) iframe.parentElement.remove();
  document
    .querySelectorAll('#' + BMC_SCRIPT_ID + ', script[data-name="BMC-Widget"]')
    .forEach((script) => script.remove());
};

const loadExternalWidget = () => {
  if (document.getElementById(BMC_SCRIPT_ID) || document.getElementById('bmc-wbtn')) return;
  const script = document.createElement('script');
  script.id = BMC_SCRIPT_ID;
  script.async = true;
  script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
  script.setAttribute('data-name', 'BMC-Widget');
  script.setAttribute('data-cfasync', 'false');
  script.setAttribute('data-id', 'noxvelia');
  script.setAttribute('data-description', 'Apoia a NOXVELIA');
  script.setAttribute('data-message', '');
  script.setAttribute('data-color', '#d9c49c');
  script.setAttribute('data-position', 'Right');
  script.setAttribute('data-x_margin', '18');
  script.setAttribute('data-y_margin', '18');
  document.body.appendChild(script);
};

export default function CookieBanner() {
  const initialConsent = useRef(undefined);
  if (initialConsent.current === undefined) initialConsent.current = readCookieConsent();
  const [consent, setConsent] = useState(initialConsent.current);
  const [isOpen, setIsOpen] = useState(!initialConsent.current);

  const saveChoice = (external) => {
    const record = writeCookieConsent(external);
    setConsent(record);
    setIsOpen(false);
    dispatchCookieConsentChanged(record);
  };

  useEffect(() => {
    if (consent?.external) {
      loadExternalWidget();
      return undefined;
    }

    removeExternalWidget();
    removeAdsenseScript();
    const observer = new MutationObserver(removeExternalWidget);
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, [consent?.external]);

  useEffect(() => {
    const openSettings = () => setIsOpen(true);
    const syncConsent = (event) => {
      const record = event?.detail || readCookieConsent();
      setConsent(record);
      if (record) setIsOpen(false);
    };
    const syncStorage = (event) => {
      if (event.key !== CONSENT_KEY) return;
      const record = readCookieConsent();
      setConsent(record);
      setIsOpen(!record);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
    window.addEventListener('storage', syncStorage);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <section
      className="fixed bottom-4 left-4 right-4 z-[2147483000] mx-auto grid max-w-6xl gap-5 rounded-2xl border border-[#d9c49c]/40 bg-[#102f50] p-5 text-[#fffaf0] shadow-2xl md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="flex min-w-0 items-start gap-4">
        <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d9c49c]/30 bg-[#d9c49c]/10 text-[#d9c49c] sm:flex" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 3.5a3.5 3.5 0 0 0 4.2 4.2A3.5 3.5 0 0 0 17 12a3.5 3.5 0 0 0 3.4 4.2A9 9 0 1 1 8.5 3.5Z" />
            <circle cx="8" cy="13" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="7" cy="18" r=".8" />
          </svg>
        </span>
        <div className="min-w-0">
          <h2 id="cookie-banner-title" className="m-0 text-base font-extrabold tracking-tight sm:text-lg">A tua privacidade na NOXVELIA</h2>
          <p id="cookie-banner-description" className="mt-2 max-w-3xl text-xs leading-6 text-[#fffaf0]/78 sm:text-sm">
            Utilizamos armazenamento essencial para autenticação, segurança e preferências. Só carregamos serviços externos opcionais, incluindo apoio externo e publicidade Google, com a tua autorização. Podes rejeitá-los sem perder acesso à plataforma.
          </p>
          {consent && (
            <p className="mt-2 text-xs font-semibold text-[#fffaf0]/60">
              Escolha atual: serviços externos {consent.external ? 'ativos' : 'desativados'}.
            </p>
          )}
          <Link className="mt-2 inline-flex text-xs font-bold text-[#d9c49c] underline decoration-[#d9c49c]/50 underline-offset-4 hover:text-[#f0dfbb]" to="/privacidade#cookies">
            Consultar a política de cookies
          </Link>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 md:min-w-[330px]">
        <button type="button" onClick={() => saveChoice(false)} className="min-h-11 rounded-xl border border-[#fffaf0]/24 bg-[#fffaf0]/5 px-4 text-xs font-extrabold text-[#fffaf0] transition hover:border-[#fffaf0]/40 hover:bg-[#fffaf0]/10">
          Rejeitar opcionais
        </button>
        <button type="button" onClick={() => saveChoice(true)} className="min-h-11 rounded-xl border border-[#d9c49c] bg-[#d9c49c] px-4 text-xs font-extrabold text-[#071326] transition hover:bg-[#f0dfbb] hover:border-[#f0dfbb]">
          Aceitar opcionais
        </button>
      </div>
    </section>
  );
}