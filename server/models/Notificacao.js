import mongoose from 'mongoose';

const notificacaoSchema = new mongoose.Schema({
  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { 
  type: String, 
  enum: ['mensagem', 'destaque_aprovado', 'destaque_rejeitado', 'anuncio_aprovado', 'sistema', 'destaque_expirado'], 
  required: true 
},
  titulo: { type: String, required: true },
  mensagem: { type: String, required: true },
  link: { type: String }, // Rota do frontend para onde o gajo vai ao clicar (ex: /mensagens)
  lida: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// Índice de alta performance para buscar notificações não lidas instantaneamente
notificacaoSchema.index({ utilizador: 1, lida: 1, createdAt: -1 });

export default mongoose.model('Notificacao', notificacaoSchema);