import{C as e,D as t,N as n,O as r,S as i,d as a,h as o,j as s,l as c,u as l,w as u,x as d,y as f}from"./index-DGjNd5jQ.js";import{r as p}from"./images-io1S19E8.js";import{a as m,i as h,o as g}from"./seo-BZnLo9Qd.js";import{t as _}from"./Seo-RHtHbYv2.js";import{t as v}from"./GoogleAdSlot-Bbcr5ZYD.js";import{n as y,t as b}from"./marcasModelos-CRXT0e16.js";import{t as x}from"./localizacoes-9zKfqZul.js";import{t as S}from"./funnelAnalytics-Dgv66le5.js";var C=n(s(),1),w=i();function T(){let{user:e,signed:n,logout:r}=d(),i=t(),[a,s]=(0,C.useState)(!1),[c,l]=(0,C.useState)(!1),p=(0,C.useRef)(null),m=(0,C.useRef)(null);(0,C.useEffect)(()=>{let e=e=>{p.current&&!p.current.contains(e.target)&&s(!1),m.current&&!m.current.contains(e.target)&&l(!1)},t=e=>{e.key===`Escape`&&(s(!1),l(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,C.useEffect)(()=>{s(!1),l(!1)},[i.pathname]);let h=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=h?.avatarUrl||h?.avatar,_=h?.nome?.charAt(0).toUpperCase()||`U`,v=h?.nome?.split(` `)[0]||``,y=n?`/publicar`:`/login`,b=n?void 0:f(i,`/`);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(`style`,{children:`
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
          color: #071326;
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
          background: #d9c49c;
          transition: right 0.2s ease;
        }

        .nl-links a:hover {
          color: #071326;
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
          color: #102f50;
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
          color: #071326;
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
          background: #071326;
        }

        .nl-mobile-menu a:hover,
        .nl-mobile-menu button:hover {
          color: #071326;
          background: #edf6f3;
        }

        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #ffffff;
          background: #102f50;
        }

        .dark .nl-mobile-menu a.nl-mobile-primary {
          color: #062326 !important;
          background: #d9c49c !important;
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
          color: #102f50;
          border: 1px solid rgba(8, 33, 38, 0.16);
          background: rgba(255, 255, 255, 0.56);
        }

        .nl-btn-ghost:hover {
          border-color: rgba(8, 33, 38, 0.28);
          background: #fff;
        }

        .nl-btn-solid {
          color: #fff;
          border: 1px solid #071326;
          background: #071326;
          box-shadow: 0 12px 24px -18px rgba(8, 33, 38, 0.75);
        }

        .nl-btn-solid:hover {
          transform: translateY(-1px);
          background: #102f50;
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
          color: #102f50;
          border: 1px solid rgba(8, 33, 38, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nl-user-trigger:hover,
        .nl-user-trigger.active {
          border-color: rgba(217, 196, 156, 0.62);
          background: #fff;
        }

        .nl-avatar {
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          overflow: hidden;
          display: grid;
          place-items: center;
          color: #102f50;
          border: 1px solid rgba(217, 196, 156, 0.42);
          border-radius: 50%;
          background: rgba(217, 196, 156, 0.18);
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
          color: #071326;
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

        /* Noxvelia logo palette navbar */
        .nl-root {
          border-bottom-color: rgba(7, 19, 38, 0.12) !important;
          background: rgba(255, 250, 240, 0.9) !important;
        }

        .nl-brand,
        .nl-links a,
        .nl-btn-ghost,
        .nl-user-trigger {
          color: #071326 !important;
        }

        .nl-links a::after {
          background: #d9c49c !important;
        }

        .nl-btn-ghost {
          border-color: rgba(7, 19, 38, 0.16) !important;
          background: rgba(255, 255, 255, 0.66) !important;
        }

        .nl-btn-ghost:hover {
          border-color: #d9c49c !important;
          background: #f0dfbb !important;
        }

        .nl-btn-solid,
        .nl-mobile-menu a.nl-mobile-primary {
          color: #071326 !important;
          border-color: #d9c49c !important;
          background: #d9c49c !important;
        }

        .nl-btn-solid:hover,
        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #071326 !important;
          background: #f0dfbb !important;
          border-color: #f0dfbb !important;
        }

        .dark .nl-root {
          border-bottom-color: rgba(240, 223, 187, 0.14) !important;
          background: rgba(7, 19, 38, 0.92) !important;
        }

        .dark .nl-brand,
        .dark .nl-links a,
        .dark .nl-btn-ghost,
        .dark .nl-user-trigger {
          color: #fffaf0 !important;
        }
      `}),(0,w.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:m,children:[(0,w.jsxs)(`div`,{className:`nl-inner`,children:[(0,w.jsxs)(u,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,w.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,w.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,w.jsxs)(`div`,{className:`nl-links`,children:[(0,w.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,w.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,w.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,w.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,w.jsx)(u,{to:`/profissionais`,children:`Profissionais`})]}),(0,w.jsxs)(`div`,{className:`nl-actions`,children:[(0,w.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{s(!1),l(e=>!e)},"aria-expanded":c,"aria-controls":`nl-mobile-menu`,"aria-label":c?`Fechar navegação`:`Abrir navegação`,children:c?(0,w.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,w.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,w.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,w.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,w.jsx)(o,{}),!n&&(0,w.jsx)(u,{to:`/login`,state:{from:i.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,w.jsx)(u,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),n?(0,w.jsxs)(`div`,{ref:p,className:`nl-user-wrap`,children:[(0,w.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${a?`active`:``}`,onClick:()=>{l(!1),s(e=>!e)},"aria-expanded":a,"aria-label":`Abrir menu de utilizador`,children:[(0,w.jsx)(`span`,{className:`nl-avatar`,children:g?(0,w.jsx)(`img`,{src:g,alt:``}):(0,w.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,w.jsx)(`span`,{className:`nl-username`,children:v}),(0,w.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,w.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),a&&(0,w.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,w.jsxs)(u,{to:`/perfil`,onClick:()=>s(!1),className:`nl-ud-item`,children:[(0,w.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,w.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,w.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,w.jsx)(`div`,{className:`nl-ud-divider`}),(0,w.jsxs)(`button`,{type:`button`,onClick:()=>{s(!1),r()},className:`nl-ud-item logout`,children:[(0,w.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,w.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,w.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,w.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),c&&(0,w.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,w.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,w.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`strong`,{children:`Noxvelia`}),(0,w.jsx)(`span`,{children:`Carros e imóveis em Portugal`})]})]}),(0,w.jsx)(`a`,{href:`#pesquisa`,onClick:()=>l(!1),children:`Pesquisar`}),(0,w.jsx)(`a`,{href:`#anunciar`,onClick:()=>l(!1),children:`Anunciar grátis`}),(0,w.jsx)(`a`,{href:`#marcas`,onClick:()=>l(!1),children:`Marcas`}),(0,w.jsx)(`a`,{href:`#atalhos`,onClick:()=>l(!1),children:`Atalhos`}),(0,w.jsx)(u,{to:`/carros`,onClick:()=>l(!1),children:`Carros`}),(0,w.jsx)(u,{to:`/imoveis`,onClick:()=>l(!1),children:`Imóveis`}),(0,w.jsx)(u,{to:`/profissionais`,onClick:()=>l(!1),children:`Profissionais`}),(0,w.jsx)(u,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>l(!1),children:`Publicar anúncio`}),n?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{to:`/perfil`,onClick:()=>l(!1),children:`O meu perfil`}),(0,w.jsx)(`button`,{type:`button`,onClick:()=>{l(!1),r()},children:`Terminar sessão`})]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{to:`/login`,state:{from:i.pathname},onClick:()=>l(!1),children:`Entrar`}),(0,w.jsx)(u,{to:`/registo`,onClick:()=>l(!1),children:`Registar`})]})]})]})]})}var E=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,D=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],O=[`BMW`,`Mercedes-Benz`,`Audi`,`Volkswagen`,`Peugeot`,`Renault`,`Toyota`,`Tesla`,`Porsche`,`Volvo`,`Hyundai`,`Kia`].filter(e=>b.includes(e)),ee=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],k=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],A=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],j=[`T1`,`T2`,`T3`,`T4`,`T5+`],M=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],N=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),te=e=>e==null?`...`:new Intl.NumberFormat(`pt-PT`).format(e),P=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),ne=e=>`/marcas/${P(e)}.${e===`Jaecoo`?`svg`:`png`}`,re=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),ie=new Set([`aiways`,`aston-martin`,`bentley`]);function F(){let n=r(),i=t(),{signed:o}=d(),s=(0,C.useRef)(!1),F=o?`/publicar`:`/login`,I=o?void 0:f(i,`/`),[L,R]=(0,C.useState)({carro:[],imovel:[]}),[z,B]=(0,C.useState)(null),[V,ae]=(0,C.useState)(!0),[H,U]=(0,C.useState)(!1),[W,G]=(0,C.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``});(0,C.useEffect)(()=>{let e=()=>{s.current||l()?.external===!0&&(s.current=!0,S(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||l()?.external===!0)&&e()};return window.addEventListener(c,t),()=>window.removeEventListener(c,t)},[]),(0,C.useEffect)(()=>{let t=!0;return e.get(`/anuncios/resumo-publico`).then(({data:e})=>{t&&B(e||null)}).catch(()=>{t&&B(null)}),()=>{t=!1}},[]),(0,C.useEffect)(()=>{let t=!0;return(async()=>{try{let{data:n}=await e.get(`/anuncios/em-alta/semana`);if(!t)return;R({carro:(n?.carro||[]).slice(0,2),imovel:(n?.imovel||[]).slice(0,2)}),U(!1)}catch{t&&(R({carro:[],imovel:[]}),U(!0))}finally{t&&ae(!1)}})(),()=>{t=!1}},[]);let K=W.tipo===`carro`&&W.marca?y(W.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],q=Number(z?.profissionais||0)>0,J=[{label:`Anúncios ativos`,value:z?.totalAnuncios},{label:`Carros`,value:z?.carros},{label:`Imóveis`,value:z?.imoveis},q?{label:`Profissionais`,value:z?.profissionais}:null].filter(e=>e&&Number(e.value||0)>0),Y=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},X=(e,t)=>{G(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},Z=e=>{e.preventDefault();let{tipo:t,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=W,l={distrito:s,precoMax:c,...t===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};S(`search_start`,{vertical:t}),n(Y(t,l))},oe=(e,t)=>{try{localStorage.setItem(`@App:contexto_visual`,t===`/carros`?`carro`:`imovel`)}catch{}n(h(e))},se=V||L.carro.length>0||L.imovel.length>0,Q=(e,t)=>{let n=e.tipo===`carro`,r=p(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,w.jsxs)(`button`,{type:`button`,className:`lp-example-card`,onClick:()=>oe(e,t),children:[(0,w.jsx)(`span`,{className:`lp-example-img`,children:r?(0,w.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,w.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`})}),(0,w.jsxs)(`span`,{className:`lp-example-body`,children:[(0,w.jsx)(`span`,{className:`lp-example-price`,children:N(e.preco)}),(0,w.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,w.jsx)(`span`,{className:`lp-example-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,w.jsx)(`span`,{className:`lp-example-location`,children:e.localizacao?.cidade||`Portugal`})]})]},e._id)},$=(e,t)=>V?(0,w.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,w.jsx)(`strong`,{children:`A carregar destaques.`}),(0,w.jsx)(`span`,{children:`Estamos a preparar uma seleção recente.`})]}):(0,w.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,w.jsx)(`strong`,{children:H?`Os destaques estão a ser atualizados.`:`Vê todos os anúncios em ${e}.`}),(0,w.jsx)(`span`,{children:H?`A pesquisa completa continua disponível.`:`Explora a lista completa com todos os filtros.`}),(0,w.jsxs)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>n(t),children:[`Explorar `,e]})]});return(0,w.jsxs)(`div`,{className:`lp-root`,children:[(0,w.jsx)(_,{title:`Noxvelia | Plataforma de carros e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.`,path:`/`,jsonLd:[g,m]}),(0,w.jsx)(`style`,{children:`
        .lp-root, .lp-root * { box-sizing: border-box; }
        .lp-root {
          --lp-navy: #071326; --lp-blue: #102f50; --lp-gold: #d9c49c; --lp-gold-soft: #f0dfbb;
          --lp-paper: #fffaf0; --lp-stone: #f4efe5; --lp-line: rgba(7, 19, 38, 0.14); --lp-muted: #546575;
          min-height: 100vh; overflow-x: hidden; background: var(--lp-stone); color: var(--lp-navy);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .lp-root a, .lp-root button, .lp-root input, .lp-root select { font: inherit; }
        .lp-root a:focus-visible, .lp-root button:focus-visible, .lp-root select:focus-visible { outline: 3px solid rgba(217, 196, 156, 0.5); outline-offset: 3px; }
        .lp-shell { width: min(1220px, calc(100% - 48px)); margin: 0 auto; }
        .lp-hero { position: relative; isolation: isolate; min-height: clamp(620px, calc(100vh - 74px), 760px); display: flex; align-items: stretch; overflow: hidden; background: var(--lp-navy); }
        .lp-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 62% center; z-index: -2; }
        .lp-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(7,19,38,.95) 0%, rgba(7,19,38,.82) 42%, rgba(7,19,38,.36) 72%, rgba(7,19,38,.18) 100%), linear-gradient(0deg, rgba(7,19,38,.78) 0%, rgba(7,19,38,.12) 58%); }
        .lp-hero-inner { display: grid; grid-template-columns: minmax(0, 1fr) minmax(360px, 470px); gap: clamp(28px, 5vw, 70px); align-items: center; padding: clamp(64px, 8vw, 112px) 0 54px; }
        .lp-hero-copyblock { max-width: 690px; color: #fffaf0; }
        .lp-hero-brand { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 22px; color: #fffaf0; font-size: 13px; font-weight: 900; letter-spacing: .12em; }
        .lp-hero-brand img { width: 32px; height: 32px; object-fit: contain; }
        .lp-kicker, .lp-eyebrow { display: inline-flex; width: fit-content; margin: 0 0 14px; padding: 7px 10px; color: var(--lp-gold-soft); border: 1px solid rgba(240,223,187,.3); border-radius: 8px; background: rgba(240,223,187,.1); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .lp-hero h1 { max-width: 680px; margin: 0; color: #fffaf0; font-size: clamp(42px, 5vw, 68px); font-weight: 850; line-height: .98; letter-spacing: 0; text-wrap: balance; }
        .lp-hero-copy { max-width: 570px; margin: 22px 0 0; color: rgba(255,250,240,.82); font-size: 16px; line-height: 1.7; }
        .lp-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }        .lp-btn, .lp-text-link, .lp-search-submit, .lp-link-button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; border: 1px solid transparent; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 850; cursor: pointer; transition: background-color .18s ease, border-color .18s ease, color .18s ease, transform .18s ease !important; }
        .lp-btn-primary, .lp-search-submit { color: var(--lp-navy); background: var(--lp-gold); border-color: var(--lp-gold); }
        .lp-text-link { color: #fffaf0; border-color: rgba(240,223,187,.35); background: rgba(255,250,240,.08); }
        .lp-btn:hover, .lp-text-link:hover, .lp-search-submit:hover, .lp-link-button:hover { transform: translateY(-1px) !important; }
        .lp-search-panel { align-self: center; padding: 18px; border: 1px solid rgba(240,223,187,.28); border-radius: 14px; background: rgba(255,250,240,.96); box-shadow: 0 32px 90px -62px rgba(0,0,0,.9); }
        .lp-search-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 16px; }
        .lp-search-head h2 { margin: 0; color: var(--lp-navy); font-size: 24px; line-height: 1.08; letter-spacing: 0; }
        .lp-search-head p { margin: 8px 0 0; color: var(--lp-muted); font-size: 13px; line-height: 1.45; }
        .lp-type-tabs { flex: 0 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; padding: 4px; border: 1px solid rgba(7,19,38,.13); border-radius: 10px; background: #e9dfce; }
        .lp-type-tab { min-height: 38px; padding: 0 13px; color: #425365; border: 0; border-radius: 7px; background: transparent; font-size: 13px; font-weight: 850; cursor: pointer; }
        .lp-type-tab.active { color: var(--lp-navy); background: var(--lp-gold); }
        .lp-search-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
        .lp-field { min-width: 0; display: flex; flex-direction: column; gap: 6px; }
        .lp-field label { color: #4d5f70; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .lp-field select { width: 100%; min-height: 46px; padding: 0 12px; color: var(--lp-navy); border: 1px solid rgba(7,19,38,.16); border-radius: 8px; background: #fff; font-size: 13px; font-weight: 740; }
        .lp-field select:disabled { color: #8793a0; background: #f4f2eb; }
        .lp-search-submit { grid-column: 1 / -1; width: 100%; margin-top: 2px; }
        .lp-metrics { background: var(--lp-paper); border-bottom: 1px solid var(--lp-line); }
        .lp-metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0; border-left: 1px solid var(--lp-line); }
        .lp-metric { min-height: 92px; display: flex; flex-direction: column; justify-content: center; padding: 18px; border-right: 1px solid var(--lp-line); }
        .lp-metric strong { color: var(--lp-navy); font-size: 28px; line-height: 1; }
        .lp-metric span { margin-top: 7px; color: #617182; font-size: 11px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
        .lp-section { padding: 76px 0; }
        .lp-section[id] { scroll-margin-top: 92px; }
        .lp-section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
        .lp-section-head > div:first-child { max-width: 720px; }
        .lp-title { margin: 0; color: var(--lp-navy); font-size: clamp(30px, 4vw, 46px); line-height: 1.05; letter-spacing: 0; }
        .lp-copy { margin: 14px 0 0; color: var(--lp-muted); font-size: 15px; line-height: 1.65; }
        .lp-promo-section { background: var(--lp-stone); }
        .lp-promo-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .lp-promo-link { min-width: 0; overflow: hidden; display: grid; grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr); min-height: 300px; color: inherit; border: 1px solid var(--lp-line); border-radius: 12px; background: var(--lp-paper); text-decoration: none; transition: border-color .18s ease, transform .18s ease !important; }
        .lp-promo-link:hover { border-color: rgba(16,47,80,.34); transform: translateY(-2px) !important; }
        .lp-promo-copy { display: flex; flex-direction: column; justify-content: center; gap: 13px; padding: clamp(24px, 3vw, 38px); }
        .lp-promo-label { width: fit-content; padding: 6px 9px; color: var(--lp-blue); border: 1px solid rgba(16,47,80,.18); border-radius: 7px; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .lp-promo-title { color: var(--lp-navy); font-size: clamp(25px, 3vw, 34px); line-height: 1.08; letter-spacing: 0; }
        .lp-promo-text { color: var(--lp-muted); font-size: 14px; line-height: 1.58; }
        .lp-promo-overlay { width: fit-content; color: var(--lp-navy); font-size: 13px; font-weight: 850; }
        .lp-promo-media img { width: 100%; height: 100%; min-height: 300px; display: block; object-fit: cover; }
        .lp-pro-strip { display: grid; grid-template-columns: 130px minmax(0, 1fr) auto; gap: 18px; align-items: center; margin-top: 18px; padding: 20px; color: #fffaf0; border-radius: 12px; background: var(--lp-navy); text-decoration: none; }
        .lp-pro-strip span { color: var(--lp-gold-soft); font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .lp-pro-strip strong { font-size: 20px; line-height: 1.2; }
        .lp-pro-strip em { color: var(--lp-navy); background: var(--lp-gold); border-radius: 8px; padding: 11px 14px; font-style: normal; font-size: 13px; font-weight: 850; }
        .lp-brands-section { background: var(--lp-paper); border-top: 1px solid var(--lp-line); border-bottom: 1px solid var(--lp-line); }
        .lp-brand-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr)); gap: 10px; }
        .lp-brand-card { min-height: 92px; display: grid; grid-template-rows: 42px auto; place-items: center; gap: 7px; padding: 12px; color: #384b5c; border: 1px solid var(--lp-line); border-radius: 10px; background: #fff; text-decoration: none; transition: border-color .18s ease, transform .18s ease !important; }
        .lp-brand-card:hover { border-color: rgba(217,196,156,.84); transform: translateY(-2px) !important; }
        .lp-brand-mark { position: relative; width: 100px; height: 42px; display: grid; place-items: center; overflow: hidden; }
        .lp-brand-mark img { position: relative; z-index: 1; max-width: 100%; max-height: 42px; object-fit: contain; }
        .lp-brand-fallback { position: absolute; inset: 0; display: none; place-items: center; color: var(--lp-blue); font-weight: 900; }
        .lp-brand-mark.logo-error .lp-brand-fallback { display: grid; }
        .lp-brand-mark-clean::after { content: ""; position: absolute; z-index: 2; right: 0; bottom: 0; left: 0; height: 15px; background: linear-gradient(180deg, rgba(255,255,255,0), #fff 56%); pointer-events: none; }
        .lp-brand-name { color: #435668; font-size: 11px; font-weight: 820; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }        .lp-shortcuts-section { background: var(--lp-stone); }
        .lp-shortcut-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .lp-shortcut-group { min-width: 0; padding: 18px; border: 1px solid var(--lp-line); border-radius: 12px; background: var(--lp-paper); }
        .lp-shortcut-group.wide { grid-column: span 2; }
        .lp-shortcut-group h3 { margin: 0 0 13px; color: var(--lp-navy); font-size: 15px; }
        .lp-chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .lp-chip { min-height: 34px; display: inline-flex; align-items: center; padding: 0 11px; color: var(--lp-blue); border: 1px solid rgba(16,47,80,.16); border-radius: 999px; background: #fff; text-decoration: none; font-size: 12px; font-weight: 780; }
        .lp-popular-section { background: var(--lp-navy); color: #fffaf0; }
        .lp-popular-section .lp-title { color: #fffaf0; }
        .lp-popular-section .lp-copy { color: rgba(255,250,240,.76); }
        .lp-examples-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .lp-example-column { min-width: 0; padding: 16px; border: 1px solid rgba(240,223,187,.18); border-radius: 12px; background: rgba(255,250,240,.06); }
        .lp-column-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
        .lp-column-title { margin: 0; color: #fffaf0; font-size: 17px; }
        .lp-link-button { min-height: 38px; padding: 0 12px; color: var(--lp-navy); background: var(--lp-gold); border-color: var(--lp-gold); }
        .lp-example-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .lp-example-card { overflow: hidden; display: flex; flex-direction: column; padding: 0; color: inherit; border: 1px solid rgba(240,223,187,.16); border-radius: 10px; background: rgba(255,250,240,.08); text-align: left; cursor: pointer; }
        .lp-example-img { position: relative; aspect-ratio: 16 / 10; display: block; overflow: hidden; background: rgba(255,255,255,.08); }
        .lp-example-img img { width: 100%; height: 100%; display: block; object-fit: cover; }
        .lp-example-no-photo { height: 100%; display: grid; place-items: center; color: rgba(255,250,240,.7); font-size: 12px; }
        .lp-example-body { display: grid; gap: 6px; padding: 12px; }
        .lp-example-price { color: var(--lp-gold-soft); font-size: 18px; font-weight: 900; }
        .lp-example-title { color: #fffaf0; font-size: 13px; font-weight: 850; }
        .lp-example-meta, .lp-example-location { color: rgba(255,250,240,.68); font-size: 12px; }
        .lp-example-state { min-height: 180px; grid-column: 1 / -1; display: grid; place-content: center; gap: 8px; padding: 24px; color: rgba(255,250,240,.78); text-align: center; border: 1px dashed rgba(240,223,187,.22); border-radius: 10px; }
        .lp-example-state strong { color: #fffaf0; }
        .lp-cv-section { background: var(--lp-paper); }
        .lp-cv-card { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 420px); gap: 28px; align-items: center; padding: clamp(24px, 4vw, 42px); border: 1px solid var(--lp-line); border-radius: 12px; background: #fff; }
        .lp-cv-points { margin: 18px 0 22px; padding-left: 18px; color: var(--lp-muted); line-height: 1.7; }
        .lp-cv-panel { display: grid; place-items: center; gap: 18px; min-height: 260px; border-radius: 10px; background: var(--lp-stone); }
        .lp-cv-panel span { color: var(--lp-muted); font-size: 12px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
        .lp-cv-panel img { max-width: 220px; width: 70%; height: auto; }
        .lp-cv-code { display: grid; gap: 4px; padding: 12px 16px; border: 1px solid var(--lp-line); border-radius: 8px; background: #fff; text-align: center; }
        .lp-cv-code small { color: var(--lp-muted); font-size: 11px; text-transform: uppercase; }
        .lp-cv-code strong { color: var(--lp-navy); }
        .dark .lp-root { background: #071326; color: #fffaf0; }
        .dark .lp-metrics, .dark .lp-brands-section, .dark .lp-cv-section { background: #0d1d33; border-color: rgba(240,223,187,.14); }
        .dark .lp-search-panel, .dark .lp-promo-link, .dark .lp-shortcut-group, .dark .lp-brand-card, .dark .lp-cv-card { background: #102f50; border-color: rgba(240,223,187,.18); color: #fffaf0; }
        .dark .lp-title, .dark .lp-search-head h2, .dark .lp-promo-title, .dark .lp-shortcut-group h3, .dark .lp-metric strong, .dark .lp-cv-code strong { color: #fffaf0; }
        .dark .lp-copy, .dark .lp-search-head p, .dark .lp-promo-text, .dark .lp-brand-name, .dark .lp-field label { color: rgba(255,250,240,.72); }
        .dark .lp-field select { background: #071326; color: #fffaf0; border-color: rgba(240,223,187,.18); }
        .dark .lp-type-tabs, .dark .lp-cv-panel { background: #071326; }
        @media (max-width: 1040px) { .lp-hero { min-height: auto; } .lp-hero-inner { grid-template-columns: 1fr; padding-top: 58px; } .lp-search-panel { max-width: 760px; } .lp-promo-grid, .lp-examples-grid, .lp-cv-card { grid-template-columns: 1fr; } }
        @media (max-width: 720px) { .lp-shell { width: min(100% - 30px, 1220px); } .lp-hero-inner { padding: 42px 0 34px; gap: 24px; } .lp-hero h1 { font-size: clamp(36px, 12vw, 48px); } .lp-hero-copy { font-size: 15px; } .lp-search-panel { padding: 14px; border-radius: 10px; } .lp-search-head { display: grid; } .lp-type-tabs { width: 100%; } .lp-search-form { grid-template-columns: 1fr; } .lp-section { padding: 54px 0; } .lp-section-head { display: grid; } .lp-promo-link { grid-template-columns: 1fr; } .lp-promo-media img { min-height: 220px; } .lp-pro-strip { grid-template-columns: 1fr; } .lp-shortcut-grid { grid-template-columns: 1fr; } .lp-shortcut-group.wide { grid-column: auto; } .lp-example-list { grid-template-columns: 1fr; } }
      `}),(0,w.jsx)(T,{}),(0,w.jsxs)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:[(0,w.jsx)(`img`,{className:`lp-hero-bg`,src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`,onError:e=>{e.currentTarget.src=`/social/noxvelia-estate-photo-premium.webp`}}),(0,w.jsxs)(`div`,{className:`lp-shell lp-hero-inner`,children:[(0,w.jsxs)(`div`,{className:`lp-hero-copyblock`,children:[(0,w.jsxs)(`div`,{className:`lp-hero-brand`,"aria-label":`NOXVELIA`,children:[(0,w.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,w.jsx)(`span`,{children:`NOXVELIA`})]}),(0,w.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisa em Portugal`}),(0,w.jsx)(`h1`,{id:`lp-hero-title`,children:`Compra, vende e compara carros e imóveis sem perder tempo.`}),(0,w.jsx)(`p`,{className:`lp-hero-copy`,children:`A Noxvelia junta anúncios com fotografias, preço, localização e contacto direto para decidires melhor antes da visita.`}),(0,w.jsxs)(`div`,{className:`lp-actions`,children:[(0,w.jsx)(`a`,{className:`lp-btn lp-btn-primary`,href:`#pesquisa`,children:`Pesquisar agora`}),(0,w.jsx)(u,{className:`lp-text-link`,to:F,state:I,children:`Publicar grátis`})]})]}),(0,w.jsxs)(`form`,{className:`lp-search-panel`,id:`pesquisa`,"aria-labelledby":`lp-search-title`,onSubmit:Z,children:[(0,w.jsxs)(`div`,{className:`lp-search-head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Começa por aqui`}),(0,w.jsx)(`h2`,{id:`lp-search-title`,children:`Pesquisa direta.`}),(0,w.jsx)(`p`,{children:`Filtra por tipo, localização e preço. Podes afinar mais depois.`})]}),(0,w.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,w.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":W.tipo===`carro`,className:`lp-type-tab ${W.tipo===`carro`?`active`:``}`,onClick:()=>X(`tipo`,`carro`),children:`Carros`}),(0,w.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":W.tipo===`imovel`,className:`lp-type-tab ${W.tipo===`imovel`?`active`:``}`,onClick:()=>X(`tipo`,`imovel`),children:`Imóveis`})]})]}),`            `,(0,w.jsxs)(`div`,{className:`lp-search-form`,children:[W.tipo===`carro`?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,w.jsxs)(`select`,{id:`lp-marca`,value:W.marca,onChange:e=>X(`marca`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Todas as marcas`}),b.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,w.jsxs)(`select`,{id:`lp-modelo`,value:W.modelo,onChange:e=>X(`modelo`,e.target.value),disabled:!W.marca,children:[(0,w.jsx)(`option`,{value:``,children:W.marca?`Todos os modelos`:`Escolhe a marca`}),K.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,w.jsxs)(`select`,{id:`lp-combustivel`,value:W.combustivel,onChange:e=>X(`combustivel`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Todos`}),k.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,w.jsxs)(`select`,{id:`lp-preco`,value:W.precoMax,onChange:e=>X(`precoMax`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Qualquer preço`}),M.slice(0,2).map(e=>(0,w.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,w.jsxs)(`select`,{id:`lp-tipologia`,value:W.tipologia,onChange:e=>X(`tipologia`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Todas`}),j.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,w.jsxs)(`select`,{id:`lp-estate-preco`,value:W.precoMax,onChange:e=>X(`precoMax`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Qualquer preço`}),M.slice(2).map(e=>(0,w.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,w.jsxs)(`select`,{id:`lp-distrito`,value:W.distrito,onChange:e=>X(`distrito`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Portugal inteiro`}),x.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]})]})]})]}),J.length>0&&(0,w.jsx)(`section`,{className:`lp-metrics`,"aria-label":`Resumo da plataforma`,children:(0,w.jsx)(`div`,{className:`lp-shell lp-metrics-grid`,children:J.map(e=>(0,w.jsxs)(`div`,{className:`lp-metric`,children:[(0,w.jsx)(`strong`,{children:te(e.value)}),(0,w.jsx)(`span`,{children:e.label})]},e.label))})}),(0,w.jsx)(`section`,{className:`lp-section lp-promo-section`,id:`anunciar`,"aria-label":`Explorar anúncios na Noxvelia`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,w.jsxs)(u,{className:`lp-promo-link`,to:`/carros`,children:[(0,w.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,w.jsx)(`span`,{className:`lp-promo-label`,children:`Carros`}),(0,w.jsx)(`strong`,{className:`lp-promo-title`,children:`Automóveis com dados fáceis de comparar.`}),(0,w.jsx)(`span`,{className:`lp-promo-text`,children:`Marca, modelo, quilómetros, combustível, preço e localização antes do contacto.`}),(0,w.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar carro`})]}),(0,w.jsx)(`span`,{className:`lp-promo-media`,children:(0,w.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`,loading:`lazy`})})]}),(0,w.jsxs)(u,{className:`lp-promo-link`,to:`/imoveis`,children:[(0,w.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,w.jsx)(`span`,{className:`lp-promo-label`,children:`Imóveis`}),(0,w.jsx)(`strong`,{className:`lp-promo-title`,children:`Casas, apartamentos e espaços para visitar melhor informado.`}),(0,w.jsx)(`span`,{className:`lp-promo-text`,children:`Compara fotografias, localização, tipologia, áreas e preço antes de marcar visita.`}),(0,w.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar imóvel`})]}),(0,w.jsx)(`span`,{className:`lp-promo-media`,children:(0,w.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`,loading:`lazy`})})]})]}),(0,w.jsxs)(u,{className:`lp-pro-strip`,to:q?`/profissionais`:F,state:q?void 0:I,children:[(0,w.jsx)(`span`,{children:q?`Profissionais`:`Anunciar`}),(0,w.jsx)(`strong`,{children:q?`Stands, mediadores e vendedores com anúncios disponíveis.`:`Publica o teu carro ou imóvel e recebe contactos diretamente.`}),(0,w.jsx)(`em`,{children:q?`Ver profissionais`:`Publicar anúncio`})]})]})}),(0,w.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsx)(`div`,{className:`lp-section-head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Marcas`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:`Pesquisa por marca, sem voltar ao início.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Escolhe uma marca popular ou usa o campo de marca na pesquisa principal.`})]})}),(0,w.jsx)(`div`,{className:`lp-brand-grid`,"aria-label":`Marcas automóveis populares`,children:(O.length>0?O:D).map(e=>{let t=P(e);return(0,w.jsxs)(u,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,w.jsxs)(`span`,{className:`lp-brand-mark lp-brand-mark-${t} ${ie.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,w.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:re(e)}),(0,w.jsx)(`img`,{src:ne(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,w.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e)})})]})}),(0,w.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsx)(`div`,{className:`lp-section-head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Atalhos`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Entradas rápidas para pesquisas comuns.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Links diretos para marcas, modelos, distritos, combustíveis e tipologias populares.`})]})}),(0,w.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,w.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,w.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:D.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:Y(`carro`,{marca:e}),children:e},e))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group wide`,children:[(0,w.jsx)(`h3`,{children:`Modelos rápidos`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:ee.map(([e,t])=>(0,w.jsxs)(u,{className:`lp-chip`,to:Y(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,w.jsx)(`h3`,{children:`Combustíveis`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:k.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:Y(`carro`,{combustivel:e}),children:e},e))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,w.jsx)(`h3`,{children:`Distritos`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:A.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:Y(`carro`,{distrito:e}),children:e},e))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,w.jsx)(`h3`,{children:`Imóveis`}),(0,w.jsxs)(`div`,{className:`lp-chip-list`,children:[j.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:Y(`imovel`,{tipologia:e}),children:e},e)),A.slice(0,4).map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:Y(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),se&&(0,w.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsx)(`div`,{className:`lp-section-head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Seleção atual`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`Destaques recentes.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Anúncios de carros e imóveis prontos a explorar.`})]})}),(0,w.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(V||L.carro.length>0)&&(0,w.jsxs)(`div`,{className:`lp-example-column`,children:[(0,w.jsxs)(`div`,{className:`lp-column-top`,children:[(0,w.jsx)(`h3`,{className:`lp-column-title`,children:`Carros`}),(0,w.jsx)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>n(`/carros`),children:`Ver carros`})]}),(0,w.jsx)(`div`,{className:`lp-example-list`,children:L.carro.length>0?L.carro.map(e=>Q(e,`/carros`)):$(`carros`,`/carros`)})]}),(V||L.imovel.length>0)&&(0,w.jsxs)(`div`,{className:`lp-example-column`,children:[(0,w.jsxs)(`div`,{className:`lp-column-top`,children:[(0,w.jsx)(`h3`,{className:`lp-column-title`,children:`Imóveis`}),(0,w.jsx)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>n(`/imoveis`),children:`Ver imóveis`})]}),(0,w.jsx)(`div`,{className:`lp-example-list`,children:L.imovel.length>0?L.imovel.map(e=>Q(e,`/imoveis`)):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,w.jsx)(v,{placement:`landing_between_highlights`,minHeight:96}),(0,w.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,w.jsx)(`div`,{className:`lp-shell`,children:(0,w.jsxs)(`div`,{className:`lp-cv-card`,children:[(0,w.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro antes da visita.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Consulta histórico, quilometragem e registos disponíveis.`}),(0,w.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,w.jsx)(`li`,{children:`Histórico antes do contacto`}),(0,w.jsx)(`li`,{children:`Mais segurança na compra`})]}),(0,w.jsx)(`a`,{className:`lp-btn lp-btn-primary`,href:E,target:`_blank`,rel:`noopener noreferrer`,children:`Verificar um veículo`})]}),(0,w.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,w.jsx)(`span`,{children:`Histórico automóvel com`}),(0,w.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,w.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,w.jsx)(`small`,{children:`Código`}),(0,w.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})}),(0,w.jsx)(a,{})]})}export{F as default};