import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleAdSlot from '../../components/GoogleAdSlot';
import api from '../../services/api';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS } from '../../data/localizacoes';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import { getImageUrl } from '../../utils/images';
import { anuncioPath, homePageJsonLd, siteIdentityJsonLd } from '../../utils/seo';
import { useAuth } from '../../context/AuthContext';
import { publishIntentState } from '../../utils/navigationState';
import { trackFunnelEvent } from '../../utils/funnelAnalytics';
import { COOKIE_CONSENT_CHANGED_EVENT, readCookieConsent } from '../../utils/cookieConsent';

const CARVERTICAL_URL = 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';

const MARCAS_POPULARES = ['Peugeot', 'Renault', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Audi', 'Toyota', 'Tesla'];
const MARCAS_MONTRA = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Peugeot', 'Renault', 'Toyota', 'Tesla', 'Porsche', 'Volvo', 'Hyundai', 'Kia'].filter((marca) => MARCAS.includes(marca));
const MODELOS_POPULARES = [
  ['Renault', 'Clio'],
  ['Peugeot', '208'],
  ['Peugeot', '2008'],
  ['Mercedes-Benz', 'A 180'],
  ['BMW', '116'],
  ['Opel', 'Corsa'],
];
const COMBUSTIVEIS_POPULARES = ['Diesel', 'Gasolina', 'Eléctrico', 'Híbrido', 'GPL'];
const DISTRITOS_POPULARES = ['Lisboa', 'Porto', 'Braga', 'Setúbal', 'Aveiro', 'Faro', 'Coimbra', 'Leiria'];
const TIPOLOGIAS_POPULARES = ['T1', 'T2', 'T3', 'T4', 'T5+'];
const PRECOS_RAPIDOS = [
  { label: 'Até 10.000 €', value: '10000' },
  { label: 'Até 20.000 €', value: '20000' },
  { label: 'Até 150.000 €', value: '150000' },
  { label: 'Até 300.000 €', value: '300000' },
];

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(valor || 0);

const formatarContagem = (valor) => (
  valor === null || valor === undefined ? '...' : new Intl.NumberFormat('pt-PT').format(valor)
);

const slugMarca = (marca) => marca
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const logoMarca = (marca) => `/marcas/${slugMarca(marca)}.${marca === 'Jaecoo' ? 'svg' : 'png'}`;

const iniciaisMarca = (marca) => marca
  .split(/[\s&-]+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((parte) => parte[0])
  .join('')
  .toUpperCase();

const LOGOS_COM_TEXTO_EMBUTIDO = new Set(['aiways', 'aston-martin', 'bentley']);

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signed } = useAuth();
  const landingViewTrackedRef = useRef(false);
  const publicarTo = signed ? '/publicar' : '/login';
  const publicarState = signed ? undefined : publishIntentState(location, '/');
  const [exemplos, setExemplos] = useState({ carro: [], imovel: [] });
  const [resumoPublico, setResumoPublico] = useState(null);
  const [loadingExemplos, setLoadingExemplos] = useState(true);
  const [erroExemplos, setErroExemplos] = useState(false);
  const [pesquisaRapida, setPesquisaRapida] = useState({
    tipo: 'carro',
    marca: '',
    modelo: '',
    combustivel: '',
    tipologia: '',
    distrito: '',
    precoMax: '',
  });

  useEffect(() => {
    const trackLandingViewOnce = () => {
      if (landingViewTrackedRef.current) return;
      if (readCookieConsent()?.external !== true) return;
      landingViewTrackedRef.current = true;
      trackFunnelEvent('landing_view');
    };

    trackLandingViewOnce();
    const onConsentChanged = (event) => {
      if (event?.detail?.external === true || readCookieConsent()?.external === true) {
        trackLandingViewOnce();
      }
    };
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onConsentChanged);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, onConsentChanged);
  }, []);

  useEffect(() => {
    let ativo = true;
    api.get('/anuncios/resumo-publico')
      .then(({ data }) => {
        if (ativo) setResumoPublico(data || null);
      })
      .catch(() => {
        if (ativo) setResumoPublico(null);
      });
    return () => { ativo = false; };
  }, []);

  useEffect(() => {
    let ativo = true;
    const carregarExemplos = async () => {
      try {
        const { data } = await api.get('/anuncios/em-alta/semana');
        if (!ativo) return;
        setExemplos({
          carro: (data?.carro || []).slice(0, 2),
          imovel: (data?.imovel || []).slice(0, 2),
        });
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
  const modelosPesquisa = pesquisaRapida.tipo === 'carro' && pesquisaRapida.marca
    ? getModelosPorMarca(pesquisaRapida.marca).map((modelo) => (typeof modelo === 'object' ? modelo.modelo || modelo.nome : modelo)).filter(Boolean)
    : [];
  const temProfissionaisAtivos = Number(resumoPublico?.profissionais || 0) > 0;
  const metricasHome = [
    { label: 'Anúncios ativos', value: resumoPublico?.totalAnuncios },
    { label: 'Carros', value: resumoPublico?.carros },
    { label: 'Imóveis', value: resumoPublico?.imoveis },
    temProfissionaisAtivos ? { label: 'Profissionais', value: resumoPublico?.profissionais } : null,
  ].filter((metrica) => metrica && Number(metrica.value || 0) > 0);

  const criarLinkPesquisa = (tipo, filtros = {}) => {
    const params = new URLSearchParams();
    params.set('tipo', tipo);
    Object.entries(filtros).forEach(([chave, valor]) => {
      if (valor) params.set(chave, valor);
    });
    return `${tipo === 'carro' ? '/carros' : '/imoveis'}?${params.toString()}`;
  };

  const atualizarPesquisaRapida = (campo, valor) => {
    setPesquisaRapida((atual) => {
      const proximo = { ...atual, [campo]: valor };
      if (campo === 'tipo') {
        return { ...proximo, marca: '', modelo: '', combustivel: '', tipologia: '' };
      }
      if (campo === 'marca') proximo.modelo = '';
      return proximo;
    });
  };

  const submeterPesquisaRapida = (evento) => {
    evento.preventDefault();
    const { tipo, marca, modelo, combustivel, tipologia, distrito, precoMax } = pesquisaRapida;
    const filtros = {
      distrito,
      precoMax,
      ...(tipo === 'carro' ? { marca, modelo, combustivel } : { tipologia }),
    };
    trackFunnelEvent('search_start', { vertical: tipo });
    navigate(criarLinkPesquisa(tipo, filtros));
  };

  const abrirExemplo = (anuncio, origem) => {
    try {
      localStorage.setItem('@App:contexto_visual', origem === '/carros' ? 'carro' : 'imovel');
    } catch {
      // A navegação continua disponível quando o armazenamento local está bloqueado.
    }
    navigate(anuncioPath(anuncio));
  };

  const mostrarDestaques = loadingExemplos || exemplos.carro.length > 0 || exemplos.imovel.length > 0;

  const renderExemplo = (anuncio, origem) => {
    const isCarro = anuncio.tipo === 'carro';
    const foto = getImageUrl(anuncio.fotos?.[0] || anuncio.imagens?.[0], 'medium');
    const detalhe = isCarro
      ? [
          anuncio.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null,
          anuncio.carro?.combustivel,
        ].filter(Boolean).join(' · ')
      : [
          anuncio.imovel?.tipologia || anuncio.imovel?.tipoImovel,
          anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null,
        ].filter(Boolean).join(' · ');

    return (
      <button type="button" key={anuncio._id} className="lp-example-card" onClick={() => abrirExemplo(anuncio, origem)}>
        <span className="lp-example-img">
          {foto ? (
            <img src={foto} width="800" height="600" alt={anuncio.titulo || (isCarro ? 'Automóvel' : 'Imóvel')} loading="lazy" />
          ) : (
            <span className="lp-example-no-photo">Sem fotografia</span>
          )}
        </span>
        <span className="lp-example-body">
          <span className="lp-example-price">{formatarMoeda(anuncio.preco)}</span>
          <span className="lp-example-title">{anuncio.titulo}</span>
          <span className="lp-example-meta">{detalhe || (isCarro ? 'Dados técnicos disponíveis' : 'Detalhes do imóvel')}</span>
          <span className="lp-example-location">{anuncio.localizacao?.cidade || 'Portugal'}</span>
        </span>
      </button>
    );
  };

  const renderEstadoLista = (tipo, rota) => {
    if (loadingExemplos) {
      return (
        <div className="lp-example-state" role="status">
          <strong>A carregar destaques.</strong>
          <span>Estamos a preparar uma seleção recente.</span>
        </div>
      );
    }

    return (
      <div className="lp-example-state" role="status">
        <strong>{erroExemplos ? 'Os destaques estão a ser atualizados.' : `Vê todos os anúncios em ${tipo}.`}</strong>
        <span>{erroExemplos ? 'A pesquisa completa continua disponível.' : 'Explora a lista completa com todos os filtros.'}</span>
        <button type="button" className="lp-link-button" onClick={() => navigate(rota)}>Explorar {tipo}</button>
      </div>
    );
  };

  return (
    <div className="lp-root">
      <Seo title="Noxvelia | Plataforma de carros e imóveis em Portugal" description="Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis." path="/" jsonLd={[siteIdentityJsonLd, homePageJsonLd]} />
      <style>{`
        .lp-root, .lp-root * { box-sizing: border-box; }
        .lp-root {
          --lp-navy: #071326; --lp-blue: #102f50; --lp-gold: #d9c49c; --lp-gold-soft: #f0dfbb;
          --lp-paper: #fffaf0; --lp-stone: #f4efe5; --lp-line: rgba(7, 19, 38, 0.14); --lp-muted: #546575;
          min-height: 100vh; overflow-x: hidden; background: var(--lp-stone); color: var(--lp-navy);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .lp-root a, .lp-root button, .lp-root input, .lp-root select { font: inherit; }
        .lp-root a:focus-visible, .lp-root button:focus-visible, .lp-root select:focus-visible { outline: 3px solid rgba(217, 196, 156, 0.5); outline-offset: 3px; }
        .lp-shell { width: min(1220px, calc(100% - 48px)); margin: 0 auto; }
        .lp-hero { position: relative; isolation: isolate; min-height: clamp(620px, calc(100vh - 74px), 760px); display: flex; align-items: stretch; overflow: hidden; background: var(--lp-navy); }
        .lp-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 62% center; z-index: -2; }
        .lp-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(7,19,38,.95) 0%, rgba(7,19,38,.82) 42%, rgba(7,19,38,.36) 72%, rgba(7,19,38,.18) 100%), linear-gradient(0deg, rgba(7,19,38,.78) 0%, rgba(7,19,38,.12) 58%); }
        .lp-hero-inner { display: grid; grid-template-columns: minmax(0, 1fr) minmax(360px, 470px); gap: clamp(28px, 5vw, 70px); align-items: center; padding: clamp(64px, 8vw, 112px) 0 54px; }
        .lp-hero-copyblock { max-width: 690px; color: #fffaf0; }
        .lp-hero-brand { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 22px; color: #fffaf0; font-size: 13px; font-weight: 900; letter-spacing: .12em; }
        .lp-hero-brand img { width: 32px; height: 32px; object-fit: contain; }
        .lp-kicker, .lp-eyebrow { display: inline-flex; width: fit-content; margin: 0 0 14px; padding: 7px 10px; color: var(--lp-gold-soft); border: 1px solid rgba(240,223,187,.3); border-radius: 8px; background: rgba(240,223,187,.1); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .lp-hero h1 { max-width: 680px; margin: 0; color: #fffaf0; font-size: clamp(42px, 5vw, 68px); font-weight: 850; line-height: .98; letter-spacing: 0; text-wrap: balance; }
        .lp-hero-copy { max-width: 570px; margin: 22px 0 0; color: rgba(255,250,240,.82); font-size: 16px; line-height: 1.7; }
        .lp-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }        .lp-btn, .lp-text-link, .lp-search-submit, .lp-link-button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; border: 1px solid transparent; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 850; cursor: pointer; transition: background-color .18s ease, border-color .18s ease, color .18s ease, transform .18s ease !important; }
        .lp-btn-primary, .lp-search-submit { color: var(--lp-navy); background: var(--lp-gold); border-color: var(--lp-gold); }
        .lp-text-link { color: #fffaf0; border-color: rgba(240,223,187,.35); background: rgba(255,250,240,.08); }
        .lp-btn:hover, .lp-text-link:hover, .lp-search-submit:hover, .lp-link-button:hover { transform: translateY(-1px) !important; }
        .lp-search-panel { align-self: center; padding: 18px; border: 1px solid rgba(240,223,187,.28); border-radius: 14px; background: rgba(255,250,240,.96); box-shadow: 0 32px 90px -62px rgba(0,0,0,.9); }
        .lp-search-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 16px; }
        .lp-search-head h2 { margin: 0; color: var(--lp-navy); font-size: 24px; line-height: 1.08; letter-spacing: 0; }
        .lp-search-head p { margin: 8px 0 0; color: var(--lp-muted); font-size: 13px; line-height: 1.45; }
        .lp-type-tabs { flex: 0 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; padding: 4px; border: 1px solid rgba(7,19,38,.13); border-radius: 10px; background: #e9dfce; }
        .lp-type-tab { min-height: 38px; padding: 0 13px; color: #425365; border: 0; border-radius: 7px; background: transparent; font-size: 13px; font-weight: 850; cursor: pointer; }
        .lp-type-tab.active { color: var(--lp-navy); background: var(--lp-gold); }
        .lp-search-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
        .lp-field { min-width: 0; display: flex; flex-direction: column; gap: 6px; }
        .lp-field label { color: #4d5f70; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .lp-field select { width: 100%; min-height: 46px; padding: 0 12px; color: var(--lp-navy); border: 1px solid rgba(7,19,38,.16); border-radius: 8px; background: #fff; font-size: 13px; font-weight: 740; }
        .lp-field select:disabled { color: #8793a0; background: #f4f2eb; }
        .lp-search-submit { grid-column: 1 / -1; width: 100%; margin-top: 2px; }
        .lp-metrics { background: var(--lp-paper); border-bottom: 1px solid var(--lp-line); }
        .lp-metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0; border-left: 1px solid var(--lp-line); }
        .lp-metric { min-height: 92px; display: flex; flex-direction: column; justify-content: center; padding: 18px; border-right: 1px solid var(--lp-line); }
        .lp-metric strong { color: var(--lp-navy); font-size: 28px; line-height: 1; }
        .lp-metric span { margin-top: 7px; color: #617182; font-size: 11px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
        .lp-section { padding: 76px 0; }
        .lp-section[id] { scroll-margin-top: 92px; }
        .lp-section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
        .lp-section-head > div:first-child { max-width: 720px; }
        .lp-title { margin: 0; color: var(--lp-navy); font-size: clamp(30px, 4vw, 46px); line-height: 1.05; letter-spacing: 0; }
        .lp-copy { margin: 14px 0 0; color: var(--lp-muted); font-size: 15px; line-height: 1.65; }
        .lp-promo-section { background: var(--lp-stone); }
        .lp-promo-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .lp-promo-link { min-width: 0; overflow: hidden; display: grid; grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr); min-height: 300px; color: inherit; border: 1px solid var(--lp-line); border-radius: 12px; background: var(--lp-paper); text-decoration: none; transition: border-color .18s ease, transform .18s ease !important; }
        .lp-promo-link:hover { border-color: rgba(16,47,80,.34); transform: translateY(-2px) !important; }
        .lp-promo-copy { display: flex; flex-direction: column; justify-content: center; gap: 13px; padding: clamp(24px, 3vw, 38px); }
        .lp-promo-label { width: fit-content; padding: 6px 9px; color: var(--lp-blue); border: 1px solid rgba(16,47,80,.18); border-radius: 7px; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .lp-promo-title { color: var(--lp-navy); font-size: clamp(25px, 3vw, 34px); line-height: 1.08; letter-spacing: 0; }
        .lp-promo-text { color: var(--lp-muted); font-size: 14px; line-height: 1.58; }
        .lp-promo-overlay { width: fit-content; color: var(--lp-navy); font-size: 13px; font-weight: 850; }
        .lp-promo-media img { width: 100%; height: 100%; min-height: 300px; display: block; object-fit: cover; }
        .lp-pro-strip { display: grid; grid-template-columns: 130px minmax(0, 1fr) auto; gap: 18px; align-items: center; margin-top: 18px; padding: 20px; color: #fffaf0; border-radius: 12px; background: var(--lp-navy); text-decoration: none; }
        .lp-pro-strip span { color: var(--lp-gold-soft); font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .lp-pro-strip strong { font-size: 20px; line-height: 1.2; }
        .lp-pro-strip em { color: var(--lp-navy); background: var(--lp-gold); border-radius: 8px; padding: 11px 14px; font-style: normal; font-size: 13px; font-weight: 850; }
        .lp-brands-section { background: var(--lp-paper); border-top: 1px solid var(--lp-line); border-bottom: 1px solid var(--lp-line); }
        .lp-brand-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr)); gap: 10px; }
        .lp-brand-card { min-height: 92px; display: grid; grid-template-rows: 42px auto; place-items: center; gap: 7px; padding: 12px; color: #384b5c; border: 1px solid var(--lp-line); border-radius: 10px; background: #fff; text-decoration: none; transition: border-color .18s ease, transform .18s ease !important; }
        .lp-brand-card:hover { border-color: rgba(217,196,156,.84); transform: translateY(-2px) !important; }
        .lp-brand-mark { position: relative; width: 100px; height: 42px; display: grid; place-items: center; overflow: hidden; }
        .lp-brand-mark img { position: relative; z-index: 1; max-width: 100%; max-height: 42px; object-fit: contain; }
        .lp-brand-fallback { position: absolute; inset: 0; display: none; place-items: center; color: var(--lp-blue); font-weight: 900; }
        .lp-brand-mark.logo-error .lp-brand-fallback { display: grid; }
        .lp-brand-mark-clean::after { content: ""; position: absolute; z-index: 2; right: 0; bottom: 0; left: 0; height: 15px; background: linear-gradient(180deg, rgba(255,255,255,0), #fff 56%); pointer-events: none; }
        .lp-brand-name { color: #435668; font-size: 11px; font-weight: 820; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }        .lp-shortcuts-section { background: var(--lp-stone); }
        .lp-shortcut-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .lp-shortcut-group { min-width: 0; padding: 18px; border: 1px solid var(--lp-line); border-radius: 12px; background: var(--lp-paper); }
        .lp-shortcut-group.wide { grid-column: span 2; }
        .lp-shortcut-group h3 { margin: 0 0 13px; color: var(--lp-navy); font-size: 15px; }
        .lp-chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .lp-chip { min-height: 34px; display: inline-flex; align-items: center; padding: 0 11px; color: var(--lp-blue); border: 1px solid rgba(16,47,80,.16); border-radius: 999px; background: #fff; text-decoration: none; font-size: 12px; font-weight: 780; }
        .lp-popular-section { background: var(--lp-navy); color: #fffaf0; }
        .lp-popular-section .lp-title { color: #fffaf0; }
        .lp-popular-section .lp-copy { color: rgba(255,250,240,.76); }
        .lp-examples-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .lp-example-column { min-width: 0; padding: 16px; border: 1px solid rgba(240,223,187,.18); border-radius: 12px; background: rgba(255,250,240,.06); }
        .lp-column-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
        .lp-column-title { margin: 0; color: #fffaf0; font-size: 17px; }
        .lp-link-button { min-height: 38px; padding: 0 12px; color: var(--lp-navy); background: var(--lp-gold); border-color: var(--lp-gold); }
        .lp-example-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .lp-example-card { overflow: hidden; display: flex; flex-direction: column; padding: 0; color: inherit; border: 1px solid rgba(240,223,187,.16); border-radius: 10px; background: rgba(255,250,240,.08); text-align: left; cursor: pointer; }
        .lp-example-img { position: relative; aspect-ratio: 16 / 10; display: block; overflow: hidden; background: rgba(255,255,255,.08); }
        .lp-example-img img { width: 100%; height: 100%; display: block; object-fit: cover; }
        .lp-example-no-photo { height: 100%; display: grid; place-items: center; color: rgba(255,250,240,.7); font-size: 12px; }
        .lp-example-body { display: grid; gap: 6px; padding: 12px; }
        .lp-example-price { color: var(--lp-gold-soft); font-size: 18px; font-weight: 900; }
        .lp-example-title { color: #fffaf0; font-size: 13px; font-weight: 850; }
        .lp-example-meta, .lp-example-location { color: rgba(255,250,240,.68); font-size: 12px; }
        .lp-example-state { min-height: 180px; grid-column: 1 / -1; display: grid; place-content: center; gap: 8px; padding: 24px; color: rgba(255,250,240,.78); text-align: center; border: 1px dashed rgba(240,223,187,.22); border-radius: 10px; }
        .lp-example-state strong { color: #fffaf0; }
        .lp-cv-section { background: var(--lp-paper); }
        .lp-cv-card { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 420px); gap: 28px; align-items: center; padding: clamp(24px, 4vw, 42px); border: 1px solid var(--lp-line); border-radius: 12px; background: #fff; }
        .lp-cv-points { margin: 18px 0 22px; padding-left: 18px; color: var(--lp-muted); line-height: 1.7; }
        .lp-cv-panel { display: grid; place-items: center; gap: 18px; min-height: 260px; border-radius: 10px; background: var(--lp-stone); }
        .lp-cv-panel span { color: var(--lp-muted); font-size: 12px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
        .lp-cv-panel img { max-width: 220px; width: 70%; height: auto; }
        .lp-cv-code { display: grid; gap: 4px; padding: 12px 16px; border: 1px solid var(--lp-line); border-radius: 8px; background: #fff; text-align: center; }
        .lp-cv-code small { color: var(--lp-muted); font-size: 11px; text-transform: uppercase; }
        .lp-cv-code strong { color: var(--lp-navy); }
        .dark .lp-root { background: #071326; color: #fffaf0; }
        .dark .lp-metrics, .dark .lp-brands-section, .dark .lp-cv-section { background: #0d1d33; border-color: rgba(240,223,187,.14); }
        .dark .lp-search-panel, .dark .lp-promo-link, .dark .lp-shortcut-group, .dark .lp-brand-card, .dark .lp-cv-card { background: #102f50; border-color: rgba(240,223,187,.18); color: #fffaf0; }
        .dark .lp-title, .dark .lp-search-head h2, .dark .lp-promo-title, .dark .lp-shortcut-group h3, .dark .lp-metric strong, .dark .lp-cv-code strong { color: #fffaf0; }
        .dark .lp-copy, .dark .lp-search-head p, .dark .lp-promo-text, .dark .lp-brand-name, .dark .lp-field label { color: rgba(255,250,240,.72); }
        .dark .lp-field select { background: #071326; color: #fffaf0; border-color: rgba(240,223,187,.18); }
        .dark .lp-type-tabs, .dark .lp-cv-panel { background: #071326; }
        @media (max-width: 1040px) { .lp-hero { min-height: auto; } .lp-hero-inner { grid-template-columns: 1fr; padding-top: 58px; } .lp-search-panel { max-width: 760px; } .lp-promo-grid, .lp-examples-grid, .lp-cv-card { grid-template-columns: 1fr; } }
        @media (max-width: 720px) { .lp-shell { width: min(100% - 30px, 1220px); } .lp-hero-inner { padding: 42px 0 34px; gap: 24px; } .lp-hero h1 { font-size: clamp(36px, 12vw, 48px); } .lp-hero-copy { font-size: 15px; } .lp-search-panel { padding: 14px; border-radius: 10px; } .lp-search-head { display: grid; } .lp-type-tabs { width: 100%; } .lp-search-form { grid-template-columns: 1fr; } .lp-section { padding: 54px 0; } .lp-section-head { display: grid; } .lp-promo-link { grid-template-columns: 1fr; } .lp-promo-media img { min-height: 220px; } .lp-pro-strip { grid-template-columns: 1fr; } .lp-shortcut-grid { grid-template-columns: 1fr; } .lp-shortcut-group.wide { grid-column: auto; } .lp-example-list { grid-template-columns: 1fr; } }
      `}</style>

      <NavbarLanding />

      <section className="lp-hero" aria-labelledby="lp-hero-title">
        <img className="lp-hero-bg" src="/noxvelia-hero-coast.webp" alt="Automóvel junto a uma casa contemporânea na costa portuguesa" fetchPriority="high" decoding="async" onError={(event) => { event.currentTarget.src = '/social/noxvelia-estate-photo-premium.webp'; }} />
        <div className="lp-shell lp-hero-inner">
          <div className="lp-hero-copyblock">
            <div className="lp-hero-brand" aria-label="NOXVELIA">
              <img src="/logo-noxvelia.png" alt="" />
              <span>NOXVELIA</span>
            </div>
            <span className="lp-kicker">Pesquisa em Portugal</span>
            <h1 id="lp-hero-title">Compra, vende e compara carros e imóveis sem perder tempo.</h1>
            <p className="lp-hero-copy">A Noxvelia junta anúncios com fotografias, preço, localização e contacto direto para decidires melhor antes da visita.</p>
            <div className="lp-actions">
              <a className="lp-btn lp-btn-primary" href="#pesquisa">Pesquisar agora</a>
              <Link className="lp-text-link" to={publicarTo} state={publicarState}>Publicar grátis</Link>
            </div>
          </div>

          <form className="lp-search-panel" id="pesquisa" aria-labelledby="lp-search-title" onSubmit={submeterPesquisaRapida}>
            <div className="lp-search-head">
              <div>
                <span className="lp-eyebrow">Começa por aqui</span>
                <h2 id="lp-search-title">Pesquisa direta.</h2>
                <p>Filtra por tipo, localização e preço. Podes afinar mais depois.</p>
              </div>
              <div className="lp-type-tabs" role="tablist" aria-label="Tipo de pesquisa">
                <button type="button" role="tab" aria-selected={pesquisaRapida.tipo === 'carro'} className={`lp-type-tab ${pesquisaRapida.tipo === 'carro' ? 'active' : ''}`} onClick={() => atualizarPesquisaRapida('tipo', 'carro')}>Carros</button>
                <button type="button" role="tab" aria-selected={pesquisaRapida.tipo === 'imovel'} className={`lp-type-tab ${pesquisaRapida.tipo === 'imovel' ? 'active' : ''}`} onClick={() => atualizarPesquisaRapida('tipo', 'imovel')}>Imóveis</button>
              </div>
            </div>            <div className="lp-search-form">
              {pesquisaRapida.tipo === 'carro' ? (
                <>
                  <div className="lp-field"><label htmlFor="lp-marca">Marca</label><select id="lp-marca" value={pesquisaRapida.marca} onChange={(evento) => atualizarPesquisaRapida('marca', evento.target.value)}><option value="">Todas as marcas</option>{MARCAS.map((marca) => <option key={marca} value={marca}>{marca}</option>)}</select></div>
                  <div className="lp-field"><label htmlFor="lp-modelo">Modelo</label><select id="lp-modelo" value={pesquisaRapida.modelo} onChange={(evento) => atualizarPesquisaRapida('modelo', evento.target.value)} disabled={!pesquisaRapida.marca}><option value="">{pesquisaRapida.marca ? 'Todos os modelos' : 'Escolhe a marca'}</option>{modelosPesquisa.map((modelo) => <option key={modelo} value={modelo}>{modelo}</option>)}</select></div>
                  <div className="lp-field"><label htmlFor="lp-combustivel">Combustível</label><select id="lp-combustivel" value={pesquisaRapida.combustivel} onChange={(evento) => atualizarPesquisaRapida('combustivel', evento.target.value)}><option value="">Todos</option>{COMBUSTIVEIS_POPULARES.map((combustivel) => <option key={combustivel} value={combustivel}>{combustivel}</option>)}</select></div>
                  <div className="lp-field"><label htmlFor="lp-preco">Preço máximo</label><select id="lp-preco" value={pesquisaRapida.precoMax} onChange={(evento) => atualizarPesquisaRapida('precoMax', evento.target.value)}><option value="">Qualquer preço</option>{PRECOS_RAPIDOS.slice(0, 2).map((preco) => <option key={preco.value} value={preco.value}>{preco.label}</option>)}</select></div>
                </>
              ) : (
                <>
                  <div className="lp-field"><label htmlFor="lp-tipologia">Tipologia</label><select id="lp-tipologia" value={pesquisaRapida.tipologia} onChange={(evento) => atualizarPesquisaRapida('tipologia', evento.target.value)}><option value="">Todas</option>{TIPOLOGIAS_POPULARES.map((tipologia) => <option key={tipologia} value={tipologia}>{tipologia}</option>)}</select></div>
                  <div className="lp-field"><label htmlFor="lp-estate-preco">Preço máximo</label><select id="lp-estate-preco" value={pesquisaRapida.precoMax} onChange={(evento) => atualizarPesquisaRapida('precoMax', evento.target.value)}><option value="">Qualquer preço</option>{PRECOS_RAPIDOS.slice(2).map((preco) => <option key={preco.value} value={preco.value}>{preco.label}</option>)}</select></div>
                </>
              )}
              <div className="lp-field"><label htmlFor="lp-distrito">Distrito</label><select id="lp-distrito" value={pesquisaRapida.distrito} onChange={(evento) => atualizarPesquisaRapida('distrito', evento.target.value)}><option value="">Portugal inteiro</option>{DISTRITOS.map((distrito) => <option key={distrito} value={distrito}>{distrito}</option>)}</select></div>
              <button type="submit" className="lp-search-submit">Ver anúncios</button>
            </div>
          </form>
        </div>
      </section>

      {metricasHome.length > 0 && (
        <section className="lp-metrics" aria-label="Resumo da plataforma">
          <div className="lp-shell lp-metrics-grid">
            {metricasHome.map((metrica) => <div className="lp-metric" key={metrica.label}><strong>{formatarContagem(metrica.value)}</strong><span>{metrica.label}</span></div>)}
          </div>
        </section>
      )}

      <section className="lp-section lp-promo-section" id="anunciar" aria-label="Explorar anúncios na Noxvelia">
        <div className="lp-shell">
          <div className="lp-promo-grid">
            <Link className="lp-promo-link" to="/carros">
              <span className="lp-promo-copy"><span className="lp-promo-label">Carros</span><strong className="lp-promo-title">Automóveis com dados fáceis de comparar.</strong><span className="lp-promo-text">Marca, modelo, quilómetros, combustível, preço e localização antes do contacto.</span><span className="lp-promo-overlay">Pesquisar carro</span></span>
              <span className="lp-promo-media"><img src="/social/noxvelia-drive-photo-premium.webp" alt="Automóvel anunciado na Noxvelia" loading="lazy" /></span>
            </Link>
            <Link className="lp-promo-link" to="/imoveis">
              <span className="lp-promo-copy"><span className="lp-promo-label">Imóveis</span><strong className="lp-promo-title">Casas, apartamentos e espaços para visitar melhor informado.</strong><span className="lp-promo-text">Compara fotografias, localização, tipologia, áreas e preço antes de marcar visita.</span><span className="lp-promo-overlay">Pesquisar imóvel</span></span>
              <span className="lp-promo-media"><img src="/social/noxvelia-estate-photo-premium.webp" alt="Imóvel anunciado na Noxvelia" loading="lazy" /></span>
            </Link>
          </div>
          <Link className="lp-pro-strip" to={temProfissionaisAtivos ? '/profissionais' : publicarTo} state={temProfissionaisAtivos ? undefined : publicarState}>
            <span>{temProfissionaisAtivos ? 'Profissionais' : 'Anunciar'}</span>
            <strong>{temProfissionaisAtivos ? 'Stands, mediadores e vendedores com anúncios disponíveis.' : 'Publica o teu carro ou imóvel e recebe contactos diretamente.'}</strong>
            <em>{temProfissionaisAtivos ? 'Ver profissionais' : 'Publicar anúncio'}</em>
          </Link>
        </div>
      </section>

      <section className="lp-section lp-brands-section" id="marcas" aria-labelledby="lp-brands-title">
        <div className="lp-shell">
          <div className="lp-section-head"><div><span className="lp-eyebrow">Marcas</span><h2 className="lp-title" id="lp-brands-title">Pesquisa por marca, sem voltar ao início.</h2><p className="lp-copy">Escolhe uma marca popular ou usa o campo de marca na pesquisa principal.</p></div></div>
          <div className="lp-brand-grid" aria-label="Marcas automóveis populares">
            {(MARCAS_MONTRA.length > 0 ? MARCAS_MONTRA : MARCAS_POPULARES).map((marca) => {
              const marcaSlug = slugMarca(marca);
              return (
                <Link className="lp-brand-card" to={`/carros?marca=${encodeURIComponent(marca)}`} key={marca} aria-label={`Ver anúncios ${marca}`}>
                  <span className={`lp-brand-mark lp-brand-mark-${marcaSlug} ${LOGOS_COM_TEXTO_EMBUTIDO.has(marcaSlug) ? 'lp-brand-mark-clean' : ''}`}>
                    <span className="lp-brand-fallback" aria-hidden="true">{iniciaisMarca(marca)}</span>
                    <img src={logoMarca(marca)} alt="" loading="lazy" draggable="false" onError={(evento) => { evento.currentTarget.style.display = 'none'; evento.currentTarget.parentElement?.classList.add('logo-error'); }} />
                  </span>
                  <span className="lp-brand-name">{marca}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="lp-section lp-shortcuts-section" id="atalhos" aria-labelledby="lp-shortcuts-title">
        <div className="lp-shell">
          <div className="lp-section-head"><div><span className="lp-eyebrow">Atalhos</span><h2 className="lp-title" id="lp-shortcuts-title">Entradas rápidas para pesquisas comuns.</h2><p className="lp-copy">Links diretos para marcas, modelos, distritos, combustíveis e tipologias populares.</p></div></div>
          <div className="lp-shortcut-grid">
            <div className="lp-shortcut-group"><h3>Marcas mais procuradas</h3><div className="lp-chip-list">{MARCAS_POPULARES.map((marca) => <Link key={marca} className="lp-chip" to={criarLinkPesquisa('carro', { marca })}>{marca}</Link>)}</div></div>
            <div className="lp-shortcut-group wide"><h3>Modelos rápidos</h3><div className="lp-chip-list">{MODELOS_POPULARES.map(([marca, modelo]) => <Link key={`${marca}-${modelo}`} className="lp-chip" to={criarLinkPesquisa('carro', { marca, modelo })}>{marca} {modelo}</Link>)}</div></div>
            <div className="lp-shortcut-group"><h3>Combustíveis</h3><div className="lp-chip-list">{COMBUSTIVEIS_POPULARES.map((combustivel) => <Link key={combustivel} className="lp-chip" to={criarLinkPesquisa('carro', { combustivel })}>{combustivel}</Link>)}</div></div>
            <div className="lp-shortcut-group"><h3>Distritos</h3><div className="lp-chip-list">{DISTRITOS_POPULARES.map((distrito) => <Link key={distrito} className="lp-chip" to={criarLinkPesquisa('carro', { distrito })}>{distrito}</Link>)}</div></div>
            <div className="lp-shortcut-group"><h3>Imóveis</h3><div className="lp-chip-list">{TIPOLOGIAS_POPULARES.map((tipologia) => <Link key={tipologia} className="lp-chip" to={criarLinkPesquisa('imovel', { tipologia })}>{tipologia}</Link>)}{DISTRITOS_POPULARES.slice(0, 4).map((distrito) => <Link key={`imovel-${distrito}`} className="lp-chip" to={criarLinkPesquisa('imovel', { distrito })}>{distrito}</Link>)}</div></div>
          </div>
        </div>
      </section>

      {mostrarDestaques && (
        <section className="lp-section lp-popular-section" id="destaques" aria-labelledby="lp-popular-title">
          <div className="lp-shell">
            <div className="lp-section-head"><div><span className="lp-eyebrow">Seleção atual</span><h2 className="lp-title" id="lp-popular-title">Destaques recentes.</h2><p className="lp-copy">Anúncios de carros e imóveis prontos a explorar.</p></div></div>
            <div className="lp-examples-grid" aria-live="polite">
              {(loadingExemplos || exemplos.carro.length > 0) && (
                <div className="lp-example-column">
                  <div className="lp-column-top"><h3 className="lp-column-title">Carros</h3><button type="button" className="lp-link-button" onClick={() => navigate('/carros')}>Ver carros</button></div>
                  <div className="lp-example-list">{exemplos.carro.length > 0 ? exemplos.carro.map((anuncio) => renderExemplo(anuncio, '/carros')) : renderEstadoLista('carros', '/carros')}</div>
                </div>
              )}
              {(loadingExemplos || exemplos.imovel.length > 0) && (
                <div className="lp-example-column">
                  <div className="lp-column-top"><h3 className="lp-column-title">Imóveis</h3><button type="button" className="lp-link-button" onClick={() => navigate('/imoveis')}>Ver imóveis</button></div>
                  <div className="lp-example-list">{exemplos.imovel.length > 0 ? exemplos.imovel.map((anuncio) => renderExemplo(anuncio, '/imoveis')) : renderEstadoLista('imóveis', '/imoveis')}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <GoogleAdSlot placement="landing_between_highlights" minHeight={96} />

      <section className="lp-section lp-cv-section" id="carvertical" aria-labelledby="lp-cv-title">
        <div className="lp-shell">
          <div className="lp-cv-card">
            <div className="lp-cv-copy">
              <span className="lp-eyebrow">Parceiro de histórico automóvel</span>
              <h2 className="lp-title" id="lp-cv-title">Conhece o carro antes da visita.</h2>
              <p className="lp-copy">Consulta histórico, quilometragem e registos disponíveis.</p>
              <ul className="lp-cv-points"><li>Histórico antes do contacto</li><li>Mais segurança na compra</li></ul>
              <a className="lp-btn lp-btn-primary" href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer">Verificar um veículo</a>
            </div>
            <div className="lp-cv-panel">
              <span>Histórico automóvel com</span>
              <img src="/carvertical-logo.png" alt="carVertical" loading="lazy" />
              <div className="lp-cv-code"><small>Código</small><strong>NOXVELIA</strong></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}