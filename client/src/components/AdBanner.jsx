import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useCookieConsent from '../hooks/useCookieConsent';
import api from '../services/api';
import {
  ADSENSE_CLIENT,
  ADSENSE_TEST_MODE,
  blocksAdsByPrivacySignal,
  ensureAdsenseScript,
  getAdsenseSlot,
  isAdsenseConfigured,
} from '../utils/googleAdsense';

export default function AdBanner({
  placement,
  adsensePlacement = placement,
  vertical = '',
  mode = 'hybrid',
  className = '',
  minHeight = 96,
  mobileMinHeight = Math.min(minHeight, 56),
  format = 'auto',
  variant = 'full',
  showEmpty = true,
}) {
  const consent = useCookieConsent();
  const adRef = useRef(null);
  const directRef = useRef(null);
  const pushedRef = useRef(false);
  const impressionRef = useRef('');
  const [directBanner, setDirectBanner] = useState(null);
  const [directLoading, setDirectLoading] = useState(mode !== 'adsense');
  const [adsenseFailed, setAdsenseFailed] = useState(false);

  const slot = getAdsenseSlot(adsensePlacement);
  const sponsorshipUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (placement) params.set('posicao', placement);
    if (vertical) params.set('vertical', vertical);
    return `/patrocinios${params.toString() ? `?${params.toString()}` : ''}`;
  }, [placement, vertical]);

  const canLoadDirect = mode !== 'adsense' && placement;
  const canLoadAdsense = mode !== 'direct'
    && isAdsenseConfigured
    && slot
    && consent?.external === true
    && !blocksAdsByPrivacySignal()
    && !directBanner
    && !directLoading;

  useEffect(() => {
    if (!canLoadDirect) {
      setDirectLoading(false);
      setDirectBanner(null);
      return undefined;
    }

    const controller = new AbortController();
    setDirectLoading(true);

    api.get('/banners/ativo', {
      params: { posicao: placement, vertical },
      signal: controller.signal,
    })
      .then(({ data }) => setDirectBanner(data?.banner || null))
      .catch((error) => {
        if (error.name !== 'CanceledError' && error.code !== 'ERR_CANCELED') {
          setDirectBanner(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setDirectLoading(false);
      });

    return () => controller.abort();
  }, [canLoadDirect, placement, vertical]);

  useEffect(() => {
    pushedRef.current = false;
    setAdsenseFailed(false);
  }, [adsensePlacement, placement, slot]);

  useEffect(() => {
    if (!canLoadAdsense || pushedRef.current) return undefined;

    let cancelled = false;
    ensureAdsenseScript()
      .then(() => {
        if (cancelled || pushedRef.current || !adRef.current) return;
        try {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          pushedRef.current = true;
        } catch {
          setAdsenseFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setAdsenseFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [canLoadAdsense, adsensePlacement, placement, slot]);

  useEffect(() => {
    if (!directBanner?._id || !directRef.current) return undefined;
    const node = directRef.current;

    const registarImpressao = () => {
      if (impressionRef.current === directBanner._id) return;
      impressionRef.current = directBanner._id;
      api.post(`/banners/${directBanner._id}/impressao`).catch(() => {});
    };

    if (!('IntersectionObserver' in window)) {
      registarImpressao();
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35)) {
        registarImpressao();
        observer.disconnect();
      }
    }, { threshold: [0.35] });

    observer.observe(node);
    return () => observer.disconnect();
  }, [directBanner?._id]);

  const slotStyle = {
    '--nx-ad-min-height': `${minHeight}px`,
    '--nx-ad-mobile-min-height': `${mobileMinHeight}px`,
  };

  const registarClique = () => {
    if (!directBanner?._id) return;
    api.post(`/banners/${directBanner._id}/clique`).catch(() => {});
  };

  if (directBanner) {
    return (
      <>
        <AdBannerStyles />
        <aside
          ref={directRef}
          className={`nx-ad-banner nx-ad-banner--${variant} ${className}`}
          style={slotStyle}
          aria-label="Publicidade"
        >
          <a
            className="nx-ad-banner-card nx-ad-banner-direct"
            href={directBanner.linkDestino}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={registarClique}
          >
            <span className="nx-ad-banner-label">Publicidade</span>
            <img src={directBanner.imagemUrl} alt={directBanner.titulo} loading="lazy" />
            <span className="nx-ad-banner-caption">
              <strong>{directBanner.titulo}</strong>
              <span>Patrocínio direto</span>
            </span>
          </a>
        </aside>
      </>
    );
  }

  if (!canLoadAdsense || adsenseFailed) {
    if (!showEmpty || directLoading) return null;

    return (
      <>
        <AdBannerStyles />
        <aside className={`nx-ad-banner nx-ad-banner--${variant} ${className}`} style={slotStyle} aria-label="Publicidade disponível">
          <Link className="nx-ad-banner-card nx-ad-banner-empty" to={sponsorshipUrl}>
            <span className="nx-ad-banner-label">Publicidade</span>
            <span className="nx-ad-empty-copy">
              <strong>Anunciar neste espaço</strong>
              <span>Ver condições</span>
            </span>
          </Link>
        </aside>
      </>
    );
  }

  return (
    <>
      <AdBannerStyles />
      <aside className={`nx-ad-banner nx-ad-banner--${variant} ${className}`} style={slotStyle} aria-label="Publicidade">
        <div className="nx-ad-banner-card nx-ad-banner-adsense">
          <div className="nx-ad-banner-label">Publicidade</div>
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

function AdBannerStyles() {
  return (
    <style>{`
      .nx-ad-banner {
        width: 100%;
        max-width: 1180px;
        margin: 24px auto;
      }
      .nx-ad-banner--inline {
        grid-column: 1 / -1;
        margin: 6px 0 10px;
        max-width: none;
      }
      .nx-ad-banner--sidebar {
        margin: 0;
        max-width: none;
      }
      .nx-ad-banner-card {
        position: relative;
        display: block;
        overflow: hidden;
        min-height: var(--nx-ad-min-height);
        border: 1px solid rgba(7, 19, 38, 0.12);
        border-radius: 14px;
        background: #ffffff;
        color: #071326;
        text-decoration: none;
      }
      .nx-ad-banner-label {
        position: absolute;
        top: 10px;
        left: 12px;
        z-index: 2;
        display: inline-flex;
        min-height: 22px;
        align-items: center;
        border-radius: 999px;
        background: rgba(255, 250, 240, 0.92);
        border: 1px solid rgba(217, 196, 156, 0.55);
        color: #596b7c;
        padding: 0 9px;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .nx-ad-banner-empty {
        display: flex;
        min-height: var(--nx-ad-min-height);
        align-items: center;
        justify-content: center;
        padding: 38px 18px 18px;
        border-style: dashed;
        background: linear-gradient(135deg, #fffaf0 0%, #ffffff 66%, rgba(217, 196, 156, .24) 100%);
        transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
      }
      .nx-ad-banner-empty:hover {
        border-color: rgba(157, 123, 63, .52);
        box-shadow: 0 18px 44px -34px rgba(7, 19, 38, .42);
        transform: translateY(-1px);
      }
      .nx-ad-empty-copy {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: #071326;
        text-align: center;
      }
      .nx-ad-empty-copy strong {
        font-size: 12px;
        line-height: 1.2;
        font-weight: 950;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .nx-ad-empty-copy span {
        display: inline-flex;
        min-height: 30px;
        align-items: center;
        border-radius: 999px;
        border: 1px solid rgba(217, 196, 156, .78);
        background: rgba(217, 196, 156, .24);
        color: #102f50;
        padding: 0 12px;
        font-size: 11px;
        font-weight: 900;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-copy {
        flex-direction: column;
        gap: 8px;
      }
      .nx-ad-banner-direct img {
        display: block;
        width: 100%;
        min-height: var(--nx-ad-min-height);
        max-height: 260px;
        object-fit: cover;
        background: #f4efe5;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-direct img {
        max-height: none;
        aspect-ratio: 4 / 3;
      }
      .nx-ad-banner-caption {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-end;
        padding: 38px 16px 14px;
        background: linear-gradient(0deg, rgba(7, 19, 38, .84), rgba(7, 19, 38, 0));
        color: #fffaf0;
      }
      .nx-ad-banner-caption strong {
        font-size: 15px;
        line-height: 1.2;
        font-weight: 900;
      }
      .nx-ad-banner-caption span {
        flex: 0 0 auto;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #f0dfbb;
      }
      .nx-ad-banner-adsense {
        padding: 12px;
      }
      .nx-ad-banner-adsense .adsbygoogle {
        min-height: var(--nx-ad-min-height);
      }
      .dark .nx-ad-banner-card {
        background: #071326;
        border-color: rgba(240, 223, 187, 0.16);
        color: #fffaf0;
      }
      .dark .nx-ad-banner-label {
        background: rgba(7, 19, 38, .86);
        border-color: rgba(217, 196, 156, .42);
        color: #f0dfbb;
      }
      .dark .nx-ad-banner-empty {
        background: linear-gradient(135deg, #071326 0%, #0d1d33 70%, rgba(217, 196, 156, .12) 100%);
        border-color: rgba(240, 223, 187, .22);
      }
      .dark .nx-ad-banner-empty:hover {
        border-color: rgba(240, 223, 187, .42);
        box-shadow: 0 18px 44px -32px rgba(0, 0, 0, .7);
      }
      .dark .nx-ad-empty-copy {
        color: #fffaf0;
      }
      .dark .nx-ad-empty-copy span {
        background: rgba(217, 196, 156, .14);
        border-color: rgba(240, 223, 187, .3);
        color: #f0dfbb;
      }
      @media (max-width: 640px) {
        .nx-ad-banner {
          margin: 14px auto;
        }
        .nx-ad-banner-card {
          min-height: var(--nx-ad-mobile-min-height);
          border-radius: 12px;
        }
        .nx-ad-banner-empty {
          min-height: max(var(--nx-ad-mobile-min-height), 62px);
          padding: 30px 10px 10px;
        }
        .nx-ad-empty-copy {
          flex-wrap: wrap;
          gap: 6px;
        }
        .nx-ad-empty-copy strong {
          font-size: 10px;
        }
        .nx-ad-empty-copy span {
          min-height: 24px;
          padding: 0 9px;
          font-size: 10px;
        }
        .nx-ad-banner-direct img {
          min-height: var(--nx-ad-mobile-min-height);
          max-height: 150px;
        }
        .nx-ad-banner-caption {
          padding: 30px 12px 11px;
        }
        .nx-ad-banner-caption strong {
          font-size: 13px;
        }
        .nx-ad-banner-caption span {
          display: none;
        }
        .nx-ad-banner-adsense {
          padding: 8px;
        }
        .nx-ad-banner-adsense .adsbygoogle {
          min-height: var(--nx-ad-mobile-min-height) !important;
        }
      }
    `}</style>
  );
}
