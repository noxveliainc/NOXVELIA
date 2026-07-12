import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePagination } from '../utils/pagination.js';
import { anuncioPath, slugify } from '../utils/seo.js';

test('paginação rejeita valores inválidos e limita resultados', () => {
  assert.deepEqual(parsePagination({ page: '-2', limit: '999' }), { page: 1, limit: 50, skip: 0 });
  assert.deepEqual(parsePagination({ page: '3', limit: '12' }), { page: 3, limit: 12, skip: 24 });
});
test('SEO normaliza texto português', () => assert.equal(slugify('Automóvel Elétrico'), 'automovel-eletrico'));
test('SEO gera caminho canónico', () => assert.equal(anuncioPath({ _id: '1', tipo: 'carro', carro: { marca: 'Mercedes-Benz', modelo: 'Classe A' }, localizacao: { cidade: 'Lisboa' } }), '/carros/mercedes-benz/classe-a/lisboa/1'));

