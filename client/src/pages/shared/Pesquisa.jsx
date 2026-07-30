import React, { Suspense, lazy, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import Seo from '../../components/Seo';
import api from '../../services/api';
import AnuncioCard from './AnuncioCard';
import AdBanner from '../../components/AdBanner';
import useDebounce from '../../hooks/useDebounce';
import Fuse from 'fuse.js';
import { Icon } from '@mdi/react';
import {
  mdiMap, mdiViewGrid, mdiMagnify, mdiLoading, mdiFilterVariant, mdiChevronLeft,
  mdiChevronRight, mdiShieldCheckOutline, mdiCloseCircleOutline
} from '@mdi/js';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS_CIDADES_PT, DISTRITOS } from '../../data/localizacoes';
import { publishIntentState } from '../../utils/navigationState';
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
const TIPOS_VEICULO = [
  { value: 'citadino', label: 'Citadino' },
  { value: 'utilitario', label: 'Utilitário' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'carrinha', label: 'Carrinha' },
  { value: 'suv', label: 'SUV' },
  { value: 'crossover', label: 'Crossover' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'cabrio', label: 'Cabrio' },
  { value: 'monovolume', label: 'Monovolume' },
  { value: 'pickup', label: 'Pick-up' },
  { value: 'comercial', label: 'Comercial' },
];

const MapaResultados = lazy(() => import('../../components/imoveis/MapaResultados'));
const dividirParamLista = (valor) => String(valor || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);
const formatarNumero = (valor) => Number(valor).toLocaleString('pt-PT');
const normalizarModeloPesquisa = (modelo) => (typeof modelo === 'object' ? modelo.modelo || modelo.nome || '' : modelo);


export default function Pesquisa({ tipoPadrao = 'imovel', seoParams = null }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

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
    precoMin: getParam('precoMin'),
    precoMax: getParam('precoMax'),
    distrito: getParam('distrito') || 'Todos',
    cidade: getParam('cidade'),
    marca: marcaInicial,
    modelo: getParam('modelo'),
    tiposImovel: dividirParamLista(getParam('tipoImovel')),
    tipologias: dividirParamLista(getParam('tipologia')),
    combustiveis: dividirParamLista(getParam('combustivel')),
    transmissao: dividirParamLista(getParam('transmissao')),
    tipoVeiculo: dividirParamLista(getParam('tipoVeiculo')),
    anoMin: getParam('anoMin'),
    anoMax: getParam('anoMax'),
    kmMax: getParam('kmMax'),
    potenciaMin: getParam('potenciaMin'),
    potenciaMax: getParam('potenciaMax'),
    areaMin: getParam('areaMin'),
    quartosMin: getParam('quartosMin'),
    garantia: getParam('garantia') === 'true',
    aceitaRetoma: getParam('aceitaRetoma') === 'true',
    garagem: getParam('garagem') === 'true',
    tipoAnunciante: getParam('tipoAnunciante'),
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
  const [searchFocused, setSearchFocused] = useState(false);
  const [temMais, setTemMais] = useState(false);

  const [sidebarMobileAberta, setSidebarMobileAberta] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [vistaAtiva, setVistaAtiva] = useState('grelha');

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
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const atualizarViewport = () => setIsMobileViewport(mediaQuery.matches);
    atualizarViewport();
    mediaQuery.addEventListener('change', atualizarViewport);
    return () => mediaQuery.removeEventListener('change', atualizarViewport);
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

  const adicionarFiltrosAosParams = useCallback((params, filtrosAtuais, tipoFinal) => {
    if (filtrosAtuais.precoMin) params.set('precoMin', filtrosAtuais.precoMin);
    if (filtrosAtuais.precoMax) params.set('precoMax', filtrosAtuais.precoMax);
    if (filtrosAtuais.distrito && filtrosAtuais.distrito !== 'Todos') params.set('distrito', filtrosAtuais.distrito);
    if (filtrosAtuais.cidade) params.set('cidade', filtrosAtuais.cidade);
    if (filtrosAtuais.garantia) params.set('garantia', 'true');
    if (filtrosAtuais.aceitaRetoma) params.set('aceitaRetoma', 'true');
    if (filtrosAtuais.tipoAnunciante) params.set('tipoAnunciante', filtrosAtuais.tipoAnunciante);

    if (tipoFinal === 'carro') {
      if (filtrosAtuais.marca) params.set('marca', filtrosAtuais.marca);
      if (filtrosAtuais.modelo) params.set('modelo', filtrosAtuais.modelo);
      if (filtrosAtuais.combustiveis.length) params.set('combustivel', filtrosAtuais.combustiveis.join(','));
      if (filtrosAtuais.transmissao.length) params.set('transmissao', filtrosAtuais.transmissao.join(','));
      if (filtrosAtuais.tipoVeiculo.length) params.set('tipoVeiculo', filtrosAtuais.tipoVeiculo.join(','));
      if (filtrosAtuais.anoMin) params.set('anoMin', filtrosAtuais.anoMin);
      if (filtrosAtuais.anoMax) params.set('anoMax', filtrosAtuais.anoMax);
      if (filtrosAtuais.kmMax) params.set('kmMax', filtrosAtuais.kmMax);
      if (filtrosAtuais.potenciaMin) params.set('potenciaMin', filtrosAtuais.potenciaMin);
      if (filtrosAtuais.potenciaMax) params.set('potenciaMax', filtrosAtuais.potenciaMax);
    }

    if (tipoFinal === 'imovel') {
      if (filtrosAtuais.tipologias.length) params.set('tipologia', filtrosAtuais.tipologias.join(','));
      if (filtrosAtuais.tiposImovel?.length) params.set('tipoImovel', filtrosAtuais.tiposImovel.join(','));
      if (filtrosAtuais.areaMin) params.set('areaMin', filtrosAtuais.areaMin);
      if (filtrosAtuais.quartosMin) params.set('quartosMin', filtrosAtuais.quartosMin);
      if (filtrosAtuais.garagem) params.set('garagem', 'true');
    }
  }, []);
  const carregarDadosMapa = useCallback(async () => {
    try {
      const filtrosAtuais = filtrosRef.current;
      const buscaAtual = buscaRef.current;
      const tipoFinal = filtrosAtuais.tipo || tipoSeguro;

      const params = new URLSearchParams();
      params.set('tipo', tipoFinal);
      adicionarFiltrosAosParams(params, filtrosAtuais, tipoFinal);

      if (buscaAtual && buscaAtual.trim()) {
        params.set('q', buscaAtual.trim());
      }

      const { data } = await api.get(`/anuncios/pesquisa/mapa?${params.toString()}`);
      setDadosMapa(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('Erro ao carregar mapa:', err);
    }
  }, [adicionarFiltrosAosParams, tipoSeguro]);
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

      params.set('tipo', tipoFinal);
      params.set('page', paginaAlvo);
      params.set('limit', limite);
      params.set('sort', sortAtual);
      adicionarFiltrosAosParams(params, filtrosAtuais, tipoFinal);

      if (buscaAtual && buscaAtual.trim()) params.set('q', buscaAtual.trim());

      const { data } = await api.get(`/anuncios?${params.toString()}`);
      const listaAnuncios = data.anuncios || (Array.isArray(data) ? data : []);
      const contagemAnuncios = data.totalAnuncios !== undefined ? data.totalAnuncios : listaAnuncios.length;

      if (acumular) setResultados(prev => [...prev, ...listaAnuncios]); else setResultados(listaAnuncios);
      setTotalResultados(contagemAnuncios);
      const maisDisponivel = listaAnuncios.length === limite;
      setTemMais(maisDisponivel);
      if (maisDisponivel) paginaRef.current = paginaAlvo;

    } catch { setError('Não conseguimos carregar novos anúncios neste momento.'); setTemMais(false);
    } finally { setLoading(false); setLoadingMais(false); isFetchingRef.current = false; }
  }, [adicionarFiltrosAosParams, tipoPadrao, location.pathname]);
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
    filtros.precoMin,
    filtros.precoMax,
    filtros.distrito,
    filtros.cidade,
    filtros.marca,
    filtros.modelo,
    filtros.tiposImovel,
    filtros.tipologias,
    filtros.combustiveis,
    filtros.transmissao,
    filtros.tipoVeiculo,
    filtros.anoMin,
    filtros.anoMax,
    filtros.kmMax,
    filtros.potenciaMin,
    filtros.potenciaMax,
    filtros.areaMin,
    filtros.quartosMin,
    filtros.garantia,
    filtros.aceitaRetoma,
    filtros.garagem,
    filtros.tipoAnunciante,
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
  const accent = tipoSeguro === 'imovel' ? '#697446' : 'var(--nx-gold)';
  const accentText = tipoSeguro === 'imovel' ? '#ffffff' : '#071326';
  const accentSoft = tipoSeguro === 'imovel' ? 'rgba(105,116,70,.18)' : 'rgba(217,196,156,.18)';
  const sidebarHidden = isMobileViewport ? !sidebarMobileAberta : !isSidebarOpen;

  const filtrosAtivos = [
    filtros.precoMin && `Desde ${formatarNumero(filtros.precoMin)} EUR`,
    filtros.precoMax && `Até ${formatarNumero(filtros.precoMax)} EUR`,
    filtros.distrito !== 'Todos' && filtros.distrito,
    filtros.cidade,
    filtros.marca,
    filtros.modelo,
    ...((filtros.tiposImovel || []).map(tipo => TIPOS_IMOVEL.find(item => item.value === tipo)?.label || tipo)),
    ...filtros.tipologias,
    ...filtros.combustiveis,
    ...filtros.transmissao,
    ...((filtros.tipoVeiculo || []).map(tipo => TIPOS_VEICULO.find(item => item.value === tipo)?.label || tipo)),
    filtros.anoMin && `Ano desde ${filtros.anoMin}`,
    filtros.anoMax && `Ano até ${filtros.anoMax}`,
    filtros.kmMax && `Até ${formatarNumero(filtros.kmMax)} km`,
    filtros.potenciaMin && `Desde ${filtros.potenciaMin} cv`,
    filtros.potenciaMax && `Até ${filtros.potenciaMax} cv`,
    filtros.areaMin && `Desde ${formatarNumero(filtros.areaMin)} m²`,
    filtros.quartosMin && `${filtros.quartosMin}+ quartos`,
    filtros.garantia && 'Com garantia',
    filtros.aceitaRetoma && 'Aceita retoma',
    filtros.garagem && 'Com garagem',
    filtros.tipoAnunciante === 'profissional' && 'Profissional',
    filtros.tipoAnunciante === 'particular' && 'Particular',
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
      tipoVeiculo: [],
      anoMin: '',
      anoMax: '',
      kmMax: '',
      potenciaMin: '',
      potenciaMax: '',
      areaMin: '',
      quartosMin: '',
      garantia: false,
      aceitaRetoma: false,
      garagem: false,
      tipoAnunciante: '',
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


  const pesquisaPlaceholder = tipoSeguro === 'carro'
    ? 'Marca, modelo, distrito ou palavra-chave...'
    : 'Tipologia, cidade, característica ou palavra-chave...';

  const opcoesPesquisa = useMemo(() => {
    const opcoes = [];

    if (tipoSeguro === 'carro') {
      MARCAS.forEach((marca) => {
        opcoes.push({ label: marca, detail: 'Marca automóvel', patch: { marca, modelo: '' } });
        getModelosPorMarca(marca).forEach((modeloOriginal) => {
          const modelo = normalizarModeloPesquisa(modeloOriginal);
          if (!modelo) return;
          opcoes.push({ label: `${marca} ${modelo}`, detail: 'Modelo automóvel', patch: { marca, modelo } });
        });
      });
    } else {
      TIPOS_IMOVEL.forEach((tipo) => opcoes.push({ label: tipo.label, detail: 'Tipo de imóvel', patch: { tiposImovel: [tipo.value] } }));
      TIPOLOGIAS.forEach((tipologia) => opcoes.push({ label: tipologia, detail: 'Tipologia', patch: { tipologias: [tipologia] } }));
    }

    DISTRITOS.forEach((distrito) => {
      opcoes.push({ label: distrito, detail: 'Distrito', patch: { distrito, cidade: '' } });
      (DISTRITOS_CIDADES_PT[distrito] || []).forEach((cidade) => {
        opcoes.push({ label: cidade, detail: `${distrito} · cidade`, patch: { distrito, cidade } });
      });
    });

    return opcoes;
  }, [tipoSeguro]);

  const fusePesquisa = useMemo(() => new Fuse(opcoesPesquisa, {
    keys: ['label', 'detail'],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2,
  }), [opcoesPesquisa]);

  const sugestoesPesquisa = useMemo(() => {
    const termo = searchQuery.trim();
    if (termo.length < 2) return [];
    return fusePesquisa.search(termo).slice(0, 7).map((resultado) => resultado.item);
  }, [fusePesquisa, searchQuery]);

  const aplicarFiltrosInstantaneos = useCallback((patch, novaBusca = '') => {
    const proximosFiltros = { ...filtrosRef.current, ...patch, tipo: tipoSeguro };
    filtrosRef.current = proximosFiltros;
    buscaRef.current = novaBusca;
    setFiltros(proximosFiltros);
    setSearchQuery(novaBusca);
    setSearchFocused(false);
    setTemMais(false);
    setResultados([]);
    paginaRef.current = 1;
    setTimeout(() => { puxarDadosServidor(1, false, tipoSeguro); }, 50);
  }, [puxarDadosServidor, tipoSeguro]);

  const limparFiltroAtivo = useCallback((filtro) => {
    const patch = {};
    let novaBusca = searchQuery;

    if (filtro === `"${searchQuery.trim()}"`) novaBusca = '';
    if (filtro === (filtros.precoMin && `Desde ${formatarNumero(filtros.precoMin)} EUR`)) patch.precoMin = '';
    if (filtro === (filtros.precoMax && `Até ${formatarNumero(filtros.precoMax)} EUR`)) patch.precoMax = '';
    if (filtro === filtros.distrito) { patch.distrito = 'Todos'; patch.cidade = ''; }
    if (filtro === filtros.cidade) patch.cidade = '';
    if (filtro === filtros.marca) { patch.marca = ''; patch.modelo = ''; }
    if (filtro === filtros.modelo) patch.modelo = '';
    if ((filtros.tiposImovel || []).map(tipo => TIPOS_IMOVEL.find(item => item.value === tipo)?.label || tipo).includes(filtro)) {
      patch.tiposImovel = (filtros.tiposImovel || []).filter((tipo) => (TIPOS_IMOVEL.find(item => item.value === tipo)?.label || tipo) !== filtro);
    }
    if (filtros.tipologias.includes(filtro)) patch.tipologias = filtros.tipologias.filter((item) => item !== filtro);
    if (filtros.combustiveis.includes(filtro)) patch.combustiveis = filtros.combustiveis.filter((item) => item !== filtro);
    if (filtros.transmissao.includes(filtro)) patch.transmissao = filtros.transmissao.filter((item) => item !== filtro);
    if ((filtros.tipoVeiculo || []).map(tipo => TIPOS_VEICULO.find(item => item.value === tipo)?.label || tipo).includes(filtro)) {
      patch.tipoVeiculo = (filtros.tipoVeiculo || []).filter((tipo) => (TIPOS_VEICULO.find(item => item.value === tipo)?.label || tipo) !== filtro);
    }
    if (filtro === (filtros.anoMin && `Ano desde ${filtros.anoMin}`)) patch.anoMin = '';
    if (filtro === (filtros.anoMax && `Ano até ${filtros.anoMax}`)) patch.anoMax = '';
    if (filtro === (filtros.kmMax && `Até ${formatarNumero(filtros.kmMax)} km`)) patch.kmMax = '';
    if (filtro === (filtros.potenciaMin && `Desde ${filtros.potenciaMin} cv`)) patch.potenciaMin = '';
    if (filtro === (filtros.potenciaMax && `Até ${filtros.potenciaMax} cv`)) patch.potenciaMax = '';
    if (filtro === (filtros.areaMin && `Desde ${formatarNumero(filtros.areaMin)} m²`)) patch.areaMin = '';
    if (filtro === (filtros.quartosMin && `${filtros.quartosMin}+ quartos`)) patch.quartosMin = '';
    if (filtro === 'Com garantia') patch.garantia = false;
    if (filtro === 'Aceita retoma') patch.aceitaRetoma = false;
    if (filtro === 'Com garagem') patch.garagem = false;
    if (filtro === 'Profissional' || filtro === 'Particular') patch.tipoAnunciante = '';

    aplicarFiltrosInstantaneos(patch, novaBusca);
  }, [aplicarFiltrosInstantaneos, filtros, searchQuery]);

  const aplicarSugestaoPesquisa = useCallback((sugestao) => {
    aplicarFiltrosInstantaneos(sugestao.patch || {}, '');
  }, [aplicarFiltrosInstantaneos]);


  const mostrarSugestoesPesquisa = searchFocused && sugestoesPesquisa.length > 0;
  const totalAnunciosReais = Number(totalResultados || resultados.length || 0);
  const mostrarPublicidadeTopo = !loading && vistaAtiva === 'grelha' && totalAnunciosReais >= 3;
  const mostrarPublicidadeInline = !loading && totalAnunciosReais >= 8;
  const mostrarPublicidadeFundo = !loading && vistaAtiva === 'grelha' && totalAnunciosReais >= 6;

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
        .pesquisa-filter-section { margin-bottom: 16px; padding: 12px; border: 1px solid rgba(226,232,240,.92); border-radius: 16px; background: rgba(248,250,252,.72); }
        .pesquisa-filter-section-title { margin: 0 0 10px; padding: 0 2px; font-size: 11px; font-weight: 950; color: #102f50; text-transform: uppercase; letter-spacing: .08em; }
        .pesquisa-filter-group { margin-bottom: 10px; padding: 0; border: 0; border-radius: 0; background: transparent; }
        .pesquisa-filter-section .pesquisa-filter-group:last-child { margin-bottom: 0; }
        .pesquisa-filter-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .pesquisa-filter-title { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; color: #102f50; margin-bottom: 10px; }

        .pesquisa-filter-input { width: 100%; min-height: 44px; padding: 10px 12px; border: 1px solid var(--nx-input-border); border-radius: 10px; font-size: 13px; font-family: var(--nx-font-body); color: var(--nx-text); outline: none; background: var(--nx-input-bg); box-sizing: border-box; transition: all 0.2s ease; }
        .pesquisa-filter-input:focus { border-color: ${accent}; }

        .pesquisa-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pesquisa-tag { padding: 8px 12px; border: 1px solid var(--nx-border); border-radius: 6px; background: var(--nx-bg-3); font-size: 12px; font-weight: 600; cursor: pointer; color: var(--nx-text-sub); transition: all 0.2s ease; flex: 1 1 calc(50% - 8px); text-align: center; }
        .pesquisa-tag:hover { background: var(--nx-border); color: var(--nx-text); }
        .pesquisa-tag.active { background: ${accent}; color: ${accentText}; border-color: ${accent}; }

        .pesquisa-apply-btn { width: 100%; padding: 14px; background: ${accent}; color: ${accentText}; border: none; border-radius: var(--nx-radius-sm); font-family: var(--nx-font-body); font-weight: 900; font-size: 13px; cursor: pointer; transition: opacity 0.2s ease, transform 0.2s ease; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 8px; }
        .pesquisa-apply-btn:hover { opacity: 0.85; }

        .pesquisa-main-content { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .pesquisa-search-row { display: flex; gap: 12px; align-items: stretch; margin-bottom: 24px; }
        .pesquisa-search-row .pesquisa-search-composer { margin-bottom: 0; flex: 1; }
        .pesquisa-search-composer { position: relative; min-width: 0; }

        .pesquisa-omnibar-wrapper { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: var(--nx-radius-md); display: flex; align-items: center; padding: 10px 20px; box-shadow: 0 10px 26px -24px rgba(15,23,42,0.45); }
        .pesquisa-omnibar-wrapper:focus-within { border-color: ${accent}; box-shadow: 0 0 0 3px ${accentSoft}; }
        .pesquisa-omnibar-wrapper input { flex: 1; border: none; padding: 8px; font-size: 15px; color: var(--nx-text); outline: none; background: transparent; }
        .pesquisa-input-clear { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: transparent; color: #94a3b8; cursor: pointer; }
        .pesquisa-input-clear:hover { background: rgba(15,23,42,.06); color: #0f172a; }
        .pesquisa-suggestions { position: absolute; z-index: 30; top: calc(100% + 8px); left: 0; right: 0; display: grid; gap: 6px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 24px 54px -34px rgba(15,23,42,.45); }
        .pesquisa-suggestion { width: 100%; min-height: 46px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 12px; border: 0; border-radius: 11px; background: transparent; color: #0f172a; cursor: pointer; text-align: left; }
        .pesquisa-suggestion:hover { background: #f8fafc; }
        .pesquisa-suggestion span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 850; }
        .pesquisa-suggestion em { flex-shrink: 0; color: #64748b; font-size: 11px; font-style: normal; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; }

        .pesquisa-mobile-filter-btn { display: none; align-items: center; gap: 6px; padding: 0 18px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-md); color: var(--nx-text); font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; flex-shrink: 0; }

        .pesquisa-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .pesquisa-results-count { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 900; color: #102f50; background: rgba(217,196,156,.14); border: 1px solid rgba(217,196,156,.42); border-radius: 999px; padding: 8px 11px; text-transform: uppercase; letter-spacing: .06em; }
        .pesquisa-root.is-imovel .pesquisa-results-count,
        .pesquisa-root.is-imovel .pesquisa-active-chip { background: rgba(105,116,70,.12); border-color: rgba(105,116,70,.28); color: #3f4f2d; }
        .pesquisa-root.is-imovel .pesquisa-filter-section-title,
        .pesquisa-root.is-imovel .pesquisa-filter-title { color: #3f4f2d; }
        .pesquisa-sort { border: 1px solid #e2e8f0; background: #ffffff; border-radius: 12px; padding: 10px 34px 10px 12px; font-family: var(--nx-font-body); font-size: 13px; font-weight: 800; color: var(--nx-text); cursor: pointer; outline: none; }
        .pesquisa-sort option { background: var(--nx-bg-2); color: var(--nx-text); }
        .pesquisa-active-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin: -8px 0 22px; min-height: 34px; }
        .pesquisa-active-chip { display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(217,196,156,.45); background: rgba(217,196,156,.16); color: #102f50; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; }
        .pesquisa-active-chip.is-removable { cursor: pointer; font-family: inherit; transition: border-color .18s ease, background .18s ease, color .18s ease; }
        .pesquisa-active-chip.is-removable:hover { border-color: rgba(16,47,80,.36); background: rgba(16,47,80,.08); color: #071326; }
        .pesquisa-active-chip span { min-width: 0; max-width: 210px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pesquisa-clear-btn { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #64748b; border: 1px solid #e2e8f0; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; cursor: pointer; }
        .pesquisa-clear-btn:hover { border-color: #cbd5e1; color: #0f172a; }

        .pesquisa-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 24px; }
        .pesquisa-skeleton-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 24px; }
        .pesquisa-skeleton-card { min-height: 360px; border: 1px solid #e2e8f0; border-radius: 18px; background: linear-gradient(110deg, #ffffff 0%, #f8fafc 42%, #ffffff 74%); background-size: 220% 100%; animation: pesquisaSkeleton 1.3s ease-in-out infinite; box-shadow: 0 18px 42px -36px rgba(15,23,42,.36); }
        @keyframes pesquisaSkeleton { from { background-position: 180% 0; } to { background-position: -40% 0; } }

        .pesquisa-root { background: var(--nx-bg); }
        .pesquisa-layout {
          max-width: 1480px;
          padding: 28px;
          gap: 18px;
          transition: max-width .22s ease, padding .22s ease;
        }
        .pesquisa-layout.filters-closed {
          max-width: min(100%, 1760px) !important;
          padding-inline: 28px !important;
        }
        .pesquisa-layout.filters-closed .pesquisa-main-content {
          flex: 1 1 100% !important;
          width: 100% !important;
          max-width: none !important;
        }
        .pesquisa-layout.filters-closed .pesquisa-grid,
        .pesquisa-layout.filters-closed .pesquisa-skeleton-grid {
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 252px), 1fr)) !important;
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
        .dark .pesquisa-root { background: #071326; color: #fffaf0; }
        .dark .pesquisa-sidebar,
        .dark .pesquisa-sidebar-toggle,
        .dark .pesquisa-mobile-filter-btn,
        .dark .pesquisa-search-row,
        .dark .pesquisa-topbar {
          background: #0d1d33 !important;
          border-color: rgba(217,196,156,.22) !important;
          box-shadow: 0 24px 64px -48px rgba(0,0,0,.95) !important;
        }
        .dark .pesquisa-sidebar-header { background: #0d1d33; border-color: rgba(217,196,156,.18); }
        .dark .pesquisa-sidebar-close { background: #071326; border-color: rgba(217,196,156,.22); color: #fffaf0; }
        .dark .pesquisa-omnibar-wrapper,
        .dark .pesquisa-suggestions,
        .dark .pesquisa-filter-stat,
        .dark .pesquisa-view-switch,
        .dark .pesquisa-results-count,
        .dark .pesquisa-sort,
        .dark .pesquisa-clear-btn,
        .dark .pesquisa-active-chip {
          background: #071326 !important;
          border-color: rgba(217,196,156,.22) !important;
          color: #fffaf0 !important;
        }
        .dark .pesquisa-filter-section { background: rgba(7,19,38,.72) !important; border-color: rgba(217,196,156,.18) !important; }
        .dark .pesquisa-filter-section-title { color: #fffaf0 !important; }
        .dark .pesquisa-filter-input {
          background: #071326 !important;
          border-color: rgba(217,196,156,.22) !important;
          color: #fffaf0 !important;
        }
        .dark .pesquisa-filter-input:disabled { color: rgba(255,250,240,.42) !important; background: rgba(7,19,38,.68) !important; }
        .dark .pesquisa-filter-input::placeholder,
        .dark .pesquisa-omnibar-wrapper input::placeholder { color: rgba(255,250,240,.5); }
        .dark .pesquisa-filter-stat strong { color: #fffaf0 !important; }
        .dark .pesquisa-filter-stat span,
        .dark .pesquisa-filter-title,
        .dark .pesquisa-results-count,
        .dark .pesquisa-suggestion em { color: rgba(255,250,240,.66) !important; }
        .dark .pesquisa-active-chip { background: rgba(217,196,156,.12) !important; color: #fffaf0 !important; }
        .dark .pesquisa-active-chip.is-removable:hover { background: rgba(217,196,156,.2) !important; color: #fffaf0 !important; }
        .dark .pesquisa-tag {
          background: rgba(255,250,240,.06) !important;
          border-color: rgba(217,196,156,.18) !important;
          color: rgba(255,250,240,.78) !important;
        }
        .dark .pesquisa-tag:hover,
        .dark .pesquisa-view-switch button:hover,
        .dark .pesquisa-clear-btn:hover { color: #fffaf0 !important; border-color: rgba(217,196,156,.36) !important; }
        .dark .pesquisa-view-switch button { color: rgba(255,250,240,.72) !important; }
        .dark .pesquisa-view-switch button.active,
        .dark .pesquisa-tag.active {
          background: #d9c49c !important;
          border-color: #d9c49c !important;
          color: #071326 !important;
        }
        .dark .pesquisa-apply-btn { background: #d9c49c !important; color: #071326 !important; box-shadow: 0 14px 30px -22px rgba(217,196,156,.9); }
        .dark .pesquisa-map-shell {
          background: #071326;
          border-color: rgba(217,196,156,.22);
          box-shadow: 0 28px 70px -48px rgba(0,0,0,.95);
        }
        .dark .pesquisa-suggestion { color: #fffaf0; }
        .dark .pesquisa-suggestion:hover { background: rgba(217,196,156,.1); }
        .dark .pesquisa-input-clear { color: rgba(255,250,240,.58); }
        .dark .pesquisa-input-clear:hover { background: rgba(217,196,156,.1); color: #fffaf0; }
        .dark .pesquisa-skeleton-card { border-color: rgba(217,196,156,.18); background: linear-gradient(110deg, #071326 0%, #0d1d33 42%, #071326 74%); background-size: 220% 100%; }

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
          .pesquisa-sort { width: 100%; justify-content: center; min-height: 44px; box-sizing: border-box; }
          .pesquisa-grid { gap: 16px; }
          .pesquisa-map-shell { height: calc(100vh - 220px); min-height: 420px; border-radius: 14px; }
        }

        .pesquisa-empty { text-align: center; padding: 100px 20px; color: var(--nx-text-sub); }
        .pesquisa-empty-action { margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 18px; border: 0; border-radius: 12px; background: ${accent}; color: ${accentText}; text-decoration: none; font-family: var(--nx-font-body); font-size: 13px; font-weight: 900; cursor: pointer; }
        .pesquisa-empty-action:hover { filter: brightness(0.96); }
        .infinite-spinner-container { text-align: center; padding: 40px 0; font-size: 13px; color: var(--nx-text-sub); font-weight: 500; grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--nx-text-sub); border-radius: 50%; display: inline-block; animation: pulse 0.6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: 0.2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }
      `}</style>

      <div className={`pesquisa-root is-${tipoSeguro}`}>
        <div className="sidebar-mobile-overlay" onClick={() => setSidebarMobileAberta(false)} aria-hidden="true"></div>

        <div className={`pesquisa-layout vista-${vistaAtiva} ${isSidebarOpen ? 'filters-open' : 'filters-closed'}`}>

          <aside className={`pesquisa-sidebar${isSidebarOpen ? '' : ' collapsed'}`} role={sidebarMobileAberta ? 'dialog' : undefined} aria-label="Filtros de pesquisa" aria-modal={sidebarMobileAberta ? 'true' : undefined} aria-hidden={sidebarHidden} inert={sidebarHidden ? '' : undefined}>
            <div className="pesquisa-sidebar-header">
              <span className="pesquisa-sidebar-title">
                <Icon path={mdiFilterVariant} size={1} /> Filtros
              </span>
              <button type="button" className="pesquisa-sidebar-close" onClick={() => setSidebarMobileAberta(false)} aria-label="Fechar filtros">
                <Icon path={mdiCloseCircleOutline} size={0.85} /> Fechar
              </button>
            </div>
            <div className="pesquisa-filter-status" aria-label="Resumo dos filtros">
              <div className="pesquisa-filter-stat"><strong>{filtrosAtivos.length}</strong><span>ativos</span></div>
              <div className="pesquisa-filter-stat"><strong>{loading && resultados.length === 0 ? '...' : totalResultados}</strong><span>anúncios</span></div>
            </div>
            <div className="pesquisa-filter-section">
              <div className="pesquisa-filter-section-title">Preço e localização</div>
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Orçamento (€)</div>
              <div className="pesquisa-filter-grid-2">
                <input type="number" min="0" className="pesquisa-filter-input" placeholder="Mínimo" value={filtros.precoMin} onChange={(e) => setFiltros(f => ({ ...f, precoMin: e.target.value }))} />
                <input type="number" min="0" className="pesquisa-filter-input" placeholder="Máximo" value={filtros.precoMax} onChange={(e) => setFiltros(f => ({ ...f, precoMax: e.target.value }))} />
              </div>
            </div>

            <div className="pesquisa-filter-group">
              <div className="pesquisa-filter-title">Distrito / Região</div>
              <select className="pesquisa-filter-input" value={filtros.distrito} onChange={(e) => setFiltros(f => ({ ...f, distrito: e.target.value, cidade: '' }))}>
                <option value="Todos">Portugal inteiro</option>
                {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="pesquisa-filter-group">
              <div className="pesquisa-filter-title">Cidade / Concelho</div>
              <select className="pesquisa-filter-input" value={filtros.cidade} onChange={(e) => setFiltros(f => ({ ...f, cidade: e.target.value }))} disabled={!filtros.distrito || filtros.distrito === 'Todos'}>
                <option value="">{filtros.distrito && filtros.distrito !== 'Todos' ? 'Todas as cidades' : 'Escolhe primeiro o distrito'}</option>
                {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              </div>
            </div>

            {tipoSeguro === 'carro' ? (
              <div className="pesquisa-filter-section">
                <div className="pesquisa-filter-section-title">Automóvel</div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Marca</div>
                  <select className="pesquisa-filter-input" value={filtros.marca} onChange={(e) => setFiltros(f => ({ ...f, marca: e.target.value, modelo: '' }))}>
                    <option value="">Todas as marcas</option>
                    {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Modelo</div>
                  <select className="pesquisa-filter-input" value={filtros.modelo} onChange={(e) => setFiltros(f => ({ ...f, modelo: e.target.value }))} disabled={!filtros.marca}>
                    <option value="">{filtros.marca ? 'Todos os modelos' : 'Escolhe primeiro a marca'}</option>
                    {modelosDisponiveis.map((mod, idx) => {
                      const nomeModelo = typeof mod === 'object' ? (mod.modelo || mod.nome || '') : mod;
                      return <option key={`mod-${idx}`} value={nomeModelo}>{nomeModelo}</option>;
                    })}
                  </select>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Ano</div>
                  <div className="pesquisa-filter-grid-2">
                    <input type="number" min="1930" className="pesquisa-filter-input" placeholder="Desde" value={filtros.anoMin} onChange={(e) => setFiltros(f => ({ ...f, anoMin: e.target.value }))} />
                    <input type="number" min="1930" className="pesquisa-filter-input" placeholder="Até" value={filtros.anoMax} onChange={(e) => setFiltros(f => ({ ...f, anoMax: e.target.value }))} />
                  </div>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Quilómetros máximos</div>
                  <input type="number" min="0" className="pesquisa-filter-input" placeholder="Ex: 80000" value={filtros.kmMax} onChange={(e) => setFiltros(f => ({ ...f, kmMax: e.target.value }))} />
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Potência (cv)</div>
                  <div className="pesquisa-filter-grid-2">
                    <input type="number" min="0" className="pesquisa-filter-input" placeholder="Mínima" value={filtros.potenciaMin} onChange={(e) => setFiltros(f => ({ ...f, potenciaMin: e.target.value }))} />
                    <input type="number" min="0" className="pesquisa-filter-input" placeholder="Máxima" value={filtros.potenciaMax} onChange={(e) => setFiltros(f => ({ ...f, potenciaMax: e.target.value }))} />
                  </div>
                </div>                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Combustível</div>
                  <div className="pesquisa-tags">
                    {COMBUSTIVEIS.map(val => (
                      <button key={val} type="button" className={`pesquisa-tag ${filtros.combustiveis.includes(val) ? 'active' : ''}`} onClick={() => toggleTag('combustiveis', val)}>{val}</button>
                    ))}
                  </div>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Tipo de veículo</div>
                  <div className="pesquisa-tags">
                    {TIPOS_VEICULO.map(tipo => (
                      <button key={tipo.value} type="button" className={`pesquisa-tag ${filtros.tipoVeiculo.includes(tipo.value) ? 'active' : ''}`} onClick={() => toggleTag('tipoVeiculo', tipo.value)}>{tipo.label}</button>
                    ))}
                  </div>
                </div>                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Caixa / Transmissão</div>
                  <div className="pesquisa-tags">
                    {TRANSMISSAO.map(val => (
                      <button key={val} type="button" className={`pesquisa-tag ${filtros.transmissao.includes(val) ? 'active' : ''}`} onClick={() => toggleTag('transmissao', val)}>{val}</button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pesquisa-filter-section">
                <div className="pesquisa-filter-section-title">Imóvel</div>
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Tipo de imóvel</div>
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
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Área e quartos</div>
                <div className="pesquisa-filter-grid-2">
                  <input type="number" min="0" className="pesquisa-filter-input" placeholder="Área mín." value={filtros.areaMin} onChange={(e) => setFiltros(f => ({ ...f, areaMin: e.target.value }))} />
                  <input type="number" min="0" className="pesquisa-filter-input" placeholder="Quartos mín." value={filtros.quartosMin} onChange={(e) => setFiltros(f => ({ ...f, quartosMin: e.target.value }))} />
                </div>
              </div>
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Características</div>
                <div className="pesquisa-tags">
                  <button type="button" className={`pesquisa-tag ${filtros.garagem ? 'active' : ''}`} onClick={() => setFiltros(f => ({ ...f, garagem: !f.garagem }))}>Garagem</button>
                </div>
              </div>
              </div>
            )}
            <div className="pesquisa-filter-section">
              <div className="pesquisa-filter-section-title">Confiança</div>
              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Anunciante</div>
              <div className="pesquisa-tags">
                <button type="button" className={`pesquisa-tag ${filtros.garantia ? 'active' : ''}`} onClick={() => setFiltros(f => ({ ...f, garantia: !f.garantia }))}>Com garantia</button>
                {tipoSeguro === 'carro' && <button type="button" className={`pesquisa-tag ${filtros.aceitaRetoma ? 'active' : ''}`} onClick={() => setFiltros(f => ({ ...f, aceitaRetoma: !f.aceitaRetoma }))}>Aceita retoma</button>}
                <button type="button" className={`pesquisa-tag ${filtros.tipoAnunciante === 'profissional' ? 'active' : ''}`} onClick={() => setFiltros(f => ({ ...f, tipoAnunciante: f.tipoAnunciante === 'profissional' ? '' : 'profissional' }))}>Profissional</button>
                <button type="button" className={`pesquisa-tag ${filtros.tipoAnunciante === 'particular' ? 'active' : ''}`} onClick={() => setFiltros(f => ({ ...f, tipoAnunciante: f.tipoAnunciante === 'particular' ? '' : 'particular' }))}>Particular</button>
              </div>
            </div>
            </div>
            <button type="button" className="pesquisa-apply-btn" onClick={ejecutarFiltrosManuais}>Aplicar Filtros</button>
          </aside>

          <button
            type="button"
            className="pesquisa-sidebar-toggle"
            onClick={() => setIsSidebarOpen(prev => !prev)}
            title={isSidebarOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            aria-label={isSidebarOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            aria-expanded={isSidebarOpen}
          >
            <Icon path={isSidebarOpen ? mdiChevronLeft : mdiChevronRight} size={0.9} />
          </button>

          <main className="pesquisa-main-content">

            <div className="pesquisa-search-row">
              <button type="button" className="pesquisa-mobile-filter-btn" onClick={() => setSidebarMobileAberta(true)}>
                <Icon path={mdiFilterVariant} size={0.8} />
                Filtros
              </button>

              <div className="pesquisa-search-composer">
                <div className="pesquisa-omnibar-wrapper">
                  <Icon path={mdiMagnify} size={0.9} color="var(--nx-text-sub)" style={{ marginRight: '12px' }} />
                  <input
                    type="text"
                    placeholder={pesquisaPlaceholder}
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 140)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        aplicarFiltrosInstantaneos({}, event.currentTarget.value);
                      }
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && !loading && (
                    <button type="button" className="pesquisa-input-clear" onMouseDown={(event) => event.preventDefault()} onClick={() => aplicarFiltrosInstantaneos({}, '')} aria-label="Limpar pesquisa">
                      <Icon path={mdiCloseCircleOutline} size={0.7} />
                    </button>
                  )}
                  {loading && <Icon path={mdiLoading} size={0.9} color={accent} className="animate-spin" />}
                </div>

                {mostrarSugestoesPesquisa && (
                  <div className="pesquisa-suggestions" role="listbox" aria-label="Sugestões de pesquisa">
                    {sugestoesPesquisa.map((sugestao) => (
                      <button
                        type="button"
                        className="pesquisa-suggestion"
                        key={`${sugestao.detail}-${sugestao.label}`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => aplicarSugestaoPesquisa(sugestao)}
                      >
                        <span>{sugestao.label}</span>
                        <em>{sugestao.detail}</em>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>


            {filtrosAtivos.length > 0 && (
              <div className="pesquisa-active-row">
                {filtrosAtivos.slice(0, 7).map((filtro) => (
                  <button type="button" className="pesquisa-active-chip is-removable" key={filtro} onClick={() => limparFiltroAtivo(filtro)} title={`Remover ${filtro}`}>
                    <Icon path={mdiShieldCheckOutline} size={0.55} /> <span>{filtro}</span><Icon path={mdiCloseCircleOutline} size={0.56} />
                  </button>
                ))}
                {filtrosAtivos.length > 7 && <span className="pesquisa-active-chip">+{filtrosAtivos.length - 7}</span>}
                <button type="button" className="pesquisa-clear-btn" onClick={limparFiltros}>
                  <Icon path={mdiCloseCircleOutline} size={0.6} /> Limpar
                </button>
              </div>
            )}

            {error && <div style={{ color: '#92400e', padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', fontSize: '14px', fontWeight: 600, border: '1px solid rgba(245, 158, 11, 0.22)', marginBottom: '24px' }}>{error}</div>}

            <div className="pesquisa-topbar">
              <div className="pesquisa-results-count">{loading && resultados.length === 0 ? 'A procurar...' : `${totalResultados} anúncios`}</div>
              <div className="pesquisa-view-tools">
                <div className="pesquisa-view-switch" aria-label="Alternar vista">
                  <button type="button" className={vistaAtiva === 'grelha' ? 'active' : ''} onClick={() => setVistaAtiva('grelha')}>
                    <Icon path={mdiViewGrid} size={0.72} /> Grelha
                  </button>
                  <button type="button" className={vistaAtiva === 'mapa' ? 'active' : ''} onClick={() => setVistaAtiva('mapa')}>
                    <Icon path={mdiMap} size={0.72} /> Mapa
                  </button>
                </div>

              <select className="pesquisa-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="relevancia" style={{ background: 'var(--nx-bg-2)' }}>Relevância</option>
                <option value="recentes" style={{ background: 'var(--nx-bg-2)' }}>Mais recentes</option>
                <option value="preco_asc" style={{ background: 'var(--nx-bg-2)' }}>Preço: Mais baixo</option>
                <option value="preco_desc" style={{ background: 'var(--nx-bg-2)' }}>Preço: Mais alto</option>
                {tipoSeguro === 'carro' && <option value="ano_desc" style={{ background: 'var(--nx-bg-2)' }}>Ano: mais recente</option>}
                {tipoSeguro === 'carro' && <option value="km_asc" style={{ background: 'var(--nx-bg-2)' }}>Km: menor primeiro</option>}
                <option value="qualidade_desc" style={{ background: 'var(--nx-bg-2)' }}>Anúncio mais completo</option>
              </select>
              </div>
            </div>

            {mostrarPublicidadeTopo && (
              <AdBanner
                mode="direct"
                placement={tipoSeguro === 'carro' ? 'listagem_topo_carros' : 'listagem_topo_imoveis'}
                adsensePlacement="listing_top"
                vertical={tipoSeguro}
                className="pesquisa-top-ad"
                minHeight={116}
                mobileMinHeight={72}
              />
            )}

            {vistaAtiva === 'mapa' ? (
              <div className="pesquisa-map-shell">
                <Suspense fallback={<div className="pesquisa-map-loading">A carregar mapa...</div>}>
                  <MapaResultados anuncios={dadosMapa} tipo={tipoSeguro} />
                </Suspense>
                {dadosMapa.length === 0 && !loading && (
                  <div className="pesquisa-map-empty">
                    Os anúncios encontrados ainda não têm localização suficiente para aparecer no mapa.
                  </div>
                )}
              </div>
            ) : loading && resultados.length === 0 ? (
              <div className="pesquisa-skeleton-grid" aria-label="A carregar anúncios">
                {Array.from({ length: 6 }).map((_, index) => <div className="pesquisa-skeleton-card" key={index} />)}
              </div>
            ) : (
              <div className="pesquisa-grid">
                {resultados.map((anuncio, index) => (
                  <React.Fragment key={anuncio._id}>
                    <AnuncioCard anuncio={anuncio} showStatus={false} />
                    {mostrarPublicidadeInline && (index + 1) % 6 === 0 && index < resultados.length - 1 && (
                      <AdBanner
                        mode="direct"
                        placement={tipoSeguro === 'carro' ? 'feed_pesquisa_carros' : 'feed_pesquisa_imoveis'}
                        adsensePlacement="search_results_inline"
                        vertical={tipoSeguro}
                        variant="inline"
                        className="pesquisa-inline-ad"
                        minHeight={104}
                        mobileMinHeight={66}
                      />
                    )}
                  </React.Fragment>
                ))}
                {temMais && !loading && resultados.length > 0 && (
                  <div ref={sentinelaRef} className="infinite-spinner-container">
                    <div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div>
                  </div>
                )}
              </div>
            )}

            {mostrarPublicidadeFundo && (
              <AdBanner
                mode="direct"
                placement={tipoSeguro === 'carro' ? 'listagem_fundo_carros' : 'listagem_fundo_imoveis'}
                adsensePlacement="listing_bottom"
                vertical={tipoSeguro}
                className="pesquisa-bottom-ad"
                minHeight={110}
                mobileMinHeight={70}
              />
            )}

            {vistaAtiva === 'grelha' && loadingMais && (
              <div className="infinite-spinner-container" style={{ marginTop: '24px' }}>
                <div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div><div className="infinite-dot-pulse"></div>
              </div>
            )}

            {vistaAtiva === 'grelha' && !loading && resultados.length === 0 && (
              <div className="pesquisa-empty">
                <div style={{ fontSize: '32px', color: 'var(--nx-text-muted)', marginBottom: '16px' }}>&empty;</div>
                <h3 style={{ fontFamily: 'var(--nx-font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--nx-text)', margin: '0 0 8px 0' }}>{error ? 'Pesquisa temporariamente indisponível' : (tipoSeguro === 'carro' ? 'Não encontrámos carros com estes filtros' : 'Não encontrámos imóveis com estes filtros')}</h3>
                <p style={{ fontSize: '14px', margin: 0 }}>{error ? 'Tenta novamente daqui a instantes.' : (filtrosAtivos.length > 0 ? 'Ajusta a marca, localização ou preço para veres mais opções.' : 'Podes voltar mais tarde ou publicar uma oferta nesta categoria.')}</p>
                {error ? (
                  <button type="button" className="pesquisa-empty-action" onClick={() => puxarDadosServidor(1, false, tipoSeguro)}>Tentar novamente</button>
                ) : (
                  <Link to="/publicar" state={publicarState} className="pesquisa-empty-action">Criar anúncio</Link>
                )}
              </div>
            )}
          </main>
        </div>

      </div>
    </>
    </>
  );
}


