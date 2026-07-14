import mongoose from 'mongoose';

const partnershipContactSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  nomePessoa: { type: String, trim: true, default: '' },
  nomeEmpresa: { type: String, trim: true, default: '' },
  tipoEmpresa: { type: String, enum: ['stand', 'imobiliaria', 'outro'], default: 'outro', index: true },
  website: { type: String, trim: true, default: '' },
  telefone: { type: String, trim: true, default: '' },
  localidade: { type: String, trim: true, default: '' },
  notasInternas: { type: String, trim: true, default: '' },
  origem: { type: String, trim: true, default: 'manual', index: true },
  estado: {
    type: String,
    enum: ['novo', 'valido', 'invalido', 'contactado', 'respondeu', 'interessado', 'convertido', 'removido', 'bloqueado'],
    default: 'novo',
    index: true,
  },
  consentimentoBase: { type: String, trim: true, default: '' },
  ultimoContactoEm: Date,
  removidoEm: Date,
  motivoRemocao: { type: String, trim: true, default: '' },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  atualizadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

partnershipContactSchema.index({ nomePessoa: 'text', nomeEmpresa: 'text', email: 'text' });

export default mongoose.model('PartnershipContact', partnershipContactSchema);
