# Patrocínios NOXVELIA

O sistema publica apenas campanhas reais configuradas no backend. Sem configuração, não aparece qualquer espaço vazio ou anúncio fictício.

## Onde aparecem

- `landing_between_highlights`: entre os anúncios em alta e a área carVertical.
- `search_results_top`: no topo dos resultados Drive/Estate, depois dos controlos de pesquisa.
- `listing_before_suggestions`: no detalhe, antes dos anúncios sugeridos.
- `comparator_footer`: depois da tabela do comparador, no momento de decisão.

Não existem posições em login, registo, perfil, favoritos, mensagens, administração, Stripe ou outras áreas privadas.

## Publicar uma campanha no Render

Adicionar a variável de ambiente `SPONSOR_CAMPAIGNS_JSON` no serviço do backend. O valor é uma lista JSON:

```json
[
  {
    "id": "parceiro-verao-2026",
    "active": true,
    "label": "Patrocinado",
    "title": "Título claro da campanha",
    "description": "Proposta de valor curta, sem alegações enganosas.",
    "cta": "Conhecer oferta",
    "imageUrl": "https://cdn.parceiro.pt/noxvelia/banner.webp",
    "targetUrl": "https://www.parceiro.pt/oferta",
    "placements": ["search_results_top", "listing_before_suggestions"],
    "vertical": "carro",
    "priority": 80,
    "startAt": "2026-07-15T00:00:00Z",
    "endAt": "2026-08-15T23:59:59Z"
  }
]
```

`vertical` aceita `all`, `carro` ou `imovel`. URLs têm de usar HTTP/HTTPS. São aceites no máximo 30 campanhas e os textos têm limites de tamanho. HTML, JavaScript e iframes de anunciantes nunca são executados.

Depois de guardar a variável, fazer deploy/restart do backend. O frontend recebe a campanha em `/api/sponsors`; a resposta tem cache de cinco minutos.

## Medição e modelo comercial

Os links recebem automaticamente `utm_source=noxvelia`, `utm_medium=sponsor_banner`, `utm_campaign` e `utm_content`. Assim, o anunciante mede os cliques na sua própria ferramenta sem cookies adicionais nem escritas na base de dados da NOXVELIA.

Começar com preço fixo mensal por posição e vertical. Landing deve ser a posição premium de notoriedade; pesquisa e detalhe devem valer mais quando a campanha corresponde à intenção Drive/Estate. Só introduzir cobrança por clique quando existir medição própria auditável e proteção antifraude.

Recomendação visual: WebP/JPEG 1600x900, até 350 KB, sem texto minúsculo incorporado na imagem. Toda a campanha deve ser identificada como patrocinada e aprovada antes da publicação.
