import express from 'express';
import rateLimit from 'express-rate-limit';
import PartnershipAuditLog from '../models/PartnershipAuditLog.js';
import PartnershipCampaign from '../models/PartnershipCampaign.js';
import PartnershipContact from '../models/PartnershipContact.js';
import PartnershipEmailSend from '../models/PartnershipEmailSend.js';
import PartnershipReply from '../models/PartnershipReply.js';
import PartnershipSettings from '../models/PartnershipSettings.js';
import PartnershipSuppression from '../models/PartnershipSuppression.js';
import { auditPartnershipAction } from '../services/partnershipAudit.js';
import { estimateRecipients, prepareCampaignSends, refreshCampaignCounters } from '../services/partnershipCampaignService.js';
import { getPartnershipEnv, getPartnershipSettings } from '../services/partnershipConfig.js';
import { parsePartnershipCsv } from '../services/partnershipCsv.js';
import { renderCommercialEmailForSend, sendCommercialEmail } from '../services/partnershipMailer.js';
import { defaultCampaignPayload } from '../services/partnershipTemplate.js';
import {
  buildCsv,
  cleanMultiline,
  cleanText,
  ensureHttpsUrl,
  isValidEmail,
  normalizeContactState,
  normalizeContactType,
  normalizeEmail,
  parsePositiveInt,
  safeFromAddress,
  safeReplyTo,
} from '../services/partnershipEmailUtils.js';

const router = express.Router();

const adminPartnershipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(adminPartnershipLimiter);

const asyncRoute = (handler) => async (req, res, next) => {
  try { await handler(req, res, next); } catch (error) { next(error); }
};

const serializePage = (page, limit, total) => ({
  page,
  limit,
  total,
  pages: Math.max(1, Math.ceil(total / limit)),
});

const contactPayload = (body = {}, userId = null) => {
  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) throw Object.assign(new Error('Email invalido.'), { status: 400 });
  const website = ensureHttpsUrl(body.website);
  if (body.website && !website) throw Object.assign(new Error('Website invalido.'), { status: 400 });
  return {
    email,
    nomePessoa: cleanText(body.nomePessoa || body.nome, 120),
    nomeEmpresa: cleanText(body.nomeEmpresa || body.empresa, 180),
    tipoEmpresa: normalizeContactType(body.tipoEmpresa || body.tipo),
    website: website || '',
    telefone: cleanText(body.telefone, 60),
    localidade: cleanText(body.localidade, 120),
    notasInternas: cleanMultiline(body.notasInternas || body.notas, 2000),
    origem: cleanText(body.origem || 'manual', 120),
    estado: normalizeContactState(body.estado),
    consentimentoBase: cleanText(body.consentimentoBase, 500),
    atualizadoPor: userId,
  };
};

const campaignPayload = (body = {}, settings = {}) => {
  const env = getPartnershipEnv();
  const urlBotao = ensureHttpsUrl(body.urlBotao || 'https://www.noxvelia.com', { allowEmpty: false });
  if (!urlBotao) throw Object.assign(new Error('URL do botao invalido.'), { status: 400 });
  const assunto = cleanText(body.assunto, 180);
  const nomeInterno = cleanText(body.nomeInterno, 160);
  const conteudoPrincipal = cleanMultiline(body.conteudoPrincipal, 12000);
  if (!assunto || !nomeInterno || !conteudoPrincipal) {
    throw Object.assign(new Error('Nome interno, assunto e conteudo sao obrigatorios.'), { status: 400 });
  }
  const filtros = body.filtrosDestinatarios || {};
  return {
    nomeInterno,
    assunto,
    preheader: cleanText(body.preheader, 220),
    conteudoPrincipal,
    textoBotao: cleanText(body.textoBotao || 'Quero aderir gratuitamente', 90),
    urlBotao,
    remetente: safeFromAddress(body.remetente || settings.remetente, env.defaultFrom),
    replyTo: safeReplyTo(body.replyTo || settings.replyTo, env.defaultReplyTo),
    trackingAberturas: body.trackingAberturas !== undefined ? Boolean(body.trackingAberturas) : Boolean(settings.trackingAberturas),
    trackingCliques: body.trackingCliques !== undefined ? Boolean(body.trackingCliques) : Boolean(settings.trackingCliques),
    filtrosDestinatarios: {
      tiposEmpresa: Array.isArray(filtros.tiposEmpresa) ? filtros.tiposEmpresa.map(normalizeContactType) : [],
      estados: Array.isArray(filtros.estados) ? filtros.estados.map(normalizeContactState) : ['novo', 'valido'],
      origem: cleanText(filtros.origem, 120),
      contactIds: Array.isArray(filtros.contactIds) ? filtros.contactIds : [],
    },
  };
};

router.get('/summary', asyncRoute(async (_req, res) => {
  const [
    totalContacts,
    totalSuppressed,
    totalCampaigns,
    activeCampaigns,
    recentReplies,
    recentSends,
  ] = await Promise.all([
    PartnershipContact.countDocuments(),
    PartnershipSuppression.countDocuments(),
    PartnershipCampaign.countDocuments(),
    PartnershipCampaign.countDocuments({ estado: 'em_processamento' }),
    PartnershipReply.countDocuments({ createdAt: { $gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) } }),
    PartnershipEmailSend.countDocuments({ enviadoEm: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
  ]);
  res.json({ totalContacts, totalSuppressed, totalCampaigns, activeCampaigns, recentReplies, recentSends });
}));

router.get('/settings', asyncRoute(async (_req, res) => {
  res.json(await getPartnershipSettings());
}));

router.put('/settings', asyncRoute(async (req, res) => {
  const env = getPartnershipEnv();
  const logoUrl = ensureHttpsUrl(req.body.logoUrl || env.logoUrl);
  const update = {
    limiteDiario: parsePositiveInt(req.body.limiteDiario, 40, { min: 1, max: 1000 }),
    tamanhoLote: parsePositiveInt(req.body.tamanhoLote, 5, { min: 1, max: 50 }),
    intervaloLotesSegundos: parsePositiveInt(req.body.intervaloLotesSegundos, 60, { min: 10, max: 3600 }),
    remetente: safeFromAddress(req.body.remetente, env.defaultFrom),
    replyTo: safeReplyTo(req.body.replyTo, env.defaultReplyTo),
    logoUrl: logoUrl || env.logoUrl,
    trackingAberturas: Boolean(req.body.trackingAberturas),
    trackingCliques: Boolean(req.body.trackingCliques),
    updatedBy: req.user.id,
  };
  const settings = await PartnershipSettings.findOneAndUpdate({ key: 'default' }, update, { upsert: true, new: true });
  await auditPartnershipAction(req, 'settings.update', { entity: 'settings', entityId: 'default', details: update });
  res.json(settings);
}));

router.get('/contacts', asyncRoute(async (req, res) => {
  const page = parsePositiveInt(req.query.page, 1, { min: 1, max: 100000 });
  const limit = parsePositiveInt(req.query.limit, 25, { min: 1, max: 100 });
  const query = {};
  const search = cleanText(req.query.q, 120);
  if (search) {
    query.$or = [
      { email: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
      { nomePessoa: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
      { nomeEmpresa: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
    ];
  }
  if (req.query.tipo) query.tipoEmpresa = normalizeContactType(req.query.tipo);
  if (req.query.estado) query.estado = normalizeContactState(req.query.estado);
  if (req.query.origem) query.origem = cleanText(req.query.origem, 120);
  if (req.query.from || req.query.to) {
    query.createdAt = {};
    if (req.query.from) query.createdAt.$gte = new Date(String(req.query.from));
    if (req.query.to) query.createdAt.$lte = new Date(String(req.query.to));
  }
  const [items, total] = await Promise.all([
    PartnershipContact.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    PartnershipContact.countDocuments(query),
  ]);
  res.json({ items, pagination: serializePage(page, limit, total) });
}));

router.post('/contacts', asyncRoute(async (req, res) => {
  const payload = { ...contactPayload(req.body, req.user.id), criadoPor: req.user.id };
  const suppression = await PartnershipSuppression.findOne({ email: payload.email }).lean();
  if (suppression) payload.estado = 'removido';
  const contact = await PartnershipContact.create(payload);
  await auditPartnershipAction(req, 'contact.create', { entity: 'contact', entityId: contact._id, details: { email: contact.email } });
  res.status(201).json(contact);
}));

router.put('/contacts/:id', asyncRoute(async (req, res) => {
  const payload = contactPayload(req.body, req.user.id);
  const contact = await PartnershipContact.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!contact) return res.status(404).json({ erro: 'Contacto nao encontrado.' });
  await auditPartnershipAction(req, 'contact.update', { entity: 'contact', entityId: contact._id, details: { email: contact.email } });
  res.json(contact);
}));

router.delete('/contacts/:id', asyncRoute(async (req, res) => {
  const motivo = cleanText(req.body?.motivo || 'removido pelo administrador', 300);
  const contact = await PartnershipContact.findByIdAndUpdate(req.params.id, { estado: 'removido', removidoEm: new Date(), motivoRemocao: motivo }, { new: true });
  if (!contact) return res.status(404).json({ erro: 'Contacto nao encontrado.' });
  await auditPartnershipAction(req, 'contact.remove', { entity: 'contact', entityId: contact._id, details: { motivo } });
  res.json({ sucesso: true, contact });
}));

router.get('/contacts/export', asyncRoute(async (req, res) => {
  const contacts = await PartnershipContact.find().sort({ createdAt: -1 }).lean();
  const rows = [
    ['email', 'nome', 'empresa', 'tipo', 'website', 'telefone', 'localidade', 'estado', 'origem', 'ultimoContactoEm'],
    ...contacts.map((c) => [c.email, c.nomePessoa, c.nomeEmpresa, c.tipoEmpresa, c.website, c.telefone, c.localidade, c.estado, c.origem, c.ultimoContactoEm?.toISOString?.() || '']),
  ];
  await auditPartnershipAction(req, 'contact.export', { entity: 'contact', details: { total: contacts.length } });
  res.setHeader('Content-Disposition', 'attachment; filename="noxvelia-contactos-parcerias.csv"');
  res.type('text/csv').send(buildCsv(rows));
}));

router.post('/contacts/import/preview', asyncRoute(async (req, res) => {
  const firstPass = parsePartnershipCsv(req.body.csv || '');
  const emails = [...firstPass.validRows, ...firstPass.invalidRows].map((row) => row.contacto.email).filter(Boolean);
  const [existing, suppressed] = await Promise.all([
    PartnershipContact.find({ email: { $in: emails } }).select('email').lean(),
    PartnershipSuppression.find({ email: { $in: emails } }).select('email').lean(),
  ]);
  const result = parsePartnershipCsv(
    req.body.csv || '',
    new Set(existing.map((item) => item.email)),
    new Set(suppressed.map((item) => item.email))
  );
  res.json(result);
}));

router.post('/contacts/import/confirm', asyncRoute(async (req, res) => {
  const firstPass = parsePartnershipCsv(req.body.csv || '');
  const emails = [...firstPass.validRows, ...firstPass.invalidRows].map((row) => row.contacto.email).filter(Boolean);
  const [existing, suppressed] = await Promise.all([
    PartnershipContact.find({ email: { $in: emails } }).select('email').lean(),
    PartnershipSuppression.find({ email: { $in: emails } }).select('email').lean(),
  ]);
  const result = parsePartnershipCsv(
    req.body.csv || '',
    new Set(existing.map((item) => item.email)),
    new Set(suppressed.map((item) => item.email))
  );
  const docs = result.validRows.map((row) => ({ ...row.contacto, criadoPor: req.user.id, atualizadoPor: req.user.id }));
  let inserted = 0;
  if (docs.length) {
    try {
      const insertedDocs = await PartnershipContact.insertMany(docs, { ordered: false });
      inserted = insertedDocs.length;
    } catch (error) {
      if (error?.code !== 11000 && error?.writeErrors?.some((item) => item.code !== 11000)) throw error;
      inserted = error.insertedDocs?.length || Math.max(0, docs.length - (error.writeErrors?.length || 0));
    }
  }
  await auditPartnershipAction(req, 'contact.import', { entity: 'contact', details: { inserted, invalid: result.invalidRows.length } });
  res.status(201).json({ inserted, preview: result });
}));

router.post('/contacts/suppress', asyncRoute(async (req, res) => {
  const emails = (req.body.emails || []).map(normalizeEmail).filter(isValidEmail);
  const motivo = cleanText(req.body.motivo || 'admin', 300);
  if (!emails.length) return res.status(400).json({ erro: 'Seleciona pelo menos um email valido.' });
  await PartnershipSuppression.bulkWrite(emails.map((email) => ({
    updateOne: {
      filter: { email },
      update: { $setOnInsert: { email, motivo, origem: 'admin', createdBy: req.user.id } },
      upsert: true,
    },
  })));
  await PartnershipContact.updateMany({ email: { $in: emails } }, { estado: 'bloqueado', removidoEm: new Date(), motivoRemocao: motivo });
  await auditPartnershipAction(req, 'contact.suppress', { entity: 'suppression', details: { count: emails.length, motivo } });
  res.json({ sucesso: true, count: emails.length });
}));

router.get('/campaigns/default', asyncRoute(async (_req, res) => {
  const settings = await getPartnershipSettings();
  res.json(defaultCampaignPayload(settings));
}));

router.get('/campaigns', asyncRoute(async (req, res) => {
  const campaigns = await PartnershipCampaign.find().sort({ createdAt: -1 }).limit(100).lean();
  res.json(campaigns);
}));

router.post('/campaigns', asyncRoute(async (req, res) => {
  const settings = await getPartnershipSettings();
  const payload = campaignPayload(req.body, settings);
  const campaign = await PartnershipCampaign.create({ ...payload, criadoPor: req.user.id });
  await auditPartnershipAction(req, 'campaign.create', { entity: 'campaign', entityId: campaign._id });
  res.status(201).json(campaign);
}));

router.get('/campaigns/:id', asyncRoute(async (req, res) => {
  const campaign = await PartnershipCampaign.findById(req.params.id).lean();
  if (!campaign) return res.status(404).json({ erro: 'Campanha nao encontrada.' });
  const sends = await PartnershipEmailSend.find({ campaign: campaign._id }).sort({ createdAt: -1 }).limit(200).populate('contact', 'nomePessoa nomeEmpresa tipoEmpresa').lean();
  res.json({ campaign, sends });
}));

router.put('/campaigns/:id', asyncRoute(async (req, res) => {
  const current = await PartnershipCampaign.findById(req.params.id);
  if (!current) return res.status(404).json({ erro: 'Campanha nao encontrada.' });
  if (!['rascunho', 'programada', 'pausada'].includes(current.estado)) return res.status(400).json({ erro: 'Campanha ja iniciada nao pode ser editada.' });
  const settings = await getPartnershipSettings();
  Object.assign(current, campaignPayload(req.body, settings));
  await current.save();
  await auditPartnershipAction(req, 'campaign.update', { entity: 'campaign', entityId: current._id });
  res.json(current);
}));

router.post('/campaigns/estimate', asyncRoute(async (req, res) => {
  res.json(await estimateRecipients(req.body.filtrosDestinatarios || req.body || {}));
}));

router.post('/campaigns/preview', asyncRoute(async (req, res) => {
  const settings = await getPartnershipSettings();
  const payload = campaignPayload(req.body, settings);
  const contact = {
    _id: 'preview',
    email: 'preview@noxvelia.com',
    nomePessoa: req.body.previewContact?.nomePessoa || 'Maria',
    nomeEmpresa: req.body.previewContact?.nomeEmpresa || 'Empresa Exemplo',
    website: req.body.previewContact?.website || 'https://www.exemplo.pt',
    tipoEmpresa: normalizeContactType(req.body.previewContact?.tipoEmpresa || 'imobiliaria'),
  };
  const rendered = await renderCommercialEmailForSend({ campaign: payload, contact, send: { _id: 'preview', idempotencyKey: 'preview' } });
  res.json(rendered);
}));

router.post('/campaigns/:id/test', asyncRoute(async (req, res) => {
  const to = normalizeEmail(req.body.email);
  if (!isValidEmail(to)) return res.status(400).json({ erro: 'Email de teste invalido.' });
  const campaign = await PartnershipCampaign.findById(req.params.id).lean();
  if (!campaign) return res.status(404).json({ erro: 'Campanha nao encontrada.' });
  const contact = {
    _id: 'test',
    email: to,
    nomePessoa: cleanText(req.body.nomePessoa || 'Admin', 120),
    nomeEmpresa: cleanText(req.body.nomeEmpresa || 'Noxvelia', 160),
    website: 'https://www.noxvelia.com',
    tipoEmpresa: normalizeContactType(req.body.tipoEmpresa || 'outro'),
  };
  const result = await sendCommercialEmail({ campaign, contact, send: { _id: `test_${Date.now()}`, idempotencyKey: `test:${campaign._id}:${Date.now()}` }, overrideTo: to });
  await auditPartnershipAction(req, 'campaign.test', { entity: 'campaign', entityId: campaign._id, details: { to } });
  res.json({ sucesso: true, result });
}));

router.post('/campaigns/:id/start', asyncRoute(async (req, res) => {
  if (req.body.confirmacao !== 'ENVIAR') return res.status(400).json({ erro: 'Escreve ENVIAR para confirmar.' });
  const result = await prepareCampaignSends(req.params.id, req.user.id);
  await auditPartnershipAction(req, 'campaign.start', { entity: 'campaign', entityId: req.params.id, details: { totalDestinatarios: result.totalDestinatarios } });
  res.json({ sucesso: true, ...result });
}));

router.post('/campaigns/:id/pause', asyncRoute(async (req, res) => {
  const campaign = await PartnershipCampaign.findByIdAndUpdate(req.params.id, { estado: 'pausada', pausadoEm: new Date() }, { new: true });
  if (!campaign) return res.status(404).json({ erro: 'Campanha nao encontrada.' });
  await auditPartnershipAction(req, 'campaign.pause', { entity: 'campaign', entityId: campaign._id });
  res.json(campaign);
}));

router.post('/campaigns/:id/cancel', asyncRoute(async (req, res) => {
  const campaign = await PartnershipCampaign.findByIdAndUpdate(req.params.id, { estado: 'cancelada', canceladoEm: new Date() }, { new: true });
  if (!campaign) return res.status(404).json({ erro: 'Campanha nao encontrada.' });
  await PartnershipEmailSend.updateMany({ campaign: campaign._id, estado: 'pendente' }, { estado: 'ignorado', erro: 'Campanha cancelada.' });
  await refreshCampaignCounters(campaign._id);
  await auditPartnershipAction(req, 'campaign.cancel', { entity: 'campaign', entityId: campaign._id });
  res.json(campaign);
}));

router.get('/sends', asyncRoute(async (req, res) => {
  const query = {};
  if (req.query.campaign) query.campaign = req.query.campaign;
  if (req.query.estado) query.estado = req.query.estado;
  if (req.query.q) query.recipientEmail = new RegExp(cleanText(req.query.q, 120).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const sends = await PartnershipEmailSend.find(query).sort({ createdAt: -1 }).limit(300).populate('campaign', 'nomeInterno').populate('contact', 'nomePessoa nomeEmpresa tipoEmpresa').lean();
  res.json(sends);
}));

router.get('/suppressions', asyncRoute(async (_req, res) => {
  res.json(await PartnershipSuppression.find().sort({ createdAt: -1 }).limit(300).lean());
}));

router.get('/replies', asyncRoute(async (_req, res) => {
  res.json(await PartnershipReply.find().sort({ receivedAt: -1 }).limit(200).populate('contact', 'nomePessoa nomeEmpresa').lean());
}));

router.get('/audit', asyncRoute(async (_req, res) => {
  res.json(await PartnershipAuditLog.find().sort({ createdAt: -1 }).limit(200).populate('admin', 'nome email').lean());
}));

export default router;
