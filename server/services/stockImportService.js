import crypto from 'node:crypto';
import Anuncio from '../models/Anuncio.js';
import User from '../models/User.js';
import StockIntegration from '../models/StockIntegration.js';
import StockImportLog from '../models/StockImportLog.js';
import { calcularQualidadeAnuncio } from '../utils/anuncioInsights.js';
import { normalizarCarro, normalizarEquipamento } from '../utils/anuncioNormalize.js';

const MAX_ERRORS_PER_LOG = 80;
const MAX_FEED_ITEMS = 1500;
const FEED_TIMEOUT_MS = 45_000;

const texto = (value, max = 240) => String(value ?? '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, max);

const chave = (value) => texto(value, 120)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[._/\\]+/g, '-')
  .replace(/\s+/g, '-');

const numero = (value) => {
  if (value === null || value === undefined || value === '') return undefined;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  const cleaned = String(value)
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const inteiro = (value) => {
  const parsed = numero(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : undefined;
};

const primeiroValor = (source, keys) => {
  if (!source || typeof source !== 'object') return undefined;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== null && source[key] !== undefined && source[key] !== '') {
      return source[key];
    }
  }
  const normalized = Object.entries(source).reduce((acc, [key, value]) => {
    acc[chave(key)] = value;
    return acc;
  }, {});
  for (const key of keys) {
    const found = normalized[chave(key)];
    if (found !== null && found !== undefined && found !== '') return found;
  }
  return undefined;
};

const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined || value === '') return [];
  return [value];
};

const flattenObject = (value, prefix = '', output = {}) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return output;
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child)) flattenObject(child, path, output);
    else output[path] = child;
  }
  return output;
};

const procurarItemsJson = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  const candidates = [
    payload.items,
    payload.data,
    payload.rows,
    payload.stock,
    payload.inventory,
    payload.vehicles,
    payload.vehicle,
    payload.viaturas,
    payload.viatura,
    payload.carros,
    payload.carro,
    payload.anuncios,
    payload.anuncio,
  ];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
    if (candidate && typeof candidate === 'object') return [candidate];
  }
  return Object.values(payload).find(Array.isArray) || [];
};

const decodeXmlEntities = (value) => String(value || '')
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .trim();

const atribuirValorXml = (item, tag, value) => {
  if (value === null || value === undefined || value === '') return;
  if (Object.prototype.hasOwnProperty.call(item, tag)) {
    item[tag] = [...asArray(item[tag]), value].flat();
  } else {
    item[tag] = value;
  }
};

const extrairValoresXml = (fragment, tagName) => {
  const escapedTag = String(tagName).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<${escapedTag}\\b[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`, 'gi');
  const values = [];
  let match;
  while ((match = regex.exec(fragment))) {
    const value = decodeXmlEntities(match[1].replace(/<[^>]+>/g, ' '));
    if (value) values.push(value);
  }
  return values;
};

const parseXmlItems = (xml) => {
  const items = [];
  const itemRegex = /<(vehicle|viatura|carro|item|ad|anuncio)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) && items.length < MAX_FEED_ITEMS) {
    const body = match[2];
    const item = {};
    const tagRegex = /<([A-Za-z0-9_.:-]+)\b[^>]*>([\s\S]*?)<\/\1>/g;
    let tagMatch;
    while ((tagMatch = tagRegex.exec(body))) {
      const tag = tagMatch[1].split(':').pop();
      const rawValue = tagMatch[2];
      const normalizedTag = chave(tag);

      if (normalizedTag === 'images') {
        const imageUrls = extrairValoresXml(rawValue, 'image');
        atribuirValorXml(item, tag, imageUrls.length ? imageUrls : decodeXmlEntities(rawValue.replace(/<[^>]+>/g, ' ')));
        continue;
      }

      if (normalizedTag === 'extras') {
        const extras = extrairValoresXml(rawValue, 'extra');
        atribuirValorXml(item, tag, extras.length ? extras : decodeXmlEntities(rawValue.replace(/<[^>]+>/g, ' ')));
        continue;
      }

      if (normalizedTag === 'localization') {
        ['title', 'city', 'address', 'postal_code', 'locality', 'email'].forEach((field) => {
          const value = extrairValoresXml(rawValue, field)[0];
          if (value) atribuirValorXml(item, 'localization.' + field, value);
        });
        const phones = extrairValoresXml(rawValue, 'phone');
        if (phones.length) {
          atribuirValorXml(item, 'localization.phone', phones[0]);
          atribuirValorXml(item, 'localization.phones.phone', phones);
        }
        continue;
      }

      const value = decodeXmlEntities(rawValue.replace(/<[^>]+>/g, ' '));
      atribuirValorXml(item, tag, value);
    }
    items.push(item);
  }
  return items;
};

const detectarSeparadorCsv = (header = '') => {
  const candidatos = [';', ',', '\t'];
  return candidatos
    .map((separador) => ({ separador, total: String(header).split(separador).length }))
    .sort((a, b) => b.total - a.total)[0]?.separador || ';';
};

const parseCsvRows = (csv, delimiter) => {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const input = String(csv || '').replace(/^\uFEFF/, '');

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (!quoted && char === delimiter) {
      row.push(cell.trim());
      cell = '';
      continue;
    }

    if (!quoted && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell.trim());
      if (row.some((value) => value !== '')) rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some((value) => value !== '')) rows.push(row);
  return rows;
};

const parseCsvItems = (csv) => {
  const linhasTexto = String(csv || '').split(/\r?\n/).filter((line) => line.trim());
  const separador = detectarSeparadorCsv(linhasTexto[0] || '');
  const rows = parseCsvRows(csv, separador);
  if (rows.length < 2) return [];
  const headers = rows[0].map((header, index) => texto(header || `campo_${index + 1}`, 120));
  return rows.slice(1, MAX_FEED_ITEMS + 1).map((row) => headers.reduce((acc, header, index) => {
    acc[header] = row[index] ?? '';
    return acc;
  }, {}));
};

const parseFeedPayload = (raw, contentType = '', formato = 'auto') => {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return [];
  const firstLine = trimmed.split(/\r?\n/, 1)[0] || '';
  const shouldTryJson = formato === 'json' || (formato === 'auto' && (/json/i.test(contentType) || /^[\[{]/.test(trimmed)));
  const shouldTryXml = formato === 'xml' || (formato === 'auto' && (/xml/i.test(contentType) || /^</.test(trimmed)));
  const shouldTryCsv = formato === 'csv' || (formato === 'auto' && (/csv|text\/plain/i.test(contentType) || (/[,;\t]/.test(firstLine) && !/^</.test(trimmed))));

  if (shouldTryJson) {
    const payload = JSON.parse(trimmed);
    return procurarItemsJson(payload).slice(0, MAX_FEED_ITEMS);
  }
  if (shouldTryXml) return parseXmlItems(trimmed);
  if (shouldTryCsv) return parseCsvItems(trimmed);
  return [];
};

const normalizarCombustivel = (value) => {
  const key = chave(value);
  if (!key) return undefined;
  if (key.includes('hibrido') || key.includes('hybrid')) return 'hibrido';
  if (key.includes('eletrico') || key.includes('electric')) return 'eletrico';
  if (key.includes('diesel') || key.includes('gasoleo')) return 'diesel';
  if (key.includes('gpl') || key.includes('lpg')) return 'gpl';
  if (key.includes('gasolina') || key.includes('petrol')) return 'gasolina';
  return undefined;
};

const normalizarTransmissao = (value) => {
  const key = chave(value);
  if (!key) return undefined;
  if (key.includes('manual')) return 'manual';
  if (key.includes('automat')) return 'automatico';
  return undefined;
};

const normalizarSeccao = (value, km) => {
  const key = chave(value);
  if (['novo', 'new'].includes(key)) return 'novo';
  if (['seminovo', 'semi-novo', 'demo', 'demonstracao'].includes(key)) return 'seminovo';
  if (['classico', 'classic'].includes(key)) return 'classico';
  if (Number(km || 0) <= 1000 && ['0', ''].includes(key)) return 'seminovo';
  return 'usado';
};

const normalizarTipoVeiculoImportado = (value) => {
  const key = chave(value);
  if (!key) return 'outro';
  if (key.includes('suv') || key.includes('tt') || key.includes('todo-o-terreno')) return 'suv';
  if (key.includes('desportivo') || key.includes('coupe')) return 'coupe';
  if (key.includes('cabrio') || key.includes('descapotavel')) return 'cabrio';
  if (key.includes('carrinha') || key.includes('station')) return 'carrinha';
  if (key.includes('comercial')) return 'comercial';
  if (key.includes('monovolume')) return 'monovolume';
  if (key.includes('pickup') || key.includes('pick-up')) return 'pickup';
  if (key.includes('citadino')) return 'citadino';
  if (key.includes('utilitario')) return 'utilitario';
  if (key.includes('sedan') || key.includes('berlina')) return 'sedan';
  return 'outro';
};

const normalizarVin = (value) => {
  const key = String(value || '').trim().toUpperCase();
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(key) ? key : undefined;
};

const extrairFotos = (raw) => {
  const direct = primeiroValor(raw, ['fotos', 'photos', 'imagens', 'images', 'imageUrls', 'image_urls', 'foto', 'photo', 'imagem', 'image', 'urlImagem']);
  const values = asArray(direct)
    .flatMap((item) => {
      if (Array.isArray(item)) return item;
      if (item && typeof item === 'object') return Object.values(item);
      return String(item || '').split(/[\n,;|]+/);
    })
    .map((value) => texto(value, 1200))
    .filter((value) => /^https?:\/\//i.test(value));
  return [...new Set(values)].slice(0, 40);
};

const construirTitulo = (carro) => [carro.marca, carro.modelo, carro.versao].filter(Boolean).join(' ').slice(0, 160);

const mapearViatura = (item, integracao, user) => {
  const raw = flattenObject(item);
  const externalId = texto(primeiroValor(raw, ['id', 'ID', 'externalId', 'external_id', 'codigo', 'code', 'stockId', 'stock_id', 'referencia', 'reference', 'vehicle.id', 'viatura.id']), 180);
  const marca = texto(primeiroValor(raw, ['marca', 'make', 'brand', 'vehicle.make', 'viatura.marca']), 60);
  const modelo = texto(primeiroValor(raw, ['modelo', 'model', 'vehicle.model', 'viatura.modelo']), 80);
  const versao = texto(primeiroValor(raw, ['versao', 'versão', 'version', 'trim', 'variant', 'vehicle.trim']), 100);
  const ano = inteiro(primeiroValor(raw, ['ano', 'year', 'anoMatricula', 'registrationYear', 'registration_year', 'first_registration_year', 'firstRegistrationYear', 'vehicle.year']));
  const mesRegisto = inteiro(primeiroValor(raw, ['mesRegisto', 'mes_registo', 'month', 'registrationMonth', 'registration_month', 'first_registration_month', 'firstRegistrationMonth', 'mesMatricula'])) || 1;
  const km = inteiro(primeiroValor(raw, ['km', 'kms', 'quilometros', 'quilometragem', 'mileage']));
  const preco = inteiro(primeiroValor(raw, ['preco', 'preço', 'price', 'valor', 'amount']));
  const combustivel = normalizarCombustivel(primeiroValor(raw, ['combustivel', 'combustível', 'fuel', 'fuelType', 'fuel_type']));
  const transmissao = normalizarTransmissao(primeiroValor(raw, ['transmissao', 'transmissão', 'gearbox', 'gearboxType', 'gearbox_type', 'transmission']));
  const cilindrada = inteiro(primeiroValor(raw, ['cilindrada', 'cc', 'engineSize', 'engine_capacity', 'engineCapacity', 'displacement']));
  const potencia = inteiro(primeiroValor(raw, ['potencia', 'potência', 'cv', 'hp', 'power']));
  const cor = texto(primeiroValor(raw, ['cor', 'color', 'exteriorColor', 'exterior_color']), 40);
  const portas = inteiro(primeiroValor(raw, ['portas', 'doors', 'number_doors', 'numberDoors', 'number_of_doors']));
  const lugares = inteiro(primeiroValor(raw, ['lugares', 'seats', 'capacity', 'number_seats', 'numberSeats']));
  const fotos = extrairFotos(raw);
  const externalUrl = texto(primeiroValor(raw, ['url', 'link', 'vehicleUrl', 'detailUrl']), 1000);
  const garantiaMeses = inteiro(primeiroValor(raw, ['garantiaMeses', 'warrantyMonths', 'warranty_months', 'vendors_warranty_months']));
  const videoUrl = texto(primeiroValor(raw, ['videoUrl', 'video_url', 'video']), 500);

  const faltas = [];
  if (!externalId) faltas.push('ID externo');
  if (!marca) faltas.push('marca');
  if (!modelo) faltas.push('modelo');
  if (!ano) faltas.push('ano');
  if (km === undefined) faltas.push('quilometragem');
  if (!preco) faltas.push('preço');
  if (!fotos.length) faltas.push('fotografias');
  if (faltas.length) {
    throw new Error(`Campos em falta: ${faltas.join(', ')}.`);
  }

  const carro = normalizarCarro({
    marca,
    modelo,
    versao,
    ano,
    mesRegisto,
    km,
    combustivel,
    transmissao,
    cilindrada,
    potencia,
    cor,
    portas,
    lugares,
    tracao: primeiroValor(raw, ['tracao', 'tracção', 'traction']) || undefined,
    seccao: normalizarSeccao(primeiroValor(raw, ['estado', 'condition', 'seccao', 'secção', 'new_used']), km),
    tipoVeiculo: normalizarTipoVeiculoImportado(primeiroValor(raw, ['tipoVeiculo', 'bodyType', 'body', 'categoria', 'category'])),
    matricula: primeiroValor(raw, ['matricula', 'licensePlate', 'license_plate', 'plate', 'registration']),
    vin: normalizarVin(primeiroValor(raw, ['vin', 'chassis', 'chassisNumber'])),
    inspecaoAte: primeiroValor(raw, ['inspecaoAte', 'inspection_valid_until']),
  });

  const localizacao = {
    distrito: texto(primeiroValor(raw, ['distrito', 'district']) || integracao.defaultDistrito || user.localidade || '', 80),
    cidade: texto(primeiroValor(raw, ['cidade', 'city', 'localidade', 'localization.city', 'localization.locality']) || integracao.defaultCidade || user.localidade || '', 100),
    morada: texto(primeiroValor(raw, ['morada', 'address', 'localization.address']) || '', 180),
  };

  const equipamento = normalizarEquipamento(primeiroValor(raw, ['equipamento', 'extras', 'options', 'features']));
  const titulo = texto(primeiroValor(raw, ['titulo', 'title']) || construirTitulo(carro), 180);
  const descricao = texto(primeiroValor(raw, ['descricao', 'descrição', 'description']) || `Viatura importada automaticamente do stock do stand ${integracao.nome}.`, 2200);
  const rawHash = crypto.createHash('sha256').update(JSON.stringify(item)).digest('hex');

  const anuncio = {
    tipo: 'carro',
    titulo,
    descricao,
    preco,
    telefone: texto(primeiroValor(raw, ['telefone', 'phone', 'phones', 'contactPhone', 'contact_phone', 'localization.phone', 'localization.phones.phone']) || integracao.defaultTelefone || user.telefone || '', 40),
    email: texto(primeiroValor(raw, ['email', 'contactEmail', 'contact_email', 'localization.email']) || integracao.defaultEmail || user.email || '', 180).toLowerCase(),
    utilizador: integracao.utilizador,
    localizacao,
    fotos,
    videoUrl,
    equipamento,
    carro,
    garantia: garantiaMeses ? `${garantiaMeses} meses` : (primeiroValor(raw, ['garantia', 'warranty']) ? texto(primeiroValor(raw, ['garantia', 'warranty']), 80) : null),
    aceitaRetoma: ['sim', 'true', '1', 'yes'].includes(chave(primeiroValor(raw, ['aceitaRetoma', 'retoma', 'tradeIn', 'accept_returns']))),
    origemImportacao: {
      provider: integracao.provider,
      integracao: integracao._id,
      externalId,
      externalUrl,
      importadoEm: new Date(),
      vistoNoFeedEm: new Date(),
      rawHash,
    },
  };

  Object.assign(anuncio, calcularQualidadeAnuncio(anuncio));
  return { externalId, anuncio };
};

const fetchFeed = async (integracao) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);
  try {
    const headers = { Accept: 'application/json, application/xml, text/xml;q=0.9, */*;q=0.8' };
    if (integracao.apiToken) headers.Authorization = `Bearer ${integracao.apiToken}`;
    const response = await fetch(integracao.feedUrl, { headers, signal: controller.signal });
    const body = await response.text();
    if (!response.ok) throw new Error(`Feed respondeu HTTP ${response.status}.`);
    return { body, contentType: response.headers.get('content-type') || '' };
  } finally {
    clearTimeout(timeout);
  }
};

export const sincronizarIntegracaoStock = async (integracaoId, { acionadoPor = 'cron' } = {}) => {
  const startedAt = new Date();
  const integracao = await StockIntegration.findById(integracaoId).select('+apiToken');
  if (!integracao) throw new Error('Integração não encontrada.');
  const user = await User.findById(integracao.utilizador).select('nome email telefone localidade premiumAtivo tipo tipoConta');
  if (!user) throw new Error('Utilizador associado ao feed não existe.');

  if (integracao.sincronizacao?.estado === 'em_execucao') {
    throw new Error('Esta integração já está a sincronizar.');
  }

  integracao.sincronizacao = {
    ...(integracao.sincronizacao || {}),
    estado: 'em_execucao',
    ultimaExecucaoEm: startedAt,
    ultimoErro: '',
  };
  await integracao.save({ validateBeforeSave: false });

  const resumo = { recebidos: 0, criados: 0, atualizados: 0, pausados: 0, falhados: 0 };
  const erros = [];
  const vistos = new Set();

  try {
    const { body, contentType } = await fetchFeed(integracao);
    const items = parseFeedPayload(body, contentType, integracao.formato);
    resumo.recebidos = items.length;

    for (const item of items) {
      try {
        const { externalId, anuncio } = mapearViatura(item, integracao, user);
        vistos.add(externalId);

        const existente = await Anuncio.findOne({
          utilizador: integracao.utilizador,
          'origemImportacao.provider': integracao.provider,
          'origemImportacao.externalId': externalId,
        });

        if (existente) {
          await Anuncio.updateOne(
            { _id: existente._id },
            {
              $set: {
                ...anuncio,
                estado: existente.estado === 'apagado' ? 'apagado' : 'ativo',
                destacado: existente.destacado === true,
                dataExpiracaoDestaque: existente.dataExpiracaoDestaque,
                visitas: existente.visitas || 0,
                guardados: existente.guardados || 0,
                contactos: existente.contactos || 0,
                historicoVisitas: existente.historicoVisitas || [],
                'origemImportacao.removidoNoFeedEm': null,
              },
            },
            { runValidators: true }
          );
          resumo.atualizados += 1;
        } else {
          await Anuncio.create({
            ...anuncio,
            estado: 'ativo',
            destacado: false,
            planoPublicacao: user.premiumAtivo ? 'premium' : 'basico',
          });
          resumo.criados += 1;
        }
      } catch (error) {
        resumo.falhados += 1;
        if (erros.length < MAX_ERRORS_PER_LOG) {
          erros.push({
            externalId: texto(primeiroValor(flattenObject(item), ['id', 'externalId', 'codigo', 'stockId', 'referencia']), 180),
            titulo: texto(primeiroValor(flattenObject(item), ['titulo', 'title', 'marca', 'modelo']), 180),
            motivo: texto(error.message, 400),
          });
        }
      }
    }

    const importadosAtivos = await Anuncio.find({
      utilizador: integracao.utilizador,
      estado: { $in: ['ativo', 'pendente'] },
      'origemImportacao.provider': integracao.provider,
      'origemImportacao.integracao': integracao._id,
    }).select('_id origemImportacao.externalId').lean();

    const ausentes = importadosAtivos.filter((anuncio) => !vistos.has(anuncio.origemImportacao?.externalId));
    if (ausentes.length) {
      const ids = ausentes.map((anuncio) => anuncio._id);
      await Anuncio.updateMany(
        { _id: { $in: ids } },
        { $set: { estado: 'pausado', 'origemImportacao.removidoNoFeedEm': new Date() } }
      );
      resumo.pausados = ids.length;
    }

    const estado = resumo.falhados > 0 ? 'parcial' : 'sucesso';
    const terminadoEm = new Date();
    await StockImportLog.create({
      integracao: integracao._id,
      utilizador: integracao.utilizador,
      provider: integracao.provider,
      iniciadoEm: startedAt,
      terminadoEm,
      estado,
      resumo,
      erros,
      acionadoPor,
    });

    await StockIntegration.updateOne(
      { _id: integracao._id },
      {
        $set: {
          sincronizacao: {
            estado,
            ultimaExecucaoEm: startedAt,
            ultimaConclusaoEm: terminadoEm,
            ultimoErro: erros[0]?.motivo || '',
            ultimoResumo: resumo,
          },
        },
      }
    );

    return { estado, resumo, erros };
  } catch (error) {
    const terminadoEm = new Date();
    resumo.falhados = resumo.falhados || resumo.recebidos || 1;
    const erro = texto(error.message, 500);
    await StockImportLog.create({
      integracao: integracao._id,
      utilizador: integracao.utilizador,
      provider: integracao.provider,
      iniciadoEm: startedAt,
      terminadoEm,
      estado: 'erro',
      resumo,
      erros: [{ motivo: erro }],
      acionadoPor,
    });
    await StockIntegration.updateOne(
      { _id: integracao._id },
      {
        $set: {
          sincronizacao: {
            estado: 'erro',
            ultimaExecucaoEm: startedAt,
            ultimaConclusaoEm: terminadoEm,
            ultimoErro: erro,
            ultimoResumo: resumo,
          },
        },
      }
    );
    throw error;
  }
};

export const importarConteudoStockManual = async ({
  nome = '',
  utilizador,
  conteudo,
  formato = 'auto',
  fileName = '',
  defaultDistrito = '',
  defaultCidade = '',
  defaultTelefone = '',
  defaultEmail = '',
  criadoPor,
} = {}) => {
  const startedAt = new Date();
  const user = await User.findById(utilizador).select('nome email telefone localidade premiumAtivo tipo tipoConta');
  if (!user) throw Object.assign(new Error('Utilizador associado nao encontrado.'), { status: 404 });

  const conteudoLimpo = String(conteudo || '').trim();
  if (!conteudoLimpo) throw Object.assign(new Error('Adiciona um ficheiro ou conteudo para importar.'), { status: 400 });
  if (conteudoLimpo.length > 6_000_000) throw Object.assign(new Error('O ficheiro e demasiado grande para importacao direta.'), { status: 413 });

  const formatoSeguro = ['auto', 'json', 'xml', 'csv'].includes(formato) ? formato : 'auto';
  const integracao = await StockIntegration.create({
    nome: texto(nome || `Importacao manual ${fileName || new Date().toLocaleDateString('pt-PT')}`, 120),
    provider: 'manual',
    utilizador,
    feedUrl: `manual://stock/${Date.now()}`,
    formato: formatoSeguro,
    ativo: true,
    frequenciaHoras: 24,
    defaultDistrito,
    defaultCidade,
    defaultTelefone,
    defaultEmail,
    criadoPor,
    sincronizacao: {
      estado: 'em_execucao',
      ultimaExecucaoEm: startedAt,
      ultimoErro: '',
    },
  });

  const resumo = { recebidos: 0, criados: 0, atualizados: 0, pausados: 0, falhados: 0 };
  const erros = [];

  try {
    const contentType = fileName.endsWith('.csv') ? 'text/csv' : fileName.endsWith('.json') ? 'application/json' : fileName.endsWith('.xml') ? 'application/xml' : '';
    const items = parseFeedPayload(conteudoLimpo, contentType, formatoSeguro);
    resumo.recebidos = items.length;
    if (!items.length) throw new Error('Nao foram encontradas viaturas no ficheiro/conteudo enviado.');

    for (const item of items) {
      try {
        const { externalId, anuncio } = mapearViatura(item, integracao, user);
        const existente = await Anuncio.findOne({
          utilizador: integracao.utilizador,
          'origemImportacao.provider': integracao.provider,
          'origemImportacao.externalId': externalId,
        });

        if (existente) {
          await Anuncio.updateOne(
            { _id: existente._id },
            {
              $set: {
                ...anuncio,
                estado: existente.estado === 'apagado' ? 'apagado' : 'ativo',
                destacado: existente.destacado === true,
                dataExpiracaoDestaque: existente.dataExpiracaoDestaque,
                visitas: existente.visitas || 0,
                guardados: existente.guardados || 0,
                contactos: existente.contactos || 0,
                historicoVisitas: existente.historicoVisitas || [],
                'origemImportacao.removidoNoFeedEm': null,
              },
            },
            { runValidators: true }
          );
          resumo.atualizados += 1;
        } else {
          await Anuncio.create({
            ...anuncio,
            estado: 'ativo',
            destacado: false,
            planoPublicacao: user.premiumAtivo ? 'premium' : 'basico',
          });
          resumo.criados += 1;
        }
      } catch (error) {
        resumo.falhados += 1;
        if (erros.length < MAX_ERRORS_PER_LOG) {
          const flat = flattenObject(item);
          erros.push({
            externalId: texto(primeiroValor(flat, ['id', 'externalId', 'codigo', 'stockId', 'referencia']), 180),
            titulo: texto(primeiroValor(flat, ['titulo', 'title', 'marca', 'modelo']), 180),
            motivo: texto(error.message, 400),
          });
        }
      }
    }

    const estado = resumo.falhados > 0 ? 'parcial' : 'sucesso';
    const terminadoEm = new Date();
    await StockImportLog.create({
      integracao: integracao._id,
      utilizador: integracao.utilizador,
      provider: integracao.provider,
      iniciadoEm: startedAt,
      terminadoEm,
      estado,
      resumo,
      erros,
      acionadoPor: 'admin',
    });
    await StockIntegration.updateOne(
      { _id: integracao._id },
      {
        $set: {
          sincronizacao: {
            estado,
            ultimaExecucaoEm: startedAt,
            ultimaConclusaoEm: terminadoEm,
            ultimoErro: erros[0]?.motivo || '',
            ultimoResumo: resumo,
          },
        },
      }
    );

    return { integracao: integracao._id, estado, resumo, erros };
  } catch (error) {
    const terminadoEm = new Date();
    const erro = texto(error.message, 500);
    await StockImportLog.create({
      integracao: integracao._id,
      utilizador: integracao.utilizador,
      provider: integracao.provider,
      iniciadoEm: startedAt,
      terminadoEm,
      estado: 'erro',
      resumo: { ...resumo, falhados: resumo.falhados || 1 },
      erros: [{ motivo: erro }],
      acionadoPor: 'admin',
    });
    await StockIntegration.updateOne(
      { _id: integracao._id },
      {
        $set: {
          sincronizacao: {
            estado: 'erro',
            ultimaExecucaoEm: startedAt,
            ultimaConclusaoEm: terminadoEm,
            ultimoErro: erro,
            ultimoResumo: { ...resumo, falhados: resumo.falhados || 1 },
          },
        },
      }
    );
    throw error;
  }
};

export const sincronizarIntegracoesStockAtivas = async ({ limite = 8 } = {}) => {
  const agora = new Date();
  const integracoes = await StockIntegration.find({ ativo: true })
    .sort({ 'sincronizacao.ultimaExecucaoEm': 1, createdAt: 1 })
    .limit(limite)
    .lean();

  const resultados = [];
  for (const integracao of integracoes) {
    const ultima = integracao.sincronizacao?.ultimaExecucaoEm ? new Date(integracao.sincronizacao.ultimaExecucaoEm) : null;
    const frequenciaMs = Math.max(6, integracao.frequenciaHoras || 6) * 60 * 60 * 1000;
    if (ultima && agora.getTime() - ultima.getTime() < frequenciaMs) continue;
    try {
      const resultado = await sincronizarIntegracaoStock(integracao._id, { acionadoPor: 'cron' });
      resultados.push({ integracao: integracao._id, ok: true, ...resultado });
    } catch (error) {
      resultados.push({ integracao: integracao._id, ok: false, erro: error.message });
    }
  }
  return resultados;
};