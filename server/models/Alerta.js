import mongoose from 'mongoose';

const alertaSchema = new mongoose.Schema({
  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { type: String, enum: ['imovel', 'carro'], required: true },
  nome: { type: String, trim: true, maxlength: 140 },
  filtros: {
    precoMin: Number,
    precoMax: Number,
    q: String,
    cidade: String,
    distrito: String,
    tipologia: String,
    tipologias: [String],
    tipoImovel: String,
    tiposImovel: [String],
    marca: String,
    modelo: String,
    combustiveis: [String],
    transmissao: [String],
    kmMax: Number
  },
  ativo: { type: Boolean, default: true },
  ultimoMatchEm: Date,
  totalMatches: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

alertaSchema.index({ utilizador: 1, ativo: 1, createdAt: -1 });
alertaSchema.index({ tipo: 1, ativo: 1 });

export default mongoose.model('Alerta', alertaSchema);
