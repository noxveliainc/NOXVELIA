import express from 'express';
import argon2 from 'argon2';
import User from '../models/User.js';
import Anuncio from '../models/Anuncio.js';
import Avaliacao from '../models/Avaliacao.js';
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
// 1. EDITAR PERFIL (INCLUI EMAIL E TELEFONE)
// ─────────────────────────────────────────────────────────────
router.put('/me', verificarToken, async (req, res) => {
  try {
    const { nome, telefone, email, avatarUrl, website, tipoConta } = req.body;

    const userOriginal = await User.findById(req.user.id);
    if (!userOriginal) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    // 🌟 Verificar se o novo email já está em uso por outra pessoa
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
    // 🌟 CORREÇÃO: o anúncio é guardado/removido em "favoritos"
    // (ver routes/anuncios.js → POST /:id/guardar). O campo
    // "anunciosGuardados" nunca é escrito, por isso esta rota
    // devolvia sempre [] mesmo havendo favoritos guardados.
    const userComFavoritos = await User.findById(req.user.id).populate('favoritos');
    if (!userComFavoritos) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    res.json(userComFavoritos.favoritos || []);
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
      'nome email telefone localidade avatarUrl tipoConta website tipo premiumAtivo rating totalAvaliacoes createdAt'
    );
    if (!vendedor) return res.status(404).json({ erro: 'Vendedor não encontrado.' });
    const anuncios = await Anuncio.find({ utilizador: req.params.id }).sort({ createdAt: -1 });
    res.json({ vendedor, anuncios });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar montra do vendedor.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 5. 🌟 NOVO: AVALIAR UM VENDEDOR
//    Regras de segurança:
//    - Não podes avaliar-te a ti próprio.
//    - Nota tem de ser um inteiro/decimal entre 1 e 5.
//    - Um avaliador só tem UMA avaliação por vendedor — submeter
//      outra vez ATUALIZA a anterior (evita inflação/spam de média).
//    - Se vier `anuncioId`, confirmamos que o anúncio pertence
//      mesmo a esse vendedor (não dá para "carimbar" o anúncio errado).
//
//    NOTA: ainda não existe verificação de "compra confirmada"
//    (o sistema não guarda histórico de transações). Por agora a
//    única barreira é estar autenticado + não ser auto-avaliação.
// ─────────────────────────────────────────────────────────────
router.post('/:id/avaliar', verificarToken, async (req, res) => {
  try {
    const anuncianteId = req.params.id;
    const { nota, comentario, anuncioId } = req.body;

    if (anuncianteId === req.user.id) {
      return res.status(400).json({ erro: 'Não podes avaliar a tua própria conta.' });
    }

    const notaNumerica = Number(nota);
    if (!notaNumerica || notaNumerica < 1 || notaNumerica > 5) {
      return res.status(400).json({ erro: 'A nota tem de ser um valor entre 1 e 5.' });
    }

    const anunciante = await User.findById(anuncianteId);
    if (!anunciante) return res.status(404).json({ erro: 'Vendedor não encontrado.' });

    // Se vier um anúncio associado, validar que é mesmo deste vendedor
    let anuncioValido = null;
    if (anuncioId) {
      anuncioValido = await Anuncio.findOne({ _id: anuncioId, utilizador: anuncianteId });
      if (!anuncioValido) {
        return res.status(400).json({ erro: 'Esse anúncio não pertence a este vendedor.' });
      }
    }

    const avaliacaoExistente = await Avaliacao.findOne({
      avaliador: req.user.id,
      anunciante: anuncianteId,
    });

    if (avaliacaoExistente) {
      avaliacaoExistente.nota = notaNumerica;
      avaliacaoExistente.comentario = comentario?.trim() || '';
      if (anuncioValido) avaliacaoExistente.anuncio = anuncioValido._id;
      await avaliacaoExistente.save();
    } else {
      await Avaliacao.create({
        avaliador: req.user.id,
        anunciante: anuncianteId,
        anuncio: anuncioValido?._id || null,
        nota: notaNumerica,
        comentario: comentario?.trim() || '',
      });
    }

    // ── Recalcular a média a partir da fonte de verdade ──────
    // Em vez de incrementar soma/total (que fica errado se uma
    // nota antiga for editada), recalculamos sempre a partir da
    // coleção Avaliacao. Para o volume esperado, isto é instantâneo.
    const [stats] = await Avaliacao.aggregate([
      { $match: { anunciante: anunciante._id } },
      { $group: { _id: '$anunciante', media: { $avg: '$nota' }, total: { $sum: 1 } } },
    ]);

    anunciante.rating = stats ? Math.round(stats.media * 10) / 10 : 0;
    anunciante.totalAvaliacoes = stats ? stats.total : 0;
    await anunciante.save({ validateBeforeSave: false });

    res.json({
      mensagem: avaliacaoExistente ? 'Avaliação atualizada com sucesso.' : 'Avaliação registada com sucesso.',
      rating: anunciante.rating,
      totalAvaliacoes: anunciante.totalAvaliacoes,
    });

  } catch (erro) {
    // Proteção extra: se por alguma razão o índice único disparar
    // (ex: pedidos em paralelo), devolver mensagem amigável em vez de 500
    if (erro.code === 11000) {
      return res.status(400).json({ erro: 'Já avaliaste este vendedor anteriormente.' });
    }
    console.error('Erro ao registar avaliação:', erro);
    res.status(500).json({ erro: 'Erro ao registar a avaliação.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 6. 🌟 NOVO: LISTAR AVALIAÇÕES PÚBLICAS DE UM VENDEDOR
// ─────────────────────────────────────────────────────────────
router.get('/:id/avaliacoes', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find({ anunciante: req.params.id })
      .sort({ createdAt: -1 })
      .populate('avaliador', 'nome avatarUrl')
      .populate('anuncio', 'titulo');
    res.json(avaliacoes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar avaliações.' });
  }
});

// ─────────────────────────────────────────────────────────────
// 7. 🌟 NOVO: SABER SE EU JÁ AVALIEI ESTE VENDEDOR
//    Útil no frontend para mostrar "Editar a minha avaliação"
//    em vez de "Avaliar vendedor" quando já existe uma.
// ─────────────────────────────────────────────────────────────
router.get('/:id/minha-avaliacao', verificarToken, async (req, res) => {
  try {
    const minhaAvaliacao = await Avaliacao.findOne({
      avaliador: req.user.id,
      anunciante: req.params.id,
    });
    res.json(minhaAvaliacao || null);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao verificar avaliação.' });
  }
});

export default router;