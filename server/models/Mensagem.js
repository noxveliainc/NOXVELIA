import mongoose from 'mongoose';

const mensagemSchema = new mongoose.Schema({
  anuncio: { type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio', required: true },
  remetente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinatario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conversa: { type: String, required: true }, // ID único (ex: remetente+destinatario+anuncio)
  texto: { type: String, required: true },
  lida: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Mensagem', mensagemSchema);