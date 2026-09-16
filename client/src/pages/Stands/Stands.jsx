import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import NavbarLanding from '../NavbarLanding';
import Footer from '../../../components/Footer';
import Seo from '../../../components/Seo';
// Reutiliza os tokens de design e classes utilitárias já definidos na Landing.
import '../Landing/Landing.css';

const BENEFICIOS = [
  'Sem mensalidades',
  'Sem comissões',
  'Publicação gratuita',
  'Mais um canal de exposição',
  'Possibilidade de divulgação nas redes sociais quando aplicável'
];

/**
 * Estrutura preparada para a rota /stands, referenciada a partir da secção
 * "Tem um stand?" da homepage. Ainda não foi adicionada ao router — ver
 * resumo final. O CTA aponta para /login como ponto de entrada genérico;
 * ajustar quando existir um fluxo de publicação dedicado a stands.
 */
export default function Stands() {
  return (
    <div className="nx-landing-root">
      <Seo
        title="Noxvelia para Stands | Publique o seu stock gratuitamente"
        description="Coloque o stock do seu stand na Noxvelia sem mensalidades e sem comissões."
        path="/stands"
      />
      <NavbarLanding />
      <main>
        <section className="nx-section nx-bg-navy" data-reveal>
          <div className="nx-shell nx-split nx-split-invert">
            <div>
              <span className="nx-kicker">STANDS E PROFISSIONAIS</span>
              <h1>Tem um stand?</h1>
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

              <Link to="/login" className="nx-btn-primary">Quero colocar os meus carros</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}