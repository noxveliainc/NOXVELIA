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
        setExemplos({ carro: (data?.carro || []).slice(0, 5), imovel: (data?.imovel || []).slice(0, 5) });
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

  const renderAnuncioMontra = (anuncio, origem, isFeatured = false) => {
    const isCarro = anuncio.tipo === 'carro';
    const foto = getImageUrl(anuncio.fotos?.[0] || anuncio.imagens?.[0], isFeatured ? 'large' : 'medium');
    const detalhe = isCarro
      ? [anuncio.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null, anuncio.carro?.combustivel].filter(Boolean).join(' · ')
      : [anuncio.imovel?.tipologia || anuncio.imovel?.tipoImovel, anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null].filter(Boolean).join(' · ');

    return (
      <button type="button" key={anuncio._id} className={`nx-bento-card ${isFeatured ? 'nx-bento-featured' : ''}`} onClick={() => abrirExemplo(anuncio, origem)}>
        <span className="nx-bento-img">
          {foto ? <img src={foto} alt={anuncio.titulo} loading="lazy" /> : <span className={`nx-bento-no-photo`}>{isCarro ? <Car size={34} /> : <HomeIcon size={34} />}</span>}
          <span className="nx-bento-tag">{isCarro ? 'Automóvel' : 'Imóvel'}</span>
        </span>
        <span className="nx-bento-body">
          <span className="nx-bento-price">{formatarMoeda(anuncio.preco)}</span>
          <span className="nx-bento-title">{anuncio.titulo}</span>
          <span className="nx-bento-meta">{detalhe || (isCarro ? 'Dados técnicos' : 'Detalhes do imóvel')} | {anuncio.localizacao?.cidade || 'Portugal'}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="lp-root nx-editorial">
      <Seo title="Noxvelia | Automóveis e Imóveis em Portugal" description="Pesquisa e publica anúncios de carros e casas em Portugal. Contacto direto via WhatsApp sem intermediários e sem comissões." path="/" jsonLd={[siteIdentityJsonLd, homePageJsonLd]} />
      <NavbarLanding />
      <main>
        
        {/* HERO COM OVERLAP DA PESQUISA */}
        <section className="nx-hero-overlap" aria-labelledby="lp-title" id="pesquisa">
          <div className="nx-hero-bg-wrapper">
             <img className="lp-hero-bg" src="/noxvelia-hero-coast.webp" alt="" aria-hidden="true" />
             <div className="nx-hero-overlay"></div>
          </div>
          
          <div className="lp-shell nx-hero-content">
            <div className="nx-hero-text">
              <h1 id="lp-title" ref={heroTitleRef}>Automóveis e imóveis.<br/>Direto ao assunto.</h1>
              <p>O mercado premium, sem intermediários. Fala diretamente com o vendedor pelo WhatsApp.</p>
            </div>

            {/* A CAIXA FLUTUANTE (OVERLAP) */}
            <div className="nx-search-floater">
              <div className="nx-search-tabs">
                <button type="button" className={searchTab === 'carro' ? 'active' : ''} onClick={() => { setSearchTab('carro'); setDistrito(''); setCidade(''); }}>
                  <Car size={18} /> Automóveis
                </button>
                <button type="button" className={searchTab === 'imovel' ? 'active' : ''} onClick={() => { setSearchTab('imovel'); setMarca(''); setModelo(''); }}>
                  <HomeIcon size={18} /> Imóveis
                </button>
              </div>

              <form onSubmit={handleAdvancedSearch} className="nx-search-grid">
                {searchTab === 'carro' ? (
                  <>
                    <div className="nx-input-group">
                      <label>Marca</label>
                      <select value={marca} onChange={(e) => { setMarca(e.target.value); setModelo(''); }}>
                        <option value="">Todas as marcas</option>
                        {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="nx-input-group">
                      <label>Modelo</label>
                      <select value={modelo} onChange={(e) => setModelo(e.target.value)} disabled={!marca}>
                        <option value="">{marca ? 'Todos os modelos' : 'Escolha a marca'}</option>
                        {modelosDisponiveis.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="nx-input-group">
                      <label>Distrito</label>
                      <select value={distrito} onChange={(e) => { setDistrito(e.target.value); setCidade(''); }}>
                        <option value="">Todos os distritos</option>
                        {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="nx-input-group">
                      <label>Concelho</label>
                      <select value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={!distrito}>
                        <option value="">{distrito ? 'Todos os concelhos' : 'Escolha o distrito'}</option>
                        {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </>
                )}
                <button type="submit" className="nx-btn-search" onPointerEnter={animarCta}>
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAIXA CARVERTICAL (SECURITY STRIP) */}
        <section className="nx-security-strip">
          <div className="lp-shell nx-strip-inner">
            <div className="nx-strip-text">
               <ShieldCheck size={24} className="nx-gold-icon" />
               <span><strong>Compre com Confiança.</strong> Obtenha 20% de desconto no histórico completo do veículo.</span>
            </div>
            <a href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer" className="nx-strip-btn">
              Verificar Matrícula <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* NOXVELIA DRIVE (BENTO GRID) */}
        {exemplos.carro.length > 0 && (
          <section className="nx-section nx-bg-light" id="drive" data-aos="fade-up">
            <div className="lp-shell">
              <div className="nx-section-header">
                <h2>O Melhor do Stock Automóvel</h2>
                <Link className="nx-link-gold" to="/carros">Ver todos <ArrowRight size={16} /></Link>
              </div>
              <div className="nx-bento-layout">
                {/* 1 Carro em Destaque Gigante */}
                {renderAnuncioMontra(exemplos.carro[0], '/carros', true)}
                
                {/* 4 Carros Mais pequenos */}
                <div className="nx-bento-secondary">
                  {exemplos.carro.slice(1, 5).map((anuncio) => renderAnuncioMontra(anuncio, '/carros', false))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NOXVELIA ESTATE (BENTO GRID) */}
        {exemplos.imovel.length > 0 && (
          <section className="nx-section nx-bg-white" id="estate" data-aos="fade-up">
            <div className="lp-shell">
              <div className="nx-section-header">
                <h2>Imóveis Exclusivos</h2>
                <Link className="nx-link-gold" to="/imoveis">Ver todos <ArrowRight size={16} /></Link>
              </div>
              <div className="nx-bento-layout nx-bento-reverse">
                 <div className="nx-bento-secondary">
                  {exemplos.imovel.slice(1, 5).map((anuncio) => renderAnuncioMontra(anuncio, '/imoveis', false))}
                </div>
                {renderAnuncioMontra(exemplos.imovel[0], '/imoveis', true)}
              </div>
            </div>
          </section>
        )}

        {/* NOTÍCIAS (MAGAZINE LAYOUT) */}
        {noticiasMercado.length > 0 && (
          <section className="nx-section nx-bg-light" id="atualidade" data-aos="fade-up">
            <div className="lp-shell">
              <div className="nx-section-header">
                 <h2>Atualidade do Mercado</h2>
              </div>
              <div className="nx-magazine-layout">
                 {/* Notícia Destaque */}
                 <a href={noticiasMercado[0].url} target="_blank" rel="noopener noreferrer" className="nx-mag-hero">
                    <span className="nx-mag-pill">{noticiasMercado[0].verticalLabel || 'Destaque'}</span>
                    <h3>{noticiasMercado[0].title}</h3>
                    <p>{noticiasMercado[0].summary}</p>
                 </a>
                 {/* Notícias Secundárias */}
                 <div className="nx-mag-sidebar">
                    {noticiasMercado.slice(1, 4).map((noticia) => (
                      <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="nx-mag-item" key={noticia.id || noticia.url}>
                         <span className="nx-mag-pill-small">{noticia.verticalLabel || 'Notícia'}</span>
                         <h4>{noticia.title}</h4>
                      </a>
                    ))}
                 </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA B2B (PROFISSIONAL) */}
        <section className="nx-section nx-b2b-cta">
          <div className="lp-shell nx-b2b-inner">
             <div className="nx-b2b-text">
                <h2>És um Profissional?</h2>
                <p>Vende automóveis e imóveis sem pagar um cêntimo em comissões. Importamos o teu stock diretamente do teu software de gestão. Os clientes contactam o teu WhatsApp diretamente.</p>
                <div className="nx-b2b-actions">
                  <Link className="nx-btn-solid" to={publicarTo} state={publicarState}>Começar a Vender <ArrowRight size={16} /></Link>
                </div>
             </div>
             <div className="nx-b2b-image">
                <img src="/mockup-whatsapp.png" alt="Noxvelia no WhatsApp" onError={(e) => e.target.style.display='none'} />
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}