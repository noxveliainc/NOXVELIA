import{A as e,O as t,T as n,b as r,d as i,f as a,g as o,l as s,u as c,v as l,w as u,x as d,y as f}from"./index-C4H3Y4wR.js";import{r as p}from"./images-io1S19E8.js";import{r as m}from"./seo-BmrZTbI5.js";import{t as h}from"./Seo-DilJ5Ih4.js";import{t as g}from"./GoogleAdSlot-CDULwzml.js";import{i as _,r as v,t as y}from"./localizacoes-CvOZjRrK.js";import{t as b}from"./funnelAnalytics-Buo2PjyS.js";var x=e(t(),1),S=f();function C(){let{user:e,signed:t,logout:n}=l(),r=u(),[i,s]=(0,x.useState)(!1),[c,f]=(0,x.useState)(!1),p=(0,x.useRef)(null),m=(0,x.useRef)(null);(0,x.useEffect)(()=>{let e=e=>{p.current&&!p.current.contains(e.target)&&s(!1),m.current&&!m.current.contains(e.target)&&f(!1)},t=e=>{e.key===`Escape`&&(s(!1),f(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,x.useEffect)(()=>{s(!1),f(!1)},[r.pathname]);let h=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=h?.avatarUrl||h?.avatar,_=h?.nome?.charAt(0).toUpperCase()||`U`,v=h?.nome?.split(` `)[0]||``,y=t?`/publicar`:`/login`,b=t?void 0:o(r,`/`);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(`style`,{children:`
        .nl-root,
        .nl-root * {
          box-sizing: border-box;
        }

        .nl-root {
          position: sticky;
          top: 0;
          z-index: 9990;
          width: 100%;
          isolation: isolate;
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
          width: 44px;
          height: 44px;
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
          gap: 8px;
          padding: 12px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-mobile-menu-head {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 6px 6px 12px;
          border-bottom: 1px solid #e3ebe8;
          color: #082126;
        }

        .nl-mobile-menu-head img {
          width: 38px;
          height: 38px;
          display: block;
          object-fit: contain;
        }

        .nl-mobile-menu-head strong {
          display: block;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .nl-mobile-menu-head span {
          display: block;
          margin-top: 2px;
          color: #60767c;
          font-size: 11px;
          font-weight: 720;
        }

        .dark .nl-mobile-menu-head {
          color: #ecfdfb !important;
          border-bottom-color: #334155 !important;
        }

        .dark .nl-mobile-menu-head span {
          color: #b7c7cb !important;
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

        .nl-mobile-menu a.nl-mobile-primary {
          grid-column: 1 / -1;
          justify-content: center;
          min-height: 46px;
          color: #ffffff;
          background: #082126;
        }

        .nl-mobile-menu a:hover,
        .nl-mobile-menu button:hover {
          color: #082126;
          background: #edf6f3;
        }

        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #ffffff;
          background: #0d3036;
        }

        .dark .nl-mobile-menu a.nl-mobile-primary {
          color: #062326 !important;
          background: #2ac1b4 !important;
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
            width: 38px;
            height: 38px;
          }

          .nl-wordmark {
            display: inline;
            font-size: 12px;
            letter-spacing: 0.1em;
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

          .nl-mobile-menu {
            left: 10px;
            right: 10px;
            grid-template-columns: 1fr;
          }
        }
      `}),(0,S.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:m,children:[(0,S.jsxs)(`div`,{className:`nl-inner`,children:[(0,S.jsxs)(d,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,S.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,S.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,S.jsxs)(`div`,{className:`nl-links`,children:[(0,S.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,S.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,S.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,S.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`})]}),(0,S.jsxs)(`div`,{className:`nl-actions`,children:[(0,S.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{s(!1),f(e=>!e)},"aria-expanded":c,"aria-controls":`nl-mobile-menu`,"aria-label":c?`Fechar navegação`:`Abrir navegação`,children:c?(0,S.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,S.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,S.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,S.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,S.jsx)(a,{}),(0,S.jsx)(d,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),t?(0,S.jsxs)(`div`,{ref:p,className:`nl-user-wrap`,children:[(0,S.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${i?`active`:``}`,onClick:()=>{f(!1),s(e=>!e)},"aria-expanded":i,"aria-label":`Abrir menu de utilizador`,children:[(0,S.jsx)(`span`,{className:`nl-avatar`,children:g?(0,S.jsx)(`img`,{src:g,alt:``}):(0,S.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,S.jsx)(`span`,{className:`nl-username`,children:v}),(0,S.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,S.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),i&&(0,S.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,S.jsxs)(d,{to:`/perfil`,onClick:()=>s(!1),className:`nl-ud-item`,children:[(0,S.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,S.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,S.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,S.jsx)(`div`,{className:`nl-ud-divider`}),(0,S.jsxs)(`button`,{type:`button`,onClick:()=>{s(!1),n()},className:`nl-ud-item logout`,children:[(0,S.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,S.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,S.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,S.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):(0,S.jsx)(S.Fragment,{children:(0,S.jsx)(d,{to:`/login`,state:{from:r.pathname},className:`nl-btn-ghost`,children:`Entrar`})})]})]}),c&&(0,S.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,S.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,S.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`strong`,{children:`Noxvelia`}),(0,S.jsx)(`span`,{children:`Drive e Estate em Portugal`})]})]}),(0,S.jsx)(`a`,{href:`#pesquisa`,onClick:()=>f(!1),children:`Pesquisar`}),(0,S.jsx)(`a`,{href:`#anunciar`,onClick:()=>f(!1),children:`Anunciar grátis`}),(0,S.jsx)(`a`,{href:`#marcas`,onClick:()=>f(!1),children:`Marcas`}),(0,S.jsx)(`a`,{href:`#atalhos`,onClick:()=>f(!1),children:`Atalhos`}),(0,S.jsx)(d,{to:`/carros`,onClick:()=>f(!1),children:`Drive`}),(0,S.jsx)(d,{to:`/imoveis`,onClick:()=>f(!1),children:`Estate`}),(0,S.jsx)(d,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>f(!1),children:`Publicar anúncio`}),t?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(d,{to:`/perfil`,onClick:()=>f(!1),children:`O meu perfil`}),(0,S.jsx)(`button`,{type:`button`,onClick:()=>{f(!1),n()},children:`Terminar sessão`})]}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(d,{to:`/login`,state:{from:r.pathname},onClick:()=>f(!1),children:`Entrar`}),(0,S.jsx)(d,{to:`/registo`,onClick:()=>f(!1),children:`Registar`})]})]})]})]})}var w=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,ee=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],te=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],T=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],E=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],D=[`T1`,`T2`,`T3`,`T4`,`T5+`],O=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],k=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),A=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),j=e=>`/marcas/${A(e)}.${e===`Jaecoo`?`svg`:`png`}`,M=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),N=new Set([`aiways`,`aston-martin`,`bentley`]);function P(){let e=n(),t=u(),{signed:a}=l(),f=(0,x.useRef)(null),P=(0,x.useRef)(!1),F=a?`/publicar`:`/login`,I=a?void 0:o(t,`/`),[L,R]=(0,x.useState)({carro:[],imovel:[]}),[z,B]=(0,x.useState)(!0),[V,H]=(0,x.useState)(!1),[U,W]=(0,x.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``});(0,x.useEffect)(()=>{let e=()=>{P.current||c()?.external===!0&&(P.current=!0,b(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||c()?.external===!0)&&e()};return window.addEventListener(s,t),()=>window.removeEventListener(s,t)},[]);let G=U.tipo===`carro`&&U.marca?_(U.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],K=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},q=(e,t)=>{W(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},J=t=>{t.preventDefault();let{tipo:n,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=U,l={distrito:s,precoMax:c,...n===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};b(`search_start`,{vertical:n}),e(K(n,l))};(0,x.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await r.get(`/anuncios/em-alta/semana`);if(!e)return;R({carro:(t?.carro||[]).slice(0,2),imovel:(t?.imovel||[]).slice(0,2)}),H(!1)}catch{e&&(R({carro:[],imovel:[]}),H(!0))}finally{e&&B(!1)}})(),()=>{e=!1}},[]);let Y=(t,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}e(m(t))},X=e=>{f.current?.scrollBy({left:e*Math.min(720,window.innerWidth*.72),behavior:`smooth`})},Z=z||L.carro.length>0||L.imovel.length>0,Q=(e,t)=>{let n=e.tipo===`carro`,r=p(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,S.jsxs)(`button`,{type:`button`,className:`lp-example-card ${n?`drive`:`estate`}`,onClick:()=>Y(e,t),children:[(0,S.jsxs)(`span`,{className:`lp-example-img`,children:[r?(0,S.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,S.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`}),(0,S.jsxs)(`span`,{className:`lp-example-weekly`,children:[`Destaque `,n?`Drive`:`Estate`]})]}),(0,S.jsxs)(`span`,{className:`lp-example-body`,children:[(0,S.jsx)(`span`,{className:`lp-example-price`,children:k(e.preco)}),(0,S.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,S.jsx)(`span`,{className:`lp-example-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,S.jsx)(`span`,{className:`lp-example-location`,children:e.localizacao?.cidade||`Portugal`})]})]},e._id)},$=(t,n)=>z?(0,S.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,S.jsx)(`span`,{className:`lp-state-loader`,"aria-hidden":`true`}),(0,S.jsx)(`strong`,{children:`A selecionar os anúncios com mais interesse.`}),(0,S.jsx)(`span`,{children:`Os destaques refletem as visitas dos últimos sete dias.`})]}):(0,S.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,S.jsx)(`strong`,{children:V?`A seleção semanal está a ser atualizada.`:`Descobre todas as oportunidades em ${t}.`}),(0,S.jsx)(`span`,{children:V?`Entretanto, encontra todos os anúncios na pesquisa completa.`:`Explora a pesquisa e encontra o que combina contigo.`}),(0,S.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(n),children:[`Explorar `,t]})]});return(0,S.jsxs)(`div`,{className:`lp-root`,children:[(0,S.jsx)(h,{title:`Noxvelia | Carros e imóveis em Portugal`,description:`Encontra, compara e publica anúncios de carros e imóveis em Portugal na Noxvelia.`,path:`/`,jsonLd:[{"@context":`https://schema.org`,"@type":`Organization`,name:`Noxvelia`,url:`https://www.noxvelia.com`,logo:`https://www.noxvelia.com/logo-noxvelia.png`},{"@context":`https://schema.org`,"@type":`WebSite`,name:`Noxvelia`,url:`https://www.noxvelia.com`}]}),(0,S.jsx)(`style`,{children:`
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
          background: var(--lp-bg);
        }

        .lp-hero-card {
          min-height: 520px;
          display: grid;
          grid-template-columns: minmax(430px, 0.86fr) minmax(0, 1.14fr);
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 32px;
          background: var(--lp-ink);
          box-shadow: none;
        }

        .lp-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(38px, 4vw, 54px);
          color: #fff;
          background: var(--lp-ink);
        }

        .lp-hero-content::after {
          content: "";
          position: absolute;
          right: -56px;
          top: 0;
          bottom: 0;
          width: 112px;
          z-index: -1;
          background: transparent;
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
          border-color: rgba(255, 255, 255, 0.28);
        }

        .lp-btn-drive {
          color: #052326;
          background: var(--lp-drive);
          box-shadow: none;
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
        }

        .lp-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: transparent;
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
          box-shadow: none;
          backdrop-filter: none;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
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
          backdrop-filter: none;
        }

        .lp-quick-section {
          position: relative;
          z-index: 4;
          padding: 0 0 72px;
          background: var(--lp-stone);
        }

        .lp-quick-card {
          margin-top: -34px;
          padding: 18px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: none;
          backdrop-filter: none;
        }

        .lp-quick-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 16px;
        }

        .lp-quick-title {
          margin: 0;
          color: var(--lp-ink);
          font-size: 18px;
          font-weight: 850;
          letter-spacing: -0.02em;
        }

        .lp-type-tabs {
          display: inline-grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 5px;
          padding: 5px;
          border: 1px solid rgba(8, 33, 38, 0.09);
          border-radius: 13px;
          background: #f4f7f4;
        }

        .lp-type-tab {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 14px;
          color: #4a656b;
          border: 0;
          border-radius: 9px;
          background: transparent;
          font-size: 12px;
          font-weight: 820;
          cursor: pointer;
        }

        .lp-type-tab.active {
          color: #042326;
          background: #fff;
          box-shadow: none;
        }

        .lp-search-form {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr)) auto;
          gap: 10px;
          align-items: end;
        }

        .lp-field {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lp-field label {
          color: #60767c;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-field select,
        .lp-field input {
          width: 100%;
          min-height: 46px;
          padding: 0 12px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.13);
          border-radius: 11px;
          background: #fff;
          font-size: 13px;
          font-weight: 680;
        }

        .lp-field select:disabled {
          color: #87979b;
          background: #f4f6f5;
        }

        .lp-search-submit {
          min-height: 46px;
          min-width: 148px;
          color: #062326;
          border: 0;
          border-radius: 11px;
          background: var(--lp-drive);
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          box-shadow: none;
        }

        .lp-promo-section {
          padding: 0 0 78px;
          background: var(--lp-stone);
        }

        .lp-promo-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lp-promo-link {
          position: relative;
          min-height: 320px;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
          align-items: stretch;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 22px;
          background: #fff;
          text-decoration: none;
          box-shadow: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-promo-link:hover {
          border-color: rgba(8, 33, 38, 0.22);
        }

        .lp-promo-copy {
          position: relative;
          z-index: 2;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          padding: clamp(24px, 4vw, 42px);
          color: var(--lp-ink);
        }

        .lp-promo-label {
          width: fit-content;
          color: #49646a;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 8px;
          background: #f7f8f5;
          padding: 6px 9px;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-promo-title {
          max-width: 380px;
          color: var(--lp-ink);
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 830;
          line-height: 1.08;
        }

        .lp-promo-title span {
          display: block;
          color: #4d6268;
          font-weight: 520;
        }

        .lp-promo-text {
          max-width: 320px;
          margin: 0;
          color: #5d7278;
          font-size: 13.5px;
          line-height: 1.55;
        }

        .lp-promo-media {
          min-width: 0;
          display: block;
          background: #d8e2df;
        }

        .lp-promo-media img {
          width: 100%;
          height: 100%;
          min-height: 320px;
          display: block;
          object-fit: cover;
          object-position: 76% center;
        }

        .lp-promo-overlay {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 14px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.16);
          border-radius: 8px;
          background: #fff;
          box-shadow: none;
          font-size: 12px;
          font-weight: 850;
        }

        .lp-shortcuts-section {
          background: #f8f6ef;
          border-top: 1px solid rgba(8, 33, 38, 0.08);
          border-bottom: 1px solid rgba(8, 33, 38, 0.08);
        }

        .lp-shortcut-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .lp-shortcut-group {
          min-width: 0;
          padding: 18px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
        }

        .lp-shortcut-group.wide {
          grid-column: span 2;
        }

        .lp-shortcut-group h3 {
          margin: 0 0 13px;
          color: var(--lp-ink);
          font-size: 14px;
          font-weight: 850;
        }

        .lp-chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .lp-chip {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          padding: 0 11px;
          color: #315057;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 999px;
          background: #fff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 760;
          transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .lp-chip:hover {
          color: var(--lp-ink);
          border-color: rgba(42, 193, 180, 0.52);
        }

        .lp-guides-section {
          background: #edf4f2;
        }

        .lp-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .lp-guide-card {
          min-height: 210px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 22px;
          padding: 20px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
        }

        .lp-guide-card span {
          color: #16776f;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .lp-guide-card h3 {
          margin: 0;
          font-size: 20px;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }

        .lp-guide-card p {
          margin: 10px 0 0;
          color: #526b72;
          font-size: 13px;
          line-height: 1.55;
        }

        .lp-favorites-strip {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          margin-top: 18px;
          padding: 22px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 19px;
          background: #fff;
        }

        .lp-favorites-strip h3 {
          margin: 0;
          color: var(--lp-ink);
          font-size: 20px;
          letter-spacing: -0.02em;
        }

        .lp-favorites-strip p {
          margin: 7px 0 0;
          color: #526b72;
          font-size: 13px;
          line-height: 1.55;
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
          background: #f3f0e6;
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
          --lp-brand-card-bg: rgba(255, 255, 255, 0.7);
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
          background: var(--lp-brand-card-bg);
          text-decoration: none;
          box-shadow: none;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-brand-card:hover {
          border-color: rgba(42, 193, 180, 0.5);
          background: #fff;
        }

        .lp-brand-mark {
          position: relative;
          width: 104px;
          height: 42px;
          display: grid;
          place-items: center;
          overflow: hidden;
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
          display: none;
          place-items: center;
          color: #567077;
          font-size: 16px;
          font-weight: 850;
          letter-spacing: 0.08em;
        }

        .lp-brand-mark.logo-error .lp-brand-fallback {
          display: grid;
        }

        .lp-brand-mark-clean::after {
          content: "";
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: 0;
          left: 0;
          height: 15px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0), var(--lp-brand-card-bg) 48%);
          pointer-events: none;
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
          background: #e5ebe5;
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
          box-shadow: none;
        }

        .lp-example-column.drive,
        .lp-example-column.estate {
          border-color: rgba(8, 33, 38, 0.14);
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
          border-color: rgba(8, 33, 38, 0.22);
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
          opacity: 0.96;
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
          backdrop-filter: none;
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
        }

        .lp-cv-section {
          background: #f1ede3;
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
          background: #071b20;
          box-shadow: none;
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
          box-shadow: none;
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
          background: var(--lp-ink);
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
          background: #0a282e;
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
          from { opacity: 0; }
          to { opacity: 1; }
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
          .lp-promo-grid,
          .lp-guides-grid,
          .lp-cv-card,
          .lp-closing-card {
            grid-template-columns: 1fr;
          }

          .lp-search-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lp-search-submit {
            grid-column: span 2;
          }

          .lp-shortcut-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
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

          .lp-quick-section,
          .lp-promo-section {
            padding-bottom: 58px;
          }

          .lp-quick-card {
            margin-top: -22px;
            padding: 14px;
            border-radius: 18px;
          }

          .lp-quick-top,
          .lp-favorites-strip {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }

          .lp-quick-top {
            flex-direction: column;
          }

          .lp-type-tabs {
            width: 100%;
          }

          .lp-search-form,
          .lp-shortcut-grid {
            grid-template-columns: 1fr;
          }

          .lp-search-submit,
          .lp-shortcut-group.wide {
            grid-column: auto;
          }

          .lp-promo-link,
          .lp-promo-media img {
            min-height: 245px;
          }

          .lp-promo-link {
            grid-template-columns: 1fr;
          }

          .lp-promo-media {
            order: -1;
          }

          .lp-promo-copy {
            padding: 22px;
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

        .lp-root {
          --lp-ink: #102326;
          --lp-ink-soft: #394f54;
          --lp-muted: #617277;
          --lp-border: #d6dedb;
          --lp-border-strong: #b8c5c1;
          --lp-surface: #ffffff;
          --lp-surface-soft: #f4f6f2;
          --lp-bg: #eceee8;
          --lp-bg-alt: #f6f7f3;
          --lp-dark: #0d2327;
          --lp-drive: #24b8ab;
          --lp-estate: #2f8f63;
          --lp-gold: #9d7b3f;
          --lp-radius: 10px;
          --lp-radius-soft: 8px;
          background: var(--lp-bg) !important;
        }

        .lp-root :where(h1, h2, h3, .lp-title, .lp-quick-title, .lp-column-title, .lp-example-price) {
          letter-spacing: 0 !important;
        }

        .lp-root :where(.lp-hero, .lp-quick-section, .lp-promo-section, .lp-brands-section, .lp-shortcuts-section, .lp-guides-section, .lp-popular-section, .lp-cv-section, .lp-closing-section) {
          background: var(--lp-bg) !important;
          border: 0 !important;
        }

        .lp-root :where(.lp-brands-section, .lp-shortcuts-section, .lp-guides-section, .lp-cv-section) {
          background: var(--lp-bg-alt) !important;
        }

        .lp-root :where(.lp-hero-card, .lp-cv-card, .lp-closing-card) {
          border-radius: var(--lp-radius) !important;
          box-shadow: none !important;
          animation: none !important;
        }

        .lp-hero-card {
          border: 1px solid #18373d !important;
          background: var(--lp-dark) !important;
        }

        .lp-hero-content,
        .lp-cv-card,
        .lp-closing-card {
          background: var(--lp-dark) !important;
        }

        .lp-hero-content::after,
        .lp-hero-media::after,
        .lp-cv-card::before {
          display: none !important;
        }

        .lp-hero-media {
          animation: none !important;
          background: #d7dfdc !important;
        }

        .lp-kicker,
        .lp-eyebrow {
          letter-spacing: 0.08em !important;
        }

        .lp-kicker {
          color: #dff8f5 !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: var(--lp-radius-soft) !important;
          background: rgba(36, 184, 171, 0.16) !important;
        }

        .lp-hero h1 span {
          color: #7fded6 !important;
        }

        .lp-btn,
        .lp-search-submit,
        .lp-type-tab,
        .lp-chip,
        .lp-round-btn,
        .lp-column-link {
          transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease !important;
        }

        .lp-btn:hover,
        .lp-promo-link:hover,
        .lp-chip:hover,
        .lp-brand-card:hover,
        .lp-round-btn:hover,
        .lp-example-card:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .lp-btn,
        .lp-search-submit {
          border-radius: var(--lp-radius-soft) !important;
          box-shadow: none !important;
        }

        .lp-btn-drive,
        .lp-search-submit {
          color: #062326 !important;
          background: var(--lp-drive) !important;
        }

        .lp-btn-estate {
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          background: transparent !important;
        }

        .lp-btn-estate:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .lp-hero-photo-label,
        .lp-promo-overlay,
        .lp-example-weekly {
          border-radius: var(--lp-radius-soft) !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        .lp-trust-item,
        .lp-quick-card,
        .lp-promo-link,
        .lp-shortcut-group,
        .lp-guide-card,
        .lp-favorites-strip,
        .lp-example-column,
        .lp-example-card,
        .lp-example-state,
        .lp-cv-panel,
        .lp-cv-code,
          .lp-brand-card,
          .lp-type-tabs {
          border: 1px solid var(--lp-border) !important;
          border-radius: var(--lp-radius) !important;
          background: var(--lp-surface) !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        .lp-example-column.drive,
        .lp-example-column.estate {
          box-shadow: none !important;
        }

        .lp-example-img img {
          transition: none !important;
        }

        .lp-example-card:hover .lp-example-img img {
          transform: none !important;
        }

        .lp-state-loader {
          animation: none !important;
          border-color: var(--lp-border-strong) !important;
          border-top-color: var(--lp-drive) !important;
        }

        .lp-brand-card {
          border-radius: var(--lp-radius-soft) !important;
        }

        .lp-promo-link {
          isolation: isolate;
          border-color: var(--lp-border-strong) !important;
          background: var(--lp-surface) !important;
        }

        .lp-promo-link::before,
        .lp-promo-link::after {
          display: none !important;
        }

        .lp-promo-copy {
          background: var(--lp-surface) !important;
        }

        .lp-promo-label {
          color: var(--lp-ink-soft) !important;
          border-color: var(--lp-border) !important;
          border-radius: var(--lp-radius-soft) !important;
          background: var(--lp-surface-soft) !important;
        }

        .lp-promo-title,
        .lp-promo-title span {
          letter-spacing: 0 !important;
        }

        .lp-promo-title {
          color: var(--lp-ink) !important;
        }

        .lp-promo-title span {
          color: var(--lp-muted) !important;
        }

        .lp-promo-media {
          border-left: 1px solid var(--lp-border) !important;
          background: var(--lp-surface-soft) !important;
        }

        .lp-promo-overlay {
          border-color: var(--lp-border-strong) !important;
          background: var(--lp-surface) !important;
        }

        .lp-brand-scroll {
          scrollbar-color: var(--lp-border-strong) transparent !important;
        }

        .lp-cv-card {
          border: 1px solid #18373d !important;
        }

        .lp-cv-panel {
          color: var(--lp-ink) !important;
        }

        .lp-closing-card {
          border: 1px solid #18373d !important;
        }

        .lp-root :where(
          .lp-hero,
          .lp-hero-card,
          .lp-hero-content,
          .lp-hero-media,
          .lp-quick-section,
          .lp-promo-section,
          .lp-promo-link,
          .lp-promo-copy,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-guides-section,
          .lp-cv-section,
          .lp-cv-card,
          .lp-cv-panel,
          .lp-closing-section,
          .lp-closing-card,
          .lp-btn,
          .lp-search-submit,
          .lp-type-tab.active
        ) {
          background-image: none !important;
        }

        .lp-copy,
        .lp-promo-text,
        .lp-guide-card p,
        .lp-favorites-strip p,
        .lp-cv-points {
          max-width: 560px !important;
        }

        .lp-section-head {
          margin-bottom: 18px !important;
        }

        .lp-title {
          max-width: 720px !important;
        }

        .lp-root :where(.lp-hero-content, .lp-hero-media, .lp-cv-card, .lp-promo-link)::before,
        .lp-root :where(.lp-hero-content, .lp-hero-media, .lp-cv-card, .lp-promo-link)::after {
          content: none !important;
          display: none !important;
        }

        .lp-trust-item {
          align-items: flex-start !important;
          justify-content: center !important;
          gap: 0 !important;
          padding: 16px 17px !important;
          color: var(--lp-ink-soft) !important;
          line-height: 1.45 !important;
        }

        .lp-type-tab,
        .lp-column-heading,
        .lp-cv-points li,
        .lp-example-meta,
        .lp-example-location {
          gap: 0 !important;
        }

        .lp-round-btn {
          width: auto !important;
          min-width: 82px !important;
          padding: 0 12px !important;
          border-radius: var(--lp-radius-soft) !important;
          font-size: 11px !important;
        }

        .lp-hero {
          padding: 42px 0 22px !important;
          background: var(--lp-bg) !important;
        }

        .lp-hero-card {
          min-height: 0 !important;
          display: grid !important;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr) !important;
          position: relative !important;
          overflow: hidden !important;
          background: #ffffff !important;
          border: 1px solid var(--lp-border) !important;
          border-radius: 8px !important;
          box-shadow: 0 18px 44px rgba(7, 27, 34, 0.08) !important;
        }

        .lp-hero-media {
          position: relative !important;
          inset: auto !important;
          min-height: 440px !important;
          background: #eef3ef !important;
          border-left: 1px solid var(--lp-border) !important;
        }

        .lp-hero-media img {
          width: 100% !important;
          height: 100% !important;
          min-height: 440px !important;
          object-fit: cover !important;
          object-position: center !important;
          opacity: 1 !important;
          filter: none !important;
        }

        .lp-hero-content {
          position: relative !important;
          z-index: 2 !important;
          width: auto !important;
          min-height: 440px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          padding: clamp(32px, 5vw, 64px) !important;
          background: #ffffff !important;
        }

        .lp-hero h1 {
          max-width: 560px !important;
          font-size: clamp(38px, 5vw, 62px) !important;
          line-height: 1.02 !important;
          color: var(--lp-ink) !important;
        }

        .lp-kicker {
          color: #06373b !important;
          border-color: rgba(36, 184, 171, 0.34) !important;
          background: rgba(36, 184, 171, 0.16) !important;
        }

        .lp-hero h1 span {
          display: block !important;
          color: var(--lp-teal-dark) !important;
        }

        .lp-hero-copy {
          max-width: 470px !important;
          font-size: 16px !important;
          color: var(--lp-ink-soft) !important;
        }

        .lp-actions {
          margin-top: 28px !important;
          align-items: center !important;
          gap: 12px !important;
        }

        .lp-btn {
          border-radius: 8px !important;
          box-shadow: none !important;
          min-width: 112px !important;
        }

        .lp-btn-estate {
          color: var(--lp-ink) !important;
          border-color: var(--lp-border-strong) !important;
          background: #ffffff !important;
        }

        .lp-btn-estate:hover {
          color: var(--lp-ink) !important;
          background: #f7faf8 !important;
          border-color: var(--lp-teal-dark) !important;
        }

        .lp-hero-photo-label {
          display: none !important;
        }

        .lp-trust-bar {
          display: none !important;
        }

        .lp-quick-section {
          padding: 0 0 48px !important;
        }

        .lp-quick-card {
          margin-top: 10px !important;
          border-radius: 8px !important;
          padding: 18px !important;
          box-shadow: none !important;
          border: 1px solid var(--lp-border) !important;
        }

        .lp-quick-top {
          margin-bottom: 13px !important;
        }

        .lp-quick-title {
          font-size: 17px !important;
        }

        .lp-promo-section,
        .lp-section,
        .lp-closing-section {
          padding-top: 50px !important;
          padding-bottom: 50px !important;
        }

        .lp-promo-grid {
          gap: 18px !important;
        }

        .lp-promo-link {
          display: grid !important;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr) !important;
          min-height: 300px !important;
          background: #ffffff !important;
          border: 1px solid var(--lp-border) !important;
          box-shadow: none !important;
          overflow: hidden !important;
        }

        .lp-promo-copy {
          min-height: 300px !important;
          padding: 32px !important;
          justify-content: center !important;
          background: #ffffff !important;
        }

        .lp-promo-title {
          max-width: 360px !important;
          font-size: clamp(24px, 2.4vw, 34px) !important;
          line-height: 1.05 !important;
        }

        .lp-promo-text {
          max-width: 300px !important;
        }

        .lp-promo-media {
          min-height: 300px !important;
          border-left: 1px solid var(--lp-border) !important;
          background: #eef3ef !important;
        }

        .lp-promo-media img {
          height: 100% !important;
          opacity: 1 !important;
          filter: none !important;
          transform: none !important;
        }

        .lp-promo-link,
        .lp-shortcut-group,
        .lp-guide-card,
        .lp-favorites-strip,
        .lp-example-column,
        .lp-cv-card,
        .lp-closing-card {
          border-radius: 8px !important;
        }

        @media (max-width: 700px) {
          .lp-root :where(.lp-hero-card, .lp-cv-card, .lp-closing-card) {
            border-radius: var(--lp-radius) !important;
          }

          .lp-trust-item,
          .lp-quick-card,
          .lp-promo-link,
          .lp-shortcut-group,
          .lp-guide-card,
          .lp-favorites-strip,
          .lp-example-column,
          .lp-example-card,
          .lp-example-state,
          .lp-cv-panel,
          .lp-cv-code,
            .lp-brand-card,
            .lp-type-tabs {
            border-radius: var(--lp-radius-soft) !important;
          }

          .lp-promo-media {
            border-left: 0 !important;
            border-bottom: 1px solid var(--lp-border) !important;
          }

          .lp-section-head .lp-copy,
          .lp-guide-card p,
          .lp-favorites-strip p,
          .lp-cv-points {
            display: none !important;
          }

          .lp-trust-bar {
            grid-template-columns: 1fr !important;
          }

          .lp-hero {
            padding-top: 18px !important;
          }

          .lp-hero-card {
            grid-template-columns: 1fr !important;
          }

          .lp-hero-content {
            min-height: auto !important;
            padding: 28px 22px 24px !important;
          }

          .lp-hero-media {
            min-height: 260px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }

          .lp-hero-media img {
            min-height: 260px !important;
          }

          .lp-hero h1 {
            font-size: clamp(36px, 12vw, 50px) !important;
          }

          .lp-hero-copy {
            max-width: 330px !important;
          }

          .lp-promo-link {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }

          .lp-promo-copy {
            min-height: auto !important;
            padding: 24px !important;
          }

          .lp-promo-media {
            min-height: 220px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }
        }

        .lp-root {
          --lp-teal-dark: #168b82;
          --lp-dark: #082126;
          --lp-bg: #eef1ec;
          --lp-bg-alt: #fbfcf9;
          --lp-surface-soft: #f5f7f2;
        }

        .lp-shell {
          width: min(1180px, calc(100% - 48px)) !important;
        }

        .lp-hero {
          padding: 22px 0 0 !important;
        }

        .lp-hero .lp-shell {
          width: min(1180px, calc(100% - 48px)) !important;
        }

        .lp-hero-card {
          height: 420px !important;
          min-height: 0 !important;
          grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr) !important;
          overflow: hidden !important;
          background: var(--lp-dark) !important;
          border-color: rgba(8, 33, 38, 0.22) !important;
          border-radius: 8px !important;
          box-shadow: none !important;
          transform: translateY(8px) !important;
        }

        .lp-hero-content {
          height: 100% !important;
          min-height: 0 !important;
          padding: 30px 42px !important;
          color: #ffffff !important;
          background: var(--lp-dark) !important;
        }

        .lp-hero-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 12px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lp-hero-brand img {
          width: 44px;
          height: 44px;
          display: block;
          object-fit: contain;
        }

        .lp-hero .lp-kicker {
          margin-bottom: 14px !important;
          padding: 7px 10px !important;
          color: #dff8f5 !important;
          border-color: rgba(126, 227, 215, 0.28) !important;
          background: rgba(36, 184, 171, 0.14) !important;
        }

        .lp-hero h1 {
          color: #ffffff !important;
          font-size: clamp(31px, 2.7vw, 42px) !important;
          line-height: 1.02 !important;
        }

        .lp-hero h1 span {
          color: #7ee3d7 !important;
        }

        .lp-hero-copy {
          max-width: 420px !important;
          color: #c5d8d8 !important;
          font-size: 14.5px !important;
          line-height: 1.55 !important;
        }

        .lp-text-link {
          display: inline-flex;
          align-items: center;
          min-height: 46px;
          color: #e6fbf8;
          text-decoration: none;
          font-size: 13px;
          font-weight: 850;
          border-bottom: 1px solid rgba(126, 227, 215, 0.46);
        }

        .lp-text-link:hover {
          color: #ffffff;
          border-color: #ffffff;
        }

        .lp-hero-media,
        .lp-hero-media img {
          height: 100% !important;
          min-height: 0 !important;
        }

        .lp-hero-media {
          overflow: hidden !important;
          border-left: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 0 8px 8px 0 !important;
          background: #dfe9e3 !important;
        }

        .lp-trust-bar {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 0 !important;
          margin-top: 0 !important;
          border: 1px solid var(--lp-border) !important;
          border-top: 0 !important;
          background: #ffffff !important;
        }

        .lp-trust-item {
          min-height: 72px !important;
          border: 0 !important;
          border-right: 1px solid var(--lp-border) !important;
          border-radius: 0 !important;
          background: #ffffff !important;
          color: #31494f !important;
          font-size: 13px !important;
        }

        .lp-trust-item:last-child {
          border-right: 0 !important;
        }

        .lp-quick-section {
          padding: 0 0 18px !important;
          background: var(--lp-bg) !important;
        }

        .lp-quick-card {
          margin-top: 10px !important;
          padding: clamp(18px, 2.4vw, 28px) !important;
          border-color: rgba(8, 33, 38, 0.18) !important;
          background: rgba(255, 255, 255, 0.98) !important;
        }

        .lp-type-tabs {
          gap: 4px !important;
          padding: 4px !important;
          border-color: rgba(8, 33, 38, 0.18) !important;
          background: #eef5f3 !important;
        }

        .lp-type-tab {
          position: relative !important;
          min-width: 82px !important;
          gap: 6px !important;
          border: 1px solid transparent !important;
          color: #38555b !important;
          background: transparent !important;
          font-weight: 880 !important;
        }

        .lp-type-tab.active {
          color: #ffffff !important;
          border-color: #082126 !important;
          background: #082126 !important;
          box-shadow: 0 10px 20px -16px rgba(8, 33, 38, 0.8) !important;
        }


        .lp-quick-top {
          align-items: flex-end !important;
          margin-bottom: 18px !important;
        }

        .lp-quick-title {
          font-size: clamp(22px, 2.4vw, 30px) !important;
          line-height: 1.08 !important;
        }

        .lp-quick-copy {
          max-width: 520px;
          margin: 8px 0 0;
          color: #4c6268;
          font-size: 14px;
          line-height: 1.5;
        }

        .dark .lp-quick-copy {
          color: #b7c7cb !important;
        }

        .lp-field label {
          color: #425b62 !important;
        }

        .lp-field select,
        .lp-field input {
          min-height: 50px !important;
          border-color: rgba(8, 33, 38, 0.18) !important;
        }

        .lp-search-submit {
          min-height: 50px !important;
          min-width: 162px !important;
        }

        .lp-promo-section {
          padding: 66px 0 !important;
          background: var(--lp-dark) !important;
        }

        .lp-promo-link {
          min-height: 330px !important;
          border-color: rgba(255, 255, 255, 0.14) !important;
          background: rgba(255, 255, 255, 0.04) !important;
        }

        .lp-promo-copy {
          min-height: 330px !important;
          background: transparent !important;
        }

        .lp-promo-label {
          color: #dff8f5 !important;
          border-color: rgba(126, 227, 215, 0.2) !important;
          background: rgba(36, 184, 171, 0.12) !important;
        }

        .lp-promo-title {
          color: #ffffff !important;
        }

        .lp-promo-text {
          color: #c5d8d8 !important;
        }

        .lp-promo-media {
          min-height: 330px !important;
          border-left-color: rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.06) !important;
        }

        .lp-promo-overlay {
          color: #082126 !important;
          border-color: transparent !important;
          background: #ffffff !important;
        }

        .lp-brands-section {
          padding: 56px 0 46px !important;
          background: #ffffff !important;
        }

        .lp-shortcuts-section {
          padding: 54px 0 !important;
          background: var(--lp-bg) !important;
        }

        .lp-shortcut-grid {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.15fr) minmax(0, 0.9fr) !important;
          gap: 14px !important;
        }

        .lp-shortcut-group {
          padding: 18px !important;
        }

        .lp-shortcut-group:nth-child(4),
        .lp-shortcut-group:nth-child(5) {
          grid-column: span 1 !important;
        }

        .lp-popular-section {
          padding: 58px 0 !important;
          background: #ffffff !important;
        }

        .lp-example-weekly {
          color: #123033 !important;
          background: rgba(255, 255, 255, 0.92) !important;
        }

        .lp-cv-section {
          padding: 60px 0 72px !important;
          background: var(--lp-bg-alt) !important;
        }

        .lp-cv-card {
          min-height: 0 !important;
          border: 1px solid var(--lp-border) !important;
          background: #ffffff !important;
        }

        .lp-cv-copy {
          padding: clamp(28px, 4vw, 46px) !important;
        }

        .lp-cv-card .lp-title {
          color: var(--lp-ink) !important;
        }

        .lp-cv-card .lp-copy,
        .lp-cv-points {
          color: #4c6268 !important;
        }

        .lp-cv-panel {
          background: var(--lp-surface-soft) !important;
        }

        @media (max-width: 980px) {
          .lp-hero-card,
          .lp-promo-grid,
          .lp-cv-card {
            grid-template-columns: 1fr !important;
          }

          .lp-hero-card {
            height: auto !important;
            transform: none !important;
          }

          .lp-hero-content {
            height: auto !important;
            min-height: auto !important;
          }

          .lp-hero-media,
          .lp-hero-media img {
            height: auto !important;
            min-height: 330px !important;
          }

          .lp-hero-media,
          .lp-promo-media {
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }

          .lp-hero-media {
            border-radius: 0 0 8px 8px !important;
          }

          .lp-search-form,
          .lp-shortcut-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .lp-search-submit {
            grid-column: 1 / -1 !important;
            width: 100% !important;
          }
        }

        @media (max-width: 700px) {
          .lp-shell {
            width: min(100% - 28px, 1180px) !important;
          }

          .lp-hero {
            padding-top: 14px !important;
          }

          .lp-hero-content {
            min-height: auto !important;
            padding: 22px 20px 24px !important;
          }

          .lp-hero-brand {
            gap: 10px;
            margin-bottom: 12px;
            font-size: 13px;
          }

          .lp-hero-brand img {
            width: 42px;
            height: 42px;
          }

          .lp-hero h1 {
            font-size: clamp(34px, 10vw, 44px) !important;
            line-height: 1.02 !important;
          }

          .lp-hero-copy {
            font-size: 15.5px !important;
          }

          .lp-actions {
            align-items: stretch !important;
          }

          .lp-text-link {
            justify-content: center;
          }

          .lp-trust-bar {
            display: none !important;
          }

          .lp-hero-media {
            display: none !important;
          }

          .lp-quick-card {
            margin-top: 12px !important;
          }

          .lp-quick-top {
            align-items: stretch !important;
          }

          .lp-quick-copy {
            font-size: 13.5px;
          }

          .lp-search-form,
          .lp-shortcut-grid {
            grid-template-columns: 1fr !important;
          }

          .lp-promo-section,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-cv-section {
            padding-top: 42px !important;
            padding-bottom: 42px !important;
          }

          .lp-promo-copy,
          .lp-cv-copy {
            padding: 22px !important;
          }

          .lp-promo-media,
          .lp-promo-media img {
            min-height: 210px !important;
          }

          .lp-brand-controls {
            display: none !important;
          }

          .lp-examples-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .lp-root {
          --lp-bg: #ffffff;
          --lp-bg-alt: #ffffff;
          --lp-surface-soft: #f6f8f6;
          background: #ffffff !important;
          background-image: none !important;
        }

        .dark .lp-root {
          --lp-ink: #f4fbfa;
          --lp-ink-soft: #d8e5e7;
          --lp-muted: #a9bcc0;
          --lp-border: rgba(148, 163, 184, 0.22);
          --lp-border-strong: rgba(148, 163, 184, 0.3);
          --lp-surface: #0d2327;
          --lp-surface-soft: #102a2f;
          --lp-bg: #071619;
          --lp-bg-alt: #0a1d21;
          background: #071619 !important;
          background-image: none !important;
          color: #edf7f6 !important;
        }

        .lp-root :where(
          .lp-hero,
          .lp-quick-section,
          .lp-promo-section,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-cv-section
        ) {
          background: #ffffff !important;
          background-image: none !important;
        }

        .dark .lp-root :where(
          .lp-hero,
          .lp-quick-section,
          .lp-promo-section,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-cv-section
        ) {
          background: var(--lp-bg) !important;
          background-image: none !important;
        }

        .dark .lp-root :where(.lp-brands-section, .lp-shortcuts-section, .lp-cv-section) {
          background: var(--lp-bg-alt) !important;
        }

        .lp-promo-section {
          padding: 20px 0 54px !important;
        }

        .lp-promo-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }

        .lp-promo-link {
          min-height: 260px !important;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
          border: 1px solid var(--lp-border) !important;
          background: #ffffff !important;
          color: var(--lp-ink) !important;
        }

        .lp-promo-link.estate .lp-promo-copy {
          order: 2;
        }

        .lp-promo-link.estate .lp-promo-media {
          order: 1;
          border-left: 0 !important;
          border-right: 1px solid var(--lp-border) !important;
        }

        .lp-promo-copy {
          min-height: 260px !important;
          padding: clamp(26px, 3vw, 40px) !important;
          background: #ffffff !important;
        }

        .lp-promo-title {
          max-width: 520px !important;
          color: var(--lp-ink) !important;
          font-size: clamp(25px, 2.55vw, 34px) !important;
          line-height: 1.08 !important;
        }

        .lp-promo-text {
          max-width: 420px !important;
          color: #3f5960 !important;
        }

        .lp-promo-label {
          color: #0f4a4b !important;
          border-color: rgba(36, 184, 171, 0.28) !important;
          background: rgba(36, 184, 171, 0.1) !important;
        }

        .lp-promo-overlay {
          width: fit-content !important;
          color: #062326 !important;
          border: 1px solid rgba(8, 33, 38, 0.14) !important;
          background: #ffffff !important;
        }

        .lp-promo-media {
          min-height: 260px !important;
          border-left: 1px solid var(--lp-border) !important;
          background: #f3f6f3 !important;
        }

        .lp-shortcuts-section,
        .lp-cv-section {
          border-top: 1px solid var(--lp-border) !important;
          border-bottom: 1px solid var(--lp-border) !important;
        }

        .lp-cv-points li {
          color: #4c6268 !important;
        }

        .dark .lp-promo-link {
          border-color: rgba(148, 163, 184, 0.22) !important;
          background: #0d2327 !important;
          color: #edf7f6 !important;
        }

        .dark .lp-promo-copy {
          background: #0d2327 !important;
        }

        .dark .lp-promo-title {
          color: #f4fbfa !important;
        }

        .dark .lp-promo-text {
          color: #b7c9cd !important;
        }

        .dark .lp-promo-label {
          color: #7ee3d7 !important;
          border-color: rgba(126, 227, 215, 0.28) !important;
          background: rgba(42, 193, 180, 0.12) !important;
        }

        .dark .lp-promo-overlay {
          color: #062326 !important;
          border-color: transparent !important;
          background: #7ee3d7 !important;
        }

        .dark .lp-promo-media {
          border-left-color: rgba(148, 163, 184, 0.22) !important;
          background: #071619 !important;
        }

        .dark .lp-shortcuts-section,
        .dark .lp-cv-section {
          border-top-color: rgba(148, 163, 184, 0.22) !important;
          border-bottom-color: rgba(148, 163, 184, 0.22) !important;
        }

        .dark .lp-cv-points li {
          color: #b7c9cd !important;
        }

        .dark .lp-trust-bar,
        .dark .lp-trust-item,
        .dark .lp-quick-card,
        .dark .lp-type-tabs,
        .dark .lp-brand-card,
        .dark .lp-shortcut-group,
        .dark .lp-example-column,
        .dark .lp-example-card,
        .dark .lp-example-state,
        .dark .lp-cv-card,
        .dark .lp-cv-panel {
          border-color: rgba(148, 163, 184, 0.22) !important;
          background: #0d2327 !important;
          color: #edf7f6 !important;
        }

        .dark .lp-brand-card {
          --lp-brand-card-bg: #0d2327;
        }

        .dark .lp-trust-item {
          border-right-color: rgba(148, 163, 184, 0.22) !important;
          color: #cfe0e2 !important;
        }

        .dark .lp-quick-title,
        .dark .lp-title,
        .dark .lp-column-title,
        .dark .lp-shortcut-group h3,
        .dark .lp-example-price,
        .dark .lp-cv-card .lp-title {
          color: #f4fbfa !important;
        }

        .dark .lp-copy,
        .dark .lp-example-meta,
        .dark .lp-example-location,
        .dark .lp-cv-card .lp-copy,
        .dark .lp-cv-panel > span {
          color: #b7c9cd !important;
        }

        .dark .lp-field label {
          color: #bfd1d4 !important;
        }

        .dark .lp-field select,
        .dark .lp-field input {
          border-color: rgba(148, 163, 184, 0.26) !important;
          background: #071619 !important;
          color: #f4fbfa !important;
        }

        .dark .lp-field select:disabled {
          color: #8fa3a7 !important;
          background: #102a2f !important;
        }

        .dark .lp-type-tab {
          color: #b7c9cd !important;
        }

        .dark .lp-type-tab.active {
          border-color: #7ee3d7 !important;
          background: #7ee3d7 !important;
          color: #062326 !important;
          box-shadow: 0 10px 20px -16px rgba(126, 227, 215, 0.62) !important;
        }


        .dark .lp-brand-card:hover,
        .dark .lp-example-card:hover {
          border-color: rgba(126, 227, 215, 0.38) !important;
          background: #102a2f !important;
        }

        .dark .lp-chip,
        .dark .lp-column-link {
          border-color: rgba(126, 227, 215, 0.18) !important;
          background: rgba(126, 227, 215, 0.08) !important;
          color: #dff8f5 !important;
        }

        .dark .lp-example-weekly {
          color: #062326 !important;
          background: rgba(126, 227, 215, 0.92) !important;
        }

        @media (max-width: 760px) {
          .lp-promo-link {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }

          .lp-promo-link.estate .lp-promo-copy,
          .lp-promo-link.estate .lp-promo-media {
            order: initial;
          }

          .lp-promo-link.estate .lp-promo-media {
            border-right: 0 !important;
          }

          .lp-promo-copy {
            min-height: auto !important;
          }

          .lp-promo-media {
            min-height: 210px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }

          .dark .lp-promo-media {
            border-top-color: rgba(148, 163, 184, 0.22) !important;
          }
        }
      `}),(0,S.jsx)(C,{}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:(0,S.jsx)(`div`,{className:`lp-shell`,children:(0,S.jsxs)(`div`,{className:`lp-hero-card`,children:[(0,S.jsxs)(`div`,{className:`lp-hero-content`,children:[(0,S.jsxs)(`div`,{className:`lp-hero-brand`,"aria-label":`NOXVELIA`,children:[(0,S.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,S.jsx)(`span`,{children:`NOXVELIA`})]}),(0,S.jsx)(`span`,{className:`lp-kicker`,children:`Drive / Estate`}),(0,S.jsxs)(`h1`,{id:`lp-hero-title`,children:[`Carros e imóveis em Portugal. `,(0,S.jsx)(`span`,{children:`Mais simples.`})]}),(0,S.jsx)(`p`,{className:`lp-hero-copy`,children:`Encontra carros e imóveis com fotos, preço, localização e contactos num só sítio.`}),(0,S.jsxs)(`div`,{className:`lp-actions`,children:[(0,S.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:`#pesquisa`,children:`Começar pela pesquisa`}),(0,S.jsx)(d,{className:`lp-text-link`,to:F,state:I,children:`Publicar grátis`})]})]}),(0,S.jsxs)(`div`,{className:`lp-hero-media`,children:[(0,S.jsx)(`img`,{src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`}),(0,S.jsx)(`div`,{className:`lp-hero-photo-label`,"aria-hidden":`true`,children:`Drive / Estate`})]})]})})}),(0,S.jsx)(`section`,{className:`lp-quick-section`,id:`pesquisa`,"aria-labelledby":`lp-quick-title`,children:(0,S.jsx)(`div`,{className:`lp-shell`,children:(0,S.jsxs)(`form`,{className:`lp-quick-card`,onSubmit:J,children:[(0,S.jsxs)(`div`,{className:`lp-quick-top`,children:[(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa rápida`}),(0,S.jsx)(`h2`,{className:`lp-quick-title`,id:`lp-quick-title`,children:`Começa pelo que queres encontrar.`}),(0,S.jsx)(`p`,{className:`lp-quick-copy`,children:`Filtra por tipo, localização e preço. Depois abres a lista certa: carros ou imóveis.`})]}),(0,S.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,S.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":U.tipo===`carro`,className:`lp-type-tab ${U.tipo===`carro`?`active`:``}`,onClick:()=>q(`tipo`,`carro`),children:`Drive`}),(0,S.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":U.tipo===`imovel`,className:`lp-type-tab ${U.tipo===`imovel`?`active`:``}`,onClick:()=>q(`tipo`,`imovel`),children:`Estate`})]})]}),(0,S.jsxs)(`div`,{className:`lp-search-form`,children:[U.tipo===`carro`?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(`div`,{className:`lp-field`,children:[(0,S.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,S.jsxs)(`select`,{id:`lp-marca`,value:U.marca,onChange:e=>q(`marca`,e.target.value),children:[(0,S.jsx)(`option`,{value:``,children:`Todas as marcas`}),v.map(e=>(0,S.jsx)(`option`,{value:e,children:e},e))]})]}),(0,S.jsxs)(`div`,{className:`lp-field`,children:[(0,S.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,S.jsxs)(`select`,{id:`lp-modelo`,value:U.modelo,onChange:e=>q(`modelo`,e.target.value),disabled:!U.marca,children:[(0,S.jsx)(`option`,{value:``,children:U.marca?`Todos os modelos`:`Escolhe a marca`}),G.map(e=>(0,S.jsx)(`option`,{value:e,children:e},e))]})]}),(0,S.jsxs)(`div`,{className:`lp-field`,children:[(0,S.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,S.jsxs)(`select`,{id:`lp-combustivel`,value:U.combustivel,onChange:e=>q(`combustivel`,e.target.value),children:[(0,S.jsx)(`option`,{value:``,children:`Todos`}),T.map(e=>(0,S.jsx)(`option`,{value:e,children:e},e))]})]})]}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(`div`,{className:`lp-field`,children:[(0,S.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,S.jsxs)(`select`,{id:`lp-tipologia`,value:U.tipologia,onChange:e=>q(`tipologia`,e.target.value),children:[(0,S.jsx)(`option`,{value:``,children:`Todas`}),D.map(e=>(0,S.jsx)(`option`,{value:e,children:e},e))]})]}),(0,S.jsxs)(`div`,{className:`lp-field`,children:[(0,S.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,S.jsxs)(`select`,{id:`lp-estate-preco`,value:U.precoMax,onChange:e=>q(`precoMax`,e.target.value),children:[(0,S.jsx)(`option`,{value:``,children:`Qualquer preço`}),O.slice(2).map(e=>(0,S.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,S.jsxs)(`div`,{className:`lp-field`,children:[(0,S.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,S.jsxs)(`select`,{id:`lp-distrito`,value:U.distrito,onChange:e=>q(`distrito`,e.target.value),children:[(0,S.jsx)(`option`,{value:``,children:`Portugal inteiro`}),y.map(e=>(0,S.jsx)(`option`,{value:e,children:e},e))]})]}),U.tipo===`carro`&&(0,S.jsxs)(`div`,{className:`lp-field`,children:[(0,S.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,S.jsxs)(`select`,{id:`lp-preco`,value:U.precoMax,onChange:e=>q(`precoMax`,e.target.value),children:[(0,S.jsx)(`option`,{value:``,children:`Qualquer preço`}),O.slice(0,2).map(e=>(0,S.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,S.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]})]})})}),(0,S.jsx)(`section`,{className:`lp-promo-section`,id:`anunciar`,"aria-label":`Anunciar grátis na Noxvelia`,children:(0,S.jsx)(`div`,{className:`lp-shell`,children:(0,S.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,S.jsxs)(d,{className:`lp-promo-link drive`,to:`/carros`,children:[(0,S.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,S.jsx)(`span`,{className:`lp-promo-label`,children:`NOXVELIA Drive`}),(0,S.jsx)(`strong`,{className:`lp-promo-title`,children:`Carros apresentados com o essencial à frente.`}),(0,S.jsx)(`span`,{className:`lp-promo-text`,children:`Fotos, preço, localização e dados técnicos num formato direto.`}),(0,S.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar carro`})]}),(0,S.jsx)(`span`,{className:`lp-promo-media`,children:(0,S.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia Drive`,loading:`lazy`})})]}),(0,S.jsxs)(d,{className:`lp-promo-link estate`,to:`/imoveis`,children:[(0,S.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,S.jsx)(`span`,{className:`lp-promo-label`,children:`NOXVELIA Estate`}),(0,S.jsx)(`strong`,{className:`lp-promo-title`,children:`Imóveis com leitura rápida antes do contacto.`}),(0,S.jsx)(`span`,{className:`lp-promo-text`,children:`Localização, fotografias e características fáceis de comparar.`}),(0,S.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar imóvel`})]}),(0,S.jsx)(`span`,{className:`lp-promo-media`,children:(0,S.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia Estate`,loading:`lazy`})})]})]})})}),(0,S.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,S.jsxs)(`div`,{className:`lp-shell`,children:[(0,S.jsxs)(`div`,{className:`lp-section-head`,children:[(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`span`,{className:`lp-eyebrow`,children:`Drive`}),(0,S.jsx)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:`Marcas auto prontas a pesquisar.`}),(0,S.jsx)(`p`,{className:`lp-copy`,children:`Escolhe a marca e segue diretamente para resultados filtrados.`})]}),(0,S.jsxs)(`div`,{className:`lp-brand-controls`,"aria-label":`Navegar pelas marcas`,children:[(0,S.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>X(-1),"aria-label":`Ver marcas anteriores`,children:`Anterior`}),(0,S.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>X(1),"aria-label":`Ver marcas seguintes`,children:`Seguinte`})]})]}),(0,S.jsx)(`div`,{className:`lp-brand-scroll`,ref:f,"aria-label":`Lista de marcas automóveis`,children:(0,S.jsx)(`div`,{className:`lp-brand-grid`,children:v.map(e=>{let t=A(e);return(0,S.jsxs)(d,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,S.jsxs)(`span`,{className:`lp-brand-mark lp-brand-mark-${t} ${N.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,S.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:M(e)}),(0,S.jsx)(`img`,{src:j(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,S.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e)})})})]})}),(0,S.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,S.jsxs)(`div`,{className:`lp-shell`,children:[(0,S.jsx)(`div`,{className:`lp-section-head`,children:(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa guiada`}),(0,S.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Caminhos rápidos para começar.`}),(0,S.jsx)(`p`,{className:`lp-copy`,children:`Entradas diretas para filtros comuns em Drive e Estate.`})]})}),(0,S.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,S.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,S.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,S.jsx)(`div`,{className:`lp-chip-list`,children:ee.map(e=>(0,S.jsx)(d,{className:`lp-chip`,to:K(`carro`,{marca:e}),children:e},e))})]}),(0,S.jsxs)(`div`,{className:`lp-shortcut-group wide`,children:[(0,S.jsx)(`h3`,{children:`Modelos rápidos`}),(0,S.jsx)(`div`,{className:`lp-chip-list`,children:te.map(([e,t])=>(0,S.jsxs)(d,{className:`lp-chip`,to:K(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,S.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,S.jsx)(`h3`,{children:`Combustíveis`}),(0,S.jsx)(`div`,{className:`lp-chip-list`,children:T.map(e=>(0,S.jsx)(d,{className:`lp-chip`,to:K(`carro`,{combustivel:e}),children:e},e))})]}),(0,S.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,S.jsx)(`h3`,{children:`Distritos`}),(0,S.jsx)(`div`,{className:`lp-chip-list`,children:E.map(e=>(0,S.jsx)(d,{className:`lp-chip`,to:K(`carro`,{distrito:e}),children:e},e))})]}),(0,S.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,S.jsx)(`h3`,{children:`Imóveis`}),(0,S.jsxs)(`div`,{className:`lp-chip-list`,children:[D.map(e=>(0,S.jsx)(d,{className:`lp-chip`,to:K(`imovel`,{tipologia:e}),children:e},e)),E.slice(0,4).map(e=>(0,S.jsx)(d,{className:`lp-chip`,to:K(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),Z&&(0,S.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,S.jsxs)(`div`,{className:`lp-shell`,children:[(0,S.jsx)(`div`,{className:`lp-section-head`,children:(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`span`,{className:`lp-eyebrow`,children:`Seleção atual`}),(0,S.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`Destaques para explorar.`}),(0,S.jsx)(`p`,{className:`lp-copy`,children:`Destaques atuais em Drive e Estate.`})]})}),(0,S.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(z||L.carro.length>0)&&(0,S.jsxs)(`div`,{className:`lp-example-column drive`,children:[(0,S.jsxs)(`div`,{className:`lp-column-top`,children:[(0,S.jsx)(`div`,{className:`lp-column-heading`,children:(0,S.jsx)(`h3`,{className:`lp-column-title`,children:`NOXVELIA Drive`})}),(0,S.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(`/carros`),children:`Ver carros`})]}),(0,S.jsx)(`div`,{className:`lp-example-list`,children:L.carro.length>0?L.carro.map(e=>Q(e,`/carros`)):$(`Drive`,`/carros`)})]}),(z||L.imovel.length>0)&&(0,S.jsxs)(`div`,{className:`lp-example-column estate`,children:[(0,S.jsxs)(`div`,{className:`lp-column-top`,children:[(0,S.jsx)(`div`,{className:`lp-column-heading`,children:(0,S.jsx)(`h3`,{className:`lp-column-title`,children:`NOXVELIA Estate`})}),(0,S.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(`/imoveis`),children:`Ver imóveis`})]}),(0,S.jsx)(`div`,{className:`lp-example-list`,children:L.imovel.length>0?L.imovel.map(e=>Q(e,`/imoveis`)):$(`Estate`,`/imoveis`)})]})]})]})}),(0,S.jsx)(g,{placement:`landing_between_highlights`,minHeight:96}),(0,S.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,S.jsx)(`div`,{className:`lp-shell`,children:(0,S.jsxs)(`div`,{className:`lp-cv-card`,children:[(0,S.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,S.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,S.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro antes da visita.`}),(0,S.jsx)(`p`,{className:`lp-copy`,children:`Consulta histórico, quilometragem e registos disponíveis.`}),(0,S.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,S.jsx)(`li`,{children:`Histórico antes do contacto`}),(0,S.jsx)(`li`,{children:`Mais segurança na compra`})]}),(0,S.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:w,target:`_blank`,rel:`noopener noreferrer`,children:`Verificar um veículo`})]}),(0,S.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,S.jsx)(`span`,{children:`Histórico automóvel com`}),(0,S.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,S.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,S.jsx)(`small`,{children:`Código`}),(0,S.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})})]}),(0,S.jsx)(i,{})]})}export{P as default};