import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import argon2 from 'argon2';
import User from '../models/User.js';
import { enviarEmailReset } from '../services/emailService.js';

// ─────────────────────────────────────────────────────────────
// 1. REGISTO DE UTILIZADOR
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// 1. REGISTO DE UTILIZADOR (VERSÃO DE DIAGNÓSTICO)
// ─────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    // 🕵️ RASTREADOR 1: O que é que o Frontend enviou?
    console.log("\n--- INÍCIO DE REGISTO ---");
    console.log("1. DADOS RECEBIDOS DO FRONTEND:", req.body);

    const { nome, email, password, telefone, localidade, tipo, tipoConta, nif, website } = req.body;
    const emailLower = email.toLowerCase().trim(); 

    const userExists = await User.findOne({ email: emailLower });
    if (userExists) {
      return res.status(400).json({ erro: 'Este email já está registado.' });
    }

    const telefoneExists = await User.findOne({ telefone });
    if (telefoneExists) {
      return res.status(400).json({ erro: 'Este telemóvel já se encontra associado a outra conta.' });
    }

    const novoUtilizador = new User({
      nome,
      email: emailLower,
      password,
      telefone,
      localidade, 
      tipo: tipo || 'cliente',
      tipoConta: tipoConta || 'particular',
      nif: tipoConta === 'profissional' ? nif : undefined,
      website: tipoConta === 'profissional' ? website : undefined
    });

    // 🕵️ RASTREADOR 2: O que é que o Mongoose construiu?
    console.log("2. OBJETO MONGOOSE ANTES DE GRAVAR:", novoUtilizador);

    const utilizadorGuardado = await novoUtilizador.save();
    
    // 🕵️ RASTREADOR 3: O que ficou na Base de Dados?
    console.log("3. GRAVADO NA BD COM SUCESSO:", utilizadorGuardado);
    console.log("-------------------------\n");
    
    const token = jwt.sign(
      { 
        id: utilizadorGuardado._id, 
        tipo: utilizadorGuardado.tipo,
        tipoConta: utilizadorGuardado.tipoConta
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      token, 
      utilizador: { 
        id: utilizadorGuardado._id, 
        nome: utilizadorGuardado.nome,
        email: utilizadorGuardado.email,
        tipo: utilizadorGuardado.tipo,
        tipoConta: utilizadorGuardado.tipoConta,
        website: utilizadorGuardado.website
      } 
    });
    
  } catch (error) {
    console.error('Erro no registo:', error);
    res.status(500).json({ erro: 'Erro interno no servidor ao tentar registar.' });
  }
};

// ─────────────────────────────────────────────────────────────
// 2. LOGIN DE UTILIZADOR
// ─────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 🛡️ LIMPEZA DE ESPAÇOS: Evita o erro 400 por espaços acidentais
    const emailLimpo = email.trim().toLowerCase();
    
    const utilizador = await User.findOne({ email: emailLimpo }).select('+password');

    if (!utilizador) {
      console.log(`[LOGIN ERRO] Email não encontrado: ${emailLimpo}`);
      return res.status(400).json({ erro: 'Este email não está registado na plataforma.' });
    }

    const passwordValida = await argon2.verify(utilizador.password, password);
    if (!passwordValida) {
      console.log(`[LOGIN ERRO] Password errada para: ${emailLimpo}`);
      return res.status(400).json({ erro: 'A palavra-passe está incorreta.' });
    }

    const token = jwt.sign(
      { 
        id: utilizador._id, 
        tipo: utilizador.tipo,
        tipoConta: utilizador.tipoConta
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      token,
      utilizador: { 
        id: utilizador._id, 
        nome: utilizador.nome, 
        email: utilizador.email, 
        tipo: utilizador.tipo,
        tipoConta: utilizador.tipoConta,
        website: utilizador.website
      }
    });
  } catch (erro) {
    console.error("ERRO NO LOGIN:", erro);
    res.status(500).json({ erro: 'Erro no servidor ao tentar iniciar sessão.' });
  }
};

// ─────────────────────────────────────────────────────────────
// 3. PEDIDO DE RECUPERAÇÃO DE PASSWORD
// ─────────────────────────────────────────────────────────────
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const emailLower = email ? email.trim().toLowerCase() : '';

    if (!emailLower) {
      return res.status(400).json({ erro: 'O e-mail é obrigatório.' });
    }

    const user = await User.findOne({ email: emailLower }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      return res.json({ mensagem: 'Se o e-mail existir no nosso sistema, receberás um link de redefinição.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expira = Date.now() + 3600000; 

    user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    user.passwordResetExpires = expira;
    
    await user.save({ validateBeforeSave: false });

    const urlFrontend = process.env.CLIENT_URL || 'http://localhost:5173';
    const linkRecuperacao = `${urlFrontend}/reset-password/${token}`;

    try {
        await enviarEmailReset(user.email, user.nome, linkRecuperacao);
    } catch (emailError) {
        console.error('Falha ao enviar e-mail:', emailError);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(500).json({ erro: 'Erro ao enviar o e-mail de recuperação.' });
    }

    res.json({ mensagem: 'Se o e-mail existir no nosso sistema, receberás um link de redefinição.' });

  } catch (erro) {
    console.error('Erro no forgotPassword:', erro);
    res.status(500).json({ erro: 'Ocorreu um erro ao processar o pedido de recuperação.' });
  }
};

// ─────────────────────────────────────────────────────────────
// 4. APLICAÇÃO DA NOVA PASSWORD
// ─────────────────────────────────────────────────────────────
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ erro: 'A nova palavra-passe deve ter pelo menos 6 caracteres.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+password +passwordResetToken +passwordResetExpires');

    if (!user) {
      return res.status(400).json({ erro: 'O link de recuperação é inválido ou já expirou.' });
    }

    user.password = password; 
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.json({ mensagem: 'Palavra-passe atualizada com sucesso. Já podes iniciar sessão.' });

  } catch (erro) {
    console.error('Erro no resetPassword:', erro);
    res.status(500).json({ erro: 'Ocorreu um erro ao redefinir a palavra-passe.' });
  }
};