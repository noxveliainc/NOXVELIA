# NOXVELIA Post Images

Scripts separados para criar imagens personalizadas para posts da NOXVELIA.

Geram PNG a partir de templates SVG, com suporte para foto real do anuncio quando passas `--image`.

## Instalar

Dentro desta pasta:

```bash
npm install
```

Se estiveres dentro do repo e o backend ja tiver dependencias instaladas, os scripts tambem tentam usar o `sharp` do `server/node_modules`.

## Tamanhos

- `square`: 1080x1080
- `portrait`: 1080x1350
- `story`: 1080x1920
- `landscape`: 1200x628

## Post de carro

```bash
npm run car -- --title="BMW Serie 3 320d" --price="24 900 EUR" --location="Porto" --year="2020" --km="89 000 km" --fuel="Diesel" --image="../client/public/social/noxvelia-drive-photo-premium.webp" --output="output/bmw-serie-3.png"
```

## Post de imovel

```bash
npm run property -- --title="Apartamento T2 com varanda" --price="295 000 EUR" --location="Lisboa" --type="Apartamento" --area="92 m2" --rooms="T2" --image="../client/public/social/noxvelia-estate-photo-premium.webp" --output="output/apartamento-t2.png"
```

## Post institucional

```bash
npm run brand -- --headline="Carros e imoveis no mesmo sitio" --subtitle="Pesquisa simples, contacto direto e anuncios bem apresentados." --cta="noxvelia.com" --output="output/noxvelia-brand.png"
```

## Guardar tambem SVG

Adiciona `--svg`:

```bash
npm run car -- --title="Novo anuncio" --output="output/post.png" --svg
```

## Gerar varios posts de uma vez

Edita `examples/posts.json` e corre:

```bash
npm run batch -- --input=examples/posts.json
```

## Exemplos rapidos

```bash
npm run examples
```

As imagens ficam na pasta `output`.
