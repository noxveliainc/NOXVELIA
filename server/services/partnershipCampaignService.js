import mongoose from 'mongoose';
import PartnershipCampaign from '../models/PartnershipCampaign.js';
import PartnershipContact from '../models/PartnershipContact.js';
import PartnershipEmailSend from '../models/PartnershipEmailSend.js';
import PartnershipSuppression from '../models/PartnershipSuppression.js';
import { isValidEmail, normalizeEmail } from './partnershipEmailUtils.js';

export const buildRecipientQuery = (filters = {}) => {
  const query = { estado: { $nin: ['removido', 'bloqueado', 'invalido'] } };
  if (filters.contactIds?.length) {
    query._id = { $in: filters.contactIds.filter((id) => mongoose.Types.ObjectId.isValid(id)) };
  }
  if (filters.tiposEmpresa?.length) query.tipoEmpresa = { $in: filters.tiposEmpresa };
  if (filters.estados?.length) query.estado = { $in: filters.estados };
  if (filters.origem) query.origem = filters.origem;
  return query;
};

export const estimateRecipients = async (filters = {}) => {
  const contacts = await PartnershipContact.find(buildRecipientQuery(filters)).select('_id email estado').lean();
  const emails = contacts.map((contact) => normalizeEmail(contact.email)).filter(isValidEmail);
  const suppressed = await PartnershipSuppression.find({ email: { $in: emails } }).select('email').lean();
  const suppressedSet = new Set(suppressed.map((item) => item.email));
  const eligible = contacts.filter((contact) => isValidEmail(contact.email) && !suppressedSet.has(normalizeEmail(contact.email)));
  return {
    total: contacts.length,
    eligible: eligible.length,
    invalid: contacts.filter((contact) => !isValidEmail(contact.email)).length,
    suppressed: contacts.length - eligible.length - contacts.filter((contact) => !isValidEmail(contact.email)).length,
    eligibleIds: eligible.map((contact) => contact._id),
  };
};

export const prepareCampaignSends = async (campaignId, adminId) => {
  const campaign = await PartnershipCampaign.findById(campaignId);
  if (!campaign) throw Object.assign(new Error('Campanha nao encontrada.'), { status: 404 });
  if (!['rascunho', 'pausada', 'programada'].includes(campaign.estado)) {
    throw Object.assign(new Error('Campanha nao pode ser iniciada neste estado.'), { status: 400 });
  }

  const estimate = await estimateRecipients(campaign.filtrosDestinatarios || {});
  const contacts = await PartnershipContact.find({ _id: { $in: estimate.eligibleIds } }).select('_id email').lean();
  const docs = contacts.map((contact) => ({
    campaign: campaign._id,
    contact: contact._id,
    recipientEmail: normalizeEmail(contact.email),
    estado: 'pendente',
    nextAttemptAt: new Date(),
    idempotencyKey: `partnership:${campaign._id}:${contact._id}`,
  }));

  if (docs.length) {
    try {
      await PartnershipEmailSend.insertMany(docs, { ordered: false });
    } catch (error) {
      if (error?.code !== 11000 && error?.writeErrors?.some((item) => item.code !== 11000)) throw error;
    }
  }

  const totalDestinatarios = await PartnershipEmailSend.countDocuments({ campaign: campaign._id });
  const now = new Date();
  campaign.estado = 'em_processamento';
  campaign.iniciadoPor = adminId;
  campaign.iniciadoEm = campaign.iniciadoEm || now;
  campaign.totalDestinatarios = totalDestinatarios;
  campaign.totalRemovido = estimate.suppressed;
  campaign.totalIgnorado = estimate.invalid;
  await campaign.save();
  return { campaign, estimate, totalDestinatarios };
};

export const refreshCampaignCounters = async (campaignId) => {
  const rows = await PartnershipEmailSend.aggregate([
    { $match: { campaign: new mongoose.Types.ObjectId(campaignId) } },
    { $group: { _id: '$estado', total: { $sum: 1 } } },
  ]);
  const counts = Object.fromEntries(rows.map((row) => [row._id, row.total]));
  const update = {
    totalEnviado: (counts.enviado || 0) + (counts.entregue || 0) + (counts.aberto || 0) + (counts.clicado || 0),
    totalEntregue: (counts.entregue || 0) + (counts.aberto || 0) + (counts.clicado || 0),
    totalAberto: (counts.aberto || 0) + (counts.clicado || 0),
    totalClicado: counts.clicado || 0,
    totalErro: counts.falhou || 0,
    totalDevolvido: counts.devolvido || 0,
    totalRemovido: counts.removido || 0,
    totalIgnorado: counts.ignorado || 0,
  };

  const pending = counts.pendente || 0;
  const campaign = await PartnershipCampaign.findByIdAndUpdate(campaignId, update, { new: true });
  if (campaign && campaign.estado === 'em_processamento' && pending === 0) {
    campaign.estado = 'concluida';
    campaign.concluidoEm = new Date();
    await campaign.save();
  }
  return campaign;
};
