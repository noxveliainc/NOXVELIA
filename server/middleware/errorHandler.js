// Este middleware captura qualquer erro que "fuja" das rotas
export const errorHandler = (err, req, res, next) => {
  const requestId = res.getHeader('X-Request-Id');
  // 1. Imprime o erro no terminal com cores e destaque
  console.error('\n❌ [ERRO CRÍTICO ENCONTRADO]');
  console.error(`📍 Rota: ${req.method} ${req.originalUrl}`);
  console.error(`📝 Mensagem: ${err.message}`);
  
  // Imprime o "rasto" do erro (linha de código onde falhou)
  console.error(err.stack);
  console.error('----------------------------------------\n');

  // 2. Devolve uma resposta estruturada ao Frontend
  const statusCode = err.status || 500;
  const mensagemPublica = process.env.NODE_ENV === 'production' && statusCode >= 500
    ? 'Erro interno do servidor.'
    : (err.message || 'Erro interno do servidor.');
  res.status(statusCode).json({
    erro: mensagemPublica,
    requestId,
    // Só envia os detalhes técnicos para o frontend se estiveres em desenvolvimento
    detalhes: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  });
};

// Este middleware captura rotas que não existem
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    erro: 'O recurso pedido não existe.'
  });
};
