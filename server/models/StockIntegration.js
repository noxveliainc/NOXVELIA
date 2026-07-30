import mongoose from 'mongoose';

const stockIntegrationSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true, maxlength: 120 },
  provider: { type: String, enum: ['mystand', 'feed_generico'], default: 'mystand', index: true },
  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  feedUrl: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1500,
    validate: {
      validator(value) {
        try {
          const url = new URL(value);
          return ['http:', 'https:'].includes(url.protocol);
        } catch {
          return false;
        }
      },
      message: 'URL do feed inválido.',
    },
  },
  apiToken: { type: String, trim: true, maxlength: 1200, select: false },
  formato: { type: String, enum: ['auto', 'json', 'xml'], default: 'auto' },
  ativo: { type: Boolean, default: true, index: true },
  frequenciaHoras: { type: Number, min: 6, max: 24, default: 6 },
  defaultDistrito: { type: String, trim: true, maxlength: 80, default: '' },
  defaultCidade: { type: String, trim: true, maxlength: 100, default: '' },
  defaultTelefone: { type: String, trim: true, maxlength: 40, default: '' },
  defaultEmail: { type: String, trim: true, lowercase: true, maxlength: 180, default: '' },
  sincronizacao: {
    estado: { type: String, enum: ['nunca', 'em_execucao', 'sucesso', 'parcial', 'erro'], default: 'nunca' },
    ultimaExecucaoEm: Date,
    ultimaConclusaoEm: Date,
    ultimoErro: { type: String, trim: true, maxlength: 500, default: '' },
    ultimoResumo: {
      recebidos: { type: Number, default: 0 },
      criados: { type: Number, default: 0 },
      atualizados: { type: Number, default: 0 },
      pausados: { type: Number, default: 0 },
      falhados: { type: Number, default: 0 },
    },
  },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

stockIntegrationSchema.index({ provider: 1, utilizador: 1, nome: 1 });

export default mongoose.model('StockIntegration', stockIntegrationSchema);
