import crypto from 'node:crypto';
import {
  ALLOWED_IMAGE_FORMATS,
  ALLOWED_IMAGE_MIME_TYPES,
  IMAGE_UPLOAD_LIMITS,
  imageConfigForKind,
  normalizeImageKind,
} from '../config/imageStorage.js';

const loadSharp = async () => {
  try {
    const mod = await import('sharp');
    return mod.default || mod;
  } catch {
    throw Object.assign(new Error('Dependencia sharp em falta. Instala `sharp` no backend antes de processar imagens.'), { status: 500 });
  }
};

const safeOriginalName = (name) => String(name || '')
  .replace(/[^\w.\- ]+/g, '')
  .trim()
  .slice(0, 180);

const normalizeMimeFromFormat = (format) => {
  if (format === 'jpeg') return 'image/jpeg';
  if (format === 'png') return 'image/png';
  if (format === 'webp') return 'image/webp';
  return '';
};

export const checksumBuffer = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');

export const assertUploadFileLooksSafe = (file, kind = 'listing') => {
  const config = imageConfigForKind(kind);
  if (!file?.buffer?.length) throw Object.assign(new Error('Imagem vazia.'), { status: 400 });
  if (file.buffer.length > config.maxInputBytes) {
    throw Object.assign(new Error(`Imagem demasiado grande. Limite: ${Math.round(config.maxInputBytes / 1024 / 1024)} MB.`), { status: 413 });
  }
  if (/\.svg$/i.test(file.originalname || '') || file.mimetype === 'image/svg+xml') {
    throw Object.assign(new Error('SVG nao e aceite para uploads de utilizadores.'), { status: 400 });
  }
  if (/\.gif$/i.test(file.originalname || '') || file.mimetype === 'image/gif') {
    throw Object.assign(new Error('GIF animado nao e aceite neste momento.'), { status: 400 });
  }
  if (file.mimetype && !ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
    throw Object.assign(new Error('Formato de imagem nao suportado.'), { status: 400 });
  }
};

export const processImageUpload = async ({ file, kind = 'listing' }) => {
  const normalizedKind = normalizeImageKind(kind);
  assertUploadFileLooksSafe(file, normalizedKind);
  const sharp = await loadSharp();
  const input = sharp(file.buffer, {
    failOn: 'warning',
    limitInputPixels: IMAGE_UPLOAD_LIMITS.maxPixelCount,
  });
  const metadata = await input.metadata();

  if (!ALLOWED_IMAGE_FORMATS.has(metadata.format)) {
    throw Object.assign(new Error('O conteudo real do ficheiro nao e JPEG, PNG ou WebP.'), { status: 400 });
  }
  if (metadata.width * metadata.height > IMAGE_UPLOAD_LIMITS.maxPixelCount) {
    throw Object.assign(new Error('Imagem com demasiados pixeis para processamento seguro.'), { status: 413 });
  }
  const expectedMime = normalizeMimeFromFormat(metadata.format);
  if (file.mimetype && expectedMime && file.mimetype !== expectedMime) {
    throw Object.assign(new Error('MIME enviado nao corresponde ao conteudo real da imagem.'), { status: 400 });
  }

  const base = sharp(file.buffer, {
    failOn: 'warning',
    limitInputPixels: IMAGE_UPLOAD_LIMITS.maxPixelCount,
  }).rotate().toColorspace('srgb');

  const config = imageConfigForKind(normalizedKind);
  const variants = [];

  for (const variant of config.variants) {
    const pipeline = base.clone().resize({
      width: variant.width,
      height: variant.height,
      fit: variant.fit,
      position: variant.position || 'centre',
      withoutEnlargement: true,
    }).webp({
      quality: variant.quality,
      effort: 4,
      smartSubsample: true,
    });
    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
    variants.push({
      name: variant.name,
      buffer: data,
      width: info.width,
      height: info.height,
      sizeBytes: data.length,
      format: 'webp',
      mimeType: 'image/webp',
    });
  }

  const blurBuffer = await base.clone()
    .resize({ width: 16, height: 16, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 40, effort: 2 })
    .toBuffer();

  const original = variants.find((variant) => variant.name === 'original') || variants[0];
  return {
    kind: normalizedKind,
    checksum: checksumBuffer(original.buffer),
    originalFilename: safeOriginalName(file.originalname),
    originalMimeType: file.mimetype || expectedMime,
    finalMimeType: 'image/webp',
    width: original.width,
    height: original.height,
    sizeBytes: original.sizeBytes,
    blurDataURL: `data:image/webp;base64,${blurBuffer.toString('base64')}`,
    variants,
  };
};
