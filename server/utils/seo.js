export const slugify = (value = '') => String(value)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'portugal';

export const anuncioPath = (anuncio) => {
  const city = slugify(anuncio?.localizacao?.cidade);
  if (anuncio?.tipo === 'carro') return `/carros/${slugify(anuncio?.carro?.marca)}/${slugify(anuncio?.carro?.modelo)}/${city}/${anuncio._id}`;
  return `/imoveis/${slugify(anuncio?.imovel?.tipoImovel || anuncio?.imovel?.tipologia)}/${city}/${anuncio._id}`;
};

