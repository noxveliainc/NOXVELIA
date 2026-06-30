import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';

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
  const [hover, setHover] = useState(null); // 'estate' | 'drive' | null

  const podeFazerHover = useCallback(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    []
  );

  const handleEnter = (id) => { if (podeFazerHover()) setHover(id); };
  const handleLeave = () => { if (podeFazerHover()) setHover(null); };

  const flexBasis = (id) => {
    if (!hover) return '50%';
    return hover === id ? '58%' : '42%';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .lp-root { font-family: 'Inter', sans-serif; background: #f8fafc; color: #0f172a; display: flex; flex-direction: column; min-height: 100dvh; }

        /* ============ HERO PARTIDO ============ */
        .lp-hero {
          position: relative;
          height: 100dvh;
          min-height: 520px;
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
          transition: flex-basis .5s cubic-bezier(.16,1,.3,1);
        }
        .lp-half + .lp-half { border-left: 1px solid rgba(255,255,255,0.08); }

        .lp-half-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.05);
          transition: transform .6s ease, filter .4s ease;
          filter: saturate(0.85) brightness(0.75);
        }
        .lp-half.is-active .lp-half-img { transform: scale(1.1); filter: saturate(1.05) brightness(0.85); }

        .lp-half-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(4,7,17,0.25) 0%, rgba(4,7,17,0.3) 45%, rgba(4,7,17,0.92) 100%);
        }

        .lp-half-content {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: clamp(28px, 5vw, 64px) clamp(20px, 6vw, 64px);
          color: #f8fafc;
        }

        .lp-half-tag {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
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
          transition: gap .2s ease;
        }
        .lp-half:hover .lp-half-cta, .lp-half:focus-visible .lp-half-cta { gap: 13px; }

        .lp-half:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }

        @media (max-width: 760px) {
          .lp-hero { flex-direction: column; height: auto; min-height: 100dvh; padding-top: 70px; }
          .lp-half { flex-basis: 50% !important; height: 50%; min-height: 260px; }
          .lp-half + .lp-half { border-left: none; border-top: 1px solid rgba(255,255,255,0.08); }
          .lp-half-content { padding: 22px 20px; }
          .lp-half-title { font-size: 30px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-half, .lp-half-img, .lp-half-cta { transition: none; }
        }

        /* ============ PILARES ============ */
        .lp-pillars {
          padding: clamp(56px, 8vw, 96px) 20px;
          max-width: 1080px;
          margin: 0 auto;
          width: 100%;
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
      `}</style>

      <div className="lp-root">
        <NavbarLanding />

        <section className="lp-hero" aria-label="Escolhe o teu mundo NOXVELIA">
          {['estate', 'drive'].map((id) => {
            const m = mundos[id];
            const ativo = hover === id;
            return (
              <button
                key={m.id}
                className={`lp-half ${ativo ? 'is-active' : ''}`}
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

        <Footer />
      </div>
    </>
  );
}