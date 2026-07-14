import PartnershipContact from '../models/PartnershipContact.js';
import PartnershipEmailSend from '../models/PartnershipEmailSend.js';
import PartnershipReply from '../models/PartnershipReply.js';
import PartnershipSuppression from '../models/PartnershipSuppression.js';
import PartnershipWebhookEvent from '../models/PartnershipWebhookEvent.js';
import { normalizeEmail } from './partnershipEmailUtils.js';
import { refreshCampaignCounters } from './partnershipCampaignService.js';

const eventStateMap = {
  'email.sent': 'enviado',
  'email.delivered': 'entregue',
  'email.opened': 'aberto',
  'email.clicked': 'clicado',
  'email.bounced': 'devolvido',
  'email.complained': 'reclamado',
  'email.failed': 'falhou',
  'email.suppressed': 'removido',
};

const pickEmailId = (payload = {}) => payload.data?.email_id || payload.data?.id || payload.email_id || payload.id || '';
const pickRecipient = (payload = {}) => {
  const to = payload.data?.to || payload.to || payload.data?.recipient || '';
  if (Array.isArray(to)) return normalizeEmail(to[0]);
  return normalizeEmail(to);
};

export const updateSendState = async ({ resendEmailId, recipientEmail, state, error = '' }) => {
  const query = resendEmailId ? { resendEmailId } : { recipientEmail: normalizeEmail(recipientEmail) };
  const send = await PartnershipEmailSend.findOne(query).sort({ createdAt: -1 });
  if (!send) return null;
  const now = new Date();
  const precedence = ['pendente', 'enviado', 'entregue', 'aberto', 'clicado'];
  if (precedence.includes(state) && precedence.includes(send.estado) && precedence.indexOf(send.estado) > precedence.indexOf(state)) {
    return send;
  }
  send.estado = state;
  if (error) send.erro = error.slice(0, 500);
  if (state === 'enviado') send.enviadoEm = send.enviadoEm || now;
  if (state === 'entregue') send.entregueEm = send.entregueEm || now;
  if (state === 'aberto') send.abertoEm = send.abertoEm || now;
  if (state === 'clicado') send.clicadoEm = send.clicadoEm || now;
  if (state === 'devolvido') send.devolvidoEm = send.devolvidoEm || now;
  if (state === 'removido') send.removidoEm = send.removidoEm || now;
  await send.save();
  await refreshCampaignCounters(send.campaign);
  return send;
};

export const updateSendStateById = async ({ sendId, state, error = '' }) => {
  const send = await PartnershipEmailSend.findById(sendId);
  if (!send) return null;
  const now = new Date();
  const precedence = ['pendente', 'enviado', 'entregue', 'aberto', 'clicado'];
  if (precedence.includes(state) && precedence.includes(send.estado) && precedence.indexOf(send.estado) > precedence.indexOf(state)) {
    return send;
  }
  send.estado = state;
  if (error) send.erro = error.slice(0, 500);
  if (state === 'enviado') send.enviadoEm = send.enviadoEm || now;
  if (state === 'entregue') send.entregueEm = send.entregueEm || now;
  if (state === 'aberto') send.abertoEm = send.abertoEm || now;
  if (state === 'clicado') send.clicadoEm = send.clicadoEm || now;
  if (state === 'devolvido') send.devolvidoEm = send.devolvidoEm || now;
  if (state === 'removido') send.removidoEm = send.removidoEm || now;
  await send.save();
  await refreshCampaignCounters(send.campaign);
  return send;
};

export const suppressFromEvent = async ({ email, motivo, origem, send = null }) => {
  const normalized = normalizeEmail(email);
  if (!normalized) return;
  await PartnershipSuppression.updateOne(
    { email: normalized },
    { $setOnInsert: { email: normalized, motivo, origem, contact: send?.contact } },
    { upsert: true }
  );
  await PartnershipContact.updateOne(
    { email: normalized },
    { $set: { estado: 'bloqueado', removidoEm: new Date(), motivoRemocao: motivo } }
  );
};

export const processResendPartnershipEvent = async (payload = {}) => {
  const eventId = payload.id || payload.event_id || payload.data?.id || `${payload.type || 'event'}:${pickEmailId(payload)}:${payload.created_at || Date.now()}`;
  const type = payload.type || payload.event || '';
  try {
    await PartnershipWebhookEvent.create({
      eventId,
      type,
      resendEmailId: pickEmailId(payload),
      payload,
    });
  } catch (error) {
    if (error?.code === 11000) return { duplicate: true };
    throw error;
  }

  if (type === 'email.received' || type === 'email.replied') {
    const from = payload.data?.from || payload.from || {};
    const fromEmail = normalizeEmail(typeof from === 'string' ? from : from.email);
    const contact = fromEmail ? await PartnershipContact.findOne({ email: fromEmail }).lean() : null;
    await PartnershipReply.create({
      eventId,
      fromEmail,
      fromName: typeof from === 'object' ? from.name || '' : '',
      toEmail: pickRecipient(payload),
      subject: payload.data?.subject || payload.subject || '',
      text: String(payload.data?.text || payload.text || '').slice(0, 8000),
      html: String(payload.data?.html || payload.html || '').slice(0, 12000),
      contact: contact?._id,
    });
    if (contact?._id) await PartnershipContact.updateOne({ _id: contact._id }, { $set: { estado: 'respondeu' } });
    return { processed: true, reply: true };
  }

  const state = eventStateMap[type];
  if (!state) return { processed: true, ignored: true };
  const send = await updateSendState({
    resendEmailId: pickEmailId(payload),
    recipientEmail: pickRecipient(payload),
    state,
    error: payload.data?.error || payload.error || '',
  });

  if (['devolvido', 'reclamado', 'removido'].includes(state)) {
    await suppressFromEvent({
      email: send?.recipientEmail || pickRecipient(payload),
      motivo: state === 'reclamado' ? 'complaint' : state === 'removido' ? 'suppressed' : 'bounce',
      origem: 'resend_webhook',
      send,
    });
  }
  return { processed: true };
};
