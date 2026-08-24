import express from 'express';
import Anuncio from '../models/Anuncio.js';

const router = express.Router();
const SITE_URL = 'https://www.noxvelia.com';

// Mesma lógica de slugify usada em client/src/utils/seo.js — mantém sincronizado se um mudar
const slugify = (value = '') => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'portugal';

const anuncioPath = (anuncio) => {
  const id = anuncio._id;
  const cidade = slugify(anuncio.localizacao?.cidade);
  if (anuncio.tipo === 'carro') {
    return `/carros/${slugify(anuncio.carro?.marca)}/${slugify(anuncio.carro?.modelo)}/${cidade}/${id}`;
  }
  return `/imoveis/${slugify(anuncio.imovel?.tipoImovel || anuncio.imovel?.tipologia)}/${cidade}/${id}`;
};

router.get('/sitemap-anuncios.xml', async (req, res) => {
  try {
    const anuncios = await Anuncio.find({ estado: 'ativo' })
      .select('_id tipo carro.marca carro.modelo imovel.tipoImovel imovel.tipologia localizacao.cidade updatedAt')
      .lean();

    const urls = anuncios.map((a) => `
  <url>
    <loc>${SITE_URL}${anuncioPath(a)}</loc>
    <lastmod>${new Date(a.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

    res.header('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`);
  } catch (err) {
    res.status(500).send('Erro ao gerar sitemap de anúncios.');
  }
});

export default router;