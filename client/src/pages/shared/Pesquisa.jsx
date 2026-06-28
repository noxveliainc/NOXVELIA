import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AnuncioCard from './AnuncioCard';
import MapaResultados from '../../components/imoveis/MapaResultados';
import useDebounce from '../../hooks/useDebounce';
import Icon from '@mdi/react';
import { mdiMap, mdiViewGrid, mdiMagnify, mdiLoading, mdiFilterVariant, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS_CIDADES_PT, DISTRITOS } from '../../data/localizacoes';

const TIPOLOGIAS = ['T0', 'T1', 'T2', 'T3', 'T4', 'T5+'];
const COMBUSTIVEIS = ['Gasolina', 'Diesel', 'Eléctrico', 'Híbrido', 'GPL'];
const TRANSMISSAO = ['Manual', 'Automático'];

// ─────────────────────────────────────────────────────────────────────────────
// BANNER CTA — convida utilizadores não autenticados a publicar um anúncio
// Adapta-se automaticamente ao tipo de divisão (carro / imóvel)
// Para mostrar apenas a utilizadores não autenticados, envolve com: {!user && <BannerCTA ... />}
// ─────────────────────────────────────────────────────────────────────────────
const BannerCTA = ({ tipo, origem }) => {
  const navigate = useNavigate();
  const isCarro = tipo === 'carro';
  const accent = isCarro ? 'var(--nx-accent-car)' : 'var(--nx-accent-estate)';
  const textoAnuncio = isCarro ? 'veículo' : 'imóvel';
  const divisao = isCarro ? 'NOXVELIA Drive' : 'NOXVELIA Estate';

  return (
    <div style={{
      background: 'var(--nx-bg-2)',
      border: `1px solid var(--nx-border)`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: 'var(--nx-radius-md)',
      padding: '18px 24px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      flexWrap: 'wrap',
    }}>
      <div>
        <p style={{
          margin: 0,
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--nx-text)',
          lineHeight: 1.5,
          letterSpacing: '0.01em',
        }}>
          Publica o teu {textoAnuncio} em {divisao}{' '}
          <span style={{ color: accent }}>gratuitamente.</span>
        </p>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '12px',
          color: 'var(--nx-text-sub)',
          lineHeight: 1.5,
          fontWeight: 400,
        }}>
          Acede à tua conta e chega a milhares de compradores em Portugal. Sem comissões.
        </p>
      </div>
    </div>
  );
};

export default function Pesquisa({ tipoPadrao = 'imovel' }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const tipoSeguro = location.pathname.includes('carro') ? 'carro' : (tipoPadrao || 'imovel');
  const tipoInicial = searchParams.get('tipo') || tipoSeguro;

  const [resultados, setResultados] = useState([]);
  const [dadosMapa, setDadosMapa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMais, setLoadingMais] = useState(false);
  const [error, setError] = useState(null);
  const [totalResultados, setTotalResultados] = useState(0);
  const [sort, setSort] = useState('relevancia');
  const [searchQuery, setSearchQuery] = useState('');
  const [temMais, setTemMais] = useState(false);

  const [sidebarMobileAberta, setSidebarMobileAberta] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [vistaAtiva, setVistaAtiva] = useState('grelha');

  const [filtros, setFiltros] = useState({
    tipo: tipoInicial, precoMin: '', precoMax: '', distrito: 'Todos', cidade: '', marca: '', modelo: '', tipologias: [], combustiveis: [], transmissao: [],
  });

  const sentinelaRef = useRef(null);
  const limite = 12;
  const isFetchingRef = useRef(false);
  const paginaRef = useRef(1);
  const filtrosRef = useRef(filtros);
  const sortRef = useRef(sort);
  const buscaRef = useRef('');
  const isMounted = useRef(false);

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => { filtrosRef.current = filtros; }, [filtros]);
  useEffect(() => { sortRef.current = sort; }, [sort]);

  useEffect(() => {
    const toggleSidebar = () => setSidebarMobileAberta(prev => !prev);
    window.addEventListener('toggle-filtros', toggleSidebar);
    return () => window.removeEventListener('toggle-filtros', toggleSidebar);
  }, []);

  useEffect(() => {
    if (tipoSeguro !== 'imovel') {
      setVistaAtiva('grelha');
    }
  }, [tipoSeguro]);

  const carregarDadosMapa = useCallback(async () => {
    if (tipoSeguro !== 'imovel') {
      setDadosMapa([]);
      return;
    }

    try {
      const filtrosAtuais = filtrosRef.current;
      const buscaAtual = buscaRef.current;

      const params = new URLSearchParams();
      params.set('tipo', 'imovel');

      if (filtrosAtuais.distrito && filtrosAtuais.distrito !== 'Todos') {
        params.set('distrito', filtrosAtuais.distrito);
      }
      if (filtrosAtuais.cidade) {
        params.set('cidade', filtrosAtuais.cidade);
      }
      if (filtrosAtuais.tipologias.length) {
        params.set('tipologia', filtrosAtuais.tipologias.join(','));
      }
      if (filtrosAtuais.precoMax) {
        params.set('precoMax', filtrosAtuais.precoMax);
      }
      if (buscaAtual && buscaAtual.trim()) {
        params.set('q', buscaAtual.trim());
      }

      const { data } = await api.get(`/anuncios/pesquisa/mapa?${params.toString()}`);
      setDadosMapa(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('Erro ao carregar mapa:', err);
    }
  }, [tipoSeguro]);

  const puxarDadosServidor = useCallback(async (paginaAlvo, acumular = false, tipoForcado = null) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (paginaAlvo === 1) setLoading(true); else setLoadingMais(true);
    setError(null);

    try {
      const filtrosAtuais = filtrosRef.current;
      const sortAtual = sortRef.current;
      const buscaAtual = buscaRef.current;
      const params = new URLSearchParams();

      let tipoFinal = tipoForcado || filtrosAtuais.tipo;
      if (!tipoFinal || tipoFinal === 'undefined') tipoFinal = location.pathname.includes('carro') ? 'carro' : (tipoPadrao || 'imovel');

      params.set('tipo', tipoFinal); params.set('page', paginaAlvo); params.set('limit', limite); params.set('sort', sortAtual);

      if (buscaAtual && buscaAtual.trim()) params.set('q', buscaAtual.trim());
      if (filtrosAtuais.precoMax) params.set('precoMax', filtrosAtuais.precoMax);
      if (filtrosAtuais.distrito && filtrosAtuais.distrito !== 'Todos') params.set('distrito', filtrosAtuais.distrito);
      if (filtrosAtuais.cidade) params.set('cidade', filtrosAtuais.cidade);

      if (tipoFinal === 'carro') {
        if (filtrosAtuais.marca) params.set('marca', filtrosAtuais.marca);
        if (filtrosAtuais.modelo) params.set('modelo', filtrosAtuais.modelo);
        if (filtrosAtuais.combustiveis.length) params.set('combustivel', filtrosAtuais.combustiveis.join(','));
        if (filtrosAtuais.transmissao.length) params.set('transmissao', filtrosAtuais.transmissao.join(','));
      }

      if (tipoFinal === 'imovel' && filtrosAtuais.tipologias.length) params.set('tipologia', filtrosAtuais.tipologias.join(','));

      const { data } = await api.get(`/anuncios?${params.toString()}`);
      const listaAnuncios = data.anuncios || (Array.isArray(data) ? data : []);
      const contagemAnuncios = data.totalAnuncios !== undefined ? data.totalAnuncios : listaAnuncios.length;

      if (acumular) setResultados(prev => [...prev, ...listaAnuncios]); else setResultados(listaAnuncios);
      setTotalResultados(contagemAnuncios);
      const maisDisponivel = listaAnuncios.length === limite;
      setTemMais(maisDisponivel);
      if (maisDisponivel) paginaRef.current = paginaAlvo;

    } catch (err) { setError('Falha ao atualizar dados.'); setTemMais(false);
    } finally { setLoading(false); setLoadingMais(false); isFetchingRef.current = false; }
  }, [tipoPadrao, location.pathname]);

  useEffect(() => {
    setFiltros(f => ({ ...f, tipo: tipoSeguro, marca: '', modelo: '', cidade: '', tipologias: [], combustiveis: [], transmissao: [] }));
    setSidebarMobileAberta(false); setTemMais(false); setResultados([]); setSearchQuery(''); buscaRef.current = ''; paginaRef.current = 1;
    const timer = setTimeout(() => { puxarDadosServidor(1, false, tipoSeguro); }, 50);
    return () => clearTimeout(timer);
  }, [tipoSeguro, sort, puxarDadosServidor]);

  useEffect(() => {
    buscaRef.current = debouncedQuery;
    if (!isMounted.current) { isMounted.current = true; return; }
    setTemMais(false); setResultados([]); paginaRef.current = 1; puxarDadosServidor(1, false, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    if (tipoSeguro !== 'imovel') return;

    const timer = setTimeout(() => {
      carregarDadosMapa();
    }, 60);

    return () => clearTimeout(timer);
  }, [
    tipoSeguro,
    filtros.distrito,
    filtros.cidade,
    filtros.precoMax,
    filtros.tipologias,
    debouncedQuery,
    carregarDadosMapa,
  ]);

  useEffect(() => {
    if (!temMais || vistaAtiva === 'mapa') return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { const proximaPagina = paginaRef.current + 1; puxarDadosServidor(proximaPagina, true, filtrosRef.current.tipo); }
    }, { rootMargin: '200px', threshold: 0.1 });
    const sentinela = sentinelaRef.current;
    if (sentinela) observer.observe(sentinela);
    return () => observer.disconnect();
  }, [temMais, puxarDadosServidor, vistaAtiva]);

  const toggleTag = (campo, valor) => {
    setFiltros(prev => {
      const lista = prev[campo] || [];
      const nova = lista.includes(valor) ? lista.filter(i => i !== valor) : [...lista, valor];
      return { ...prev, [campo]: nova };
    });
  };

  const ejecutarFiltrosManuais = () => {
    setTemMais(false); setResultados([]); paginaRef.current = 1;
    setTimeout(() => { puxarDadosServidor(1, false, filtrosRef.current.tipo); }, 50);
    setSidebarMobileAberta(false);
  };

  const isImovel = tipoSeguro === 'imovel';
  const modelosDisponiveis = filtros.marca ? getModelosPorMarca(filtros.marca) : [];
  const cidadesDisponiveis = (filtros.distrito && filtros.distrito !== 'Todos') ? DISTRITOS_CIDADES_PT[filtros.distrito] : [];

  return (
    <>
      <style>{`
        .pesquisa-root { background: var(--nx-bg); font-family: var(--nx-font-body); color: var(--nx-text); min-height: 100vh; display: flex; flex-direction: column; }
        .pesquisa-layout { display: flex; max-width: 1400px; margin: 0 auto; width: 100%; padding: 32px; gap: 24px; flex: 1; align-items: flex-start; }

        .pesquisa-sidebar { width: 320px; flex-shrink: 0; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-lg); padding: 24px; position: sticky; top: 96px; max-height: calc(100vh - 120px); overflow-y: auto; box-shadow: var(--nx-shadow-card); transition: width 0.25s ease, opacity 0.2s ease, padding 0.25s ease, border-color 0.25s ease; }
        .pesquisa-sidebar::-webkit-scrollbar { width: 4px; }
        .pesquisa-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pesquisa-sidebar::-webkit-scrollbar-thumb { background: var(--nx-border); border-radius: 4px; }

        .pesquisa-sidebar.collapsed { width: 0; min-width: 0; padding: 0; border: none; opacity: 0; overflow: hidden; pointer-events: none; }

        .pesquisa-sidebar-toggle { flex-shrink: 0; width: 28px; height: 48px; border-radius: 8px; border: 1px solid var(--nx-border); background: var(--nx-bg-2); color: var(--nx-text-sub); cursor: pointer; display: flex; align-items: center; justify-content: center; position: sticky; top: 96px; transition: all 0.2s ease; }
        .pesquisa-sidebar-toggle:hover { background: var(--nx-border); color: var(--nx-text); }

        .pesquisa-sidebar-header { display: flex; align-items: center; gap: 8px; font-family: var(--nx-font-display); font-size: 18px; font-weight: 800; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--nx-border); }
        .pesquisa-filter-group { margin-bottom: 24px; }
        .pesquisa-filter-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--nx-text-sub); margin-bottom: 12px; }

        .pesquisa-filter-input { width: 100%; padding: 12px 14px; border: 1px solid var(--nx-input-border); border-radius: var(--nx-radius-sm); font-size: 14px; font-family: var(--nx-font-body); color: var(--nx-text); outline: none; background: var(--nx-input-bg); box-sizing: border-box; transition: all 0.2s ease; }
        .pesquisa-filter-input:focus { border-color: var(--nx-accent-car); }

        .pesquisa-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pesquisa-tag { padding: 8px 12px; border: 1px solid var(--nx-border); border-radius: 6px; background: var(--nx-bg-3); font-size: 12px; font-weight: 600; cursor: pointer; color: var(--nx-text-sub); transition: all 0.2s ease; flex: 1 1 calc(50% - 8px); text-align: center; }
        .pesquisa-tag:hover { background: var(--nx-border); color: var(--nx-text); }
        .pesquisa-tag.active { background: ${tipoSeguro === 'carro' ? 'var(--nx-accent-car)' : 'var(--nx-accent-estate)'}; color: #040711; border-color: ${tipoSeguro === 'carro' ? 'var(--nx-accent-car)' : 'var(--nx-accent-estate)'}; }

        .pesquisa-apply-btn { width: 100%; padding: 14px; background: var(--nx-text); color: var(--nx-bg); border: none; border-radius: var(--nx-radius-sm); font-family: var(--nx-font-body); font-weight: 800; font-size: 13px; cursor: pointer; transition: opacity 0.2s ease; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 8px; }
        .pesquisa-apply-btn:hover { opacity: 0.85; }

        .pesquisa-main-content { flex: 1; min-width: 0; display: flex; flex-direction: column; }

        .pesquisa-search-row { display: flex; gap: 12px; align-items: stretch; margin-bottom: 24px; }
        .pesquisa-search-row .pesquisa-omnibar-wrapper { margin-bottom: 0; flex: 1; }

        .pesquisa-omnibar-wrapper { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: var(--nx-radius-md); display: flex; align-items: center; padding: 10px 20px; }
        .pesquisa-omnibar-wrapper:focus-within { border-color: ${tipoSeguro === 'carro' ? 'var(--nx-accent-car)' : 'var(--nx-accent-estate)'}; }
        .pesquisa-omnibar-wrapper input { flex: 1; border: none; padding: 8px; font-size: 15px; color: var(--nx-text); outline: none; background: transparent; }

        .pesquisa-mobile-filter-btn { display: none; align-items: center; gap: 6px; padding: 0 18px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-md); color: var(--nx-text); font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; flex-shrink: 0; }

        .pesquisa-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .pesquisa-results-count { font-family: var(--nx-font-display); font-size: 18px; font-weight: 700; color: var(--nx-text); }

        .pesquisa-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }

        .sidebar-mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 9998; backdrop-filter: blur(4px); }

        @media (max-width: 1024px) {
          .pesquisa-layout { padding: 24px 16px; flex-direction: column; }
          .pesquisa-sidebar { position: fixed; top: 0; left: ${sidebarMobileAberta ? '0' : '-100%'}; height: 100vh; max-height: 100vh; border-radius: 0; z-index: 9999; transition: left 0.3s ease; width: 85%; max-width: 360px; opacity: 1; }
          .pesquisa-sidebar.collapsed { width: 85%; max-width: 360px; padding: 24px; border: 1px solid var(--nx-border); opacity: 1; pointer-events: auto; }
          .sidebar-mobile-overlay { display: ${sidebarMobileAberta ? 'block' : 'none'}; }
          .pesquisa-sidebar-toggle { display: none; }
          .pesquisa-mobile-filter-btn { display: inline-flex; }
          .pesquisa-main-content { width: 100%; }
        }

        .pesquisa-empty { text-align: center; padding: 100px 20px; color: var(--nx-text-sub); }
        .infinite-spinner-container { text-align: center; padding: 40px 0; font-size: 13px; color: var(--nx-text-sub); font-weight: 500; grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--nx-text-sub); border-radius: 50%; display: inline-block; animation: pulse 0.6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: 0.2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }
      `}</style>

      <div className="pesquisa-root">
        <div className="sidebar-mobile-overlay" onClick={() => setSidebarMobileAberta(false)}></div>

        <div className="pesquisa-layout" style={{ display: vistaAtiva === 'mapa' ? 'none' : 'flex' }}>

          <aside className={`pesquisa-sidebar${isSidebarOpen ? '' : ' collapsed'}`}>
            <div className="pesquisa-sidebar-header"><Icon path={mdiFilterVariant} size={1} /> Filtros Avançados</div>

            <div className="pesquisa-filter-group">
              <div className="pesquisa-filter-title">Orçamento Máximo (€)</div>
              <input type="number" min="0" className="pesquisa-filter-input" placeholder="Ex: 120000" value={filtros.precoMax} onChange={(e) => setFiltros(f => ({ ...f, precoMax: e.target.value }))} />
            </div>

            <div className="pesquisa-filter-group">
              <div className="pesquisa-filter-title">Distrito / Região</div>
              <select className="pesquisa-filter-input" value={filtros.distrito} onChange={(e) => setFiltros(f => ({ ...f, distrito: e.target.value, cidade: '' }))}>
                <option value="Todos">Portugal (Todos)</option>
                {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="pesquisa-filter-group">
              <div className="pesquisa-filter-title">Cidade / Concelho</div>
              <select className="pesquisa-filter-input" value={filtros.cidade} onChange={(e) => setFiltros(f => ({ ...f, cidade: e.target.value }))} disabled={!filtros.distrito || filtros.distrito === 'Todos'}>
                <option value="">{filtros.distrito && filtros.distrito !== 'Todos' ? 'Todas as Cidades' : 'Escolhe o Distrito Primeiro'}</option>
                {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {tipoSeguro === 'carro' ? (
              <>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Marca do Veículo</div>
                  <select className="pesquisa-filter-input" value={filtros.marca} onChange={(e) => setFiltros(f => ({ ...f, marca: e.target.value, modelo: '' }))}>
                    <option value="">Todas as Marcas</option>
                    {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Modelo Específico</div>
                  <select className="pesquisa-filter-input" value={filtros.modelo} onChange={(e) => setFiltros(f => ({ ...f, modelo: e.target.value }))} disabled={!filtros.marca}>
                    <option value="">{filtros.marca ? 'Todos os Modelos' : 'Escolha a Marca Primeiro'}</option>
                    {modelosDisponiveis.map((mod, idx) => {
                      const nomeModelo = typeof mod === 'object' ? (mod.modelo || mod.nome || '') : mod;
                      return <option key={`mod-${idx}`} value={nomeModelo}>{nomeModelo}</option>;
                    })}
                  </select>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Combustível</div>
                  <div className="pesquisa-tags">
                    {COMBUSTIVEIS.map(val => (
                      <button key={val} type="button" className={`pesquisa-tag ${filtros.combustiveis.includes(val) ? 'active' : ''}`} onClick={() => toggleTag('combustiveis', val)}>{val}</button>
                    ))}
                  </div>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Caixa / Transmissão</div>
                  <div className="pesquisa-tags">
                    {TRANSMISSAO.map(val => (
                      <button key={val} type="button" className={`pesquisa-tag ${filtros.transmissao.includes(val) ? 'active' : ''}`} onClick={() => toggleTag('transmissao', val)}>{val}</button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Tipologias disponíveis</div>
                <div className="pesquisa-tags">
                  {TIPOLOGIAS.map(val => (
                    <button key={val} type="button" className={`pesquisa-tag ${filtros.tipologias.includes(val) ? 'active' : ''}`} onClick={() => toggleTag('tipologias', val)}>{val}</button>
                  ))}
                </div>
              </div>
            )}
            <button type="button" className="pesquisa-apply-btn" onClick={ejecutarFiltrosManuais}>Aplicar Filtros</button>
          </aside>

          <button
            type="button"
            className="pesquisa-sidebar-toggle"
            onClick={() => setIsSidebarOpen(prev => !prev)}
            title={isSidebarOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
          >
            <Icon path={isSidebarOpen ? mdiChevronLeft : mdiChevronRight} size={0.9} />
          </button>

          <main className="pesquisa-main-content">
            <div className="pesquisa-search-row">
              <button type="button" className="pesquisa-mobile-filter-btn" onClick={() => setSidebarMobileAberta(true)}>
                <Icon path={mdiFilterVariant} size={0.8} />
                Filtros
              </button>

              <div className="pesquisa-omnibar-wrapper">
                <Icon path={mdiMagnify} size={0.9} color="var(--nx-text-sub)" style={{ marginRight: '12px' }} />
                <input type="text" placeholder={tipoSeguro === 'carro' ? 'Pesquisar por marca, modelo, versão...' : 'Pesquisar por título, características...'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {loading && <Icon path={mdiLoading} size={0.9} color={tipoSeguro === 'carro' ? 'var(--nx-accent-car)' : 'var(--nx-accent-estate)'} className="animate-spin" />}
              </div>
            </div>

            {error && <div style={{ color: 'var(--nx-danger)', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '24px' }}>{error}</div>}

            {/* ── BANNER CTA ── */}
            {/* Remove esta linha e substitui por {!user && <BannerCTA tipo={tipoSeguro} origem={location.pathname} />} se tiveres contexto de autenticação */}
            <BannerCTA tipo={tipoSeguro} origem={location.pathname} />

            <div className="pesquisa-topbar">
              <div className="pesquisa-results-count">{loading && resultados.length === 0 ? 'A procurar...' : `${totalResultados} registos`}</div>
              <select style={{ border: 'none', background: 'transparent', fontFamily: 'var(--nx-font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--nx-text)', cursor: 'pointer', outline: 'none' }} value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="relevancia" style={{ background: 'var(--nx-bg-2)' }}>Relevância</option>
                <option value="preco_asc" style={{ background: 'var(--nx-bg-2)' }}>Preço: Mais Baixo</option>
                <option value="preco_desc" style={{ background: 'var(--nx-bg-2)' }}>Preço: Mais Alto</option>
              </select>
            </div>

            <div className="pesquisa-grid">
              {resultados.map(anuncio => <AnuncioCard key={anuncio._id} anuncio={anuncio} showStatus={false} />)}
              {temMais && !loading && resultados.length > 0 && (
                <div ref={sentinelaRef} className="infinite-spinner-container">
                  <div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div>
                </div>
              )}
            </div>

            {loadingMais && (
              <div className="infinite-spinner-container" style={{ marginTop: '24px' }}>
                <div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div>
              </div>
            )}

            {!loading && resultados.length === 0 && (
              <div className="pesquisa-empty">
                <div style={{ fontSize: '32px', color: 'var(--nx-text-muted)', marginBottom: '16px' }}>&empty;</div>
                <h3 style={{ fontFamily: 'var(--nx-font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--nx-text)', margin: '0 0 8px 0' }}>Sem correspondências</h3>
                <p style={{ fontSize: '14px', margin: 0 }}>Tenta limpar alguns filtros na barra lateral.</p>
              </div>
            )}
          </main>
        </div>

        {vistaAtiva === 'mapa' && <div style={{ flex: 1, height: 'calc(100vh - 72px)' }}><MapaResultados imoveis={dadosMapa} /></div>}
        {isImovel && (
          <button className="btn-view-toggle" style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: 'var(--nx-text)', color: 'var(--nx-bg)', padding: '14px 28px', borderRadius: '40px', fontFamily: 'var(--nx-font-body)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: 'none', zIndex: 1000 }} onClick={() => setVistaAtiva(prev => prev === 'grelha' ? 'mapa' : 'grelha')}>
            {vistaAtiva === 'grelha' ? <><Icon path={mdiMap} size={0.8} /> Mostrar Mapa</> : <><Icon path={mdiViewGrid} size={0.8} /> Mostrar Lista</>}
          </button>
        )}
      </div>
    </>
  );
}