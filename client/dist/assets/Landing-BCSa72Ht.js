const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LandingListingsCarousel-OeKwU3rZ.js","assets/rolldown-runtime-QTnfLwEv.js","assets/index-BGpTq8fw.js","assets/index-1_G-t0a2.css","assets/LandingListingsCarousel-BdCbVP5L.css","assets/aos-zjqaR6Yc.js","assets/aos-PTugdkvS.css"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,r as n,t as r}from"./search-BCgZky1Y.js";import{C as i,M as a,O as o,S as s,T as c,d as l,f as u,h as d,k as f,l as p,m,p as h,t as g,u as _,x as v,y}from"./index-BGpTq8fw.js";import{t as b}from"./localizacoes-9zKfqZul.js";import{r as ee}from"./images-io1S19E8.js";import{a as x,i as S,o as te}from"./seo-CHiNf1yD.js";import{t as ne}from"./Seo-BC365cQy.js";import{t as C}from"./GoogleAdSlot-ClkM54yr.js";import{n as re,t as w}from"./marcasModelos-CRXT0e16.js";import{t as T}from"./funnelAnalytics-DPi64V2M.js";var E=m(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),ie=m(`newspaper`,[[`path`,{d:`M15 18h-5`,key:`95g1m2`}],[`path`,{d:`M18 14h-8`,key:`sponae`}],[`path`,{d:`M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2`,key:`39pd36`}],[`rect`,{width:`8`,height:`4`,x:`10`,y:`6`,rx:`1`,key:`aywv1n`}]]),ae=m(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),D=e(a(),1),O=s();function k(){let{user:e,signed:t,logout:n}=v(),r=o(),[i,a]=(0,D.useState)(!1),[s,l]=(0,D.useState)(!1),u=(0,D.useRef)(null),f=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=e=>{u.current&&!u.current.contains(e.target)&&a(!1),f.current&&!f.current.contains(e.target)&&l(!1)},t=e=>{e.key===`Escape`&&(a(!1),l(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,D.useEffect)(()=>{a(!1),l(!1)},[r.pathname]);let p=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),m=p?.avatarUrl||p?.avatar,h=p?.nome?.charAt(0).toUpperCase()||`U`,g=p?.nome?.split(` `)[0]||``,_=t?`/publicar`:`/login`,b=t?void 0:y(r,`/`);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(`style`,{children:`
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
      `}),(0,O.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:f,children:[(0,O.jsxs)(`div`,{className:`nl-inner`,children:[(0,O.jsxs)(c,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,O.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,O.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,O.jsxs)(`div`,{className:`nl-links`,children:[(0,O.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,O.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,O.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,O.jsx)(c,{to:`/profissionais`,children:`Profissionais`})]}),(0,O.jsxs)(`div`,{className:`nl-actions`,children:[(0,O.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{a(!1),l(e=>!e)},"aria-expanded":s,"aria-controls":`nl-mobile-menu`,"aria-label":s?`Fechar navegação`:`Abrir navegação`,children:s?(0,O.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,O.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,O.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,O.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,O.jsx)(d,{}),!t&&(0,O.jsx)(c,{to:`/login`,state:{from:r.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,O.jsx)(c,{to:_,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),t?(0,O.jsxs)(`div`,{ref:u,className:`nl-user-wrap`,children:[(0,O.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${i?`active`:``}`,onClick:()=>{l(!1),a(e=>!e)},"aria-expanded":i,"aria-label":`Abrir menu de utilizador`,children:[(0,O.jsx)(`span`,{className:`nl-avatar`,children:m?(0,O.jsx)(`img`,{src:m,alt:``}):(0,O.jsx)(`span`,{className:`nl-avatar-initial`,children:h})}),g&&(0,O.jsx)(`span`,{className:`nl-username`,children:g}),(0,O.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,O.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),i&&(0,O.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,O.jsxs)(c,{to:`/perfil`,onClick:()=>a(!1),className:`nl-ud-item`,children:[(0,O.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,O.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,O.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,O.jsx)(`div`,{className:`nl-ud-divider`}),(0,O.jsxs)(`button`,{type:`button`,onClick:()=>{a(!1),n()},className:`nl-ud-item logout`,children:[(0,O.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,O.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,O.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,O.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),s&&(0,O.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,O.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,O.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`strong`,{children:`Noxvelia`}),(0,O.jsx)(`span`,{children:`Automóveis e imóveis em Portugal`})]})]}),(0,O.jsx)(`a`,{href:`#pesquisa`,onClick:()=>l(!1),children:`Pesquisar`}),(0,O.jsx)(`a`,{href:`#anunciar`,onClick:()=>l(!1),children:`Anunciar grátis`}),(0,O.jsx)(`a`,{href:`#marcas`,onClick:()=>l(!1),children:`Marcas`}),(0,O.jsx)(c,{to:`/carros`,onClick:()=>l(!1),children:`Automóveis`}),(0,O.jsx)(c,{to:`/imoveis`,onClick:()=>l(!1),children:`Imóveis`}),(0,O.jsx)(c,{to:`/profissionais`,onClick:()=>l(!1),children:`Profissionais`}),(0,O.jsx)(c,{className:`nl-mobile-primary`,to:_,state:b,onClick:()=>l(!1),children:`Publicar anúncio`}),t?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(c,{to:`/perfil`,onClick:()=>l(!1),children:`O meu perfil`}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>{l(!1),n()},children:`Terminar sessão`})]}):(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(c,{to:`/login`,state:{from:r.pathname},onClick:()=>l(!1),children:`Entrar`}),(0,O.jsx)(c,{to:`/registo`,onClick:()=>l(!1),children:`Registar`})]})]})]})]})}var A=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,oe=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],se=[`T1`,`T2`,`T3`,`T4`,`T5+`],ce=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 30.000 €`,value:`30000`}],le=[{label:`Até 150.000 €`,value:`150000`},{label:`Até 250.000 €`,value:`250000`},{label:`Até 400.000 €`,value:`400000`}],ue=new Set([`aiways`,`aston-martin`,`bentley`]),de=(0,D.lazy)(()=>g(()=>import(`./LandingListingsCarousel-OeKwU3rZ.js`),__vite__mapDeps([0,1,2,3,4]))),j=()=>typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,fe=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),pe=e=>{let t=e?new Date(e):null;return t&&!Number.isNaN(t.getTime())?new Intl.DateTimeFormat(`pt-PT`,{day:`2-digit`,month:`short`}).format(t):``},M=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),me=e=>`/marcas/${M(e)}.${e===`Jaecoo`?`svg`:`png`}`,N=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase();function P(){let a=f(),s=o(),{signed:d}=v(),m=(0,D.useRef)(!1),P=(0,D.useRef)(null),F=(0,D.useRef)(null),I=(0,D.useRef)(null),L=(0,D.useRef)(null),R=d?`/publicar`:`/login`,he=d?void 0:y(s,`/`),[z,B]=(0,D.useState)({carro:[],imovel:[]}),[ge,V]=(0,D.useState)(null),[H,_e]=(0,D.useState)(!0),[ve,U]=(0,D.useState)(!1),[W,G]=(0,D.useState)([]),[K,ye]=(0,D.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``}),be=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},xe=K.tipo===`carro`&&K.marca?re(K.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],Se=Number(ge?.profissionais||0)>0,q=(e,t)=>{ye(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``,precoMax:``}:(e===`marca`&&(r.modelo=``),r)})},Ce=e=>{e.preventDefault();let{tipo:t,marca:n,modelo:r,combustivel:i,tipologia:o,distrito:s,precoMax:c}=K,l={distrito:s,precoMax:c,...t===`carro`?{marca:n,modelo:r,combustivel:i}:{tipologia:o}};T(`search_start`,{vertical:t}),a(be(t,l))},J=e=>{let t=P.current;t&&t.scrollBy({left:e*Math.max(320,t.clientWidth*.82),behavior:`smooth`})},Y=()=>(L.current||=g(()=>import(`./modules-e6_-kOkN.js`).then(e=>e.animate),[]),L.current),X=e=>{if(j())return;let t=e.currentTarget;Y().then(e=>e(t,{scale:[1,1.018,1],duration:320,ease:`outQuad`})).catch(()=>{})};(0,D.useEffect)(()=>{let t=!0;return Promise.all([g(()=>import(`./aos-zjqaR6Yc.js`).then(t=>e(t.default,1)),__vite__mapDeps([5,1])),g(()=>Promise.resolve({}),__vite__mapDeps([6]))]).then(([e])=>{if(!t)return;let n=e.default;n.init({duration:420,easing:`ease-out-cubic`,once:!0,offset:72,disable:j}),I.current=n}).catch(()=>{}),()=>{t=!1}},[]),(0,D.useEffect)(()=>{if(j()||!F.current)return;let e=!0;return Y().then(t=>{e&&F.current&&t(F.current,{opacity:[0,1],y:[10,0],duration:520,ease:`outQuad`})}).catch(()=>{}),()=>{e=!1}},[]),(0,D.useEffect)(()=>{let e=window.requestAnimationFrame(()=>I.current?.refresh());return()=>window.cancelAnimationFrame(e)},[H,W.length]),(0,D.useEffect)(()=>{let e=()=>{m.current||_()?.external===!0&&(m.current=!0,T(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||_()?.external===!0)&&e()};return window.addEventListener(p,t),()=>window.removeEventListener(p,t)},[]),(0,D.useEffect)(()=>{let e=!0;return i.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&V(t||null)}).catch(()=>{e&&V(null)}),()=>{e=!1}},[]),(0,D.useEffect)(()=>{let e=!0;return i.get(`/market-news?limit=6`).then(({data:t})=>{e&&G(Array.isArray(t?.items)?t.items:[])}).catch(()=>{e&&G([])}),()=>{e=!1}},[]),(0,D.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await i.get(`/anuncios/em-alta/semana`);if(!e)return;B({carro:(t?.carro||[]).slice(0,6),imovel:(t?.imovel||[]).slice(0,6)}),U(!1)}catch{e&&(B({carro:[],imovel:[]}),U(!0))}finally{e&&_e(!1)}})(),()=>{e=!1}},[]);let we=(e,t)=>{try{localStorage.setItem(`@App:contexto_visual`,t===`/carros`?`carro`:`imovel`)}catch{}a(S(e))},Z=(e,n)=>{let r=e.tipo===`carro`,i=ee(e.fotos?.[0]||e.imagens?.[0],`medium`),a=r?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,O.jsxs)(`button`,{type:`button`,className:`lp-listing-card`,onClick:()=>we(e,n),children:[(0,O.jsx)(`span`,{className:`lp-listing-img`,children:i?(0,O.jsx)(`img`,{src:i,width:`800`,height:`600`,alt:e.titulo||(r?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,O.jsx)(`span`,{className:`lp-listing-no-photo`,children:(0,O.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``,loading:`lazy`})})}),(0,O.jsxs)(`span`,{className:`lp-listing-body`,children:[(0,O.jsx)(`span`,{className:`lp-listing-price`,children:fe(e.preco)}),(0,O.jsx)(`span`,{className:`lp-listing-title`,children:e.titulo}),(0,O.jsx)(`span`,{className:`lp-listing-meta`,children:a||(r?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,O.jsxs)(`span`,{className:`lp-listing-location`,children:[(0,O.jsx)(t,{size:12,strokeWidth:2.4,"aria-hidden":`true`}),` `,e.localizacao?.cidade||`Portugal`]})]})]},e._id)},Q=(e,t)=>(0,O.jsx)(D.Suspense,{fallback:(0,O.jsx)(`div`,{className:`lp-listing-fallback`,children:e.slice(0,2).map(e=>Z(e,t))}),children:(0,O.jsx)(de,{items:e,renderItem:e=>Z(e,t)})}),$=(e,t)=>(0,O.jsxs)(`div`,{className:`lp-listing-state`,role:`status`,children:[(0,O.jsx)(`strong`,{children:H?`A carregar seleção.`:ve?`A seleção está a ser atualizada.`:`Ver anúncios de ${e}.`}),(0,O.jsx)(`span`,{children:H?`A lista completa está disponível.`:`Usa os filtros para encontrar resultados.`}),!H&&(0,O.jsxs)(`button`,{type:`button`,className:`lp-secondary-button`,onClick:()=>a(t),children:[`Abrir `,e]})]}),Te=H||z.carro.length>0||z.imovel.length>0;return(0,O.jsxs)(`div`,{className:`lp-root`,children:[(0,O.jsx)(ne,{title:`Noxvelia | Plataforma de automóveis e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de automóveis e imóveis.`,path:`/`,jsonLd:[te,x]}),(0,O.jsx)(k,{}),(0,O.jsxs)(`main`,{children:[(0,O.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-title`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsx)(`div`,{className:`lp-hero-top`,children:(0,O.jsxs)(`div`,{className:`lp-hero-copy`,children:[(0,O.jsx)(`h1`,{id:`lp-title`,ref:F,children:`Automóveis e imóveis em Portugal`}),(0,O.jsx)(`p`,{children:`Filtra por localização, preço e características. Contacto direto com o anunciante.`})]})}),(0,O.jsxs)(`form`,{className:`lp-search-box`,id:`pesquisa`,onSubmit:Ce,children:[(0,O.jsxs)(`div`,{className:`lp-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,O.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":K.tipo===`carro`,className:K.tipo===`carro`?`active`:``,onClick:()=>q(`tipo`,`carro`),children:[(0,O.jsx)(h,{size:16}),` Automóveis`]}),(0,O.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":K.tipo===`imovel`,className:K.tipo===`imovel`?`active`:``,onClick:()=>q(`tipo`,`imovel`),children:[(0,O.jsx)(u,{size:16}),` Imóveis`]})]}),(0,O.jsxs)(`div`,{className:`lp-search-grid`,children:[K.tipo===`carro`?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`label`,{children:[`Marca`,(0,O.jsxs)(`select`,{value:K.marca,onChange:e=>q(`marca`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Todas as marcas`}),w.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`label`,{children:[`Modelo`,(0,O.jsxs)(`select`,{value:K.modelo,onChange:e=>q(`modelo`,e.target.value),disabled:!K.marca,children:[(0,O.jsx)(`option`,{value:``,children:K.marca?`Todos os modelos`:`Escolhe a marca`}),xe.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`label`,{children:[`Combustível`,(0,O.jsxs)(`select`,{value:K.combustivel,onChange:e=>q(`combustivel`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Todos`}),oe.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`label`,{children:[`Preço máximo`,(0,O.jsxs)(`select`,{value:K.precoMax,onChange:e=>q(`precoMax`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Qualquer preço`}),ce.map(e=>(0,O.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}):(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`label`,{children:[`Tipologia`,(0,O.jsxs)(`select`,{value:K.tipologia,onChange:e=>q(`tipologia`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Todas`}),se.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`label`,{children:[`Preço máximo`,(0,O.jsxs)(`select`,{value:K.precoMax,onChange:e=>q(`precoMax`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Qualquer preço`}),le.map(e=>(0,O.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,O.jsxs)(`label`,{children:[`Distrito`,(0,O.jsxs)(`select`,{value:K.distrito,onChange:e=>q(`distrito`,e.target.value),children:[(0,O.jsx)(`option`,{value:``,children:`Portugal inteiro`}),b.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))]})]}),(0,O.jsxs)(`button`,{type:`submit`,children:[(0,O.jsx)(r,{size:17}),` Ver anúncios`]})]})]})]})}),(0,O.jsx)(`section`,{className:`lp-section lp-category-section`,"aria-labelledby":`lp-categories`,"data-aos":`fade-up`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsx)(`div`,{className:`lp-section-head`,children:(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisar`}),(0,O.jsx)(`h2`,{id:`lp-categories`,children:`Escolhe a categoria`})]})}),(0,O.jsxs)(`div`,{className:`lp-category-grid`,children:[(0,O.jsxs)(c,{className:`lp-category-card`,to:`/carros`,children:[(0,O.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`}),(0,O.jsxs)(`span`,{children:[(0,O.jsx)(`small`,{children:`Automóveis`}),(0,O.jsx)(`strong`,{children:`Ver automóveis`}),(0,O.jsx)(`em`,{children:`Marca, modelo, km, combustível e preço.`})]})]}),(0,O.jsxs)(c,{className:`lp-category-card`,to:`/imoveis`,children:[(0,O.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`}),(0,O.jsxs)(`span`,{children:[(0,O.jsx)(`small`,{children:`Imóveis`}),(0,O.jsx)(`strong`,{children:`Ver imóveis`}),(0,O.jsx)(`em`,{children:`Tipologia, localização, área e valor.`})]})]})]})]})}),(0,O.jsx)(`section`,{className:`lp-section lp-brand-section`,id:`marcas`,"aria-labelledby":`lp-brands`,"data-aos":`fade-up`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsxs)(`div`,{className:`lp-section-head`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`span`,{className:`lp-kicker`,children:`Marcas`}),(0,O.jsx)(`h2`,{id:`lp-brands`,children:`Automóveis por marca`})]}),(0,O.jsxs)(`div`,{className:`lp-brand-controls`,children:[(0,O.jsx)(`button`,{type:`button`,onClick:()=>J(-1),"aria-label":`Ver marcas anteriores`,children:`‹`}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>J(1),"aria-label":`Ver mais marcas`,children:`›`})]})]}),(0,O.jsx)(`div`,{className:`lp-brand-rail`,ref:P,children:(0,O.jsx)(`div`,{className:`lp-brand-grid`,children:w.map(e=>{let t=M(e);return(0,O.jsxs)(c,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,O.jsxs)(`span`,{className:`lp-brand-mark ${ue.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,O.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:N(e)}),(0,O.jsx)(`img`,{src:me(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,O.jsx)(`strong`,{children:e})]},e)})})})]})}),W.length>0&&(0,O.jsx)(`section`,{className:`lp-section lp-news-section`,id:`atualidade`,"aria-labelledby":`lp-news`,"data-aos":`fade-up`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsx)(`div`,{className:`lp-section-head`,children:(0,O.jsxs)(`div`,{children:[(0,O.jsxs)(`span`,{className:`lp-kicker`,children:[(0,O.jsx)(ie,{size:13}),` Atualidade`]}),(0,O.jsx)(`h2`,{id:`lp-news`,children:`Mercado em Portugal`}),(0,O.jsx)(`p`,{className:`lp-section-copy`,children:`Notícias recentes sobre automóveis, habitação e crédito.`})]})}),(0,O.jsx)(`div`,{className:`lp-news-grid`,children:W.map(e=>{let t=pe(e.publishedAt);return(0,O.jsxs)(`a`,{className:`lp-news-card`,href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:[(0,O.jsx)(`span`,{className:`lp-news-pill ${e.vertical===`automoveis`?`cars`:`homes`}`,children:e.verticalLabel||`Mercado`}),(0,O.jsx)(`h3`,{children:e.title}),e.summary&&(0,O.jsx)(`p`,{children:e.summary}),(0,O.jsxs)(`span`,{className:`lp-news-meta`,children:[e.source,t?` · ${t}`:``]})]},e.id||e.url)})})]})}),Te&&(0,O.jsx)(`section`,{className:`lp-section lp-listing-section`,id:`destaques`,"aria-labelledby":`lp-featured`,"data-aos":`fade-up`,children:(0,O.jsxs)(`div`,{className:`lp-shell`,children:[(0,O.jsx)(`div`,{className:`lp-section-head`,children:(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`span`,{className:`lp-kicker`,children:`Anúncios`}),(0,O.jsx)(`h2`,{id:`lp-featured`,children:`Recentes na Noxvelia`})]})}),(0,O.jsxs)(`div`,{className:`lp-listing-columns`,children:[(H||z.carro.length>0)&&(0,O.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,O.jsxs)(`div`,{className:`lp-column-top`,children:[(0,O.jsxs)(`h3`,{children:[(0,O.jsx)(h,{size:16}),` Automóveis`]}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>a(`/carros`),children:`Ver automóveis`})]}),(0,O.jsx)(`div`,{className:`lp-listing-list`,children:z.carro.length>0?Q(z.carro,`/carros`):$(`automóveis`,`/carros`)})]}),(H||z.imovel.length>0)&&(0,O.jsxs)(`div`,{className:`lp-listing-column`,children:[(0,O.jsxs)(`div`,{className:`lp-column-top`,children:[(0,O.jsxs)(`h3`,{children:[(0,O.jsx)(u,{size:16}),` Imóveis`]}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>a(`/imoveis`),children:`Ver imóveis`})]}),(0,O.jsx)(`div`,{className:`lp-listing-list`,children:z.imovel.length>0?Q(z.imovel,`/imoveis`):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,O.jsx)(`section`,{className:`lp-section lp-sell-section`,id:`anunciar`,"aria-labelledby":`lp-sell`,"data-aos":`fade-up`,children:(0,O.jsxs)(`div`,{className:`lp-shell lp-sell-box`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`span`,{className:`lp-kicker`,children:`Anunciar`}),(0,O.jsx)(`h2`,{id:`lp-sell`,children:`Tens algo para vender?`}),(0,O.jsx)(`p`,{children:`Publica grátis e recebe contactos no anúncio.`})]}),(0,O.jsxs)(c,{className:`lp-main-cta`,to:R,state:he,onPointerEnter:X,children:[`Publicar anúncio `,(0,O.jsx)(E,{size:16})]}),Se&&(0,O.jsxs)(c,{className:`lp-soft-cta`,to:`/profissionais`,children:[(0,O.jsx)(n,{size:16}),` Ver profissionais`]})]})}),(0,O.jsx)(C,{placement:`landing_between_highlights`,minHeight:96}),(0,O.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv`,"data-aos":`fade-up`,children:(0,O.jsxs)(`div`,{className:`lp-shell lp-cv-card`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsxs)(`span`,{className:`lp-kicker`,children:[(0,O.jsx)(ae,{size:12}),` Histórico automóvel`]}),(0,O.jsx)(`h2`,{id:`lp-cv`,children:`20% de desconto na carVertical`}),(0,O.jsx)(`p`,{children:`Consulta dados disponíveis sobre histórico, quilometragem e registos do veículo antes de fechar negócio.`}),(0,O.jsxs)(`a`,{className:`lp-main-cta`,href:A,target:`_blank`,rel:`noopener noreferrer`,onPointerEnter:X,children:[`Verificar veículo `,(0,O.jsx)(E,{size:16})]})]}),(0,O.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,O.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`}),(0,O.jsx)(`strong`,{children:`20%`}),(0,O.jsx)(`span`,{children:`de desconto através do link Noxvelia.`})]})]})})]}),(0,O.jsx)(l,{})]})}export{P as default};