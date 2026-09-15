import React from 'react';
import { Link } from 'react-router-dom';
import { Link2 } from 'lucide-react';
import trackEvent from './trackEvent';

export default function SellerImportCTA({ publicarTo, publicarState, onOpenSendListing }) {
  return (
    <section className="nx-section nx-bg-navy" data-reveal>
      <div className="nx-shell">
        <div className="nx-import-grid">
          <div className="nx-import-text">
            <span className="nx-kicker">PARA QUEM JÁ ANUNCIA</span>
            <h2>Já tens o teu anúncio noutra plataforma?</h2>
            <p className="nx-import-lead">Não precisas de criar tudo novamente.</p>
            <p>
              Envia-nos o link do teu anúncio e tratamos da publicação na NOXVELIA.
              A nossa equipa trata da publicação.
            </p>

            <div className="nx-import-actions">
              <button type="button" className="nx-btn-primary" onClick={onOpenSendListing}>
                <Link2 size={16} />
                Enviar link do anúncio
              </button>
              <Link
                to={publicarTo}
                state={publicarState}
                className="nx-btn-outline-light"
                onClick={() => trackEvent('click_publish')}
              >
                Publicar manualmente
              </Link>
            </div>
          </div>

          <ol className="nx-import-steps">
            <li><span>01</span><p>Envia o link</p></li>
            <li><span>02</span><p>Nós tratamos da publicação</p></li>
            <li><span>03</span><p>O anúncio fica disponível na NOXVELIA</p></li>
          </ol>
        </div>
      </div>
    </section>
  );
}