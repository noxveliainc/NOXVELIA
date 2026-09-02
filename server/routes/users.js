import express from 'express';
import mongoose from 'mongoose';
import argon2 from 'argon2';
import User from '../models/User.js';
import Anuncio from '../models/Anuncio.js';
import Avaliacao from '../models/Avaliacao.js';
import { verificarToken } from '../middleware/auth.js';
import { attachImagesToOwnerByUrls, deleteImagesByUrls } from '../services/imageService.js';
import { desativarPremiumUtilizador } from '../services/premiumService.js';

const router = express.Router();

const TIPOS_LINK_PERFIL = new Set(['website', 'instagram', 'facebook', 'linkedin', 'youtube', 'tiktok', 'whatsapp', 'outro']);

const normalizarWhatsappPerfil = (valor) => {
  const digitos = String(valor || '').replace(/\D/g, '');
  if (!digitos) return null;

  const numero = digitos.length === 9 ? `351${digitos}` : digitos;
  if (numero.length < 10 || numero.length > 15) {
    throw new Error('O link de WhatsApp do perfil não é válido.');
  }

  return `https://wa.me/${numero}`;
};

const normalizarUrlPerfil = (valor, tipo = 'website') => {
  if (valor === undefined) return undefined;
  if (valor === null) return null;

  const texto = String(valor).trim();
  if (!texto) return null;

  if (tipo === 'whatsapp') {
    return normalizarWhatsappPerfil(texto);
  }

  const urlComProtocolo = /^https?:\/\//i.test(texto) ? texto : `https://${texto}`;

  try {
    const url = new URL(urlComProtocolo);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Protocolo inválido.');
    }
    return url.href;
  } catch {
    throw new Error('Um dos links do perfil não é válido.');
  }
};

const normalizarLinksPerfil = (links = []) => {
  if (!Array.isArray(links)) {
    throw new Error('Os links do perfil devem ser enviados numa lista.');
  }

  return links
    .slice(0, 3)
    .map((link) => {
      const tipo = TIPOS_LINK_PERFIL.has(link?.tipo) ? link.tipo : 'outro';
      const url = normalizarUrlPerfil(link?.url, tipo);
      return url ? { tipo, url } : null;
    })
    .filter(Boolean);
};

router.get('/me', verificarToken, async (req, res) => {
  try {
    const utilizador = await User.findById(req.user.id).select('+premiumAtivo +dataExpiracaoPremium +proximoPagamentoPremium');
    if (!utilizador) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    if (
      utilizador.premiumAtivo &&
      utilizador.dataExpiracaoPremium &&
      new Date(utilizador.dataExpiracaoPremium) < new Date()
    ) {
      await desativarPremiumUtilizador(utilizador._id, {
        dataExpiracaoPremium: utilizador.dataExpiracaoPremium,
      });
      utilizador.premiumAtivo = false;
    }

    res.json(utilizador);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar perfil.' });
  }
});

router.put('/me', verificarToken, async (req, res) => {
  try {
    const {
      nome,
      telefone,
      email,
      avatarUrl,
      capaUrl,
      website,
      linksPerfil,
      bio,
      localidade,
      standNome,
      standMorada,
      standCodigoPostal,
      mostrarTelefonePublico,
      mostrarMapaPerfil,
      tipoConta,
      nif,
      sobreNos
    } = req.body;

    const userOriginal = await User.findById(req.user.id);
    if (!userOriginal) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    if (email && email !== userOriginal.email) {
      const emailEmUso = await User.findOne({ email });
      if (emailEmUso) return res.status(400).json({ erro: 'Este email já está registado noutra conta.' });
    }

    const camposParaAtualizar = {};

    if (nome !== undefined) camposParaAtualizar.nome = String(nome).trim();
    if (telefone !== undefined) camposParaAtualizar.telefone = String(telefone).trim();
    if (mostrarTelefonePublico !== undefined) {
      camposParaAtualizar.mostrarTelefonePublico = mostrarTelefonePublico === true || mostrarTelefonePublico === 'true';
    }
    if (email !== undefined) camposParaAtualizar.email = String(email).trim().toLowerCase();
    if (avatarUrl !== undefined) camposParaAtualizar.avatarUrl = avatarUrl || null;
    if (capaUrl !== undefined) camposParaAtualizar.capaUrl = capaUrl || null;
    if (localidade !== undefined) camposParaAtualizar.localidade = String(localidade).trim() || null;
    if (standNome !== undefined) camposParaAtualizar.standNome = String(standNome).trim() || null;
    if (standMorada !== undefined) camposParaAtualizar.standMorada = String(standMorada).trim() || null;
    if (standCodigoPostal !== undefined) camposParaAtualizar.standCodigoPostal = String(standCodigoPostal).trim() || null;
    if (mostrarMapaPerfil !== undefined) {
      camposParaAtualizar.mostrarMapaPerfil = mostrarMapaPerfil === true || mostrarMapaPerfil === 'true';
    }
    if (nif !== undefined) camposParaAtualizar.nif = String(nif).trim() || null;

    // 🌟 Autorização do Mini-site
    if (sobreNos !== undefined) camposParaAtualizar.sobreNos = sobreNos;

    if (bio !== undefined) {
      const bioLimpa = String(bio).trim();
      if (bioLimpa.length > 800) {
        return res.status(400).json({ erro: 'A biografia pode ter no maximo 800 caracteres.' });
      }
      camposParaAtualizar.bio = bioLimpa || null;
    }

    if (tipoConta === 'profissional') {
      camposParaAtualizar.tipoConta = 'profissional';
    }

    if (website !== undefined) {
      camposParaAtualizar.website = normalizarUrlPerfil(website);
    }

    if (linksPerfil !== undefined) {
      const linksNormalizados = normalizarLinksPerfil(linksPerfil);
      camposParaAtualizar.linksPerfil = linksNormalizados;

      if (website === undefined) {
        const linkWebsite = linksNormalizados.find((link) => link.tipo === 'website');
        camposParaAtualizar.website = linkWebsite?.url || null;
      }
    }

    const utilizadorAtualizado = await User.findByIdAndUpdate(
      req.user.id,
      { $set: camposParaAtualizar },
      { new: true, runValidators: true }
    ).select('+premiumAtivo +dataExpiracaoPremium +proximoPagamentoPremium');

    if (avatarUrl !== undefined) {
      if (avatarUrl) {
        await attachImagesToOwnerByUrls({ urls: [avatarUrl], ownerType: 'user', ownerId: req.user.id });
      }
      if (userOriginal.avatarUrl && userOriginal.avatarUrl !== avatarUrl) {
        await deleteImagesByUrls({ urls: [userOriginal.avatarUrl], ownerType: 'user', ownerId: req.user.id });
      }
    }
    if (capaUrl !== undefined) {
      if (capaUrl) {
        await attachImagesToOwnerByUrls({ urls: [capaUrl], ownerType: 'user', ownerId: req.user.id });
      }
      if (userOriginal.capaUrl && userOriginal.capaUrl !== capaUrl) {
        await deleteImagesByUrls({ urls: [userOriginal.capaUrl], ownerType: 'user', ownerId: req.user.id });
      }
    }

    res.json(utilizadorAtualizado);
  } catch (erro) {
    if (erro.message?.includes('perfil')) {
      return res.status(400).json({ erro: erro.message });
    }
    res.status(500).json({ erro: 'Erro ao atualizar perfil.' });
  }
});

router.put('/me/password', verificarToken, async (req, res) => {
  try {
    const { passwordAtual, novaPassword } = req.body;

    if (!passwordAtual || !novaPassword || novaPassword.length < 9) {
      return res.status(400).json({ erro: 'A nova palavra-passe deve ter pelo menos 9 caracteres.' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    if (!user.password) {
      return res.status(400).json({ erro: 'Esta conta usa acesso Google e ainda não tem palavra-passe definida.' });
    }

    const passwordValida = await argon2.verify(user.password, passwordAtual);
    if (!passwordValida) {
      return res.status(400).json({ erro: 'A palavra-passe atual está incorreta.' });
    }

    user.password = novaPassword;
    await user.save();

    res.json({ mensagem: 'Palavra-passe alterada com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao alterar a palavra-passe.' });
  }
});

router.get('/me/anuncios', verificarToken, async (req, res) => {
  try {
    const meusAnuncios = await Anuncio.find({ utilizador: req.user.id }).sort({ createdAt: -1 }).lean();
    res.json(meusAnuncios);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar os teus anúncios.' });
  }
});

router.get('/me/guardados', verificarToken, async (req, res) => {
  try {
    const userComFavoritos = await User.findById(req.user.id).populate('favoritos').lean();
    if (!userComFavoritos) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    res.json(userComFavoritos.favoritos || []);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar favoritos.' });
  }
});

router.get('/profissionais', async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(48, Math.max(6, Number(req.query.limit) || 24));
    const skip = (page - 1) * limit;
    const distrito = String(req.query.distrito || '').trim();
    const q = String(req.query.q || '').trim();

    const profissionalConditions = [
      { 'profissional.tipo': { $ne: 'admin' } },
    ];

    if (distrito && distrito !== 'Todos') {
      profissionalConditions.push({ 'profissional.localidade': distrito });
    }

    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      profissionalConditions.push({
        $or: [
          { 'profissional.nome': regex },
          { 'profissional.bio': regex },
          { 'profissional.localidade': regex },
        ],
      });
    }

    const [resultado] = await Anuncio.aggregate([
      { $match: { estado: 'ativo' } },
      {
        $group: {
          _id: '$utilizador',
          totalAnuncios: { $sum: 1 },
          carros: { $sum: { $cond: [{ $eq: ['$tipo', 'carro'] }, 1, 0] } },
          imoveis: { $sum: { $cond: [{ $eq: ['$tipo', 'imovel'] }, 1, 0] } },
          destaque: { $max: { $cond: ['$destacado', 1, 0] } },
          ultimoAnuncioEm: { $max: '$createdAt' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'profissional',
        },
      },
      { $unwind: '$profissional' },
      { $match: { $and: profissionalConditions } },
      {
        $facet: {
          profissionais: [
            {
              $sort: {
                totalAnuncios: -1,
                destaque: -1,
                'profissional.premiumAtivo': -1,
                'profissional.totalAvaliacoes': -1,
                'profissional.rating': -1,
                ultimoAnuncioEm: -1,
              },
            },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: '$profissional._id',
                nome: '$profissional.nome',
                slug: '$profissional.slug',
                avatarUrl: '$profissional.avatarUrl',
                capaUrl: '$profissional.capaUrl',
                bio: '$profissional.bio',
                localidade: '$profissional.localidade',
                tipoConta: '$profissional.tipoConta',
                website: '$profissional.website',
                linksPerfil: '$profissional.linksPerfil',
                premiumAtivo: '$profissional.premiumAtivo',
                verificado: '$profissional.verificado',
                rating: '$profissional.rating',
                totalAvaliacoes: '$profissional.totalAvaliacoes',
                createdAt: '$profissional.createdAt',
                totalAnuncios: 1,
                carros: 1,
                imoveis: 1,
                temDestaque: { $eq: ['$destaque', 1] },
                ultimoAnuncioEm: 1,
              },
            },
          ],
          metadata: [
            {
              $group: {
                _id: null,
                totalProfissionais: { $sum: 1 },
                totalAnunciosAtivos: { $sum: '$totalAnuncios' },
              },
            },
          ],
        },
      },
    ]);

    const profissionais = resultado?.profissionais || [];
    const metadata = resultado?.metadata?.[0] || {};
    const totalProfissionais = metadata.totalProfissionais || 0;

    res.json({
      profissionais,
      totalProfissionais,
      totalAnunciosAtivos: metadata.totalAnunciosAtivos || 0,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalProfissionais / limit),
        hasNextPage: page * limit < totalProfissionais,
      },
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar profissionais.' });
  }
});

router.get('/vendedor/:identificador', async (req, res) => {
  try {
    const { identificador } = req.params;

    let query;
    if (mongoose.Types.ObjectId.isValid(identificador)) {
      query = { _id: identificador };
    } else {
      query = { slug: identificador };
    }

    const vendedorDoc = await User.findOne(query).select(
      'nome slug email telefone mostrarTelefonePublico mostrarMapaPerfil localidade standNome standMorada standCodigoPostal avatarUrl capaUrl bio sobreNos tipoConta website linksPerfil tipo premiumAtivo verificado rating totalAvaliacoes createdAt'
    ).lean();

    if (!vendedorDoc) return res.status(404).json({ erro: 'Vendedor não encontrado.' });

    const vendedor = { ...vendedorDoc };
    if (vendedor.tipo === 'admin') {
      delete vendedor.email;
      delete vendedor.telefone;
    } else if (vendedor.mostrarTelefonePublico === false) {
      delete vendedor.telefone;
    }

    const anuncios = await Anuncio.find({ utilizador: vendedor._id, estado: 'ativo' })
      .select('_id titulo preco fotos tipo estado destacado utilizador scoreQualidade scoreDetalhes carro.marca carro.modelo carro.km carro.combustivel carro.cilindrada imovel.tipoImovel imovel.tipologia imovel.area imovel.areaTerreno imovel.quartos imovel.casasBanho localizacao.cidade localizacao.distrito createdAt')
      .sort({ destacado: -1, createdAt: -1 })
      .populate('utilizador', 'nome slug avatarUrl tipo tipoConta premiumAtivo verificado')
      .lean();

    res.json({ vendedor, anuncios });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao carregar montra do vendedor.' });
  }
});

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
    if (erro.code === 11000) {
      return res.status(400).json({ erro: 'Já avaliaste este vendedor anteriormente.' });
    }
    res.status(500).json({ erro: 'Erro ao registar a avaliação.' });
  }
});

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