# Importar AutoScout24 para a Noxvelia

Este fluxo transforma o CSV publico do AutoScout24 num CSV compativel com a importacao manual da Noxvelia.

Usa isto para testes, demonstracoes e analise de mercado. Para anuncios reais em producao, importa apenas stock autorizado pelo stand ou proprietario.

## Fonte

Dataset:
https://zenodo.org/records/17643343

Ficheiro:
`autoscout24_dataset_20251108.csv`

O dataset tem cerca de 120 mil registos e o ficheiro completo tem mais de 500 MB. Por isso, o conversor trabalha em streaming e exporta apenas a quantidade definida em `--limit`.

## Converter para formato Noxvelia

Na pasta `server`:

```bash
npm run stock:autoscout24 -- --input ../data/autoscout24_dataset_20251108.csv --output ../data/autoscout24-noxvelia-pt.csv --limit 50 --country PT --telefone 912345678 --email stock@noxvelia.com --stand "Noxvelia Demo"
```

O conversor:

- filtra Portugal por defeito (`country_code=PT`);
- exporta apenas a quantidade indicada em `--limit`;
- converte marca, modelo, versao, ano, km, combustivel, transmissao, cilindrada, potencia, preco, cor, portas e lugares;
- usa a cidade do dataset e tenta descobrir o distrito portugues;
- usa a imagem da Noxvelia como fallback quando o dataset nao traz fotografias;
- gera um CSV pronto a importar no painel admin.

## Importar no painel admin

Depois de gerar o ficheiro:

1. Entrar como admin.
2. Abrir `Admin > Importacao de stock`.
3. Escolher o utilizador/stand que vai receber os anuncios.
4. Selecionar formato `CSV`.
5. Carregar o ficheiro `autoscout24-noxvelia-pt.csv`.
6. Importar.

## Opcoes uteis

```bash
--limit 20
```

Exporta so 20 viaturas.

```bash
--offset 50
```

Ignora as primeiras 50 viaturas portuguesas e exporta a partir dai.

```bash
--fallback-image https://www.noxvelia.com/logo-noxvelia.png
```

Imagem usada quando a linha nao tem fotografias.

```bash
--require-photos
```

Exporta apenas viaturas com fotografias reais no dataset.

```bash
--distrito Lisboa --cidade Lisboa
```

Valores usados quando a cidade/distrito nao vem preenchido.
