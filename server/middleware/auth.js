import User from '../models/User.js';
import { verificarJwt } from '../utils/jwt.js';

// 1. O Segurança da Porta (Verifica se o user tem sessão iniciada)
export const verificarToken = (req, res, next) => {
  try {
    const authorization = req.header('Authorization');

    if (!authorization?.startsWith('Bearer ')) {
      return res.status(401).json({ erro: 'Autenticacao necessaria.' });
    }

    const token = authorization.slice(7).trim();
    if (!token) return res.status(401).json({ erro: 'Autenticacao necessaria.' });

    const verificado = verificarJwt(token);
    req.user = verificado;
    
    next();
  } catch {
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
