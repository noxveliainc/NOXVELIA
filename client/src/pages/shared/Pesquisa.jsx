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
  mdiChevronRight, mdiShieldCheckOutline, mdiCloseCircleOutline, mdiAlertOutline
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
  { value: 'escritorio', label: 'Escritório' },
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

const dividirParamLista = (valor) => String(valor || '').split(',').map((item) => item.trim()).filter(Boolean);
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
    const onKeyDown = (event) => { if (event.key === 'Escape') setSidebarMobileAberta(false); };
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
      if (buscaAtual && buscaAtual.trim()) params.set('q', buscaAtual.trim());
      const { data } = await api.get(`/anuncios/pesquisa/mapa?${params.toString()}`);
      setDadosMapa(Array.isArray(data) ? data : []);
    } catch (err) { console.warn('Erro ao carregar mapa:', err); }
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
    } catch {
      setError('Não conseguimos carregar novos anúncios neste momento.');
      setTemMais(false);
    } finally {
      setLoading(false);
      setLoadingMais(false);
      isFetchingRef.current = false;
    }
  }, [adicionarFiltrosAosParams, tipoPadrao, location.pathname]);

  useEffect(() => {
    filtrosRef.current = filtrosIniciais;
    setFiltros(filtrosIniciais);
    setSidebarMobileAberta(false);
    setTemMais(false);
    setResultados([]);
    setSearchQuery(queryInicial);
    buscaRef.current = queryInicial;
    paginaRef.current = 1;
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
      if (isFetchingRef.current) { timer = setTimeout(aplicarOrdenacao, 80); return; }
      setTemMais(false);
      setResultados([]);
      paginaRef.current = 1;
      puxarDadosServidor(1, false, filtrosRef.current.tipo);
    };
    aplicarOrdenacao();
    return () => { cancelado = true; clearTimeout(timer); };
  }, [sort, puxarDadosServidor]);

  useEffect(() => {
    buscaRef.current = debouncedQuery;
    if (!isMounted.current) { isMounted.current = true; return; }
    setTemMais(false);
    setResultados([]);
    paginaRef.current = 1;
    puxarDadosServidor(1, false, null);
  }, [debouncedQuery, puxarDadosServidor]);

  useEffect(() => {
    if (vistaAtiva !== 'mapa') return undefined;
    const timer = setTimeout(() => { carregarDadosMapa(); }, 60);
    return () => clearTimeout(timer);
  }, [filtros, debouncedQuery, carregarDadosMapa, vistaAtiva]);

  useEffect(() => {
    if (!temMais || vistaAtiva === 'mapa') return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const proximaPagina = paginaRef.current + 1;
        puxarDadosServidor(proximaPagina, true, filtrosRef.current.tipo);
      }
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

  const executarFiltrosManuais = () => {
    trackFunnelEvent('search_start', { vertical: tipoSeguro });
    setTemMais(false);
    setResultados([]);
    paginaRef.current = 1;
    puxarDadosServidor(1, false, filtrosRef.current.tipo);
    setSidebarMobileAberta(false);
  };

  const modelosDisponiveis = filtros.marca ? (isOpcaoOutroVeiculo(filtros.marca) ? [OPCAO_OUTRO_VEICULO] : getNomesModelosComOutro(filtros.marca)) : [];
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
      tipo: tipoSeguro, precoMin: '', precoMax: '', distrito: 'Todos', cidade: '',
      marca: '', modelo: '', tiposImovel: [], tipologias: [], combustiveis: [],
      transmissao: [], tipoVeiculo: [], anoMin: '', anoMax: '', kmMax: '',
      potenciaMin: '', potenciaMax: '', areaMin: '', quartosMin: '',
      garantia: false, aceitaRetoma: false, garagem: false, tipoAnunciante: '',
    };
    filtrosRef.current = filtrosLimpos;
    setFiltros(filtrosLimpos);
    setSearchQuery('');
    buscaRef.current = '';
    setTemMais(false);
    setResultados([]);
    paginaRef.current = 1;
    puxarDadosServidor(1, false, tipoSeguro);
  };

  const pesquisaPlaceholder = tipoSeguro === 'carro' ? 'Marca, modelo, distrito ou palavra-chave...' : 'Tipologia, cidade, característica ou palavra-chave...';

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

  const fusePesquisa = useMemo(() => new Fuse(opcoesPesquisa, { keys: ['label', 'detail'], threshold: 0.3, ignoreLocation: true, minMatchCharLength: 2 }), [opcoesPesquisa]);
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
    puxarDadosServidor(1, false, tipoSeguro);
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
    aplicarFiltrosInstantaneos(patch, novaBusca);
  }, [aplicarFiltrosInstantaneos, filtros, searchQuery]);

  const aplicarSugestaoPesquisa = useCallback((sugestao) => {
    aplicarFiltrosInstantaneos(sugestao.patch || {}, '');
  }, [aplicarFiltrosInstantaneos]);

  const totalAnunciosReais = Number(totalResultados || resultados.length || 0);
  const mostrarPublicidadeTopo = !loading && vistaAtiva === 'grelha' && totalAnunciosReais >= 3;
  const mostrarPublicidadeInline = !loading && totalAnunciosReais >= 8;
  const mostrarPublicidadeFundo = !loading && vistaAtiva === 'grelha' && totalAnunciosReais >= 6;

  // --- GERADOR DINÂMICO DE LONG-TAIL SEO PARA A PÁGINA DE PESQUISA ---
  const locSeo = filtros.cidade ? `em ${filtros.cidade}` : (filtros.distrito && filtros.distrito !== 'Todos' ? `em ${filtros.distrito}` : 'em Portugal');
  let titleSeo = '';
  let descSeo = '';

  if (tipoSeguro === 'carro') {
    const veiculoSeo = [filtros.marca, filtros.modelo].filter(Boolean).join(' ').trim() || 'Carros Usados e Novos';
    titleSeo = `${veiculoSeo} ${locSeo} - Preços e Anúncios | Noxvelia`;
    descSeo = `Procuras ${veiculoSeo} ${locSeo}? Descobre as melhores oportunidades no portal automóvel Noxvelia. Fala direto com o vendedor pelo WhatsApp, sem intermediários.`;
  } else {
    const imovelSeo = [filtros.tipologias[0] || '', (filtros.tiposImovel || [])[0] || 'Imóveis'].filter(Boolean).join(' ').trim();
    titleSeo = `${imovelSeo} para venda ${locSeo} | Noxvelia`;
    descSeo = `Encontra ${imovelSeo} para comprar ${locSeo}. Consulta preços, áreas e fotos na Noxvelia. Negócios sem comissões e contacto direto via WhatsApp.`;
  }

  return (
    <>
      {!seoParams && <Seo
        title={titleSeo}
        description={descSeo}
        path={tipoSeguro === 'carro' ? '/carros' : '/imoveis'}
      />}
      <style>{`
        .pesquisa-root { min-height: 100vh; display: flex; flex-direction: column; background: #ffffff; color: var(--cor-texto); font-family: var(--nx-font-body); }
        .pesquisa-layout { width: 100%; display: flex; align-items: flex-start; gap: clamp(20px, 2vw, 36px); padding: clamp(22px, 2.8vw, 46px); flex: 1; transition: padding .22s ease, gap .22s ease; box-sizing: border-box; }
        .pesquisa-sidebar { width: 320px; flex: 0 0 320px; position: sticky; top: 92px; max-height: calc(100vh - 112px); overflow-y: auto; overscroll-behavior: contain; padding: 22px; border: 1px solid var(--cor-borda); border-radius: 22px; background: #ffffff; transition: width .24s ease, flex-basis .24s ease, padding .24s ease, opacity .18s ease, border-color .18s ease; box-sizing: border-box; }
        .pesquisa-sidebar.collapsed { width: 0; flex-basis: 0; min-width: 0; padding: 0; border-color: transparent; opacity: 0; overflow: hidden; pointer-events: none; }
        .pesquisa-sidebar-toggle { flex: 0 0 34px; width: 34px; height: 52px; position: sticky; top: 92px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--cor-borda); border-radius: 14px; background: #ffffff; color: var(--cor-navy); cursor: pointer; transition: border-color .18s ease, background .18s ease, transform .18s ease; }
        .pesquisa-sidebar-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 18px; margin-bottom: 18px; border-bottom: 1px solid var(--cor-borda); }
        .pesquisa-filter-status { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-bottom: 18px; }
        .pesquisa-filter-stat { padding: 13px 14px; border: 1px solid var(--cor-borda); border-radius: 16px; background: var(--cor-fundo-suave); }
        .pesquisa-filter-stat strong { display: block; color: var(--cor-texto); font-size: 22px; font-weight: 900; line-height: 1; }
        .pesquisa-filter-stat span { display: block; margin-top: 6px; color: var(--cor-texto-secundario); font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .pesquisa-filter-section { display: grid; gap: 14px; margin-bottom: 16px; padding: 16px; border: 1px solid var(--cor-borda); border-radius: 20px; background: #ffffff; }
        .pesquisa-filter-section-title, .pesquisa-filter-title { margin: 0; color: var(--cor-navy); font-size: 10px; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
        .pesquisa-filter-group { display: grid; gap: 9px; margin: 0; }
        .pesquisa-filter-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
        .pesquisa-filter-input { width: 100%; min-height: 46px; border: 1px solid var(--cor-borda); border-radius: 13px; background: #ffffff; color: var(--cor-texto); padding: 0 13px; font-size: 13px; font-weight: 600; outline: none; transition: border-color .18s ease, box-shadow .18s ease, background .18s ease; box-sizing: border-box; }
        .pesquisa-filter-input:focus { border-color: ${accent}; box-shadow: 0 0 0 3px ${accentSoft}; }
        .pesquisa-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pesquisa-tag { flex: 1 1 calc(50% - 8px); min-height: 38px; border: 1px solid var(--cor-borda); border-radius: 999px; background: #ffffff; color: var(--cor-texto-secundario); padding: 0 12px; font-size: 12px; font-weight: 700; cursor: pointer; transition: border-color .18s ease, background .18s ease, color .18s ease; box-sizing: border-box; }
        .pesquisa-tag:hover { border-color: var(--cor-navy); color: var(--cor-texto); }
        .pesquisa-tag.active { border-color: ${accent}; background: ${accent}; color: ${accentText}; }
        .pesquisa-apply-btn { width: 100%; min-height: 50px; border: 1px solid var(--cor-navy); border-radius: 15px; background: var(--cor-navy); color: #ffffff; font-size: 13px; font-weight: 850; cursor: pointer; letter-spacing: .02em; }
        .pesquisa-main-content { flex: 1; min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .pesquisa-search-row { display: flex; gap: 12px; margin-bottom: 22px; }
        .pesquisa-omnibar-wrapper { min-height: 64px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--cor-borda); border-radius: 18px; background: #ffffff; padding: 0 20px; box-sizing: border-box; }
        .pesquisa-omnibar-wrapper input { flex: 1; min-width: 0; border: 0; background: transparent; color: var(--cor-texto); padding: 0; font-size: 16px; font-weight: 500; outline: none; }
        .pesquisa-suggestions { position: absolute; z-index: 30; top: calc(100% + 8px); left: 0; right: 0; display: grid; gap: 6px; padding: 8px; border: 1px solid var(--cor-borda); border-radius: 18px; background: #ffffff; box-shadow: 0 22px 52px -36px rgba(7,19,38,.42); }
        .pesquisa-suggestion { width: 100%; min-height: 46px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; border: 0; border-radius: 12px; background: transparent; cursor: pointer; text-align: left; }
        .pesquisa-suggestion:hover { background: var(--cor-fundo-suave); }
        .pesquisa-topbar { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 22px; padding: 12px 18px; border: 1px solid var(--cor-borda); border-radius: 18px; background: #ffffff; box-sizing: border-box; }
        .pesquisa-sort { min-height: 44px; border: 1px solid var(--cor-borda); border-radius: 14px; background: #ffffff; color: var(--cor-texto); padding: 0 14px; font-size: 13px; font-weight: 800; cursor: pointer; outline: none; }
        .pesquisa-grid { width: 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: 20px; align-items: start; }
        .pesquisa-skeleton-grid { width: 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: 20px; }
        .pesquisa-skeleton-card { min-height: 330px; border: 1px solid var(--cor-borda); border-radius: 20px; background: linear-gradient(110deg, #ffffff 0%, var(--cor-fundo-suave) 44%, #ffffff 76%); background-size: 220% 100%; animation: pesquisaSkeleton 1.3s ease-in-out infinite; }
        @keyframes pesquisaSkeleton { from { background-position: 180% 0; } to { background-position: -40% 0; } }
        .pesquisa-map-shell { position: relative; height: min(760px, calc(100vh - 220px)); min-height: 540px; overflow: hidden; border: 1px solid var(--cor-borda); border-radius: 22px; background: var(--cor-fundo-suave); }
        .pesquisa-empty { text-align: center; padding: 80px 20px; background: #ffffff; border: 1px solid var(--cor-borda); border-radius: 22px; color: var(--cor-texto-secundario); }
        .pesquisa-empty-action { margin-top: 18px; min-height: 46px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--cor-navy); border-radius: 14px; background: var(--cor-navy); color: #ffffff; padding: 0 18px; font-size: 13px; font-weight: 850; cursor: pointer; text-decoration: none; }
        .infinite-spinner-container { grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 42px 0; color: var(--cor-texto-secundario); font-size: 13px; }
        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--cor-texto-secundario); border-radius: 50%; display: inline-block; animation: pulse .6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: .2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: .4s; }
        @keyframes pulse { from { opacity: .25; transform: scale(.8); } to { opacity: 1; transform: scale(1.2); } }
        .sidebar-mobile-overlay { display: none; position: fixed; inset: 0; z-index: 9998; background: rgba(7,19,38,.28); }

        @media (max-width: 1024px) {
          .pesquisa-layout { padding: 18px 12px 34px; flex-direction: column; gap: 14px; }
          .pesquisa-sidebar { position: fixed; top: 0; left: 0; width: min(88vw, 380px); max-width: 380px; height: 100dvh; max-height: 100dvh; z-index: 9999; border-radius: 0 18px 18px 0; transform: ${sidebarMobileAberta ? 'translateX(0)' : 'translateX(-105%)'}; transition: transform .24s ease; }
          .pesquisa-sidebar.collapsed { width: min(88vw, 380px); flex-basis: auto; padding: 22px; border: 1px solid var(--cor-borda); opacity: 1; pointer-events: auto; }
          .sidebar-mobile-overlay { display: ${sidebarMobileAberta ? 'block' : 'none'}; }
          .pesquisa-sidebar-toggle { display: none; }
        }
      `}</style>

      <div className="pesquisa-root">
        <div className="sidebar-mobile-overlay" onClick={() => setSidebarMobileAberta(false)} aria-hidden="true" />

        <div className="pesquisa-layout">
          <aside className={`pesquisa-sidebar ${isSidebarOpen ? '' : 'collapsed'} ${sidebarMobileAberta ? 'mobile-open' : ''}`}>
            <div className="pesquisa-sidebar-header">
              <strong>Filtros Avançados</strong>
              {sidebarMobileAberta && <button onClick={() => setSidebarMobileAberta(false)} style={{ border: 0, background: 'transparent', fontWeight: 'bold', cursor: 'pointer', fontSize: 16 }}>✕</button>}
            </div>

            <div className="pesquisa-filter-status">
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
                <div className="pesquisa-filter-title">Distrito</div>
                <select className="pesquisa-filter-input" value={filtros.distrito} onChange={(e) => setFiltros(f => ({ ...f, distrito: e.target.value, cidade: '' }))}>
                  <option value="Todos">Portugal Inteiro</option>
                  {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="pesquisa-filter-group">
                <div className="pesquisa-filter-title">Cidade</div>
                <select className="pesquisa-filter-input" value={filtros.cidade} onChange={(e) => setFiltros(f => ({ ...f, cidade: e.target.value }))} disabled={!filtros.distrito || filtros.distrito === 'Todos'}>
                  <option value="">{filtros.distrito && filtros.distrito !== 'Todos' ? 'Todas as cidades' : 'Escolha o distrito'}</option>
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
                    <option value="">{filtros.marca ? 'Todos os modelos' : 'Escolha a marca'}</option>
                    {modelosDisponiveis.map((mod, idx) => {
                      const nomeModelo = normalizarModeloPesquisa(mod);
                      return <option key={idx} value={nomeModelo}>{rotuloOpcaoVeiculo(nomeModelo, 'modelo')}</option>;
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
              </div>
            ) : (
              <div className="pesquisa-filter-section">
                <div className="pesquisa-filter-section-title">Imóvel</div>
                <div className="pesquisa-filter-group">
                  <div className="pesquisa-filter-title">Tipologias</div>
                  <div className="pesquisa-tags">
                    {TIPOLOGIAS.map(val => (
                      <button key={val} type="button" className={`pesquisa-tag ${filtros.tipologias.includes(val) ? 'active' : ''}`} onClick={() => toggleTag('tipologias', val)}>{val}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button type="button" className="pesquisa-apply-btn" onClick={executarFiltrosManuais}>Aplicar Filtros</button>
          </aside>

          <button type="button" className="pesquisa-sidebar-toggle" onClick={() => setIsSidebarOpen(prev => !prev)} aria-label="Alternar filtros">
            <Icon path={isSidebarOpen ? mdiChevronLeft : mdiChevronRight} size={0.8} />
          </button>

          <main className="pesquisa-main-content">
            <div className="pesquisa-search-row">
              <button type="button" onClick={() => setSidebarMobileAberta(true)} style={{ display: 'none', alignItems: 'center', gap: 6, padding: '0 16px', background: '#fff', border: '1px solid #dfe8e4', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }} className="mobile-filter-trigger">
                <Icon path={mdiFilterVariant} size={0.7} /> Filtros
              </button>

              <div style={{ position: 'relative', flex: 1 }}>
                <div className="pesquisa-omnibar-wrapper">
                  <Icon path={mdiMagnify} size={0.9} color="#7b8b90" style={{ marginRight: 12 }} />
                  <input
                    type="text"
                    placeholder={pesquisaPlaceholder}
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 140)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && aplicarFiltrosInstantaneos({}, e.currentTarget.value)}
                  />
                  {searchQuery && <button onClick={() => aplicarFiltrosInstantaneos({}, '')} style={{ border: 0, background: 'transparent', cursor: 'pointer' }}><Icon path={mdiCloseCircleOutline} size={0.7} /></button>}
                </div>

                {searchFocused && sugestoesPesquisa.length > 0 && (
                  <div className="pesquisa-suggestions">
                    {sugestoesPesquisa.map((sug) => (
                      <button key={sug.label} type="button" className="pesquisa-suggestion" onMouseDown={(e) => e.preventDefault()} onClick={() => aplicarSugestaoPesquisa(sug)}>
                        <span style={{ fontWeight: 700 }}>{sug.label}</span>
                        <em style={{ fontStyle: 'normal', fontSize: 11, color: '#7b8b90' }}>{sug.detail}</em>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pesquisa-topbar">
              <span style={{ fontSize: 13, fontWeight: 800, color: '#4f646a' }}>{loading && resultados.length === 0 ? 'A procurar...' : `${totalResultados} anúncios encontrados`}</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'inline-flex', background: '#f8faf7', border: '1px solid #dfe8e4', borderRadius: 12, padding: 4 }}>
                  <button type="button" onClick={() => setVistaAtiva('grelha')} style={{ padding: '6px 12px', borderRadius: 8, border: 0, background: vistaAtiva === 'grelha' ? '#102326' : 'transparent', color: vistaAtiva === 'grelha' ? '#fff' : '#4f646a', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Grelha</button>
                  <button type="button" onClick={() => setVistaAtiva('mapa')} style={{ padding: '6px 12px', borderRadius: 8, border: 0, background: vistaAtiva === 'mapa' ? '#102326' : 'transparent', color: vistaAtiva === 'mapa' ? '#fff' : '#4f646a', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Mapa</button>
                </div>

                <select className="pesquisa-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="relevancia">Relevância</option>
                  <option value="recentes">Mais recentes</option>
                  <option value="preco_asc">Preço: Mais baixo</option>
                  <option value="preco_desc">Preço: Mais alto</option>
                </select>
              </div>
            </div>

            {mostrarPublicidadeTopo && (
              <AdBanner mode="direct" placement={tipoSeguro === 'carro' ? 'listagem_topo_carros' : 'listagem_topo_imoveis'} vertical={tipoSeguro} minHeight={100} style={{ marginBottom: 20 }} />
            )}

            {vistaAtiva === 'mapa' ? (
              <div className="pesquisa-map-shell">
                <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>A carregar mapa...</div>}>
                  <MapaResultados anuncios={dadosMapa} tipo={tipoSeguro} />
                </Suspense>
              </div>
            ) : loading && resultados.length === 0 ? (
              <div className="pesquisa-skeleton-grid">
                {Array.from({ length: 6 }).map((_, index) => <div className="pesquisa-skeleton-card" key={index} />)}
              </div>
            ) : resultados.length > 0 ? (
              <div className="pesquisa-grid">
                {resultados.map((anuncio, index) => (
                  <React.Fragment key={anuncio._id}>
                    <AnuncioCard anuncio={anuncio} showStatus={false} />
                    {mostrarPublicidadeInline && (index + 1) % 6 === 0 && index < resultados.length - 1 && (
                      <AdBanner mode="direct" placement={tipoSeguro === 'carro' ? 'feed_pesquisa_carros' : 'feed_pesquisa_imoveis'} vertical={tipoSeguro} variant="inline" minHeight={90} style={{ gridColumn: '1 / -1' }} />
                    )}
                  </React.Fragment>
                ))}
                {temMais && !loading && (
                  <div ref={sentinelaRef} className="infinite-spinner-container">
                    <div className="infinite-dot-pulse" /><div className="infinite-dot-pulse" /><div className="infinite-dot-pulse" />
                  </div>
                )}
              </div>
            ) : (
              <div className="pesquisa-empty">
                <Icon path={mdiAlertOutline} size={1.8} color="#9d7b3f" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ margin: '0 0 6px', fontFamily: 'Space Grotesk', fontSize: 20 }}>Nenhum anúncio encontrado</h3>
                <p style={{ color: '#4f646a', fontSize: 14, margin: '0 0 20px' }}>Tenta limpar os filtros aplicados ou alterar os critérios de pesquisa.</p>
                <button onClick={limparFiltros} className="pesquisa-empty-action">Limpar todos os filtros</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}