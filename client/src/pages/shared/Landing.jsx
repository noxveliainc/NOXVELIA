import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Car,
  Home as HomeIcon,
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import NavbarLanding from './NavbarLanding';
import api from '../../services/api';
import { getImageUrl } from '../../utils/images';
import { anuncioPath, homePageJsonLd, siteIdentityJsonLd } from '../../utils/seo';
import { useAuth } from '../../context/AuthContext';
import { publishIntentState } from '../../utils/navigationState';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS, DISTRITOS_CIDADES_PT } from '../../data/localizacoes';
import './Landing.css';

const CARVERTICAL_URL = 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';
const HERO_IMG = 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop';

const FALLBACK_NEWS_IMAGES = [
  'https://images.unsplash.com/photo-1585393948915-0fcb07fb31b1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop'
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(valor || 0);

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signed } = useAuth();

  const publicarTo = signed ? '/publicar' : '/login';
  const publicarState = signed ? undefined : publishIntentState(location, '/');

  const [exemplos, setExemplos] = useState({ carro: [], imovel: [] });
  const [noticiasMercado, setNoticiasMercado] = useState([]);
  const [loadingStock, setLoadingStock] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  const [searchTab, setSearchTab] = useState('carro');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [distrito, setDistrito] = useState('');
  const [cidade, setCidade] = useState('');

  const modelosDisponiveis = marca
    ? getModelosPorMarca(marca).map((m) => (typeof m === 'object' ? m.modelo || m.nome : m))
    : [];

  const cidadesDisponiveis = distrito ? DISTRITOS_CIDADES_PT[distrito] || [] : [];

  useEffect(() => {
    let ativo = true;

    Promise.all([import('aos'), import('aos/dist/aos.css')])
      .then(([modulo]) => {
        if (!ativo) return;
        const aos = modulo.default;
        aos.init({
          duration: 600,
          easing: 'ease-out-cubic',
          once: true,
          offset: 40,
          disable: prefersReducedMotion
        });
      })
      .catch(() => {});

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    let ativo = true;

    setLoadingStock(true);
    setLoadingNews(true);

    api
      .get('/market-news?limit=5')
      .then(({ data }) => {
        if (!ativo) return;
        setNoticiasMercado(Array.isArray(data?.items) ? data.items : []);
      })
      .catch(() => {
        if (ativo) setNoticiasMercado([]);
      })
      .finally(() => {
        if (ativo) setLoadingNews(false);
      });

    api
      .get('/anuncios/em-alta/semana')
      .then(({ data }) => {
        if (!ativo) return;
        setExemplos({
          carro: (data?.carro || []).slice(0, 5),
          imovel: (data?.imovel || []).slice(0, 5)
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

  const abrirExemplo = (anuncio, origem) => {
    try {
      localStorage.setItem(
        '@App:contexto_visual',
        origem === '/carros' ? 'carro' : 'imovel'
      );
    } catch {
      // Ignore storage restrictions.
    }

    navigate(anuncioPath(anuncio));
  };

  const handleCardKeyDown = (event, anuncio, origem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      abrirExemplo(anuncio, origem);
    }
  };

  const handleAdvancedSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (searchTab === 'carro') {
      if (marca) params.set('marca', marca);
      if (modelo) params.set('modelo', modelo);
      navigate(`/carros${params.toString() ? `?${params.toString()}` : ''}`);
      return;
    }

    if (distrito && distrito !== 'Todos') params.set('distrito', distrito);
    if (cidade) params.set('cidade', cidade);
    navigate(`/imoveis${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const renderAnuncioMontra = (anuncio, origem, isFeatured = false) => {
    const isCarro = anuncio.tipo === 'carro';
    const foto = getImageUrl(
      anuncio.fotos?.[0] || anuncio.imagens?.[0],
      isFeatured ? 'large' : 'medium'
    );

    const detalhe = isCarro
      ? [
          anuncio.carro?.km != null
            ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km`
            : null,
          anuncio.carro?.combustivel
        ]
          .filter(Boolean)
          .join(' · ')
      : [
          anuncio.imovel?.tipologia || anuncio.imovel?.tipoImovel,
          anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null
        ]
          .filter(Boolean)
          .join(' · ');

    const local =
      anuncio.location?.cidade ||
      anuncio.localizacao?.cidade ||
      'Portugal';

    return (
      <article
        key={anuncio._id}
        className={`nx-bento-card ${isFeatured ? 'nx-bento-featured' : ''}`}
        onClick={() => abrirExemplo(anuncio, origem)}
        onKeyDown={(event) => handleCardKeyDown(event, anuncio, origem)}
        role="button"
        tabIndex={0}
        aria-label={`Abrir anúncio: ${anuncio.titulo}`}
      >
        <div className="nx-bento-img">
          {foto ? (
            <img
              src={foto}
              alt={anuncio.titulo}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="nx-bento-no-photo">
              {isCarro ? <Car size={34} /> : <HomeIcon size={34} />}
            </div>
          )}
          <span className="nx-bento-tag">
            {isCarro ? 'Automóvel' : 'Imóvel'}
          </span>
        </div>

        <div className="nx-bento-body">
          <span className="nx-bento-price">{formatarMoeda(anuncio.preco)}</span>
          <span className="nx-bento-title">{anuncio.titulo}</span>
          <span className="nx-bento-meta">
            {detalhe || (isCarro ? 'Dados técnicos' : 'Detalhes do imóvel')} · {local}
          </span>
        </div>
      </article>
    );
  };

  const renderSkeletons = () => (
    <div className="nx-bento-layout" aria-label="A carregar anúncios" aria-busy="true">
      <div
        className="nx-skeleton nx-bento-featured"
        style={{ minHeight: '390px' }}
      />
      <div className="nx-bento-grid">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="nx-skeleton"
            style={{ minHeight: '220px' }}
          />
        ))}
      </div>
    </div>
  );

  const renderEmpty = (type) => (
    <div className="nx-empty-card">
      {type === 'carro' ? <Car size={30} /> : <HomeIcon size={30} />}
      <span>
        {type === 'carro'
          ? 'Ainda não há automóveis em destaque.'
          : 'Ainda não há imóveis em destaque.'}
      </span>
      <small>Consulte todo o stock para ver os anúncios disponíveis.</small>
    </div>
  );

  const destaque = noticiasMercado[0];

  return (
    <div className="nx-landing-root">
      <Seo
        title="Noxvelia | Automóveis e Imóveis em Portugal"
        description="Pesquisa e publica anúncios de carros e casas em Portugal. Contacto direto via WhatsApp sem intermediários e sem comissões."
        path="/"
        jsonLd={[siteIdentityJsonLd, homePageJsonLd]}
      />

      <NavbarLanding />

      <main>
        <section className="nx-hero">
          <div className="nx-hero-bg" aria-hidden="true">
            <img src={HERO_IMG} alt="" />
            <div className="nx-hero-overlay" />
          </div>

          <div className="nx-hero-content">
            <div className="nx-hero-text">
              <h1>Acesso direto ao<br />mercado premium.</h1>
              <p>
                Encontre a sua próxima viatura ou imóvel, compare opções e
                fale diretamente com quem vende.
              </p>
            </div>
          </div>

          <div className="nx-search-floater">
            <div className="nx-search-tabs" role="tablist" aria-label="Escolher mercado">
              <button
                type="button"
                role="tab"
                aria-selected={searchTab === 'carro'}
                className={searchTab === 'carro' ? 'active' : ''}
                onClick={() => {
                  setSearchTab('carro');
                  setDistrito('');
                  setCidade('');
                }}
              >
                <Car size={16} strokeWidth={2.5} />
                Noxvelia Drive
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={searchTab === 'imovel'}
                className={searchTab === 'imovel' ? 'active' : ''}
                onClick={() => {
                  setSearchTab('imovel');
                  setMarca('');
                  setModelo('');
                }}
              >
                <HomeIcon size={16} strokeWidth={2.5} />
                Noxvelia Estate
              </button>
            </div>

            <form onSubmit={handleAdvancedSearch} className="nx-search-grid">
              {searchTab === 'carro' ? (
                <>
                  <div className="nx-input-group">
                    <label htmlFor="nx-marca">Marca</label>
                    <select
                      id="nx-marca"
                      value={marca}
                      onChange={(event) => {
                        setMarca(event.target.value);
                        setModelo('');
                      }}
                    >
                      <option value="">Todas as marcas</option>
                      {MARCAS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="nx-input-group">
                    <label htmlFor="nx-modelo">Modelo</label>
                    <select
                      id="nx-modelo"
                      value={modelo}
                      onChange={(event) => setModelo(event.target.value)}
                      disabled={!marca}
                    >
                      <option value="">
                        {marca ? 'Todos os modelos' : 'Selecione uma marca'}
                      </option>
                      {modelosDisponiveis.map((item, index) => (
                        <option key={`${item}-${index}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="nx-input-group">
                    <label htmlFor="nx-distrito">Distrito</label>
                    <select
                      id="nx-distrito"
                      value={distrito}
                      onChange={(event) => {
                        setDistrito(event.target.value);
                        setCidade('');
                      }}
                    >
                      <option value="">Todos os distritos</option>
                      {DISTRITOS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="nx-input-group">
                    <label htmlFor="nx-cidade">Concelho / Cidade</label>
                    <select
                      id="nx-cidade"
                      value={cidade}
                      onChange={(event) => setCidade(event.target.value)}
                      disabled={!distrito}
                    >
                      <option value="">
                        {distrito ? 'Todos os concelhos' : 'Selecione um distrito'}
                      </option>
                      {cidadesDisponiveis.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <button type="submit" className="nx-btn-search" aria-label="Pesquisar">
                <Search size={19} />
                <span className="nx-btn-search-text">Procurar</span>
              </button>
            </form>
          </div>
        </section>

        <section className="nx-section nx-bg-light" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <div>
                <span className="nx-kicker">Noxvelia Drive</span>
                <h2>Stock Automóvel</h2>
              </div>
              <Link className="nx-link-gold" to="/carros">
                Ver todo o stock <ArrowRight size={15} />
              </Link>
            </div>

            {loadingStock
              ? renderSkeletons()
              : exemplos.carro.length > 0
                ? (
                  <div className="nx-bento-layout">
                    {renderAnuncioMontra(exemplos.carro[0], '/carros', true)}
                    <div className="nx-bento-grid">
                      {exemplos.carro
                        .slice(1, 5)
                        .map((anuncio) => renderAnuncioMontra(anuncio, '/carros'))}
                    </div>
                  </div>
                )
                : renderEmpty('carro')}
          </div>
        </section>

        <section className="nx-section nx-bg-white" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <div>
                <span className="nx-kicker">Noxvelia Estate</span>
                <h2>Imóveis Exclusivos</h2>
              </div>
              <Link className="nx-link-gold" to="/imoveis">
                Ver todos os imóveis <ArrowRight size={15} />
              </Link>
            </div>

            {loadingStock
              ? renderSkeletons()
              : exemplos.imovel.length > 0
                ? (
                  <div className="nx-bento-layout nx-bento-reverse">
                    <div className="nx-bento-grid">
                      {exemplos.imovel
                        .slice(1, 5)
                        .map((anuncio) => renderAnuncioMontra(anuncio, '/imoveis'))}
                    </div>
                    {renderAnuncioMontra(exemplos.imovel[0], '/imoveis', true)}
                  </div>
                )
                : renderEmpty('imovel')}
          </div>
        </section>

        <section className="nx-cv-section" data-aos="fade-up">
          <div className="nx-shell nx-cv-box">
            <div className="nx-cv-info">
              <span className="nx-cv-kicker">
                <ShieldCheck size={16} strokeWidth={2.5} />
                Segurança Automóvel
              </span>
              <h2>Compre com contexto, não com dúvidas.</h2>
              <p>
                Consulte histórico de acidentes, quilometragem, manutenções e
                outros indicadores antes de avançar para a compra.
              </p>
              <a
                href={CARVERTICAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-cv-btn"
              >
                Consultar histórico oficial <ArrowRight size={16} />
              </a>
            </div>

            <div className="nx-cv-discount">
              <img src="/carvertical-logo.png" alt="carVertical" />
              <strong>20%</strong>
              <span>
                Desconto automático aplicado no relatório final via Noxvelia.
              </span>
            </div>
          </div>
        </section>

        <section className="nx-section nx-bg-white" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <div>
                <span className="nx-kicker">Jornal Digital</span>
                <h2>Atualidade do Mercado</h2>
              </div>
            </div>

            {loadingNews ? (
              <div className="nx-magazine" aria-label="A carregar notícias" aria-busy="true">
                <div
                  className="nx-skeleton nx-mag-hero"
                  style={{ minHeight: '300px' }}
                />
                <div className="nx-mag-sidebar">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="nx-skeleton"
                      style={{ height: '90px', minHeight: '90px', marginBottom: '20px' }}
                    />
                  ))}
                </div>
              </div>
            ) : noticiasMercado.length > 0 ? (
              <div className="nx-magazine">
                <a
                  href={destaque?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-mag-hero"
                >
                  <div className="nx-mag-hero-img">
                    <img
                      src={destaque?.image || FALLBACK_NEWS_IMAGES[0]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>
                  <div className="nx-mag-hero-content">
                    <span className="nx-mag-pill">Destaque</span>
                    <h3>{destaque?.title}</h3>
                    <p>{destaque?.summary}</p>
                    <span className="nx-mag-readmore">
                      Ler artigo completo <ChevronRight size={14} />
                    </span>
                  </div>
                </a>

                <div className="nx-mag-sidebar">
                  {noticiasMercado.slice(1, 5).map((noticia, index) => (
                    <a
                      href={noticia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nx-mag-item"
                      key={noticia.id || noticia.url}
                    >
                      <div className="nx-mag-item-img">
                        <img
                          src={
                            noticia.image ||
                            FALLBACK_NEWS_IMAGES[index + 1] ||
                            FALLBACK_NEWS_IMAGES[0]
                          }
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="nx-mag-item-text">
                        <span className="nx-mag-pill-small">Mercado</span>
                        <h4>{noticia.title}</h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="nx-empty-card" style={{ minHeight: '190px' }}>
                O nosso feed de mercado está a ser atualizado.
              </div>
            )}
          </div>
        </section>

        <section className="nx-b2b">
          <div className="nx-shell nx-b2b-inner">
            <div className="nx-b2b-text">
              <span className="nx-kicker">Para profissionais</span>
              <h2>Transforme o seu stock em negócio.</h2>
              <p>
                Publique sem comissões e coloque o seu inventário diretamente
                à frente de compradores. Os contactos chegam ao seu WhatsApp,
                sem formulários pelo caminho.
              </p>
              <Link className="nx-btn-b2b" to={publicarTo} state={publicarState}>
                Criar Conta Profissional <ArrowRight size={16} />
              </Link>
            </div>

            <div className="nx-b2b-visual" aria-hidden="true">
              <Building2 size={170} color="rgba(217,196,156,.16)" strokeWidth={1} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}