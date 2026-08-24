const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/aos-zjqaR6Yc.js","assets/rolldown-runtime-QTnfLwEv.js","assets/aos-PTugdkvS.css"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{t as r}from"./arrow-right-BSPo7f1G.js";import{i,n as a,r as o,t as s}from"./shield-check-Bk2MD5MW.js";import{D as c,O as l,S as u,d,f,l as p,m,p as h,t as g,u as _,w as v,x as y,y as b}from"./index-DIni-zfh.js";import{n as ee,t as x}from"./localizacoes-9zKfqZul.js";import{r as S}from"./images-io1S19E8.js";import{a as C,i as te,o as ne}from"./seo-CHiNf1yD.js";import{t as re}from"./Seo-B9NlwpW6.js";import{o as ie,t as ae}from"./marcasModelos-B1QQaHuN.js";import{n as w}from"./funnelAnalytics-DW-H4Zis.js";var oe=m(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),se=m(`newspaper`,[[`path`,{d:`M15 18h-5`,key:`95g1m2`}],[`path`,{d:`M18 14h-8`,key:`sponae`}],[`path`,{d:`M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2`,key:`39pd36`}],[`rect`,{width:`8`,height:`4`,x:`10`,y:`6`,rx:`1`,key:`aywv1n`}]]),T=e(t(),1),E=n();function ce(){let{user:e,signed:t,logout:n}=y(),r=c(),[i,a]=(0,T.useState)(!1),[o,s]=(0,T.useState)(!1),l=(0,T.useRef)(null),u=(0,T.useRef)(null);(0,T.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&a(!1),u.current&&!u.current.contains(e.target)&&s(!1)},t=e=>{e.key===`Escape`&&(a(!1),s(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,T.useEffect)(()=>{a(!1),s(!1)},[r.pathname]);let d=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),f=d?.avatarUrl||d?.avatar,p=d?.nome?.charAt(0).toUpperCase()||`U`,m=d?.nome?.split(` `)[0]||``,h=t?`/publicar`:`/login`,g=t?void 0:b(r,`/`);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
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
      `}),(0,E.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:u,children:[(0,E.jsxs)(`div`,{className:`nl-inner`,children:[(0,E.jsxs)(v,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,E.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,E.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,E.jsxs)(`div`,{className:`nl-links`,children:[(0,E.jsx)(`a`,{href:`#pesquisa`,onClick:e=>{e.preventDefault(),document.getElementById(`pesquisa`)?.scrollIntoView({behavior:`smooth`})},children:`Pesquisar`}),(0,E.jsx)(`a`,{href:`#anunciar`,onClick:e=>{e.preventDefault(),document.getElementById(`anunciar`)?.scrollIntoView({behavior:`smooth`})},children:`Criar anúncio`}),(0,E.jsx)(v,{to:`/profissionais`,children:`Profissionais`}),(0,E.jsx)(v,{to:`/enviar-stock`,children:`Enviar stock`})]}),(0,E.jsxs)(`div`,{className:`nl-actions`,children:[(0,E.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{a(!1),s(e=>!e)},"aria-expanded":o,"aria-controls":`nl-mobile-menu`,"aria-label":o?`Fechar navegação`:`Abrir navegação`,children:o?(0,E.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,E.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,E.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,E.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),!t&&(0,E.jsx)(v,{to:`/login`,state:{from:r.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,E.jsx)(v,{to:h,state:g,className:`nl-btn-solid`,children:`Criar anúncio`}),t?(0,E.jsxs)(`div`,{ref:l,className:`nl-user-wrap`,children:[(0,E.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${i?`active`:``}`,onClick:()=>{s(!1),a(e=>!e)},"aria-expanded":i,"aria-label":`Abrir menu de utilizador`,children:[(0,E.jsx)(`span`,{className:`nl-avatar`,children:f?(0,E.jsx)(`img`,{src:f,alt:``}):(0,E.jsx)(`span`,{className:`nl-avatar-initial`,children:p})}),m&&(0,E.jsx)(`span`,{className:`nl-username`,children:m}),(0,E.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,E.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),i&&(0,E.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,E.jsxs)(v,{to:`/perfil`,onClick:()=>a(!1),className:`nl-ud-item`,children:[(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,E.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,E.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,E.jsx)(`div`,{className:`nl-ud-divider`}),(0,E.jsxs)(`button`,{type:`button`,onClick:()=>{a(!1),n()},className:`nl-ud-item logout`,children:[(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,E.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,E.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,E.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),o&&(0,E.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,E.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,E.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`strong`,{children:`Noxvelia`}),(0,E.jsx)(`span`,{children:`Automóveis e imóveis em Portugal`})]})]}),(0,E.jsx)(`a`,{href:`#pesquisa`,onClick:()=>s(!1),children:`Pesquisar`}),(0,E.jsx)(`a`,{href:`#anunciar`,onClick:()=>s(!1),children:`Criar anúncio`}),(0,E.jsx)(v,{to:`/carros`,onClick:()=>s(!1),children:`Automóveis`}),(0,E.jsx)(v,{to:`/imoveis`,onClick:()=>s(!1),children:`Imóveis`}),(0,E.jsx)(v,{to:`/profissionais`,onClick:()=>s(!1),children:`Profissionais`}),(0,E.jsx)(v,{to:`/enviar-stock`,onClick:()=>s(!1),children:`Enviar stock`}),(0,E.jsx)(v,{className:`nl-mobile-primary`,to:h,state:g,onClick:()=>s(!1),children:`Criar anúncio`}),t?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(v,{to:`/perfil`,onClick:()=>s(!1),children:`O meu perfil`}),(0,E.jsx)(`button`,{type:`button`,onClick:()=>{s(!1),n()},children:`Terminar sessão`})]}):(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(v,{to:`/login`,state:{from:r.pathname},onClick:()=>s(!1),children:`Entrar`}),(0,E.jsx)(v,{to:`/registo`,onClick:()=>s(!1),children:`Registar`})]})]})]})]})}var D=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,le=[{texto:`Zero comissões de venda`},{texto:`Contacto direto via WhatsApp`},{texto:`Milhares de portugueses ativos`}],O=()=>typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,k=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),A=e=>{let t=e?new Date(e):null;return t&&!Number.isNaN(t.getTime())?new Intl.DateTimeFormat(`pt-PT`,{day:`2-digit`,month:`short`}).format(t):``};function j(){let t=l(),n=c(),{signed:m}=y(),j=(0,T.useRef)(!1),M=(0,T.useRef)(null),N=(0,T.useRef)(null),P=(0,T.useRef)(null),ue=m?`/publicar`:`/login`,de=m?void 0:b(n,`/`),[F,I]=(0,T.useState)({carro:[],imovel:[]}),[L,R]=(0,T.useState)(null),[z,B]=(0,T.useState)([]),[V,H]=(0,T.useState)(`carro`),[U,W]=(0,T.useState)(``),[G,K]=(0,T.useState)(``),[q,J]=(0,T.useState)(``),[Y,X]=(0,T.useState)(``),fe=U?ie(U).map(e=>typeof e==`object`?e.modelo||e.nome:e):[],pe=q&&ee[q]||[],me=Number(L?.profissionais||0)>0,Z=()=>(P.current||=g(()=>import(`./modules-e6_-kOkN.js`).then(e=>e.animate),[]),P.current),Q=e=>{if(O())return;let t=e.currentTarget;Z().then(e=>e(t,{scale:[1,1.018,1],duration:320,ease:`outQuad`})).catch(()=>{})};(0,T.useEffect)(()=>{let t=!0;return Promise.all([g(()=>import(`./aos-zjqaR6Yc.js`).then(t=>e(t.default,1)),__vite__mapDeps([0,1])),g(()=>Promise.resolve({}),__vite__mapDeps([2]))]).then(([e])=>{if(!t)return;let n=e.default;n.init({duration:420,easing:`ease-out-cubic`,once:!0,offset:72,disable:O}),N.current=n}).catch(()=>{}),()=>{t=!1}},[]),(0,T.useEffect)(()=>{if(O()||!M.current)return;let e=!0;return Z().then(t=>{e&&M.current&&t(M.current,{opacity:[0,1],y:[10,0],duration:520,ease:`outQuad`})}).catch(()=>{}),()=>{e=!1}},[]),(0,T.useEffect)(()=>{let e=window.requestAnimationFrame(()=>N.current?.refresh());return()=>window.cancelAnimationFrame(e)},[F.carro.length,F.imovel.length,z.length]),(0,T.useEffect)(()=>{let e=()=>{j.current||_()?.external===!0&&(j.current=!0,w(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||_()?.external===!0)&&e()};return window.addEventListener(p,t),()=>window.removeEventListener(p,t)},[]),(0,T.useEffect)(()=>{let e=!0;return u.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&R(t||null)}).catch(()=>{e&&R(null)}),u.get(`/market-news?limit=6`).then(({data:t})=>{e&&B(Array.isArray(t?.items)?t.items:[])}).catch(()=>{e&&B([])}),(async()=>{try{let{data:t}=await u.get(`/anuncios/em-alta/semana`);if(!e)return;I({carro:(t?.carro||[]).slice(0,4),imovel:(t?.imovel||[]).slice(0,4)})}catch{e&&I({carro:[],imovel:[]})}})(),()=>{e=!1}},[]);let he=(e,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}t(te(e))},ge=e=>{e.preventDefault();let n=new URLSearchParams;V===`carro`?(U&&n.set(`marca`,U),G&&n.set(`modelo`,G),t(`/carros?${n.toString()}`)):(q&&q!==`Todos`&&n.set(`distrito`,q),Y&&n.set(`cidade`,Y),t(`/imoveis?${n.toString()}`))},$=(e,t)=>{let n=e.tipo===`carro`,r=S(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,E.jsxs)(`button`,{type:`button`,className:`lp-listing-card`,onClick:()=>he(e,t),children:[(0,E.jsxs)(`span`,{className:`lp-listing-img`,children:[r?(0,E.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo,loading:`lazy`}):(0,E.jsxs)(`span`,{className:`lp-listing-no-photo ${n?`is-carro`:`is-imovel`}`,children:[n?(0,E.jsx)(h,{size:34}):(0,E.jsx)(f,{size:34}),(0,E.jsx)(`em`,{children:`Sem foto`})]}),(0,E.jsx)(`span`,{className:`lp-listing-tag`,children:n?`Automóvel`:`Imóvel`})]}),(0,E.jsxs)(`span`,{className:`lp-listing-body`,children:[(0,E.jsx)(`span`,{className:`lp-listing-price`,children:k(e.preco)}),(0,E.jsx)(`span`,{className:`lp-listing-title`,children:e.titulo}),(0,E.jsx)(`span`,{className:`lp-listing-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,E.jsxs)(`span`,{className:`lp-listing-location`,children:[(0,E.jsx)(o,{size:12,strokeWidth:2.4,"aria-hidden":`true`}),` `,e.localizacao?.cidade||`Portugal`]})]})]},e._id)};return(0,E.jsxs)(`div`,{className:`lp-root`,children:[(0,E.jsx)(re,{title:`Noxvelia | Automóveis e Imóveis em Portugal`,description:`Pesquisa e publica anúncios de carros e casas em Portugal. Contacto direto via WhatsApp sem intermediários e sem comissões.`,path:`/`,jsonLd:[ne,C]}),(0,E.jsx)(ce,{}),(0,E.jsxs)(`main`,{children:[(0,E.jsxs)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-title`,id:`pesquisa`,children:[(0,E.jsx)(`img`,{className:`lp-hero-bg`,src:`/noxvelia-hero-coast.webp`,alt:``,"aria-hidden":`true`}),(0,E.jsxs)(`div`,{className:`lp-shell lp-hero-shell`,children:[(0,E.jsxs)(`div`,{className:`lp-hero-copy`,children:[(0,E.jsx)(`span`,{className:`lp-kicker lp-hero-kicker`,children:`O Mercado Português`}),(0,E.jsxs)(`h1`,{id:`lp-title`,ref:M,children:[`Automóveis e imóveis.`,(0,E.jsx)(`br`,{}),`Direto ao assunto.`]}),(0,E.jsx)(`p`,{children:`Esquece as comissões e os chats complicados. Na Noxvelia, encontras o teu próximo carro ou casa e falas diretamente com quem vende pelo WhatsApp.`}),(0,E.jsx)(`ul`,{className:`lp-trust-row`,children:le.map(e=>(0,E.jsxs)(`li`,{children:[(0,E.jsx)(oe,{size:15,strokeWidth:2.4,"aria-hidden":`true`}),` `,e.texto]},e.texto))})]}),(0,E.jsxs)(`div`,{className:`lp-search-box`,children:[(0,E.jsxs)(`div`,{className:`lp-search-head`,children:[(0,E.jsx)(`span`,{children:`Pesquisa Rápida`}),(0,E.jsx)(`strong`,{children:`O que procuras hoje?`})]}),(0,E.jsxs)(`div`,{className:`lp-tabs`,children:[(0,E.jsxs)(`button`,{type:`button`,className:V===`carro`?`active`:``,"data-vertical":`carro`,onClick:()=>{H(`carro`),J(``),X(``)},children:[(0,E.jsx)(h,{size:16}),` Drive`]}),(0,E.jsxs)(`button`,{type:`button`,className:V===`imovel`?`active`:``,"data-vertical":`imovel`,onClick:()=>{H(`imovel`),W(``),K(``)},children:[(0,E.jsx)(f,{size:16}),` Estate`]})]}),(0,E.jsxs)(`form`,{onSubmit:ge,className:`lp-search-grid`,children:[V===`carro`?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(`label`,{children:[`Marca`,(0,E.jsxs)(`select`,{value:U,onChange:e=>{W(e.target.value),K(``)},children:[(0,E.jsx)(`option`,{value:``,children:`Todas as marcas`}),ae.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`label`,{children:[`Modelo`,(0,E.jsxs)(`select`,{value:G,onChange:e=>K(e.target.value),disabled:!U,children:[(0,E.jsx)(`option`,{value:``,children:U?`Todos os modelos`:`Escolha a marca`}),fe.map((e,t)=>(0,E.jsx)(`option`,{value:e,children:e},t))]})]})]}):(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(`label`,{children:[`Distrito`,(0,E.jsxs)(`select`,{value:q,onChange:e=>{J(e.target.value),X(``)},children:[(0,E.jsx)(`option`,{value:``,children:`Todos os distritos`}),x.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`label`,{children:[`Concelho / Cidade`,(0,E.jsxs)(`select`,{value:Y,onChange:e=>X(e.target.value),disabled:!q,children:[(0,E.jsx)(`option`,{value:``,children:q?`Todos os concelhos`:`Escolha o distrito`}),pe.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]})]}),(0,E.jsxs)(`button`,{type:`submit`,onPointerEnter:Q,children:[(0,E.jsx)(a,{size:16}),` Pesquisar `,V===`carro`?`Automóveis`:`Imóveis`]})]})]})]})]}),F.carro.length>0&&(0,E.jsx)(`section`,{className:`lp-section lp-listing-section`,id:`drive`,"aria-labelledby":`lp-drive`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsx)(`div`,{className:`lp-section-head`,children:(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`span`,{className:`lp-kicker`,children:[(0,E.jsx)(h,{size:14}),` Noxvelia Drive`]}),(0,E.jsx)(`h2`,{id:`lp-drive`,children:`Viaturas em destaque`})]})}),(0,E.jsx)(`div`,{className:`lp-montra-grid`,children:F.carro.map(e=>$(e,`/carros`))}),(0,E.jsx)(`div`,{className:`lp-montra-footer`,children:(0,E.jsxs)(v,{className:`lp-secondary-button`,to:`/carros`,children:[`Explorar todo o stock Automóvel `,(0,E.jsx)(r,{size:16})]})})]})}),F.imovel.length>0&&(0,E.jsx)(`section`,{className:`lp-section lp-listing-section`,style:{borderTop:`none`,paddingTop:0},id:`estate`,"aria-labelledby":`lp-estate`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsx)(`div`,{className:`lp-section-head`,children:(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`span`,{className:`lp-kicker`,children:[(0,E.jsx)(f,{size:14}),` Noxvelia Estate`]}),(0,E.jsx)(`h2`,{id:`lp-estate`,children:`Imóveis em destaque`})]})}),(0,E.jsx)(`div`,{className:`lp-montra-grid`,children:F.imovel.map(e=>$(e,`/imoveis`))}),(0,E.jsx)(`div`,{className:`lp-montra-footer`,children:(0,E.jsxs)(v,{className:`lp-secondary-button`,to:`/imoveis`,children:[`Explorar todo o stock Imobiliário `,(0,E.jsx)(r,{size:16})]})})]})}),z.length>0&&(0,E.jsx)(`section`,{className:`lp-section lp-news-section`,id:`atualidade`,"aria-labelledby":`lp-news`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsx)(`div`,{className:`lp-section-head`,children:(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`span`,{className:`lp-kicker`,children:[(0,E.jsx)(se,{size:13}),` Atualidade`]}),(0,E.jsx)(`h2`,{id:`lp-news`,children:`Mercado em Portugal`}),(0,E.jsx)(`p`,{className:`lp-section-copy`,children:`Fica a par das últimas tendências do mercado automóvel e imobiliário.`})]})}),(0,E.jsx)(`div`,{className:`lp-news-grid`,children:z.map(e=>{let t=A(e.publishedAt);return(0,E.jsxs)(`a`,{className:`lp-news-card`,href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:[(0,E.jsx)(`span`,{className:`lp-news-pill ${e.vertical===`automoveis`?`cars`:`homes`}`,children:e.verticalLabel||`Mercado`}),(0,E.jsx)(`h3`,{children:e.title}),e.summary&&(0,E.jsx)(`p`,{children:e.summary}),(0,E.jsxs)(`span`,{className:`lp-news-meta`,children:[e.source,t?` · ${t}`:``]})]},e.id||e.url)})})]})}),(0,E.jsx)(`section`,{className:`lp-section lp-sell-section`,id:`anunciar`,"aria-labelledby":`lp-sell`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell lp-sell-box`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`lp-kicker`,children:`Para Particulares e Profissionais`}),(0,E.jsx)(`h2`,{id:`lp-sell`,children:`Pronto para vender?`}),(0,E.jsx)(`p`,{children:`Cria a tua montra gratuitamente. Os clientes entram em contacto direto para o teu número, sem formulários escondidos nem comissões.`})]}),(0,E.jsxs)(`div`,{className:`lp-sell-actions`,children:[(0,E.jsxs)(v,{className:`lp-main-cta`,to:ue,state:de,onPointerEnter:Q,children:[`Publicar Anúncio Grátis `,(0,E.jsx)(r,{size:16})]}),me&&(0,E.jsxs)(v,{className:`lp-soft-cta`,to:`/profissionais`,children:[(0,E.jsx)(i,{size:16}),` Ver Stands e Agências`]})]})]})}),(0,E.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell lp-cv-card`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`span`,{className:`lp-kicker`,children:[(0,E.jsx)(s,{size:12}),` Segurança Automóvel`]}),(0,E.jsx)(`h2`,{id:`lp-cv`,children:`Verifica o carro antes de comprar`}),(0,E.jsx)(`p`,{children:`Evita fraudes e quilómetros adulterados. Descobre o histórico de acidentes, manutenções e roubos de qualquer veículo através da matrícula ou VIN.`}),(0,E.jsxs)(`a`,{className:`lp-main-cta`,href:D,target:`_blank`,rel:`noopener noreferrer`,onPointerEnter:Q,children:[`Consultar Histórico `,(0,E.jsx)(r,{size:16})]})]}),(0,E.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,E.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`}),(0,E.jsx)(`strong`,{children:`20%`}),(0,E.jsx)(`span`,{children:`Desconto automático no relatório via Noxvelia.`})]})]})})]}),(0,E.jsx)(d,{})]})}export{j as default};