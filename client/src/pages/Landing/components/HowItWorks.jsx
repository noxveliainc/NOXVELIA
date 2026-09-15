import React from 'react';

export default function HowItWorks() {
  return (
    <section className="nx-section nx-bg-light" data-reveal>
      <div className="nx-shell">
        <div className="nx-section-header nx-center">
          <div>
            <span className="nx-kicker">SIMPLES E DIRETO</span>
            <h2>Como funciona?</h2>
          </div>
        </div>

        <div className="nx-how-grid">
          <div className="nx-how-col">
            <h3>Comprar</h3>
            <ol className="nx-how-steps">
              <li><span>01</span>Pesquisa</li>
              <li><span>02</span>Encontra</li>
              <li><span>03</span>Contacta</li>
            </ol>
          </div>
          <div className="nx-how-col">
            <h3>Vender</h3>
            <ol className="nx-how-steps">
              <li><span>01</span>Publica</li>
              <li><span>02</span>Recebe interessados</li>
              <li><span>03</span>Negocia diretamente</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}