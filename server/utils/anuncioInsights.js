const numeroValido = (valor) => Number.isFinite(Number(valor)) && Number(valor) > 0;

const contarPalavras = (texto = '') => String(texto)
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

const arredondar = (valor) => Math.round(valor * 10) / 10;

export function calcularQualidadeAnuncio(anuncio = {}) {
  const fotos = Array.isArray(anuncio.fotos) ? anuncio.fotos.filter(Boolean).length : 0;
  const palavrasDescricao = contarPalavras(anuncio.descricao);
  const extras = Array.isArray(anuncio.equipamento) ? anuncio.equipamento.filter(Boolean).length : 0;
  const isCarro = anuncio.tipo === 'carro';
  const isImovel = anuncio.tipo === 'imovel';

  const fotosScore = fotos >= 8 ? 2 : fotos >= 4 ? 1.6 : fotos >= 2 ? 1.1 : fotos >= 1 ? 0.6 : 0;
  const descricaoScore = palavrasDescricao >= 80 ? 2 : palavrasDescricao >= 35 ? 1.4 : palavrasDescricao >= 12 ? 0.8 : 0;
  const precoScore = numeroValido(anuncio.preco) ? 1 : 0;
  const localizacaoScore = anuncio.localizacao?.cidade && anuncio.localizacao?.distrito
    ? 1.2
    : anuncio.localizacao?.cidade || anuncio.localizacao?.distrito
      ? 0.6
      : 0;

  const camposTecnicos = isCarro
    ? [
        anuncio.carro?.marca,
        anuncio.carro?.modelo,
        anuncio.carro?.ano,
        anuncio.carro?.km,
        anuncio.carro?.combustivel,
        anuncio.carro?.transmissao,
        anuncio.carro?.cilindrada,
        anuncio.carro?.potencia,
        anuncio.carro?.vin,
      ]
    : isImovel
      ? [
          anuncio.imovel?.tipoImovel,
          anuncio.imovel?.tipologia,
          anuncio.imovel?.area,
          anuncio.imovel?.quartos,
          anuncio.imovel?.casasBanho,
          anuncio.imovel?.certificadoEnergetico,
          anuncio.imovel?.garagem,
        ]
      : [];

  const tecnicosPreenchidos = camposTecnicos.filter((valor) => valor !== undefined && valor !== null && valor !== '').length;
  const extrasScore = Math.min(2, (extras >= 5 ? 0.8 : extras >= 2 ? 0.5 : extras >= 1 ? 0.25 : 0) + Math.min(1.2, tecnicosPreenchidos * 0.18));

  const disponibilidadeScore = Math.min(1.8,
    (anuncio.telefone ? 0.5 : 0) +
    (anuncio.email ? 0.4 : 0) +
    (anuncio.videoUrl || anuncio.visitaVirtualUrl ? 0.35 : 0) +
    (anuncio.garantia ? 0.3 : 0) +
    (anuncio.aceitaRetoma ? 0.25 : 0)
  );

  const scoreDetalhes = {
    fotos: arredondar(fotosScore),
    descricao: arredondar(descricaoScore),
    preco: arredondar(precoScore),
    localizacao: arredondar(localizacaoScore),
    extras: arredondar(extrasScore),
    disponibilidade: arredondar(disponibilidadeScore),
  };

  const scoreQualidade = Math.min(10, arredondar(Object.values(scoreDetalhes).reduce((total, valor) => total + valor, 0)));

  return { scoreQualidade, scoreDetalhes };
}

export function analisarPreco(preco, resumoPreco) {
  const valor = Number(preco);
  const media = Number(resumoPreco?.media);
  const amostra = Number(resumoPreco?.amostra || resumoPreco?.count || 0);

  if (!Number.isFinite(valor) || valor <= 0 || !Number.isFinite(media) || media <= 0 || amostra < 3) {
    return null;
  }

  const diferenca = (valor - media) / media;
  const percentagem = Math.round(Math.abs(diferenca) * 100);

  if (diferenca <= -0.08) {
    return {
      estado: 'baixo',
      label: 'Abaixo da media',
      detalhe: `${percentagem}% abaixo da media desta pesquisa`,
      media: Math.round(media),
      amostra,
    };
  }

  if (diferenca >= 0.12) {
    return {
      estado: 'alto',
      label: 'Acima da media',
      detalhe: `${percentagem}% acima da media desta pesquisa`,
      media: Math.round(media),
      amostra,
    };
  }

  return {
    estado: 'justo',
    label: 'Preco justo',
    detalhe: 'Dentro da media desta pesquisa',
    media: Math.round(media),
    amostra,
  };
}
