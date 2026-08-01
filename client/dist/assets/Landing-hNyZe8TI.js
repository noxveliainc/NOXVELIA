const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LandingListingsCarousel-DGyLniDo.js","assets/rolldown-runtime-QTnfLwEv.js","assets/jsx-runtime-BX1tsrJU.js","assets/LandingListingsCarousel-BdCbVP5L.css","assets/aos-zjqaR6Yc.js","assets/aos-PTugdkvS.css"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{n as r,t as i}from"./shield-check-DC66pXeO.js";import{n as a,r as o,t as s}from"./search-BbI7NzMC.js";import{C as c,O as l,S as u,T as d,b as f,d as p,f as m,h,k as g,l as _,m as v,p as y,t as b,u as x}from"./index-DYqNjN_M.js";import{t as ee}from"./localizacoes-9zKfqZul.js";import{r as te}from"./images-io1S19E8.js";import{a as ne,i as re,o as ie}from"./seo-CHiNf1yD.js";import{t as S}from"./Seo-B6kZdmnH.js";import{t as ae}from"./AdBanner-CmlOS414.js";import{n as oe,t as C}from"./marcasModelos-CRXT0e16.js";import{n as w}from"./funnelAnalytics-Ceow2l3m.js";var se=v(`newspaper`,[[`path`,{d:`M15 18h-5`,key:`95g1m2`}],[`path`,{d:`M18 14h-8`,key:`sponae`}],[`path`,{d:`M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2`,key:`39pd36`}],[`rect`,{width:`8`,height:`4`,x:`10`,y:`6`,rx:`1`,key:`aywv1n`}]]),ce=v(`trending-up`,[[`path`,{d:`M16 7h6v6`,key:`box55l`}],[`path`,{d:`m22 7-8.5 8.5-5-5L2 17`,key:`1t1m79`}]]),T=e(t(),1),E=n();function le(){let{user:e,signed:t,logout:n}=u(),r=l(),[i,a]=(0,T.useState)(!1),[o,s]=(0,T.useState)(!1),c=(0,T.useRef)(null),p=(0,T.useRef)(null);(0,T.useEffect)(()=>{let e=e=>{c.current&&!c.current.contains(e.target)&&a(!1),p.current&&!p.current.contains(e.target)&&s(!1)},t=e=>{e.key===`Escape`&&(a(!1),s(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,T.useEffect)(()=>{a(!1),s(!1)},[r.pathname]);let m=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=m?.avatarUrl||m?.avatar,_=m?.nome?.charAt(0).toUpperCase()||`U`,v=m?.nome?.split(` `)[0]||``,y=t?`/publicar`:`/login`,b=t?void 0:f(r,`/`);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
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
      `}),(0,E.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:p,children:[(0,E.jsxs)(`div`,{className:`nl-inner`,children:[(0,E.jsxs)(d,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,E.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,E.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,E.jsxs)(`div`,{className:`nl-links`,children:[(0,E.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,E.jsx)(`a`,{href:`#anunciar`,children:`Criar anúncio`}),(0,E.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,E.jsx)(d,{to:`/profissionais`,children:`Profissionais`}),(0,E.jsx)(d,{to:`/enviar-stock`,children:`Enviar stock`}),(0,E.jsx)(d,{to:`/patrocinios`,children:`Patrocinar`})]}),(0,E.jsxs)(`div`,{className:`nl-actions`,children:[(0,E.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{a(!1),s(e=>!e)},"aria-expanded":o,"aria-controls":`nl-mobile-menu`,"aria-label":o?`Fechar navegação`:`Abrir navegação`,children:o?(0,E.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,E.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,E.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,E.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,E.jsx)(h,{}),(0,E.jsx)(d,{to:`/patrocinios`,className:`nl-btn-ghost nl-btn-sponsor`,children:`Patrocinar`}),!t&&(0,E.jsx)(d,{to:`/login`,state:{from:r.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,E.jsx)(d,{to:y,state:b,className:`nl-btn-solid`,children:`Criar anúncio`}),t?(0,E.jsxs)(`div`,{ref:c,className:`nl-user-wrap`,children:[(0,E.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${i?`active`:``}`,onClick:()=>{s(!1),a(e=>!e)},"aria-expanded":i,"aria-label":`Abrir menu de utilizador`,children:[(0,E.jsx)(`span`,{className:`nl-avatar`,children:g?(0,E.jsx)(`img`,{src:g,alt:``}):(0,E.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,E.jsx)(`span`,{className:`nl-username`,children:v}),(0,E.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,E.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),i&&(0,E.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,E.jsxs)(d,{to:`/perfil`,onClick:()=>a(!1),className:`nl-ud-item`,children:[(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,E.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,E.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,E.jsx)(`div`,{className:`nl-ud-divider`}),(0,E.jsxs)(`button`,{type:`button`,onClick:()=>{a(!1),n()},className:`nl-ud-item logout`,children:[(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,E.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,E.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,E.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),o&&(0,E.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,E.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,E.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`strong`,{children:`Noxvelia`}),(0,E.jsx)(`span`,{children:`Automóveis e imóveis em Portugal`})]})]}),(0,E.jsx)(`a`,{href:`#pesquisa`,onClick:()=>s(!1),children:`Pesquisar`}),(0,E.jsx)(`a`,{href:`#anunciar`,onClick:()=>s(!1),children:`Criar anúncio`}),(0,E.jsx)(`a`,{href:`#marcas`,onClick:()=>s(!1),children:`Marcas`}),(0,E.jsx)(d,{to:`/carros`,onClick:()=>s(!1),children:`Automóveis`}),(0,E.jsx)(d,{to:`/imoveis`,onClick:()=>s(!1),children:`Imóveis`}),(0,E.jsx)(d,{to:`/profissionais`,onClick:()=>s(!1),children:`Profissionais`}),(0,E.jsx)(d,{to:`/enviar-stock`,onClick:()=>s(!1),children:`Enviar stock`}),(0,E.jsx)(d,{to:`/patrocinios`,onClick:()=>s(!1),children:`Torne-se patrocinador`}),(0,E.jsx)(d,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>s(!1),children:`Criar anúncio`}),t?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{to:`/perfil`,onClick:()=>s(!1),children:`O meu perfil`}),(0,E.jsx)(`button`,{type:`button`,onClick:()=>{s(!1),n()},children:`Terminar sessão`})]}):(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(d,{to:`/login`,state:{from:r.pathname},onClick:()=>s(!1),children:`Entrar`}),(0,E.jsx)(d,{to:`/registo`,onClick:()=>s(!1),children:`Registar`})]})]})]})]})}var ue=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,de=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],fe=[`T1`,`T2`,`T3`,`T4`,`T5+`],pe=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 30.000 €`,value:`30000`}],me=[{label:`Até 150.000 €`,value:`150000`},{label:`Até 250.000 €`,value:`250000`},{label:`Até 400.000 €`,value:`400000`}],he=new Set([`aiways`,`aston-martin`,`bentley`]),D=[`Renault`,`Peugeot`,`Volkswagen`,`Mercedes-Benz`,`Toyota`,`Opel`,`Fiat`,`BMW`,`Audi`,`Citroën`,`Seat`,`Ford`,`Nissan`,`Hyundai`,`Kia`,`Dacia`,`Skoda`,`Volvo`],O=[...D.filter(e=>C.includes(e)),...C.filter(e=>!D.includes(e))],ge=180*1e3,_e=(0,T.lazy)(()=>b(()=>import(`./LandingListingsCarousel-DGyLniDo.js`),__vite__mapDeps([0,1,2,3]))),k=()=>typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,ve=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),A=e=>new Intl.NumberFormat(`pt-PT`).format(e||0),j=e=>{let t=e?new Date(e):null;return t&&!Number.isNaN(t.getTime())?new Intl.DateTimeFormat(`pt-PT`,{day:`2-digit`,month:`short`}).format(t):``},M=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),N=e=>`/marcas/${M(e)}.${e===`Jaecoo`?`svg`:`png`}`,P=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase();function F({valor:e}){let[t,n]=(0,T.useState)(0),r=(0,T.useRef)(null),i=(0,T.useRef)(0);return(0,T.useEffect)(()=>{if(e==null)return;if(k()){n(e),i.current=e;return}let t=i.current,a=e-t;if(a===0)return;let o=performance.now(),s=c=>{let l=Math.min(1,(c-o)/900),u=1-(1-l)**3;n(Math.round(t+a*u)),l<1?r.current=requestAnimationFrame(s):i.current=e};return r.current=requestAnimationFrame(s),()=>r.current&&cancelAnimationFrame(r.current)},[e]),(0,E.jsx)(E.Fragment,{children:A(t)})}function I(){let t=g(),n=l(),{signed:h}=u(),v=(0,T.useRef)(!1),C=(0,T.useRef)(null),D=(0,T.useRef)(null),A=(0,T.useRef)(null),I=(0,T.useRef)(null),ye=h?`/publicar`:`/login`,be=h?void 0:f(n,`/`),[L,R]=(0,T.useState)({carro:[],imovel:[]}),[xe,z]=(0,T.useState)(null),[B,Se]=(0,T.useState)(!0),[V,H]=(0,T.useState)(!1),[U,W]=(0,T.useState)([]),[Ce,we]=(0,T.useState)(null),[G,Te]=(0,T.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``}),Ee=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},De=G.tipo===`carro`&&G.marca?oe(G.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],Oe=Number(xe?.profissionais||0)>0,K=Number(Ce?.totalVisitas30Dias||0),ke=K>=500,q=(e,t)=>{Te(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``,precoMax:``}:(e===`marca`&&(r.modelo=``),r)})},Ae=e=>{e.preventDefault();let{tipo:n,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=G,l={distrito:s,precoMax:c,...n===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};w(`search_start`,{vertical:n}),t(Ee(n,l))},J=e=>{let t=C.current;t&&t.scrollBy({left:e*Math.max(320,t.clientWidth*.82),behavior:`smooth`})},Y=()=>(I.current||=b(()=>import(`./modules-e6_-kOkN.js`).then(e=>e.animate),[]),I.current),X=e=>{if(k())return;let t=e.currentTarget;Y().then(e=>e(t,{scale:[1,1.018,1],duration:320,ease:`outQuad`})).catch(()=>{})};(0,T.useEffect)(()=>{let t=!0;return Promise.all([b(()=>import(`./aos-zjqaR6Yc.js`).then(t=>e(t.default,1)),__vite__mapDeps([4,1])),b(()=>Promise.resolve({}),__vite__mapDeps([5]))]).then(([e])=>{if(!t)return;let n=e.default;n.init({duration:420,easing:`ease-out-cubic`,once:!0,offset:72,disable:k}),A.current=n}).catch(()=>{}),()=>{t=!1}},[]),(0,T.useEffect)(()=>{if(k()||!D.current)return;let e=!0;return Y().then(t=>{e&&D.current&&t(D.current,{opacity:[0,1],y:[10,0],duration:520,ease:`outQuad`})}).catch(()=>{}),()=>{e=!1}},[]),(0,T.useEffect)(()=>{let e=window.requestAnimationFrame(()=>A.current?.refresh());return()=>window.cancelAnimationFrame(e)},[B,U.length]),(0,T.useEffect)(()=>{let e=()=>{v.current||x()?.external===!0&&(v.current=!0,w(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||x()?.external===!0)&&e()};return window.addEventListener(_,t),()=>window.removeEventListener(_,t)},[]),(0,T.useEffect)(()=>{let e=!0;return c.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&z(t||null)}).catch(()=>{e&&z(null)}),()=>{e=!1}},[]),(0,T.useEffect)(()=>{let e=!0;return c.get(`/market-news?limit=6`).then(({data:t})=>{e&&W(Array.isArray(t?.items)?t.items:[])}).catch(()=>{e&&W([])}),()=>{e=!1}},[]),(0,T.useEffect)(()=>{let e=!0,t=()=>{c.get(`/analytics/site-visitas`).then(({data:t})=>{e&&we(t||null)}).catch(()=>{})};t();let n=window.setInterval(t,ge);return()=>{e=!1,window.clearInterval(n)}},[]),(0,T.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await c.get(`/anuncios/em-alta/semana`);if(!e)return;R({carro:(t?.carro||[]).slice(0,6),imovel:(t?.imovel||[]).slice(0,6)}),H(!1)}catch{e&&(R({carro:[],imovel:[]}),H(!0))}finally{e&&Se(!1)}})(),()=>{e=!1}},[]);let je=(e,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}t(re(e))},Z=(e,t)=>{let n=e.tipo===`carro`,r=te(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,E.jsxs)(`button`,{type:`button`,className:`lp-listing-card`,onClick:()=>je(e,t),children:[(0,E.jsx)(`span`,{className:`lp-listing-img`,children:r?(0,E.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,E.jsxs)(`span`,{className:`lp-listing-no-photo ${n?`is-carro`:`is-imovel`}`,children:[n?(0,E.jsx)(y,{size:34}):(0,E.jsx)(m,{size:34}),(0,E.jsx)(`em`,{children:n?`Automóvel sem foto`:`Imóvel sem foto`})]})}),(0,E.jsxs)(`span`,{className:`lp-listing-body`,children:[(0,E.jsx)(`span`,{className:`lp-listing-price`,children:ve(e.preco)}),(0,E.jsx)(`span`,{className:`lp-listing-title`,children:e.titulo}),(0,E.jsx)(`span`,{className:`lp-listing-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,E.jsxs)(`span`,{className:`lp-listing-location`,children:[(0,E.jsx)(a,{size:12,strokeWidth:2.4,"aria-hidden":`true`}),` `,e.localizacao?.cidade||`Portugal`]})]})]},e._id)},Q=(e,t)=>(0,E.jsx)(T.Suspense,{fallback:(0,E.jsx)(`div`,{className:`lp-listing-fallback`,children:e.slice(0,2).map(e=>Z(e,t))}),children:(0,E.jsx)(_e,{items:e,renderItem:e=>Z(e,t)})}),$=(e,n)=>(0,E.jsxs)(`div`,{className:`lp-listing-state`,role:`status`,children:[(0,E.jsx)(`strong`,{children:B?`A carregar seleção.`:V?`A seleção está a ser atualizada.`:`Ver anúncios de ${e}.`}),(0,E.jsx)(`span`,{children:B?`A lista completa está disponível.`:`Usa os filtros para encontrar resultados.`}),!B&&(0,E.jsxs)(`button`,{type:`button`,className:`lp-secondary-button`,onClick:()=>t(n),children:[`Abrir `,e]})]}),Me=B||L.carro.length>0||L.imovel.length>0;return(0,E.jsxs)(`div`,{className:`lp-root`,children:[(0,E.jsx)(S,{title:`Noxvelia | Plataforma de automóveis e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de automóveis e imóveis.`,path:`/`,jsonLd:[ie,ne]}),(0,E.jsx)(le,{}),(0,E.jsxs)(`main`,{children:[(0,E.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-title`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsx)(`div`,{className:`lp-hero-top`,children:(0,E.jsxs)(`div`,{className:`lp-hero-copy`,children:[(0,E.jsx)(`h1`,{id:`lp-title`,ref:D,children:`Automóveis e imóveis em Portugal`}),(0,E.jsx)(`p`,{children:`Filtra por localização, preço e características. Contacto direto com o anunciante.`})]})}),(0,E.jsxs)(`form`,{className:`lp-search-box`,id:`pesquisa`,onSubmit:Ae,children:[(0,E.jsxs)(`div`,{className:`lp-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,E.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":G.tipo===`carro`,"data-vertical":`carro`,className:G.tipo===`carro`?`active`:``,onClick:()=>q(`tipo`,`carro`),children:[(0,E.jsx)(y,{size:16}),` Automóveis`]}),(0,E.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":G.tipo===`imovel`,"data-vertical":`imovel`,className:G.tipo===`imovel`?`active`:``,onClick:()=>q(`tipo`,`imovel`),children:[(0,E.jsx)(m,{size:16}),` Imóveis`]})]}),(0,E.jsxs)(`div`,{className:`lp-search-grid`,children:[G.tipo===`carro`?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(`label`,{children:[`Marca`,(0,E.jsxs)(`select`,{value:G.marca,onChange:e=>q(`marca`,e.target.value),children:[(0,E.jsx)(`option`,{value:``,children:`Todas as marcas`}),O.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`label`,{children:[`Modelo`,(0,E.jsxs)(`select`,{value:G.modelo,onChange:e=>q(`modelo`,e.target.value),disabled:!G.marca,children:[(0,E.jsx)(`option`,{value:``,children:G.marca?`Todos os modelos`:`Escolhe a marca`}),De.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`label`,{children:[`Combustível`,(0,E.jsxs)(`select`,{value:G.combustivel,onChange:e=>q(`combustivel`,e.target.value),children:[(0,E.jsx)(`option`,{value:``,children:`Todos`}),de.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`label`,{children:[`Preço máximo`,(0,E.jsxs)(`select`,{value:G.precoMax,onChange:e=>q(`precoMax`,e.target.value),children:[(0,E.jsx)(`option`,{value:``,children:`Qualquer preço`}),pe.map(e=>(0,E.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}):(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(`label`,{children:[`Tipologia`,(0,E.jsxs)(`select`,{value:G.tipologia,onChange:e=>q(`tipologia`,e.target.value),children:[(0,E.jsx)(`option`,{value:``,children:`Todas`}),fe.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`label`,{children:[`Preço máximo`,(0,E.jsxs)(`select`,{value:G.precoMax,onChange:e=>q(`precoMax`,e.target.value),children:[(0,E.jsx)(`option`,{value:``,children:`Qualquer preço`}),me.map(e=>(0,E.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,E.jsxs)(`label`,{children:[`Distrito`,(0,E.jsxs)(`select`,{value:G.distrito,onChange:e=>q(`distrito`,e.target.value),children:[(0,E.jsx)(`option`,{value:``,children:`Portugal inteiro`}),ee.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`button`,{type:`submit`,children:[(0,E.jsx)(s,{size:17}),` Ver anúncios`]})]})]})]})}),ke&&(0,E.jsx)(`section`,{className:`lp-visits-bar`,"aria-label":`Estatísticas de visitas ao site`,children:(0,E.jsx)(`div`,{className:`lp-shell lp-visits-inner`,children:(0,E.jsxs)(`div`,{className:`lp-visits-headline`,children:[(0,E.jsx)(ce,{size:18,strokeWidth:2.4,"aria-hidden":`true`}),(0,E.jsxs)(`span`,{children:[(0,E.jsx)(`strong`,{children:(0,E.jsx)(F,{valor:K})}),` visitas nos últimos 30 dias`]})]})})}),(0,E.jsx)(`section`,{className:`lp-section lp-category-section`,"aria-labelledby":`lp-categories`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsx)(`div`,{className:`lp-section-head`,children:(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisar`}),(0,E.jsx)(`h2`,{id:`lp-categories`,children:`Escolhe a categoria`})]})}),(0,E.jsxs)(`div`,{className:`lp-category-grid`,children:[(0,E.jsxs)(d,{className:`lp-category-card lp-category-card-auto`,to:`/carros`,children:[(0,E.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`}),(0,E.jsxs)(`span`,{children:[(0,E.jsx)(`small`,{children:`Automóveis`}),(0,E.jsx)(`strong`,{children:`Ver automóveis`}),(0,E.jsx)(`em`,{children:`Marca, modelo, km, combustível e preço.`})]})]}),(0,E.jsxs)(d,{className:`lp-category-card lp-category-card-estate`,to:`/imoveis`,children:[(0,E.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`}),(0,E.jsxs)(`span`,{children:[(0,E.jsx)(`small`,{children:`Imóveis`}),(0,E.jsx)(`strong`,{children:`Ver imóveis`}),(0,E.jsx)(`em`,{children:`Tipologia, localização, área e valor.`})]})]})]})]})}),(0,E.jsx)(`section`,{className:`lp-section lp-brand-section`,id:`marcas`,"aria-labelledby":`lp-brands`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsxs)(`div`,{className:`lp-section-head`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`lp-kicker`,children:`Marcas`}),(0,E.jsx)(`h2`,{id:`lp-brands`,children:`Automóveis por marca`})]}),(0,E.jsxs)(`div`,{className:`lp-brand-controls`,children:[(0,E.jsx)(`button`,{type:`button`,onClick:()=>J(-1),"aria-label":`Ver marcas anteriores`,children:`‹`}),(0,E.jsx)(`button`,{type:`button`,onClick:()=>J(1),"aria-label":`Ver mais marcas`,children:`›`})]})]}),(0,E.jsx)(`div`,{className:`lp-brand-rail`,ref:C,children:(0,E.jsx)(`div`,{className:`lp-brand-grid`,children:O.map(e=>{let t=M(e);return(0,E.jsxs)(d,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,E.jsxs)(`span`,{className:`lp-brand-mark ${he.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,E.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:P(e)}),(0,E.jsx)(`img`,{src:N(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,E.jsx)(`strong`,{children:e})]},e)})})})]})}),U.length>0&&(0,E.jsx)(`section`,{className:`lp-section lp-news-section`,id:`atualidade`,"aria-labelledby":`lp-news`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsx)(`div`,{className:`lp-section-head`,children:(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`span`,{className:`lp-kicker`,children:[(0,E.jsx)(se,{size:13}),` Atualidade`]}),(0,E.jsx)(`h2`,{id:`lp-news`,children:`Mercado em Portugal`}),(0,E.jsx)(`p`,{className:`lp-section-copy`,children:`Notícias recentes sobre automóveis, habitação e crédito.`})]})}),(0,E.jsx)(`div`,{className:`lp-news-grid`,children:U.map(e=>{let t=j(e.publishedAt);return(0,E.jsxs)(`a`,{className:`lp-news-card`,href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:[(0,E.jsx)(`span`,{className:`lp-news-pill ${e.vertical===`automoveis`?`cars`:`homes`}`,children:e.verticalLabel||`Mercado`}),(0,E.jsx)(`h3`,{children:e.title}),e.summary&&(0,E.jsx)(`p`,{children:e.summary}),(0,E.jsxs)(`span`,{className:`lp-news-meta`,children:[e.source,t?` · ${t}`:``]})]},e.id||e.url)})})]})}),Me&&(0,E.jsx)(`section`,{className:`lp-section lp-listing-section`,id:`destaques`,"aria-labelledby":`lp-featured`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell`,children:[(0,E.jsx)(`div`,{className:`lp-section-head`,children:(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`lp-kicker`,children:`Anúncios`}),(0,E.jsx)(`h2`,{id:`lp-featured`,children:`Recentes na Noxvelia`})]})}),(0,E.jsxs)(`div`,{className:`lp-listing-columns`,children:[(B||L.carro.length>0)&&(0,E.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,E.jsxs)(`div`,{className:`lp-column-top`,children:[(0,E.jsxs)(`h3`,{children:[(0,E.jsx)(y,{size:16}),` Automóveis`]}),(0,E.jsx)(`button`,{type:`button`,onClick:()=>t(`/carros`),children:`Ver automóveis`})]}),(0,E.jsx)(`div`,{className:`lp-listing-list`,children:L.carro.length>0?Q(L.carro,`/carros`):$(`automóveis`,`/carros`)})]}),(B||L.imovel.length>0)&&(0,E.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,E.jsxs)(`div`,{className:`lp-column-top`,children:[(0,E.jsxs)(`h3`,{children:[(0,E.jsx)(m,{size:16}),` Imóveis`]}),(0,E.jsx)(`button`,{type:`button`,onClick:()=>t(`/imoveis`),children:`Ver imóveis`})]}),(0,E.jsx)(`div`,{className:`lp-listing-list`,children:L.imovel.length>0?Q(L.imovel,`/imoveis`):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,E.jsx)(`section`,{className:`lp-section lp-sell-section`,id:`anunciar`,"aria-labelledby":`lp-sell`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell lp-sell-box`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`lp-kicker`,children:`Anunciar`}),(0,E.jsx)(`h2`,{id:`lp-sell`,children:`Tens algo para vender?`}),(0,E.jsx)(`p`,{children:`Publica grátis e recebe contactos no anúncio.`})]}),(0,E.jsxs)(d,{className:`lp-main-cta`,to:ye,state:be,onPointerEnter:X,children:[`Criar anúncio `,(0,E.jsx)(r,{size:16})]}),Oe&&(0,E.jsxs)(d,{className:`lp-soft-cta`,to:`/profissionais`,children:[(0,E.jsx)(o,{size:16}),` Ver profissionais`]})]})}),(0,E.jsx)(ae,{mode:`direct`,placement:`landing_between_highlights`,minHeight:176,mobileMinHeight:150}),(0,E.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv`,"data-aos":`fade-up`,children:(0,E.jsxs)(`div`,{className:`lp-shell lp-cv-card`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`span`,{className:`lp-kicker`,children:[(0,E.jsx)(i,{size:12}),` Histórico automóvel`]}),(0,E.jsx)(`h2`,{id:`lp-cv`,children:`20% de desconto na carVertical`}),(0,E.jsx)(`p`,{children:`Consulta dados disponíveis sobre histórico, quilometragem e registos do veículo antes de fechar negócio.`}),(0,E.jsxs)(`a`,{className:`lp-main-cta`,href:ue,target:`_blank`,rel:`noopener noreferrer`,onPointerEnter:X,children:[`Verificar veículo `,(0,E.jsx)(r,{size:16})]})]}),(0,E.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,E.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`}),(0,E.jsx)(`strong`,{children:`20%`}),(0,E.jsx)(`span`,{children:`de desconto através do link Noxvelia.`})]})]})})]}),(0,E.jsx)(p,{})]})}export{I as default};