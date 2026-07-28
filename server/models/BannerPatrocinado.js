import mongoose from 'mongoose';

export const BANNER_POSICOES = [
  'listagem_topo_carros',
  'listagem_topo_imoveis',
  'feed_pesquisa',
  'feed_pesquisa_carros',
  'feed_pesquisa_imoveis',
  'listagem_fundo_carros',
  'listagem_fundo_imoveis',
  'detalhe_sidebar',
  'detalhe_sugestoes',
  'landing_between_highlights',
];

const bannerPatrocinadoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true, maxlength: 120 },
  imagemUrl: { type: String, required: true, trim: true, maxlength: 1200 },
  linkDestino: { type: String, required: true, trim: true, maxlength: 1200 },
  posicao: { type: String, required: true, enum: BANNER_POSICOES, index: true },
  vertical: { type: String, enum: ['todos', 'carro', 'imovel'], default: 'todos', index: true },
  estado: { type: String, enum: ['manual', 'pendente_pagamento', 'ativo', 'pausado', 'expirado'], default: 'manual', index: true },
  tipoCriativo: { type: String, enum: ['imagem', 'gif', 'externo'], default: 'imagem' },
  duracaoDias: { type: Number, enum: [7, 14, 30], default: null },
  valorCentimos: { type: Number, default: 0, min: 0 },
  cliques: { type: Number, default: 0, min: 0 },
  visualizacoes: { type: Number, default: 0, min: 0 },
  ativo: { type: Boolean, default: true, index: true },
  ativoAte: { type: Date, default: null, index: true },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  compradoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stripeSessionId: { type: String, trim: true, index: true },
  stripePaymentId: { type: String, trim: true },
  origem: { type: String, trim: true, default: 'admin' },
}, { timestamps: true });

bannerPatrocinadoSchema.index({ posicao: 1, vertical: 1, ativo: 1, ativoAte: 1, estado: 1 });
bannerPatrocinadoSchema.index({ updatedAt: -1 });

export default mongoose.model('BannerPatrocinado', bannerPatrocinadoSchema);
