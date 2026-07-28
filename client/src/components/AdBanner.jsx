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

  const isLandingPlacement = placement === 'landing_between_highlights';
  const bannerClassName = [
    'nx-ad-banner',
    `nx-ad-banner--${variant}`,
    isLandingPlacement ? 'nx-ad-banner--landing' : '',
    className,
  ].filter(Boolean).join(' ');
  const emptyCopy = useMemo(() => {
    const placementText = String(placement || '');
    const verticalText = String(vertical || '');
    const isAuto = verticalText === 'carro' || placementText.includes('carros');
    const isEstate = verticalText === 'imovel' || placementText.includes('imoveis');
    const verticalLabel = isAuto ? 'automóveis' : isEstate ? 'imóveis' : 'Noxvelia';

    if (isLandingPlacement) {
      return {
        label: 'Parcerias',
        eyebrow: 'Espaço patrocinado',
        title: 'Coloca a tua marca onde os compradores começam a pesquisa.',
        body: 'Ideal para stands, oficinas, crédito, seguros, imobiliárias e serviços locais. Reserva por 7, 14 ou 30 dias.',
        cta: 'Ver planos',
      };
    }

    if (variant === 'sidebar' || placementText.includes('detalhe_sidebar')) {
      return {
        label: 'Publicidade',
        eyebrow: 'Junto ao anúncio',
        title: 'A tua marca perto do contacto.',
        body: `Aparece na página de detalhe de ${verticalLabel}, numa zona de decisão do visitante.`,
        cta: 'Reservar lateral',
      };
    }

    if (variant === 'inline' || placementText.includes('feed_pesquisa')) {
      return {
        label: 'Publicidade',
        eyebrow: 'Entre resultados',
        title: `Patrocina o feed de ${verticalLabel}.`,
        body: 'Uma presença curta e visível sem interromper a pesquisa.',
        cta: 'Reservar espaço',
      };
    }

    if (placementText.includes('topo')) {
      return {
        label: 'Publicidade',
        eyebrow: 'Topo da listagem',
        title: `Ganha visibilidade antes dos resultados de ${verticalLabel}.`,
        body: 'Bom para campanhas locais, promoções e serviços ligados à compra.',
        cta: 'Ver preços',
      };
    }

    if (placementText.includes('fundo') || placementText.includes('sugestoes')) {
      return {
        label: 'Publicidade',
        eyebrow: 'Fim da página',
        title: 'Aparece quando o visitante continua a comparar opções.',
        body: 'Uma posição discreta para reforçar a tua marca sem pesar no site.',
        cta: 'Patrocinar',
      };
    }

    return {
      label: 'Publicidade',
      eyebrow: 'Espaço disponível',
      title: 'Anuncia neste espaço.',
      body: 'Escolhe a posição, adiciona imagem ou GIF e define a duração da campanha.',
      cta: 'Ver condições',
    };
  }, [isLandingPlacement, placement, vertical, variant]);
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
          className={bannerClassName}
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
        <aside className={bannerClassName} style={slotStyle} aria-label="Publicidade disponível">
          <Link className={`nx-ad-banner-card nx-ad-banner-empty${isLandingPlacement ? ' nx-ad-banner-empty-landing' : ''}`} to={sponsorshipUrl}>
            <span className="nx-ad-banner-label">{emptyCopy.label}</span>
            <span className="nx-ad-empty-layout">
              <span className="nx-ad-empty-copy">
                <span className="nx-ad-empty-eyebrow">{emptyCopy.eyebrow}</span>
                <strong>{emptyCopy.title}</strong>
                <span className="nx-ad-empty-body">{emptyCopy.body}</span>
              </span>
              <span className="nx-ad-empty-preview" aria-hidden="true">
                <span className="nx-ad-preview-media" />
                <span className="nx-ad-preview-lines"><i /><i /><i /></span>
              </span>
              <span className="nx-ad-empty-cta">{emptyCopy.cta}</span>
            </span>
          </Link>
        </aside>
      </>
    );
  }

  return (
    <>
      <AdBannerStyles />
      <aside className={bannerClassName} style={slotStyle} aria-label="Publicidade">
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
      /* Layout profissional para espaços vendidos diretamente. */
      .nx-ad-banner-card {
        border-radius: 8px;
        box-shadow: none;
      }
      .nx-ad-banner-empty {
        align-items: stretch;
        justify-content: stretch;
        padding: 18px;
        border-style: solid;
        background: #fffaf0;
      }
      .nx-ad-empty-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(180px, 260px) auto;
        width: 100%;
        gap: 16px;
        align-items: center;
      }
      .nx-ad-empty-layout > * {
        min-width: 0;
      }
      .nx-ad-empty-layout .nx-ad-empty-copy {
        display: grid;
        justify-content: start;
        justify-items: start;
        gap: 6px;
        color: #071326;
        text-align: left;
      }
      .nx-ad-empty-layout .nx-ad-empty-copy strong {
        color: #071326;
        font-size: clamp(17px, 1.8vw, 22px);
        font-weight: 950;
        letter-spacing: 0;
        line-height: 1.08;
        text-transform: none;
      }
      .nx-ad-empty-layout .nx-ad-empty-copy > span {
        display: block;
        min-height: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
      }
      .nx-ad-empty-eyebrow {
        color: #9b7b3f !important;
        font-size: 10px !important;
        font-weight: 950 !important;
        letter-spacing: .08em !important;
        line-height: 1.1 !important;
        text-transform: uppercase !important;
      }
      .nx-ad-empty-body {
        max-width: 620px;
        color: #53667a !important;
        font-size: 13px !important;
        font-weight: 680 !important;
        line-height: 1.42 !important;
      }
      .nx-ad-empty-preview {
        min-height: 82px;
        display: grid;
        grid-template-columns: 78px minmax(0, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        border: 1px solid rgba(7, 19, 38, .12);
        border-radius: 8px;
        background: #ffffff;
      }
      .nx-ad-preview-media {
        display: block;
        width: 100%;
        height: 58px;
        border-radius: 7px;
        background: linear-gradient(135deg, #d9c49c, #fff4d8 54%, #102f50);
      }
      .nx-ad-preview-lines {
        display: grid;
        gap: 7px;
      }
      .nx-ad-preview-lines i {
        display: block;
        height: 8px;
        border-radius: 999px;
        background: rgba(7, 19, 38, .15);
      }
      .nx-ad-preview-lines i:nth-child(1) { width: 86%; }
      .nx-ad-preview-lines i:nth-child(2) { width: 68%; }
      .nx-ad-preview-lines i:nth-child(3) { width: 44%; background: rgba(217, 196, 156, .7); }
      .nx-ad-empty-cta {
        justify-self: end;
        display: inline-flex;
        min-height: 40px;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 8px;
        background: #071326;
        color: #fffaf0;
        font-size: 12px;
        font-weight: 950;
        white-space: nowrap;
      }
      .nx-ad-banner-empty:hover .nx-ad-empty-cta {
        background: #102f50;
      }
      .nx-ad-banner--landing {
        max-width: 1200px;
        width: min(1200px, calc(100% - 44px));
        margin: 34px auto 8px;
      }
      .nx-ad-banner--landing .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 172px) !important;
      }
      .nx-ad-banner--landing .nx-ad-banner-empty {
        padding: 20px;
        background: linear-gradient(135deg, #071326 0%, #102f50 62%, #fffaf0 62%, #fffaf0 100%) !important;
        border-color: rgba(217, 196, 156, .34);
      }
      .nx-ad-banner--landing .nx-ad-banner-label {
        background: rgba(255, 250, 240, .96);
        color: #071326;
      }
      .nx-ad-banner--landing .nx-ad-empty-layout {
        grid-template-columns: minmax(0, 1.1fr) minmax(240px, 340px) auto;
        gap: 20px;
      }
      .nx-ad-banner--landing .nx-ad-empty-copy {
        padding-top: 28px;
      }
      .nx-ad-banner--landing .nx-ad-empty-copy strong {
        max-width: 680px;
        color: #fffaf0;
        font-size: clamp(23px, 2.8vw, 36px);
      }
      .nx-ad-banner--landing .nx-ad-empty-eyebrow,
      .nx-ad-banner--landing .nx-ad-empty-body {
        color: rgba(255, 250, 240, .78) !important;
      }
      .nx-ad-banner--landing .nx-ad-empty-preview {
        min-height: 112px;
        background: rgba(255, 250, 240, .96);
        box-shadow: 0 18px 38px -34px rgba(0, 0, 0, .75);
      }
      .nx-ad-banner--landing .nx-ad-empty-cta {
        background: #d9c49c;
        color: #071326;
      }
      .nx-ad-banner--landing .nx-ad-banner-direct img {
        max-height: 320px;
      }
      .nx-ad-banner--inline {
        margin: 10px 0 12px;
      }
      .nx-ad-banner--inline .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 96px) !important;
      }
      .nx-ad-banner--inline .nx-ad-banner-empty {
        padding: 14px 16px;
      }
      .nx-ad-banner--inline .nx-ad-empty-layout {
        grid-template-columns: minmax(0, 1fr) auto;
      }
      .nx-ad-banner--inline .nx-ad-empty-preview {
        display: none;
      }
      .nx-ad-banner--inline .nx-ad-empty-copy strong {
        font-size: 16px;
      }
      .nx-ad-banner--inline .nx-ad-empty-body {
        font-size: 12px !important;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 210px) !important;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-empty {
        padding: 40px 14px 14px;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-layout {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-preview {
        min-height: 96px;
        grid-template-columns: 1fr;
      }
      .nx-ad-banner--sidebar .nx-ad-preview-lines {
        display: none;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-cta {
        justify-self: stretch;
        width: 100%;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-copy strong {
        font-size: 18px;
      }
      .pesquisa-top-ad .nx-ad-banner-card,
      .pesquisa-bottom-ad .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 110px) !important;
      }
      .dark .nx-ad-empty-layout .nx-ad-empty-copy strong {
        color: #fffaf0 !important;
      }
      .dark .nx-ad-empty-body,
      .dark .nx-ad-empty-layout .nx-ad-empty-copy > span {
        color: rgba(255, 250, 240, .76) !important;
      }
      .dark .nx-ad-empty-eyebrow {
        color: #f0dfbb !important;
      }
      .dark .nx-ad-empty-preview {
        background: #071326 !important;
        border-color: rgba(217, 196, 156, .22) !important;
      }
      .dark .nx-ad-preview-lines i {
        background: rgba(255, 250, 240, .16);
      }
      .dark .nx-ad-preview-lines i:nth-child(3) {
        background: rgba(217, 196, 156, .72);
      }
      .dark .nx-ad-empty-cta {
        background: #d9c49c !important;
        color: #071326 !important;
      }
      .dark .nx-ad-banner--landing .nx-ad-banner-empty {
        background: linear-gradient(135deg, #040b16 0%, #102f50 62%, #0d1d33 62%, #0d1d33 100%) !important;
        border-color: rgba(217, 196, 156, .3) !important;
      }
      /* Correções anti-overlap: o selo de publicidade nunca pode tapar texto. */
      .nx-ad-banner-empty {
        flex-direction: column !important;
        gap: 10px !important;
        padding: 16px 18px !important;
      }
      .nx-ad-banner-empty > .nx-ad-banner-label {
        position: static !important;
        inset: auto !important;
        align-self: flex-start !important;
        background: #fffaf0 !important;
        border-color: rgba(217, 196, 156, .74) !important;
        color: #071326 !important;
      }
      .nx-ad-banner-empty .nx-ad-empty-layout {
        align-items: center !important;
      }
      .nx-ad-banner--landing .nx-ad-banner-empty {
        padding: 20px !important;
      }
      .nx-ad-banner--landing .nx-ad-empty-copy {
        padding-top: 0 !important;
      }
      .nx-ad-banner--inline .nx-ad-banner-empty,
      .nx-ad-banner--sidebar .nx-ad-banner-empty {
        padding: 14px !important;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-label {
        align-self: flex-start !important;
      }
      .dark .nx-ad-banner-empty > .nx-ad-banner-label {
        background: #fffaf0 !important;
        border-color: rgba(217, 196, 156, .74) !important;
        color: #071326 !important;
      }
      @media (max-width: 640px) {
        .nx-ad-banner {
          margin: 14px auto;
        }
        .nx-ad-banner-empty {
          padding: 10px !important;
          gap: 8px !important;
        }
        .nx-ad-banner-empty > .nx-ad-banner-label {
          position: static !important;
          min-height: 20px !important;
          padding: 0 8px !important;
          font-size: 8px !important;
        }
        .nx-ad-empty-layout,
        .nx-ad-banner--landing .nx-ad-empty-layout,
        .nx-ad-banner--inline .nx-ad-empty-layout,
        .nx-ad-banner--sidebar .nx-ad-empty-layout {
          grid-template-columns: 1fr !important;
          gap: 8px !important;
        }
        .nx-ad-empty-preview {
          display: none !important;
        }
        .nx-ad-empty-layout .nx-ad-empty-copy strong {
          font-size: 13px !important;
          line-height: 1.12 !important;
        }
        .nx-ad-empty-body {
          font-size: 11px !important;
          line-height: 1.35 !important;
        }
        .nx-ad-empty-cta {
          justify-self: stretch !important;
          width: 100% !important;
          min-height: 32px !important;
          font-size: 11px !important;
        }
        .nx-ad-banner--landing .nx-ad-banner-card {
          min-height: max(var(--nx-ad-mobile-min-height), 132px) !important;
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
        .nx-ad-empty-layout .nx-ad-empty-copy > span {
          display: block !important;
          min-height: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
        }
        .nx-ad-banner-empty .nx-ad-empty-layout {
          width: 100% !important;
        }        .nx-ad-banner-adsense {
          padding: 8px;
        }
        .nx-ad-banner-adsense .adsbygoogle {
          min-height: var(--nx-ad-mobile-min-height) !important;
        }
      }
    `}</style>
  );
}

