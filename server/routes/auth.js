import express from 'express';
import { register, login, googleAuth, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';
import { verificarTurnstile } from '../middleware/turnstile.js';

const router = express.Router();

const authLimiter = (max) => rateLimit({
  windowMs: 15 * 60 * 1000,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Demasiadas tentativas. Aguarda alguns minutos e tenta novamente.' },
});

router.post('/register', authLimiter(5), verificarTurnstile, register);
router.post('/login', authLimiter(10), verificarTurnstile, login);
router.post('/google', authLimiter(10), verificarTurnstile, googleAuth);
router.get('/verify-email/:token', authLimiter(20), verifyEmail);
router.post('/forgot-password', authLimiter(5), forgotPassword);
router.post('/reset-password/:token', authLimiter(5), resetPassword);

export default router;
