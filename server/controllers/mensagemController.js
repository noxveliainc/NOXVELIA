import Conversa from '../models/Conversa.js';
import Mensagem from '../models/Mensagem.js';
import Notificacao from '../models/Notificacao.js';

// 1. ENVIAR UMA MENSAGEM (Ou iniciar chat se for a primeira)
export const enviarMensagem = async (req, res) => {
  try {
    const { anuncioId, destinatarioId, texto } = req.body;
    const remetenteId = req.user.id || req.user._id; // ID do gajo logado

    if (!texto || texto.trim() === '') {
      return res.status(400).json({ erro: 'O texto da mensagem não pode estar vazio.' });
    }

    if (String(remetenteId) === String(destinatarioId)) {
      return res.status(400).json({ erro: 'Soberano, não podes enviar uma mensagem para ti mesmo.' });
    }

    // Procura se já existe um envelope (Conversa) ativo para este anúncio entre estes dois gajos
    let conversa = await Conversa.findOne({
      anuncio: anuncioId,
      participantes: { $all: [remetenteId, destinatarioId] }
    });

    // Se não existir, cria o envelope do zero
    if (!conversa) {
      conversa = new Conversa({
        participantes: [remetenteId, destinatarioId],
        anuncio: anuncioId
      });
      await conversa.save();
    }

    // Cria a mensagem individual ligada a este envelope
    const novaMensagem = new Mensagem({
      conversa: conversa._id,
      remetente: remetenteId,
      texto: texto
    });
    await novaMensagem.save();

    // Atualiza o envelope com o resumo mais recente
    conversa.ultimaMensagem = texto;
    conversa.dataAtualizacao = Date.now();
    await conversa.save();

    // 🌟 INTEGRAÇÃO COM O TEU MODELO DE NOTIFICAÇÕES:
    // Dispara um alerta para o destinatário a dizer que tem uma nova mensagem
    const novaNotif = new Notificacao({
      utilizador: destinatarioId,
      tipo: 'mensagem',
      titulo: 'Nova Mensagem Recebida',
      mensagem: texto.length > 60 ? `${texto.substring(0, 60)}...` : texto,
      link: '/mensagens'
    });
    await novaNotif.save();

    // Nota: Mais à frente vamos injetar aqui o Socket.io para o "Tempo Real"
    res.status(201).json({ sucesso: true, mensagem: novaMensagem, conversaId: conversa._id });

  } catch (erro) {
    console.error('Erro no enviarMensagem:', erro);
    res.status(500).json({ erro: 'Falha no servidor ao processar o envio.' });
  }
};

// 2. LISTAR TODAS AS CONVERSAS DO UTILIZADOR (Inbox)
export const listarConversas = async (req, res) => {
  try {
    const utilizadorId = req.user.id || req.user._id;

    // Busca as conversas onde o gajo participa, trazendo os dados do outro participante e do anúncio
    const conversas = await Conversa.find({ participantes: utilizadorId })
      .populate('participantes', 'nome email avatarUrl')
      .populate('anuncio', 'titulo preco fotos tipo')
      .sort({ dataAtualizacao: -1 });

    res.json(conversas);
  } catch (erro) {
    console.error('Erro no listarConversas:', erro);
    res.status(500).json({ erro: 'Erro ao obter a lista de conversas.' });
  }
};

// 3. CARREGAR O HISTÓRICO DE UMA CONVERSA (Com paginação implícita)
export const carregarChat = async (req, res) => {
  try {
    const { conversaId } = req.params;
    const utilizadorId = req.user.id || req.user._id;

    // Garante que quem está a pedir o chat é um dos participantes legítimos
    const conversa = await Conversa.findById(conversaId);
    if (!conversa || !conversa.participantes.includes(utilizadorId)) {
      return res.status(403).json({ erro: 'Acesso negado a este canal de comunicação.' });
    }

    // Busca as mensagens deste envelope organizadas por data de criação
    const historico = await Mensagem.find({ conversa: conversaId })
      .sort({ createdAt: 1 });

    // 🌟 LIMPEZA DE NOTIFICAÇÕES NÃO LIDAS:
    // Marcar como lidas as mensagens que o OUTRO enviou nesta conversa
    await Mensagem.updateMany(
      { conversa: conversaId, remetente: { $ne: utilizadorId }, lida: false },
      { $set: { lida: true } }
    );

    res.json(historico);
  } catch (erro) {
    console.error('Erro no carregarChat:', erro);
    res.status(500).json({ erro: 'Erro ao carregar o histórico de mensagens.' });
  }
};