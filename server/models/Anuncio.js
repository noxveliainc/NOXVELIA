import mongoose from 'mongoose';

const videoUrlSuportado = (value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const youtubeHosts = new Set(['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com']);
    const idValido = (id) => /^[a-zA-Z0-9_-]{6,32}$/.test(id || '');
    if (youtubeHosts.has(host)) {
      let id = '';
      if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
      else if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      else {
        const parts = url.pathname.split('/').filter(Boolean);
        if (['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1] || '';
      }
      return idValido(id);
    }
    return host === 'my.matterport.com'
      && url.pathname.startsWith('/show')
      && idValido(url.searchParams.get('m'));
  } catch {
    return false;
  }
};

const anuncioSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['imovel', 'carro'], required: true },
  titulo: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  
  telefone: String,
  email: String,

  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // 🌟 Estatísticas Reais
  visitas: { type: Number, default: 0 },
  guardados: { type: Number, default: 0 },
  contactos: { type: Number, default: 0 },

  historicoVisitas: [{
    data: { type: String },
    quantidade: { type: Number, default: 0 }
  }],
  
  // 🌟 Campos de Confiança (Badges)
  garantia: { type: String, default: null }, 
  aceitaRetoma: { type: Boolean, default: false }, 
  
  imovel: {
    tipologia: { type: String, enum: ['-','T0','T1','T2','T3','T4','T5+'] },
    tipoImovel: { type: String, enum: ['apartamento','moradia','terreno','loja','escritorio','comercial','garagem'] },
    area: Number,
    areaTerreno: Number,
    quartos: Number,
    casasBanho: Number,
    garagem: Boolean,
    jardim: Boolean,
    piscina: Boolean,
    varanda: Boolean,
    elevador: Boolean,
    arrecadacao: Boolean,
    mobilado: Boolean,
    condominio: Boolean,
    andar: Number,
    ano: Number,
    anoConstrucao: Number,
    estado: { type: String, enum: ['novo','usado','para_remodelar'] },
    estadoConservacao: { type: String, enum: ['Novo','Usado','Renovado','Em construção','Ruína','Para remodelar'] },
    certificadoEnergetico: { type: String, enum: ['A+','A','B','B-','C','D','E','F', 'Isento'] }
  },
  
  carro: {
    marca: { type: String, trim: true, maxlength: 60 },
    modelo: { type: String, trim: true, maxlength: 80 },
    versao: { type: String, trim: true, maxlength: 100 },
    ano: { type: Number, min: 1930, max: new Date().getFullYear() + 1 },
    mesRegisto: { type: Number, min: 1, max: 12 },
    vin: { type: String, trim: true, uppercase: true, match: /^[A-HJ-NPR-Z0-9]{17}$/ },
    km: { type: Number, min: 0, max: 2000000 },
    combustivel: { type: String, enum: ['gasolina','diesel','eletrico','hibrido','gpl'] },
    transmissao: { type: String, enum: ['manual','automatico'] },
    cilindrada: { type: Number, min: 1, max: 10000 },
    potencia: { type: Number, min: 1, max: 2000 },
    cor: { type: String, trim: true, maxlength: 40 },
    portas: { type: Number, min: 2, max: 6 },
    lugares: { type: Number, min: 1, max: 9 },
    tracao: { type: String, enum: ['dianteira','traseira','integral'] },
    seccao: { type: String, enum: ['novo','usado','seminovo','classico'] },
    tipoVeiculo: { type: String, enum: ['citadino','utilitario','sedan','carrinha','suv','crossover','coupe','cabrio','monovolume','pickup','comercial','van','outro'] },
    matricula: { type: String, trim: true, maxlength: 16 },
    inspecaoAte: Date,
    relatorioCarfax: Boolean
  },
  
  localizacao: {
    morada: String,
    cidade: String,
    distrito: String,
    coordenadas: { lat: Number, lng: Number }
  },
  
  fotos: [mongoose.Schema.Types.Mixed], 
  videoUrl: {
    type: String,
    trim: true,
    maxlength: 500,
    default: '',
    validate: {
      validator: videoUrlSuportado,
      message: 'O vídeo deve ser um link válido do YouTube ou Matterport.'
    }
  },
  visitaVirtualUrl: String, 
  equipamento: [{ type: String }],

  scoreQualidade: { type: Number, min: 0, max: 10, default: 0 },
  scoreDetalhes: { fotos: Number, descricao: Number, preco: Number, localizacao: Number, extras: Number, disponibilidade: Number },
  scoreAnaliseAssistida: { pontosFuertes: [String], pontosMelhorar: [String], sentimento: String, qualidadeDescricao: String, recomendacao: String },
  
  estado: { type: String, enum: ['ativo','pausado','expirado','pendente','apagado'], default: 'ativo' },
  apagadoEm: Date, 
  
  // 🌟 Motor de Destaques
  destacado: { type: Boolean, default: false },
  dataExpiracaoDestaque: { type: Date },
  
  planoPublicacao: { type: String, enum: ['basico','padrao','premium'] },
  expiresAt: Date
}, { 
  timestamps: true 
});

anuncioSchema.index({ tipo: 1, estado: 1, createdAt: -1 });
anuncioSchema.index({ 'localizacao.distrito': 1, preco: 1 });
anuncioSchema.index({ 'localizacao.cidade': 1 });
anuncioSchema.index({ utilizador: 1 });
anuncioSchema.index({ titulo: 'text', descricao: 'text' }, { weights: { titulo: 10, descricao: 5 }, name: 'BuscaTextoOmnibarIndex' });
anuncioSchema.index({ destacado: -1, createdAt: -1 });

anuncioSchema.set('autoIndex', true);

export default mongoose.model('Anuncio', anuncioSchema);
