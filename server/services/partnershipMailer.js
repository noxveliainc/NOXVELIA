import { Resend } from 'resend';
import { getPartnershipEnv, getPartnershipSettings } from './partnershipConfig.js';
import { renderPartnershipEmail } from './partnershipTemplate.js';
import { cleanText, safeFromAddress, safeReplyTo } from './partnershipEmailUtils.js';

let resendInstance = null;

const getResend = () => {
  const { resendApiKey } = getPartnershipEnv();
  if (!resendApiKey) return null;
  if (!resendInstance) resendInstance = new Resend(resendApiKey);
  return resendInstance;
};

export const renderCommercialEmailForSend = async ({ campaign, contact, send = null }) => {
  const env = getPartnershipEnv();
  const settings = await getPartnershipSettings();
  const campaignSettings = {
    ...settings,
    trackingAberturas: campaign.trackingAberturas ?? settings.trackingAberturas,
    trackingCliques: campaign.trackingCliques ?? settings.trackingCliques,
  };
  return renderPartnershipEmail({
    campaign,
    contact,
    send,
    settings: campaignSettings,
    appUrl: env.appUrl,
    apiUrl: env.apiUrl,
    logoUrl: settings.logoUrl,
    secret: env.unsubscribeSecret,
  });
};

export const sendCommercialEmail = async ({ campaign, contact, send, overrideTo = null }) => {
  const resend = getResend();
  const env = getPartnershipEnv();
  const settings = await getPartnershipSettings();
  const rendered = await renderCommercialEmailForSend({ campaign, contact, send });
  const to = overrideTo || contact.email;
  const payload = {
    from: safeFromAddress(campaign.remetente || settings.remetente, env.defaultFrom),
    to: [to],
    replyTo: safeReplyTo(campaign.replyTo || settings.replyTo, env.defaultReplyTo),
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    headers: rendered.headers,
    tags: [
      { name: 'kind', value: 'partnership' },
      { name: 'campaign', value: String(campaign._id || 'test').slice(0, 256) },
      { name: 'send', value: String(send?._id || 'test').slice(0, 256) },
    ],
  };

  if (!resend) {
    return { skipped: true, id: `dev_${send?._id || Date.now()}`, subject: rendered.subject };
  }

  const idempotencyKey = cleanText(send?.idempotencyKey || `partnership:${campaign._id}:${contact._id}:${send?._id || 'test'}`, 240);
  const { data, error } = await resend.emails.send(payload, { idempotencyKey });
  if (error) {
    const wrapped = new Error(error.message || 'Erro ao enviar email comercial.');
    wrapped.statusCode = error.statusCode || error.status || error.response?.status;
    wrapped.code = error.name || error.code;
    throw wrapped;
  }
  return { ...(data || {}), subject: rendered.subject };
};

export const verifyResendWebhook = (payload, headers) => {
  const resend = getResend();
  const { webhookSecret } = getPartnershipEnv();
  if (!webhookSecret) throw new Error('RESEND_WEBHOOK_SECRET ausente.');
  if (!resend?.webhooks?.verify) throw new Error('SDK Resend sem suporte a verificacao de webhooks.');
  return resend.webhooks.verify({
    payload,
    headers: {
      id: headers['svix-id'],
      timestamp: headers['svix-timestamp'],
      signature: headers['svix-signature'],
    },
    webhookSecret,
  });
};
