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
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&h=1200&q=75',
  },
  {
    id: 'drive',
    tag: 'Automóveis',
    title: 'Drive',
    desc: 'Carros inspecionados ao detalhe, prontos para a estrada.',
    cta: 'Ver Automóveis',
    route: '/carros',
    accent: '#2ac1b4',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&h=1200&q=75',
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

        /* ============ ACESSOS: lista vertical, imagens em retrato, sem efeitos ============ */
        .lp-hero {
          display: flex;
          flex-direction: column;
          max-width: 760px;
          width: 100%;
          margin: 0 auto;
          padding: clamp(28px, 5vw, 56px) 20px;
        }

        .lp-row {
          display: flex;
          align-items: center;
          gap: clamp(20px, 4vw, 40px);
          padding: clamp(24px, 4vw, 36px) 0;
          border-bottom: 1px solid #e2e8f0;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          width: 100%;
          text-align: left;
          font: inherit;
        }
        .lp-row:first-child { border-top: 1px solid #e2e8f0; }

        .lp-row-img {
          flex: 0 0 auto;
          width: clamp(96px, 16vw, 140px);
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          object-fit: cover;
          display: block;
        }

        .lp-row-body { flex: 1; min-width: 0; }

        .lp-row-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 6px;
        }

        .lp-row-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(24px, 4vw, 34px);
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin-bottom: 6px;
        }

        .lp-row-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.5;
          max-width: 420px;
          margin-bottom: 14px;
        }

        .lp-row-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
        }
        .lp-row-cta svg { flex: 0 0 auto; }

        @media (max-width: 560px) {
          .lp-row { gap: 16px; }
          .lp-row-img { width: 76px; }
          .lp-row-desc { display: none; }
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
          {mundos.map((m) => (
            <button
              key={m.id}
              className="lp-row"
              onClick={() => navigate(m.route)}
            >
              <img className="lp-row-img" src={m.img} alt="" loading="lazy" />
              <div className="lp-row-body">
                <span className="lp-row-tag">{m.tag}</span>
                <h2 className="lp-row-title">{m.title}</h2>
                <p className="lp-row-desc">{m.desc}</p>
                <span className="lp-row-cta" style={{ color: m.accent }}>
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