import express from 'express';
import { imageContentHeaders, readImageByStorageKey } from '../services/imageService.js';

const router = express.Router();

const normalizeMediaKey = (value) => {
  const key = String(value || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!key || key.includes('..') || key.includes('//') || !key.endsWith('.webp')) return null;
  if (!key.startsWith('images/')) return null;
  return key;
};

router.get('/*', async (req, res) => {
  try {
    const key = normalizeMediaKey(req.params[0]);
    if (!key) return res.status(404).end();
    const buffer = await readImageByStorageKey(key);
    const headers = imageContentHeaders(buffer);
    Object.entries(headers).forEach(([name, value]) => res.setHeader(name, value));
    return res.send(buffer);
  } catch {
    return res.status(404).end();
  }
});

export default router;
