import mongoose from 'mongoose';

const partnershipCampaignSchema = new mongoose.Schema({
  nomeInterno: { type: String, required: true, trim: true },
  assunto: { type: String, required: true, trim: true },
  preheader: { type: String, trim: true, default: '' },
  conteudoPrincipal: { type: String, required: true, trim: true },
  textoBotao: { type: String, trim: true, default: 'Quero aderir gratuitamente' },
  urlBotao: { type: String, trim: true, default: 'https://www.noxvelia.com' },
  remetente: { type: String, trim: true, default: '"Noxvelia Parcerias" <geral@noxvelia.com>' },
  replyTo: { type: String, trim: true, default: 'geral@noxvelia.com' },
  estado: {
    type: String,
    enum: ['rascunho', 'programada', 'em_processamento', 'pausada', 'concluida', 'cancelada'],
    default: 'rascunho',
    index: true,
  },
  filtrosDestinatarios: {
    tiposEmpresa: [{ type: String, enum: ['stand', 'imobiliaria', 'outro'] }],
    estados: [{ type: String }],
    origem: String,
    contactIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PartnershipContact' }],
  },
  trackingAberturas: { type: Boolean, default: true },
  trackingCliques: { type: Boolean, default: true },
  totalDestinatarios: { type: Number, default: 0 },
  totalEnviado: { type: Number, default: 0 },
  totalEntregue: { type: Number, default: 0 },
  totalAberto: { type: Number, default: 0 },
  totalClicado: { type: Number, default: 0 },
  totalErro: { type: Number, default: 0 },
  totalDevolvido: { type: Number, default: 0 },
  totalRemovido: { type: Number, default: 0 },
  totalIgnorado: { type: Number, default: 0 },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  iniciadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  iniciadoEm: Date,
  concluidoEm: Date,
  canceladoEm: Date,
  pausadoEm: Date,
  lastProcessedAt: Date,
}, { timestamps: true });

partnershipCampaignSchema.index({ createdAt: -1 });

export default mongoose.model('PartnershipCampaign', partnershipCampaignSchema);
