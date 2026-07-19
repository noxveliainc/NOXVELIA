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
  const lineOpacity = 0.08;
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#071116"/>
        <stop offset="0.62" stop-color="#091524"/>
        <stop offset="1" stop-color="#030711"/>
      </linearGradient>
      <radialGradient id="glow" cx="72%" cy="18%" r="55%">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.18"/>
        <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="photoClip"><rect x="64" y="174" width="${width - 128}" height="${Math.round(height * 0.46)}" rx="38"/></clipPath>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#glow)"/>
    <g opacity="${lineOpacity}" stroke="#ffffff" stroke-width="2">
      <path d="M${width * 0.08} ${height * 0.18} C ${width * 0.34} ${height * 0.08}, ${width * 0.66} ${height * 0.34}, ${width * 0.94} ${height * 0.18}" fill="none"/>
      <path d="M${width * 0.04} ${height * 0.82} C ${width * 0.28} ${height * 0.70}, ${width * 0.58} ${height * 0.96}, ${width * 0.96} ${height * 0.78}" fill="none"/>
    </g>`;
}

async function logoBlock({ x, y, vertical, accent }) {
  const logo = await defaultLogoDataUri();
  const label = vertical === 'property' ? 'ESTATE' : vertical === 'car' ? 'DRIVE' : 'PORTUGAL';
  const mark = logo
    ? `<image href="${logo}" x="${x}" y="${y - 8}" width="46" height="46" preserveAspectRatio="xMidYMid meet"/>`
    : `<circle cx="${x + 23}" cy="${y + 15}" r="21" fill="${accent}" opacity="0.25"/><text x="${x + 23}" y="${y + 23}" text-anchor="middle" font-size="24" font-weight="900" fill="${accent}">N</text>`;
  return `
    <g>
      ${mark}
      <text x="${x + 58}" y="${y + 20}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff" letter-spacing="-1">NOXVELIA</text>
      <text x="${x + 238}" y="${y + 20}" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="900" fill="${accent}" letter-spacing="2">${label}</text>
    </g>`;
}

function placeholderPhoto({ x, y, width, height, accent, vertical }) {
  const icon = vertical === 'property'
    ? `<path d="M0 34 L58 -10 L116 34 V102 H78 V54 H38 V102 H0 Z" fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>`
    : `<path d="M8 74 H116 L102 36 C98 24 88 18 74 18 H50 C36 18 26 24 22 36 Z M28 76 A14 14 0 1 0 28.1 76 M96 76 A14 14 0 1 0 96.1 76" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="38" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
    <g transform="translate(${x + width / 2 - 58}, ${y + height / 2 - 52})" opacity="0.85">${icon}</g>`;
}

function imagePanel({ imageDataUri, x, y, width, height, accent, vertical }) {
  if (!imageDataUri) return placeholderPhoto({ x, y, width, height, accent, vertical });
  return `
    <clipPath id="listingPhotoClip"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="38"/></clipPath>
    <image href="${imageDataUri}" xlink:href="${imageDataUri}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" clip-path="url(#listingPhotoClip)"/>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="38" fill="rgba(3,7,18,0.22)"/>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="38" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
    <rect x="${x}" y="${y + height - 160}" width="${width}" height="160" fill="rgba(3,7,18,0.55)" clip-path="url(#listingPhotoClip)"/>
    <rect x="${x + 26}" y="${y + 26}" width="88" height="10" rx="5" fill="${accent}"/>`;
}

function chips(items, { x, y, accent }) {
  const clean = items.filter(Boolean).slice(0, 4);
  let cursor = x;
  return clean.map((item) => {
    const text = escapeXml(item);
    const width = Math.max(116, text.length * 14 + 38);
    const node = `<g><rect x="${cursor}" y="${y}" width="${width}" height="50" rx="25" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.13)"/><text x="${cursor + 22}" y="${y + 32}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">${text}</text></g>`;
    cursor += width + 14;
    return node;
  }).join('');
}

export async function listingSvg(options) {
  const vertical = options.vertical === 'property' ? 'property' : 'car';
  const { width, height } = getSize(options.size);
  const accent = vertical === 'property' ? ACCENTS.property : ACCENTS.car;
  const imageDataUri = options.image ? await photoToDataUri(options.image) : '';
  const photoX = 64;
  const photoY = 174;
  const photoW = width - 128;
  const photoH = Math.round(height * (height > width ? 0.44 : 0.46));
  const badgeY = photoY + photoH + 44;
  const textY = badgeY + 60;
  const titleMaxLines = height > width ? 3 : 2;
  const titleLines = wrapText(options.title || (vertical === 'property' ? 'Imovel em destaque' : 'Carro em destaque'), width > 1100 ? 32 : 26, titleMaxLines);
  const titleSvg = titleLines.map((line, index) =>
    `<text x="64" y="${textY + index * 58}" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="950" fill="#ffffff" letter-spacing="-1">${escapeXml(line)}</text>`
  ).join('');
  const price = options.price || 'Sob consulta';
  const location = options.location || 'Portugal';
  const details = vertical === 'property'
    ? [options.type, options.rooms, options.area, options.extra]
    : [options.year, options.km, options.fuel, options.extra];
  const chipY = Math.min(height - 198, textY + titleLines.length * 62 + 12);

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background({ width, height, accent })}
    ${await logoBlock({ x: 64, y: 58, vertical, accent })}
    ${imagePanel({ imageDataUri, x: photoX, y: photoY, width: photoW, height: photoH, accent, vertical })}
    <text x="88" y="${photoY + photoH - 82}" font-family="Inter, Arial, sans-serif" font-size="68" font-weight="950" fill="#ffffff" letter-spacing="-1">${escapeXml(price)}</text>
    <text x="90" y="${photoY + photoH - 38}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="800" fill="#dbeafe">${escapeXml(location)}</text>
    <text x="64" y="${badgeY}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(options.badge || 'ANUNCIO EM DESTAQUE')}</text>
    ${titleSvg}
    ${chips(details, { x: 64, y: chipY, accent })}
    <g transform="translate(64 ${height - 110})">
      <rect x="0" y="0" width="${width - 128}" height="56" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
      <text x="28" y="36" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${escapeXml(options.cta || 'Ver em noxvelia.com')}</text>
      <text x="${width - 156}" y="36" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="${accent}">NOXVELIA</text>
    </g>
  </svg>`;
}

export async function brandSvg(options) {
  const { width, height } = getSize(options.size || 'square');
  const accent = ACCENTS.brand;
  const headlineLines = wrapText(options.headline || 'Carros e imoveis no mesmo sitio', width > 1100 ? 30 : 24, 4);
  const subtitleLines = wrapText(options.subtitle || 'Pesquisa simples, contacto direto e anuncios bem apresentados.', width > 1100 ? 52 : 42, 3);
  const startY = Math.round(height * 0.32);
  const headline = headlineLines.map((line, index) =>
    `<text x="64" y="${startY + index * 70}" font-family="Inter, Arial, sans-serif" font-size="62" font-weight="950" fill="#ffffff" letter-spacing="-1.2">${escapeXml(line)}</text>`
  ).join('');
  const subtitle = subtitleLines.map((line, index) =>
    `<text x="68" y="${startY + headlineLines.length * 76 + 34 + index * 38}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="650" fill="#b8c7d9">${escapeXml(line)}</text>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background({ width, height, accent })}
    ${await logoBlock({ x: 64, y: 64, vertical: 'brand', accent })}
    <g transform="translate(${width - 360} 70)" opacity="0.92">
      <rect x="0" y="0" width="280" height="72" rx="36" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
      <text x="40" y="46" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="${accent}">DRIVE</text>
      <text x="154" y="46" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#3ecf8e">ESTATE</text>
    </g>
    <text x="64" y="${startY - 54}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(options.badge || 'NOXVELIA')}</text>
    ${headline}
    ${subtitle}
    <g transform="translate(64 ${height - 190})">
      <rect x="0" y="0" width="${Math.min(560, width - 128)}" height="74" rx="37" fill="${accent}"/>
      <text x="38" y="47" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="950" fill="#041014">${escapeXml(options.cta || 'noxvelia.com')}</text>
    </g>
    <g transform="translate(64 ${height - 84})" opacity="0.86">
      <text x="0" y="0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">Carros</text>
      <circle cx="92" cy="-7" r="5" fill="${accent}"/>
      <text x="118" y="0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">Imoveis</text>
      <circle cx="222" cy="-7" r="5" fill="${accent}"/>
      <text x="248" y="0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">Contacto direto</text>
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
