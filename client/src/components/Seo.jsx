import React from 'react';
import { Helmet } from 'react-helmet-async';
import { absoluteUrl, SITE_URL } from '../utils/seo';

export default function Seo({
  title,
  description,
  path = '/',
  image = `${SITE_URL}/logo-noxvelia.png`,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  const canonical = absoluteUrl(path);
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:site_name" content="Noxvelia" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schemas.filter(Boolean).map((schema, index) => (
        <script type="application/ld+json" key={index}>{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}

