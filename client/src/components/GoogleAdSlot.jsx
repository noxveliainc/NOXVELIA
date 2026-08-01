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
  mobileMinHeight = Math.min(minHeight, 56),
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

  const slotStyle = {
    '--nx-ad-min-height': `${minHeight}px`,
    '--nx-ad-mobile-min-height': `${mobileMinHeight}px`,
  };

  return (
    <>
      <style>{`
        .nx-ad-slot .adsbygoogle { min-height: var(--nx-ad-min-height); }
        @media (max-width: 640px) {
          .nx-ad-slot { margin-top: 12px !important; margin-bottom: 14px !important; padding-left: 0 !important; padding-right: 0 !important; }
          .nx-ad-slot-card { border-radius: 12px !important; padding: 8px !important; }
          .nx-ad-slot-label { margin-bottom: 4px !important; font-size: 9px !important; }
          .nx-ad-slot .adsbygoogle { min-height: var(--nx-ad-mobile-min-height) !important; }
        }
      `}</style>
      <aside className={`nx-ad-slot mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 ${className}`} style={slotStyle} aria-label="Publicidade">
        <div className="nx-ad-slot-card overflow-hidden rounded-xl border border-slate-200/80 bg-white p-3">
          <div className="nx-ad-slot-label mb-2 text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">Publicidade</div>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', minHeight: 'var(--nx-ad-min-height)' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
            data-adtest={ADSENSE_TEST_MODE ? 'on' : undefined}
          />
        </div>
      </aside>
    </>
  );
}