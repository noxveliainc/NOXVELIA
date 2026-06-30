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
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&h=1200&q=75',
  },
  {
    id: 'drive',
    tag: 'Automóveis',
    title: 'Drive',
    desc: 'Carros inspecionados ao detalhe, prontos para a estrada.',
    cta: 'Ver Automóveis',
    route: '/carros',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&h=1200&q=75',
  },
];

const pilares = [
  {
    titulo: 'Curadoria a sério',
    desc: 'Cada imóvel e cada viatura passam pelo nosso crivo antes de chegarem até ti.',
  },
  {
    titulo: 'Dois mundos, uma conta',
    desc: 'Gere imóveis e automóveis no mesmo perfil, sem trocar de plataforma.',
  },
  {
    titulo: 'Suporte próximo',
    desc: 'Uma equipa dedicada para te acompanhar do primeiro contacto ao negócio fechado.',
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

        /* ============ ACESSOS: lista vertical simples ============ */
        .lp-hero {
          display: flex;
          flex-direction: column;
          max-width: 720px;
          width: 100%;
          margin: 0 auto;
          padding: clamp(28px, 5vw, 56px) 20px;
        }

        .lp-row {
          display: flex;
          align-items: center;
          gap: clamp(20px, 4vw, 36px);
          padding: clamp(24px, 4vw, 32px) 0;
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
          width: clamp(90px, 14vw, 120px);
          aspect-ratio: 3 / 4;
          border-radius: 10px;
          object-fit: cover;
          display: block;
        }

        .lp-row-body { flex: 1; min-width: 0; }

        .lp-row-tag {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 4px;
        }

        .lp-row-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 4vw, 30px);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .lp-row-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.5;
          max-width: 420px;
        }

        @media (max-width: 560px) {
          .lp-row { gap: 14px; }
          .lp-row-img { width: 70px; }
          .lp-row-desc { display: none; }
        }

        /* ============ PILARES ============ */
        .lp-pillars {
          padding: clamp(48px, 7vw, 80px) 20px;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .lp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 32px);
        }
        .lp-pillar { text-align: left; }
        .lp-pillar h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .lp-pillar p { font-size: 13.5px; color: #64748b; line-height: 1.6; }

        @media (max-width: 760px) {
          .lp-pillars-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>

      <div className="lp-root">
        <NavbarLanding />

        <section className="lp-hero" aria-label="Escolhe o teu mundo NOXVELIA">
          {mundos.map((m) => (
            <button key={m.id} className="lp-row" onClick={() => navigate(m.route)}>
              <img className="lp-row-img" src={m.img} alt="" loading="lazy" />
              <div className="lp-row-body">
                <span className="lp-row-tag">{m.tag}</span>
                <h2 className="lp-row-title">{m.title}</h2>
                <p className="lp-row-desc">{m.desc}</p>
              </div>
            </button>
          ))}
        </section>

        <section className="lp-pillars">
          <div className="lp-pillars-grid">
            {pilares.map((p) => (
              <div className="lp-pillar" key={p.titulo}>
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