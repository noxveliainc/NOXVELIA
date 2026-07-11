import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = '@Noxvelia:cookie-consent';
const CONSENT_VERSION = '2026-07-11';
const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;
const OPEN_SETTINGS_EVENT = 'noxvelia:open-cookie-settings';
const BMC_SCRIPT_ID = 'noxvelia-bmc-widget';

const DEFAULT_PREFERENCES = {
  necessary: true,
  external: false,
};

const readStoredConsent = () => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return { record: null, preferences: DEFAULT_PREFERENCES };

    const record = JSON.parse(raw);
    const isCurrentVersion = record?.version === CONSENT_VERSION;
    const isStillValid = record?.expiresAt && new Date(record.expiresAt).getTime() > Date.now();

    if (!isCurrentVersion || !isStillValid) {
      localStorage.removeItem(CONSENT_KEY);
      return { record: null, preferences: DEFAULT_PREFERENCES };
    }

    return {
      record,
      preferences: {
        necessary: true,
        external: Boolean(record?.categories?.external),
      },
    };
  } catch {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // O navegador pode bloquear completamente o armazenamento local.
    }
    return { record: null, preferences: DEFAULT_PREFERENCES };
  }
};

const removeExternalWidget = () => {
  document.getElementById('bmc-wbtn')?.remove();

  const iframe = document.getElementById('bmc-iframe');
  if (iframe?.parentElement) iframe.parentElement.remove();

  document
    .querySelectorAll(`#${BMC_SCRIPT_ID}, script[data-name="BMC-Widget"]`)
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
  script.setAttribute('data-description', 'Apoia a NOXVELIA!');
  script.setAttribute('data-message', '');
  script.setAttribute('data-color', '#2ac1b4');
  script.setAttribute('data-position', 'Right');
  script.setAttribute('data-x_margin', '18');
  script.setAttribute('data-y_margin', '18');
  document.body.appendChild(script);
};

export default function CookieConsent() {
  const initialStateRef = useRef(null);
  if (!initialStateRef.current) initialStateRef.current = readStoredConsent();

  const dialogRef = useRef(null);
  const [preferences, setPreferences] = useState(initialStateRef.current.preferences);
  const [externalDraft, setExternalDraft] = useState(initialStateRef.current.preferences.external);
  const [hasDecision, setHasDecision] = useState(Boolean(initialStateRef.current.record));
  const [bannerOpen, setBannerOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    if (!hasDecision) setBannerOpen(true);
  }, [hasDecision]);

  const openSettings = useCallback(() => {
    setExternalDraft(preferences.external);
    setBannerOpen(false);
    setSettingsOpen(true);
  }, [preferences.external]);

  const persistChoice = (external) => {
    const now = new Date();
    const record = {
      version: CONSENT_VERSION,
      updatedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + CONSENT_DURATION_MS).toISOString(),
      categories: {
        necessary: true,
        external: Boolean(external),
      },
    };

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    } catch {
      // A escolha continua válida nesta abertura quando o armazenamento está bloqueado.
    }

    setPreferences(record.categories);
    setExternalDraft(record.categories.external);
    setHasDecision(true);
    setSettingsOpen(false);
    setBannerOpen(false);
    window.dispatchEvent(new CustomEvent('noxvelia:cookie-consent-changed', { detail: record }));
  };

  useEffect(() => {
    if (preferences.external) {
      loadExternalWidget();
      return undefined;
    }

    removeExternalWidget();
    const observer = new MutationObserver(removeExternalWidget);
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, [preferences.external]);

  useEffect(() => {
    const handleOpenSettings = () => openSettings();
    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
  }, [openSettings]);

  useEffect(() => {
    if (!settingsOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = dialogRef.current?.querySelector('button:not([disabled]), a[href], input:not([disabled])');
    if (firstFocusable instanceof HTMLElement) firstFocusable.focus();
    else dialogRef.current?.focus();

    const handleKeyboard = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSettings();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])'),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('keydown', handleKeyboard);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [closeSettings, settingsOpen]);

  return (
    <>
      <style>{`
        .cc-banner,
        .cc-banner *,
        .cc-overlay,
        .cc-overlay *,
        .cc-manage-trigger,
        .cc-manage-trigger * {
          box-sizing: border-box;
        }

        .cc-banner {
          position: fixed;
          z-index: 90000;
          left: 50%;
          bottom: max(18px, env(safe-area-inset-bottom));
          width: min(1180px, calc(100% - 32px));
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          padding: 22px;
          color: #eaf5f4;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 18px;
          background:
            radial-gradient(circle at 0 0, rgba(42, 193, 180, 0.2), transparent 34%),
            rgba(7, 27, 32, 0.97);
          box-shadow: 0 28px 70px -30px rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(18px);
          transform: translateX(-50%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          animation: cc-enter 0.34s ease both;
        }

        .cc-copy-wrap {
          min-width: 0;
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 14px;
          align-items: start;
        }

        .cc-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          color: #75e1d5;
          border: 1px solid rgba(117, 225, 213, 0.24);
          border-radius: 13px;
          background: rgba(42, 193, 180, 0.12);
        }

        .cc-icon svg,
        .cc-manage-trigger svg {
          width: 21px;
          height: 21px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .cc-banner h2 {
          margin: 0;
          color: #fff;
          font-size: 17px;
          font-weight: 820;
          letter-spacing: -0.02em;
        }

        .cc-banner p {
          max-width: 760px;
          margin: 6px 0 0;
          color: #bfd0d2;
          font-size: 12.5px;
          line-height: 1.55;
        }

        .cc-banner a,
        .cc-modal a {
          color: #7ce4d8;
          font-weight: 760;
          text-underline-offset: 3px;
        }

        .cc-saved-choice {
          display: inline-flex;
          margin-top: 7px;
          color: #9eb4b8;
          font-size: 10.5px;
          font-weight: 700;
        }

        .cc-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
        }

        .cc-button {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          border: 1px solid transparent;
          border-radius: 10px;
          font-size: 11.5px;
          font-weight: 800;
          white-space: nowrap;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .cc-button:hover {
          transform: translateY(-1px);
        }

        .cc-button.primary {
          color: #06272b;
          background: #2ac1b4;
        }

        .cc-button.outline {
          color: #e8f1f2;
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.06);
        }

        .cc-button.ghost {
          color: #bcd0d2;
          border-color: transparent;
          background: transparent;
        }

        .cc-manage-trigger {
          position: fixed;
          z-index: 89990;
          left: 16px;
          bottom: max(16px, env(safe-area-inset-bottom));
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 13px;
          color: #e8f5f4;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          background: rgba(7, 27, 32, 0.92);
          box-shadow: 0 14px 35px -20px rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(12px);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .cc-manage-trigger svg {
          width: 17px;
          height: 17px;
          color: #72dfd3;
        }

        .cc-overlay {
          position: fixed;
          z-index: 90010;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(2, 12, 16, 0.68);
          backdrop-filter: blur(8px);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          animation: cc-fade 0.2s ease both;
        }

        .cc-modal {
          width: min(610px, 100%);
          max-height: min(760px, calc(100vh - 40px));
          overflow-y: auto;
          padding: 26px;
          color: #183238;
          border: 1px solid #dce7e6;
          border-radius: 20px;
          background: #fbfcfa;
          box-shadow: 0 34px 90px -30px rgba(0, 0, 0, 0.72);
          outline: none;
        }

        .cc-modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }

        .cc-modal-head h2 {
          margin: 0;
          color: #082126;
          font-size: 23px;
          font-weight: 840;
          letter-spacing: -0.035em;
        }

        .cc-modal-head p {
          margin: 7px 0 0;
          color: #647b80;
          font-size: 12.5px;
          line-height: 1.55;
        }

        .cc-close {
          width: 38px;
          height: 38px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          padding: 0;
          color: #426067;
          border: 1px solid #dce7e6;
          border-radius: 50%;
          background: #fff;
          font-size: 20px;
          cursor: pointer;
        }

        .cc-options {
          display: grid;
          gap: 10px;
        }

        .cc-option {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 18px;
          align-items: center;
          padding: 17px;
          border: 1px solid #dce7e6;
          border-radius: 14px;
          background: #fff;
        }

        .cc-option strong {
          display: block;
          color: #123036;
          font-size: 13px;
          font-weight: 820;
        }

        .cc-option p {
          margin: 5px 0 0;
          color: #687e83;
          font-size: 11.5px;
          line-height: 1.5;
        }

        .cc-required {
          display: inline-flex;
          align-items: center;
          min-height: 25px;
          padding: 0 9px;
          color: #176c65;
          border-radius: 999px;
          background: #e4f8f4;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .cc-toggle {
          position: relative;
          width: 46px;
          height: 26px;
          flex: 0 0 auto;
        }

        .cc-toggle input {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
        }

        .cc-toggle-track {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: #cbd8d8;
          cursor: pointer;
          transition: background 0.18s ease;
        }

        .cc-toggle-track::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          top: 3px;
          left: 3px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 6px rgba(8, 33, 38, 0.22);
          transition: transform 0.18s ease;
        }

        .cc-toggle input:checked + .cc-toggle-track {
          background: #1bafa3;
        }

        .cc-toggle input:checked + .cc-toggle-track::after {
          transform: translateX(20px);
        }

        .cc-toggle input:focus-visible + .cc-toggle-track {
          outline: 3px solid rgba(42, 193, 180, 0.34);
          outline-offset: 3px;
        }

        .cc-note {
          margin: 13px 0 0;
          padding: 12px 13px;
          color: #5f7479;
          border-radius: 11px;
          background: #edf4f2;
          font-size: 11px;
          line-height: 1.5;
        }

        .cc-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid #dce7e6;
        }

        .cc-modal-footer .cc-button.outline {
          color: #24474d;
          border-color: #cbd9d8;
          background: #fff;
        }

        @keyframes cc-enter {
          from { opacity: 0; transform: translate(-50%, 14px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        @keyframes cc-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 860px) {
          .cc-banner {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .cc-actions {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .cc-banner {
            bottom: max(10px, env(safe-area-inset-bottom));
            width: calc(100% - 20px);
            padding: 17px;
            border-radius: 16px;
          }

          .cc-copy-wrap {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 10px;
          }

          .cc-icon {
            width: 34px;
            height: 34px;
            border-radius: 10px;
          }

          .cc-banner h2 {
            font-size: 15px;
          }

          .cc-banner p {
            font-size: 11.5px;
          }

          .cc-actions {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .cc-button {
            width: 100%;
            min-height: 40px;
          }

          .cc-modal {
            max-height: calc(100vh - 20px);
            padding: 20px 16px;
            border-radius: 17px;
          }

          .cc-modal-head h2 {
            font-size: 20px;
          }

          .cc-option {
            padding: 14px;
          }

          .cc-modal-footer {
            align-items: stretch;
            flex-direction: column;
          }

          .cc-modal-footer a {
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-banner,
          .cc-overlay,
          .cc-banner *,
          .cc-overlay * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {bannerOpen && !settingsOpen && (
        <section className="cc-banner" role="dialog" aria-labelledby="cc-title" aria-describedby="cc-description">
          <div className="cc-copy-wrap">
            <span className="cc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8.5 3.5a3.5 3.5 0 0 0 4.2 4.2A3.5 3.5 0 0 0 17 12a3.5 3.5 0 0 0 3.4 4.2A9 9 0 1 1 8.5 3.5Z" /><circle cx="8" cy="13" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="7" cy="18" r=".8" /></svg>
            </span>
            <div>
              <h2 id="cc-title">A tua privacidade, sem letras pequenas</h2>
              <p id="cc-description">
                Utilizamos armazenamento essencial para o login, segurança e preferências da plataforma. Com a tua autorização, carregamos também o serviço externo de apoio Buy Me a Coffee. Podes recusar sem perder acesso à NOXVELIA.{' '}
                <Link to="/privacidade#cookies" onClick={() => setBannerOpen(false)}>Saber mais</Link>
              </p>
              {hasDecision && (
                <span className="cc-saved-choice">
                  Escolha guardada: serviços externos {preferences.external ? 'ativos' : 'desativados'}.
                </span>
              )}
            </div>
          </div>

          <div className="cc-actions">
            <button type="button" className="cc-button outline" onClick={() => persistChoice(false)}>Rejeitar opcionais</button>
            <button type="button" className="cc-button ghost" onClick={openSettings}>Gerir preferências</button>
            <button type="button" className="cc-button primary" onClick={() => persistChoice(true)}>Aceitar opcionais</button>
          </div>
        </section>
      )}

      {!bannerOpen && !settingsOpen && (
        <button type="button" className="cc-manage-trigger" onClick={openSettings} aria-label="Gerir preferências de cookies">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 3.5a3.5 3.5 0 0 0 4.2 4.2A3.5 3.5 0 0 0 17 12a3.5 3.5 0 0 0 3.4 4.2A9 9 0 1 1 8.5 3.5Z" /><circle cx="8" cy="13" r="1" /><circle cx="12" cy="17" r="1" /></svg>
          Cookies
        </button>
      )}

      {settingsOpen && (
        <div className="cc-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeSettings();
        }}>
          <section
            className="cc-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cc-settings-title"
            ref={dialogRef}
            tabIndex={-1}
          >
            <div className="cc-modal-head">
              <div>
                <h2 id="cc-settings-title">Preferências de privacidade</h2>
                <p>Escolhe o que pode ser guardado ou carregado no teu dispositivo. Os serviços opcionais ficam desligados até existir consentimento.</p>
              </div>
              <button type="button" className="cc-close" onClick={closeSettings} aria-label="Fechar preferências">×</button>
            </div>

            <div className="cc-options">
              <div className="cc-option">
                <div>
                  <strong>Armazenamento estritamente necessário</strong>
                  <p>Suporta autenticação, segurança e o registo desta decisão. Estas funções não podem ser desligadas no gestor de preferências.</p>
                </div>
                <span className="cc-required">Sempre ativo</span>
              </div>

              <div className="cc-option">
                <div>
                  <strong>Preferências funcionais</strong>
                  <p>Recordam a área Drive/Estate e o tema quando fazes essas escolhas. Não são usadas para seguir a navegação noutros sites.</p>
                </div>
                <span className="cc-required">Quando escolhes</span>
              </div>

              <label className="cc-option">
                <div>
                  <strong>Serviços externos e apoio</strong>
                  <p>Autoriza o carregamento do widget Buy Me a Coffee. Este terceiro pode utilizar cookies ou tecnologias próprias segundo a respetiva política.</p>
                </div>
                <span className="cc-toggle">
                  <input
                    type="checkbox"
                    checked={externalDraft}
                    onChange={(event) => setExternalDraft(event.target.checked)}
                    aria-label="Permitir serviços externos e apoio"
                  />
                  <span className="cc-toggle-track" aria-hidden="true" />
                </span>
              </label>
            </div>

            <p className="cc-note">
              A NOXVELIA não utiliza atualmente cookies próprios de analítica nem publicidade comportamental. Se isso mudar, esta gestão será atualizada antes de qualquer tecnologia opcional ser ativada.
            </p>

            <div className="cc-modal-footer">
              <Link to="/privacidade#cookies" onClick={() => { setSettingsOpen(false); setBannerOpen(false); }}>Política de cookies completa</Link>
              <div className="cc-actions">
                <button type="button" className="cc-button outline" onClick={() => persistChoice(false)}>Rejeitar opcionais</button>
                <button type="button" className="cc-button primary" onClick={() => persistChoice(externalDraft)}>Guardar escolhas</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
