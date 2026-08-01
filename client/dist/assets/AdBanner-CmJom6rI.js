import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{C as r,T as i,a,i as o,l as s,n as c,o as l,r as u,s as d,u as f}from"./index-DHzGJvgt.js";var p=e(t(),1);function m(){let[e,t]=(0,p.useState)(()=>f());return(0,p.useEffect)(()=>{let e=e=>{t(e?.detail||f())},n=e=>{e.key===`noxvelia_cookies_accepted`&&t(f())};return window.addEventListener(s,e),window.addEventListener(`storage`,n),()=>{window.removeEventListener(s,e),window.removeEventListener(`storage`,n)}},[]),e}var h=n();function g({placement:e,adsensePlacement:t=e,vertical:n=``,mode:s=`hybrid`,className:f=``,minHeight:g=96,mobileMinHeight:v=Math.min(g,56),format:y=`auto`,variant:b=`full`,showEmpty:x=!0}){let S=m(),C=(0,p.useRef)(null),w=(0,p.useRef)(null),T=(0,p.useRef)(!1),E=(0,p.useRef)(``),[D,O]=(0,p.useState)(null),[k,A]=(0,p.useState)(s!==`adsense`),[j,M]=(0,p.useState)(!1),N=l(t),P=(0,p.useMemo)(()=>{let t=new URLSearchParams;return e&&t.set(`posicao`,e),n&&t.set(`vertical`,n),`/patrocinios${t.toString()?`?${t.toString()}`:``}`},[e,n]),F=s!==`adsense`&&e,I=s!==`direct`&&d&&N&&S?.external===!0&&!o()&&!D&&!k;(0,p.useEffect)(()=>{if(!F){A(!1),O(null);return}let t=new AbortController;return A(!0),r.get(`/banners/ativo`,{params:{posicao:e,vertical:n},signal:t.signal}).then(({data:e})=>O(e?.banner||null)).catch(e=>{e.name!==`CanceledError`&&e.code!==`ERR_CANCELED`&&O(null)}).finally(()=>{t.signal.aborted||A(!1)}),()=>t.abort()},[F,e,n]),(0,p.useEffect)(()=>{T.current=!1,M(!1)},[t,e,N]),(0,p.useEffect)(()=>{if(!I||T.current)return;let e=!1;return a().then(()=>{if(!(e||T.current||!C.current))try{window.adsbygoogle=window.adsbygoogle||[],window.adsbygoogle.push({}),T.current=!0}catch{M(!0)}}).catch(()=>{e||M(!0)}),()=>{e=!0}},[I,t,e,N]),(0,p.useEffect)(()=>{if(!D?._id||!w.current)return;let e=w.current,t=()=>{E.current!==D._id&&(E.current=D._id,r.post(`/banners/${D._id}/impressao`).catch(()=>{}))};if(!(`IntersectionObserver`in window)){t();return}let n=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting&&e.intersectionRatio>=.35)&&(t(),n.disconnect())},{threshold:[.35]});return n.observe(e),()=>n.disconnect()},[D?._id]);let L={"--nx-ad-min-height":`${g}px`,"--nx-ad-mobile-min-height":`${v}px`},R=e===`landing_between_highlights`,z=[`nx-ad-banner`,`nx-ad-banner--${b}`,R?`nx-ad-banner--landing`:``,f].filter(Boolean).join(` `),B=(0,p.useMemo)(()=>{let t=String(e||``),r=String(n||``),i=r===`carro`||t.includes(`carros`),a=r===`imovel`||t.includes(`imoveis`),o=i?`automóveis`:a?`imóveis`:`Noxvelia`;return R?{label:`Parcerias`,eyebrow:`Espaço patrocinado`,title:`Coloca a tua marca onde os compradores começam a pesquisa.`,body:`Ideal para stands, oficinas, crédito, seguros, imobiliárias e serviços locais. Reserva por 7, 14 ou 30 dias.`,cta:`Ver planos`}:b===`sidebar`||t.includes(`detalhe_sidebar`)?{label:`Publicidade`,eyebrow:`Junto ao anúncio`,title:`A tua marca perto do contacto.`,body:`Aparece na página de detalhe de ${o}, numa zona de decisão do visitante.`,cta:`Reservar lateral`}:b===`inline`||t.includes(`feed_pesquisa`)?{label:`Publicidade`,eyebrow:`Entre resultados`,title:`Patrocina o feed de ${o}.`,body:`Uma presença curta e visível sem interromper a pesquisa.`,cta:`Reservar espaço`}:t.includes(`topo`)?{label:`Publicidade`,eyebrow:`Topo da listagem`,title:`Ganha visibilidade antes dos resultados de ${o}.`,body:`Bom para campanhas locais, promoções e serviços ligados à compra.`,cta:`Ver preços`}:t.includes(`fundo`)||t.includes(`sugestoes`)?{label:`Publicidade`,eyebrow:`Fim da página`,title:`Aparece quando o visitante continua a comparar opções.`,body:`Uma posição discreta para reforçar a tua marca sem pesar no site.`,cta:`Patrocinar`}:{label:`Publicidade`,eyebrow:`Espaço disponível`,title:`Anuncia neste espaço.`,body:`Escolhe a posição, adiciona imagem ou GIF e define a duração da campanha.`,cta:`Ver condições`}},[R,e,n,b]);return D?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(_,{}),(0,h.jsx)(`aside`,{ref:w,className:z,style:L,"aria-label":`Publicidade`,children:(0,h.jsxs)(`a`,{className:`nx-ad-banner-card nx-ad-banner-direct`,href:D.linkDestino,target:`_blank`,rel:`noopener noreferrer sponsored`,onClick:()=>{D?._id&&r.post(`/banners/${D._id}/clique`).catch(()=>{})},children:[(0,h.jsx)(`span`,{className:`nx-ad-banner-label`,children:`Publicidade`}),(0,h.jsx)(`img`,{src:D.imagemUrl,alt:D.titulo,loading:`lazy`}),(0,h.jsxs)(`span`,{className:`nx-ad-banner-caption`,children:[(0,h.jsx)(`strong`,{children:D.titulo}),(0,h.jsx)(`span`,{children:`Patrocínio direto`})]})]})})]}):!I||j?!x||k?null:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(_,{}),(0,h.jsx)(`aside`,{className:z,style:L,"aria-label":`Publicidade disponível`,children:(0,h.jsxs)(i,{className:`nx-ad-banner-card nx-ad-banner-empty${R?` nx-ad-banner-empty-landing`:``}`,to:P,children:[(0,h.jsx)(`span`,{className:`nx-ad-banner-label`,children:B.label}),(0,h.jsxs)(`span`,{className:`nx-ad-empty-layout`,children:[(0,h.jsxs)(`span`,{className:`nx-ad-empty-copy`,children:[(0,h.jsx)(`span`,{className:`nx-ad-empty-eyebrow`,children:B.eyebrow}),(0,h.jsx)(`strong`,{children:B.title}),(0,h.jsx)(`span`,{className:`nx-ad-empty-body`,children:B.body})]}),(0,h.jsxs)(`span`,{className:`nx-ad-empty-preview`,"aria-hidden":`true`,children:[(0,h.jsx)(`span`,{className:`nx-ad-preview-media`}),(0,h.jsxs)(`span`,{className:`nx-ad-preview-lines`,children:[(0,h.jsx)(`i`,{}),(0,h.jsx)(`i`,{}),(0,h.jsx)(`i`,{})]})]}),(0,h.jsx)(`span`,{className:`nx-ad-empty-cta`,children:B.cta})]})]})})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(_,{}),(0,h.jsx)(`aside`,{className:z,style:L,"aria-label":`Publicidade`,children:(0,h.jsxs)(`div`,{className:`nx-ad-banner-card nx-ad-banner-adsense`,children:[(0,h.jsx)(`div`,{className:`nx-ad-banner-label`,children:`Publicidade`}),(0,h.jsx)(`ins`,{ref:C,className:`adsbygoogle`,style:{display:`block`,minHeight:`var(--nx-ad-min-height)`},"data-ad-client":c,"data-ad-slot":N,"data-ad-format":y,"data-full-width-responsive":`true`,"data-adtest":u?`on`:void 0})]})})]})}function _(){return(0,h.jsx)(`style`,{children:`
      .nx-ad-banner {
        width: 100%;
        max-width: 1180px;
        margin: 24px auto;
      }
      .nx-ad-banner--inline {
        grid-column: 1 / -1;
        margin: 6px 0 10px;
        max-width: none;
      }
      .nx-ad-banner--sidebar {
        margin: 0;
        max-width: none;
      }
      .nx-ad-banner-card {
        position: relative;
        display: block;
        overflow: hidden;
        min-height: var(--nx-ad-min-height);
        border: 1px solid rgba(7, 19, 38, 0.12);
        border-radius: 14px;
        background: #ffffff;
        color: #071326;
        text-decoration: none;
      }
      .nx-ad-banner-label {
        position: absolute;
        top: 10px;
        left: 12px;
        z-index: 2;
        display: inline-flex;
        min-height: 22px;
        align-items: center;
        border-radius: 999px;
        background: rgba(255, 250, 240, 0.92);
        border: 1px solid rgba(217, 196, 156, 0.55);
        color: #596b7c;
        padding: 0 9px;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .nx-ad-banner-empty {
        display: flex;
        min-height: var(--nx-ad-min-height);
        align-items: center;
        justify-content: center;
        padding: 38px 18px 18px;
        border-style: dashed;
        background: linear-gradient(135deg, #fffaf0 0%, #ffffff 66%, rgba(217, 196, 156, .24) 100%);
        transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
      }
      .nx-ad-banner-empty:hover {
        border-color: rgba(157, 123, 63, .52);
        box-shadow: 0 18px 44px -34px rgba(7, 19, 38, .42);
        transform: translateY(-1px);
      }
      .nx-ad-empty-copy {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: #071326;
        text-align: center;
      }
      .nx-ad-empty-copy strong {
        font-size: 12px;
        line-height: 1.2;
        font-weight: 950;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .nx-ad-empty-copy span {
        display: inline-flex;
        min-height: 30px;
        align-items: center;
        border-radius: 999px;
        border: 1px solid rgba(217, 196, 156, .78);
        background: rgba(217, 196, 156, .24);
        color: #102f50;
        padding: 0 12px;
        font-size: 11px;
        font-weight: 900;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-copy {
        flex-direction: column;
        gap: 8px;
      }
      .nx-ad-banner-direct img {
        display: block;
        width: 100%;
        min-height: var(--nx-ad-min-height);
        max-height: 260px;
        object-fit: cover;
        background: #f4efe5;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-direct img {
        max-height: none;
        aspect-ratio: 4 / 3;
      }
      .nx-ad-banner-caption {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-end;
        padding: 38px 16px 14px;
        background: linear-gradient(0deg, rgba(7, 19, 38, .84), rgba(7, 19, 38, 0));
        color: #fffaf0;
      }
      .nx-ad-banner-caption strong {
        font-size: 15px;
        line-height: 1.2;
        font-weight: 900;
      }
      .nx-ad-banner-caption span {
        flex: 0 0 auto;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #f0dfbb;
      }
      .nx-ad-banner-adsense {
        padding: 12px;
      }
      .nx-ad-banner-adsense .adsbygoogle {
        min-height: var(--nx-ad-min-height);
      }
      .dark .nx-ad-banner-card {
        background: #071326;
        border-color: rgba(240, 223, 187, 0.16);
        color: #fffaf0;
      }
      .dark .nx-ad-banner-label {
        background: rgba(7, 19, 38, .86);
        border-color: rgba(217, 196, 156, .42);
        color: #f0dfbb;
      }
      .dark .nx-ad-banner-empty {
        background: linear-gradient(135deg, #071326 0%, #0d1d33 70%, rgba(217, 196, 156, .12) 100%);
        border-color: rgba(240, 223, 187, .22);
      }
      .dark .nx-ad-banner-empty:hover {
        border-color: rgba(240, 223, 187, .42);
        box-shadow: 0 18px 44px -32px rgba(0, 0, 0, .7);
      }
      .dark .nx-ad-empty-copy {
        color: #fffaf0;
      }
      .dark .nx-ad-empty-copy span {
        background: rgba(217, 196, 156, .14);
        border-color: rgba(240, 223, 187, .3);
        color: #f0dfbb;
      }
      /* Layout profissional para espaços vendidos diretamente. */
      .nx-ad-banner-card {
        border-radius: 8px;
        box-shadow: none;
      }
      .nx-ad-banner-empty {
        align-items: stretch;
        justify-content: stretch;
        padding: 18px;
        border-style: solid;
        background: #fffaf0;
      }
      .nx-ad-empty-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(180px, 260px) auto;
        width: 100%;
        gap: 16px;
        align-items: center;
      }
      .nx-ad-empty-layout > * {
        min-width: 0;
      }
      .nx-ad-empty-layout .nx-ad-empty-copy {
        display: grid;
        justify-content: start;
        justify-items: start;
        gap: 6px;
        color: #071326;
        text-align: left;
      }
      .nx-ad-empty-layout .nx-ad-empty-copy strong {
        color: #071326;
        font-size: clamp(17px, 1.8vw, 22px);
        font-weight: 950;
        letter-spacing: 0;
        line-height: 1.08;
        text-transform: none;
      }
      .nx-ad-empty-layout .nx-ad-empty-copy > span {
        display: block;
        min-height: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
      }
      .nx-ad-empty-eyebrow {
        color: #9b7b3f !important;
        font-size: 10px !important;
        font-weight: 950 !important;
        letter-spacing: .08em !important;
        line-height: 1.1 !important;
        text-transform: uppercase !important;
      }
      .nx-ad-empty-body {
        max-width: 620px;
        color: #53667a !important;
        font-size: 13px !important;
        font-weight: 680 !important;
        line-height: 1.42 !important;
      }
      .nx-ad-empty-preview {
        min-height: 82px;
        display: grid;
        grid-template-columns: 78px minmax(0, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        border: 1px solid rgba(7, 19, 38, .12);
        border-radius: 8px;
        background: #ffffff;
      }
      .nx-ad-preview-media {
        display: block;
        width: 100%;
        height: 58px;
        border-radius: 7px;
        background: linear-gradient(135deg, #d9c49c, #fff4d8 54%, #102f50);
      }
      .nx-ad-preview-lines {
        display: grid;
        gap: 7px;
      }
      .nx-ad-preview-lines i {
        display: block;
        height: 8px;
        border-radius: 999px;
        background: rgba(7, 19, 38, .15);
      }
      .nx-ad-preview-lines i:nth-child(1) { width: 86%; }
      .nx-ad-preview-lines i:nth-child(2) { width: 68%; }
      .nx-ad-preview-lines i:nth-child(3) { width: 44%; background: rgba(217, 196, 156, .7); }
      .nx-ad-empty-cta {
        justify-self: end;
        display: inline-flex;
        min-height: 40px;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 8px;
        background: #071326;
        color: #fffaf0;
        font-size: 12px;
        font-weight: 950;
        white-space: nowrap;
      }
      .nx-ad-banner-empty:hover .nx-ad-empty-cta {
        background: #102f50;
      }
      .nx-ad-banner--landing {
        max-width: 1200px;
        width: min(1200px, calc(100% - 44px));
        margin: 34px auto 8px;
      }
      .nx-ad-banner--landing .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 172px) !important;
      }
      .nx-ad-banner--landing .nx-ad-banner-empty {
        padding: 20px;
        background: linear-gradient(135deg, #071326 0%, #102f50 62%, #fffaf0 62%, #fffaf0 100%) !important;
        border-color: rgba(217, 196, 156, .34);
      }
      .nx-ad-banner--landing .nx-ad-banner-label {
        background: rgba(255, 250, 240, .96);
        color: #071326;
      }
      .nx-ad-banner--landing .nx-ad-empty-layout {
        grid-template-columns: minmax(0, 1.1fr) minmax(240px, 340px) auto;
        gap: 20px;
      }
      .nx-ad-banner--landing .nx-ad-empty-copy {
        padding-top: 28px;
      }
      .nx-ad-banner--landing .nx-ad-empty-copy strong {
        max-width: 680px;
        color: #fffaf0;
        font-size: clamp(23px, 2.8vw, 36px);
      }
      .nx-ad-banner--landing .nx-ad-empty-eyebrow,
      .nx-ad-banner--landing .nx-ad-empty-body {
        color: rgba(255, 250, 240, .78) !important;
      }
      .nx-ad-banner--landing .nx-ad-empty-preview {
        min-height: 112px;
        background: rgba(255, 250, 240, .96);
        box-shadow: 0 18px 38px -34px rgba(0, 0, 0, .75);
      }
      .nx-ad-banner--landing .nx-ad-empty-cta {
        background: #d9c49c;
        color: #071326;
      }
      .nx-ad-banner--landing .nx-ad-banner-direct img {
        max-height: 320px;
      }
      .nx-ad-banner--inline {
        margin: 10px 0 12px;
      }
      .nx-ad-banner--inline .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 96px) !important;
      }
      .nx-ad-banner--inline .nx-ad-banner-empty {
        padding: 14px 16px;
      }
      .nx-ad-banner--inline .nx-ad-empty-layout {
        grid-template-columns: minmax(0, 1fr) auto;
      }
      .nx-ad-banner--inline .nx-ad-empty-preview {
        display: none;
      }
      .nx-ad-banner--inline .nx-ad-empty-copy strong {
        font-size: 16px;
      }
      .nx-ad-banner--inline .nx-ad-empty-body {
        font-size: 12px !important;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 210px) !important;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-empty {
        padding: 40px 14px 14px;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-layout {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-preview {
        min-height: 96px;
        grid-template-columns: 1fr;
      }
      .nx-ad-banner--sidebar .nx-ad-preview-lines {
        display: none;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-cta {
        justify-self: stretch;
        width: 100%;
      }
      .nx-ad-banner--sidebar .nx-ad-empty-copy strong {
        font-size: 18px;
      }
      .pesquisa-top-ad .nx-ad-banner-card,
      .pesquisa-bottom-ad .nx-ad-banner-card {
        min-height: max(var(--nx-ad-min-height), 110px) !important;
      }
      .dark .nx-ad-empty-layout .nx-ad-empty-copy strong {
        color: #fffaf0 !important;
      }
      .dark .nx-ad-empty-body,
      .dark .nx-ad-empty-layout .nx-ad-empty-copy > span {
        color: rgba(255, 250, 240, .76) !important;
      }
      .dark .nx-ad-empty-eyebrow {
        color: #f0dfbb !important;
      }
      .dark .nx-ad-empty-preview {
        background: #071326 !important;
        border-color: rgba(217, 196, 156, .22) !important;
      }
      .dark .nx-ad-preview-lines i {
        background: rgba(255, 250, 240, .16);
      }
      .dark .nx-ad-preview-lines i:nth-child(3) {
        background: rgba(217, 196, 156, .72);
      }
      .dark .nx-ad-empty-cta {
        background: #d9c49c !important;
        color: #071326 !important;
      }
      .dark .nx-ad-banner--landing .nx-ad-banner-empty {
        background: linear-gradient(135deg, #040b16 0%, #102f50 62%, #0d1d33 62%, #0d1d33 100%) !important;
        border-color: rgba(217, 196, 156, .3) !important;
      }
      /* Correções anti-overlap: o selo de publicidade nunca pode tapar texto. */
      .nx-ad-banner-empty {
        flex-direction: column !important;
        gap: 10px !important;
        padding: 16px 18px !important;
      }
      .nx-ad-banner-empty > .nx-ad-banner-label {
        position: static !important;
        inset: auto !important;
        align-self: flex-start !important;
        background: #fffaf0 !important;
        border-color: rgba(217, 196, 156, .74) !important;
        color: #071326 !important;
      }
      .nx-ad-banner-empty .nx-ad-empty-layout {
        align-items: center !important;
      }
      .nx-ad-banner--landing .nx-ad-banner-empty {
        padding: 20px !important;
      }
      .nx-ad-banner--landing .nx-ad-empty-copy {
        padding-top: 0 !important;
      }
      .nx-ad-banner--inline .nx-ad-banner-empty,
      .nx-ad-banner--sidebar .nx-ad-banner-empty {
        padding: 14px !important;
      }
      .nx-ad-banner--sidebar .nx-ad-banner-label {
        align-self: flex-start !important;
      }
      .dark .nx-ad-banner-empty > .nx-ad-banner-label {
        background: #fffaf0 !important;
        border-color: rgba(217, 196, 156, .74) !important;
        color: #071326 !important;
      }
      @media (max-width: 640px) {
        .nx-ad-banner {
          margin: 14px auto;
        }
        .nx-ad-banner-empty {
          padding: 10px !important;
          gap: 8px !important;
        }
        .nx-ad-banner-empty > .nx-ad-banner-label {
          position: static !important;
          min-height: 20px !important;
          padding: 0 8px !important;
          font-size: 8px !important;
        }
        .nx-ad-empty-layout,
        .nx-ad-banner--landing .nx-ad-empty-layout,
        .nx-ad-banner--inline .nx-ad-empty-layout,
        .nx-ad-banner--sidebar .nx-ad-empty-layout {
          grid-template-columns: 1fr !important;
          gap: 8px !important;
        }
        .nx-ad-empty-preview {
          display: none !important;
        }
        .nx-ad-empty-layout .nx-ad-empty-copy strong {
          font-size: 13px !important;
          line-height: 1.12 !important;
        }
        .nx-ad-empty-body {
          font-size: 11px !important;
          line-height: 1.35 !important;
        }
        .nx-ad-empty-cta {
          justify-self: stretch !important;
          width: 100% !important;
          min-height: 32px !important;
          font-size: 11px !important;
        }
        .nx-ad-banner--landing .nx-ad-banner-card {
          min-height: max(var(--nx-ad-mobile-min-height), 132px) !important;
        }
        .nx-ad-banner-card {
          min-height: var(--nx-ad-mobile-min-height);
          border-radius: 12px;
        }
        .nx-ad-banner-empty {
          min-height: max(var(--nx-ad-mobile-min-height), 62px);
          padding: 30px 10px 10px;
        }
        .nx-ad-empty-copy {
          flex-wrap: wrap;
          gap: 6px;
        }
        .nx-ad-empty-copy strong {
          font-size: 10px;
        }
        .nx-ad-empty-copy span {
          min-height: 24px;
          padding: 0 9px;
          font-size: 10px;
        }
        .nx-ad-banner-direct img {
          min-height: var(--nx-ad-mobile-min-height);
          max-height: 150px;
        }
        .nx-ad-banner-caption {
          padding: 30px 12px 11px;
        }
        .nx-ad-banner-caption strong {
          font-size: 13px;
        }
        .nx-ad-banner-caption span {
          display: none;
        }
        .nx-ad-empty-layout .nx-ad-empty-copy > span {
          display: block !important;
          min-height: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
        }
        .nx-ad-banner-empty .nx-ad-empty-layout {
          width: 100% !important;
        }        .nx-ad-banner-adsense {
          padding: 8px;
        }
        .nx-ad-banner-adsense .adsbygoogle {
          min-height: var(--nx-ad-mobile-min-height) !important;
        }
      }
    `})}export{g as t};