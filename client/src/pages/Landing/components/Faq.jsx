import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import trackEvent from './trackEvent';

const FAQS = [
  { q: 'Publicar um anúncio é gratuito?', a: 'Sim. A publicação de anúncios na NOXVELIA é gratuita.' },
  { q: 'A NOXVELIA cobra comissão?', a: 'Não cobramos comissão sobre a venda.' },
  {
    q: 'Posso manter o meu anúncio noutras plataformas?',
    a: 'Sim. A NOXVELIA pode ser utilizada como mais um canal para divulgar o seu anúncio.'
  },
  {
    q: 'Já tenho o meu carro anunciado. Preciso de criar tudo novamente?',
    a: 'Não necessariamente. Pode enviar-nos o link do anúncio e, na fase inicial, tratamos da publicação.'
  },
  { q: 'Posso publicar como particular?', a: 'Sim.' },
  { q: 'Stands podem publicar?', a: 'Sim. A NOXVELIA foi criada para particulares e profissionais.' },
  { q: 'Como entro em contacto com um vendedor?', a: 'Utilize os contactos disponibilizados no anúncio.' }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    const isOpen = openIndex === index;
    setOpenIndex(isOpen ? null : index);
    if (!isOpen) trackEvent('faq_open', { question: FAQS[index].q });
  };

  return (
    <section className="nx-section nx-bg-light" data-reveal>
      <div className="nx-shell nx-shell-narrow">
        <div className="nx-section-header nx-center">
          <div>
            <span className="nx-kicker">DÚVIDAS FREQUENTES</span>
            <h2>Perguntas frequentes</h2>
          </div>
        </div>

        <div className="nx-faq-list">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="nx-faq-item" key={item.q}>
                <button
                  type="button"
                  className="nx-faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`nx-faq-panel-${index}`}
                  id={`nx-faq-trigger-${index}`}
                  onClick={() => toggle(index)}
                >
                  {item.q}
                  <ChevronDown size={18} className={`nx-faq-chevron ${isOpen ? 'is-open' : ''}`} />
                </button>
                <div
                  id={`nx-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`nx-faq-trigger-${index}`}
                  className={`nx-faq-answer ${isOpen ? 'is-open' : ''}`}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}