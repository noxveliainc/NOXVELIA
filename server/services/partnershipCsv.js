import { cleanText, ensureHttpsUrl, isValidEmail, normalizeContactType, normalizeEmail } from './partnershipEmailUtils.js';

const splitCsvLine = (line) => {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if ((char === ',' || char === ';') && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  cells.push(current.trim());
  return cells;
};

const normalizeHeader = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/\s+/g, '_');

const aliases = {
  email: 'email',
  e_mail: 'email',
  mail: 'email',
  nome: 'nomePessoa',
  pessoa: 'nomePessoa',
  nome_pessoa: 'nomePessoa',
  contacto: 'nomePessoa',
  empresa: 'nomeEmpresa',
  nome_empresa: 'nomeEmpresa',
  companhia: 'nomeEmpresa',
  tipo: 'tipoEmpresa',
  tipo_empresa: 'tipoEmpresa',
  website: 'website',
  site: 'website',
  telefone: 'telefone',
  telemovel: 'telefone',
  localidade: 'localidade',
  cidade: 'localidade',
  origem: 'origem',
  notas: 'notasInternas',
  notas_internas: 'notasInternas',
};

export const parsePartnershipCsv = (csvText, existingEmails = new Set(), suppressedEmails = new Set()) => {
  const lines = String(csvText || '')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return { headers: [], validRows: [], invalidRows: [], summary: { total: 0, valid: 0, invalid: 0, duplicatesFile: 0, duplicatesDatabase: 0, suppressed: 0 } };

  const rawHeaders = splitCsvLine(lines[0]);
  const fields = rawHeaders.map((header) => aliases[normalizeHeader(header)] || normalizeHeader(header));
  const seen = new Set();
  const validRows = [];
  const invalidRows = [];
  let duplicatesFile = 0;
  let duplicatesDatabase = 0;
  let suppressed = 0;

  lines.slice(1).forEach((line, index) => {
    const cells = splitCsvLine(line);
    const row = {};
    fields.forEach((field, idx) => { row[field] = cells[idx] || ''; });
    const email = normalizeEmail(row.email);
    const errors = [];

    if (!isValidEmail(email)) errors.push('Email invalido');
    if (seen.has(email)) {
      duplicatesFile += 1;
      errors.push('Duplicado no ficheiro');
    }
    if (existingEmails.has(email)) {
      duplicatesDatabase += 1;
      errors.push('Ja existe na base de dados');
    }
    if (suppressedEmails.has(email)) {
      suppressed += 1;
      errors.push('Email suprimido');
    }

    seen.add(email);
    const website = ensureHttpsUrl(row.website);
    const normalized = {
      email,
      nomePessoa: cleanText(row.nomePessoa, 120),
      nomeEmpresa: cleanText(row.nomeEmpresa, 180),
      tipoEmpresa: normalizeContactType(row.tipoEmpresa),
      website: website || '',
      telefone: cleanText(row.telefone, 60),
      localidade: cleanText(row.localidade, 120),
      origem: cleanText(row.origem || 'csv', 120),
      notasInternas: cleanText(row.notasInternas, 1000),
    };

    const result = {
      linha: index + 2,
      raw: line,
      contacto: normalized,
      erros: errors,
    };
    if (errors.length) invalidRows.push(result); else validRows.push(result);
  });

  return {
    headers: fields,
    validRows,
    invalidRows,
    summary: {
      total: lines.length - 1,
      valid: validRows.length,
      invalid: invalidRows.length,
      duplicatesFile,
      duplicatesDatabase,
      suppressed,
    },
  };
};
