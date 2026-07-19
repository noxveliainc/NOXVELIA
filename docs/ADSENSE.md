# Google AdSense

O AdSense é a forma de publicidade integrada na plataforma. Os slots aparecem apenas em páginas públicas e só são carregados depois do consentimento para serviços externos. Não existe uma camada de sponsors diretos nem chamadas para campanhas comerciais próprias.

## Regras de experiência

- Sem Auto Ads, pop-ups, âncoras ou anúncios intersticiais.
- Sem anúncios em login, registo, perfil, favoritos, mensagens, checkout, planos ou admin.
- O script Google só é carregado depois de consentimento para serviços externos.
- Se o navegador indicar Global Privacy Control ou Do Not Track, o slot não é renderizado.
- Sem configuração `ca-pub` ou slot, não aparece placeholder vazio.

## Variáveis do frontend

```env
VITE_GOOGLE_ADSENSE_CLIENT=ca-pub-5338010567169539
VITE_GOOGLE_ADSENSE_SLOT_LANDING=8774435565
VITE_GOOGLE_ADSENSE_SLOT_SEARCH=6148272221
VITE_GOOGLE_ADSENSE_SLOT_DETAIL=4045541427
VITE_GOOGLE_ADSENSE_TEST_MODE=false
```

Usar `VITE_GOOGLE_ADSENSE_TEST_MODE=true` em ambientes de teste/staging. Os valores `VITE_*` ficam expostos no bundle, por isso não colocar segredos nestas variáveis.

## ads.txt

Quando a conta AdSense indicar o publisher ID real, publicar `client/public/ads.txt` com a linha fornecida pela Google, normalmente neste formato:

```txt
google.com, pub-5338010567169539, DIRECT, f08c47fec0942fa0
```

Não publicar este ficheiro com IDs fictícios.

## Verificação do site

O `client/index.html` inclui a meta tag de verificação do AdSense:

```html
<meta name="google-adsense-account" content="ca-pub-5338010567169539" />
```

O script do AdSense continua a ser carregado pela aplicação apenas depois de consentimento para serviços externos.
