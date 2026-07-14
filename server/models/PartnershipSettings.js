import mongoose from 'mongoose';

const partnershipSettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'default', index: true },
  limiteDiario: { type: Number, default: 40, min: 1, max: 1000 },
  tamanhoLote: { type: Number, default: 5, min: 1, max: 50 },
  intervaloLotesSegundos: { type: Number, default: 60, min: 10, max: 3600 },
  remetente: { type: String, trim: true, default: '"Noxvelia Parcerias" <geral@noxvelia.com>' },
  replyTo: { type: String, trim: true, default: 'geral@noxvelia.com' },
  logoUrl: { type: String, trim: true, default: '' },
  trackingAberturas: { type: Boolean, default: true },
  trackingCliques: { type: Boolean, default: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('PartnershipSettings', partnershipSettingsSchema);
