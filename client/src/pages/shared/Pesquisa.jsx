import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Seo from '../../components/Seo';
import api from '../../services/api';
import AdBanner from '../../components/AdBanner';
import useDebounce from '../../hooks/useDebounce';
import Fuse from 'fuse.js';
import { Icon } from '@mdi/react';
import {
  mdiMagnify,
  mdiFilterVariant,
  mdiClose,
  mdiCloseCircleOutline,
  mdiAlertOutline,
  mdiChevronUp,
  mdiChevronDown,
  mdiTune
} from '@mdi/js';

import {
  MARCAS,
  OPCAO_OUTRO_VEICULO,
  getNomesModelosComOutro,
  isOpcaoOutroVeiculo,
  rotuloOpcaoVeiculo
} from '../../data/marcasModelos';

import {
  DISTRITOS_CIDADES_PT,
  DISTRITOS
} from '../../data/localizacoes';

import { publishIntentState } from '../../utils/navigationState';
import { trackFunnelEvent } from '../../utils/funnelAnalytics';

import AnuncioCard from './AnuncioCard';

const BG_DRIVE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop';

const BG_ESTATE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920&auto=format&fit=crop';

const TIPOLOGIAS = ['T0', 'T1', 'T2', 'T3', 'T4', 'T5+'];

const TIPOS_IMOVEL = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'loja', label: 'Loja' },
  { value: 'escritorio', label: 'Escritório' },
];

const COMBUSTIVEIS = [
  'Gasolina',
  'Diesel',
  'Eléctrico',
  'Híbrido',
  'GPL'
];

const TRANSMISSAO = [
  'Manual',
  'Automática'
];

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

const dividirParamLista = (valor) =>
  String(valor || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const formatarNumero = (valor) =>
  Number(valor).toLocaleString('pt-PT');

const normalizarModeloPesquisa = (modelo) =>
  typeof modelo === 'object'
    ? modelo.modelo || modelo.nome || ''
    : modelo;

const criarFiltrosVazios = (tipo) => ({
  tipo,
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
});

export default function Pesquisa({
  tipoPadrao = 'imovel',
  seoParams = null
}) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const tipoSeguro = location.pathname.includes('carro')
    ? 'carro'
    : (tipoPadrao || 'imovel');

  const searchParamsKey = searchParams.toString();
  const seoParamsKey = seoParams?.toString() || '';

  const parametrosRota = useMemo(
    () => ({
      search: new URLSearchParams(searchParamsKey),
      seo: seoParamsKey
        ? new URLSearchParams(seoParamsKey)
        : null,
    }),
    [searchParamsKey, seoParamsKey]
  );

  const getParam = useCallback(
    (name) =>
      parametrosRota.seo?.get(name) ||
      parametrosRota.search.get(name) ||
      '',
    [parametrosRota]
  );

  const marcaUrl = getParam('marca');

  const marcaInicial =
    tipoSeguro === 'carro' &&
      (MARCAS.includes(marcaUrl) ||
        isOpcaoOutroVeiculo(marcaUrl))
      ? marcaUrl
      : '';

  const queryInicial = getParam('q');

  const obterFiltrosDaRota = useCallback(
    () => ({
      tipo: tipoSeguro,
      precoMin: getParam('precoMin'),
      precoMax: getParam('precoMax'),
      distrito: getParam('distrito') || 'Todos',
      cidade: getParam('cidade'),
      marca: marcaInicial,
      modelo: getParam('modelo'),

      tiposImovel: dividirParamLista(
        getParam('tipoImovel')
      ),

      tipologias: dividirParamLista(
        getParam('tipologia')
      ),

      combustiveis: dividirParamLista(
        getParam('combustivel')
      ),

      transmissao: dividirParamLista(
        getParam('transmissao')
      ),

      tipoVeiculo: dividirParamLista(
        getParam('tipoVeiculo')
      ),

      anoMin: getParam('anoMin'),
      anoMax: getParam('anoMax'),
      kmMax: getParam('kmMax'),
      potenciaMin: getParam('potenciaMin'),
      potenciaMax: getParam('potenciaMax'),
      areaMin: getParam('areaMin'),
      quartosMin: getParam('quartosMin'),

      garantia:
        getParam('garantia') === 'true',

      aceitaRetoma:
        getParam('aceitaRetoma') === 'true',

      garagem:
        getParam('garagem') === 'true',

      tipoAnunciante:
        getParam('tipoAnunciante'),
    }),
    [getParam, marcaInicial, tipoSeguro]
  );

  const filtrosIniciais = useMemo(
    () => obterFiltrosDaRota(),
    [obterFiltrosDaRota]
  );

  const publicarState = publishIntentState(
    location,
    tipoSeguro === 'carro'
      ? '/carros'
      : '/imoveis'
  );

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMais, setLoadingMais] = useState(false);
  const [error, setError] = useState(null);
  const [totalResultados, setTotalResultados] = useState(0);

  const [sort, setSort] =
    useState('relevancia');

  const [searchQuery, setSearchQuery] =
    useState(queryInicial);

  const [searchFocused, setSearchFocused] =
    useState(false);

  const [temMais, setTemMais] =
    useState(false);

  const [expandedFilters, setExpandedFilters] =
    useState({
      precoLoc: true,
      especificos: true,
      caracteristicas: false,
      vendedor: false
    });

  const [sidebarMobileAberta, setSidebarMobileAberta] =
    useState(false);

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const [isMobileViewport, setIsMobileViewport] =
    useState(false);

  const [filtros, setFiltros] =
    useState(filtrosIniciais);

  const sentinelaRef = useRef(null);

  const limite = 24;

  const isFetchingRef =
    useRef(false);

  const paginaRef =
    useRef(1);

  const filtrosRef =
    useRef(filtros);

  const sortRef =
    useRef(sort);

  const sortAnteriorRef =
    useRef(sort);

  const buscaRef =
    useRef('');

  const isMounted =
    useRef(false);

  const debouncedQuery =
    useDebounce(searchQuery, 300);

  useEffect(() => {
    filtrosRef.current = filtros;
  }, [filtros]);

  useEffect(() => {
    sortRef.current = sort;
  }, [sort]);

  useEffect(() => {
    const toggleSidebar = () => {
      setSidebarMobileAberta(
        (prev) => !prev
      );
    };

    window.addEventListener(
      'toggle-filtros',
      toggleSidebar
    );

    return () => {
      window.removeEventListener(
        'toggle-filtros',
        toggleSidebar
      );
    };
  }, []);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        '(max-width: 1024px)'
      );

    const atualizarViewport = () => {
      setIsMobileViewport(
        mediaQuery.matches
      );
    };

    atualizarViewport();

    mediaQuery.addEventListener(
      'change',
      atualizarViewport
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        atualizarViewport
      );
    };
  }, []);

  useEffect(() => {
    if (!sidebarMobileAberta) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSidebarMobileAberta(false);
      }
    };

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    window.addEventListener(
      'keydown',
      onKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        'keydown',
        onKeyDown
      );
    };
  }, [sidebarMobileAberta]);

  const adicionarFiltrosAosParams =
    useCallback(
      (
        params,
        filtrosAtuais,
        tipoFinal
      ) => {
        if (filtrosAtuais.precoMin) {
          params.set(
            'precoMin',
            filtrosAtuais.precoMin
          );
        }

        if (filtrosAtuais.precoMax) {
          params.set(
            'precoMax',
            filtrosAtuais.precoMax
          );
        }

        if (
          filtrosAtuais.distrito &&
          filtrosAtuais.distrito !== 'Todos'
        ) {
          params.set(
            'distrito',
            filtrosAtuais.distrito
          );
        }

        if (filtrosAtuais.cidade) {
          params.set(
            'cidade',
            filtrosAtuais.cidade
          );
        }

        if (filtrosAtuais.garantia) {
          params.set(
            'garantia',
            'true'
          );
        }

        if (filtrosAtuais.aceitaRetoma) {
          params.set(
            'aceitaRetoma',
            'true'
          );
        }

        if (filtrosAtuais.tipoAnunciante) {
          params.set(
            'tipoAnunciante',
            filtrosAtuais.tipoAnunciante
          );
        }

        if (tipoFinal === 'carro') {
          if (filtrosAtuais.marca) {
            params.set(
              'marca',
              filtrosAtuais.marca
            );
          }

          if (filtrosAtuais.modelo) {
            params.set(
              'modelo',
              filtrosAtuais.modelo
            );
          }

          if (
            filtrosAtuais.combustiveis.length
          ) {
            params.set(
              'combustivel',
              filtrosAtuais.combustiveis.join(',')
            );
          }

          if (
            filtrosAtuais.transmissao.length
          ) {
            params.set(
              'transmissao',
              filtrosAtuais.transmissao.join(',')
            );
          }

          if (
            filtrosAtuais.tipoVeiculo.length
          ) {
            params.set(
              'tipoVeiculo',
              filtrosAtuais.tipoVeiculo.join(',')
            );
          }

          if (filtrosAtuais.anoMin) {
            params.set(
              'anoMin',
              filtrosAtuais.anoMin
            );
          }

          if (filtrosAtuais.anoMax) {
            params.set(
              'anoMax',
              filtrosAtuais.anoMax
            );
          }

          if (filtrosAtuais.kmMax) {
            params.set(
              'kmMax',
              filtrosAtuais.kmMax
            );
          }

          if (filtrosAtuais.potenciaMin) {
            params.set(
              'potenciaMin',
              filtrosAtuais.potenciaMin
            );
          }

          if (filtrosAtuais.potenciaMax) {
            params.set(
              'potenciaMax',
              filtrosAtuais.potenciaMax
            );
          }
        }

        if (tipoFinal === 'imovel') {
          if (
            filtrosAtuais.tipologias.length
          ) {
            params.set(
              'tipologia',
              filtrosAtuais.tipologias.join(',')
            );
          }

          if (
            filtrosAtuais.tiposImovel?.length
          ) {
            params.set(
              'tipoImovel',
              filtrosAtuais.tiposImovel.join(',')
            );
          }

          if (filtrosAtuais.areaMin) {
            params.set(
              'areaMin',
              filtrosAtuais.areaMin
            );
          }

          if (filtrosAtuais.quartosMin) {
            params.set(
              'quartosMin',
              filtrosAtuais.quartosMin
            );
          }

          if (filtrosAtuais.garagem) {
            params.set(
              'garagem',
              'true'
            );
          }
        }
      },
      []
    );

  const puxarDadosServidor =
    useCallback(
      async (
        paginaAlvo,
        acumular = false,
        tipoForcado = null
      ) => {
        if (isFetchingRef.current) {
          return;
        }

        isFetchingRef.current = true;

        if (paginaAlvo === 1) {
          setLoading(true);
        } else {
          setLoadingMais(true);
        }

        setError(null);

        try {
          const filtrosAtuais =
            filtrosRef.current;

          const sortAtual =
            sortRef.current;

          const buscaAtual =
            buscaRef.current;

          const params =
            new URLSearchParams();

          let tipoFinal =
            tipoForcado ||
            filtrosAtuais.tipo;

          if (
            !tipoFinal ||
            tipoFinal === 'undefined'
          ) {
            tipoFinal =
              location.pathname.includes(
                'carro'
              )
                ? 'carro'
                : (tipoPadrao || 'imovel');
          }

          params.set(
            'tipo',
            tipoFinal
          );

          params.set(
            'page',
            paginaAlvo
          );

          params.set(
            'limit',
            limite
          );

          params.set(
            'sort',
            sortAtual
          );

          adicionarFiltrosAosParams(
            params,
            filtrosAtuais,
            tipoFinal
          );

          if (
            buscaAtual &&
            buscaAtual.trim()
          ) {
            params.set(
              'q',
              buscaAtual.trim()
            );
          }

          const { data } =
            await api.get(
              `/anuncios?${params.toString()}`
            );

          const listaAnuncios =
            data.anuncios ||
            (Array.isArray(data)
              ? data
              : []);

          const contagemAnuncios =
            data.totalAnuncios !==
              undefined
              ? data.totalAnuncios
              : listaAnuncios.length;

          if (acumular) {
            setResultados(
              (prev) => [
                ...prev,
                ...listaAnuncios
              ]
            );
          } else {
            setResultados(
              listaAnuncios
            );
          }

          setTotalResultados(
            contagemAnuncios
          );

          const maisDisponivel =
            listaAnuncios.length ===
            limite;

          setTemMais(
            maisDisponivel
          );

          if (maisDisponivel) {
            paginaRef.current =
              paginaAlvo;
          }
        } catch {
          setError(
            'Não conseguimos carregar novos anúncios neste momento.'
          );

          setTemMais(false);
        } finally {
          setLoading(false);
          setLoadingMais(false);
          isFetchingRef.current =
            false;
        }
      },
      [
        adicionarFiltrosAosParams,
        tipoPadrao,
        location.pathname
      ]
    );

  useEffect(() => {
    filtrosRef.current =
      filtrosIniciais;

    setFiltros(
      filtrosIniciais
    );

    setSidebarMobileAberta(
      false
    );

    setTemMais(false);
    setResultados([]);

    setSearchQuery(
      queryInicial
    );

    buscaRef.current =
      queryInicial;

    paginaRef.current =
      1;

    const timer =
      setTimeout(() => {
        puxarDadosServidor(
          1,
          false,
          tipoSeguro
        );
      }, 50);

    return () =>
      clearTimeout(timer);
  }, [
    tipoSeguro,
    filtrosIniciais,
    queryInicial,
    puxarDadosServidor
  ]);

  useEffect(() => {
    if (
      sortAnteriorRef.current ===
      sort
    ) {
      return;
    }

    sortAnteriorRef.current =
      sort;

    let cancelado = false;
    let timer;

    const aplicarOrdenacao =
      () => {
        if (cancelado) {
          return;
        }

        if (
          isFetchingRef.current
        ) {
          timer = setTimeout(
            aplicarOrdenacao,
            80
          );
          return;
        }

        setTemMais(false);
        setResultados([]);

        paginaRef.current =
          1;

        puxarDadosServidor(
          1,
          false,
          filtrosRef.current.tipo
        );
      };

    aplicarOrdenacao();

    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [
    sort,
    puxarDadosServidor
  ]);

  useEffect(() => {
    buscaRef.current =
      debouncedQuery;

    if (!isMounted.current) {
      isMounted.current =
        true;
      return;
    }

    setTemMais(false);
    setResultados([]);

    paginaRef.current =
      1;

    puxarDadosServidor(
      1,
      false,
      null
    );
  }, [
    debouncedQuery,
    puxarDadosServidor
  ]);

  useEffect(() => {
    if (!temMais) {
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting
          ) {
            const proximaPagina =
              paginaRef.current + 1;

            puxarDadosServidor(
              proximaPagina,
              true,
              filtrosRef.current.tipo
            );
          }
        },
        {
          rootMargin: '300px',
          threshold: 0.1
        }
      );

    const sentinela =
      sentinelaRef.current;

    if (sentinela) {
      observer.observe(
        sentinela
      );
    }

    return () =>
      observer.disconnect();
  }, [
    temMais,
    puxarDadosServidor
  ]);

  const toggleTag = (
    campo,
    valor
  ) => {
    setFiltros((prev) => {
      const lista =
        prev[campo] || [];

      const nova =
        lista.includes(valor)
          ? lista.filter(
            (item) =>
              item !== valor
          )
          : [
            ...lista,
            valor
          ];

      return {
        ...prev,
        [campo]: nova
      };
    });
  };

  const toggleFilterSection =
    (section) => {
      setExpandedFilters(
        (prev) => ({
          ...prev,
          [section]:
            !prev[section]
        })
      );
    };

  const executarFiltrosManuais =
    () => {
      trackFunnelEvent(
        'search_start',
        {
          vertical:
            tipoSeguro
        }
      );

      setTemMais(false);
      setResultados([]);

      paginaRef.current =
        1;

      puxarDadosServidor(
        1,
        false,
        filtrosRef.current.tipo
      );

      setSidebarMobileAberta(
        false
      );
    };

  const modelosDisponiveis =
    filtros.marca
      ? (
        isOpcaoOutroVeiculo(
          filtros.marca
        )
          ? [
            OPCAO_OUTRO_VEICULO
          ]
          : getNomesModelosComOutro(
            filtros.marca
          )
      )
      : [];

  const cidadesDisponiveis =
    filtros.distrito &&
      filtros.distrito !== 'Todos'
      ? DISTRITOS_CIDADES_PT[
      filtros.distrito
      ] || []
      : [];

  const filtrosAtivos = [
    filtros.precoMin &&
    `Desde ${formatarNumero(
      filtros.precoMin
    )} EUR`,

    filtros.precoMax &&
    `Até ${formatarNumero(
      filtros.precoMax
    )} EUR`,

    filtros.distrito !==
    'Todos' &&
    filtros.distrito,

    filtros.cidade,

    filtros.marca,

    filtros.modelo,

    ...(
      filtros.tiposImovel || []
    ).map(
      (tipo) =>
        TIPOS_IMOVEL.find(
          (item) =>
            item.value === tipo
        )?.label || tipo
    ),

    ...filtros.tipologias,
    ...filtros.combustiveis,
    ...filtros.transmissao,

    ...(
      filtros.tipoVeiculo || []
    ).map(
      (tipo) =>
        TIPOS_VEICULO.find(
          (item) =>
            item.value === tipo
        )?.label || tipo
    ),

    filtros.anoMin &&
    `Ano desde ${filtros.anoMin}`,

    filtros.anoMax &&
    `Ano até ${filtros.anoMax}`,

    filtros.kmMax &&
    `Até ${formatarNumero(
      filtros.kmMax
    )} km`,

    filtros.potenciaMin &&
    `Desde ${filtros.potenciaMin} cv`,

    filtros.potenciaMax &&
    `Até ${filtros.potenciaMax} cv`,

    filtros.areaMin &&
    `Desde ${formatarNumero(
      filtros.areaMin
    )} m²`,

    filtros.quartosMin &&
    `${filtros.quartosMin}+ quartos`,

    filtros.garantia &&
    'Com garantia',

    filtros.aceitaRetoma &&
    'Aceita retoma',

    filtros.garagem &&
    'Com garagem',

    filtros.tipoAnunciante ===
    'profissional' &&
    'Profissional',

    filtros.tipoAnunciante ===
    'particular' &&
    'Particular',

    searchQuery.trim() &&
    `"${searchQuery.trim()}"`
  ].filter(Boolean);

  const limparFiltros =
    () => {
      const filtrosLimpos =
        criarFiltrosVazios(
          tipoSeguro
        );

      filtrosRef.current =
        filtrosLimpos;

      setFiltros(
        filtrosLimpos
      );

      setSearchQuery('');
      buscaRef.current = '';

      setTemMais(false);
      setResultados([]);

      paginaRef.current =
        1;

      puxarDadosServidor(
        1,
        false,
        tipoSeguro
      );

      setSidebarMobileAberta(
        false
      );
    };

  const pesquisaPlaceholder =
    tipoSeguro === 'carro'
      ? 'Marca, modelo, distrito ou palavra-chave...'
      : 'Tipologia, cidade, característica ou palavra-chave...';

  const opcoesPesquisa =
    useMemo(() => {
      const opcoes = [];

      if (
        tipoSeguro === 'carro'
      ) {
        MARCAS.forEach(
          (marca) => {
            opcoes.push({
              label: marca,
              detail:
                'Marca automóvel',
              patch: {
                marca,
                modelo: ''
              }
            });

            getNomesModelosComOutro(
              marca
            ).forEach(
              (modeloOriginal) => {
                const modelo =
                  normalizarModeloPesquisa(
                    modeloOriginal
                  );

                if (!modelo) {
                  return;
                }

                opcoes.push({
                  label:
                    `${marca} ${rotuloOpcaoVeiculo(
                      modelo,
                      'modelo'
                    )}`,
                  detail:
                    'Modelo automóvel',
                  patch: {
                    marca,
                    modelo
                  }
                });
              }
            );
          }
        );

        opcoes.push({
          label:
            'Outra marca',
          detail:
            'Marca fora da lista',
          patch: {
            marca:
              OPCAO_OUTRO_VEICULO,
            modelo: ''
          }
        });
      } else {
        TIPOS_IMOVEL.forEach(
          (tipo) => {
            opcoes.push({
              label:
                tipo.label,
              detail:
                'Tipo de imóvel',
              patch: {
                tiposImovel: [
                  tipo.value
                ]
              }
            });
          }
        );

        TIPOLOGIAS.forEach(
          (tipologia) => {
            opcoes.push({
              label:
                tipologia,
              detail:
                'Tipologia',
              patch: {
                tipologias: [
                  tipologia
                ]
              }
            });
          }
        );
      }

      DISTRITOS.forEach(
        (distrito) => {
          opcoes.push({
            label:
              distrito,
            detail:
              'Distrito',
            patch: {
              distrito,
              cidade: ''
            }
          });

          (
            DISTRITOS_CIDADES_PT[
            distrito
            ] || []
          ).forEach(
            (cidade) => {
              opcoes.push({
                label:
                  cidade,
                detail:
                  `${distrito} · cidade`,
                patch: {
                  distrito,
                  cidade
                }
              });
            }
          );
        }
      );

      return opcoes;
    }, [tipoSeguro]);

  const fusePesquisa =
    useMemo(
      () =>
        new Fuse(
          opcoesPesquisa,
          {
            keys: [
              'label',
              'detail'
            ],
            threshold: 0.3,
            ignoreLocation: true,
            minMatchCharLength: 2
          }
        ),
      [opcoesPesquisa]
    );

  const sugestoesPesquisa =
    useMemo(() => {
      const termo =
        searchQuery.trim();

      if (termo.length < 2) {
        return [];
      }

      return fusePesquisa
        .search(termo)
        .slice(0, 7)
        .map(
          (resultado) =>
            resultado.item
        );
    }, [
      fusePesquisa,
      searchQuery
    ]);

  const aplicarFiltrosInstantaneos =
    useCallback(
      (
        patch,
        novaBusca = ''
      ) => {
        const proximosFiltros = {
          ...filtrosRef.current,
          ...patch,
          tipo: tipoSeguro
        };

        filtrosRef.current =
          proximosFiltros;

        buscaRef.current =
          novaBusca;

        setFiltros(
          proximosFiltros
        );

        setSearchQuery(
          novaBusca
        );

        setSearchFocused(
          false
        );

        setTemMais(false);
        setResultados([]);

        paginaRef.current =
          1;

        puxarDadosServidor(
          1,
          false,
          tipoSeguro
        );
      },
      [
        puxarDadosServidor,
        tipoSeguro
      ]
    );

  const aplicarSugestaoPesquisa =
    useCallback(
      (sugestao) => {
        aplicarFiltrosInstantaneos(
          sugestao.patch || {},
          ''
        );
      },
      [
        aplicarFiltrosInstantaneos
      ]
    );

  const totalAnunciosReais =
    Number(
      totalResultados ||
      resultados.length ||
      0
    );

  const mostrarPublicidadeTopo =
    !loading &&
    totalAnunciosReais >= 3;

  const mostrarPublicidadeInline =
    !loading &&
    totalAnunciosReais >= 8;

  const locSeo =
    filtros.cidade
      ? `em ${filtros.cidade}`
      : (
        filtros.distrito &&
        filtros.distrito !==
        'Todos'
      )
        ? `em ${filtros.distrito}`
        : 'em Portugal';

  let titleSeo = '';
  let descSeo = '';

  if (
    tipoSeguro === 'carro'
  ) {
    const veiculoSeo =
      [
        filtros.marca,
        filtros.modelo
      ]
        .filter(Boolean)
        .join(' ')
        .trim() ||
      'Carros Usados e Novos';

    titleSeo =
      `${veiculoSeo} ${locSeo} - Preços e Anúncios | Noxvelia`;

    descSeo =
      `Procuras ${veiculoSeo} ${locSeo}? Descobre as melhores oportunidades no portal automóvel Noxvelia. Fala direto com o vendedor pelo WhatsApp, sem intermediários.`;
  } else {
    const imovelSeo =
      [
        filtros.tipologias[0] ||
        '',
        (
          filtros.tiposImovel ||
          []
        )[0] || 'Imóveis'
      ]
        .filter(Boolean)
        .join(' ')
        .trim();

    titleSeo =
      `${imovelSeo} para venda ${locSeo} | Noxvelia`;

    descSeo =
      `Encontra ${imovelSeo} para comprar ${locSeo}. Consulta preços, áreas e fotos na Noxvelia. Negócios sem comissões e contacto direto via WhatsApp.`;
  }

  const heroBackgroundImage =
    tipoSeguro === 'carro'
      ? BG_DRIVE
      : BG_ESTATE;

  return (
    <>
      {!seoParams && (
        <Seo
          title={titleSeo}
          description={descSeo}
          path={
            tipoSeguro === 'carro'
              ? '/carros'
              : '/imoveis'
          }
        />
      )}

      <style>{`
        .pesquisa-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
          color: #071326;
          font-family: Inter, sans-serif;
        }

        .nx-search-hero {
          position: relative;
          background-color: #071326;
          background-size: cover;
          background-position: center;
          color: #fffaf0;
          padding: 60px 24px 80px;
          text-align: left;
          overflow: hidden;
        }

        .nx-search-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(7,19,38,.95) 0%,
              rgba(7,19,38,.75) 40%,
              rgba(7,19,38,.3) 100%
            );
          z-index: 1;
        }

        .nx-search-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
        }

        .nx-search-breadcrumbs {
          font-size: 11px;
          color: #d9c49c;
          text-transform: uppercase;
          letter-spacing: .1em;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .nx-search-hero h1 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900;
          margin: 0 0 8px;
          letter-spacing: -.02em;
        }

        .nx-search-hero p {
          font-size: 15px;
          color: rgba(255,250,240,.85);
          margin: 0;
        }

        .nx-search-overlap {
          width: 100%;
          max-width: 1280px;
          margin: -32px auto 30px;
          padding: 0 24px;
          position: relative;
          z-index: 100;
          box-sizing: border-box;
        }

        .pesquisa-omnibar-wrapper {
          width: 100%;
          min-height: 64px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(7,19,38,.1);
          border-radius: 12px;
          background: #fff;
          padding: 0 20px;
          box-shadow:
            0 16px 32px -16px
            rgba(7,19,38,.15);
          box-sizing: border-box;
        }

        .pesquisa-omnibar-wrapper input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          color: #071326;
          padding: 0;
          font-size: 16px;
          font-weight: 600;
          outline: none;
          width: 100%;
        }

        .pesquisa-suggestions {
          position: absolute;
          z-index: 300;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          display: grid;
          gap: 6px;
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          box-shadow:
            0 22px 52px -36px
            rgba(7,19,38,.42);
        }

        .pesquisa-suggestion {
          width: 100%;
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .pesquisa-suggestion:hover {
          background: #f1f5f9;
        }

        .pesquisa-layout {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 30px;
          padding: 0 24px 60px;
          flex: 1;
          box-sizing: border-box;
        }

        .pesquisa-sidebar {
          width: 300px;
          flex-shrink: 0;
          position: sticky;
          top: 92px;
          max-height: calc(100vh - 112px);
          overflow-y: auto;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          box-sizing: border-box;
          transition:
            width .3s ease,
            opacity .3s ease;
          scrollbar-width: thin;
        }

        .pesquisa-sidebar.collapsed {
          width: 0;
          opacity: 0;
          padding: 0;
          border: none;
          overflow: hidden;
          pointer-events: none;
        }

        .pesquisa-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 18px;
          margin-bottom: 18px;
          border-bottom: 1px solid #e2e8f0;
        }

        .pesquisa-sidebar-header strong {
          font-size: 16px;
          font-weight: 800;
          color: #071326;
        }

        .mobile-sidebar-close {
          display: none;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          background: #f8fafc;
          color: #071326;
          cursor: pointer;
        }

        .pesquisa-filter-status {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 24px;
        }

        .pesquisa-filter-stat {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
          text-align: center;
        }

        .pesquisa-filter-stat strong {
          display: block;
          color: #071326;
          font-size: 20px;
          font-weight: 900;
          line-height: 1;
        }

        .pesquisa-filter-stat span {
          display: block;
          margin-top: 4px;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .nx-filter-accordion {
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
          margin-top: 16px;
        }

        .nx-filter-accordion:first-of-type {
          border-top: 0;
          padding-top: 0;
          margin-top: 0;
        }

        .nx-filter-accordion-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          margin-bottom: 12px;
          min-height: 30px;
          user-select: none;
        }

        .nx-filter-accordion-header h4 {
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: .1em;
          margin: 0;
        }

        .nx-filter-accordion-body {
          margin-bottom: 8px;
        }

        .pesquisa-filter-group {
          margin-bottom: 16px;
        }

        .pesquisa-filter-title {
          font-size: 13px;
          font-weight: 700;
          color: #071326;
          margin-bottom: 8px;
        }

        .pesquisa-filter-input {
          width: 100%;
          min-height: 44px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #fff;
          color: #071326;
          padding: 0 12px;
          font-size: 13px;
          font-weight: 600;
          outline: none;
          transition:
            border-color .2s,
            box-shadow .2s;
          box-sizing: border-box;
        }

        .pesquisa-filter-input:focus {
          border-color: #102f50;
          box-shadow:
            0 0 0 3px
            rgba(16,47,80,.1);
        }

        .pesquisa-filter-input:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .pesquisa-filter-grid-2 {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        .pesquisa-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pesquisa-tag {
          flex: 1 1 calc(50% - 8px);
          min-height: 38px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #fff;
          color: #64748b;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .pesquisa-tag:hover {
          border-color: #102f50;
          color: #102f50;
        }

        .pesquisa-tag.active {
          border-color: #102f50;
          background: #102f50;
          color: #fff;
        }

        .pesquisa-check-grid {
          display: grid;
          gap: 8px;
        }

        .pesquisa-check-button {
          min-height: 42px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #fff;
          color: #475569;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
        }

        .pesquisa-check-button.active {
          border-color: #102f50;
          background: #eef3f8;
          color: #102f50;
        }

        .pesquisa-check-box {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          border: 1px solid #cbd5e1;
          border-radius: 5px;
          background: #fff;
        }

        .pesquisa-check-button.active
        .pesquisa-check-box {
          border-color: #102f50;
          background: #102f50;
          box-shadow:
            inset 0 0 0 4px #fff;
        }

        .pesquisa-apply-btn {
          width: 100%;
          min-height: 48px;
          border: none;
          border-radius: 8px;
          background: #102f50;
          color: #fff;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: background .2s;
          margin-top: 16px;
        }

        .pesquisa-apply-btn:hover {
          background: #071326;
        }

        .pesquisa-main-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .pesquisa-mobile-toolbar {
          display: none;
        }

        .pesquisa-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          padding: 16px 24px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          width: 100%;
          box-sizing: border-box;
        }

        .pesquisa-sort {
          min-height: 42px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #fff;
          color: #071326;
          padding: 0 14px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          outline: none;
        }

        .nx-list-horizontal {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .nx-skeleton-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .pesquisa-skeleton-card {
          min-height: 200px;
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background:
            linear-gradient(
              110deg,
              #fff 0%,
              #f1f5f9 44%,
              #fff 76%
            );
          background-size: 220% 100%;
          animation:
            pesquisaSkeleton
            1.3s
            ease-in-out
            infinite;
        }

        @keyframes pesquisaSkeleton {
          from {
            background-position: 180% 0;
          }
          to {
            background-position: -40% 0;
          }
        }

        .sidebar-mobile-overlay {
          display: none;
        }

        .pesquisa-active-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin: -8px 0 20px;
        }

        .pesquisa-active-filter {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 30px;
          padding: 0 10px;
          border-radius: 999px;
          background: #eef3f8;
          color: #102f50;
          font-size: 11px;
          font-weight: 700;
        }

        .pesquisa-error {
          padding: 20px;
          margin-bottom: 20px;
          border: 1px solid #fecaca;
          border-radius: 12px;
          background: #fff7f7;
          color: #991b1b;
          font-size: 13px;
          font-weight: 600;
        }

        .pesquisa-empty {
          padding: 50px 20px;
          text-align: center;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
        }

        .infinite-spinner-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 42px 0;
          color: #94a3b8;
        }

        .infinite-dot-pulse {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          border-radius: 50%;
          display: inline-block;
          animation:
            pulse
            .6s
            infinite
            alternate;
        }

        .infinite-dot-pulse:nth-child(2) {
          animation-delay: .2s;
        }

        .infinite-dot-pulse:nth-child(3) {
          animation-delay: .4s;
        }

        @keyframes pulse {
          from {
            opacity: .3;
            transform: scale(.8);
          }
          to {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @media (max-width: 1024px) {
          .nx-search-hero {
            padding:
              42px
              18px
              64px;
          }

          .nx-search-hero h1 {
            font-size: 30px;
            line-height: 1.08;
          }

          .nx-search-hero p {
            font-size: 14px;
          }

          .nx-search-overlap {
            margin-top: -24px;
            padding: 0 12px;
            margin-bottom: 16px;
          }

          .pesquisa-omnibar-wrapper {
            min-height: 56px;
            padding: 0 14px;
            border-radius: 12px;
          }

          .pesquisa-omnibar-wrapper input {
            font-size: 14px;
          }

          .pesquisa-layout {
            flex-direction: column;
            padding:
              0
              12px
              36px;
            gap: 0;
          }

          .pesquisa-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: min(92vw, 420px);
            max-width: 420px;
            height: 100dvh;
            max-height: 100dvh;
            z-index: 10001;
            border-radius: 0 18px 18px 0;
            padding: 0;
            transform:
              translateX(-105%);
            transition:
              transform
              .28s
              cubic-bezier(.4,0,.2,1);
            overflow: hidden;
            box-shadow:
              20px
              0
              60px
              rgba(7,19,38,.18);
          }

          .pesquisa-sidebar.mobile-open {
            transform:
              translateX(0);
          }

          .pesquisa-sidebar.collapsed {
            width: min(92vw, 420px);
            opacity: 1;
            padding: 0;
            border: 0;
            pointer-events: auto;
          }

          .pesquisa-sidebar-inner {
            height: 100%;
            display: flex;
            flex-direction: column;
            min-height: 0;
          }

          .pesquisa-sidebar-header {
            flex-shrink: 0;
            min-height: 68px;
            padding:
              0
              18px;
            margin: 0;
            background: #fff;
            border-bottom: 1px solid #e2e8f0;
          }

          .mobile-sidebar-close {
            display: flex;
          }

          .pesquisa-sidebar-scroll {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            padding: 18px;
            -webkit-overflow-scrolling: touch;
          }

          .pesquisa-sidebar-footer {
            flex-shrink: 0;
            padding:
              12px
              18px
              calc(
                12px
                + env(safe-area-inset-bottom)
              );
            background: rgba(255,255,255,.98);
            border-top: 1px solid #e2e8f0;
            box-shadow:
              0 -10px
              25px
              rgba(7,19,38,.07);
          }

          .pesquisa-sidebar-footer
          .pesquisa-apply-btn {
            margin-top: 0;
          }

          .sidebar-mobile-overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 10000;
            background:
              rgba(7,19,38,.58);
            opacity: 0;
            pointer-events: none;
            transition:
              opacity
              .28s
              ease;
          }

          .sidebar-mobile-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .pesquisa-mobile-toolbar {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr)
              auto;
            gap: 8px;
            width: 100%;
            margin-bottom: 12px;
          }

          .mobile-filter-trigger {
            min-height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 0 14px;
            background: #102f50;
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 800;
            cursor: pointer;
          }

          .mobile-filter-count {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 21px;
            height: 21px;
            padding: 0 6px;
            border-radius: 999px;
            background: #d9c49c;
            color: #071326;
            font-size: 10px;
            font-weight: 900;
          }

          .mobile-sort-select {
            min-height: 46px;
            max-width: 155px;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            background: #fff;
            color: #071326;
            padding: 0 10px;
            font-size: 12px;
            font-weight: 700;
            outline: none;
          }

          .pesquisa-topbar {
            padding:
              12px
              14px;
            margin-bottom: 14px;
          }

          .pesquisa-topbar .pesquisa-sort {
            display: none;
          }

          .pesquisa-active-filters {
            margin:
              0
              0
              14px;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 2px;
            scrollbar-width: none;
          }

          .pesquisa-active-filters::-webkit-scrollbar {
            display: none;
          }

          .pesquisa-active-filter {
            flex-shrink: 0;
          }

          .pesquisa-empty {
            padding:
              40px
              16px;
          }

          .pesquisa-filter-grid-2 {
            gap: 7px;
          }

          .pesquisa-tag {
            min-height: 42px;
          }

          .pesquisa-filter-input {
            min-height: 46px;
          }

          .nx-filter-accordion {
            padding-top: 18px;
            margin-top: 18px;
          }

          .nx-filter-accordion-header {
            min-height: 38px;
          }
        }

        @media (max-width: 480px) {
          .nx-search-hero {
            padding:
              34px
              16px
              58px;
          }

          .nx-search-breadcrumbs {
            font-size: 9px;
            margin-bottom: 12px;
          }

          .nx-search-hero h1 {
            font-size: 27px;
          }

          .nx-search-overlap {
            padding: 0 10px;
          }

          .pesquisa-layout {
            padding:
              0
              10px
              30px;
          }

          .pesquisa-mobile-toolbar {
            grid-template-columns:
              1fr
              1fr;
          }

          .mobile-filter-trigger,
          .mobile-sort-select {
            width: 100%;
            max-width: none;
          }

          .pesquisa-topbar {
            padding:
              11px
              12px;
          }

          .pesquisa-sidebar {
            width: 100%;
            max-width: none;
            border-radius: 0;
          }

          .pesquisa-sidebar-scroll {
            padding:
              16px;
          }

          .pesquisa-sidebar-footer {
            padding-left: 16px;
            padding-right: 16px;
          }

          .pesquisa-filter-status {
            gap: 8px;
            margin-bottom: 18px;
          }

          .pesquisa-filter-stat {
            padding: 10px;
          }

          .pesquisa-filter-stat strong {
            font-size: 18px;
          }

          .pesquisa-suggestion {
            min-height: 52px;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 2px;
          }
        }
      `}</style>

      <div className="pesquisa-root">
        <div
          className="nx-search-hero"
          style={{
            backgroundImage:
              `url(${heroBackgroundImage})`
          }}
        >
          <div className="nx-search-hero-overlay" />

          <div className="nx-search-hero-inner">
            <div className="nx-search-breadcrumbs">
              Noxvelia{' '}
              {tipoSeguro === 'carro'
                ? 'Drive'
                : 'Estate'}{' '}
              &rsaquo;{' '}
              {tipoSeguro === 'carro'
                ? 'Automóveis'
                : 'Imóveis'}
            </div>

            <h1>
              Encontre o seu próximo{' '}
              {tipoSeguro === 'carro'
                ? 'automóvel'
                : 'imóvel'}.
            </h1>

            <p>
              Acesso direto ao melhor
              stock. Sem intermediários.
            </p>
          </div>
        </div>

        <div className="nx-search-overlap">
          <div
            style={{
              position: 'relative',
              width: '100%'
            }}
          >
            <div className="pesquisa-omnibar-wrapper">
              <Icon
                path={mdiMagnify}
                size={1}
                color="#64748b"
              />

              <input
                type="text"
                placeholder={
                  pesquisaPlaceholder
                }
                value={searchQuery}
                onFocus={() =>
                  setSearchFocused(true)
                }
                onBlur={() =>
                  setTimeout(
                    () =>
                      setSearchFocused(
                        false
                      ),
                    140
                  )
                }
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    'Enter'
                  ) {
                    aplicarFiltrosInstantaneos(
                      {},
                      e.currentTarget
                        .value
                    );
                  }
                }}
              />

              {searchQuery && (
                <button
                  type="button"
                  aria-label="Limpar pesquisa"
                  onClick={() =>
                    aplicarFiltrosInstantaneos(
                      {},
                      ''
                    )
                  }
                  style={{
                    border: 0,
                    background:
                      'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    padding: 4
                  }}
                >
                  <Icon
                    path={
                      mdiCloseCircleOutline
                    }
                    size={0.8}
                    color="#94a3b8"
                  />
                </button>
              )}
            </div>

            {searchFocused &&
              sugestoesPesquisa.length >
              0 && (
                <div className="pesquisa-suggestions">
                  {sugestoesPesquisa.map(
                    (sug) => (
                      <button
                        key={
                          `${sug.detail}-${sug.label}`
                        }
                        type="button"
                        className="pesquisa-suggestion"
                        onMouseDown={(e) =>
                          e.preventDefault()
                        }
                        onClick={() =>
                          aplicarSugestaoPesquisa(
                            sug
                          )
                        }
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            color:
                              '#071326'
                          }}
                        >
                          {sug.label}
                        </span>

                        <em
                          style={{
                            fontStyle:
                              'normal',
                            fontSize: 11,
                            color:
                              '#94a3b8'
                          }}
                        >
                          {sug.detail}
                        </em>
                      </button>
                    )
                  )}
                </div>
              )}
          </div>
        </div>

        <div
          className={`sidebar-mobile-overlay ${sidebarMobileAberta
              ? 'open'
              : ''
            }`}
          onClick={() =>
            setSidebarMobileAberta(
              false
            )
          }
          aria-hidden="true"
        />

        <div className="pesquisa-layout">
          <aside
            className={`pesquisa-sidebar ${isSidebarOpen
                ? ''
                : 'collapsed'
              } ${sidebarMobileAberta
                ? 'mobile-open'
                : ''
              }`}
            aria-label="Filtros de pesquisa"
          >
            <div className="pesquisa-sidebar-inner">
              <div className="pesquisa-sidebar-header">
                <div>
                  <strong>
                    Filtros Avançados
                  </strong>

                  {filtrosAtivos.length >
                    0 && (
                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 11,
                          color:
                            '#64748b',
                          fontWeight: 600
                        }}
                      >
                        {
                          filtrosAtivos.length
                        }{' '}
                        filtros ativos
                      </div>
                    )}
                </div>

                <button
                  type="button"
                  className="mobile-sidebar-close"
                  onClick={() =>
                    setSidebarMobileAberta(
                      false
                    )
                  }
                  aria-label="Fechar filtros"
                >
                  <Icon
                    path={mdiClose}
                    size={0.85}
                  />
                </button>
              </div>

              <div className="pesquisa-sidebar-scroll">
                <div className="pesquisa-filter-status">
                  <div className="pesquisa-filter-stat">
                    <strong>
                      {
                        filtrosAtivos.length
                      }
                    </strong>
                    <span>
                      ativos
                    </span>
                  </div>

                  <div className="pesquisa-filter-stat">
                    <strong>
                      {loading &&
                        resultados.length ===
                        0
                        ? '...'
                        : totalResultados}
                    </strong>
                    <span>
                      anúncios
                    </span>
                  </div>
                </div>

                <div className="nx-filter-accordion">
                  <div
                    className="nx-filter-accordion-header"
                    onClick={() =>
                      toggleFilterSection(
                        'precoLoc'
                      )
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key ===
                        'Enter' ||
                        e.key ===
                        ' '
                      ) {
                        toggleFilterSection(
                          'precoLoc'
                        );
                      }
                    }}
                  >
                    <h4>
                      Preço e localização
                    </h4>

                    <Icon
                      path={
                        expandedFilters.precoLoc
                          ? mdiChevronUp
                          : mdiChevronDown
                      }
                      size={0.8}
                      color="#94a3b8"
                    />
                  </div>

                  {expandedFilters.precoLoc && (
                    <div className="nx-filter-accordion-body">
                      <div className="pesquisa-filter-group">
                        <div className="pesquisa-filter-title">
                          Orçamento (€)
                        </div>

                        <div className="pesquisa-filter-grid-2">
                          <input
                            type="number"
                            min="0"
                            className="pesquisa-filter-input"
                            placeholder="Mínimo"
                            value={
                              filtros.precoMin
                            }
                            onChange={(e) =>
                              setFiltros(
                                (f) => ({
                                  ...f,
                                  precoMin:
                                    e.target
                                      .value
                                })
                              )
                            }
                          />

                          <input
                            type="number"
                            min="0"
                            className="pesquisa-filter-input"
                            placeholder="Máximo"
                            value={
                              filtros.precoMax
                            }
                            onChange={(e) =>
                              setFiltros(
                                (f) => ({
                                  ...f,
                                  precoMax:
                                    e.target
                                      .value
                                })
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="pesquisa-filter-group">
                        <div className="pesquisa-filter-title">
                          Distrito
                        </div>

                        <select
                          className="pesquisa-filter-input"
                          value={
                            filtros.distrito
                          }
                          onChange={(e) =>
                            setFiltros(
                              (f) => ({
                                ...f,
                                distrito:
                                  e.target
                                    .value,
                                cidade:
                                  ''
                              })
                            )
                          }
                        >
                          <option value="Todos">
                            Portugal Inteiro
                          </option>

                          {DISTRITOS.map(
                            (d) => (
                              <option
                                key={d}
                                value={d}
                              >
                                {d}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div className="pesquisa-filter-group">
                        <div className="pesquisa-filter-title">
                          Cidade
                        </div>

                        <select
                          className="pesquisa-filter-input"
                          value={
                            filtros.cidade
                          }
                          onChange={(e) =>
                            setFiltros(
                              (f) => ({
                                ...f,
                                cidade:
                                  e.target
                                    .value
                              })
                            )
                          }
                          disabled={
                            !filtros.distrito ||
                            filtros.distrito ===
                            'Todos'
                          }
                        >
                          <option value="">
                            {filtros.distrito &&
                              filtros.distrito !==
                              'Todos'
                              ? 'Todas as cidades'
                              : 'Escolha o distrito'}
                          </option>

                          {cidadesDisponiveis.map(
                            (c) => (
                              <option
                                key={c}
                                value={c}
                              >
                                {c}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="nx-filter-accordion">
                  <div
                    className="nx-filter-accordion-header"
                    onClick={() =>
                      toggleFilterSection(
                        'especificos'
                      )
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key ===
                        'Enter' ||
                        e.key ===
                        ' '
                      ) {
                        toggleFilterSection(
                          'especificos'
                        );
                      }
                    }}
                  >
                    <h4>
                      {tipoSeguro ===
                        'carro'
                        ? 'Automóvel'
                        : 'Imóvel'}
                    </h4>

                    <Icon
                      path={
                        expandedFilters.especificos
                          ? mdiChevronUp
                          : mdiChevronDown
                      }
                      size={0.8}
                      color="#94a3b8"
                    />
                  </div>

                  {expandedFilters.especificos && (
                    <div className="nx-filter-accordion-body">
                      {tipoSeguro ===
                        'carro' ? (
                        <>
                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Marca
                            </div>

                            <select
                              className="pesquisa-filter-input"
                              value={
                                filtros.marca
                              }
                              onChange={(e) =>
                                setFiltros(
                                  (f) => ({
                                    ...f,
                                    marca:
                                      e.target
                                        .value,
                                    modelo:
                                      ''
                                  })
                                )
                              }
                            >
                              <option value="">
                                Todas as marcas
                              </option>

                              {MARCAS.map(
                                (m) => (
                                  <option
                                    key={m}
                                    value={m}
                                  >
                                    {m}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Modelo
                            </div>

                            <select
                              className="pesquisa-filter-input"
                              value={
                                filtros.modelo
                              }
                              onChange={(e) =>
                                setFiltros(
                                  (f) => ({
                                    ...f,
                                    modelo:
                                      e.target
                                        .value
                                  })
                                )
                              }
                              disabled={
                                !filtros.marca
                              }
                            >
                              <option value="">
                                {filtros.marca
                                  ? 'Todos os modelos'
                                  : 'Escolha a marca'}
                              </option>

                              {modelosDisponiveis.map(
                                (
                                  mod,
                                  idx
                                ) => {
                                  const nomeModelo =
                                    normalizarModeloPesquisa(
                                      mod
                                    );

                                  return (
                                    <option
                                      key={
                                        idx
                                      }
                                      value={
                                        nomeModelo
                                      }
                                    >
                                      {rotuloOpcaoVeiculo(
                                        nomeModelo,
                                        'modelo'
                                      )}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Combustível
                            </div>

                            <div className="pesquisa-tags">
                              {COMBUSTIVEIS.map(
                                (val) => (
                                  <button
                                    key={
                                      val
                                    }
                                    type="button"
                                    className={`pesquisa-tag ${filtros.combustiveis.includes(
                                      val
                                    )
                                        ? 'active'
                                        : ''
                                      }`}
                                    onClick={() =>
                                      toggleTag(
                                        'combustiveis',
                                        val
                                      )
                                    }
                                  >
                                    {val}
                                  </button>
                                )
                              )}
                            </div>
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Transmissão
                            </div>

                            <div className="pesquisa-tags">
                              {TRANSMISSAO.map(
                                (val) => (
                                  <button
                                    key={
                                      val
                                    }
                                    type="button"
                                    className={`pesquisa-tag ${filtros.transmissao.includes(
                                      val
                                    )
                                        ? 'active'
                                        : ''
                                      }`}
                                    onClick={() =>
                                      toggleTag(
                                        'transmissao',
                                        val
                                      )
                                    }
                                  >
                                    {val}
                                  </button>
                                )
                              )}
                            </div>
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Tipo de veículo
                            </div>

                            <div className="pesquisa-tags">
                              {TIPOS_VEICULO.map(
                                (tipo) => (
                                  <button
                                    key={
                                      tipo.value
                                    }
                                    type="button"
                                    className={`pesquisa-tag ${filtros.tipoVeiculo.includes(
                                      tipo.value
                                    )
                                        ? 'active'
                                        : ''
                                      }`}
                                    onClick={() =>
                                      toggleTag(
                                        'tipoVeiculo',
                                        tipo.value
                                      )
                                    }
                                  >
                                    {
                                      tipo.label
                                    }
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Tipo de imóvel
                            </div>

                            <div className="pesquisa-tags">
                              {TIPOS_IMOVEL.map(
                                (tipo) => (
                                  <button
                                    key={
                                      tipo.value
                                    }
                                    type="button"
                                    className={`pesquisa-tag ${filtros.tiposImovel.includes(
                                      tipo.value
                                    )
                                        ? 'active'
                                        : ''
                                      }`}
                                    onClick={() =>
                                      toggleTag(
                                        'tiposImovel',
                                        tipo.value
                                      )
                                    }
                                  >
                                    {
                                      tipo.label
                                    }
                                  </button>
                                )
                              )}
                            </div>
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Tipologias
                            </div>

                            <div className="pesquisa-tags">
                              {TIPOLOGIAS.map(
                                (val) => (
                                  <button
                                    key={
                                      val
                                    }
                                    type="button"
                                    className={`pesquisa-tag ${filtros.tipologias.includes(
                                      val
                                    )
                                        ? 'active'
                                        : ''
                                      }`}
                                    onClick={() =>
                                      toggleTag(
                                        'tipologias',
                                        val
                                      )
                                    }
                                  >
                                    {val}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="nx-filter-accordion">
                  <div
                    className="nx-filter-accordion-header"
                    onClick={() =>
                      toggleFilterSection(
                        'caracteristicas'
                      )
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key ===
                        'Enter' ||
                        e.key ===
                        ' '
                      ) {
                        toggleFilterSection(
                          'caracteristicas'
                        );
                      }
                    }}
                  >
                    <h4>
                      Características
                    </h4>

                    <Icon
                      path={
                        expandedFilters.caracteristicas
                          ? mdiChevronUp
                          : mdiChevronDown
                      }
                      size={0.8}
                      color="#94a3b8"
                    />
                  </div>

                  {expandedFilters.caracteristicas && (
                    <div className="nx-filter-accordion-body">
                      {tipoSeguro ===
                        'carro' ? (
                        <>
                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Ano
                            </div>

                            <div className="pesquisa-filter-grid-2">
                              <input
                                type="number"
                                min="1900"
                                className="pesquisa-filter-input"
                                placeholder="Desde"
                                value={
                                  filtros.anoMin
                                }
                                onChange={(e) =>
                                  setFiltros(
                                    (f) => ({
                                      ...f,
                                      anoMin:
                                        e
                                          .target
                                          .value
                                    })
                                  )
                                }
                              />

                              <input
                                type="number"
                                min="1900"
                                className="pesquisa-filter-input"
                                placeholder="Até"
                                value={
                                  filtros.anoMax
                                }
                                onChange={(e) =>
                                  setFiltros(
                                    (f) => ({
                                      ...f,
                                      anoMax:
                                        e
                                          .target
                                          .value
                                    })
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Quilometragem máxima
                            </div>

                            <input
                              type="number"
                              min="0"
                              className="pesquisa-filter-input"
                              placeholder="Ex.: 150000"
                              value={
                                filtros.kmMax
                              }
                              onChange={(e) =>
                                setFiltros(
                                  (f) => ({
                                    ...f,
                                    kmMax:
                                      e
                                        .target
                                        .value
                                  })
                                )
                              }
                            />
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Potência (cv)
                            </div>

                            <div className="pesquisa-filter-grid-2">
                              <input
                                type="number"
                                min="0"
                                className="pesquisa-filter-input"
                                placeholder="Mín."
                                value={
                                  filtros.potenciaMin
                                }
                                onChange={(e) =>
                                  setFiltros(
                                    (f) => ({
                                      ...f,
                                      potenciaMin:
                                        e
                                          .target
                                          .value
                                    })
                                  )
                                }
                              />

                              <input
                                type="number"
                                min="0"
                                className="pesquisa-filter-input"
                                placeholder="Máx."
                                value={
                                  filtros.potenciaMax
                                }
                                onChange={(e) =>
                                  setFiltros(
                                    (f) => ({
                                      ...f,
                                      potenciaMax:
                                        e
                                          .target
                                          .value
                                    })
                                  )
                                }
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Área mínima (m²)
                            </div>

                            <input
                              type="number"
                              min="0"
                              className="pesquisa-filter-input"
                              placeholder="Ex.: 100"
                              value={
                                filtros.areaMin
                              }
                              onChange={(e) =>
                                setFiltros(
                                  (f) => ({
                                    ...f,
                                    areaMin:
                                      e
                                        .target
                                        .value
                                  })
                                )
                              }
                            />
                          </div>

                          <div className="pesquisa-filter-group">
                            <div className="pesquisa-filter-title">
                              Quartos mínimos
                            </div>

                            <select
                              className="pesquisa-filter-input"
                              value={
                                filtros.quartosMin
                              }
                              onChange={(e) =>
                                setFiltros(
                                  (f) => ({
                                    ...f,
                                    quartosMin:
                                      e
                                        .target
                                        .value
                                  })
                                )
                              }
                            >
                              <option value="">
                                Qualquer número
                              </option>

                              {[1, 2, 3, 4, 5].map(
                                (n) => (
                                  <option
                                    key={n}
                                    value={n}
                                  >
                                    {n}+
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="nx-filter-accordion">
                  <div
                    className="nx-filter-accordion-header"
                    onClick={() =>
                      toggleFilterSection(
                        'vendedor'
                      )
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key ===
                        'Enter' ||
                        e.key ===
                        ' '
                      ) {
                        toggleFilterSection(
                          'vendedor'
                        );
                      }
                    }}
                  >
                    <h4>
                      Vendedor e condições
                    </h4>

                    <Icon
                      path={
                        expandedFilters.vendedor
                          ? mdiChevronUp
                          : mdiChevronDown
                      }
                      size={0.8}
                      color="#94a3b8"
                    />
                  </div>

                  {expandedFilters.vendedor && (
                    <div className="nx-filter-accordion-body">
                      <div className="pesquisa-filter-group">
                        <div className="pesquisa-filter-title">
                          Tipo de anunciante
                        </div>

                        <div className="pesquisa-tags">
                          <button
                            type="button"
                            className={`pesquisa-tag ${filtros.tipoAnunciante ===
                                'profissional'
                                ? 'active'
                                : ''
                              }`}
                            onClick={() =>
                              setFiltros(
                                (f) => ({
                                  ...f,
                                  tipoAnunciante:
                                    f.tipoAnunciante ===
                                      'profissional'
                                      ? ''
                                      : 'profissional'
                                })
                              )
                            }
                          >
                            Profissional
                          </button>

                          <button
                            type="button"
                            className={`pesquisa-tag ${filtros.tipoAnunciante ===
                                'particular'
                                ? 'active'
                                : ''
                              }`}
                            onClick={() =>
                              setFiltros(
                                (f) => ({
                                  ...f,
                                  tipoAnunciante:
                                    f.tipoAnunciante ===
                                      'particular'
                                      ? ''
                                      : 'particular'
                                })
                              )
                            }
                          >
                            Particular
                          </button>
                        </div>
                      </div>

                      {tipoSeguro ===
                        'carro' && (
                          <>
                            <button
                              type="button"
                              className={`pesquisa-check-button ${filtros.garantia
                                  ? 'active'
                                  : ''
                                }`}
                              onClick={() =>
                                setFiltros(
                                  (f) => ({
                                    ...f,
                                    garantia:
                                      !f.garantia
                                  })
                                )
                              }
                            >
                              <span className="pesquisa-check-box" />
                              Com garantia
                            </button>

                            <button
                              type="button"
                              className={`pesquisa-check-button ${filtros.aceitaRetoma
                                  ? 'active'
                                  : ''
                                }`}
                              onClick={() =>
                                setFiltros(
                                  (f) => ({
                                    ...f,
                                    aceitaRetoma:
                                      !f.aceitaRetoma
                                  })
                                )
                              }
                              style={{
                                marginTop: 8
                              }}
                            >
                              <span className="pesquisa-check-box" />
                              Aceita retoma
                            </button>
                          </>
                        )}

                      {tipoSeguro ===
                        'imovel' && (
                          <button
                            type="button"
                            className={`pesquisa-check-button ${filtros.garagem
                                ? 'active'
                                : ''
                              }`}
                            onClick={() =>
                              setFiltros(
                                (f) => ({
                                  ...f,
                                  garagem:
                                    !f.garagem
                                })
                              )
                            }
                          >
                            <span className="pesquisa-check-box" />
                            Com garagem
                          </button>
                        )}
                    </div>
                  )}
                </div>
              </div>

              <div className="pesquisa-sidebar-footer">
                <button
                  type="button"
                  className="pesquisa-apply-btn"
                  onClick={
                    executarFiltrosManuais
                  }
                >
                  <Icon
                    path={mdiTune}
                    size={0.75}
                    style={{
                      marginRight: 6,
                      verticalAlign:
                        'middle'
                    }}
                  />
                  Aplicar Filtros
                  {filtrosAtivos.length >
                    0 &&
                    ` (${filtrosAtivos.length})`}
                </button>

                {filtrosAtivos.length >
                  0 && (
                    <button
                      type="button"
                      onClick={
                        limparFiltros
                      }
                      style={{
                        width: '100%',
                        minHeight: 38,
                        marginTop: 6,
                        border: 0,
                        background:
                          'transparent',
                        color: '#64748b',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Limpar todos
                    </button>
                  )}
              </div>
            </div>
          </aside>

          <main className="pesquisa-main-content">
            <div className="pesquisa-mobile-toolbar">
              <button
                type="button"
                onClick={() =>
                  setSidebarMobileAberta(
                    true
                  )
                }
                className="mobile-filter-trigger"
              >
                <Icon
                  path={
                    mdiFilterVariant
                  }
                  size={0.8}
                />

                Filtros

                {filtrosAtivos.length >
                  0 && (
                    <span className="mobile-filter-count">
                      {
                        filtrosAtivos.length
                      }
                    </span>
                  )}
              </button>

              <select
                className="mobile-sort-select"
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value
                  )
                }
                aria-label="Ordenar resultados"
              >
                <option value="relevancia">
                  Relevância
                </option>
                <option value="recentes">
                  Mais recentes
                </option>
                <option value="preco_asc">
                  Preço mais baixo
                </option>
                <option value="preco_desc">
                  Preço mais alto
                </option>
              </select>
            </div>

            {filtrosAtivos.length >
              0 && (
                <div className="pesquisa-active-filters">
                  {filtrosAtivos
                    .slice(0, 8)
                    .map(
                      (
                        filtro,
                        index
                      ) => (
                        <span
                          className="pesquisa-active-filter"
                          key={`${filtro}-${index}`}
                        >
                          {filtro}
                        </span>
                      )
                    )}

                  {filtrosAtivos.length >
                    8 && (
                      <span className="pesquisa-active-filter">
                        +
                        {filtrosAtivos.length -
                          8}{' '}
                        mais
                      </span>
                    )}
                </div>
              )}

            <div className="pesquisa-topbar">
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#475569'
                }}
              >
                {loading &&
                  resultados.length ===
                  0
                  ? 'A procurar...'
                  : `${totalResultados} resultados encontrados`}
              </span>

              <select
                className="pesquisa-sort"
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value
                  )
                }
              >
                <option value="relevancia">
                  Ordenar por: Relevância
                </option>

                <option value="recentes">
                  Mais recentes
                </option>

                <option value="preco_asc">
                  Preço: Mais baixo
                </option>

                <option value="preco_desc">
                  Preço: Mais alto
                </option>
              </select>
            </div>

            {error && (
              <div className="pesquisa-error">
                {error}
              </div>
            )}

            {mostrarPublicidadeTopo && (
              <AdBanner
                mode="direct"
                placement={
                  tipoSeguro === 'carro'
                    ? 'listagem_topo_carros'
                    : 'listagem_topo_imoveis'
                }
                vertical={
                  tipoSeguro
                }
                minHeight={100}
                style={{
                  marginBottom: 20
                }}
              />
            )}

            {loading &&
              resultados.length ===
              0 ? (
              <div className="nx-skeleton-list">
                {Array.from({
                  length: 5
                }).map(
                  (_, index) => (
                    <div
                      className="pesquisa-skeleton-card"
                      key={index}
                    />
                  )
                )}
              </div>
            ) : resultados.length >
              0 ? (
              <div className="nx-list-horizontal">
                {resultados.map(
                  (
                    anuncio,
                    index
                  ) => (
                    <React.Fragment
                      key={
                        anuncio._id
                      }
                    >
                      <AnuncioCard
                        anuncio={
                          anuncio
                        }
                        showStatus={
                          true
                        }
                      />

                      {mostrarPublicidadeInline &&
                        (index + 1) %
                        6 ===
                        0 &&
                        index <
                        resultados.length -
                        1 && (
                          <AdBanner
                            mode="direct"
                            placement={
                              tipoSeguro ===
                                'carro'
                                ? 'feed_pesquisa_carros'
                                : 'feed_pesquisa_imoveis'
                            }
                            vertical={
                              tipoSeguro
                            }
                            variant="inline"
                            minHeight={90}
                          />
                        )}
                    </React.Fragment>
                  )
                )}

                {temMais &&
                  !loading && (
                    <div
                      ref={
                        sentinelaRef
                      }
                      className="infinite-spinner-container"
                      aria-label="A carregar mais anúncios"
                    >
                      <div className="infinite-dot-pulse" />
                      <div className="infinite-dot-pulse" />
                      <div className="infinite-dot-pulse" />
                    </div>
                  )}
              </div>
            ) : (
              <div className="pesquisa-empty">
                <Icon
                  path={
                    mdiAlertOutline
                  }
                  size={1.8}
                  color="#94a3b8"
                  style={{
                    margin:
                      '0 auto 12px'
                  }}
                />

                <h3
                  style={{
                    margin:
                      '0 0 6px',
                    fontSize: 20,
                    fontWeight: 800,
                    color:
                      '#071326'
                  }}
                >
                  Nenhum anúncio encontrado
                </h3>

                <p
                  style={{
                    color:
                      '#64748b',
                    fontSize: 14,
                    margin:
                      '0 0 20px'
                  }}
                >
                  Tenta limpar os filtros
                  aplicados ou alterar os
                  critérios de pesquisa.
                </p>

                <button
                  type="button"
                  onClick={
                    limparFiltros
                  }
                  className="pesquisa-apply-btn"
                  style={{
                    width: 'auto',
                    padding:
                      '0 24px'
                  }}
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
