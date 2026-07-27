import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  nome:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: function requiredPassword() { return this.authProvider !== 'google'; }, select: false },
  telefone:  { type: String, required: true, unique: true, match: [/^\d{9}$/, 'O telemóvel deve ter exatamente 9 dígitos.'] },
  mostrarTelefonePublico: { type: Boolean, default: true },
  localidade: { type: String, trim: true },
  standNome: { type: String, trim: true, default: null, maxLength: 120 },
  standMorada: { type: String, trim: true, default: null, maxLength: 240 },
  standCodigoPostal: { type: String, trim: true, default: null, maxLength: 20 },
  mostrarMapaPerfil: { type: Boolean, default: false },
  tipo:       { type: String, default: 'cliente', enum: ['cliente', 'profissional', 'admin'] },
  tipoConta:  { type: String, enum: ['particular', 'profissional'], default: 'particular' },
  nif:        { type: String, trim: true, default: null },
  website:    { type: String, trim: true, default: null },
  avatarUrl:  { type: String, default: null },
  googleId:   { type: String, unique: true, sparse: true, trim: true, default: null },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  aceitouTermosEm: { type: Date, default: null },
  
  // 🌟 NOVO: CAPA E BIOGRAFIA DO PERFIL
  capaUrl:    { type: String, default: null },
  bio:        { type: String, trim: true, default: null, maxLength: 800 },
  linksPerfil: {
    type: [{
      tipo: {
        type: String,
        enum: ['website', 'instagram', 'facebook', 'linkedin', 'youtube', 'tiktok', 'whatsapp', 'outro'],
        default: 'website'
      },
      url: { type: String, trim: true }
    }],
    default: [],
    validate: {
      validator: (links) => !links || links.length <= 3,
      message: 'O perfil pode ter no maximo 3 links.'
    }
  },

  favoritos:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' }],
  anunciosGuardados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' }],

  // ── PREMIUM ────────────────────────────────────────────────
  premiumAtivo:         { type: Boolean, default: false },
  dataExpiracaoPremium: { type: Date,    default: null },
  limiteAnuncios:       { type: Number,  default: 10 },

  // ── STRIPE (subscrição mensal) ─────────────────────────────
  stripeCustomerId:     { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },

  // ── VERIFICAÇÃO DE EMAIL ────────────────────────────
  verificado:       { type: Boolean, default: false },
  tokenVerificacao: { type: String, select: false },
  expiracaoToken:   { type: Date, select: false },

  // ── RESET DE PASSWORD ──────────────────────────────────────
  passwordResetToken:   { type: String, select: false },
  passwordResetExpires: { type: Date,   select: false },

  // 🌟 SISTEMA DE CONFIANÇA / REPUTAÇÃO DO VENDEDOR
  rating:          { type: Number, default: 0 }, // Pontuação de 0 a 5 estrelas
  totalAvaliacoes: { type: Number, default: 0 }, // Quantas pessoas avaliaram este vendedor
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
