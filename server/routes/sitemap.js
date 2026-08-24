router.get('/sitemap-anuncios.xml', async (req, res) => {
  const anuncios = await Anuncio.find({ ativo: true }).select('_id categoria updatedAt').lean();

  const urls = anuncios.map(a => `
    <url>
      <loc>https://www.noxvelia.com/${a.categoria}/${a._id}</loc>
      <lastmod>${new Date(a.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`).join('');

  res.header('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
});