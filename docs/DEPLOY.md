# Deploy, SEO e operação

## Verificações

No cliente: `npm run lint`, `npm run format:check`, `npm test` e `npm run build`.

No servidor: `npm test` e `npm run check`.

## SEO

- As páginas públicas usam canonical, Open Graph, Twitter Cards e JSON-LD.
- Os anúncios possuem URLs legíveis; `/anuncio/:id` continua compatível.
- A API disponibiliza o sitemap de anúncios ativos em `/api/system/sitemap.xml`.
- O sitemap estático é o fallback. O proxy/CDN de produção deve encaminhar `https://www.noxvelia.com/sitemap.xml` para o endpoint dinâmico.
- Rotas privadas estão excluídas em `robots.txt`; este ficheiro não substitui autenticação.

## Observabilidade

- `GET /api/system/health` verifica API e MongoDB e responde `503` quando degradado.
- `GET /api/system/metrics` exige admin e apresenta volume, erros, latência média, memória e uptime.
- Respostas possuem `X-Request-Id` e os erros devolvem o mesmo identificador.
- O monitor externo deve consultar o health check e alertar após falhas consecutivas.

## Publicação e recuperação

1. Executar todas as verificações.
2. Publicar a API e confirmar o health check.
3. Publicar o cliente e validar a landing, pesquisas, um anúncio e o sitemap.
4. Confirmar webhooks Stripe.
5. Ativar backups automáticos no fornecedor MongoDB e testar uma restauração numa base isolada. Não guardar dumps ou credenciais no Git.

Para recuperar: restaurar numa base nova, validar contagens de utilizadores, anúncios e pagamentos, alterar `MONGODB_URI`, confirmar o health check e só depois reabrir escrita.

As variáveis necessárias estão documentadas em `client/.env.example` e `server/.env.example`.
