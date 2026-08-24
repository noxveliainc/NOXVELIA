import { getImageUrl } from './images';

export const SITE_URL = 'https://www.noxvelia.com';
export const SITE_NAME = 'Noxvelia';
export const SITE_ALTERNATE_NAMES = ['NOXVELIA'];
export const SITE_DESCRIPTION = 'Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis sem comissões.';
export const SITE_LOGO_URL = `${SITE_URL}/logo-noxvelia.png`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const slugify = (value = '') => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'portugal';

export const anuncioPath = (anuncio) => {
  const id = anuncio?._id || anuncio?.id;
  if (!id) return anuncio?.tipo === 'imovel' ? '/imoveis' : '/carros';
  const cidade = slugify(anuncio?.localizacao?.cidade);
  if (anuncio?.tipo === 'carro') {
    return `/carros/${slugify(anuncio?.carro?.marca)}/${slugify(anuncio?.carro?.modelo)}/${cidade}/${id}`;
  }
  return `/imoveis/${slugify(anuncio?.imovel?.tipoImovel || anuncio?.imovel?.tipologia)}/${cidade}/${id}`;
};

// --- ESTRUTURAS BÁSICAS (JSON-LD) ---
export const siteIdentityJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: { '@type': 'ImageObject', url: SITE_LOGO_URL },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      publisher: { '@id': ORGANIZATION_ID },
      inLanguage: 'pt-PT',
    },
  ],
};

export const homePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: `${SITE_NAME} | Carros e imóveis em Portugal`,
  description: SITE_DESCRIPTION,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
  inLanguage: 'pt-PT',
};

// --- RICH SNIPPETS (SCHEMA.ORG) PARA GOOGLE ---
export const generateVehicleSchema = (anuncio) => {
  if (!anuncio || anuncio.tipo !== 'carro') return null;
  const fotoUrl = anuncio.fotos?.length ? getImageUrl(anuncio.fotos[0], 'large') : SITE_LOGO_URL;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: anuncio.titulo,
    description: anuncio.descricao?.slice(0, 300),
    image: fotoUrl,
    brand: { '@type': 'Brand', name: anuncio.carro?.marca || 'Automóvel' },
    model: anuncio.carro?.modelo,
    vehicleConfiguration: anuncio.carro?.versao,
    modelDate: anuncio.carro?.ano,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: anuncio.carro?.km, unitCode: 'KMT' },
    fuelType: anuncio.carro?.combustivel,
    vehicleTransmission: anuncio.carro?.transmissao,
    color: anuncio.carro?.cor,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(anuncioPath(anuncio)),
      priceCurrency: 'EUR',
      price: anuncio.preco,
      itemCondition: anuncio.carro?.km > 500 ? 'https://schema.org/UsedCondition' : 'https://schema.org/NewCondition',
      availability: anuncio.estado === 'ativo' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      seller: {
        '@type': (anuncio.utilizador?.tipoConta === 'profissional' || anuncio.utilizador?.tipo === 'admin') ? 'Organization' : 'Person',
        name: anuncio.utilizador?.nome || 'Vendedor Noxvelia'
      }
    }
  };
};

export const generateRealEstateSchema = (anuncio) => {
  if (!anuncio || anuncio.tipo !== 'imovel') return null;
  const fotoUrl = anuncio.fotos?.length ? getImageUrl(anuncio.fotos[0], 'large') : SITE_LOGO_URL;
  
  // Apartamentos e Moradias têm schemas específicos no Google
  let tipoImovelSchema = 'RealEstateListing';
  if (anuncio.imovel?.tipoImovel?.toLowerCase() === 'apartamento') tipoImovelSchema = 'Apartment';
  if (anuncio.imovel?.tipoImovel?.toLowerCase() === 'moradia') tipoImovelSchema = 'SingleFamilyResidence';

  return {
    '@context': 'https://schema.org',
    '@type': tipoImovelSchema,
    name: anuncio.titulo,
    description: anuncio.descricao?.slice(0, 300),
    image: fotoUrl,
    numberOfRooms: anuncio.imovel?.quartos,
    floorSize: { '@type': 'QuantitativeValue', value: anuncio.imovel?.area, unitCode: 'MTK' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: anuncio.localizacao?.cidade,
      addressRegion: anuncio.localizacao?.distrito,
      addressCountry: 'PT'
    },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(anuncioPath(anuncio)),
      priceCurrency: 'EUR',
      price: anuncio.preco,
      availability: anuncio.estado === 'ativo' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      seller: {
        '@type': (anuncio.utilizador?.tipoConta === 'profissional' || anuncio.utilizador?.tipo === 'admin') ? 'Organization' : 'Person',
        name: anuncio.utilizador?.nome || 'Vendedor Noxvelia'
      }
    }
  };
};

// --- GERADOR DINÂMICO DE LONG-TAIL SEO ---
export const generateSearchSeoMeta = (tipo, filtros = {}) => {
  const { marca, modelo, cidade, distrito, tipoImovel, tipologia } = filtros;
  
  const loc = cidade ? `em ${cidade}` : (distrito && distrito !== 'Todos' ? `em ${distrito}` : 'em Portugal');

  if (tipo === 'carro') {
    const veiculo = [marca, modelo].filter(Boolean).join(' ').trim() || 'Carros Usados e Novos';
    return {
      title: `${veiculo} ${loc} - Preços e Anúncios | Noxvelia`,
      description: `Procuras ${veiculo} ${loc}? Descobre as melhores oportunidades no portal automóvel Noxvelia. Fala direto com o vendedor pelo WhatsApp, sem intermediários.`
    };
  } else {
    const imovel = [tipologia, tipoImovel || 'Imóveis'].filter(Boolean).join(' ').trim();
    return {
      title: `${imovel} para venda ${loc} | Noxvelia`,
      description: `Encontra ${imovel} para comprar ${loc}. Consulta preços, áreas e fotos na Noxvelia. Negócios sem comissões e contacto direto via WhatsApp.`
    };
  }
};