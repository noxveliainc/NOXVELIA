import { useEffect, useRef, useState } from 'react';
import useCookieConsent from '../hooks/useCookieConsent';
import {
  ADSENSE_CLIENT,
  ADSENSE_TEST_MODE,
  blocksAdsByPrivacySignal,
  ensureAdsenseScript,
  getAdsenseSlot,
  isAdsenseConfigured,
} from '../utils/googleAdsense';

export default function GoogleAdSlot({
  placement,
  className = '',
  minHeight = 96,
  format = 'auto',
}) {
  const consent = useCookieConsent();
  const slot = getAdsenseSlot(placement);
  const adRef = useRef(null);
  const pushedRef = useRef(false);
  const [failed, setFailed] = useState(false);

  const enabled = isAdsenseConfigured
    && slot
    && consent?.external === true
    && !blocksAdsByPrivacySignal();

  useEffect(() => {
    if (!enabled || pushedRef.current) return undefined;

    let cancelled = false;
    ensureAdsenseScript()
      .then(() => {
        if (cancelled || pushedRef.current || !adRef.current) return;
        try {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          pushedRef.current = true;
        } catch {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, placement, slot]);

  if (!enabled || failed) return null;

  return (
    <aside className={`mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 ${className}`} aria-label="Publicidade">
      <div className="overflow-hidden rounded-[18px] border border-slate-200/80 bg-white/90 p-3 shadow-[0_16px_42px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-900/80">
        <div className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Publicidade</div>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
          data-adtest={ADSENSE_TEST_MODE ? 'on' : undefined}
        />
      </div>
    </aside>
  );
}
