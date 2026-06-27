import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import argon2 from 'argon2';
import User from '../models/User.js';
import { enviarEmailReset, enviarEmailVerificacao } from '../services/emailService.js';

// ─────────────────────────────────────────────────────────────
// 1. REGISTO DE UTILIZADOR
// ─────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    console.log("\n--- INÍCIO DE REGISTO ---");
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
      website: tipoConta === 'profissional' ? website : undefined,
      verificado: false // Garante que entra como não verificado
    });

    const tokenPlano = crypto.randomBytes(32).toString('hex');
    novoUtilizador.tokenVerificacao = crypto.createHash('sha256').update(tokenPlano).digest('hex');
    novoUtilizador.expiracaoToken = Date.now() + 24 * 60 * 60 * 1000;

    const utilizadorGuardado = await novoUtilizador.save();

    const urlFrontend = process.env.CLIENT_URL || 'https://www.noxvelia.com';
    const linkVerificacao = `${urlFrontend}/verificar-email/${tokenPlano}`;
    enviarEmailVerificacao(utilizadorGuardado.email, utilizadorGuardado.nome, linkVerificacao)
      .catch(e => console.error('Falha ao enviar email de verificação:', e));

    // 🌟 CORREÇÃO 1: Em vez de enviar o Token JWT (que faz auto-login), envia apenas a mensagem
    res.status(201).json({
      mensagem: 'Registo criado com sucesso. Por favor, verifica o teu e-mail para ativar a conta.'
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
    const emailLimpo = email.trim().toLowerCase();

    const utilizador = await User.findOne({ email: emailLimpo }).select('+password');

    if (!utilizador) {
      return res.status(400).json({ erro: 'Este email não está registado na plataforma.' });
    }

    const passwordValida = await argon2.verify(utilizador.password, password);
    if (!passwordValida) {
      return res.status(400).json({ erro: 'A palavra-passe está incorreta.' });
    }

    if (!utilizador.verificado && utilizador.tipo !== 'admin') {
      return res.status(403).json({
        erro: 'Confirma o teu email antes de iniciar sessão. Verifica a tua caixa de entrada (e o spam).'
      });
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
// 3. CONFIRMAÇÃO DE EMAIL
// ─────────────────────────────────────────────────────────────
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const utilizador = await User.findOne({
      tokenVerificacao: tokenHash,
      expiracaoToken: { $gt: Date.now() }
    }).select('+tokenVerificacao +expiracaoToken');

    if (!utilizador) {
      return res.status(400).json({ erro: 'Link de verificação inválido ou expirado.' });
    }

    utilizador.verificado = true;
    utilizador.tokenVerificacao = undefined;
    utilizador.expiracaoToken = undefined;
    await utilizador.save({ validateBeforeSave: false });

    res.json({ mensagem: 'Email verificado com sucesso! Já podes iniciar sessão.' });
  } catch (erro) {
    console.error('Erro no verifyEmail:', erro);
    res.status(500).json({ erro: 'Erro ao verificar o email.' });
  }
};

// ─────────────────────────────────────────────────────────────
// 4. PEDIDO DE RECUPERAÇÃO DE PASSWORD
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
    user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    user.passwordResetExpires = Date.now() + 3600000;

    await user.save({ validateBeforeSave: false });

    const urlFrontend = process.env.CLIENT_URL || 'https://www.noxvelia.com';
    const linkRecuperacao = `${urlFrontend}/reset-password/${token}`;

    try {
      await enviarEmailReset(user.email, user.nome, linkRecuperacao);
    } catch (emailError) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ erro: 'Erro ao enviar o e-mail de recuperação.' });
    }

    res.json({ mensagem: 'Se o e-mail existir no nosso sistema, receberás um link de redefinição.' });
  } catch (erro) {
    res.status(500).json({ erro: 'Ocorreu um erro ao processar o pedido de recuperação.' });
  }
};

// ─────────────────────────────────────────────────────────────
// 5. APLICAÇÃO DA NOVA PASSWORD
// ─────────────────────────────────────────────────────────────
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // 🌟 CORREÇÃO 2: Garantir a mesma segurança de password do Registo.jsx
    const validarPassword = (pwd) => {
      const temTamanho = pwd.length >= 9;
      const temMaiuscula = /[A-Z]/.test(pwd);
      const temNumero = /\d/.test(pwd);
      const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
      return temTamanho && temMaiuscula && temNumero && temEspecial;
    };

    if (!validarPassword(password)) {
      return res.status(400).json({ 
        erro: 'A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.' 
      });
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