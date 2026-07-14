import crypto from 'node:crypto';
import mongoose from 'mongoose';
import ImageAsset from '../models/ImageAsset.js';
import { normalizeImageKind } from '../config/imageStorage.js';
import { getImageStorage } from './imageStorage.js';
import { processImageUpload } from './imageProcessor.js';

const ownerTypeForKind = (kind) => {
  if (kind === 'avatar' || kind === 'cover') return 'user';
  if (kind === 'logo') return 'company';
  if (kind === 'listing') return 'temporary';
  return 'temporary';
};

const folderForAsset = ({ kind, ownerType, ownerId }) => {
  const idPart = ownerId && mongoose.Types.ObjectId.isValid(ownerId) ? String(ownerId) : 'unassigned';
  if (kind === 'listing') return `images/listings/${idPart}`;
  if (kind === 'avatar') return `images/avatars/${idPart}`;
  if (kind === 'cover') return `images/covers/${idPart}`;
  if (kind === 'logo') return `images/companies/${idPart}`;
  return `images/${ownerType || 'temporary'}/${idPart}`;
};

const cleanAltText = (value) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, 180);

export const publicImageDto = (asset) => {
  if (!asset) return null;
  const variants = {};
  for (const variant of asset.variants || []) {
    variants[variant.name] = {
      url: variant.url,
      width: variant.width,
      height: variant.height,
      sizeBytes: variant.sizeBytes,
      mimeType: variant.mimeType,
    };
  }
  const primary = variants.original || variants.large || variants.medium || variants.thumbnail || {};
  return {
    id: String(asset._id),
    url: primary.url || '',
    urls: {
      original: variants.original?.url || primary.url || '',
      large: variants.large?.url || variants.original?.url || primary.url || '',
      medium: variants.medium?.url || variants.large?.url || variants.original?.url || primary.url || '',
      thumbnail: variants.thumbnail?.url || variants.medium?.url || primary.url || '',
    },
    variants,
    width: asset.width,
    height: asset.height,
    blurDataURL: asset.blurDataURL || '',
    altText: asset.altText || '',
  };
};

export const extractImageUrls = (images = []) => {
  const urls = [];
  for (const image of images || []) {
    if (!image) continue;
    if (typeof image === 'string') {
      urls.push(image);
      continue;
    }
    if (image.url) urls.push(image.url);
    if (image.urls && typeof image.urls === 'object') {
      Object.values(image.urls).filter(Boolean).forEach((url) => urls.push(url));
    }
    if (image.variants && typeof image.variants === 'object') {
      Object.values(image.variants).forEach((variant) => {
        if (variant?.url) urls.push(variant.url);
      });
    }
  }
  return [...new Set(urls)];
};

export const uploadImageFile = async ({
  file,
  uploadedBy,
  kind = 'listing',
  ownerType,
  ownerId,
  altText = '',
  sortOrder = 0,
  isPrimary = false,
  legacySourceUrl = '',
}) => {
  const normalizedKind = normalizeImageKind(kind);
  const storage = getImageStorage();
  const processed = await processImageUpload({ file, kind: normalizedKind });
  const imageId = crypto.randomUUID();
  const resolvedOwnerType = ownerType || ownerTypeForKind(normalizedKind);
  const resolvedOwnerId = ownerId && mongoose.Types.ObjectId.isValid(ownerId) ? ownerId : undefined;
  const folder = folderForAsset({ kind: normalizedKind, ownerType: resolvedOwnerType, ownerId: resolvedOwnerId || uploadedBy });

  const storedVariants = [];
  try {
    for (const variant of processed.variants) {
      const storageKey = `${folder}/${imageId}/${variant.name}.webp`;
      await storage.save(storageKey, variant.buffer);
      storedVariants.push({
        name: variant.name,
        storageKey,
        url: storage.getPublicUrl(storageKey),
        width: variant.width,
        height: variant.height,
        sizeBytes: variant.sizeBytes,
        format: variant.format,
        mimeType: variant.mimeType,
      });
    }

    const original = storedVariants.find((variant) => variant.name === 'original') || storedVariants[0];
    const asset = await ImageAsset.create({
      ownerType: resolvedOwnerType,
      ownerId: resolvedOwnerId,
      uploadedBy,
      storageProvider: storage.provider,
      storageKey: original.storageKey,
      originalFilename: processed.originalFilename,
      originalMimeType: processed.originalMimeType,
      finalMimeType: processed.finalMimeType,
      width: processed.width,
      height: processed.height,
      sizeBytes: processed.sizeBytes,
      checksum: processed.checksum,
      blurDataURL: processed.blurDataURL,
      altText: cleanAltText(altText),
      sortOrder,
      isPrimary,
      processingStatus: 'processed',
      variants: storedVariants,
      legacySourceUrl,
      migrationStatus: legacySourceUrl ? 'migrated' : 'none',
    });

    return asset;
  } catch (error) {
    await Promise.allSettled(storedVariants.map((variant) => storage.delete(variant.storageKey)));
    throw error;
  }
};

export const deleteImageAsset = async ({ assetId, userId, force = false }) => {
  const asset = await ImageAsset.findById(assetId);
  if (!asset || asset.deletedAt) return { deleted: false, reason: 'not_found' };
  if (!force && userId && asset.uploadedBy && String(asset.uploadedBy) !== String(userId)) {
    throw Object.assign(new Error('Sem permissao para eliminar esta imagem.'), { status: 403 });
  }
  const storage = getImageStorage();
  await Promise.allSettled((asset.variants || []).map((variant) => storage.delete(variant.storageKey)));
  asset.processingStatus = 'deleted';
  asset.deletedAt = new Date();
  await asset.save();
  return { deleted: true };
};

export const attachImagesToOwnerByUrls = async ({ urls = [], ownerType, ownerId }) => {
  const values = extractImageUrls(urls);
  if (!values.length || !ownerId) return;
  await ImageAsset.updateMany(
    { 'variants.url': { $in: values }, deletedAt: null },
    { $set: { ownerType, ownerId } }
  );
};

export const deleteImagesByOwner = async ({ ownerType, ownerId }) => {
  const assets = await ImageAsset.find({ ownerType, ownerId, deletedAt: null });
  await Promise.allSettled(assets.map((asset) => deleteImageAsset({ assetId: asset._id, force: true })));
  return assets.length;
};

export const deleteImagesByUrls = async ({ urls = [], ownerType, ownerId }) => {
  const values = extractImageUrls(urls);
  if (!values.length || !ownerId) return 0;
  const assets = await ImageAsset.find({ ownerType, ownerId, 'variants.url': { $in: values }, deletedAt: null });
  await Promise.allSettled(assets.map((asset) => deleteImageAsset({ assetId: asset._id, force: true })));
  return assets.length;
};

export const readImageByStorageKey = async (storageKey) => {
  const storage = getImageStorage();
  return storage.read(storageKey);
};

export const imageContentHeaders = (buffer) => ({
  'Content-Type': 'image/webp',
  'Content-Length': String(buffer.length),
  'Cache-Control': 'public, max-age=31536000, immutable',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'X-Content-Type-Options': 'nosniff',
  ETag: `"${crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 32)}"`,
});
