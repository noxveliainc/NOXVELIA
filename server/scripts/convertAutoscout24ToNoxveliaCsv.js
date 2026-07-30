import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { DISTRITOS_CIDADES_PT } from '../../client/src/data/localizacoes.js';

const OUTPUT_HEADERS = [
  'id',
  'marca',
  'modelo',
  'versao',
  'ano',
  'mesRegisto',
  'km',
  'combustivel',
  'transmissao',
  'cilindrada',
  'potencia',
  'preco',
  'cor',
  'portas',
  'lugares',
  'fotos',
  'cidade',
  'distrito',
  'telefone',
  'email',
  'descricao',
  'url',
];

const PORTUGAL_COUNTRY_VALUES = new Set(['pt', 'prt', 'portugal']);
const DEFAULT_FALLBACK_IMAGE = 'https://www.noxvelia.com/logo-noxvelia.png';

const normalizeKey = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[.\s/-]+/g, '_')
  .replace(/[^a-z0-9_]/g, '');

const normalizeText = (value, max = 500) => String(value ?? '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, max);

const normalizeCityKey = (value) => normalizeText(value)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const cityToDistrict = Object.entries(DISTRITOS_CIDADES_PT).reduce((acc, [district, cities]) => {
  acc[normalizeCityKey(district)] = district;
  for (const city of cities) acc[normalizeCityKey(city)] = district;
  return acc;
}, {});

const parseArgs = (argv) => {
  const args = {
    country: 'PT',
    limit: 100,
    offset: 0,
    fallbackImage: DEFAULT_FALLBACK_IMAGE,
    defaultDistrito: '',
    defaultCidade: '',
    defaultTelefone: '',
    defaultEmail: '',
    sellerName: '',
    requirePhotos: false,
  };

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--')) continue;

    const [rawKey, inlineValue] = arg.slice(2).split('=');
    const key = normalizeKey(rawKey);
    const nextValue = inlineValue ?? argv[index + 1];
    const consumeNext = inlineValue === undefined && nextValue && !String(nextValue).startsWith('--');

    const setString = (name) => {
      args[name] = normalizeText(nextValue, 2000);
      if (consumeNext) index += 1;
    };

    switch (key) {
      case 'input':
      case 'in':
        setString('input');
        break;
      case 'output':
      case 'out':
        setString('output');
        break;
      case 'country':
      case 'pais':
        setString('country');
        break;
      case 'limit':
      case 'limite':
        args.limit = Math.max(1, Number.parseInt(nextValue, 10) || args.limit);
        if (consumeNext) index += 1;
        break;
      case 'offset':
        args.offset = Math.max(0, Number.parseInt(nextValue, 10) || 0);
        if (consumeNext) index += 1;
        break;
      case 'fallback_image':
      case 'fallbackimage':
      case 'imagem':
        setString('fallbackImage');
        break;
      case 'default_distrito':
      case 'distrito':
        setString('defaultDistrito');
        break;
      case 'default_cidade':
      case 'cidade':
        setString('defaultCidade');
        break;
      case 'telefone':
      case 'default_telefone':
        setString('defaultTelefone');
        break;
      case 'email':
      case 'default_email':
        setString('defaultEmail');
        break;
      case 'stand':
      case 'seller':
      case 'seller_name':
        setString('sellerName');
        break;
      case 'require_photos':
      case 'requirephotos':
        args.requirePhotos = true;
        break;
      case 'help':
      case 'h':
        args.help = true;
        break;
      default:
        break;
    }
  }

  return args;
};

const usage = () => {
  const scriptName = path.relative(process.cwd(), fileURLToPath(import.meta.url));
  return `
Uso:
  node ${scriptName} --input autoscout24_dataset_20251108.csv --output autoscout24-noxvelia-pt.csv --limit 50

Opcoes principais:
  --country PT              Filtra Portugal por defeito.
  --limit 100               Quantidade maxima de viaturas exportadas.
  --offset 0                Ignora N viaturas PT antes de exportar.
  --fallback-image URL      Foto usada quando o dataset nao trouxer imagens.
  --require-photos          Ignora viaturas sem imagens reais.
  --distrito Lisboa         Distrito usado se a cidade nao for reconhecida.
  --cidade Lisboa           Cidade usada se o CSV nao trouxer cidade.
  --telefone 912345678      Contacto usado na importacao.
  --email stock@stand.pt    Email usado na importacao.
  --stand "Stand Demo"      Nome usado na descricao.
`.trim();
};

const detectDelimiter = (header = '') => {
  const candidates = [';', ',', '\t'];
  return candidates
    .map((delimiter) => ({ delimiter, total: String(header).split(delimiter).length }))
    .sort((a, b) => b.total - a.total)[0]?.delimiter || ',';
};

const parseCsvRecord = (record, delimiter) => {
  const cells = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < record.length; index += 1) {
    const char = record[index];
    const next = record[index + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (!quoted && char === delimiter) {
      cells.push(cell);
      cell = '';
      continue;
    }

    cell += char;
  }

  cells.push(cell);
  return cells.map((value) => value.trim());
};

const hasClosedQuotes = (value) => {
  let quoted = false;
  for (let index = 0; index < value.length; index += 1) {
    if (value[index] !== '"') continue;
    if (quoted && value[index + 1] === '"') {
      index += 1;
    } else {
      quoted = !quoted;
    }
  }
  return !quoted;
};

async function* readCsvRecords(filePath) {
  const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  let buffer = '';

  for await (const line of rl) {
    buffer = buffer ? `${buffer}\n${line}` : line.replace(/^\uFEFF/, '');
    if (!hasClosedQuotes(buffer)) continue;
    yield buffer;
    buffer = '';
  }

  if (buffer) yield buffer;
}

const toObject = (headers, cells) => headers.reduce((acc, header, index) => {
  acc[header] = cells[index] ?? '';
  return acc;
}, {});

const pick = (row, keys) => {
  for (const key of keys) {
    const found = row[normalizeKey(key)];
    if (found !== undefined && found !== null && String(found).trim() !== '') return found;
  }
  return '';
};

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const cleaned = String(value)
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? String(Math.round(parsed)) : '';
};

const parseRegistration = (value, fallbackYear) => {
  const text = normalizeText(value, 40);
  const match = text.match(/(\d{4})[-/.](\d{1,2})|(\d{1,2})[-/.](\d{4})|(\d{4})/);
  if (!match) return { year: toNumber(fallbackYear), month: '1' };
  if (match[1] && match[2]) return { year: match[1], month: String(Number.parseInt(match[2], 10) || 1) };
  if (match[3] && match[4]) return { year: match[4], month: String(Number.parseInt(match[3], 10) || 1) };
  return { year: match[5] || toNumber(fallbackYear), month: '1' };
};

const mapFuel = (value) => {
  const key = normalizeKey(value);
  const values = {
    petrol: 'Gasolina',
    gasoline: 'Gasolina',
    gasolina: 'Gasolina',
    diesel: 'Diesel',
    gasoleo: 'Diesel',
    electric: 'Eletrico',
    eletrico: 'Eletrico',
    electrico: 'Eletrico',
    hybrid: 'Hibrido',
    hibrido: 'Hibrido',
    plugin_hybrid: 'Hibrido',
    plug_in_hybrid: 'Hibrido',
    lpg: 'GPL',
    gpl: 'GPL',
  };
  return values[key] || normalizeText(value, 40);
};

const mapTransmission = (value) => {
  const key = normalizeKey(value);
  if (['automatic', 'automatico', 'automatica', 'auto'].includes(key)) return 'Automatico';
  if (key === 'manual') return 'Manual';
  return normalizeText(value, 40);
};

const parseImageList = (value) => {
  if (!value) return [];
  return String(value)
    .replace(/^\[|\]$/g, '')
    .split(/[\n,;|]+/)
    .map((item) => normalizeText(item.replace(/^['"]|['"]$/g, ''), 1400))
    .filter((item) => /^https?:\/\//i.test(item));
};

const csvEscape = (value) => {
  const text = String(value ?? '');
  if (/[;"\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
};

const isPortugalRow = (row, countryArg) => {
  if (normalizeKey(countryArg) === 'all') return true;
  const country = normalizeKey(pick(row, ['country_code', 'country', 'countryCode']));
  if (country) return PORTUGAL_COUNTRY_VALUES.has(country);
  const city = normalizeCityKey(pick(row, ['city', 'cidade']));
  return Boolean(city && cityToDistrict[city]);
};

const mapRow = (row, args) => {
  const city = normalizeText(pick(row, ['city', 'cidade']) || args.defaultCidade, 100);
  const registration = parseRegistration(
    pick(row, ['registration_date', 'first_registration', 'registrationDate']),
    pick(row, ['production_year', 'year'])
  );
  const rawImages = [
    pick(row, ['images', 'image_urls', 'imageUrls', 'photos', 'photo_urls', 'image', 'photo']),
    pick(row, ['picture', 'pictures', 'cover_image', 'coverImage']),
  ].flatMap(parseImageList);
  const photos = [...new Set(rawImages)];
  if (args.requirePhotos && !photos.length) return null;

  const brand = normalizeText(pick(row, ['make', 'brand', 'marca']), 60);
  const model = normalizeText(pick(row, ['model', 'modelo']), 80);
  const version = normalizeText(pick(row, ['model_version', 'version', 'trim', 'variant', 'versao']), 100);
  const title = [brand, model, version].filter(Boolean).join(' ');
  const sellerName = normalizeText(args.sellerName || pick(row, ['seller_company_name', 'seller_name', 'dealer_name']), 120);
  const originalDescription = normalizeText(pick(row, ['description', 'descricao']), 1200);
  const description = normalizeText([
    originalDescription,
    sellerName ? `Stock de teste associado a ${sellerName}.` : 'Stock de teste importado a partir do dataset AutoScout24.',
    'Confirma sempre os dados antes de publicar como anuncio real.',
  ].filter(Boolean).join(' '), 1800);

  if (!brand || !model || !registration.year) return null;

  return {
    id: `AS24-${normalizeText(pick(row, ['id', 'listing_id', 'vehicle_id']) || `${brand}-${model}-${registration.year}-${Date.now()}`, 120)}`,
    marca: brand,
    modelo: model,
    versao: version,
    ano: registration.year,
    mesRegisto: registration.month,
    km: toNumber(pick(row, ['mileage_km', 'mileage_km_raw', 'mileage', 'km'])),
    combustivel: mapFuel(pick(row, ['fuel_category', 'primary_fuel', 'fuel_type', 'fuel'])),
    transmissao: mapTransmission(pick(row, ['transmission', 'gearbox'])),
    cilindrada: toNumber(pick(row, ['cylinders_volume_cc', 'engine_cc', 'cc', 'displacement'])),
    potencia: toNumber(pick(row, ['power_hp', 'hp', 'horsepower']) || (Number(pick(row, ['power_kw'])) * 1.35962 || '')),
    preco: toNumber(pick(row, ['price', 'price_gross', 'amount'])),
    cor: normalizeText(pick(row, ['body_color_original', 'body_color', 'color', 'cor']), 40),
    portas: toNumber(pick(row, ['nr_doors', 'doors', 'portas'])),
    lugares: toNumber(pick(row, ['nr_seats', 'seats', 'lugares'])),
    fotos: (photos.length ? photos : [args.fallbackImage]).join('|'),
    cidade: city,
    distrito: cityToDistrict[normalizeCityKey(city)] || normalizeText(args.defaultDistrito, 80) || 'Portugal',
    telefone: normalizeText(args.defaultTelefone, 40),
    email: normalizeText(args.defaultEmail, 180).toLowerCase(),
    descricao: description || title,
    url: normalizeText(pick(row, ['url', 'listing_url', 'detail_url', 'vehicle_url']), 1000),
  };
};

const convert = async (args) => {
  if (args.help || !args.input || !args.output) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }

  if (!fs.existsSync(args.input)) {
    throw new Error(`Ficheiro de entrada nao encontrado: ${args.input}`);
  }

  fs.mkdirSync(path.dirname(path.resolve(args.output)), { recursive: true });
  const output = fs.createWriteStream(args.output, { encoding: 'utf8' });
  output.write(`${OUTPUT_HEADERS.join(';')}\n`);

  let headers = [];
  let delimiter = ',';
  let scanned = 0;
  let portugalRows = 0;
  let skipped = 0;
  let exported = 0;

  for await (const record of readCsvRecords(args.input)) {
    if (!headers.length) {
      delimiter = detectDelimiter(record);
      headers = parseCsvRecord(record, delimiter).map(normalizeKey);
      continue;
    }

    scanned += 1;
    const row = toObject(headers, parseCsvRecord(record, delimiter));
    if (!isPortugalRow(row, args.country)) continue;
    portugalRows += 1;

    if (skipped < args.offset) {
      skipped += 1;
      continue;
    }

    const mapped = mapRow(row, args);
    if (!mapped) continue;
    output.write(`${OUTPUT_HEADERS.map((header) => csvEscape(mapped[header])).join(';')}\n`);
    exported += 1;
    if (exported >= args.limit) break;
  }

  output.end();
  await new Promise((resolve) => output.on('finish', resolve));

  return { scanned, portugalRows, skipped, exported, output: path.resolve(args.output) };
};

convert(parseArgs(process.argv))
  .then((result) => {
    console.log('AutoScout24 convertido para Noxvelia.');
    console.log(`Linhas analisadas: ${result.scanned}`);
    console.log(`Viaturas Portugal encontradas: ${result.portugalRows}`);
    console.log(`Viaturas exportadas: ${result.exported}`);
    console.log(`Ficheiro: ${result.output}`);
  })
  .catch((error) => {
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  });
