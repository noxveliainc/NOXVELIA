# NOXVELIA — Prompt Mestre Completo

Última atualização deste documento: 2026-08-14.

Este ficheiro serve para entregar a qualquer programador, agente de IA ou futura sessão Codex uma visão completa da NOXVELIA. Deve ser lido antes de mexer no projeto.

## Prompt Mais Completo Possível

Trabalha na NOXVELIA, uma plataforma portuguesa de anúncios classificados focada em automóveis e imóveis. A prioridade é criar confiança, trazer stock real rapidamente e facilitar contacto direto entre comprador e anunciante. O produto deve sentir-se profissional, simples, português e útil, nunca como template genérico de IA.

### Identidade e Produto

- Nome público: NOXVELIA.
- Domínio principal: https://www.noxvelia.com.
- Verticais: automóveis e imóveis.
- Tom: direto, comercial, útil, sem frases artificiais, sem promessas vagas.
- Tema: claro apenas. Não reintroduzir dark mode, toggles de tema ou regras `.dark`/`data-theme="dark"`.
- Paleta principal: branco, fundo suave #f7f5ef, navy #102f50, texto #071326, texto secundário #5d6b78, borda #e6e1d6, champagne #d9c391 como acento, Drive #3ecf8e e Estate #2ac1b4 só em estados/indicadores.
- Botões: primário navy com texto branco; secundário outline navy/champagne; não usar champagne sólido com texto claro.
- UI: minimalista, espaçamento generoso, tipografia forte, cards limpos, sem gradientes artificiais, sem badges inúteis, sem ícones decorativos sem função.

### Regras de Negócio Atuais

- Conta normal/particular: até 5 anúncios ativos gratuitos.
- Premium ativo ou admin: publicação sem limite enquanto o plano estiver ativo.
- Quando o Premium termina: anúncios existentes continuam online, mas perdem destaque automático, prioridade, edição de anúncios ativos e métricas avançadas; o utilizador só publica novamente quando voltar ao limite gratuito ou renovar.
- Só Premium ou admin pode editar anúncios já ativos.
- Admin pode criar anúncios indicando apenas telefone ou email; utilizadores normais precisam dos contactos exigidos pelo formulário.
- Destaque não deve ser apresentado como Premium se for apenas destaque comprado/manual.
- Selos de confiança devem representar factos verificáveis, como email confirmado; não inventar verificações.
- Avaliações de vendedor: apenas utilizadores autenticados podem votar; cada utilizador tem uma avaliação ativa por vendedor (`avaliador + anunciante` único), não pode avaliar a própria conta, pode atualizar a própria nota, e a média 0-5 é recalculada em `User.rating` / `User.totalAvaliacoes` para aparecer no perfil e no anúncio.
- Publicidade/patrocínios devem parecer produto real, com página própria, preços, regras, link do patrocinador e tracking de cliques/impressões.
- Stock de stands deve poder chegar por Excel/XML/CSV/feed, com importação por admin e pedidos públicos em /enviar-stock.

### Métricas e Dashboard

- O dashboard admin deve mostrar números reais, não maquilhados.
- `FunnelEvent.sessionId` é a base para contar pessoas/sessões anónimas únicas.
- Visitantes reais por dia = quantidade de sessionIds únicos por `dayKey` em todos os eventos do funil.
- Não usar apenas `landing_view`, porque um visitante pode entrar diretamente em /carros, /imoveis ou num anúncio.
- Evitar mostrar estatísticas pequenas na landing se parecerem artificiais ou prejudicarem confiança.


### Monitorização e Estabilidade Operacional

- Auditoria de funil: monitorizar `/admin` e `FunnelEvent` para perceber onde os utilizadores abandonam o fluxo, incluindo landing, pesquisa, publicação, contacto e checkout Stripe.
- Visitantes diários devem ser números reais por sessão única (`sessionId`/`dayKey`), sem inflacionar métricas para parecer maior.
- Em cada atualização de código, manter a rotina `npm run check` no servidor e `npm run build` no cliente.
- Performance visual: preservar tema claro, base #ffffff / #f7f5ef, animações contidas, sem efeitos pesados que prejudiquem mobile.
- Antes de fechar trabalho visual, rever páginas críticas em desktop e telemóvel.

### Frontend

- React + Vite.
- Rotas no `client/src/App.jsx`.
- Páginas principais em `client/src/pages/shared`.
- Admin em `client/src/pages/admin/AdminDashboard.jsx`.
- API central em `client/src/services/api.js`.
- Componentes partilhados em `client/src/components`.
- Marcas/modelos em `client/src/data/marcasModelos.js`; deve existir opção Outro para marca/modelo e inputs personalizados.
- Imagens públicas ficam em `client/public`.

### Backend

- Node.js + Express + MongoDB/Mongoose.
- Entrada principal: `server/index.js`.
- Modelos MongoDB: `server/models`.
- Rotas Express: `server/routes`.
- Autenticação JWT: `server/middleware/auth.js`.
- Stripe: rotas em `server/routes/stripe.js`; webhook em `/api/stripe/webhook`.
- Analytics/funil: `server/models/FunnelEvent.js` + endpoints admin.
- Imagens: `server/services/imageService.js` e docs em `docs/IMAGE_STORAGE.md`.
- Importação de stock: scripts/rotas de stock/importação; templates em `client/public/templates` e docs relacionadas.

### Integrações

- Google OAuth: `GOOGLE_CLIENT_ID` no frontend/backend e fluxo de registo/login Google.
- Stripe Premium: checkout, portal cliente, webhook de eventos `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.
- Stripe patrocínios: checkout separado para campanhas, escolha de posição, dias, upload/link do patrocinador.
- Resend/email: emails transacionais, parcerias e respostas.
- CarVertical: bloco comercial com 20% de desconto e link/código NOXVELIA.
- Google News/RSS mercado: endpoint `/api/market-news` para notícias automóveis/imóveis.
- OpenStreetMap/Nominatim: geocoding/mapas sem chaves quando possível.
- TikTok: landing pode mostrar vídeos do perfil `@noxvelia7`. Usa `VITE_TIKTOK_VIDEO_URLS` com URLs públicas separadas por vírgula para iframes oficiais; sem URLs, cai para embed de perfil. Só carrega conteúdo TikTok quando o consentimento de cookies externos está ativo.

### Comandos Locais CMD

```bat
cd C:\Users\win11\Desktop\plataforma-anuncios-ia
git status
cd server
npm install
npm run check
cd ..\client
npm install
npm run build
cd ..
git add server client docs
git commit -m "Atualiza limites, dashboard e documentação NOXVELIA"
git push origin main
```

### Comandos VPS

```bash
cd /root/NOXVELIA
git pull origin main

cd server
npm install
npm run check
pm2 restart noxvelia-api --update-env

cd ../client
npm install
npm run build

sudo systemctl reload nginx
pm2 save
curl https://www.noxvelia.com/api/system/health
```

### Variáveis Importantes de Produção

- `NODE_ENV=production`, `PORT=4000`, `CLIENT_URL`, `FRONTEND_URL`, `APP_URL`, `PUBLIC_API_URL`.
- `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- `GOOGLE_CLIENT_ID`.
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PREMIUM_PRICE_ID`.
- `RESEND_API_KEY`, remetentes Resend, `RESEND_WEBHOOK_SECRET`.
- Imagens: `IMAGE_STORAGE_DRIVER`, `IMAGE_PUBLIC_BASE_URL`, `S3_*` quando produção usa storage compatível S3.
- Segurança opcional: `TURNSTILE_ENABLED`, `TURNSTILE_SECRET_KEY`.
- Monitorização frontend: `CLIENT_ISSUES_ENABLED`, `CLIENT_ISSUE_SALT`.
- Landing/TikTok: `VITE_TIKTOK_VIDEO_URLS` no cliente, opcional, com URLs públicas separadas por vírgula.

### Checklist Antes de Dar Como Fechado

- `npm run check` no servidor.
- `npm run build` no cliente.
- `git diff --check` sem erros.
- Confirmar que `client/dist` não foi commitado por acidente se o objetivo era só fonte.
- Confirmar que páginas críticas abrem: `/`, `/carros`, `/imoveis`, `/publicar`, `/perfil`, `/planos`, `/premium-confirmar`, `/admin`, `/enviar-stock`, `/profissionais`, `/patrocinios`.
- Confirmar mobile em listagens e detalhe de anúncio.
- Confirmar que a avaliação de vendedor no anúncio exige login, impede autoavaliação e atualiza média no perfil.
- Confirmar que TikTok na landing só carrega após consentimento externo e que a CSP de produção permite `www.tiktok.com`.
- Confirmar webhook Stripe produção em `https://www.noxvelia.com/api/stripe/webhook`.

## Inventário 1 a 1 dos Ficheiros

Nota: este inventário lista os ficheiros de fonte, configuração, documentação e assets públicos versionados. Ficheiros gerados de build (`client/dist/`) e artefactos locais do navegador (`.codex-edge-*`) ficam excluídos por não serem fonte de verdade.

- `.gitignore` — Regras globais para o Git ignorar dependências, builds e ficheiros locais.
- `client/.env.example` — Exemplo de variáveis públicas do frontend Vite.
- `client/.env.local` — Configuração local do frontend usada no ambiente de desenvolvimento.
- `client/.gitignore` — Regras de exclusão específicas do frontend.
- `client/eslint.config.js` — Configuração do ESLint para validar código React/JavaScript.
- `client/index.html` — HTML base servido pelo Vite onde a aplicação React é montada.
- `client/package.json` — Dependências e scripts do frontend React/Vite.
- `client/package-lock.json` — Lockfile que fixa versões das dependências npm do frontend.
- `client/postcss.config.js` — Configuração PostCSS/Tailwind do frontend.
- `client/public/_redirects` — Asset público servido diretamente pelo frontend.
- `client/public/ads.txt` — Asset público servido diretamente pelo frontend.
- `client/public/carvertical-logo.png` — Asset público servido diretamente pelo frontend.
- `client/public/logo-noxvelia.png` — Asset público servido diretamente pelo frontend.
- `client/public/marcas/abarth.png` — Logotipo da marca automóvel 'abarth' usado na página Marcas e filtros visuais.
- `client/public/marcas/aiways.png` — Logotipo da marca automóvel 'aiways' usado na página Marcas e filtros visuais.
- `client/public/marcas/alfa-romeo.png` — Logotipo da marca automóvel 'alfa-romeo' usado na página Marcas e filtros visuais.
- `client/public/marcas/alpine.png` — Logotipo da marca automóvel 'alpine' usado na página Marcas e filtros visuais.
- `client/public/marcas/aston-martin.png` — Logotipo da marca automóvel 'aston-martin' usado na página Marcas e filtros visuais.
- `client/public/marcas/audi.png` — Logotipo da marca automóvel 'audi' usado na página Marcas e filtros visuais.
- `client/public/marcas/bentley.png` — Logotipo da marca automóvel 'bentley' usado na página Marcas e filtros visuais.
- `client/public/marcas/bmw.png` — Logotipo da marca automóvel 'bmw' usado na página Marcas e filtros visuais.
- `client/public/marcas/bugatti.png` — Logotipo da marca automóvel 'bugatti' usado na página Marcas e filtros visuais.
- `client/public/marcas/byd.png` — Logotipo da marca automóvel 'byd' usado na página Marcas e filtros visuais.
- `client/public/marcas/cadillac.png` — Logotipo da marca automóvel 'cadillac' usado na página Marcas e filtros visuais.
- `client/public/marcas/caterham.png` — Logotipo da marca automóvel 'caterham' usado na página Marcas e filtros visuais.
- `client/public/marcas/chery.png` — Logotipo da marca automóvel 'chery' usado na página Marcas e filtros visuais.
- `client/public/marcas/chevrolet.png` — Logotipo da marca automóvel 'chevrolet' usado na página Marcas e filtros visuais.
- `client/public/marcas/chrysler.png` — Logotipo da marca automóvel 'chrysler' usado na página Marcas e filtros visuais.
- `client/public/marcas/citroen.png` — Logotipo da marca automóvel 'citroen' usado na página Marcas e filtros visuais.
- `client/public/marcas/cupra.png` — Logotipo da marca automóvel 'cupra' usado na página Marcas e filtros visuais.
- `client/public/marcas/dacia.png` — Logotipo da marca automóvel 'dacia' usado na página Marcas e filtros visuais.
- `client/public/marcas/daewoo.png` — Logotipo da marca automóvel 'daewoo' usado na página Marcas e filtros visuais.
- `client/public/marcas/daihatsu.png` — Logotipo da marca automóvel 'daihatsu' usado na página Marcas e filtros visuais.
- `client/public/marcas/dodge.png` — Logotipo da marca automóvel 'dodge' usado na página Marcas e filtros visuais.
- `client/public/marcas/ds-automobiles.png` — Logotipo da marca automóvel 'ds-automobiles' usado na página Marcas e filtros visuais.
- `client/public/marcas/ferrari.png` — Logotipo da marca automóvel 'ferrari' usado na página Marcas e filtros visuais.
- `client/public/marcas/fiat.png` — Logotipo da marca automóvel 'fiat' usado na página Marcas e filtros visuais.
- `client/public/marcas/fisker.png` — Logotipo da marca automóvel 'fisker' usado na página Marcas e filtros visuais.
- `client/public/marcas/ford.png` — Logotipo da marca automóvel 'ford' usado na página Marcas e filtros visuais.
- `client/public/marcas/genesis.png` — Logotipo da marca automóvel 'genesis' usado na página Marcas e filtros visuais.
- `client/public/marcas/gwm.png` — Logotipo da marca automóvel 'gwm' usado na página Marcas e filtros visuais.
- `client/public/marcas/honda.png` — Logotipo da marca automóvel 'honda' usado na página Marcas e filtros visuais.
- `client/public/marcas/hongqi.png` — Logotipo da marca automóvel 'hongqi' usado na página Marcas e filtros visuais.
- `client/public/marcas/hummer.png` — Logotipo da marca automóvel 'hummer' usado na página Marcas e filtros visuais.
- `client/public/marcas/hyundai.png` — Logotipo da marca automóvel 'hyundai' usado na página Marcas e filtros visuais.
- `client/public/marcas/infiniti.png` — Logotipo da marca automóvel 'infiniti' usado na página Marcas e filtros visuais.
- `client/public/marcas/isuzu.png` — Logotipo da marca automóvel 'isuzu' usado na página Marcas e filtros visuais.
- `client/public/marcas/iveco.png` — Logotipo da marca automóvel 'iveco' usado na página Marcas e filtros visuais.
- `client/public/marcas/jaecoo.svg` — Logotipo da marca automóvel 'jaecoo' usado na página Marcas e filtros visuais.
- `client/public/marcas/jaguar.png` — Logotipo da marca automóvel 'jaguar' usado na página Marcas e filtros visuais.
- `client/public/marcas/jeep.png` — Logotipo da marca automóvel 'jeep' usado na página Marcas e filtros visuais.
- `client/public/marcas/kia.png` — Logotipo da marca automóvel 'kia' usado na página Marcas e filtros visuais.
- `client/public/marcas/koenigsegg.png` — Logotipo da marca automóvel 'koenigsegg' usado na página Marcas e filtros visuais.
- `client/public/marcas/lada.png` — Logotipo da marca automóvel 'lada' usado na página Marcas e filtros visuais.
- `client/public/marcas/lamborghini.png` — Logotipo da marca automóvel 'lamborghini' usado na página Marcas e filtros visuais.
- `client/public/marcas/lancia.png` — Logotipo da marca automóvel 'lancia' usado na página Marcas e filtros visuais.
- `client/public/marcas/land-rover.png` — Logotipo da marca automóvel 'land-rover' usado na página Marcas e filtros visuais.
- `client/public/marcas/leapmotor.png` — Logotipo da marca automóvel 'leapmotor' usado na página Marcas e filtros visuais.
- `client/public/marcas/lexus.png` — Logotipo da marca automóvel 'lexus' usado na página Marcas e filtros visuais.
- `client/public/marcas/lotus.png` — Logotipo da marca automóvel 'lotus' usado na página Marcas e filtros visuais.
- `client/public/marcas/lucid.png` — Logotipo da marca automóvel 'lucid' usado na página Marcas e filtros visuais.
- `client/public/marcas/lynk-and-co.png` — Logotipo da marca automóvel 'lynk-and-co' usado na página Marcas e filtros visuais.
- `client/public/marcas/maserati.png` — Logotipo da marca automóvel 'maserati' usado na página Marcas e filtros visuais.
- `client/public/marcas/maxus.png` — Logotipo da marca automóvel 'maxus' usado na página Marcas e filtros visuais.
- `client/public/marcas/maybach.png` — Logotipo da marca automóvel 'maybach' usado na página Marcas e filtros visuais.
- `client/public/marcas/mazda.png` — Logotipo da marca automóvel 'mazda' usado na página Marcas e filtros visuais.
- `client/public/marcas/mclaren.png` — Logotipo da marca automóvel 'mclaren' usado na página Marcas e filtros visuais.
- `client/public/marcas/mercedes-benz.png` — Logotipo da marca automóvel 'mercedes-benz' usado na página Marcas e filtros visuais.
- `client/public/marcas/mg.png` — Logotipo da marca automóvel 'mg' usado na página Marcas e filtros visuais.
- `client/public/marcas/mini.png` — Logotipo da marca automóvel 'mini' usado na página Marcas e filtros visuais.
- `client/public/marcas/mitsubishi.png` — Logotipo da marca automóvel 'mitsubishi' usado na página Marcas e filtros visuais.
- `client/public/marcas/morgan.png` — Logotipo da marca automóvel 'morgan' usado na página Marcas e filtros visuais.
- `client/public/marcas/nissan.png` — Logotipo da marca automóvel 'nissan' usado na página Marcas e filtros visuais.
- `client/public/marcas/omoda.png` — Logotipo da marca automóvel 'omoda' usado na página Marcas e filtros visuais.
- `client/public/marcas/opel.png` — Logotipo da marca automóvel 'opel' usado na página Marcas e filtros visuais.
- `client/public/marcas/pagani.png` — Logotipo da marca automóvel 'pagani' usado na página Marcas e filtros visuais.
- `client/public/marcas/peugeot.png` — Logotipo da marca automóvel 'peugeot' usado na página Marcas e filtros visuais.
- `client/public/marcas/polestar.png` — Logotipo da marca automóvel 'polestar' usado na página Marcas e filtros visuais.
- `client/public/marcas/pontiac.png` — Logotipo da marca automóvel 'pontiac' usado na página Marcas e filtros visuais.
- `client/public/marcas/porsche.png` — Logotipo da marca automóvel 'porsche' usado na página Marcas e filtros visuais.
- `client/public/marcas/proton.png` — Logotipo da marca automóvel 'proton' usado na página Marcas e filtros visuais.
- `client/public/marcas/renault.png` — Logotipo da marca automóvel 'renault' usado na página Marcas e filtros visuais.
- `client/public/marcas/rivian.png` — Logotipo da marca automóvel 'rivian' usado na página Marcas e filtros visuais.
- `client/public/marcas/rolls-royce.png` — Logotipo da marca automóvel 'rolls-royce' usado na página Marcas e filtros visuais.
- `client/public/marcas/rover.png` — Logotipo da marca automóvel 'rover' usado na página Marcas e filtros visuais.
- `client/public/marcas/saab.png` — Logotipo da marca automóvel 'saab' usado na página Marcas e filtros visuais.
- `client/public/marcas/seat.png` — Logotipo da marca automóvel 'seat' usado na página Marcas e filtros visuais.
- `client/public/marcas/seres.png` — Logotipo da marca automóvel 'seres' usado na página Marcas e filtros visuais.
- `client/public/marcas/skoda.png` — Logotipo da marca automóvel 'skoda' usado na página Marcas e filtros visuais.
- `client/public/marcas/smart.png` — Logotipo da marca automóvel 'smart' usado na página Marcas e filtros visuais.
- `client/public/marcas/ssangyong.png` — Logotipo da marca automóvel 'ssangyong' usado na página Marcas e filtros visuais.
- `client/public/marcas/subaru.png` — Logotipo da marca automóvel 'subaru' usado na página Marcas e filtros visuais.
- `client/public/marcas/suzuki.png` — Logotipo da marca automóvel 'suzuki' usado na página Marcas e filtros visuais.
- `client/public/marcas/tesla.png` — Logotipo da marca automóvel 'tesla' usado na página Marcas e filtros visuais.
- `client/public/marcas/toyota.png` — Logotipo da marca automóvel 'toyota' usado na página Marcas e filtros visuais.
- `client/public/marcas/volkswagen.png` — Logotipo da marca automóvel 'volkswagen' usado na página Marcas e filtros visuais.
- `client/public/marcas/volvo.png` — Logotipo da marca automóvel 'volvo' usado na página Marcas e filtros visuais.
- `client/public/marcas/voyah.png` — Logotipo da marca automóvel 'voyah' usado na página Marcas e filtros visuais.
- `client/public/marcas/xpeng.png` — Logotipo da marca automóvel 'xpeng' usado na página Marcas e filtros visuais.
- `client/public/noxvelia-hero-coast.webp` — Asset público servido diretamente pelo frontend.
- `client/public/robots.txt` — Asset público servido diretamente pelo frontend.
- `client/public/sitemap.xml` — Asset público servido diretamente pelo frontend.
- `client/public/social/noxvelia-drive-page-card.png` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/social/noxvelia-drive-page-card-com.png` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/social/noxvelia-drive-photo.webp` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/social/noxvelia-drive-photo-premium.webp` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/social/noxvelia-estate-page-card.png` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/social/noxvelia-estate-page-card-com.png` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/social/noxvelia-estate-photo.webp` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/social/noxvelia-estate-photo-premium.webp` — Imagem social/marketing da NOXVELIA para partilha, pré-visualizações ou campanhas.
- `client/public/templates/importacao-stock-noxvelia.csv` — Template público para importação de stock por parceiros/stands.
- `client/public/three-portugal-preview.html` — Asset público servido diretamente pelo frontend.
- `client/readme` — Notas locais antigas do frontend.
- `client/render.yaml` — Configuração antiga/auxiliar de deploy do frontend em Render.
- `client/src/App.jsx` — Router principal do frontend; liga layouts, rotas públicas, privadas, admin e páginas principais.
- `client/src/components/AdBanner.jsx` — Componente React reutilizável: Ad Banner.
- `client/src/components/carros/NavbarCarro.jsx` — Componente React reutilizável: Navbar Carro.
- `client/src/components/CookieBanner.jsx` — Componente React reutilizável: Cookie Banner.
- `client/src/components/Footer.jsx` — Componente React reutilizável: Footer.
- `client/src/components/GoogleAdSlot.jsx` — Componente React reutilizável: Google Ad Slot.
- `client/src/components/GoogleAuthButton.jsx` — Componente React reutilizável: Google Auth Button.
- `client/src/components/imoveis/MapaResultados.jsx` — Componente React reutilizável: Mapa Resultados.
- `client/src/components/imoveis/NavbarImovel.jsx` — Componente React reutilizável: Navbar Imovel.
- `client/src/components/LoadingScreen.jsx` — Componente React reutilizável: Loading Screen.
- `client/src/components/MapaPerfil.jsx` — Componente React reutilizável: Mapa Perfil.
- `client/src/components/PageTransition.jsx` — Componente React reutilizável: Page Transition.
- `client/src/components/PremiumRoute.jsx` — Componente React reutilizável: Premium Route.
- `client/src/components/ProtectedRoute.jsx` — Componente React reutilizável: Protected Route.
- `client/src/components/SearchBar.jsx` — Componente React reutilizável: Search Bar.
- `client/src/components/Seo.jsx` — Componente React reutilizável: Seo.
- `client/src/components/TurnstileWidget.jsx` — Componente React reutilizável: Turnstile Widget.
- `client/src/context/AuthContext.jsx` — Context/provider React para estado global: Auth Context.
- `client/src/data/localizacoes.js` — Dados estáticos usados no frontend: localizacoes.
- `client/src/data/marcasModelos.js` — Dados estáticos usados no frontend: marcas Modelos.
- `client/src/hooks/useCookieConsent.jsx` — Hook React reutilizável: use Cookie Consent.
- `client/src/hooks/useDebounce.jsx` — Hook React reutilizável: use Debounce.
- `client/src/index.css` — Tokens globais, reset visual e estilos base do site.
- `client/src/main.jsx` — Ponto de entrada React; monta App, providers globais e estilos.
- `client/src/pages/admin/AdminBanners.jsx` — Página/área admin: Admin Banners.
- `client/src/pages/admin/AdminDashboard.jsx` — Página/área admin: Admin Dashboard.
- `client/src/pages/admin/AdminPostImages.jsx` — Página/área admin: Admin Post Images.
- `client/src/pages/admin/AdminStockIntegrations.jsx` — Página/área admin: Admin Stock Integrations.
- `client/src/pages/admin/AdminStockSubmissions.jsx` — Página/área admin: Admin Stock Submissions.
- `client/src/pages/admin/PartnershipEmails.jsx` — Página/área admin: Partnership Emails.
- `client/src/pages/auth/ResetPassword.jsx` — Página React da aplicação: Reset Password.
- `client/src/pages/carros/PesquisaCarro.jsx` — Página React da aplicação: Pesquisa Carro.
- `client/src/pages/imoveis/PesquisaImovel.jsx` — Página React da aplicação: Pesquisa Imovel.
- `client/src/pages/shared/Anuncio.jsx` — Página de detalhe do anúncio: galeria, contactos, WhatsApp, publicidade lateral, vendedor, avaliação por estrelas única por utilizador e média pública do vendedor.
- `client/src/pages/shared/AnuncioCard.jsx` — Página partilhada do site/aplicação: Anuncio Card.
- `client/src/pages/shared/Editar.jsx` — Página partilhada do site/aplicação: Editar.
- `client/src/pages/shared/Favoritos.jsx` — Página partilhada do site/aplicação: Favoritos.
- `client/src/pages/shared/ForgotPassword.jsx` — Página partilhada do site/aplicação: Forgot Password.
- `client/src/pages/shared/Landing.css` — Estilos da landing minimalista clara, incluindo Noxvelia Lens, notícias, TikTok, carVertical e responsividade.
- `client/src/pages/shared/Landing.jsx` — Landing pública: hero, pesquisa central, categorias, notícias de mercado, secção TikTok com consentimento externo, anúncios recentes e CTAs comerciais.
- `client/src/pages/shared/LandingListingsCarousel.jsx` — Página partilhada do site/aplicação: Landing Listings Carousel.
- `client/src/pages/shared/Login.jsx` — Página partilhada do site/aplicação: Login.
- `client/src/pages/shared/Mensagens.jsx` — Página partilhada do site/aplicação: Mensagens.
- `client/src/pages/shared/NavbarLanding.jsx` — Página partilhada do site/aplicação: Navbar Landing.
- `client/src/pages/shared/Notificacoes.jsx` — Página partilhada do site/aplicação: Notificacoes.
- `client/src/pages/shared/Patrocinios.jsx` — Página partilhada do site/aplicação: Patrocinios.
- `client/src/pages/shared/Perfil.jsx` — Página partilhada do site/aplicação: Perfil.
- `client/src/pages/shared/PerfilPublico.jsx` — Página partilhada do site/aplicação: Perfil Publico.
- `client/src/pages/shared/Pesquisa.jsx` — Página partilhada do site/aplicação: Pesquisa.
- `client/src/pages/shared/Planos.jsx` — Página partilhada do site/aplicação: Planos.
- `client/src/pages/shared/PoliticaPrivacidade.jsx` — Página partilhada do site/aplicação: Politica Privacidade.
- `client/src/pages/shared/PremiumConfirmar.jsx` — Página partilhada do site/aplicação: Premium Confirmar.
- `client/src/pages/shared/ProfileView.jsx` — Página partilhada do site/aplicação: Profile View.
- `client/src/pages/shared/Profissionais.jsx` — Página partilhada do site/aplicação: Profissionais.
- `client/src/pages/shared/Publicar.jsx` — Página partilhada do site/aplicação: Publicar.
- `client/src/pages/shared/Registo.jsx` — Página partilhada do site/aplicação: Registo.
- `client/src/pages/shared/SeoPesquisa.jsx` — Página partilhada do site/aplicação: Seo Pesquisa.
- `client/src/pages/shared/SobreNos.jsx` — Página partilhada do site/aplicação: Sobre Nos.
- `client/src/pages/shared/StockSubmeter.jsx` — Página partilhada do site/aplicação: Stock Submeter.
- `client/src/pages/shared/SucessoUpsell.jsx` — Página partilhada do site/aplicação: Sucesso Upsell.
- `client/src/pages/shared/UserMenu.jsx` — Página partilhada do site/aplicação: User Menu.
- `client/src/pages/shared/VerificarEmail.jsx` — Página partilhada do site/aplicação: Verificar Email.
- `client/src/services/api.js` — Cliente Axios centralizado para comunicar com a API NOXVELIA.
- `client/src/utils/anuncioQuality.js` — Utilitário frontend: anuncio Quality.
- `client/src/utils/authSession.js` — Utilitário frontend: auth Session.
- `client/src/utils/clientMonitoring.js` — Utilitário frontend: client Monitoring.
- `client/src/utils/cookieConsent.js` — Utilitário frontend: cookie Consent.
- `client/src/utils/extras.js` — Utilitário frontend: extras.
- `client/src/utils/funnelAnalytics.js` — Utilitário frontend: funnel Analytics.
- `client/src/utils/googleAdsense.js` — Utilitário frontend: google Adsense.
- `client/src/utils/images.js` — Utilitário frontend: images.
- `client/src/utils/navigationState.js` — Utilitário frontend: navigation State.
- `client/src/utils/seo.js` — Utilitário frontend: seo.
- `client/src/utils/videoEmbed.js` — Utilitário frontend: video Embed.
- `client/tailwind.config.js` — Ficheiro do projeto: tailwind.config.
- `client/tests/seo.test.js` — Ficheiro do projeto: seo.test.
- `client/vite.config.js` — Ficheiro do projeto: vite.config.
- `data/autoscout24-noxvelia-pt.csv` — Ficheiro CSV de exemplo/dados de importação.
- `docs/ADSENSE.md` — Documentação técnica/operacional: ADSENSE.
- `docs/ANALYTICS.md` — Documentação técnica/operacional: ANALYTICS.
- `docs/AUTOSCOUT24_IMPORT.md` — Documentação técnica/operacional: AUTOSCOUT24 IMPORT.
- `docs/DEPLOY.md` — Documentação técnica/operacional: DEPLOY.
- `docs/IMAGE_STORAGE.md` — Documentação técnica/operacional: IMAGE STORAGE.
- `docs/importacao-stock-noxvelia.csv` — Documentação técnica/operacional: importacao stock noxvelia.
- `docs/NOXVELIA_PROMPT_COMPLETO.md` — Este documento mestre: prompt completo, arquitetura, comandos e inventário do projeto.
- `docs/PARTNERSHIP_EMAILS.md` — Documentação técnica/operacional: PARTNERSHIP EMAILS.
- `docs/SECURITY.md` — Documentação técnica/operacional: SECURITY.
- `docs/social/noxvelia-post-template/assets/centro-anuncios-simples.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/assets/centro-exemplo.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/assets/logo-Noxvelia.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/assets/page-card-drive-bg.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/assets/page-card-estate-bg.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/output/noxvelia-drive-page-card.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/output/noxvelia-drive-page-card-com.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/output/noxvelia-estate-page-card.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/output/noxvelia-estate-page-card-com.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/output/noxvelia-post.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/post-config.json` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/README.md` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/render-page-cards.ps1` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/noxvelia-post-template/render-post.ps1` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/stock-importacao/noxvelia-stock-instagram-post.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/stock-importacao/noxvelia-stock-instagram-post.svg` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/stock-importacao/noxvelia-stock-instagram-story.png` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/social/stock-importacao/noxvelia-stock-instagram-story.svg` — Material/documentação de apoio para redes sociais e comunicação.
- `docs/SPONSORS.md` — Documentação técnica/operacional: SPONSORS.
- `findstr` — Ficheiro do projeto: findstr.
- `noxvelia-post-images/.gitignore` — Ficheiro do projeto: .
- `noxvelia-post-images/examples/posts.json` — Ficheiro JSON de configuração ou dados.
- `noxvelia-post-images/package.json` — Ficheiro JSON de configuração ou dados.
- `noxvelia-post-images/README.md` — Documento Markdown do projeto.
- `noxvelia-post-images/scripts/create-batch.mjs` — Ficheiro do projeto: create batch.
- `noxvelia-post-images/scripts/create-brand-post.mjs` — Ficheiro do projeto: create brand post.
- `noxvelia-post-images/scripts/create-car-post.mjs` — Ficheiro do projeto: create car post.
- `noxvelia-post-images/scripts/create-property-post.mjs` — Ficheiro do projeto: create property post.
- `noxvelia-post-images/scripts/lib/postImageRenderer.mjs` — Ficheiro do projeto: post Image Renderer.
- `README.md` — Resumo inicial do projeto NOXVELIA.
- `server/.env.example` — Modelo seguro das variáveis privadas necessárias na VPS/produção.
- `server/.gitignore` — Ficheiro do projeto: .
- `server/assets/noxvelia-watermark.png` — Ficheiro do projeto: noxvelia watermark.
- `server/config/imageStorage.js` — Configuração backend: image Storage.
- `server/controllers/authController.js` — Ficheiro do projeto: auth Controller.
- `server/controllers/iaController.js` — Ficheiro do projeto: ia Controller.
- `server/controllers/mensagemController.js` — Ficheiro do projeto: mensagem Controller.
- `server/controllers/notificacaoController.js` — Ficheiro do projeto: notificacao Controller.
- `server/iaWorker.js` — Ficheiro do projeto: ia Worker.
- `server/index.js` — Entrada da API Express; liga middleware, CSP/Helmet, rotas, MongoDB, jobs e servidor HTTP.
- `server/middleware/auth.js` — Middleware Express para auth.
- `server/middleware/cron.js` — Middleware Express para cron.
- `server/middleware/errorHandler.js` — Middleware Express para error Handler.
- `server/middleware/metrics.js` — Middleware Express para metrics.
- `server/middleware/turnstile.js` — Middleware Express para turnstile.
- `server/middleware/upload.js` — Middleware Express para upload.
- `server/middleware/validacao.js` — Middleware Express para validacao.
- `server/migrations/20260714_image_assets.js` — Ficheiro do projeto: 20260714 image assets.
- `server/migrations/20260714_partnership_emails.js` — Ficheiro do projeto: 20260714 partnership emails.
- `server/migrations/20260715_partnership_send_uniqueness.js` — Ficheiro do projeto: 20260715 partnership send uniqueness.
- `server/migrations/20260717_funnel_events.js` — Ficheiro do projeto: 20260717 funnel events.
- `server/migrations/runMigrations.js` — Ficheiro do projeto: run Migrations.
- `server/models/Alerta.js` — Modelo Mongoose/MongoDB para Alerta.
- `server/models/Anuncio.js` — Modelo Mongoose/MongoDB para Anuncio.
- `server/models/AnuncioView.js` — Modelo Mongoose/MongoDB para Anuncio View.
- `server/models/Avaliacao.js` — Modelo Mongoose para avaliações de vendedor; uma avaliação ativa por avaliador/anunciante, usada para recalcular média e total no User.
- `server/models/BannerPatrocinado.js` — Modelo Mongoose/MongoDB para Banner Patrocinado.
- `server/models/ClientIssue.js` — Modelo Mongoose/MongoDB para Client Issue.
- `server/models/Conversa.js` — Modelo Mongoose/MongoDB para Conversa.
- `server/models/FunnelEvent.js` — Modelo Mongoose/MongoDB para Funnel Event.
- `server/models/ImageAsset.js` — Modelo Mongoose/MongoDB para Image Asset.
- `server/models/Mensagem.js` — Modelo Mongoose/MongoDB para Mensagem.
- `server/models/Migration.js` — Modelo Mongoose/MongoDB para Migration.
- `server/models/Notificacao.js` — Modelo Mongoose/MongoDB para Notificacao.
- `server/models/Pagamento.js` — Modelo Mongoose/MongoDB para Pagamento.
- `server/models/PartnershipAuditLog.js` — Modelo Mongoose/MongoDB para Partnership Audit Log.
- `server/models/PartnershipCampaign.js` — Modelo Mongoose/MongoDB para Partnership Campaign.
- `server/models/PartnershipContact.js` — Modelo Mongoose/MongoDB para Partnership Contact.
- `server/models/PartnershipEmailSend.js` — Modelo Mongoose/MongoDB para Partnership Email Send.
- `server/models/PartnershipReply.js` — Modelo Mongoose/MongoDB para Partnership Reply.
- `server/models/PartnershipSettings.js` — Modelo Mongoose/MongoDB para Partnership Settings.
- `server/models/PartnershipSuppression.js` — Modelo Mongoose/MongoDB para Partnership Suppression.
- `server/models/PartnershipWebhookEvent.js` — Modelo Mongoose/MongoDB para Partnership Webhook Event.
- `server/models/StockImportLog.js` — Modelo Mongoose/MongoDB para Stock Import Log.
- `server/models/StockIntegration.js` — Modelo Mongoose/MongoDB para Stock Integration.
- `server/models/StockSubmission.js` — Modelo Mongoose/MongoDB para Stock Submission.
- `server/models/User.js` — Modelo Mongoose/MongoDB para User.
- `server/package.json` — Dependências e scripts do backend Node/Express.
- `server/package-lock.json` — Lockfile que fixa versões das dependências npm do backend.
- `server/routes/admin.js` — Rotas Express da API para admin.
- `server/routes/adminBanners.js` — Rotas Express da API para admin Banners.
- `server/routes/adminPartnerships.js` — Rotas Express da API para admin Partnerships.
- `server/routes/adminStockIntegrations.js` — Rotas Express da API para admin Stock Integrations.
- `server/routes/alertas.js` — Rotas Express da API para alertas.
- `server/routes/analytics.js` — Rotas Express da API para analytics.
- `server/routes/anuncios.js` — Rotas Express da API para anuncios.
- `server/routes/auth.js` — Rotas Express da API para auth.
- `server/routes/banners.js` — Rotas Express da API para banners.
- `server/routes/ia.js` — Rotas Express da API para ia.
- `server/routes/marketNews.js` — Rotas Express da API para market News.
- `server/routes/media.js` — Rotas Express da API para media.
- `server/routes/mensagemRoutes.js` — Rotas Express da API para mensagem Routes.
- `server/routes/mensagens.js` — Rotas Express da API para mensagens.
- `server/routes/notificacoes.js` — Rotas Express da API para notificacoes.
- `server/routes/pagamentos.js` — Rotas Express da API para pagamentos.
- `server/routes/partnerships.js` — Rotas Express da API para partnerships.
- `server/routes/stockSubmissions.js` — Rotas Express da API para stock Submissions.
- `server/routes/stripe.js` — Rotas Express da API para stripe.
- `server/routes/system.js` — Rotas Express da API para system.
- `server/routes/upload.js` — Rotas Express da API para upload.
- `server/routes/users.js` — Rotas Express da API para users.
- `server/scripts/cleanupImages.js` — Script operacional/backend para cleanup Images.
- `server/scripts/convertAutoscout24ToNoxveliaCsv.js` — Script operacional/backend para convert Autoscout24 To Noxvelia Csv.
- `server/scripts/migrateCloudinaryImages.js` — Script operacional/backend para migrate Cloudinary Images.
- `server/scripts/seedDemoListings.js` — Script operacional/backend para seed Demo Listings.
- `server/services/contentProcessor.js` — Serviço backend para content Processor.
- `server/services/emailService.js` — Serviço backend para email Service.
- `server/services/imageProcessor.js` — Serviço backend para image Processor.
- `server/services/imageService.js` — Serviço backend para image Service.
- `server/services/imageStorage.js` — Serviço backend para image Storage.
- `server/services/marketNewsService.js` — Serviço backend para market News Service.
- `server/services/partnershipAudit.js` — Serviço backend para partnership Audit.
- `server/services/partnershipCampaignService.js` — Serviço backend para partnership Campaign Service.
- `server/services/partnershipConfig.js` — Serviço backend para partnership Config.
- `server/services/partnershipCsv.js` — Serviço backend para partnership Csv.
- `server/services/partnershipEmailUtils.js` — Serviço backend para partnership Email Utils.
- `server/services/partnershipEvents.js` — Serviço backend para partnership Events.
- `server/services/partnershipMailer.js` — Serviço backend para partnership Mailer.
- `server/services/partnershipTemplate.js` — Serviço backend para partnership Template.
- `server/services/partnershipWorker.js` — Serviço backend para partnership Worker.
- `server/services/premiumService.js` — Serviço backend para premium Service.
- `server/services/stockImportService.js` — Serviço backend para stock Import Service.
- `server/services/stripe.js` — Serviço backend para stripe.
- `server/tests/funnelAnalytics.test.js` — Teste automatizado backend para funnel Analytics.test.
- `server/tests/imageStorage.test.js` — Teste automatizado backend para image Storage.test.
- `server/tests/partnershipEmails.test.js` — Teste automatizado backend para partnership Emails.test.
- `server/tests/utils.test.js` — Teste automatizado backend para utils.test.
- `server/utils/anuncioInsights.js` — Utilitário backend: anuncio Insights.
- `server/utils/anuncioNormalize.js` — Utilitário backend: anuncio Normalize.
- `server/utils/jwt.js` — Utilitário backend: jwt.
- `server/utils/pagination.js` — Utilitário backend: pagination.
- `server/utils/seo.js` — Utilitário backend: seo.

## Atualização visual - navy shell e card premium (2026-08-14)
- A NOXVELIA passou a usar navbar e footer em navy #102f50, com texto claro e separadores champagne, seguindo uma presença mais forte e menos frágil.
- O CTA principal de publicação nas navbars usa dourado/champagne #d9c49c com texto navy, apresentado como ação de destaque para criar anúncio.
- Os cards de anúncio ganharam moldura mais marcada; os anúncios em destaque usam contorno navy com aro champagne e badge champagne, mantendo transparência sem usar rótulos enganosos de plano.
- A grelha de pesquisa foi ajustada para aproveitar melhor a largura em desktop e eliminar o limite visual que deixava os resultados demasiado estreitos quando os filtros estavam ocultos.
