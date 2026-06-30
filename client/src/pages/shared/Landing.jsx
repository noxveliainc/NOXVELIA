import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';

const mundos = [
  {
    id: 'estate',
    tag: 'Imobiliário',
    title: 'Estate',
    desc: 'Casas, apartamentos e investimentos escolhidos com critério.',
    cta: 'Ver Imóveis',
    route: '/imoveis',
    accent: '#3ecf8e',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=75',
  },
  {
    id: 'drive',
    tag: 'Automóveis',
    title: 'Drive',
    desc: 'Carros inspecionados ao detalhe, prontos para a estrada.',
    cta: 'Ver Automóveis',
    route: '/carros',
    accent: '#2ac1b4',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=75',
  },
];

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .lp-root { font-family: 'Inter', sans-serif; background: #f8fafc; color: #0f172a; display: flex; flex-direction: column; min-height: 100dvh; }

        /* ============ ACESSOS (vertical, simples, leve) ============ */
        .lp-hero {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: clamp(16px, 3vw, 28px);
          background: #040711;
        }

        .lp-card {
          position: relative;
          display: block;
          width: 100%;
          height: clamp(220px, 32vh, 320px);
          border-radius: 20px;
          overflow: hidden;
          border: none;
          cursor: pointer;
          font: inherit;
          color: inherit;
          text-align: left;
          /* Apenas transform/opacity: leve para o browser, sem reflow no hover */
          transform: translateZ(0);
        }

        .lp-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
          transition: transform .35s ease;
        }
        .lp-card:hover .lp-card-img,
        .lp-card:focus-visible .lp-card-img {
          transform: scale(1.04);
        }

        .lp-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(4,7,17,0.15) 0%, rgba(4,7,17,0.35) 50%, rgba(4,7,17,0.9) 100%);
        }

        .lp-card-content {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: clamp(20px, 3vw, 32px);
          color: #f8fafc;
        }

        .lp-card-tag {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          margin-bottom: 12px;
        }

        .lp-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(26px, 4vw, 38px);
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 8px;
        }

        .lp-card-desc {
          max-width: 420px;
          font-size: 13.5px;
          color: rgba(248,250,252,0.8);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .lp-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          color: #040711;
          transition: gap .2s ease;
        }
        .lp-card:hover .lp-card-cta, .lp-card:focus-visible .lp-card-cta { gap: 12px; }

        .lp-card:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }

        @media (prefers-reduced-motion: reduce) {
          .lp-card-img, .lp-card-cta { transition: none; }
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
          .lp-card { height: 240px; }
        }
      `}</style>

      <div className="lp-root">
        <NavbarLanding />

        <section className="lp-hero" aria-label="Escolhe o teu mundo NOXVELIA">
          {mundos.map((m) => (
            <button
              key={m.id}
              className="lp-card"
              onClick={() => navigate(m.route)}
              aria-label={m.cta}
            >
              <img className="lp-card-img" src={m.img} alt="" loading="lazy" />
              <div className="lp-card-overlay" />
              <div className="lp-card-content">
                <span className="lp-card-tag">{m.tag}</span>
                <h2 className="lp-card-title">{m.title}</h2>
                <p className="lp-card-desc">{m.desc}</p>
                <span className="lp-card-cta" style={{ background: m.accent }}>
                  {m.cta}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
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