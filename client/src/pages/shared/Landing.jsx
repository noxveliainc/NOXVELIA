import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Car, Home as HomeIcon, MapPin, Newspaper, Search, ShieldCheck } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import NavbarLanding from './NavbarLanding';
import api from '../../services/api';
import { MARCAS, OPCAO_OUTRO_VEICULO, getNomesModelosComOutro, rotuloOpcaoVeiculo } from '../../data/marcasModelos';
import { DISTRITOS } from '../../data/localizacoes';
import { getImageUrl } from '../../utils/images';
import { anuncioPath, homePageJsonLd, siteIdentityJsonLd } from '../../utils/seo';
import { useAuth } from '../../context/AuthContext';
import { publishIntentState } from '../../utils/navigationState';
import { trackFunnelEvent } from '../../utils/funnelAnalytics';
import { COOKIE_CONSENT_CHANGED_EVENT, readCookieConsent } from '../../utils/cookieConsent';
import './Landing.css';

const CARVERTICAL_URL = 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';
const COMBUSTIVEIS_POPULARES = ['Diesel', 'Gasolina', 'Eléctrico', 'Híbrido', 'GPL'];
const TIPOLOGIAS_POPULARES = ['T1', 'T2', 'T3', 'T4', 'T5+'];
const PRECOS_CARROS = [{ label: 'Até 10.000 €', value: '10000' }, { label: 'Até 20.000 €', value: '20000' }, { label: 'Até 30.000 €', value: '30000' }];
const PRECOS_IMOVEIS = [{ label: 'Até 150.000 €', value: '150000' }, { label: 'Até 250.000 €', value: '250000' }, { label: 'Até 400.000 €', value: '400000' }];
const MARCAS_POPULARES_PT = ['Renault', 'Peugeot', 'Volkswagen', 'Mercedes-Benz', 'Toyota', 'Opel', 'Fiat', 'BMW', 'Audi', 'Citroën', 'Seat', 'Ford', 'Nissan', 'Hyundai', 'Kia', 'Dacia', 'Skoda', 'Volvo'];
const MARCAS_PESQUISA = [
  ...MARCAS_POPULARES_PT.filter((marca) => MARCAS.includes(marca)),
  ...MARCAS.filter((marca) => !MARCAS_POPULARES_PT.includes(marca)),
  OPCAO_OUTRO_VEICULO,
];
const LandingListingsCarousel = lazy(() => import('./LandingListingsCarousel'));
const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const formatarMoeda = (valor) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valor || 0);
const formatarNumero = (valor) => new Intl.NumberFormat('pt-PT').format(valor || 0);
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
  const [loadingExemplos, setLoadingExemplos] = useState(true);
  const [erroExemplos, setErroExemplos] = useState(false);
  const [noticiasMercado, setNoticiasMercado] = useState([]);
  const [pesquisa, setPesquisa] = useState({ tipo: 'carro', marca: '', modelo: '', combustivel: '', tipologia: '', distrito: '', precoMax: '' });

  const criarLinkPesquisa = (tipo, filtros = {}) => {
    const params = new URLSearchParams();
    params.set('tipo', tipo);
    Object.entries(filtros).forEach(([chave, valor]) => { if (valor) params.set(chave, valor); });
    return `${tipo === 'carro' ? '/carros' : '/imoveis'}?${params.toString()}`;
  };

  const modelosPesquisa = pesquisa.tipo === 'carro' && pesquisa.marca
    ? (pesquisa.marca === OPCAO_OUTRO_VEICULO ? [OPCAO_OUTRO_VEICULO] : getNomesModelosComOutro(pesquisa.marca))
    : [];

  const temProfissionaisAtivos = Number(resumoPublico?.profissionais || 0) > 0;

  const atualizarPesquisa = (campo, valor) => {
    setPesquisa((atual) => {
      const proximo = { ...atual, [campo]: valor };
      if (campo === 'tipo') return { ...proximo, marca: '', modelo: '', combustivel: '', tipologia: '', precoMax: '' };
      if (campo === 'marca') proximo.modelo = '';
      return proximo;
    });
  };

  const submeterPesquisa = (evento) => {
    evento.preventDefault();
    const { tipo, marca, modelo, combustivel, tipologia, distrito, precoMax } = pesquisa;
    const filtros = { distrito, precoMax, ...(tipo === 'carro' ? { marca, modelo, combustivel } : { tipologia }) };
    trackFunnelEvent('search_start', { vertical: tipo });
    navigate(criarLinkPesquisa(tipo, filtros));
  };


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
  }, [loadingExemplos, noticiasMercado.length]);

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
    return () => { ativo = false; };
  }, []);

  useEffect(() => {
    let ativo = true;
    api.get('/market-news?limit=6')
      .then(({ data }) => { if (ativo) setNoticiasMercado(Array.isArray(data?.items) ? data.items : []); })
      .catch(() => { if (ativo) setNoticiasMercado([]); });
    return () => { ativo = false; };
  }, []);

  useEffect(() => {
    let ativo = true;
    const carregarExemplos = async () => {
      try {
        const { data } = await api.get('/anuncios/em-alta/semana');
        if (!ativo) return;
        setExemplos({ carro: (data?.carro || []).slice(0, 6), imovel: (data?.imovel || []).slice(0, 6) });
        setErroExemplos(false);
      } catch {
        if (ativo) {
          setExemplos({ carro: [], imovel: [] });
          setErroExemplos(true);
        }
      } finally {
        if (ativo) setLoadingExemplos(false);
      }
    };
    carregarExemplos();
    return () => { ativo = false; };
  }, []);

  const abrirExemplo = (anuncio, origem) => {
    try { localStorage.setItem('@App:contexto_visual', origem === '/carros' ? 'carro' : 'imovel'); } catch { /* navegação disponível sem armazenamento local */ }
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
        <span className="lp-listing-img">{foto ? <img src={foto} width="800" height="600" alt={anuncio.titulo || (isCarro ? 'Automóvel' : 'Imóvel')} loading="lazy" /> : <span className={`lp-listing-no-photo ${isCarro ? 'is-carro' : 'is-imovel'}`}>{isCarro ? <Car size={34} /> : <HomeIcon size={34} />}<em>{isCarro ? 'Automóvel sem foto' : 'Imóvel sem foto'}</em></span>}</span>
        <span className="lp-listing-body"><span className="lp-listing-price">{formatarMoeda(anuncio.preco)}</span><span className="lp-listing-title">{anuncio.titulo}</span><span className="lp-listing-meta">{detalhe || (isCarro ? 'Dados técnicos disponíveis' : 'Detalhes do imóvel')}</span><span className="lp-listing-location"><MapPin size={12} strokeWidth={2.4} aria-hidden="true" /> {anuncio.localizacao?.cidade || 'Portugal'}</span></span>
      </button>
    );
  };

  const renderAnunciosSwiper = (lista, origem) => (
    <Suspense fallback={<div className="lp-listing-fallback">{lista.slice(0, 2).map((anuncio) => renderAnuncio(anuncio, origem))}</div>}>
      <LandingListingsCarousel items={lista} renderItem={(anuncio) => renderAnuncio(anuncio, origem)} />
    </Suspense>
  );

  const renderEstadoLista = (tipo, rota) => (
    <div className="lp-listing-state" role="status">
      <strong>{loadingExemplos ? 'A carregar seleção.' : (erroExemplos ? 'A seleção está a ser atualizada.' : `Ver anúncios de ${tipo}.`)}</strong>
      <span>{loadingExemplos ? 'A lista completa está disponível.' : 'Usa os filtros para encontrar resultados.'}</span>
      {!loadingExemplos && <button type="button" className="lp-secondary-button" onClick={() => navigate(rota)}>Abrir {tipo}</button>}
    </div>
  );

  const mostrarDestaques = loadingExemplos || exemplos.carro.length > 0 || exemplos.imovel.length > 0;

  return (
    <div className="lp-root">
      <Seo title="Noxvelia | Plataforma de automóveis e imóveis em Portugal" description="Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de automóveis e imóveis." path="/" jsonLd={[siteIdentityJsonLd, homePageJsonLd]} />
      <NavbarLanding />
      <main>
        <section className="lp-hero" aria-labelledby="lp-title">
          <img className="lp-hero-bg" src="/noxvelia-hero-coast.webp" alt="" aria-hidden="true" />
          <div className="lp-shell lp-hero-shell">
            <div className="lp-hero-copy">
              <span className="lp-kicker lp-hero-kicker">Pesquisa em Portugal</span>
              <h1 id="lp-title" ref={heroTitleRef}>Automóveis e imóveis em Portugal</h1>
              <p>Filtra por localização, preço e características com contacto direto ao anunciante.</p>
              <div className="lp-hero-actions" aria-label="Ações principais">
                <a className="lp-main-cta" href="#pesquisa">Pesquisar agora</a>
                <Link className="lp-soft-cta" to={publicarTo} state={publicarState}>Criar anúncio</Link>
              </div>
            </div>

            <div className="lp-lens-card">
              <div className="lp-lens-media" aria-hidden="true">
                <img src="/social/noxvelia-drive-photo-premium.webp" alt="" />
                <div className="lp-lens-caption">
                  <strong>Vista antes da visita.</strong>
                  <span>Imagem grande, dados essenciais e decisão mais rápida.</span>
                </div>
              </div>

              <form className="lp-search-box" id="pesquisa" onSubmit={submeterPesquisa}>
                <div className="lp-search-head">
                  <span>Começa por aqui</span>
                  <strong>Pesquisa direta.</strong>
                  <p>Filtra por tipo, localização e preço. Podes afinar mais depois.</p>
                </div>
                <div className="lp-tabs" role="tablist" aria-label="Tipo de pesquisa"><button type="button" role="tab" aria-selected={pesquisa.tipo === 'carro'} data-vertical="carro" className={pesquisa.tipo === 'carro' ? 'active' : ''} onClick={() => atualizarPesquisa('tipo', 'carro')}><Car size={16} /> Automóveis</button><button type="button" role="tab" aria-selected={pesquisa.tipo === 'imovel'} data-vertical="imovel" className={pesquisa.tipo === 'imovel' ? 'active' : ''} onClick={() => atualizarPesquisa('tipo', 'imovel')}><HomeIcon size={16} /> Imóveis</button></div>
                <div className="lp-search-grid">
                  {pesquisa.tipo === 'carro' ? <><label>Marca<select value={pesquisa.marca} onChange={(evento) => atualizarPesquisa('marca', evento.target.value)}><option value="">Todas as marcas</option>{MARCAS_PESQUISA.map((marca) => <option key={marca} value={marca}>{rotuloOpcaoVeiculo(marca, 'marca')}</option>)}</select></label><label>Modelo<select value={pesquisa.modelo} onChange={(evento) => atualizarPesquisa('modelo', evento.target.value)} disabled={!pesquisa.marca}><option value="">{pesquisa.marca ? 'Todos os modelos' : 'Escolhe a marca'}</option>{modelosPesquisa.map((modelo) => <option key={modelo} value={modelo}>{rotuloOpcaoVeiculo(modelo, 'modelo')}</option>)}</select></label><label>Combustível<select value={pesquisa.combustivel} onChange={(evento) => atualizarPesquisa('combustivel', evento.target.value)}><option value="">Todos</option>{COMBUSTIVEIS_POPULARES.map((combustivel) => <option key={combustivel} value={combustivel}>{combustivel}</option>)}</select></label><label>Preço máximo<select value={pesquisa.precoMax} onChange={(evento) => atualizarPesquisa('precoMax', evento.target.value)}><option value="">Qualquer preço</option>{PRECOS_CARROS.map((preco) => <option key={preco.value} value={preco.value}>{preco.label}</option>)}</select></label></> : <><label>Tipologia<select value={pesquisa.tipologia} onChange={(evento) => atualizarPesquisa('tipologia', evento.target.value)}><option value="">Todas</option>{TIPOLOGIAS_POPULARES.map((tipologia) => <option key={tipologia} value={tipologia}>{tipologia}</option>)}</select></label><label>Preço máximo<select value={pesquisa.precoMax} onChange={(evento) => atualizarPesquisa('precoMax', evento.target.value)}><option value="">Qualquer preço</option>{PRECOS_IMOVEIS.map((preco) => <option key={preco.value} value={preco.value}>{preco.label}</option>)}</select></label></>}
                  <label>Distrito<select value={pesquisa.distrito} onChange={(evento) => atualizarPesquisa('distrito', evento.target.value)}><option value="">Portugal inteiro</option>{DISTRITOS.map((distrito) => <option key={distrito} value={distrito}>{distrito}</option>)}</select></label>
                  <button type="submit"><Search size={17} /> Ver anúncios</button>
                </div>
              </form>
            </div>
          </div>
        </section>
<section className="lp-section lp-category-section" aria-labelledby="lp-categories" data-aos="fade-up"><div className="lp-shell"><div className="lp-section-head"><div><span className="lp-kicker">Pesquisar</span><h2 id="lp-categories">Escolhe a categoria</h2></div></div><div className="lp-category-grid"><Link className="lp-category-card lp-category-card-auto" to="/carros"><img src="/social/noxvelia-drive-photo-premium.webp" alt="Automóvel anunciado na Noxvelia" /><span><small>Automóveis</small><strong>Ver automóveis</strong><em>Marca, modelo, km, combustível e preço.</em></span></Link><Link className="lp-category-card lp-category-card-estate" to="/imoveis"><img src="/social/noxvelia-estate-photo-premium.webp" alt="Imóvel anunciado na Noxvelia" /><span><small>Imóveis</small><strong>Ver imóveis</strong><em>Tipologia, localização, área e valor.</em></span></Link></div></div></section>

        {noticiasMercado.length > 0 && <section className="lp-section lp-news-section" id="atualidade" aria-labelledby="lp-news" data-aos="fade-up"><div className="lp-shell"><div className="lp-section-head"><div><span className="lp-kicker"><Newspaper size={13} /> Atualidade</span><h2 id="lp-news">Mercado em Portugal</h2><p className="lp-section-copy">Notícias recentes sobre automóveis, habitação e crédito.</p></div></div><div className="lp-news-grid">{noticiasMercado.map((noticia) => { const dataNoticia = formatarDataCurta(noticia.publishedAt); return <a className="lp-news-card" href={noticia.url} target="_blank" rel="noopener noreferrer" key={noticia.id || noticia.url}><span className={`lp-news-pill ${noticia.vertical === 'automoveis' ? 'cars' : 'homes'}`}>{noticia.verticalLabel || 'Mercado'}</span><h3>{noticia.title}</h3>{noticia.summary && <p>{noticia.summary}</p>}<span className="lp-news-meta">{noticia.source}{dataNoticia ? ` · ${dataNoticia}` : ''}</span></a>; })}</div></div></section>}
        {mostrarDestaques && <section className="lp-section lp-listing-section" id="destaques" aria-labelledby="lp-featured" data-aos="fade-up"><div className="lp-shell"><div className="lp-section-head"><div><span className="lp-kicker">Anúncios</span><h2 id="lp-featured">Recentes na Noxvelia</h2></div></div><div className="lp-listing-columns">{(loadingExemplos || exemplos.carro.length > 0) && <div className="lp-listing-column"><div className="lp-column-top"><h3><Car size={16} /> Automóveis</h3><button type="button" onClick={() => navigate('/carros')}>Ver automóveis</button></div><div className="lp-listing-list">{exemplos.carro.length > 0 ? renderAnunciosSwiper(exemplos.carro, '/carros') : renderEstadoLista('automóveis', '/carros')}</div></div>}{(loadingExemplos || exemplos.imovel.length > 0) && <div className="lp-listing-column"><div className="lp-column-top"><h3><HomeIcon size={16} /> Imóveis</h3><button type="button" onClick={() => navigate('/imoveis')}>Ver imóveis</button></div><div className="lp-listing-list">{exemplos.imovel.length > 0 ? renderAnunciosSwiper(exemplos.imovel, '/imoveis') : renderEstadoLista('imóveis', '/imoveis')}</div></div>}</div></div></section>}

        <section className="lp-section lp-sell-section" id="anunciar" aria-labelledby="lp-sell" data-aos="fade-up"><div className="lp-shell lp-sell-box"><div><span className="lp-kicker">Anunciar</span><h2 id="lp-sell">Tens algo para vender?</h2><p>Publica grátis e recebe contactos no anúncio.</p></div><Link className="lp-main-cta" to={publicarTo} state={publicarState} onPointerEnter={animarCta}>Criar anúncio <ArrowRight size={16} /></Link>{temProfissionaisAtivos && <Link className="lp-soft-cta" to="/profissionais"><Building2 size={16} /> Ver profissionais</Link>}</div></section>

        <AdBanner mode="direct" placement="landing_between_highlights" minHeight={176} mobileMinHeight={150} />

        <section className="lp-section lp-cv-section" id="carvertical" aria-labelledby="lp-cv" data-aos="fade-up"><div className="lp-shell lp-cv-card"><div><span className="lp-kicker"><ShieldCheck size={12} /> Histórico automóvel</span><h2 id="lp-cv">20% de desconto na carVertical</h2><p>Consulta dados disponíveis sobre histórico, quilometragem e registos do veículo antes de fechar negócio.</p><a className="lp-main-cta" href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer" onPointerEnter={animarCta}>Verificar veículo <ArrowRight size={16} /></a></div><div className="lp-cv-panel"><img src="/carvertical-logo.png" alt="carVertical" /><strong>20%</strong><span>de desconto através do link Noxvelia.</span></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
