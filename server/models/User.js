import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  nome:      { type: String, required: true, trim: true },
  slug:      { type: String, unique: true, index: true, sparse: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: function requiredPassword() { return this.authProvider !== 'google'; }, select: false },
  
  telefone:  { 
    type: String, 
    default: null, 
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        const clean = v.replace(/\D/g, '');
        return clean.length >= 9 && clean.length <= 15; // 🌟 REGRA DOS FIXOS/MÓVEIS: 9 a 15 dígitos
      },
      message: 'Indique um número de telefone ou telemóvel válido.'
    }
  },
  
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
  
  capaUrl:    { type: String, default: null },
  bio:        { type: String, trim: true, default: null, maxLength: 800 },
  
  sobreNos: {
    descricaoLonga: { type: String, trim: true, default: null, maxLength: 3000 },
    horario: { type: String, trim: true, default: null, maxLength: 300 },
    equipa: [{
      nome: { type: String, trim: true },
      cargo: { type: String, trim: true },
      telefone: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      fotoUrl: { type: String, default: null }
    }]
  },

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

  premiumAtivo:             { type: Boolean, default: false },
  dataExpiracaoPremium:     { type: Date,    default: null },
  proximoPagamentoPremium:  { type: Date,    default: null },
  limiteAnuncios:           { type: Number,  default: 5 },

  stripeCustomerId:     { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },

  verificado:       { type: Boolean, default: false },
  tokenVerificacao: { type: String, select: false },
  expiracaoToken:   { type: Date, select: false },

  passwordResetToken:   { type: String, select: false },
  passwordResetExpires: { type: Date,   select: false },

  rating:          { type: Number, default: 0 },
  totalAvaliacoes: { type: Number, default: 0 },
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  const baseName = this.standNome || this.nome;
  if (baseName && (this.isModified('nome') || this.isModified('standNome') || !this.slug)) {
    let baseSlug = baseName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') 
      .replace(/[^a-z0-9]/g, '-')     
      .replace(/-+/g, '-')            
      .replace(/^-|-$/g, '')          
      .trim();

    if (!baseSlug) baseSlug = 'vendedor';

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