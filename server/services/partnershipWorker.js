import PartnershipCampaign from '../models/PartnershipCampaign.js';
import PartnershipContact from '../models/PartnershipContact.js';
import PartnershipEmailSend from '../models/PartnershipEmailSend.js';
import PartnershipSuppression from '../models/PartnershipSuppression.js';
import { getPartnershipSettings } from './partnershipConfig.js';
import { refreshCampaignCounters } from './partnershipCampaignService.js';
import { isValidEmail, normalizeEmail } from './partnershipEmailUtils.js';
import { sendCommercialEmail } from './partnershipMailer.js';

let processing = false;
let timer = null;

const waitMs = (attempt) => Math.min(6 * 60 * 60 * 1000, (2 ** Math.max(0, attempt)) * 60 * 1000);

const isTemporaryError = (error) => {
  const status = Number(error?.statusCode || error?.status || error?.response?.status);
  return status === 429 || status >= 500 || error?.code === 'rate_limit_exceeded';
};

const dailySentCount = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return PartnershipEmailSend.countDocuments({ enviadoEm: { $gte: start }, estado: { $in: ['enviado', 'entregue', 'aberto', 'clicado'] } });
};

export const processPartnershipQueue = async () => {
  if (processing) return { skipped: true };
  processing = true;
  const touchedCampaigns = new Set();

  try {
    const settings = await getPartnershipSettings();
    const sentToday = await dailySentCount();
    const remainingToday = Math.max(0, settings.limiteDiario - sentToday);
    if (remainingToday <= 0) return { processed: 0, reason: 'daily_limit' };

    const limit = Math.min(settings.tamanhoLote, remainingToday);
    const campaigns = await PartnershipCampaign.find({ estado: 'em_processamento' }).select('_id').limit(3).lean();
    if (!campaigns.length) return { processed: 0 };

    let processed = 0;
    for (const campaignRef of campaigns) {
      const campaign = await PartnershipCampaign.findById(campaignRef._id);
      if (!campaign || campaign.estado !== 'em_processamento') continue;

      const sends = await PartnershipEmailSend.find({
        campaign: campaign._id,
        estado: 'pendente',
        tentativas: { $lt: 5 },
        $or: [{ nextAttemptAt: { $exists: false } }, { nextAttemptAt: { $lte: new Date() } }],
      }).sort({ createdAt: 1 }).limit(limit - processed);

      for (const send of sends) {
        const contact = await PartnershipContact.findById(send.contact);
        const email = normalizeEmail(send.recipientEmail || contact?.email);
        if (!contact || !isValidEmail(email) || ['removido', 'bloqueado', 'invalido'].includes(contact.estado)) {
          send.estado = 'ignorado';
          send.erro = 'Contacto invalido, removido ou bloqueado.';
          await send.save();
          touchedCampaigns.add(String(campaign._id));
          processed += 1;
          continue;
        }

        const suppression = await PartnershipSuppression.findOne({ email }).lean();
        if (suppression) {
          send.estado = 'removido';
          send.removidoEm = new Date();
          send.erro = 'Email na lista de supressao.';
          contact.estado = 'removido';
          contact.removidoEm = contact.removidoEm || new Date();
          contact.motivoRemocao = contact.motivoRemocao || 'supressao';
          await Promise.all([send.save(), contact.save()]);
          touchedCampaigns.add(String(campaign._id));
          processed += 1;
          continue;
        }

        try {
          send.tentativas += 1;
          const result = await sendCommercialEmail({ campaign, contact, send });
          send.resendEmailId = result.id || result.data?.id || send.resendEmailId;
          send.assuntoFinal = result.subject || campaign.assunto;
          send.estado = 'enviado';
          send.enviadoEm = new Date();
          send.erro = '';
          contact.estado = contact.estado === 'novo' || contact.estado === 'valido' ? 'contactado' : contact.estado;
          contact.ultimoContactoEm = new Date();
          await Promise.all([send.save(), contact.save()]);
        } catch (error) {
          send.erro = String(error.message || 'Erro temporario ao enviar.').slice(0, 500);
          if (isTemporaryError(error) && send.tentativas < 5) {
            send.nextAttemptAt = new Date(Date.now() + waitMs(send.tentativas));
            send.estado = 'pendente';
          } else {
            send.estado = 'falhou';
          }
          await send.save();
        }
        touchedCampaigns.add(String(campaign._id));
        processed += 1;
        if (processed >= limit) break;
      }
      if (processed >= limit) break;
    }

    await Promise.all([...touchedCampaigns].map((id) => refreshCampaignCounters(id)));
    return { processed };
  } finally {
    processing = false;
  }
};

export const iniciarPartnershipWorker = () => {
  if (timer) return;
  timer = setInterval(() => {
    processPartnershipQueue().catch((error) => {
      console.error('[PARTNERSHIPS] Worker falhou:', error.message);
    });
  }, 30000);
  timer.unref?.();
};
