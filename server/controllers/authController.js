import crypto from 'crypto';
import argon2 from 'argon2';
import User from '../models/User.js';
import { enviarEmailReset, enviarEmailVerificacao } from '../services/emailService.js';
import { assinarToken } from '../utils/jwt.js';

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,128}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validarPasswordSegura = (password) => typeof password === 'string' && PASSWORD_PATTERN.test(password);

const normalizarWebsite = (valor) => {
  if (!valor) return undefined;
  const texto = String(valor).trim();
  const url = new URL(/^https?:\/\//i.test(texto) ? texto : `https://${texto}`);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Website invalido.');
  return url.href;
};

// ─────────────────────────────────────────────────────────────
// 1. REGISTO DE UTILIZADOR
// ─────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { nome, email, password, telefone, localidade, tipoConta, nif, website } = req.body;
    const nomeLimpo = typeof nome === 'string' ? nome.trim() : '';
    const emailLower = typeof email === 'string' ? email.toLowerCase().trim() : '';
    const telefoneLimpo = typeof telefone === 'string' ? telefone.replace(/\s/g, '').trim() : '';
    const conta = tipoConta === 'profissional' ? 'profissional' : 'particular';

    if (nomeLimpo.length < 2 || nomeLimpo.length > 100 || !EMAIL_PATTERN.test(emailLower)) {
      return res.status(400).json({ erro: 'Nome ou email invalido.' });
    }
    if (!validarPasswordSegura(password)) {
      return res.status(400).json({ erro: 'A palavra-passe tem de ter 9 a 128 caracteres, 1 maiuscula, 1 numero e 1 caracter especial.' });
    }
    if (!/^\d{9}$/.test(telefoneLimpo)) {
      return res.status(400).json({ erro: 'Indica um numero de telemovel valido.' });
    }
    let websiteNormalizado;
    try {
      websiteNormalizado = conta === 'profissional' ? normalizarWebsite(website) : undefined;
    } catch {
      return res.status(400).json({ erro: 'Indica um website valido com HTTPS.' });
    }

    const userExists = await User.findOne({ email: emailLower });
    if (userExists) {
      return res.status(409).json({ erro: 'Ja existe uma conta com estes dados.' });
    }

    const telefoneExists = await User.findOne({ telefone: telefoneLimpo });
    if (telefoneExists) {
      return res.status(409).json({ erro: 'Ja existe uma conta com estes dados.' });
    }

    const novoUtilizador = new User({
      nome: nomeLimpo,
      email: emailLower,
      password,
      telefone: telefoneLimpo,
      localidade: typeof localidade === 'string' ? localidade.trim().slice(0, 120) : undefined,
      tipo: 'cliente',
      tipoConta: conta,
      nif: conta === 'profissional' ? String(nif || '').trim().slice(0, 20) : undefined,
      website: websiteNormalizado,
      verificado: false, 
      rating: 0,           // 🌟 Garante que inicia sem avaliação
      totalAvaliacoes: 0   // 🌟 Garante que inicia sem avaliadores
    });

    const tokenPlano = crypto.randomBytes(32).toString('hex');
    novoUtilizador.tokenVerificacao = crypto.createHash('sha256').update(tokenPlano).digest('hex');
    novoUtilizador.expiracaoToken = Date.now() + 24 * 60 * 60 * 1000;

    const utilizadorGuardado = await novoUtilizador.save();

    const urlFrontend = process.env.CLIENT_URL || 'https://www.noxvelia.com';
    const linkVerificacao = `${urlFrontend}/verificar-email/${tokenPlano}`;
    enviarEmailVerificacao(utilizadorGuardado.email, utilizadorGuardado.nome, linkVerificacao)
      .catch(e => console.error('Falha ao enviar email de verificação:', e));

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
    const emailLimpo = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!EMAIL_PATTERN.test(emailLimpo) || typeof password !== 'string' || password.length > 128) {
      return res.status(401).json({ erro: 'Email ou palavra-passe invalidos.' });
    }

    const utilizador = await User.findOne({ email: emailLimpo }).select('+password');

    if (!utilizador) return res.status(401).json({ erro: 'Email ou palavra-passe invalidos.' });

    const passwordValida = await argon2.verify(utilizador.password, password);
    if (!passwordValida) return res.status(401).json({ erro: 'Email ou palavra-passe invalidos.' });

    if (!utilizador.verificado && utilizador.tipo !== 'admin') {
      return res.status(403).json({
        erro: 'Confirma o teu email antes de iniciar sessão. Verifica a tua caixa de entrada (e o spam).'
      });
    }

    const token = assinarToken({
        id: utilizador._id,
        tipo: utilizador.tipo,
        tipoConta: utilizador.tipoConta
    });

    res.json({
      token,
      utilizador: {
        id: utilizador._id,
        nome: utilizador.nome,
        email: utilizador.email,
        tipo: utilizador.tipo,
        tipoConta: utilizador.tipoConta,
        website: utilizador.website,
        rating: utilizador.rating, // Passa as estrelas para o front no login
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
