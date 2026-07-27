import { Piscina } from 'piscina';
import path from 'path';

// Inicializa workers para tarefas de processamento em paralelo.
const piscina = new Piscina({
  filename: path.resolve('./iaWorker.js')
});

export const processarRequisicaoAssistida = async (req, res) => {
  try {
    const { query } = req.body;

    // Envia a tarefa para um worker para manter a API principal disponível.
    const resultadoThread = await piscina.run({ 
      tipoTarefa: 'PARSAR_LIGUAGEM_NATURAL', 
      payload: query 
    });

    // Segue com o texto normalizado para o serviço configurado.
    res.json({ mensagem: 'Pedido processado com sucesso.', resultadoThread });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};