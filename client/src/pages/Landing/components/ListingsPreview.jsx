import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Home as HomeIcon, Star, ArrowRight } from 'lucide-react';
import { getImageUrl } from '../../../utils/images';
import { anuncioPath } from '../../../utils/seo';

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(valor || 0);

function AnuncioCard({ anuncio }) {
  const isCarro = anuncio.tipo === 'carro';
  const foto = getImageUrl(anuncio.fotos?.[0] || anuncio.imagens?.[0], 'medium');

  const detalhe = isCarro
    ? [
        anuncio.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null,
        anuncio.carro?.ano ? `${anuncio.carro.ano}` : null
      ].filter(Boolean).join(' · ')
    : [
        anuncio.imovel?.tipologia || anuncio.imovel?.tipoImovel,
        anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null
      ].filter(Boolean).join(' · ');

  const local = anuncio.location?.cidade || anuncio.localizacao?.cidade || 'Portugal';

  return (
    <Link
      to={anuncioPath(anuncio)}
      className={`nx-card-oportunidade ${anuncio.destacado ? 'is-premium' : ''}`}
      aria-label={`Abrir anúncio: ${anuncio.titulo}`}
    >
      <div className="nx-card-img-wrap">
        {foto ? (
          <img src={foto} alt={anuncio.titulo} loading="lazy" />
        ) : (
          <div className="nx-card-no-photo">{isCarro ? <Car size={30} /> : <HomeIcon size={30} />}</div>
        )}
        {anuncio.destacado && (
          <span className="nx-card-badge">
            <Star size={10} />
            DESTAQUE
          </span>
        )}
      </div>
      <div className="nx-card-content">
        <span className="nx-card-type">{isCarro ? 'AUTOMÓVEL' : 'IMÓVEL'}</span>
        <h3 className="nx-card-title">{anuncio.titulo}</h3>
        <span className="nx-card-meta">{detalhe || 'Detalhes disponíveis'}</span>
        <div className="nx-card-footer">
          <span className="nx-card-price">{formatarMoeda(anuncio.preco)}</span>
          <span className="nx-card-loc">{local}</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Secção "Stock Real". Recebe os anúncios já filtrados por tipo (buscados em
 * Landing.jsx via /anuncios). Nunca inventa anúncios — se não houver nenhum
 * em nenhuma categoria, mostra o estado inicial "Estamos a começar.".
 */
export default function ListingsPreview({ carros, imoveis, loading, publicarTo, publicarState }) {
  const [tab, setTab] = useState('carro');
  const lista = tab === 'carro' ? carros : imoveis;
  const semNenhum = !loading && carros.length === 0 && imoveis.length === 0;

  return (
    <section id="anuncios-recentes" className="nx-section nx-bg-light" data-reveal>
      <div className="nx-shell">
        <div className="nx-section-header">
          <div>
            <span className="nx-kicker">STOCK REAL</span>
            <h2>Anúncios recentes</h2>
            <p className="nx-section-sub">Veja o que está atualmente publicado na NOXVELIA.</p>
          </div>
          {!semNenhum && !loading && (
            <div className="nx-tabs-inline" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'carro'}
                className={tab === 'carro' ? 'active' : ''}
                onClick={() => setTab('carro')}
              >
                Automóveis
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'imovel'}
                className={tab === 'imovel' ? 'active' : ''}
                onClick={() => setTab('imovel')}
              >
                Imóveis
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="nx-oportunidades-grid" aria-label="A carregar anúncios" aria-busy="true">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="nx-skeleton" style={{ minHeight: 340, borderRadius: 14 }} />
            ))}
          </div>
        ) : semNenhum ? (
          <div className="nx-empty-start">
            <h3>Estamos a começar.</h3>
            <p>Os primeiros anúncios da NOXVELIA estão a chegar.</p>
            <Link to={publicarTo} state={publicarState} className="nx-btn-primary">
              Publicar o primeiro anúncio
            </Link>
          </div>
        ) : lista.length > 0 ? (
          <>
            <div className="nx-oportunidades-grid">
              {lista.map((anuncio) => (
                <AnuncioCard key={anuncio._id} anuncio={anuncio} />
              ))}
            </div>
            <div className="nx-section-footer-cta">
              <Link to={tab === 'carro' ? '/carros' : '/imoveis'} className="nx-link-gold">
                Ver todos os anúncios <ArrowRight size={15} />
              </Link>
            </div>
          </>
        ) : (
          <div className="nx-empty-card">
            {tab === 'carro' ? <Car size={30} /> : <HomeIcon size={30} />}
            <span>Ainda não existem anúncios de {tab === 'carro' ? 'automóveis' : 'imóveis'}.</span>
          </div>
        )}
      </div>
    </section>
  );
}