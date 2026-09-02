import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
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

const WATERMARK_LOGO_URL = new URL('../assets/noxvelia-watermark.png', import.meta.url);
const WATERMARK_MIN_IMAGE_SIDE = 180;
const WATERMARK_MIN_WIDTH = 54;
const WATERMARK_MAX_WIDTH = 150;
const WATERMARK_WIDTH_RATIO = 0.14;
const WATERMARK_MARGIN_RATIO = 0.035;
const WATERMARK_OPACITY = 0.52;
const WATERMARK_MIN_BOTTOM_OFFSET = 56;
const WATERMARK_MAX_BOTTOM_OFFSET = 130;
const WATERMARK_BOTTOM_OFFSET_RATIO = 0.13;

let watermarkLogoBufferPromise;

const loadWatermarkLogoBuffer = () => {
  if (!watermarkLogoBufferPromise) {
    watermarkLogoBufferPromise = readFile(WATERMARK_LOGO_URL);
  }
  return watermarkLogoBufferPromise;
};

const normalizedSourceDimensions = (metadata) => {
  const width = metadata.width || 1;
  const height = metadata.height || 1;
  if ([5, 6, 7, 8].includes(metadata.orientation)) {
    return { width: height, height: width };
  }
  return { width, height };
};

const estimateVariantDimensions = ({ sourceWidth, sourceHeight, variant }) => {
  const targetWidth = variant.width || sourceWidth;
  const targetHeight = variant.height || sourceHeight;

  if (variant.fit === 'cover') {
    return {
      width: Math.max(1, Math.min(targetWidth, sourceWidth)),
      height: Math.max(1, Math.min(targetHeight, sourceHeight)),
    };
  }

  const scale = Math.min(1, targetWidth / sourceWidth, targetHeight / sourceHeight);
  return {
    width: Math.max(1, Math.round(sourceWidth * scale)),
    height: Math.max(1, Math.round(sourceHeight * scale)),
  };
};

const createWatermarkOverlay = async ({ sharp, width, height }) => {
  const smallestSide = Math.min(width, height);
  if (smallestSide < WATERMARK_MIN_IMAGE_SIDE) return null;

  const logoWidth = Math.round(Math.max(
    WATERMARK_MIN_WIDTH,
    Math.min(WATERMARK_MAX_WIDTH, width * WATERMARK_WIDTH_RATIO, smallestSide * 0.35)
  ));
  const leftMargin = Math.round(Math.max(10, smallestSide * WATERMARK_MARGIN_RATIO));
  const bottomOffset = Math.round(Math.max(
    WATERMARK_MIN_BOTTOM_OFFSET,
    Math.min(WATERMARK_MAX_BOTTOM_OFFSET, height * WATERMARK_BOTTOM_OFFSET_RATIO)
  ));
  const logoSource = await loadWatermarkLogoBuffer();
  const { data: logoRawBuffer, info: logoInfo } = await sharp(logoSource, { limitInputPixels: false })
    .resize({ width: logoWidth, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 3; index < logoRawBuffer.length; index += logoInfo.channels) {
    logoRawBuffer[index] = Math.round(logoRawBuffer[index] * WATERMARK_OPACITY);
  }

  const logoBuffer = await sharp(logoRawBuffer, {
    raw: { width: logoInfo.width, height: logoInfo.height, channels: logoInfo.channels },
    limitInputPixels: false,
  })
    .png()
    .toBuffer();

  const overlayWidth = logoInfo.width + leftMargin;
  const overlayHeight = logoInfo.height + bottomOffset;
  if (overlayWidth > width || overlayHeight > height) return null;

  const input = await sharp({
    create: {
      width: overlayWidth,
      height: overlayHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
    limitInputPixels: false,
  })
    .composite([{ input: logoBuffer, left: leftMargin, top: 0 }])
    .png()
    .toBuffer();

  return { input, gravity: 'southwest' };
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
  
  // 🔥 CORREÇÃO: Desligado o limite restrito de píxeis com limitInputPixels: false
  const input = sharp(file.buffer, {
    failOn: 'warning',
    limitInputPixels: false,
  });
  const metadata = await input.metadata();

  if (!ALLOWED_IMAGE_FORMATS.has(metadata.format)) {
    throw Object.assign(new Error('O conteudo real do ficheiro nao e JPEG, PNG ou WebP.'), { status: 400 });
  }
  
  const expectedMime = normalizeMimeFromFormat(metadata.format);
  if (file.mimetype && expectedMime && file.mimetype !== expectedMime) {
    throw Object.assign(new Error('MIME enviado nao corresponde ao conteudo real da imagem.'), { status: 400 });
  }

  const base = sharp(file.buffer, {
    failOn: 'warning',
    limitInputPixels: false,
  }).rotate().toColorspace('srgb');

  const config = imageConfigForKind(normalizedKind);
  const sourceDimensions = normalizedSourceDimensions(metadata);
  const variants = [];

  for (const variant of config.variants) {
    const dimensions = estimateVariantDimensions({
      sourceWidth: sourceDimensions.width,
      sourceHeight: sourceDimensions.height,
      variant,
    });
    let pipeline = base.clone().resize({
      width: variant.width,
      height: variant.height,
      fit: variant.fit,
      position: variant.position || 'centre',
      withoutEnlargement: true,
    });

    if (normalizedKind === 'listing') {
      const watermarkOverlay = await createWatermarkOverlay({
        sharp,
        width: dimensions.width,
        height: dimensions.height,
      });
      if (watermarkOverlay) {
        pipeline = pipeline.composite([watermarkOverlay]);
      }
    }

    pipeline = pipeline.webp({
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