import React from 'react';
import { useNavigate } from 'react-router-dom';

const panels = [
  {
    id: 'estate',
    side: 'left',
    label: 'NOXVELIA Estate',
    short: 'Estate',
    tag: 'Imobiliário selecionado',
    blurb: 'Casas e investimentos escolhidos com critério, não em catálogo.',
    cta: 'Entrar no Estate',
    route: '/imoveis',
    accent: '#3ecf8e',
    accentSoft: 'rgba(62,207,142,0.35)',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'drive',
    side: 'right',
    label: 'NOXVELIA Drive',
    short: 'Drive',
    tag: 'Coleção automóvel',
    blurb: 'Viaturas inspecionadas ao detalhe, prontas para a estrada.',
    cta: 'Entrar no Drive',
    route: '/carros',
    accent: '#2ac1b4',
    accentSoft: 'rgba(42,193,180,0.35)',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=70',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..800&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --ink-bg: #0c0e10;
          --paper: #f5f3ee;
          --muted: #9aa1a8;
          --hairline: rgba(245,243,238,0.14);
          --estate: #3ecf8e;
          --drive: #2ac1b4;
        }

        .lp-root {
          font-family: 'Inter', sans-serif;
          background: var(--ink-bg);
          color: var(--paper);
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* ── TOPO ── */
        .lp-top {
          display: flex;
          justify-content: center;
          padding: clamp(20px, 3.5vw, 32px) 20px 0;
          flex-shrink: 0;
          opacity: 0;
          animation: fadeDown .7s .1s cubic-bezier(.2,.7,.3,1) forwards;
        }
        .lp-top img { height: clamp(26px, 3vw, 34px); width: auto; display: block; filter: brightness(0) invert(1); }

        /* ── HERO ── */
        .lp-hero {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          min-height: 0;
        }

        .lp-panel {
          position: relative;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          border: none;
          background: var(--ink-bg);
          cursor: pointer;
          padding: 0;
          font: inherit;
          color: inherit;
          text-align: left;
          transition: flex-grow .6s cubic-bezier(.2,.7,.3,1);
          flex-grow: 1;
        }
        .lp-hero:has(.lp-panel[data-side="left"]:hover) .lp-panel[data-side="left"],
        .lp-hero:has(.lp-panel[data-side="left"]:focus-visible) .lp-panel[data-side="left"] { flex-grow: 1.12; }
        .lp-hero:has(.lp-panel[data-side="right"]:hover) .lp-panel[data-side="right"],
        .lp-hero:has(.lp-panel[data-side="right"]:focus-visible) .lp-panel[data-side="right"] { flex-grow: 1.12; }

        .lp-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) brightness(.78) contrast(1.05);
          transform: scale(1.04);
          transition: transform .9s cubic-bezier(.2,.7,.3,1), filter .5s ease;
        }
        .lp-panel:hover .lp-img,
        .lp-panel:focus-visible .lp-img { filter: grayscale(.15) brightness(.62) contrast(1.08); transform: scale(1.1); }

        .lp-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--ink-bg) 0%, rgba(12,14,16,0.55) 38%, rgba(12,14,16,0.1) 65%, rgba(12,14,16,0.35) 100%);
        }

        .lp-glow {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 55%;
          opacity: 0;
          transition: opacity .5s ease;
          pointer-events: none;
        }
        .lp-panel:hover .lp-glow,
        .lp-panel:focus-visible .lp-glow { opacity: .55; }

        .lp-body {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: clamp(28px, 5vw, 64px) clamp(24px, 6vw, 72px) clamp(36px, 6vw, 76px);
          opacity: 0;
          transform: translateY(16px);
          animation: rise .7s cubic-bezier(.2,.7,.3,1) forwards;
        }
        .lp-panel[data-side="left"] .lp-body { animation-delay: .35s; }
        .lp-panel[data-side="right"] .lp-body { animation-delay: .45s; }
        .lp-panel[data-side="right"] .lp-body { text-align: right; margin-left: auto; }

        .lp-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .lp-title {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-weight: 600;
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1;
          letter-spacing: -0.01em;
          margin-bottom: 14px;
        }
        .lp-title em { font-style: italic; font-weight: 500; opacity: .92; }

        .lp-blurb {
          font-size: clamp(13px, 1.3vw, 15px);
          line-height: 1.55;
          color: var(--muted);
          max-width: 340px;
          margin-bottom: clamp(22px, 3vw, 32px);
        }
        .lp-panel[data-side="right"] .lp-blurb { margin-left: auto; }

        .lp-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .02em;
        }
        .lp-cta-arrow {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1.5px solid rgba(245,243,238,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform .35s cubic-bezier(.2,.7,.3,1), background .35s, border-color .35s;
        }
        .lp-panel:hover .lp-cta-arrow,
        .lp-panel:focus-visible .lp-cta-arrow { transform: scale(1.08); }
        .lp-panel[data-side="right"] .lp-cta { flex-direction: row-reverse; }
        .lp-panel[data-side="right"] .lp-cta-arrow svg { transform: scaleX(-1); }

        .lp-panel:focus-visible { outline: 2px solid var(--paper); outline-offset: -2px; }

        /* ── COSTURA / EMBLEMA ── */
        .lp-seam {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: var(--hairline);
          z-index: 5;
          pointer-events: none;
        }

        .lp-vs {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 6;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--ink-bg);
          border: 1px solid var(--hairline);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 18px;
          color: var(--paper);
          opacity: 0;
          animation: pop .5s .6s cubic-bezier(.34,1.56,.64,1) forwards;
          transition: box-shadow .4s ease, border-color .4s ease;
        }
        .lp-hero:has(.lp-panel[data-side="left"]:hover) .lp-vs,
        .lp-hero:has(.lp-panel[data-side="left"]:focus-visible) .lp-vs {
          border-color: var(--estate);
          box-shadow: 0 0 0 6px rgba(62,207,142,0.12);
        }
        .lp-hero:has(.lp-panel[data-side="right"]:hover) .lp-vs,
        .lp-hero:has(.lp-panel[data-side="right"]:focus-visible) .lp-vs {
          border-color: var(--drive);
          box-shadow: 0 0 0 6px rgba(42,193,180,0.12);
        }

        .lp-vlabel {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 6;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
          opacity: 0;
          animation: fadeIn .6s .9s ease forwards;
        }
        .lp-vlabel.top { transform: translate(-50%, calc(-50% - 90px)) rotate(-90deg); }
        .lp-vlabel.bottom { transform: translate(-50%, calc(-50% + 90px)) rotate(-90deg); }

        /* ── RODAPÉ ── */
        .lp-foot {
          text-align: center;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: .04em;
          color: var(--muted);
          padding: 14px 0 18px;
          flex-shrink: 0;
          opacity: 0;
          animation: fadeIn .6s 1s ease forwards;
        }

        @keyframes fadeDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes rise { to { opacity: 1; transform: none; } }
        @keyframes pop { from { opacity: 0; transform: translate(-50%, -50%) scale(.6); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }

        /* ── MOBILE ── */
        @media (max-width: 760px) {
          .lp-hero { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
          .lp-panel { transition: none; }
          .lp-panel[data-side="right"] .lp-body,
          .lp-panel[data-side="right"] .lp-blurb,
          .lp-panel[data-side="right"] .lp-cta { text-align: left; margin-left: 0; }
          .lp-panel[data-side="right"] .lp-cta { flex-direction: row; }
          .lp-panel[data-side="right"] .lp-cta-arrow svg { transform: none; }
          .lp-blurb { max-width: none; }
          .lp-seam { left: 0; right: 0; top: 50%; bottom: auto; width: 100%; height: 1px; }
          .lp-vs { top: 50%; left: 50%; }
          .lp-vlabel { display: none; }
        }

        @media (max-width: 760px) and (max-height: 560px) {
          .lp-blurb { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-top, .lp-body, .lp-vs, .lp-vlabel, .lp-foot { animation: none; opacity: 1; }
          .lp-img, .lp-cta-arrow, .lp-panel { transition: none; }
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-top">
          <img src="/logo-noxvelia.png" alt="NOXVELIA" />
        </div>

        <main className="lp-hero">
          {panels.map((panel) => (
            <button
              key={panel.id}
              className="lp-panel"
              data-side={panel.side}
              onClick={() => navigate(panel.route)}
              aria-label={panel.cta}
            >
              <img className="lp-img" src={panel.img} alt="" loading="eager" />
              <div className="lp-scrim" />
              <div
                className="lp-glow"
                style={{ background: `radial-gradient(120% 100% at ${panel.side === 'left' ? '80%' : '20%'} 100%, ${panel.accentSoft}, transparent 60%)` }}
              />

              <div className="lp-body">
                <p className="lp-eyebrow" style={{ color: panel.accent }}>{panel.tag}</p>
                <h2 className="lp-title">
                  NOXVELIA <em>{panel.short}</em>
                </h2>
                <p className="lp-blurb">{panel.blurb}</p>
                <span className="lp-cta">
                  {panel.cta}
                  <span className="lp-cta-arrow">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </div>
            </button>
          ))}

          <div className="lp-seam" />
          <span className="lp-vlabel top">Escolhe</span>
          <div className="lp-vs">N</div>
          <span className="lp-vlabel bottom">o teu mundo</span>
        </main>

        <div className="lp-foot">NOXVELIA Portugal &copy; 2026</div>
      </div>
    </>
  );
}