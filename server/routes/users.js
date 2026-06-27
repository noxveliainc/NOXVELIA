import express from 'express';
import argon2 from 'argon2';
import User from '../models/User.js';
import Anuncio from '../models/Anuncio.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// BUSCAR DADOS DO UTILIZADOR CONECTADO
// ─────────────────────────────────────────────────────────────
router.get('/me', verificarToken, async (req, res) => {
  try {
    // 🌟 CORREÇÃO: Selecionar explicitamente premiumAtivo e premiumExpira
    // para garantir que chegam ao Frontend mesmo que o schema os tenha como select:false
    const utilizador = await User.findById(req.user.id).select(
      '+premiumAtivo +premiumExpira'
    );
    if (!utilizador) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    // 🌟 EXTRA: Verificar se a subscrição Premium expirou sem renovação
    // (útil como fallback caso o Webhook do Stripe falhe)
    if (
      utilizador.premiumAtivo &&
      utilizador.premiumExpira &&
      new Date(utilizador.premiumExpira) < new Date()
    ) {
      utilizador.premiumAtivo = false;
      await utilizador.save();
    }

    res.json(utilizador);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar perfil.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 1. EDITAR PERFIL E EVOLUIR CONTA
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// 1. EDITAR PERFIL (INCLUI EMAIL E TELEFONE)
// ─────────────────────────────────────────────────────────────
router.put('/me', verificarToken, async (req, res) => {
  try {
    const { nome, telefone, email, avatarUrl, website, tipoConta } = req.body;

    const userOriginal = await User.findById(req.user.id);
    if (!userOriginal) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    // 🌟 NOVO: Verificar se o novo email já está em uso por outra pessoa
    if (email && email !== userOriginal.email) {
      const emailEmUso = await User.findOne({ email });
      if (emailEmUso) return res.status(400).json({ erro: 'Este email já está registado noutra conta.' });
    }

    const camposParaAtualizar = { nome, telefone };
    if (email) camposParaAtualizar.email = email;
    if (avatarUrl) camposParaAtualizar.avatarUrl = avatarUrl;

    if (tipoConta === 'profissional') camposParaAtualizar.tipoConta = 'profissional';
    if (userOriginal.tipoConta === 'profissional' || tipoConta === 'profissional') {
      camposParaAtualizar.website = website;
    }

    const utilizadorAtualizado = await User.findByIdAndUpdate(
      req.user.id,
      { $set: camposParaAtualizar },
      { new: true }
    ).select('+premiumAtivo +premiumExpira');

    res.json(utilizadorAtualizado);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar perfil.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 2. ALTERAR PALAVRA-PASSE NA ÁREA LOGADA
// ─────────────────────────────────────────────────────────────
router.put('/me/password', verificarToken, async (req, res) => {
  try {
    const { passwordAtual, novaPassword } = req.body;

    if (!passwordAtual || !novaPassword || novaPassword.length < 9) {
      return res.status(400).json({ erro: 'A nova palavra-passe deve ter pelo menos 9 caracteres.' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    const passwordValida = await argon2.verify(user.password, passwordAtual);
    if (!passwordValida) {
      return res.status(400).json({ erro: 'A palavra-passe atual está incorreta.' });
    }

    user.password = novaPassword;
    await user.save();

    res.json({ mensagem: 'Palavra-passe alterada com sucesso.' });
  } catch (erro) {
    console.error('Erro ao alterar password:', erro);
    res.status(500).json({ erro: 'Erro ao alterar a palavra-passe.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 3. VER OS MEUS ANÚNCIOS E GUARDADOS
// ─────────────────────────────────────────────────────────────
router.get('/me/anuncios', verificarToken, async (req, res) => {
  try {
    const meusAnuncios = await Anuncio.find({ utilizador: req.user.id }).sort({ createdAt: -1 });
    res.json(meusAnuncios);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar os teus anúncios.' });
  }
});

router.get('/me/guardados', verificarToken, async (req, res) => {
  try {
    const userComFavoritos = await User.findById(req.user.id).populate('anunciosGuardados');
    if (!userComFavoritos) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    res.json(userComFavoritos.anunciosGuardados || []);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar favoritos.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 4. VER MONTRA PÚBLICA DE UM VENDEDOR
// ─────────────────────────────────────────────────────────────
router.get('/vendedor/:id', async (req, res) => {
  try {
    const vendedor = await User.findById(req.params.id).select(
      'nome email telefone localidade avatarUrl tipoConta website tipo premiumAtivo'
    );
    if (!vendedor) return res.status(404).json({ erro: 'Vendedor não encontrado.' });
    const anuncios = await Anuncio.find({ utilizador: req.params.id }).sort({ createdAt: -1 });
    res.json({ vendedor, anuncios });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar montra do vendedor.' });
  }
});

export default router;