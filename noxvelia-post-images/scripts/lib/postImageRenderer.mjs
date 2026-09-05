import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toolRoot = path.resolve(__dirname, '../..');
const repoRoot = path.resolve(toolRoot, '..');

const ACCENTS = {
  car: '#2ac1b4',
  property: '#3ecf8e',
  brand: '#2ac1b4',
};

const MIME_BY_EXT = new Map([
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
  ['.svg', 'image/svg+xml'],
]);

export function parseArgs(argv = process.argv.slice(2)) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith('--')) continue;
    const raw = item.slice(2);
    const eq = raw.indexOf('=');
    if (eq !== -1) {
      args[raw.slice(0, eq)] = raw.slice(eq + 1);
      continue;
    }
    const next = argv[index + 1];
    if (next && !next.startsWith('--')) {
      args[raw] = next;
      index += 1;
    } else {
      args[raw] = true;
    }
  }
  return args;
}

export function getSize(size = 'square') {
  const presets = {
    square: { width: 1080, height: 1080 },
    portrait: { width: 1080, height: 1350 },
    story: { width: 1080, height: 1920 },
    landscape: { width: 1200, height: 628 },
  };
  return presets[size] || presets.square;
}

export function resolveLocalPath(value) {
  if (!value) return '';
  return path.isAbsolute(value) ? value : path.resolve(process.cwd(), value);
}

export async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    const require = createRequire(import.meta.url);
    const backendSharp = path.join(repoRoot, 'server', 'node_modules', 'sharp');
    try {
      return require(backendSharp);
    } catch {
      throw new Error('Dependencia sharp em falta. Corre `npm install` dentro de noxvelia-post-images.');
    }
  }
}

export function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function wrapText(value = '', maxChars = 24, maxLines = 3) {
  const words = String(value).trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
    if (lines.length === maxLines) break;
  }

  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?]*$/, '')}...`;
  }
  return lines;
}

export async function fileToDataUri(filePath) {
  if (!filePath) return '';
  const resolved = resolveLocalPath(filePath);
  const ext = path.extname(resolved).toLowerCase();
  const mime = MIME_BY_EXT.get(ext) || 'application/octet-stream';
  const buffer = await fs.readFile(resolved);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

export async function photoToDataUri(filePath) {
  if (!filePath) return '';
  const resolved = resolveLocalPath(filePath);
  const sharp = await loadSharp();
  const buffer = await sharp(resolved)
    .rotate()
    .resize({ width: 1800, height: 1400, fit: 'cover', withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toBuffer();
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

async function defaultLogoDataUri() {
  const logoPath = path.join(repoRoot, 'client', 'public', 'logo-noxvelia.png');
  try {
    return await fileToDataUri(logoPath);
  } catch {
    return '';
  }
}

function background({ width, height, accent }) {
  const lineOpacity = 0.07;
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#071326"/>
        <stop offset="0.60" stop-color="#102f50"/>
        <stop offset="1" stop-color="#040b14"/>
      </linearGradient>
      <radialGradient id="glow" cx="75%" cy="15%" r="55%">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.22"/>
        <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="photoOverlay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="rgba(7,19,38,0)"/>
        <stop offset="0.65" stop-color="rgba(7,19,38,0.45)"/>
        <stop offset="1" stop-color="rgba(7,19,38,0.85)"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#glow)"/>
    <g opacity="${lineOpacity}" stroke="#ffffff" stroke-width="1.5">
      <path d="M${width * 0.08} ${height * 0.18} C ${width * 0.34} ${height * 0.08}, ${width * 0.66} ${height * 0.34}, ${width * 0.94} ${height * 0.18}" fill="none"/>
      <path d="M${width * 0.04} ${height * 0.82} C ${width * 0.28} ${height * 0.70}, ${width * 0.58} ${height * 0.96}, ${width * 0.96} ${height * 0.78}" fill="none"/>
    </g>`;
}

async function logoBlock({ x, y, vertical, accent }) {
  const logo = await defaultLogoDataUri();
  const label = vertical === 'property' ? 'ESTATE' : vertical === 'car' ? 'DRIVE' : 'PORTUGAL';
  const mark = logo
    ? `<image href="${logo}" x="${x}" y="${y - 6}" width="46" height="46" preserveAspectRatio="xMidYMid meet"/>`
    : `<circle cx="${x + 23}" cy="${y + 15}" r="21" fill="${accent}" opacity="0.25"/><text x="${x + 23}" y="${y + 23}" text-anchor="middle" font-size="24" font-weight="900" fill="${accent}">N</text>`;
  return `
    <g>
      ${mark}
      <text x="${x + 58}" y="${y + 21}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">NOXVELIA</text>
      <text x="${x + 232}" y="${y + 21}" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="900" fill="${accent}" letter-spacing="2.5">${label}</text>
    </g>`;
}

function placeholderPhoto({ x, y, width, height, accent, vertical }) {
  const icon = vertical === 'property'
    ? `<path d="M0 34 L58 -10 L116 34 V102 H78 V54 H38 V102 H0 Z" fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>`
    : `<path d="M8 74 H116 L102 36 C98 24 88 18 74 18 H50 C36 18 26 24 22 36 Z M28 76 A14 14 0 1 0 28.1 76 M96 76 A14 14 0 1 0 96.1 76" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="32" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <g transform="translate(${x + width / 2 - 58}, ${y + height / 2 - 52})" opacity="0.8">${icon}</g>`;
}

function imagePanel({ imageDataUri, x, y, width, height, accent, vertical }) {
  if (!imageDataUri) return placeholderPhoto({ x, y, width, height, accent, vertical });
  return `
    <clipPath id="listingPhotoClip"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="32"/></clipPath>
    <image href="${imageDataUri}" xlink:href="${imageDataUri}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" clip-path="url(#listingPhotoClip)"/>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="32" fill="url(#photoOverlay)"/>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="32" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <rect x="${x + 24}" y="${y + 24}" width="72" height="8" rx="4" fill="${accent}"/>`;
}

function chips(items, { x, y, accent }) {
  const clean = items.filter(Boolean).slice(0, 4);
  let cursor = x;
  return clean.map((item) => {
    const text = escapeXml(item);
    const width = Math.max(110, text.length * 13 + 34);
    const node = `<g><rect x="${cursor}" y="${y}" width="${width}" height="46" rx="23" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)"/><text x="${cursor + 20}" y="${y + 29}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#f1f5f9">${text}</text></g>`;
    cursor += width + 12;
    return node;
  }).join('');
}

export async function listingSvg(options) {
  const vertical = options.vertical === 'property' ? 'property' : 'car';
  const { width, height } = getSize(options.size);
  const accent = vertical === 'property' ? ACCENTS.property : ACCENTS.car;
  const imageDataUri = options.image ? await photoToDataUri(options.image) : '';
  const photoX = 56;
  const photoY = 160;
  const photoW = width - 112;
  const photoH = Math.round(height * (height > width ? 0.42 : 0.45));
  const badgeY = photoY + photoH + 40;
  const textY = badgeY + 54;
  const titleMaxLines = height > width ? 3 : 2;
  const titleLines = wrapText(options.title || (vertical === 'property' ? 'Imóvel em destaque' : 'Automóvel em destaque'), width > 1100 ? 32 : 26, titleMaxLines);
  const titleSvg = titleLines.map((line, index) =>
    `<text x="56" y="${textY + index * 54}" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="-0.8">${escapeXml(line)}</text>`
  ).join('');
  const price = options.price || 'Sob consulta';
  const location = options.location || 'Portugal';
  const details = vertical === 'property'
    ? [options.type, options.rooms, options.area, options.extra]
    : [options.year, options.km, options.fuel, options.extra];
  const chipY = Math.min(height - 180, textY + titleLines.length * 56 + 10);

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background({ width, height, accent })}
    ${await logoBlock({ x: 56, y: 52, vertical, accent })}
    ${imagePanel({ imageDataUri, x: photoX, y: photoY, width: photoW, height: photoH, accent, vertical })}
    <text x="82" y="${photoY + photoH - 76}" font-family="Inter, Arial, sans-serif" font-size="62" font-weight="950" fill="#ffffff" letter-spacing="-1">${escapeXml(price)}</text>
    <text x="82" y="${photoY + photoH - 34}" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="800" fill="#d9c49c">${escapeXml(location)}</text>
    <text x="56" y="${badgeY}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="900" fill="${accent}" letter-spacing="2.5">${escapeXml(options.badge || 'ANÚNCIO EM DESTAQUE')}</text>
    ${titleSvg}
    ${chips(details, { x: 56, y: chipY, accent })}
    <g transform="translate(56 ${height - 100})">
      <rect x="0" y="0" width="${width - 112}" height="52" rx="26" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)"/>
      <text x="28" y="33" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#ffffff">${escapeXml(options.cta || 'Ver detalhes em noxvelia.com')}</text>
      <text x="${width - 142}" y="33" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="${accent}">NOXVELIA</text>
    </g>
  </svg>`;
}

export async function brandSvg(options) {
  const { width, height } = getSize(options.size || 'square');
  const accent = ACCENTS.brand;
  const headlineLines = wrapText(options.headline || 'Automóveis e imóveis sem intermediários', width > 1100 ? 28 : 22, 4);
  const subtitleLines = wrapText(options.subtitle || 'Contacto direto, sem comissões por venda e stock real verificado em Portugal.', width > 1100 ? 48 : 38, 3);
  const startY = Math.round(height * 0.30);
  const headline = headlineLines.map((line, index) =>
    `<text x="56" y="${startY + index * 66}" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="950" fill="#ffffff" letter-spacing="-1">${escapeXml(line)}</text>`
  ).join('');
  const subtitle = subtitleLines.map((line, index) =>
    `<text x="58" y="${startY + headlineLines.length * 68 + 28 + index * 36}" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="650" fill="#94a3b8">${escapeXml(line)}</text>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background({ width, height, accent })}
    ${await logoBlock({ x: 56, y: 56, vertical: 'brand', accent })}
    <g transform="translate(${width - 340} 60)" opacity="0.9">
      <rect x="0" y="0" width="260" height="64" rx="32" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
      <text x="36" y="40" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="${accent}">DRIVE</text>
      <text x="142" y="40" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="#3ecf8e">ESTATE</text>
    </g>
    <text x="56" y="${startY - 48}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="900" fill="#d9c49c" letter-spacing="3">${escapeXml(options.badge || 'PORTAL DE CLASSIFICADOS')}</text>
    ${headline}
    ${subtitle}
    <g transform="translate(56 ${height - 180})">
      <rect x="0" y="0" width="${Math.min(520, width - 112)}" height="68" rx="34" fill="${accent}"/>
      <text x="36" y="43" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="950" fill="#071326">${escapeXml(options.cta || 'noxvelia.com')}</text>
    </g>
    <g transform="translate(56 ${height - 80})" opacity="0.85">
      <text x="0" y="0" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#cbd5e1">Carros</text>
      <circle cx="84" cy="-6" r="4" fill="${accent}"/>
      <text x="108" y="0" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#cbd5e1">Imóveis</text>
      <circle cx="202" cy="-6" r="4" fill="${accent}"/>
      <text x="226" y="0" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#cbd5e1">Sem comissões</text>
    </g>
  </svg>`;
}

export async function renderSvg(svg, output, { saveSvg = false } = {}) {
  const sharp = await loadSharp();
  const resolved = resolveLocalPath(output || 'output/post.png');
  const ext = path.extname(resolved).toLowerCase() || '.png';
  const finalOutput = ext ? resolved : `${resolved}.png`;
  await fs.mkdir(path.dirname(finalOutput), { recursive: true });

  const image = sharp(Buffer.from(svg));
  if (ext === '.jpg' || ext === '.jpeg') {
    await image.jpeg({ quality: 92, mozjpeg: true }).toFile(finalOutput);
  } else if (ext === '.webp') {
    await image.webp({ quality: 92 }).toFile(finalOutput);
  } else {
    await image.png({ compressionLevel: 9 }).toFile(finalOutput);
  }

  if (saveSvg) {
    const svgOutput = finalOutput.replace(/\.(png|jpg|jpeg|webp)$/i, '.svg');
    await fs.writeFile(svgOutput, svg, 'utf8');
  }
  return finalOutput;
}

export async function renderListingPost(options) {
  const svg = await listingSvg(options);
  return renderSvg(svg, options.output, { saveSvg: options.svg === true || options.svg === 'true' });
}

export async function renderBrandPost(options) {
  const svg = await brandSvg(options);
  return renderSvg(svg, options.output, { saveSvg: options.svg === true || options.svg === 'true' });
}

export function printDone(output) {
  console.log(`[noxvelia-post-images] Criado: ${output}`);
}