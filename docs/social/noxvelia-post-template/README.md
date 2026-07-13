# Template de post NOXVELIA

Este template foi feito para reutilizar várias vezes: manténs a moldura, a logo e a identidade visual da NOXVELIA, e mudas só a frase ou a imagem central.

## Como mudar

1. Edita `post-config.json`.
2. Para mudar a frase, altera `phrase` e, se quiseres, `supportingLine`.
3. Para mudar a imagem do meio, coloca uma imagem nova em `assets/` e altera `middleImage`.
4. Exporta de novo:

```powershell
powershell -ExecutionPolicy Bypass -File .\render-post.ps1
```

O ficheiro pronto para publicar fica em `output/noxvelia-post.png`.

