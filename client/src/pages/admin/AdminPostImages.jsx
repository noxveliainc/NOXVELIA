import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@mdi/react';
import {
  mdiAutoFix,
  mdiCar,
  mdiClipboardTextOutline,
  mdiClose,
  mdiContentCopy,
  mdiCloudUploadOutline,
  mdiDownload,
  mdiFileImagePlusOutline,
  mdiHomeOutline,
  mdiImageMultipleOutline,
  mdiLinkVariant,
  mdiMonitorScreenshot,
  mdiPlayCircle,
  mdiRocketLaunchOutline,
  mdiStarFourPoints,
  mdiStorefrontOutline,
  mdiVideoOutline,
  mdiViewCarouselOutline,
} from '@mdi/js';
import { getImageUrl } from '../../utils/images';

const SIZES = {
  square: { label: 'Feed quadrado', width: 1080, height: 1080 },
  portrait: { label: 'Feed vertical', width: 1080, height: 1350 },
  story: { label: 'Story/Reels', width: 1080, height: 1920 },
  landscape: { label: 'Link horizontal', width: 1200, height: 628 },
};

const DESIGN_STYLES = {
  premium: { label: 'Premium' },
  launch: { label: 'Lançamento' },
  showroom: { label: 'Showroom' },
  video: { label: 'Video centro' },
  gallery: { label: 'Galeria' },
  cover: { label: 'Capa' },
  split: { label: 'Split' },
  clean: { label: 'Clean' },
};

const STYLE_ICONS = {
  premium: mdiStarFourPoints,
  launch: mdiRocketLaunchOutline,
  showroom: mdiStorefrontOutline,
  video: mdiVideoOutline,
  gallery: mdiViewCarouselOutline,
  cover: mdiMonitorScreenshot,
  split: mdiImageMultipleOutline,
  clean: mdiAutoFix,
};

const TEMPLATE_DEFAULTS = {
  car: {
    style: 'launch',
    title: 'Novo veiculo em destaque',
    price: 'Sob consulta',
    location: 'Portugal',
    badge: 'NOVO LANCAMENTO',
    detail1: '2026',
    detail2: '0 km',
    detail3: 'Hibrido',
    detail4: 'Pronta entrega',
    videoUrl: '',
    cta: 'Ver veiculo em noxvelia.com',
  },
  property: {
    style: 'premium',
    title: 'Imovel em destaque',
    price: 'Sob consulta',
    location: 'Portugal',
    badge: 'NOXVELIA ESTATE',
    detail1: 'Apartamento',
    detail2: 'T2',
    detail3: '92 m2',
    detail4: 'Video tour',
    videoUrl: '',
    cta: 'Ver imovel em noxvelia.com',
  },
  brand: {
    style: 'premium',
    title: 'Carros e imoveis no mesmo sitio',
    subtitle: 'Pesquisa simples, contacto direto e anuncios bem apresentados.',
    badge: 'NOXVELIA',
    cta: 'noxvelia.com',
  },
};

const escapeXml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const wrapText = (value = '', maxChars = 24, maxLines = 3) => {
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
  if (!lines.length) lines.push('');
  return lines;
};

const svgToDataUrl = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 700);
};

const slugify = (value = 'noxvelia-post') => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 80) || 'noxvelia-post';

const formatPrice = (value) => {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return 'Sob consulta';
  return `${new Intl.NumberFormat('pt-PT').format(number)} EUR`;
};

const listingLocation = (anuncio) => {
  const loc = anuncio?.localizacao || {};
  return loc.cidade || loc.distrito || anuncio?.cidade || anuncio?.distrito || 'Portugal';
};

const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Nao foi possivel converter a imagem.'));
  reader.readAsDataURL(blob);
});

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Nao foi possivel ler a imagem.'));
  reader.readAsDataURL(file);
});

async function imageUrlToDataUrl(url) {
  const response = await fetch(url, { mode: 'cors', credentials: 'include' });
  if (!response.ok) throw new Error('A imagem do anuncio nao ficou acessivel.');
  const blob = await response.blob();
  return blobToDataUrl(blob);
}

function brandMark({ x, y, accent, label, logoDataUrl }) {
  const mark = logoDataUrl
    ? `<image href="${logoDataUrl}" x="${x}" y="${y - 14}" width="58" height="50" preserveAspectRatio="xMidYMid meet"/>`
    : `<circle cx="${x + 25}" cy="${y + 12}" r="20" fill="${accent}" opacity="0.22"/><text x="${x + 25}" y="${y + 21}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="${accent}">N</text>`;
  return `
    <g>
      ${mark}
      <text x="${x + 70}" y="${y + 21}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff" letter-spacing="0">NOXVELIA</text>
      <text x="${x + 250}" y="${y + 21}" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="900" fill="${accent}" letter-spacing="2">${label}</text>
    </g>`;
}

function baseBackground({ width, height, accent }) {
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#071116"/>
        <stop offset="0.64" stop-color="#091524"/>
        <stop offset="1" stop-color="#030711"/>
      </linearGradient>
      <radialGradient id="glow" cx="74%" cy="18%" r="58%">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.18"/>
        <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#glow)"/>
    <g opacity="0.08" stroke="#ffffff" stroke-width="2">
      <path d="M${width * 0.08} ${height * 0.18} C ${width * 0.34} ${height * 0.08}, ${width * 0.66} ${height * 0.34}, ${width * 0.94} ${height * 0.18}" fill="none"/>
      <path d="M${width * 0.04} ${height * 0.82} C ${width * 0.28} ${height * 0.70}, ${width * 0.58} ${height * 0.96}, ${width * 0.96} ${height * 0.78}" fill="none"/>
    </g>`;
}

function placeholderIcon({ x, y, width, height, accent, template }) {
  const icon = template === 'property'
    ? `<path d="M0 34 L58 -10 L116 34 V102 H78 V54 H38 V102 H0 Z" fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>`
    : `<path d="M8 74 H116 L102 36 C98 24 88 18 74 18 H50 C36 18 26 24 22 36 Z M28 76 A14 14 0 1 0 28.1 76 M96 76 A14 14 0 1 0 96.1 76" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="38" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
    <g transform="translate(${x + width / 2 - 58}, ${y + height / 2 - 52})" opacity="0.85">${icon}</g>`;
}

function chips(items, { x, y }) {
  let cursor = x;
  return items.filter(Boolean).slice(0, 4).map((item) => {
    const text = escapeXml(item);
    const width = Math.max(116, text.length * 14 + 38);
    const node = `<g><rect x="${cursor}" y="${y}" width="${width}" height="50" rx="25" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.13)"/><text x="${cursor + 22}" y="${y + 32}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">${text}</text></g>`;
    cursor += width + 14;
    return node;
  }).join('');
}

const listingMeta = (form) => {
  const size = SIZES[form.size] || SIZES.square;
  const accent = form.template === 'property' ? '#3ecf8e' : '#2ac1b4';
  const label = form.template === 'property' ? 'ESTATE' : 'DRIVE';
  const titleLines = wrapText(form.title, size.width > 1100 ? 32 : 26, size.height > size.width ? 3 : 2);
  return { size, accent, label, titleLines };
};

const photoImage = ({ imageDataUrl, x, y, width, height, rx = 34, opacity = 1, clipId = 'photoClip' }) => imageDataUrl
  ? `<clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}"/></clipPath>
     <image href="${imageDataUrl}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})" opacity="${opacity}"/>`
  : '';

function buildListingCoverSvg({ form, imageDataUrl, logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const image = photoImage({ imageDataUrl, x: 0, y: 0, width: size.width, height: size.height, rx: 0, clipId: 'coverPhoto' });
  const fallback = imageDataUrl ? '' : placeholderIcon({ x: 70, y: 168, width: size.width - 140, height: Math.round(size.height * 0.46), accent, template: form.template });
  const titleY = Math.round(size.height * (compact ? 0.42 : 0.55));
  const titleFont = compact ? 52 : 62;
  const titleGap = compact ? 58 : 68;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${image}
    ${fallback}
    <rect width="${size.width}" height="${size.height}" fill="rgba(2,6,23,0.46)"/>
    <defs>
      <linearGradient id="coverShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020617" stop-opacity="0.35"/>
        <stop offset="0.55" stop-color="#020617" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#020617" stop-opacity="0.82"/>
      </linearGradient>
    </defs>
    <rect width="${size.width}" height="${size.height}" fill="url(#coverShade)"/>
    ${brandMark({ x: 64, y: 64, accent, label, logoDataUrl })}
    <rect x="64" y="${titleY - 86}" width="122" height="12" rx="6" fill="${accent}"/>
    ${titleLines.map((line, index) => `<text x="64" y="${titleY + index * titleGap}" font-family="Inter, Arial, sans-serif" font-size="${titleFont}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <g transform="translate(64 ${size.height - (compact ? 158 : 246)})">
      <rect x="0" y="0" width="${Math.min(600, size.width - 128)}" height="90" rx="45" fill="rgba(255,255,255,0.92)"/>
      <text x="34" y="57" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="950" fill="#071116">${escapeXml(form.price)}</text>
    </g>
    ${compact ? '' : chips([form.location, form.detail1, form.detail2, form.detail3], { x: 64, y: size.height - 128 })}
  </svg>`;
}

function buildListingSplitSvg({ form, imageDataUrl, logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const photoX = Math.round(size.width * 0.49);
  const photoY = compact ? 96 : 126;
  const photoW = size.width - photoX - 64;
  const photoH = size.height - (compact ? 192 : 252);
  const titleY = compact ? 214 : 280;
  const titleFont = compact ? 42 : 54;
  const titleGap = compact ? 48 : 62;
  const priceY = titleY + titleLines.length * titleGap + (compact ? 30 : 30);
  const locationY = priceY + (compact ? 38 : 46);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    <rect x="44" y="44" width="${size.width - 88}" height="${size.height - 88}" rx="34" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.13)" stroke-width="2"/>
    ${brandMark({ x: 78, y: 82, accent, label, logoDataUrl })}
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, x: photoX, y: photoY, width: photoW, height: photoH, rx: 34, clipId: 'splitPhoto' })}
         <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="34" fill="rgba(3,7,18,0.18)"/>
         <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="34" fill="none" stroke="rgba(255,255,255,0.17)" stroke-width="2"/>`
      : placeholderIcon({ x: photoX, y: photoY, width: photoW, height: photoH, accent, template: form.template })}
    <text x="78" y="${titleY - 64}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="78" y="${titleY + index * titleGap}" font-family="Inter, Arial, sans-serif" font-size="${titleFont}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="78" y="${priceY}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 34 : 40}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>
    <text x="80" y="${locationY}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 22 : 26}" font-weight="800" fill="#dbeafe">${escapeXml(form.location)}</text>
    ${compact ? '' : chips([form.detail1, form.detail2, form.detail3], { x: 78, y: size.height - 172 })}
    <text x="78" y="${size.height - (compact ? 54 : 82)}" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text>
  </svg>`;
}

function buildListingCleanSvg({ form, imageDataUrl, logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const photoX = 64;
  const photoY = 128;
  const photoW = size.width - 128;
  const photoH = Math.round(size.height * 0.48);
  const titleY = photoY + photoH + 112;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#f7faf9"/>
    <rect x="0" y="0" width="${size.width}" height="18" fill="${accent}"/>
    <circle cx="${size.width - 96}" cy="118" r="210" fill="${accent}" opacity="0.08"/>
    ${brandMark({ x: 64, y: 72, accent, label, logoDataUrl }).replaceAll('fill="#ffffff"', 'fill="#071116"')}
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, x: photoX, y: photoY, width: photoW, height: photoH, rx: 32, clipId: 'cleanPhoto' })}
         <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="32" fill="none" stroke="#d6e2df" stroke-width="2"/>`
      : placeholderIcon({ x: photoX, y: photoY, width: photoW, height: photoH, accent, template: form.template })}
    <text x="64" y="${titleY - 50}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="64" y="${titleY + index * 58}" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="950" fill="#071116" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="64" y="${titleY + titleLines.length * 60 + 36}" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="950" fill="#071116">${escapeXml(form.price)}</text>
    <text x="66" y="${titleY + titleLines.length * 60 + 78}" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="800" fill="#53646b">${escapeXml(form.location)}</text>
    <g transform="translate(64 ${size.height - 116})">
      <rect x="0" y="0" width="${size.width - 128}" height="58" rx="29" fill="#071116"/>
      <text x="28" y="37" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text>
      <text x="${size.width - 156}" y="37" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="${accent}">NOXVELIA</text>
    </g>
  </svg>`;
}

const videoUrlLabel = (url = '') => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'video no centro';
  }
};

const listingImages = (anuncio) => {
  const rawImages = Array.isArray(anuncio?.fotos) && anuncio.fotos.length
    ? anuncio.fotos
    : Array.isArray(anuncio?.imagens)
      ? anuncio.imagens
      : [anuncio?.imagem].filter(Boolean);
  return rawImages.map((image) => getImageUrl(image, 'large')).filter(Boolean);
};

const isLaunchVehicle = (anuncio) => {
  if (anuncio?.tipo !== 'carro') return false;
  const currentYear = new Date().getFullYear();
  const year = Number(anuncio?.carro?.ano || 0);
  const km = Number(anuncio?.carro?.km ?? Number.POSITIVE_INFINITY);
  return anuncio?.carro?.seccao === 'novo' || year >= currentYear || km <= 1000;
};

const vehicleMeta = (anuncio) => [
  anuncio?.carro?.ano,
  anuncio?.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : '',
  anuncio?.carro?.combustivel,
].filter(Boolean).join(' · ');

function playOverlay({ cx, cy, r, accent }) {
  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,255,255,0.92)"/>
      <circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="none" stroke="rgba(255,255,255,0.34)" stroke-width="4"/>
      <path d="M${cx - r * 0.22} ${cy - r * 0.36} L${cx - r * 0.22} ${cy + r * 0.36} L${cx + r * 0.42} ${cy} Z" fill="${accent}"/>
    </g>`;
}

function buildListingLaunchSvg({ form, imageDataUrl, logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const titleY = Math.round(size.height * (compact ? 0.42 : 0.48));
  const titleFont = compact ? 54 : 72;
  const titleGap = compact ? 58 : 76;
  const priceY = Math.min(size.height - (compact ? 132 : 220), titleY + titleLines.length * titleGap + 54);
  const image = photoImage({ imageDataUrl, x: 0, y: 0, width: size.width, height: size.height, rx: 0, clipId: 'launchPhoto' });
  const fallback = imageDataUrl ? '' : placeholderIcon({ x: 70, y: 150, width: size.width - 140, height: Math.round(size.height * 0.46), accent, template: form.template });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${image}
    ${fallback}
    <defs>
      <linearGradient id="launchShade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#020617" stop-opacity="0.82"/>
        <stop offset="0.45" stop-color="#020617" stop-opacity="0.34"/>
        <stop offset="1" stop-color="#020617" stop-opacity="0.86"/>
      </linearGradient>
    </defs>
    <rect width="${size.width}" height="${size.height}" fill="url(#launchShade)"/>
    <rect x="${size.width - 290}" y="0" width="220" height="${size.height}" fill="${accent}" opacity="0.16" transform="skewX(-14)"/>
    ${brandMark({ x: 64, y: 60, accent, label, logoDataUrl })}
    <g transform="translate(64 ${compact ? 136 : 156})">
      <rect x="0" y="0" width="${Math.min(460, size.width - 128)}" height="58" rx="29" fill="rgba(255,255,255,0.92)"/>
      <text x="30" y="38" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="950" fill="#071116" letter-spacing="2">${escapeXml(form.badge)}</text>
    </g>
    ${titleLines.map((line, index) => `<text x="64" y="${titleY + index * titleGap}" font-family="Inter, Arial, sans-serif" font-size="${titleFont}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="66" y="${priceY}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 46 : 66}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>
    <text x="68" y="${priceY + (compact ? 44 : 54)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 22 : 28}" font-weight="850" fill="#dbeafe">${escapeXml(form.location)}</text>
    ${chips([form.detail1, form.detail2, form.detail3, form.detail4], { x: 64, y: size.height - (compact ? 86 : 134) })}
    ${compact ? '' : `<text x="64" y="${size.height - 54}" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text>`}
  </svg>`;
}

function buildListingShowroomSvg({ form, imageDataUrl, logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const pad = compact ? 48 : 64;
  const topBand = compact ? 86 : 116;
  const photoY = compact ? 112 : 150;
  const photoH = Math.round(size.height * (compact ? 0.48 : 0.5));
  const photoW = size.width - pad * 2;
  const titleY = photoY + photoH + (compact ? 66 : 86);
  const titleFont = compact ? 42 : 56;
  const titleGap = compact ? 48 : 62;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#f4f7f3"/>
    <rect x="0" y="0" width="${size.width}" height="${topBand}" fill="#061116"/>
    <rect x="${size.width - 330}" y="0" width="260" height="${topBand}" fill="${accent}" opacity="0.22"/>
    ${brandMark({ x: pad, y: compact ? 32 : 46, accent, label, logoDataUrl })}
    <rect x="${pad - 12}" y="${photoY - 12}" width="${photoW + 24}" height="${photoH + 24}" rx="32" fill="#ffffff"/>
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, x: pad, y: photoY, width: photoW, height: photoH, rx: 28, clipId: 'showroomPhoto' })}<rect x="${pad}" y="${photoY}" width="${photoW}" height="${photoH}" rx="28" fill="none" stroke="#d7e4e0" stroke-width="2"/>`
      : placeholderIcon({ x: pad, y: photoY, width: photoW, height: photoH, accent, template: form.template })}
    <g transform="translate(${pad} ${photoY + photoH - 82})">
      <rect x="0" y="0" width="${Math.min(520, photoW - 24)}" height="64" rx="32" fill="rgba(6,17,22,0.88)"/>
      <text x="28" y="42" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="950" fill="#ffffff">${escapeXml(form.price)}</text>
    </g>
    <text x="${pad}" y="${titleY - 44}" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="${pad}" y="${titleY + index * titleGap}" font-family="Inter, Arial, sans-serif" font-size="${titleFont}" font-weight="950" fill="#071116" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="${pad}" y="${Math.min(size.height - 98, titleY + titleLines.length * titleGap + 28)}" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800" fill="#52656a">${escapeXml(form.location)}</text>
    <g transform="translate(${pad} ${size.height - 78})">
      <text x="0" y="0" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="900" fill="#071116">${escapeXml([form.detail1, form.detail2, form.detail3].filter(Boolean).join('  ·  '))}</text>
      <text x="${photoW}" y="0" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="950" fill="${accent}">NOXVELIA</text>
    </g>
  </svg>`;
}

function buildListingVideoSvg({ form, imageDataUrl, logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const frameW = Math.round(size.width * (compact ? 0.58 : 0.82));
  const maxFrameH = Math.round(size.height * (compact ? 0.56 : 0.42));
  const frameH = Math.min(Math.round(frameW * 9 / 16), maxFrameH);
  const frameX = Math.round((size.width - frameW) / 2);
  const frameY = Math.round(size.height * (compact ? 0.2 : 0.22));
  const titleY = frameY + frameH + (compact ? 62 : 86);
  const titleFont = compact ? 38 : 56;
  const titleGap = compact ? 44 : 62;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${brandMark({ x: 64, y: 60, accent, label, logoDataUrl })}
    <g transform="translate(${size.width - (compact ? 300 : 360)} 64)">
      <rect x="0" y="0" width="${compact ? 226 : 286}" height="54" rx="27" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
      <text x="28" y="35" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="2">VIDEO</text>
      <text x="118" y="35" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff">CENTRO</text>
    </g>
    <rect x="${frameX - 18}" y="${frameY - 18}" width="${frameW + 36}" height="${frameH + 36}" rx="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, x: frameX, y: frameY, width: frameW, height: frameH, rx: 32, clipId: 'videoPhoto' })}<rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}" rx="32" fill="rgba(3,7,18,0.24)"/>`
      : placeholderIcon({ x: frameX, y: frameY, width: frameW, height: frameH, accent, template: form.template })}
    ${playOverlay({ cx: Math.round(size.width / 2), cy: Math.round(frameY + frameH / 2), r: compact ? 44 : 62, accent })}
    <text x="64" y="${titleY - 44}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="64" y="${titleY + index * titleGap}" font-family="Inter, Arial, sans-serif" font-size="${titleFont}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="66" y="${Math.min(size.height - 152, titleY + titleLines.length * titleGap + 34)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 30 : 42}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>
    <g transform="translate(64 ${size.height - 104})">
      <rect x="0" y="0" width="${size.width - 128}" height="58" rx="29" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
      <text x="28" y="37" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${escapeXml(form.videoUrl ? videoUrlLabel(form.videoUrl) : form.cta)}</text>
      <text x="${size.width - 156}" y="37" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="${accent}">PLAY</text>
    </g>
  </svg>`;
}

function buildListingGallerySvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const portrait = size.height > size.width;
  const images = [imageDataUrl, ...galleryDataUrls].filter(Boolean);
  const main = images[0];
  const second = images[1] || images[0];
  const third = images[2] || images[1] || images[0];
  const pad = compact ? 48 : 64;
  const top = compact ? 106 : 144;
  const gap = 18;

  if (compact) {
    const mainW = Math.round((size.width - pad * 2 - gap) * 0.62);
    const sideW = size.width - pad * 2 - gap - mainW;
    const mediaH = size.height - top - 126;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
      ${baseBackground({ width: size.width, height: size.height, accent })}
      ${brandMark({ x: pad, y: 52, accent, label, logoDataUrl })}
      ${main ? photoImage({ imageDataUrl: main, x: pad, y: top, width: mainW, height: mediaH, rx: 30, clipId: 'galleryMain' }) : placeholderIcon({ x: pad, y: top, width: mainW, height: mediaH, accent, template: form.template })}
      ${second ? photoImage({ imageDataUrl: second, x: pad + mainW + gap, y: top, width: sideW, height: Math.round((mediaH - gap) / 2), rx: 26, clipId: 'gallerySecond' }) : placeholderIcon({ x: pad + mainW + gap, y: top, width: sideW, height: Math.round((mediaH - gap) / 2), accent, template: form.template })}
      ${third ? photoImage({ imageDataUrl: third, x: pad + mainW + gap, y: top + Math.round((mediaH - gap) / 2) + gap, width: sideW, height: Math.round((mediaH - gap) / 2), rx: 26, clipId: 'galleryThird' }) : placeholderIcon({ x: pad + mainW + gap, y: top + Math.round((mediaH - gap) / 2) + gap, width: sideW, height: Math.round((mediaH - gap) / 2), accent, template: form.template })}
      <rect x="${pad}" y="${top + mediaH - 92}" width="${mainW}" height="92" rx="0" fill="rgba(3,7,18,0.68)" clip-path="url(#galleryMain)"/>
      <text x="${pad + 28}" y="${top + mediaH - 34}" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="950" fill="#ffffff">${escapeXml(form.price)}</text>
      <text x="${pad}" y="${size.height - 54}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text>
    </svg>`;
  }

  const mainW = size.width - pad * 2;
  const mainH = Math.round(size.height * (portrait ? 0.4 : 0.44));
  const thumbW = Math.round((mainW - gap) / 2);
  const thumbH = Math.round(size.height * (portrait ? 0.18 : 0.16));
  const titleStart = top + mainH + thumbH + gap + 82;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#061116"/>
    <rect x="0" y="0" width="${size.width}" height="${Math.round(size.height * 0.42)}" fill="#f4f7f3"/>
    ${brandMark({ x: pad, y: 58, accent, label, logoDataUrl }).replaceAll('fill="#ffffff"', 'fill="#071116"')}
    ${main ? photoImage({ imageDataUrl: main, x: pad, y: top, width: mainW, height: mainH, rx: 32, clipId: 'galleryMainTall' }) : placeholderIcon({ x: pad, y: top, width: mainW, height: mainH, accent, template: form.template })}
    ${second ? photoImage({ imageDataUrl: second, x: pad, y: top + mainH + gap, width: thumbW, height: thumbH, rx: 26, clipId: 'gallerySecondTall' }) : placeholderIcon({ x: pad, y: top + mainH + gap, width: thumbW, height: thumbH, accent, template: form.template })}
    ${third ? photoImage({ imageDataUrl: third, x: pad + thumbW + gap, y: top + mainH + gap, width: thumbW, height: thumbH, rx: 26, clipId: 'galleryThirdTall' }) : placeholderIcon({ x: pad + thumbW + gap, y: top + mainH + gap, width: thumbW, height: thumbH, accent, template: form.template })}
    <text x="${pad}" y="${titleStart - 46}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="${pad}" y="${titleStart + index * 60}" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="${pad}" y="${Math.min(size.height - 152, titleStart + titleLines.length * 62 + 32)}" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>
    ${chips([form.location, form.detail1, form.detail2, form.detail3], { x: pad, y: size.height - 112 })}
  </svg>`;
}
function buildListingSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const selectedSize = SIZES[form.size] || SIZES.square;
  if (selectedSize.height < 800 && (!form.style || form.style === 'premium' || form.style === 'clean')) {
    return buildListingSplitSvg({ form, imageDataUrl, logoDataUrl });
  }
  if (form.style === 'launch') return buildListingLaunchSvg({ form, imageDataUrl, logoDataUrl });
  if (form.style === 'showroom') return buildListingShowroomSvg({ form, imageDataUrl, logoDataUrl });
  if (form.style === 'video') return buildListingVideoSvg({ form, imageDataUrl, logoDataUrl });
  if (form.style === 'gallery') return buildListingGallerySvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'cover') return buildListingCoverSvg({ form, imageDataUrl, logoDataUrl });
  if (form.style === 'split') return buildListingSplitSvg({ form, imageDataUrl, logoDataUrl });
  if (form.style === 'clean') return buildListingCleanSvg({ form, imageDataUrl, logoDataUrl });
  const size = selectedSize;
  const accent = form.template === 'property' ? '#3ecf8e' : '#2ac1b4';
  const label = form.template === 'property' ? 'ESTATE' : 'DRIVE';
  const photoX = 64;
  const photoY = 174;
  const photoW = size.width - 128;
  const photoH = Math.round(size.height * (size.height > size.width ? 0.44 : 0.46));
  const badgeY = photoY + photoH + 44;
  const titleY = badgeY + 60;
  const titleLines = wrapText(form.title, size.width > 1100 ? 32 : 26, size.height > size.width ? 3 : 2);
  const photo = imageDataUrl
    ? `<clipPath id="photoClip"><rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="38"/></clipPath>
       <image href="${imageDataUrl}" x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#photoClip)"/>
       <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="38" fill="rgba(3,7,18,0.22)"/>
       <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="38" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
       <rect x="${photoX}" y="${photoY + photoH - 160}" width="${photoW}" height="160" fill="rgba(3,7,18,0.55)" clip-path="url(#photoClip)"/>
       <rect x="${photoX + 26}" y="${photoY + 26}" width="88" height="10" rx="5" fill="${accent}"/>`
    : placeholderIcon({ x: photoX, y: photoY, width: photoW, height: photoH, accent, template: form.template });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${brandMark({ x: 64, y: 58, accent, label, logoDataUrl })}
    ${photo}
    <text x="88" y="${photoY + photoH - 82}" font-family="Inter, Arial, sans-serif" font-size="68" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(form.price)}</text>
    <text x="90" y="${photoY + photoH - 38}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="800" fill="#dbeafe">${escapeXml(form.location)}</text>
    <text x="64" y="${badgeY}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="64" y="${titleY + index * 58}" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${chips([form.detail1, form.detail2, form.detail3, form.detail4], { x: 64, y: Math.min(size.height - 198, titleY + titleLines.length * 62 + 12) })}
    <g transform="translate(64 ${size.height - 110})">
      <rect x="0" y="0" width="${size.width - 128}" height="56" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
      <text x="28" y="36" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text>
      <text x="${size.width - 156}" y="36" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="${accent}">NOXVELIA</text>
    </g>
  </svg>`;
}

function buildBrandCoverSvg({ form, logoDataUrl }) {
  const size = SIZES[form.size] || SIZES.square;
  const accent = '#2ac1b4';
  const startY = Math.round(size.height * 0.34);
  const headlineLines = wrapText(form.title, size.width > 1100 ? 30 : 24, 4);
  const subtitleLines = wrapText(form.subtitle, size.width > 1100 ? 50 : 40, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    <rect x="${size.width - 290}" y="-80" width="190" height="${size.height + 160}" rx="95" fill="#3ecf8e" opacity="0.14" transform="rotate(18 ${size.width - 195} ${size.height / 2})"/>
    <rect x="${size.width - 190}" y="-100" width="88" height="${size.height + 200}" rx="44" fill="${accent}" opacity="0.2" transform="rotate(18 ${size.width - 146} ${size.height / 2})"/>
    ${brandMark({ x: 64, y: 64, accent, label: 'PORTUGAL', logoDataUrl })}
    <text x="64" y="${startY - 54}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${headlineLines.map((line, index) => `<text x="64" y="${startY + index * 70}" font-family="Inter, Arial, sans-serif" font-size="62" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${subtitleLines.map((line, index) => `<text x="68" y="${startY + headlineLines.length * 76 + 36 + index * 38}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="650" fill="#b8c7d9">${escapeXml(line)}</text>`).join('')}
    <g transform="translate(64 ${size.height - 178})">
      <rect x="0" y="0" width="${Math.min(560, size.width - 128)}" height="74" rx="37" fill="${accent}"/>
      <text x="38" y="47" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="950" fill="#041014">${escapeXml(form.cta)}</text>
    </g>
  </svg>`;
}

function buildBrandSplitSvg({ form, logoDataUrl }) {
  const size = SIZES[form.size] || SIZES.square;
  const accent = '#2ac1b4';
  const compact = size.height < 800;
  const headlineLines = wrapText(form.title, size.width > 1100 ? 24 : 20, 4);
  const subtitleLines = wrapText(form.subtitle, size.width > 1100 ? 42 : 34, 4);
  const leftW = Math.round(size.width * 0.5);
  const headlineY = Math.round(size.height * (compact ? 0.35 : 0.32));
  const subtitleY = Math.round(size.height * (compact ? 0.31 : 0.32));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#071116"/>
    <rect x="${leftW}" y="0" width="${size.width - leftW}" height="${size.height}" fill="#f7faf9"/>
    <rect x="${leftW}" y="0" width="12" height="${size.height}" fill="${accent}"/>
    ${brandMark({ x: 64, y: 68, accent, label: 'PORTUGAL', logoDataUrl })}
    ${headlineLines.map((line, index) => `<text x="64" y="${headlineY + index * (compact ? 50 : 68)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 44 : 60}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${subtitleLines.map((line, index) => `<text x="${leftW + 74}" y="${subtitleY + index * (compact ? 34 : 42)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 25 : 32}" font-weight="750" fill="#071116">${escapeXml(line)}</text>`).join('')}
    <g transform="translate(${leftW + 74} ${Math.round(size.height * (compact ? 0.58 : 0.56))})">
      <rect x="0" y="0" width="${size.width - leftW - 148}" height="86" rx="18" fill="#071116"/>
      <text x="30" y="54" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="950" fill="${accent}">DRIVE</text>
      <text x="168" y="54" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="950" fill="#3ecf8e">ESTATE</text>
    </g>
    <text x="${leftW + 76}" y="${size.height - 110}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="950" fill="#071116">${escapeXml(form.cta)}</text>
  </svg>`;
}

function buildBrandCleanSvg({ form, logoDataUrl }) {
  const size = SIZES[form.size] || SIZES.square;
  const accent = '#2ac1b4';
  const headlineLines = wrapText(form.title, size.width > 1100 ? 30 : 24, 4);
  const subtitleLines = wrapText(form.subtitle, size.width > 1100 ? 52 : 42, 3);
  const startY = Math.round(size.height * 0.31);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#f7faf9"/>
    <rect x="0" y="0" width="${size.width}" height="20" fill="${accent}"/>
    <circle cx="${size.width - 170}" cy="190" r="260" fill="#0f2b42" opacity="0.08"/>
    <circle cx="${size.width - 110}" cy="${size.height - 130}" r="190" fill="${accent}" opacity="0.12"/>
    ${brandMark({ x: 64, y: 72, accent, label: 'PORTUGAL', logoDataUrl }).replaceAll('fill="#ffffff"', 'fill="#071116"')}
    <text x="64" y="${startY - 50}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${headlineLines.map((line, index) => `<text x="64" y="${startY + index * 72}" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="950" fill="#071116" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${subtitleLines.map((line, index) => `<text x="68" y="${startY + headlineLines.length * 78 + 32 + index * 38}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="700" fill="#53646b">${escapeXml(line)}</text>`).join('')}
    <g transform="translate(64 ${size.height - 170})">
      <rect x="0" y="0" width="${Math.min(560, size.width - 128)}" height="74" rx="37" fill="#071116"/>
      <text x="38" y="47" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="950" fill="#ffffff">${escapeXml(form.cta)}</text>
    </g>
  </svg>`;
}

function buildBrandSvg({ form, logoDataUrl }) {
  const selectedSize = SIZES[form.size] || SIZES.square;
  if (selectedSize.height < 800 && (!form.style || form.style === 'premium' || form.style === 'clean')) {
    return buildBrandSplitSvg({ form, logoDataUrl });
  }
  if (form.style === 'cover') return buildBrandCoverSvg({ form, logoDataUrl });
  if (form.style === 'split') return buildBrandSplitSvg({ form, logoDataUrl });
  if (form.style === 'clean') return buildBrandCleanSvg({ form, logoDataUrl });
  const size = selectedSize;
  const accent = '#2ac1b4';
  const startY = Math.round(size.height * 0.32);
  const headlineLines = wrapText(form.title, size.width > 1100 ? 30 : 24, 4);
  const subtitleLines = wrapText(form.subtitle, size.width > 1100 ? 52 : 42, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${brandMark({ x: 64, y: 64, accent, label: 'PORTUGAL', logoDataUrl })}
    <g transform="translate(${size.width - 360} 70)" opacity="0.92">
      <rect x="0" y="0" width="280" height="72" rx="36" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
      <text x="40" y="46" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="${accent}">DRIVE</text>
      <text x="154" y="46" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#3ecf8e">ESTATE</text>
    </g>
    <text x="64" y="${startY - 54}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${headlineLines.map((line, index) => `<text x="64" y="${startY + index * 70}" font-family="Inter, Arial, sans-serif" font-size="62" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${subtitleLines.map((line, index) => `<text x="68" y="${startY + headlineLines.length * 76 + 34 + index * 38}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="650" fill="#b8c7d9">${escapeXml(line)}</text>`).join('')}
    <g transform="translate(64 ${size.height - 190})">
      <rect x="0" y="0" width="${Math.min(560, size.width - 128)}" height="74" rx="37" fill="${accent}"/>
      <text x="38" y="47" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="950" fill="#041014">${escapeXml(form.cta)}</text>
    </g>
    <g transform="translate(64 ${size.height - 84})" opacity="0.86">
      <text x="0" y="0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">Carros</text>
      <circle cx="92" cy="-7" r="5" fill="${accent}"/>
      <text x="118" y="0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">Imoveis</text>
      <circle cx="222" cy="-7" r="5" fill="${accent}"/>
      <text x="248" y="0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="#dbeafe">Contacto direto</text>
    </g>
  </svg>`;
}

export default function AdminPostImages({ anuncios = [], colors, fonts }) {
  const palette = colors || {};
  const typo = fonts || {};
  const fileRef = useRef(null);
  const [form, setForm] = useState({ template: 'car', size: 'square', ...TEMPLATE_DEFAULTS.car });
  const [logoDataUrl, setLogoDataUrl] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [galleryDataUrls, setGalleryDataUrls] = useState([]);
  const [imageName, setImageName] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [selectedAdId, setSelectedAdId] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let mounted = true;
    fetch('/logo-noxvelia.png')
      .then((response) => {
        if (!response.ok) throw new Error('Logo indisponivel.');
        return response.blob();
      })
      .then(blobToDataUrl)
      .then((dataUrl) => {
        if (mounted) setLogoDataUrl(dataUrl);
      })
      .catch(() => {
        if (mounted) setLogoDataUrl('');
      });
    return () => {
      mounted = false;
    };
  }, []);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const switchTemplate = (template) => {
    setForm((current) => ({ ...TEMPLATE_DEFAULTS[template], template, size: current.size, style: template === 'brand' ? TEMPLATE_DEFAULTS.brand.style : current.style || TEMPLATE_DEFAULTS[template].style || 'premium' }));
    setSelectedAdId('');
    setFeedback('');
    if (template === 'brand') {
      setImageDataUrl('');
      setGalleryDataUrls([]);
      setImageName('');
    }
  };

  const svg = useMemo(() => (
    form.template === 'brand'
      ? buildBrandSvg({ form, logoDataUrl })
      : buildListingSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl })
  ), [form, imageDataUrl, galleryDataUrls, logoDataUrl]);
  const previewUrl = useMemo(() => svgToDataUrl(svg), [svg]);
  const currentSize = SIZES[form.size] || SIZES.square;
  const outputName = `${slugify(form.title || form.badge)}-${form.style || 'premium'}-${form.size}`;
  const newVehicleAds = useMemo(() => anuncios
    .filter(isLaunchVehicle)
    .sort((a, b) => {
      const sectionScore = Number(b.carro?.seccao === 'novo') - Number(a.carro?.seccao === 'novo');
      if (sectionScore) return sectionScore;
      const yearScore = Number(b.carro?.ano || 0) - Number(a.carro?.ano || 0);
      if (yearScore) return yearScore;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    })
    .slice(0, 6), [anuncios]);

  const applyImageSet = (dataUrls, name = 'imagem') => {
    const images = dataUrls.filter(Boolean).slice(0, 4);
    if (!images.length) return;
    setImageDataUrl(images[0]);
    setGalleryDataUrls(images.slice(1));
    setImageName(name);
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith('image/')).slice(0, 4);
    if (!files.length) {
      setFeedback('Escolhe uma ou mais imagens. Para video, usa o campo de URL do video.');
      return;
    }
    setBusy(true);
    try {
      const dataUrls = await Promise.all(files.map(readFileAsDataUrl));
      applyImageSet(dataUrls, files.length === 1 ? files[0].name : `${files.length} imagens carregadas`);
      setFeedback(files.length === 1 ? 'Imagem carregada.' : 'Galeria de imagens carregada.');
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleFile = async (event) => {
    await handleFiles(event.target.files);
    event.target.value = '';
  };

  const loadImageFromUrl = async () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    setBusy(true);
    try {
      const data = await imageUrlToDataUrl(url);
      applyImageSet([data], 'imagem por URL');
      setImageUrlInput('');
      setFeedback('Imagem por URL carregada.');
    } catch {
      if (/^https?:\/\//i.test(url)) {
        applyImageSet([url], 'imagem por URL');
        setImageUrlInput('');
        setFeedback('Imagem aplicada por URL. Se o PNG falhar, usa upload direto para evitar bloqueios externos.');
      } else {
        setFeedback('URL de imagem invalido.');
      }
    } finally {
      setBusy(false);
    }
  };

  const pasteImageFromClipboard = async () => {
    if (!navigator.clipboard?.read) {
      setFeedback('Este browser nao permite ler imagens da area de transferencia.');
      return;
    }
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith('image/'));
        if (!imageType) continue;
        const blob = await item.getType(imageType);
        const data = await blobToDataUrl(blob);
        applyImageSet([data], 'imagem colada');
        setFeedback('Imagem colada.');
        return;
      }
      setFeedback('Nao encontrei uma imagem na area de transferencia.');
    } catch {
      setFeedback('Nao foi possivel colar a imagem. Autoriza o acesso ou usa upload.');
    }
  };

  const clearImages = () => {
    setImageDataUrl('');
    setGalleryDataUrls([]);
    setImageName('');
    setFeedback('Imagens removidas.');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const applyAd = async (id, options = {}) => {
    setSelectedAdId(id);
    const anuncio = anuncios.find((item) => item._id === id);
    if (!anuncio) return;
    const isCar = anuncio.tipo === 'carro';
    const template = isCar ? 'car' : 'property';
    const launch = isLaunchVehicle(anuncio);
    setForm((current) => ({
      ...current,
      ...TEMPLATE_DEFAULTS[template],
      template,
      size: current.size,
      style: options.style || (launch && isCar ? 'launch' : current.style || TEMPLATE_DEFAULTS[template].style),
      title: anuncio.titulo || TEMPLATE_DEFAULTS[template].title,
      price: formatPrice(anuncio.preco),
      location: listingLocation(anuncio),
      badge: options.badge || (launch && isCar ? 'NOVO LANCAMENTO' : TEMPLATE_DEFAULTS[template].badge),
      detail1: isCar ? (anuncio.carro?.ano || '') : (anuncio.imovel?.tipoImovel || 'Imovel'),
      detail2: isCar ? (anuncio.carro?.km ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : '0 km') : (anuncio.imovel?.tipologia || ''),
      detail3: isCar ? (anuncio.carro?.combustivel || '') : (anuncio.imovel?.area ? `${anuncio.imovel.area} m2` : ''),
      detail4: isCar ? (anuncio.carro?.tipoVeiculo || anuncio.carro?.transmissao || TEMPLATE_DEFAULTS[template].detail4 || '') : (anuncio.imovel?.estado || TEMPLATE_DEFAULTS[template].detail4 || ''),
      videoUrl: anuncio.videoUrl || anuncio.visitaVirtualUrl || current.videoUrl || '',
    }));

    const imageUrls = listingImages(anuncio).slice(0, 4);
    if (!imageUrls.length) {
      setImageDataUrl('');
      setGalleryDataUrls([]);
      setImageName('');
      setFeedback('Anuncio preenchido. Sem foto principal encontrada.');
      return;
    }

    setBusy(true);
    try {
      const loaded = await Promise.allSettled(imageUrls.map(imageUrlToDataUrl));
      const dataUrls = loaded.filter((item) => item.status === 'fulfilled').map((item) => item.value);
      if (!dataUrls.length) throw new Error('Sem imagens acessiveis.');
      applyImageSet(dataUrls, dataUrls.length > 1 ? `${dataUrls.length} fotos do anuncio` : 'foto do anuncio');
      setFeedback(dataUrls.length > 1 ? 'Anuncio e galeria carregados.' : 'Anuncio e foto carregados.');
    } catch {
      setImageDataUrl('');
      setGalleryDataUrls([]);
      setImageName('');
      setFeedback('Anuncio preenchido. Se a foto nao aparecer, carrega-a manualmente.');
    } finally {
      setBusy(false);
    }
  };

  const downloadSvg = () => {
    downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `${outputName}.svg`);
    setFeedback('SVG descarregado.');
  };

  const downloadPng = async () => {
    setBusy(true);
    setFeedback('');
    try {
      const image = new Image();
      const objectUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = objectUrl;
      });
      const canvas = document.createElement('canvas');
      canvas.width = currentSize.width;
      canvas.height = currentSize.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      URL.revokeObjectURL(objectUrl);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
      if (!blob) throw new Error('Nao foi possivel gerar PNG.');
      downloadBlob(blob, `${outputName}.png`);
      setFeedback('PNG descarregado.');
    } catch {
      setFeedback('Nao foi possivel gerar PNG. Descarrega SVG ou troca a imagem carregada.');
    } finally {
      setBusy(false);
    }
  };

  const copyCaption = async () => {
    const text = form.template === 'brand'
      ? `${form.title}\n\n${form.subtitle}\n${form.cta}`
      : `${form.title}\n${form.price} - ${form.location}${form.videoUrl ? `\nVideo: ${form.videoUrl}` : ''}\n${form.cta}`;
    await navigator.clipboard.writeText(text);
    setFeedback('Legenda copiada.');
  };

  const inputStyle = {
    width: '100%',
    minHeight: 40,
    border: `1px solid ${palette.border || '#dfe8e4'}`,
    borderRadius: 9,
    background: palette.panelAlt || '#f8faf7',
    color: palette.text || '#102326',
    padding: '9px 11px',
    fontFamily: typo.body || 'Inter, sans-serif',
    fontSize: 13,
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    color: palette.textFaint || '#7b8b90',
    fontFamily: typo.mono || 'monospace',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    marginBottom: 6,
  };

  return (
    <div className="nx-postgen">
      <style>{`
        .nx-postgen-grid { display: grid; grid-template-columns: minmax(320px, 470px) minmax(0, 1fr); gap: 22px; align-items: start; }
        .nx-postgen-panel { border: 1px solid ${palette.border || '#dfe8e4'}; background: ${palette.panelAlt || '#f8faf7'}; border-radius: 12px; padding: 16px; }
        .nx-postgen-fields { display: grid; gap: 12px; }
        .nx-postgen-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .nx-postgen-preview { position: sticky; top: 18px; display: grid; place-items: center; background: #071116; border-radius: 12px; padding: 18px; border: 1px solid rgba(255,255,255,.12); min-height: 520px; }
        .nx-postgen-preview img { display: block; width: min(100%, 700px); max-height: 780px; object-fit: contain; border-radius: 8px; box-shadow: 0 24px 80px rgba(0,0,0,.26); }
        .nx-postgen-template-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .nx-postgen-template { min-height: 42px; border-radius: 9px; border: 1px solid ${palette.border || '#dfe8e4'}; background: #fff; color: ${palette.textDim || '#4f646a'}; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 7px; }
        .nx-postgen-template.active { background: rgba(42,193,180,.12); border-color: rgba(42,193,180,.38); color: ${palette.text || '#102326'}; }
        .nx-postgen-style-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .nx-postgen-style { min-height: 44px; border-radius: 8px; border: 1px solid ${palette.border || '#dfe8e4'}; background: #fff; color: ${palette.textDim || '#4f646a'}; font-size: 12px; font-weight: 900; cursor: pointer; display: inline-flex; align-items: center; justify-content: flex-start; gap: 8px; padding: 0 10px; text-align: left; }
        .nx-postgen-style.active { border-color: rgba(42,193,180,.46); background: rgba(42,193,180,.12); color: ${palette.text || '#102326'}; }
        .nx-postgen-launches { display: grid; gap: 8px; }
        .nx-postgen-launch-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .nx-postgen-launch-card { min-height: 66px; border-radius: 8px; border: 1px solid ${palette.border || '#dfe8e4'}; background: #fff; color: ${palette.text || '#102326'}; cursor: pointer; padding: 10px; text-align: left; display: grid; gap: 5px; }
        .nx-postgen-launch-card strong { font-size: 12px; line-height: 1.25; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .nx-postgen-launch-card span { color: ${palette.textFaint || '#7b8b90'}; font-size: 10px; font-family: ${typo.mono || 'monospace'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .nx-postgen-media-drop { border: 1px dashed ${palette.borderStrong || '#b9cac4'}; background: #fff; border-radius: 10px; min-height: 118px; padding: 16px; display: grid; place-items: center; gap: 8px; text-align: center; color: ${palette.textDim || '#4f646a'}; cursor: pointer; }
        .nx-postgen-media-drop:hover { border-color: rgba(42,193,180,.55); background: rgba(42,193,180,.06); }
        .nx-postgen-media-drop strong { max-width: 100%; color: ${palette.text || '#102326'}; font-size: 13px; line-height: 1.35; overflow-wrap: anywhere; }
        .nx-postgen-media-drop span { color: ${palette.textFaint || '#7b8b90'}; font-size: 11px; line-height: 1.4; }
        .nx-postgen-url-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; margin-top: 8px; }
        .nx-postgen-media-tools { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
        .nx-postgen-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
        .nx-postgen-btn { border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 9px; min-height: 40px; padding: 0 13px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 12px; font-weight: 900; cursor: pointer; color: ${palette.text || '#102326'}; background: #fff; }
        .nx-postgen-btn.primary { background: ${palette.green || '#168b82'}; color: #fff; border-color: ${palette.green || '#168b82'}; }
        .nx-postgen-btn:disabled { opacity: .55; cursor: wait; }
        .nx-postgen-video-chip { position: absolute; left: 18px; bottom: 18px; display: inline-flex; align-items: center; gap: 8px; max-width: calc(100% - 36px); min-height: 34px; border-radius: 8px; background: rgba(255,255,255,.1); color: #fff; border: 1px solid rgba(255,255,255,.16); padding: 0 11px; font-size: 12px; font-weight: 900; }
        @media (max-width: 960px) {
          .nx-postgen-grid { grid-template-columns: 1fr; }
          .nx-postgen-preview { position: relative; top: auto; min-height: 0; }
        }
        @media (max-width: 560px) {
          .nx-postgen-two, .nx-postgen-template-row, .nx-postgen-style-row, .nx-postgen-launch-grid, .nx-postgen-url-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: '0 0 6px', color: palette.text, fontFamily: typo.display, fontSize: 20 }}>Criativos para posts</h2>
        </div>
        <span style={{ color: palette.textFaint, fontFamily: typo.mono, fontSize: 11, alignSelf: 'center' }}>
          {currentSize.width}x{currentSize.height}px
        </span>
      </div>

      <div className="nx-postgen-grid">
        <section className="nx-postgen-panel">
          <div className="nx-postgen-fields">
            <div>
              <span style={labelStyle}>Template</span>
              <div className="nx-postgen-template-row">
                <button type="button" className={`nx-postgen-template ${form.template === 'car' ? 'active' : ''}`} onClick={() => switchTemplate('car')}>
                  <Icon path={mdiCar} size={0.62} /> Carro
                </button>
                <button type="button" className={`nx-postgen-template ${form.template === 'property' ? 'active' : ''}`} onClick={() => switchTemplate('property')}>
                  <Icon path={mdiHomeOutline} size={0.62} /> Imovel
                </button>
                <button type="button" className={`nx-postgen-template ${form.template === 'brand' ? 'active' : ''}`} onClick={() => switchTemplate('brand')}>
                  <Icon path={mdiAutoFix} size={0.62} /> Marca
                </button>
              </div>
            </div>

            <div>
              <label style={labelStyle} htmlFor="postgen-size">Formato</label>
              <select id="postgen-size" value={form.size} onChange={(e) => update('size', e.target.value)} style={inputStyle}>
                {Object.entries(SIZES).map(([id, size]) => <option key={id} value={id}>{size.label}</option>)}
              </select>
            </div>

            <div>
              <span style={labelStyle}>Modelo visual</span>
              <div className="nx-postgen-style-row">
                {Object.entries(DESIGN_STYLES)
                  .filter(([id]) => form.template !== 'brand' || ['premium', 'cover', 'split', 'clean'].includes(id))
                  .map(([id, style]) => (
                    <button
                      key={id}
                      type="button"
                      className={`nx-postgen-style ${(form.style || 'premium') === id ? 'active' : ''}`}
                      onClick={() => update('style', id)}
                    >
                      <Icon path={STYLE_ICONS[id] || mdiAutoFix} size={0.62} /> {style.label}
                    </button>
                  ))}
              </div>
            </div>

            {form.template !== 'brand' && (
              <>
                <div>
                  <label style={labelStyle} htmlFor="postgen-ad">Preencher com anuncio</label>
                  <select id="postgen-ad" value={selectedAdId} onChange={(e) => applyAd(e.target.value)} style={inputStyle} disabled={busy}>
                    <option value="">Escolher anuncio...</option>
                    {anuncios.slice(0, 120).map((ad) => (
                      <option key={ad._id} value={ad._id}>{ad.tipo === 'carro' ? 'Drive' : 'Estate'} - {ad.titulo || 'Sem titulo'}</option>
                    ))}
                  </select>
                </div>

                {newVehicleAds.length > 0 && (
                  <div className="nx-postgen-launches">
                    <span style={labelStyle}>Veiculos novos lancados</span>
                    <div className="nx-postgen-launch-grid">
                      {newVehicleAds.map((ad) => (
                        <button
                          key={ad._id}
                          type="button"
                          className="nx-postgen-launch-card"
                          onClick={() => applyAd(ad._id, { style: 'launch', badge: 'NOVO LANCAMENTO' })}
                          disabled={busy}
                        >
                          <strong>{ad.titulo || `${ad.carro?.marca || 'Veiculo'} ${ad.carro?.modelo || ''}`}</strong>
                          <span>{vehicleMeta(ad) || 'Novo lançamento'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label style={labelStyle} htmlFor="postgen-title">{form.template === 'brand' ? 'Frase principal' : 'Titulo'}</label>
              <input id="postgen-title" value={form.title} onChange={(e) => update('title', e.target.value)} style={inputStyle} />
            </div>

            {form.template === 'brand' ? (
              <div>
                <label style={labelStyle} htmlFor="postgen-subtitle">Texto de apoio</label>
                <textarea id="postgen-subtitle" value={form.subtitle} onChange={(e) => update('subtitle', e.target.value)} style={{ ...inputStyle, minHeight: 78, resize: 'vertical' }} />
              </div>
            ) : (
              <>
                <div className="nx-postgen-two">
                  <div>
                    <label style={labelStyle} htmlFor="postgen-price">Preco</label>
                    <input id="postgen-price" value={form.price} onChange={(e) => update('price', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="postgen-location">Localizacao</label>
                    <input id="postgen-location" value={form.location} onChange={(e) => update('location', e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <div className="nx-postgen-two">
                  <div>
                    <label style={labelStyle} htmlFor="postgen-detail1">{form.template === 'car' ? 'Ano' : 'Tipo'}</label>
                    <input id="postgen-detail1" value={form.detail1} onChange={(e) => update('detail1', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="postgen-detail2">{form.template === 'car' ? 'Km' : 'Tipologia'}</label>
                    <input id="postgen-detail2" value={form.detail2} onChange={(e) => update('detail2', e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <div className="nx-postgen-two">
                  <div>
                    <label style={labelStyle} htmlFor="postgen-detail3">{form.template === 'car' ? 'Combustivel' : 'Area'}</label>
                    <input id="postgen-detail3" value={form.detail3} onChange={(e) => update('detail3', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="postgen-detail4">{form.template === 'car' ? 'Destaque' : 'Extra'}</label>
                    <input id="postgen-detail4" value={form.detail4 || ''} onChange={(e) => update('detail4', e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle} htmlFor="postgen-video">Video / Reel</label>
                  <input id="postgen-video" value={form.videoUrl || ''} onChange={(e) => update('videoUrl', e.target.value)} placeholder="https://youtube.com/..." style={inputStyle} />
                </div>
              </>
            )}

            <div className="nx-postgen-two">
              <div>
                <label style={labelStyle} htmlFor="postgen-badge">Etiqueta</label>
                <input id="postgen-badge" value={form.badge} onChange={(e) => update('badge', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="postgen-cta">Chamada</label>
                <input id="postgen-cta" value={form.cta} onChange={(e) => update('cta', e.target.value)} style={inputStyle} />
              </div>
            </div>

            {form.template !== 'brand' && (
              <div>
                <span style={labelStyle}>Media</span>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFile} style={{ display: 'none' }} />
                <div
                  className="nx-postgen-media-drop"
                  role="button"
                  tabIndex={0}
                  onClick={() => fileRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') fileRef.current?.click();
                  }}
                >
                  <Icon path={mdiCloudUploadOutline} size={0.9} />
                  <strong>{imageName || 'Carregar imagens'}</strong>
                  <span>{galleryDataUrls.length ? `${galleryDataUrls.length + 1} imagens prontas para galeria` : 'Upload, arrastar, URL ou colar imagem'}</span>
                </div>
                <div className="nx-postgen-url-row">
                  <input
                    id="postgen-image-url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') loadImageFromUrl();
                    }}
                    placeholder="URL da imagem"
                    style={inputStyle}
                  />
                  <button type="button" className="nx-postgen-btn" onClick={loadImageFromUrl} disabled={busy || !imageUrlInput.trim()}>
                    <Icon path={mdiLinkVariant} size={0.65} /> URL
                  </button>
                </div>
                <div className="nx-postgen-media-tools">
                  <button type="button" className="nx-postgen-btn" onClick={() => fileRef.current?.click()} disabled={busy}>
                    <Icon path={mdiFileImagePlusOutline} size={0.65} /> Upload
                  </button>
                  <button type="button" className="nx-postgen-btn" onClick={pasteImageFromClipboard} disabled={busy}>
                    <Icon path={mdiClipboardTextOutline} size={0.65} /> Colar
                  </button>
                  <button type="button" className="nx-postgen-btn" onClick={clearImages} disabled={busy || (!imageDataUrl && !galleryDataUrls.length)}>
                    <Icon path={mdiClose} size={0.65} /> Limpar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="nx-postgen-actions">
            <button type="button" className="nx-postgen-btn primary" onClick={downloadPng} disabled={busy}>
              <Icon path={mdiDownload} size={0.65} /> PNG
            </button>
            <button type="button" className="nx-postgen-btn" onClick={downloadSvg}>
              <Icon path={mdiImageMultipleOutline} size={0.65} /> SVG
            </button>
            <button type="button" className="nx-postgen-btn" onClick={copyCaption}>
              <Icon path={mdiContentCopy} size={0.65} /> Legenda
            </button>
          </div>

          {feedback && (
            <div style={{ marginTop: 12, color: palette.textDim, fontSize: 12, lineHeight: 1.5 }}>
              {feedback}
            </div>
          )}
        </section>

        <section className="nx-postgen-preview" aria-label="Pre-visualizacao do post">
          <img src={previewUrl} alt="Pre-visualizacao do criativo" />
          {form.style === 'video' && form.videoUrl && (
            <span className="nx-postgen-video-chip">
              <Icon path={mdiPlayCircle} size={0.62} /> {videoUrlLabel(form.videoUrl)}
            </span>
          )}
        </section>
      </div>
    </div>
  );
}
