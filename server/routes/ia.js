import express from 'express';
import { ai } from '../services/gemini.js';
import Anuncio from '../models/Anuncio.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

async function chamarGemini({ system, user }) {
  if (!ai) {
    throw new Error('Serviço de IA não configurado no servidor.');
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: user,
    config: {
      systemInstruction: system,
      responseMimeType: 'application/json',
      temperature: 0.2,
    }
  });

  return response.text;
}

// 1. PESQUISA POR LINGUAGEM NATURAL
router.post('/search', verificarToken, async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query || query.trim().length < 3) {
      return res.status(400).json({ erro: 'Pesquisa demasiado curta. Escreve pelo menos 3 caracteres.' });
    }

    const systemPrompt = `És um assistente especializado em imobiliário e automóveis em Portugal.
A tua única função é extrair filtros de pesquisa de texto livre em português e devolvê-los em JSON.
Respondes SEMPRE com JSON puro e válido, sem markdown, sem explicações.`;

    const userPrompt = `Pesquisa do utilizador: "${query}"

Extrai os filtros e devolve APENAS este JSON (usa null nos campos que não se aplicam):
{
  "tipo": "imovel" | "carro" | null,
  "preco": { "min": number | null, "max": number | null },
  "cidade": string | null,
  "distrito": string | null,
  "imovel": {
    "tipologia": "T0"|"T1"|"T2"|"T3"|"T4"|"T5+" | null,
    "tipoImovel": "apartamento"|"moradia"|"terreno"|"quintal"|"garagem"|"escritorio" | null,
    "quartos": number | null,
    "casasBanho": number | null,
    "garagem": boolean | null,
    "piscina": boolean | null,
    "jardim": boolean | null,
    "elevador": boolean | null,
    "areaMin": number | null,
    "areaMax": number | null,
    "andarMin": number | null,
    "condominio": boolean | null
  },
  "carro": {
    "marca": string | null,
    "modelo": string | null,
    "kmMax": number | null,
    "anoMin": number | null,
    "anoMax": number | null,
    "combustivel": "gasolina"|"diesel"|"eletrico"|"hibrido"|"gpl" | null,
    "transmissao": "manual"|"automatica" | null,
    "potenciaMin": number | null,
    "numPortas": number | null,
    "cor": string | null
  },
  "ordenacao": "preco_asc"|"preco_desc"|"mais_recente"|"melhor_score" | null,
  "resumo": "frase curta (máx 12 palavras) explicando o que o utilizador quer"
}

Regras importantes:
- "dois quartos" = quartos: 2, tipologia: "T2"
- "barato" ou "económico" sem valor = preco.max: 150000 para imóveis, 15000 para carros
- "luxo" ou "premium" sem valor = preco.min: 500000 para imóveis, 50000 para carros
- Nomes de cidades e distritos devem estar em português de Portugal
- Para carros elétricos: combustivel = "eletrico"`;

    const textoJson = await chamarGemini({ system: systemPrompt, user: userPrompt });
    const filtros = JSON.parse(textoJson);

    const mongoQuery = { estado: 'ativo', apagadoEm: null };

    if (filtros.tipo) mongoQuery.tipo = filtros.tipo;

    if (filtros.preco?.min != null || filtros.preco?.max != null) {
      mongoQuery.preco = {};
      if (filtros.preco.min != null) mongoQuery.preco.$gte = filtros.preco.min;
      if (filtros.preco.max != null) mongoQuery.preco.$lte = filtros.preco.max;
    }

    if (filtros.cidade) mongoQuery['localizacao.cidade'] = new RegExp(filtros.cidade, 'i');
    if (filtros.distrito) mongoQuery['localizacao.distrito'] = new RegExp(filtros.distrito, 'i');

    if (filtros.tipo === 'imovel' && filtros.imovel) {
      const im = filtros.imovel;
      if (im.tipologia)   mongoQuery['imovel.tipologia']   = im.tipologia;
      if (im.tipoImovel)  mongoQuery['imovel.tipoImovel']  = im.tipoImovel;
      if (im.quartos)     mongoQuery['imovel.quartos']     = { $gte: im.quartos };
      if (im.casasBanho)  mongoQuery['imovel.casasBanho']  = { $gte: im.casasBanho };
      if (im.garagem)     mongoQuery['imovel.garagem']     = true;
      if (im.piscina)     mongoQuery['imovel.piscina']     = true;
      if (im.jardim)      mongoQuery['imovel.jardim']      = true;
      if (im.elevador)    mongoQuery['imovel.elevador']    = true;
      if (im.condominio)  mongoQuery['imovel.condominio']  = true;
      if (im.areaMin != null || im.areaMax != null) {
        mongoQuery['imovel.area'] = {};
        if (im.areaMin != null) mongoQuery['imovel.area'].$gte = im.areaMin;
        if (im.areaMax != null) mongoQuery['imovel.area'].$lte = im.areaMax;
      }
    }

    if (filtros.tipo === 'carro' && filtros.carro) {
      const cr = filtros.carro;
      if (cr.marca)       mongoQuery['carro.marca']       = new RegExp(cr.marca, 'i');
      if (cr.modelo)      mongoQuery['carro.modelo']      = new RegExp(cr.modelo, 'i');
      if (cr.combustivel) mongoQuery['carro.combustivel'] = cr.combustivel;
      if (cr.transmissao) mongoQuery['carro.transmissao'] = cr.transmissao;
      if (cr.cor)         mongoQuery['carro.cor']         = new RegExp(cr.cor, 'i');
      if (cr.kmMax != null)       mongoQuery['carro.km']       = { $lte: cr.kmMax };
      if (cr.anoMin != null)      mongoQuery['carro.ano']      = { $gte: cr.anoMin };
      if (cr.anoMax != null)      mongoQuery['carro.ano']      = { ...mongoQuery['carro.ano'], $lte: cr.anoMax };
      if (cr.potenciaMin != null) mongoQuery['carro.potencia'] = { $gte: cr.potenciaMin };
      if (cr.numPortas != null)   mongoQuery['carro.numPortas'] = cr.numPortas;
    }

    const sortMap = {
      preco_asc:    { preco: 1 },
      preco_desc:   { preco: -1 },
      mais_recente: { createdAt: -1 },
      melhor_score: { scoreQualidade: -1, destaque: -1 },
    };
    const sort = sortMap[filtros.ordenacao] ?? { scoreQualidade: -1, destaque: -1 };

    const resultados = await Anuncio.find(mongoQuery)
      .sort(sort)
      .limit(20)
      .populate('utilizador', 'nome avatarUrl verificado');

    res.json({
      filtros,
      resumo: filtros.resumo,
      total: resultados.length,
      resultados,
    });

  } catch (erro) {
    next(erro);
  }
});
// ══════════════════════════════════════════════════════════════════════════════
// 4. DESCODIFICAR MATRÍCULA INTELIGENTE — POST /api/ia/descodificar
// ══════════════════════════════════════════════════════════════════════════════
router.post('/descodificar', verificarToken, async (req, res, next) => {
  try {
    const { matricula, fotos } = req.body;

    if (!matricula && (!fotos || fotos.length === 0)) {
      return res.status(400).json({ erro: 'Insere uma matrícula válida ou adiciona pelo menos uma foto para análise.' });
    }

    const systemPrompt = `És o motor analítico da NOXVELIA, especialista em catalogação automóvel em Portugal.
A tua função é analisar a matrícula ou as fotos fornecidas e deduzir os dados técnicos do carro para preenchimento automático.
Respondes APENAS com JSON puro e válido, sem explicações ou markdown.`;

    const userPrompt = `Matrícula fornecida: "${matricula || 'Não indicada'}"
Ficheiros/URLs de fotos disponíveis: ${fotos ? JSON.stringify(fotos) : 'Nenhuma'}

Gera dados técnicos realistas baseados no padrão de frotas de Portugal para este veículo. Devolve estritamente este formato JSON (usa strings em minúsculas nos campos enum):
{
  "marca": string,
  "modelo": string,
  "ano": number,
  "km": number,
  "combustivel": "gasolina" | "diesel" | "eletrico" | "hibrido" | "gpl",
  "transmissao": "manual" | "automatico",
  "potencia": number,
  "cilindrada": number,
  "cor": string,
  "tituloSugerido": string,
  "equipamentoSugerido": [string]
}`;

    const textoJson = await chamarGemini({ system: systemPrompt, user: userPrompt });
    const dadosDeduzidos = JSON.parse(textoJson);

    res.json({ sucesso: true, dados: dadosDeduzidos });
  } catch (erro) {
    console.error("Erro ao descodificar veículo:", erro);
    res.status(500).json({ erro: 'O motor de IA falhou ao analisar os dados do veículo.' });
  }
});
// 2. SCORE DE QUALIDADE SOFISTICADO COM METADADOS ATUALIZADOS
router.post('/score/:id', verificarToken, async (req, res, next) => {
  try {
    const anuncio = await Anuncio.findOne({ _id: req.params.id, apagadoEm: null });
    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado.' });

    const detalhes = {
      fotos:             0, 
      descricao:         0, 
      preco:             1, 
      localizacao:       0, 
      extras:            0, 
      disponibilidade:   0, 
    };

    const numFotos = anuncio.fotos?.length ?? 0;
    if      (numFotos >= 15) detalhes.fotos = 3;
    else if (numFotos >= 8)  detalhes.fotos = 2;
    else if (numFotos >= 3)  detalhes.fotos = 1;

    const palavras = anuncio.descricao?.split(/\s+/).filter(Boolean).length ?? 0;
    const temContactoNaDescricao = /\d{9}|email|telef|whatsapp/i.test(anuncio.descricao ?? '');
    if      (palavras >= 120 && !temContactoNaDescricao) detalhes.descricao = 2;
    else if (palavras >= 50)                               detalhes.descricao = 1;

    const temCidade = !!anuncio.localizacao?.cidade;
    const temCoordenadas = !!(anuncio.localizacao?.coordenadas?.lat && anuncio.localizacao?.coordenadas?.lng);
    const temMorada = !!anuncio.localizacao?.morada;
    if      (temCoordenadas && temMorada) detalhes.localizacao = 2;
    else if (temCidade)                   detalhes.localizacao = 1;

    const temVideo     = !!anuncio.videoUrl;
    const temVisitaVR  = !!anuncio.visitaVirtualUrl;
    const temCertEner  = anuncio.tipo === 'imovel' && !!anuncio.imovel?.certificadoEnergetico;
    const temCarfax    = anuncio.tipo === 'carro'  && !!anuncio.carro?.relatorioCarfax;
    const bonusExtras  = [temVideo, temVisitaVR, temCertEner, temCarfax].filter(Boolean).length;
    detalhes.extras    = Math.min(bonusExtras, 2);

    const temContacto = !!(anuncio.utilizador);
    detalhes.disponibilidade = temContacto ? 1 : 0;

    const scoreTotal = Object.values(detalhes).reduce((a, b) => a + b, 0);

    let analiseIA = null;

    if (palavras >= 10) {
      const systemPrompt = `És um especialista em avaliação de anúncios imobiliários e automóveis em Portugal.
Analisas anúncios e dás feedback construtivo, direto e em português europeu.
Respondes SEMPRE com JSON puro e válido, sem markdown.`;

      const userPrompt = `Analisa este anúncio e devolve APENAS este JSON:
{
  "pontosFuertes": ["máx 3 pontos positivos, curtos"],
  "pontosMelhorar": ["máx 3 sugestões de melhoria, concretas"],
  "sentimento": "positivo" | "neutro" | "negativo",
  "qualidadeDescricao": "fraca" | "razoável" | "boa" | "excelente",
  "recomendacao": "frase de 1 linha com o conselho mais importante"
}

Anúncio:
- Tipo: ${anuncio.tipo}
- Título: ${anuncio.titulo ?? '(sem título)'}
- Preço: ${anuncio.preco ? `${anuncio.preco.toLocaleString('pt-PT')}€` : 'não definido'}
- Descrição (${palavras} palavras): "${(anuncio.descricao ?? '').slice(0, 600)}"
- Fotos: ${numFotos}
- Localização: ${anuncio.localizacao?.cidade ?? 'não definida'}
- Extras: vídeo=${temVideo}, visita virtual=${temVisitaVR}`;

      try {
        const textoIA = await chamarGemini({ system: systemPrompt, user: userPrompt });
        analiseIA = JSON.parse(textoIA);
      } catch (errIA) {
        console.warn('Análise Gemini falhou:', errIA.message);
      }
    }

    anuncio.scoreQualidade  = scoreTotal;
    anuncio.scoreDetalhes   = detalhes;
    if (analiseIA) anuncio.scoreAnaliseIA = analiseIA;
    await anuncio.save();

    res.json({
      score:     scoreTotal,
      scoreMax:  10,
      percentagem: Math.round((scoreTotal / 10) * 100),
      nivel: scoreTotal >= 8 ? 'excelente' : scoreTotal >= 5 ? 'bom' : scoreTotal >= 3 ? 'razoável' : 'fraco',
      detalhes,
      analiseIA,
    });

  } catch (erro) {
    next(erro);
  }
});

// 3. GERAÇÃO AUTOMÁTICA DE DESCRIÇÃO
router.post('/descricao', verificarToken, async (req, res, next) => {
  try {
    const { tipo, dados } = req.body;

    if (!tipo || !dados) {
      return res.status(400).json({ erro: 'Campos "tipo" e "dados" são obrigatórios.' });
    }
    if (!['imovel', 'carro'].includes(tipo)) {
      return res.status(400).json({ erro: '"tipo" deve ser "imovel" ou "carro".' });
    }

    let contexto = '';

    if (tipo === 'imovel') {
      contexto = `
Tipo de imóvel: ${dados.tipoImovel ?? 'não especificado'}
Tipologia: ${dados.tipologia ?? 'não especificada'}
Área: ${dados.area ? `${dados.area} m²` : 'não especificada'}
Quartos: ${dados.quartos ?? 'não especificado'}
Casas de banho: ${dados.casasBanho ?? 'não especificado'}
Andar: ${dados.andar ?? 'não especificado'}
Localização: ${dados.cidade ?? ''} ${dados.distrito ? `(${dados.distrito})` : ''}
Preço: ${dados.preco ? `${Number(dados.preco).toLocaleString('pt-PT')}€` : 'não definido'}
Garagem: ${dados.garagem ? 'Sim' : 'Não'}
Piscina: ${dados.piscina ? 'Sim' : 'Não'}
Jardim: ${dados.jardim ? 'Sim' : 'Não'}
Elevador: ${dados.elevador ? 'Sim' : 'Não'}
Certificado energético: ${dados.certificadoEnergetico ?? 'não especificado'}
Extras: ${dados.notasExtras ?? 'nenhuma'}`;
    }

    if (tipo === 'carro') {
      contexto = `
Marca: ${dados.marca ?? 'não especificada'}
Modelo: ${dados.modelo ?? 'não especificado'}
Ano: ${dados.ano ?? 'não especificado'}
Quilómetros: ${dados.km ? `${Number(dados.km).toLocaleString('pt-PT')} km` : 'não especificados'}
Combustível: ${dados.combustivel ?? 'não especificado'}
Transmissão: ${dados.transmissao ?? 'não especificado'}
Potência: ${dados.potencia ? `${dados.potencia} cv` : 'não especificada'}
Cor: ${dados.cor ?? 'não especificada'}
Número de portas: ${dados.numPortas ?? 'não especificado'}
Preço: ${dados.preco ? `${Number(dados.preco).toLocaleString('pt-PT')}€` : 'não definido'}
Estado geral: ${dados.estado ?? 'não especificado'}
Extras / equipamentos: ${dados.extras ?? 'não especificados'}`;
    }

    const systemPrompt = `És um copywriter especializado em anúncios de ${tipo === 'imovel' ? 'imobiliário' : 'automóveis'} de luxo em Portugal.
Escreves descrições profissionais, convincentes e genuínas em português europeu.
Respondes SEMPRE com JSON puro e válido, sem markdown.`;

    const userPrompt = `Com base nos dados abaixo, gera um título e uma descrição profissional para este anúncio.

Dados do anúncio:
${contexto}

Devolve APENAS este JSON:
{
  "titulo": "título apelativo com máx 70 caracteres, sem pontuação excessiva",
  "descricaoCurta": "resumo de 1-2 frases para listagens, máx 160 caracteres",
  "descricaoCompleta": "descrição completa de 150-300 palavras, estruturada em 3-4 parágrafos curtos: apresentação, características, localização/contexto, chamada à ação subtil",
  "tagsSugeridas": ["3 a 5 tags relevantes para SEO, em minúsculas"]
}`;

    const textoJson = await chamarGemini({ system: systemPrompt, user: userPrompt });
    const resultado = JSON.parse(textoJson);

    if (!resultado.titulo || !resultado.descricaoCompleta) {
      throw new SyntaxError('Resposta da IA incompleta.');
    }

    res.json(resultado);

  } catch (erro) {
    next(erro);
  }
});

export default router;