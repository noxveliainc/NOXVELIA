import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  nome:      { type: String, required: true, trim: true },
  slug:      { type: String, unique: true, index: true, sparse: true, trim: true }, // 🌟 NOVO: SLUG AMIGÁVEL PARA O PERFIL PÚBLICO
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
  
  // 🌟 CAPA E BIOGRAFIA DO PERFIL
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
  premiumAtivo:             { type: Boolean, default: false },
  dataExpiracaoPremium:     { type: Date,    default: null },
  proximoPagamentoPremium:  { type: Date,    default: null },
  limiteAnuncios:           { type: Number,  default: 5 },

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

// 🌟 MIDDLEWARE: Gera o slug automaticamente com base no nome do stand ou utilizador
userSchema.pre('save', async function(next) {
  // Se o nome (ou standNome) mudou, ou se o slug ainda não existe
  const baseName = this.standNome || this.nome;
  if (baseName && (this.isModified('nome') || this.isModified('standNome') || !this.slug)) {
    let baseSlug = baseName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9]/g, '-')     // Substitui símbolos por hífens
      .replace(/-+/g, '-')            // Evita hífens duplicados
      .replace(/^-|-$/g, '')          // Remove hífens do início ou fim
      .trim();

    if (!baseSlug) baseSlug = 'vendedor';

    // Garante unicidade adicionando um sufixo numérico se o slug já existir noutra conta
    let uniqueSlug = baseSlug;
    let contador = 1;
    
    while (true) {
      const existingUser = await mongoose.models.User.findOne({ slug: uniqueSlug, _id: { $ne: this._id } });
      if (!existingUser) break;
      uniqueSlug = `${baseSlug}-${contador}`;
      contador++;
    }

    this.slug = uniqueSlug;
  }
  next();
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