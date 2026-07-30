import express from 'express';
import StockIntegration from '../models/StockIntegration.js';
import StockImportLog from '../models/StockImportLog.js';
import User from '../models/User.js';
import { importarConteudoStockManual, sincronizarIntegracaoStock } from '../services/stockImportService.js';

const router = express.Router();

const cleanBody = (body = {}) => ({
  nome: String(body.nome || '').trim(),
  provider: ['mystand', 'feed_generico', 'manual'].includes(body.provider) ? body.provider : 'mystand',
  utilizador: String(body.utilizador || '').trim(),
  feedUrl: String(body.feedUrl || '').trim(),
  formato: ['auto', 'json', 'xml', 'csv'].includes(body.formato) ? body.formato : 'auto',
  ativo: body.ativo !== false,
  frequenciaHoras: Number(body.frequenciaHoras || 6),
  defaultDistrito: String(body.defaultDistrito || '').trim(),
  defaultCidade: String(body.defaultCidade || '').trim(),
  defaultTelefone: String(body.defaultTelefone || '').trim(),
  defaultEmail: String(body.defaultEmail || '').trim().toLowerCase(),
  ...(Object.prototype.hasOwnProperty.call(body, 'apiToken') ? { apiToken: String(body.apiToken || '').trim() } : {}),
});

const validarPayload = async (payload) => {
  if (!payload.nome) throw Object.assign(new Error('Indica um nome para a integração.'), { status: 400 });
  if (!payload.utilizador) throw Object.assign(new Error('Escolhe o stand/utilizador associado.'), { status: 400 });
  if (!payload.feedUrl) throw Object.assign(new Error('Indica a URL do feed.'), { status: 400 });
  const user = await User.findById(payload.utilizador).select('_id tipo tipoConta nome');
  if (!user) throw Object.assign(new Error('Utilizador associado não encontrado.'), { status: 404 });
  return user;
};

const serializeIntegration = (item) => ({
  ...item,
  apiTokenConfigurado: Boolean(item.apiToken),
  apiToken: undefined,
});


router.post('/manual-import', async (req, res) => {
  try {
    const resultado = await importarConteudoStockManual({
      nome: String(req.body.nome || '').trim(),
      utilizador: String(req.body.utilizador || '').trim(),
      conteudo: String(req.body.conteudo || ''),
      formato: ['auto', 'json', 'xml', 'csv'].includes(req.body.formato) ? req.body.formato : 'auto',
      fileName: String(req.body.fileName || '').trim(),
      defaultDistrito: String(req.body.defaultDistrito || '').trim(),
      defaultCidade: String(req.body.defaultCidade || '').trim(),
      defaultTelefone: String(req.body.defaultTelefone || '').trim(),
      defaultEmail: String(req.body.defaultEmail || '').trim().toLowerCase(),
      criadoPor: req.user.id,
    });
    res.status(201).json(resultado);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.status ? error.message : (error.message || 'Erro ao importar stock.') });
  }
});

router.get('/', async (_req, res) => {
  try {
    const integracoes = await StockIntegration.find()
      .select('+apiToken')
      .sort({ createdAt: -1 })
      .populate('utilizador', 'nome email tipoConta premiumAtivo')
      .lean();

    const ids = integracoes.map((item) => item._id);
    const logs = await StockImportLog.find({ integracao: { $in: ids } })
      .sort({ iniciadoEm: -1 })
      .limit(Math.max(ids.length * 3, 20))
      .lean();
    const logsPorIntegracao = logs.reduce((acc, log) => {
      const key = String(log.integracao);
      if (!acc[key]) acc[key] = [];
      if (acc[key].length < 3) acc[key].push(log);
      return acc;
    }, {});

    res.json({
      integracoes: integracoes.map((item) => ({
        ...serializeIntegration(item),
        logsRecentes: logsPorIntegracao[String(item._id)] || [],
      })),
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar integrações de stock.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const payload = cleanBody(req.body);
    await validarPayload(payload);
    const integracao = await StockIntegration.create({ ...payload, criadoPor: req.user.id });
    res.status(201).json({ integracao: serializeIntegration(integracao.toObject()) });
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.status ? error.message : 'Erro ao criar integração.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payload = cleanBody(req.body);
    await validarPayload(payload);
    if (!payload.apiToken) delete payload.apiToken;
    const integracao = await StockIntegration.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true, runValidators: true })
      .select('+apiToken')
      .lean();
    if (!integracao) return res.status(404).json({ erro: 'Integração não encontrada.' });
    res.json({ integracao: serializeIntegration(integracao) });
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.status ? error.message : 'Erro ao atualizar integração.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const integracao = await StockIntegration.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true }).lean();
    if (!integracao) return res.status(404).json({ erro: 'Integração não encontrada.' });
    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: 'Erro ao desativar integração.' });
  }
});

router.post('/:id/sync', async (req, res) => {
  try {
    const resultado = await sincronizarIntegracaoStock(req.params.id, { acionadoPor: 'admin' });
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ erro: error.message || 'Erro ao sincronizar o feed.' });
  }
});

router.get('/:id/logs', async (req, res) => {
  try {
    const logs = await StockImportLog.find({ integracao: req.params.id }).sort({ iniciadoEm: -1 }).limit(20).lean();
    res.json({ logs });
  } catch {
    res.status(500).json({ erro: 'Erro ao carregar logs da integração.' });
  }
});

export default router;
