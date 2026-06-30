import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const panels = [
  {
    id: 'imoveis',
    label: 'NOXVELIA Estate',
    tag: 'Imobiliário Premium',
    route: '/imoveis',
    accent: '#3ecf8e',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
    description: 'Encontre a sua próxima residência de luxo ou oportunidade de investimento imobiliário.',
    btnBg: '#3ecf8e',
    btnText: '#ffffff',
  },
  {
    id: 'carros',
    label: 'NOXVELIA Drive',
    tag: 'Automóveis de Prestígio',
    route: '/carros',
    accent: '#2ac1b4',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    description: 'Explore a nossa seleção rigorosa de veículos desportivos, familiares e elétricos.',
    btnBg: '#2ac1b4',
    btnText: '#ffffff',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Um pequeno delay para a animação suave de entrada
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .pp-root { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff; 
          color: #0f172a; 
          min-height: 100vh; 
          overflow: hidden; 
          position: relative;
        }

        /* ── LOGO GLOBAL NO TOPO ── */
        .pp-global-logo {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          opacity: 0;
          animation: fadeDown 0.8s 0.2s ease forwards;
        }
        .pp-global-logo img {
          height: 48px;
          width: auto;
        }

        /* ── HERO SPLIT GRID ── */
        .pp-hero { 
          display: flex; 
          height: 100vh; 
          width: 100%; 
        }

        .pp-panel { 
          position: relative; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          justify-content: flex-end; 
          align-items: center;    
          padding: 80px 40px; 
          transition: flex 0.7s cubic-bezier(0.76, 0, 0.24, 1); 
          flex: 1;
          cursor: pointer;
        }
        .pp-panel:hover { flex: 1.25; }

        .pp-panel-bg { 
          position: absolute; 
          inset: 0; 
          background-size: cover; 
          background-position: center; 
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
          transform: scale(1); 
          will-change: transform; 
        }
        .pp-panel:hover .pp-panel-bg { transform: scale(1.05); }

        /* Gradiente Branco que sobe desde baixo para ler o texto perfeitamente */
        .pp-panel-overlay { 
          position: absolute; 
          inset: 0; 
          background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0) 70%); 
          pointer-events: none; 
        }

        .pp-divider { 
          position: absolute; 
          top: 0; 
          right: 0; 
          width: 1px; 
          height: 100%; 
          background: rgba(0, 0, 0, 0.08); 
          z-index: 2; 
        }

        /* ── CONTEÚDO ── */
        .pp-panel-content { 
          position: relative; 
          z-index: 5; 
          opacity: 0; 
          transform: translateY(20px); 
          transition: opacity 0.7s ease, transform 0.7s ease; 
          display: flex;
          flex-direction: column;
          align-items: center; 
          text-align: center;  
          max-width: 480px;
        }
        .pp-panel-content.loaded { opacity: 1; transform: none; }
        .pp-panel:first-child .pp-panel-content { transition-delay: 0.3s; }
        .pp-panel:last-child .pp-panel-content { transition-delay: 0.4s; }

        .pp-panel-tag { 
          font-size: 11px; 
          font-weight: 700; 
          letter-spacing: 0.1em; 
          text-transform: uppercase; 
          color: #64748b;
          margin-bottom: 8px;
        }
        
        .pp-panel-title { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          font-size: clamp(32px, 4vw, 48px); 
          font-weight: 800; 
          line-height: 1.1; 
          letter-spacing: -0.03em; 
          color: #0f172a; 
          margin-bottom: 16px;
        }
        
        .pp-panel-desc { 
          font-size: 15px; 
          line-height: 1.6; 
          color: #475569; 
          margin-bottom: 32px; 
          font-weight: 500; 
        }

        .pp-btn-primary { 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          padding: 16px 32px; 
          font-family: 'Inter', sans-serif; 
          font-size: 14px; 
          font-weight: 700; 
          border: none; 
          cursor: pointer; 
          border-radius: 12px; 
          transition: transform 0.2s, box-shadow 0.2s; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        .pp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .pp-btn-primary:active { transform: scale(0.98); }

        .pp-btn-arrow { display: inline-block; transition: transform 0.2s; }
        .pp-btn-primary:hover .pp-btn-arrow { transform: translateX(4px); }

        .pp-tagline { 
          position: fixed; 
          bottom: 24px; 
          left: 50%; 
          transform: translateX(-50%); 
          z-index: 50; 
          font-size: 11px; 
          font-weight: 600; 
          letter-spacing: 0.05em; 
          color: #94a3b8; 
          opacity: 0; 
          transition: opacity 0.6s 0.6s ease; 
          white-space: nowrap; 
          pointer-events: none;
        }
        .pp-tagline.loaded { opacity: 1; }

        @keyframes fadeDown {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        @media(max-width:768px) {
          .pp-hero { flex-direction: column; }
          .pp-panel { padding: 48px 24px; justify-content: flex-end; }
          .pp-panel:hover { flex: 1; }
          .pp-divider { width: 100%; height: 1px; top: auto; bottom: 0; left: 0; }
          .pp-global-logo { top: 24px; }
        }
      `}</style>

      <div className="pp-root">
        
        {/* LOGO CENTRAL UNIFICADO NO TOPO */}
        <div className="pp-global-logo">
          <img src="/logo-noxvelia.png" alt="NOXVELIA" />
        </div>

        {/* Módulos Operacionais */}
        <main className="pp-hero">
          {panels.map((panel, i) => (
            <section 
              key={panel.id} 
              className="pp-panel" 
              onClick={() => navigate(panel.route)}
            >
              <div
                className="pp-panel-bg"
                style={{ backgroundImage: `url(${panel.img})` }}
              />
              <div className="pp-panel-overlay" />

              {i === 0 && <div className="pp-divider" />}

              <div className={`pp-panel-content${loaded ? ' loaded' : ''}`}>
                
                <p className="pp-panel-tag" style={{ color: panel.accent }}>{panel.tag}</p>
                <h2 className="pp-panel-title">{panel.label}</h2>
                <p className="pp-panel-desc">{panel.description}</p>
                
                <button
                  className="pp-btn-primary"
                  style={{ background: panel.btnBg, color: panel.btnText }}
                >
                  Entrar na Plataforma
                  <span className="pp-btn-arrow">→</span>
                </button>

              </div>
            </section>
          ))}
        </main>

        <div className={`pp-tagline${loaded ? ' loaded' : ''}`}>
          NOXVELIA PORTUGAL &copy; 2026
        </div>
      </div>
    </>
  );
}