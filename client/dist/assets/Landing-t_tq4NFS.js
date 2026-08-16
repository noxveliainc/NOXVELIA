const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LandingListingsCarousel-DGyLniDo.js","assets/rolldown-runtime-QTnfLwEv.js","assets/jsx-runtime-BX1tsrJU.js","assets/LandingListingsCarousel-BdCbVP5L.css","assets/aos-zjqaR6Yc.js","assets/aos-PTugdkvS.css"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{n as r,t as i}from"./shield-check-B0t21OGg.js";import{n as a,r as o,t as s}from"./search-CTEBASrC.js";import{D as c,O as l,S as u,d,f,l as p,m,p as h,t as g,u as _,w as v,x as y,y as b}from"./index-BoKioywp.js";import{t as ee}from"./localizacoes-9zKfqZul.js";import{r as te}from"./images-io1S19E8.js";import{a as x,i as S,o as ne}from"./seo-CHiNf1yD.js";import{t as re}from"./Seo-BPbrN028.js";import{l as C,n as w,s as ie,t as T}from"./marcasModelos-B1QQaHuN.js";import{t as E}from"./AdBanner-DvjcfQwQ.js";import{n as D}from"./funnelAnalytics-DC0RFSWq.js";var O=m(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),k=m(`newspaper`,[[`path`,{d:`M15 18h-5`,key:`95g1m2`}],[`path`,{d:`M18 14h-8`,key:`sponae`}],[`path`,{d:`M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2`,key:`39pd36`}],[`rect`,{width:`8`,height:`4`,x:`10`,y:`6`,rx:`1`,key:`aywv1n`}]]),A=e(t(),1),j=n();function ae(){let{user:e,signed:t,logout:n}=y(),r=c(),[i,a]=(0,A.useState)(!1),[o,s]=(0,A.useState)(!1),l=(0,A.useRef)(null),u=(0,A.useRef)(null);(0,A.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&a(!1),u.current&&!u.current.contains(e.target)&&s(!1)},t=e=>{e.key===`Escape`&&(a(!1),s(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,A.useEffect)(()=>{a(!1),s(!1)},[r.pathname]);let d=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),f=d?.avatarUrl||d?.avatar,p=d?.nome?.charAt(0).toUpperCase()||`U`,m=d?.nome?.split(` `)[0]||``,h=t?`/publicar`:`/login`,g=t?void 0:b(r,`/`);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`style`,{children:`
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

        /* FIX: fundo 100% opaco (sem alfa) + camada de composição própria,
           para evitar o bug de transparência causado pelo backdrop-filter
           do .nl-root em Safari/Chrome mobile, onde o fundo do dropdown
           deixava "sangrar" o conteúdo por trás (hero da Landing). */
        .nl-mobile-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 16px;
          right: 16px;
          z-index: 60;
          display: none;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          padding: 12px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background-color: #fffaf0;
          -webkit-backdrop-filter: none;
          backdrop-filter: none;
          isolation: isolate;
          transform: translateZ(0);
          will-change: transform;
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



        .nl-mobile-menu a,
        .nl-mobile-menu button {
          display: flex;
          align-items: center;
          min-height: 42px;
          width: 100%;
          padding: 0 12px;
          color: #355158 !important;
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
          color: #ffffff !important;
          background: #071326;
        }

        .nl-mobile-menu a:hover,
        .nl-mobile-menu button:hover {
          color: #071326 !important;
          background: #edf6f3;
        }

        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #ffffff;
          background: #102f50;
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
          color: #102f50;
          border: 1px solid #102f50;
          background: transparent;
          box-shadow: none;
        }

        .nl-btn-solid:hover {
          transform: translateY(-1px);
          color: #071326;
          border-color: #071326;
          background: rgba(255, 255, 255, 0.72);
          box-shadow: none;
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

                .nl-btn-solid {
          color: #102f50 !important;
          border-color: #102f50 !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        .nl-btn-solid:hover {
          color: #071326 !important;
          border-color: #071326 !important;
          background: rgba(255, 255, 255, 0.72) !important;
        }

        .nl-mobile-menu a.nl-mobile-primary {
          color: #ffffff !important;
          border-color: #071326 !important;
          background: #071326 !important;
        }

        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #ffffff !important;
          background: #102f50 !important;
          border-color: #102f50 !important;
        }


        /* Noxvelia navy shell - referencia premium com CTA dourado */
        .nl-root {
          background: #102f50 !important;
          border-bottom: 1px solid rgba(217, 196, 156, .42) !important;
          box-shadow: 0 16px 34px -30px rgba(7, 19, 38, .9) !important;
        }

        .nl-brand,
        .nl-wordmark,
        .nl-links a,
        .nl-btn-ghost,
        .nl-user-trigger {
          color: #fffaf0 !important;
        }

        .nl-links a:hover {
          color: #f0dfbb !important;
        }

        .nl-links a::after {
          background: #d9c49c !important;
        }

        .nl-btn-ghost {
          border-color: rgba(255, 250, 240, .24) !important;
          background: rgba(255, 250, 240, .05) !important;
        }

        .nl-btn-ghost:hover {
          color: #071326 !important;
          border-color: #fffaf0 !important;
          background: #fffaf0 !important;
        }

        .nl-btn-solid {
          color: #071326 !important;
          border-color: #d9c49c !important;
          background: #d9c49c !important;
          box-shadow: 0 12px 24px -18px rgba(217, 196, 156, .8) !important;
        }

        .nl-btn-solid::before {
          content: '+';
          margin-right: 7px;
          font-weight: 900;
        }

        .nl-btn-solid:hover {
          color: #071326 !important;
          border-color: #f0dfbb !important;
          background: #f0dfbb !important;
        }

        .nl-menu-toggle {
          color: #fffaf0 !important;
          border-color: rgba(255, 250, 240, .22) !important;
          background: rgba(255, 250, 240, .06) !important;
        }

        .nl-user-trigger:hover,
        .nl-user-trigger.active {
          border-color: rgba(217, 196, 156, .72) !important;
          background: rgba(255, 250, 240, .08) !important;
        }

        .nl-avatar {
          color: #102f50 !important;
          border-color: rgba(217, 196, 156, .82) !important;
          background: #fffaf0 !important;
        }

        .nl-chevron { stroke: #f0dfbb !important; }

        .nl-user-dropdown {
          background: #fffaf0 !important;
          border-color: rgba(217, 196, 156, .38) !important;
        }

        .nl-ud-item {
          color: #102f50 !important;
        }

        .nl-ud-item:hover {
          color: #071326 !important;
          background: rgba(16, 47, 80, .08) !important;
        }

        .nl-ud-divider {
          background: rgba(16, 47, 80, .12) !important;
        }

        .nl-ud-item.logout:hover {
          color: #b42318 !important;
          background: #fff3f1 !important;
        }
      `}),(0,j.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:u,children:[(0,j.jsxs)(`div`,{className:`nl-inner`,children:[(0,j.jsxs)(v,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,j.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,j.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,j.jsxs)(`div`,{className:`nl-links`,children:[(0,j.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,j.jsx)(`a`,{href:`#anunciar`,children:`Criar anúncio`}),(0,j.jsx)(v,{to:`/profissionais`,children:`Profissionais`}),(0,j.jsx)(v,{to:`/enviar-stock`,children:`Enviar stock`}),(0,j.jsx)(v,{to:`/patrocinios`,children:`Patrocinar`})]}),(0,j.jsxs)(`div`,{className:`nl-actions`,children:[(0,j.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{a(!1),s(e=>!e)},"aria-expanded":o,"aria-controls":`nl-mobile-menu`,"aria-label":o?`Fechar navegação`:`Abrir navegação`,children:o?(0,j.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,j.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,j.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,j.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,j.jsx)(v,{to:`/patrocinios`,className:`nl-btn-ghost nl-btn-sponsor`,children:`Patrocinar`}),!t&&(0,j.jsx)(v,{to:`/login`,state:{from:r.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,j.jsx)(v,{to:h,state:g,className:`nl-btn-solid`,children:`Criar anúncio`}),t?(0,j.jsxs)(`div`,{ref:l,className:`nl-user-wrap`,children:[(0,j.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${i?`active`:``}`,onClick:()=>{s(!1),a(e=>!e)},"aria-expanded":i,"aria-label":`Abrir menu de utilizador`,children:[(0,j.jsx)(`span`,{className:`nl-avatar`,children:f?(0,j.jsx)(`img`,{src:f,alt:``}):(0,j.jsx)(`span`,{className:`nl-avatar-initial`,children:p})}),m&&(0,j.jsx)(`span`,{className:`nl-username`,children:m}),(0,j.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,j.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),i&&(0,j.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,j.jsxs)(v,{to:`/perfil`,onClick:()=>a(!1),className:`nl-ud-item`,children:[(0,j.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,j.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,j.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,j.jsx)(`div`,{className:`nl-ud-divider`}),(0,j.jsxs)(`button`,{type:`button`,onClick:()=>{a(!1),n()},className:`nl-ud-item logout`,children:[(0,j.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,j.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,j.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,j.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),o&&(0,j.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,j.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,j.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`strong`,{children:`Noxvelia`}),(0,j.jsx)(`span`,{children:`Automóveis e imóveis em Portugal`})]})]}),(0,j.jsx)(`a`,{href:`#pesquisa`,onClick:()=>s(!1),children:`Pesquisar`}),(0,j.jsx)(`a`,{href:`#anunciar`,onClick:()=>s(!1),children:`Criar anúncio`}),(0,j.jsx)(v,{to:`/carros`,onClick:()=>s(!1),children:`Automóveis`}),(0,j.jsx)(v,{to:`/imoveis`,onClick:()=>s(!1),children:`Imóveis`}),(0,j.jsx)(v,{to:`/profissionais`,onClick:()=>s(!1),children:`Profissionais`}),(0,j.jsx)(v,{to:`/enviar-stock`,onClick:()=>s(!1),children:`Enviar stock`}),(0,j.jsx)(v,{to:`/patrocinios`,onClick:()=>s(!1),children:`Torne-se patrocinador`}),(0,j.jsx)(v,{className:`nl-mobile-primary`,to:h,state:g,onClick:()=>s(!1),children:`Criar anúncio`}),t?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(v,{to:`/perfil`,onClick:()=>s(!1),children:`O meu perfil`}),(0,j.jsx)(`button`,{type:`button`,onClick:()=>{s(!1),n()},children:`Terminar sessão`})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(v,{to:`/login`,state:{from:r.pathname},onClick:()=>s(!1),children:`Entrar`}),(0,j.jsx)(v,{to:`/registo`,onClick:()=>s(!1),children:`Registar`})]})]})]})]})}var oe=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,se=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],ce=[`T1`,`T2`,`T3`,`T4`,`T5+`],le=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 30.000 €`,value:`30000`}],ue=[{label:`Até 150.000 €`,value:`150000`},{label:`Até 250.000 €`,value:`250000`},{label:`Até 400.000 €`,value:`400000`}],M=[`Renault`,`Peugeot`,`Volkswagen`,`Mercedes-Benz`,`Toyota`,`Opel`,`Fiat`,`BMW`,`Audi`,`Citroën`,`Seat`,`Ford`,`Nissan`,`Hyundai`,`Kia`,`Dacia`,`Skoda`,`Volvo`],de=[...M.filter(e=>T.includes(e)),...T.filter(e=>!M.includes(e)),w],fe=[{texto:`Publicação gratuita`},{texto:`Contacto direto, sem intermediários`},{texto:`Todos os distritos de Portugal`}],pe=(0,A.lazy)(()=>g(()=>import(`./LandingListingsCarousel-DGyLniDo.js`),__vite__mapDeps([0,1,2,3]))),N=()=>typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,P=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),F=e=>{let t=e?new Date(e):null;return t&&!Number.isNaN(t.getTime())?new Intl.DateTimeFormat(`pt-PT`,{day:`2-digit`,month:`short`}).format(t):``};function I(){let t=l(),n=c(),{signed:m}=y(),T=(0,A.useRef)(!1),M=(0,A.useRef)(null),I=(0,A.useRef)(null),L=(0,A.useRef)(null),R=m?`/publicar`:`/login`,z=m?void 0:b(n,`/`),[B,V]=(0,A.useState)({carro:[],imovel:[]}),[me,H]=(0,A.useState)(null),[U,he]=(0,A.useState)(!0),[ge,W]=(0,A.useState)(!1),[G,K]=(0,A.useState)([]),[q,_e]=(0,A.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``}),ve=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},ye=q.tipo===`carro`&&q.marca?q.marca===`__outro__`?[w]:ie(q.marca):[],be=Number(me?.profissionais||0)>0,J=(e,t)=>{_e(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``,precoMax:``}:(e===`marca`&&(r.modelo=``),r)})},xe=e=>{e.preventDefault();let{tipo:n,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=q,l={distrito:s,precoMax:c,...n===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};D(`search_start`,{vertical:n}),t(ve(n,l))},Y=()=>(L.current||=g(()=>import(`./modules-e6_-kOkN.js`).then(e=>e.animate),[]),L.current),X=e=>{if(N())return;let t=e.currentTarget;Y().then(e=>e(t,{scale:[1,1.018,1],duration:320,ease:`outQuad`})).catch(()=>{})};(0,A.useEffect)(()=>{let t=!0;return Promise.all([g(()=>import(`./aos-zjqaR6Yc.js`).then(t=>e(t.default,1)),__vite__mapDeps([4,1])),g(()=>Promise.resolve({}),__vite__mapDeps([5]))]).then(([e])=>{if(!t)return;let n=e.default;n.init({duration:420,easing:`ease-out-cubic`,once:!0,offset:72,disable:N}),I.current=n}).catch(()=>{}),()=>{t=!1}},[]),(0,A.useEffect)(()=>{if(N()||!M.current)return;let e=!0;return Y().then(t=>{e&&M.current&&t(M.current,{opacity:[0,1],y:[10,0],duration:520,ease:`outQuad`})}).catch(()=>{}),()=>{e=!1}},[]),(0,A.useEffect)(()=>{let e=window.requestAnimationFrame(()=>I.current?.refresh());return()=>window.cancelAnimationFrame(e)},[U,G.length]),(0,A.useEffect)(()=>{let e=()=>{T.current||_()?.external===!0&&(T.current=!0,D(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||_()?.external===!0)&&e()};return window.addEventListener(p,t),()=>window.removeEventListener(p,t)},[]),(0,A.useEffect)(()=>{let e=!0;return u.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&H(t||null)}).catch(()=>{e&&H(null)}),()=>{e=!1}},[]),(0,A.useEffect)(()=>{let e=!0;return u.get(`/market-news?limit=6`).then(({data:t})=>{e&&K(Array.isArray(t?.items)?t.items:[])}).catch(()=>{e&&K([])}),()=>{e=!1}},[]),(0,A.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await u.get(`/anuncios/em-alta/semana`);if(!e)return;V({carro:(t?.carro||[]).slice(0,6),imovel:(t?.imovel||[]).slice(0,6)}),W(!1)}catch{e&&(V({carro:[],imovel:[]}),W(!0))}finally{e&&he(!1)}})(),()=>{e=!1}},[]);let Se=(e,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}t(S(e))},Z=(e,t)=>{let n=e.tipo===`carro`,r=te(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,j.jsxs)(`button`,{type:`button`,className:`lp-listing-card`,onClick:()=>Se(e,t),children:[(0,j.jsxs)(`span`,{className:`lp-listing-img`,children:[r?(0,j.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,j.jsxs)(`span`,{className:`lp-listing-no-photo ${n?`is-carro`:`is-imovel`}`,children:[n?(0,j.jsx)(h,{size:34}):(0,j.jsx)(f,{size:34}),(0,j.jsx)(`em`,{children:n?`Automóvel sem foto`:`Imóvel sem foto`})]}),(0,j.jsx)(`span`,{className:`lp-listing-tag`,children:n?`Automóvel`:`Imóvel`})]}),(0,j.jsxs)(`span`,{className:`lp-listing-body`,children:[(0,j.jsx)(`span`,{className:`lp-listing-price`,children:P(e.preco)}),(0,j.jsx)(`span`,{className:`lp-listing-title`,children:e.titulo}),(0,j.jsx)(`span`,{className:`lp-listing-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,j.jsxs)(`span`,{className:`lp-listing-location`,children:[(0,j.jsx)(a,{size:12,strokeWidth:2.4,"aria-hidden":`true`}),` `,e.localizacao?.cidade||`Portugal`]})]})]},e._id)},Q=(e,t)=>(0,j.jsx)(A.Suspense,{fallback:(0,j.jsx)(`div`,{className:`lp-listing-fallback`,children:e.slice(0,2).map(e=>Z(e,t))}),children:(0,j.jsx)(pe,{items:e,renderItem:e=>Z(e,t)})}),$=(e,n)=>(0,j.jsxs)(`div`,{className:`lp-listing-state`,role:`status`,children:[(0,j.jsx)(`strong`,{children:U?`A carregar seleção.`:ge?`A seleção está a ser atualizada.`:`Ver anúncios de ${e}.`}),(0,j.jsx)(`span`,{children:U?`A lista completa está disponível.`:`Usa os filtros para encontrar resultados.`}),!U&&(0,j.jsxs)(`button`,{type:`button`,className:`lp-secondary-button`,onClick:()=>t(n),children:[`Abrir `,e]})]}),Ce=U||B.carro.length>0||B.imovel.length>0;return(0,j.jsxs)(`div`,{className:`lp-root`,children:[(0,j.jsx)(re,{title:`Noxvelia | Plataforma de automóveis e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de automóveis e imóveis.`,path:`/`,jsonLd:[ne,x]}),(0,j.jsx)(ae,{}),(0,j.jsxs)(`main`,{children:[(0,j.jsxs)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-title`,children:[(0,j.jsx)(`img`,{className:`lp-hero-bg`,src:`/noxvelia-hero-coast.webp`,alt:``,"aria-hidden":`true`}),(0,j.jsxs)(`div`,{className:`lp-shell lp-hero-shell`,children:[(0,j.jsxs)(`div`,{className:`lp-hero-copy`,children:[(0,j.jsx)(`span`,{className:`lp-kicker lp-hero-kicker`,children:`Pesquisa em Portugal`}),(0,j.jsx)(`h1`,{id:`lp-title`,ref:M,children:`Automóveis e imóveis, sem intermediários.`}),(0,j.jsx)(`p`,{children:`Filtra por localização, preço e características e fala diretamente com quem anuncia, sem comissões pelo caminho.`}),(0,j.jsx)(`div`,{className:`lp-hero-actions`,"aria-label":`Ações principais`,children:(0,j.jsx)(v,{className:`lp-main-cta`,to:R,state:z,children:`Criar anúncio`})}),(0,j.jsx)(`ul`,{className:`lp-trust-row`,children:fe.map(e=>(0,j.jsxs)(`li`,{children:[(0,j.jsx)(O,{size:15,strokeWidth:2.4,"aria-hidden":`true`}),` `,e.texto]},e.texto))})]}),(0,j.jsxs)(`form`,{className:`lp-search-box`,id:`pesquisa`,onSubmit:xe,"aria-label":`Pesquisar anúncios`,children:[(0,j.jsxs)(`div`,{className:`lp-search-head`,children:[(0,j.jsx)(`span`,{children:`Começa por aqui`}),(0,j.jsx)(`strong`,{children:`Pesquisa direta`}),(0,j.jsx)(`p`,{children:`Filtra por tipo, localização e preço. Podes afinar mais depois.`})]}),(0,j.jsxs)(`div`,{className:`lp-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,j.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":q.tipo===`carro`,"data-vertical":`carro`,className:q.tipo===`carro`?`active`:``,onClick:()=>J(`tipo`,`carro`),children:[(0,j.jsx)(h,{size:16}),` Automóveis`]}),(0,j.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":q.tipo===`imovel`,"data-vertical":`imovel`,className:q.tipo===`imovel`?`active`:``,onClick:()=>J(`tipo`,`imovel`),children:[(0,j.jsx)(f,{size:16}),` Imóveis`]})]}),(0,j.jsxs)(`div`,{className:`lp-search-grid`,children:[q.tipo===`carro`?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(`label`,{children:[`Marca`,(0,j.jsxs)(`select`,{value:q.marca,onChange:e=>J(`marca`,e.target.value),children:[(0,j.jsx)(`option`,{value:``,children:`Todas as marcas`}),de.map(e=>(0,j.jsx)(`option`,{value:e,children:C(e,`marca`)},e))]})]}),(0,j.jsxs)(`label`,{children:[`Modelo`,(0,j.jsxs)(`select`,{value:q.modelo,onChange:e=>J(`modelo`,e.target.value),disabled:!q.marca,children:[(0,j.jsx)(`option`,{value:``,children:q.marca?`Todos os modelos`:`Escolhe a marca`}),ye.map(e=>(0,j.jsx)(`option`,{value:e,children:C(e,`modelo`)},e))]})]}),(0,j.jsxs)(`label`,{children:[`Combustível`,(0,j.jsxs)(`select`,{value:q.combustivel,onChange:e=>J(`combustivel`,e.target.value),children:[(0,j.jsx)(`option`,{value:``,children:`Todos`}),se.map(e=>(0,j.jsx)(`option`,{value:e,children:e},e))]})]}),(0,j.jsxs)(`label`,{children:[`Preço máximo`,(0,j.jsxs)(`select`,{value:q.precoMax,onChange:e=>J(`precoMax`,e.target.value),children:[(0,j.jsx)(`option`,{value:``,children:`Qualquer preço`}),le.map(e=>(0,j.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(`label`,{children:[`Tipologia`,(0,j.jsxs)(`select`,{value:q.tipologia,onChange:e=>J(`tipologia`,e.target.value),children:[(0,j.jsx)(`option`,{value:``,children:`Todas`}),ce.map(e=>(0,j.jsx)(`option`,{value:e,children:e},e))]})]}),(0,j.jsxs)(`label`,{children:[`Preço máximo`,(0,j.jsxs)(`select`,{value:q.precoMax,onChange:e=>J(`precoMax`,e.target.value),children:[(0,j.jsx)(`option`,{value:``,children:`Qualquer preço`}),ue.map(e=>(0,j.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,j.jsxs)(`label`,{children:[`Distrito`,(0,j.jsxs)(`select`,{value:q.distrito,onChange:e=>J(`distrito`,e.target.value),children:[(0,j.jsx)(`option`,{value:``,children:`Portugal inteiro`}),ee.map(e=>(0,j.jsx)(`option`,{value:e,children:e},e))]})]}),(0,j.jsxs)(`button`,{type:`submit`,children:[(0,j.jsx)(s,{size:17}),` Ver anúncios`]})]})]})]})]}),(0,j.jsx)(`section`,{className:`lp-section lp-category-section`,"aria-labelledby":`lp-categories`,"data-aos":`fade-up`,children:(0,j.jsxs)(`div`,{className:`lp-shell`,children:[(0,j.jsx)(`div`,{className:`lp-section-head`,children:(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisar`}),(0,j.jsx)(`h2`,{id:`lp-categories`,children:`Escolhe a categoria`})]})}),(0,j.jsxs)(`div`,{className:`lp-category-grid`,children:[(0,j.jsxs)(v,{className:`lp-category-card lp-category-card-auto`,to:`/carros`,children:[(0,j.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`}),(0,j.jsxs)(`span`,{children:[(0,j.jsx)(`small`,{children:`Automóveis`}),(0,j.jsx)(`strong`,{children:`Ver automóveis`}),(0,j.jsx)(`em`,{children:`Marca, modelo, km, combustível e preço.`})]})]}),(0,j.jsxs)(v,{className:`lp-category-card lp-category-card-estate`,to:`/imoveis`,children:[(0,j.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`}),(0,j.jsxs)(`span`,{children:[(0,j.jsx)(`small`,{children:`Imóveis`}),(0,j.jsx)(`strong`,{children:`Ver imóveis`}),(0,j.jsx)(`em`,{children:`Tipologia, localização, área e valor.`})]})]})]})]})}),G.length>0&&(0,j.jsx)(`section`,{className:`lp-section lp-news-section`,id:`atualidade`,"aria-labelledby":`lp-news`,"data-aos":`fade-up`,children:(0,j.jsxs)(`div`,{className:`lp-shell`,children:[(0,j.jsx)(`div`,{className:`lp-section-head`,children:(0,j.jsxs)(`div`,{children:[(0,j.jsxs)(`span`,{className:`lp-kicker`,children:[(0,j.jsx)(k,{size:13}),` Atualidade`]}),(0,j.jsx)(`h2`,{id:`lp-news`,children:`Mercado em Portugal`}),(0,j.jsx)(`p`,{className:`lp-section-copy`,children:`Notícias recentes sobre automóveis, habitação e crédito.`})]})}),(0,j.jsx)(`div`,{className:`lp-news-grid`,children:G.map(e=>{let t=F(e.publishedAt);return(0,j.jsxs)(`a`,{className:`lp-news-card`,href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:[(0,j.jsx)(`span`,{className:`lp-news-pill ${e.vertical===`automoveis`?`cars`:`homes`}`,children:e.verticalLabel||`Mercado`}),(0,j.jsx)(`h3`,{children:e.title}),e.summary&&(0,j.jsx)(`p`,{children:e.summary}),(0,j.jsxs)(`span`,{className:`lp-news-meta`,children:[e.source,t?` · ${t}`:``]})]},e.id||e.url)})})]})}),Ce&&(0,j.jsx)(`section`,{className:`lp-section lp-listing-section`,id:`destaques`,"aria-labelledby":`lp-featured`,"data-aos":`fade-up`,children:(0,j.jsxs)(`div`,{className:`lp-shell`,children:[(0,j.jsx)(`div`,{className:`lp-section-head`,children:(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`lp-kicker`,children:`Anúncios`}),(0,j.jsx)(`h2`,{id:`lp-featured`,children:`Recentes na Noxvelia`})]})}),(0,j.jsxs)(`div`,{className:`lp-listing-columns`,children:[(U||B.carro.length>0)&&(0,j.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,j.jsxs)(`div`,{className:`lp-column-top`,children:[(0,j.jsxs)(`h3`,{children:[(0,j.jsx)(h,{size:16}),` Automóveis`]}),(0,j.jsx)(`button`,{type:`button`,onClick:()=>t(`/carros`),children:`Ver automóveis`})]}),(0,j.jsx)(`div`,{className:`lp-listing-list`,children:B.carro.length>0?Q(B.carro,`/carros`):$(`automóveis`,`/carros`)})]}),(U||B.imovel.length>0)&&(0,j.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,j.jsxs)(`div`,{className:`lp-column-top`,children:[(0,j.jsxs)(`h3`,{children:[(0,j.jsx)(f,{size:16}),` Imóveis`]}),(0,j.jsx)(`button`,{type:`button`,onClick:()=>t(`/imoveis`),children:`Ver imóveis`})]}),(0,j.jsx)(`div`,{className:`lp-listing-list`,children:B.imovel.length>0?Q(B.imovel,`/imoveis`):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,j.jsx)(`section`,{className:`lp-section lp-sell-section`,id:`anunciar`,"aria-labelledby":`lp-sell`,"data-aos":`fade-up`,children:(0,j.jsxs)(`div`,{className:`lp-shell lp-sell-box`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`lp-kicker`,children:`Anunciar`}),(0,j.jsx)(`h2`,{id:`lp-sell`,children:`Tens algo para vender?`}),(0,j.jsx)(`p`,{children:`Publica grátis e recebe contactos diretamente no teu anúncio.`})]}),(0,j.jsxs)(`div`,{className:`lp-sell-actions`,children:[(0,j.jsxs)(v,{className:`lp-main-cta`,to:R,state:z,onPointerEnter:X,children:[`Criar anúncio `,(0,j.jsx)(r,{size:16})]}),be&&(0,j.jsxs)(v,{className:`lp-soft-cta`,to:`/profissionais`,children:[(0,j.jsx)(o,{size:16}),` Ver profissionais`]})]})]})}),(0,j.jsx)(E,{mode:`direct`,placement:`landing_between_highlights`,minHeight:176,mobileMinHeight:150}),(0,j.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv`,"data-aos":`fade-up`,children:(0,j.jsxs)(`div`,{className:`lp-shell lp-cv-card`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsxs)(`span`,{className:`lp-kicker`,children:[(0,j.jsx)(i,{size:12}),` Histórico automóvel`]}),(0,j.jsx)(`h2`,{id:`lp-cv`,children:`20% de desconto na carVertical`}),(0,j.jsx)(`p`,{children:`Consulta dados disponíveis sobre histórico, quilometragem e registos do veículo antes de fechar negócio.`}),(0,j.jsxs)(`a`,{className:`lp-main-cta`,href:oe,target:`_blank`,rel:`noopener noreferrer`,onPointerEnter:X,children:[`Verificar veículo `,(0,j.jsx)(r,{size:16})]})]}),(0,j.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,j.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`}),(0,j.jsx)(`strong`,{children:`20%`}),(0,j.jsx)(`span`,{children:`de desconto através do link Noxvelia.`})]})]})})]}),(0,j.jsx)(d,{})]})}export{I as default};