import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  nome:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, select: false },
  telefone:  { type: String, required: true, unique: true, match: [/^\d{9}$/, 'O telemóvel deve ter exatamente 9 dígitos.'] },
  localidade: { type: String, trim: true },
  tipo:       { type: String, default: 'cliente', enum: ['cliente', 'profissional', 'admin'] },
  tipoConta:  { type: String, enum: ['particular', 'profissional'], default: 'particular' },
  nif:        { type: String, trim: true, default: null },
  website:    { type: String, trim: true, default: null },
  avatarUrl:  { type: String, default: null },
  favoritos:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' }],
  anunciosGuardados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' }],

  // ── PREMIUM ────────────────────────────────────────────────
  premiumAtivo:         { type: Boolean, default: false },
  dataExpiracaoPremium: { type: Date,    default: null },
  limiteAnuncios:       { type: Number,  default: 10 },

  // ── STRIPE (subscrição mensal) ─────────────────────────────
  // Necessário para: Customer Portal, cancelamento, renovação, reembolso
  stripeCustomerId:     { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },

  // ── RESET DE PASSWORD ──────────────────────────────────────
  passwordResetToken:   { type: String, select: false },
  passwordResetExpires: { type: Date,   select: false },
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1
    });
    next();
  } catch (error) { next(error); }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try { return await argon2.verify(this.password, candidatePassword); }
  catch (error) { console.error('Erro na verificação:', error); return false; }
};

const User = mongoose.model('User', userSchema);
export { User };
export default User;