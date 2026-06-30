import React from 'react';
import { useNavigate } from 'react-router-dom';

const panels = [
  {
    id: 'imoveis',
    label: 'Estate',
    tag: 'Imobiliário',
    route: '/imoveis',
    accent: '#3ecf8e',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=70',
  },
  {
    id: 'carros',
    label: 'Drive',
    tag: 'Automóveis',
    route: '/carros',
    accent: '#2ac1b4',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=70',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .lp-root {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        .lp-logo {
          padding: 24px clamp(20px, 4vw, 40px) 0;
          flex-shrink: 0;
        }
        .lp-logo img { height: 32px; width: auto; display: block; }

        .lp-hero {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 2vw, 20px);
          padding: clamp(20px, 4vw, 40px);
        }

        .lp-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #0f172a;
          display: flex;
          align-items: flex-end;
          min-height: 0;
          cursor: pointer;
          border: none;
          padding: 0;
          text-align: left;
          font: inherit;
          color: inherit;
        }

        .lp-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .lp-card:hover .lp-card-img,
        .lp-card:focus-visible .lp-card-img { transform: scale(1.04); }

        .lp-card-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 100%);
        }

        .lp-card-body {
          position: relative;
          z-index: 2;
          padding: clamp(20px, 4vw, 36px);
          width: 100%;
        }

        .lp-card-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          padding: 5px 10px;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .lp-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(24px, 4vw, 38px);
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
          line-height: 1.05;
        }

        .lp-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          background: #ffffff;
          padding: 10px 18px;
          border-radius: 9px;
          transition: gap 0.2s;
        }
        .lp-card:hover .lp-card-cta,
        .lp-card:focus-visible .lp-card-cta { gap: 12px; }

        .lp-card:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: -3px;
        }

        .lp-foot {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          padding: 14px 0 18px;
          flex-shrink: 0;
        }

        @media (max-width: 720px) {
          .lp-hero {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
          }
          .lp-root { min-height: 100vh; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-card-img, .lp-card-cta { transition: none; }
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-logo">
          <img src="/logo-noxvelia.png" alt="NOXVELIA" />
        </div>

        <main className="lp-hero">
          {panels.map((panel) => (
            <button
              key={panel.id}
              className="lp-card"
              onClick={() => navigate(panel.route)}
              aria-label={`Entrar em NOXVELIA ${panel.label}`}
            >
              <img className="lp-card-img" src={panel.img} alt="" loading="lazy" />
              <div className="lp-card-scrim" />
              <div className="lp-card-body">
                <span className="lp-card-tag" style={{ color: panel.accent }}>{panel.tag}</span>
                <h2 className="lp-card-title">NOXVELIA {panel.label}</h2>
                <span className="lp-card-cta">
                  Entrar <span aria-hidden="true">→</span>
                </span>
              </div>
            </button>
          ))}
        </main>

        <div className="lp-foot">NOXVELIA Portugal &copy; 2026</div>
      </div>
    </>
  );
}