import express from 'express';
import { obterAtualidadeMercado } from '../services/marketNewsService.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 8);
    const data = await obterAtualidadeMercado({ limit });
    res.set('Cache-Control', 'public, max-age=1800, stale-while-revalidate=7200');
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
