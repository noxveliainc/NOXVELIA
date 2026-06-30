import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavbarLanding from '../../components/NavbarLanding';

const mundos = {
  estate: {
    id: 'estate',
    tag: 'Imobiliário',
    title: 'Estate',
    desc: 'Casas, apartamentos e investimentos escolhidos com critério.',
    cta: 'Ver Imóveis',
    route: '/imoveis',
    accent: '#3ecf8e',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=75',
  },
  drive: {
    id: 'drive',
    tag: 'Automóveis',
    title: 'Drive',
    desc: 'Carros inspecionados ao detalhe, prontos para a estrada.',
    cta: 'Ver Automóveis',
    route: '/carros',
    accent: '#2ac1b4',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=75',
  },
};

const pilares = [
  {
    titulo: 'Curadoria a sério',
    desc: 'Cada imóvel e cada viatura passam pelo nosso crivo antes de chegarem até ti.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
    ),
  },
  {
    titulo: 'Dois mundos, uma conta',
    desc: 'Gere imóveis e automóveis no mesmo perfil, sem trocar de plataforma.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
    ),
  },
  {
    titulo: 'Suporte próximo',
    desc: 'Uma equipa dedicada para te acompanhar do primeiro contacto ao negócio fechado.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-7h3z" /><path d="M3 19a2 2 0 0 0 2 2h1v-7H3z" /></svg>
    ),
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { user, signed } = useAuth();
  const [hover, setHover] = useState(null); // 'estate' | 'drive' | null

  const podeFazerHover = useCallback(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    []
  );

  const handleEnter = (id) => { if (podeFazerHover()) setHover(id); };
  const handleLeave = () => { if (podeFazerHover()) setHover(null); };

  const obterUserLocal = () => {
    try {
      const guardado = localStorage.getItem('@App:user');
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  };
  const dadosUser = user || obterUserLocal();
  const primeiroNome = dadosUser?.nome?.split(' ')[0] || '';

  const flexBasis = (id) => {
    if (!hover) return '50%';
    if (hover === id) return '58%';
    return '42%';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .lp-root {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          color: #0f172a;
        }

        /* ============ HERO PARTIDO ============ */
        .lp-hero {
          position: relative;
          height: 100dvh;
          min-height: 560px;
          display: flex;
          overflow: hidden;
          background: #040711;
        }

        .lp-half {
          position: relative;
          flex: 0 0 50%;
          min-width: 0;
          height: 100%;
          border: none;
          cursor: pointer;
          font: inherit;
          color: inherit;
          overflow: hidden;
          transition: flex-basis .6s cubic-bezier(.16,1,.3,1);
        }

        .lp-half-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.06);
          transition: transform .8s cubic-bezier(.16,1,.3,1), filter .6s ease;
          filter: saturate(0.85) brightness(0.78);
        }
        .lp-half.is-active .lp-half-img { transform: scale(1.12); filter: saturate(1.05) brightness(0.85); }
        .lp-half.is-dim .lp-half-img { filter: saturate(0.55) brightness(0.55); }

        .lp-half-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(4,7,17,0.35) 0%, rgba(4,7,17,0.25) 45%, rgba(4,7,17,0.9) 100%);
        }
        .lp-half-estate .lp-half-overlay { background: linear-gradient(180deg, rgba(4,7,17,0.35) 0%, rgba(4,7,17,0.2) 45%, rgba(3,12,9,0.92) 100%); }
        .lp-half-drive .lp-half-overlay { background: linear-gradient(180deg, rgba(4,7,17,0.35) 0%, rgba(4,7,17,0.2) 45%, rgba(2,14,14,0.92) 100%); }

        .lp-half-content {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: clamp(28px, 5vw, 64px) clamp(20px, 6vw, 64px);
          text-align: left;
          color: #f8fafc;
          opacity: 0;
          transform: translateY(16px);
          animation: lp-rise .7s .25s ease forwards;
        }
        .lp-half:nth-child(1) .lp-half-content { animation-delay: .35s; }
        .lp-half:last-of-type .lp-half-content { animation-delay: .5s; }

        .lp-half-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(4px);
          margin-bottom: 18px;
        }

        .lp-half-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(34px, 6vw, 64px);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 12px;
        }

        .lp-half-desc {
          max-width: 360px;
          font-size: clamp(13px, 1.4vw, 15px);
          color: rgba(248,250,252,0.8);
          line-height: 1.55;
          margin-bottom: 22px;
        }

        .lp-half-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          color: #040711;
          transition: gap .25s ease, transform .25s ease;
        }
        .lp-half:hover .lp-half-cta, .lp-half:focus-visible .lp-half-cta { gap: 13px; transform: translateX(2px); }
        .lp-half-cta svg { flex-shrink: 0; }

        .lp-half:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }

        /* costura central */
        .lp-seam {
          position: relative;
          z-index: 5;
          flex: 0 0 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #040711;
        }
        .lp-seam::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 50%;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, transparent, rgba(62,207,142,0.55) 35%, rgba(42,193,180,0.55) 65%, transparent);
        }
        .lp-seam-badge {
          position: relative;
          width: 58px; height: 58px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(4,7,17,0.75);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          color: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          box-shadow: 0 0 0 8px rgba(255,255,255,0.03);
        }

        .lp-hero-eyebrow {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 4;
          text-align: center;
          padding-top: clamp(112px, 16vh, 150px);
          pointer-events: none;
        }
        .lp-hero-eyebrow p {
          color: rgba(248,250,252,0.65);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .lp-hero-eyebrow h1 {
          margin-top: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(20px, 2.6vw, 28px);
          color: #f8fafc;
          letter-spacing: -0.01em;
        }

        .lp-scroll-hint {
          position: absolute;
          bottom: 22px; left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: rgba(248,250,252,0.55);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          animation: lp-bounce 2s ease-in-out infinite;
        }

        @keyframes lp-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes lp-bounce { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 6px); } }

        @media (max-width: 760px) {
          .lp-hero { flex-direction: column; height: auto; min-height: 100dvh; }
          .lp-half { flex-basis: 50% !important; height: 50%; min-height: 280px; }
          .lp-half-img { transform: scale(1.04) !important; filter: saturate(0.95) brightness(0.8) !important; }
          .lp-seam { flex-basis: 0 !important; width: 100%; height: 0; }
          .lp-seam::before { top: 50%; left: 0; right: 0; width: auto; height: 1px; transform: translateY(-50%); background: linear-gradient(90deg, transparent, rgba(62,207,142,0.6), rgba(42,193,180,0.6), transparent); }
          .lp-seam-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
          .lp-hero-eyebrow { padding-top: 96px; }
          .lp-half-content { padding: 22px 20px; }
          .lp-half-title { font-size: 30px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-half-content { animation: none; opacity: 1; transform: none; }
          .lp-half, .lp-half-img, .lp-half-cta, .lp-scroll-hint { transition: none; animation: none; }
        }

        /* ============ PILARES ============ */
        .lp-pillars {
          padding: clamp(56px, 8vw, 96px) 20px;
          max-width: 1080px;
          margin: 0 auto;
        }
        .lp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 32px);
        }
        .lp-pillar {
          text-align: left;
          padding: 28px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
        }
        .lp-pillar-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(62,207,142,0.1);
          color: #0e9f6e;
          margin-bottom: 18px;
        }
        .lp-pillar-icon svg { width: 21px; height: 21px; }
        .lp-pillar h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }
        .lp-pillar p { font-size: 13.5px; color: #64748b; line-height: 1.6; }

        @media (max-width: 760px) {
          .lp-pillars-grid { grid-template-columns: 1fr; }
        }

        .lp-foot {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          padding: 16px 0 32px;
        }
      `}</style>

      <div className="lp-root">
        <NavbarLanding />

        <section className="lp-hero" aria-label="Escolhe o teu mundo NOXVELIA">
          <div className="lp-hero-eyebrow">
            <p>{signed ? `Olá, ${primeiroNome}` : 'Bem-vindo à NOXVELIA'}</p>
            <h1>Escolhe o mundo onde queres continuar</h1>
          </div>

          {['estate', 'drive'].map((id) => {
            const m = mundos[id];
            const ativo = hover === id;
            const apagado = hover && hover !== id;
            return (
              <button
                key={m.id}
                className={`lp-half lp-half-${m.id} ${ativo ? 'is-active' : ''} ${apagado ? 'is-dim' : ''}`}
                style={{ flexBasis: flexBasis(id) }}
                onMouseEnter={() => handleEnter(id)}
                onMouseLeave={handleLeave}
                onFocus={() => handleEnter(id)}
                onBlur={handleLeave}
                onClick={() => navigate(m.route)}
                aria-label={m.cta}
              >
                <img className="lp-half-img" src={m.img} alt="" loading="eager" />
                <div className="lp-half-overlay" />
                <div className="lp-half-content">
                  <span className="lp-half-tag">{m.tag}</span>
                  <h2 className="lp-half-title">{m.title}</h2>
                  <p className="lp-half-desc">{m.desc}</p>
                  <span className="lp-half-cta" style={{ background: m.accent }}>
                    {m.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>
            );
          })}

          <div className="lp-seam" aria-hidden="true">
            <span className="lp-seam-badge">OU</span>
          </div>

          <div className="lp-scroll-hint" aria-hidden="true">
            <span>Saber mais</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </section>

        <section className="lp-pillars">
          <div className="lp-pillars-grid">
            {pilares.map((p) => (
              <div className="lp-pillar" key={p.titulo}>
                <div className="lp-pillar-icon">{p.icon}</div>
                <h3>{p.titulo}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="lp-foot">NOXVELIA Portugal &copy; 2026</div>
      </div>
    </>
  );
}