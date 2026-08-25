import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Car, Home as HomeIcon, ShieldCheck, Search } from 'lucide-react';
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

// Imagens de assinatura do hero — uma por vertical. Trocar por fotografia
// própria da Noxvelia assim que existir (carro em estúdio / fachada PT).
const HERO_IMG_DRIVE = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop';
const HERO_IMG_ESTATE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop';

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const formatarMoeda = (valor) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valor || 0);

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
  const [noticiasMercado, setNoticiasMercado] = useState([]);

  // Estados de Pesquisa
  const [searchTab, setSearchTab] = useState('carro');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [distrito, setDistrito] = useState('');
  const [cidade, setCidade] = useState('');

  const modelosDisponiveis = marca ? getModelosPorMarca(marca).map(m => typeof m === 'object' ? m.modelo || m.nome : m) : [];
  const cidadesDisponiveis = distrito ? DISTRITOS_CIDADES_PT[distrito] || [] : [];

  const carregarAnime = () => {
    if (!animeRef.current) animeRef.current = import('animejs').then((modulo) => modulo.animate);
    return animeRef.current;
  };

  const animarCta = (evento) => {
    if (prefersReducedMotion()) return;
    const alvo = evento.currentTarget;
    carregarAnime()
      .then((animateFn) => animateFn(alvo, { scale: [1, 1.02, 1], duration: 300, ease: 'outQuad' }))
      .catch(() => {});
  };

  useEffect(() => {
    let ativo = true;
    Promise.all([import('aos'), import('aos/dist/aos.css')])
      .then(([modulo]) => {
        if (!ativo) return;
        const aos = modulo.default;
        aos.init({ duration: 500, easing: 'ease-out-cubic', once: true, offset: 50, disable: prefersReducedMotion });
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
        if (ativo && heroTitleRef.current) animateFn(heroTitleRef.current, { opacity: [0, 1], y: [15, 0], duration: 600, ease: 'outQuad' });
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
  }, []);

  useEffect(() => {
    let ativo = true;

    api.get('/market-news?limit=4')
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
    try { localStorage.setItem('@App:contexto_visual', origem === '/carros' ? 'carro' : 'imovel'); } catch { }
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
      <div key={anuncio._id} className={`nx-bento-card ${isFeatured ? 'nx-bento-featured' : ''}`} onClick={() => abrirExemplo(anuncio, origem)}>
        <div className="nx-bento-img">
          {foto ? <img src={foto} alt={anuncio.titulo} loading="lazy" /> : <div className="nx-bento-no-photo">{isCarro ? <Car size={34} /> : <HomeIcon size={34} />}</div>}
          <span className="nx-bento-tag">{isCarro ? 'Automóvel' : 'Imóvel'}</span>
        </div>
        <div className="nx-bento-body">
          <span className="nx-bento-price">{formatarMoeda(anuncio.preco)}</span>
          <span className="nx-bento-title">{anuncio.titulo}</span>
          <span className="nx-bento-meta">{detalhe || (isCarro ? 'Dados técnicos' : 'Detalhes do imóvel')} | {anuncio.localizacao?.cidade || 'Portugal'}</span>
        </div>
      </div>
    );
  };

  const destaque = noticiasMercado[0];

  return (
    <div className="nx-landing-root">
      <Seo title="Noxvelia | Automóveis e Imóveis em Portugal" description="Pesquisa e publica anúncios de carros e casas em Portugal. Contacto direto via WhatsApp sem intermediários e sem comissões." path="/" jsonLd={[siteIdentityJsonLd, homePageJsonLd]} />
      <NavbarLanding />

      <main>
        {/* 1. HERO — SPLIT PORTAL (assinatura visual da dualidade Drive/Estate) */}
        <section className="nx-hero">
          <div className={`nx-hero-split nx-hero-split--drive ${searchTab === 'carro' ? 'is-focus' : 'is-dim'}`}>
            <img src={HERO_IMG_DRIVE} alt="Automóveis Noxvelia Drive" aria-hidden="true" />
          </div>
          <div className={`nx-hero-split nx-hero-split--estate ${searchTab === 'imovel' ? 'is-focus' : 'is-dim'}`}>
            <img src={HERO_IMG_ESTATE} alt="Imóveis Noxvelia Estate" aria-hidden="true" />
          </div>

          <div className="nx-hero-seam" aria-hidden="true">
            <span className="nx-hero-seam-mark">NX</span>
          </div>

          <div className="nx-hero-legend" aria-hidden="true">
            <div className="nx-shell nx-hero-legend-inner">
              <span className={searchTab === 'carro' ? 'is-focus' : ''}>Noxvelia Drive</span>
              <span className={searchTab === 'imovel' ? 'is-focus' : ''}>Noxvelia Estate</span>
            </div>
          </div>

          <div className="nx-hero-content">
            <div className="nx-hero-text">
              <h1 ref={heroTitleRef}>Automóveis e imóveis.<br/>Direto ao assunto.</h1>
              <p>O mercado premium sem intermediários. Fala diretamente com o vendedor pelo WhatsApp.</p>
            </div>
          </div>

          {/* CAIXA FLUTUANTE DE PESQUISA */}
          <div className="nx-search-floater">
            <div className="nx-search-tabs">
              <button type="button" data-vertical="carro" className={searchTab === 'carro' ? 'active' : ''} onClick={() => { setSearchTab('carro'); setDistrito(''); setCidade(''); }}>
                <Car size={18} /> Automóveis
              </button>
              <button type="button" data-vertical="imovel" className={searchTab === 'imovel' ? 'active' : ''} onClick={() => { setSearchTab('imovel'); setMarca(''); setModelo(''); }}>
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
              <button type="submit" className="nx-btn-search" onPointerEnter={animarCta} aria-label="Pesquisar">
                <Search size={22} color="#102f50" />
              </button>
            </form>
          </div>
        </section>

        {/* 2. FAIXA CARVERTICAL — "SCAN STRIP" */}
        <section className="nx-strip">
          <div className="nx-shell nx-strip-inner">
            <div className="nx-strip-text">
              <span className="nx-strip-icon" aria-hidden="true">
                <ShieldCheck size={20} color="#d9c49c" />
              </span>
              <span>
                <span className="nx-strip-partner">Parceria carVertical.</span> 20% de desconto no histórico completo do veículo — matrícula, quilometragem e acidentes verificados.
                <span className="nx-strip-fine">Ligação de afiliado · a Noxvelia pode receber comissão sem custo extra para si.</span>
              </span>
            </div>
            <a href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer sponsored" className="nx-strip-btn">
              Verificar Matrícula <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* 3. BENTO GRID - CARROS */}
        <section className="nx-section nx-bg-light" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <h2>O Melhor do Stock Automóvel</h2>
              <Link className="nx-link-gold" to="/carros">Ver todos <ArrowRight size={16} /></Link>
            </div>
            {exemplos.carro.length > 0 ? (
              <div className="nx-bento-layout">
                {renderAnuncioMontra(exemplos.carro[0], '/carros', true)}
                <div className="nx-bento-grid">
                  {exemplos.carro.slice(1, 5).map((anuncio) => renderAnuncioMontra(anuncio, '/carros', false))}
                </div>
              </div>
            ) : (
              <p style={{color: '#64748b', fontSize: '16px'}}>A carregar viaturas em destaque...</p>
            )}
          </div>
        </section>

        {/* 4. BENTO GRID - IMÓVEIS (INVERTIDO) */}
        <section className="nx-section nx-bg-white" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <h2>Imóveis Exclusivos</h2>
              <Link className="nx-link-gold" to="/imoveis">Ver todos <ArrowRight size={16} /></Link>
            </div>
            {exemplos.imovel.length > 0 ? (
              <div className="nx-bento-layout nx-bento-reverse">
                <div className="nx-bento-grid">
                  {exemplos.imovel.slice(1, 5).map((anuncio) => renderAnuncioMontra(anuncio, '/imoveis', false))}
                </div>
                {renderAnuncioMontra(exemplos.imovel[0], '/imoveis', true)}
              </div>
            ) : (
              <p style={{color: '#64748b', fontSize: '16px'}}>A carregar imóveis em destaque...</p>
            )}
          </div>
        </section>

        {/* 5. NOTÍCIAS MAGAZINE */}
        <section className="nx-section nx-bg-light" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
               <h2>Atualidade do Mercado</h2>
            </div>
            {noticiasMercado.length > 0 ? (
              <div className="nx-magazine">
                 <a href={destaque?.url} target="_blank" rel="noopener noreferrer" className="nx-mag-hero">
                    {destaque?.image && <img src={destaque.image} alt="" aria-hidden="true" loading="lazy" />}
                    <span className="nx-mag-pill">Destaque</span>
                    <h3>{destaque?.title}</h3>
                    <p>{destaque?.summary}</p>
                 </a>
                 <div className="nx-mag-sidebar">
                    {noticiasMercado.slice(1, 4).map((noticia) => (
                      <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="nx-mag-item" key={noticia.id || noticia.url}>
                         <span className="nx-mag-pill-small">Notícia</span>
                         <h4>{noticia.title}</h4>
                      </a>
                    ))}
                 </div>
              </div>
            ) : (
              <p style={{color: '#64748b', fontSize: '16px'}}>A atualizar feed de notícias...</p>
            )}
          </div>
        </section>

        {/* 6. CTA B2B (PROFISSIONAL) */}
        <section className="nx-section nx-b2b">
          <div className="nx-shell nx-b2b-inner">
             <div className="nx-b2b-text">
                <h2>És um Profissional?</h2>
                <p>Vende sem pagar um cêntimo em comissões. Importamos o teu stock diretamente do teu software. Os clientes contactam o teu WhatsApp diretamente.</p>
                <Link className="nx-btn-b2b" to={publicarTo} state={publicarState}>Começar a Vender <ArrowRight size={16} /></Link>
             </div>
             <div className="nx-b2b-visual">
                <Building2 size={120} color="rgba(255,255,255,0.1)" />
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}