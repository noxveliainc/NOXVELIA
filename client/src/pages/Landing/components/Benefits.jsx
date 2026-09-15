import React from 'react';
import { Tag, Wallet, MessageCircle, LayoutGrid } from 'lucide-react';

const ITEMS = [
  { icon: Tag, title: 'Publicação gratuita', text: 'Publique os seus anúncios sem mensalidades.' },
  { icon: Wallet, title: 'Sem comissões', text: 'Não cobramos uma percentagem pela venda.' },
  { icon: MessageCircle, title: 'Contacto direto', text: 'Negocie diretamente com o anunciante.' },
  {
    icon: LayoutGrid,
    title: 'Automóveis e imóveis',
    text: 'Encontre duas das principais categorias de compra e venda numa só plataforma.'
  }
];

export default function Benefits() {
  return (
    <section className="nx-trust-banner" data-reveal>
      <div className="nx-shell">
        <div className="nx-trust-header">
          <span className="nx-kicker">PORQUÊ NOXVELIA</span>
          <h2>Uma plataforma simples para comprar e vender.</h2>
        </div>
        <div className="nx-trust-grid">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div className="nx-trust-card" key={title}>
              <Icon size={26} className="nx-gold-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}