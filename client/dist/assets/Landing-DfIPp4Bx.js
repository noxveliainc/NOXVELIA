import{n as e,r as t,t as n}from"./search-CTnFyFtJ.js";import{C as r,D as i,N as a,O as o,S as s,d as c,f as l,h as u,j as d,l as f,m as p,p as m,u as h,w as g,x as _,y as v}from"./index-Bc4OYpiv.js";import{t as y}from"./localizacoes-9zKfqZul.js";import{r as b}from"./images-io1S19E8.js";import{a as x,i as S,o as ee}from"./seo-BZnLo9Qd.js";import{t as te}from"./Seo-C-w3i6vz.js";import{t as ne}from"./GoogleAdSlot-CzZLYMD9.js";import{n as re,t as C}from"./marcasModelos-CRXT0e16.js";import{t as w}from"./funnelAnalytics-knbGU2up.js";var T=p(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),ie=p(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),E=a(d(),1),D=s();function O(){let{user:e,signed:t,logout:n}=_(),r=i(),[a,o]=(0,E.useState)(!1),[s,c]=(0,E.useState)(!1),l=(0,E.useRef)(null),d=(0,E.useRef)(null);(0,E.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&o(!1),d.current&&!d.current.contains(e.target)&&c(!1)},t=e=>{e.key===`Escape`&&(o(!1),c(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,E.useEffect)(()=>{o(!1),c(!1)},[r.pathname]);let f=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),p=f?.avatarUrl||f?.avatar,m=f?.nome?.charAt(0).toUpperCase()||`U`,h=f?.nome?.split(` `)[0]||``,y=t?`/publicar`:`/login`,b=t?void 0:v(r,`/`);return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`style`,{children:`
        .nl-root,
        .nl-root * {
          box-sizing: border-box;
        }

        .nl-root {
          position: relative;
          z-index: 50;
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
      `}),(0,D.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:d,children:[(0,D.jsxs)(`div`,{className:`nl-inner`,children:[(0,D.jsxs)(g,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,D.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,D.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,D.jsxs)(`div`,{className:`nl-links`,children:[(0,D.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,D.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,D.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,D.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,D.jsx)(g,{to:`/profissionais`,children:`Profissionais`})]}),(0,D.jsxs)(`div`,{className:`nl-actions`,children:[(0,D.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{o(!1),c(e=>!e)},"aria-expanded":s,"aria-controls":`nl-mobile-menu`,"aria-label":s?`Fechar navegação`:`Abrir navegação`,children:s?(0,D.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,D.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,D.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,D.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,D.jsx)(u,{}),!t&&(0,D.jsx)(g,{to:`/login`,state:{from:r.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,D.jsx)(g,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),t?(0,D.jsxs)(`div`,{ref:l,className:`nl-user-wrap`,children:[(0,D.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${a?`active`:``}`,onClick:()=>{c(!1),o(e=>!e)},"aria-expanded":a,"aria-label":`Abrir menu de utilizador`,children:[(0,D.jsx)(`span`,{className:`nl-avatar`,children:p?(0,D.jsx)(`img`,{src:p,alt:``}):(0,D.jsx)(`span`,{className:`nl-avatar-initial`,children:m})}),h&&(0,D.jsx)(`span`,{className:`nl-username`,children:h}),(0,D.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,D.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),a&&(0,D.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,D.jsxs)(g,{to:`/perfil`,onClick:()=>o(!1),className:`nl-ud-item`,children:[(0,D.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,D.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,D.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,D.jsx)(`div`,{className:`nl-ud-divider`}),(0,D.jsxs)(`button`,{type:`button`,onClick:()=>{o(!1),n()},className:`nl-ud-item logout`,children:[(0,D.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,D.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,D.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,D.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),s&&(0,D.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,D.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,D.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`strong`,{children:`Noxvelia`}),(0,D.jsx)(`span`,{children:`Carros e imóveis em Portugal`})]})]}),(0,D.jsx)(`a`,{href:`#pesquisa`,onClick:()=>c(!1),children:`Pesquisar`}),(0,D.jsx)(`a`,{href:`#anunciar`,onClick:()=>c(!1),children:`Anunciar grátis`}),(0,D.jsx)(`a`,{href:`#marcas`,onClick:()=>c(!1),children:`Marcas`}),(0,D.jsx)(`a`,{href:`#atalhos`,onClick:()=>c(!1),children:`Atalhos`}),(0,D.jsx)(g,{to:`/carros`,onClick:()=>c(!1),children:`Carros`}),(0,D.jsx)(g,{to:`/imoveis`,onClick:()=>c(!1),children:`Imóveis`}),(0,D.jsx)(g,{to:`/profissionais`,onClick:()=>c(!1),children:`Profissionais`}),(0,D.jsx)(g,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>c(!1),children:`Publicar anúncio`}),t?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(g,{to:`/perfil`,onClick:()=>c(!1),children:`O meu perfil`}),(0,D.jsx)(`button`,{type:`button`,onClick:()=>{c(!1),n()},children:`Terminar sessão`})]}):(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(g,{to:`/login`,state:{from:r.pathname},onClick:()=>c(!1),children:`Entrar`}),(0,D.jsx)(g,{to:`/registo`,onClick:()=>c(!1),children:`Registar`})]})]})]})]})}var k=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,A=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],ae=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],oe=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],se=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],j=[`T1`,`T2`,`T3`,`T4`,`T5+`],ce=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 30.000 €`,value:`30000`}],le=[{label:`Até 150.000 €`,value:`150000`},{label:`Até 250.000 €`,value:`250000`},{label:`Até 400.000 €`,value:`400000`}],ue=[{label:`Carros até 20.000 €`,tipo:`carro`,filtros:{precoMax:`20000`}},{label:`BMW em Lisboa`,tipo:`carro`,filtros:{marca:`BMW`,distrito:`Lisboa`}},{label:`Diesel recentes`,tipo:`carro`,filtros:{combustivel:`Diesel`}},{label:`T2 no Porto`,tipo:`imovel`,filtros:{tipologia:`T2`,distrito:`Porto`}},{label:`Moradias em Braga`,tipo:`imovel`,filtros:{tipoImovel:`moradia`,distrito:`Braga`}},{label:`Imóveis com garagem`,tipo:`imovel`,filtros:{garagem:`true`}}],M=new Set([`aiways`,`aston-martin`,`bentley`]),N=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),P=e=>e==null?`...`:new Intl.NumberFormat(`pt-PT`).format(e),F=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),I=e=>`/marcas/${F(e)}.${e===`Jaecoo`?`svg`:`png`}`,L=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase();function R(){let a=o(),s=i(),{signed:u}=_(),d=(0,E.useRef)(!1),p=(0,E.useRef)(null),R=u?`/publicar`:`/login`,z=u?void 0:v(s,`/`),[B,V]=(0,E.useState)({carro:[],imovel:[]}),[H,U]=(0,E.useState)(null),[W,de]=(0,E.useState)(!0),[fe,G]=(0,E.useState)(!1),[K,pe]=(0,E.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``}),q=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},me=K.tipo===`carro`&&K.marca?re(K.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],J=Number(H?.profissionais||0)>0,Y=[{label:`Anúncios ativos`,value:H?.totalAnuncios},{label:`Carros`,value:H?.carros},{label:`Imóveis`,value:H?.imoveis},J?{label:`Profissionais`,value:H?.profissionais}:null].filter(e=>e&&Number(e.value||0)>0),X=(e,t)=>{pe(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``,precoMax:``}:(e===`marca`&&(r.modelo=``),r)})},he=e=>{e.preventDefault();let{tipo:t,marca:n,modelo:r,combustivel:i,tipologia:o,distrito:s,precoMax:c}=K,l={distrito:s,precoMax:c,...t===`carro`?{marca:n,modelo:r,combustivel:i}:{tipologia:o}};w(`search_start`,{vertical:t}),a(q(t,l))},Z=e=>{let t=p.current;t&&t.scrollBy({left:e*Math.max(320,t.clientWidth*.82),behavior:`smooth`})};(0,E.useEffect)(()=>{let e=()=>{d.current||h()?.external===!0&&(d.current=!0,w(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||h()?.external===!0)&&e()};return window.addEventListener(f,t),()=>window.removeEventListener(f,t)},[]),(0,E.useEffect)(()=>{let e=!0;return r.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&U(t||null)}).catch(()=>{e&&U(null)}),()=>{e=!1}},[]),(0,E.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await r.get(`/anuncios/em-alta/semana`);if(!e)return;V({carro:(t?.carro||[]).slice(0,3),imovel:(t?.imovel||[]).slice(0,3)}),G(!1)}catch{e&&(V({carro:[],imovel:[]}),G(!0))}finally{e&&de(!1)}})(),()=>{e=!1}},[]);let ge=(e,t)=>{try{localStorage.setItem(`@App:contexto_visual`,t===`/carros`?`carro`:`imovel`)}catch{}a(S(e))},Q=(t,n)=>{let r=t.tipo===`carro`,i=b(t.fotos?.[0]||t.imagens?.[0],`medium`),a=r?[t.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(t.carro.km)} km`,t.carro?.combustivel].filter(Boolean).join(` · `):[t.imovel?.tipologia||t.imovel?.tipoImovel,t.imovel?.area?`${t.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,D.jsxs)(`button`,{type:`button`,className:`lp-listing-card`,onClick:()=>ge(t,n),children:[(0,D.jsx)(`span`,{className:`lp-listing-img`,children:i?(0,D.jsx)(`img`,{src:i,width:`800`,height:`600`,alt:t.titulo||(r?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,D.jsx)(`span`,{className:`lp-listing-no-photo`,children:(0,D.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``,loading:`lazy`})})}),(0,D.jsxs)(`span`,{className:`lp-listing-body`,children:[(0,D.jsx)(`span`,{className:`lp-listing-price`,children:N(t.preco)}),(0,D.jsx)(`span`,{className:`lp-listing-title`,children:t.titulo}),(0,D.jsx)(`span`,{className:`lp-listing-meta`,children:a||(r?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,D.jsxs)(`span`,{className:`lp-listing-location`,children:[(0,D.jsx)(e,{size:12,strokeWidth:2.4,"aria-hidden":`true`}),` `,t.localizacao?.cidade||`Portugal`]})]})]},t._id)},$=(e,t)=>(0,D.jsxs)(`div`,{className:`lp-listing-state`,role:`status`,children:[(0,D.jsx)(`strong`,{children:W?`A carregar anúncios.`:fe?`A seleção está a ser atualizada.`:`Explora todos os anúncios em ${e}.`}),(0,D.jsx)(`span`,{children:W?`Podes avançar para a lista completa.`:`Usa a pesquisa para chegar aos resultados.`}),!W&&(0,D.jsxs)(`button`,{type:`button`,className:`lp-secondary-button`,onClick:()=>a(t),children:[`Explorar `,e]})]}),_e=W||B.carro.length>0||B.imovel.length>0;return(0,D.jsxs)(`div`,{className:`lp-root`,children:[(0,D.jsx)(te,{title:`Noxvelia | Plataforma de carros e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.`,path:`/`,jsonLd:[ee,x]}),(0,D.jsx)(O,{}),(0,D.jsxs)(`main`,{children:[(0,D.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-title`,children:(0,D.jsxs)(`div`,{className:`lp-shell`,children:[(0,D.jsxs)(`div`,{className:`lp-hero-top`,children:[(0,D.jsxs)(`div`,{className:`lp-hero-copy`,children:[(0,D.jsx)(`span`,{className:`lp-kicker`,children:`Classificados em Portugal`}),(0,D.jsx)(`h1`,{id:`lp-title`,children:`Compra e vende carros e imóveis num só lugar.`}),(0,D.jsx)(`p`,{children:`Pesquisa por marca, modelo, localização, tipologia e preço. Compara o essencial antes de contactar.`})]}),Y.length>0&&(0,D.jsx)(`div`,{className:`lp-metrics`,children:Y.map(e=>(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`strong`,{children:P(e.value)}),(0,D.jsx)(`span`,{children:e.label})]},e.label))})]}),(0,D.jsxs)(`form`,{className:`lp-search-box`,id:`pesquisa`,onSubmit:he,children:[(0,D.jsxs)(`div`,{className:`lp-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,D.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":K.tipo===`carro`,className:K.tipo===`carro`?`active`:``,onClick:()=>X(`tipo`,`carro`),children:[(0,D.jsx)(m,{size:16}),` Carros`]}),(0,D.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":K.tipo===`imovel`,className:K.tipo===`imovel`?`active`:``,onClick:()=>X(`tipo`,`imovel`),children:[(0,D.jsx)(l,{size:16}),` Imóveis`]})]}),(0,D.jsxs)(`div`,{className:`lp-search-grid`,children:[K.tipo===`carro`?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(`label`,{children:[`Marca`,(0,D.jsxs)(`select`,{value:K.marca,onChange:e=>X(`marca`,e.target.value),children:[(0,D.jsx)(`option`,{value:``,children:`Todas as marcas`}),C.map(e=>(0,D.jsx)(`option`,{value:e,children:e},e))]})]}),(0,D.jsxs)(`label`,{children:[`Modelo`,(0,D.jsxs)(`select`,{value:K.modelo,onChange:e=>X(`modelo`,e.target.value),disabled:!K.marca,children:[(0,D.jsx)(`option`,{value:``,children:K.marca?`Todos os modelos`:`Escolhe a marca`}),me.map(e=>(0,D.jsx)(`option`,{value:e,children:e},e))]})]}),(0,D.jsxs)(`label`,{children:[`Combustível`,(0,D.jsxs)(`select`,{value:K.combustivel,onChange:e=>X(`combustivel`,e.target.value),children:[(0,D.jsx)(`option`,{value:``,children:`Todos`}),oe.map(e=>(0,D.jsx)(`option`,{value:e,children:e},e))]})]}),(0,D.jsxs)(`label`,{children:[`Preço máximo`,(0,D.jsxs)(`select`,{value:K.precoMax,onChange:e=>X(`precoMax`,e.target.value),children:[(0,D.jsx)(`option`,{value:``,children:`Qualquer preço`}),ce.map(e=>(0,D.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}):(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(`label`,{children:[`Tipologia`,(0,D.jsxs)(`select`,{value:K.tipologia,onChange:e=>X(`tipologia`,e.target.value),children:[(0,D.jsx)(`option`,{value:``,children:`Todas`}),j.map(e=>(0,D.jsx)(`option`,{value:e,children:e},e))]})]}),(0,D.jsxs)(`label`,{children:[`Preço máximo`,(0,D.jsxs)(`select`,{value:K.precoMax,onChange:e=>X(`precoMax`,e.target.value),children:[(0,D.jsx)(`option`,{value:``,children:`Qualquer preço`}),le.map(e=>(0,D.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,D.jsxs)(`label`,{children:[`Distrito`,(0,D.jsxs)(`select`,{value:K.distrito,onChange:e=>X(`distrito`,e.target.value),children:[(0,D.jsx)(`option`,{value:``,children:`Portugal inteiro`}),y.map(e=>(0,D.jsx)(`option`,{value:e,children:e},e))]})]}),(0,D.jsxs)(`button`,{type:`submit`,children:[(0,D.jsx)(n,{size:17}),` Pesquisar`]})]})]})]})}),(0,D.jsx)(`section`,{className:`lp-quick`,"aria-label":`Atalhos úteis`,children:(0,D.jsx)(`div`,{className:`lp-shell lp-quick-grid`,children:ue.map(e=>(0,D.jsx)(g,{to:q(e.tipo,e.filtros),children:e.label},e.label))})}),(0,D.jsx)(`section`,{className:`lp-section lp-category-section`,"aria-labelledby":`lp-categories`,children:(0,D.jsxs)(`div`,{className:`lp-shell`,children:[(0,D.jsx)(`div`,{className:`lp-section-head`,children:(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisar`}),(0,D.jsx)(`h2`,{id:`lp-categories`,children:`Escolhe o mercado.`})]})}),(0,D.jsxs)(`div`,{className:`lp-category-grid`,children:[(0,D.jsxs)(g,{className:`lp-category-card`,to:`/carros`,children:[(0,D.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`}),(0,D.jsxs)(`span`,{children:[(0,D.jsx)(`small`,{children:`Automóveis`}),(0,D.jsx)(`strong`,{children:`Carros usados e novos`}),(0,D.jsx)(`em`,{children:`Marca, modelo, km, combustível e preço.`})]})]}),(0,D.jsxs)(g,{className:`lp-category-card`,to:`/imoveis`,children:[(0,D.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`}),(0,D.jsxs)(`span`,{children:[(0,D.jsx)(`small`,{children:`Imóveis`}),(0,D.jsx)(`strong`,{children:`Casas, apartamentos e espaços`}),(0,D.jsx)(`em`,{children:`Tipologia, localização, área e valor.`})]})]})]})]})}),(0,D.jsx)(`section`,{className:`lp-section lp-brand-section`,id:`marcas`,"aria-labelledby":`lp-brands`,children:(0,D.jsxs)(`div`,{className:`lp-shell`,children:[(0,D.jsxs)(`div`,{className:`lp-section-head`,children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`span`,{className:`lp-kicker`,children:`Marcas`}),(0,D.jsx)(`h2`,{id:`lp-brands`,children:`Pesquisa automóveis por marca.`})]}),(0,D.jsxs)(`div`,{className:`lp-brand-controls`,children:[(0,D.jsx)(`button`,{type:`button`,onClick:()=>Z(-1),"aria-label":`Ver marcas anteriores`,children:`‹`}),(0,D.jsx)(`button`,{type:`button`,onClick:()=>Z(1),"aria-label":`Ver mais marcas`,children:`›`})]})]}),(0,D.jsx)(`div`,{className:`lp-brand-rail`,ref:p,children:(0,D.jsx)(`div`,{className:`lp-brand-grid`,children:C.map(e=>{let t=F(e);return(0,D.jsxs)(g,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,D.jsxs)(`span`,{className:`lp-brand-mark ${M.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,D.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:L(e)}),(0,D.jsx)(`img`,{src:I(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,D.jsx)(`strong`,{children:e})]},e)})})})]})}),(0,D.jsx)(`section`,{className:`lp-section lp-links-section`,id:`atalhos`,"aria-labelledby":`lp-links`,children:(0,D.jsxs)(`div`,{className:`lp-shell`,children:[(0,D.jsx)(`div`,{className:`lp-section-head`,children:(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`span`,{className:`lp-kicker`,children:`Atalhos`}),(0,D.jsx)(`h2`,{id:`lp-links`,children:`Entradas rápidas.`})]})}),(0,D.jsxs)(`div`,{className:`lp-link-columns`,children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h3`,{children:`Marcas populares`}),A.map(e=>(0,D.jsx)(g,{to:q(`carro`,{marca:e}),children:e},e))]}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h3`,{children:`Modelos procurados`}),ae.map(([e,t])=>(0,D.jsxs)(g,{to:q(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))]}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h3`,{children:`Distritos`}),se.map(e=>(0,D.jsx)(g,{to:q(`carro`,{distrito:e}),children:e},e))]}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h3`,{children:`Imóveis`}),j.map(e=>(0,D.jsx)(g,{to:q(`imovel`,{tipologia:e}),children:e},e))]})]})]})}),_e&&(0,D.jsx)(`section`,{className:`lp-section lp-listing-section`,id:`destaques`,"aria-labelledby":`lp-featured`,children:(0,D.jsxs)(`div`,{className:`lp-shell`,children:[(0,D.jsx)(`div`,{className:`lp-section-head`,children:(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`span`,{className:`lp-kicker`,children:`Anúncios`}),(0,D.jsx)(`h2`,{id:`lp-featured`,children:`Destaques recentes.`})]})}),(0,D.jsxs)(`div`,{className:`lp-listing-columns`,children:[(W||B.carro.length>0)&&(0,D.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,D.jsxs)(`div`,{className:`lp-column-top`,children:[(0,D.jsxs)(`h3`,{children:[(0,D.jsx)(m,{size:16}),` Carros`]}),(0,D.jsx)(`button`,{type:`button`,onClick:()=>a(`/carros`),children:`Ver carros`})]}),(0,D.jsx)(`div`,{className:`lp-listing-list`,children:B.carro.length>0?B.carro.map(e=>Q(e,`/carros`)):$(`carros`,`/carros`)})]}),(W||B.imovel.length>0)&&(0,D.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,D.jsxs)(`div`,{className:`lp-column-top`,children:[(0,D.jsxs)(`h3`,{children:[(0,D.jsx)(l,{size:16}),` Imóveis`]}),(0,D.jsx)(`button`,{type:`button`,onClick:()=>a(`/imoveis`),children:`Ver imóveis`})]}),(0,D.jsx)(`div`,{className:`lp-listing-list`,children:B.imovel.length>0?B.imovel.map(e=>Q(e,`/imoveis`)):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,D.jsx)(`section`,{className:`lp-section lp-sell-section`,"aria-labelledby":`lp-sell`,children:(0,D.jsxs)(`div`,{className:`lp-shell lp-sell-box`,children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`span`,{className:`lp-kicker`,children:`Anunciar`}),(0,D.jsx)(`h2`,{id:`lp-sell`,children:`Tens um carro ou imóvel para vender?`}),(0,D.jsx)(`p`,{children:`Publica grátis e recebe contactos diretamente no teu anúncio.`})]}),(0,D.jsxs)(g,{className:`lp-main-cta`,to:R,state:z,children:[`Publicar anúncio `,(0,D.jsx)(T,{size:16})]}),J&&(0,D.jsxs)(g,{className:`lp-soft-cta`,to:`/profissionais`,children:[(0,D.jsx)(t,{size:16}),` Ver profissionais`]})]})}),(0,D.jsx)(ne,{placement:`landing_between_highlights`,minHeight:96}),(0,D.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv`,children:(0,D.jsxs)(`div`,{className:`lp-shell lp-cv-card`,children:[(0,D.jsxs)(`div`,{children:[(0,D.jsxs)(`span`,{className:`lp-kicker`,children:[(0,D.jsx)(ie,{size:12}),` Histórico automóvel`]}),(0,D.jsx)(`h2`,{id:`lp-cv`,children:`Verifica o histórico com 20% de desconto.`}),(0,D.jsx)(`p`,{children:`Antes de visitar ou fechar negócio, consulta dados disponíveis sobre histórico, quilometragem e registos do veículo através da carVertical.`}),(0,D.jsxs)(`a`,{className:`lp-main-cta`,href:k,target:`_blank`,rel:`noopener noreferrer`,children:[`Verificar veículo `,(0,D.jsx)(T,{size:16})]})]}),(0,D.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,D.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`}),(0,D.jsx)(`strong`,{children:`20%`}),(0,D.jsx)(`span`,{children:`de desconto através do link Noxvelia.`})]})]})})]}),(0,D.jsx)(c,{})]})}export{R as default};