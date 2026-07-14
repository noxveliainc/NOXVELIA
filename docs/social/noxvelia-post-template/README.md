# Template de post NOXVELIA

Template reutilizavel para gerar posts quadrados da NOXVELIA com aspeto profissional.
O centro fica livre: podes usar so texto, uma imagem, um recorte, um produto, uma frase, ou qualquer outro elemento sem ficar preso a uma moldura de foto.

## Como mudar

1. Edita `post-config.json`.
2. Para mudar a frase de cima, altera `topPhrase`.
3. Para mudar a linha por baixo da marca, altera `brandLine`.
4. O centro fica vazio por defeito.
5. Se quiseres colocar algo no centro pelo renderizador, mete o ficheiro em `assets/` e define `contentAsset`, por exemplo `"assets/minha-imagem.png"`.
6. Exporta de novo:

```powershell
powershell -ExecutionPolicy Bypass -File .\render-post.ps1
```

O ficheiro pronto para publicar fica em `output/noxvelia-post.png`.
