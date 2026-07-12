export const SITE_URL = 'https://www.noxvelia.com';

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

