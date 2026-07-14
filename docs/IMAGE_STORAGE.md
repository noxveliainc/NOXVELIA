# Sistema de imagens Noxvelia

## Arquitetura

A Noxvelia deixou de enviar imagens para Cloudinary. O fluxo novo é:

1. o frontend envia `multipart/form-data` para `POST /api/upload/imagens`;
2. o backend autentica o utilizador e aplica rate limit;
3. `multer` recebe os ficheiros em memória com limites conservadores;
4. `sharp` valida o conteúdo real, corrige orientação, remove metadados desnecessários, converte para WebP e gera variantes;
5. `imageStorage` guarda as variantes em storage local ou storage compatível com S3;
6. `ImageAsset` guarda metadados, chaves de storage, variantes, checksum e associação ao dono;
7. o frontend recebe apenas DTOs públicos com URLs finais e usa a variante adequada.

As rotas de negócio não conhecem o fornecedor de storage. Usam `server/services/imageService.js`, que por sua vez usa `server/services/imageStorage.js`.

## Storage escolhido

O projeto está preparado para Render. Como o filesystem normal do serviço pode ser recriado em deploys, a configuração recomendada em produção é `IMAGE_STORAGE_DRIVER=s3` com Cloudflare R2, Amazon S3, Backblaze B2 ou MinIO.

O driver `local` existe para desenvolvimento local ou para ambientes com disco persistente configurado explicitamente.

## Ficheiros principais

- `server/config/imageStorage.js`: limites, tipos aceites e variantes.
- `server/middleware/upload.js`: receção multipart em memória.
- `server/routes/upload.js`: API autenticada de upload e eliminação.
- `server/routes/media.js`: entrega pública de imagens com cache e proteção de path traversal.
- `server/services/imageProcessor.js`: validação e processamento com Sharp.
- `server/services/imageStorage.js`: adaptadores local e S3.
- `server/services/imageService.js`: criação, associação, DTO público e eliminação.
- `server/models/ImageAsset.js`: metadados e variantes.
- `server/migrations/20260714_image_assets.js`: índices da coleção.
- `server/scripts/migrateCloudinaryImages.js`: migração idempotente a partir de Cloudinary.
- `server/scripts/cleanupImages.js`: limpeza de imagens temporárias antigas.
- `client/src/utils/images.js`: escolha da variante correta no frontend.

## Formatos e limites

Aceites:

- JPEG;
- PNG;
- WebP.

Rejeitados:

- SVG em uploads de utilizador;
- GIF animado;
- MIME ou extensão que não corresponda ao conteúdo real;
- imagens vazias, excessivamente grandes ou com demasiados píxeis.

Valores por defeito:

- `IMAGE_MAX_UPLOAD_BYTES=12582912`;
- `IMAGE_MAX_PIXEL_COUNT=24000000`;
- `IMAGE_MAX_FILES_PER_REQUEST=10`;
- `IMAGE_MAX_IMAGES_PER_LISTING=10`;
- `IMAGE_WEBP_QUALITY=82`;
- `IMAGE_THUMBNAIL_QUALITY=74`;
- `IMAGE_PROCESSING_CONCURRENCY=2`.

## Variantes geradas

Anúncios:

- `original`: WebP até 1920 px;
- `large`: WebP até 1280 px;
- `medium`: WebP até 800 px;
- `thumbnail`: WebP 400 x 300 com crop.

Avatares:

- `original`: WebP 512 x 512 com crop;
- `thumbnail`: WebP 160 x 160 com crop.

Capas:

- `original`: WebP até 1600 x 900;
- `large`: WebP até 1200 x 675;
- `thumbnail`: WebP 480 x 270.

Logótipos:

- `original`: WebP até 1024 px;
- `thumbnail`: WebP até 320 px.

AVIF não foi adicionado para manter a operação simples; WebP continua a ser o formato obrigatório.

## Estrutura das chaves

As chaves não usam nomes enviados pelo utilizador. O sistema gera UUIDs:

```text
images/listings/{listingId}/{imageId}/large.webp
images/listings/{listingId}/{imageId}/medium.webp
images/listings/{listingId}/{imageId}/thumbnail.webp
images/avatars/{userId}/{imageId}/original.webp
images/covers/{userId}/{imageId}/large.webp
images/companies/{companyId}/{imageId}/thumbnail.webp
```

Enquanto uma imagem de anúncio ainda não pertence a um anúncio criado, fica como `ownerType=temporary`. Depois da criação/edição, é associada ao anúncio.

## Variáveis de ambiente

Obrigatórias/recomendadas no backend:

```env
IMAGE_STORAGE_DRIVER=s3
IMAGE_STORAGE_PATH=storage/images
IMAGE_PUBLIC_BASE_URL=https://noxvelia.onrender.com/api/media
IMAGE_MAX_UPLOAD_BYTES=12582912
IMAGE_MAX_PIXEL_COUNT=24000000
IMAGE_MAX_IMAGES_PER_LISTING=10
IMAGE_MAX_FILES_PER_REQUEST=10
IMAGE_WEBP_QUALITY=82
IMAGE_THUMBNAIL_QUALITY=74
IMAGE_PROCESSING_CONCURRENCY=2

S3_ENDPOINT=
S3_REGION=auto
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_PUBLIC_BASE_URL=
S3_FORCE_PATH_STYLE=false
```

Para desenvolvimento local pode ser usado:

```env
IMAGE_STORAGE_DRIVER=local
IMAGE_PUBLIC_BASE_URL=http://localhost:4000/api/media
IMAGE_STORAGE_PATH=storage/images
```

Nunca colocar `S3_SECRET_ACCESS_KEY` ou credenciais equivalentes no frontend.

## Render

Em produção no Render, usar `IMAGE_STORAGE_DRIVER=s3` salvo se existir Persistent Disk configurado para o backend.

Opção recomendada:

1. criar um bucket S3/R2/B2;
2. criar credenciais só para esse bucket;
3. colocar as variáveis `S3_*` no serviço backend;
4. definir `IMAGE_PUBLIC_BASE_URL` como a rota pública da API ou como domínio/CDN público do bucket;
5. executar migrations;
6. testar upload de uma imagem pequena;
7. confirmar que as URLs novas deixam de apontar para Cloudinary.

## CDN

Pode ser usada Cloudflare ou outra CDN desde que:

- o browser envie sempre primeiro para o backend;
- o backend valide e converta;
- a CDN sirva apenas ficheiros finais;
- as chaves sejam imutáveis.

A rota `/api/media/*` já envia:

- `Content-Type: image/webp`;
- `Content-Length`;
- `Cache-Control: public, max-age=31536000, immutable`;
- `ETag`;
- `X-Content-Type-Options: nosniff`.

## Migração

O script de migração não apaga Cloudinary.

Dry-run:

```bash
cd server
npm run images:migrate
```

Aplicar:

```bash
cd server
npm run images:migrate -- --apply
```

Limitar lote:

```bash
cd server
npm run images:migrate -- --limit=100
```

Migrar só anúncios ou só utilizadores:

```bash
cd server
npm run images:migrate -- --only=listings --limit=100
npm run images:migrate -- --only=users --limit=100
```

O script:

- encontra URLs `https://res.cloudinary.com/...`;
- descarrega apenas HTTPS do host Cloudinary esperado;
- valida Content-Type;
- reprocessa pela mesma pipeline de upload;
- guarda `legacySourceUrl`;
- reutiliza imagens já migradas;
- atualiza `Anuncio.fotos` para DTOs com variantes;
- atualiza `User.avatarUrl` e `User.capaUrl` para URLs novas;
- imprime relatório final.

## Validação pós-migração

1. confirmar que novos anúncios têm `fotos` com `urls.large`, `urls.medium` e `urls.thumbnail`;
2. abrir página de anúncio, pesquisa, landing, mapa, perfil e mensagens;
3. confirmar que imagens antigas ainda aparecem durante o período de transição;
4. pesquisar referências Cloudinary no projeto e na base de dados;
5. só depois considerar apagar assets antigos no Cloudinary.

## Limpeza

Dry-run de imagens temporárias antigas:

```bash
cd server
npm run images:cleanup
```

Aplicar limpeza de temporárias com mais de 7 dias:

```bash
cd server
npm run images:cleanup -- --apply --days=7
```

Limitar o lote:

```bash
cd server
npm run images:cleanup -- --apply --days=7 --limit=200
```

A limpeza remove todas as variantes através de `deleteImageAsset` e faz soft delete no registo.

## Backups e rollback

Antes de correr `--apply`:

1. fazer backup da base de dados;
2. manter Cloudinary intacto;
3. correr `images:migrate` em dry-run;
4. aplicar por lotes pequenos;
5. validar amostras.

Rollback possível enquanto Cloudinary existir:

- restaurar backup da base de dados;
- ou reverter campos `fotos`, `avatarUrl` e `capaUrl` a partir do backup;
- não executar limpeza definitiva no Cloudinary até concluir validação manual.

## Testes e validação local

Backend:

```bash
cd server
npm test
npm run check
```

Frontend:

```bash
cd client
npm run lint
npm run build
```

Não existe script TypeScript/typecheck dedicado porque o projeto atual é JavaScript/React.

## Limitações conhecidas

- A migração por URL só aceita `res.cloudinary.com`, porque não foi criada funcionalidade genérica de importação por URL.
- O script de migração ainda processa de forma sequencial e conservadora. Para volumes muito altos, correr por lotes com `--limit`.
- O driver local só deve ser usado em produção se houver disco persistente garantido.
- Deduplicação por checksum é registada, mas não reutiliza automaticamente imagens entre utilizadores diferentes por segurança de autorização e eliminação.
