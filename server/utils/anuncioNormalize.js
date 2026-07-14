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
