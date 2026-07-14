import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  isValidEmail,
  normalizeEmail,
  personalizeText,
  signToken,
  verifyToken,
} from '../services/partnershipEmailUtils.js';
import { parsePartnershipCsv } from '../services/partnershipCsv.js';
import {
  DEFAULT_PARTNERSHIP_BODY,
  defaultCampaignPayload,
  renderPartnershipEmail,
} from '../services/partnershipTemplate.js';

const secret = 'partnership-test-secret-with-enough-length';

test('normaliza e valida emails comerciais', () => {
  assert.equal(normalizeEmail('  Comercial@Exemplo.PT '), 'comercial@exemplo.pt');
  assert.equal(isValidEmail('comercial@exemplo.pt'), true);
  assert.equal(isValidEmail('sem-email'), false);
});

test('importacao CSV deteta invalidos, duplicados e supressao', () => {
  const csv = [
    'email,nome,empresa,tipo,website,telefone,localidade',
    ' Info@Stand.pt , Ana , Stand XPTO , stand, stand.pt, 912345678, Porto',
    'info@stand.pt,Ana repetida,Stand XPTO,stand,,,,',
    'duplicado@base.pt,Duarte,Base,imobiliaria,,,,',
    'removido@base.pt,Rita,Removida,outro,,,,',
    'email-invalido,Sem,Email,outro,,,,',
  ].join('\n');

  const result = parsePartnershipCsv(
    csv,
    new Set(['duplicado@base.pt']),
    new Set(['removido@base.pt'])
  );

  assert.equal(result.summary.valid, 1);
  assert.equal(result.validRows[0].contacto.email, 'info@stand.pt');
  assert.equal(result.validRows[0].contacto.website, 'https://stand.pt/');
  assert.equal(result.summary.duplicatesFile, 1);
  assert.equal(result.summary.duplicatesDatabase, 1);
  assert.equal(result.summary.suppressed, 1);
  assert.equal(result.summary.invalid, 4);
});

test('personalizacao usa alternativas naturais quando nome ou empresa estao vazios', () => {
  const output = personalizeText(
    'Ola {{nome}}, gostariamos de convidar a {{empresa}} a publicar os seus imoveis ou automoveis. {{unsubscribe_url}}',
    { tipoEmpresa: 'stand' },
    'https://www.noxvelia.com/remover'
  );

  assert.match(output, /^Ola,/);
  assert.match(output, /a sua empresa/);
  assert.match(output, /os seus automoveis/);
  assert.match(output, /https:\/\/www\.noxvelia\.com\/remover/);
});

test('gera HTML e texto simples de email sem HTML perigoso e com unsubscribe seguro', () => {
  const campaign = {
    ...defaultCampaignPayload(),
    _id: 'campaign-test',
    conteudoPrincipal: `${DEFAULT_PARTNERSHIP_BODY}\n\n<script>alert(1)</script>`,
  };
  const contact = {
    _id: '64f000000000000000000001',
    email: 'parceiro@example.pt',
    nomePessoa: '',
    nomeEmpresa: '',
    tipoEmpresa: 'imobiliaria',
    website: '',
  };
  const rendered = renderPartnershipEmail({
    campaign,
    contact,
    send: { _id: '64f000000000000000000002' },
    settings: { trackingAberturas: true, trackingCliques: true },
    appUrl: 'https://www.noxvelia.com',
    apiUrl: 'https://www.noxvelia.com/api',
    logoUrl: 'https://www.noxvelia.com/logo-noxvelia.png',
    secret,
  });

  assert.match(rendered.html, /alt="Noxvelia"/);
  assert.match(rendered.html, /Deixar de receber estes emails/);
  assert.doesNotMatch(rendered.html, /<script>/i);
  assert.match(rendered.text, /Deixar de receber estes emails: https:\/\/www\.noxvelia\.com\/api\/partnerships\/unsubscribe\//);
  assert.equal(rendered.headers['List-Unsubscribe-Post'], 'List-Unsubscribe=One-Click');
});

test('tokens assinados de unsubscribe rejeitam adulteracao', () => {
  const token = signToken({ purpose: 'partnership_unsubscribe', email: 'a@b.pt' }, secret);
  assert.equal(verifyToken(token, secret).email, 'a@b.pt');
  assert.equal(verifyToken(`${token.slice(0, -2)}xx`, secret), null);
});

test('rotas administrativas de parcerias ficam atras de autenticacao admin', async () => {
  const adminRoutes = await readFile(new URL('../routes/admin.js', import.meta.url), 'utf8');
  const authIndex = adminRoutes.indexOf('router.use(verificarAdmin)');
  const partnershipsIndex = adminRoutes.indexOf("router.use('/partnerships'");

  assert.notEqual(authIndex, -1);
  assert.notEqual(partnershipsIndex, -1);
  assert.ok(partnershipsIndex > authIndex);
});

test('restricoes impedem envio duplicado e eventos webhook duplicados', async () => {
  const sendModel = await readFile(new URL('../models/PartnershipEmailSend.js', import.meta.url), 'utf8');
  const webhookModel = await readFile(new URL('../models/PartnershipWebhookEvent.js', import.meta.url), 'utf8');
  const eventsService = await readFile(new URL('../services/partnershipEvents.js', import.meta.url), 'utf8');

  assert.match(sendModel, /index\(\{ campaign: 1, contact: 1 \}, \{ unique: true \}\)/);
  assert.match(webhookModel, /eventId: \{ type: String, required: true, unique: true/);
  assert.match(eventsService, /PartnershipWebhookEvent\.create/);
  assert.match(eventsService, /error\?\.code === 11000\) return \{ duplicate: true \}/);
});

test('worker comercial implementa retry, backoff e tratamento de 429', async () => {
  const worker = await readFile(new URL('../services/partnershipWorker.js', import.meta.url), 'utf8');

  assert.match(worker, /status === 429/);
  assert.match(worker, /2 \*\* Math\.max\(0, attempt\)/);
  assert.match(worker, /tentativas: \{ \$lt: 5 \}/);
  assert.match(worker, /estado: 'pendente'/);
});

test('segredos da Resend nao aparecem no frontend de administracao', async () => {
  const adminUi = await readFile(new URL('../../client/src/pages/admin/PartnershipEmails.jsx', import.meta.url), 'utf8');

  assert.doesNotMatch(adminUi, /RESEND_API_KEY/);
  assert.doesNotMatch(adminUi, /new Resend/);
});
