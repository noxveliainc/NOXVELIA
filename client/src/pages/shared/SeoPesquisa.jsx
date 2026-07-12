import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Seo from '../../components/Seo';
import Pesquisa from './Pesquisa';
import { absoluteUrl, slugify } from '../../utils/seo';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';

const titleCase = (value = '') => value.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

export default function SeoPesquisa({ tipo }) {
  const params = useParams();
  const cidade = titleCase(params.cidade);
  const marca = MARCAS.find((item) => slugify(item) === params.marca) || titleCase(params.marca);
  const modeloEncontrado = (getModelosPorMarca(marca) || []).find((item) => slugify(item.modelo) === params.modelo);
  const modelo = modeloEncontrado?.modelo || titleCase(params.modelo);
  const tipologia = String(params.tipologia || '').toUpperCase();
  const isCarro = tipo === 'carro';
  const query = new URLSearchParams();
  if (params.marca) query.set('marca', marca);
  if (params.modelo) query.set('modelo', modelo);
  if (params.cidade) query.set('cidade', cidade);
  if (params.tipologia) query.set('tipologia', tipologia);

  if (!params.cidade && !params.marca && !params.tipologia) return <Navigate to={isCarro ? '/carros' : '/imoveis'} replace />;

  const path = isCarro
    ? `/carros/${slugify(marca)}${params.modelo ? `/${slugify(modelo)}` : ''}${params.cidade ? `/${slugify(cidade)}` : ''}`
    : `/imoveis/${slugify(tipologia)}/${slugify(cidade)}`;
  const subject = isCarro
    ? [marca, modelo, cidade && `em ${cidade}`].filter(Boolean).join(' ')
    : `${tipologia} em ${cidade}`;
  const title = `${isCarro ? 'Carros' : 'Imóveis'} ${subject} | Noxvelia`;
  const description = `Encontra ${isCarro ? 'carros' : 'imóveis'} ${subject} na Noxvelia. Compara anúncios, preços e contacta vendedores em Portugal.`;
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: absoluteUrl(path),
  };

  return <><Seo title={title} description={description} path={path} jsonLd={itemList} /><Pesquisa tipoPadrao={tipo} seoParams={query} /></>;
}
