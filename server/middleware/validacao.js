import { z } from 'zod';

// Esquema de validação para um novo anúncio
export const anuncioSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres").max(100),
  tipo: z.enum(['imovel', 'carro']),
  preco: z.number().positive("O preço deve ser um valor positivo"),
  descricao: z.string().min(20, "A descrição deve ser mais detalhada"),
  // Podes adicionar mais campos conforme o teu modelo
});

// Middleware que executa a validação
export const validarAnuncio = (req, res, next) => {
  try {
    anuncioSchema.parse(req.body);
    next();
  } catch (erro) {
    return res.status(400).json({ 
      erro: "Dados inválidos", 
      detalhes: erro.errors.map(e => e.message) 
    });
  }
};