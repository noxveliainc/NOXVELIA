import 'dotenv/config';
import mongoose from 'mongoose';
import ImageAsset from '../models/ImageAsset.js';
import { deleteImageAsset } from '../services/imageService.js';

const args = new Set(process.argv.slice(2));
const dryRun = !args.has('--apply');
const daysArg = [...args].find((arg) => arg.startsWith('--days='))?.split('=')[1];
const days = Math.max(1, Number.parseInt(daysArg || '7', 10) || 7);
const limit = Math.max(0, Number.parseInt([...args].find((arg) => arg.startsWith('--limit='))?.split('=')[1] || '0', 10) || 0);

const main = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI em falta.');
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });

  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const query = {
    ownerType: 'temporary',
    deletedAt: null,
    createdAt: { $lte: cutoff },
  };

  const assets = await ImageAsset.find(query)
    .sort({ createdAt: 1 })
    .limit(limit || 1000);

  console.log(`[images:cleanup] Modo: ${dryRun ? 'dry-run' : 'apply'}`);
  console.log(`[images:cleanup] Temporarias anteriores a ${cutoff.toISOString()}: ${assets.length}`);

  if (!dryRun) {
    let deleted = 0;
    for (const asset of assets) {
      await deleteImageAsset({ assetId: asset._id, force: true });
      deleted += 1;
    }
    console.log(`[images:cleanup] Eliminadas: ${deleted}`);
  }

  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error(`[images:cleanup] Erro fatal: ${error.message}`);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
