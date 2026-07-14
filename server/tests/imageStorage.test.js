import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { normalizeImageKind } from '../config/imageStorage.js';
import { assertUploadFileLooksSafe } from '../services/imageProcessor.js';
import { extractImageUrls, publicImageDto } from '../services/imageService.js';

test('configuracao de imagens normaliza tipos suportados', () => {
  assert.equal(normalizeImageKind('anuncio'), 'listing');
  assert.equal(normalizeImageKind('perfil'), 'avatar');
  assert.equal(normalizeImageKind('capa'), 'cover');
  assert.equal(normalizeImageKind('empresa'), 'logo');
  assert.equal(normalizeImageKind('desconhecido'), 'listing');
});

test('validacao rejeita uploads perigosos antes do processamento', () => {
  assert.throws(
    () => assertUploadFileLooksSafe({ buffer: Buffer.from('x'), mimetype: 'image/svg+xml', originalname: 'x.svg' }),
    /SVG nao e aceite/
  );
  assert.throws(
    () => assertUploadFileLooksSafe({ buffer: Buffer.from('x'), mimetype: 'image/gif', originalname: 'animado.gif' }),
    /GIF animado/
  );
  assert.throws(
    () => assertUploadFileLooksSafe({ buffer: Buffer.from('x'), mimetype: 'text/html', originalname: 'x.html' }),
    /Formato de imagem nao suportado/
  );
});

test('DTO publico e extracao preservam variantes e URLs legadas', () => {
  const asset = {
    _id: '64f000000000000000000001',
    width: 1280,
    height: 720,
    blurDataURL: 'data:image/webp;base64,AAAA',
    altText: 'Noxvelia',
    variants: [
      { name: 'large', url: 'https://cdn.noxvelia.com/images/a/large.webp', width: 1280, height: 720, sizeBytes: 10, mimeType: 'image/webp' },
      { name: 'thumbnail', url: 'https://cdn.noxvelia.com/images/a/thumb.webp', width: 400, height: 300, sizeBytes: 4, mimeType: 'image/webp' },
    ],
  };

  const dto = publicImageDto(asset);
  assert.equal(dto.urls.large, 'https://cdn.noxvelia.com/images/a/large.webp');
  assert.equal(dto.urls.thumbnail, 'https://cdn.noxvelia.com/images/a/thumb.webp');

  const urls = extractImageUrls(['https://antigo.example/foto.jpg', dto]);
  assert.ok(urls.includes('https://antigo.example/foto.jpg'));
  assert.ok(urls.includes('https://cdn.noxvelia.com/images/a/large.webp'));
  assert.ok(urls.includes('https://cdn.noxvelia.com/images/a/thumb.webp'));
});

test('upload de imagens usa memoria, autenticacao e processamento no servidor', async () => {
  const middleware = await readFile(new URL('../middleware/upload.js', import.meta.url), 'utf8');
  const route = await readFile(new URL('../routes/upload.js', import.meta.url), 'utf8');

  assert.match(middleware, /multer\.memoryStorage/);
  assert.match(route, /router\.post\('\/imagens', verificarToken/);
  assert.match(route, /uploadImageFile/);
  assert.doesNotMatch(middleware, /cloudinary/i);
  assert.doesNotMatch(route, /cloudinary/i);
});

test('rota publica de media protege chaves de storage', async () => {
  const route = await readFile(new URL('../routes/media.js', import.meta.url), 'utf8');

  assert.match(route, /key\.includes\('..'\)/);
  assert.match(route, /key\.startsWith\('images\/'\)/);
  assert.match(route, /key\.endsWith\('\.webp'\)/);
  assert.match(route, /imageContentHeaders/);
});

test('scripts de imagens sao seguros por defeito e idempotentes', async () => {
  const migrate = await readFile(new URL('../scripts/migrateCloudinaryImages.js', import.meta.url), 'utf8');
  const cleanup = await readFile(new URL('../scripts/cleanupImages.js', import.meta.url), 'utf8');

  assert.match(migrate, /dryRun = !args\.has\('--apply'\)/);
  assert.match(migrate, /legacySourceUrl/);
  assert.match(migrate, /res\.cloudinary\.com/);
  assert.match(cleanup, /dryRun = !args\.has\('--apply'\)/);
  assert.match(cleanup, /ownerType: 'temporary'/);
});

test('ficheiro antigo de integracao Cloudinary foi removido', async () => {
  await assert.rejects(
    () => access(new URL('../services/cloudinary.js', import.meta.url)),
    /ENOENT/
  );
});
