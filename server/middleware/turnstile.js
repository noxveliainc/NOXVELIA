const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const turnstileEnabled = () =>
  process.env.TURNSTILE_ENABLED === 'true' && Boolean(process.env.TURNSTILE_SECRET_KEY);

const getClientIp = (req) => String(req.headers['cf-connecting-ip'] || req.ip || req.socket?.remoteAddress || '');

export const verificarTurnstile = async (req, res, next) => {
  if (!turnstileEnabled()) return next();

  const token = req.body?.turnstileToken;
  if (typeof token !== 'string' || token.length < 20) {
    return res.status(400).json({ erro: 'Confirma a verificação de segurança e tenta novamente.' });
  }

  try {
    const formData = new URLSearchParams();
    formData.set('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.set('response', token);
    const remoteIp = getClientIp(req);
    if (remoteIp) formData.set('remoteip', remoteIp);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.success !== true) {
      return res.status(403).json({ erro: 'Não foi possível validar a verificação de segurança.' });
    }

    return next();
  } catch (error) {
    console.warn('[TURNSTILE] Falha na verificação:', error.message);
    return res.status(503).json({ erro: 'Verificação de segurança temporariamente indisponível.' });
  }
};
