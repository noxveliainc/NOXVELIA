import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleAdSlot from '../../components/GoogleAdSlot';
import SponsorBanner from '../../components/SponsorBanner';
import api from '../../services/api';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS } from '../../data/localizacoes';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import { getImageUrl } from '../../utils/images';
import { anuncioPath } from '../../utils/seo';
import { useAuth } from '../../context/AuthContext';
import { publishIntentState } from '../../utils/navigationState';

const CARVERTICAL_URL = 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';

const MARCAS_POPULARES = ['Peugeot', 'Renault', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Audi', 'Toyota', 'Tesla'];
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

const GUIAS_NOXVELIA = [
  {
    tema: 'Comprar melhor',
    titulo: 'Antes de contactar, confirma o essencial.',
    texto: 'Preço, localização, fotografias e detalhes antes do contacto.',
  },
  {
    tema: 'Vender mais rápido',
    titulo: 'Mostra melhor.',
    texto: 'Boas imagens e informação concreta geram contactos melhores.',
  },
  {
    tema: 'Guardar oportunidades',
    titulo: 'Guarda para comparar.',
    texto: 'Mantém boas oportunidades à mão e decide com calma.',
  },
];

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(valor || 0);

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

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signed } = useAuth();
  const marcasRef = useRef(null);
  const publicarTo = signed ? '/publicar' : '/login';
  const publicarState = signed ? undefined : publishIntentState(location, '/');
  const [exemplos, setExemplos] = useState({ carro: [], imovel: [] });
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

  const modelosPesquisa = pesquisaRapida.tipo === 'carro' && pesquisaRapida.marca
    ? getModelosPorMarca(pesquisaRapida.marca).map((modelo) => (typeof modelo === 'object' ? modelo.modelo || modelo.nome : modelo)).filter(Boolean)
    : [];

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
        return {
          ...proximo,
          marca: '',
          modelo: '',
          combustivel: '',
          tipologia: '',
        };
      }

      if (campo === 'marca') {
        proximo.modelo = '';
      }

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

    navigate(criarLinkPesquisa(tipo, filtros));
  };

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

  const abrirExemplo = (anuncio, origem) => {
    try {
      localStorage.setItem('@App:contexto_visual', origem === '/carros' ? 'carro' : 'imovel');
    } catch {
      // A navegação continua disponível quando o armazenamento local está bloqueado.
    }
    navigate(anuncioPath(anuncio));
  };

  const moverMarcas = (direcao) => {
    marcasRef.current?.scrollBy({
      left: direcao * Math.min(720, window.innerWidth * 0.72),
      behavior: 'smooth',
    });
  };

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
      <button
        type="button"
        key={anuncio._id}
        className={`lp-example-card ${isCarro ? 'drive' : 'estate'}`}
        onClick={() => abrirExemplo(anuncio, origem)}
      >
        <span className="lp-example-img">
          {foto ? (
            <img src={foto} width="800" height="600" alt={anuncio.titulo || (isCarro ? 'Automóvel' : 'Imóvel')} loading="lazy" />
          ) : (
            <span className="lp-example-no-photo">Sem fotografia</span>
          )}
          <span className="lp-example-weekly">{anuncio.visitasSemana || 0} visitas esta semana</span>
        </span>
        <span className="lp-example-body">
          <span className="lp-example-price">{formatarMoeda(anuncio.preco)}</span>
          <span className="lp-example-title">{anuncio.titulo}</span>
          <span className="lp-example-meta">
            {detalhe || (isCarro ? 'Dados técnicos disponíveis' : 'Detalhes do imóvel')}
          </span>
          <span className="lp-example-location">
            {anuncio.localizacao?.cidade || 'Portugal'}
          </span>
        </span>
      </button>
    );
  };

  const renderEstadoLista = (tipo, rota) => {
    if (loadingExemplos) {
      return (
        <div className="lp-example-state" role="status">
          <span className="lp-state-loader" aria-hidden="true" />
          <strong>A selecionar os anúncios com mais interesse.</strong>
          <span>Os destaques refletem as visitas dos últimos sete dias.</span>
        </div>
      );
    }

    return (
      <div className="lp-example-state" role="status">
        <strong>{erroExemplos ? 'A seleção semanal está a ser atualizada.' : `Descobre todas as oportunidades em ${tipo}.`}</strong>
        <span>{erroExemplos ? 'Entretanto, encontra todos os anúncios na pesquisa completa.' : 'Explora a pesquisa e encontra o que combina contigo.'}</span>
        <button type="button" className="lp-column-link" onClick={() => navigate(rota)}>
          Explorar {tipo}
        </button>
      </div>
    );
  };

  return (
    <div className="lp-root">
      <Seo title="Noxvelia | Carros e imóveis em Portugal" description="Encontra, compara e publica anúncios de carros e imóveis em Portugal na Noxvelia." path="/" jsonLd={[{ '@context': 'https://schema.org', '@type': 'Organization', name: 'Noxvelia', url: 'https://www.noxvelia.com', logo: 'https://www.noxvelia.com/logo-noxvelia.png' }, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Noxvelia', url: 'https://www.noxvelia.com' }]} />
      <style>{`
        .lp-root,
        .lp-root * {
          box-sizing: border-box;
        }

        .lp-root {
          --lp-ink: #082126;
          --lp-ink-soft: #254047;
          --lp-drive: #2ac1b4;
          --lp-estate: #3ecf8e;
          --lp-gold: #c6a86a;
          --lp-stone: #f2f0e8;
          --lp-cream: #fbfaf6;
          min-height: 100vh;
          overflow: clip;
          background: var(--lp-stone);
          color: var(--lp-ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .lp-root button,
        .lp-root a {
          font: inherit;
        }

        .lp-root a:focus-visible,
        .lp-root button:focus-visible {
          outline: 3px solid rgba(42, 193, 180, 0.48);
          outline-offset: 3px;
        }

        .lp-shell {
          width: min(1260px, calc(100% - 48px));
          margin: 0 auto;
        }

        .lp-hero {
          position: relative;
          padding: 30px 0 58px;
          background: var(--lp-bg);
        }

        .lp-hero-card {
          min-height: 520px;
          display: grid;
          grid-template-columns: minmax(430px, 0.86fr) minmax(0, 1.14fr);
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 32px;
          background: var(--lp-ink);
          box-shadow: none;
        }

        .lp-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(38px, 4vw, 54px);
          color: #fff;
          background: var(--lp-ink);
        }

        .lp-hero-content::after {
          content: "";
          position: absolute;
          right: -56px;
          top: 0;
          bottom: 0;
          width: 112px;
          z-index: -1;
          background: transparent;
          pointer-events: none;
        }

        .lp-kicker,
        .lp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .lp-kicker {
          margin-bottom: 22px;
          padding: 8px 11px;
          color: #dcfff9;
          border: 1px solid rgba(104, 232, 214, 0.28);
          border-radius: 999px;
          background: rgba(42, 193, 180, 0.12);
        }

        .lp-hero h1 {
          max-width: 680px;
          margin: 0;
          font-size: clamp(39px, 4.4vw, 54px);
          font-weight: 780;
          line-height: 0.99;
          letter-spacing: -0.052em;
          text-wrap: balance;
        }

        .lp-hero h1 span {
          color: #7be0d4;
        }

        .lp-hero-copy {
          max-width: 570px;
          margin: 20px 0 0;
          color: #c8d6d8;
          font-size: 15px;
          line-height: 1.65;
        }

        .lp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 24px;
        }

        .lp-btn {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 19px;
          border: 1px solid transparent;
          border-radius: 12px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .lp-btn:hover {
          border-color: rgba(255, 255, 255, 0.28);
        }

        .lp-btn-drive {
          color: #052326;
          background: var(--lp-drive);
          box-shadow: none;
        }

        .lp-btn-estate {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }

        .lp-btn-estate:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.36);
        }

        .lp-hero-media {
          position: relative;
          min-width: 0;
          background: #b8d4cd;
        }

        .lp-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: transparent;
          pointer-events: none;
        }

        .lp-hero-media img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          display: block;
          object-fit: cover;
          object-position: 58% center;
        }

        .lp-hero-photo-label {
          position: absolute;
          z-index: 2;
          right: 22px;
          bottom: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          color: #102b30;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.88);
          box-shadow: none;
          backdrop-filter: none;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-trust-bar {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .lp-trust-item {
          min-height: 62px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 15px;
          color: #365158;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.58);
          font-size: 12.5px;
          font-weight: 750;
          backdrop-filter: none;
        }

        .lp-quick-section {
          position: relative;
          z-index: 4;
          padding: 0 0 72px;
          background: var(--lp-stone);
        }

        .lp-quick-card {
          margin-top: -34px;
          padding: 18px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: none;
          backdrop-filter: none;
        }

        .lp-quick-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 16px;
        }

        .lp-quick-title {
          margin: 0;
          color: var(--lp-ink);
          font-size: 18px;
          font-weight: 850;
          letter-spacing: -0.02em;
        }

        .lp-type-tabs {
          display: inline-grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 5px;
          padding: 5px;
          border: 1px solid rgba(8, 33, 38, 0.09);
          border-radius: 13px;
          background: #f4f7f4;
        }

        .lp-type-tab {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 14px;
          color: #4a656b;
          border: 0;
          border-radius: 9px;
          background: transparent;
          font-size: 12px;
          font-weight: 820;
          cursor: pointer;
        }

        .lp-type-tab.active {
          color: #042326;
          background: #fff;
          box-shadow: none;
        }

        .lp-search-form {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr)) auto;
          gap: 10px;
          align-items: end;
        }

        .lp-field {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lp-field label {
          color: #60767c;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-field select,
        .lp-field input {
          width: 100%;
          min-height: 46px;
          padding: 0 12px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.13);
          border-radius: 11px;
          background: #fff;
          font-size: 13px;
          font-weight: 680;
        }

        .lp-field select:disabled {
          color: #87979b;
          background: #f4f6f5;
        }

        .lp-search-submit {
          min-height: 46px;
          min-width: 148px;
          color: #062326;
          border: 0;
          border-radius: 11px;
          background: var(--lp-drive);
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          box-shadow: none;
        }

        .lp-promo-section {
          padding: 0 0 78px;
          background: var(--lp-stone);
        }

        .lp-promo-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lp-promo-link {
          position: relative;
          min-height: 320px;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(300px, 0.95fr) minmax(280px, 1.05fr);
          align-items: stretch;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 22px;
          background: #fff;
          text-decoration: none;
          box-shadow: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-promo-link:hover {
          border-color: rgba(8, 33, 38, 0.22);
        }

        .lp-promo-copy {
          position: relative;
          z-index: 2;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          padding: clamp(24px, 4vw, 42px);
          color: var(--lp-ink);
        }

        .lp-promo-label {
          width: fit-content;
          color: #49646a;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 8px;
          background: #f7f8f5;
          padding: 6px 9px;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-promo-title {
          max-width: 380px;
          color: var(--lp-ink);
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 830;
          line-height: 1.08;
        }

        .lp-promo-title span {
          display: block;
          color: #4d6268;
          font-weight: 520;
        }

        .lp-promo-text {
          max-width: 320px;
          margin: 0;
          color: #5d7278;
          font-size: 13.5px;
          line-height: 1.55;
        }

        .lp-promo-media {
          min-width: 0;
          display: block;
          background: #d8e2df;
        }

        .lp-promo-media img {
          width: 100%;
          height: 100%;
          min-height: 320px;
          display: block;
          object-fit: cover;
          object-position: 76% center;
        }

        .lp-promo-overlay {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 14px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.16);
          border-radius: 8px;
          background: #fff;
          box-shadow: none;
          font-size: 12px;
          font-weight: 850;
        }

        .lp-shortcuts-section {
          background: #f8f6ef;
          border-top: 1px solid rgba(8, 33, 38, 0.08);
          border-bottom: 1px solid rgba(8, 33, 38, 0.08);
        }

        .lp-shortcut-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .lp-shortcut-group {
          min-width: 0;
          padding: 18px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
        }

        .lp-shortcut-group.wide {
          grid-column: span 2;
        }

        .lp-shortcut-group h3 {
          margin: 0 0 13px;
          color: var(--lp-ink);
          font-size: 14px;
          font-weight: 850;
        }

        .lp-chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .lp-chip {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          padding: 0 11px;
          color: #315057;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 999px;
          background: #fff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 760;
          transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .lp-chip:hover {
          color: var(--lp-ink);
          border-color: rgba(42, 193, 180, 0.52);
        }

        .lp-guides-section {
          background: #edf4f2;
        }

        .lp-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .lp-guide-card {
          min-height: 210px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 22px;
          padding: 20px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
        }

        .lp-guide-card span {
          color: #16776f;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .lp-guide-card h3 {
          margin: 0;
          font-size: 20px;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }

        .lp-guide-card p {
          margin: 10px 0 0;
          color: #526b72;
          font-size: 13px;
          line-height: 1.55;
        }

        .lp-favorites-strip {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          margin-top: 18px;
          padding: 22px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 19px;
          background: #fff;
        }

        .lp-favorites-strip h3 {
          margin: 0;
          color: var(--lp-ink);
          font-size: 20px;
          letter-spacing: -0.02em;
        }

        .lp-favorites-strip p {
          margin: 7px 0 0;
          color: #526b72;
          font-size: 13px;
          line-height: 1.55;
        }

        .lp-section {
          position: relative;
          padding: 78px 0;
        }

        .lp-section[id] {
          scroll-margin-top: 86px;
        }

        .lp-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 26px;
          margin-bottom: 30px;
        }

        .lp-section-head > div:first-child {
          max-width: 730px;
        }

        .lp-eyebrow {
          margin-bottom: 12px;
          color: #16776f;
        }

        .lp-title {
          margin: 0;
          color: var(--lp-ink);
          font-size: clamp(31px, 4.2vw, 46px);
          font-weight: 780;
          line-height: 1.06;
          letter-spacing: -0.042em;
          text-wrap: balance;
        }

        .lp-copy {
          max-width: 680px;
          margin: 15px 0 0;
          color: #587077;
          font-size: 14.5px;
          line-height: 1.7;
        }

        .lp-brands-section {
          overflow: hidden;
          background: #f3f0e6;
        }

        .lp-brand-controls {
          display: flex;
          gap: 8px;
          flex: 0 0 auto;
        }

        .lp-round-btn {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.15);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .lp-round-btn:hover {
          background: #fff;
        }

        .lp-brand-scroll {
          overflow-x: auto;
          overscroll-behavior-inline: contain;
          scroll-snap-type: x proximity;
          scrollbar-width: thin;
          scrollbar-color: rgba(8, 33, 38, 0.22) transparent;
          padding: 4px 0 14px;
        }

        .lp-brand-grid {
          width: max-content;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 158px;
          grid-template-rows: repeat(2, 94px);
          gap: 10px;
          padding-right: 24px;
        }

        .lp-brand-card {
          scroll-snap-align: start;
          min-width: 0;
          display: grid;
          grid-template-rows: 46px auto;
          align-items: center;
          justify-items: center;
          gap: 5px;
          padding: 11px 10px 9px;
          color: #284248;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          box-shadow: none;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-brand-card:hover {
          border-color: rgba(42, 193, 180, 0.5);
          background: #fff;
        }

        .lp-brand-mark {
          position: relative;
          width: 104px;
          height: 42px;
          display: grid;
          place-items: center;
        }

        .lp-brand-mark img {
          position: relative;
          z-index: 1;
          max-width: 100%;
          max-height: 42px;
          display: block;
          object-fit: contain;
        }

        .lp-brand-fallback {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          color: #567077;
          font-size: 16px;
          font-weight: 850;
          letter-spacing: 0.08em;
        }

        .lp-brand-name {
          max-width: 100%;
          overflow: hidden;
          color: #405a60;
          font-size: 10.5px;
          font-weight: 750;
          line-height: 1.2;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .lp-popular-section {
          background: #e5ebe5;
          border-top: 1px solid rgba(8, 33, 38, 0.08);
          border-bottom: 1px solid rgba(8, 33, 38, 0.08);
        }

        .lp-examples-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lp-example-column {
          min-width: 0;
          padding: 17px;
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.11);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: none;
        }

        .lp-example-column.drive,
        .lp-example-column.estate {
          border-color: rgba(8, 33, 38, 0.14);
        }

        .lp-column-top {
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 13px;
          padding: 2px 2px 0;
        }

        .lp-column-heading {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lp-column-title {
          margin: 0;
          font-size: 16px;
          font-weight: 820;
          letter-spacing: -0.02em;
        }

        .lp-column-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 0;
          color: #2e5e5a;
          border: 0;
          background: transparent;
          font-size: 11.5px;
          font-weight: 820;
          cursor: pointer;
          white-space: nowrap;
        }

        .lp-example-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 11px;
        }

        .lp-example-card {
          min-width: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 0;
          color: inherit;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 15px;
          background: #fff;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-example-card:hover {
          border-color: rgba(8, 33, 38, 0.22);
        }

        .lp-example-img {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          display: block;
          background: #dfe7e4;
        }

        .lp-example-img img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .lp-example-card:hover .lp-example-img img {
          opacity: 0.96;
        }

        .lp-example-no-photo {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: #7c9195;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-example-weekly {
          position: absolute;
          left: 9px;
          bottom: 9px;
          max-width: calc(100% - 18px);
          padding: 6px 8px;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: rgba(8, 33, 38, 0.82);
          font-size: 9px;
          font-weight: 800;
          backdrop-filter: none;
        }

        .lp-example-body {
          display: grid;
          gap: 6px;
          padding: 13px;
        }

        .lp-example-price {
          color: var(--lp-ink);
          font-size: 19px;
          font-weight: 830;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .lp-example-title {
          min-height: 34px;
          color: #2f484e;
          font-size: 12.5px;
          font-weight: 780;
          line-height: 1.35;
        }

        .lp-example-meta,
        .lp-example-location {
          min-width: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #718388;
          font-size: 10.8px;
          font-weight: 680;
        }

        .lp-example-state {
          grid-column: 1 / -1;
          min-height: 218px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          padding: 26px;
          color: #62797f;
          border: 1px dashed rgba(8, 33, 38, 0.22);
          border-radius: 14px;
          background: rgba(239, 244, 241, 0.78);
          font-size: 12.5px;
          line-height: 1.5;
        }

        .lp-example-state strong {
          color: var(--lp-ink);
          font-size: 14.5px;
        }

        .lp-state-loader {
          width: 24px;
          height: 24px;
          margin-bottom: 3px;
          border: 3px solid rgba(42, 193, 180, 0.2);
          border-top-color: var(--lp-drive);
          border-radius: 50%;
        }

        .lp-cv-section {
          background: #f1ede3;
        }

        .lp-cv-card {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.72fr);
          gap: 44px;
          align-items: center;
          padding: clamp(34px, 5vw, 62px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          background: #071b20;
          box-shadow: none;
        }

        .lp-cv-card::before {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          left: -110px;
          bottom: -130px;
          border: 1px solid rgba(198, 168, 106, 0.3);
          border-radius: 50%;
        }

        .lp-cv-copy {
          position: relative;
          z-index: 1;
        }

        .lp-cv-copy .lp-eyebrow {
          color: #7ee3d7;
        }

        .lp-cv-copy .lp-title {
          max-width: 700px;
          color: #fff;
        }

        .lp-cv-copy .lp-copy {
          color: #bfd1d4;
        }

        .lp-cv-points {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px 18px;
          margin: 23px 0 0;
          padding: 0;
          list-style: none;
        }

        .lp-cv-points li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #d3dfe1;
          font-size: 12px;
          font-weight: 700;
        }

        .lp-cv-copy .lp-btn {
          margin-top: 28px;
        }

        .lp-cv-panel {
          position: relative;
          z-index: 1;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 30px;
          color: var(--lp-ink);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: none;
        }

        .lp-cv-panel > span {
          color: #72878c;
          font-size: 10px;
          font-weight: 820;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
        }

        .lp-cv-panel img {
          width: min(100%, 320px);
          height: auto;
          display: block;
        }

        .lp-cv-code {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 13px;
          border: 1px solid #d9e3e4;
          border-radius: 10px;
          background: #f3f7f7;
        }

        .lp-cv-code small {
          color: #73878c;
          font-size: 9px;
          font-weight: 780;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-cv-code strong {
          color: #0b5961;
          font-size: 13px;
          letter-spacing: 0.06em;
        }

        .lp-closing-section {
          position: relative;
          padding: 76px 0;
          background: var(--lp-ink);
        }

        .lp-closing-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 34px;
          align-items: center;
          padding: clamp(30px, 5vw, 54px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 26px;
          background: #0a282e;
        }

        .lp-closing-card .lp-eyebrow {
          color: #7ee3d7;
        }

        .lp-closing-card .lp-title {
          max-width: 760px;
          color: #fff;
        }

        .lp-closing-card .lp-copy {
          color: #bfd0d3;
        }

        .lp-closing-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 190px;
        }

        .lp-closing-actions .lp-btn {
          width: 100%;
        }

        @keyframes lp-rise {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lp-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 980px) {
          .lp-hero-card {
            grid-template-columns: 1fr;
          }

          .lp-hero-content::after {
            display: none;
          }

          .lp-hero-media,
          .lp-hero-media img {
            min-height: 390px;
          }

          .lp-examples-grid,
          .lp-promo-grid,
          .lp-guides-grid,
          .lp-cv-card,
          .lp-closing-card {
            grid-template-columns: 1fr;
          }

          .lp-search-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lp-search-submit {
            grid-column: span 2;
          }

          .lp-shortcut-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lp-cv-panel {
            min-height: 220px;
          }

          .lp-closing-actions {
            width: min(100%, 440px);
            flex-direction: row;
          }
        }

        @media (max-width: 700px) {
          .lp-shell {
            width: min(100% - 32px, 1260px);
          }

          .lp-hero {
            padding: 16px 0 42px;
          }

          .lp-hero-card {
            min-height: 0;
            border-radius: 23px;
          }

          .lp-hero-content {
            padding: 34px 22px 32px;
          }

          .lp-kicker {
            margin-bottom: 17px;
            font-size: 9.5px;
          }

          .lp-hero h1 {
            font-size: clamp(34px, 10vw, 42px);
            line-height: 1.01;
          }

          .lp-hero-copy {
            margin-top: 18px;
            font-size: 14px;
          }

          .lp-actions {
            display: grid;
            grid-template-columns: 1fr;
            margin-top: 24px;
          }

          .lp-btn {
            width: 100%;
          }

          .lp-hero-media,
          .lp-hero-media img {
            min-height: 292px;
          }

          .lp-hero-photo-label {
            right: 14px;
            bottom: 14px;
          }

          .lp-trust-bar {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .lp-trust-item {
            min-height: 54px;
          }

          .lp-quick-section,
          .lp-promo-section {
            padding-bottom: 58px;
          }

          .lp-quick-card {
            margin-top: -22px;
            padding: 14px;
            border-radius: 18px;
          }

          .lp-quick-top,
          .lp-favorites-strip {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }

          .lp-quick-top {
            flex-direction: column;
          }

          .lp-type-tabs {
            width: 100%;
          }

          .lp-search-form,
          .lp-shortcut-grid {
            grid-template-columns: 1fr;
          }

          .lp-search-submit,
          .lp-shortcut-group.wide {
            grid-column: auto;
          }

          .lp-promo-link,
          .lp-promo-media img {
            min-height: 245px;
          }

          .lp-promo-link {
            grid-template-columns: 1fr;
          }

          .lp-promo-media {
            order: -1;
          }

          .lp-promo-copy {
            padding: 22px;
          }

          .lp-section,
          .lp-closing-section {
            padding: 58px 0;
          }

          .lp-section-head {
            align-items: flex-start;
            margin-bottom: 24px;
          }

          .lp-title {
            font-size: clamp(29px, 9vw, 38px);
          }

          .lp-copy {
            font-size: 13.5px;
          }

          .lp-brand-controls {
            display: none;
          }

          .lp-brand-grid {
            grid-auto-columns: 132px;
            grid-template-rows: repeat(2, 82px);
            gap: 8px;
          }

          .lp-brand-card {
            grid-template-rows: 38px auto;
            padding: 8px;
            border-radius: 13px;
          }

          .lp-brand-mark {
            width: 90px;
            height: 36px;
          }

          .lp-brand-mark img {
            max-height: 35px;
          }

          .lp-example-column {
            padding: 14px;
            border-radius: 18px;
          }

          .lp-example-list {
            grid-template-columns: 1fr;
          }

          .lp-example-state {
            min-height: 185px;
          }

          .lp-cv-card,
          .lp-closing-card {
            gap: 28px;
            padding: 28px 21px;
            border-radius: 22px;
          }

          .lp-cv-points {
            grid-template-columns: 1fr;
          }

          .lp-cv-panel {
            min-height: 190px;
            padding: 24px 18px;
          }

          .lp-closing-actions {
            width: 100%;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-root *,
          .lp-root *::before,
          .lp-root *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .lp-root {
          --lp-ink: #102326;
          --lp-ink-soft: #394f54;
          --lp-muted: #617277;
          --lp-border: #d6dedb;
          --lp-border-strong: #b8c5c1;
          --lp-surface: #ffffff;
          --lp-surface-soft: #f4f6f2;
          --lp-bg: #eceee8;
          --lp-bg-alt: #f6f7f3;
          --lp-dark: #0d2327;
          --lp-drive: #24b8ab;
          --lp-estate: #2f8f63;
          --lp-gold: #9d7b3f;
          --lp-radius: 10px;
          --lp-radius-soft: 8px;
          background: var(--lp-bg) !important;
        }

        .lp-root :where(h1, h2, h3, .lp-title, .lp-quick-title, .lp-column-title, .lp-example-price) {
          letter-spacing: 0 !important;
        }

        .lp-root :where(.lp-hero, .lp-quick-section, .lp-promo-section, .lp-brands-section, .lp-shortcuts-section, .lp-guides-section, .lp-popular-section, .lp-cv-section, .lp-closing-section) {
          background: var(--lp-bg) !important;
          border: 0 !important;
        }

        .lp-root :where(.lp-brands-section, .lp-shortcuts-section, .lp-guides-section, .lp-cv-section) {
          background: var(--lp-bg-alt) !important;
        }

        .lp-root :where(.lp-hero-card, .lp-cv-card, .lp-closing-card) {
          border-radius: var(--lp-radius) !important;
          box-shadow: none !important;
          animation: none !important;
        }

        .lp-hero-card {
          border: 1px solid #18373d !important;
          background: var(--lp-dark) !important;
        }

        .lp-hero-content,
        .lp-cv-card,
        .lp-closing-card {
          background: var(--lp-dark) !important;
        }

        .lp-hero-content::after,
        .lp-hero-media::after,
        .lp-cv-card::before {
          display: none !important;
        }

        .lp-hero-media {
          animation: none !important;
          background: #d7dfdc !important;
        }

        .lp-kicker,
        .lp-eyebrow {
          letter-spacing: 0.08em !important;
        }

        .lp-kicker {
          color: #dff8f5 !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: var(--lp-radius-soft) !important;
          background: rgba(36, 184, 171, 0.16) !important;
        }

        .lp-hero h1 span {
          color: #7fded6 !important;
        }

        .lp-btn,
        .lp-search-submit,
        .lp-type-tab,
        .lp-chip,
        .lp-round-btn,
        .lp-column-link {
          transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease !important;
        }

        .lp-btn:hover,
        .lp-promo-link:hover,
        .lp-chip:hover,
        .lp-brand-card:hover,
        .lp-round-btn:hover,
        .lp-example-card:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .lp-btn,
        .lp-search-submit {
          border-radius: var(--lp-radius-soft) !important;
          box-shadow: none !important;
        }

        .lp-btn-drive,
        .lp-search-submit {
          color: #062326 !important;
          background: var(--lp-drive) !important;
        }

        .lp-btn-estate {
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          background: transparent !important;
        }

        .lp-btn-estate:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .lp-hero-photo-label,
        .lp-promo-overlay,
        .lp-example-weekly {
          border-radius: var(--lp-radius-soft) !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        .lp-trust-item,
        .lp-quick-card,
        .lp-promo-link,
        .lp-shortcut-group,
        .lp-guide-card,
        .lp-favorites-strip,
        .lp-example-column,
        .lp-example-card,
        .lp-example-state,
        .lp-cv-panel,
        .lp-cv-code,
          .lp-brand-card,
          .lp-type-tabs {
          border: 1px solid var(--lp-border) !important;
          border-radius: var(--lp-radius) !important;
          background: var(--lp-surface) !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        .lp-example-column.drive,
        .lp-example-column.estate {
          box-shadow: none !important;
        }

        .lp-example-img img {
          transition: none !important;
        }

        .lp-example-card:hover .lp-example-img img {
          transform: none !important;
        }

        .lp-state-loader {
          animation: none !important;
          border-color: var(--lp-border-strong) !important;
          border-top-color: var(--lp-drive) !important;
        }

        .lp-brand-card {
          border-radius: var(--lp-radius-soft) !important;
        }

        .lp-promo-link {
          isolation: isolate;
          border-color: var(--lp-border-strong) !important;
          background: var(--lp-surface) !important;
        }

        .lp-promo-link::before,
        .lp-promo-link::after {
          display: none !important;
        }

        .lp-promo-copy {
          background: var(--lp-surface) !important;
        }

        .lp-promo-label {
          color: var(--lp-ink-soft) !important;
          border-color: var(--lp-border) !important;
          border-radius: var(--lp-radius-soft) !important;
          background: var(--lp-surface-soft) !important;
        }

        .lp-promo-title,
        .lp-promo-title span {
          letter-spacing: 0 !important;
        }

        .lp-promo-title {
          color: var(--lp-ink) !important;
        }

        .lp-promo-title span {
          color: var(--lp-muted) !important;
        }

        .lp-promo-media {
          border-left: 1px solid var(--lp-border) !important;
          background: var(--lp-surface-soft) !important;
        }

        .lp-promo-overlay {
          border-color: var(--lp-border-strong) !important;
          background: var(--lp-surface) !important;
        }

        .lp-brand-scroll {
          scrollbar-color: var(--lp-border-strong) transparent !important;
        }

        .lp-cv-card {
          border: 1px solid #18373d !important;
        }

        .lp-cv-panel {
          color: var(--lp-ink) !important;
        }

        .lp-closing-card {
          border: 1px solid #18373d !important;
        }

        .lp-root :where(
          .lp-hero,
          .lp-hero-card,
          .lp-hero-content,
          .lp-hero-media,
          .lp-quick-section,
          .lp-promo-section,
          .lp-promo-link,
          .lp-promo-copy,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-guides-section,
          .lp-cv-section,
          .lp-cv-card,
          .lp-cv-panel,
          .lp-closing-section,
          .lp-closing-card,
          .lp-btn,
          .lp-search-submit,
          .lp-type-tab.active
        ) {
          background-image: none !important;
        }

        .lp-copy,
        .lp-promo-text,
        .lp-guide-card p,
        .lp-favorites-strip p,
        .lp-cv-points {
          max-width: 560px !important;
        }

        .lp-section-head {
          margin-bottom: 18px !important;
        }

        .lp-title {
          max-width: 720px !important;
        }

        .lp-root :where(.lp-hero-content, .lp-hero-media, .lp-cv-card, .lp-promo-link)::before,
        .lp-root :where(.lp-hero-content, .lp-hero-media, .lp-cv-card, .lp-promo-link)::after {
          content: none !important;
          display: none !important;
        }

        .lp-trust-item {
          align-items: flex-start !important;
          justify-content: center !important;
          gap: 0 !important;
          padding: 16px 17px !important;
          color: var(--lp-ink-soft) !important;
          line-height: 1.45 !important;
        }

        .lp-type-tab,
        .lp-column-heading,
        .lp-cv-points li,
        .lp-example-meta,
        .lp-example-location {
          gap: 0 !important;
        }

        .lp-round-btn {
          width: auto !important;
          min-width: 82px !important;
          padding: 0 12px !important;
          border-radius: var(--lp-radius-soft) !important;
          font-size: 11px !important;
        }

        .lp-hero {
          padding: 42px 0 22px !important;
          background: var(--lp-bg) !important;
        }

        .lp-hero-card {
          min-height: 0 !important;
          display: grid !important;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr) !important;
          position: relative !important;
          overflow: hidden !important;
          background: #ffffff !important;
          border: 1px solid var(--lp-border) !important;
          border-radius: 8px !important;
          box-shadow: 0 18px 44px rgba(7, 27, 34, 0.08) !important;
        }

        .lp-hero-media {
          position: relative !important;
          inset: auto !important;
          min-height: 440px !important;
          background: #eef3ef !important;
          border-left: 1px solid var(--lp-border) !important;
        }

        .lp-hero-media img {
          width: 100% !important;
          height: 100% !important;
          min-height: 440px !important;
          object-fit: cover !important;
          object-position: center !important;
          opacity: 1 !important;
          filter: none !important;
        }

        .lp-hero-content {
          position: relative !important;
          z-index: 2 !important;
          width: auto !important;
          min-height: 440px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          padding: clamp(32px, 5vw, 64px) !important;
          background: #ffffff !important;
        }

        .lp-hero h1 {
          max-width: 560px !important;
          font-size: clamp(38px, 5vw, 62px) !important;
          line-height: 1.02 !important;
          color: var(--lp-ink) !important;
        }

        .lp-kicker {
          color: #06373b !important;
          border-color: rgba(36, 184, 171, 0.34) !important;
          background: rgba(36, 184, 171, 0.16) !important;
        }

        .lp-hero h1 span {
          display: block !important;
          color: var(--lp-teal-dark) !important;
        }

        .lp-hero-copy {
          max-width: 470px !important;
          font-size: 16px !important;
          color: var(--lp-ink-soft) !important;
        }

        .lp-actions {
          margin-top: 28px !important;
          align-items: center !important;
          gap: 12px !important;
        }

        .lp-btn {
          border-radius: 8px !important;
          box-shadow: none !important;
          min-width: 112px !important;
        }

        .lp-btn-estate {
          color: var(--lp-ink) !important;
          border-color: var(--lp-border-strong) !important;
          background: #ffffff !important;
        }

        .lp-btn-estate:hover {
          color: var(--lp-ink) !important;
          background: #f7faf8 !important;
          border-color: var(--lp-teal-dark) !important;
        }

        .lp-hero-photo-label {
          display: none !important;
        }

        .lp-trust-bar {
          display: none !important;
        }

        .lp-quick-section {
          padding: 0 0 48px !important;
        }

        .lp-quick-card {
          margin-top: 10px !important;
          border-radius: 8px !important;
          padding: 18px !important;
          box-shadow: none !important;
          border: 1px solid var(--lp-border) !important;
        }

        .lp-quick-top {
          margin-bottom: 13px !important;
        }

        .lp-quick-title {
          font-size: 17px !important;
        }

        .lp-promo-section,
        .lp-section,
        .lp-closing-section {
          padding-top: 50px !important;
          padding-bottom: 50px !important;
        }

        .lp-promo-grid {
          gap: 18px !important;
        }

        .lp-promo-link {
          display: grid !important;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr) !important;
          min-height: 300px !important;
          background: #ffffff !important;
          border: 1px solid var(--lp-border) !important;
          box-shadow: none !important;
          overflow: hidden !important;
        }

        .lp-promo-copy {
          min-height: 300px !important;
          padding: 32px !important;
          justify-content: center !important;
          background: #ffffff !important;
        }

        .lp-promo-title {
          max-width: 360px !important;
          font-size: clamp(24px, 2.4vw, 34px) !important;
          line-height: 1.05 !important;
        }

        .lp-promo-text {
          max-width: 300px !important;
        }

        .lp-promo-media {
          min-height: 300px !important;
          border-left: 1px solid var(--lp-border) !important;
          background: #eef3ef !important;
        }

        .lp-promo-media img {
          height: 100% !important;
          opacity: 1 !important;
          filter: none !important;
          transform: none !important;
        }

        .lp-promo-link,
        .lp-shortcut-group,
        .lp-guide-card,
        .lp-favorites-strip,
        .lp-example-column,
        .lp-cv-card,
        .lp-closing-card {
          border-radius: 8px !important;
        }

        @media (max-width: 700px) {
          .lp-root :where(.lp-hero-card, .lp-cv-card, .lp-closing-card) {
            border-radius: var(--lp-radius) !important;
          }

          .lp-trust-item,
          .lp-quick-card,
          .lp-promo-link,
          .lp-shortcut-group,
          .lp-guide-card,
          .lp-favorites-strip,
          .lp-example-column,
          .lp-example-card,
          .lp-example-state,
          .lp-cv-panel,
          .lp-cv-code,
            .lp-brand-card,
            .lp-type-tabs {
            border-radius: var(--lp-radius-soft) !important;
          }

          .lp-promo-media {
            border-left: 0 !important;
            border-bottom: 1px solid var(--lp-border) !important;
          }

          .lp-section-head .lp-copy,
          .lp-guide-card p,
          .lp-favorites-strip p,
          .lp-cv-points {
            display: none !important;
          }

          .lp-trust-bar {
            grid-template-columns: 1fr !important;
          }

          .lp-hero {
            padding-top: 18px !important;
          }

          .lp-hero-card {
            grid-template-columns: 1fr !important;
          }

          .lp-hero-content {
            min-height: auto !important;
            padding: 28px 22px 24px !important;
          }

          .lp-hero-media {
            min-height: 260px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }

          .lp-hero-media img {
            min-height: 260px !important;
          }

          .lp-hero h1 {
            font-size: clamp(36px, 12vw, 50px) !important;
          }

          .lp-hero-copy {
            max-width: 330px !important;
          }

          .lp-promo-link {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }

          .lp-promo-copy {
            min-height: auto !important;
            padding: 24px !important;
          }

          .lp-promo-media {
            min-height: 220px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }
        }
      `}</style>

      <NavbarLanding />

      <div>
        <section className="lp-hero" aria-labelledby="lp-hero-title">
          <div className="lp-shell">
            <div className="lp-hero-card">
              <div className="lp-hero-content">
                <span className="lp-kicker">
                  NOXVELIA
                </span>
                <h1 id="lp-hero-title">
                  Carros e imóveis em Portugal. <span>Mais simples.</span>
                </h1>
                <p className="lp-hero-copy">
                  Pesquisa por localização, preço e detalhes claros. Publicar também é grátis.
                </p>
                <div className="lp-actions">
                  <Link className="lp-btn lp-btn-drive" to="/carros">
                    Ver carros
                  </Link>
                  <Link className="lp-btn lp-btn-estate" to="/imoveis">
                    Ver imóveis
                  </Link>
                </div>
              </div>

              <div className="lp-hero-media">
                <img
                  src="/noxvelia-hero-coast.webp"
                  alt="Automóvel junto a uma casa contemporânea na costa portuguesa"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="lp-hero-photo-label" aria-hidden="true">
                  Drive / Estate
                </div>
              </div>
            </div>

            <div className="lp-trust-bar" aria-label="Vantagens da Noxvelia">
              <div className="lp-trust-item">
                Anúncios organizados
              </div>
              <div className="lp-trust-item">
                Lista e mapa
              </div>
              <div className="lp-trust-item">
                Contactos com contexto
              </div>
            </div>
          </div>
        </section>

        <section className="lp-quick-section" id="pesquisa" aria-labelledby="lp-quick-title">
          <div className="lp-shell">
            <form className="lp-quick-card" onSubmit={submeterPesquisaRapida}>
              <div className="lp-quick-top">
                <div>
                  <span className="lp-eyebrow">Pesquisa rápida</span>
                  <h2 className="lp-quick-title" id="lp-quick-title">Pesquisa rápida.</h2>
                </div>
                <div className="lp-type-tabs" role="tablist" aria-label="Tipo de pesquisa">
                  <button
                    type="button"
                    className={`lp-type-tab ${pesquisaRapida.tipo === 'carro' ? 'active' : ''}`}
                    onClick={() => atualizarPesquisaRapida('tipo', 'carro')}
                  >
                    Drive
                  </button>
                  <button
                    type="button"
                    className={`lp-type-tab ${pesquisaRapida.tipo === 'imovel' ? 'active' : ''}`}
                    onClick={() => atualizarPesquisaRapida('tipo', 'imovel')}
                  >
                    Estate
                  </button>
                </div>
              </div>

              <div className="lp-search-form">
                {pesquisaRapida.tipo === 'carro' ? (
                  <>
                    <div className="lp-field">
                      <label htmlFor="lp-marca">Marca</label>
                      <select id="lp-marca" value={pesquisaRapida.marca} onChange={(evento) => atualizarPesquisaRapida('marca', evento.target.value)}>
                        <option value="">Todas as marcas</option>
                        {MARCAS.map((marca) => <option key={marca} value={marca}>{marca}</option>)}
                      </select>
                    </div>
                    <div className="lp-field">
                      <label htmlFor="lp-modelo">Modelo</label>
                      <select id="lp-modelo" value={pesquisaRapida.modelo} onChange={(evento) => atualizarPesquisaRapida('modelo', evento.target.value)} disabled={!pesquisaRapida.marca}>
                        <option value="">{pesquisaRapida.marca ? 'Todos os modelos' : 'Escolhe a marca'}</option>
                        {modelosPesquisa.map((modelo) => <option key={modelo} value={modelo}>{modelo}</option>)}
                      </select>
                    </div>
                    <div className="lp-field">
                      <label htmlFor="lp-combustivel">Combustível</label>
                      <select id="lp-combustivel" value={pesquisaRapida.combustivel} onChange={(evento) => atualizarPesquisaRapida('combustivel', evento.target.value)}>
                        <option value="">Todos</option>
                        {COMBUSTIVEIS_POPULARES.map((combustivel) => <option key={combustivel} value={combustivel}>{combustivel}</option>)}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lp-field">
                      <label htmlFor="lp-tipologia">Tipologia</label>
                      <select id="lp-tipologia" value={pesquisaRapida.tipologia} onChange={(evento) => atualizarPesquisaRapida('tipologia', evento.target.value)}>
                        <option value="">Todas</option>
                        {TIPOLOGIAS_POPULARES.map((tipologia) => <option key={tipologia} value={tipologia}>{tipologia}</option>)}
                      </select>
                    </div>
                    <div className="lp-field">
                      <label htmlFor="lp-estate-preco">Preço máximo</label>
                      <select id="lp-estate-preco" value={pesquisaRapida.precoMax} onChange={(evento) => atualizarPesquisaRapida('precoMax', evento.target.value)}>
                        <option value="">Qualquer preço</option>
                        {PRECOS_RAPIDOS.slice(2).map((preco) => <option key={preco.value} value={preco.value}>{preco.label}</option>)}
                      </select>
                    </div>
                  </>
                )}

                <div className="lp-field">
                  <label htmlFor="lp-distrito">Distrito</label>
                  <select id="lp-distrito" value={pesquisaRapida.distrito} onChange={(evento) => atualizarPesquisaRapida('distrito', evento.target.value)}>
                    <option value="">Portugal inteiro</option>
                    {DISTRITOS.map((distrito) => <option key={distrito} value={distrito}>{distrito}</option>)}
                  </select>
                </div>

                {pesquisaRapida.tipo === 'carro' && (
                  <div className="lp-field">
                    <label htmlFor="lp-preco">Preço máximo</label>
                    <select id="lp-preco" value={pesquisaRapida.precoMax} onChange={(evento) => atualizarPesquisaRapida('precoMax', evento.target.value)}>
                      <option value="">Qualquer preço</option>
                      {PRECOS_RAPIDOS.slice(0, 2).map((preco) => <option key={preco.value} value={preco.value}>{preco.label}</option>)}
                    </select>
                  </div>
                )}

                <button type="submit" className="lp-search-submit">
                  Ver anúncios
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="lp-promo-section" id="anunciar" aria-label="Anunciar grátis na Noxvelia">
          <div className="lp-shell">
            <div className="lp-promo-grid">
              <Link className="lp-promo-link drive" to={publicarTo} state={publicarState}>
                <span className="lp-promo-copy">
                  <span className="lp-promo-label">NOXVELIA Drive</span>
                  <strong className="lp-promo-title">Vende o teu carro com uma apresentação clara.</strong>
                  <span className="lp-promo-text">Fotos, preço e dados importantes num anúncio direto.</span>
                  <span className="lp-promo-overlay">Publicar carro</span>
                </span>
                <span className="lp-promo-media">
                  <img src="/social/noxvelia-drive-photo.webp" alt="Automóvel anunciado na Noxvelia Drive" loading="lazy" />
                </span>
              </Link>
              <Link className="lp-promo-link estate" to={publicarTo} state={publicarState}>
                <span className="lp-promo-copy">
                  <span className="lp-promo-label">NOXVELIA Estate</span>
                  <strong className="lp-promo-title">Mostra o teu imóvel com o essencial bem organizado.</strong>
                  <span className="lp-promo-text">Localização, fotografias e características fáceis de consultar.</span>
                  <span className="lp-promo-overlay">Publicar imóvel</span>
                </span>
                <span className="lp-promo-media">
                  <img src="/social/noxvelia-estate-photo.webp" alt="Imóvel anunciado na Noxvelia Estate" loading="lazy" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="lp-section lp-brands-section" id="marcas" aria-labelledby="lp-brands-title">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">As nossas marcas</span>
                <h2 className="lp-title" id="lp-brands-title">{MARCAS.length} marcas auto.</h2>
                <p className="lp-copy">
                  Escolhe a marca e entra nos anúncios disponíveis.
                </p>
              </div>
              <div className="lp-brand-controls" aria-label="Navegar pelas marcas">
                <button type="button" className="lp-round-btn" onClick={() => moverMarcas(-1)} aria-label="Ver marcas anteriores">
                  Anterior
                </button>
                <button type="button" className="lp-round-btn" onClick={() => moverMarcas(1)} aria-label="Ver marcas seguintes">
                  Seguinte
                </button>
              </div>
            </div>

            <div className="lp-brand-scroll" ref={marcasRef} aria-label="Lista de marcas automóveis">
              <div className="lp-brand-grid">
                {MARCAS.map((marca) => (
                  <Link
                    className="lp-brand-card"
                    to={`/carros?marca=${encodeURIComponent(marca)}`}
                    key={marca}
                    aria-label={`Ver anúncios ${marca}`}
                  >
                    <span className="lp-brand-mark">
                      <span className="lp-brand-fallback" aria-hidden="true">{iniciaisMarca(marca)}</span>
                      <img
                        src={logoMarca(marca)}
                        alt=""
                        loading="lazy"
                        draggable="false"
                        onError={(evento) => { evento.currentTarget.style.display = 'none'; }}
                      />
                    </span>
                    <span className="lp-brand-name">{marca}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-shortcuts-section" id="atalhos" aria-labelledby="lp-shortcuts-title">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Atalhos populares</span>
                <h2 className="lp-title" id="lp-shortcuts-title">Atalhos úteis.</h2>
                <p className="lp-copy">
                  Caminhos rápidos para carros e imóveis.
                </p>
              </div>
            </div>

            <div className="lp-shortcut-grid">
              <div className="lp-shortcut-group">
                <h3>Marcas mais procuradas</h3>
                <div className="lp-chip-list">
                  {MARCAS_POPULARES.map((marca) => (
                    <Link key={marca} className="lp-chip" to={criarLinkPesquisa('carro', { marca })}>{marca}</Link>
                  ))}
                </div>
              </div>

              <div className="lp-shortcut-group wide">
                <h3>Modelos rápidos</h3>
                <div className="lp-chip-list">
                  {MODELOS_POPULARES.map(([marca, modelo]) => (
                    <Link key={`${marca}-${modelo}`} className="lp-chip" to={criarLinkPesquisa('carro', { marca, modelo })}>
                      {marca} {modelo}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lp-shortcut-group">
                <h3>Combustíveis</h3>
                <div className="lp-chip-list">
                  {COMBUSTIVEIS_POPULARES.map((combustivel) => (
                    <Link key={combustivel} className="lp-chip" to={criarLinkPesquisa('carro', { combustivel })}>{combustivel}</Link>
                  ))}
                </div>
              </div>

              <div className="lp-shortcut-group">
                <h3>Distritos</h3>
                <div className="lp-chip-list">
                  {DISTRITOS_POPULARES.map((distrito) => (
                    <Link key={distrito} className="lp-chip" to={criarLinkPesquisa('carro', { distrito })}>{distrito}</Link>
                  ))}
                </div>
              </div>

              <div className="lp-shortcut-group">
                <h3>Imóveis</h3>
                <div className="lp-chip-list">
                  {TIPOLOGIAS_POPULARES.map((tipologia) => (
                    <Link key={tipologia} className="lp-chip" to={criarLinkPesquisa('imovel', { tipologia })}>{tipologia}</Link>
                  ))}
                  {DISTRITOS_POPULARES.slice(0, 4).map((distrito) => (
                    <Link key={`imovel-${distrito}`} className="lp-chip" to={criarLinkPesquisa('imovel', { distrito })}>{distrito}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-popular-section" id="destaques" aria-labelledby="lp-popular-title">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Mais vistos esta semana</span>
                <h2 className="lp-title" id="lp-popular-title">Mais vistos esta semana.</h2>
                <p className="lp-copy">
                  Destaques atuais em Drive e Estate.
                </p>
              </div>
            </div>

            <div className="lp-examples-grid" aria-live="polite">
              <div className="lp-example-column drive">
                <div className="lp-column-top">
                  <div className="lp-column-heading">
                    <h3 className="lp-column-title">NOXVELIA Drive</h3>
                  </div>
                  <button type="button" className="lp-column-link" onClick={() => navigate('/carros')}>
                    Ver carros
                  </button>
                </div>
                <div className="lp-example-list">
                  {exemplos.carro.length > 0
                    ? exemplos.carro.map((anuncio) => renderExemplo(anuncio, '/carros'))
                    : renderEstadoLista('Drive', '/carros')}
                </div>
              </div>

              <div className="lp-example-column estate">
                <div className="lp-column-top">
                  <div className="lp-column-heading">
                    <h3 className="lp-column-title">NOXVELIA Estate</h3>
                  </div>
                  <button type="button" className="lp-column-link" onClick={() => navigate('/imoveis')}>
                    Ver imóveis
                  </button>
                </div>
                <div className="lp-example-list">
                  {exemplos.imovel.length > 0
                    ? exemplos.imovel.map((anuncio) => renderExemplo(anuncio, '/imoveis'))
                    : renderEstadoLista('Estate', '/imoveis')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-guides-section" id="guias" aria-labelledby="lp-guides-title">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Guias rápidos</span>
                <h2 className="lp-title" id="lp-guides-title">Decidir com mais clareza.</h2>
                <p className="lp-copy">
                  Três notas rápidas antes do contacto.
                </p>
              </div>
            </div>

            <div className="lp-guides-grid">
              {GUIAS_NOXVELIA.map((guia) => (
                <article className="lp-guide-card" key={guia.titulo}>
                  <div>
                    <span>{guia.tema}</span>
                    <h3>{guia.titulo}</h3>
                    <p>{guia.texto}</p>
                  </div>
                  <Link className="lp-column-link" to={guia.tema === 'Guardar oportunidades' ? '/favoritos' : '/carros'}>
                    Continuar
                  </Link>
                </article>
              ))}
            </div>

            <div className="lp-favorites-strip">
              <div>
                <h3>Favoritos sempre à mão.</h3>
                <p>
                  Guarda anúncios e volta quando quiseres.
                </p>
              </div>
              <div className="lp-actions">
                <Link className="lp-btn lp-btn-drive" to="/favoritos">
                  Ver favoritos
                </Link>
                <Link className="lp-btn lp-btn-estate" to="/registo">
                  Criar conta
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SponsorBanner
          placement="landing_between_highlights"
          vertical="all"
          fallback={<GoogleAdSlot placement="landing_between_highlights" minHeight={96} />}
        />

        <section className="lp-section lp-cv-section" id="carvertical" aria-labelledby="lp-cv-title">
          <div className="lp-shell">
            <div className="lp-cv-card">
              <div className="lp-cv-copy">
                <span className="lp-eyebrow">Parceiro de histórico automóvel</span>
                <h2 className="lp-title" id="lp-cv-title">Conhece o carro antes da visita.</h2>
                <p className="lp-copy">
                  Consulta histórico, quilometragem e registos disponíveis.
                </p>
                <ul className="lp-cv-points">
                  <li>Mais contexto sobre o veículo</li>
                  <li>Decisões com melhor informação</li>
                </ul>
                <a className="lp-btn lp-btn-drive" href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer">
                  Verificar um veículo
                </a>
              </div>

              <div className="lp-cv-panel">
                <span>Histórico automóvel com</span>
                <img src="/carvertical-logo.png" alt="carVertical" loading="lazy" />
                <div className="lp-cv-code">
                  <small>Código</small>
                  <strong>NOXVELIA</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-closing-section" aria-labelledby="lp-closing-title">
          <div className="lp-shell">
            <div className="lp-closing-card">
              <div>
                <span className="lp-eyebrow">Comprar, vender, arrendar</span>
                <h2 className="lp-title" id="lp-closing-title">Publica com melhor presença.</h2>
                <p className="lp-copy">
                  Drive e Estate num só lugar.
                </p>
              </div>
              <div className="lp-closing-actions">
                <Link className="lp-btn lp-btn-drive" to={publicarTo} state={publicarState}>
                  Publicar anúncio
                </Link>
                <Link className="lp-btn lp-btn-estate" to="/carros">
                  Explorar Drive
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
