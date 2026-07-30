import React, { useEffect, useRef } from 'react';

export const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
export const turnstileAvailable = Boolean(turnstileSiteKey);

let turnstileScriptPromise = null;

const loadTurnstileScript = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('Browser indisponível.'));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-noxvelia-turnstile="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.turnstile), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.noxveliaTurnstile = 'true';
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => reject(new Error('Não foi possível carregar a verificação de segurança.'));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
};

export default function TurnstileWidget({ value, onChange, action = 'auth' }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    if (!turnstileAvailable || !containerRef.current) return undefined;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: turnstileSiteKey,
          action,
          theme: 'light',
          callback: (token) => onChange?.(token || ''),
          'expired-callback': () => onChange?.(''),
          'error-callback': () => onChange?.(''),
        });
      })
      .catch(() => onChange?.(''));

    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current !== null) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* noop */ }
      }
      widgetIdRef.current = null;
      onChange?.('');
    };
  }, [action, onChange]);

  if (!turnstileAvailable) return null;

  return (
    <div className="auth-turnstile" aria-label="Verificação de segurança">
      <div ref={containerRef} />
      {!value && <small>Confirma a verificação de segurança para continuar.</small>}
    </div>
  );
}
