import React from 'react';
import { Helmet } from 'react-helmet-async';
import { absoluteUrl, SITE_LOGO_URL, SITE_NAME } from '../utils/seo';

export default function Seo({
  title,
  description,
  path = '/',
  image = SITE_LOGO_URL,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  // Limpar Query Strings para evitar Duplicate Content no Google (Canonical Tag)
  const cleanPath = path.split('?')[0];
  const canonical = absoluteUrl(cleanPath);
  
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="author" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      
      <link rel="canonical" href={canonical} />
      
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:site_name" content={SITE_NAME} />
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