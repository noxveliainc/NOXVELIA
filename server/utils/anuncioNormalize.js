const EXTRA_SPLIT_PATTERN = /[\n\r;,|]+/u;
const MAX_EXTRA_LENGTH = 70;
const MAX_EXTRAS = 40;

const limparExtra = (value) => String(value || '')
  .replace(/^\s*[-*]+/, '')
  .replace(/\s+/g, ' ')
  .trim();

export const normalizarEquipamento = (value) => {
  const rawItems = Array.isArray(value) ? value : [value];
  const seen = new Set();
  const extras = [];

  rawItems
    .flatMap((item) => String(item || '').replace(/\u2022|\u00b7/g, '\n').split(EXTRA_SPLIT_PATTERN))
    .map(limparExtra)
    .filter(Boolean)
    .forEach((item) => {
      const extra = item.slice(0, MAX_EXTRA_LENGTH).trim();
      const key = extra.toLocaleLowerCase('pt-PT');
      if (!extra || seen.has(key) || extras.length >= MAX_EXTRAS) return;
      seen.add(key);
      extras.push(extra);
    });

  return extras;
};

const optionalNumber = (value) => {
  if (value === '' || value === null || value === undefined) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

const booleanValue = (value) => value === true || value === 'true';

const tipoImovelPermitido = new Set(['apartamento', 'moradia', 'terreno', 'loja', 'escritorio', 'comercial', 'garagem']);
const tipoImovelAlias = {
  comercio: 'loja',
  comercio_servicos: 'loja',
  comercial: 'loja',
  escritorio: 'escritorio',
  quinta: 'moradia',
};

export const normalizarTipoImovel = (value = 'apartamento') => {
  const raw = String(value || 'apartamento').trim().toLowerCase();
  const normalizado = tipoImovelAlias[raw] || raw;
  return tipoImovelPermitido.has(normalizado) ? normalizado : 'apartamento';
};

export const normalizarImovel = (value = {}) => {
  const tipoImovel = normalizarTipoImovel(value.tipoImovel);
  const semTipologia = ['terreno', 'loja', 'escritorio', 'comercial', 'garagem'].includes(tipoImovel);

  return {
    tipoImovel,
    tipologia: semTipologia ? '-' : (value.tipologia || 'T2'),
    area: optionalNumber(value.area),
    areaTerreno: optionalNumber(value.areaTerreno),
    quartos: semTipologia ? undefined : optionalNumber(value.quartos),
    casasBanho: tipoImovel === 'terreno' ? undefined : optionalNumber(value.casasBanho),
    garagem: booleanValue(value.garagem),
    jardim: booleanValue(value.jardim),
    piscina: booleanValue(value.piscina),
    varanda: booleanValue(value.varanda),
    elevador: booleanValue(value.elevador),
    arrecadacao: booleanValue(value.arrecadacao),
    mobilado: booleanValue(value.mobilado),
    condominio: booleanValue(value.condominio),
    andar: optionalNumber(value.andar),
    anoConstrucao: optionalNumber(value.anoConstrucao ?? value.ano),
    estadoConservacao: value.estadoConservacao || value.estado || undefined,
    certificadoEnergetico: value.certificadoEnergetico || undefined,
  };
};

const criarErroValidacao = (message) => Object.assign(new Error(message), { status: 400 });

const limparTexto = (value, maxLength = 120) => String(value || '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, maxLength);

const textoChave = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[._/\\]+/g, '-')
  .replace(/\s+/g, '-');

const numberInRange = (value, { min, max, integer = true, field, required = false }) => {
  if (value === '' || value === null || value === undefined) {
    if (required) throw criarErroValidacao(`${field} é obrigatório.`);
    return undefined;
  }
  const number = Number(value);
  if (!Number.isFinite(number)) throw criarErroValidacao(`${field} tem de ser numérico.`);
  if (integer && !Number.isInteger(number)) throw criarErroValidacao(`${field} tem de ser um número inteiro.`);
  if (number < min || number > max) throw criarErroValidacao(`${field} deve estar entre ${min} e ${max}.`);
  return number;
};

const optionValue = (value, { field, allowed, aliases = {}, required = false, fallback }) => {
  if (value === '' || value === null || value === undefined) {
    if (required) throw criarErroValidacao(`${field} é obrigatório.`);
    return fallback;
  }
  const key = textoChave(value);
  const normalized = aliases[key] || key;
  if (!allowed.has(normalized)) {
    throw criarErroValidacao(`${field} inválido.`);
  }
  return normalized;
};

const combustiveisPermitidos = new Set(['gasolina', 'diesel', 'eletrico', 'hibrido', 'gpl']);
const transmissoesPermitidas = new Set(['manual', 'automatico']);
const tracoesPermitidas = new Set(['dianteira', 'traseira', 'integral']);
const seccoesPermitidas = new Set(['novo', 'usado', 'seminovo', 'classico']);
const tiposVeiculoPermitidos = new Set(['citadino', 'utilitario', 'sedan', 'carrinha', 'suv', 'crossover', 'coupe', 'cabrio', 'monovolume', 'pickup', 'comercial', 'van', 'outro']);

const aliasesCombustivel = {
  electrico: 'eletrico',
  eletrico: 'eletrico',
  hibrido: 'hibrido',
  'plug-in-hibrido': 'hibrido',
  plugin: 'hibrido',
};

const aliasesTransmissao = {
  automatica: 'automatico',
  automatico: 'automatico',
  auto: 'automatico',
};

const aliasesTracao = {
  frente: 'dianteira',
  fwd: 'dianteira',
  'traccao-dianteira': 'dianteira',
  'tracao-dianteira': 'dianteira',
  rwd: 'traseira',
  'traccao-traseira': 'traseira',
  'tracao-traseira': 'traseira',
  total: 'integral',
  awd: 'integral',
  '4x4': 'integral',
  '4wd': 'integral',
  'traccao-integral': 'integral',
  'tracao-integral': 'integral',
};

const aliasesSeccao = {
  usada: 'usado',
  novo: 'novo',
  nova: 'novo',
  'semi-novo': 'seminovo',
  seminova: 'seminovo',
  classica: 'classico',
};

const aliasesTipoVeiculo = {
  'tipo-de-veiculo': 'outro',
  automovel: 'outro',
  berlina: 'sedan',
  saloon: 'sedan',
  station: 'carrinha',
  sw: 'carrinha',
  break: 'carrinha',
  carrinhas: 'carrinha',
  carrinha: 'carrinha',
  carrinhao: 'carrinha',
  utilitario: 'utilitario',
  citadino: 'citadino',
  jipe: 'suv',
  todooterreno: 'suv',
  'todo-o-terreno': 'suv',
  coupe: 'coupe',
  'coupé': 'coupe',
  cabriolet: 'cabrio',
  descapotavel: 'cabrio',
  monovolume: 'monovolume',
  monovolumes: 'monovolume',
  'pick-up': 'pickup',
  pickup: 'pickup',
  furgoneta: 'van',
  furgao: 'van',
  furgão: 'van',
  comercial: 'comercial',
};

export const normalizarCarro = (value = {}, { obrigatorio = false } = {}) => {
  const anoAtual = new Date().getFullYear();
  const combustivel = optionValue(value.combustivel, {
    field: 'Combustível',
    allowed: combustiveisPermitidos,
    aliases: aliasesCombustivel,
    required: obrigatorio,
    fallback: undefined,
  });
  const eletrico = combustivel === 'eletrico';

  const vin = limparTexto(value.vin, 17).toUpperCase();
  if (vin && !/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
    throw criarErroValidacao('O VIN deve ter 17 caracteres e não pode conter I, O ou Q.');
  }

  const carro = {
    marca: limparTexto(value.marca, 60),
    modelo: limparTexto(value.modelo, 80),
    versao: limparTexto(value.versao, 100),
    ano: numberInRange(value.ano, { min: 1930, max: anoAtual + 1, field: 'Ano', required: obrigatorio }),
    mesRegisto: numberInRange(value.mesRegisto, { min: 1, max: 12, field: 'Mês de registo', required: obrigatorio }),
    vin: vin || undefined,
    km: numberInRange(value.km, { min: 0, max: 2000000, field: 'Quilometragem', required: obrigatorio }),
    combustivel,
    transmissao: optionValue(value.transmissao, {
      field: 'Transmissão',
      allowed: transmissoesPermitidas,
      aliases: aliasesTransmissao,
      required: obrigatorio,
      fallback: undefined,
    }),
    cilindrada: eletrico ? undefined : numberInRange(value.cilindrada, { min: 1, max: 10000, field: 'Cilindrada', required: obrigatorio }),
    potencia: numberInRange(value.potencia, { min: 1, max: 2000, field: 'Potência', required: obrigatorio }),
    cor: limparTexto(value.cor, 40),
    portas: numberInRange(value.portas, { min: 2, max: 6, field: 'Número de portas', required: obrigatorio }),
    lugares: numberInRange(value.lugares, { min: 1, max: 9, field: 'Número de lugares', required: obrigatorio }),
    tracao: optionValue(value.tracao ?? value.traccao, {
      field: 'Tracção',
      allowed: tracoesPermitidas,
      aliases: aliasesTracao,
      required: obrigatorio,
      fallback: undefined,
    }),
    seccao: optionValue(value.seccao ?? value.secao, {
      field: 'Secção',
      allowed: seccoesPermitidas,
      aliases: aliasesSeccao,
      required: obrigatorio,
      fallback: undefined,
    }),
    tipoVeiculo: optionValue(value.tipoVeiculo ?? value.tipoDeVeiculo, {
      field: 'Tipo de veículo',
      allowed: tiposVeiculoPermitidos,
      aliases: aliasesTipoVeiculo,
      required: obrigatorio,
      fallback: undefined,
    }),
    matricula: limparTexto(value.matricula, 16),
    inspecaoAte: value.inspecaoAte || undefined,
    relatorioCarfax: booleanValue(value.relatorioCarfax),
  };

  if (carro.seccao === 'novo' && Number(carro.km || 0) > 1000) {
    throw criarErroValidacao('Viaturas novas não devem ultrapassar 1000 km. Usa Seminovo ou Usado.');
  }

  if (obrigatorio) {
    if (!carro.marca) throw criarErroValidacao('Marca é obrigatória.');
    if (!carro.modelo) throw criarErroValidacao('Modelo é obrigatório.');
  }

  Object.keys(carro).forEach((key) => {
    if (carro[key] === '' || carro[key] === undefined) delete carro[key];
  });
  return carro;
};
