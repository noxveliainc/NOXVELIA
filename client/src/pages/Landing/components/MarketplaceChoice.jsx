import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Home, ArrowRight } from 'lucide-react';
import trackEvent from './TrackEvent';

export default function MarketplaceChoice({ publicarTo, publicarState }) {
  return (
    <section className="nx-marketplace-choice" data-reveal style={{ padding: '60px 20px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#071326', marginBottom: '16px' }}>
          O que procura hoje?
        </h2>
        <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '40px' }}>
          Escolha o mercado para começar a explorar ou vender.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Card Automóveis */}
          <Link 
            to="/carros" 
            onClick={() => trackEvent('click_choice_carros')}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f8fafc', padding: '40px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'transform 0.2s' }}
          >
            <div style={{ background: '#e0e7ff', padding: '16px', borderRadius: '50%', marginBottom: '20px' }}>
              <Car size={40} color="#2563eb" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Automóveis</h3>
            <p style={{ color: '#475569', marginBottom: '20px' }}>Compre, venda ou anuncie o seu carro de forma simples e rápida.</p>
            <span style={{ color: '#2563eb', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Explorar carros <ArrowRight size={16} />
            </span>
          </Link>

          {/* Card Imóveis */}
          <Link 
            to="/imoveis" 
            onClick={() => trackEvent('click_choice_imoveis')}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f8fafc', padding: '40px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'transform 0.2s' }}
          >
            <div style={{ background: '#e0e7ff', padding: '16px', borderRadius: '50%', marginBottom: '20px' }}>
              <Home size={40} color="#2563eb" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Imóveis</h3>
            <p style={{ color: '#475569', marginBottom: '20px' }}>Encontre a casa dos seus sonhos ou rentabilize a sua propriedade.</p>
            <span style={{ color: '#2563eb', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Explorar imóveis <ArrowRight size={16} />
            </span>
          </Link>

        </div>
      </div>
    </section>
  );
}