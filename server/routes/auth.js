import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verificarToken } from '../middleware/auth.js';
import { forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// REGISTO
// ─────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    // 1. Recebe a localidade e o nif que antes estavam a ficar esquecidos
    const { nome, email, password, telefone, tipo, localidade, nif } = req.body;
    const emailLower = email.toLowerCase(); // Previne erros de case-sensitivity

    // 2. Verificação manual se o email já existe
    const userExists = await User.findOne({ email: emailLower });
    if (userExists) {
      return res.status(400).json({ erro: 'Este email já está registado.' });
    }

    // 3. Verificação manual se o telemóvel já existe
    const telefoneExists = await User.findOne({ telefone });
    if (telefoneExists) {
      return res.status(400).json({ erro: 'Este telemóvel já se encontra associado a outra conta.' });
    }

    // 4. Criar utilizador (O hash é feito automaticamente pelo hook pre('save') no User.js)
    const novoUtilizador = new User({
      nome,
      email: emailLower,
      password, 
      telefone,
      localidade, // Grava finalmente a localidade na BD!
      tipo: tipo || 'cliente',
      nif: tipo === 'profissional' ? nif : undefined
    });

    const utilizadorGuardado = await novoUtilizador.save();
    
    // Gerar token com ID e Tipo
    const token = jwt.sign(
      { id: utilizadorGuardado._id, tipo: utilizadorGuardado.tipo }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      token, 
      utilizador: { 
        id: utilizadorGuardado._id, 
        nome: utilizadorGuardado.nome,
        email: utilizadorGuardado.email,
        tipo: utilizadorGuardado.tipo 
      } 
    });
  } catch (erro) {
    // 🛡️ Prevenção do erro silencioso: Apanha o código 11000 do MongoDB (Dados duplicados)
    if (erro.code === 11000) {
      if (erro.keyPattern && erro.keyPattern.email) {
        return res.status(400).json({ erro: 'Este email já está registado.' });
      }
      if (erro.keyPattern && erro.keyPattern.telefone) {
        return res.status(400).json({ erro: 'Este telemóvel já se encontra em uso.' });
      }
    }
    
    console.error("ERRO NO REGISTO:", erro);
    res.status(500).json({ erro: 'Erro no servidor ao registar.' });
  }
});

// ─────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();
    
    // É obrigatório selecionar o campo password explicitamente
    const utilizador = await User.findOne({ email: emailLower }).select('+password');

    if (!utilizador) {
      return res.status(400).json({ erro: 'Email ou password incorretos.' });
    }

    // Argon2 verifica a hash guardada na BD
    const passwordValida = await argon2.verify(utilizador.password, password);
    
    if (!passwordValida) {
      return res.status(400).json({ erro: 'Email ou password incorretos.' });
    }

    // Gerar token com ID e Tipo
    const token = jwt.sign(
      { id: utilizador._id, tipo: utilizador.tipo }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      token,
      utilizador: { 
        id: utilizador._id, 
        nome: utilizador.nome, 
        email: utilizador.email, 
        tipo: utilizador.tipo 
      }
    });
  } catch (erro) {
    console.error("ERRO NO LOGIN:", erro);
    res.status(500).json({ erro: 'Erro no servidor ao fazer login.' });
  }
});

// ─────────────────────────────────────────────────────────────
// RECUPERAÇÃO DE PASSWORD (Ligado ao Controller)
// ─────────────────────────────────────────────────────────────
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;