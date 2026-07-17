# Funil de crescimento

O funil é recolhido no frontend e persistido no MongoDB através de `POST /api/analytics/events`. O painel administrativo lê os dados em `GET /api/admin/dashboard/funnel?days=30`.

## Eventos

- `landing_view`: entrada na página principal;
- `search_start`: pesquisa rápida submetida ou filtros aplicados;
- `listing_view`: abertura de um anúncio;
- `whatsapp_click`: clique para iniciar contacto pelo WhatsApp;
- `publish_start`: entrada autenticada no formulário de publicação;
- `publish_complete`: anúncio criado com sucesso;
- `sponsor_contact_click`: clique no contacto da zona de patrocínio.

## Como contar

Cada browser recebe um identificador de sessão anónimo no `localStorage`, apenas depois de aceitar os serviços opcionais de cookies. A coleção `FunnelEvent` não guarda IP, user-agent, email, nome ou texto livre. O painel mostra:

- sessões únicas: melhor aproximação de pessoas/visitas dentro do mesmo browser;
- ações totais: número bruto de eventos recebidos;
- conversões: relação entre etapas do funil;
- evolução diária: últimos 14 dias dentro do período escolhido.

Não é necessário um cron para somar os dados. A recolha acontece no momento da ação e a agregação é calculada em tempo real. A migração `20260717_funnel_events` cria os índices necessários no arranque do backend.

## Respostas profissionais

As respostas são contabilizadas a partir de `PartnershipReply`, alimentado pelo webhook da Resend. O cartão principal mostra remetentes únicos; o texto secundário mostra o número total de respostas recebidas no período.

## Patrocínio

Sem campanha ativa em `landing_top`, a página mostra “Topo da página”. Ao clicar em “Falar sobre patrocínio”, o visitante abre o seu cliente de email com destinatário `geral@noxvelia.com` e assunto pré-preenchido. O clique fica no funil; a mensagem efetiva chega à caixa de email da equipa. O sistema não inventa uma resposta nem publica a campanha automaticamente.
