// server/workerProcessamento.js
// Este ficheiro corre num núcleo separado do teu processador (thread isolada)

export default async function processarDadosPesados({ tipoTarefa, payload }) {
  console.log(`🧵 Thread secundária ativa para processar tarefa: [${tipoTarefa}]`);
  
  if (tipoTarefa === 'PARSAR_LIGUAGEM_NATURAL') {
    // Tratamento de texto livre antes de aplicar os filtros da plataforma.
    const textoLimpo = payload.trim().toLowerCase();
    return { processado: true, resultado: textoLimpo };
  }
  
  if (tipoTarefa === 'CALCULAR_SCORE_QUALIDADE') {
    // Cálculo objetivo de qualidade do anúncio.
    let score = 5;
    if (payload.temFotos) score += 2;
    if (payload.descricaoLonga) score += 3;
    return { score: Math.min(score, 10) };
  }

  return { erro: 'Tarefa desconhecida' };
}