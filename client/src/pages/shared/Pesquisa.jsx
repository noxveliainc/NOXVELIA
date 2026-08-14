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
import { MARCAS, OPCAO_OUTRO_VEICULO, getNomesModelosComOutro, isOpcaoOutroVeiculo, rotuloOpcaoVeiculo } from '../../data/marcasModelos';
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
  const marcaInicial = tipoSeguro === 'carro' && (MARCAS.includes(marcaUrl) || isOpcaoOutroVeiculo(marcaUrl)) ? marcaUrl : '';
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

  const modelosDisponiveis = filtros.marca
    ? (isOpcaoOutroVeiculo(filtros.marca) ? [OPCAO_OUTRO_VEICULO] : getNomesModelosComOutro(filtros.marca))
    : [];
  const cidadesDisponiveis = (filtros.distrito && filtros.distrito !== 'Todos') ? DISTRITOS_CIDADES_PT[filtros.distrito] : [];
  const accent = tipoSeguro === 'imovel' ? '#2ac1b4' : '#3ecf8e';
  const accentText = '#071326';
  const accentSoft = tipoSeguro === 'imovel' ? 'rgba(42,193,180,.18)' : 'rgba(62,207,142,.18)';
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
        getNomesModelosComOutro(marca).forEach((modeloOriginal) => {
          const modelo = normalizarModeloPesquisa(modeloOriginal);
          if (!modelo) return;
          opcoes.push({ label: `${marca} ${rotuloOpcaoVeiculo(modelo, 'modelo')}`, detail: 'Modelo automóvel', patch: { marca, modelo } });
        });
      });
      opcoes.push({ label: 'Outra marca', detail: 'Marca fora da lista', patch: { marca: OPCAO_OUTRO_VEICULO, modelo: '' } });
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
    if (filtro === rotuloOpcaoVeiculo(filtros.marca, 'marca')) { patch.marca = ''; patch.modelo = ''; }
    if (filtro === rotuloOpcaoVeiculo(filtros.modelo, 'modelo')) patch.modelo = '';
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
        .pesquisa-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: var(--cor-texto);
          font-family: var(--nx-font-body);
        }

        .pesquisa-layout {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: clamp(20px, 2vw, 36px);
          padding: clamp(22px, 2.8vw, 46px);
          flex: 1;
          transition: padding .22s ease, gap .22s ease;
        }

        .pesquisa-layout.filters-closed {
          padding-inline: clamp(22px, 3vw, 54px);
        }

        .pesquisa-sidebar {
          width: 320px;
          flex: 0 0 320px;
          position: sticky;
          top: 92px;
          max-height: calc(100vh - 112px);
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 22px;
          border: 1px solid var(--cor-borda);
          border-radius: 22px;
          background: #ffffff;
          transition: width .24s ease, flex-basis .24s ease, padding .24s ease, opacity .18s ease, border-color .18s ease;
        }

        .pesquisa-sidebar.collapsed {
          width: 0;
          flex-basis: 0;
          min-width: 0;
          padding: 0;
          border-color: transparent;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .pesquisa-sidebar::-webkit-scrollbar { width: 6px; }
        .pesquisa-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pesquisa-sidebar::-webkit-scrollbar-thumb { background: var(--cor-borda); border-radius: 999px; }

        .pesquisa-sidebar-toggle {
          flex: 0 0 34px;
          width: 34px;
          height: 52px;
          position: sticky;
          top: 92px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--cor-borda);
          border-radius: 14px;
          background: #ffffff;
          color: var(--cor-navy);
          cursor: pointer;
          transition: border-color .18s ease, background .18s ease, transform .18s ease;
        }

        .pesquisa-sidebar-toggle:hover {
          border-color: var(--cor-navy);
          background: var(--cor-fundo-suave);
          transform: translateY(-1px);
        }

        .pesquisa-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 18px;
          margin-bottom: 18px;
          border-bottom: 1px solid var(--cor-borda);
        }

        .pesquisa-sidebar-title {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--cor-texto);
          font-size: 19px;
          font-weight: 850;
          letter-spacing: 0;
        }

        .pesquisa-sidebar-close {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 40px;
          padding: 0 12px;
          border: 1px solid var(--cor-borda);
          border-radius: 12px;
          background: #ffffff;
          color: var(--cor-navy);
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .pesquisa-filter-status {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 18px;
        }

        .pesquisa-filter-stat {
          padding: 13px 14px;
          border: 1px solid var(--cor-borda);
          border-radius: 16px;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-filter-stat strong {
          display: block;
          color: var(--cor-texto);
          font-size: 22px;
          font-weight: 900;
          line-height: 1;
        }

        .pesquisa-filter-stat span {
          display: block;
          margin-top: 6px;
          color: var(--cor-texto-secundario);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .pesquisa-filter-section {
          display: grid;
          gap: 14px;
          margin-bottom: 16px;
          padding: 16px;
          border: 1px solid var(--cor-borda);
          border-radius: 20px;
          background: #ffffff;
        }

        .pesquisa-filter-section-title,
        .pesquisa-filter-title {
          margin: 0;
          color: var(--cor-navy);
          font-size: 10px;
          font-weight: 850;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .pesquisa-filter-group {
          display: grid;
          gap: 9px;
          margin: 0;
        }

        .pesquisa-filter-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
        }

        .pesquisa-filter-input {
          width: 100%;
          min-height: 46px;
          border: 1px solid var(--cor-borda);
          border-radius: 13px;
          background: #ffffff;
          color: var(--cor-texto);
          padding: 0 13px;
          font-size: 13px;
          font-weight: 600;
          outline: none;
          transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }

        .pesquisa-filter-input:focus {
          border-color: ${accent};
          box-shadow: 0 0 0 3px ${accentSoft};
        }

        .pesquisa-filter-input:disabled {
          color: #98a5b3;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pesquisa-tag {
          flex: 1 1 calc(50% - 8px);
          min-height: 38px;
          border: 1px solid var(--cor-borda);
          border-radius: 999px;
          background: #ffffff;
          color: var(--cor-texto-secundario);
          padding: 0 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color .18s ease, background .18s ease, color .18s ease, transform .18s ease;
        }

        .pesquisa-tag:hover {
          border-color: var(--cor-navy);
          color: var(--cor-texto);
        }

        .pesquisa-tag.active {
          border-color: ${accent};
          background: ${accent};
          color: ${accentText};
        }

        .pesquisa-apply-btn {
          width: 100%;
          min-height: 50px;
          border: 1px solid var(--cor-navy);
          border-radius: 15px;
          background: var(--cor-navy);
          color: #ffffff;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          letter-spacing: .02em;
          transition: background .18s ease, transform .18s ease;
        }

        .pesquisa-apply-btn:hover {
          background: #071f38;
          transform: translateY(-1px);
        }

        .pesquisa-main-content {
          flex: 1 1 auto;
          min-width: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .pesquisa-search-row {
          width: 100%;
          display: flex;
          align-items: stretch;
          gap: 12px;
          margin-bottom: 22px;
        }

        .pesquisa-search-composer {
          position: relative;
          min-width: 0;
          flex: 1;
        }

        .pesquisa-omnibar-wrapper {
          min-height: 64px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--cor-borda);
          border-radius: 18px;
          background: #ffffff;
          padding: 0 20px;
          transition: border-color .18s ease, box-shadow .18s ease;
        }

        .pesquisa-omnibar-wrapper:focus-within {
          border-color: ${accent};
          box-shadow: 0 0 0 3px ${accentSoft};
        }

        .pesquisa-omnibar-wrapper input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          color: var(--cor-texto);
          padding: 0;
          font-size: 16px;
          font-weight: 500;
          outline: none;
        }

        .pesquisa-omnibar-wrapper input::placeholder { color: #8998a7; }

        .pesquisa-input-clear {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: var(--cor-texto-secundario);
          cursor: pointer;
        }

        .pesquisa-input-clear:hover {
          background: var(--cor-fundo-suave);
          color: var(--cor-texto);
        }

        .pesquisa-suggestions {
          position: absolute;
          z-index: 30;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          display: grid;
          gap: 6px;
          padding: 8px;
          border: 1px solid var(--cor-borda);
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 22px 52px -36px rgba(7,19,38,.42);
        }

        .pesquisa-suggestion {
          width: 100%;
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 12px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: var(--cor-texto);
          cursor: pointer;
          text-align: left;
        }

        .pesquisa-suggestion:hover { background: var(--cor-fundo-suave); }
        .pesquisa-suggestion span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 800; }
        .pesquisa-suggestion em { flex-shrink: 0; color: var(--cor-texto-secundario); font-size: 11px; font-style: normal; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }

        .pesquisa-mobile-filter-btn {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
          border: 1px solid var(--cor-borda);
          border-radius: 15px;
          background: #ffffff;
          color: var(--cor-navy);
          padding: 0 16px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .pesquisa-active-row {
          min-height: 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin: -8px 0 20px;
        }

        .pesquisa-active-chip,
        .pesquisa-clear-btn,
        .pesquisa-results-count {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 34px;
          border: 1px solid var(--cor-borda);
          border-radius: 999px;
          background: #ffffff;
          color: var(--cor-navy);
          padding: 0 12px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .pesquisa-active-chip {
          background: ${accentSoft};
          border-color: ${accent};
        }

        .pesquisa-active-chip.is-removable,
        .pesquisa-clear-btn { cursor: pointer; }

        .pesquisa-active-chip.is-removable:hover,
        .pesquisa-clear-btn:hover {
          border-color: var(--cor-navy);
          background: var(--cor-fundo-suave);
        }

        .pesquisa-active-chip span {
          min-width: 0;
          max-width: 230px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pesquisa-topbar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 22px;
          padding: 12px;
          border: 1px solid var(--cor-borda);
          border-radius: 18px;
          background: #ffffff;
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
          gap: 5px;
          padding: 5px;
          border: 1px solid var(--cor-borda);
          border-radius: 15px;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-view-switch button {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 11px;
          background: transparent;
          color: var(--cor-texto-secundario);
          padding: 0 14px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: background .18s ease, color .18s ease;
        }

        .pesquisa-view-switch button:hover { color: var(--cor-texto); }
        .pesquisa-view-switch button.active { background: ${accent}; color: ${accentText}; }

        .pesquisa-sort {
          min-height: 48px;
          border: 1px solid var(--cor-borda);
          border-radius: 14px;
          background: #ffffff;
          color: var(--cor-texto);
          padding: 0 40px 0 14px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          outline: none;
        }

        .pesquisa-grid,
        .pesquisa-skeleton-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 238px), 1fr));
          gap: clamp(16px, 1.7vw, 28px);
          align-items: start;
        }

        .pesquisa-layout.filters-closed .pesquisa-grid,
        .pesquisa-layout.filters-closed .pesquisa-skeleton-grid {
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 232px), 1fr));
        }

        .pesquisa-grid .nxc-wrap {
          max-width: 330px;
        }

        .pesquisa-grid .nx-ad-banner-card,
        .pesquisa-grid .nx-ad-slot-card,
        .pesquisa-top-ad,
        .pesquisa-inline-ad,
        .pesquisa-bottom-ad {
          grid-column: 1 / -1;
        }

        .pesquisa-skeleton-card {
          min-height: 330px;
          border: 1px solid var(--cor-borda);
          border-radius: 20px;
          background: linear-gradient(110deg, #ffffff 0%, var(--cor-fundo-suave) 44%, #ffffff 76%);
          background-size: 220% 100%;
          animation: pesquisaSkeleton 1.3s ease-in-out infinite;
        }

        @keyframes pesquisaSkeleton { from { background-position: 180% 0; } to { background-position: -40% 0; } }

        .pesquisa-map-shell {
          position: relative;
          height: min(760px, calc(100vh - 220px));
          min-height: 540px;
          overflow: hidden;
          border: 1px solid var(--cor-borda);
          border-radius: 22px;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-map-empty {
          position: absolute;
          left: 50%;
          top: 18px;
          transform: translateX(-50%);
          z-index: 500;
          border-radius: 999px;
          background: var(--cor-navy);
          color: #ffffff;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 800;
        }

        .pesquisa-map-loading {
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--cor-fundo-suave);
          color: var(--cor-texto-secundario);
          font-size: 13px;
          font-weight: 800;
        }

        .sidebar-mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(7,19,38,.28);
        }

        .pesquisa-empty {
          text-align: center;
          padding: 100px 20px;
          color: var(--cor-texto-secundario);
        }

        .pesquisa-empty-action {
          margin-top: 18px;
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--cor-navy);
          border-radius: 14px;
          background: var(--cor-navy);
          color: #ffffff;
          padding: 0 18px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
        }

        .infinite-spinner-container {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 42px 0;
          color: var(--cor-texto-secundario);
          font-size: 13px;
          font-weight: 650;
        }

        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--cor-texto-secundario); border-radius: 50%; display: inline-block; animation: pulse .6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: .2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: .4s; }
        @keyframes pulse { from { opacity: .25; transform: scale(.8); } to { opacity: 1; transform: scale(1.2); } }

        @media (max-width: 1024px) {
          .pesquisa-layout { padding: 18px 12px 34px; flex-direction: column; gap: 14px; }
          .pesquisa-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: min(88vw, 380px);
            max-width: 380px;
            height: 100dvh;
            max-height: 100dvh;
            z-index: 9999;
            border-radius: 0 18px 18px 0;
            transform: ${sidebarMobileAberta ? 'translateX(0)' : 'translateX(-105%)'};
            transition: transform .24s ease;
          }
          .pesquisa-sidebar.collapsed { width: min(88vw, 380px); flex-basis: auto; padding: 22px; border: 1px solid var(--cor-borda); opacity: 1; pointer-events: auto; }
          .pesquisa-sidebar-header { position: sticky; top: -22px; z-index: 2; margin: -22px -22px 18px; padding: 16px 18px; background: #ffffff; }
          .pesquisa-sidebar-close { display: inline-flex; }
          .pesquisa-apply-btn { position: sticky; bottom: -22px; z-index: 2; margin: 18px -22px -22px; width: calc(100% + 44px); border-radius: 0; min-height: 56px; }
          .sidebar-mobile-overlay { display: ${sidebarMobileAberta ? 'block' : 'none'}; }
          .pesquisa-sidebar-toggle { display: none; }
          .pesquisa-mobile-filter-btn { display: inline-flex; }
          .pesquisa-main-content { width: 100%; }
        }

        @media (max-width: 640px) {
          .pesquisa-layout { padding: 14px 10px 30px; }
          .pesquisa-search-row { display: grid; grid-template-columns: 1fr; }
          .pesquisa-omnibar-wrapper { min-height: 58px; padding-inline: 16px; }
          .pesquisa-topbar { align-items: stretch; }
          .pesquisa-results-count { justify-content: center; width: 100%; }
          .pesquisa-view-tools { width: 100%; display: grid; grid-template-columns: 1fr; }
          .pesquisa-view-switch { width: 100%; }
          .pesquisa-view-switch button { flex: 1; }
          .pesquisa-sort { width: 100%; }
          .pesquisa-grid, .pesquisa-skeleton-grid { grid-template-columns: repeat(auto-fill, minmax(min(100%, 172px), 1fr)); gap: 14px; }
          .pesquisa-grid .nxc-wrap { max-width: none; }
          .pesquisa-map-shell { height: calc(100vh - 210px); min-height: 420px; border-radius: 18px; }
        }
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
                    <option value={OPCAO_OUTRO_VEICULO}>Outra marca</option>
                  </select>
                </div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Modelo</div>
                  <select className="pesquisa-filter-input" value={filtros.modelo} onChange={(e) => setFiltros(f => ({ ...f, modelo: e.target.value }))} disabled={!filtros.marca}>
                    <option value="">{filtros.marca ? 'Todos os modelos' : 'Escolhe primeiro a marca'}</option>
                    {modelosDisponiveis.map((mod, idx) => {
                      const nomeModelo = typeof mod === 'object' ? (mod.modelo || mod.nome || '') : mod;
                      return <option key={`mod-${idx}`} value={nomeModelo}>{rotuloOpcaoVeiculo(nomeModelo, 'modelo')}</option>;
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
