export const SITE_URL = 'https://www.noxvelia.com';
export const SITE_NAME = 'Noxvelia';
export const SITE_ALTERNATE_NAMES = ['NOXVELIA', 'Noxvelia Portugal'];
export const SITE_DESCRIPTION = 'Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.';
export const SITE_LOGO_URL = `${SITE_URL}/logo-noxvelia.png`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const siteIdentityJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL,
      },
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

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
