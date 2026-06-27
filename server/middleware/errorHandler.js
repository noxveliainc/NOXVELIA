// Este middleware captura qualquer erro que "fuja" das rotas
export const errorHandler = (err, req, res, next) => {
  // 1. Imprime o erro no terminal com cores e destaque
  console.error('\n❌ [ERRO CRÍTICO ENCONTRADO]');
  console.error(`📍 Rota: ${req.method} ${req.originalUrl}`);
  console.error(`📝 Mensagem: ${err.message}`);
  
  // Imprime o "rasto" do erro (linha de código onde falhou)
  console.error(err.stack);
  console.error('----------------------------------------\n');

  // 2. Devolve uma resposta estruturada ao Frontend
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    erro: err.message || 'Erro interno do servidor.',
    // Só envia os detalhes técnicos para o frontend se estiveres em desenvolvimento
    detalhes: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  });
};

// Este middleware captura rotas que não existem
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    erro: `A rota ${req.method} ${req.originalUrl} não existe no servidor.`
  });
};