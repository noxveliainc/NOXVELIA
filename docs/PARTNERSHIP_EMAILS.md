# Emails de Parcerias

Sistema comercial da Noxvelia para contactar stands automoveis e imobiliarias a partir da area de administracao. Este modulo e separado dos emails transacionais e todos os pedidos a Resend acontecem exclusivamente no servidor.

## Ficheiros principais

- `server/routes/adminPartnerships.js`: API administrativa, protegida por `verificarToken` e `verificarAdmin` atraves de `server/routes/admin.js`.
- `server/routes/partnerships.js`: rotas publicas de unsubscribe, tracking e webhook Resend.
- `server/services/partnershipMailer.js`: envio comercial com Resend, reply-to, headers e idempotencia.
- `server/services/partnershipWorker.js`: processamento em background por lotes, retry e limite diario.
- `server/services/partnershipTemplate.js`: template HTML/texto simples e conteudo predefinido.
- `server/services/partnershipCsv.js`: parse, validacao e preview de CSV.
- `server/services/partnershipCampaignService.js`: estimativa de destinatarios e criacao de envios pendentes.
- `server/services/partnershipEvents.js`: processamento idempotente de webhooks e respostas.
- `server/models/Partnership*.js`: contactos, campanhas, envios, supressao, definicoes, auditoria, replies e eventos.
- `server/migrations/20260714_partnership_emails.js`: indices e definicoes iniciais.
- `client/src/pages/admin/PartnershipEmails.jsx`: interface administrativa completa.
- `server/tests/partnershipEmails.test.js`: testes de validacao, CSV, personalizacao, unsubscribe, protecoes e worker.

## Migrations

O projeto nao tinha um sistema de migrations versionadas. Foi adicionado um runner simples e idempotente:

- `server/models/Migration.js`
- `server/migrations/runMigrations.js`
- `server/migrations/20260714_partnership_emails.js`

O runner e chamado no arranque do servidor, depois da ligacao MongoDB. A migration cria/sincroniza indices, incluindo:

- email unico nos contactos;
- email unico na lista de supressao;
- combinacao unica `campaign + contact` nos envios;
- `eventId` unico nos webhooks/replies.

## Variaveis de ambiente

Obrigatorias/recomendadas:

```env
RESEND_API_KEY=
RESEND_TRANSACTIONAL_FROM='"NOXVELIA" <suporte@noxvelia.com>'
RESEND_PARTNERSHIPS_FROM='"Noxvelia Parcerias" <geral@noxvelia.com>'
RESEND_REPLY_TO=geral@noxvelia.com
APP_URL=https://www.noxvelia.com
EMAIL_LOGO_URL=https://www.noxvelia.com/logo-noxvelia.png
RESEND_WEBHOOK_SECRET=
PARTNERSHIP_UNSUBSCRIBE_SECRET=
```

O `PARTNERSHIP_UNSUBSCRIBE_SECRET` pode ficar ausente em desenvolvimento se `JWT_SECRET` existir, mas em producao deve ser definido como secret proprio e longo. Nunca colocar valores reais em codigo, commits, logs ou screenshots.

O sistema tambem aceita, quando necessario:

```env
PUBLIC_API_URL=https://www.noxvelia.com/api
PARTNERSHIP_DAILY_LIMIT=40
PARTNERSHIP_BATCH_SIZE=5
PARTNERSHIP_BATCH_INTERVAL_SECONDS=60
```

## Configuracao na Resend

1. Confirmar o dominio usado pelo remetente comercial.
2. Configurar `RESEND_PARTNERSHIPS_FROM` como `"Noxvelia Parcerias" <geral@noxvelia.com>`.
3. Configurar `RESEND_REPLY_TO=geral@noxvelia.com`.
4. Garantir SPF, DKIM e DMARC saudaveis antes de aumentar volume.
5. Ativar eventos de webhook para delivery, open, click, bounce, complaint e failure.
6. Se a conta/dominio suportar inbound/replies por webhook, encaminhar esses eventos para a mesma rota para aparecerem no painel.

## Webhooks

Endpoint:

```text
POST /api/partnerships/resend/webhook
```

Configurar na Resend com o signing secret em `RESEND_WEBHOOK_SECRET`. O endpoint usa corpo raw e valida os cabecalhos `svix-id`, `svix-timestamp` e `svix-signature` atraves do SDK da Resend.

Eventos tratados:

- `email.sent`;
- `email.delivered`;
- `email.opened`;
- `email.clicked`;
- `email.bounced`;
- `email.complained`;
- `email.failed`;
- `email.received` / `email.replied`, quando disponiveis.

Bounces e complaints adicionam o email a supressao global e bloqueiam futuros envios comerciais.

## Logotipo

Usar `EMAIL_LOGO_URL` com URL absoluto HTTPS publico no dominio Noxvelia, por exemplo:

```text
https://www.noxvelia.com/logo-noxvelia.png
```

A imagem nao e incorporada em base64. O email continua legivel se a imagem nao carregar.

## Importar CSV

No painel admin: `Emails de Parcerias` -> `Contactos` -> `Importar CSV`.

Colunas suportadas:

```csv
email,nome,empresa,tipo,website,telefone,localidade
```

Aliases tambem sao aceites para nome/empresa/tipo. A importacao:

- normaliza emails e espacos;
- valida enderecos;
- normaliza tipo para `stand`, `imobiliaria` ou `outro`;
- mostra preview antes de gravar;
- assinala linhas invalidas;
- deteta duplicados no ficheiro;
- deteta duplicados ja existentes;
- exclui emails suprimidos;
- nunca envia emails automaticamente.

## Criar uma campanha

1. Abrir `Emails de Parcerias` -> `Campanhas`.
2. Usar o modelo predefinido ou selecionar uma campanha existente.
3. Ajustar assunto, preheader, conteudo, botao, remetente e reply-to.
4. Selecionar destinatarios por tipo, estado, origem ou contactos escolhidos.
5. Clicar em `Contar elegiveis`.
6. Clicar em `Pre-visualizar` e rever desktop, mobile e texto simples.
7. Clicar em `Guardar rascunho`.

Variaveis suportadas:

- `{{nome}}`
- `{{empresa}}`
- `{{website}}`
- `{{tipo}}`
- `{{unsubscribe_url}}`

Quando nome ou empresa estao vazios, o template usa alternativas naturais como `Ola,` e `a sua empresa`.

## Enviar teste

1. Guardar a campanha.
2. Inserir o email de teste no campo proprio.
3. Clicar em `Enviar teste`.

O teste usa o mesmo template, mas nao cria campanha em massa nem ignora a necessidade de guardado previo.

## Iniciar, pausar e cancelar

Para iniciar:

1. Guardar a campanha.
2. Clicar em `Iniciar campanha`.
3. Rever o modal com destinatarios elegiveis, assunto, remetente, reply-to, suprimidos e invalidos.
4. Escrever `ENVIAR`.
5. Confirmar.

O worker processa em lotes pequenos. Emails ja enviados nao sao reenviados automaticamente. Envios pendentes podem ser pausados ou cancelados.

## Metricas

Na aba `Metricas`, selecionar uma campanha para ver:

- destinatarios selecionados;
- enviados;
- entregues;
- abertos;
- clicados;
- falhados;
- devolvidos;
- removidos;
- taxa de entrega;
- taxa de abertura;
- taxa de clique;
- inicio e duracao.

As metricas de abertura podem ser imprecisas por causa das protecoes de privacidade dos clientes de email.

## Testar localmente

Comandos disponiveis:

```bash
cd server
npm test
npm run check

cd ../client
npm test
npm run lint
npm run build
```

O projeto nao tem script de typecheck TypeScript porque a stack atual e JavaScript.

Em desenvolvimento sem `RESEND_API_KEY`, o envio comercial devolve resultado `skipped` e nao tenta contactar a Resend.

## Limitacoes conhecidas

- O painel de respostas depende de eventos inbound/reply estarem disponiveis e configurados na Resend/dominio.
- O worker e interno ao processo Node; se houver multiplas replicas em producao, deve ser substituido por fila/lock distribuido antes de escalar volume.
- O tracking de abertura e clique depende de imagens/links carregados pelo cliente de email e pode ser bloqueado.
- A contagem de entregas depende dos eventos recebidos por webhook.

## Reputacao do dominio

Boas praticas recomendadas:

- contactar apenas empresas relevantes e identificaveis;
- manter a origem do contacto preenchida;
- evitar listas compradas ou de origem desconhecida;
- respeitar pedidos de remocao imediatamente;
- manter limite diario conservador;
- aumentar volume gradualmente;
- monitorizar bounce, complaint e respostas;
- usar identificacao clara da Noxvelia;
- manter o link `Deixar de receber estes emails` visivel;
- separar claramente campanhas comerciais de emails transacionais.
