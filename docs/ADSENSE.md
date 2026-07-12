# Google AdSense

O AdSense é opcional e funciona como fallback dos placements de sponsors diretos. Se existir campanha em `/api/sponsors`, a campanha direta aparece primeiro; se não existir, o slot Google pode preencher o espaço.

## Regras de experiência

- Sem Auto Ads, pop-ups, âncoras ou anúncios intersticiais.
- Sem anúncios em login, registo, perfil, favoritos, mensagens, checkout, planos ou admin.
- O script Google só é carregado depois de consentimento para serviços externos.
- Se o navegador indicar Global Privacy Control ou Do Not Track, o slot não é renderizado.
- Sem configuração `ca-pub` ou slot, não aparece placeholder vazio.

## Variáveis do frontend

```env
VITE_GOOGLE_ADSENSE_CLIENT=ca-pub-0000000000000000
VITE_GOOGLE_ADSENSE_SLOT_LANDING=1234567890
VITE_GOOGLE_ADSENSE_SLOT_SEARCH=1234567891
VITE_GOOGLE_ADSENSE_SLOT_DETAIL=1234567892
VITE_GOOGLE_ADSENSE_TEST_MODE=false
```

Usar `VITE_GOOGLE_ADSENSE_TEST_MODE=true` em ambientes de teste/staging. Os valores `VITE_*` ficam expostos no bundle, por isso não colocar segredos nestas variáveis.

## ads.txt

Quando a conta AdSense indicar o publisher ID real, publicar `client/public/ads.txt` com a linha fornecida pela Google, normalmente neste formato:

```txt
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

Não publicar este ficheiro com IDs fictícios.
