import React, { useMemo, useRef, useState } from 'react';
import { Icon } from '@mdi/react';
import {
  mdiAutoFix,
  mdiCar,
  mdiContentCopy,
  mdiDownload,
  mdiFileImagePlusOutline,
  mdiHomeOutline,
  mdiImageMultipleOutline,
} from '@mdi/js';
import { getImageUrl } from '../../utils/images';

const SIZES = {
  square: { label: 'Feed quadrado', width: 1080, height: 1080 },
  portrait: { label: 'Feed vertical', width: 1080, height: 1350 },
  story: { label: 'Story/Reels', width: 1080, height: 1920 },
  landscape: { label: 'Link horizontal', width: 1200, height: 628 },
};

const TEMPLATE_DEFAULTS = {
  car: {
    title: 'Carro em destaque',
    price: 'Sob consulta',
    location: 'Portugal',
    badge: 'NOXVELIA DRIVE',
    detail1: '2021',
    detail2: '76 000 km',
    detail3: 'Diesel',
    cta: 'Ver carro em noxvelia.com',
  },
  property: {
    title: 'Imovel em destaque',
    price: 'Sob consulta',
    location: 'Portugal',
    badge: 'NOXVELIA ESTATE',
    detail1: 'Apartamento',
    detail2: 'T2',
    detail3: '92 m2',
    cta: 'Ver imovel em noxvelia.com',
  },
  brand: {
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

const firstImage = (anuncio) => getImageUrl(anuncio?.fotos?.[0] || anuncio?.imagens?.[0] || anuncio?.imagem, 'large');

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
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Nao foi possivel converter a imagem.'));
    reader.readAsDataURL(blob);
  });
}

function brandMark({ x, y, accent, label }) {
  return `
    <g>
      <circle cx="${x + 22}" cy="${y + 14}" r="18" fill="none" stroke="${accent}" stroke-width="4" opacity="0.65"/>
      <path d="M${x + 8} ${y + 20} C ${x + 16} ${y - 2}, ${x + 35} ${y - 2}, ${x + 43} ${y + 18}" fill="none" stroke="#d9c28b" stroke-width="4" stroke-linecap="round"/>
      <text x="${x + 58}" y="${y + 24}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff" letter-spacing="0">NOXVELIA</text>
      <text x="${x + 238}" y="${y + 24}" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="900" fill="${accent}" letter-spacing="2">${label}</text>
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

function buildListingSvg({ form, imageDataUrl }) {
  const size = SIZES[form.size] || SIZES.square;
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
    ${brandMark({ x: 64, y: 58, accent, label })}
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

function buildBrandSvg({ form }) {
  const size = SIZES[form.size] || SIZES.square;
  const accent = '#2ac1b4';
  const startY = Math.round(size.height * 0.32);
  const headlineLines = wrapText(form.title, size.width > 1100 ? 30 : 24, 4);
  const subtitleLines = wrapText(form.subtitle, size.width > 1100 ? 52 : 42, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    ${baseBackground({ width: size.width, height: size.height, accent })}
    ${brandMark({ x: 64, y: 64, accent, label: 'PORTUGAL' })}
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
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [selectedAdId, setSelectedAdId] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const switchTemplate = (template) => {
    setForm((current) => ({ template, size: current.size, ...TEMPLATE_DEFAULTS[template] }));
    setSelectedAdId('');
    setFeedback('');
    if (template === 'brand') {
      setImageDataUrl('');
      setImageName('');
    }
  };

  const svg = useMemo(() => (
    form.template === 'brand'
      ? buildBrandSvg({ form })
      : buildListingSvg({ form, imageDataUrl })
  ), [form, imageDataUrl]);
  const previewUrl = useMemo(() => svgToDataUrl(svg), [svg]);
  const currentSize = SIZES[form.size] || SIZES.square;
  const outputName = `${slugify(form.title || form.badge)}-${form.size}`;

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const data = await readFileAsDataUrl(file);
      setImageDataUrl(data);
      setImageName(file.name);
      setFeedback('Imagem carregada.');
    } catch (error) {
      setFeedback(error.message);
    }
  };

  const applyAd = async (id) => {
    setSelectedAdId(id);
    const anuncio = anuncios.find((item) => item._id === id);
    if (!anuncio) return;
    const isCar = anuncio.tipo === 'carro';
    const template = isCar ? 'car' : 'property';
    setForm((current) => ({
      ...current,
      template,
      ...TEMPLATE_DEFAULTS[template],
      title: anuncio.titulo || TEMPLATE_DEFAULTS[template].title,
      price: formatPrice(anuncio.preco),
      location: listingLocation(anuncio),
      detail1: isCar ? (anuncio.carro?.ano || '') : (anuncio.imovel?.tipoImovel || 'Imovel'),
      detail2: isCar ? (anuncio.carro?.km ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : '') : (anuncio.imovel?.tipologia || ''),
      detail3: isCar ? (anuncio.carro?.combustivel || '') : (anuncio.imovel?.area ? `${anuncio.imovel.area} m2` : ''),
    }));

    const imageUrl = firstImage(anuncio);
    if (!imageUrl) {
      setImageDataUrl('');
      setImageName('');
      setFeedback('Anuncio preenchido. Sem foto principal encontrada.');
      return;
    }

    setBusy(true);
    try {
      const dataUrl = await imageUrlToDataUrl(imageUrl);
      setImageDataUrl(dataUrl);
      setImageName('foto-do-anuncio');
      setFeedback('Anuncio e foto carregados.');
    } catch {
      setImageDataUrl('');
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
      : `${form.title}\n${form.price} - ${form.location}\n${form.cta}`;
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
        .nx-postgen-grid { display: grid; grid-template-columns: minmax(300px, 420px) minmax(0, 1fr); gap: 22px; align-items: start; }
        .nx-postgen-panel { border: 1px solid ${palette.border || '#dfe8e4'}; background: ${palette.panelAlt || '#f8faf7'}; border-radius: 14px; padding: 16px; }
        .nx-postgen-fields { display: grid; gap: 12px; }
        .nx-postgen-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .nx-postgen-preview { display: grid; place-items: center; background: #071116; border-radius: 14px; padding: 16px; border: 1px solid rgba(255,255,255,.12); min-height: 460px; }
        .nx-postgen-preview img { display: block; width: min(100%, 620px); max-height: 760px; object-fit: contain; border-radius: 8px; box-shadow: 0 24px 80px rgba(0,0,0,.26); }
        .nx-postgen-template-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .nx-postgen-template { min-height: 42px; border-radius: 10px; border: 1px solid ${palette.border || '#dfe8e4'}; background: #fff; color: ${palette.textDim || '#4f646a'}; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 7px; }
        .nx-postgen-template.active { background: rgba(42,193,180,.12); border-color: rgba(42,193,180,.38); color: ${palette.text || '#102326'}; }
        .nx-postgen-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
        .nx-postgen-btn { border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 10px; min-height: 40px; padding: 0 13px; display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 900; cursor: pointer; color: ${palette.text || '#102326'}; background: #fff; }
        .nx-postgen-btn.primary { background: ${palette.green || '#168b82'}; color: #fff; border-color: ${palette.green || '#168b82'}; }
        .nx-postgen-btn:disabled { opacity: .55; cursor: wait; }
        @media (max-width: 960px) {
          .nx-postgen-grid { grid-template-columns: 1fr; }
          .nx-postgen-preview { min-height: 0; }
        }
        @media (max-width: 560px) {
          .nx-postgen-two, .nx-postgen-template-row { grid-template-columns: 1fr; }
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

            {form.template !== 'brand' && (
              <div>
                <label style={labelStyle} htmlFor="postgen-ad">Preencher com anuncio</label>
                <select id="postgen-ad" value={selectedAdId} onChange={(e) => applyAd(e.target.value)} style={inputStyle} disabled={busy}>
                  <option value="">Escolher anuncio...</option>
                  {anuncios.slice(0, 120).map((ad) => (
                    <option key={ad._id} value={ad._id}>{ad.tipo === 'carro' ? 'Drive' : 'Estate'} - {ad.titulo || 'Sem titulo'}</option>
                  ))}
                </select>
              </div>
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
                <div>
                  <label style={labelStyle} htmlFor="postgen-detail3">{form.template === 'car' ? 'Combustivel' : 'Area'}</label>
                  <input id="postgen-detail3" value={form.detail3} onChange={(e) => update('detail3', e.target.value)} style={inputStyle} />
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
                <span style={labelStyle}>Foto</span>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                <button type="button" className="nx-postgen-btn" onClick={() => fileRef.current?.click()}>
                  <Icon path={mdiFileImagePlusOutline} size={0.65} /> {imageName || 'Carregar foto'}
                </button>
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
        </section>
      </div>
    </div>
  );
}
