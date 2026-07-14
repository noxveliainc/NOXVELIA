import express from 'express';
import PartnershipContact from '../models/PartnershipContact.js';
import PartnershipEmailSend from '../models/PartnershipEmailSend.js';
import PartnershipSuppression from '../models/PartnershipSuppression.js';
import { getPartnershipEnv } from '../services/partnershipConfig.js';
import { processResendPartnershipEvent, updateSendState, updateSendStateById } from '../services/partnershipEvents.js';
import { verifyResendWebhook } from '../services/partnershipMailer.js';
import { normalizeEmail, verifyToken } from '../services/partnershipEmailUtils.js';

const router = express.Router();

const confirmationHtml = (title, message) => `<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;"><main style="max-width:620px;margin:8vh auto;padding:32px;background:#fff;border:1px solid #e2e8f0;border-radius:18px;"><img src="https://www.noxvelia.com/logo-noxvelia.png" alt="Noxvelia" style="width:150px;height:auto;margin-bottom:24px;"><h1 style="margin:0 0 12px;font-size:26px;">${title}</h1><p style="line-height:1.65;color:#475569;">${message}</p><a href="https://www.noxvelia.com" style="display:inline-block;margin-top:14px;color:#0f766e;font-weight:700;">Voltar a Noxvelia</a></main></body></html>`;

const applyUnsubscribe = async (token, origem = 'unsubscribe') => {
  const env = getPartnershipEnv();
  const payload = verifyToken(token, env.unsubscribeSecret);
  if (!payload || payload.purpose !== 'partnership_unsubscribe') {
    throw Object.assign(new Error('Token invalido.'), { status: 400 });
  }
  const email = normalizeEmail(payload.email);
  const contact = await PartnershipContact.findOneAndUpdate(
    { email },
    { estado: 'removido', removidoEm: new Date(), motivoRemocao: origem },
    { new: true }
  );
  await PartnershipSuppression.updateOne(
    { email },
    { $setOnInsert: { email, motivo: origem, origem, contact: contact?._id } },
    { upsert: true }
  );
  if (payload.sendId) {
    await PartnershipEmailSend.findByIdAndUpdate(payload.sendId, { estado: 'removido', removidoEm: new Date() });
  }
  return { email };
};

router.get('/unsubscribe/:token', async (req, res) => {
  try {
    await applyUnsubscribe(req.params.token, 'unsubscribe_link');
    res.type('html').send(confirmationHtml('Pedido registado', 'Este contacto foi removido da lista de emails comerciais da Noxvelia. Continuara a poder receber emails transacionais necessarios se usar a plataforma.'));
  } catch (error) {
    res.status(error.status || 400).type('html').send(confirmationHtml('Nao foi possivel remover', 'O link parece invalido ou expirado. Pode contactar-nos em geral@noxvelia.com.'));
  }
});

router.post('/unsubscribe/:token', async (req, res) => {
  try {
    const result = await applyUnsubscribe(req.params.token, 'unsubscribe_post');
    res.json({ sucesso: true, ...result });
  } catch (error) {
    res.status(error.status || 400).json({ erro: 'Token invalido.' });
  }
});

router.get('/open/:token', async (req, res) => {
  try {
    const env = getPartnershipEnv();
    const payload = verifyToken(req.params.token, env.unsubscribeSecret);
    if (payload?.sendId) {
      await updateSendStateById({ sendId: payload.sendId, state: 'aberto' });
    } else if (payload?.email) {
      await updateSendState({ resendEmailId: '', recipientEmail: payload.email, state: 'aberto' });
    }
  } catch {
    // Tracking pixels must never expose details.
  }
  const pixel = Buffer.from('R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64');
  res.set('Cache-Control', 'no-store').type('gif').send(pixel);
});

router.get('/click/:token', async (req, res) => {
  let destination = 'https://www.noxvelia.com';
  try {
    const env = getPartnershipEnv();
    const payload = verifyToken(req.params.token, env.unsubscribeSecret);
    const requested = new URL(String(req.query.u || destination));
    if (requested.protocol === 'https:' || requested.protocol === 'http:') destination = requested.toString();
    if (payload?.sendId) {
      await updateSendStateById({ sendId: payload.sendId, state: 'clicado' });
    } else if (payload?.email) {
      await updateSendState({ resendEmailId: '', recipientEmail: payload.email, state: 'clicado' });
    }
  } catch {
    // Keep redirect safe.
  }
  res.redirect(destination);
});

router.post('/resend/webhook', async (req, res) => {
  try {
    const payloadText = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body || {});
    const event = verifyResendWebhook(payloadText, req.headers);
    const result = await processResendPartnershipEvent(event);
    res.json({ recebido: true, ...result });
  } catch (error) {
    res.status(400).json({ erro: 'Webhook invalido.' });
  }
});

export default router;
