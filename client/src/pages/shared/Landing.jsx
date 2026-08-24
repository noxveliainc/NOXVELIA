import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Car, CheckCircle2, Home as HomeIcon, MapPin, Newspaper, ShieldCheck, Search } from 'lucide-react';
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
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS, DISTRITOS_CIDADES_PT } from '../../data/localizacoes';
import './Landing.css';

const CARVERTICAL_URL = 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';
const TRUST_POINTS = [
  { texto: 'Zero comissões de venda' },
  { texto: 'Contacto direto via WhatsApp' },
  { texto: 'Milhares de portugueses ativos' },
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

  // ESTADOS PARA OS FILTROS REAIS DA HOMEPAGE
  const [searchTab, setSearchTab] = useState('carro');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [distrito, setDistrito] = useState('');
  const [cidade, setCidade] = useState('');

  const modelosDisponiveis = marca ? getModelosPorMarca(marca).map(m => typeof m === 'object' ? m.modelo || m.nome : m) : [];
  const cidadesDisponiveis = distrito ? DISTRITOS_CIDADES_PT[distrito] || [] : [];

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

  // FUNÇÃO DE PESQUISA AVANÇADA PARA A HOMEPAGE
  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchTab === 'carro') {
      if (marca) params.set('marca', marca);
      if (modelo) params.set('modelo', modelo);
      navigate(`/carros?${params.toString()}`);
    } else {
      if (distrito && distrito !== 'Todos') params.set('distrito', distrito);
      if (cidade) params.set('cidade', cidade);
      navigate(`/imoveis?${params.toString()}`);
    }
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
      <Seo title="Noxvelia | Automóveis e Imóveis em Portugal" description="Pesquisa e publica anúncios de carros e casas em Portugal. Contacto direto via WhatsApp sem intermediários e sem comissões." path="/" jsonLd={[siteIdentityJsonLd, homePageJsonLd]} />
      <NavbarLanding />
      <main>
        
        {/* HERO COM SEARCH BOX (FILTROS REAIS) */}
        <section className="lp-hero" aria-labelledby="lp-title" id="pesquisa">
          <img className="lp-hero-bg" src="/noxvelia-hero-coast.webp" alt="" aria-hidden="true" />
          <div className="lp-shell lp-hero-shell">
            
            <div className="lp-hero-copy">
              <span className="lp-kicker lp-hero-kicker">O Mercado Português</span>
              <h1 id="lp-title" ref={heroTitleRef}>Automóveis e imóveis.<br/>Direto ao assunto.</h1>
              <p>Esquece as comissões e os chats complicados. Na Noxvelia, encontras o teu próximo carro ou casa e falas diretamente com quem vende pelo WhatsApp.</p>
              
              <ul className="lp-trust-row">
                {TRUST_POINTS.map((ponto) => <li key={ponto.texto}><CheckCircle2 size={15} strokeWidth={2.4} aria-hidden="true" /> {ponto.texto}</li>)}
              </ul>
            </div>

            {/* CAIXA DE PESQUISA AVANÇADA (Corrigida) */}
            <div className="lp-search-box">
              <div className="lp-search-head">
                <span>Pesquisa Rápida</span>
                <strong>O que procuras hoje?</strong>
              </div>
              
              <div className="lp-tabs">
                <button 
                  type="button"
                  className={searchTab === 'carro' ? 'active' : ''} 
                  data-vertical="carro"
                  onClick={() => { setSearchTab('carro'); setDistrito(''); setCidade(''); }}
                >
                  <Car size={16} /> Drive
                </button>
                <button 
                  type="button"
                  className={searchTab === 'imovel' ? 'active' : ''} 
                  data-vertical="imovel"
                  onClick={() => { setSearchTab('imovel'); setMarca(''); setModelo(''); }}
                >
                  <HomeIcon size={16} /> Estate
                </button>
              </div>

              <form onSubmit={handleAdvancedSearch} className="lp-search-grid">
                {searchTab === 'carro' ? (
                  <>
                    <label>
                      Marca
                      <select value={marca} onChange={(e) => { setMarca(e.target.value); setModelo(''); }}>
                        <option value="">Todas as marcas</option>
                        {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </label>
                    <label>
                      Modelo
                      <select value={modelo} onChange={(e) => setModelo(e.target.value)} disabled={!marca}>
                        <option value="">{marca ? 'Todos os modelos' : 'Escolha a marca'}</option>
                        {modelosDisponiveis.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
                      </select>
                    </label>
                  </>
                ) : (
                  <>
                    <label>
                      Distrito
                      <select value={distrito} onChange={(e) => { setDistrito(e.target.value); setCidade(''); }}>
                        <option value="">Todos os distritos</option>
                        {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </label>
                    <label>
                      Concelho / Cidade
                      <select value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={!distrito}>
                        <option value="">{distrito ? 'Todos os concelhos' : 'Escolha o distrito'}</option>
                        {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                  </>
                )}
                <button type="submit" onPointerEnter={animarCta}>
                  <Search size={16} /> Pesquisar {searchTab === 'carro' ? 'Automóveis' : 'Imóveis'}
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* NOXVELIA DRIVE (CARROS) */}
        {exemplos.carro.length > 0 && (
          <section className="lp-section lp-listing-section" id="drive" aria-labelledby="lp-drive" data-aos="fade-up">
            <div className="lp-shell">
              <div className="lp-section-head">
                <div><span className="lp-kicker"><Car size={14} /> Noxvelia Drive</span><h2 id="lp-drive">Viaturas em destaque</h2></div>
              </div>
              <div className="lp-montra-grid">
                {exemplos.carro.map((anuncio) => renderAnuncio(anuncio, '/carros'))}
              </div>
              <div className="lp-montra-footer">
                <Link className="lp-secondary-button" to="/carros">Explorar todo o stock Automóvel <ArrowRight size={16} /></Link>
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
                <Link className="lp-secondary-button" to="/imoveis">Explorar todo o stock Imobiliário <ArrowRight size={16} /></Link>
              </div>
            </div>
          </section>
        )}

        {/* NOTÍCIAS (MANTIDO) */}
        {noticiasMercado.length > 0 && (
          <section className="lp-section lp-news-section" id="atualidade" aria-labelledby="lp-news" data-aos="fade-up">
            <div className="lp-shell">
              <div className="lp-section-head">
                <div><span className="lp-kicker"><Newspaper size={13} /> Atualidade</span><h2 id="lp-news">Mercado em Portugal</h2><p className="lp-section-copy">Fica a par das últimas tendências do mercado automóvel e imobiliário.</p></div>
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

        {/* ANUNCIAR / VENDER (CTA Agressivo) */}
        <section className="lp-section lp-sell-section" id="anunciar" aria-labelledby="lp-sell" data-aos="fade-up">
          <div className="lp-shell lp-sell-box">
            <div>
              <span className="lp-kicker">Para Particulares e Profissionais</span>
              <h2 id="lp-sell">Pronto para vender?</h2>
              <p>Cria a tua montra gratuitamente. Os clientes entram em contacto direto para o teu número, sem formulários escondidos nem comissões.</p>
            </div>
            <div className="lp-sell-actions">
              <Link className="lp-main-cta" to={publicarTo} state={publicarState} onPointerEnter={animarCta}>Publicar Anúncio Grátis <ArrowRight size={16} /></Link>
              {temProfissionaisAtivos && <Link className="lp-soft-cta" to="/profissionais"><Building2 size={16} /> Ver Stands e Agências</Link>}
            </div>
          </div>
        </section>

        {/* CARVERTICAL (MANTIDO) */}
        <section className="lp-section lp-cv-section" id="carvertical" aria-labelledby="lp-cv" data-aos="fade-up">
          <div className="lp-shell lp-cv-card">
            <div>
              <span className="lp-kicker"><ShieldCheck size={12} /> Segurança Automóvel</span>
              <h2 id="lp-cv">Verifica o carro antes de comprar</h2>
              <p>Evita fraudes e quilómetros adulterados. Descobre o histórico de acidentes, manutenções e roubos de qualquer veículo através da matrícula ou VIN.</p>
              <a className="lp-main-cta" href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer" onPointerEnter={animarCta}>Consultar Histórico <ArrowRight size={16} /></a>
            </div>
            <div className="lp-cv-panel">
              <img src="/carvertical-logo.png" alt="carVertical" />
              <strong>20%</strong>
              <span>Desconto automático no relatório via Noxvelia.</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}