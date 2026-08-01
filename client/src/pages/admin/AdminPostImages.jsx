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
  mdiViewGridOutline,
  mdiImageFrame,
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
  gallery: { label: 'Galeria' },
  mosaic: { label: 'Mosaico' },
  duo: { label: 'Duo' },
  strip: { label: 'Faixa' },
  priceTag: { label: 'Preço forte' },
  editorial: { label: 'Editorial' },
  storyPro: { label: 'Story Pro' },
  video: { label: 'Video centro' },
  cover: { label: 'Capa' },
  split: { label: 'Split' },
  clean: { label: 'Clean' },
};

const MULTI_IMAGE_STYLES = new Set(['gallery', 'mosaic', 'duo', 'strip']);

const STYLE_ICONS = {
  premium: mdiStarFourPoints,
  launch: mdiRocketLaunchOutline,
  showroom: mdiStorefrontOutline,
  gallery: mdiViewCarouselOutline,
  mosaic: mdiImageMultipleOutline,
  duo: mdiImageFrame || mdiImageMultipleOutline,
  strip: mdiViewGridOutline || mdiViewCarouselOutline,
  priceTag: mdiStarFourPoints,
  editorial: mdiStorefrontOutline,
  storyPro: mdiMonitorScreenshot,
  video: mdiVideoOutline,
  cover: mdiMonitorScreenshot,
  split: mdiImageMultipleOutline,
  clean: mdiAutoFix,
};

const CREATIVE_DEFAULTS = {
  imageFocus: 'center',
  showLogo: true,
  showBadge: true,
  showPrice: true,
  showLocation: true,
  showDetails: true,
  showCta: true,
};

const IMAGE_FOCUS_OPTIONS = [
  { value: 'center', label: 'Centro' },
  { value: 'top', label: 'Mais acima' },
  { value: 'bottom', label: 'Mais abaixo' },
  { value: 'left', label: 'Esquerda' },
  { value: 'right', label: 'Direita' },
];

const ELEMENT_TOGGLES = [
  { key: 'showLogo', label: 'Logo' },
  { key: 'showBadge', label: 'Etiqueta' },
  { key: 'showPrice', label: 'Preço' },
  { key: 'showLocation', label: 'Local' },
  { key: 'showDetails', label: 'Detalhes' },
  { key: 'showCta', label: 'Chamada' },
];

const TEMPLATE_DEFAULTS = {
  car: {
    ...CREATIVE_DEFAULTS,
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
    ...CREATIVE_DEFAULTS,
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
    ...CREATIVE_DEFAULTS,
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
const normalizeImageKey = (url = '') => String(url).trim().split('#')[0].split('?')[0].toLowerCase();

const uniqueUrls = (urls = []) => {
  const seen = new Set();
  return urls
    .map((url) => (typeof url === 'string' ? url.trim() : ''))
    .filter(Boolean)
    .filter((url) => {
      const key = normalizeImageKey(url);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const variantUrl = (variants, name) => {
  if (!variants) return '';
  if (Array.isArray(variants)) {
    const match = variants.find((variant) => variant?.name === name || variant?.label === name || variant?.type === name);
    return match?.url || match?.secure_url || '';
  }
  return variants?.[name]?.url || variants?.[name]?.secure_url || variants?.[name] || '';
};

const imageCandidateUrls = (image) => {
  if (!image) return [];
  if (typeof image === 'string') return [image];

  const preferred = ['large', 'original', 'medium', 'thumbnail'];
  return uniqueUrls([
    ...preferred.map((name) => image.urls?.[name]),
    ...preferred.map((name) => variantUrl(image.variants, name)),
    image.url,
    image.secure_url,
    image.originalUrl,
    image.path,
    getImageUrl(image, 'large'),
    getImageUrl(image, 'original'),
    getImageUrl(image, 'medium'),
    getImageUrl(image, 'thumbnail'),
  ]);
};

const uniqueDataUrls = (dataUrls = []) => {
  const seen = new Set();
  return dataUrls.filter((url) => {
    if (!url) return false;
    const value = String(url);
    const key = value.startsWith('data:') ? value : normalizeImageKey(value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const imageFocusAnchor = (focus = 'center') => ({
  center: 'xMidYMid',
  top: 'xMidYMin',
  bottom: 'xMidYMax',
  left: 'xMinYMid',
  right: 'xMaxYMid',
}[focus] || 'xMidYMid');

const normalizeCreativeForm = (form = {}) => ({
  ...CREATIVE_DEFAULTS,
  ...form,
  badge: form.showBadge === false ? '' : form.badge,
  price: form.showPrice === false ? '' : form.price,
  location: form.showLocation === false ? '' : form.location,
  cta: form.showCta === false ? '' : form.cta,
  detail1: form.showDetails === false ? '' : form.detail1,
  detail2: form.showDetails === false ? '' : form.detail2,
  detail3: form.showDetails === false ? '' : form.detail3,
  detail4: form.showDetails === false ? '' : form.detail4,
});

const showElement = (form, key) => form?.[key] !== false;

function galleryPlaceholderCard({ x, y, width, height, accent, label, text }) {
  const title = escapeXml(label || 'Foto extra');
  const body = escapeXml(text || 'Adiciona outra imagem');
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="28" fill="#11242b" opacity="0.94"/>
    <rect x="${x + 14}" y="${y + 14}" width="${width - 28}" height="${height - 28}" rx="22" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="10 12" opacity="0.55"/>
    <circle cx="${x + Math.round(width / 2)}" cy="${y + Math.round(height / 2) - 20}" r="28" fill="${accent}" opacity="0.14"/>
    <path d="M${x + Math.round(width / 2) - 18} ${y + Math.round(height / 2) - 26}h36v24h-36z" fill="none" stroke="${accent}" stroke-width="4" stroke-linejoin="round" opacity="0.92"/>
    <path d="M${x + Math.round(width / 2) - 12} ${y + Math.round(height / 2) - 8}l9-9 8 7 6-6 11 14" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.92"/>
    <text x="${x + Math.round(width / 2)}" y="${y + Math.round(height / 2) + 38}" text-anchor="middle" font-family="Montserrat, Arial" font-size="22" font-weight="900" fill="#ffffff">${title}</text>
    <text x="${x + Math.round(width / 2)}" y="${y + Math.round(height / 2) + 66}" text-anchor="middle" font-family="Montserrat, Arial" font-size="15" font-weight="700" fill="#d9f8f5" opacity="0.78">${body}</text>
  `;
}

function brandMark({ x, y, accent, label, logoDataUrl, hidden = false }) {
  if (hidden) return '';
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

// Small corner strip of extra photos, used to surface additional uploaded
// images on single-hero-photo templates (cover, launch, showroom, etc.)
// so uploading more than one photo always has a visible effect.
let stripCounter = 0;
function extraPhotosStrip({ images = [], x, y, size = 62, gap = 10, align = 'left', accent: _accent = '#2ac1b4', extraCount = 0, tone = 'navy' }) {
  const list = images.slice(0, 3);
  if (!list.length) return '';
  const startX = align === 'right' ? x - (list.length - 1) * (size + gap) : x;
  const strokeColor = tone === 'light' ? 'rgba(7,17,22,0.28)' : 'rgba(255,255,255,0.42)';
  const badgeBg = tone === 'light' ? 'rgba(7,17,22,0.82)' : 'rgba(3,7,18,0.72)';
  return list.map((img, i) => {
    const cx = startX + i * (size + gap);
    const cid = `xstrip${stripCounter++}`;
    const isLast = i === list.length - 1;
    return `<clipPath id="${cid}"><rect x="${cx}" y="${y}" width="${size}" height="${size}" rx="15"/></clipPath>
      <image href="${img}" x="${cx}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${cid})"/>
      <rect x="${cx}" y="${y}" width="${size}" height="${size}" rx="15" fill="none" stroke="${strokeColor}" stroke-width="2"/>
      ${isLast && extraCount > 0 ? `<rect x="${cx}" y="${y}" width="${size}" height="${size}" rx="15" fill="${badgeBg}"/><text x="${cx + size / 2}" y="${y + size / 2 + 7}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="#ffffff">+${extraCount}</text>` : ''}`;
  }).join('');
}

const listingMeta = (form) => {
  const size = SIZES[form.size] || SIZES.square;
  const accent = form.template === 'property' ? '#3ecf8e' : '#2ac1b4';
  const label = form.template === 'property' ? 'ESTATE' : 'DRIVE';
  const titleLines = wrapText(form.title, size.width > 1100 ? 32 : 26, size.height > size.width ? 3 : 2);
  return { size, accent, label, titleLines };
};

const photoImage = ({ imageDataUrl, x, y, width, height, rx = 34, opacity = 1, clipId = 'photoClip', focus = 'center' }) => imageDataUrl
  ? `<clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}"/></clipPath>
     <image href="${imageDataUrl}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="${imageFocusAnchor(focus)} slice" clip-path="url(#${clipId})" opacity="${opacity}"/>`
  : '';

function buildListingCoverSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const image = photoImage({ imageDataUrl, focus: form.imageFocus, x: 0, y: 0, width: size.width, height: size.height, rx: 0, clipId: 'coverPhoto' });
  const fallback = imageDataUrl ? '' : placeholderIcon({ x: 70, y: 168, width: size.width - 140, height: Math.round(size.height * 0.46), accent, template: form.template });
  const titleY = Math.round(size.height * (compact ? 0.42 : 0.55));
  const titleFont = compact ? 52 : 62;
  const titleGap = compact ? 58 : 68;
  const extras = galleryDataUrls.slice(0, 3);

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
    ${brandMark({ x: 64, y: 64, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${extraPhotosStrip({ images: extras, x: size.width - 64, y: 56, align: 'right', accent, extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
    <rect x="64" y="${titleY - 86}" width="122" height="12" rx="6" fill="${accent}"/>
    ${titleLines.map((line, index) => `<text x="64" y="${titleY + index * titleGap}" font-family="Inter, Arial, sans-serif" font-size="${titleFont}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <g transform="translate(64 ${size.height - (compact ? 158 : 246)})">
      <rect x="0" y="0" width="${Math.min(600, size.width - 128)}" height="90" rx="45" fill="rgba(255,255,255,0.92)"/>
      <text x="34" y="57" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="950" fill="#071116">${escapeXml(form.price)}</text>
    </g>
    ${compact ? '' : chips([form.location, form.detail1, form.detail2, form.detail3], { x: 64, y: size.height - 128 })}
  </svg>`;
}

function buildListingSplitSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
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
  const extras = galleryDataUrls.slice(0, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    <rect x="44" y="44" width="${size.width - 88}" height="${size.height - 88}" rx="34" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.13)" stroke-width="2"/>
    ${brandMark({ x: 78, y: 82, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, focus: form.imageFocus, x: photoX, y: photoY, width: photoW, height: photoH, rx: 34, clipId: 'splitPhoto' })}
         <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="34" fill="rgba(3,7,18,0.18)"/>
         <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="34" fill="none" stroke="rgba(255,255,255,0.17)" stroke-width="2"/>`
      : placeholderIcon({ x: photoX, y: photoY, width: photoW, height: photoH, accent, template: form.template })}
    ${extraPhotosStrip({ images: extras, x: photoX, y: photoY + photoH - 78, align: 'left', accent, extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
    <text x="78" y="${titleY - 64}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="78" y="${titleY + index * titleGap}" font-family="Inter, Arial, sans-serif" font-size="${titleFont}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="78" y="${priceY}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 34 : 40}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>
    <text x="80" y="${locationY}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 22 : 26}" font-weight="800" fill="#dbeafe">${escapeXml(form.location)}</text>
    ${compact ? '' : chips([form.detail1, form.detail2, form.detail3], { x: 78, y: size.height - 172 })}
    <text x="78" y="${size.height - (compact ? 54 : 82)}" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text>
  </svg>`;
}

function buildListingCleanSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const photoX = 64;
  const photoY = 128;
  const photoW = size.width - 128;
  const photoH = Math.round(size.height * 0.48);
  const titleY = photoY + photoH + 112;
  const extras = galleryDataUrls.slice(0, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#f7faf9"/>
    <rect x="0" y="0" width="${size.width}" height="18" fill="${accent}"/>
    <circle cx="${size.width - 96}" cy="118" r="210" fill="${accent}" opacity="0.08"/>
    ${brandMark({ x: 64, y: 72, accent, label, logoDataUrl, hidden: form.showLogo === false }).replaceAll('fill="#ffffff"', 'fill="#071116"')}
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, focus: form.imageFocus, x: photoX, y: photoY, width: photoW, height: photoH, rx: 32, clipId: 'cleanPhoto' })}
         <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="32" fill="none" stroke="#d6e2df" stroke-width="2"/>`
      : placeholderIcon({ x: photoX, y: photoY, width: photoW, height: photoH, accent, template: form.template })}
    ${extraPhotosStrip({ images: extras, x: photoX + photoW - 62, y: photoY + photoH - 78, align: 'right', accent, tone: 'light', extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
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
  const rawImages = [
    ...(Array.isArray(anuncio?.fotos) ? anuncio.fotos : []),
    ...(Array.isArray(anuncio?.imagens) ? anuncio.imagens : []),
    anuncio?.imagem,
  ].filter(Boolean);

  const urls = rawImages.flatMap((image) => imageCandidateUrls(image));
  return uniqueUrls(urls);
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

function buildListingLaunchSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const titleY = Math.round(size.height * (compact ? 0.42 : 0.48));
  const titleFont = compact ? 54 : 72;
  const titleGap = compact ? 58 : 76;
  const priceY = Math.min(size.height - (compact ? 132 : 220), titleY + titleLines.length * titleGap + 54);
  const image = photoImage({ imageDataUrl, focus: form.imageFocus, x: 0, y: 0, width: size.width, height: size.height, rx: 0, clipId: 'launchPhoto' });
  const fallback = imageDataUrl ? '' : placeholderIcon({ x: 70, y: 150, width: size.width - 140, height: Math.round(size.height * 0.46), accent, template: form.template });
  const extras = galleryDataUrls.slice(0, 3);

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
    ${brandMark({ x: 64, y: 60, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${extraPhotosStrip({ images: extras, x: size.width - 64, y: 56, align: 'right', accent, extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
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

function buildListingShowroomSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
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
  const extras = galleryDataUrls.slice(0, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#f4f7f3"/>
    <rect x="0" y="0" width="${size.width}" height="${topBand}" fill="#061116"/>
    <rect x="${size.width - 330}" y="0" width="260" height="${topBand}" fill="${accent}" opacity="0.22"/>
    ${brandMark({ x: pad, y: compact ? 32 : 46, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    <rect x="${pad - 12}" y="${photoY - 12}" width="${photoW + 24}" height="${photoH + 24}" rx="32" fill="#ffffff"/>
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, focus: form.imageFocus, x: pad, y: photoY, width: photoW, height: photoH, rx: 28, clipId: 'showroomPhoto' })}<rect x="${pad}" y="${photoY}" width="${photoW}" height="${photoH}" rx="28" fill="none" stroke="#d7e4e0" stroke-width="2"/>`
      : placeholderIcon({ x: pad, y: photoY, width: photoW, height: photoH, accent, template: form.template })}
    ${extraPhotosStrip({ images: extras, x: pad + photoW - 62, y: photoY + photoH - 78, align: 'right', accent, tone: 'light', extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
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
    ${brandMark({ x: 64, y: 60, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    <g transform="translate(${size.width - (compact ? 300 : 360)} 64)">
      <rect x="0" y="0" width="${compact ? 226 : 286}" height="54" rx="27" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
      <text x="28" y="35" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="2">VIDEO</text>
      <text x="118" y="35" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff">CENTRO</text>
    </g>
    <rect x="${frameX - 18}" y="${frameY - 18}" width="${frameW + 36}" height="${frameH + 36}" rx="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    ${imageDataUrl
      ? `${photoImage({ imageDataUrl, focus: form.imageFocus, x: frameX, y: frameY, width: frameW, height: frameH, rx: 32, clipId: 'videoPhoto' })}<rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}" rx="32" fill="rgba(3,7,18,0.24)"/>`
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
  const images = uniqueDataUrls([imageDataUrl, ...galleryDataUrls].filter(Boolean));
  const main = images[0];
  const second = images[1];
  const third = images[2];
  const pad = compact ? 48 : 64;
  const top = compact ? 106 : 144;
  const gap = 18;

  if (compact) {
    const mainW = Math.round((size.width - pad * 2 - gap) * 0.62);
    const sideW = size.width - pad * 2 - gap - mainW;
    const mediaH = size.height - top - 126;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
      ${baseBackground({ width: size.width, height: size.height, accent })}
      ${brandMark({ x: pad, y: 52, accent, label, logoDataUrl, hidden: form.showLogo === false })}
      ${main ? photoImage({ imageDataUrl: main, focus: form.imageFocus, x: pad, y: top, width: mainW, height: mediaH, rx: 30, clipId: 'galleryMain' }) : galleryPlaceholderCard({ x: pad, y: top, width: mainW, height: mediaH, accent, label: 'Imagem principal', text: 'Carrega uma foto' })}
      ${second ? photoImage({ imageDataUrl: second, focus: form.imageFocus, x: pad + mainW + gap, y: top, width: sideW, height: Math.round((mediaH - gap) / 2), rx: 26, clipId: 'gallerySecond' }) : galleryPlaceholderCard({ x: pad + mainW + gap, y: top, width: sideW, height: Math.round((mediaH - gap) / 2), accent, label: 'Foto 2', text: 'Sem repeticoes' })}
      ${third ? photoImage({ imageDataUrl: third, focus: form.imageFocus, x: pad + mainW + gap, y: top + Math.round((mediaH - gap) / 2) + gap, width: sideW, height: Math.round((mediaH - gap) / 2), rx: 26, clipId: 'galleryThird' }) : galleryPlaceholderCard({ x: pad + mainW + gap, y: top + Math.round((mediaH - gap) / 2) + gap, width: sideW, height: Math.round((mediaH - gap) / 2), accent, label: 'Foto 3', text: 'Adiciona mais fotos' })}
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
    ${brandMark({ x: pad, y: 58, accent, label, logoDataUrl, hidden: form.showLogo === false }).replaceAll('fill="#ffffff"', 'fill="#071116"')}
    ${main ? photoImage({ imageDataUrl: main, focus: form.imageFocus, x: pad, y: top, width: mainW, height: mainH, rx: 32, clipId: 'galleryMainTall' }) : galleryPlaceholderCard({ x: pad, y: top, width: mainW, height: mainH, accent, label: 'Imagem principal', text: 'Carrega uma foto' })}
    ${second ? photoImage({ imageDataUrl: second, focus: form.imageFocus, x: pad, y: top + mainH + gap, width: thumbW, height: thumbH, rx: 26, clipId: 'gallerySecondTall' }) : galleryPlaceholderCard({ x: pad, y: top + mainH + gap, width: thumbW, height: thumbH, accent, label: 'Foto 2', text: 'Sem repeticoes' })}
    ${third ? photoImage({ imageDataUrl: third, focus: form.imageFocus, x: pad + thumbW + gap, y: top + mainH + gap, width: thumbW, height: thumbH, rx: 26, clipId: 'galleryThirdTall' }) : galleryPlaceholderCard({ x: pad + thumbW + gap, y: top + mainH + gap, width: thumbW, height: thumbH, accent, label: 'Foto 3', text: 'Adiciona mais fotos' })}
    <text x="${pad}" y="${titleStart - 46}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>
    ${titleLines.map((line, index) => `<text x="${pad}" y="${titleStart + index * 60}" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    <text x="${pad}" y="${Math.min(size.height - 152, titleStart + titleLines.length * 62 + 32)}" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>
    ${chips([form.location, form.detail1, form.detail2, form.detail3], { x: pad, y: size.height - 112 })}
  </svg>`;
}
function buildListingMosaicSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const images = uniqueDataUrls([imageDataUrl, ...galleryDataUrls].filter(Boolean));
  const pad = compact ? 44 : 58;
  const top = compact ? 112 : 138;
  const gap = 16;
  const mediaH = Math.round(size.height * (compact ? 0.54 : 0.52));
  const mainW = Math.round((size.width - pad * 2 - gap) * 0.62);
  const sideW = size.width - pad * 2 - mainW - gap;
  const halfH = Math.round((mediaH - gap) / 2);
  const textY = top + mediaH + (compact ? 54 : 76);
  const tile = (image, index, args) => image
    ? photoImage({ imageDataUrl: image, focus: form.imageFocus, ...args })
    : galleryPlaceholderCard({ ...args, accent, label: `Foto ${index + 1}`, text: index ? 'Adiciona foto' : 'Imagem principal' });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    <rect x="${pad - 20}" y="${top - 20}" width="${size.width - pad * 2 + 40}" height="${mediaH + 40}" rx="40" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.13)" stroke-width="2"/>
    ${brandMark({ x: pad, y: compact ? 46 : 58, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${tile(images[0], 0, { x: pad, y: top, width: mainW, height: mediaH, rx: 30, clipId: 'mosaicMain' })}
    ${tile(images[1], 1, { x: pad + mainW + gap, y: top, width: sideW, height: halfH, rx: 26, clipId: 'mosaicSecond' })}
    ${tile(images[2], 2, { x: pad + mainW + gap, y: top + halfH + gap, width: sideW, height: halfH, rx: 26, clipId: 'mosaicThird' })}
    ${form.badge ? `<text x="${pad}" y="${textY - 36}" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>` : ''}
    ${titleLines.map((line, index) => `<text x="${pad}" y="${textY + index * (compact ? 46 : 56)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 40 : 50}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${form.price ? `<text x="${pad}" y="${Math.min(size.height - 74, textY + titleLines.length * (compact ? 48 : 58) + 30)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 34 : 44}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>` : ''}
    ${chips([form.location, form.detail1, form.detail2, form.detail3], { x: pad, y: size.height - (compact ? 64 : 98) })}
  </svg>`;
}

// New: two big photos side by side (e.g. exterior + interior, before/after,
// two angles of the same car). Falls back to a placeholder card for the
// second photo slot so the layout still looks intentional with one image.
function buildListingDuoSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const pad = compact ? 44 : 58;
  const top = compact ? 112 : 140;
  const gap = 16;
  const mediaH = Math.round(size.height * (compact ? 0.42 : 0.46));
  const panelW = Math.round((size.width - pad * 2 - gap) / 2);
  const second = galleryDataUrls[0];
  const extraCount = Math.max(0, galleryDataUrls.length - 1);
  const textY = top + mediaH + (compact ? 60 : 80);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${brandMark({ x: pad, y: compact ? 46 : 58, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${imageDataUrl ? photoImage({ imageDataUrl, focus: form.imageFocus, x: pad, y: top, width: panelW, height: mediaH, rx: 28, clipId: 'duoMain' }) : galleryPlaceholderCard({ x: pad, y: top, width: panelW, height: mediaH, accent, label: 'Foto 1', text: 'Imagem principal' })}
    ${second
      ? `${photoImage({ imageDataUrl: second, focus: form.imageFocus, x: pad + panelW + gap, y: top, width: panelW, height: mediaH, rx: 28, clipId: 'duoSecond' })}${extraCount > 0 ? `<rect x="${pad + panelW + gap}" y="${top}" width="${panelW}" height="${mediaH}" rx="28" fill="rgba(3,7,18,0.15)"/><g><rect x="${pad + panelW + gap + panelW - 74}" y="${top + mediaH - 50}" width="58" height="34" rx="17" fill="rgba(3,7,18,0.72)"/><text x="${pad + panelW + gap + panelW - 45}" y="${top + mediaH - 27}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="950" fill="#ffffff">+${extraCount}</text></g>` : ''}`
      : galleryPlaceholderCard({ x: pad + panelW + gap, y: top, width: panelW, height: mediaH, accent, label: 'Foto 2', text: 'Carrega uma segunda foto' })}
    ${form.badge ? `<text x="${pad}" y="${textY - 36}" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>` : ''}
    ${titleLines.map((line, index) => `<text x="${pad}" y="${textY + index * (compact ? 46 : 58)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 40 : 52}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${form.price ? `<text x="${pad}" y="${Math.min(size.height - 90, textY + titleLines.length * (compact ? 48 : 60) + 32)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 34 : 44}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>` : ''}
    ${chips([form.location, form.detail1, form.detail2, form.detail3], { x: pad, y: size.height - (compact ? 62 : 96) })}
  </svg>`;
}

// New: big hero photo up top with a horizontal filmstrip of up to four more
// photos underneath, so a full set of listing photos reads as one creative.
function buildListingStripSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const pad = compact ? 44 : 58;
  const heroY = compact ? 108 : 138;
  const heroH = Math.round(size.height * (compact ? 0.4 : 0.44));
  const heroW = size.width - pad * 2;
  const stripY = heroY + heroH + 16;
  const stripH = compact ? 100 : 132;
  const gap = 12;
  const filmImages = galleryDataUrls.slice(0, 4);
  const slotCount = Math.max(filmImages.length, 3);
  const slotW = Math.round((heroW - gap * (slotCount - 1)) / slotCount);
  const textY = stripY + stripH + (compact ? 56 : 76);

  const filmSlots = Array.from({ length: slotCount }).map((_, index) => {
    const x = pad + index * (slotW + gap);
    const img = filmImages[index];
    return img
      ? photoImage({ imageDataUrl: img, focus: form.imageFocus, x, y: stripY, width: slotW, height: stripH, rx: 18, clipId: `stripFrame${index}` })
      : galleryPlaceholderCard({ x, y: stripY, width: slotW, height: stripH, accent, label: `Foto ${index + 2}`, text: 'Adiciona foto' });
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${brandMark({ x: pad, y: compact ? 46 : 58, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${imageDataUrl ? photoImage({ imageDataUrl, focus: form.imageFocus, x: pad, y: heroY, width: heroW, height: heroH, rx: 30, clipId: 'stripHero' }) : placeholderIcon({ x: pad, y: heroY, width: heroW, height: heroH, accent, template: form.template })}
    ${filmSlots}
    ${form.badge ? `<text x="${pad}" y="${textY - 36}" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>` : ''}
    ${titleLines.map((line, index) => `<text x="${pad}" y="${textY + index * (compact ? 44 : 56)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 38 : 48}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${form.price ? `<text x="${pad}" y="${Math.min(size.height - 60, textY + titleLines.length * (compact ? 46 : 58) + 30)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 32 : 40}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>` : ''}
  </svg>`;
}

function buildListingPriceTagSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const photo = imageDataUrl
    ? photoImage({ imageDataUrl, focus: form.imageFocus, x: 0, y: 0, width: size.width, height: size.height, rx: 0, clipId: 'priceTagPhoto' })
    : placeholderIcon({ x: 64, y: 140, width: size.width - 128, height: Math.round(size.height * 0.48), accent, template: form.template });
  const titleY = Math.round(size.height * (compact ? 0.31 : 0.36));
  const priceBoxW = Math.min(size.width - 128, compact ? 470 : 620);
  const priceY = size.height - (compact ? 122 : 202);
  const extras = galleryDataUrls.slice(0, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${photo}
    <defs>
      <linearGradient id="priceShade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#020617" stop-opacity="0.84"/>
        <stop offset="0.48" stop-color="#020617" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#020617" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <rect width="${size.width}" height="${size.height}" fill="url(#priceShade)"/>
    <rect x="${size.width - 160}" y="0" width="18" height="${size.height}" fill="${accent}" opacity="0.88"/>
    ${brandMark({ x: 64, y: 62, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${extraPhotosStrip({ images: extras, x: size.width - 200, y: 56, align: 'right', accent, extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
    ${form.badge ? `<text x="64" y="${titleY - 72}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>` : ''}
    ${titleLines.map((line, index) => `<text x="64" y="${titleY + index * (compact ? 58 : 70)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 54 : 66}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${form.price ? `<g transform="translate(64 ${priceY})"><rect x="0" y="0" width="${priceBoxW}" height="${compact ? 78 : 96}" rx="${compact ? 20 : 26}" fill="${accent}"/><text x="34" y="${compact ? 51 : 63}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 38 : 52}" font-weight="950" fill="#041014">${escapeXml(form.price)}</text></g>` : ''}
    ${form.location ? `<text x="68" y="${priceY + (compact ? 116 : 136)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 23 : 30}" font-weight="850" fill="#ffffff">${escapeXml(form.location)}</text>` : ''}
    ${showElement(form, 'showDetails') ? chips([form.detail1, form.detail2, form.detail3], { x: 64, y: size.height - (compact ? 58 : 86) }) : ''}
  </svg>`;
}

function buildListingEditorialSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const compact = size.height < 800;
  const pad = compact ? 48 : 64;
  const leftW = Math.round(size.width * (compact ? 0.43 : 0.46));
  const photoX = leftW + 24;
  const photoY = compact ? 84 : 118;
  const photoW = size.width - photoX - pad;
  const photoH = size.height - photoY - (compact ? 76 : 118);
  const titleY = compact ? 210 : 276;
  const extras = galleryDataUrls.slice(0, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="${size.width}" height="${size.height}" fill="#f6faf9"/>
    <rect x="0" y="0" width="${leftW}" height="${size.height}" fill="#071116"/>
    <rect x="${leftW - 8}" y="0" width="16" height="${size.height}" fill="${accent}"/>
    ${brandMark({ x: pad, y: compact ? 52 : 70, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${imageDataUrl ? `${photoImage({ imageDataUrl, focus: form.imageFocus, x: photoX, y: photoY, width: photoW, height: photoH, rx: 28, clipId: 'editorialPhoto' })}<rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="28" fill="none" stroke="#d5e3df" stroke-width="2"/>` : placeholderIcon({ x: photoX, y: photoY, width: photoW, height: photoH, accent, template: form.template })}
    ${extraPhotosStrip({ images: extras, x: photoX + photoW - 62, y: photoY + photoH - 78, align: 'right', accent, tone: 'light', extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
    ${form.badge ? `<text x="${pad}" y="${titleY - 58}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>` : ''}
    ${titleLines.map((line, index) => `<text x="${pad}" y="${titleY + index * (compact ? 50 : 66)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 44 : 58}" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${form.price ? `<text x="${pad}" y="${Math.min(size.height - 168, titleY + titleLines.length * (compact ? 52 : 68) + 34)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 36 : 48}" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>` : ''}
    ${form.location ? `<text x="${pad + 2}" y="${Math.min(size.height - 126, titleY + titleLines.length * (compact ? 52 : 68) + 78)}" font-family="Inter, Arial, sans-serif" font-size="${compact ? 22 : 27}" font-weight="800" fill="#dbeafe">${escapeXml(form.location)}</text>` : ''}
    ${form.cta ? `<text x="${pad}" y="${size.height - 60}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text>` : ''}
  </svg>`;
}

function buildListingStoryProSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  const { size, accent, label, titleLines } = listingMeta(form);
  const topH = Math.round(size.height * 0.62);
  const panelY = Math.max(0, topH - 22);
  const pad = 64;
  const photo = imageDataUrl
    ? photoImage({ imageDataUrl, focus: form.imageFocus, x: 0, y: 0, width: size.width, height: topH + 30, rx: 0, clipId: 'storyProPhoto' })
    : placeholderIcon({ x: pad, y: 132, width: size.width - pad * 2, height: Math.round(size.height * 0.42), accent, template: form.template });
  const titleY = panelY + 132;
  const extras = galleryDataUrls.slice(0, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${photo}
    <rect x="0" y="0" width="${size.width}" height="${topH + 30}" fill="rgba(3,7,18,0.22)"/>
    ${extraPhotosStrip({ images: extras, x: size.width - 64, y: 56, align: 'right', accent, extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
    <path d="M0 ${panelY} C ${size.width * 0.22} ${panelY - 42}, ${size.width * 0.65} ${panelY + 52}, ${size.width} ${panelY - 12} V ${size.height} H 0 Z" fill="#071116"/>
    <rect x="${pad}" y="${panelY + 50}" width="116" height="12" rx="6" fill="${accent}"/>
    ${brandMark({ x: pad, y: 62, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${form.badge ? `<text x="${pad}" y="${titleY - 54}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="950" fill="${accent}" letter-spacing="3">${escapeXml(form.badge)}</text>` : ''}
    ${titleLines.map((line, index) => `<text x="${pad}" y="${titleY + index * 74}" font-family="Inter, Arial, sans-serif" font-size="66" font-weight="950" fill="#ffffff" letter-spacing="0">${escapeXml(line)}</text>`).join('')}
    ${form.price ? `<text x="${pad}" y="${Math.min(size.height - 248, titleY + titleLines.length * 78 + 36)}" font-family="Inter, Arial, sans-serif" font-size="66" font-weight="950" fill="${accent}">${escapeXml(form.price)}</text>` : ''}
    ${chips([form.location, form.detail1, form.detail2, form.detail3], { x: pad, y: size.height - 178 })}
    ${form.cta ? `<g transform="translate(${pad} ${size.height - 92})"><rect x="0" y="0" width="${size.width - pad * 2}" height="58" rx="29" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.13)"/><text x="28" y="37" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${escapeXml(form.cta)}</text></g>` : ''}
  </svg>`;
}
function buildListingSvg({ form, imageDataUrl, galleryDataUrls = [], logoDataUrl }) {
  form = normalizeCreativeForm(form);
  const selectedSize = SIZES[form.size] || SIZES.square;
  if (selectedSize.height < 800 && (!form.style || form.style === 'premium' || form.style === 'clean')) {
    return buildListingSplitSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  }
  if (form.style === 'launch') return buildListingLaunchSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'showroom') return buildListingShowroomSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'video') return buildListingVideoSvg({ form, imageDataUrl, logoDataUrl });
  if (form.style === 'gallery') return buildListingGallerySvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'mosaic') return buildListingMosaicSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'duo') return buildListingDuoSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'strip') return buildListingStripSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'priceTag') return buildListingPriceTagSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'editorial') return buildListingEditorialSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'storyPro') return buildListingStoryProSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'cover') return buildListingCoverSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'split') return buildListingSplitSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
  if (form.style === 'clean') return buildListingCleanSvg({ form, imageDataUrl, galleryDataUrls, logoDataUrl });
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
  const extras = galleryDataUrls.slice(0, 3);
  const photo = imageDataUrl
    ? `<clipPath id="photoClip"><rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="38"/></clipPath>
       <image href="${imageDataUrl}" x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" preserveAspectRatio="${imageFocusAnchor(form.imageFocus)} slice" clip-path="url(#photoClip)"/>
       <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="38" fill="rgba(3,7,18,0.22)"/>
       <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" rx="38" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
       <rect x="${photoX + 26}" y="${photoY + 26}" width="88" height="10" rx="5" fill="${accent}"/>`
    : placeholderIcon({ x: photoX, y: photoY, width: photoW, height: photoH, accent, template: form.template });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${brandMark({ x: 64, y: 58, accent, label, logoDataUrl, hidden: form.showLogo === false })}
    ${photo}
    ${extraPhotosStrip({ images: extras, x: photoX + photoW - 62, y: photoY + photoH - 78, align: 'right', accent, extraCount: Math.max(0, galleryDataUrls.length - extras.length) })}
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
    ${brandMark({ x: 64, y: 64, accent, label: 'PORTUGAL', logoDataUrl, hidden: form.showLogo === false })}
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
    ${brandMark({ x: 64, y: 68, accent, label: 'PORTUGAL', logoDataUrl, hidden: form.showLogo === false })}
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
    ${brandMark({ x: 64, y: 72, accent, label: 'PORTUGAL', logoDataUrl, hidden: form.showLogo === false }).replaceAll('fill="#ffffff"', 'fill="#071116"')}
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
  form = normalizeCreativeForm(form);
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
    ${brandMark({ x: 64, y: 64, accent, label: 'PORTUGAL', logoDataUrl, hidden: form.showLogo === false })}
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
  const toggleElement = (field) => setForm((current) => ({ ...current, [field]: current[field] === false }));
  const resetCreativeControls = () => setForm((current) => ({ ...current, ...CREATIVE_DEFAULTS }));

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
  const mediaItems = useMemo(() => uniqueDataUrls([imageDataUrl, ...galleryDataUrls]), [galleryDataUrls, imageDataUrl]);
  const isMultiImageStyle = form.template !== 'brand' && MULTI_IMAGE_STYLES.has(form.style);
  const galleryNeedsMoreImages = isMultiImageStyle && mediaItems.length > 0 && mediaItems.length < (form.style === 'duo' ? 2 : 3);
  const usesExtraPhotos = form.template !== 'brand' && !isMultiImageStyle && mediaItems.length > 1;
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

  const applyImageSet = (dataUrls, name = 'imagem', options = {}) => {
    const base = options.append ? mediaItems : [];
    const images = uniqueDataUrls([...base, ...dataUrls]).slice(0, 8);
    if (!images.length) return;
    setImageDataUrl(images[0]);
    setGalleryDataUrls(images.slice(1));
    setImageName(name || `${images.length} imagens`);
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith('image/')).slice(0, 8);
    if (!files.length) {
      setFeedback('Escolhe uma ou mais imagens. Para video, usa o campo de URL do video.');
      return;
    }
    setBusy(true);
    try {
      const dataUrls = uniqueDataUrls(await Promise.all(files.map(readFileAsDataUrl)));
      const total = uniqueDataUrls([...mediaItems, ...dataUrls]).slice(0, 8).length;
      applyImageSet(dataUrls, dataUrls.length === 1 ? files[0].name : `${dataUrls.length} imagens carregadas`, { append: true });
      setFeedback(dataUrls.length === 1 ? `Imagem adicionada. Total: ${total}.` : `${dataUrls.length} imagens adicionadas. Total: ${total}.`);
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
    const urls = uniqueUrls(imageUrlInput.split(/[\s,]+/).filter(Boolean)).slice(0, 8);
    if (!urls.length) return;
    setBusy(true);
    setFeedback('');
    try {
      const loaded = await Promise.allSettled(urls.map((url) => imageUrlToDataUrl(url)));
      const dataUrls = uniqueDataUrls(loaded.map((item) => (item.status === 'fulfilled' ? item.value : '')).filter(Boolean));
      applyImageSet(dataUrls.length ? dataUrls : urls, dataUrls.length > 1 ? `${dataUrls.length} imagens por URL` : 'imagem por URL', { append: true });
      setImageUrlInput('');
      setFeedback(dataUrls.length > 1 ? `${dataUrls.length} imagens por URL carregadas.` : 'Imagem por URL carregada.');
    } catch {
      if (urls.every((url) => /^https?:\/\//i.test(url))) {
        applyImageSet(urls, urls.length > 1 ? `${urls.length} imagens por URL` : 'imagem por URL', { append: true });
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
        applyImageSet([data], 'imagem colada', { append: true });
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

  const setMainImage = (index) => {
    if (index <= 0 || index >= mediaItems.length) return;
    const next = [mediaItems[index], ...mediaItems.filter((_, itemIndex) => itemIndex !== index)];
    applyImageSet(next, imageName || `${next.length} imagens`);
    setFeedback('Imagem principal atualizada.');
  };

  const rotateImages = () => {
    if (mediaItems.length < 2) {
      setFeedback('Carrega pelo menos duas imagens para variar a galeria.');
      return;
    }
    const [first, ...rest] = mediaItems;
    applyImageSet([...rest, first], imageName || `${mediaItems.length} imagens`);
    setFeedback('Ordem das imagens alterada.');
  };

  const removeImage = (index) => {
    const next = mediaItems.filter((_, itemIndex) => itemIndex !== index);
    if (!next.length) {
      clearImages();
      return;
    }
    applyImageSet(next, `${next.length} imagem${next.length > 1 ? 's' : ''}`);
    setFeedback('Foto removida.');
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

    const imageUrls = listingImages(anuncio).slice(0, 8);
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
      const dataUrls = uniqueDataUrls(loaded.filter((item) => item.status === 'fulfilled').map((item) => item.value));
      if (!dataUrls.length) throw new Error('Sem imagens acessiveis.');
      applyImageSet(dataUrls, dataUrls.length > 1 ? `${dataUrls.length} fotos do anuncio` : 'foto do anuncio');
      setFeedback(dataUrls.length > 1
        ? `Anuncio e ${dataUrls.length} fotos unicas carregados.`
        : 'Anuncio preenchido com 1 foto. Adiciona mais fotos manualmente se quiseres usar um modelo com varias imagens.');
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
        .nx-postgen-style-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .nx-postgen-style { min-height: 44px; border-radius: 8px; border: 1px solid ${palette.border || '#dfe8e4'}; background: #fff; color: ${palette.textDim || '#4f646a'}; font-size: 12px; font-weight: 900; cursor: pointer; display: inline-flex; align-items: center; justify-content: flex-start; gap: 8px; padding: 0 10px; text-align: left; position: relative; }
        .nx-postgen-style.active { border-color: rgba(42,193,180,.46); background: rgba(42,193,180,.12); color: ${palette.text || '#102326'}; }
        .nx-postgen-style-multi-dot { position: absolute; top: 6px; right: 7px; width: 7px; height: 7px; border-radius: 999px; background: ${palette.green || '#168b82'}; }
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
        .nx-postgen-thumbs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
        .nx-postgen-thumb { position: relative; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 10px; border: 1px solid ${palette.borderStrong || '#b9cac4'}; background: #f5fbfa; }
        .nx-postgen-thumb-main { width: 100%; height: 100%; border: 0; padding: 0; background: transparent; cursor: pointer; display: block; }
        .nx-postgen-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .nx-postgen-thumb span { position: absolute; left: 6px; bottom: 6px; max-width: calc(100% - 12px); border-radius: 999px; padding: 3px 7px; background: rgba(5, 22, 27, .78); color: #fff; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .06em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; pointer-events: none; }
        .nx-postgen-thumb.active { border-color: ${palette.green || '#168b82'}; box-shadow: 0 0 0 3px rgba(42,193,180,.18); }
        .nx-postgen-thumb-remove { position: absolute; top: 5px; right: 5px; width: 23px; height: 23px; border-radius: 999px; border: 1px solid rgba(255,255,255,.38); background: rgba(5, 22, 27, .82); color: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .nx-postgen-media-note { margin-top: 8px; padding: 9px 10px; border-radius: 9px; background: rgba(42,193,180,.1); color: ${palette.textDim || '#4f646a'}; font-size: 12px; font-weight: 800; line-height: 1.45; }
        .nx-postgen-editor-card { display: grid; gap: 10px; border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 10px; background: #fff; padding: 12px; }
        .nx-postgen-toggle-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .nx-postgen-toggle { min-height: 36px; border-radius: 8px; border: 1px solid ${palette.border || '#dfe8e4'}; background: #f8faf7; color: ${palette.textDim || '#4f646a'}; font-size: 11px; font-weight: 900; cursor: pointer; }
        .nx-postgen-toggle.active { border-color: rgba(42,193,180,.52); background: rgba(42,193,180,.13); color: ${palette.text || '#102326'}; }
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
              <span style={labelStyle}>Modelo visual {form.template !== 'brand' ? '(bolinha verde = usa varias fotos)' : ''}</span>
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
                      {form.template !== 'brand' && MULTI_IMAGE_STYLES.has(id) && <span className="nx-postgen-style-multi-dot" />}
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

            <div className="nx-postgen-editor-card">
              {form.template !== 'brand' && (
                <div>
                  <label style={labelStyle} htmlFor="postgen-focus">Foco da foto</label>
                  <select id="postgen-focus" value={form.imageFocus || 'center'} onChange={(e) => update('imageFocus', e.target.value)} style={inputStyle}>
                    {IMAGE_FOCUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              )}
              <div>
                <span style={labelStyle}>Elementos visiveis</span>
                <div className="nx-postgen-toggle-grid">
                  {ELEMENT_TOGGLES.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`nx-postgen-toggle ${form[item.key] !== false ? 'active' : ''}`}
                      onClick={() => toggleElement(item.key)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" className="nx-postgen-btn" onClick={resetCreativeControls}>Repor elementos</button>
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
                  <span>{mediaItems.length ? `${mediaItems.length} imagem${mediaItems.length > 1 ? 's' : ''} pronta${mediaItems.length > 1 ? 's' : ''}` : 'Upload ate 8, arrastar, URL ou colar imagem'}</span>
                </div>

                {mediaItems.length > 0 && (
                  <div className="nx-postgen-thumbs" aria-label="Imagens carregadas">
                    {mediaItems.slice(0, 8).map((src, index) => (
                      <div key={`${index}-${src.slice(0, 48)}`} className={`nx-postgen-thumb ${index === 0 ? 'active' : ''}`}>
                        <button
                          type="button"
                          className="nx-postgen-thumb-main"
                          onClick={() => setMainImage(index)}
                          title={index === 0 ? 'Imagem principal' : 'Tornar imagem principal'}
                        >
                          <img src={src} alt="" />
                          <span>{index === 0 ? 'Principal' : `Foto ${index + 1}`}</span>
                        </button>
                        <button type="button" className="nx-postgen-thumb-remove" onClick={() => removeImage(index)} title="Remover foto">
                          <Icon path={mdiClose} size={0.48} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {galleryNeedsMoreImages && (
                  <div className="nx-postgen-media-note">
                    A galeria tem {mediaItems.length} imagem{mediaItems.length > 1 ? 's' : ''}. O criativo preenche os espacos vazios com molduras elegantes, sem repetir a mesma foto.
                  </div>
                )}
                {usesExtraPhotos && (
                  <div className="nx-postgen-media-note">
                    Este modelo mostra a foto principal em destaque e as restantes {mediaItems.length - 1} num pequeno mosaico no canto. Para todas as fotos em grande, escolhe Galeria, Mosaico, Duo ou Faixa.
                  </div>
                )}

                <div className="nx-postgen-url-row">
                  <input
                    id="postgen-image-url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') loadImageFromUrl();
                    }}
                    placeholder="URL da imagem ou varios URLs"
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
                  <button type="button" className="nx-postgen-btn" onClick={rotateImages} disabled={busy || mediaItems.length < 2}>
                    <Icon path={mdiViewCarouselOutline} size={0.65} /> Variar ordem
                  </button>
                  <button type="button" className="nx-postgen-btn" onClick={clearImages} disabled={busy || !mediaItems.length}>
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