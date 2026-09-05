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
  brand: '#d9c49c',
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
      throw new Error('Dependência sharp em falta. Corre `npm install` dentro de noxvelia-post-images.');
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

export function wrapText(value = '', maxChars = 28, maxLines = 2) {
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

export async function photoToDataUri(filePath) {
  if (!filePath) return '';
  const resolved = resolveLocalPath(filePath);
  const sharp = await loadSharp();
  const buffer = await sharp(resolved)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'cover', withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toBuffer();
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export async function listingSvg(options) {
  const vertical = options.vertical === 'property' ? 'property' : 'car';
  const { width, height } = getSize(options.size);
  const imageDataUri = options.image ? await photoToDataUri(options.image) : '';
  
  // Layout minimalista: Imagem principal ocupa quase todo o espaço com margens suaves
  const pad = 40;
  const imgX = pad;
  const imgY = pad;
  const imgW = width - pad * 2;
  const imgH = height - pad * 2;

  const titleLines = wrapText(options.title || 'Destaque Noxvelia', 30, 2);
  const titleSvg = titleLines.map((line, index) => 
    `<text x="72" y="${height - 210 + (index * 46)}" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">${escapeXml(line)}</text>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="minimalShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#071326" stop-opacity="0.3"/>
        <stop offset="0.5" stop-color="#071326" stop-opacity="0"/>
        <stop offset="0.8" stop-color="#071326" stop-opacity="0.85"/>
        <stop offset="1" stop-color="#071326" stop-opacity="0.98"/>
      </linearGradient>
      <clipPath id="cardClip">
        <rect x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" rx="32"/>
      </clipPath>
    </defs>

    <!-- Fundo geral escuro e elegante -->
    <rect width="${width}" height="${height}" fill="#071326"/>

    <!-- Fotografia com cantos arredondados -->
    ${imageDataUri ? `
      <image href="${imageDataUri}" x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#cardClip)"/>
    ` : `
      <rect x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" rx="32" fill="#102f50"/>
      <text x="${width/2}" y="${height/2}" text-anchor="middle" fill="#d9c49c" font-family="Inter, Arial" font-size="24" font-weight="700">Sem Fotografia</text>
    `}

    <!-- Gradiente inferior para legibilidade perfeita do texto -->
    <rect x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" rx="32" fill="url(#minimalShade)" pointer-events="none"/>

    <!-- Logótipo Minimalista Superior Esquerdo -->
    <g transform="translate(72 76)">
      <rect x="0" y="0" width="160" height="44" rx="22" fill="rgba(7, 19, 38, 0.75)" stroke="rgba(255,255,255,0.15)"/>
      <text x="80" y="27" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="900" fill="#ffffff" letter-spacing="3">NOXVELIA</text>
    </g>

    <!-- Preço em Destaque (Champagne / Dourado) Superior Direito -->
    <g transform="translate(${width - 292} 76)">
      <rect x="0" y="0" width="220" height="44" rx="22" fill="#d9c49c"/>
      <text x="110" y="27" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="18" font-weight="900" fill="#071326">${escapeXml(options.price || 'Sob consulta')}</text>
    </g>

    <!-- Título e Localização na Base -->
    ${titleSvg}
    <text x="72" y="${height - 110}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="600" fill="#d9c49c">${escapeXml(options.location || 'Portugal')}</text>
    
    <!-- CTA Discreto na Base Direita -->
    <text x="${width - 72}" y="${height - 110}" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="700" fill="rgba(255,255,255,0.6)">noxvelia.com</text>
  </svg>`;
}

export async function brandSvg(options) {
  const { width, height } = getSize(options.size || 'square');
  const headline = options.headline || 'Carros e imóveis sem comissões';
  const subtitle = options.subtitle || 'Contacto direto e stock verificado em Portugal.';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#071326"/>
    
    <!-- Elemento decorativo minimalista -->
    <circle cx="${width/2}" cy="${height/2}" r="300" fill="#102f50" opacity="0.4" filter="blur(60px)"/>

    <g transform="translate(80 120)">
      <text x="0" y="0" font-family="Inter, Arial" font-size="16" font-weight="900" fill="#d9c49c" letter-spacing="4">NOXVELIA PORTUGAL</text>
      <text x="0" y="80" font-family="Plus Jakarta Sans, Arial" font-size="56" font-weight="900" fill="#ffffff" width="${width - 160}">${escapeXml(headline)}</text>
      <text x="0" y="180" font-family="Inter, Arial" font-size="24" font-weight="500" fill="#94a3b8">${escapeXml(subtitle)}</text>
    </g>

    <g transform="translate(80 ${height - 120})">
      <text x="0" y="0" font-family="Inter, Arial" font-size="20" font-weight="800" fill="#d9c49c">noxvelia.com</text>
    </g>
  </svg>`;
}

export async function renderSvg(svg, output) {
  const sharp = await loadSharp();
  const resolved = resolveLocalPath(output || 'output/post.png');
  await fs.mkdir(path.dirname(resolved), { recursive: true });

  const image = sharp(Buffer.from(svg));
  await image.png({ compressionLevel: 9 }).toFile(resolved);
  return resolved;
}

export async function renderListingPost(options) {
  const svg = await listingSvg(options);
  return renderSvg(svg, options.output);
}

export async function renderBrandPost(options) {
  const svg = await brandSvg(options);
  return renderSvg(svg, options.output);
}

export function printDone(output) {
  console.log(`[noxvelia-post-images] Criado (Minimalista): ${output}`);
}