# Segurança e operação

## Alterações aplicadas

- O registo público ignora qualquer papel enviado pelo cliente e cria sempre um utilizador normal.
- JWT limitado a HS256, emissor/audiência fixos e duração padrão de 12 horas.
- Sessão no frontend guardada em `sessionStorage`; fecha ao terminar a sessão do browser.
- Socket.IO autentica o JWT e só permite entrar na sala do próprio utilizador.
- Limites específicos em login, registo, recuperação de password e contagem de visitas.
- Helmet/CSP, CORS por allowlist, Permissions Policy e remoção do cabeçalho Express.
- Upload limitado a dez imagens por pedido, processado no servidor com validação JPEG/PNG/WebP, conversão para WebP e storage própria.
- Campos de métricas, destaque e estado não podem ser alterados no body de anúncios.
- Erros internos ficam genéricos em produção e inputs MongoDB são sanitizados.
- Google AdSense é carregado apenas pelo componente controlado do frontend, depois de consentimento para serviços externos.

## Variáveis obrigatórias

- `MONGODB_URI`
- `JWT_SECRET`: segredo aleatório com pelo menos 32 caracteres (idealmente 64 bytes).
- `CLIENT_URL=https://www.noxvelia.com`
- `NODE_ENV=production`
- Segredos Stripe, Resend, reCAPTCHA e credenciais privadas de storage de imagens usados pelos respetivos serviços.

Nunca colocar segredos em variáveis `VITE_*` ou no repositório. Rodar os segredos imediatamente se alguma vez forem expostos.

## Rotina recomendada

1. Ativar MFA em Render, MongoDB Atlas, storage de imagens, Stripe, Resend, domínio e GitHub.
2. Restringir utilizadores e IPs de base de dados ao mínimo necessário; usar contas diferentes por ambiente.
3. Ativar backups automáticos e testar uma restauração trimestralmente.
4. Rever mensalmente `npm audit` no cliente e servidor e atualizar dependências com build/teste.
5. Monitorizar picos de 401, 403, 429, 5xx, uploads e webhooks Stripe.
6. Rodar `JWT_SECRET`, chaves API e credenciais de base de dados de forma planeada.
7. Manter TLS, DNSSEC quando suportado e proteção de domínio/transfer lock ativos.

Uma aplicação pública nunca pode prometer risco zero. Estas medidas reduzem a superfície atual; monitorização, atualizações e resposta a incidentes continuam obrigatórias.
