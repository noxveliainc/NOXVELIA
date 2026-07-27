import{a as e,n as t,t as n}from"./jsx-runtime-CdvZGgm7.js";import{n as r,r as i,t as a}from"./search-DoIrNkMv.js";import{C as o,D as s,E as c,S as l,d as u,h as d,l as f,m as p,u as m,x as h,y as g}from"./index-BPuvlk9E.js";import{t as _}from"./localizacoes-9zKfqZul.js";import{r as v}from"./images-io1S19E8.js";import{a as y,i as b,o as ee}from"./seo-BZnLo9Qd.js";import{t as te}from"./Seo-jZoYTe11.js";import{t as ne}from"./GoogleAdSlot-CllEeuYa.js";import{n as x,t as S}from"./marcasModelos-CRXT0e16.js";import{t as C}from"./funnelAnalytics-DVtp_Dwt.js";var w=p(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),T=p(`handshake`,[[`path`,{d:`m11 17 2 2a1 1 0 1 0 3-3`,key:`efffak`}],[`path`,{d:`m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4`,key:`9pr0kb`}],[`path`,{d:`m21 3 1 11h-2`,key:`1tisrp`}],[`path`,{d:`M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3`,key:`1uvwmv`}],[`path`,{d:`M3 4h8`,key:`1ep09j`}]]),E=p(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),re=p(`sliders-horizontal`,[[`path`,{d:`M10 5H3`,key:`1qgfaw`}],[`path`,{d:`M12 19H3`,key:`yhmn1j`}],[`path`,{d:`M14 3v4`,key:`1sua03`}],[`path`,{d:`M16 17v4`,key:`1q0r14`}],[`path`,{d:`M21 12h-9`,key:`1o4lsq`}],[`path`,{d:`M21 19h-5`,key:`1rlt1p`}],[`path`,{d:`M21 5h-7`,key:`1oszz2`}],[`path`,{d:`M8 10v4`,key:`tgpxqk`}],[`path`,{d:`M8 12H3`,key:`a7s4jb`}]]),D=e(t(),1),O=n();function ie(){let{user:e,signed:t,logout:n}=h(),r=c(),[i,a]=(0,D.useState)(!1),[s,l]=(0,D.useState)(!1),u=(0,D.useRef)(null),f=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=e=>{u.current&&!u.current.contains(e.target)&&a(!1),f.current&&!f.current.contains(e.target)&&l(!1)},t=e=>{e.key===`Escape`&&(a(!1),l(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,D.useEffect)(()=>{a(!1),l(!1)},[r.pathname]);let p=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),m=p?.avatarUrl||p?.avatar,_=p?.nome?.charAt(0).toUpperCase()||`U`,v=p?.nome?.split(` `)[0]||``,y=t?`/publicar`:`/login`,b=t?void 0:g(r,`/`);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(`style`,{children:`
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
      `}),(0,O.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:f,children:[(0,O.jsxs)(`div`,{className:`nl-inner`,children:[(0,O.jsxs)(o,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,O.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,O.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,O.jsxs)(`div`,{className:`nl-links`,children:[(0,O.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,O.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,O.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,O.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,O.jsx)(o,{to:`/profissionais`,children:`Profissionais`})]}),(0,O.jsxs)(`div`,{className:`nl-actions`,children:[(0,O.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{a(!1),l(e=>!e)},"aria-expanded":s,"aria-controls":`nl-mobile-menu`,"aria-label":s?`Fechar navegação`:`Abrir navegação`,children:s?(0,O.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,O.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,O.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,O.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,O.jsx)(d,{}),!t&&(0,O.jsx)(o,{to:`/login`,state:{from:r.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,O.jsx)(o,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),t?(0,O.jsxs)(`div`,{ref:u,className:`nl-user-wrap`,children:[(0,O.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${i?`active`:``}`,onClick:()=>{l(!1),a(e=>!e)},"aria-expanded":i,"aria-label":`Abrir menu de utilizador`,children:[(0,O.jsx)(`span`,{className:`nl-avatar`,children:m?(0,O.jsx)(`img`,{src:m,alt:``}):(0,O.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,O.jsx)(`span`,{className:`nl-username`,children:v}),(0,O.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,O.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),i&&(0,O.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,O.jsxs)(o,{to:`/perfil`,onClick:()=>a(!1),className:`nl-ud-item`,children:[(0,O.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,O.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,O.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,O.jsx)(`div`,{className:`nl-ud-divider`}),(0,O.jsxs)(`button`,{type:`button`,onClick:()=>{a(!1),n()},className:`nl-ud-item logout`,children:[(0,O.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,O.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,O.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,O.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),s&&(0,O.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,O.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,O.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`strong`,{children:`Noxvelia`}),(0,O.jsx)(`span`,{children:`Carros e imóveis em Portugal`})]})]}),(0,O.jsx)(`a`,{href:`#pesquisa`,onClick:()=>l(!1),children:`Pesquisar`}),(0,O.jsx)(`a`,{href:`#anunciar`,onClick:()=>l(!1),children:`Anunciar grátis`}),(0,O.jsx)(`a`,{href:`#marcas`,onClick:()=>l(!1),children:`Marcas`}),(0,O.jsx)(`a`,{href:`#atalhos`,onClick:()=>l(!1),children:`Atalhos`}),(0,O.jsx)(o,{to:`/carros`,onClick:()=>l(!1),children:`Carros`}),(0,O.jsx)(o,{to:`/imoveis`,onClick:()=>l(!1),children:`Imóveis`}),(0,O.jsx)(o,{to:`/profissionais`,onClick:()=>l(!1),children:`Profissionais`}),(0,O.jsx)(o,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>l(!1),children:`Publicar anúncio`}),t?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(o,{to:`/perfil`,onClick:()=>l(!1),children:`O meu perfil`}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>{l(!1),n()},children:`Terminar sessão`})]}):(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(o,{to:`/login`,state:{from:r.pathname},onClick:()=>l(!1),children:`Entrar`}),(0,O.jsx)(o,{to:`/registo`,onClick:()=>l(!1),children:`Registar`})]})]})]})]})}var k=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,A=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],j=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],M=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],N=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],P=[`T1`,`T2`,`T3`,`T4`,`T5+`],F=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],ae=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),oe=e=>e==null?`...`:new Intl.NumberFormat(`pt-PT`).format(e),I=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),se=e=>`/marcas/${I(e)}.${e===`Jaecoo`?`svg`:`png`}`,ce=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),le=new Set([`aiways`,`aston-martin`,`bentley`]);function L(){let e=s(),t=c(),{signed:n}=h(),d=(0,D.useRef)(!1),p=(0,D.useRef)(null),L=n?`/publicar`:`/login`,R=n?void 0:g(t,`/`),[z,B]=(0,D.useState)({carro:[],imovel:[]}),[V,H]=(0,D.useState)(null),[U,ue]=(0,D.useState)(!0),[W,G]=(0,D.useState)(!1),[K,de]=(0,D.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``}),q=e=>{let t=p.current;t&&t.scrollBy({left:e*Math.max(320,t.clientWidth*.82),behavior:`smooth`})};(0,D.useEffect)(()=>{if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let e=Array.from(document.querySelectorAll(`.lp-reveal`)),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.setAttribute(`data-visible`,`true`),t.unobserve(e.target))})},{rootMargin:`0px 0px -8% 0px`,threshold:.12});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]),(0,D.useEffect)(()=>{let e=()=>{d.current||m()?.external===!0&&(d.current=!0,C(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||m()?.external===!0)&&e()};return window.addEventListener(f,t),()=>window.removeEventListener(f,t)},[]),(0,D.useEffect)(()=>{let e=!0;return l.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&H(t||null)}).catch(()=>{e&&H(null)}),()=>{e=!1}},[]),(0,D.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await l.get(`/anuncios/em-alta/semana`);if(!e)return;B({carro:(t?.carro||[]).slice(0,2),imovel:(t?.imovel||[]).slice(0,2)}),G(!1)}catch{e&&(B({carro:[],imovel:[]}),G(!0))}finally{e&&ue(!1)}})(),()=>{e=!1}},[]);let fe=K.tipo===`carro`&&K.marca?x(K.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],J=Number(V?.profissionais||0)>0,Y=[{label:`Anúncios ativos`,value:V?.totalAnuncios},{label:`Carros`,value:V?.carros},{label:`Imóveis`,value:V?.imoveis},J?{label:`Profissionais`,value:V?.profissionais}:null].filter(e=>e&&Number(e.value||0)>0),X=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},Z=(e,t)=>{de(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},pe=t=>{t.preventDefault();let{tipo:n,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=K,l={distrito:s,precoMax:c,...n===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};C(`search_start`,{vertical:n}),e(X(n,l))},me=(t,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}e(b(t))},he=U||z.carro.length>0||z.imovel.length>0,Q=(e,t)=>{let n=e.tipo===`carro`,r=v(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,O.jsxs)(`button`,{type:`button`,className:`lp-example-card`,onClick:()=>me(e,t),children:[(0,O.jsx)(`span`,{className:`lp-example-img`,children:r?(0,O.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,O.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`})}),(0,O.jsxs)(`span`,{className:`lp-example-body`,children:[(0,O.jsx)(`span`,{className:`lp-example-price`,children:ae(e.preco)}),(0,O.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,O.jsx)(`span`,{className:`lp-example-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,O.jsx)(`span`,{className:`lp-example-location`,children:e.localizacao?.cidade||`Portugal`})]})]},e._id)},$=(t,n)=>U?(0,O.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,O.jsx)(`strong`,{children:`A carregar destaques.`}),(0,O.jsx)(`span`,{children:`Estamos a preparar uma seleção recente.`})]}):(0,O.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,O.jsx)(`strong`,{children:W?`Os destaques estão a ser atualizados.`:`Vê todos os anúncios em ${t}.`}),(0,O.jsx)(`span`,{children:W?`A pesquisa completa continua disponível.`:`Explora a lista completa com todos os filtros.`}),(0,O.jsxs)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>e(n),children:[`Explorar `,t]})]});return(0,O.jsxs)(`div`,{className:`lp-root`,children:[(0,O.jsx)(te,{title:`Noxvelia | Plataforma de carros e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.`,path:`/`,jsonLd:[ee,y]}),(0,O.jsx)(`style`,{children:`
        .lp-root, .lp-root * { box-sizing: border-box; }
        .lp-root {
          --lp-navy: #071326; --lp-blue: #102f50; --lp-gold: #d9c49c; --lp-gold-soft: #f0dfbb; --lp-cyan: #d9c49c; --lp-emerald: #b89961;
          --lp-paper: #fffaf0; --lp-stone: #f4efe5; --lp-line: rgba(7, 19, 38, 0.14); --lp-muted: #546575;
          min-height: 100vh; overflow-x: hidden; background: var(--lp-stone); color: var(--lp-navy);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .lp-root a, .lp-root button, .lp-root input, .lp-root select { font: inherit; }
        .lp-root a:focus-visible, .lp-root button:focus-visible, .lp-root select:focus-visible { outline: 3px solid rgba(217, 196, 156, 0.5); outline-offset: 3px; }
        .lp-reveal { opacity: 0; transform: translateY(12px); transition: opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1); }
        .lp-reveal[data-visible="true"] { opacity: 1; transform: translateY(0); }
        .lp-reveal-delay-1 { transition-delay: .12s; }
        .lp-reveal-delay-2 { transition-delay: .22s; }
        @keyframes lp-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        .lp-shell { width: min(1220px, calc(100% - 48px)); margin: 0 auto; }
        .lp-hero { --lp-pointer-x: 72%; --lp-pointer-y: 34%; position: relative; isolation: isolate; min-height: clamp(620px, calc(100vh - 74px), 760px); display: flex; align-items: stretch; overflow: hidden; background: var(--lp-navy); }
        .lp-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 62% center; z-index: -2; }        .lp-hero::before { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at 74% 28%, rgba(240,223,187,.28), rgba(240,223,187,.08) 24%, transparent 48%); opacity: .86; }
        .lp-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(7,19,38,.95) 0%, rgba(7,19,38,.82) 42%, rgba(7,19,38,.36) 72%, rgba(7,19,38,.18) 100%), linear-gradient(0deg, rgba(7,19,38,.78) 0%, rgba(7,19,38,.12) 58%); }
        .lp-hero-orbits { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .lp-hero-orbits span { position: absolute; width: 220px; height: 220px; border: 1px solid rgba(240,223,187,.22); border-radius: 999px; background: radial-gradient(circle, rgba(240,223,187,.12), transparent 62%); opacity: .7; }
        .lp-hero-orbits span:nth-child(1) { right: 9%; top: 16%; }
        .lp-hero-orbits span:nth-child(2) { right: 26%; bottom: 10%; width: 150px; height: 150px; opacity: .46; }
        .lp-hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(360px, 470px); gap: clamp(28px, 5vw, 70px); align-items: center; padding: clamp(64px, 8vw, 112px) 0 54px; }
        .lp-hero-copyblock { max-width: 690px; color: #fffaf0; }
        .lp-eyebrow { display: inline-flex; width: fit-content; margin: 0 0 14px; padding: 7px 10px; color: var(--lp-gold-soft); border: 1px solid rgba(240,223,187,.3); border-radius: 8px; background: rgba(240,223,187,.1); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .lp-hero h1 { max-width: 760px; margin: 0; color: #fffaf0; font-size: clamp(46px, 6vw, 82px); font-weight: 900; line-height: .9; letter-spacing: 0; text-wrap: balance; }
        .lp-gradient-word { display: inline-block; color: transparent; background: linear-gradient(90deg, #fffaf0, var(--lp-gold-soft), var(--lp-cyan)); -webkit-background-clip: text; background-clip: text; }
        .lp-hero-copy { max-width: 610px; margin: 22px 0 0; color: rgba(255,250,240,.86); font-size: 17px; line-height: 1.72; }
        .lp-proof-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; max-width: 620px; margin-top: 24px; }
        .lp-proof-card { min-width: 0; padding: 13px 14px; border: 1px solid rgba(240,223,187,.24); border-radius: 12px; background: rgba(255,250,240,.09); backdrop-filter: blur(14px); }
        .lp-proof-card strong { display: block; color: #fffaf0; font-size: 18px; line-height: 1; }
        .lp-proof-card span { display: block; margin-top: 7px; color: rgba(255,250,240,.68); font-size: 11px; font-weight: 850; letter-spacing: .06em; text-transform: uppercase; }
        .lp-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .lp-hero-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
        .lp-hero-badges span { min-height: 34px; display: inline-flex; align-items: center; color: rgba(255,250,240,.86); border: 1px solid rgba(240,223,187,.26); border-radius: 999px; background: rgba(255,250,240,.08); padding: 0 11px; font-size: 12px; font-weight: 780; backdrop-filter: blur(10px); }
        .lp-btn, .lp-text-link, .lp-search-submit, .lp-link-button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; border: 1px solid transparent; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 850; cursor: pointer; transition: background-color .18s ease, border-color .18s ease, color .18s ease, transform .18s ease !important; }
        .lp-btn-primary, .lp-search-submit { color: var(--lp-navy); background: var(--lp-gold); border-color: var(--lp-gold); }
        .lp-text-link { color: #fffaf0; border-color: rgba(240,223,187,.35); background: rgba(255,250,240,.08); }
        .lp-btn:hover, .lp-text-link:hover, .lp-search-submit:hover, .lp-link-button:hover { transform: translateY(-1px) !important; }
        .lp-search-panel { position: relative; align-self: center; padding: 20px; border: 1px solid rgba(240,223,187,.34); border-radius: 18px; background: rgba(255,250,240,.97); box-shadow: 0 30px 74px -56px rgba(0,0,0,.82); overflow: hidden; contain: paint; }
        .lp-search-panel::before { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.58), transparent 42%); opacity: .7; pointer-events: none; }
        .lp-search-panel > * { position: relative; z-index: 1; }
        .lp-search-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 16px; }
        .lp-command-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: -2px 0 14px; padding-bottom: 12px; border-bottom: 1px solid rgba(7,19,38,.11); }
        .lp-command-brand { display: inline-flex; align-items: center; color: var(--lp-navy); font-size: 12px; font-weight: 950; letter-spacing: .08em; text-transform: uppercase; }
        .lp-command-dot { display: none; }
        .lp-command-live { display: none; }
        .lp-search-head h2 { margin: 0; color: var(--lp-navy); font-size: 24px; line-height: 1.08; letter-spacing: 0; }
        .lp-search-head p { margin: 8px 0 0; color: var(--lp-muted); font-size: 13px; line-height: 1.45; }
        .lp-type-tabs { flex: 0 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; padding: 4px; border: 1px solid rgba(7,19,38,.13); border-radius: 10px; background: #e9dfce; }
        .lp-type-tab { min-height: 38px; padding: 0 13px; color: #425365; border: 0; border-radius: 7px; background: transparent; font-size: 13px; font-weight: 850; cursor: pointer; }
        .lp-type-tab.active { color: var(--lp-navy); background: var(--lp-gold); }
        .lp-search-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
        .lp-field { min-width: 0; display: flex; flex-direction: column; gap: 6px; }
        .lp-field label { color: #4d5f70; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .lp-field select { width: 100%; min-height: 48px; padding: 0 12px; color: var(--lp-navy); border: 1px solid rgba(7,19,38,.16); border-radius: 10px; background: #fff; font-size: 13px; font-weight: 760; transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
        .lp-field select:hover { border-color: rgba(16,47,80,.28); transform: translateY(-1px); }
        .lp-field select:focus { border-color: rgba(217,196,156,.78); box-shadow: 0 0 0 4px rgba(217,196,156,.22); }
        .lp-field select:disabled { color: #8793a0; background: #f4f2eb; }
        .lp-search-submit { grid-column: 1 / -1; width: 100%; margin-top: 2px; }
        .lp-command-preview { display: grid; gap: 8px; margin-top: 14px; padding: 12px; border: 1px solid rgba(7,19,38,.1); border-radius: 12px; background: linear-gradient(180deg, rgba(255,255,255,.94), rgba(246,242,233,.9)); }
        .lp-command-row { min-height: 40px; display: flex; align-items: center; padding: 0 12px; color: var(--lp-navy); border: 1px solid rgba(7,19,38,.08); border-radius: 10px; background: #fff; }
        .lp-command-row:nth-child(2) { animation-delay: -1.8s; }
        .lp-command-row:nth-child(3) { animation-delay: -3.6s; }
        .lp-command-icon { display: none; }
        .lp-command-row strong { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
        .lp-command-row span:last-child { display: none; }
        .lp-market-ticker { overflow: hidden; background: #fffaf0; border-bottom: 1px solid var(--lp-line); }
        .lp-market-track { display: flex; width: max-content; animation: lp-marquee 48s linear infinite; will-change: transform; }
        .lp-market-track:hover { animation-play-state: paused; }
        .lp-market-item { min-height: 58px; display: inline-flex; align-items: center; gap: 10px; padding: 0 24px; color: var(--lp-blue); border-right: 1px solid var(--lp-line); font-size: 12px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; }
        .lp-market-item::before { content: ''; width: 8px; height: 8px; border-radius: 999px; background: var(--lp-gold); box-shadow: none; }
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
        .lp-section .lp-eyebrow, .lp-showcase-band .lp-eyebrow { color: var(--lp-blue); border-color: rgba(16,47,80,.16); background: rgba(255,255,255,.72); }
        .lp-search-eyebrow { color: var(--lp-navy); border-color: rgba(217,196,156,.58); background: rgba(217,196,156,.22); }
        .lp-showcase-band { position: relative; overflow: hidden; padding: 76px 0; background: linear-gradient(180deg, #fffaf0 0%, #f5efe3 100%); border-bottom: 1px solid var(--lp-line); }
        .lp-showcase-band::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(217,196,156,.16), transparent 32%, rgba(16,47,80,.07)); pointer-events: none; }
        .lp-showcase-grid { position: relative; display: grid; grid-template-columns: minmax(320px, .82fr) minmax(0, 1.18fr); gap: clamp(28px, 5vw, 68px); align-items: center; }
        .lp-showcase-copy { max-width: 520px; }
        .lp-showcase-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .lp-inline-action { min-height: 42px; display: inline-flex; align-items: center; gap: 8px; padding: 0 13px; color: var(--lp-navy); border: 1px solid rgba(16,47,80,.16); border-radius: 8px; background: rgba(255,255,255,.72); text-decoration: none; font-size: 13px; font-weight: 850; transition: transform .18s ease, border-color .18s ease, background-color .18s ease !important; }
        .lp-inline-action:hover { transform: translateY(-1px) !important; border-color: rgba(217,196,156,.72); background: #fff; }
        .lp-showcase-checks { display: grid; gap: 10px; margin-top: 22px; }
        .lp-showcase-checks span { display: flex; align-items: center; gap: 10px; color: #344b5f; font-size: 14px; line-height: 1.35; }
        .lp-showcase-checks svg { color: var(--lp-blue); flex: 0 0 auto; }
        .lp-platform-card { position: relative; overflow: hidden; padding: 16px; border: 1px solid rgba(217,196,156,.28); border-radius: 14px; background: #071326; color: #fffaf0; box-shadow: 0 32px 90px -54px rgba(7,19,38,.9); contain: paint; }
        .lp-platform-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 86% 10%, rgba(217,196,156,.18), transparent 34%); pointer-events: none; }
        .lp-platform-card > * { position: relative; }
        .lp-platform-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 2px 2px 14px; border-bottom: 1px solid rgba(240,223,187,.12); }
        .lp-platform-brand { display: inline-flex; align-items: center; gap: 8px; color: var(--lp-gold-soft); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .lp-platform-status { color: rgba(255,250,240,.64); font-size: 12px; font-weight: 760; }
        .lp-platform-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 14px; }
        .lp-platform-tab { min-height: 42px; display: flex; align-items: center; justify-content: center; gap: 7px; padding: 0 10px; border: 1px solid rgba(240,223,187,.14); border-radius: 8px; background: rgba(255,250,240,.06); color: rgba(255,250,240,.78); font-size: 12px; font-weight: 850; }
        .lp-platform-tab.active { background: var(--lp-gold); border-color: var(--lp-gold); color: var(--lp-navy); }
        .lp-platform-search { min-height: 54px; display: flex; align-items: center; gap: 10px; margin-top: 14px; padding: 0 14px; border: 1px solid rgba(240,223,187,.14); border-radius: 8px; background: rgba(255,250,240,.08); color: #fffaf0; }
        .lp-platform-search span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 780; }
        .lp-platform-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, .62fr); gap: 14px; margin-top: 14px; }
        .lp-result-stack { display: grid; border: 1px solid rgba(240,223,187,.12); border-radius: 10px; overflow: hidden; background: rgba(255,250,240,.05); }
        .lp-result-row { min-width: 0; display: grid; grid-template-columns: 52px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 12px; color: #fffaf0; border-bottom: 1px solid rgba(240,223,187,.1); text-decoration: none; transition: background-color .18s ease, transform .18s ease !important; }
        .lp-result-row:last-child { border-bottom: 0; }
        .lp-result-row:hover { background: rgba(255,250,240,.08); transform: translateX(2px) !important; }
        .lp-result-thumb { width: 52px; height: 42px; border-radius: 7px; background: linear-gradient(135deg, rgba(217,196,156,.92), rgba(16,47,80,.84)); }
        .lp-result-thumb.estate { background: linear-gradient(135deg, rgba(240,223,187,.92), rgba(115,143,168,.84)); }
        .lp-result-copy { min-width: 0; display: grid; gap: 4px; }
        .lp-result-copy strong { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #fffaf0; font-size: 14px; }
        .lp-result-copy span { color: rgba(255,250,240,.62); font-size: 12px; }
        .lp-result-price { color: var(--lp-gold-soft); font-size: 13px; font-weight: 900; white-space: nowrap; }
        .lp-decision-panel { display: flex; flex-direction: column; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid rgba(240,223,187,.14); border-radius: 10px; background: rgba(255,250,240,.08); }
        .lp-decision-panel strong { color: #fffaf0; font-size: 20px; line-height: 1.12; }
        .lp-decision-panel p { margin: 8px 0 0; color: rgba(255,250,240,.68); font-size: 13px; line-height: 1.55; }
        .lp-decision-list { display: grid; gap: 9px; margin-top: 14px; }
        .lp-decision-list span { display: flex; align-items: center; gap: 8px; color: rgba(255,250,240,.82); font-size: 12px; font-weight: 760; }
        .lp-decision-list svg { color: var(--lp-gold-soft); flex: 0 0 auto; }
        .lp-decision-cta { min-height: 40px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; color: var(--lp-navy); background: var(--lp-gold); border-radius: 8px; padding: 0 12px; text-decoration: none; font-size: 13px; font-weight: 900; }
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
        .lp-pro-strip { display: grid; grid-template-columns: 130px minmax(0, 1fr) auto; gap: 18px; align-items: center; margin-top: 18px; padding: 20px; color: #fffaf0; border-radius: 12px; background: var(--lp-navy); }
        .lp-pro-strip span { color: var(--lp-gold-soft); font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .lp-pro-strip strong { font-size: 20px; line-height: 1.2; }
        .lp-pro-cta { min-height: 40px; display: inline-flex; align-items: center; justify-content: center; color: var(--lp-navy); background: var(--lp-gold); border-radius: 8px; padding: 0 14px; text-decoration: none; font-size: 13px; font-weight: 850; transition: transform .18s ease, background-color .18s ease !important; } .lp-pro-cta:hover { transform: translateY(-1px) !important; background: var(--lp-gold-soft); }
        .lp-brands-section { background: var(--lp-paper); border-top: 1px solid var(--lp-line); border-bottom: 1px solid var(--lp-line); }
        .lp-brand-carousel { position: relative; display: grid; grid-template-columns: 44px minmax(0, 1fr) 44px; align-items: center; gap: 12px; }
        .lp-brand-rail { min-width: 0; overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; scrollbar-width: none; padding: 2px; }
        .lp-brand-rail::-webkit-scrollbar { display: none; }
        .lp-brand-grid { display: grid; grid-auto-flow: column; grid-template-rows: repeat(2, 92px); grid-auto-columns: minmax(132px, 152px); gap: 10px; width: max-content; }
        .lp-brand-arrow { width: 44px; height: 44px; display: grid; place-items: center; color: var(--lp-navy); border: 1px solid rgba(7,19,38,.14); border-radius: 999px; background: #fff; cursor: pointer; box-shadow: 0 14px 34px -28px rgba(7,19,38,.65); transition: transform .18s ease, border-color .18s ease, background-color .18s ease !important; }
        .lp-brand-arrow:hover { transform: translateY(-1px) !important; border-color: rgba(217,196,156,.84); background: var(--lp-gold-soft); }
        .lp-brand-arrow span { display: block; font-size: 23px; line-height: 1; transform: translateY(-1px); }
        .lp-brand-card { min-height: 92px; display: grid; grid-template-rows: 42px auto; place-items: center; gap: 7px; padding: 12px; color: #384b5c; border: 1px solid var(--lp-line); border-radius: 10px; background: #fff; text-decoration: none; transition: border-color .18s ease, transform .18s ease !important; }
        .lp-brand-card:hover { border-color: rgba(217,196,156,.84); transform: translateY(-2px) !important; }
        .lp-brand-mark { position: relative; width: 100px; height: 42px; display: grid; place-items: center; overflow: hidden; }
        .lp-brand-mark img { position: relative; z-index: 1; max-width: 100%; max-height: 42px; object-fit: contain; }
        .lp-brand-fallback { position: absolute; inset: 0; display: none; place-items: center; color: var(--lp-blue); font-weight: 900; }
        .lp-brand-mark.logo-error .lp-brand-fallback { display: grid; }
        .lp-brand-mark-clean::after { content: ""; position: absolute; z-index: 2; right: 0; bottom: 0; left: 0; height: 15px; background: linear-gradient(180deg, rgba(255,255,255,0), #fff 56%); pointer-events: none; }
        .lp-brand-name { color: #435668; font-size: 11px; font-weight: 820; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
        .lp-shortcuts-section { background: var(--lp-stone); }
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
        .lp-cv-card { position: relative; overflow: hidden; display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 430px); gap: 28px; align-items: center; padding: clamp(24px, 4vw, 44px); border: 1px solid var(--lp-line); border-radius: 14px; background: linear-gradient(135deg, #fff 0%, #fffaf0 62%, rgba(217,196,156,.28) 100%); box-shadow: 0 24px 70px -52px rgba(7,19,38,.55); }
        .lp-cv-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 88% 18%, rgba(16,47,80,.08), transparent 36%); pointer-events: none; }
        .lp-cv-copy, .lp-cv-panel { position: relative; }
        .lp-cv-points { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0 22px; padding: 0; list-style: none; color: var(--lp-blue); }
        .lp-cv-points li { min-height: 34px; display: inline-flex; align-items: center; padding: 0 11px; border: 1px solid rgba(16,47,80,.14); border-radius: 999px; background: rgba(255,255,255,.72); font-size: 12px; font-weight: 820; }
        .lp-cv-panel { display: grid; gap: 18px; min-height: 280px; padding: 24px; border-radius: 12px; background: #071326; color: #fffaf0; }
        .lp-cv-panel span { color: rgba(255,250,240,.68); font-size: 12px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
        .lp-cv-panel img { max-width: 220px; width: 70%; height: auto; align-self: center; justify-self: center; filter: drop-shadow(0 12px 26px rgba(0,0,0,.32)); }
        .lp-cv-offer { display: grid; gap: 6px; padding: 16px; border: 1px solid rgba(240,223,187,.2); border-radius: 10px; background: rgba(255,250,240,.08); }
        .lp-cv-offer small { color: var(--lp-gold-soft); font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .lp-cv-offer strong { color: #fffaf0; font-size: clamp(34px, 5vw, 54px); line-height: .95; letter-spacing: 0; }
        .lp-cv-offer em { color: rgba(255,250,240,.68); font-size: 13px; font-style: normal; line-height: 1.45; }
        .dark .lp-root { background: #071326; color: #fffaf0; }
        .dark .lp-metrics, .dark .lp-brands-section, .dark .lp-cv-section { background: #0d1d33; border-color: rgba(240,223,187,.14); }
        .dark .lp-search-panel, .dark .lp-promo-link, .dark .lp-shortcut-group, .dark .lp-brand-card, .dark .lp-brand-arrow, .dark .lp-cv-card, .dark .lp-showcase-kpi { background: #102f50; border-color: rgba(240,223,187,.18); color: #fffaf0; }
        .dark .lp-title, .dark .lp-search-head h2, .dark .lp-promo-title, .dark .lp-shortcut-group h3, .dark .lp-metric strong { color: #fffaf0; }
        .dark .lp-copy, .dark .lp-search-head p, .dark .lp-promo-text, .dark .lp-brand-name, .dark .lp-field label { color: rgba(255,250,240,.72); }
        .dark .lp-field select { background: #071326; color: #fffaf0; border-color: rgba(240,223,187,.18); }
        .dark .lp-type-tabs, .dark .lp-cv-panel { background: #071326; }
        .dark .lp-market-ticker { background: #071326; border-color: rgba(240,223,187,.14); }
        .dark .lp-market-item { color: rgba(255,250,240,.86); border-color: rgba(240,223,187,.14); }
        .dark .lp-market-item::before { background: var(--lp-gold); }
        .dark .lp-showcase-band { background: linear-gradient(180deg, #071326 0%, #0d1d33 100%); border-color: rgba(240,223,187,.14); }
        .dark .lp-showcase-band::before { background: radial-gradient(circle at 74% 18%, rgba(217,196,156,.12), transparent 34%); }
        .dark .lp-showcase-band .lp-title,
        .dark .lp-showcase-checks span { color: #fffaf0; }
        .dark .lp-inline-action { color: #fffaf0; border-color: rgba(240,223,187,.18); background: rgba(255,250,240,.08); }
        .dark .lp-platform-card { background: #071326; box-shadow: 0 24px 70px -46px rgba(0,0,0,.85); }
        .dark .lp-brand-card { background: linear-gradient(180deg, #fffaf0 0%, #f4ead8 100%); border-color: rgba(217,196,156,.42); color: #071326; box-shadow: inset 0 1px 0 rgba(255,255,255,.72); }
        .dark .lp-brand-card:hover { border-color: rgba(217,196,156,.9); }
        .dark .lp-brand-name { color: #17304a; }
        .dark .lp-brand-mark { border-radius: 8px; background: rgba(255,255,255,.5); box-shadow: inset 0 0 0 1px rgba(16,47,80,.08); }
        .dark .lp-brand-mark-clean::after { background: linear-gradient(180deg, rgba(255,250,240,0), #fffaf0 56%); }
        .dark .lp-cv-card { background: linear-gradient(135deg, #102f50, #0d1d33 72%, rgba(217,196,156,.12)); }
        .dark .lp-cv-points li { color: var(--lp-gold-soft); border-color: rgba(240,223,187,.18); background: rgba(255,250,240,.08); }
        @media (max-width: 1040px) { .lp-hero { min-height: auto; } .lp-hero-inner, .lp-showcase-grid { grid-template-columns: 1fr; padding-top: 58px; } .lp-search-panel { max-width: 760px; } .lp-promo-grid, .lp-examples-grid, .lp-cv-card { grid-template-columns: 1fr; } .lp-platform-layout { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .lp-reveal { opacity: 1; transform: none; transition: none; } .lp-market-track { animation: none; } .lp-btn, .lp-text-link, .lp-search-submit, .lp-link-button, .lp-promo-link, .lp-brand-card, .lp-inline-action, .lp-result-row { transition: none !important; } }
        @media (max-width: 720px) { .lp-proof-row { grid-template-columns: 1fr; } .lp-shell { width: min(100% - 30px, 1220px); } .lp-hero-inner { padding: 42px 0 34px; gap: 24px; } .lp-hero h1 { font-size: clamp(36px, 12vw, 48px); } .lp-hero-copy { font-size: 15px; } .lp-search-panel { padding: 14px; border-radius: 10px; } .lp-command-top, .lp-search-head { display: grid; } .lp-type-tabs { width: 100%; } .lp-search-form { grid-template-columns: 1fr; } .lp-command-row span:last-child { display: none; } .lp-market-item { min-height: 48px; padding: 0 16px; font-size: 11px; } .lp-brand-carousel { grid-template-columns: 38px minmax(0, 1fr) 38px; gap: 8px; } .lp-brand-arrow { width: 38px; height: 38px; } .lp-brand-grid { grid-auto-columns: minmax(118px, 132px); grid-template-rows: repeat(2, 86px); } .lp-brand-card { min-height: 86px; } .lp-showcase-band { padding: 54px 0; } .lp-platform-tabs { grid-template-columns: 1fr; } .lp-platform-layout { grid-template-columns: 1fr; } .lp-result-row { grid-template-columns: 44px minmax(0, 1fr); } .lp-result-price { grid-column: 2; } .lp-section { padding: 54px 0; } .lp-section-head { display: grid; } .lp-promo-link { grid-template-columns: 1fr; } .lp-promo-media img { min-height: 220px; } .lp-pro-strip { grid-template-columns: 1fr; } .lp-shortcut-grid { grid-template-columns: 1fr; } .lp-shortcut-group.wide { grid-column: auto; } .lp-example-list { grid-template-columns: 1fr; } }
      `}),(0,O.jsx)(ie,{}),(0,O.jsxs)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:[(0,O.jsx)(`img`,{className:`lp-hero-bg`,src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`,onError:e=>{e.currentTarget.src=`/social/noxvelia-estate-photo-premium.webp`}}),(0,O.jsxs)(`div`,{className:`lp-hero-orbits`,"aria-hidden":`true`,children:[(0,O.jsx)(`span`,{}),(0,O.jsx)(`span`,{})]}),(0,O.jsxs)(`div`,{className:`lp-shell lp-hero-inner`,children:[(0,O.jsxs)(`div`,{className:`lp-hero-copyblock lp-reveal`,children:[(0,O.jsxs)(`h1`,{id:`lp-hero-title`,children:[`Carros e imóveis, `,(0,O.jsx)(`span`,{className:`lp-gradient-word`,children:`encontrados sem perder tempo.`})]}),(0,O.jsx)(`p`,{className:`lp-hero-copy`,children:`Pesquisa anúncios, compara informação essencial e chega ao contacto certo com menos passos.`}),(0,O.jsxs)(`div`,{className:`lp-actions`,children:[(0,O.jsx)(`a`,{className:`lp-btn lp-btn-primary`,href:`#pesquisa`,children:`Pesquisar agora`}),(0,O.jsx)(o,{className:`lp-text-link`,to:L,state:R,children:`Publicar grátis`})]}),(0,O.jsxs)(`div`,{className:`lp-hero-badges`,"aria-label":`Destaques da plataforma`,children:[(0,O.jsx)(`span`,{children:`Pesquisa rápida`}),(0,O.jsx)(`span`,{children:`Contactos diretos`}),(0,O.jsx)(`span`,{children:`Perfis públicos`})]}),(0,O.jsxs)(`div`,{className:`lp-proof-row`,"aria-label":`Fluxo principal da Noxvelia`,children:[(0,O.jsxs)(`div`,{className:`lp-proof-card`,children:[(0,O.jsx)(`strong`,{children:`01`}),(0,O.jsx)(`span`,{children:`Pesquisar`})]}),(0,O.jsxs)(`div`,{className:`lp-proof-card`,children:[(0,O.jsx)(`strong`,{children:`02`}),(0,O.jsx)(`span`,{children:`Comparar`})]}),(0,O.jsxs)(`div`,{className:`lp-proof-card`,children:[(0,O.jsx)(`strong`,{children:`03`}),(0,O.jsx)(`span`,{children:`Contactar`})]})]})]}),(0,O.jsxs)(`form`,{className:`lp-search-panel lp-reveal lp-reveal-delay-1`,id:`pesquisa`,"aria-labelledby":`lp-search-title`,onSubmit:pe,children:[(0,O.jsx)(`div`,{className:`lp-command-top`,"aria-hidden":`true`,children:(0,O.jsx)(`span`,{className:`lp-command-brand`,children:`Pesquisa rápida`})}),(0,O.jsxs)(`div`,{className:`lp-search-head`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`span`,{className:`lp-eyebrow lp-search-eyebrow`,children:`Começa por aqui`}),(0,O.jsx)(`h2`,{id:`lp-search-title`,children:`Pesquisa direta.`}),(0,O.jsx)(`p`,{children:`Filtra por tipo, localização e preço. Podes afinar mais depois.`})]}),(0,O.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,O.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":K.tipo===`carro`,className:`lp-type-tab ${K.tipo===`carro`?`active`:``}`,onClick:()=>Z(`tipo`,`carro`),children:`Carros`}),(0,O.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":K.tipo===`imovel`,className:`lp-type-tab ${K.tipo===`imovel`?`active`:``}`,onClick:()=>Z(`tipo`,`imovel`),children:`Imóveis`})]})]}),(0,O.jsxs)(`div`,{className:`lp-search-form`,children:[K.tipo===`carro`?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`div`,{className:`lp-field`,children:[(0,O.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,O.jsxs)(`select`,{id:`lp-marca`,value:K.marca,onChange:e=>Z(`marca`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Todas as marcas`}),S.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`div`,{className:`lp-field`,children:[(0,O.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,O.jsxs)(`select`,{id:`lp-modelo`,value:K.modelo,onChange:e=>Z(`modelo`,e.target.value),disabled:!K.marca,children:[(0,O.jsx)(`option`,{value:``,children:K.marca?`Todos os modelos`:`Escolhe a marca`}),fe.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`div`,{className:`lp-field`,children:[(0,O.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,O.jsxs)(`select`,{id:`lp-combustivel`,value:K.combustivel,onChange:e=>Z(`combustivel`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Todos`}),M.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`div`,{className:`lp-field`,children:[(0,O.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,O.jsxs)(`select`,{id:`lp-preco`,value:K.precoMax,onChange:e=>Z(`precoMax`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Qualquer preço`}),F.slice(0,2).map(e=>(0,O.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}):(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`div`,{className:`lp-field`,children:[(0,O.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,O.jsxs)(`select`,{id:`lp-tipologia`,value:K.tipologia,onChange:e=>Z(`tipologia`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Todas`}),P.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`div`,{className:`lp-field`,children:[(0,O.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,O.jsxs)(`select`,{id:`lp-estate-preco`,value:K.precoMax,onChange:e=>Z(`precoMax`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Qualquer preço`}),F.slice(2).map(e=>(0,O.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,O.jsxs)(`div`,{className:`lp-field`,children:[(0,O.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,O.jsxs)(`select`,{id:`lp-distrito`,value:K.distrito,onChange:e=>Z(`distrito`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Portugal inteiro`}),_.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]}),(0,O.jsxs)(`div`,{className:`lp-command-preview`,"aria-hidden":`true`,children:[(0,O.jsx)(`div`,{className:`lp-command-row`,children:(0,O.jsx)(`strong`,{children:K.tipo===`carro`?K.marca||`Carros em destaque`:K.tipologia||`Imóveis em destaque`})}),(0,O.jsx)(`div`,{className:`lp-command-row`,children:(0,O.jsx)(`strong`,{children:K.distrito||`Portugal inteiro`})}),(0,O.jsx)(`div`,{className:`lp-command-row`,children:(0,O.jsx)(`strong`,{children:K.precoMax?`Até ${Number(K.precoMax).toLocaleString(`pt-PT`)} €`:`Preço flexível`})})]})]})]})]}),(0,O.jsx)(`section`,{className:`lp-market-ticker`,"aria-label":`Atalhos de pesquisa populares`,children:(0,O.jsxs)(`div`,{className:`lp-market-track`,"aria-hidden":`true`,children:[(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Carros até 20.000 €`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`T2 no Porto`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`BMW em Lisboa`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Imóveis com garagem`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Diesel recentes`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Moradias em Braga`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Carros até 20.000 €`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`T2 no Porto`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`BMW em Lisboa`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Imóveis com garagem`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Diesel recentes`}),(0,O.jsx)(`span`,{className:`lp-market-item`,children:`Moradias em Braga`})]})}),(0,O.jsx)(`section`,{className:`lp-showcase-band`,"aria-labelledby":`lp-showcase-title`,children:(0,O.jsxs)(`div`,{className:`lp-shell lp-showcase-grid`,children:[(0,O.jsxs)(`div`,{className:`lp-showcase-copy lp-reveal`,children:[(0,O.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa em Portugal`}),(0,O.jsx)(`h2`,{className:`lp-title`,id:`lp-showcase-title`,children:`Decidir fica mais simples quando a informação aparece primeiro.`}),(0,O.jsx)(`p`,{className:`lp-copy`,children:`A Noxvelia organiza carros, imóveis e contactos numa experiência curta, clara e preparada para quem quer comparar antes de avançar.`}),(0,O.jsxs)(`div`,{className:`lp-showcase-actions`,children:[(0,O.jsxs)(o,{className:`lp-inline-action`,to:`/carros`,children:[(0,O.jsx)(a,{size:16,strokeWidth:2.2,"aria-hidden":`true`}),` Ver carros `,(0,O.jsx)(w,{size:15,strokeWidth:2.2,"aria-hidden":`true`})]}),(0,O.jsxs)(o,{className:`lp-inline-action`,to:`/imoveis`,children:[(0,O.jsx)(r,{size:16,strokeWidth:2.2,"aria-hidden":`true`}),` Ver imóveis `,(0,O.jsx)(w,{size:15,strokeWidth:2.2,"aria-hidden":`true`})]})]}),(0,O.jsxs)(`div`,{className:`lp-showcase-checks`,"aria-label":`Vantagens principais`,children:[(0,O.jsxs)(`span`,{children:[(0,O.jsx)(i,{size:18,strokeWidth:2.2,"aria-hidden":`true`}),` Fotografias, preço e localização tratados como informação principal.`]}),(0,O.jsxs)(`span`,{children:[(0,O.jsx)(i,{size:18,strokeWidth:2.2,"aria-hidden":`true`}),` Pesquisa com marca, distrito, tipologia e orçamento desde o início.`]}),(0,O.jsxs)(`span`,{children:[(0,O.jsx)(i,{size:18,strokeWidth:2.2,"aria-hidden":`true`}),` Contacto direto para reduzir conversas desnecessárias.`]})]})]}),(0,O.jsxs)(`div`,{className:`lp-platform-card lp-reveal lp-reveal-delay-1`,"aria-label":`Exemplo de pesquisa Noxvelia`,children:[(0,O.jsxs)(`div`,{className:`lp-platform-topbar`,children:[(0,O.jsxs)(`span`,{className:`lp-platform-brand`,children:[(0,O.jsx)(re,{size:15,strokeWidth:2.3,"aria-hidden":`true`}),` Noxvelia`]}),(0,O.jsx)(`span`,{className:`lp-platform-status`,children:`Pesquisa preparada`})]}),(0,O.jsxs)(`div`,{className:`lp-platform-tabs`,"aria-hidden":`true`,children:[(0,O.jsxs)(`span`,{className:`lp-platform-tab active`,children:[(0,O.jsx)(a,{size:15,strokeWidth:2.2}),` Comprar`]}),(0,O.jsxs)(`span`,{className:`lp-platform-tab`,children:[(0,O.jsx)(E,{size:15,strokeWidth:2.2}),` Comparar`]}),(0,O.jsxs)(`span`,{className:`lp-platform-tab`,children:[(0,O.jsx)(T,{size:15,strokeWidth:2.2}),` Contactar`]})]}),(0,O.jsxs)(`div`,{className:`lp-platform-search`,"aria-hidden":`true`,children:[(0,O.jsx)(a,{size:17,strokeWidth:2.2}),(0,O.jsx)(`span`,{children:`BMW em Lisboa · até 20.000 € · anúncios recentes`})]}),(0,O.jsxs)(`div`,{className:`lp-platform-layout`,children:[(0,O.jsxs)(`div`,{className:`lp-result-stack`,children:[(0,O.jsxs)(o,{className:`lp-result-row`,to:`/carros?marca=BMW&distrito=Lisboa&precoMax=20000`,children:[(0,O.jsx)(`span`,{className:`lp-result-thumb`}),(0,O.jsxs)(`span`,{className:`lp-result-copy`,children:[(0,O.jsx)(`strong`,{children:`BMW em Lisboa`}),(0,O.jsx)(`span`,{children:`Preço visível · distrito definido`})]}),(0,O.jsx)(`span`,{className:`lp-result-price`,children:`Até 20.000 €`})]}),(0,O.jsxs)(o,{className:`lp-result-row`,to:`/imoveis?tipologia=T2&distrito=Porto`,children:[(0,O.jsx)(`span`,{className:`lp-result-thumb estate`}),(0,O.jsxs)(`span`,{className:`lp-result-copy`,children:[(0,O.jsx)(`strong`,{children:`T2 no Porto`}),(0,O.jsx)(`span`,{children:`Tipologia · localização · fotografias`})]}),(0,O.jsx)(`span`,{className:`lp-result-price`,children:`Ver imóveis`})]}),(0,O.jsxs)(o,{className:`lp-result-row`,to:L,state:R,children:[(0,O.jsx)(`span`,{className:`lp-result-thumb`}),(0,O.jsxs)(`span`,{className:`lp-result-copy`,children:[(0,O.jsx)(`strong`,{children:`Publicar anúncio`}),(0,O.jsx)(`span`,{children:`Fluxo curto para carros e imóveis`})]}),(0,O.jsx)(`span`,{className:`lp-result-price`,children:`Grátis`})]})]}),(0,O.jsxs)(`div`,{className:`lp-decision-panel`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`strong`,{children:`Menos passos entre pesquisar e contactar.`}),(0,O.jsx)(`p`,{children:`O visitante chega rapidamente a resultados úteis e o anunciante recebe contactos com mais contexto.`}),(0,O.jsxs)(`div`,{className:`lp-decision-list`,children:[(0,O.jsxs)(`span`,{children:[(0,O.jsx)(E,{size:15,strokeWidth:2.2,"aria-hidden":`true`}),` Informação organizada`]}),(0,O.jsxs)(`span`,{children:[(0,O.jsx)(r,{size:15,strokeWidth:2.2,"aria-hidden":`true`}),` Localização clara`]}),(0,O.jsxs)(`span`,{children:[(0,O.jsx)(T,{size:15,strokeWidth:2.2,"aria-hidden":`true`}),` Contacto direto`]})]})]}),(0,O.jsxs)(o,{className:`lp-decision-cta`,to:L,state:R,children:[`Publicar grátis `,(0,O.jsx)(w,{size:15,strokeWidth:2.2,"aria-hidden":`true`})]})]})]})]})]})}),Y.length>0&&(0,O.jsx)(`section`,{className:`lp-metrics`,"aria-label":`Resumo da plataforma`,children:(0,O.jsx)(`div`,{className:`lp-shell lp-metrics-grid lp-reveal`,children:Y.map(e=>(0,O.jsxs)(`div`,{className:`lp-metric`,children:[(0,O.jsx)(`strong`,{children:oe(e.value)}),(0,O.jsx)(`span`,{children:e.label})]},e.label))})}),(0,O.jsx)(`section`,{className:`lp-section lp-promo-section`,id:`anunciar`,"aria-label":`Explorar anúncios na Noxvelia`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,O.jsxs)(o,{className:`lp-promo-link lp-reveal`,to:`/carros`,children:[(0,O.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,O.jsx)(`span`,{className:`lp-promo-label`,children:`Carros`}),(0,O.jsx)(`strong`,{className:`lp-promo-title`,children:`Automóveis com dados fáceis de comparar.`}),(0,O.jsx)(`span`,{className:`lp-promo-text`,children:`Marca, modelo, quilómetros, combustível, preço e localização antes do contacto.`}),(0,O.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar carro`})]}),(0,O.jsx)(`span`,{className:`lp-promo-media`,children:(0,O.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`,loading:`lazy`})})]}),(0,O.jsxs)(o,{className:`lp-promo-link lp-reveal`,to:`/imoveis`,children:[(0,O.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,O.jsx)(`span`,{className:`lp-promo-label`,children:`Imóveis`}),(0,O.jsx)(`strong`,{className:`lp-promo-title`,children:`Casas, apartamentos e espaços para visitar melhor informado.`}),(0,O.jsx)(`span`,{className:`lp-promo-text`,children:`Compara fotografias, localização, tipologia, áreas e preço antes de marcar visita.`}),(0,O.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar imóvel`})]}),(0,O.jsx)(`span`,{className:`lp-promo-media`,children:(0,O.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`,loading:`lazy`})})]})]}),(0,O.jsxs)(`div`,{className:`lp-pro-strip`,children:[(0,O.jsx)(`span`,{children:J?`Profissionais`:`Anunciar`}),(0,O.jsx)(`strong`,{children:J?`Stands, mediadores e vendedores com anúncios disponíveis.`:`Publica o teu carro ou imóvel e recebe contactos diretamente.`}),(0,O.jsx)(o,{className:`lp-pro-cta`,to:J?`/profissionais`:L,state:J?void 0:R,children:J?`Ver profissionais`:`Publicar anúncio`})]})]})}),(0,O.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsx)(`div`,{className:`lp-section-head`,children:(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:`Pesquisa por marca, sem voltar ao início.`}),(0,O.jsx)(`p`,{className:`lp-copy`,children:`Explora todas as marcas disponíveis ou usa o campo de marca na pesquisa principal.`})]})}),(0,O.jsxs)(`div`,{className:`lp-brand-carousel`,"aria-label":`Todas as marcas automóveis disponíveis`,children:[(0,O.jsx)(`button`,{type:`button`,className:`lp-brand-arrow`,onClick:()=>q(-1),"aria-label":`Ver marcas anteriores`,children:(0,O.jsx)(`span`,{"aria-hidden":`true`,children:`‹`})}),(0,O.jsx)(`div`,{className:`lp-brand-rail`,ref:p,children:(0,O.jsx)(`div`,{className:`lp-brand-grid`,children:S.map(e=>{let t=I(e);return(0,O.jsxs)(o,{className:`lp-brand-card lp-reveal`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,O.jsxs)(`span`,{className:`lp-brand-mark lp-brand-mark-${t} ${le.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,O.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:ce(e)}),(0,O.jsx)(`img`,{src:se(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,O.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e)})})}),(0,O.jsx)(`button`,{type:`button`,className:`lp-brand-arrow`,onClick:()=>q(1),"aria-label":`Ver mais marcas`,children:(0,O.jsx)(`span`,{"aria-hidden":`true`,children:`›`})})]})]})}),(0,O.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsx)(`div`,{className:`lp-section-head`,children:(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`span`,{className:`lp-eyebrow`,children:`Atalhos`}),(0,O.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Entradas rápidas para pesquisas comuns.`}),(0,O.jsx)(`p`,{className:`lp-copy`,children:`Links diretos para marcas, modelos, distritos, combustíveis e tipologias populares.`})]})}),(0,O.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,O.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,O.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,O.jsx)(`div`,{className:`lp-chip-list`,children:A.map(e=>(0,O.jsx)(o,{className:`lp-chip`,to:X(`carro`,{marca:e}),children:e},e))})]}),(0,O.jsxs)(`div`,{className:`lp-shortcut-group wide lp-reveal`,children:[(0,O.jsx)(`h3`,{children:`Modelos rápidos`}),(0,O.jsx)(`div`,{className:`lp-chip-list`,children:j.map(([e,t])=>(0,O.jsxs)(o,{className:`lp-chip`,to:X(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,O.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,O.jsx)(`h3`,{children:`Combustíveis`}),(0,O.jsx)(`div`,{className:`lp-chip-list`,children:M.map(e=>(0,O.jsx)(o,{className:`lp-chip`,to:X(`carro`,{combustivel:e}),children:e},e))})]}),(0,O.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,O.jsx)(`h3`,{children:`Distritos`}),(0,O.jsx)(`div`,{className:`lp-chip-list`,children:N.map(e=>(0,O.jsx)(o,{className:`lp-chip`,to:X(`carro`,{distrito:e}),children:e},e))})]}),(0,O.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,O.jsx)(`h3`,{children:`Imóveis`}),(0,O.jsxs)(`div`,{className:`lp-chip-list`,children:[P.map(e=>(0,O.jsx)(o,{className:`lp-chip`,to:X(`imovel`,{tipologia:e}),children:e},e)),N.slice(0,4).map(e=>(0,O.jsx)(o,{className:`lp-chip`,to:X(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),he&&(0,O.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsx)(`div`,{className:`lp-section-head`,children:(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`span`,{className:`lp-eyebrow`,children:`Seleção atual`}),(0,O.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`Destaques recentes.`}),(0,O.jsx)(`p`,{className:`lp-copy`,children:`Anúncios de carros e imóveis prontos a explorar.`})]})}),(0,O.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(U||z.carro.length>0)&&(0,O.jsxs)(`div`,{className:`lp-example-column lp-reveal`,children:[(0,O.jsxs)(`div`,{className:`lp-column-top`,children:[(0,O.jsx)(`h3`,{className:`lp-column-title`,children:`Carros`}),(0,O.jsx)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>e(`/carros`),children:`Ver carros`})]}),(0,O.jsx)(`div`,{className:`lp-example-list`,children:z.carro.length>0?z.carro.map(e=>Q(e,`/carros`)):$(`carros`,`/carros`)})]}),(U||z.imovel.length>0)&&(0,O.jsxs)(`div`,{className:`lp-example-column lp-reveal`,children:[(0,O.jsxs)(`div`,{className:`lp-column-top`,children:[(0,O.jsx)(`h3`,{className:`lp-column-title`,children:`Imóveis`}),(0,O.jsx)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>e(`/imoveis`),children:`Ver imóveis`})]}),(0,O.jsx)(`div`,{className:`lp-example-list`,children:z.imovel.length>0?z.imovel.map(e=>Q(e,`/imoveis`)):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,O.jsx)(ne,{placement:`landing_between_highlights`,minHeight:96}),(0,O.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,O.jsx)(`div`,{className:`lp-shell`,children:(0,O.jsxs)(`div`,{className:`lp-cv-card lp-reveal`,children:[(0,O.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,O.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,O.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Verifica o histórico com 20% de desconto.`}),(0,O.jsx)(`p`,{className:`lp-copy`,children:`Antes de visitar ou fechar negócio, consulta dados disponíveis sobre histórico, quilometragem e registos do veículo através da carVertical.`}),(0,O.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,O.jsx)(`li`,{children:`20% de desconto`}),(0,O.jsx)(`li`,{children:`Histórico antes do contacto`}),(0,O.jsx)(`li`,{children:`Mais segurança na compra`})]}),(0,O.jsx)(`a`,{className:`lp-btn lp-btn-primary`,href:k,target:`_blank`,rel:`noopener noreferrer`,children:`Verificar um veículo`})]}),(0,O.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,O.jsx)(`span`,{children:`Histórico automóvel com`}),(0,O.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,O.jsxs)(`div`,{className:`lp-cv-offer`,children:[(0,O.jsx)(`small`,{children:`Oferta Noxvelia`}),(0,O.jsx)(`strong`,{children:`20%`}),(0,O.jsx)(`em`,{children:`de desconto na verificação através do nosso link.`})]})]})]})})}),(0,O.jsx)(u,{})]})}export{L as default};