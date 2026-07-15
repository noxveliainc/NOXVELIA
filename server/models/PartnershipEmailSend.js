import mongoose from 'mongoose';

const partnershipEmailSendSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnershipCampaign', required: true, index: true },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnershipContact', required: true, index: true },
  resendEmailId: { type: String, trim: true, index: true },
  recipientEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
  assuntoFinal: { type: String, trim: true, default: '' },
  estado: {
    type: String,
    enum: ['pendente', 'enviado', 'entregue', 'aberto', 'clicado', 'devolvido', 'reclamado', 'falhou', 'removido', 'ignorado'],
    default: 'pendente',
    index: true,
  },
  tentativas: { type: Number, default: 0 },
  erro: { type: String, trim: true, default: '' },
  nextAttemptAt: { type: Date, index: true },
  idempotencyKey: { type: String, trim: true, index: true, unique: true, sparse: true },
  enviadoEm: Date,
  entregueEm: Date,
  abertoEm: Date,
  clicadoEm: Date,
  devolvidoEm: Date,
  removidoEm: Date,
}, { timestamps: true });

partnershipEmailSendSchema.index({ campaign: 1, contact: 1 }, { unique: true });
partnershipEmailSendSchema.index({ campaign: 1, recipientEmail: 1 }, { unique: true });
partnershipEmailSendSchema.index({ campaign: 1, estado: 1, nextAttemptAt: 1 });

export default mongoose.model('PartnershipEmailSend', partnershipEmailSendSchema);
