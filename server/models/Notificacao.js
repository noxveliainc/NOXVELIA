import mongoose from 'mongoose';

const notificacaoSchema = new mongoose.Schema({
  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: {
    type: String,
    enum: ['destaque_aprovado', 'destaque_rejeitado', 'anuncio_aprovado', 'sistema', 'destaque_expirado', 'alerta_pesquisa'],
    required: true
  },
  titulo: { type: String, required: true },
  mensagem: { type: String, required: true },
  link: { type: String },
  lida: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// Índice de alta performance para buscar notificações não lidas instantaneamente
notificacaoSchema.index({ utilizador: 1, lida: 1, createdAt: -1 });

export default mongoose.model('Notificacao', notificacaoSchema);
