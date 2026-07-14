const EXTRA_SPLIT_PATTERN = /[\n\r;,|]+/u;
const MAX_EXTRA_LENGTH = 70;
const MAX_EXTRAS = 40;

const limparExtra = (value) => String(value || '')
  .replace(/^\s*[-*]+/, '')
  .replace(/\s+/g, ' ')
  .trim();

export const normalizarExtras = (value) => {
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

export const juntarExtras = (current, next) => normalizarExtras([
  ...(Array.isArray(current) ? current : []),
  next,
]);
