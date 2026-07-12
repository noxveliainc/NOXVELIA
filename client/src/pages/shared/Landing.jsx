import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SponsorBanner from '../../components/SponsorBanner';
import Icon from '@mdi/react';
import {
  mdiArrowRight,
  mdiCarSports,
  mdiCheckCircleOutline,
  mdiChevronLeft,
  mdiChevronRight,
  mdiGasStation,
  mdiHomeCityOutline,
  mdiMapMarkerOutline,
  mdiOpenInNew,
  mdiPlus,
  mdiRulerSquare,
  mdiShieldCheckOutline,
} from '@mdi/js';
import api from '../../services/api';
import { MARCAS } from '../../data/marcasModelos';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';

const CARVERTICAL_URL = 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';

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
  const marcasRef = useRef(null);
  const [exemplos, setExemplos] = useState({ carro: [], imovel: [] });
  const [loadingExemplos, setLoadingExemplos] = useState(true);
  const [erroExemplos, setErroExemplos] = useState(false);

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
    navigate(`/anuncio/${anuncio._id}`);
  };

  const moverMarcas = (direcao) => {
    marcasRef.current?.scrollBy({
      left: direcao * Math.min(720, window.innerWidth * 0.72),
      behavior: 'smooth',
    });
  };

  const renderExemplo = (anuncio, origem) => {
    const isCarro = anuncio.tipo === 'carro';
    const foto = anuncio.fotos?.[0] || anuncio.imagens?.[0];
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
            <img src={foto} alt={anuncio.titulo || (isCarro ? 'Automóvel' : 'Imóvel')} loading="lazy" />
          ) : (
            <span className="lp-example-no-photo">Sem fotografia</span>
          )}
          <span className="lp-example-weekly">{anuncio.visitasSemana || 0} visitas esta semana</span>
        </span>
        <span className="lp-example-body">
          <span className="lp-example-price">{formatarMoeda(anuncio.preco)}</span>
          <span className="lp-example-title">{anuncio.titulo}</span>
          <span className="lp-example-meta">
            <Icon path={isCarro ? mdiGasStation : mdiRulerSquare} size={0.58} />
            {detalhe || (isCarro ? 'Dados técnicos disponíveis' : 'Detalhes do imóvel')}
          </span>
          <span className="lp-example-location">
            <Icon path={mdiMapMarkerOutline} size={0.58} />
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
          Explorar {tipo} <Icon path={mdiArrowRight} size={0.58} />
        </button>
      </div>
    );
  };

  return (
    <div className="lp-root">
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
          background:
            radial-gradient(circle at 8% 14%, rgba(198, 168, 106, 0.21), transparent 28%),
            radial-gradient(circle at 92% 88%, rgba(42, 193, 180, 0.16), transparent 28%),
            linear-gradient(180deg, #f7f5ee 0%, #ecebe4 100%);
        }

        .lp-hero-card {
          min-height: 520px;
          display: grid;
          grid-template-columns: minmax(430px, 0.86fr) minmax(0, 1.14fr);
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 32px;
          background: var(--lp-ink);
          box-shadow: 0 36px 90px -54px rgba(8, 33, 38, 0.72);
          animation: lp-rise 0.65s ease both;
        }

        .lp-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(38px, 4vw, 54px);
          color: #fff;
          background:
            radial-gradient(circle at 8% 8%, rgba(42, 193, 180, 0.18), transparent 34%),
            var(--lp-ink);
        }

        .lp-hero-content::after {
          content: "";
          position: absolute;
          right: -56px;
          top: 0;
          bottom: 0;
          width: 112px;
          z-index: -1;
          background: linear-gradient(90deg, var(--lp-ink), transparent);
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
          transform: translateY(-2px);
        }

        .lp-btn-drive {
          color: #052326;
          background: var(--lp-drive);
          box-shadow: 0 16px 34px -20px rgba(42, 193, 180, 0.9);
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
          animation: lp-fade 0.8s 0.08s ease both;
        }

        .lp-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 56%, rgba(6, 28, 32, 0.2));
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
          box-shadow: 0 12px 34px -20px rgba(8, 33, 38, 0.55);
          backdrop-filter: blur(12px);
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-hero-photo-label i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--lp-gold);
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
          backdrop-filter: blur(8px);
        }

        .lp-trust-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          color: #0d766e;
          border-radius: 10px;
          background: rgba(42, 193, 180, 0.14);
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
          background:
            linear-gradient(115deg, rgba(255, 255, 255, 0.65), transparent 54%),
            #f3f0e6;
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
          transform: translateY(-2px);
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
          box-shadow: 0 12px 34px -30px rgba(8, 33, 38, 0.5);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-brand-card:hover {
          transform: translateY(-3px);
          border-color: rgba(42, 193, 180, 0.5);
          background: #fff;
          box-shadow: 0 18px 38px -28px rgba(8, 33, 38, 0.5);
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
          background:
            radial-gradient(circle at 90% 12%, rgba(62, 207, 142, 0.12), transparent 24%),
            #e5ebe5;
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
          box-shadow: 0 25px 65px -48px rgba(8, 33, 38, 0.55);
        }

        .lp-example-column.drive {
          box-shadow: inset 0 4px 0 var(--lp-drive), 0 25px 65px -48px rgba(8, 33, 38, 0.55);
        }

        .lp-example-column.estate {
          box-shadow: inset 0 4px 0 var(--lp-estate), 0 25px 65px -48px rgba(8, 33, 38, 0.55);
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

        .lp-column-icon {
          width: 36px;
          height: 36px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 11px;
        }

        .drive .lp-column-icon {
          color: #08665f;
          background: rgba(42, 193, 180, 0.16);
        }

        .estate .lp-column-icon {
          color: #08784b;
          background: rgba(62, 207, 142, 0.16);
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
          transform: translateY(-3px);
          border-color: rgba(8, 33, 38, 0.22);
          box-shadow: 0 18px 38px -28px rgba(8, 33, 38, 0.6);
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
          transform: scale(1.025);
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
          backdrop-filter: blur(8px);
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
          animation: lp-spin 0.8s linear infinite;
        }

        .lp-cv-section {
          background:
            radial-gradient(circle at 4% 92%, rgba(198, 168, 106, 0.18), transparent 25%),
            #f1ede3;
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
          background:
            radial-gradient(circle at 92% 10%, rgba(42, 193, 180, 0.22), transparent 31%),
            linear-gradient(135deg, #071b20 0%, #0b3035 100%);
          box-shadow: 0 38px 86px -58px rgba(8, 33, 38, 0.8);
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

        .lp-cv-points svg {
          flex: 0 0 auto;
          color: var(--lp-drive);
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
          box-shadow: 0 26px 60px -40px rgba(0, 0, 0, 0.7);
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
          background:
            radial-gradient(circle at 12% 10%, rgba(42, 193, 180, 0.16), transparent 26%),
            var(--lp-ink);
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
          background:
            linear-gradient(115deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.015)),
            #0a282e;
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
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
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
          .lp-cv-card,
          .lp-closing-card {
            grid-template-columns: 1fr;
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
      `}</style>

      <NavbarLanding />

      <div>
        <section className="lp-hero" aria-labelledby="lp-hero-title">
          <div className="lp-shell">
            <div className="lp-hero-card">
              <div className="lp-hero-content">
                <span className="lp-kicker">
                  <Icon path={mdiCheckCircleOutline} size={0.63} /> O teu próximo passo começa aqui
                </span>
                <h1 id="lp-hero-title">
                  O próximo carro. <span>A próxima casa.</span> Uma escolha mais clara.
                </h1>
                <p className="lp-hero-copy">
                  Carros e imóveis reunidos numa experiência simples, cuidada e feita para encontrares o que procuras com confiança.
                </p>
                <div className="lp-actions">
                  <Link className="lp-btn lp-btn-drive" to="/carros">
                    Descobrir carros <Icon path={mdiArrowRight} size={0.76} />
                  </Link>
                  <Link className="lp-btn lp-btn-estate" to="/imoveis">
                    Explorar imóveis <Icon path={mdiHomeCityOutline} size={0.76} />
                  </Link>
                </div>
              </div>

              <div className="lp-hero-media">
                <img
                  src="/noxvelia-hero-coast.webp"
                  alt="Automóvel premium junto a uma casa contemporânea na costa portuguesa"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="lp-hero-photo-label" aria-hidden="true">
                  Drive <i /> Estate
                </div>
              </div>
            </div>

            <div className="lp-trust-bar" aria-label="Vantagens da Noxvelia">
              <div className="lp-trust-item">
                <span className="lp-trust-icon"><Icon path={mdiCheckCircleOutline} size={0.72} /></span>
                Anúncios reais, organizados para decidir melhor
              </div>
              <div className="lp-trust-item">
                <span className="lp-trust-icon"><Icon path={mdiMapMarkerOutline} size={0.72} /></span>
                Pesquisa em lista ou mapa em todo o país
              </div>
              <div className="lp-trust-item">
                <span className="lp-trust-icon"><Icon path={mdiShieldCheckOutline} size={0.72} /></span>
                Mais contexto antes de cada contacto
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-brands-section" id="marcas" aria-labelledby="lp-brands-title">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">As nossas marcas</span>
                <h2 className="lp-title" id="lp-brands-title">{MARCAS.length} marcas. Uma pesquisa para encontrares a tua.</h2>
                <p className="lp-copy">
                  Dos clássicos de sempre às novas referências elétricas, escolhe uma marca e entra diretamente nos anúncios disponíveis.
                </p>
              </div>
              <div className="lp-brand-controls" aria-label="Navegar pelas marcas">
                <button type="button" className="lp-round-btn" onClick={() => moverMarcas(-1)} aria-label="Ver marcas anteriores">
                  <Icon path={mdiChevronLeft} size={0.82} />
                </button>
                <button type="button" className="lp-round-btn" onClick={() => moverMarcas(1)} aria-label="Ver marcas seguintes">
                  <Icon path={mdiChevronRight} size={0.82} />
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

        <section className="lp-section lp-popular-section" id="destaques" aria-labelledby="lp-popular-title">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Mais vistos esta semana</span>
                <h2 className="lp-title" id="lp-popular-title">O que está a captar mais atenção agora.</h2>
                <p className="lp-copy">
                  Os anúncios com mais visitas nos últimos sete dias, com um máximo de dois destaques por área.
                </p>
              </div>
            </div>

            <div className="lp-examples-grid" aria-live="polite">
              <div className="lp-example-column drive">
                <div className="lp-column-top">
                  <div className="lp-column-heading">
                    <span className="lp-column-icon"><Icon path={mdiCarSports} size={0.72} /></span>
                    <h3 className="lp-column-title">NOXVELIA Drive</h3>
                  </div>
                  <button type="button" className="lp-column-link" onClick={() => navigate('/carros')}>
                    Ver carros <Icon path={mdiArrowRight} size={0.58} />
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
                    <span className="lp-column-icon"><Icon path={mdiHomeCityOutline} size={0.72} /></span>
                    <h3 className="lp-column-title">NOXVELIA Estate</h3>
                  </div>
                  <button type="button" className="lp-column-link" onClick={() => navigate('/imoveis')}>
                    Ver imóveis <Icon path={mdiArrowRight} size={0.58} />
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

        <SponsorBanner placement="landing_between_highlights" vertical="all" />

        <section className="lp-section lp-cv-section" id="carvertical" aria-labelledby="lp-cv-title">
          <div className="lp-shell">
            <div className="lp-cv-card">
              <div className="lp-cv-copy">
                <span className="lp-eyebrow">Parceiro de histórico automóvel</span>
                <h2 className="lp-title" id="lp-cv-title">Conhece o carro para lá das fotografias.</h2>
                <p className="lp-copy">
                  Consulta os registos disponíveis sobre quilometragem, danos, roubos e utilização anterior antes de marcares uma visita.
                </p>
                <ul className="lp-cv-points">
                  <li><Icon path={mdiCheckCircleOutline} size={0.66} /> Mais contexto sobre o veículo</li>
                  <li><Icon path={mdiCheckCircleOutline} size={0.66} /> Decisões com melhor informação</li>
                </ul>
                <a className="lp-btn lp-btn-drive" href={CARVERTICAL_URL} target="_blank" rel="noopener noreferrer">
                  Verificar um veículo <Icon path={mdiOpenInNew} size={0.7} />
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
                <h2 className="lp-title" id="lp-closing-title">O lugar certo para encontrar — e para ser encontrado.</h2>
                <p className="lp-copy">
                  Publica o teu carro ou imóvel e apresenta-o a quem já está à procura da próxima escolha.
                </p>
              </div>
              <div className="lp-closing-actions">
                <Link className="lp-btn lp-btn-drive" to="/publicar">
                  <Icon path={mdiPlus} size={0.74} /> Publicar anúncio
                </Link>
                <Link className="lp-btn lp-btn-estate" to="/carros">
                  Explorar Drive <Icon path={mdiArrowRight} size={0.72} />
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
