import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiArrowRight, mdiCarSports, mdiShieldCheckOutline, mdiCardSearchOutline,
  mdiCheckCircleOutline, mdiHomeCityOutline, mdiMapMarkerOutline, mdiSpeedometer,
  mdiRulerSquare, mdiGasStation
} from '@mdi/js';
import api from '../../services/api';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valor || 0);

const tendencias = [
  {
    tema: 'Drive',
    titulo: 'Histórico, quilómetros e manutenção pesam cada vez mais na decisão.',
    texto: 'Antes de avançar para uma visita, os compradores procuram sinais simples de confiança: registos claros, fotos honestas e dados técnicos sem ruído.',
  },
  {
    tema: 'Estate',
    titulo: 'Eficiência energética e localização continuam a marcar diferença.',
    texto: 'Nos imóveis, a decisão começa muitas vezes pela zona, luz natural, transportes e custos previsíveis. Um anúncio bem estruturado encurta esse caminho.',
  },
  {
    tema: 'Mercado',
    titulo: 'Bons anúncios contam uma história curta, concreta e verificável.',
    texto: 'Preço, estado, contacto e prova visual devem aparecer cedo. Quanto menos fricção houver, maior a probabilidade de contacto qualificado.',
  },
];

export default function Landing() {
  const navigate = useNavigate();
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
    localStorage.setItem('@App:contexto_visual', origem === '/carros' ? 'carro' : 'imovel');
    window.history.replaceState(window.history.state, '', origem);
    navigate(`/anuncio/${anuncio._id}`);
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
            <img src={foto} alt={anuncio.titulo} loading="lazy" />
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
            {detalhe || (isCarro ? 'Dados técnicos visíveis' : 'Detalhes do imóvel')}
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
      return <div className="lp-example-state">A carregar os anúncios com mais interesse…</div>;
    }

    return (
      <div className="lp-example-state">
        <strong>{erroExemplos ? 'Não foi possível carregar esta seleção.' : `Ainda não existem anúncios publicados em ${tipo}.`}</strong>
        <span>{erroExemplos ? 'Podes explorar diretamente a pesquisa.' : 'Assim que forem publicados, aparecem aqui sem conteúdo fictício.'}</span>
        <button type="button" className="lp-column-link" onClick={() => navigate(rota)}>
          Explorar {tipo} <Icon path={mdiArrowRight} size={0.58} />
        </button>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .lp-root {
          min-height: 100vh;
          background: #ffffff;
          color: #0f172a;
          font-family: 'Inter', sans-serif;
        }
        .lp-shell {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .lp-hero {
          padding: 70px 0 42px;
          background:
            radial-gradient(circle at 78% 18%, rgba(42,193,180,0.16), transparent 30%),
            linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(360px, 1fr);
          gap: 38px;
          align-items: center;
        }
        .lp-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #0f766e;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .1em;
          margin-bottom: 18px;
        }
        .lp-hero h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(43px, 7vw, 84px);
          line-height: .95;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-hero-copy {
          color: #475569;
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.65;
          max-width: 610px;
          margin: 22px 0 0;
        }
        .lp-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 30px;
        }
        .lp-btn {
          min-height: 52px;
          border-radius: 8px;
          border: 1px solid transparent;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-weight: 900;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          transition: transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-drive {
          background: #2ac1b4;
          color: #020617;
          box-shadow: 0 18px 36px -26px rgba(42,193,180,0.8);
        }
        .lp-btn-estate {
          background: #ffffff;
          color: #047857;
          border-color: #bbf7d0;
        }
        .lp-hero-media {
          position: relative;
          min-height: 430px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #dbeafe;
          box-shadow: 0 28px 70px -48px rgba(15,23,42,0.5);
          background: #e2e8f0;
        }
        .lp-hero-media img {
          width: 100%;
          height: 100%;
          min-height: 430px;
          display: block;
          object-fit: cover;
        }
        .lp-media-panel {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }
        .lp-media-chip {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 10px;
          padding: 11px 10px;
          color: #0f172a;
          min-width: 0;
        }
        .lp-media-chip strong {
          display: block;
          font-size: 13px;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 5px;
        }
        .lp-media-chip span {
          display: block;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .07em;
        }
        .lp-strip {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 24px;
        }
        .lp-strip-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 10px;
          padding: 14px;
          color: #334155;
          font-size: 13px;
          font-weight: 800;
        }
        .lp-strip-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #ccfbf1;
          color: #0f766e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .lp-section {
          padding: 66px 0;
        }
        .lp-section.alt {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 26px;
        }
        .lp-eyebrow {
          display: block;
          color: #0f766e;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 10px;
        }
        .lp-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(29px, 5vw, 48px);
          line-height: 1.05;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-copy {
          max-width: 640px;
          margin: 16px 0 0;
          color: #475569;
          line-height: 1.65;
          font-size: 15px;
        }
        .lp-examples-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .lp-example-column {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 22px 54px -44px rgba(15,23,42,0.45);
        }
        .lp-example-column.drive { border-top: 4px solid #2ac1b4; }
        .lp-example-column.estate { border-top: 4px solid #3ecf8e; }
        .lp-column-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }
        .lp-column-title {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 800;
        }
        .lp-column-link {
          border: none;
          background: transparent;
          color: #64748b;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .lp-example-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .lp-example-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
          color: inherit;
          display: flex;
          flex-direction: column;
          min-width: 0;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .lp-example-card:hover {
          transform: translateY(-3px);
          border-color: #cbd5e1;
          box-shadow: 0 18px 38px -28px rgba(15,23,42,0.5);
        }
        .lp-example-img {
          display: block;
          aspect-ratio: 16/10;
          background: #f1f5f9;
          overflow: hidden;
          position: relative;
        }
        .lp-example-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .lp-example-no-photo {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .lp-example-weekly {
          position: absolute;
          left: 9px;
          bottom: 9px;
          max-width: calc(100% - 18px);
          padding: 6px 8px;
          border-radius: 999px;
          background: rgba(15,23,42,.84);
          color: #ffffff;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .04em;
          backdrop-filter: blur(8px);
        }
        .lp-example-state {
          grid-column: 1 / -1;
          min-height: 190px;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          background: #f8fafc;
          padding: 26px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
        }
        .lp-example-state strong { color: #0f172a; font-size: 15px; }
        .lp-example-state .lp-column-link { padding: 7px 0; color: #0f766e; }
        .lp-example-body {
          display: grid;
          gap: 6px;
          padding: 13px;
        }
        .lp-example-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
        }
        .lp-example-title {
          color: #334155;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.35;
          min-height: 35px;
        }
        .lp-example-meta,
        .lp-example-location {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #64748b;
          font-size: 11.5px;
          font-weight: 700;
          min-width: 0;
        }
        .lp-carvertical {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 390px;
          gap: 34px;
          align-items: center;
        }
        .lp-carvertical-logo {
          min-height: 210px;
          border: 1px solid #dbeafe;
          background: #ffffff;
          border-radius: 14px;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-carvertical-logo img {
          width: min(100%, 330px);
          height: auto;
          display: block;
        }
        .lp-news-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .lp-news-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 18px 42px -36px rgba(15,23,42,0.45);
        }
        .lp-news-tag {
          width: fit-content;
          border-radius: 999px;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          color: #0f766e;
          padding: 5px 9px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .09em;
          margin-bottom: 16px;
        }
        .lp-news-card h3 {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          line-height: 1.25;
        }
        .lp-news-card p {
          margin: 12px 0 0;
          color: #475569;
          font-size: 13.5px;
          line-height: 1.65;
        }
        .lp-estate-band {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 24px;
          align-items: center;
          border: 1px solid #bbf7d0;
          border-radius: 14px;
          padding: 28px;
          background:
            linear-gradient(135deg, rgba(62,207,142,0.14), rgba(255,255,255,0.9)),
            #ffffff;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-estate-points {
          display: grid;
          gap: 10px;
        }
        .lp-estate-point {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #334155;
          font-size: 13px;
          font-weight: 800;
        }
        .lp-estate-point span {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #dcfce7;
          color: #047857;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 920px) {
          .lp-hero-grid,
          .lp-carvertical,
          .lp-examples-grid,
          .lp-estate-band { grid-template-columns: 1fr; }
          .lp-hero-media, .lp-hero-media img { min-height: 320px; }
          .lp-strip,
          .lp-news-grid { grid-template-columns: 1fr; }
          .lp-section-head { align-items: flex-start; flex-direction: column; }
        }
        @media (max-width: 650px) {
          .lp-shell { padding: 0 18px; }
          .lp-hero { padding: 48px 0 38px; }
          .lp-actions { flex-direction: column; }
          .lp-btn { width: 100%; }
          .lp-section { padding: 52px 0; }
          .lp-example-list { grid-template-columns: 1fr; }
          .lp-media-panel { grid-template-columns: 1fr; }
          .lp-hero h1 { font-size: clamp(40px, 14vw, 64px); }
        }
      `}</style>

      <div className="lp-root">
        <NavbarLanding />

        <section className="lp-hero">
          <div className="lp-shell">
            <div className="lp-hero-grid">
              <div>
                <div className="lp-kicker">
                  <Icon path={mdiCarSports} size={0.72} /> NOXVELIA Drive
                </div>
                <h1>Carros com dados claros. Imóveis a um clique.</h1>
                <p className="lp-hero-copy">
                  O Drive é o ponto de partida: pesquisa rápida, anúncios limpos e histórico em destaque. O Estate mantém a mesma clareza para quem procura casa, sem complicar a experiência.
                </p>
                <div className="lp-actions">
                  <button className="lp-btn lp-btn-drive" onClick={() => navigate('/carros')}>
                    Explorar Drive <Icon path={mdiArrowRight} size={0.78} />
                  </button>
                  <button className="lp-btn lp-btn-estate" onClick={() => navigate('/imoveis')}>
                    Ver Estate <Icon path={mdiHomeCityOutline} size={0.78} />
                  </button>
                </div>
              </div>

              <div className="lp-hero-media">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=86" alt="NOXVELIA Drive" />
                <div className="lp-media-panel">
                  <div className="lp-media-chip"><strong>Drive</strong><span>Foco principal</span></div>
                  <div className="lp-media-chip"><strong>Estate</strong><span>Imóveis filtrados</span></div>
                  <div className="lp-media-chip"><strong>Verificação</strong><span>CarVertical</span></div>
                </div>
              </div>
            </div>

            <div className="lp-strip">
              <div className="lp-strip-item"><span className="lp-strip-icon"><Icon path={mdiCardSearchOutline} size={0.78} /></span>Cards com preço, vendedor e dados essenciais</div>
              <div className="lp-strip-item"><span className="lp-strip-icon"><Icon path={mdiShieldCheckOutline} size={0.78} /></span>Histórico automóvel sempre visível no processo</div>
              <div className="lp-strip-item"><span className="lp-strip-icon"><Icon path={mdiCheckCircleOutline} size={0.78} /></span>Pesquisa em grelha ou mapa, sem excesso visual</div>
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Mais vistos esta semana</span>
                <h2 className="lp-title">O que está a despertar mais interesse.</h2>
                <p className="lp-copy">
                  Até dois anúncios publicados e reais de cada área, ordenados pelas visitas dos últimos sete dias. A seleção atualiza-se automaticamente com o interesse dos visitantes.
                </p>
              </div>
            </div>

            <div className="lp-examples-grid">
              <div className="lp-example-column drive">
                <div className="lp-column-top">
                  <h3 className="lp-column-title">Noxvelia Drive</h3>
                  <button className="lp-column-link" onClick={() => navigate('/carros')}>Ver carros <Icon path={mdiArrowRight} size={0.58} /></button>
                </div>
                <div className="lp-example-list">
                  {exemplos.carro.length > 0
                    ? exemplos.carro.map((anuncio) => renderExemplo(anuncio, '/carros'))
                    : renderEstadoLista('Drive', '/carros')}
                </div>
              </div>

              <div className="lp-example-column estate">
                <div className="lp-column-top">
                  <h3 className="lp-column-title">Noxvelia Estate</h3>
                  <button className="lp-column-link" onClick={() => navigate('/imoveis')}>Ver imóveis <Icon path={mdiArrowRight} size={0.58} /></button>
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

        <section className="lp-section alt">
          <div className="lp-shell lp-carvertical">
            <div>
              <span className="lp-eyebrow">Parceria CarVertical</span>
              <h2 className="lp-title">Verifica o histórico do teu carro antes de comprar.</h2>
              <p className="lp-copy">
                A NOXVELIA Drive dá destaque à verificação de histórico para ajudar a perceber quilometragem, acidentes, registos e sinais de risco antes do contacto ou da visita.
              </p>
            </div>
            <div className="lp-carvertical-logo">
              <img src="/carvertical-logo.png" alt="CarVertical" />
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Notícias e tendências</span>
                <h2 className="lp-title">O que interessa antes de comprar.</h2>
              </div>
            </div>
            <div className="lp-news-grid">
              {tendencias.map((item) => (
                <article className="lp-news-card" key={item.titulo}>
                  <span className="lp-news-tag">{item.tema}</span>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section alt">
          <div className="lp-shell">
            <div className="lp-estate-band">
              <div>
                <span className="lp-eyebrow">NOXVELIA Estate</span>
                <h2 className="lp-title">Explora também a Noxvelia Estate .</h2>
                <p className="lp-copy">
                  O foco visual está no Drive, mas a procura por casa continua com uma experiência cuidada: localização, área, tipologia e contacto aparecem com a mesma prioridade.
                </p>
              </div>
              <div className="lp-estate-points">
                <div className="lp-estate-point"><span><Icon path={mdiHomeCityOutline} size={0.72} /></span>Imóveis com leitura rápida</div>
                <div className="lp-estate-point"><span><Icon path={mdiRulerSquare} size={0.72} /></span>Área e tipologia em destaque</div>
                <div className="lp-estate-point"><span><Icon path={mdiMapMarkerOutline} size={0.72} /></span>Localização sempre visível</div>
                <button className="lp-btn lp-btn-estate" onClick={() => navigate('/imoveis')}>
                  Explorar Estate <Icon path={mdiArrowRight} size={0.78} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
