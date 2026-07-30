import 'dotenv/config';
import mongoose from 'mongoose';
import Anuncio from '../models/Anuncio.js';
import User from '../models/User.js';
import { calcularQualidadeAnuncio } from '../utils/anuncioInsights.js';

const DEMO_EMAIL = (process.env.NOXVELIA_DEMO_EMAIL || 'demo@noxvelia.com').toLowerCase();
const DEMO_PASSWORD = process.env.NOXVELIA_DEMO_PASSWORD || 'NoxveliaDemo2026!';
const LOGO_IMAGE = '/logo-noxvelia.png';

const hojeIso = () => new Date().toISOString().slice(0, 10);

const diasAtras = (dias) => {
  const data = new Date();
  data.setUTCDate(data.getUTCDate() - dias);
  return data.toISOString().slice(0, 10);
};

const historico = (valores) => valores.map((quantidade, index) => ({
  data: diasAtras(valores.length - index - 1),
  quantidade,
}));

const telefoneLivre = async () => {
  for (let i = 1; i <= 99; i += 1) {
    const telefone = `900000${String(i).padStart(3, '0')}`;
    const existe = await User.exists({ telefone, email: { $ne: DEMO_EMAIL } });
    if (!existe) return telefone;
  }
  throw new Error('Não foi possível encontrar um telefone demo livre.');
};

const obterVendedorDemo = async () => {
  let vendedor = await User.findOne({ email: DEMO_EMAIL });

  if (!vendedor) {
    vendedor = new User({
      nome: 'Perfil interno de testes',
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      telefone: await telefoneLivre(),
      mostrarTelefonePublico: true,
      localidade: 'Porto',
      standNome: 'Noxvelia Porto',
      standMorada: 'Avenida dos Aliados',
      standCodigoPostal: '4000-064',
      mostrarMapaPerfil: true,
      tipo: 'cliente',
      tipoConta: 'profissional',
      premiumAtivo: false,
      limiteAnuncios: 4,
      avatarUrl: LOGO_IMAGE,
      capaUrl: '/noxvelia-hero-coast.webp',
      website: 'https://www.noxvelia.com',
      bio: 'Perfil interno usado apenas para testes controlados de anúncios automóveis e imóveis.',
      linksPerfil: [{ tipo: 'website', url: 'https://www.noxvelia.com' }],
      rating: 0,
      totalAvaliacoes: 0,
      verificado: false,
    });
    await vendedor.save();
    return vendedor;
  }

  vendedor.nome = vendedor.nome || 'Perfil interno de testes';
  vendedor.tipoConta = 'profissional';
  vendedor.premiumAtivo = false;
  vendedor.limiteAnuncios = Math.max(Number(vendedor.limiteAnuncios || 0), 4);
  vendedor.avatarUrl = vendedor.avatarUrl || LOGO_IMAGE;
  vendedor.capaUrl = vendedor.capaUrl || '/noxvelia-hero-coast.webp';
  vendedor.localidade = vendedor.localidade || 'Porto';
  vendedor.standNome = vendedor.standNome || 'Noxvelia Porto';
  vendedor.standMorada = vendedor.standMorada || 'Avenida dos Aliados';
  vendedor.standCodigoPostal = vendedor.standCodigoPostal || '4000-064';
  vendedor.mostrarMapaPerfil = true;
  vendedor.website = vendedor.website || 'https://www.noxvelia.com';
  vendedor.bio = vendedor.bio || 'Perfil interno usado apenas para testes controlados de anúncios automóveis e imóveis.';
  vendedor.linksPerfil = Array.isArray(vendedor.linksPerfil) && vendedor.linksPerfil.length
    ? vendedor.linksPerfil
    : [{ tipo: 'website', url: 'https://www.noxvelia.com' }];
  vendedor.rating = 0;
  vendedor.totalAvaliacoes = 0;
  vendedor.verificado = false;
  await vendedor.save();
  return vendedor;
};

const baseAnuncio = (vendedor, overrides) => {
  const anuncio = {
    fotos: [LOGO_IMAGE],
    telefone: vendedor.telefone,
    email: vendedor.email,
    utilizador: vendedor._id,
    estado: 'ativo',
    planoPublicacao: overrides.destacado ? 'premium' : 'basico',
    dataExpiracaoDestaque: overrides.destacado ? null : undefined,
    ...overrides,
  };
  return { ...anuncio, ...calcularQualidadeAnuncio(anuncio) };
};

const anunciosDemo = (vendedor) => [
  baseAnuncio(vendedor, {
    tipo: 'carro',
    titulo: 'BMW Serie 3 320d Pack M em Lisboa',
    descricao: 'Automóvel de demonstração com apresentação premium, histórico organizado, contacto direto e informação essencial visível para comparação rápida.',
    preco: 21900,
    destacado: true,
    garantia: '12 meses',
    aceitaRetoma: true,
    visitas: 184,
    guardados: 18,
    contactos: 9,
    historicoVisitas: historico([12, 18, 21, 24, 30, 36, 43]),
    localizacao: { cidade: 'Lisboa', distrito: 'Lisboa', coordenadas: { lat: 38.7223, lng: -9.1393 } },
    carro: { marca: 'BMW', modelo: 'Serie 3', versao: '320d Pack M', ano: 2020, km: 78000, combustivel: 'diesel', transmissao: 'automatico', cilindrada: 1995, potencia: 190, cor: 'Azul', portas: 5, lugares: 5, tracao: 'traseira', seccao: 'usado', tipoVeiculo: 'sedan' },
    equipamento: ['GPS', 'Camara traseira', 'Sensores estacionamento', 'Jantes liga leve', 'Bluetooth'],
  }),
  baseAnuncio(vendedor, {
    tipo: 'carro',
    titulo: 'Renault Clio 1.5 dCi no Porto',
    descricao: 'Automóvel económico de demonstração, indicado para mostrar um anúncio normal sem destaque dentro da pesquisa de carros.',
    preco: 8750,
    destacado: false,
    garantia: null,
    aceitaRetoma: false,
    visitas: 67,
    guardados: 5,
    contactos: 2,
    historicoVisitas: historico([3, 5, 7, 8, 11, 14, 19]),
    localizacao: { cidade: 'Porto', distrito: 'Porto', coordenadas: { lat: 41.1579, lng: -8.6291 } },
    carro: { marca: 'Renault', modelo: 'Clio', versao: '1.5 dCi', ano: 2018, km: 126000, combustivel: 'diesel', transmissao: 'manual', cilindrada: 1461, potencia: 90, cor: 'Branco', portas: 5, lugares: 5, tracao: 'dianteira', seccao: 'usado', tipoVeiculo: 'utilitario' },
    equipamento: ['Bluetooth', 'Ar condicionado', 'Cruise control'],
  }),
  baseAnuncio(vendedor, {
    tipo: 'imovel',
    titulo: 'T2 renovado no Porto com garagem',
    descricao: 'Imóvel de demonstração com destaque, pensado para mostrar uma ficha clara com localização, preço, tipologia e características essenciais logo no cartão.',
    preco: 245000,
    destacado: true,
    visitas: 156,
    guardados: 22,
    contactos: 11,
    historicoVisitas: historico([9, 14, 18, 22, 27, 31, 35]),
    localizacao: { cidade: 'Porto', distrito: 'Porto', coordenadas: { lat: 41.1579, lng: -8.6291 } },
    imovel: { tipoImovel: 'apartamento', tipologia: 'T2', area: 92, quartos: 2, casasBanho: 2, garagem: true, varanda: true, elevador: true, anoConstrucao: 2017, estadoConservacao: 'Renovado', certificadoEnergetico: 'B' },
    equipamento: ['Garagem', 'Varanda', 'Elevador', 'Suite', 'Cozinha equipada'],
  }),
  baseAnuncio(vendedor, {
    tipo: 'imovel',
    titulo: 'Moradia T3 em Braga com jardim',
    descricao: 'Imóvel de demonstração sem destaque para comparação direta com o anúncio premium dentro da zona de imóveis.',
    preco: 319000,
    destacado: false,
    visitas: 72,
    guardados: 8,
    contactos: 3,
    historicoVisitas: historico([4, 7, 8, 10, 13, 14, 16]),
    localizacao: { cidade: 'Braga', distrito: 'Braga', coordenadas: { lat: 41.5454, lng: -8.4265 } },
    imovel: { tipoImovel: 'moradia', tipologia: 'T3', area: 168, areaTerreno: 420, quartos: 3, casasBanho: 3, garagem: true, jardim: true, varanda: true, anoConstrucao: 2012, estadoConservacao: 'Usado', certificadoEnergetico: 'C' },
    equipamento: ['Jardim', 'Garagem', 'Lareira', 'Terraço'],
  }),
];

const upsertAnuncio = async (payload) => {
  const query = { utilizador: payload.utilizador, titulo: payload.titulo };
  const update = {
    $set: {
      ...payload,
      updatedAt: new Date(),
    },
    $setOnInsert: {
      createdAt: new Date(),
    },
  };
  return Anuncio.findOneAndUpdate(query, update, { upsert: true, new: true, setDefaultsOnInsert: true });
};

const main = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI em falta.');
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });

  const vendedor = await obterVendedorDemo();
  const anuncios = anunciosDemo(vendedor);
  const gravados = [];

  for (const anuncio of anuncios) {
    gravados.push(await upsertAnuncio(anuncio));
  }

  console.log(`[demo:seed] Vendedor: ${vendedor.email}`);
  console.log(`[demo:seed] Data: ${hojeIso()}`);
  console.log(`[demo:seed] Anúncios criados/atualizados: ${gravados.length}`);
  for (const anuncio of gravados) {
    console.log(`[demo:seed] ${anuncio.tipo} | ${anuncio.destacado ? 'destacado' : 'normal'} | ${anuncio.titulo}`);
  }

  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error(`[demo:seed] Erro fatal: ${error.message}`);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});