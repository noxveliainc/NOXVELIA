import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Home as HomeIcon, ArrowRight } from 'lucide-react';
import trackEvent from './TrackEvent';

export default function MarketplaceChoice({ publicarTo, publicarState }) {
  return (
    <section className="nx-section nx-bg-white" data-reveal>
      <div className="nx-shell">
        <div className="nx-section-header nx-center">
          <div>
            <span className="nx-kicker">O QUE PROCURA</span>
            <h2>Encontre o que procura</h2>
            <p className="nx-section-sub">Pesquise entre automóveis e imóveis publicados na NOXVELIA.</p>
          </div>
        </div>

        <div className="nx-choice-grid">
          <div className="nx-choice-card">
            <Car size={30} className="nx-gold-icon" />
            <h3>NOXVELIA Drive</h3>
            <span className="nx-choice-tag">Automóveis</span>
            <p>Carros novos e usados em Portugal.</p>
            <div className="nx-choice-actions">
              <Link to="/carros" className="nx-btn-outline" onClick={() => trackEvent('click_explore_cars')}>
                Ver automóveis
              </Link>
              <Link to={publicarTo} state={publicarState} className="nx-btn-text">
                Publicar automóvel <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="nx-choice-card">
            <HomeIcon size={30} className="nx-gold-icon" />
            <h3>NOXVELIA Estate</h3>
            <span className="nx-choice-tag">Imóveis</span>
            <p>Casas e propriedades para comprar e vender.</p>
            <div className="nx-choice-actions">
              <Link to="/imoveis" className="nx-btn-outline" onClick={() => trackEvent('click_explore_properties')}>
                Ver imóveis
              </Link>
              <Link to={publicarTo} state={publicarState} className="nx-btn-text">
                Publicar imóvel <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}