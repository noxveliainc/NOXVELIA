const contarPalavras = (texto = '') => String(texto)
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

const arredondar = (valor) => Math.round(valor * 10) / 10;

export function calcularQualidadeFormulario(form = {}, fotos = [], equipamento = []) {
  const totalFotos = Array.isArray(fotos) ? fotos.filter(Boolean).length : 0;
  const palavrasDescricao = contarPalavras(form.descricao);
  const extras = Array.isArray(equipamento) ? equipamento.filter(Boolean).length : 0;
  const isCarro = form.tipo === 'carro';

  const fotosScore = totalFotos >= 8 ? 2 : totalFotos >= 4 ? 1.6 : totalFotos >= 2 ? 1.1 : totalFotos >= 1 ? 0.6 : 0;
  const descricaoScore = palavrasDescricao >= 80 ? 2 : palavrasDescricao >= 35 ? 1.4 : palavrasDescricao >= 12 ? 0.8 : 0;
  const precoScore = Number(form.preco) > 0 ? 1 : 0;
  const localizacaoScore = form.cidade && form.distrito ? 1.2 : form.cidade || form.distrito ? 0.6 : 0;

  const camposTecnicos = isCarro
    ? [form.marca, form.modelo, form.ano, form.km, form.combustivel, form.transmissao, form.cilindrada, form.potencia, form.vin]
    : [form.tipoImovel, form.tipologia, form.area, form.quartos, form.casasBanho, form.certEnergetico, form.garagem];

  const tecnicosPreenchidos = camposTecnicos.filter((valor) => valor !== undefined && valor !== null && valor !== '').length;
  const extrasScore = Math.min(2, (extras >= 5 ? 0.8 : extras >= 2 ? 0.5 : extras >= 1 ? 0.25 : 0) + Math.min(1.2, tecnicosPreenchidos * 0.18));
  const disponibilidadeScore = Math.min(1.8,
    (form.telefone ? 0.5 : 0) +
    (form.email ? 0.4 : 0) +
    (form.videoUrl ? 0.35 : 0) +
    (form.garantia ? 0.3 : 0) +
    (form.aceitaRetoma ? 0.25 : 0)
  );

  const detalhes = {
    fotos: arredondar(fotosScore),
    descricao: arredondar(descricaoScore),
    preco: arredondar(precoScore),
    localizacao: arredondar(localizacaoScore),
    extras: arredondar(extrasScore),
    disponibilidade: arredondar(disponibilidadeScore),
  };

  const score = Math.min(10, arredondar(Object.values(detalhes).reduce((total, valor) => total + valor, 0)));
  const percentagem = Math.round((score / 10) * 100);
  const sugestoes = [];

  if (totalFotos < 4) sugestoes.push('Adiciona pelo menos 4 fotografias claras.');
  if (palavrasDescricao < 35) sugestoes.push('Escreve uma descricao com mais contexto e detalhes.');
  if (!form.cidade || !form.distrito) sugestoes.push('Completa distrito e cidade para aparecer melhor na pesquisa.');
  if (isCarro && !form.vin) sugestoes.push('Se tiveres VIN, adiciona-o para aumentar a confianca.');
  if (!isCarro && !form.area) sugestoes.push('Indica a area para facilitar a comparacao.');
  if (!extras) sugestoes.push(isCarro ? 'Adiciona equipamento relevante.' : 'Adiciona caracteristicas do imovel.');

  return {
    score,
    percentagem,
    detalhes,
    sugestoes: sugestoes.slice(0, 3),
    nivel: score >= 8 ? 'Excelente' : score >= 6 ? 'Forte' : score >= 4 ? 'Razoavel' : 'Inicial',
  };
}
