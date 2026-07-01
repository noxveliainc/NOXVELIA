import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLanding from './NavbarLanding';
import Footer from '../../components/Footer';

const mundos = [
  {
    id: 'estate',
    tag: 'Imobiliário',
    title: 'NOXVELIA Estate',
    desc: 'Casas, apartamentos e investimentos escolhidos com rigor.',
    cta: 'Explorar Imóveis',
    route: '/imoveis',
    color: '#3ecf8e',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'drive',
    tag: 'Automóveis',
    title: 'NOXVELIA Drive',
    desc: 'Veículos de prestígio inspecionados ao mínimo detalhe.',
    cta: 'Explorar Automóveis',
    route: '/carros',
    color: '#2ac1b4',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  },
];

const pilares = [
  {
    titulo: 'Curadoria a sério',
    desc: 'Cada ativo é filtrado pelo nosso crivo antes de chegar à plataforma. Qualidade acima de quantidade.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    ),
  },
  {
    titulo: 'Dois mundos, uma conta',
    desc: 'Gere os teus imóveis e automóveis a partir de um único painel de controlo centralizado.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
    ),
  },
  {
    titulo: 'Suporte próximo',
    desc: 'Uma equipa dedicada para acompanhar as tuas vendas do primeiro clique até ao aperto de mão.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
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
        
        .lp-root { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff; 
          color: #0f172a; 
          display: flex; 
          flex-direction: column; 
          min-height: 100vh; 
        }

        /* ============ HERO SECTION (Wireframe Top) ============ */
        .lp-hero {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 80px 24px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .lp-hero-text h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #0f172a;
          margin-bottom: 24px;
        }
        
        .lp-hero-text p {
          font-size: 18px;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 32px;
          max-width: 480px;
        }

        .lp-hero-visual {
          position: relative;
          height: 500px;
          border-radius: 24px;
          background: #f8fafc;
          overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
        }
        
        .lp-hero-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ============ BENEFITS (Wireframe Middle) ============ */
        .lp-benefits {
          background: #f8fafc;
          padding: 80px 24px;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }

        .lp-benefits-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .lp-pillar { text-align: center; }
        .lp-pillar-icon {
          width: 56px; height: 56px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          color: #0f172a;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .lp-pillar-icon svg { width: 24px; height: 24px; }
        .lp-pillar h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px; font-weight: 800; margin-bottom: 12px;
        }
        .lp-pillar p { font-size: 15px; color: #64748b; line-height: 1.6; }

        /* ============ SOCIAL PROOF (Wireframe Testimonial) ============ */
        .lp-social {
          padding: 100px 24px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .lp-quote-icon {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 80px;
          line-height: 0;
          color: #cbd5e1;
          margin-bottom: 24px;
          display: block;
        }
        .lp-social p {
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 500;
          color: #0f172a;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .lp-social-author {
          font-weight: 700; color: #475569; font-size: 15px;
        }

        /* ============ PRICING / CTA CARDS (Wireframe Bottom) ============ */
        .lp-cta-section {
          padding: 0 24px 100px;
        }
        .lp-cta-container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        
        .lp-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }

        .lp-card-img {
          width: 100%;
          height: 200px;
          border-radius: 16px;
          object-fit: cover;
          margin-bottom: 24px;
        }

        .lp-card-tag {
          font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 8px; display: block;
        }

        .lp-card h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; margin-bottom: 12px; }
        .lp-card p { font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 32px; flex: 1; }

        .lp-card-btn {
          width: 100%; padding: 16px; border-radius: 12px; border: none; font-size: 15px; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: filter 0.2s;
        }
        .lp-card-btn:hover { filter: brightness(0.9); }

        @media (max-width: 900px) {
          .lp-hero { grid-template-columns: 1fr; padding-top: 40px; gap: 40px; text-align: center; }
          .lp-hero-text p { margin: 0 auto 32px; }
          .lp-hero-visual { height: 300px; }
          .lp-benefits-container { grid-template-columns: 1fr; gap: 48px; }
          .lp-cta-container { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="lp-root">
        <NavbarLanding />

        {/* 1. HERO SECTION */}
        <section className="lp-hero">
          <div className="lp-hero-text">
            <h1>O mercado premium, <br/>numa só plataforma.</h1>
            <p>A NOXVELIA liga compradores e vendedores de ativos de alto padrão num ecossistema unificado, seguro e livre de ruído.</p>
            <button 
              className="lp-card-btn" 
              style={{ background: '#0f172a', color: '#fff', width: 'auto', padding: '16px 32px', display: 'inline-flex' }}
              onClick={() => {
                document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar a Plataforma
            </button>
          </div>
          <div className="lp-hero-visual">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" alt="Mansão Premium" />
          </div>
        </section>

        {/* 2. BENEFITS SECTION */}
        <section className="lp-benefits">
          <div className="lp-benefits-container">
            {pilares.map((p) => (
              <div className="lp-pillar" key={p.titulo}>
                <div className="lp-pillar-icon">{p.icon}</div>
                <h3>{p.titulo}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SOCIAL PROOF */}
        <section className="lp-social">
          <span className="lp-quote-icon">“</span>
          <p>Encontrar o comprador certo para um ativo premium exige descrição e uma plataforma focada na qualidade. A NOXVELIA entregou ambos.</p>
          <div className="lp-social-author">Ricardo T., Vendedor Profissional</div>
        </section>

        {/* 4. CTA CARDS (Estate & Drive) */}
        <section className="lp-cta-section" id="explore">
          <div className="lp-cta-container">
            {mundos.map((m) => (
              <div className="lp-card" key={m.id}>
                <img src={m.img} alt={m.title} className="lp-card-img" />
                <span className="lp-card-tag" style={{ color: m.color }}>{m.tag}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <button 
                  className="lp-card-btn" 
                  style={{ background: m.color, color: m.id === 'estate' ? '#fff' : '#0f172a' }}
                  onClick={() => navigate(m.route)}
                >
                  {m.cta} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}