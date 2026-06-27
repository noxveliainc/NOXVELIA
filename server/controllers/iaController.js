import { Piscina } from 'piscina';
import path from 'path';

// Inicializa a piscina de workers apontando para o nosso ficheiro isolado
const piscina = new Piscina({
  filename: path.resolve('./iaWorker.js')
});

export const processarRequisicaoIA = async (req, res) => {
  try {
    const { query } = req.body;

    // Dispara a computação pesada para outro núcleo da CPU! O teu servidor principal fica livre!
    const resultadoThread = await piscina.run({ 
      tipoTarefa: 'PARSAR_LIGUAGEM_NATURAL', 
      payload: query 
    });

    // ... Segue para a chamada da API da OpenAI/Gemini usando o dado higienizado ...
    res.json({ mensagem: "Processado em paralelo!", resultadoThread });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};