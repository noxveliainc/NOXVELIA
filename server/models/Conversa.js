import mongoose from 'mongoose';

const conversaSchema = new mongoose.Schema({
  // Quem está a falar (Geralmente o Comprador e o Vendedor)
  participantes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }],
  
  // O contexto: sobre que carro/imóvel estão a falar?
  anuncio: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Anuncio', 
    required: true 
  },
  
  // O resumo (útil para a lista da Inbox carregar rápido)
  ultimaMensagem: { 
    type: String, 
    default: '' 
  },
  
  // Usado para colocar as conversas mais recentes no topo da lista
  dataAtualizacao: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

// 🚀 O SEGREDO DA PERFORMANCE: 
// Isto diz à base de dados para otimizar as pesquisas por participantes e organizar por data.
conversaSchema.index({ participantes: 1, dataAtualizacao: -1 });

export default mongoose.model('Conversa', conversaSchema);