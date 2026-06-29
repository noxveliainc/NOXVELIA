import mongoose from 'mongoose';

// ─────────────────────────────────────────────────────────────
// MODELO: Avaliacao
// Representa a nota (1-5) que um utilizador dá a um vendedor.
// A média e o total ficam gravados em User.rating / User.totalAvaliacoes
// (recalculados sempre a partir desta coleção — ver routes/users.js)
// ─────────────────────────────────────────────────────────────
const avaliacaoSchema = new mongoose.Schema({
  avaliador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  anunciante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Opcional: a propósito de qual anúncio esta avaliação foi feita.
  // Útil para mostrar contexto ("avaliado depois de comprar o BMW X3")
  anuncio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anuncio',
    default: null,
  },
  nota: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comentario: {
    type: String,
    trim: true,
    maxlength: 500,
    default: '',
  },
}, {
  timestamps: true,
});

// Um avaliador só pode ter UMA avaliação ativa por anunciante.
// Isto impede spam/inflação artificial — se quiser mudar de opinião,
// o endpoint atualiza a avaliação existente em vez de criar outra.
avaliacaoSchema.index({ avaliador: 1, anunciante: 1 }, { unique: true });

// Acelera "GET /users/:id/avaliacoes" (lista pública, mais recentes primeiro)
avaliacaoSchema.index({ anunciante: 1, createdAt: -1 });

export default mongoose.model('Avaliacao', avaliacaoSchema);