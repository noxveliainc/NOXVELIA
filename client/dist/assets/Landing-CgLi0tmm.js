import{C as e,D as t,N as n,O as r,S as i,d as a,h as o,j as s,l as c,u as l,w as u,x as d,y as f}from"./index-C0TSapMH.js";import{r as p}from"./images-io1S19E8.js";import{a as m,i as h,o as g}from"./seo-BZnLo9Qd.js";import{t as _}from"./Seo-7Hg_AVHp.js";import{t as v}from"./GoogleAdSlot-ybuDPYIE.js";import{n as y,t as b}from"./marcasModelos-CRXT0e16.js";import{t as x}from"./localizacoes-9zKfqZul.js";import{t as S}from"./funnelAnalytics-DwVejj6-.js";var C=n(s(),1),w=i();function T(){let{user:e,signed:n,logout:r}=d(),i=t(),[a,s]=(0,C.useState)(!1),[c,l]=(0,C.useState)(!1),p=(0,C.useRef)(null),m=(0,C.useRef)(null);(0,C.useEffect)(()=>{let e=e=>{p.current&&!p.current.contains(e.target)&&s(!1),m.current&&!m.current.contains(e.target)&&l(!1)},t=e=>{e.key===`Escape`&&(s(!1),l(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,C.useEffect)(()=>{s(!1),l(!1)},[i.pathname]);let h=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=h?.avatarUrl||h?.avatar,_=h?.nome?.charAt(0).toUpperCase()||`U`,v=h?.nome?.split(` `)[0]||``,y=n?`/publicar`:`/login`,b=n?void 0:f(i,`/`);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(`style`,{children:`
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
      `}),(0,w.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:m,children:[(0,w.jsxs)(`div`,{className:`nl-inner`,children:[(0,w.jsxs)(u,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,w.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,w.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,w.jsxs)(`div`,{className:`nl-links`,children:[(0,w.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,w.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,w.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,w.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,w.jsx)(u,{to:`/profissionais`,children:`Profissionais`})]}),(0,w.jsxs)(`div`,{className:`nl-actions`,children:[(0,w.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{s(!1),l(e=>!e)},"aria-expanded":c,"aria-controls":`nl-mobile-menu`,"aria-label":c?`Fechar navegação`:`Abrir navegação`,children:c?(0,w.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,w.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,w.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,w.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,w.jsx)(o,{}),!n&&(0,w.jsx)(u,{to:`/login`,state:{from:i.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,w.jsx)(u,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),n?(0,w.jsxs)(`div`,{ref:p,className:`nl-user-wrap`,children:[(0,w.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${a?`active`:``}`,onClick:()=>{l(!1),s(e=>!e)},"aria-expanded":a,"aria-label":`Abrir menu de utilizador`,children:[(0,w.jsx)(`span`,{className:`nl-avatar`,children:g?(0,w.jsx)(`img`,{src:g,alt:``}):(0,w.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,w.jsx)(`span`,{className:`nl-username`,children:v}),(0,w.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,w.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),a&&(0,w.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,w.jsxs)(u,{to:`/perfil`,onClick:()=>s(!1),className:`nl-ud-item`,children:[(0,w.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,w.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,w.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,w.jsx)(`div`,{className:`nl-ud-divider`}),(0,w.jsxs)(`button`,{type:`button`,onClick:()=>{s(!1),r()},className:`nl-ud-item logout`,children:[(0,w.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,w.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,w.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,w.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),c&&(0,w.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,w.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,w.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`strong`,{children:`Noxvelia`}),(0,w.jsx)(`span`,{children:`Carros e imóveis em Portugal`})]})]}),(0,w.jsx)(`a`,{href:`#pesquisa`,onClick:()=>l(!1),children:`Pesquisar`}),(0,w.jsx)(`a`,{href:`#anunciar`,onClick:()=>l(!1),children:`Anunciar grátis`}),(0,w.jsx)(`a`,{href:`#marcas`,onClick:()=>l(!1),children:`Marcas`}),(0,w.jsx)(`a`,{href:`#atalhos`,onClick:()=>l(!1),children:`Atalhos`}),(0,w.jsx)(u,{to:`/carros`,onClick:()=>l(!1),children:`Carros`}),(0,w.jsx)(u,{to:`/imoveis`,onClick:()=>l(!1),children:`Imóveis`}),(0,w.jsx)(u,{to:`/profissionais`,onClick:()=>l(!1),children:`Profissionais`}),(0,w.jsx)(u,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>l(!1),children:`Publicar anúncio`}),n?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{to:`/perfil`,onClick:()=>l(!1),children:`O meu perfil`}),(0,w.jsx)(`button`,{type:`button`,onClick:()=>{l(!1),r()},children:`Terminar sessão`})]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{to:`/login`,state:{from:i.pathname},onClick:()=>l(!1),children:`Entrar`}),(0,w.jsx)(u,{to:`/registo`,onClick:()=>l(!1),children:`Registar`})]})]})]})]})}var ee=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,te=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],ne=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],E=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],D=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],O=[`T1`,`T2`,`T3`,`T4`,`T5+`],k=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],A=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),j=e=>e==null?`...`:new Intl.NumberFormat(`pt-PT`).format(e),M=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),N=e=>`/marcas/${M(e)}.${e===`Jaecoo`?`svg`:`png`}`,P=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),F=new Set([`aiways`,`aston-martin`,`bentley`]);function I(){let n=r(),i=t(),{signed:o}=d(),s=(0,C.useRef)(!1),I=(0,C.useRef)(null),L=o?`/publicar`:`/login`,R=o?void 0:f(i,`/`),[z,B]=(0,C.useState)({carro:[],imovel:[]}),[V,H]=(0,C.useState)(null),[U,W]=(0,C.useState)(!0),[G,K]=(0,C.useState)(!1),[q,re]=(0,C.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``});(0,C.useEffect)(()=>{if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let e=Array.from(document.querySelectorAll(`.lp-reveal`)),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.setAttribute(`data-visible`,`true`),t.unobserve(e.target))})},{rootMargin:`0px 0px -8% 0px`,threshold:.12});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]),(0,C.useEffect)(()=>{let e=I.current;if(!e||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let t=0,n=n=>{cancelAnimationFrame(t),t=requestAnimationFrame(()=>{let t=e.getBoundingClientRect(),r=(n.clientX-t.left)/t.width*100,i=(n.clientY-t.top)/t.height*100;e.style.setProperty(`--lp-pointer-x`,r+`%`),e.style.setProperty(`--lp-pointer-y`,i+`%`)})};return e.addEventListener(`pointermove`,n),()=>{cancelAnimationFrame(t),e.removeEventListener(`pointermove`,n)}},[]),(0,C.useEffect)(()=>{let e=()=>{s.current||l()?.external===!0&&(s.current=!0,S(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||l()?.external===!0)&&e()};return window.addEventListener(c,t),()=>window.removeEventListener(c,t)},[]),(0,C.useEffect)(()=>{let t=!0;return e.get(`/anuncios/resumo-publico`).then(({data:e})=>{t&&H(e||null)}).catch(()=>{t&&H(null)}),()=>{t=!1}},[]),(0,C.useEffect)(()=>{let t=!0;return(async()=>{try{let{data:n}=await e.get(`/anuncios/em-alta/semana`);if(!t)return;B({carro:(n?.carro||[]).slice(0,2),imovel:(n?.imovel||[]).slice(0,2)}),K(!1)}catch{t&&(B({carro:[],imovel:[]}),K(!0))}finally{t&&W(!1)}})(),()=>{t=!1}},[]);let ie=q.tipo===`carro`&&q.marca?y(q.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],J=Number(V?.profissionais||0)>0,Y=[{label:`Anúncios ativos`,value:V?.totalAnuncios},{label:`Carros`,value:V?.carros},{label:`Imóveis`,value:V?.imoveis},J?{label:`Profissionais`,value:V?.profissionais}:null].filter(e=>e&&Number(e.value||0)>0),X=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},Z=(e,t)=>{re(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},ae=e=>{e.preventDefault();let{tipo:t,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=q,l={distrito:s,precoMax:c,...t===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};S(`search_start`,{vertical:t}),n(X(t,l))},oe=(e,t)=>{try{localStorage.setItem(`@App:contexto_visual`,t===`/carros`?`carro`:`imovel`)}catch{}n(h(e))},se=U||z.carro.length>0||z.imovel.length>0,Q=(e,t)=>{let n=e.tipo===`carro`,r=p(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,w.jsxs)(`button`,{type:`button`,className:`lp-example-card`,onClick:()=>oe(e,t),children:[(0,w.jsx)(`span`,{className:`lp-example-img`,children:r?(0,w.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,w.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`})}),(0,w.jsxs)(`span`,{className:`lp-example-body`,children:[(0,w.jsx)(`span`,{className:`lp-example-price`,children:A(e.preco)}),(0,w.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,w.jsx)(`span`,{className:`lp-example-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,w.jsx)(`span`,{className:`lp-example-location`,children:e.localizacao?.cidade||`Portugal`})]})]},e._id)},$=(e,t)=>U?(0,w.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,w.jsx)(`strong`,{children:`A carregar destaques.`}),(0,w.jsx)(`span`,{children:`Estamos a preparar uma seleção recente.`})]}):(0,w.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,w.jsx)(`strong`,{children:G?`Os destaques estão a ser atualizados.`:`Vê todos os anúncios em ${e}.`}),(0,w.jsx)(`span`,{children:G?`A pesquisa completa continua disponível.`:`Explora a lista completa com todos os filtros.`}),(0,w.jsxs)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>n(t),children:[`Explorar `,e]})]});return(0,w.jsxs)(`div`,{className:`lp-root`,children:[(0,w.jsx)(_,{title:`Noxvelia | Plataforma de carros e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.`,path:`/`,jsonLd:[g,m]}),(0,w.jsx)(`style`,{children:`
        .lp-root, .lp-root * { box-sizing: border-box; }
        .lp-root {
          --lp-navy: #071326; --lp-blue: #102f50; --lp-gold: #d9c49c; --lp-gold-soft: #f0dfbb; --lp-cyan: #d9c49c; --lp-emerald: #b89961;
          --lp-paper: #fffaf0; --lp-stone: #f4efe5; --lp-line: rgba(7, 19, 38, 0.14); --lp-muted: #546575;
          min-height: 100vh; overflow-x: hidden; background: var(--lp-stone); color: var(--lp-navy);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .lp-root a, .lp-root button, .lp-root input, .lp-root select { font: inherit; }
        .lp-root a:focus-visible, .lp-root button:focus-visible, .lp-root select:focus-visible { outline: 3px solid rgba(217, 196, 156, 0.5); outline-offset: 3px; }
        .lp-reveal { opacity: 0; transform: translateY(18px) scale(.985); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
        .lp-reveal[data-visible="true"] { opacity: 1; transform: translateY(0) scale(1); }
        .lp-reveal-delay-1 { transition-delay: .12s; }
        .lp-reveal-delay-2 { transition-delay: .22s; }
        @keyframes lp-orbit { 0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: .55; } 50% { transform: translate3d(18px,-16px,0) scale(1.08); opacity: .9; } }
        @keyframes lp-sheen { 0% { transform: translateX(-130%); } 100% { transform: translateX(130%); } }
        @keyframes lp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes lp-pulse-border { 0%, 100% { box-shadow: 0 32px 90px -62px rgba(0,0,0,.9), 0 0 0 1px rgba(217,196,156,.28); } 50% { box-shadow: 0 38px 100px -56px rgba(0,0,0,.95), 0 0 0 1px rgba(217,196,156,.52), 0 0 38px rgba(217,196,156,.18); } }
        @keyframes lp-row-slide { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-3px); opacity: .82; } }
        @keyframes lp-scan { from { transform: translateX(-120%); } to { transform: translateX(120%); } }
        @keyframes lp-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .lp-shell { width: min(1220px, calc(100% - 48px)); margin: 0 auto; }
        .lp-hero { --lp-pointer-x: 72%; --lp-pointer-y: 34%; position: relative; isolation: isolate; min-height: clamp(620px, calc(100vh - 74px), 760px); display: flex; align-items: stretch; overflow: hidden; background: var(--lp-navy); }
        .lp-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 62% center; z-index: -2; }
                .lp-hero::before { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at var(--lp-pointer-x) var(--lp-pointer-y), rgba(240,223,187,.32), rgba(240,223,187,.08) 22%, transparent 44%); opacity: .9; transition: opacity .25s ease; }
        .lp-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(7,19,38,.95) 0%, rgba(7,19,38,.82) 42%, rgba(7,19,38,.36) 72%, rgba(7,19,38,.18) 100%), linear-gradient(0deg, rgba(7,19,38,.78) 0%, rgba(7,19,38,.12) 58%); }
        .lp-hero-orbits { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .lp-hero-orbits span { position: absolute; width: 220px; height: 220px; border: 1px solid rgba(240,223,187,.26); border-radius: 999px; background: radial-gradient(circle, rgba(240,223,187,.14), transparent 62%); filter: blur(.2px); animation: lp-orbit 8s ease-in-out infinite; }
        .lp-hero-orbits span:nth-child(1) { right: 9%; top: 16%; }
        .lp-hero-orbits span:nth-child(2) { right: 26%; bottom: 10%; width: 150px; height: 150px; animation-delay: -2.2s; }
        .lp-hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(360px, 470px); gap: clamp(28px, 5vw, 70px); align-items: center; padding: clamp(64px, 8vw, 112px) 0 54px; }
        .lp-hero-copyblock { max-width: 690px; color: #fffaf0; }
        .lp-hero-brand { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 22px; color: #fffaf0; font-size: 13px; font-weight: 900; letter-spacing: .12em; }
        .lp-hero-brand img { width: 32px; height: 32px; object-fit: contain; }
        .lp-kicker, .lp-eyebrow { display: inline-flex; width: fit-content; margin: 0 0 14px; padding: 7px 10px; color: var(--lp-gold-soft); border: 1px solid rgba(240,223,187,.3); border-radius: 8px; background: rgba(240,223,187,.1); font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
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
                .lp-search-panel { position: relative; align-self: center; padding: 20px; border: 1px solid rgba(240,223,187,.34); border-radius: 18px; background: rgba(255,250,240,.97); box-shadow: 0 32px 90px -62px rgba(0,0,0,.9); overflow: hidden; animation: lp-pulse-border 6s ease-in-out infinite; }
        .lp-search-panel::before { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.72) 42%, transparent 58%); transform: translateX(-130%); animation: lp-sheen 7s ease-in-out infinite; pointer-events: none; }
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
        .lp-command-row { min-height: 40px; display: flex; align-items: center; padding: 0 12px; color: var(--lp-navy); border: 1px solid rgba(7,19,38,.08); border-radius: 10px; background: #fff; animation: lp-row-slide 5.4s ease-in-out infinite; }
        .lp-command-row:nth-child(2) { animation-delay: -1.8s; }
        .lp-command-row:nth-child(3) { animation-delay: -3.6s; }
        .lp-command-icon { display: none; }
        .lp-command-row strong { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
        .lp-command-row span:last-child { display: none; }
        .lp-market-ticker { overflow: hidden; background: #fffaf0; border-bottom: 1px solid var(--lp-line); }
        .lp-market-track { display: flex; width: max-content; animation: lp-marquee 26s linear infinite; }
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
        .lp-showcase-band { position: relative; overflow: hidden; padding: 64px 0; background: linear-gradient(180deg, #fffaf0 0%, #f5efe3 100%); border-bottom: 1px solid var(--lp-line); }
        .lp-showcase-band::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 78% 18%, rgba(217,196,156,.22), transparent 34%), radial-gradient(circle at 12% 82%, rgba(16,47,80,.07), transparent 30%); pointer-events: none; }
        .lp-showcase-grid { position: relative; display: grid; grid-template-columns: minmax(0, .88fr) minmax(0, 1.12fr); gap: clamp(24px, 5vw, 62px); align-items: center; }
        .lp-showcase-copy { max-width: 520px; }
        .lp-showcase-kpis { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 24px; }
        .lp-showcase-kpi { padding: 14px; border: 1px solid var(--lp-line); border-radius: 10px; background: rgba(255,255,255,.78); }
        .lp-showcase-kpi strong { display: block; color: var(--lp-navy); font-size: 20px; line-height: 1; }
        .lp-showcase-kpi span { display: block; margin-top: 7px; color: var(--lp-muted); font-size: 11px; font-weight: 850; text-transform: uppercase; }
        .lp-bento-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; }
        .lp-bento-card { position: relative; min-height: 172px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; padding: 18px; color: inherit; border: 1px solid rgba(16,47,80,.12); border-radius: 12px; background: rgba(255,255,255,.88); text-decoration: none; box-shadow: 0 18px 50px -38px rgba(7,19,38,.55); transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease !important; }
        .lp-bento-card::before { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 10%, rgba(217,196,156,.16) 48%, transparent 86%); transform: translateX(-120%); animation: lp-scan 8s ease-in-out infinite; pointer-events: none; }
        .lp-bento-card:hover { transform: translateY(-4px) !important; border-color: rgba(217,196,156,.7); box-shadow: 0 26px 70px -42px rgba(7,19,38,.7); }
        .lp-bento-main { grid-column: span 4; min-height: 230px; background: linear-gradient(135deg, #fff, #f6f1e7 58%, rgba(217,196,156,.22)); }
        .lp-bento-side { grid-column: span 2; }
        .lp-bento-wide { grid-column: span 3; }
        .lp-bento-kicker { width: fit-content; padding: 6px 9px; color: var(--lp-blue); border: 1px solid rgba(16,47,80,.13); border-radius: 7px; background: #fff; font-size: 10px; font-weight: 950; letter-spacing: .08em; text-transform: uppercase; }
        .lp-bento-card strong { position: relative; color: var(--lp-navy); font-size: clamp(20px, 2.4vw, 30px); line-height: 1.08; }
        .lp-bento-card p { position: relative; margin: 0; color: var(--lp-muted); font-size: 13px; line-height: 1.55; }
        .lp-bento-stat { position: relative; display: flex; justify-content: space-between; gap: 12px; color: var(--lp-blue); font-size: 12px; font-weight: 900; }
        .lp-sparkline { position: relative; height: 46px; display: flex; align-items: end; gap: 6px; margin-top: 10px; }
        .lp-sparkline span { flex: 1; min-width: 10px; border-radius: 999px 999px 4px 4px; background: linear-gradient(180deg, var(--lp-gold), rgba(217,196,156,.2)); animation: lp-float 4.8s ease-in-out infinite; }
        .lp-sparkline span:nth-child(1) { height: 42%; }
        .lp-sparkline span:nth-child(2) { height: 72%; animation-delay: -.7s; }
        .lp-sparkline span:nth-child(3) { height: 54%; animation-delay: -1.1s; }
        .lp-sparkline span:nth-child(4) { height: 86%; animation-delay: -1.6s; }
        .lp-sparkline span:nth-child(5) { height: 64%; animation-delay: -2.1s; }
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
        .lp-brand-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr)); gap: 10px; }
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
        .dark .lp-search-panel, .dark .lp-promo-link, .dark .lp-shortcut-group, .dark .lp-brand-card, .dark .lp-cv-card, .dark .lp-bento-card, .dark .lp-showcase-kpi { background: #102f50; border-color: rgba(240,223,187,.18); color: #fffaf0; }
        .dark .lp-title, .dark .lp-search-head h2, .dark .lp-promo-title, .dark .lp-shortcut-group h3, .dark .lp-metric strong, .dark .lp-cv-code strong { color: #fffaf0; }
        .dark .lp-copy, .dark .lp-search-head p, .dark .lp-promo-text, .dark .lp-brand-name, .dark .lp-field label { color: rgba(255,250,240,.72); }
        .dark .lp-field select { background: #071326; color: #fffaf0; border-color: rgba(240,223,187,.18); }
        .dark .lp-type-tabs, .dark .lp-cv-panel { background: #071326; }
        @media (max-width: 1040px) { .lp-hero { min-height: auto; } .lp-hero-inner, .lp-showcase-grid { grid-template-columns: 1fr; padding-top: 58px; } .lp-search-panel { max-width: 760px; } .lp-promo-grid, .lp-examples-grid, .lp-cv-card { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .lp-reveal { opacity: 1; transform: none; transition: none; } .lp-hero-orbits span, .lp-search-panel::before, .lp-market-track, .lp-search-panel, .lp-command-row, .lp-bento-card::before, .lp-sparkline span { animation: none; } .lp-btn, .lp-text-link, .lp-search-submit, .lp-link-button, .lp-promo-link, .lp-brand-card, .lp-bento-card { transition: none !important; } }
        @media (max-width: 720px) { .lp-proof-row, .lp-showcase-kpis { grid-template-columns: 1fr; } .lp-shell { width: min(100% - 30px, 1220px); } .lp-hero-inner { padding: 42px 0 34px; gap: 24px; } .lp-hero h1 { font-size: clamp(36px, 12vw, 48px); } .lp-hero-copy { font-size: 15px; } .lp-search-panel { padding: 14px; border-radius: 10px; } .lp-command-top, .lp-search-head { display: grid; } .lp-type-tabs { width: 100%; } .lp-search-form { grid-template-columns: 1fr; } .lp-command-row span:last-child { display: none; } .lp-market-item { min-height: 48px; padding: 0 16px; font-size: 11px; } .lp-showcase-band { padding: 46px 0; } .lp-bento-grid { grid-template-columns: 1fr; } .lp-bento-main, .lp-bento-side, .lp-bento-wide { grid-column: auto; min-height: 180px; } .lp-section { padding: 54px 0; } .lp-section-head { display: grid; } .lp-promo-link { grid-template-columns: 1fr; } .lp-promo-media img { min-height: 220px; } .lp-pro-strip { grid-template-columns: 1fr; } .lp-shortcut-grid { grid-template-columns: 1fr; } .lp-shortcut-group.wide { grid-column: auto; } .lp-example-list { grid-template-columns: 1fr; } }
      `}),(0,w.jsx)(T,{}),(0,w.jsxs)(`section`,{ref:I,className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:[(0,w.jsx)(`img`,{className:`lp-hero-bg`,src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`,onError:e=>{e.currentTarget.src=`/social/noxvelia-estate-photo-premium.webp`}}),(0,w.jsxs)(`div`,{className:`lp-hero-orbits`,"aria-hidden":`true`,children:[(0,w.jsx)(`span`,{}),(0,w.jsx)(`span`,{})]}),(0,w.jsxs)(`div`,{className:`lp-shell lp-hero-inner`,children:[(0,w.jsxs)(`div`,{className:`lp-hero-copyblock lp-reveal`,children:[(0,w.jsxs)(`h1`,{id:`lp-hero-title`,children:[`Carros e imóveis, `,(0,w.jsx)(`span`,{className:`lp-gradient-word`,children:`encontrados sem perder tempo.`})]}),(0,w.jsx)(`p`,{className:`lp-hero-copy`,children:`Pesquisa anúncios, compara informação essencial e chega ao contacto certo com menos passos.`}),(0,w.jsxs)(`div`,{className:`lp-actions`,children:[(0,w.jsx)(`a`,{className:`lp-btn lp-btn-primary`,href:`#pesquisa`,children:`Pesquisar agora`}),(0,w.jsx)(u,{className:`lp-text-link`,to:L,state:R,children:`Publicar grátis`})]}),(0,w.jsxs)(`div`,{className:`lp-hero-badges`,"aria-label":`Destaques da plataforma`,children:[(0,w.jsx)(`span`,{children:`Pesquisa rápida`}),(0,w.jsx)(`span`,{children:`Contactos diretos`}),(0,w.jsx)(`span`,{children:`Perfis públicos`})]}),(0,w.jsxs)(`div`,{className:`lp-proof-row`,"aria-label":`Fluxo principal da Noxvelia`,children:[(0,w.jsxs)(`div`,{className:`lp-proof-card`,children:[(0,w.jsx)(`strong`,{children:`01`}),(0,w.jsx)(`span`,{children:`Pesquisar`})]}),(0,w.jsxs)(`div`,{className:`lp-proof-card`,children:[(0,w.jsx)(`strong`,{children:`02`}),(0,w.jsx)(`span`,{children:`Comparar`})]}),(0,w.jsxs)(`div`,{className:`lp-proof-card`,children:[(0,w.jsx)(`strong`,{children:`03`}),(0,w.jsx)(`span`,{children:`Contactar`})]})]})]}),(0,w.jsxs)(`form`,{className:`lp-search-panel lp-reveal lp-reveal-delay-1`,id:`pesquisa`,"aria-labelledby":`lp-search-title`,onSubmit:ae,children:[(0,w.jsx)(`div`,{className:`lp-command-top`,"aria-hidden":`true`,children:(0,w.jsx)(`span`,{className:`lp-command-brand`,children:`Pesquisa rápida`})}),(0,w.jsxs)(`div`,{className:`lp-search-head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`lp-eyebrow lp-search-eyebrow`,children:`Começa por aqui`}),(0,w.jsx)(`h2`,{id:`lp-search-title`,children:`Pesquisa direta.`}),(0,w.jsx)(`p`,{children:`Filtra por tipo, localização e preço. Podes afinar mais depois.`})]}),(0,w.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,w.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":q.tipo===`carro`,className:`lp-type-tab ${q.tipo===`carro`?`active`:``}`,onClick:()=>Z(`tipo`,`carro`),children:`Carros`}),(0,w.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":q.tipo===`imovel`,className:`lp-type-tab ${q.tipo===`imovel`?`active`:``}`,onClick:()=>Z(`tipo`,`imovel`),children:`Imóveis`})]})]}),(0,w.jsxs)(`div`,{className:`lp-search-form`,children:[q.tipo===`carro`?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,w.jsxs)(`select`,{id:`lp-marca`,value:q.marca,onChange:e=>Z(`marca`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Todas as marcas`}),b.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,w.jsxs)(`select`,{id:`lp-modelo`,value:q.modelo,onChange:e=>Z(`modelo`,e.target.value),disabled:!q.marca,children:[(0,w.jsx)(`option`,{value:``,children:q.marca?`Todos os modelos`:`Escolhe a marca`}),ie.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,w.jsxs)(`select`,{id:`lp-combustivel`,value:q.combustivel,onChange:e=>Z(`combustivel`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Todos`}),E.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,w.jsxs)(`select`,{id:`lp-preco`,value:q.precoMax,onChange:e=>Z(`precoMax`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Qualquer preço`}),k.slice(0,2).map(e=>(0,w.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,w.jsxs)(`select`,{id:`lp-tipologia`,value:q.tipologia,onChange:e=>Z(`tipologia`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Todas`}),O.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,w.jsxs)(`select`,{id:`lp-estate-preco`,value:q.precoMax,onChange:e=>Z(`precoMax`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Qualquer preço`}),k.slice(2).map(e=>(0,w.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,w.jsxs)(`div`,{className:`lp-field`,children:[(0,w.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,w.jsxs)(`select`,{id:`lp-distrito`,value:q.distrito,onChange:e=>Z(`distrito`,e.target.value),children:[(0,w.jsx)(`option`,{value:``,children:`Portugal inteiro`}),x.map(e=>(0,w.jsx)(`option`,{value:e,children:e},e))]})]}),(0,w.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]}),(0,w.jsxs)(`div`,{className:`lp-command-preview`,"aria-hidden":`true`,children:[(0,w.jsx)(`div`,{className:`lp-command-row`,children:(0,w.jsx)(`strong`,{children:q.tipo===`carro`?q.marca||`Carros em destaque`:q.tipologia||`Imóveis em destaque`})}),(0,w.jsx)(`div`,{className:`lp-command-row`,children:(0,w.jsx)(`strong`,{children:q.distrito||`Portugal inteiro`})}),(0,w.jsx)(`div`,{className:`lp-command-row`,children:(0,w.jsx)(`strong`,{children:q.precoMax?`Até ${Number(q.precoMax).toLocaleString(`pt-PT`)} €`:`Preço flexível`})})]})]})]})]}),(0,w.jsx)(`section`,{className:`lp-market-ticker`,"aria-label":`Atalhos de pesquisa populares`,children:(0,w.jsxs)(`div`,{className:`lp-market-track`,"aria-hidden":`true`,children:[(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Carros até 20.000 €`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`T2 no Porto`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`BMW em Lisboa`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Imóveis com garagem`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Diesel recentes`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Moradias em Braga`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Carros até 20.000 €`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`T2 no Porto`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`BMW em Lisboa`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Imóveis com garagem`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Diesel recentes`}),(0,w.jsx)(`span`,{className:`lp-market-item`,children:`Moradias em Braga`})]})}),(0,w.jsx)(`section`,{className:`lp-showcase-band`,"aria-labelledby":`lp-showcase-title`,children:(0,w.jsxs)(`div`,{className:`lp-shell lp-showcase-grid`,children:[(0,w.jsxs)(`div`,{className:`lp-showcase-copy lp-reveal`,children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Novo ritmo`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-showcase-title`,children:`Encontra carros e imóveis com menos passos.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Descobre anúncios reais, compara os detalhes importantes e avança para contacto sem percursos complicados.`}),(0,w.jsxs)(`div`,{className:`lp-showcase-kpis`,"aria-label":`Benefícios principais`,children:[(0,w.jsxs)(`div`,{className:`lp-showcase-kpi`,children:[(0,w.jsx)(`strong`,{children:`Rápido`}),(0,w.jsx)(`span`,{children:`Pesquisa direta`})]}),(0,w.jsxs)(`div`,{className:`lp-showcase-kpi`,children:[(0,w.jsx)(`strong`,{children:`Claro`}),(0,w.jsx)(`span`,{children:`Anúncios organizados`})]}),(0,w.jsxs)(`div`,{className:`lp-showcase-kpi`,children:[(0,w.jsx)(`strong`,{children:`Direto`}),(0,w.jsx)(`span`,{children:`Contacto simples`})]})]})]}),(0,w.jsxs)(`div`,{className:`lp-bento-grid`,"aria-label":`Funcionalidades da Noxvelia`,children:[(0,w.jsxs)(u,{className:`lp-bento-card lp-bento-main lp-reveal`,to:`/carros`,children:[(0,w.jsx)(`span`,{className:`lp-bento-kicker`,children:`Pesquisa inteligente`}),(0,w.jsx)(`strong`,{children:`Procura por marca, distrito, preço ou tipologia.`}),(0,w.jsx)(`p`,{children:`A primeira pesquisa já leva o visitante para resultados úteis, com filtros claros desde o início.`}),(0,w.jsxs)(`span`,{className:`lp-sparkline`,"aria-hidden":`true`,children:[(0,w.jsx)(`span`,{}),(0,w.jsx)(`span`,{}),(0,w.jsx)(`span`,{}),(0,w.jsx)(`span`,{}),(0,w.jsx)(`span`,{})]})]}),(0,w.jsxs)(u,{className:`lp-bento-card lp-bento-side lp-reveal lp-reveal-delay-1`,to:`/profissionais`,children:[(0,w.jsx)(`span`,{className:`lp-bento-kicker`,children:`Perfis`}),(0,w.jsx)(`strong`,{children:`Perfis de vendedores completos.`}),(0,w.jsx)(`p`,{children:`Bio, website e redes sociais ajudam o comprador a confiar antes do primeiro contacto.`}),(0,w.jsxs)(`span`,{className:`lp-bento-stat`,children:[(0,w.jsx)(`span`,{children:`Redes sociais`}),(0,w.jsx)(`span`,{children:`Bio`})]})]}),(0,w.jsxs)(u,{className:`lp-bento-card lp-bento-wide lp-reveal`,to:`/imoveis`,children:[(0,w.jsx)(`span`,{className:`lp-bento-kicker`,children:`Imóveis`}),(0,w.jsx)(`strong`,{children:`Imóveis com informação essencial à vista.`}),(0,w.jsx)(`p`,{children:`Tipologia, localização e preço aparecem cedo para acelerar a escolha.`}),(0,w.jsxs)(`span`,{className:`lp-bento-stat`,children:[(0,w.jsx)(`span`,{children:`T2`}),(0,w.jsx)(`span`,{children:`Lisboa`}),(0,w.jsx)(`span`,{children:`Garagem`})]})]}),(0,w.jsxs)(u,{className:`lp-bento-card lp-bento-wide lp-reveal lp-reveal-delay-1`,to:L,state:R,children:[(0,w.jsx)(`span`,{className:`lp-bento-kicker`,children:`Publicar`}),(0,w.jsx)(`strong`,{children:`Publicar fica simples e direto.`}),(0,w.jsx)(`p`,{children:`O vendedor entra no fluxo de anúncio sem distrações e com um caminho claro.`}),(0,w.jsxs)(`span`,{className:`lp-bento-stat`,children:[(0,w.jsx)(`span`,{children:`Grátis`}),(0,w.jsx)(`span`,{children:`Direto`})]})]})]})]})}),Y.length>0&&(0,w.jsx)(`section`,{className:`lp-metrics`,"aria-label":`Resumo da plataforma`,children:(0,w.jsx)(`div`,{className:`lp-shell lp-metrics-grid lp-reveal`,children:Y.map(e=>(0,w.jsxs)(`div`,{className:`lp-metric`,children:[(0,w.jsx)(`strong`,{children:j(e.value)}),(0,w.jsx)(`span`,{children:e.label})]},e.label))})}),(0,w.jsx)(`section`,{className:`lp-section lp-promo-section`,id:`anunciar`,"aria-label":`Explorar anúncios na Noxvelia`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,w.jsxs)(u,{className:`lp-promo-link lp-reveal`,to:`/carros`,children:[(0,w.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,w.jsx)(`span`,{className:`lp-promo-label`,children:`Carros`}),(0,w.jsx)(`strong`,{className:`lp-promo-title`,children:`Automóveis com dados fáceis de comparar.`}),(0,w.jsx)(`span`,{className:`lp-promo-text`,children:`Marca, modelo, quilómetros, combustível, preço e localização antes do contacto.`}),(0,w.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar carro`})]}),(0,w.jsx)(`span`,{className:`lp-promo-media`,children:(0,w.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`,loading:`lazy`})})]}),(0,w.jsxs)(u,{className:`lp-promo-link lp-reveal`,to:`/imoveis`,children:[(0,w.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,w.jsx)(`span`,{className:`lp-promo-label`,children:`Imóveis`}),(0,w.jsx)(`strong`,{className:`lp-promo-title`,children:`Casas, apartamentos e espaços para visitar melhor informado.`}),(0,w.jsx)(`span`,{className:`lp-promo-text`,children:`Compara fotografias, localização, tipologia, áreas e preço antes de marcar visita.`}),(0,w.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar imóvel`})]}),(0,w.jsx)(`span`,{className:`lp-promo-media`,children:(0,w.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`,loading:`lazy`})})]})]}),(0,w.jsxs)(`div`,{className:`lp-pro-strip`,children:[(0,w.jsx)(`span`,{children:J?`Profissionais`:`Anunciar`}),(0,w.jsx)(`strong`,{children:J?`Stands, mediadores e vendedores com anúncios disponíveis.`:`Publica o teu carro ou imóvel e recebe contactos diretamente.`}),(0,w.jsx)(u,{className:`lp-pro-cta`,to:J?`/profissionais`:L,state:J?void 0:R,children:J?`Ver profissionais`:`Publicar anúncio`})]})]})}),(0,w.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsx)(`div`,{className:`lp-section-head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:`Pesquisa por marca, sem voltar ao início.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Explora todas as marcas disponíveis ou usa o campo de marca na pesquisa principal.`})]})}),(0,w.jsx)(`div`,{className:`lp-brand-grid`,"aria-label":`Todas as marcas automóveis disponíveis`,children:b.map(e=>{let t=M(e);return(0,w.jsxs)(u,{className:`lp-brand-card lp-reveal`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,w.jsxs)(`span`,{className:`lp-brand-mark lp-brand-mark-${t} ${F.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,w.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:P(e)}),(0,w.jsx)(`img`,{src:N(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,w.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e)})})]})}),(0,w.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsx)(`div`,{className:`lp-section-head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Atalhos`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Entradas rápidas para pesquisas comuns.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Links diretos para marcas, modelos, distritos, combustíveis e tipologias populares.`})]})}),(0,w.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,w.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,w.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:te.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:X(`carro`,{marca:e}),children:e},e))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group wide lp-reveal`,children:[(0,w.jsx)(`h3`,{children:`Modelos rápidos`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:ne.map(([e,t])=>(0,w.jsxs)(u,{className:`lp-chip`,to:X(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,w.jsx)(`h3`,{children:`Combustíveis`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:E.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:X(`carro`,{combustivel:e}),children:e},e))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,w.jsx)(`h3`,{children:`Distritos`}),(0,w.jsx)(`div`,{className:`lp-chip-list`,children:D.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:X(`carro`,{distrito:e}),children:e},e))})]}),(0,w.jsxs)(`div`,{className:`lp-shortcut-group lp-reveal`,children:[(0,w.jsx)(`h3`,{children:`Imóveis`}),(0,w.jsxs)(`div`,{className:`lp-chip-list`,children:[O.map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:X(`imovel`,{tipologia:e}),children:e},e)),D.slice(0,4).map(e=>(0,w.jsx)(u,{className:`lp-chip`,to:X(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),se&&(0,w.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,w.jsxs)(`div`,{className:`lp-shell`,children:[(0,w.jsx)(`div`,{className:`lp-section-head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Seleção atual`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`Destaques recentes.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Anúncios de carros e imóveis prontos a explorar.`})]})}),(0,w.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(U||z.carro.length>0)&&(0,w.jsxs)(`div`,{className:`lp-example-column lp-reveal`,children:[(0,w.jsxs)(`div`,{className:`lp-column-top`,children:[(0,w.jsx)(`h3`,{className:`lp-column-title`,children:`Carros`}),(0,w.jsx)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>n(`/carros`),children:`Ver carros`})]}),(0,w.jsx)(`div`,{className:`lp-example-list`,children:z.carro.length>0?z.carro.map(e=>Q(e,`/carros`)):$(`carros`,`/carros`)})]}),(U||z.imovel.length>0)&&(0,w.jsxs)(`div`,{className:`lp-example-column lp-reveal`,children:[(0,w.jsxs)(`div`,{className:`lp-column-top`,children:[(0,w.jsx)(`h3`,{className:`lp-column-title`,children:`Imóveis`}),(0,w.jsx)(`button`,{type:`button`,className:`lp-link-button`,onClick:()=>n(`/imoveis`),children:`Ver imóveis`})]}),(0,w.jsx)(`div`,{className:`lp-example-list`,children:z.imovel.length>0?z.imovel.map(e=>Q(e,`/imoveis`)):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,w.jsx)(v,{placement:`landing_between_highlights`,minHeight:96}),(0,w.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,w.jsx)(`div`,{className:`lp-shell`,children:(0,w.jsxs)(`div`,{className:`lp-cv-card lp-reveal`,children:[(0,w.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,w.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,w.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro antes da visita.`}),(0,w.jsx)(`p`,{className:`lp-copy`,children:`Consulta histórico, quilometragem e registos disponíveis.`}),(0,w.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,w.jsx)(`li`,{children:`Histórico antes do contacto`}),(0,w.jsx)(`li`,{children:`Mais segurança na compra`})]}),(0,w.jsx)(`a`,{className:`lp-btn lp-btn-primary`,href:ee,target:`_blank`,rel:`noopener noreferrer`,children:`Verificar um veículo`})]}),(0,w.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,w.jsx)(`span`,{children:`Histórico automóvel com`}),(0,w.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,w.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,w.jsx)(`small`,{children:`Código`}),(0,w.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})}),(0,w.jsx)(a,{})]})}export{I as default};