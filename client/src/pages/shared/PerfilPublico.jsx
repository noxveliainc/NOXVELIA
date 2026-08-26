import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Seo from '../../components/Seo';
import { absoluteUrl } from '../../utils/seo';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AnuncioCard from './AnuncioCard';
import ProfileView, { obterLinksVisiveisPerfil } from './ProfileView';
import LoadingScreen from '../../components/LoadingScreen';
import { Icon } from '@mdi/react';
import { mdiArrowLeft, mdiViewDashboardOutline } from '@mdi/js';
import { formatarMarcaModeloVeiculo } from '../../data/marcasModelos';

const normalizarTexto = (valor) => String(valor || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim();

const numero = (valor) => {
  const n = Number(valor);
  return Number.isFinite(n) && String(valor).trim() !== '' ? n : null;
};

const unicoOrdenado = (lista) => [...new Set(lista.filter(Boolean))]
  .sort((a, b) => String(a).localeCompare(String(b), 'pt-PT'));

const obterMarca = (anuncio) => anuncio?.carro?.marca || '';
const obterModelo = (anuncio) => anuncio?.carro?.modelo || '';
const obterDistrito = (anuncio) => anuncio?.localizacao?.distrito || '';

const filtrosIniciais = {
  q: '',
  categoria: 'todos',
  marca: '',
  modelo: '',
  distrito: '',
  precoMin: '',
  precoMax: '',
  ordem: 'destaque',
};

export default function PerfilPublico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: utilizadorAtual } = useAuth();
  const adminAVerPerfil = utilizadorAtual?.tipo === 'admin' && new URLSearchParams(location.search).get('from') === 'admin';

  const [vendedor, setVendedor] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [filtros, setFiltros] = useState(filtrosIniciais);

  const voltarDaMontra = () => {
    if (adminAVerPerfil) {
      navigate('/admin');
      return;
    }
    navigate(-1);
  };

  useEffect(() => {
    let ativo = true;

    const carregarMontra = async () => {
      try {
        const { data } = await api.get(`/users/vendedor/${id}`);
        if (!ativo) return;
        setVendedor(data.vendedor);
        setAnuncios(Array.isArray(data.anuncios) ? data.anuncios : []);
      } catch {
        if (ativo) setErro('Erro ao carregar a montra do vendedor.');
      } finally {
        if (ativo) setLoading(false);
      }
    };

    carregarMontra();
    return () => { ativo = false; };
  }, [id]);

  const copiarLinkMontra = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 2000);
  };

  const isAdmin = vendedor?.tipo === 'admin';
  const nomeBase = vendedor?.nome || 'Vendedor';
  const nomeExibicao = isAdmin
    ? (nomeBase.toUpperCase().includes('NOXVELIA') ? nomeBase : `NOXVELIA ${nomeBase}`)
    : nomeBase;
  const isProfissional = vendedor?.tipoConta === 'profissional' || isAdmin;
  const linksPerfilVisiveis = obterLinksVisiveisPerfil(vendedor);

  const totais = useMemo(() => ({
    todos: anuncios.length,
    carro: anuncios.filter((anuncio) => anuncio.tipo === 'carro').length,
    imovel: anuncios.filter((anuncio) => anuncio.tipo === 'imovel').length,
    destacados: anuncios.filter((anuncio) => anuncio.destacado).length,
  }), [anuncios]);

  const opcoes = useMemo(() => {
    const carros = anuncios.filter((anuncio) => anuncio.tipo === 'carro');
    const carrosDaMarca = filtros.marca
      ? carros.filter((anuncio) => obterMarca(anuncio) === filtros.marca)
      : carros;

    return {
      marcas: unicoOrdenado(carros.map(obterMarca)),
      modelos: unicoOrdenado(carrosDaMarca.map(obterModelo)),
      distritos: unicoOrdenado(anuncios.map(obterDistrito)),
    };
  }, [anuncios, filtros.marca]);

  const anunciosFiltrados = useMemo(() => {
    const termo = normalizarTexto(filtros.q);
    const min = numero(filtros.precoMin);
    const max = numero(filtros.precoMax);

    const filtrados = anuncios.filter((anuncio) => {
      if (filtros.categoria === 'carro' && anuncio.tipo !== 'carro') return false;
      if (filtros.categoria === 'imovel' && anuncio.tipo !== 'imovel') return false;
      if (filtros.categoria === 'destacados' && !anuncio.destacado) return false;
      if (filtros.marca && obterMarca(anuncio) !== filtros.marca) return false;
      if (filtros.modelo && obterModelo(anuncio) !== filtros.modelo) return false;
      if (filtros.distrito && obterDistrito(anuncio) !== filtros.distrito) return false;
      if (min !== null && Number(anuncio.preco || 0) < min) return false;
      if (max !== null && Number(anuncio.preco || 0) > max) return false;

      if (!termo) return true;
      const texto = normalizarTexto([
        anuncio.titulo,
        formatarMarcaModeloVeiculo(anuncio.carro),
        anuncio.carro?.combustivel,
        anuncio.imovel?.tipoImovel,
        anuncio.imovel?.tipologia,
        anuncio.localizacao?.cidade,
        anuncio.localizacao?.distrito,
      ].filter(Boolean).join(' '));

      return texto.includes(termo);
    });

    return [...filtrados].sort((a, b) => {
      if (filtros.ordem === 'preco-asc') return Number(a.preco || 0) - Number(b.preco || 0);
      if (filtros.ordem === 'preco-desc') return Number(b.preco || 0) - Number(a.preco || 0);
      if (filtros.ordem === 'recentes') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return Number(b.destacado === true) - Number(a.destacado === true)
        || new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [anuncios, filtros]);

  const handleFiltro = (campo) => (event) => {
    const valor = event.target.value;
    setFiltros((atual) => ({
      ...atual,
      [campo]: valor,
      ...(campo === 'marca' ? { modelo: '' } : {}),
    }));
  };

  const limparFiltros = () => setFiltros(filtrosIniciais);

  if (loading) {
    return (
      <LoadingScreen label="A carregar vendedor" detail="Estamos a preparar a montra pública." minHeight="calc(100vh - 80px)" tone="light" />
    );
  }

  if (erro) {
    return (
      <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#0f172a' }}>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '15px' }}>{erro}</p>
        <button onClick={voltarDaMontra} style={{ padding: '12px 24px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>{adminAVerPerfil ? 'Voltar ao painel admin' : 'Voltar à pesquisa'}</button>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${nomeExibicao} — vendedor na Noxvelia`}
        description={(vendedor?.bio || `Consulta os anúncios ativos de ${nomeExibicao} na Noxvelia.`).slice(0, 160)}
        path={`/vendedor/${id}`}
        image={vendedor?.avatarUrl || undefined}
        type="profile"
        jsonLd={{ '@context': 'https://schema.org', '@type': isProfissional ? 'Organization' : 'Person', name: nomeExibicao, description: vendedor?.bio, image: vendedor?.avatarUrl, url: absoluteUrl(`/vendedor/${id}`) }}
      />
      <style>{`
        .pp-root { background: #f8fafc; min-height: calc(100vh - 80px); font-family: 'Inter', sans-serif; color: #0f172a; padding-bottom: 80px; }
        
        /* ── HERO DARK NAVY ── */
        .pp-hero { position: relative; background: #071326; border-bottom: 4px solid #d9c49c; padding: 40px 24px 20px; margin-bottom: 48px; overflow: hidden; }
        .pp-cover { display: none; }
        .pp-hero-content { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; }
        
        .pp-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #cbd5e1; text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; margin-bottom: 24px; transition: color 0.2s; }
        .pp-back:hover { color: #fffaf0; }
        
        .pp-admin-back { min-height: 40px; display: inline-flex; align-items: center; gap: 8px; padding: 0 14px; margin-bottom: 18px; border-radius: 10px; border: 1px solid #334155; background: #1e293b; color: #fff; font-size: 12px; font-weight: 800; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.2s; }
        .pp-admin-back:hover { border-color: #475569; background: #334155; }
        .pp-admin-note { display: inline-flex; align-items: center; gap: 8px; margin-left: 10px; color: #94a3b8; font-size: 12px; font-weight: 700; }
        
        /* ── FORÇA O PROFILEVIEW EMBUTIDO A TER TEXTO BRANCO ── */
        .pp-hero [class*="perfil-name"] { color: #ffffff !important; }
        .pp-hero [class*="perfil-bio"] { color: #cbd5e1 !important; }
        .pp-hero [class*="perfil-stats"] strong { color: #ffffff !important; }
        .pp-hero [class*="perfil-stats"] span { color: #94a3b8 !important; }
        .pp-hero [class*="perfil-email"] { color: #94a3b8 !important; }
        
        .pp-main { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .pp-showcase-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin: -20px 0 32px; }
        .pp-summary-item { min-height: 96px; display: grid; align-content: center; gap: 7px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 10px 25px -10px rgba(15,23,42,.05); text-align: center; }
        .pp-summary-item strong { color: #0f172a; font-size: 32px; line-height: 1; font-weight: 900; }
        .pp-summary-item span { color: #64748b; font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        
        .pp-stock-panel { padding: clamp(24px, 3vw, 40px); border: 1px solid #e2e8f0; border-radius: 24px; background: #ffffff; box-shadow: 0 10px 30px -10px rgba(15,23,42,.05); }
        .pp-section-kicker { display: block; margin-bottom: 8px; color: #102f50; font-size: 12px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
        .pp-section-title { font-size: clamp(26px, 3vw, 36px); line-height: 1.1; font-weight: 900; margin: 0; color: #0f172a; letter-spacing: -.03em; }
        .pp-section-copy { margin: 10px 0 0; max-width: 720px; color: #64748b; font-size: 15px; line-height: 1.55; font-weight: 500; }
        
        .pp-filters { margin-top: 32px; padding: clamp(16px, 2vw, 24px); border: 1px solid #e2e8f0; border-radius: 16px; background: #f8fafc; }
        .pp-filter-top { display: grid; grid-template-columns: minmax(220px, 1.4fr) repeat(3, minmax(140px, .75fr)) auto; gap: 12px; align-items: end; }
        .pp-filter-bottom { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
        .pp-field { display: grid; gap: 8px; }
        .pp-field label { color: #102f50; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .pp-field input, .pp-field select { width: 100%; min-height: 48px; border: 1px solid #cbd5e1; border-radius: 10px; background: #ffffff; color: #071326; padding: 0 14px; font: inherit; font-size: 14px; font-weight: 600; outline: none; box-sizing: border-box; transition: 0.2s; }
        .pp-field input:focus, .pp-field select:focus { border-color: #102f50; box-shadow: 0 0 0 3px rgba(16, 47, 80, 0.1); }
        .pp-clear { min-height: 48px; padding: 0 20px; border: 1px solid #102f50; border-radius: 10px; color: #102f50; background: #ffffff; font-size: 13px; font-weight: 800; cursor: pointer; white-space: nowrap; transition: 0.2s; }
        .pp-clear:hover { background: #f1f5f9; }
        
        .pp-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin: 32px 0 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
        .pp-preview-title { margin: 0; color: #0f172a; font-size: 18px; font-weight: 900; }
        .pp-result-copy { margin: 4px 0 0; color: #64748b; font-size: 14px; font-weight: 500; }
        .pp-result-count { color: #102f50; font-size: 13px; font-weight: 900; letter-spacing: .07em; text-transform: uppercase; white-space: nowrap; }
        
        /* ── GRELHA AGORA É UMA LISTA HORIZONTAL ── */
        .pp-list { display: flex; flex-direction: column; gap: 20px; width: 100%; }
        
        .pp-empty { min-height: 220px; display: grid; place-items: center; padding: 38px 20px; border: 1px dashed #cbd5e1; border-radius: 16px; background: #f8fafc; text-align: center; margin-top: 24px; }
        .pp-empty-inner { max-width: 520px; }
        .pp-empty h3 { margin: 0; color: #0f172a; font-size: 22px; line-height: 1.2; font-weight: 900; }
        .pp-empty p { margin: 10px auto 24px; color: #64748b; font-size: 15px; line-height: 1.65; }
        .pp-empty-btn { min-height: 46px; padding: 0 24px; border: 0; border-radius: 10px; background: #102f50; color: #ffffff; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; transition: 0.2s; }
        .pp-empty-btn:hover { background: #071326; }
        .pp-empty-standalone { margin-top: 4px; border: none; background: #ffffff; box-shadow: 0 10px 25px -10px rgba(15,23,42,.05); }

        @media (max-width: 1040px) {
          .pp-filter-top, .pp-filter-bottom { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .pp-clear { width: 100%; }
        }
        @media (max-width: 860px) {
          .pp-showcase-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0; }
          .pp-stock-panel { border-radius: 18px; padding: 20px; }
        }
        @media (max-width: 680px) {
          .pp-hero { padding: 26px 16px 18px; margin-bottom: 30px; }
          .pp-main { padding: 0 16px; }
          .pp-filter-top, .pp-filter-bottom { grid-template-columns: 1fr; }
          .pp-toolbar { align-items: flex-start; flex-direction: column; }
          .pp-showcase-summary { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pp-root">
        <div className="pp-hero">
          <div className="pp-hero-content">
            <button onClick={voltarDaMontra} className={adminAVerPerfil ? 'pp-admin-back' : 'pp-back'}>
              <Icon path={adminAVerPerfil ? mdiViewDashboardOutline : mdiArrowLeft} size={0.65} />
              {adminAVerPerfil ? 'Voltar ao painel admin' : 'Voltar à Pesquisa'}
            </button>
            {adminAVerPerfil && <span className="pp-admin-note">Vista pública aberta pelo painel</span>}

            <ProfileView
              user={vendedor}
              isOwner={false}
              totalImoveis={totais.imovel}
              totalCarros={totais.carro}
              links={linksPerfilVisiveis}
              onShare={copiarLinkMontra}
              linkCopiado={linkCopiado}
            />
          </div>
        </div>

        <div className="pp-main">
          {anuncios.length > 0 ? (
            <>
              <div className="pp-showcase-summary" aria-label="Resumo da montra">
                <div className="pp-summary-item"><strong>{totais.todos}</strong><span>anúncios ativos</span></div>
                <div className="pp-summary-item"><strong>{totais.carro}</strong><span>automóveis</span></div>
                <div className="pp-summary-item"><strong>{totais.imovel}</strong><span>imóveis</span></div>
                <div className="pp-summary-item"><strong>{totais.destacados}</strong><span>destaques</span></div>
              </div>

              <section className="pp-stock-panel" aria-label="Stock público do vendedor">
                <div>
                  <span className="pp-section-kicker">Stock público</span>
                  <h2 className="pp-section-title">Montra de {nomeExibicao}</h2>
                  <p className="pp-section-copy">Todo o stock público deste vendedor está agora concentrado no perfil. Filtra por categoria, preço, marca, modelo ou localização sem sair da página.</p>
                </div>

                <div className="pp-filters" aria-label="Filtros do stock">
                  <div className="pp-filter-top">
                    <div className="pp-field">
                      <label htmlFor="pp-q">Pesquisa livre</label>
                      <input id="pp-q" value={filtros.q} onChange={handleFiltro('q')} placeholder="Marca, modelo, cidade..." />
                    </div>
                    <div className="pp-field">
                      <label htmlFor="pp-categoria">Categoria</label>
                      <select id="pp-categoria" value={filtros.categoria} onChange={handleFiltro('categoria')}>
                        <option value="todos">Tudo</option>
                        <option value="carro">Automóveis</option>
                        <option value="imovel">Imóveis</option>
                        <option value="destacados">Destaques</option>
                      </select>
                    </div>
                    <div className="pp-field">
                      <label htmlFor="pp-distrito">Distrito</label>
                      <select id="pp-distrito" value={filtros.distrito} onChange={handleFiltro('distrito')}>
                        <option value="">Portugal inteiro</option>
                        {opcoes.distritos.map((distrito) => <option key={distrito} value={distrito}>{distrito}</option>)}
                      </select>
                    </div>
                    <div className="pp-field">
                      <label htmlFor="pp-ordem">Ordenar por</label>
                      <select id="pp-ordem" value={filtros.ordem} onChange={handleFiltro('ordem')}>
                        <option value="destaque">Destaque primeiro</option>
                        <option value="recentes">Mais recentes</option>
                        <option value="preco-asc">Preço: Mais baixo</option>
                        <option value="preco-desc">Preço: Mais alto</option>
                      </select>
                    </div>
                    <button type="button" className="pp-clear" onClick={limparFiltros}>Limpar filtros</button>
                  </div>

                  <div className="pp-filter-bottom">
                    <div className="pp-field">
                      <label htmlFor="pp-marca">Marca</label>
                      <select id="pp-marca" value={filtros.marca} onChange={handleFiltro('marca')}>
                        <option value="">Todas</option>
                        {opcoes.marcas.map((marca) => <option key={marca} value={marca}>{marca}</option>)}
                      </select>
                    </div>
                    <div className="pp-field">
                      <label htmlFor="pp-modelo">Modelo</label>
                      <select id="pp-modelo" value={filtros.modelo} onChange={handleFiltro('modelo')}>
                        <option value="">Todos</option>
                        {opcoes.modelos.map((modelo) => <option key={modelo} value={modelo}>{modelo}</option>)}
                      </select>
                    </div>
                    <div className="pp-field">
                      <label htmlFor="pp-preco-min">Preço mínimo</label>
                      <input id="pp-preco-min" type="number" min="0" value={filtros.precoMin} onChange={handleFiltro('precoMin')} placeholder="€ Mínimo" />
                    </div>
                    <div className="pp-field">
                      <label htmlFor="pp-preco-max">Preço máximo</label>
                      <input id="pp-preco-max" type="number" min="0" value={filtros.precoMax} onChange={handleFiltro('precoMax')} placeholder="€ Máximo" />
                    </div>
                  </div>
                </div>

                <div className="pp-toolbar">
                  <div>
                    <h3 className="pp-preview-title">Anúncios ativos</h3>
                    <p className="pp-result-copy">Resultados do stock ativo de {nomeExibicao}.</p>
                  </div>
                  <span className="pp-result-count">{anunciosFiltrados.length} de {anuncios.length}</span>
                </div>

                {anunciosFiltrados.length > 0 ? (
                  /* ── AGORA USA A LISTA HORIZONTAL ── */
                  <div className="pp-list">
                    {anunciosFiltrados.map((anuncio) => {
                      const utilizadorPopulado = anuncio?.utilizador && typeof anuncio.utilizador === 'object'
                        ? anuncio.utilizador
                        : vendedor;

                      return (
                        <AnuncioCard
                          key={anuncio._id}
                          anuncio={{ ...anuncio, utilizador: utilizadorPopulado }}
                          forceSellerIdentity
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="pp-empty">
                    <div className="pp-empty-inner">
                      <h3>Sem resultados para estes filtros</h3>
                      <p>Experimenta limpar os filtros ou procurar por outra marca, localização ou intervalo de preço.</p>
                      <button type="button" className="pp-empty-btn" onClick={limparFiltros}>Limpar filtros</button>
                    </div>
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="pp-empty pp-empty-standalone">
              <div className="pp-empty-inner">
                <h3>Sem anúncios ativos de momento</h3>
                <p>Este anunciante ainda não tem anúncios ativos de momento. Podes contactar diretamente através dos dados fornecidos no perfil.</p>
                <button type="button" className="pp-empty-btn" onClick={() => navigate('/profissionais')}>Ver outros anunciantes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}