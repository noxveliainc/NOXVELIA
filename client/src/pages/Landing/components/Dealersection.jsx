import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import trackEvent from './trackEvent';

const BENEFICIOS = [
  'Sem mensalidades',
  'Sem comissões',
  'Publicação gratuita',
  'Mais um canal de exposição',
  'Possibilidade de divulgação nas redes sociais quando aplicável'
];

/**
 * onOpenContact reutiliza o mesmo modal de "enviar anúncio" para o botão
 * "Falar com a NOXVELIA", em vez de apontar para uma rota /contacto cuja
 * existência não foi confirmada — evita links partidos. Trocar por um link
 * real assim que existir uma página/rota de contacto dedicada.
 */
export default function DealerSection({ onOpenContact }) {
  return (
    <section className="nx-section nx-bg-navy" data-reveal>
      <div className="nx-shell nx-split nx-split-invert">
        <div>
          <span className="nx-kicker">STANDS E PROFISSIONAIS</span>
          <h2>Tem um stand?</h2>
          <p className="nx-section-sub">
            Coloque os seus veículos na NOXVELIA sem alterar a sua operação atual.
          </p>
          <p>
            Continue a utilizar as plataformas onde já anuncia. A NOXVELIA pode ser mais um
            canal para apresentar o seu stock.
          </p>

          <ul className="nx-bullet-list nx-bullet-list-light">
            {BENEFICIOS.map((item) => (
              <li key={item}>
                <Check size={16} className="nx-gold-icon" /> {item}
              </li>
            ))}
          </ul>

          <div className="nx-import-actions">
            <Link
              to="/stands"
              className="nx-btn-primary"
              onClick={() => trackEvent('click_dealer')}
            >
              Quero colocar os meus carros
            </Link>
            <button type="button" className="nx-btn-outline-light" onClick={onOpenContact}>
              Falar com a NOXVELIA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}