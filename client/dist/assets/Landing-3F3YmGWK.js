import{g as e,l as t,t as n,u as r,y as i}from"./jsx-runtime-On9Szgki.js";import{_ as a,f as o,h as s,p as c,v as l,y as u}from"./index-Bm6yTU-b.js";import{W as d,b as f,ct as p,dt as m,et as h,f as g,i as _,nt as v,ot as y,v as b,wt as x,x as S,z as C}from"./mdi-CgcECdTh.js";import{r as w}from"./seo-BmrZTbI5.js";import{t as T}from"./Seo-O6tS4bdd.js";import{t as E}from"./GoogleAdSlot-LAswSfy6.js";import{t as D}from"./SponsorBanner-BcZgD6f7.js";import{t as O}from"./marcasModelos-CRXT0e16.js";var k=x(),A=i(e(),1),j=n();function M(){let{user:e,signed:n,logout:r}=a(),i=t(),[o,l]=(0,A.useState)(!1),[d,f]=(0,A.useState)(!1),p=(0,A.useRef)(null),m=(0,A.useRef)(null);(0,A.useEffect)(()=>{let e=e=>{p.current&&!p.current.contains(e.target)&&l(!1),m.current&&!m.current.contains(e.target)&&f(!1)},t=e=>{e.key===`Escape`&&(l(!1),f(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,A.useEffect)(()=>{l(!1),f(!1)},[i.pathname]);let h=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=h?.avatarUrl||h?.avatar,_=h?.nome?.charAt(0).toUpperCase()||`U`,v=h?.nome?.split(` `)[0]||``;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`style`,{children:`
        .nl-root,
        .nl-root * {
          box-sizing: border-box;
        }

        .nl-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 74px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid rgba(8, 33, 38, 0.1);
          background: rgba(248, 246, 239, 0.88);
          backdrop-filter: blur(18px) saturate(145%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .nl-inner {
          width: min(1260px, 100%);
          height: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 28px;
        }

        .nl-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: #082126;
          text-decoration: none;
        }

        .nl-brand img {
          width: 40px;
          height: 40px;
          display: block;
          object-fit: contain;
        }

        .nl-wordmark {
          font-size: 15px;
          font-weight: 850;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .nl-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(18px, 2.5vw, 34px);
        }

        .nl-links a {
          position: relative;
          padding: 8px 0;
          color: #456067;
          text-decoration: none;
          font-size: 12px;
          font-weight: 760;
          transition: color 0.2s ease;
        }

        .nl-links a::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 3px;
          height: 2px;
          border-radius: 2px;
          background: #2ac1b4;
          transition: right 0.2s ease;
        }

        .nl-links a:hover {
          color: #082126;
        }

        .nl-links a:hover::after {
          right: 0;
        }

        .nl-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
          min-width: 0;
        }

        .nl-menu-toggle {
          width: 40px;
          height: 40px;
          display: none;
          place-items: center;
          padding: 0;
          color: #143238;
          border: 1px solid rgba(8, 33, 38, 0.16);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.62);
          cursor: pointer;
        }

        .nl-menu-toggle svg {
          width: 19px;
          height: 19px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
        }

        .nl-mobile-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 16px;
          right: 16px;
          display: none;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
          padding: 10px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-mobile-menu a,
        .nl-mobile-menu button {
          display: flex;
          align-items: center;
          min-height: 42px;
          width: 100%;
          padding: 0 12px;
          color: #355158;
          border: 0;
          border-radius: 9px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 780;
          background: transparent;
          cursor: pointer;
        }

        .nl-mobile-menu a:hover,
        .nl-mobile-menu button:hover {
          color: #082126;
          background: #edf6f3;
        }

        .nl-btn-ghost,
        .nl-btn-solid {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .nl-btn-ghost {
          color: #143238;
          border: 1px solid rgba(8, 33, 38, 0.16);
          background: rgba(255, 255, 255, 0.56);
        }

        .nl-btn-ghost:hover {
          border-color: rgba(8, 33, 38, 0.28);
          background: #fff;
        }

        .nl-btn-solid {
          color: #fff;
          border: 1px solid #082126;
          background: #082126;
          box-shadow: 0 12px 24px -18px rgba(8, 33, 38, 0.75);
        }

        .nl-btn-solid:hover {
          transform: translateY(-1px);
          background: #0d3036;
          box-shadow: 0 16px 28px -18px rgba(8, 33, 38, 0.8);
        }

        .nl-user-wrap {
          position: relative;
        }

        .nl-user-trigger {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px 4px 4px;
          color: #143238;
          border: 1px solid rgba(8, 33, 38, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nl-user-trigger:hover,
        .nl-user-trigger.active {
          border-color: rgba(42, 193, 180, 0.5);
          background: #fff;
        }

        .nl-avatar {
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          overflow: hidden;
          display: grid;
          place-items: center;
          color: #0d5955;
          border: 1px solid rgba(42, 193, 180, 0.24);
          border-radius: 50%;
          background: rgba(42, 193, 180, 0.14);
        }

        .nl-avatar img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .nl-avatar-initial,
        .nl-username {
          font-size: 12px;
          font-weight: 800;
        }

        .nl-chevron {
          stroke: #6b7d82;
          transition: transform 0.2s ease;
        }

        .nl-user-trigger.active .nl-chevron {
          transform: rotate(180deg);
        }

        .nl-user-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 210px;
          display: flex;
          flex-direction: column;
          padding: 8px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-ud-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 11px;
          color: #4d656b;
          border: 0;
          border-radius: 9px;
          background: transparent;
          text-align: left;
          text-decoration: none;
          font-size: 12px;
          font-weight: 720;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .nl-ud-item:hover {
          color: #082126;
          background: #f1f6f4;
        }

        .nl-ud-item svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .nl-ud-divider {
          height: 1px;
          margin: 6px 0;
          background: #e5eceb;
        }

        .nl-ud-item.logout:hover {
          color: #b42318;
          background: #fff3f1;
        }

        @media (max-width: 920px) {
          .nl-inner {
            gap: 18px;
          }

          .nl-links {
            display: none;
          }

          .nl-inner {
            grid-template-columns: auto 1fr;
          }

          .nl-actions {
            grid-column: 2;
          }

          .nl-menu-toggle,
          .nl-mobile-menu {
            display: grid;
          }
        }

        @media (max-width: 540px) {
          .nl-root {
            height: 66px;
            padding: 0 14px;
          }

          .nl-inner {
            gap: 10px;
          }

          .nl-brand img {
            width: 34px;
            height: 34px;
          }

          .nl-wordmark {
            display: none;
          }

          .nl-actions {
            gap: 6px;
          }

          .nl-btn-ghost,
          .nl-btn-solid,
          .nl-user-wrap {
            display: none;
          }

          .nl-user-trigger {
            padding-right: 8px;
          }

          .nl-menu-toggle {
            width: 36px;
            height: 36px;
          }
        }
      `}),(0,j.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:m,children:[(0,j.jsxs)(`div`,{className:`nl-inner`,children:[(0,j.jsxs)(u,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,j.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,j.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,j.jsxs)(`div`,{className:`nl-links`,children:[(0,j.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,j.jsx)(`a`,{href:`#destaques`,children:`Em destaque`}),(0,j.jsx)(`a`,{href:`#carvertical`,children:`carVertical`}),(0,j.jsx)(u,{to:`/carros`,children:`Drive`}),(0,j.jsx)(u,{to:`/imoveis`,children:`Estate`})]}),(0,j.jsxs)(`div`,{className:`nl-actions`,children:[(0,j.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{l(!1),f(e=>!e)},"aria-expanded":d,"aria-controls":`nl-mobile-menu`,"aria-label":d?`Fechar navegação`:`Abrir navegação`,children:d?(0,j.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,j.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,j.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,j.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,j.jsx)(c,{}),(0,j.jsx)(s,{}),n?(0,j.jsxs)(`div`,{ref:p,className:`nl-user-wrap`,children:[(0,j.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${o?`active`:``}`,onClick:()=>{f(!1),l(e=>!e)},"aria-expanded":o,"aria-label":`Abrir menu de utilizador`,children:[(0,j.jsx)(`span`,{className:`nl-avatar`,children:g?(0,j.jsx)(`img`,{src:g,alt:``}):(0,j.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,j.jsx)(`span`,{className:`nl-username`,children:v}),(0,j.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,j.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),o&&(0,j.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,j.jsxs)(u,{to:`/perfil`,onClick:()=>l(!1),className:`nl-ud-item`,children:[(0,j.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,j.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,j.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,j.jsx)(`div`,{className:`nl-ud-divider`}),(0,j.jsxs)(`button`,{type:`button`,onClick:()=>{l(!1),r()},className:`nl-ud-item logout`,children:[(0,j.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,j.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,j.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,j.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(u,{to:`/login`,state:{from:i.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,j.jsx)(u,{to:`/registo`,className:`nl-btn-solid`,children:`Registar`})]})]})]}),d&&(0,j.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,j.jsx)(`a`,{href:`#marcas`,onClick:()=>f(!1),children:`Marcas`}),(0,j.jsx)(`a`,{href:`#destaques`,onClick:()=>f(!1),children:`Em destaque`}),(0,j.jsx)(`a`,{href:`#carvertical`,onClick:()=>f(!1),children:`carVertical`}),(0,j.jsx)(u,{to:`/carros`,onClick:()=>f(!1),children:`Drive`}),(0,j.jsx)(u,{to:`/imoveis`,onClick:()=>f(!1),children:`Estate`}),n?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(u,{to:`/perfil`,onClick:()=>f(!1),children:`O meu perfil`}),(0,j.jsx)(`button`,{type:`button`,onClick:()=>{f(!1),r()},children:`Terminar sessão`})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(u,{to:`/login`,state:{from:i.pathname},onClick:()=>f(!1),children:`Entrar`}),(0,j.jsx)(u,{to:`/registo`,onClick:()=>f(!1),children:`Registar`})]})]})]})]})}var N=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,P=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),F=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),I=e=>`/marcas/${F(e)}.${e===`Jaecoo`?`svg`:`png`}`,L=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase();function R(){let e=r(),t=(0,A.useRef)(null),[n,i]=(0,A.useState)({carro:[],imovel:[]}),[a,s]=(0,A.useState)(!0),[c,x]=(0,A.useState)(!1);(0,A.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await l.get(`/anuncios/em-alta/semana`);if(!e)return;i({carro:(t?.carro||[]).slice(0,2),imovel:(t?.imovel||[]).slice(0,2)}),x(!1)}catch{e&&(i({carro:[],imovel:[]}),x(!0))}finally{e&&s(!1)}})(),()=>{e=!1}},[]);let F=(t,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}e(w(t))},R=e=>{t.current?.scrollBy({left:e*Math.min(720,window.innerWidth*.72),behavior:`smooth`})},z=(e,t)=>{let n=e.tipo===`carro`,r=e.fotos?.[0]||e.imagens?.[0],i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,j.jsxs)(`button`,{type:`button`,className:`lp-example-card ${n?`drive`:`estate`}`,onClick:()=>F(e,t),children:[(0,j.jsxs)(`span`,{className:`lp-example-img`,children:[r?(0,j.jsx)(`img`,{src:r,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,j.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`}),(0,j.jsxs)(`span`,{className:`lp-example-weekly`,children:[e.visitasSemana||0,` visitas esta semana`]})]}),(0,j.jsxs)(`span`,{className:`lp-example-body`,children:[(0,j.jsx)(`span`,{className:`lp-example-price`,children:P(e.preco)}),(0,j.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,j.jsxs)(`span`,{className:`lp-example-meta`,children:[(0,j.jsx)(k.Icon,{path:n?C:p,size:.58}),i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)]}),(0,j.jsxs)(`span`,{className:`lp-example-location`,children:[(0,j.jsx)(k.Icon,{path:h,size:.58}),e.localizacao?.cidade||`Portugal`]})]})]},e._id)},B=(t,n)=>a?(0,j.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,j.jsx)(`span`,{className:`lp-state-loader`,"aria-hidden":`true`}),(0,j.jsx)(`strong`,{children:`A selecionar os anúncios com mais interesse.`}),(0,j.jsx)(`span`,{children:`Os destaques refletem as visitas dos últimos sete dias.`})]}):(0,j.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,j.jsx)(`strong`,{children:c?`A seleção semanal está a ser atualizada.`:`Descobre todas as oportunidades em ${t}.`}),(0,j.jsx)(`span`,{children:c?`Entretanto, encontra todos os anúncios na pesquisa completa.`:`Explora a pesquisa e encontra o que combina contigo.`}),(0,j.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(n),children:[`Explorar `,t,` `,(0,j.jsx)(k.Icon,{path:_,size:.58})]})]});return(0,j.jsxs)(`div`,{className:`lp-root`,children:[(0,j.jsx)(T,{title:`Noxvelia — Carros e imóveis em Portugal`,description:`Encontra, compara e publica anúncios de carros e imóveis em Portugal na Noxvelia.`,path:`/`,jsonLd:[{"@context":`https://schema.org`,"@type":`Organization`,name:`Noxvelia`,url:`https://www.noxvelia.com`,logo:`https://www.noxvelia.com/logo-noxvelia.png`},{"@context":`https://schema.org`,"@type":`WebSite`,name:`Noxvelia`,url:`https://www.noxvelia.com`}]}),(0,j.jsx)(`style`,{children:`
        .lp-root,
        .lp-root * {
          box-sizing: border-box;
        }

        .lp-root {
          --lp-ink: #082126;
          --lp-ink-soft: #254047;
          --lp-drive: #2ac1b4;
          --lp-estate: #3ecf8e;
          --lp-gold: #c6a86a;
          --lp-stone: #f2f0e8;
          --lp-cream: #fbfaf6;
          min-height: 100vh;
          overflow: clip;
          background: var(--lp-stone);
          color: var(--lp-ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .lp-root button,
        .lp-root a {
          font: inherit;
        }

        .lp-root a:focus-visible,
        .lp-root button:focus-visible {
          outline: 3px solid rgba(42, 193, 180, 0.48);
          outline-offset: 3px;
        }

        .lp-shell {
          width: min(1260px, calc(100% - 48px));
          margin: 0 auto;
        }

        .lp-hero {
          position: relative;
          padding: 30px 0 58px;
          background:
            radial-gradient(circle at 8% 14%, rgba(198, 168, 106, 0.21), transparent 28%),
            radial-gradient(circle at 92% 88%, rgba(42, 193, 180, 0.16), transparent 28%),
            linear-gradient(180deg, #f7f5ee 0%, #ecebe4 100%);
        }

        .lp-hero-card {
          min-height: 520px;
          display: grid;
          grid-template-columns: minmax(430px, 0.86fr) minmax(0, 1.14fr);
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 32px;
          background: var(--lp-ink);
          box-shadow: 0 36px 90px -54px rgba(8, 33, 38, 0.72);
          animation: lp-rise 0.65s ease both;
        }

        .lp-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(38px, 4vw, 54px);
          color: #fff;
          background:
            radial-gradient(circle at 8% 8%, rgba(42, 193, 180, 0.18), transparent 34%),
            var(--lp-ink);
        }

        .lp-hero-content::after {
          content: "";
          position: absolute;
          right: -56px;
          top: 0;
          bottom: 0;
          width: 112px;
          z-index: -1;
          background: linear-gradient(90deg, var(--lp-ink), transparent);
          pointer-events: none;
        }

        .lp-kicker,
        .lp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .lp-kicker {
          margin-bottom: 22px;
          padding: 8px 11px;
          color: #dcfff9;
          border: 1px solid rgba(104, 232, 214, 0.28);
          border-radius: 999px;
          background: rgba(42, 193, 180, 0.12);
        }

        .lp-hero h1 {
          max-width: 680px;
          margin: 0;
          font-size: clamp(39px, 4.4vw, 54px);
          font-weight: 780;
          line-height: 0.99;
          letter-spacing: -0.052em;
          text-wrap: balance;
        }

        .lp-hero h1 span {
          color: #7be0d4;
        }

        .lp-hero-copy {
          max-width: 570px;
          margin: 20px 0 0;
          color: #c8d6d8;
          font-size: 15px;
          line-height: 1.65;
        }

        .lp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 24px;
        }

        .lp-btn {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 19px;
          border: 1px solid transparent;
          border-radius: 12px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .lp-btn:hover {
          transform: translateY(-2px);
        }

        .lp-btn-drive {
          color: #052326;
          background: var(--lp-drive);
          box-shadow: 0 16px 34px -20px rgba(42, 193, 180, 0.9);
        }

        .lp-btn-estate {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }

        .lp-btn-estate:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.36);
        }

        .lp-hero-media {
          position: relative;
          min-width: 0;
          background: #b8d4cd;
          animation: lp-fade 0.8s 0.08s ease both;
        }

        .lp-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 56%, rgba(6, 28, 32, 0.2));
          pointer-events: none;
        }

        .lp-hero-media img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          display: block;
          object-fit: cover;
          object-position: 58% center;
        }

        .lp-hero-photo-label {
          position: absolute;
          z-index: 2;
          right: 22px;
          bottom: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          color: #102b30;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.88);
          box-shadow: 0 12px 34px -20px rgba(8, 33, 38, 0.55);
          backdrop-filter: blur(12px);
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-hero-photo-label i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--lp-gold);
        }

        .lp-trust-bar {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .lp-trust-item {
          min-height: 62px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 15px;
          color: #365158;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.58);
          font-size: 12.5px;
          font-weight: 750;
          backdrop-filter: blur(8px);
        }

        .lp-trust-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          color: #0d766e;
          border-radius: 10px;
          background: rgba(42, 193, 180, 0.14);
        }

        .lp-section {
          position: relative;
          padding: 78px 0;
        }

        .lp-section[id] {
          scroll-margin-top: 86px;
        }

        .lp-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 26px;
          margin-bottom: 30px;
        }

        .lp-section-head > div:first-child {
          max-width: 730px;
        }

        .lp-eyebrow {
          margin-bottom: 12px;
          color: #16776f;
        }

        .lp-title {
          margin: 0;
          color: var(--lp-ink);
          font-size: clamp(31px, 4.2vw, 46px);
          font-weight: 780;
          line-height: 1.06;
          letter-spacing: -0.042em;
          text-wrap: balance;
        }

        .lp-copy {
          max-width: 680px;
          margin: 15px 0 0;
          color: #587077;
          font-size: 14.5px;
          line-height: 1.7;
        }

        .lp-brands-section {
          overflow: hidden;
          background:
            linear-gradient(115deg, rgba(255, 255, 255, 0.65), transparent 54%),
            #f3f0e6;
        }

        .lp-brand-controls {
          display: flex;
          gap: 8px;
          flex: 0 0 auto;
        }

        .lp-round-btn {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.15);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .lp-round-btn:hover {
          transform: translateY(-2px);
          background: #fff;
        }

        .lp-brand-scroll {
          overflow-x: auto;
          overscroll-behavior-inline: contain;
          scroll-snap-type: x proximity;
          scrollbar-width: thin;
          scrollbar-color: rgba(8, 33, 38, 0.22) transparent;
          padding: 4px 0 14px;
        }

        .lp-brand-grid {
          width: max-content;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 158px;
          grid-template-rows: repeat(2, 94px);
          gap: 10px;
          padding-right: 24px;
        }

        .lp-brand-card {
          scroll-snap-align: start;
          min-width: 0;
          display: grid;
          grid-template-rows: 46px auto;
          align-items: center;
          justify-items: center;
          gap: 5px;
          padding: 11px 10px 9px;
          color: #284248;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          box-shadow: 0 12px 34px -30px rgba(8, 33, 38, 0.5);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-brand-card:hover {
          transform: translateY(-3px);
          border-color: rgba(42, 193, 180, 0.5);
          background: #fff;
          box-shadow: 0 18px 38px -28px rgba(8, 33, 38, 0.5);
        }

        .lp-brand-mark {
          position: relative;
          width: 104px;
          height: 42px;
          display: grid;
          place-items: center;
        }

        .lp-brand-mark img {
          position: relative;
          z-index: 1;
          max-width: 100%;
          max-height: 42px;
          display: block;
          object-fit: contain;
        }

        .lp-brand-fallback {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          color: #567077;
          font-size: 16px;
          font-weight: 850;
          letter-spacing: 0.08em;
        }

        .lp-brand-name {
          max-width: 100%;
          overflow: hidden;
          color: #405a60;
          font-size: 10.5px;
          font-weight: 750;
          line-height: 1.2;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .lp-popular-section {
          background:
            radial-gradient(circle at 90% 12%, rgba(62, 207, 142, 0.12), transparent 24%),
            #e5ebe5;
          border-top: 1px solid rgba(8, 33, 38, 0.08);
          border-bottom: 1px solid rgba(8, 33, 38, 0.08);
        }

        .lp-examples-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lp-example-column {
          min-width: 0;
          padding: 17px;
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.11);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 25px 65px -48px rgba(8, 33, 38, 0.55);
        }

        .lp-example-column.drive {
          box-shadow: inset 0 4px 0 var(--lp-drive), 0 25px 65px -48px rgba(8, 33, 38, 0.55);
        }

        .lp-example-column.estate {
          box-shadow: inset 0 4px 0 var(--lp-estate), 0 25px 65px -48px rgba(8, 33, 38, 0.55);
        }

        .lp-column-top {
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 13px;
          padding: 2px 2px 0;
        }

        .lp-column-heading {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lp-column-icon {
          width: 36px;
          height: 36px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 11px;
        }

        .drive .lp-column-icon {
          color: #08665f;
          background: rgba(42, 193, 180, 0.16);
        }

        .estate .lp-column-icon {
          color: #08784b;
          background: rgba(62, 207, 142, 0.16);
        }

        .lp-column-title {
          margin: 0;
          font-size: 16px;
          font-weight: 820;
          letter-spacing: -0.02em;
        }

        .lp-column-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 0;
          color: #2e5e5a;
          border: 0;
          background: transparent;
          font-size: 11.5px;
          font-weight: 820;
          cursor: pointer;
          white-space: nowrap;
        }

        .lp-example-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 11px;
        }

        .lp-example-card {
          min-width: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 0;
          color: inherit;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 15px;
          background: #fff;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-example-card:hover {
          transform: translateY(-3px);
          border-color: rgba(8, 33, 38, 0.22);
          box-shadow: 0 18px 38px -28px rgba(8, 33, 38, 0.6);
        }

        .lp-example-img {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          display: block;
          background: #dfe7e4;
        }

        .lp-example-img img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .lp-example-card:hover .lp-example-img img {
          transform: scale(1.025);
        }

        .lp-example-no-photo {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: #7c9195;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-example-weekly {
          position: absolute;
          left: 9px;
          bottom: 9px;
          max-width: calc(100% - 18px);
          padding: 6px 8px;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: rgba(8, 33, 38, 0.82);
          font-size: 9px;
          font-weight: 800;
          backdrop-filter: blur(8px);
        }

        .lp-example-body {
          display: grid;
          gap: 6px;
          padding: 13px;
        }

        .lp-example-price {
          color: var(--lp-ink);
          font-size: 19px;
          font-weight: 830;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .lp-example-title {
          min-height: 34px;
          color: #2f484e;
          font-size: 12.5px;
          font-weight: 780;
          line-height: 1.35;
        }

        .lp-example-meta,
        .lp-example-location {
          min-width: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #718388;
          font-size: 10.8px;
          font-weight: 680;
        }

        .lp-example-state {
          grid-column: 1 / -1;
          min-height: 218px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          padding: 26px;
          color: #62797f;
          border: 1px dashed rgba(8, 33, 38, 0.22);
          border-radius: 14px;
          background: rgba(239, 244, 241, 0.78);
          font-size: 12.5px;
          line-height: 1.5;
        }

        .lp-example-state strong {
          color: var(--lp-ink);
          font-size: 14.5px;
        }

        .lp-state-loader {
          width: 24px;
          height: 24px;
          margin-bottom: 3px;
          border: 3px solid rgba(42, 193, 180, 0.2);
          border-top-color: var(--lp-drive);
          border-radius: 50%;
          animation: lp-spin 0.8s linear infinite;
        }

        .lp-cv-section {
          background:
            radial-gradient(circle at 4% 92%, rgba(198, 168, 106, 0.18), transparent 25%),
            #f1ede3;
        }

        .lp-cv-card {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.72fr);
          gap: 44px;
          align-items: center;
          padding: clamp(34px, 5vw, 62px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          background:
            radial-gradient(circle at 92% 10%, rgba(42, 193, 180, 0.22), transparent 31%),
            linear-gradient(135deg, #071b20 0%, #0b3035 100%);
          box-shadow: 0 38px 86px -58px rgba(8, 33, 38, 0.8);
        }

        .lp-cv-card::before {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          left: -110px;
          bottom: -130px;
          border: 1px solid rgba(198, 168, 106, 0.3);
          border-radius: 50%;
        }

        .lp-cv-copy {
          position: relative;
          z-index: 1;
        }

        .lp-cv-copy .lp-eyebrow {
          color: #7ee3d7;
        }

        .lp-cv-copy .lp-title {
          max-width: 700px;
          color: #fff;
        }

        .lp-cv-copy .lp-copy {
          color: #bfd1d4;
        }

        .lp-cv-points {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px 18px;
          margin: 23px 0 0;
          padding: 0;
          list-style: none;
        }

        .lp-cv-points li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #d3dfe1;
          font-size: 12px;
          font-weight: 700;
        }

        .lp-cv-points svg {
          flex: 0 0 auto;
          color: var(--lp-drive);
        }

        .lp-cv-copy .lp-btn {
          margin-top: 28px;
        }

        .lp-cv-panel {
          position: relative;
          z-index: 1;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 30px;
          color: var(--lp-ink);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 26px 60px -40px rgba(0, 0, 0, 0.7);
        }

        .lp-cv-panel > span {
          color: #72878c;
          font-size: 10px;
          font-weight: 820;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
        }

        .lp-cv-panel img {
          width: min(100%, 320px);
          height: auto;
          display: block;
        }

        .lp-cv-code {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 13px;
          border: 1px solid #d9e3e4;
          border-radius: 10px;
          background: #f3f7f7;
        }

        .lp-cv-code small {
          color: #73878c;
          font-size: 9px;
          font-weight: 780;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-cv-code strong {
          color: #0b5961;
          font-size: 13px;
          letter-spacing: 0.06em;
        }

        .lp-closing-section {
          position: relative;
          padding: 76px 0;
          background:
            radial-gradient(circle at 12% 10%, rgba(42, 193, 180, 0.16), transparent 26%),
            var(--lp-ink);
        }

        .lp-closing-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 34px;
          align-items: center;
          padding: clamp(30px, 5vw, 54px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 26px;
          background:
            linear-gradient(115deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.015)),
            #0a282e;
        }

        .lp-closing-card .lp-eyebrow {
          color: #7ee3d7;
        }

        .lp-closing-card .lp-title {
          max-width: 760px;
          color: #fff;
        }

        .lp-closing-card .lp-copy {
          color: #bfd0d3;
        }

        .lp-closing-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 190px;
        }

        .lp-closing-actions .lp-btn {
          width: 100%;
        }

        @keyframes lp-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lp-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 980px) {
          .lp-hero-card {
            grid-template-columns: 1fr;
          }

          .lp-hero-content::after {
            display: none;
          }

          .lp-hero-media,
          .lp-hero-media img {
            min-height: 390px;
          }

          .lp-examples-grid,
          .lp-cv-card,
          .lp-closing-card {
            grid-template-columns: 1fr;
          }

          .lp-cv-panel {
            min-height: 220px;
          }

          .lp-closing-actions {
            width: min(100%, 440px);
            flex-direction: row;
          }
        }

        @media (max-width: 700px) {
          .lp-shell {
            width: min(100% - 32px, 1260px);
          }

          .lp-hero {
            padding: 16px 0 42px;
          }

          .lp-hero-card {
            min-height: 0;
            border-radius: 23px;
          }

          .lp-hero-content {
            padding: 34px 22px 32px;
          }

          .lp-kicker {
            margin-bottom: 17px;
            font-size: 9.5px;
          }

          .lp-hero h1 {
            font-size: clamp(34px, 10vw, 42px);
            line-height: 1.01;
          }

          .lp-hero-copy {
            margin-top: 18px;
            font-size: 14px;
          }

          .lp-actions {
            display: grid;
            grid-template-columns: 1fr;
            margin-top: 24px;
          }

          .lp-btn {
            width: 100%;
          }

          .lp-hero-media,
          .lp-hero-media img {
            min-height: 292px;
          }

          .lp-hero-photo-label {
            right: 14px;
            bottom: 14px;
          }

          .lp-trust-bar {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .lp-trust-item {
            min-height: 54px;
          }

          .lp-section,
          .lp-closing-section {
            padding: 58px 0;
          }

          .lp-section-head {
            align-items: flex-start;
            margin-bottom: 24px;
          }

          .lp-title {
            font-size: clamp(29px, 9vw, 38px);
          }

          .lp-copy {
            font-size: 13.5px;
          }

          .lp-brand-controls {
            display: none;
          }

          .lp-brand-grid {
            grid-auto-columns: 132px;
            grid-template-rows: repeat(2, 82px);
            gap: 8px;
          }

          .lp-brand-card {
            grid-template-rows: 38px auto;
            padding: 8px;
            border-radius: 13px;
          }

          .lp-brand-mark {
            width: 90px;
            height: 36px;
          }

          .lp-brand-mark img {
            max-height: 35px;
          }

          .lp-example-column {
            padding: 14px;
            border-radius: 18px;
          }

          .lp-example-list {
            grid-template-columns: 1fr;
          }

          .lp-example-state {
            min-height: 185px;
          }

          .lp-cv-card,
          .lp-closing-card {
            gap: 28px;
            padding: 28px 21px;
            border-radius: 22px;
          }

          .lp-cv-points {
            grid-template-columns: 1fr;
          }

          .lp-cv-panel {
            min-height: 190px;
            padding: 24px 18px;
          }

          .lp-closing-actions {
            width: 100%;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-root *,
          .lp-root *::before,
          .lp-root *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}),(0,j.jsx)(M,{}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:(0,j.jsxs)(`div`,{className:`lp-shell`,children:[(0,j.jsxs)(`div`,{className:`lp-hero-card`,children:[(0,j.jsxs)(`div`,{className:`lp-hero-content`,children:[(0,j.jsxs)(`span`,{className:`lp-kicker`,children:[(0,j.jsx)(k.Icon,{path:b,size:.63}),` O teu próximo passo começa aqui`]}),(0,j.jsxs)(`h1`,{id:`lp-hero-title`,children:[`O próximo carro. `,(0,j.jsx)(`span`,{children:`A próxima casa.`}),` Uma escolha mais clara.`]}),(0,j.jsx)(`p`,{className:`lp-hero-copy`,children:`Carros e imóveis reunidos numa experiência simples, cuidada e feita para encontrares o que procuras com confiança.`}),(0,j.jsxs)(`div`,{className:`lp-actions`,children:[(0,j.jsxs)(u,{className:`lp-btn lp-btn-drive`,to:`/carros`,children:[`Descobrir carros `,(0,j.jsx)(k.Icon,{path:_,size:.76})]}),(0,j.jsxs)(u,{className:`lp-btn lp-btn-estate`,to:`/imoveis`,children:[`Explorar imóveis `,(0,j.jsx)(k.Icon,{path:d,size:.76})]})]})]}),(0,j.jsxs)(`div`,{className:`lp-hero-media`,children:[(0,j.jsx)(`img`,{src:`/noxvelia-hero-coast.webp`,alt:`Automóvel premium junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`}),(0,j.jsxs)(`div`,{className:`lp-hero-photo-label`,"aria-hidden":`true`,children:[`Drive `,(0,j.jsx)(`i`,{}),` Estate`]})]})]}),(0,j.jsxs)(`div`,{className:`lp-trust-bar`,"aria-label":`Vantagens da Noxvelia`,children:[(0,j.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,j.jsx)(`span`,{className:`lp-trust-icon`,children:(0,j.jsx)(k.Icon,{path:b,size:.72})}),`Anúncios reais, organizados para decidir melhor`]}),(0,j.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,j.jsx)(`span`,{className:`lp-trust-icon`,children:(0,j.jsx)(k.Icon,{path:h,size:.72})}),`Pesquisa em lista ou mapa em todo o país`]}),(0,j.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,j.jsx)(`span`,{className:`lp-trust-icon`,children:(0,j.jsx)(k.Icon,{path:m,size:.72})}),`Mais contexto antes de cada contacto`]})]})]})}),(0,j.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,j.jsxs)(`div`,{className:`lp-shell`,children:[(0,j.jsxs)(`div`,{className:`lp-section-head`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`lp-eyebrow`,children:`As nossas marcas`}),(0,j.jsxs)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:[O.length,` marcas. Uma pesquisa para encontrares a tua.`]}),(0,j.jsx)(`p`,{className:`lp-copy`,children:`Dos clássicos de sempre às novas referências elétricas, escolhe uma marca e entra diretamente nos anúncios disponíveis.`})]}),(0,j.jsxs)(`div`,{className:`lp-brand-controls`,"aria-label":`Navegar pelas marcas`,children:[(0,j.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>R(-1),"aria-label":`Ver marcas anteriores`,children:(0,j.jsx)(k.Icon,{path:f,size:.82})}),(0,j.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>R(1),"aria-label":`Ver marcas seguintes`,children:(0,j.jsx)(k.Icon,{path:S,size:.82})})]})]}),(0,j.jsx)(`div`,{className:`lp-brand-scroll`,ref:t,"aria-label":`Lista de marcas automóveis`,children:(0,j.jsx)(`div`,{className:`lp-brand-grid`,children:O.map(e=>(0,j.jsxs)(u,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,j.jsxs)(`span`,{className:`lp-brand-mark`,children:[(0,j.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:L(e)}),(0,j.jsx)(`img`,{src:I(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`}})]}),(0,j.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e))})})]})}),(0,j.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,j.jsxs)(`div`,{className:`lp-shell`,children:[(0,j.jsx)(`div`,{className:`lp-section-head`,children:(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`lp-eyebrow`,children:`Mais vistos esta semana`}),(0,j.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`O que está a captar mais atenção agora.`}),(0,j.jsx)(`p`,{className:`lp-copy`,children:`Os anúncios com mais visitas nos últimos sete dias, com um máximo de dois destaques por área.`})]})}),(0,j.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(0,j.jsxs)(`div`,{className:`lp-example-column drive`,children:[(0,j.jsxs)(`div`,{className:`lp-column-top`,children:[(0,j.jsxs)(`div`,{className:`lp-column-heading`,children:[(0,j.jsx)(`span`,{className:`lp-column-icon`,children:(0,j.jsx)(k.Icon,{path:g,size:.72})}),(0,j.jsx)(`h3`,{className:`lp-column-title`,children:`NOXVELIA Drive`})]}),(0,j.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(`/carros`),children:[`Ver carros `,(0,j.jsx)(k.Icon,{path:_,size:.58})]})]}),(0,j.jsx)(`div`,{className:`lp-example-list`,children:n.carro.length>0?n.carro.map(e=>z(e,`/carros`)):B(`Drive`,`/carros`)})]}),(0,j.jsxs)(`div`,{className:`lp-example-column estate`,children:[(0,j.jsxs)(`div`,{className:`lp-column-top`,children:[(0,j.jsxs)(`div`,{className:`lp-column-heading`,children:[(0,j.jsx)(`span`,{className:`lp-column-icon`,children:(0,j.jsx)(k.Icon,{path:d,size:.72})}),(0,j.jsx)(`h3`,{className:`lp-column-title`,children:`NOXVELIA Estate`})]}),(0,j.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(`/imoveis`),children:[`Ver imóveis `,(0,j.jsx)(k.Icon,{path:_,size:.58})]})]}),(0,j.jsx)(`div`,{className:`lp-example-list`,children:n.imovel.length>0?n.imovel.map(e=>z(e,`/imoveis`)):B(`Estate`,`/imoveis`)})]})]})]})}),(0,j.jsx)(D,{placement:`landing_between_highlights`,vertical:`all`,fallback:(0,j.jsx)(E,{placement:`landing_between_highlights`,minHeight:96})}),(0,j.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,j.jsx)(`div`,{className:`lp-shell`,children:(0,j.jsxs)(`div`,{className:`lp-cv-card`,children:[(0,j.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,j.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,j.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro para lá das fotografias.`}),(0,j.jsx)(`p`,{className:`lp-copy`,children:`Consulta os registos disponíveis sobre quilometragem, danos, roubos e utilização anterior antes de marcares uma visita.`}),(0,j.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,j.jsxs)(`li`,{children:[(0,j.jsx)(k.Icon,{path:b,size:.66}),` Mais contexto sobre o veículo`]}),(0,j.jsxs)(`li`,{children:[(0,j.jsx)(k.Icon,{path:b,size:.66}),` Decisões com melhor informação`]})]}),(0,j.jsxs)(`a`,{className:`lp-btn lp-btn-drive`,href:N,target:`_blank`,rel:`noopener noreferrer`,children:[`Verificar um veículo `,(0,j.jsx)(k.Icon,{path:v,size:.7})]})]}),(0,j.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,j.jsx)(`span`,{children:`Histórico automóvel com`}),(0,j.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,j.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,j.jsx)(`small`,{children:`Código`}),(0,j.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})}),(0,j.jsx)(`section`,{className:`lp-closing-section`,"aria-labelledby":`lp-closing-title`,children:(0,j.jsx)(`div`,{className:`lp-shell`,children:(0,j.jsxs)(`div`,{className:`lp-closing-card`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`lp-eyebrow`,children:`Comprar, vender, arrendar`}),(0,j.jsx)(`h2`,{className:`lp-title`,id:`lp-closing-title`,children:`O lugar certo para encontrar — e para ser encontrado.`}),(0,j.jsx)(`p`,{className:`lp-copy`,children:`Publica o teu carro ou imóvel e apresenta-o a quem já está à procura da próxima escolha.`})]}),(0,j.jsxs)(`div`,{className:`lp-closing-actions`,children:[(0,j.jsxs)(u,{className:`lp-btn lp-btn-drive`,to:`/publicar`,children:[(0,j.jsx)(k.Icon,{path:y,size:.74}),` Publicar anúncio`]}),(0,j.jsxs)(u,{className:`lp-btn lp-btn-estate`,to:`/carros`,children:[`Explorar Drive `,(0,j.jsx)(k.Icon,{path:_,size:.72})]})]})]})})})]}),(0,j.jsx)(o,{})]})}export{R as default};