import express from 'express';
import Alerta from '../models/Alerta.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

const paraArrayLimpa = (valor) => {
  if (Array.isArray(valor)) return valor.map((item) => String(item || '').trim()).filter(Boolean);
  return String(valor || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const numeroOuUndefined = (valor) => {
  const numero = Number(valor);
  return Number.isFinite(numero) && numero > 0 ? numero : undefined;
};

const limparFiltros = (tipo, filtros = {}) => {
  const base = {
    precoMin: numeroOuUndefined(filtros.precoMin),
    precoMax: numeroOuUndefined(filtros.precoMax),
    q: String(filtros.q || '').trim().slice(0, 120) || undefined,
    distrito: filtros.distrito && filtros.distrito !== 'Todos' ? String(filtros.distrito).trim() : undefined,
    cidade: String(filtros.cidade || '').trim() || undefined,
  };

  if (tipo === 'carro') {
    return {
      ...base,
      marca: String(filtros.marca || '').trim() || undefined,
      modelo: String(filtros.modelo || '').trim() || undefined,
      combustiveis: paraArrayLimpa(filtros.combustiveis),
      transmissao: paraArrayLimpa(filtros.transmissao),
      kmMax: numeroOuUndefined(filtros.kmMax),
    };
  }

  const tipologias = paraArrayLimpa(filtros.tipologias || filtros.tipologia);
  const tiposImovel = paraArrayLimpa(filtros.tiposImovel || filtros.tipoImovel);
  return {
    ...base,
    tipologia: tipologias[0],
    tipologias,
    tipoImovel: tiposImovel[0],
    tiposImovel,
  };
};

const gerarNome = (tipo, filtros = {}) => {
  const partes = [
    tipo === 'carro' ? 'Drive' : 'Estate',
    filtros.marca,
    filtros.modelo,
    filtros.tiposImovel?.join(', '),
    filtros.tipologias?.join(', '),
    filtros.distrito,
    filtros.cidade,
    filtros.precoMax ? `ate ${Number(filtros.precoMax).toLocaleString('pt-PT')} EUR` : null,
    filtros.q ? `"${filtros.q}"` : null,
  ].filter(Boolean);

  return partes.join(' - ').slice(0, 140) || (tipo === 'carro' ? 'Alerta Drive' : 'Alerta Estate');
};

router.get('/', verificarToken, async (req, res) => {
  try {
    const alertas = await Alerta.find({ utilizador: req.user.id })
      .sort({ ativo: -1, createdAt: -1 })
      .limit(40)
      .lean();

    res.json(alertas);
  } catch {
    res.status(500).json({ erro: 'Erro ao carregar alertas de pesquisa.' });
  }
});

router.post('/', verificarToken, async (req, res) => {
  try {
    const tipo = req.body?.tipo;
    if (!['carro', 'imovel'].includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo de alerta invalido.' });
    }

    const filtros = limparFiltros(tipo, req.body?.filtros || {});
    const nome = String(req.body?.nome || '').trim().slice(0, 140) || gerarNome(tipo, filtros);

    const alerta = await Alerta.create({
      utilizador: req.user.id,
      tipo,
      nome,
      filtros,
      ativo: true,
    });

    res.status(201).json(alerta);
  } catch {
    res.status(500).json({ erro: 'Erro ao guardar alerta de pesquisa.' });
  }
});

router.patch('/:id', verificarToken, async (req, res) => {
  try {
    const alerta = await Alerta.findOneAndUpdate(
      { _id: req.params.id, utilizador: req.user.id },
      { ativo: req.body?.ativo !== false },
      { new: true }
    );

    if (!alerta) return res.status(404).json({ erro: 'Alerta nao encontrado.' });
    res.json(alerta);
  } catch {
    res.status(500).json({ erro: 'Erro ao atualizar alerta.' });
  }
});

router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await Alerta.deleteOne({ _id: req.params.id, utilizador: req.user.id });
    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: 'Erro ao remover alerta.' });
  }
});

export default router;
