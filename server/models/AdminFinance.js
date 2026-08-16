import mongoose from 'mongoose';

const adminFinanceSchema = new mongoose.Schema({
  chave: { type: String, default: 'principal', unique: true, immutable: true },
  gastoSite: { type: Number, default: 0, min: 0 },
  entradaSite: { type: Number, default: 0, min: 0 },
  notas: { type: String, default: '', trim: true, maxlength: 1000 },
  atualizadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

export default mongoose.model('AdminFinance', adminFinanceSchema);