import React, { Suspense, lazy, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Seo from '../../components/Seo';
import api from '../../services/api';
import AnuncioCard from './AnuncioCard';
import GoogleAdSlot from '../../components/GoogleAdSlot';
import SponsorBanner from '../../components/SponsorBanner';
import useDebounce from '../../hooks/useDebounce';
import { Icon } from '@mdi/react';
import {
  mdiMap, mdiViewGrid, mdiMagnify, mdiLoading, mdiFilterVariant, mdiChevronLeft,
  mdiChevronRight, mdiChartTimelineVariant, mdiShieldCheckOutline, mdiCloseCircleOutline,
  mdiBellPlusOutline
} from '@mdi/js';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS_CIDADES_PT, DISTRITOS } from '../../data/localizacoes';
import { publishIntentState } from '../../utils/navigationState';
import { useAuth } from '../../context/AuthContext';
import { trackFunnelEvent } from '../../utils/funnelAnalytics';

const TIPOLOGIAS = ['T0', 'T1', 'T2', 'T3', 'T4', 'T5+'];
const TIPOS_IMOVEL = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'loja', label: 'Loja' },
  { value: 'escritorio', label: 'Escritorio' },
];
const COMBUSTIVEIS = ['Gasolina', 'Diesel', 'Eléctrico', 'Híbrido', 'GPL'];
const TRANSMISSAO = ['Manual', 'Automático'];

const MapaResultados = lazy(() => import('../../components/imoveis/MapaResultados'));
const dividirParamLista = (valor) => String(valor || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

export default function Pesquisa({ tipoPadrao = 'imovel', seoParams = null }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { signed } = useAuth();

  const tipoSeguro = location.pathname.includes('carro') ? 'carro' : (tipoPadrao || 'imovel');
  const searchParamsKey = searchParams.toString();
  const seoParamsKey = seoParams?.toString() || '';
  const parametrosRota = useMemo(() => ({
    search: new URLSearchParams(searchParamsKey),
    seo: seoParamsKey ? new URLSearchParams(seoParamsKey) : null,
  }), [searchParamsKey, seoParamsKey]);
  const getParam = useCallback((name) => parametrosRota.seo?.get(name) || parametrosRota.search.get(name) || '', [parametrosRota]);
  const marcaUrl = getParam('marca');
  const marcaInicial = tipoSeguro === 'carro' && MARCAS.includes(marcaUrl) ? marcaUrl : '';
  const queryInicial = getParam('q');
  const obterFiltrosDaRota = useCallback(() => ({
    tipo: tipoSeguro,
    precoMin: '',
    precoMax: getParam('precoMax'),
    distrito: getParam('distrito') || 'Todos',
    cidade: getParam('cidade'),
    marca: marcaInicial,
    modelo: getParam('modelo'),
    tiposImovel: dividirParamLista(getParam('tipoImovel')),
    tipologias: dividirParamLista(getParam('tipologia')),
    combustiveis: dividirParamLista(getParam('combustivel')),
    transmissao: dividirParamLista(getParam('transmissao')),
  }), [getParam, marcaInicial, tipoSeguro]);
  const filtrosIniciais = useMemo(() => obterFiltrosDaRota(), [obterFiltrosDaRota]);
  const publicarState = publishIntentState(location, tipoSeguro === 'carro' ? '/carros' : '/imoveis');

  const [resultados, setResultados] = useState([]);
  const [dadosMapa, setDadosMapa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMais, setLoadingMais] = useState(false);
  const [error, setError] = useState(null);
  const [totalResultados, setTotalResultados] = useState(0);
  const [sort, setSort] = useState('relevancia');
  const [searchQuery, setSearchQuery] = useState(queryInicial);
  const [temMais, setTemMais] = useState(false);

  const [sidebarMobileAberta, setSidebarMobileAberta] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [vistaAtiva, setVistaAtiva] = useState('grelha');
  const [guardandoAlerta, setGuardandoAlerta] = useState(false);
  const [feedbackAlerta, setFeedbackAlerta] = useState('');

  const [filtros, setFiltros] = useState(filtrosIniciais);

  const sentinelaRef = useRef(null);
  const limite = 12;
  const isFetchingRef = useRef(false);
  const paginaRef = useRef(1);
  const filtrosRef = useRef(filtros);
  const sortRef = useRef(sort);
  const sortAnteriorRef = useRef(sort);
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
    if (!sidebarMobileAberta) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSidebarMobileAberta(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [sidebarMobileAberta]);

  const carregarDadosMapa = useCallback(async () => {
    try {
      const filtrosAtuais = filtrosRef.current;
      const buscaAtual = buscaRef.current;
      const tipoFinal = filtrosAtuais.tipo || tipoSeguro;

      const params = new URLSearchParams();
      params.set('tipo', tipoFinal);

      if (filtrosAtuais.distrito && filtrosAtuais.distrito !== 'Todos') {
        params.set('distrito', filtrosAtuais.distrito);
      }
      if (filtrosAtuais.cidade) {
        params.set('cidade', filtrosAtuais.cidade);
      }
      if (filtrosAtuais.tipologias.length) {
        params.set('tipologia', filtrosAtuais.tipologias.join(','));
      }
      if (filtrosAtuais.tiposImovel?.length) {
        params.set('tipoImovel', filtrosAtuais.tiposImovel.join(','));
      }
      if (filtrosAtuais.precoMax) {
        params.set('precoMax', filtrosAtuais.precoMax);
      }
      if (buscaAtual && buscaAtual.trim()) {
        params.set('q', buscaAtual.trim());
      }
      if (tipoFinal === 'carro') {
        if (filtrosAtuais.marca) params.set('marca', filtrosAtuais.marca);
        if (filtrosAtuais.modelo) params.set('modelo', filtrosAtuais.modelo);
        if (filtrosAtuais.combustiveis.length) params.set('combustivel', filtrosAtuais.combustiveis.join(','));
        if (filtrosAtuais.transmissao.length) params.set('transmissao', filtrosAtuais.transmissao.join(','));
      }
      if (tipoFinal === 'imovel' && filtrosAtuais.tipologias.length) params.set('tipologia', filtrosAtuais.tipologias.join(','));
      if (tipoFinal === 'imovel' && filtrosAtuais.tiposImovel?.length) params.set('tipoImovel', filtrosAtuais.tiposImovel.join(','));

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
      if (tipoFinal === 'imovel' && filtrosAtuais.tiposImovel?.length) params.set('tipoImovel', filtrosAtuais.tiposImovel.join(','));

      const { data } = await api.get(`/anuncios?${params.toString()}`);
      const listaAnuncios = data.anuncios || (Array.isArray(data) ? data : []);
      const contagemAnuncios = data.totalAnuncios !== undefined ? data.totalAnuncios : listaAnuncios.length;

      if (acumular) setResultados(prev => [...prev, ...listaAnuncios]); else setResultados(listaAnuncios);
      setTotalResultados(contagemAnuncios);
      const maisDisponivel = listaAnuncios.length === limite;
      setTemMais(maisDisponivel);
      if (maisDisponivel) paginaRef.current = paginaAlvo;

    } catch { setError('Falha ao atualizar dados.'); setTemMais(false);
    } finally { setLoading(false); setLoadingMais(false); isFetchingRef.current = false; }
  }, [tipoPadrao, location.pathname]);

  useEffect(() => {
    filtrosRef.current = filtrosIniciais;
    setFiltros(filtrosIniciais);
    setSidebarMobileAberta(false); setTemMais(false); setResultados([]); setSearchQuery(queryInicial); buscaRef.current = queryInicial; paginaRef.current = 1;
    const timer = setTimeout(() => { puxarDadosServidor(1, false, tipoSeguro); }, 50);
    return () => clearTimeout(timer);
  }, [tipoSeguro, filtrosIniciais, queryInicial, puxarDadosServidor]);

  useEffect(() => {
    if (sortAnteriorRef.current === sort) return;

    sortAnteriorRef.current = sort;
    let cancelado = false;
    let timer;

    const aplicarOrdenacao = () => {
      if (cancelado) return;
      if (isFetchingRef.current) {
        timer = setTimeout(aplicarOrdenacao, 80);
        return;
      }

      setTemMais(false);
      setResultados([]);
      paginaRef.current = 1;
      puxarDadosServidor(1, false, filtrosRef.current.tipo);
    };

    aplicarOrdenacao();
    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [sort, puxarDadosServidor]);

  useEffect(() => {
    buscaRef.current = debouncedQuery;
    if (!isMounted.current) { isMounted.current = true; return; }
    setTemMais(false); setResultados([]); paginaRef.current = 1; puxarDadosServidor(1, false, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    if (vistaAtiva !== 'mapa') return undefined;

    const timer = setTimeout(() => {
      carregarDadosMapa();
    }, 60);

    return () => clearTimeout(timer);
  }, [
    tipoSeguro,
    filtros.distrito,
    filtros.cidade,
    filtros.precoMax,
    filtros.marca,
    filtros.modelo,
    filtros.tiposImovel,
    filtros.tipologias,
    filtros.combustiveis,
    filtros.transmissao,
    debouncedQuery,
    carregarDadosMapa,
    vistaAtiva,
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
    trackFunnelEvent('search_start', { vertical: tipoSeguro });
    setTemMais(false); setResultados([]); paginaRef.current = 1;
    setTimeout(() => { puxarDadosServidor(1, false, filtrosRef.current.tipo); }, 50);
    setSidebarMobileAberta(false);
  };

  const modelosDisponiveis = filtros.marca ? getModelosPorMarca(filtros.marca) : [];
  const cidadesDisponiveis = (filtros.distrito && filtros.distrito !== 'Todos') ? DISTRITOS_CIDADES_PT[filtros.distrito] : [];
  const accent = tipoSeguro === 'carro' ? 'var(--nx-accent-car)' : 'var(--nx-accent-home)';

  const filtrosAtivos = [
    filtros.precoMax && `Ate ${Number(filtros.precoMax).toLocaleString('pt-PT')} EUR`,
    filtros.distrito !== 'Todos' && filtros.distrito,
    filtros.cidade,
    filtros.marca,
    filtros.modelo,
    ...((filtros.tiposImovel || []).map(tipo => TIPOS_IMOVEL.find(item => item.value === tipo)?.label || tipo)),
    ...filtros.tipologias,
    ...filtros.combustiveis,
    ...filtros.transmissao,
    searchQuery.trim() && `"${searchQuery.trim()}"`,
  ].filter(Boolean);

  const limparFiltros = () => {
    const filtrosLimpos = {
      tipo: tipoSeguro,
      precoMin: '',
      precoMax: '',
      distrito: 'Todos',
      cidade: '',
      marca: '',
      modelo: '',
      tiposImovel: [],
      tipologias: [],
      combustiveis: [],
      transmissao: [],
    };
    filtrosRef.current = filtrosLimpos;
    setFiltros(filtrosLimpos);
    setSearchQuery('');
    buscaRef.current = '';
    setTemMais(false);
    setResultados([]);
    paginaRef.current = 1;
    setTimeout(() => { puxarDadosServidor(1, false, tipoSeguro); }, 50);
  };

  const guardarAlertaPesquisa = async () => {
    if (!signed) {
      navigate('/login', { state: { from: `${location.pathname}${location.search}` } });
      return;
    }

    setGuardandoAlerta(true);
    setFeedbackAlerta('');
    try {
      await api.post('/alertas', {
        tipo: tipoSeguro,
        filtros: {
          q: searchQuery.trim(),
          precoMax: filtros.precoMax,
          distrito: filtros.distrito,
          cidade: filtros.cidade,
          marca: filtros.marca,
          modelo: filtros.modelo,
          tipoImovel: filtros.tiposImovel,
          tipologias: filtros.tipologias,
          combustiveis: filtros.combustiveis,
          transmissao: filtros.transmissao,
        },
      });
      setFeedbackAlerta('Alerta criado. Vais receber notificacoes quando surgirem anuncios compativeis.');
    } catch (err) {
      setFeedbackAlerta(err.response?.data?.erro || 'Nao foi possivel guardar este alerta.');
    } finally {
      setGuardandoAlerta(false);
    }
  };

  return (
    <>
      {!seoParams && <Seo
        title={tipoSeguro === 'carro' ? 'Carros usados e novos em Portugal | Noxvelia' : 'Imóveis para venda em Portugal | Noxvelia'}
        description={tipoSeguro === 'carro' ? 'Pesquisa carros usados e novos em Portugal por marca, modelo, preço e localização.' : 'Pesquisa apartamentos, moradias e terrenos em Portugal por tipologia, preço e localização.'}
        path={tipoSeguro === 'carro' ? '/carros' : '/imoveis'}
      />}
    <>
      <style>{`
        .pesquisa-root { background: var(--nx-bg); font-family: var(--nx-font-body); color: var(--nx-text); min-height: 100vh; display: flex; flex-direction: column; }
        .pesquisa-layout { display: flex; max-width: 1400px; margin: 0 auto; width: 100%; padding: 32px; gap: 24px; flex: 1; align-items: flex-start; }

        .pesquisa-sidebar { width: 320px; flex-shrink: 0; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-lg); padding: 24px; position: sticky; top: 96px; max-height: calc(100vh - 120px); overflow-y: auto; box-shadow: 0 18px 40px -28px rgba(15,23,42,0.35); transition: width 0.25s ease, opacity 0.2s ease, padding 0.25s ease, border-color 0.25s ease; }
        .pesquisa-sidebar::-webkit-scrollbar { width: 4px; }
        .pesquisa-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pesquisa-sidebar::-webkit-scrollbar-thumb { background: var(--nx-border); border-radius: 4px; }

        .pesquisa-sidebar.collapsed { width: 0; min-width: 0; padding: 0; border: none; opacity: 0; overflow: hidden; pointer-events: none; }

        .pesquisa-sidebar-toggle { flex-shrink: 0; width: 28px; height: 48px; border-radius: 8px; border: 1px solid var(--nx-border); background: var(--nx-bg-2); color: var(--nx-text-sub); cursor: pointer; display: flex; align-items: center; justify-content: center; position: sticky; top: 96px; transition: all 0.2s ease; }
        .pesquisa-sidebar-toggle:hover { background: var(--nx-border); color: var(--nx-text); }

        .pesquisa-sidebar-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-family: var(--nx-font-display); font-size: 18px; font-weight: 800; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--nx-border); }
        .pesquisa-sidebar-title { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
        .pesquisa-sidebar-close { display: none; align-items: center; justify-content: center; gap: 6px; min-height: 38px; padding: 0 11px; border: 1px solid var(--nx-border); border-radius: 9px; background: #ffffff; color: #334155; font-size: 12px; font-weight: 850; cursor: pointer; }
        .pesquisa-filter-status { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: -8px 0 20px; }
        .pesquisa-filter-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px; }
        .pesquisa-filter-stat strong { display: block; font-size: 17px; color: #0f172a; font-family: var(--nx-font-display); line-height: 1; }
        .pesquisa-filter-stat span { display: block; margin-top: 5px; font-size: 10px; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }
        .pesquisa-filter-group { margin-bottom: 24px; }
        .pesquisa-filter-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--nx-text-sub); margin-bottom: 12px; }

        .pesquisa-filter-input { width: 100%; padding: 12px 14px; border: 1px solid var(--nx-input-border); border-radius: var(--nx-radius-sm); font-size: 14px; font-family: var(--nx-font-body); color: var(--nx-text); outline: none; background: var(--nx-input-bg); box-sizing: border-box; transition: all 0.2s ease; }
        .pesquisa-filter-input:focus { border-color: var(--nx-accent-car); }

        .pesquisa-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pesquisa-tag { padding: 8px 12px; border: 1px solid var(--nx-border); border-radius: 6px; background: var(--nx-bg-3); font-size: 12px; font-weight: 600; cursor: pointer; color: var(--nx-text-sub); transition: all 0.2s ease; flex: 1 1 calc(50% - 8px); text-align: center; }
        .pesquisa-tag:hover { background: var(--nx-border); color: var(--nx-text); }
        .pesquisa-tag.active { background: ${accent}; color: #040711; border-color: ${accent}; }

        .pesquisa-apply-btn { width: 100%; padding: 14px; background: var(--nx-text); color: var(--nx-bg); border: none; border-radius: var(--nx-radius-sm); font-family: var(--nx-font-body); font-weight: 800; font-size: 13px; cursor: pointer; transition: opacity 0.2s ease; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 8px; }
        .pesquisa-apply-btn:hover { opacity: 0.85; }

        .pesquisa-main-content { flex: 1; min-width: 0; display: flex; flex-direction: column; }

        .pesquisa-command {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: 22px 24px;
          margin-bottom: 18px;
          box-shadow: 0 18px 40px -30px rgba(15,23,42,0.35);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 20px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .pesquisa-command::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: ${accent}; }
        .pesquisa-command-kicker { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
        .pesquisa-command h1 { margin: 0; font-size: clamp(24px, 3vw, 34px); line-height: 1.08; letter-spacing: -0.02em; color: #0f172a; }
        .pesquisa-command p { margin: 8px 0 0; color: #64748b; font-size: 14px; line-height: 1.6; max-width: 640px; }
        .pesquisa-command-metrics { display: grid; grid-template-columns: repeat(2, 118px); gap: 10px; }
        .pesquisa-command-metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 12px; }
        .pesquisa-command-metric strong { display: block; font-family: var(--nx-font-display); font-size: 22px; line-height: 1; color: #0f172a; }
        .pesquisa-command-metric span { display: block; margin-top: 6px; color: #64748b; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; }

        .pesquisa-search-row { display: flex; gap: 12px; align-items: stretch; margin-bottom: 24px; }
        .pesquisa-search-row .pesquisa-omnibar-wrapper { margin-bottom: 0; flex: 1; }

        .pesquisa-omnibar-wrapper { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: var(--nx-radius-md); display: flex; align-items: center; padding: 10px 20px; box-shadow: 0 10px 26px -24px rgba(15,23,42,0.45); }
        .pesquisa-omnibar-wrapper:focus-within { border-color: ${accent}; box-shadow: 0 0 0 3px rgba(42,193,180,0.12); }
        .pesquisa-omnibar-wrapper input { flex: 1; border: none; padding: 8px; font-size: 15px; color: var(--nx-text); outline: none; background: transparent; }

        .pesquisa-mobile-filter-btn { display: none; align-items: center; gap: 6px; padding: 0 18px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-md); color: var(--nx-text); font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; flex-shrink: 0; }

        .pesquisa-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .pesquisa-results-count { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 900; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 999px; padding: 8px 11px; text-transform: uppercase; letter-spacing: .06em; }
        .pesquisa-sort { border: 1px solid #e2e8f0; background: #ffffff; border-radius: 12px; padding: 10px 34px 10px 12px; font-family: var(--nx-font-body); font-size: 13px; font-weight: 800; color: var(--nx-text); cursor: pointer; outline: none; }
        .pesquisa-active-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin: -8px 0 22px; min-height: 34px; }
        .pesquisa-active-chip { display: inline-flex; align-items: center; gap: 6px; border: 1px solid #dbeafe; background: #eff6ff; color: #2563eb; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; }
        .pesquisa-clear-btn { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #64748b; border: 1px solid #e2e8f0; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; cursor: pointer; }
        .pesquisa-clear-btn:hover { border-color: #cbd5e1; color: #0f172a; }

        .pesquisa-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 24px; }

        .pesquisa-root { background: var(--nx-bg); }
        .pesquisa-layout {
          max-width: 1480px;
          padding: 28px;
          gap: 18px;
        }
        .pesquisa-sidebar {
          background: rgba(255,255,255,0.92);
          border-color: rgba(226,232,240,0.92);
          border-radius: 18px;
          box-shadow: 0 28px 70px -52px rgba(15,23,42,0.8);
        }
        .pesquisa-sidebar-toggle {
          background: rgba(255,255,255,0.92);
          border-color: rgba(226,232,240,0.92);
          box-shadow: 0 16px 34px -30px rgba(15,23,42,0.6);
        }
        .pesquisa-command {
          background: #ffffff;
          border-color: #e2e8f0;
          color: #0f172a;
          border-radius: 18px;
          box-shadow: 0 22px 54px -44px rgba(15,23,42,0.45);
        }
        .pesquisa-command::before { width: 4px; }
        .pesquisa-command-kicker { color: #64748b; }
        .pesquisa-command h1 { color: #0f172a; }
        .pesquisa-command p { color: #64748b; }
        .pesquisa-command-metric {
          background: #f8fafc;
          border-color: #e2e8f0;
        }
        .pesquisa-command-metric strong { color: #0f172a; }
        .pesquisa-command-metric span { color: #64748b; }
        .pesquisa-search-row {
          background: rgba(255,255,255,0.94);
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 10px;
          box-shadow: 0 22px 54px -46px rgba(15,23,42,0.7);
        }
        .pesquisa-omnibar-wrapper {
          border: none;
          box-shadow: none;
          background: #f8fafc;
        }
        .pesquisa-topbar {
          gap: 16px;
          flex-wrap: wrap;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 12px 14px;
          box-shadow: 0 18px 42px -36px rgba(15,23,42,0.45);
        }
        .pesquisa-view-tools {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pesquisa-view-switch {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #f8fafc;
        }
        .pesquisa-view-switch button {
          min-height: 36px;
          border: none;
          border-radius: 10px;
          padding: 0 12px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          color: #64748b;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }
        .pesquisa-view-switch button:hover { color: #0f172a; }
        .pesquisa-view-switch button.active {
          background: ${accent};
          color: #020617;
          box-shadow: 0 8px 18px -14px ${accent};
        }
        .pesquisa-alert-btn {
          min-height: 44px;
          border: 1px solid rgba(42,193,180,.24);
          border-radius: 14px;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #0f172a;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 12px 24px -22px rgba(15,23,42,.5);
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }
        .pesquisa-alert-btn:hover:not(:disabled) { transform: translateY(-1px); border-color: ${accent}; background: rgba(42,193,180,.06); }
        .pesquisa-alert-btn:disabled { opacity: .65; cursor: wait; }
        .pesquisa-alert-feedback {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(16,185,129,.18);
          background: rgba(16,185,129,.08);
          color: #047857;
          border-radius: 999px;
          padding: 8px 11px;
          font-size: 12px;
          font-weight: 800;
        }
        .pesquisa-map-shell {
          position: relative;
          height: min(720px, calc(100vh - 260px));
          min-height: 520px;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          background: #e2e8f0;
          box-shadow: 0 24px 64px -46px rgba(15,23,42,0.55);
        }
        .pesquisa-map-empty {
          position: absolute;
          left: 50%;
          top: 22px;
          transform: translateX(-50%);
          z-index: 500;
          background: rgba(15,23,42,0.88);
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 14px 30px -20px rgba(0,0,0,0.9);
        }
        .pesquisa-map-loading {
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--nx-bg-2);
          color: var(--nx-text-sub);
          font-size: 13px;
          font-weight: 800;
        }

        .dark .pesquisa-root { background: #020617; }
        .dark .pesquisa-sidebar,
        .dark .pesquisa-sidebar-toggle,
        .dark .pesquisa-search-row,
        .dark .pesquisa-topbar {
          background: rgba(15, 23, 42, 0.94) !important;
          border-color: rgba(71, 85, 105, 0.8) !important;
          box-shadow: 0 24px 64px -48px rgba(0,0,0,0.95) !important;
        }
        .dark .pesquisa-omnibar-wrapper,
        .dark .pesquisa-filter-stat,
        .dark .pesquisa-view-switch,
        .dark .pesquisa-results-count,
        .dark .pesquisa-sort,
        .dark .pesquisa-clear-btn,
        .dark .pesquisa-active-chip,
        .dark .pesquisa-alert-btn {
          background: rgba(30, 41, 59, 0.92) !important;
          border-color: rgba(71, 85, 105, 0.9) !important;
          color: #e2e8f0 !important;
        }
        .dark .pesquisa-filter-stat strong,
        .dark .pesquisa-command h1,
        .dark .pesquisa-command-metric strong {
          color: #f8fafc !important;
        }
        .dark .pesquisa-filter-stat span,
        .dark .pesquisa-command-kicker,
        .dark .pesquisa-command p,
        .dark .pesquisa-command-metric span {
          color: #94a3b8 !important;
        }
        .dark .pesquisa-view-switch button,
        .dark .pesquisa-filter-title,
        .dark .pesquisa-tag {
          color: #cbd5e1 !important;
        }
        .dark .pesquisa-view-switch button:hover,
        .dark .pesquisa-clear-btn:hover {
          color: #ffffff !important;
        }
        .dark .pesquisa-view-switch button.active,
        .dark .pesquisa-tag.active {
          color: #020617 !important;
        }
        .dark .pesquisa-map-shell {
          background: #0f172a;
          border-color: #334155;
          box-shadow: 0 28px 70px -48px rgba(0,0,0,0.95);
        }

        .sidebar-mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(15,23,42,0.48); z-index: 9998; backdrop-filter: none; }

        @media (max-width: 1024px) {
          .pesquisa-layout { padding: 24px 16px; flex-direction: column; }
          .pesquisa-sidebar { position: fixed; top: 0; left: ${sidebarMobileAberta ? '0' : '-100%'}; height: 100dvh; max-height: 100dvh; overflow-y: auto; overscroll-behavior: contain; border-radius: 0 14px 14px 0; z-index: 9999; transition: left 0.24s ease; width: min(88vw, 380px); max-width: 380px; opacity: 1; box-sizing: border-box; }
          .pesquisa-sidebar.collapsed { width: min(88vw, 380px); max-width: 380px; padding: 24px; border: 1px solid var(--nx-border); opacity: 1; pointer-events: auto; }
          .pesquisa-sidebar-header { position: sticky; top: -24px; z-index: 2; margin: -24px -24px 20px; padding: 16px 18px; background: #ffffff; }
          .pesquisa-sidebar-close { display: inline-flex; }
          .pesquisa-apply-btn { position: sticky; bottom: -24px; z-index: 2; margin: 18px -24px -24px; width: calc(100% + 48px); border-radius: 0; min-height: 54px; }
          .sidebar-mobile-overlay { display: ${sidebarMobileAberta ? 'block' : 'none'}; }
          .pesquisa-sidebar-toggle { display: none; }
          .pesquisa-mobile-filter-btn { display: inline-flex; }
          .pesquisa-main-content { width: 100%; }
          .pesquisa-command { grid-template-columns: 1fr; }
          .pesquisa-command-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 640px) {
          .pesquisa-layout { padding: 18px 10px 34px; gap: 14px; }
          .pesquisa-sidebar { width: min(88vw, 360px); padding: 20px; }
          .pesquisa-sidebar.collapsed { width: min(88vw, 360px); padding: 20px; }
          .pesquisa-sidebar-header { top: -20px; margin: -20px -20px 18px; padding: 15px 16px; }
          .pesquisa-apply-btn { bottom: -20px; margin: 18px -20px -20px; width: calc(100% + 40px); }
          .pesquisa-search-row { display: grid; grid-template-columns: 1fr; padding: 8px; }
          .pesquisa-mobile-filter-btn { min-height: 44px; justify-content: center; }
          .pesquisa-topbar { align-items: stretch; }
          .pesquisa-results-count { justify-content: center; width: 100%; box-sizing: border-box; }
          .pesquisa-view-tools { width: 100%; display: grid; grid-template-columns: 1fr; }
          .pesquisa-view-switch { width: 100%; box-sizing: border-box; }
          .pesquisa-view-switch button { flex: 1; justify-content: center; }
          .pesquisa-alert-btn, .pesquisa-sort { width: 100%; justify-content: center; min-height: 44px; box-sizing: border-box; }
          .pesquisa-grid { gap: 16px; }
          .pesquisa-map-shell { height: calc(100vh - 220px); min-height: 420px; border-radius: 14px; }
        }

        .pesquisa-empty { text-align: center; padding: 100px 20px; color: var(--nx-text-sub); }
        .pesquisa-empty-action { margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 18px; border-radius: 12px; background: ${accent}; color: #020617; text-decoration: none; font-size: 13px; font-weight: 900; }
        .pesquisa-empty-action:hover { filter: brightness(0.96); }
        .infinite-spinner-container { text-align: center; padding: 40px 0; font-size: 13px; color: var(--nx-text-sub); font-weight: 500; grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--nx-text-sub); border-radius: 50%; display: inline-block; animation: pulse 0.6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: 0.2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }
      `}</style>

      <div className="pesquisa-root">
        <div className="sidebar-mobile-overlay" onClick={() => setSidebarMobileAberta(false)} aria-hidden="true"></div>

        <div className={`pesquisa-layout vista-${vistaAtiva}`}>

          <aside className={`pesquisa-sidebar${isSidebarOpen ? '' : ' collapsed'}`} role={sidebarMobileAberta ? 'dialog' : undefined} aria-label="Filtros de pesquisa" aria-modal={sidebarMobileAberta ? 'true' : undefined}>
            <div className="pesquisa-sidebar-header">
              <span className="pesquisa-sidebar-title">
                <Icon path={mdiFilterVariant} size={1} /> Filtros
              </span>
              <button type="button" className="pesquisa-sidebar-close" onClick={() => setSidebarMobileAberta(false)} aria-label="Fechar filtros">
                <Icon path={mdiCloseCircleOutline} size={0.85} /> Fechar
              </button>
            </div>
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
              <>
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Tipo de imovel</div>
                <div className="pesquisa-tags">
                  {TIPOS_IMOVEL.map(tipo => (
                    <button key={tipo.value} type="button" className={`pesquisa-tag ${(filtros.tiposImovel || []).includes(tipo.value) ? 'active' : ''}`} onClick={() => toggleTag('tiposImovel', tipo.value)}>{tipo.label}</button>
                  ))}
                </div>
              </div>
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Tipologias disponíveis</div>
                <div className="pesquisa-tags">
                  {TIPOLOGIAS.map(val => (
                    <button key={val} type="button" className={`pesquisa-tag ${filtros.tipologias.includes(val) ? 'active' : ''}`} onClick={() => toggleTag('tipologias', val)}>{val}</button>
                  ))}
                </div>
              </div>
              </>
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
                {loading && <Icon path={mdiLoading} size={0.9} color={accent} className="animate-spin" />}
              </div>
            </div>

            <div className="pesquisa-active-row">
              {filtrosAtivos.length > 0 ? (
                <>
                  {filtrosAtivos.slice(0, 7).map((filtro) => (
                    <span className="pesquisa-active-chip" key={filtro}>
                      <Icon path={mdiShieldCheckOutline} size={0.55} /> {filtro}
                    </span>
                  ))}
                  {filtrosAtivos.length > 7 && <span className="pesquisa-active-chip">+{filtrosAtivos.length - 7}</span>}
                  <button type="button" className="pesquisa-clear-btn" onClick={limparFiltros}>
                    <Icon path={mdiCloseCircleOutline} size={0.6} /> Limpar
                  </button>
                </>
              ) : (
                <span className="pesquisa-active-chip" style={{ background: '#f8fafc', color: '#64748b', borderColor: '#e2e8f0' }}>
                  <Icon path={mdiChartTimelineVariant} size={0.6} /> Exploração livre
                </span>
              )}
            </div>

            {error && <div style={{ color: 'var(--nx-danger)', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '24px' }}>{error}</div>}

            {/* ── BANNER CTA ── */}
            {/* Remove esta linha e substitui por {!user && <BannerCTA tipo={tipoSeguro} origem={location.pathname} />} se tiveres contexto de autenticação */}
            <div className="pesquisa-topbar">
              <div className="pesquisa-results-count">{loading && resultados.length === 0 ? 'A procurar...' : `${totalResultados} registos`}</div>
              <div className="pesquisa-view-tools">
                <div className="pesquisa-view-switch" aria-label="Alternar vista">
                  <button type="button" className={vistaAtiva === 'grelha' ? 'active' : ''} onClick={() => setVistaAtiva('grelha')}>
                    <Icon path={mdiViewGrid} size={0.72} /> Grelha
                  </button>
                  <button type="button" className={vistaAtiva === 'mapa' ? 'active' : ''} onClick={() => setVistaAtiva('mapa')}>
                    <Icon path={mdiMap} size={0.72} /> Mapa
                  </button>
                </div>
                <button type="button" className="pesquisa-alert-btn" onClick={guardarAlertaPesquisa} disabled={guardandoAlerta}>
                  <Icon path={mdiBellPlusOutline} size={0.72} />
                  {guardandoAlerta ? 'A guardar...' : 'Criar alerta'}
                </button>
              <select className="pesquisa-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="relevancia" style={{ background: 'var(--nx-bg-2)' }}>Relevância</option>
                <option value="preco_asc" style={{ background: 'var(--nx-bg-2)' }}>Preço: Mais Baixo</option>
                <option value="preco_desc" style={{ background: 'var(--nx-bg-2)' }}>Preço: Mais Alto</option>
              </select>
              </div>
            </div>

            {feedbackAlerta && (
              <div className="pesquisa-active-row" style={{ marginTop: '-12px' }}>
                <span className="pesquisa-alert-feedback">{feedbackAlerta}</span>
              </div>
            )}

            <SponsorBanner
              placement="search_results_top"
              vertical={tipoSeguro}
              className="!my-6 !px-0"
              fallback={<GoogleAdSlot placement="search_results_top" className="!my-6 !px-0" minHeight={96} />}
            />

            {vistaAtiva === 'mapa' ? (
              <div className="pesquisa-map-shell">
                <Suspense fallback={<div className="pesquisa-map-loading">A carregar mapa...</div>}>
                  <MapaResultados anuncios={dadosMapa} tipo={tipoSeguro} />
                </Suspense>
                {dadosMapa.length === 0 && !loading && (
                  <div className="pesquisa-map-empty">
                    Sem resultados com coordenadas para mostrar no mapa.
                  </div>
                )}
              </div>
            ) : (
            <div className="pesquisa-grid">
              {resultados.map(anuncio => <AnuncioCard key={anuncio._id} anuncio={anuncio} showStatus={false} />)}
              {temMais && !loading && resultados.length > 0 && (
                <div ref={sentinelaRef} className="infinite-spinner-container">
                  <div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div>
                </div>
              )}
            </div>
            )}

            {vistaAtiva === 'grelha' && loadingMais && (
              <div className="infinite-spinner-container" style={{ marginTop: '24px' }}>
                <div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div>
              </div>
            )}

            {vistaAtiva === 'grelha' && !loading && resultados.length === 0 && (
              <div className="pesquisa-empty">
                <div style={{ fontSize: '32px', color: 'var(--nx-text-muted)', marginBottom: '16px' }}>&empty;</div>
                <h3 style={{ fontFamily: 'var(--nx-font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--nx-text)', margin: '0 0 8px 0' }}>{tipoSeguro === 'carro' ? 'Ainda não há carros ativos no Drive' : 'Ainda não há imóveis ativos no Estate'}</h3>
                <p style={{ fontSize: '14px', margin: 0 }}>{filtrosAtivos.length > 0 ? 'Tenta limpar alguns filtros na barra lateral.' : 'Quando houver anúncios ativos, aparecem aqui automaticamente.'}</p>
                <Link to="/publicar" state={publicarState} className="pesquisa-empty-action">Publicar anúncio</Link>
              </div>
            )}
          </main>
        </div>

      </div>
    </>
    </>
  );
}
