import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import NavbarLanding from './NavbarLanding';
import api from '../../services/api';
import { homePageJsonLd, siteIdentityJsonLd } from '../../utils/seo';
import { useAuth } from '../../context/AuthContext';
import { publishIntentState } from '../../utils/navigationState';

import Hero from './components/Hero';
import MarketplaceChoice from './components/MarketplaceChoice';
import SellerImportCTA from './components/SellerImportCTA.jsx';
import ListingsPreview from './components/ListingsPreview.jsx';
import Benefits from './components/Benefits';
import PrivateSellerSection from './components/PrivateSellerSection';
import DealerSection from './components/DealerSection';
import HowItWorks from './components/HowItWorks';
import SearchSection from './components/SearchSection';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import SendListingModal from './components/SendListingModal';
import trackEvent from './components/TrackEvent.jsx';

import './Landing.css';

export default function Landing() {
  const location = useLocation();
  const { signed } = useAuth();

  const publicarTo = signed ? '/publicar' : '/login';
  const publicarState = signed ? undefined : publishIntentState(location, '/');

  const [exemplos, setExemplos] = useState({ carro: [], imovel: [] });
  const [loadingStock, setLoadingStock] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTipo, setModalTipo] = useState('carro');

  useEffect(() => {
    trackEvent('landing_view');
  }, []);

  // Stock real vindo da API existente. Nunca inventa anúncios: se a lista
  // vier vazia, a ListingsPreview mostra o estado "Estamos a começar.".
  useEffect(() => {
    let ativo = true;
    setLoadingStock(true);

    api.get('/anuncios?limit=12')
      .then(({ data }) => {
        if (!ativo) return;
        const lista = Array.isArray(data) ? data : (data.anuncios || []);
        setExemplos({
          carro: lista.filter((a) => a.tipo === 'carro').slice(0, 8),
          imovel: lista.filter((a) => a.tipo === 'imovel').slice(0, 8)
        });
      })
      .catch(() => {
        if (ativo) setExemplos({ carro: [], imovel: [] });
      })
      .finally(() => {
        if (ativo) setLoadingStock(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  // Substitui o AOS por um IntersectionObserver leve — sem dependência extra
  // a carregar no bundle, conforme a diretiva de performance do pedido.
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;

    const elementos = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loadingStock]);

  const openSendListing = (tipo = 'carro') => {
    trackEvent('click_send_listing');
    setModalTipo(tipo);
    setModalOpen(true);
  };

  return (
    <div className="nx-landing-root">
      <Seo
        title="Noxvelia | Comprar e vender automóveis e imóveis em Portugal"
        description="Compre e venda automóveis e imóveis em Portugal. Publique gratuitamente na Noxvelia, sem comissões."
        path="/"
        jsonLd={[siteIdentityJsonLd, homePageJsonLd]}
      />

      <NavbarLanding />

      <main>
        <Hero publicarTo={publicarTo} publicarState={publicarState} onOpenSendListing={() => openSendListing('carro')} />

        <MarketplaceChoice publicarTo={publicarTo} publicarState={publicarState} />

        <SellerImportCTA
          publicarTo={publicarTo}
          publicarState={publicarState}
          onOpenSendListing={() => openSendListing('carro')}
        />

        <ListingsPreview
          carros={exemplos.carro}
          imoveis={exemplos.imovel}
          loading={loadingStock}
          publicarTo={publicarTo}
          publicarState={publicarState}
        />

        <Benefits />

        <PrivateSellerSection
          publicarTo={publicarTo}
          publicarState={publicarState}
          onOpenSendListing={() => openSendListing('carro')}
        />

        <DealerSection onOpenContact={() => openSendListing('carro')} />

        <HowItWorks />

        <SearchSection />

        <FAQ />

        <FinalCTA publicarTo={publicarTo} publicarState={publicarState} />
      </main>

      <Footer />

      <SendListingModal open={modalOpen} onClose={() => setModalOpen(false)} defaultTipo={modalTipo} />

      {/* CTA sticky mobile — compacto, não bloqueia conteúdo */}
      <Link
        to={publicarTo}
        state={publicarState}
        className="nx-mobile-sticky-cta"
        onClick={() => trackEvent('click_publish')}
      >
        Publicar grátis
      </Link>
    </div>
  );
}