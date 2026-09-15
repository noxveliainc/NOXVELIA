import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import trackEvent from './TrackEvent';

const BULLETS = [
  'Publicação gratuita',
  'Sem comissões',
  'Adiciona fotografias',
  'Define o teu preço',
  'Contacto direto com interessados'
];

export default function PrivateSellerSection({ publicarTo, publicarState, onOpenSendListing }) {
  return (
    <section className="nx-section nx-bg-white" data-reveal>
      <div className="nx-shell nx-split">
        <div>
          <span className="nx-kicker">VENDE COMO PARTICULAR?</span>
          <h2>O teu carro. O teu anúncio. Sem complicações.</h2>
          <p className="nx-section-sub">
            Publica gratuitamente na NOXVELIA e mantém o controlo do teu negócio.
          </p>

          <ul className="nx-bullet-list">
            {BULLETS.map((item) => (
              <li key={item}>
                <Check size={16} className="nx-gold-icon" /> {item}
              </li>
            ))}
          </ul>

          <div className="nx-import-actions">
            <Link
              to={publicarTo}
              state={publicarState}
              className="nx-btn-primary"
              onClick={() => trackEvent('click_publish')}
            >
              Publicar gratuitamente
            </Link>
            <button type="button" className="nx-btn-text" onClick={onOpenSendListing}>
              Já tens anúncio? Envia-nos o link.
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}