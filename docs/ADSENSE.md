# Google AdSense

O AdSense e opcional e funciona como fallback dos placements de sponsors diretos. Se existir campanha em `/api/sponsors`, a campanha direta aparece primeiro; se nao existir, o slot Google pode preencher o espaco.

## Regras de experiencia

- Sem Auto Ads, pop-ups, ancoras ou anuncios intersticiais.
- Sem anuncios em login, registo, perfil, favoritos, mensagens, checkout, planos ou admin.
- O script Google so e carregado depois de consentimento para servicos externos.
- Se o navegador indicar Global Privacy Control ou Do Not Track, o slot nao e renderizado.
- Sem configuracao `ca-pub` ou slot, nao aparece placeholder vazio.

## Variaveis do frontend

```env
VITE_GOOGLE_ADSENSE_CLIENT=ca-pub-0000000000000000
VITE_GOOGLE_ADSENSE_SLOT_LANDING=1234567890
VITE_GOOGLE_ADSENSE_SLOT_SEARCH=1234567891
VITE_GOOGLE_ADSENSE_SLOT_DETAIL=1234567892
VITE_GOOGLE_ADSENSE_TEST_MODE=false
```

Usar `VITE_GOOGLE_ADSENSE_TEST_MODE=true` em ambientes de teste/staging. Os valores `VITE_*` ficam expostos no bundle, por isso nao colocar segredos nestas variaveis.

## ads.txt

Quando a conta AdSense indicar o publisher ID real, publicar `client/public/ads.txt` com a linha fornecida pela Google, normalmente neste formato:

```txt
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

Nao publicar este ficheiro com IDs ficticios.
