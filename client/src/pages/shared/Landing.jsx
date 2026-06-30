import React from 'react';
import { useNavigate } from 'react-router-dom';

const panels = [
  {
    id: 'estate',
    label: 'Estate',
    tag: 'Imobiliário',
    title: 'Imóveis selecionados',
    desc: 'Casas, apartamentos e investimentos escolhidos com critério.',
    cta: 'Ver Imóveis',
    route: '/imoveis',
    accent: '#3ecf8e',
    accentSoft: 'rgba(62,207,142,0.1)',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=70',
  },
  {
    id: 'drive',
    label: 'Drive',
    tag: 'Automóveis',
    title: 'Viaturas de confiança',
    desc: 'Carros inspecionados ao detalhe, prontos para a estrada.',
    cta: 'Ver Automóveis',
    route: '/carros',
    accent: '#2ac1b4',
    accentSoft: 'rgba(42,193,180,0.1)',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=70',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .lp-root {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          color: #0f172a;
        }

        .lp-top {
          display: flex;
          justify-content: center;
          padding: clamp(24px, 4vw, 40px) 20px 0;
        }
        .lp-top img { height: clamp(28px, 3vw, 36px); width: auto; }

        .lp-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(32px, 6vw, 56px) 20px;
        }

        .lp-heading {
          text-align: center;
          max-width: 560px;
          margin-bottom: clamp(28px, 5vw, 48px);
          opacity: 0;
          animation: rise .6s .1s ease forwards;
        }
        .lp-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 10px;
        }
        .lp-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(26px, 4vw, 38px);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .lp-sub {
          font-size: clamp(14px, 1.6vw, 16px);
          color: #64748b;
          line-height: 1.5;
        }

        .lp-grid {
          width: 100%;
          max-width: 920px;
          display: grid;
          grid-template-columns: repeat(2, minmax(260px, 1fr));
          gap: clamp(16px, 2.5vw, 24px);
        }

        .lp-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
          font: inherit;
          color: inherit;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 2px rgba(15,23,42,0.04);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          opacity: 0;
          animation: rise .6s ease forwards;
        }
        .lp-card:nth-child(1) { animation-delay: .2s; }
        .lp-card:nth-child(2) { animation-delay: .3s; }
        .lp-card:hover, .lp-card:focus-visible {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -12px rgba(15,23,42,0.16);
        }
        .lp-card:focus-visible { outline: 2px solid #0f172a; outline-offset: 2px; }

        .lp-card-img-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }
        .lp-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
        }
        .lp-card:hover .lp-card-img, .lp-card:focus-visible .lp-card-img { transform: scale(1.05); }

        .lp-card-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 7px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(4px);
        }

        .lp-card-body {
          padding: clamp(18px, 3vw, 24px);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .lp-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(18px, 2vw, 21px);
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }

        .lp-card-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 18px;
          flex: 1;
        }

        .lp-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          transition: gap .2s ease, opacity .2s ease;
        }
        .lp-card:hover .lp-card-cta, .lp-card:focus-visible .lp-card-cta { gap: 11px; opacity: .92; }

        .lp-foot {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          padding: 16px 0 22px;
        }

        @media (max-width: 620px) {
          .lp-grid { grid-template-columns: 1fr; max-width: 420px; }
          .lp-main { justify-content: flex-start; padding-top: clamp(24px, 6vw, 36px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-heading, .lp-card { animation: none; opacity: 1; }
          .lp-card, .lp-card-img, .lp-card-cta { transition: none; }
        }

        @keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="lp-root">
        <div className="lp-top">
          <img src="/logo-noxvelia.png" alt="NOXVELIA" />
        </div>

        <main className="lp-main">
          <div className="lp-heading">
            <p className="lp-eyebrow">Bem-vindo</p>
            <h1 className="lp-title">O que procuras hoje?</h1>
            <p className="lp-sub">Imóveis e automóveis selecionados, numa só plataforma de confiança.</p>
          </div>

          <div className="lp-grid">
            {panels.map((panel) => (
              <button
                key={panel.id}
                className="lp-card"
                onClick={() => navigate(panel.route)}
                aria-label={panel.cta}
              >
                <div className="lp-card-img-wrap">
                  <img className="lp-card-img" src={panel.img} alt="" loading="lazy" />
                  <span className="lp-card-tag" style={{ color: panel.accent }}>{panel.tag}</span>
                </div>
                <div className="lp-card-body">
                  <h2 className="lp-card-title">{panel.title}</h2>
                  <p className="lp-card-desc">{panel.desc}</p>
                  <span className="lp-card-cta" style={{ background: panel.accent }}>
                    {panel.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </main>

        <div className="lp-foot">NOXVELIA Portugal &copy; 2026</div>
      </div>
    </>
  );
}