import mongoose from 'mongoose';

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
  
  imovel: {
    tipologia: { type: String, enum: ['T0','T1','T2','T3','T4','T5+'] },
    tipoImovel: { type: String, enum: ['apartamento','moradia','terreno','comercial','garagem'] },
    area: Number,
    quartos: Number,
    casasBanho: Number,
    garagem: Boolean,
    jardim: Boolean,
    piscina: Boolean,
    andar: Number,
    ano: Number,
    estado: { type: String, enum: ['novo','usado','para_remodelar'] },
    certificadoEnergetico: { type: String, enum: ['A+','A','B','B-','C','D','E','F', 'Isento'] }
  },
  
  carro: {
    marca: String,
    modelo: String,
    ano: Number,
    km: Number,
    combustivel: { type: String, enum: ['gasolina','diesel','eletrico','hibrido','gpl'] },
    transmissao: { type: String, enum: ['manual','automatico'] },
    cilindrada: Number,
    potencia: Number,
    cor: String,
    matricula: String,
    inspecaoAte: Date,
    relatorioCarfax: Boolean
  },
  
  localizacao: {
    morada: String,
    cidade: String,
    distrito: String,
    coordenadas: { lat: Number, lng: Number }
  },
  
  fotos: [String], 
  videoUrl: String,
  visitaVirtualUrl: String, 
  equipamento: [{ type: String }],

  scoreQualidade: { type: Number, min: 0, max: 10, default: 0 },
  scoreDetalhes: { fotos: Number, descricao: Number, preco: Number, localizacao: Number, extras: Number, disponibilidade: Number },
  scoreAnaliseIA: { pontosFuertes: [String], pontosMelhorar: [String], sentimento: String, qualidadeDescricao: String, recomendacao: String },
  
  estado: { type: String, enum: ['ativo','pausado','expirado','pendente','apagado'], default: 'pendente' },
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