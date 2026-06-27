import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CURSOR_SIZE = 32;
const LERP_FACTOR = 0.12;

const panels = [
  {
    id: 'imoveis',
    label: 'NOXVELIA',
    tag: 'estate',
    sublabel: 'Estate Division',
    route: '/imoveis',
    accentMid: '#3ecf8e',
    accentDim: 'rgba(62,207,142,0.04)',
    bg: 'linear-gradient(160deg, #040f09 0%, #071a10 60%, #0a2416 100%)',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
    description: 'Plataforma cognitiva para ativos imobiliários, residências premium e investimentos de alto padrão.',
    number: '01',
    btnBg: '#3ecf8e',
    tagBg: 'rgba(62, 207, 142, 0.1)',
    tagColor: '#3ecf8e'
  },
  {
    id: 'carros',
    label: 'NOXVELIA',
    tag: 'drive',
    sublabel: 'Drive Division',
    route: '/carros',
    accentMid: '#2ac1b4',
    accentDim: 'rgba(42,193,180,0.04)',
    bg: 'linear-gradient(160deg, #040d0f 0%, #07171a 60%, #0a2024 100%)',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    description: 'Ecossistema inteligente para frotas comerciais, desportivos de prestígio e veículos elétricos.',
    number: '02',
    btnBg: '#2ac1b4',
    tagBg: 'rgba(42, 193, 180, 0.1)',
    tagColor: '#3cd1c4'
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const animState = useRef({
    mouseX: -200, mouseY: -200,
    curX: -200, curY: -200,
    raf: null,
    running: false,
  });

  const startLoop = useCallback(() => {
    const state = animState.current;
    if (state.running) return;
    state.running = true;

    const tick = () => {
      const s = animState.current;
      s.curX += (s.mouseX - s.curX) * LERP_FACTOR;
      s.curY += (s.mouseY - s.curY) * LERP_FACTOR;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${s.curX - CURSOR_SIZE / 2}px,${s.curY - CURSOR_SIZE / 2}px)`;
      }
      s.raf = requestAnimationFrame(tick);
    };

    state.raf = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));

    const onMove = (e) => {
      const s = animState.current;
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform =
          `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    startLoop();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animState.current.raf);
      animState.current.running = false;
    };
  }, [startLoop]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .pp-root { 
          font-family: 'Inter', sans-serif; 
          background: #020617; 
          color: #f8fafc; 
          min-height: 100vh; 
          overflow: hidden; 
          cursor: none;
        }

        .pp-cursor { position: fixed; top: 0; left: 0; width: ${CURSOR_SIZE}px; height: ${CURSOR_SIZE}px; border: 1px solid rgba(60,209,196,0.25); border-radius: 50%; pointer-events: none; z-index: 9999; will-change: transform; mix-blend-mode: difference; }
        .pp-cursor-dot { position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: #3cd1c4; border-radius: 50%; pointer-events: none; z-index: 9999; will-change: transform; mix-blend-mode: difference; }

        /* ── HERO SPLIT GRID ── */
        .pp-hero { display: grid; grid-template-columns: 1fr 1fr; height: 100vh; width: 100%; }

        .pp-panel { 
          position: relative; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          align-items: center;    
          padding: 80px 64px; 
          transition: flex 0.7s cubic-bezier(0.76, 0, 0.24, 1); 
          flex: 1;
        }
        .pp-panel:hover { flex: 1.15; }

        .pp-panel-bg { 
          position: absolute; 
          inset: 0; 
          background-size: cover; 
          background-position: center; 
          opacity: 0.14; 
          transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
          transform: scale(1.02); 
          will-change: transform, opacity; 
        }
        .pp-panel:hover .pp-panel-bg { opacity: 0.26; transform: scale(1.0); }

        .pp-panel-overlay { position: absolute; inset: 0; pointer-events: none; }

        .pp-panel-number { 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          font-size: clamp(140px, 20vw, 240px); 
          font-weight: 800; 
          line-height: 1; 
          color: transparent; 
          -webkit-text-stroke: 1px rgba(244, 244, 245, 0.015); 
          pointer-events: none; 
          transition: -webkit-text-stroke-color 0.5s, transform 0.6s; 
          user-select: none; 
          letter-spacing: -0.05em; 
        }
        .pp-panel:hover .pp-panel-number { -webkit-text-stroke-color: rgba(244, 244, 245, 0.03); transform: translate(-50%, -50%) scale(1.02); }

        .pp-divider { position: absolute; top: 0; right: 0; width: 1px; height: 100%; background: rgba(255, 255, 255, 0.03); z-index: 2; }

        /* ── CONTEÚDO CENTRALIZADO ── */
        .pp-panel-content { 
          position: relative; 
          z-index: 5; 
          opacity: 0; 
          transform: translateY(12px); 
          transition: opacity 0.7s ease, transform 0.7s ease; 
          display: flex;
          flex-direction: column;
          align-items: center; 
          text-align: center;  
        }
        .pp-panel-content.loaded { opacity: 1; transform: none; }
        .pp-panel:first-child .pp-panel-content { transition-delay: 0.3s; }
        .pp-panel:last-child .pp-panel-content { transition-delay: 0.4s; }

        .pp-panel-brand-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .pp-panel-text-flex {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .pp-panel-title-wrapper {
          display: flex;
          align-items: center; 
          gap: 12px;
        }

        .pp-panel-sublabel { 
          font-size: 11px; 
          font-weight: 600; 
          letter-spacing: 0.06em; 
          text-transform: uppercase; 
          opacity: 0.35;
        }
        
        .pp-panel-title { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          font-size: clamp(28px, 3.2vw, 44px); 
          font-weight: 800; 
          line-height: 1; 
          letter-spacing: -0.02em; 
          color: #ffffff; 
        }

        .pp-panel-badge {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 6px;
          line-height: 1;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .pp-panel-desc { 
          font-size: 14px; 
          line-height: 1.6; 
          color: #94a3b8; 
          max-width: 360px; 
          margin-bottom: 36px; 
          font-weight: 400; 
        }

        .pp-btn-primary { 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          padding: 14px 28px; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          font-weight: 600; 
          border: none; 
          cursor: none; 
          border-radius: 8px; 
          transition: transform 0.2s, background-color 0.2s; 
        }
        .pp-btn-primary:active { transform: scale(0.98); }

        .pp-btn-arrow { display: inline-block; transition: transform 0.2s; }
        .pp-btn-primary:hover .pp-btn-arrow { transform: translateX(4px); }

        .pp-tagline { 
          position: fixed; 
          bottom: 32px; 
          left: 50%; 
          transform: translateX(-50%); 
          z-index: 50; 
          font-size: 11px; 
          font-weight: 500; 
          letter-spacing: 0.03em; 
          color: #475569; 
          opacity: 0; 
          transition: opacity 0.6s 0.6s ease; 
          white-space: nowrap; 
        }
        .pp-tagline.loaded { opacity: 1; }

        @media(max-width:768px) {
          .pp-hero { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
          .pp-panel { padding: 48px 32px; }
          .pp-cursor, .pp-cursor-dot { display: none; }
          .pp-root { cursor: default; }
          .pp-panel, .pp-btn-primary { cursor: pointer; }
          .pp-panel-title-wrapper { flex-direction: column; align-items: center; gap: 8px; }
        }
      `}</style>

      <div className="pp-root">
        <div ref={cursorRef} className="pp-cursor" />
        <div ref={cursorDotRef} className="pp-cursor-dot" />

        {/* 🌟 Cabeçalho superior esquerdo foi removido conforme o teu pedido */}

        {/* Módulos Operacionais Centralizados */}
        <main className="pp-hero">
          {panels.map((panel, i) => (
            <section key={panel.id} className="pp-panel" style={{ background: panel.bg }}>
              <div
                className="pp-panel-bg"
                style={{ backgroundImage: `url(${panel.img})` }}
              />
              <div
                className="pp-panel-overlay"
                style={{ background: `radial-gradient(ellipse at bottom, ${panel.accentDim} 0%, transparent 65%)` }}
              />

              <div className="pp-panel-number">{panel.number}</div>
              {i === 0 && <div className="pp-divider" />}

              <div className={`pp-panel-content${loaded ? ' loaded' : ''}`}>
                
                <div className="pp-panel-brand-box">
                  {/* 🌟 NOVA LOGO NOS PAINÉIS CENTRAIS */}
                 
<img 
  src="/logo-noxvelia.png" 
  alt="NOXVELIA" 
  style={{ height: '64px', width: 'auto', objectFit: 'contain' }} 
/>
                  
                  
                  <div className="pp-panel-text-flex">
                    <p className="pp-panel-sublabel">{panel.sublabel}</p>
                    <div className="pp-panel-title-wrapper">
                      <h2 className="pp-panel-title">{panel.label}</h2>
                      <span 
                        className="pp-panel-badge" 
                        style={{ background: panel.tagBg, color: panel.tagColor }}
                      >
                        {panel.tag}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="pp-panel-desc">{panel.description}</p>
                
                <div className="pp-panel-actions">
                  <button
                    onClick={() => navigate(panel.route)}
                    className="pp-btn-primary"
                    style={{ background: panel.btnBg, color: '#020617' }}
                  >
                    Aceder a NOXVELIA {panel.tag}
                    <span className="pp-btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </section>
          ))}
        </main>

        <div className={`pp-tagline${loaded ? ' loaded' : ''}`}>
          NOXVELIA Ecosystem &bull; Intelligence Platforms &bull; Portugal &bull; 2026
        </div>
      </div>
    </>
  );
}