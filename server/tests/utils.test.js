import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePagination } from '../utils/pagination.js';
import { anuncioPath, slugify } from '../utils/seo.js';
import { normalizarCarro, normalizarEquipamento } from '../utils/anuncioNormalize.js';

test('paginação rejeita valores inválidos e limita resultados', () => {
  assert.deepEqual(parsePagination({ page: '-2', limit: '999' }), { page: 1, limit: 50, skip: 0 });
  assert.deepEqual(parsePagination({ page: '3', limit: '12' }), { page: 3, limit: 12, skip: 24 });
});
test('SEO normaliza texto português', () => assert.equal(slugify('Automóvel Elétrico'), 'automovel-eletrico'));
test('SEO gera caminho canónico', () => assert.equal(anuncioPath({ _id: '1', tipo: 'carro', carro: { marca: 'Mercedes-Benz', modelo: 'Classe A' }, localizacao: { cidade: 'Lisboa' } }), '/carros/mercedes-benz/classe-a/lisboa/1'));



test('normaliza campos completos de automovel', () => {
  const carro = normalizarCarro({
    marca: ' Volkswagen ',
    modelo: 'Passat Variant',
    versao: '1.9 TDI Highline',
    mesRegisto: '4',
    ano: '2004',
    km: '359515',
    transmissao: 'Manual',
    cilindrada: '1896',
    potencia: '130',
    cor: 'Preto',
    portas: '5',
    lugares: '5',
    combustivel: 'Diesel',
    traccao: 'Dianteira',
    seccao: 'usado',
    tipoDeVeiculo: 'Carrinha',
  }, { obrigatorio: true });

  assert.deepEqual(carro, {
    marca: 'Volkswagen',
    modelo: 'Passat Variant',
    versao: '1.9 TDI Highline',
    ano: 2004,
    mesRegisto: 4,
    km: 359515,
    combustivel: 'diesel',
    transmissao: 'manual',
    cilindrada: 1896,
    potencia: 130,
    cor: 'Preto',
    portas: 5,
    lugares: 5,
    tracao: 'dianteira',
    seccao: 'usado',
    tipoVeiculo: 'carrinha',
    relatorioCarfax: false,
  });
});

test('normalizacao de automovel rejeita valores fora dos limites', () => {
  assert.throws(
    () => normalizarCarro({ marca: 'VW', modelo: 'Golf', ano: '1900', mesRegisto: 4, km: 0, combustivel: 'diesel', transmissao: 'manual', cilindrada: 1900, potencia: 100, portas: 5, lugares: 5, tracao: 'dianteira', seccao: 'usado', tipoVeiculo: 'carrinha' }, { obrigatorio: true }),
    /Ano deve estar entre/
  );
  assert.throws(
    () => normalizarCarro({ combustivel: 'vapor' }),
    /Combustível inválido/
  );
});

test('normalizacao de equipamento separa listas importadas', () => {
  assert.deepEqual(normalizarEquipamento('GPS; Camara traseira\nSensores estacionamento • Jantes especiais'), [
    'GPS',
    'Camara traseira',
    'Sensores estacionamento',
    'Jantes especiais',
  ]);
});