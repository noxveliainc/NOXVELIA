import mongoose from 'mongoose';

const stockImportLogSchema = new mongoose.Schema({
  integracao: { type: mongoose.Schema.Types.ObjectId, ref: 'StockIntegration', required: true, index: true },
  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  provider: { type: String, default: 'mystand', index: true },
  iniciadoEm: { type: Date, default: Date.now, index: true },
  terminadoEm: Date,
  estado: { type: String, enum: ['sucesso', 'parcial', 'erro'], required: true, index: true },
  resumo: {
    recebidos: { type: Number, default: 0 },
    criados: { type: Number, default: 0 },
    atualizados: { type: Number, default: 0 },
    pausados: { type: Number, default: 0 },
    falhados: { type: Number, default: 0 },
  },
  erros: [{
    externalId: String,
    titulo: String,
    motivo: String,
  }],
  acionadoPor: { type: String, enum: ['cron', 'admin'], default: 'cron' },
}, { timestamps: true });

stockImportLogSchema.index({ integracao: 1, iniciadoEm: -1 });

export default mongoose.model('StockImportLog', stockImportLogSchema);
