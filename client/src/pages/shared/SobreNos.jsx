import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@mdi/react';
import {
  mdiCarSports,
  mdiHomeCityOutline,
  mdiMapMarkerOutline,
  mdiShieldCheckOutline,
  mdiHandshakeOutline,
  mdiArrowRight,
} from '@mdi/js';
import Seo from '../../components/Seo';

const MAP_SRC = 'https://www.openstreetmap.org/export/embed.html?bbox=-8.3308%2C41.2525%2C-8.2364%2C41.3238&layer=mapnik&marker=41.2789%2C-8.2826';

const valores = [
  {
    icon: mdiShieldCheckOutline,
    title: 'Confiança primeiro',
    text: 'Queremos anúncios claros, fotografias consistentes e contacto direto entre quem vende e quem procura.',
  },
  {
    icon: mdiCarSports,
    title: 'Especialistas em mobilidade',
    text: 'A Carros foi pensada para destacar automóveis com dados completos e pesquisa rápida.',
  },
  {
    icon: mdiHomeCityOutline,
    title: 'Imóveis com contexto',
    text: 'A Imóveis organiza casas, terrenos e espaços comerciais para uma decisão mais simples.',
  },
  {
    icon: mdiHandshakeOutline,
    title: 'Crescimento com parceiros',
    text: 'Trabalhamos para facilitar a entrada de stands, imobiliárias e vendedores profissionais na plataforma.',
  },
];

export default function SobreNos() {
  return (
    <>
      <Seo
        title="Sobre nós | NOXVELIA"
        description="Conhece a NOXVELIA, plataforma portuguesa para pesquisar, publicar e descobrir carros e imóveis com clareza."
        path="/sobre-nos"
      />

      <style>{`
        .about-page { min-height: 100%; background: #f8fafc; color: #0f172a; font-family: var(--nx-font-body, 'Inter', sans-serif); }
        .about-shell { width: min(1120px, calc(100% - 40px)); margin: 0 auto; padding: 56px 0 72px; }
        .about-hero { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(320px, .95fr); gap: 36px; align-items: center; padding-bottom: 44px; }
        .about-kicker { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px; color: #0f766e; background: rgba(217, 196, 156, .1); border: 1px solid rgba(217, 196, 156, .22); border-radius: 999px; padding: 7px 11px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
        .about-title { font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: clamp(34px, 6vw, 64px); line-height: .98; letter-spacing: 0; margin: 0 0 20px; color: #0f172a; }
        .about-lead { max-width: 630px; color: #475569; font-size: clamp(16px, 2vw, 19px); line-height: 1.72; margin: 0; }
        .about-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .about-btn { min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; border-radius: 12px; padding: 0 18px; font-size: 13px; font-weight: 850; text-decoration: none; transition: transform .18s ease, border-color .18s ease, background .18s ease; }
        .about-btn.primary { background: #d9c49c; color: #ffffff; border: 1px solid #d9c49c; box-shadow: 0 18px 34px -24px rgba(217, 196, 156, .9); }
        .about-btn.secondary { background: #ffffff; color: #0f172a; border: 1px solid #dbe3ea; }
        .about-btn:hover { transform: translateY(-1px); }
        .about-map-card { overflow: hidden; border-radius: 8px; border: 1px solid #dbe3ea; background: #ffffff; box-shadow: 0 28px 72px -54px rgba(15, 23, 42, .72); }
        .about-map-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; border-bottom: 1px solid #e2e8f0; }
        .about-map-title { display: flex; align-items: center; gap: 9px; font-size: 14px; font-weight: 900; color: #0f172a; }
        .about-map-place { color: #64748b; font-size: 12px; font-weight: 750; text-align: right; }
        .about-map-frame { position: relative; aspect-ratio: 4 / 3; background: #dbeafe; }
        .about-map-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; filter: saturate(.92) contrast(.98); }
        .about-values { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; padding: 22px 0 10px; }
        .about-value { min-height: 168px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 16px 40px -36px rgba(15, 23, 42, .7); }
        .about-value-icon { width: 36px; height: 36px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; color: #0f766e; background: rgba(217, 196, 156, .1); margin-bottom: 18px; }
        .about-value h2 { font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: 16px; line-height: 1.25; margin: 0 0 9px; color: #0f172a; }
        .about-value p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.62; }
        .about-story { display: grid; grid-template-columns: .8fr 1.2fr; gap: 34px; margin-top: 38px; padding-top: 38px; border-top: 1px solid #e2e8f0; }
        .about-story h2 { font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: clamp(24px, 3vw, 34px); line-height: 1.08; margin: 0; color: #0f172a; }
        .about-story-text { display: flex; flex-direction: column; gap: 16px; color: #475569; font-size: 15px; line-height: 1.78; }
        .about-story-text p { margin: 0; }
        .about-location-note { display: inline-flex; align-items: center; gap: 8px; width: fit-content; margin-top: 8px; padding: 9px 12px; border-radius: 999px; color: #0f766e; background: rgba(217, 196, 156, .09); border: 1px solid rgba(217, 196, 156, .22); font-size: 12px; font-weight: 850; }
        @media (max-width: 920px) { .about-hero, .about-story { grid-template-columns: 1fr; } .about-values { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 560px) { .about-shell { width: min(100% - 24px, 1120px); padding: 34px 0 52px; } .about-values { grid-template-columns: 1fr; } .about-map-head { align-items: flex-start; flex-direction: column; } .about-map-place { text-align: left; } .about-actions { flex-direction: column; } .about-btn { width: 100%; } }
      `}</style>

      <div className="about-page">
        <div className="about-shell">
          <section className="about-hero" aria-labelledby="about-title">
            <div>
              <div className="about-kicker"><Icon path={mdiMapMarkerOutline} size={0.65} /> Lousada, Porto, Portugal</div>
              <h1 className="about-title" id="about-title">Sobre a NOXVELIA</h1>
              <p className="about-lead">
                A NOXVELIA nasce em Portugal para tornar a procura de automóveis e imóveis mais direta, organizada e transparente. Estamos a construir uma plataforma onde os anúncios têm melhor apresentação, dados mais completos e contacto simples.
              </p>
              <div className="about-actions">
                <Link className="about-btn primary" to="/publicar">Publicar anúncio <Icon path={mdiArrowRight} size={0.72} /></Link>
                <Link className="about-btn secondary" to="/carros">Ver automóveis</Link>
                <Link className="about-btn secondary" to="/imoveis">Ver imóveis</Link>
              </div>
            </div>

            <aside className="about-map-card" aria-label="Mapa da localização da NOXVELIA">
              <div className="about-map-head">
                <div className="about-map-title"><Icon path={mdiMapMarkerOutline} size={0.78} /> Onde estamos</div>
                <div className="about-map-place">Lousada, Porto, Portugal</div>
              </div>
              <div className="about-map-frame">
                <iframe
                  title="Mapa de Lousada, Porto, Portugal"
                  src={MAP_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </section>

          <section className="about-values" aria-label="Valores da NOXVELIA">
            {valores.map((item) => (
              <article className="about-value" key={item.title}>
                <span className="about-value-icon"><Icon path={item.icon} size={0.9} /></span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </section>

          <section className="about-story" aria-labelledby="about-story-title">
            <h2 id="about-story-title">Uma plataforma feita para anúncios que merecem ser vistos.</h2>
            <div className="about-story-text">
              <p>
                O objetivo é simples: juntar carros e imóveis numa experiência mais cuidada, onde compradores conseguem comparar melhor e vendedores conseguem apresentar cada anúncio com mais qualidade.
              </p>
              <p>
                Estamos a melhorar continuamente a publicação, a organização das fotografias, a ficha técnica dos automóveis, os equipamentos e a forma como os utilizadores encontram oportunidades perto de si.
              </p>
              <div className="about-location-note"><Icon path={mdiMapMarkerOutline} size={0.68} /> Base operacional em Lousada, distrito do Porto</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}