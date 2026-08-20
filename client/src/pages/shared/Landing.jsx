import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Car, CheckCircle2, Home as HomeIcon, MapPin, Newspaper, ShieldCheck } from 'lucide-react';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import NavbarLanding from './NavbarLanding';
import api from '../../services/api';
import { getImageUrl } from '../../utils/images';
import { anuncioPath, homePageJsonLd, siteIdentityJsonLd } from '../../utils/seo';
import { useAuth } from '../../context/AuthContext';
import { publishIntentState } from '../../utils/navigationState';
import { trackFunnelEvent } from '../../utils/funnelAnalytics';
import { COOKIE_CONSENT_CHANGED_EVENT, readCookieConsent } from '../../utils/cookieConsent';
import './Landing.css';

const CARVERTICAL_URL = 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';
const TRUST_POINTS = [
  { texto: 'Publicação gratuita' },
  { texto: 'Contacto direto, sem intermediários' },
  { texto: 'Todos os distritos de Portugal' },
];

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const formatarMoeda = (valor) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valor || 0);
const formatarDataCurta = (valor) => { const data = valor ? new Date(valor) : null; return data && !Number.isNaN(data.getTime()) ? new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short' }).format(data) : ''; };

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signed } = useAuth();
  const landingViewTrackedRef = useRef(false);
  const heroTitleRef = useRef(null);
  const aosRef = useRef(null);
  const animeRef = useRef(null);
  
  const publicarTo = signed ? '/publicar' : '/login';
  const publicarState = signed ? undefined : publishIntentState(location, '/');
  
  const [exemplos, setExemplos] = useState({ carro: [], imovel: [] });
  const [resumoPublico, setResumoPublico] = useState(null);
  const [noticiasMercado, setNoticiasMercado] = useState([]);

  const temProfissionaisAtivos = Number(resumoPublico?.profissionais || 0) > 0;

  const carregarAnime = () => {
    if (!animeRef.current) animeRef.current = import('animejs').then((modulo) => modulo.animate);
    return animeRef.current;
  };

  const animarCta = (evento) => {
    if (prefersReducedMotion()) return;
    const alvo = evento.currentTarget;
    carregarAnime()
      .then((animateFn) => animateFn(alvo, { scale: [1, 1.018, 1], duration: 320, ease: 'outQuad' }))
      .catch(() => {});
  };

  useEffect(() => {
    let ativo = true;
    Promise.all([import('aos'), import('aos/dist/aos.css')])
      .then(([modulo]) => {
        if (!ativo) return;
        const aos = modulo.default;
        aos.init({ duration: 420, easing: 'ease-out-cubic', once: true, offset: 72, disable: prefersReducedMotion });
        aosRef.current = aos;
      })
      .catch(() => {});
    return () => { ativo = false; };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !heroTitleRef.current) return undefined;
    let ativo = true;
    carregarAnime()
      .then((animateFn) => {
        if (ativo && heroTitleRef.current) animateFn(heroTitleRef.current, { opacity: [0, 1], y: [10, 0], duration: 520, ease: 'outQuad' });
      })
      .catch(() => {});
    return () => { ativo = false; };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => aosRef.current?.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [exemplos.carro.length, exemplos.imovel.length, noticiasMercado.length]);

  useEffect(() => {
    const trackLandingViewOnce = () => {
      if (landingViewTrackedRef.current) return;
      if (readCookieConsent()?.external !== true) return;
      landingViewTrackedRef.current = true;
      trackFunnelEvent('landing_view');
    };
    trackLandingViewOnce();
    const onConsentChanged = (event) => {
      if (event?.detail?.external === true || readCookieConsent()?.external === true) trackLandingViewOnce();
    };
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onConsentChanged);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, onConsentChanged);
  }, []);

  useEffect(() => {
    let ativo = true;
    api.get('/anuncios/resumo-publico').then(({ data }) => { if (ativo) setResumoPublico(data || null); }).catch(() => { if (ativo) setResumoPublico(null); });
    
    api.get('/market-news?limit=6')
      .then(({ data }) => { if (ativo) setNoticiasMercado(Array.isArray(data?.items) ? data.items : []); })
      .catch(() => { if (ativo) setNoticiasMercado([]); });

    const carregarExemplos = async () => {
      try {
        const { data } = await api.get('/anuncios/em-alta/semana');
        if (!ativo) return;
        // Limitamos a 4 anúncios para manter a grelha simétrica
        setExemplos({ carro: (data?.carro || []).slice(0, 4), imovel: (data?.imovel || []).slice(0, 4) });
      } catch {
        if (ativo) setExemplos({ carro: [], imovel: [] });
      }
    };
    carregarExemplos();

    return () => { ativo = false; };
  }, []);

  const abrirExemplo = (anuncio, origem) => {
    try { localStorage.setItem('@App:contexto_visual', origem === '/carros' ? 'carro' : 'imovel'); } catch { /* silenciado */ }
    navigate(anuncioPath(anuncio));
  };

  const renderAnuncio = (anuncio, origem) => {
    const isCarro = anuncio.tipo === 'carro';
    const foto = getImageUrl(anuncio.fotos?.[0] || anuncio.imagens?.[0], 'medium');
    const detalhe = isCarro
      ? [anuncio.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null, anuncio.carro?.combustivel].filter(Boolean).join(' · ')
      : [anuncio.imovel?.tipologia || anuncio.imovel?.tipoImovel, anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null].filter(Boolean).join(' · ');

    return (
      <button type="button" key={anuncio._id} className="lp-listing-card" onClick={() => abrirExemplo(anuncio, origem)}>
        <span className="lp-listing-img">{foto ? <img src={foto} width="800" height="600" alt={anuncio.titulo} loading="lazy" /> : <span className={`lp-listing-no-photo ${isCarro ? 'is-carro' : 'is-imovel'}`}>{isCarro ? <Car size={34} /> : <HomeIcon size={34} />}<em>Sem foto</em></span>}<span className="lp-listing-tag">{isCarro ? 'Automóvel' : 'Imóvel'}</span></span>
        <span className="lp-listing-body"><span className="lp-listing-price">{formatarMoeda(anuncio.preco)}</span><span className="lp-listing-title">{anuncio.titulo}</span><span className="lp-listing-meta">{detalhe || (isCarro ? 'Dados técnicos disponíveis' : 'Detalhes do imóvel')}</span><span className="lp-listing-location"><MapPin size={12} strokeWidth={2.4} aria-hidden="true" /> {anuncio.localizacao?.cidade || 'Portugal'}</span></span>
      </button>
    );
  };

  return (
    <div className="lp-root">
      <Seo title="Noxvelia | Plataforma de automóveis e imóveis em Portugal" description="Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de automóveis e imóveis." path="/" jsonLd={[siteIdentityJsonLd, homePageJsonLd]} />
      <NavbarLanding />
      <main>
        {/* HERO LIMPO SEM FORMULÁRIO */}
        <section className="lp-hero" aria-labelledby="lp-title">
          <img className="lp-hero-bg" src="/noxvelia-hero-coast.webp" alt="" aria-hidden="true" />
          <div className="lp-shell" style={{ width: 'min(100% - clamp(40px, 6vw, 96px), 900px)', margin: '0 auto', textAlign: 'center' }}>
            <div className="lp-hero-copy" style={{ margin: '0 auto', justifyItems: 'center' }}>
              <span className="lp-kicker lp-hero-kicker">Pesquisa em Portugal</span>
              <h1 id="lp-title" ref={heroTitleRef} style={{ textAlign: 'center' }}>Automóveis e imóveis, sem intermediários.</h1>
              <p style={{ textAlign: 'center' }}>Fala diretamente com quem anuncia, sem comissões pelo caminho. Encontra o teu próximo carro ou casa.</p>
              
              <div className="lp-hero-actions" aria-label="Ações principais" style={{ justifyContent: 'center', marginTop: '12px' }}>
                <Link className="lp-main-cta" to="/carros">Explorar Automóveis</Link>
                <Link className="lp-soft-cta" to="/imoveis">Explorar Imóveis</Link>
              </div>
              
              <ul className="lp-trust-row" style={{ justifyContent: 'center', marginTop: '18px' }}>
                {TRUST_POINTS.map((ponto) => <li key={ponto.texto}><CheckCircle2 size={15} strokeWidth={2.4} aria-hidden="true" /> {ponto.texto}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* NOXVELIA DRIVE (CARROS) */}
        {exemplos.carro.length > 0 && (
          <section className="lp-section lp-listing-section" id="drive" aria-labelledby="lp-drive" data-aos="fade-up">
            <div className="lp-shell">
              <div className="lp-section-head">
                <div><span className="lp-kicker"><Car size={14} /> Noxvelia Drive</span><h2 id="lp-drive">Automóveis em destaque</h2></div>
              </div>
              <div className="lp-montra-grid">
                {exemplos.carro.map((anuncio) => renderAnuncio(anuncio, '/carros'))}
              </div>
              <div className="lp-montra-footer">
                <Link className="lp-secondary-button" to="/carros">Ver mais em Noxvelia Drive <ArrowRight size={16} /></Link>
              </div>
            </div>
          </section>
        )}

        {/* NOXVELIA ESTATE (IMÓVEIS) */}
        {exemplos.imovel.length > 0 && (
          <section className="lp-section lp-listing-section" style={{ borderTop: 'none', paddingTop: 0 }} id="estate" aria-labelledby="lp-estate" data-aos="fade-up">
            <div className="lp-shell">
              <div className="lp-section-head">
                <div><span className="lp-kicker"><HomeIcon size={14} /> Noxvelia Estate</span><h2 id="lp-estate">Imóveis em destaque</h2></div>
              </div>
              <div className="lp-montra-grid">
                {exemplos.imovel.map((anuncio) => renderAnuncio(anuncio, '/imoveis'))}
              </div>
              <div className="lp-montra-footer">
                <Link className="lp-secondary-button" to="/imoveis">Ver mais em Noxvelia Estate <ArrowRight size={16} /></Link>
              </div>
            </div>
          </section>
        )}

        {/* NOTÍCIAS (MANTIDO) */}
        {noticiasMercado.length > 0 && (
          <section className="lp-section lp-news-section" id="atualidade" aria-labelledby="lp-news" data-aos="fade-up">
            <div className="lp-shell">
              <div className="lp-section-head">
                <div><span className="lp-kicker"><Newspaper size={13} /> Atualidade</span><h2 id="lp-news">Mercado em Portugal</h2><p className="lp-section-copy">Notícias recentes sobre automóveis, habitação e crédito.</p></div>
              </div>
              <div className="lp-news-grid">
                {noticiasMercado.map((noticia) => {
                  const dataNoticia = formatarDataCurta(noticia.publishedAt);
                  return (
                    <a className="lp-news-card" href={noticia.url} target="_blank" rel="noopener noreferrer" key={noticia.id || noticia.url}>
                      <span className={`lp-news-pill ${noticia.vertical === 'automoveis' ? 'cars' : 'homes'}`}>{noticia.verticalLabel || 'Mercado'}</span>
                      <h3>{noticia.title}</h3>
                      {noticia.summary && <p>{noticia.summary}</p>}
                      <span className="lp-news-meta">{noticia.source}{dataNoticia ? ` · ${dataNoticia}` : ''}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ANUNCIAR / VENDER */}
        <section className="lp-section lp-sell-section" id="anunciar" aria-labelledby="lp-sell" data-aos="fade-up">
          <div className="lp-shell lp-sell-box">
            <div><span className="lp-kicker">Anunciar</span><h2 id="lp-sell">Tens algo para vender?</h2><p>Publica grátis e recebe contactos diretamente no teu anúncio.</p></div>
            <div className="lp-sell-actions">
              <Link className="lp-main-cta" to={publicarTo} state={publicarState} onPointerEnter={animarCta}>Criar anúncio <ArrowRight size={16} /></Link>
              {temProfissionaisAtivos && <Link className="lp-soft-cta" to="/profissionais"><Building2 size={16} /> Ver profissionais</Link>}
            </div>
          </div>
        </section>

        {/* CARVERTICAL (MANTIDO) */}
        <section className="lp-section lp-cv-section" id="carvertical" aria-labelledby="lp-cv" data-aos="fade-up">
          <div className="lp-shell lp-cv-card">
            <div>
              <span className="lp-kicker"><ShieldCheck size={12} /> Histórico automóvel</span>
              <h2 id="lp-cv">20% de desconto na carVertical</h2>
              <p>Consulta dados disponíveis sobre histórico, quilometragem e registos do veículo antes de fechar negócio.</p>
              <a className="lp-main-cta" href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer" onPointerEnter={animarCta}>Verificar veículo <ArrowRight size={16} /></a>
            </div>
            <div className="lp-cv-panel">
              <img src="/carvertical-logo.png" alt="carVertical" />
              <strong>20%</strong>
              <span>de desconto através do link Noxvelia.</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}