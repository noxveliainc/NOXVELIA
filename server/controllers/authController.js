import crypto from 'crypto';
import argon2 from 'argon2';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { enviarEmailReset, enviarEmailVerificacao } from '../services/emailService.js';
import { assinarToken } from '../utils/jwt.js';

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,128}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validarPasswordSegura = (password) => typeof password === 'string' && PASSWORD_PATTERN.test(password);
const googleClient = new OAuth2Client();

const normalizarWebsite = (valor) => {
  if (!valor) return undefined;
  const texto = String(valor).trim();
  const url = new URL(/^https?:\/\//i.test(texto) ? texto : `https://${texto}`);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Website inválido.');
  return url.href;
};

const googleClientIds = () => String(process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_IDS || '')
  .split(',')
  .map((valor) => valor.trim())
  .filter(Boolean);

const termosAceites = (valor) => valor === true || valor === 'true' || valor === 'on';
const telefoneLimpo = (valor) => String(valor || '').replace(/\s/g, '').trim();

const telefoneValido = (valor) => {
  if (!valor) return true; 
  const limpo = valor.replace(/\D/g, '');
  return limpo.length >= 9 && limpo.length <= 15;
};

const dadosUtilizadorAuth = (utilizador) => ({
  id: utilizador._id,
  nome: utilizador.nome,
  email: utilizador.email,
  telefone: utilizador.telefone,
  tipo: utilizador.tipo,
  tipoConta: utilizador.tipoConta,
  premiumAtivo: utilizador.premiumAtivo === true,
  dataExpiracaoPremium: utilizador.dataExpiracaoPremium,
  proximoPagamentoPremium: utilizador.proximoPagamentoPremium,
  stripeCustomerId: utilizador.stripeCustomerId,
  stripeSubscriptionId: utilizador.stripeSubscriptionId,
  mostrarTelefonePublico: utilizador.mostrarTelefonePublico,
  website: utilizador.website,
  avatarUrl: utilizador.avatarUrl,
  authProvider: utilizador.authProvider,
  googleLigado: Boolean(utilizador.googleId),
  rating: utilizador.rating,
});

const responderSessao = (res, utilizador, status = 200) => {
  const token = assinarToken({
    id: utilizador._id,
    tipo: utilizador.tipo,
    tipoConta: utilizador.tipoConta,
  });

  return res.status(status).json({
    token,
    utilizador: dadosUtilizadorAuth(utilizador),
  });
};

const verificarGoogleCredential = async (credential) => {
  const clientIds = googleClientIds();
  if (!clientIds.length) {
    const erro = new Error('Login Google ainda não configurado.');
    erro.statusCode = 503;
    throw erro;
  }

  if (typeof credential !== 'string' || credential.length < 40) {
    const erro = new Error('Credencial Google inválida.');
    erro.statusCode = 400;
    throw erro;
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: clientIds.length === 1 ? clientIds[0] : clientIds,
  });
  const payload = ticket.getPayload();
  const email = String(payload?.email || '').toLowerCase().trim();

  if (!payload?.sub || !EMAIL_PATTERN.test(email) || payload.email_verified !== true) {
    const erro = new Error('Não foi possível confirmar a conta Google.');
    erro.statusCode = 401;
    throw erro;
  }

  return {
    googleId: payload.sub,
    email,
    nome: String(payload.name || payload.given_name || email.split('@')[0]).trim().slice(0, 100),
    avatarUrl: payload.picture || null,
  };
};

export const register = async (req, res) => {
  try {
    const { nome, email, password, mostrarTelefonePublico, localidade, tipoConta, nif, website, aceitouTermos } = req.body;
    const nomeLimpo = typeof nome === 'string' ? nome.trim() : '';
    const emailLower = typeof email === 'string' ? email.toLowerCase().trim() : '';
    const telefoneNormalizado = telefoneLimpo(req.body.telefone);
    const conta = tipoConta === 'profissional' ? 'profissional' : 'particular';
    const telefonePublico = mostrarTelefonePublico === false || mostrarTelefonePublico === 'false' ? false : true;

    if (nomeLimpo.length < 2 || nomeLimpo.length > 100 || !EMAIL_PATTERN.test(emailLower)) {
      return res.status(400).json({ erro: 'Nome ou email inválido.' });
    }
    if (!validarPasswordSegura(password)) {
      return res.status(400).json({ erro: 'A palavra-passe tem de ter 9 a 128 caracteres, 1 maiuscula, 1 numero e 1 caracter especial.' });
    }
    if (telefoneNormalizado && !telefoneValido(telefoneNormalizado)) {
      return res.status(400).json({ erro: 'Indica um numero de telefone valido (opcional).' });
    }
    if (!termosAceites(aceitouTermos)) {
      return res.status(400).json({ erro: 'Tens de aceitar os Termos e Condições para criar a conta.' });
    }
    let websiteNormalizado;
    try {
      websiteNormalizado = conta === 'profissional' ? normalizarWebsite(website) : undefined;
    } catch {
      return res.status(400).json({ erro: 'Indica um website valido com HTTPS.' });
    }

    const userExists = await User.findOne({ email: emailLower });
    if (userExists) return res.status(409).json({ erro: 'Ja existe uma conta com este email.' });

    if (telefoneNormalizado) {
      const telefoneExists = await User.findOne({ telefone: telefoneNormalizado });
      if (telefoneExists) return res.status(409).json({ erro: 'Ja existe uma conta com este numero de telefone.' });
    }

    const dadosNovoUtilizador = {
      nome: nomeLimpo,
      email: emailLower,
      password,
      mostrarTelefonePublico: telefonePublico,
      localidade: typeof localidade === 'string' ? localidade.trim().slice(0, 120) : undefined,
      tipo: 'cliente',
      tipoConta: conta,
      nif: conta === 'profissional' ? String(nif || '').trim().slice(0, 20) : undefined,
      website: websiteNormalizado,
      authProvider: 'local',
      aceitouTermosEm: new Date(),
      verificado: false,
      rating: 0,
      totalAvaliacoes: 0,
    };

    if (telefoneNormalizado) {
      dadosNovoUtilizador.telefone = telefoneNormalizado;
    }

    const novoUtilizador = new User(dadosNovoUtilizador);

    const tokenPlano = crypto.randomBytes(32).toString('hex');
    novoUtilizador.tokenVerificacao = crypto.createHash('sha256').update(tokenPlano).digest('hex');
    novoUtilizador.expiracaoToken = Date.now() + 24 * 60 * 60 * 1000;

    const utilizadorGuardado = await novoUtilizador.save();

    const urlFrontend = process.env.CLIENT_URL || 'https://www.noxvelia.com';
    const linkVerificacao = `${urlFrontend}/verificar-email/${tokenPlano}`;
    enviarEmailVerificacao(utilizadorGuardado.email, utilizadorGuardado.nome, linkVerificacao)
      .catch(e => console.error('Falha ao enviar email de verificação:', e));

    res.status(201).json({ mensagem: 'Registo criado com sucesso. Por favor, verifica o teu e-mail para ativar a conta.' });
  } catch (error) {
    if (error?.code === 11000) {
      if (error.keyPattern?.email || error.keyValue?.email) return res.status(409).json({ erro: 'Ja existe uma conta com este email.' });
      if (error.keyPattern?.telefone || error.keyValue?.telefone) return res.status(409).json({ erro: 'Ja existe uma conta com este numero de telefone.' });
      if (error.keyPattern?.googleId || error.keyValue?.googleId) return res.status(409).json({ erro: 'Esta conta Google ja esta ligada a outro utilizador.' });
      if (error.keyPattern?.slug || error.keyValue?.slug) return res.status(409).json({ erro: 'O nome escolhido gera um identificador público já existente. Tenta alterar ligeiramente o nome.' });
      return res.status(409).json({ erro: 'Ja existe uma conta com estes dados.' });
    }
    console.error('ERRO CRU DO MONGOOSE NO REGISTO:', error);
    res.status(500).json({ erro: 'Erro interno no servidor ao tentar registar.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLimpo = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!EMAIL_PATTERN.test(emailLimpo) || typeof password !== 'string' || password.length > 128) {
      return res.status(401).json({ erro: 'Email ou palavra-passe inválidos.' });
    }

    const utilizador = await User.findOne({ email: emailLimpo }).select('+password');
    if (!utilizador) return res.status(401).json({ erro: 'Email ou palavra-passe inválidos.' });
    if (!utilizador.password) return res.status(401).json({ erro: 'Esta conta foi criada com Google. Usa Continuar com Google.' });

    const passwordValida = await argon2.verify(utilizador.password, password);
    if (!passwordValida) return res.status(401).json({ erro: 'Email ou palavra-passe inválidos.' });

    if (!utilizador.verificado && utilizador.tipo !== 'admin') {
      return res.status(403).json({ erro: 'Confirma o teu email antes de iniciar sessão. Verifica a tua caixa de entrada (e o spam).' });
    }

    return responderSessao(res, utilizador);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro no servidor ao tentar iniciar sessão.' });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { credential, nome, mostrarTelefonePublico, localidade, tipoConta, aceitouTermos } = req.body;
    const google = await verificarGoogleCredential(credential);

    let utilizador = await User.findOne({
      $or: [{ googleId: google.googleId }, { email: google.email }],
    }).select('+password +tokenVerificacao +expiracaoToken');

    if (utilizador) {
      if (utilizador.googleId && utilizador.googleId !== google.googleId) {
        return res.status(409).json({ erro: 'Este email ja esta ligado a outra conta Google.' });
      }
      if (!utilizador.googleId) utilizador.googleId = google.googleId;
      if (!utilizador.avatarUrl && google.avatarUrl) utilizador.avatarUrl = google.avatarUrl;
      if (!utilizador.verificado) {
        utilizador.verificado = true;
        utilizador.tokenVerificacao = undefined;
        utilizador.expiracaoToken = undefined;
      }
      await utilizador.save({ validateBeforeSave: false });
      return responderSessao(res, utilizador);
    }

    const telefoneNormalizado = telefoneLimpo(req.body.telefone);
    const localidadeLimpa = typeof localidade === 'string' ? localidade.trim().slice(0, 120) : '';
    const nomeLimpo = (typeof nome === 'string' && nome.trim().length >= 2 ? nome.trim() : google.nome).slice(0, 100);
    const conta = tipoConta === 'profissional' ? 'profissional' : 'particular';
    const telefonePublico = mostrarTelefonePublico === false || mostrarTelefonePublico === 'false' ? false : true;

    if (nomeLimpo.length < 2 || nomeLimpo.length > 100) return res.status(400).json({ erro: 'Indica o nome que deve aparecer na Noxvelia.' });
    
    if (telefoneNormalizado && !telefoneValido(telefoneNormalizado)) {
      return res.status(400).json({ erro: 'Indica um numero de telefone valido.' });
    }

    if (telefoneNormalizado) {
      const telefoneExists = await User.findOne({ telefone: telefoneNormalizado });
      if (telefoneExists) return res.status(409).json({ erro: 'Ja existe uma conta com este numero de telefone.' });
    }

    const dadosCriacaoGoogle = {
      nome: nomeLimpo,
      email: google.email,
      mostrarTelefonePublico: telefonePublico,
      localidade: localidadeLimpa || undefined,
      tipo: 'cliente',
      tipoConta: conta,
      avatarUrl: google.avatarUrl,
      googleId: google.googleId,
      authProvider: 'google',
      aceitouTermosEm: new Date(),
      verificado: true,
      rating: 0,
      totalAvaliacoes: 0,
    };

    if (telefoneNormalizado) {
      dadosCriacaoGoogle.telefone = telefoneNormalizado;
    }

    utilizador = await User.create(dadosCriacaoGoogle);

    return responderSessao(res, utilizador, 201);
  } catch (error) {
    if (error?.code === 11000) {
      if (error.keyPattern?.email || error.keyValue?.email) return res.status(409).json({ erro: 'Ja existe uma conta com este email.' });
      if (error.keyPattern?.telefone || error.keyValue?.telefone) return res.status(409).json({ erro: 'Ja existe uma conta com este numero de telefone.' });
      if (error.keyPattern?.googleId || error.keyValue?.googleId) return res.status(409).json({ erro: 'Esta conta Google ja esta ligada a outro utilizador.' });
      if (error.keyPattern?.slug || error.keyValue?.slug) return res.status(409).json({ erro: 'O nome escolhido gera um identificador público já existente. Tenta alterar ligeiramente o nome.' });
    }
    const status = error?.statusCode || 500;
    return res.status(status).json({ erro: error?.message || 'Não foi possível continuar com Google.' });
  }
};

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
    res.status(500).json({ erro: 'Erro ao verificar o email.' });
  }
};

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

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!validarPasswordSegura(password)) {
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
    res.status(500).json({ erro: 'Ocorreu um erro ao redefinir a palavra-passe.' });
  }
};