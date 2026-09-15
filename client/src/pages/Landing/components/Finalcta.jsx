import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import trackEvent from './trackEvent';

export default function FinalCTA({ publicarTo, publicarState }) {
  return (
    <section className="nx-cta-final" data-reveal>
      <div className="nx-shell nx-cta-inner">
        <div className="nx-cta-text">
          <h2>Tem algo para vender?</h2>
          <p>Publique gratuitamente na NOXVELIA.</p>
          <p className="nx-cta-microcopy">Automóveis e imóveis em Portugal.</p>
        </div>
        <div className="nx-cta-actions">
          <Link
            className="nx-btn-cta-final"
            to={publicarTo}
            state={publicarState}
            onClick={() => trackEvent('click_publish')}
          >
            Publicar gratuitamente <ArrowRight size={16} />
          </Link>
          <Link
            className="nx-btn-outline-light"
            to="/carros"
            onClick={() => trackEvent('click_explore_cars')}
          >
            Explorar anúncios
          </Link>
        </div>
      </div>
    </section>
  );
}