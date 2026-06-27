import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. O Segurança da Porta (Verifica se o user tem sessão iniciada)
export const verificarToken = (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).json({ erro: 'Acesso Negado. Nenhum token fornecido.' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    
    next();
  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};

// 2. O Cão de Guarda do Admin Soberano (Verifica se o user é o chefe)
export const verificarAdmin = async (req, res, next) => {
  try {
    const utilizador = await User.findById(req.user.id);
    
    if (!utilizador || utilizador.tipo !== 'admin') {
      return res.status(403).json({ erro: 'Acesso Soberano Negado. Apenas para Super Administradores.' });
    }
    
    next(); 
  } catch (erro) {
    console.error('Erro no middleware de Admin:', erro);
    return res.status(500).json({ erro: 'Erro ao validar privilégios.' });
  }
};