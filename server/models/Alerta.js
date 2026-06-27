import mongoose from 'mongoose';

const alertaSchema = new mongoose.Schema({
  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { type: String, enum: ['imovel', 'carro'], required: true },
  filtros: {
    precoMin: Number,
    precoMax: Number,
    cidade: String,
    distrito: String,
    tipologia: String,
    marca: String,
    kmMax: Number
  },
  ativo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Alerta', alertaSchema);