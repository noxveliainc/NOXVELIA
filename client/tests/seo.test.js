import test from 'node:test';
import assert from 'node:assert/strict';
import { anuncioPath, slugify } from '../src/utils/seo.js';

test('slugify normaliza acentos e espaços', () => assert.equal(slugify('Série 3 — Porto'), 'serie-3-porto'));
test('gera URL legível para carro', () => assert.equal(anuncioPath({ _id: 'abc', tipo: 'carro', carro: { marca: 'BMW', modelo: 'Série 3' }, localizacao: { cidade: 'Porto' } }), '/carros/bmw/serie-3/porto/abc'));
test('gera URL legível para imóvel', () => assert.equal(anuncioPath({ _id: 'xyz', tipo: 'imovel', imovel: { tipoImovel: 'Apartamento' }, localizacao: { cidade: 'Vila Nova de Gaia' } }), '/imoveis/apartamento/vila-nova-de-gaia/xyz'));

