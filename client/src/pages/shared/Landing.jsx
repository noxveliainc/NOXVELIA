import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Car,
  Home as HomeIcon,
  ShieldCheck,
  Search,
  Eye,
  Wallet,
  Star,
  MessageCircle
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
// Usa o asset real já existente em client/public em vez de hotlink externo ao Unsplash:
// mais rápido (sem pedido a domínio externo), sem dependência de terceiros, e já é o
// visual "coast" pensado para a marca. Ajusta o nome do ficheiro se tiveres outro preferido.
const HERO_IMG = '/noxvelia-hero-coast.webp';
const CARVERTICAL_PREVIEW_IMG = '/carvertical-preview.png';

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
  const [resumoPublico, setResumoPublico] = useState(null);
  const [noticiasMercado, setNoticiasMercado] = useState([]);
  const [loadingStock, setLoadingStock] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [visitasGlobais, setVisitasGlobais] = useState(0);

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

    api.get('/anuncios/resumo-publico')
      .then(({ data }) => { if (ativo) setResumoPublico(data || null); })
      .catch(() => { if (ativo) setResumoPublico(null); });

    api.get('/anuncios/visitas-globais-publicas')
      .then(({ data }) => {
        if (ativo && data?.visitasTotais !== undefined) {
          setVisitasGlobais(Number(data.visitasTotais));
        }
      })
      .catch(() => {});

    api
      .get('/market-news?limit=10')
      .then(({ data }) => {
        if (!ativo) return;
        const items = Array.isArray(data?.items) ? data.items : [];
        setNoticiasMercado(items);
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

  const guardarContextoVisual = (origem) => {
    try {
      localStorage.setItem(
        '@App:contexto_visual',
        origem === '/carros' ? 'carro' : 'imovel'
      );
    } catch {}
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

    if (distrito) params.set('distrito', distrito);
    if (cidade) params.set('cidade', cidade);
    navigate(`/imoveis${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const renderAnuncioCard = (anuncio, origem) => {
    const isCarro = anuncio.tipo === 'carro';
    const foto = getImageUrl(
      anuncio.fotos?.[0] || anuncio.imagens?.[0],
      'medium'
    );

    const detalhe = isCarro
      ? [
          anuncio.carro?.km != null
            ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km`
            : null,
          anuncio.carro?.ano ? `${anuncio.carro.ano}` : null
        ]
          .filter(Boolean)
          .join(' · ')
      : [
          anuncio.imovel?.tipologia || anuncio.imovel?.tipoImovel,
          anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null
        ]
          .filter(Boolean)
          .join(' · ');

    const local = anuncio.location?.cidade || anuncio.localizacao?.cidade || 'Portugal';

    return (
      <Link
        key={anuncio._id}
        to={anuncioPath(anuncio)}
        className="nx-card-oportunidade"
        onClick={() => guardarContextoVisual(origem)}
        aria-label={`Abrir anúncio: ${anuncio.titulo}`}
      >
        <div className="nx-card-img-wrap">
          {foto ? (
            <img src={foto} alt={anuncio.titulo} loading="lazy" width={400} height={300} />
          ) : (
            <div className="nx-card-no-photo">
              {isCarro ? <Car size={30} /> : <HomeIcon size={30} />}
            </div>
          )}
          <span className="nx-card-badge">DESTAQUE</span>
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
  };

  const renderSkeletons = () => (
    <div className="nx-oportunidades-grid" aria-label="A carregar anúncios" aria-busy="true">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="nx-skeleton" style={{ minHeight: '380px', borderRadius: '14px' }} />
      ))}
    </div>
  );

  const numCarros = Number(resumoPublico?.carros ?? exemplos.carro.length);
  const numImoveis = Number(resumoPublico?.imoveis ?? exemplos.imovel.length);
  const numContas = Number(resumoPublico?.usersCount ?? 0);
  const numVisitas = Number(visitasGlobais);

  // Só mostra estatísticas com números que já transmitem confiança;
  // esconder valores muito baixos evita o efeito "plataforma vazia" (ver prompt mestre).
  const statsDisponiveis = [
    { key: 'carros', icon: Car, valor: numCarros, label: 'Automóveis', min: 5 },
    { key: 'imoveis', icon: HomeIcon, valor: numImoveis, label: 'Imóveis', min: 5 },
    { key: 'contas', icon: Users, valor: numContas, label: 'Contas registadas', min: 20 },
    { key: 'visitas', icon: Eye, valor: numVisitas, label: 'Visitas totais', min: 100 }
  ].filter((stat) => stat.valor >= stat.min);

  const listaOportunidades = [...exemplos.carro, ...exemplos.imovel].slice(0, 8);

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
        {/* 1. HERO */}
        <section className="nx-hero">
          <div className="nx-hero-bg" aria-hidden="true">
            <img src={HERO_IMG} alt="" fetchpriority="high" />
            <div className="nx-hero-overlay" />
          </div>

          <div className="nx-hero-content">
            <div className="nx-hero-text">
              <h1>O seu próximo<br />negócio começa aqui.</h1>
              <p>
                Acesso direto ao melhor stock de automóveis e imóveis.<br />
                Sem ruído. Sem intermediários.
              </p>
              <div className="nx-hero-badges">
                <span><ShieldCheck size={15} /> Stock verificado</span>
                <span><ShieldCheck size={15} /> Negócios seguros</span>
                <span><ShieldCheck size={15} /> Profissionais certificados</span>
              </div>
            </div>

            {/* FILTROS */}
            <div className="nx-search-floater">
              <div className="nx-search-tabs" role="tablist">
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
                  Automóveis
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
                  Imóveis
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
                          <option key={item} value={item}>{item}</option>
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
                        <option value="">{marca ? 'Todos os modelos' : 'Selecione marca'}</option>
                        {modelosDisponiveis.map((item, index) => (
                          <option key={`${item}-${index}`} value={item}>{item}</option>
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
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div className="nx-input-group">
                      <label htmlFor="nx-cidade">Cidade</label>
                      <select
                        id="nx-cidade"
                        value={cidade}
                        onChange={(event) => setCidade(event.target.value)}
                        disabled={!distrito}
                      >
                        <option value="">{distrito ? 'Todas as cidades' : 'Selecione distrito'}</option>
                        {cidadesDisponiveis.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <button type="submit" className="nx-btn-search" aria-label="Pesquisar">
                  <Search size={18} />
                  <span>Pesquisar</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 2. BARRA DE ESTATÍSTICAS (só aparece com números que reforçam confiança) */}
        {statsDisponiveis.length >= 2 && (
          <section className="nx-stats-bar">
            <div className="nx-shell nx-stats-grid" style={{ gridTemplateColumns: `repeat(${statsDisponiveis.length}, 1fr)` }}>
              {statsDisponiveis.map(({ key, icon: Icon, valor, label }) => (
                <div className="nx-stat-item" key={key}>
                  <Icon size={26} className="nx-gold-icon" />
                  <div>
                    <strong>{valor.toLocaleString('pt-PT')}</strong>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. STOCK EM DESTAQUE */}
        <section className="nx-section nx-bg-light" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <div>
                <span className="nx-kicker">STOCK EM DESTAQUE</span>
                <h2>As melhores oportunidades</h2>
              </div>
              <div className="nx-header-right">
                <Link className="nx-link-gold" to="/carros">
                  Ver todo o stock <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {loadingStock ? (
              renderSkeletons()
            ) : listaOportunidades.length > 0 ? (
              <div className="nx-oportunidades-grid">
                {listaOportunidades.map((anuncio) =>
                  renderAnuncioCard(anuncio, anuncio.tipo === 'carro' ? '/carros' : '/imoveis')
                )}
              </div>
            ) : (
              <div className="nx-empty-card">
                <Car size={30} />
                <span>De momento não existem anúncios em destaque na plataforma.</span>
              </div>
            )}
          </div>
        </section>

        {/* 4. PORQUÊ NOXVELIA */}
        <section className="nx-trust-banner">
          <div className="nx-shell">
            <div className="nx-trust-header">
              <span className="nx-kicker">PORQUÊ NOXVELIA?</span>
              <h2>A diferença está nos detalhes.</h2>
            </div>
            <div className="nx-trust-grid">
              <div className="nx-trust-card">
                <ShieldCheck size={28} className="nx-gold-icon" />
                <h3>Anúncios verificados</h3>
                <p>Todos os anúncios são analisados para garantir a sua qualidade e autenticidade.</p>
              </div>
              <div className="nx-trust-card">
                <Wallet size={28} className="nx-gold-icon" />
                <h3>Sem comissões</h3>
                <p>Contacto direto por telefone, email ou WhatsApp. Sem intermediários a cobrar pelo negócio.</p>
              </div>
              <div className="nx-trust-card">
                <Star size={28} className="nx-gold-icon" />
                <h3>Avaliações reais</h3>
                <p>Cada vendedor tem uma reputação pública, construída por avaliações de utilizadores autenticados.</p>
              </div>
              <div className="nx-trust-card">
                <MessageCircle size={28} className="nx-gold-icon" />
                <h3>Suporte dedicado</h3>
                <p>A nossa equipa está sempre disponível para o ajudar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. NOTÍCIAS & INSIGHTS */}
        <section className="nx-section nx-bg-white" data-aos="fade-up">
          <div className="nx-shell">
            <div className="nx-section-header">
              <div>
                <span className="nx-kicker">NOTÍCIAS & INSIGHTS</span>
                <h2>Fique a par do mercado</h2>
              </div>
              <Link className="nx-link-gold" to="/noticias">
                Ver todas as notícias <ArrowRight size={15} />
              </Link>
            </div>

            {loadingNews ? (
              <div className="nx-skeleton" style={{ height: '260px', borderRadius: '14px' }} />
            ) : (
              <div className="nx-news-grid">
                {noticiasMercado.slice(0, 4).map((noticia, index) => {
                  const imgFinal = noticia.image && noticia.image.startsWith('http')
                    ? noticia.image
                    : FALLBACK_NEWS_IMAGES[index % FALLBACK_NEWS_IMAGES.length];

                  return (
                    <a
                      key={noticia.id || noticia.url || index}
                      href={noticia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nx-news-card-v2"
                    >
                      <div className="nx-news-img">
                        <img
                          src={imgFinal}
                          alt={noticia.title}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = FALLBACK_NEWS_IMAGES[0];
                          }}
                        />
                        <span className="nx-news-tag">MERCADO</span>
                      </div>
                      <div className="nx-news-body">
                        <h4>{noticia.title}</h4>
                        <span className="nx-news-date">
                          {noticia.publishedAt ? new Date(noticia.publishedAt).toLocaleDateString('pt-PT') : 'recente'}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 6. CARVERTICAL */}
        <section className="nx-cv-section-v2" data-aos="fade-up">
          <div className="nx-shell nx-cv-box-v2">
            <div className="nx-cv-info-v2">
              <div className="nx-cv-logo-top">
                <img src="/carvertical-logo.png" alt="carVertical" />
                <span className="nx-cv-discount">-20% com código NOXVELIA</span>
              </div>
              <h2>Histórico do veículo completo e verificado.</h2>
              <ul className="nx-cv-list">
                <li>✓ Histórico de acidentes</li>
                <li>✓ Quilometragem verificada</li>
                <li>✓ Registo de manutenção</li>
                <li>✓ +50 fontes de dados</li>
              </ul>
              <a
                href={CARVERTICAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-cv-btn-v2"
              >
                Verificar veículo com -20% <ArrowRight size={16} />
              </a>
            </div>

            <div className="nx-cv-preview-wrap">
              <img
                src={CARVERTICAL_PREVIEW_IMG}
                alt="Pré-visualização CarVertical"
                className="nx-cv-preview-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 7. CTA FINAL */}
        <section className="nx-cta-final">
          <div className="nx-shell nx-cta-inner">
            <div className="nx-cta-text">
              <h2>Pronto para encontrar o seu próximo negócio?</h2>
              <p>Junte-se a profissionais e particulares que confiam na Noxvelia.</p>
              <p className="nx-cta-microcopy">Até 5 anúncios grátis. Sem cartão de crédito.</p>
            </div>
            <Link className="nx-btn-cta-final" to={publicarTo} state={publicarState}>
              Publicar anúncio grátis <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}