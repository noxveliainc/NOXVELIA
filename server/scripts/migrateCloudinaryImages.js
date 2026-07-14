import 'dotenv/config';
import path from 'node:path';
import mongoose from 'mongoose';
import Anuncio from '../models/Anuncio.js';
import User from '../models/User.js';
import ImageAsset from '../models/ImageAsset.js';
import { publicImageDto, uploadImageFile } from '../services/imageService.js';

const MAX_DOWNLOAD_BYTES = 30 * 1024 * 1024;

const args = new Set(process.argv.slice(2));
const dryRun = !args.has('--apply');
const only = [...args].find((arg) => arg.startsWith('--only='))?.split('=')[1] || 'all';
const limit = Number.parseInt([...args].find((arg) => arg.startsWith('--limit='))?.split('=')[1] || '0', 10);

const stats = {
  scanned: 0,
  migratable: 0,
  migrated: 0,
  reused: 0,
  skipped: 0,
  failed: 0,
};

const isCloudinaryUrl = (value) => {
  try {
    const url = new URL(String(value || ''));
    return url.protocol === 'https:' && url.hostname === 'res.cloudinary.com';
  } catch {
    return false;
  }
};

const getImageUrlValue = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.url || value.urls?.large || value.urls?.original || '';
};

const safeFileNameFromUrl = (value) => {
  try {
    return path.basename(new URL(value).pathname) || 'cloudinary-image';
  } catch {
    return 'cloudinary-image';
  }
};

const downloadCloudinaryImage = async (url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    if (!response.ok) throw new Error(`Download falhou com HTTP ${response.status}.`);

    const contentType = String(response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) {
      throw new Error(`Tipo de imagem nao suportado: ${contentType || 'desconhecido'}.`);
    }

    const contentLength = Number.parseInt(response.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_DOWNLOAD_BYTES) {
      throw new Error('Imagem recusada por limite de tamanho declarado.');
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length > MAX_DOWNLOAD_BYTES) {
      throw new Error('Imagem recusada por limite de download.');
    }

    return {
      buffer,
      mimetype: contentType,
      originalname: safeFileNameFromUrl(url),
    };
  } finally {
    clearTimeout(timer);
  }
};

const migrateUrl = async ({ url, kind, ownerType, ownerId, uploadedBy, altText = '', sortOrder = 0, isPrimary = false }) => {
  stats.scanned += 1;
  if (!isCloudinaryUrl(url)) {
    stats.skipped += 1;
    return { status: 'skipped', value: url };
  }

  stats.migratable += 1;
  const existing = await ImageAsset.findOne({ legacySourceUrl: url, migrationStatus: 'migrated', deletedAt: null });
  if (existing) {
    stats.reused += 1;
    return { status: 'reused', value: publicImageDto(existing) };
  }

  if (dryRun) return { status: 'dry-run', value: url };

  const file = await downloadCloudinaryImage(url);
  const asset = await uploadImageFile({
    file,
    kind,
    ownerType,
    ownerId,
    uploadedBy,
    altText,
    sortOrder,
    isPrimary,
    legacySourceUrl: url,
  });

  stats.migrated += 1;
  return { status: 'migrated', value: publicImageDto(asset) };
};

const migrateListings = async () => {
  if (!['all', 'listings'].includes(only)) return;
  const query = { fotos: { $exists: true, $ne: [] } };
  const cursor = Anuncio.find(query).cursor();
  let changed = 0;

  for await (const anuncio of cursor) {
    if (limit && stats.migratable >= limit) break;
    const fotos = Array.isArray(anuncio.fotos) ? anuncio.fotos : [];
    let docChanged = false;
    const nextFotos = [];

    for (const [index, foto] of fotos.entries()) {
      const url = getImageUrlValue(foto);
      try {
        const result = await migrateUrl({
          url,
          kind: 'listing',
          ownerType: 'listing',
          ownerId: anuncio._id,
          uploadedBy: anuncio.utilizador,
          altText: anuncio.titulo || '',
          sortOrder: index,
          isPrimary: index === 0,
        });
        nextFotos.push(result.value || foto);
        if (['migrated', 'reused'].includes(result.status)) docChanged = true;
      } catch (error) {
        stats.failed += 1;
        console.warn(`[images:migrate] Falhou anuncio ${anuncio._id}: ${error.message}`);
        nextFotos.push(foto);
      }
    }

    if (docChanged && !dryRun) {
      anuncio.fotos = nextFotos;
      await anuncio.save();
      changed += 1;
    }
  }

  console.log(`[images:migrate] Anuncios atualizados: ${changed}`);
};

const migrateUsers = async () => {
  if (!['all', 'users'].includes(only)) return;
  const cursor = User.find({ $or: [{ avatarUrl: /cloudinary/i }, { capaUrl: /cloudinary/i }] }).cursor();
  let changed = 0;

  for await (const user of cursor) {
    if (limit && stats.migratable >= limit) break;
    let docChanged = false;

    for (const field of ['avatarUrl', 'capaUrl']) {
      const url = user[field];
      if (!url) continue;
      try {
        const result = await migrateUrl({
          url,
          kind: field === 'avatarUrl' ? 'avatar' : 'cover',
          ownerType: 'user',
          ownerId: user._id,
          uploadedBy: user._id,
          altText: user.nome || 'Noxvelia',
          isPrimary: true,
        });
        if (['migrated', 'reused'].includes(result.status)) {
          user[field] = result.value?.urls?.large || result.value?.url || user[field];
          docChanged = true;
        }
      } catch (error) {
        stats.failed += 1;
        console.warn(`[images:migrate] Falhou utilizador ${user._id}/${field}: ${error.message}`);
      }
    }

    if (docChanged && !dryRun) {
      await user.save();
      changed += 1;
    }
  }

  console.log(`[images:migrate] Utilizadores atualizados: ${changed}`);
};

const main = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI em falta.');
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });

  console.log(`[images:migrate] Modo: ${dryRun ? 'dry-run' : 'apply'}`);
  console.log(`[images:migrate] Alvo: ${only}`);
  await migrateListings();
  await migrateUsers();
  console.log(`[images:migrate] Resultado: ${JSON.stringify(stats)}`);
  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error(`[images:migrate] Erro fatal: ${error.message}`);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
