import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Car, Home as HomeIcon, ShieldCheck, Search, ChevronRight } from 'lucide-react';
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
      .then((animateFn) => animateFn(alvo, { scale: [1, 1.03, 1], duration: 400, ease: 'easeOutElastic(1, .8)' }))
      .catch(() => {});
  };

  useEffect(() => {
    let ativo = true;
    Promise.all([import('aos'), import('aos/dist/aos.css')])
      .then(([modulo]) => {
        if (!ativo) return;
        const aos = modulo.default;
        aos.init({ duration: 600, easing: 'ease-out-cubic', once: true, offset: 40, disable: prefersReducedMotion });
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
        if (ativo && heroTitleRef.current) animateFn(heroTitleRef.current, { opacity: [0, 1], y: [20, 0], duration: 800, ease: 'outExpo' });
      })
      .catch(() => {});
    return () => { ativo = false; };
  }, []);

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
    
    // Fomos buscar mais notícias para preencher o jornal
    api.get('/market-news?limit=5')
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
        {/* 1. HERO — SPLIT PORTAL (Identidade Única Noxvelia) */}
        <section className="nx-hero">
          <div className={`nx-hero-split nx-hero-split--drive ${searchTab === 'carro' ? 'is-focus' : 'is-dim'}`}>
            <img src={HERO_IMG_DRIVE} alt="Automóveis Noxvelia Drive" aria-hidden="true" />
            <div className="nx-hero-gradient"></div>
          </div>
          <div className={`nx-hero-split nx-hero-split--estate ${searchTab === 'imovel' ? 'is-focus' : 'is-dim'}`}>
            <img src={HERO_IMG_ESTATE} alt="Imóveis Noxvelia Estate" aria-hidden="true" />
            <div className="nx-hero-gradient"></div>
          </div>

          <div className="nx-hero-content">
            <div className="nx-hero-text">
              <h1 ref={heroTitleRef}>Acesso direto ao<br/>mercado premium.</h1>
              <p>Esqueça os formulários e os intermediários. Encontre a sua próxima viatura ou imóvel e fale com o vendedor no WhatsApp.</p>
            </div>
          </div>

          {/* CAIXA DE PESQUISA (Design Arquitetónico) */}
          <div className="nx-search-floater">
            <div className="nx-search-tabs">
              <button type="button" data-vertical="carro" className={searchTab === 'carro' ? 'active' : ''} onClick={() => { setSearchTab('carro'); setDistrito(''); setCidade(''); }}>
                <Car size={16} strokeWidth={2.5} /> Noxvelia Drive
              </button>
              <button type="button" data-vertical="imovel" className={searchTab === 'imovel' ? 'active' : ''} onClick={() => { setSearchTab('imovel'); setMarca(''); setModelo(''); }}>
                <HomeIcon size={16} strokeWidth={2.5} /> Noxvelia Estate
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
                      <option value="">{marca ? 'Todos os modelos' : 'Selecione uma marca'}</option>
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
                    <label>Concelho / Cidade</label>
                    <select value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={!distrito}>
                      <option value="">{distrito ? 'Todos os concelhos' : 'Selecione um distrito'}</option>
                      {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </>
              )}
              <button type="submit" className="nx-btn-search" onPointerEnter={animarCta} aria-label="Pesquisar">
                <Search size={20} /> <span className="nx-btn-search-text">Procurar</span>
              </button>
            </form>
          </div>
        </section>

        {/* 2. BENTO GRID - CARROS */}
        <section className="nx-section nx-bg-light" data-aos="fade-up" style={{paddingTop: '160px'}}>
          <div className="nx-shell">
            <div className="nx-section-header">
              <div>
                <span className="nx-kicker">Noxvelia Drive</span>
                <h2>Stock Automóvel</h2>
              </div>
              <Link className="nx-link-gold" to="/carros">Ver todo o stock <ArrowRight size={16} /></Link>
            </div>
            {exemplos.carro.length > 0 ? (
              <div className="nx-bento-layout">
                {renderAnuncioMontra(exemplos.carro[0], '/carros', true)}
                <div className="nx-bento-grid">
                  {exemplos.carro.slice(1, 5).map((anuncio) => renderAnuncioMontra(anuncio, '/carros', false))}
                </div>
              </div>
            ) : (
              <p className="nx-empty-state">A carregar viaturas em destaque...</p>
            )}
          </div>
        </section>

        {/* 3. BENTO GRID - IMÓVEIS (INVERTIDO) */}
        <section className="nx-section nx-bg-white" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <div>
                <span className="nx-kicker">Noxvelia Estate</span>
                <h2>Imóveis Exclusivos</h2>
              </div>
              <Link className="nx-link-gold" to="/imoveis">Ver todos os imóveis <ArrowRight size={16} /></Link>
            </div>
            {exemplos.imovel.length > 0 ? (
              <div className="nx-bento-layout nx-bento-reverse">
                <div className="nx-bento-grid">
                  {exemplos.imovel.slice(1, 5).map((anuncio) => renderAnuncioMontra(anuncio, '/imoveis', false))}
                </div>
                {renderAnuncioMontra(exemplos.imovel[0], '/imoveis', true)}
              </div>
            ) : (
              <p className="nx-empty-state">A carregar imóveis em destaque...</p>
            )}
          </div>
        </section>

        {/* 4. CARVERTICAL (A TUA VERSÃO RECUPERADA E MELHORADA) */}
        <section className="nx-section nx-cv-section" data-aos="fade-up">
          <div className="nx-shell nx-cv-box">
             <div className="nx-cv-info">
               <span className="nx-cv-kicker"><ShieldCheck size={16} strokeWidth={2.5} /> Segurança Automóvel</span>
               <h2>Verifique o carro antes de comprar</h2>
               <p>Evite fraudes e quilómetros adulterados. Descubra o histórico de acidentes, manutenções e roubos de qualquer veículo através da matrícula ou VIN.</p>
               <a href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer" className="nx-cv-btn" onPointerEnter={animarCta}>
                 Consultar Histórico Oficial <ArrowRight size={16}/>
               </a>
             </div>
             <div className="nx-cv-discount">
               <img src="/carvertical-logo.png" alt="carVertical" />
               <strong>20%</strong>
               <span>Desconto automático aplicado no relatório final via Noxvelia.</span>
             </div>
          </div>
        </section>

        {/* 5. NOTÍCIAS MAGAZINE (Com imagens em todos os artigos) */}
        <section className="nx-section nx-bg-white" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
               <div>
                  <span className="nx-kicker">Jornal Digital</span>
                  <h2>Atualidade do Mercado</h2>
               </div>
            </div>
            {noticiasMercado.length > 0 ? (
              <div className="nx-magazine">
                 <a href={destaque?.url} target="_blank" rel="noopener noreferrer" className="nx-mag-hero">
                    <div className="nx-mag-hero-img">
                       {destaque?.image && <img src={destaque.image} alt="" aria-hidden="true" loading="lazy" />}
                    </div>
                    <div className="nx-mag-hero-content">
                       <span className="nx-mag-pill">Destaque</span>
                       <h3>{destaque?.title}</h3>
                       <p>{destaque?.summary}</p>
                       <span className="nx-mag-readmore">Ler artigo completo <ChevronRight size={14}/></span>
                    </div>
                 </a>
                 <div className="nx-mag-sidebar">
                    {noticiasMercado.slice(1, 5).map((noticia) => (
                      <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="nx-mag-item" key={noticia.id || noticia.url}>
                         {noticia.image && (
                           <div className="nx-mag-item-img">
                             <img src={noticia.image} alt="" loading="lazy" />
                           </div>
                         )}
                         <div className="nx-mag-item-text">
                           <span className="nx-mag-pill-small">Mercado</span>
                           <h4>{noticia.title}</h4>
                         </div>
                      </a>
                    ))}
                 </div>
              </div>
            ) : (
              <p className="nx-empty-state">A atualizar feed de notícias financeiras...</p>
            )}
          </div>
        </section>

        {/* 6. CTA B2B (PROFISSIONAL) */}
        <section className="nx-section nx-b2b">
          <div className="nx-shell nx-b2b-inner">
             <div className="nx-b2b-text">
                <h2>És um Profissional?</h2>
                <p>Vende sem pagar um cêntimo em comissões. Importamos o teu stock diretamente do teu software de gestão. Os clientes contactam o teu WhatsApp diretamente.</p>
                <Link className="nx-btn-b2b" to={publicarTo} state={publicarState} onPointerEnter={animarCta}>
                  Criar Conta Profissional <ArrowRight size={16} />
                </Link>
             </div>
             <div className="nx-b2b-visual">
                <Building2 size={160} color="rgba(217, 196, 156, 0.15)" strokeWidth={1} />
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}