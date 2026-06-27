import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema({
  utilizador:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  anuncio:         { type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' }, // null para subscrições
  stripePaymentId: { type: String, required: true, unique: true },           // unique = idempotência a nível de BD
  valor:           { type: Number, required: true },
  moeda:           { type: String, default: 'eur' },

  // 'premium' é agora um tipo válido (subscrição mensal)
  tipo:   { type: String, enum: ['publicacao', 'destaque', 'bump', 'estatisticas', 'premium'], required: true },
  estado: { type: String, enum: ['pago', 'pendente', 'falhou', 'reembolsado'], required: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Pagamento', pagamentoSchema);