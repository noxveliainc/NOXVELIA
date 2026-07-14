const toPositiveInt = (value, fallback, { min = 1, max = Number.MAX_SAFE_INTEGER } = {}) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
};

const normalizeBaseUrl = (value) => String(value || '').replace(/\/+$/, '');

export const IMAGE_VARIANT_CONFIG = {
  listing: {
    maxInputBytes: toPositiveInt(process.env.IMAGE_MAX_UPLOAD_BYTES, 12 * 1024 * 1024, { min: 1024 * 1024, max: 30 * 1024 * 1024 }),
    variants: [
      { name: 'original', width: 1920, height: 1920, fit: 'inside', quality: toPositiveInt(process.env.IMAGE_WEBP_QUALITY, 82, { min: 60, max: 92 }) },
      { name: 'large', width: 1280, height: 1280, fit: 'inside', quality: 80 },
      { name: 'medium', width: 800, height: 800, fit: 'inside', quality: 78 },
      { name: 'thumbnail', width: 400, height: 300, fit: 'cover', position: 'attention', quality: toPositiveInt(process.env.IMAGE_THUMBNAIL_QUALITY, 74, { min: 55, max: 86 }) },
    ],
  },
  avatar: {
    maxInputBytes: toPositiveInt(process.env.IMAGE_MAX_UPLOAD_BYTES, 8 * 1024 * 1024, { min: 512 * 1024, max: 20 * 1024 * 1024 }),
    variants: [
      { name: 'original', width: 512, height: 512, fit: 'cover', position: 'attention', quality: 82 },
      { name: 'thumbnail', width: 160, height: 160, fit: 'cover', position: 'attention', quality: 76 },
    ],
  },
  cover: {
    maxInputBytes: toPositiveInt(process.env.IMAGE_MAX_UPLOAD_BYTES, 10 * 1024 * 1024, { min: 512 * 1024, max: 25 * 1024 * 1024 }),
    variants: [
      { name: 'original', width: 1600, height: 900, fit: 'inside', quality: 82 },
      { name: 'large', width: 1200, height: 675, fit: 'inside', quality: 80 },
      { name: 'thumbnail', width: 480, height: 270, fit: 'cover', position: 'attention', quality: 74 },
    ],
  },
  logo: {
    maxInputBytes: toPositiveInt(process.env.IMAGE_MAX_UPLOAD_BYTES, 8 * 1024 * 1024, { min: 512 * 1024, max: 20 * 1024 * 1024 }),
    variants: [
      { name: 'original', width: 1024, height: 1024, fit: 'inside', quality: 88 },
      { name: 'thumbnail', width: 320, height: 320, fit: 'inside', quality: 84 },
    ],
  },
};

export const IMAGE_UPLOAD_LIMITS = {
  maxFilesPerRequest: toPositiveInt(process.env.IMAGE_MAX_FILES_PER_REQUEST, 10, { min: 1, max: 20 }),
  maxImagesPerListing: toPositiveInt(process.env.IMAGE_MAX_IMAGES_PER_LISTING, 10, { min: 1, max: 30 }),
  maxPixelCount: toPositiveInt(process.env.IMAGE_MAX_PIXEL_COUNT, 24_000_000, { min: 1_000_000, max: 80_000_000 }),
  processingConcurrency: toPositiveInt(process.env.IMAGE_PROCESSING_CONCURRENCY, 2, { min: 1, max: 8 }),
};

export const ALLOWED_IMAGE_FORMATS = new Set(['jpeg', 'png', 'webp']);
export const ALLOWED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const getImageStorageConfig = () => {
  const apiBase = normalizeBaseUrl(process.env.PUBLIC_API_URL || process.env.API_URL || process.env.SERVER_URL || '');
  const appBase = normalizeBaseUrl(process.env.APP_URL || process.env.CLIENT_URL || process.env.FRONTEND_URL || 'https://www.noxvelia.com');
  const publicBaseUrl = normalizeBaseUrl(process.env.IMAGE_PUBLIC_BASE_URL || (apiBase ? `${apiBase}/media` : `${appBase}/api/media`));

  return {
    driver: String(process.env.IMAGE_STORAGE_DRIVER || 'local').toLowerCase(),
    localPath: process.env.IMAGE_STORAGE_PATH || 'storage/images',
    publicBaseUrl,
    s3: {
      endpoint: process.env.S3_ENDPOINT || '',
      region: process.env.S3_REGION || 'auto',
      bucket: process.env.S3_BUCKET || '',
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      publicBaseUrl: normalizeBaseUrl(process.env.S3_PUBLIC_BASE_URL || ''),
      forcePathStyle: String(process.env.S3_FORCE_PATH_STYLE || '').toLowerCase() === 'true',
    },
  };
};

export const normalizeImageKind = (value) => {
  const raw = String(value || '').trim().toLowerCase();
  if (['listing', 'anuncio', 'anuncios', 'foto', 'fotos'].includes(raw)) return 'listing';
  if (['avatar', 'profile', 'perfil'].includes(raw)) return 'avatar';
  if (['cover', 'capa'].includes(raw)) return 'cover';
  if (['logo', 'company', 'empresa'].includes(raw)) return 'logo';
  return 'listing';
};

export const imageConfigForKind = (kind) => IMAGE_VARIANT_CONFIG[normalizeImageKind(kind)] || IMAGE_VARIANT_CONFIG.listing;
