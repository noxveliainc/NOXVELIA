import test from 'node:test';
import assert from 'node:assert/strict';
import { funnelEventSchema } from '../routes/analytics.js';

test('aceita um evento de funil com dados mínimos seguros', () => {
  const result = funnelEventSchema.safeParse({
    event: 'listing_view',
    sessionId: 'sessao-1234567890123456',
    path: '/anuncio/507f1f77bcf86cd799439011',
    vertical: 'imovel',
    listingId: '507f1f77bcf86cd799439011',
  });

  assert.equal(result.success, true);
});

test('rejeita eventos desconhecidos e identificadores de sessão curtos', () => {
  const result = funnelEventSchema.safeParse({
    event: 'password_dump',
    sessionId: 'short',
  });

  assert.equal(result.success, false);
});

test('não aceita conteúdo HTML ou campos arbitrários no payload', () => {
  const result = funnelEventSchema.safeParse({
    event: 'landing_view',
    sessionId: 'sessao-1234567890123456',
    path: '<script>alert(1)</script>',
    extra: 'não deve entrar',
  });

  assert.equal(result.success, false);
});
