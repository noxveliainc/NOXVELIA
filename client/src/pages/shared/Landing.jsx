import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiArrowRight, mdiCarSports, mdiHomeCityOutline, mdiShieldCheckOutline,
  mdiTuneVariant, mdiChartTimelineVariant, mdiCheckCircleOutline
} from '@mdi/js';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';

const mundos = [
  {
    id: 'estate',
    tag: 'Imobiliario',
    title: 'NOXVELIA Estate',
    desc: 'Casas, apartamentos e oportunidades com apresentacao cuidada, contexto claro e contacto direto.',
    cta: 'Explorar Imoveis',
    route: '/imoveis',
    color: '#3ecf8e',
    icon: mdiHomeCityOutline,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'drive',
    tag: 'Automoveis',
    title: 'NOXVELIA Drive',
    desc: 'Viaturas organizadas por dados relevantes para comparar melhor antes do primeiro contacto.',
    cta: 'Explorar Automoveis',
    route: '/carros',
    color: '#2ac1b4',
    icon: mdiCarSports,
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85',
  },
];

const pilares = [
  { titulo: 'Pesquisa precisa', desc: 'Filtros pensados para decidir depressa sem esconder detalhes importantes.', icon: mdiTuneVariant },
  { titulo: 'Perfis completos', desc: 'Bio, montra publica, redes sociais e contactos reunidos num unico lugar.', icon: mdiShieldCheckOutline },
  { titulo: 'Leitura premium', desc: 'Cards, galerias e fichas tecnicas desenhadas para comparar ativos com calma.', icon: mdiChartTimelineVariant },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .lp-root {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          color: #0f172a;
          min-height: 100vh;
        }

        .lp-hero {
          position: relative;
          min-height: min(720px, calc(100vh - 96px));
          padding: 86px 24px 96px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: #0f172a;
        }
        .lp-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=88');
          background-size: cover;
          background-position: center;
          transform: scale(1.01);
        }
        .lp-hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(15,23,42,0.86), rgba(15,23,42,0.44) 48%, rgba(15,23,42,0.16)),
            linear-gradient(180deg, rgba(15,23,42,0.12), rgba(15,23,42,0.58));
        }
        .lp-hero-inner {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 680px) minmax(260px, 360px);
          gap: 48px;
          align-items: end;
        }
        .lp-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.86);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .lp-hero h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(46px, 8vw, 92px);
          line-height: .92;
          margin: 0;
          color: #ffffff;
          letter-spacing: 0;
        }
        .lp-hero-copy {
          margin: 24px 0 0;
          color: rgba(255,255,255,0.88);
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.65;
          max-width: 620px;
        }
        .lp-hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 34px;
        }
        .lp-btn {
          border: none;
          border-radius: 8px;
          padding: 15px 18px;
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s, background .2s, border-color .2s;
        }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-primary { background: #ffffff; color: #0f172a; box-shadow: 0 18px 40px -24px rgba(255,255,255,0.8); }
        .lp-btn-secondary { background: rgba(255,255,255,0.1); color: #ffffff; border: 1px solid rgba(255,255,255,0.34); backdrop-filter: blur(10px); }

        .lp-hero-panel {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 8px;
          padding: 18px;
          box-shadow: 0 24px 60px -35px rgba(15,23,42,0.8);
          backdrop-filter: blur(16px);
        }
        .lp-hero-panel-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 14px;
        }
        .lp-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .lp-stat {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 8px;
          padding: 12px 10px;
        }
        .lp-stat strong {
          display: block;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          line-height: 1;
          color: #0f172a;
        }
        .lp-stat span {
          display: block;
          margin-top: 7px;
          color: #64748b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .lp-section {
          padding: 76px 24px;
          background: #ffffff;
        }
        .lp-section.alt {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-container {
          max-width: 1180px;
          margin: 0 auto;
        }
        .lp-section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 28px;
        }
        .lp-eyebrow {
          color: #64748b;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }
        .lp-section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.05;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-section-copy {
          max-width: 420px;
          color: #64748b;
          line-height: 1.65;
          font-size: 15px;
          margin: 0;
        }

        .lp-world-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .lp-world {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 18px 40px -30px rgba(15,23,42,0.35);
          transition: transform .22s, box-shadow .22s, border-color .22s;
        }
        .lp-world:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 30px 60px -38px rgba(15,23,42,0.42);
        }
        .lp-world-img {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #f1f5f9;
        }
        .lp-world-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
        }
        .lp-world:hover .lp-world-img img { transform: scale(1.04); }
        .lp-world-tag {
          position: absolute;
          left: 14px;
          top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 8px;
          padding: 8px 10px;
          color: #0f172a;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .08em;
          backdrop-filter: blur(10px);
        }
        .lp-world-body { padding: 24px; }
        .lp-world h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 26px;
          margin: 0 0 10px;
          color: #0f172a;
        }
        .lp-world p {
          color: #64748b;
          line-height: 1.65;
          margin: 0 0 22px;
          font-size: 15px;
        }
        .lp-world-btn {
          width: 100%;
          border-radius: 8px;
          border: none;
          padding: 15px;
          color: #0f172a;
          font-weight: 900;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: filter .2s, transform .2s;
        }
        .lp-world-btn:hover { filter: brightness(.96); transform: translateY(-1px); }

        .lp-pillars {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .lp-pillar {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
        }
        .lp-pillar-icon {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          margin-bottom: 18px;
        }
        .lp-pillar h3 {
          margin: 0 0 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
        }
        .lp-pillar p {
          margin: 0;
          color: #64748b;
          line-height: 1.65;
          font-size: 14px;
        }

        .lp-final {
          background: #0f172a;
          color: #ffffff;
          border-radius: 8px;
          padding: 34px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          overflow: hidden;
          position: relative;
        }
        .lp-final h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(26px, 4vw, 40px);
          line-height: 1.08;
          margin: 0 0 10px;
        }
        .lp-final p {
          margin: 0;
          color: rgba(255,255,255,0.76);
          line-height: 1.65;
          max-width: 620px;
        }
        .lp-final-list {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }
        .lp-final-list span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          padding: 8px 11px;
          color: rgba(255,255,255,0.86);
          font-size: 12px;
          font-weight: 800;
        }

        @media (max-width: 920px) {
          .lp-hero { min-height: auto; padding-top: 72px; }
          .lp-hero-inner { grid-template-columns: 1fr; }
          .lp-hero-panel { max-width: 520px; }
          .lp-section-head { align-items: start; flex-direction: column; }
          .lp-world-grid, .lp-pillars, .lp-final { grid-template-columns: 1fr; }
          .lp-final .lp-btn { width: 100%; }
        }
        @media (max-width: 560px) {
          .lp-hero { padding: 62px 18px 70px; }
          .lp-hero-actions { flex-direction: column; }
          .lp-btn { width: 100%; }
          .lp-hero-stats { grid-template-columns: 1fr; }
          .lp-section { padding: 56px 18px; }
        }
      `}</style>

      <div className="lp-root">
        <NavbarLanding />

        <section className="lp-hero">
          <div className="lp-hero-bg" />
          <div className="lp-hero-inner">
            <div>
              <div className="lp-kicker"><Icon path={mdiShieldCheckOutline} size={0.72} /> Mercado premium em Portugal</div>
              <h1>NOXVELIA</h1>
              <p className="lp-hero-copy">
                Uma plataforma branca, calma e precisa para descobrir, comparar e contactar vendedores de imoveis e automoveis com uma experiencia mais cuidada.
              </p>
              <div className="lp-hero-actions">
                <button className="lp-btn lp-btn-primary" onClick={() => navigate('/imoveis')}>
                  Imoveis <Icon path={mdiArrowRight} size={0.78} />
                </button>
                <button className="lp-btn lp-btn-secondary" onClick={() => navigate('/carros')}>
                  Automoveis <Icon path={mdiCarSports} size={0.82} />
                </button>
              </div>
            </div>

            <div className="lp-hero-panel">
              <div className="lp-hero-panel-title">
                <span>Visao rapida</span>
                <Icon path={mdiChartTimelineVariant} size={0.86} color="#2ac1b4" />
              </div>
              <div className="lp-hero-stats">
                <div className="lp-stat"><strong>2</strong><span>Mundos</span></div>
                <div className="lp-stat"><strong>1</strong><span>Conta</span></div>
                <div className="lp-stat"><strong>0%</strong><span>Ruido</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" id="explore">
          <div className="lp-container">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Escolhe o teu mercado</span>
                <h2 className="lp-section-title">Dois caminhos, a mesma qualidade.</h2>
              </div>
              <p className="lp-section-copy">Estate e Drive partilham a mesma logica: fotografias fortes, dados limpos, perfis confiaveis e contacto direto.</p>
            </div>

            <div className="lp-world-grid">
              {mundos.map((mundo) => (
                <article className="lp-world" key={mundo.id}>
                  <div className="lp-world-img">
                    <img src={mundo.img} alt={mundo.title} />
                    <span className="lp-world-tag"><Icon path={mundo.icon} size={0.72} /> {mundo.tag}</span>
                  </div>
                  <div className="lp-world-body">
                    <h3>{mundo.title}</h3>
                    <p>{mundo.desc}</p>
                    <button className="lp-world-btn" style={{ background: mundo.color }} onClick={() => navigate(mundo.route)}>
                      {mundo.cta} <Icon path={mdiArrowRight} size={0.76} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section alt">
          <div className="lp-container">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyebrow">Produto melhorado</span>
                <h2 className="lp-section-title">Menos friccao, mais decisao.</h2>
              </div>
              <p className="lp-section-copy">A experiencia foi desenhada para compradores que querem perceber valor depressa e vendedores que precisam de uma montra credivel.</p>
            </div>

            <div className="lp-pillars">
              {pilares.map((pilar) => (
                <div className="lp-pillar" key={pilar.titulo}>
                  <div className="lp-pillar-icon"><Icon path={pilar.icon} size={0.92} /></div>
                  <h3>{pilar.titulo}</h3>
                  <p>{pilar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-final">
              <div>
                <h2>Publica com uma presenca mais profissional.</h2>
                <p>Perfil com capa, bio e links sociais, anuncios com leitura refinada e pesquisa mais clara para quem chega ate ti.</p>
                <div className="lp-final-list">
                  <span><Icon path={mdiCheckCircleOutline} size={0.62} /> Bio publica</span>
                  <span><Icon path={mdiCheckCircleOutline} size={0.62} /> Links sociais</span>
                  <span><Icon path={mdiCheckCircleOutline} size={0.62} /> Cards premium</span>
                </div>
              </div>
              <button className="lp-btn lp-btn-primary" onClick={() => navigate('/publicar')}>
                Publicar anuncio <Icon path={mdiArrowRight} size={0.78} />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
