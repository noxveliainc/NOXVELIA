import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiArrowRight, mdiCarSports, mdiShieldCheckOutline, mdiCardSearchOutline,
  mdiCheckCircleOutline, mdiHomeCityOutline
} from '@mdi/js';
import { useAuth } from '../../context/AuthContext';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';

export default function Landing() {
  const navigate = useNavigate();
  const { signed } = useAuth();

  const publicarAnuncio = () => {
    if (signed) {
      navigate('/publicar');
      return;
    }
    navigate('/login', { state: { from: '/publicar' } });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
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
          padding: 72px 0 52px;
          background:
            linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1fr);
          gap: 40px;
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
          font-size: clamp(44px, 7vw, 88px);
          line-height: .94;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-hero-copy {
          color: #475569;
          font-size: clamp(16px, 2vw, 20px);
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
          transition: transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-drive {
          background: #2ac1b4;
          color: #020617;
          box-shadow: 0 18px 36px -26px rgba(42,193,180,0.8);
        }
        .lp-btn-light {
          background: #ffffff;
          color: #0f172a;
          border-color: #cbd5e1;
        }
        .lp-hero-media {
          position: relative;
          min-height: 450px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 28px 70px -48px rgba(15,23,42,0.5);
          background: #e2e8f0;
        }
        .lp-hero-media img {
          width: 100%;
          height: 100%;
          min-height: 450px;
          display: block;
          object-fit: cover;
        }
        .lp-media-label {
          position: absolute;
          left: 18px;
          bottom: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 999px;
          padding: 10px 13px;
          color: #0f172a;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .08em;
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
          border-radius: 8px;
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
          padding: 68px 0;
        }
        .lp-section.alt {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-section-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 390px;
          gap: 34px;
          align-items: center;
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
          font-size: clamp(30px, 5vw, 50px);
          line-height: 1.04;
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
        .lp-carvertical-logo {
          min-height: 190px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 8px;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-carvertical-logo img {
          width: min(100%, 310px);
          height: auto;
          display: block;
        }
        .lp-final {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 22px;
          align-items: center;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 28px;
          background: #ffffff;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-final h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin: 0 0 8px;
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.08;
        }
        .lp-final p {
          margin: 0;
          color: #475569;
          line-height: 1.6;
        }
        @media (max-width: 920px) {
          .lp-hero-grid,
          .lp-section-grid,
          .lp-final { grid-template-columns: 1fr; }
          .lp-hero-media, .lp-hero-media img { min-height: 320px; }
          .lp-strip { grid-template-columns: 1fr; }
          .lp-final .lp-btn { width: 100%; }
        }
        @media (max-width: 560px) {
          .lp-shell { padding: 0 18px; }
          .lp-hero { padding: 48px 0 42px; }
          .lp-actions { flex-direction: column; }
          .lp-btn { width: 100%; }
          .lp-section { padding: 52px 0; }
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
                <h1>Compra e vende carros com menos ruido.</h1>
                <p className="lp-hero-copy">
                  Pesquisa direta, cards limpos, dados essenciais e perfis de vendedor mais claros para decidir sem perder tempo.
                </p>
                <div className="lp-actions">
                  <button className="lp-btn lp-btn-drive" onClick={() => navigate('/carros')}>
                    Explorar Drive <Icon path={mdiArrowRight} size={0.78} />
                  </button>
                  <button className="lp-btn lp-btn-light" onClick={publicarAnuncio}>
                    Publicar Anuncio <Icon path={mdiArrowRight} size={0.78} />
                  </button>
                </div>
              </div>

              <div className="lp-hero-media">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=86" alt="NOXVELIA Drive" />
                <div className="lp-media-label"><Icon path={mdiShieldCheckOutline} size={0.7} /> Drive em destaque</div>
              </div>
            </div>

            <div className="lp-strip">
              <div className="lp-strip-item"><span className="lp-strip-icon"><Icon path={mdiCardSearchOutline} size={0.78} /></span>Dados essenciais sem repeticao</div>
              <div className="lp-strip-item"><span className="lp-strip-icon"><Icon path={mdiShieldCheckOutline} size={0.78} /></span>Perfis com bio, links e contacto</div>
              <div className="lp-strip-item"><span className="lp-strip-icon"><Icon path={mdiCheckCircleOutline} size={0.78} /></span>Pesquisa rapida em grelha ou mapa</div>
            </div>
          </div>
        </section>

        <section className="lp-section alt">
          <div className="lp-shell lp-section-grid">
            <div>
              <span className="lp-eyebrow">Parceria CarVertical</span>
              <h2 className="lp-title">Verifica o historico do carro antes de comprar.</h2>
              <p className="lp-copy">
                A NOXVELIA Drive destaca a verificacao de historico para apoiar decisoes mais informadas antes do contacto ou visita.
              </p>
            </div>
            <div className="lp-carvertical-logo">
              <img src="/carvertical-logo.png" alt="CarVertical" />
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-final">
              <div>
                <span className="lp-eyebrow">Tambem disponivel</span>
                <h2>Estate continua a um clique.</h2>
                <p>Se procuras imoveis, podes alternar para a vertical Estate quando quiseres.</p>
              </div>
              <button className="lp-btn lp-btn-light" onClick={() => navigate('/imoveis')}>
                Explorar Estate <Icon path={mdiHomeCityOutline} size={0.78} />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
