import mongoose from 'mongoose';

const { Schema } = mongoose;

const StockSubmissionSchema = new Schema({
  empresa: { type: String, required: true, trim: true, maxlength: 140 },
  nome: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  telefone: { type: String, trim: true, maxlength: 40 },
  website: { type: String, trim: true, maxlength: 300 },
  mensagem: { type: String, trim: true, maxlength: 1200 },
  formato: {
    type: String,
    enum: ['csv', 'xlsx', 'xls', 'json', 'xml', 'outro'],
    default: 'csv',
  },
  estado: {
    type: String,
    enum: ['novo', 'em_analise', 'importado', 'rejeitado'],
    default: 'novo',
    index: true,
  },
  ficheiro: {
    nomeOriginal: { type: String, required: true, trim: true, maxlength: 220 },
    mimeType: { type: String, trim: true, maxlength: 120 },
    tamanho: { type: Number, default: 0 },
    conteudo: { type: Buffer, required: true, select: false },
  },
  origem: {
    ip: { type: String, trim: true, maxlength: 80 },
    userAgent: { type: String, trim: true, maxlength: 300 },
  },
  notasAdmin: { type: String, trim: true, maxlength: 1200 },
  revistoPor: { type: Schema.Types.ObjectId, ref: 'User' },
  revistoEm: Date,
}, { timestamps: true });

StockSubmissionSchema.index({ estado: 1, createdAt: -1 });
StockSubmissionSchema.index({ email: 1, createdAt: -1 });

export default mongoose.model('StockSubmission', StockSubmissionSchema);
