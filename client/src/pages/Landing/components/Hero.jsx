import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Link2 } from 'lucide-react';
import trackEvent from './trackEvent';

const HERO_IMG = '/noxvelia-hero-coast.webp';

export default function Hero({ publicarTo, publicarState, onOpenSendListing }) {
  return (
    <section className="nx-hero" data-reveal>
      <div className="nx-hero-bg" aria-hidden="true">
        <img src={HERO_IMG} alt="" fetchpriority="high" />
        <div className="nx-hero-overlay" />
      </div>

      <div className="nx-hero-content">
        <h1>Compra. Vende. Descobre.</h1>
        <p>
          Automóveis e imóveis em Portugal.
          <br />
          Uma forma simples de encontrar, anunciar e negociar diretamente.
        </p>

        <div className="nx-hero-ctas">
          <Link
            className="nx-btn-primary"
            to={publicarTo}
            state={publicarState}
            onClick={() => trackEvent('click_publish')}
          >
            Publicar gratuitamente <ArrowRight size={16} />
          </Link>
          <a className="nx-btn-secondary" href="#anuncios-recentes">
            Explorar anúncios
          </a>
        </div>

        <p className="nx-hero-microcopy">Sem comissões. Sem mensalidades.</p>

        <div className="nx-hero-import-box">
          <div className="nx-hero-import-text">
            <strong>Tem um anúncio noutra plataforma?</strong>
            <span>Envie-nos o link. Nós tratamos da publicação.</span>
          </div>
          <button type="button" onClick={onOpenSendListing} className="nx-btn-ghost-light">
            <Link2 size={15} />
            Enviar anúncio
          </button>
        </div>
      </div>
    </section>
  );
}