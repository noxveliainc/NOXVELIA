import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'noxvelia_cookies_accepted';
const LEGACY_KEY = '@Noxvelia:cookie-consent';
const CONSENT_VERSION = '2026-07-12';
const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;
const OPEN_SETTINGS_EVENT = 'noxvelia:open-cookie-settings';
const BMC_SCRIPT_ID = 'noxvelia-bmc-widget';

const createRecord = (external) => {
  const now = new Date();
  return {
    version: CONSENT_VERSION,
    accepted: true,
    external: Boolean(external),
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_DURATION_MS).toISOString(),
  };
};

const readConsent = () => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw === 'true') return createRecord(true);
    if (raw) {
      const record = JSON.parse(raw);
      const valid = record?.accepted === true
        && record?.version === CONSENT_VERSION
        && new Date(record.expiresAt).getTime() > Date.now();
      if (valid) return record;
      localStorage.removeItem(CONSENT_KEY);
    }

    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      const migrated = createRecord(Boolean(legacy?.categories?.external));
      localStorage.setItem(CONSENT_KEY, JSON.stringify(migrated));
      localStorage.removeItem(LEGACY_KEY);
      return migrated;
    }
  } catch {
    return null;
  }
  return null;
};

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
  script.setAttribute('data-color', '#2ac1b4');
  script.setAttribute('data-position', 'Right');
  script.setAttribute('data-x_margin', '18');
  script.setAttribute('data-y_margin', '18');
  document.body.appendChild(script);
};

export default function CookieBanner() {
  const initialConsent = useRef(undefined);
  if (initialConsent.current === undefined) initialConsent.current = readConsent();
  const [consent, setConsent] = useState(initialConsent.current);
  const [isOpen, setIsOpen] = useState(!initialConsent.current);

  const saveChoice = (external) => {
    const record = createRecord(external);
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      // A escolha mantém-se nesta abertura se o armazenamento estiver bloqueado.
    }
    setConsent(record);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('noxvelia:cookie-consent-changed', { detail: record }));
  };

  useEffect(() => {
    if (consent?.external) {
      loadExternalWidget();
      return undefined;
    }

    removeExternalWidget();
    const observer = new MutationObserver(removeExternalWidget);
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, [consent?.external]);

  useEffect(() => {
    const openSettings = () => setIsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  return (
    <>
      {isOpen && (
        <section
          className="fixed bottom-4 left-4 right-4 z-[90000] mx-auto grid max-w-6xl gap-5 rounded-2xl border border-white/15 bg-slate-950 p-5 text-white shadow-2xl md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-6"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
        >
          <div className="flex min-w-0 items-start gap-4">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-400/10 text-teal-300 sm:flex" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 3.5a3.5 3.5 0 0 0 4.2 4.2A3.5 3.5 0 0 0 17 12a3.5 3.5 0 0 0 3.4 4.2A9 9 0 1 1 8.5 3.5Z" />
                <circle cx="8" cy="13" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="7" cy="18" r=".8" />
              </svg>
            </span>
            <div className="min-w-0">
              <h2 id="cookie-banner-title" className="m-0 text-base font-extrabold tracking-tight sm:text-lg">A tua privacidade na NOXVELIA</h2>
              <p id="cookie-banner-description" className="mt-2 max-w-3xl text-xs leading-6 text-slate-300 sm:text-sm">
                Utilizamos armazenamento essencial para autenticação, segurança e preferências. Só carregamos serviços externos opcionais com a tua autorização. Podes rejeitá-los sem perder acesso à plataforma.
              </p>
              {consent && (
                <p className="mt-2 text-xs font-semibold text-slate-400">
                  Escolha atual: serviços externos {consent.external ? 'ativos' : 'desativados'}.
                </p>
              )}
              <Link className="mt-2 inline-flex text-xs font-bold text-teal-300 underline decoration-teal-300/50 underline-offset-4 hover:text-teal-200" to="/privacidade#cookies">
                Consultar a política de cookies
              </Link>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 md:min-w-[330px]">
            <button type="button" onClick={() => saveChoice(false)} className="min-h-11 rounded-xl border border-white/20 bg-white/5 px-4 text-xs font-extrabold text-white transition hover:border-white/30 hover:bg-white/10">
              Rejeitar opcionais
            </button>
            <button type="button" onClick={() => saveChoice(true)} className="min-h-11 rounded-xl border border-teal-300 bg-teal-400 px-4 text-xs font-extrabold text-slate-950 transition hover:bg-teal-300">
              Aceitar opcionais
            </button>
          </div>
        </section>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-[89990] inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 text-xs font-extrabold text-white shadow-xl transition hover:bg-slate-900"
          aria-label="Gerir preferências de cookies"
        >
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8.5 3.5a3.5 3.5 0 0 0 4.2 4.2A3.5 3.5 0 0 0 17 12a3.5 3.5 0 0 0 3.4 4.2A9 9 0 1 1 8.5 3.5Z" />
            <circle cx="8" cy="13" r="1" /><circle cx="12" cy="17" r="1" />
          </svg>
          Cookies
        </button>
      )}
    </>
  );
}
