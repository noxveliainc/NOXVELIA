import{g as e,l as t,t as n,u as r,y as i}from"./jsx-runtime-On9Szgki.js";import{E as a,S as o,T as s,_ as c,f as l,p as u,w as d,y as f}from"./index-D7drDp8n.js";import{r as p}from"./seo-BmrZTbI5.js";import{t as m}from"./Seo-DhJJO7_e.js";import{t as h}from"./GoogleAdSlot-Dm7V1JRV.js";import{t as g}from"./SponsorBanner-CPzLdeoW.js";import{i as _,r as v,t as y}from"./localizacoes-CvOZjRrK.js";var b=i(e(),1),x=n();function S(){let{user:e,signed:n,logout:r}=d(),i=t(),[s,c]=(0,b.useState)(!1),[l,p]=(0,b.useState)(!1),m=(0,b.useRef)(null),h=(0,b.useRef)(null);(0,b.useEffect)(()=>{let e=e=>{m.current&&!m.current.contains(e.target)&&c(!1),h.current&&!h.current.contains(e.target)&&p(!1)},t=e=>{e.key===`Escape`&&(c(!1),p(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,b.useEffect)(()=>{c(!1),p(!1)},[i.pathname]);let g=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),_=g?.avatarUrl||g?.avatar,v=g?.nome?.charAt(0).toUpperCase()||`U`,y=g?.nome?.split(` `)[0]||``,S=n?`/publicar`:`/login`,C=n?void 0:o(i,`/`);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`style`,{children:`
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
      `}),(0,x.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:h,children:[(0,x.jsxs)(`div`,{className:`nl-inner`,children:[(0,x.jsxs)(a,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,x.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,x.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,x.jsxs)(`div`,{className:`nl-links`,children:[(0,x.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,x.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,x.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,x.jsx)(`a`,{href:`#destaques`,children:`Em destaque`}),(0,x.jsx)(`a`,{href:`#guias`,children:`Guias`})]}),(0,x.jsxs)(`div`,{className:`nl-actions`,children:[(0,x.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{c(!1),p(e=>!e)},"aria-expanded":l,"aria-controls":`nl-mobile-menu`,"aria-label":l?`Fechar navegação`:`Abrir navegação`,children:l?(0,x.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,x.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,x.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,x.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,x.jsx)(u,{}),(0,x.jsx)(f,{}),(0,x.jsx)(a,{to:S,state:C,className:`nl-btn-solid`,children:`Anunciar grátis`}),n?(0,x.jsxs)(`div`,{ref:m,className:`nl-user-wrap`,children:[(0,x.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${s?`active`:``}`,onClick:()=>{p(!1),c(e=>!e)},"aria-expanded":s,"aria-label":`Abrir menu de utilizador`,children:[(0,x.jsx)(`span`,{className:`nl-avatar`,children:_?(0,x.jsx)(`img`,{src:_,alt:``}):(0,x.jsx)(`span`,{className:`nl-avatar-initial`,children:v})}),y&&(0,x.jsx)(`span`,{className:`nl-username`,children:y}),(0,x.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,x.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),s&&(0,x.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,x.jsxs)(a,{to:`/perfil`,onClick:()=>c(!1),className:`nl-ud-item`,children:[(0,x.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,x.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,x.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,x.jsx)(`div`,{className:`nl-ud-divider`}),(0,x.jsxs)(`button`,{type:`button`,onClick:()=>{c(!1),r()},className:`nl-ud-item logout`,children:[(0,x.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,x.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,x.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,x.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(a,{to:`/login`,state:{from:i.pathname},className:`nl-btn-ghost`,children:`Entrar`})})]})]}),l&&(0,x.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,x.jsx)(`a`,{href:`#pesquisa`,onClick:()=>p(!1),children:`Pesquisar`}),(0,x.jsx)(`a`,{href:`#anunciar`,onClick:()=>p(!1),children:`Anunciar grátis`}),(0,x.jsx)(`a`,{href:`#atalhos`,onClick:()=>p(!1),children:`Atalhos`}),(0,x.jsx)(`a`,{href:`#destaques`,onClick:()=>p(!1),children:`Em destaque`}),(0,x.jsx)(`a`,{href:`#guias`,onClick:()=>p(!1),children:`Guias`}),(0,x.jsx)(a,{to:`/carros`,onClick:()=>p(!1),children:`Drive`}),(0,x.jsx)(a,{to:`/imoveis`,onClick:()=>p(!1),children:`Estate`}),(0,x.jsx)(a,{to:S,state:C,onClick:()=>p(!1),children:`Publicar anúncio`}),n?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{to:`/perfil`,onClick:()=>p(!1),children:`O meu perfil`}),(0,x.jsx)(`button`,{type:`button`,onClick:()=>{p(!1),r()},children:`Terminar sessão`})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{to:`/login`,state:{from:i.pathname},onClick:()=>p(!1),children:`Entrar`}),(0,x.jsx)(a,{to:`/registo`,onClick:()=>p(!1),children:`Registar`})]})]})]})]})}var C=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,w=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],T=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],E=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],D=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],O=[`T1`,`T2`,`T3`,`T4`,`T5+`],k=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],A=[{tema:`Comprar melhor`,titulo:`Antes de contactar, confirma o essencial.`,texto:`Preço, localização, fotografias, histórico e detalhes técnicos ajudam a evitar visitas perdidas.`},{tema:`Vender mais rápido`,titulo:`Um bom anúncio começa em imagens claras.`,texto:`Mostra exterior, interior, pontos fortes e informação concreta para receber contactos mais preparados.`},{tema:`Guardar oportunidades`,titulo:`Favoritos tornam a pesquisa menos confusa.`,texto:`Guarda anúncios interessantes e compara depois com calma quando estiveres com sessão iniciada.`}],j=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),M=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),N=e=>`/marcas/${M(e)}.${e===`Jaecoo`?`svg`:`png`}`,P={arrow:`M5 12h14m-6-6 6 6-6 6`,car:`M4 15v-3l2-5h12l2 5v3M6 15h12M7 18h.01M17 18h.01`,check:`M5 12l4 4L19 6`,estate:`M4 11l8-6 8 6v8H4v-8zM9 19v-5h6v5`,fuel:`M7 20V5h7v15M7 9h7m3-1 2 2v7a2 2 0 0 1-2 2h-1`,location:`M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z`,open:`M8 8h8v8M16 8 7 17M5 5h14v14H5z`,plus:`M12 5v14M5 12h14`,shield:`M12 3l7 3v5c0 5-3.1 8.3-7 10-3.9-1.7-7-5-7-10V6l7-3zm-3 9 2 2 4-5`,area:`M5 5h14v14H5zM9 5v14M5 9h14`,left:`M15 6l-6 6 6 6`,right:`M9 6l6 6-6 6`};function F({name:e,size:t=16}){return(0,x.jsx)(`svg`,{className:`lp-svg-icon`,width:t,height:t,viewBox:`0 0 24 24`,"aria-hidden":`true`,focusable:`false`,children:(0,x.jsx)(`path`,{d:P[e]})})}var I=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase();function L(){let e=r(),n=t(),{signed:i}=d(),u=(0,b.useRef)(null),f=i?`/publicar`:`/login`,M=i?void 0:o(n,`/`),[P,L]=(0,b.useState)({carro:[],imovel:[]}),[R,z]=(0,b.useState)(!0),[B,V]=(0,b.useState)(!1),[H,U]=(0,b.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``}),W=H.tipo===`carro`&&H.marca?_(H.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],G=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},K=(e,t)=>{U(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},q=t=>{t.preventDefault();let{tipo:n,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=H,l={distrito:s,precoMax:c,...n===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};e(G(n,l))};(0,b.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await s.get(`/anuncios/em-alta/semana`);if(!e)return;L({carro:(t?.carro||[]).slice(0,2),imovel:(t?.imovel||[]).slice(0,2)}),V(!1)}catch{e&&(L({carro:[],imovel:[]}),V(!0))}finally{e&&z(!1)}})(),()=>{e=!1}},[]);let J=(t,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}e(p(t))},Y=e=>{u.current?.scrollBy({left:e*Math.min(720,window.innerWidth*.72),behavior:`smooth`})},X=(e,t)=>{let n=e.tipo===`carro`,r=c(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,x.jsxs)(`button`,{type:`button`,className:`lp-example-card ${n?`drive`:`estate`}`,onClick:()=>J(e,t),children:[(0,x.jsxs)(`span`,{className:`lp-example-img`,children:[r?(0,x.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,x.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`}),(0,x.jsxs)(`span`,{className:`lp-example-weekly`,children:[e.visitasSemana||0,` visitas esta semana`]})]}),(0,x.jsxs)(`span`,{className:`lp-example-body`,children:[(0,x.jsx)(`span`,{className:`lp-example-price`,children:j(e.preco)}),(0,x.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,x.jsxs)(`span`,{className:`lp-example-meta`,children:[(0,x.jsx)(F,{name:n?`fuel`:`area`,size:14}),i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)]}),(0,x.jsxs)(`span`,{className:`lp-example-location`,children:[(0,x.jsx)(F,{name:`location`,size:14}),e.localizacao?.cidade||`Portugal`]})]})]},e._id)},Z=(t,n)=>R?(0,x.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,x.jsx)(`span`,{className:`lp-state-loader`,"aria-hidden":`true`}),(0,x.jsx)(`strong`,{children:`A selecionar os anúncios com mais interesse.`}),(0,x.jsx)(`span`,{children:`Os destaques refletem as visitas dos últimos sete dias.`})]}):(0,x.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,x.jsx)(`strong`,{children:B?`A seleção semanal está a ser atualizada.`:`Descobre todas as oportunidades em ${t}.`}),(0,x.jsx)(`span`,{children:B?`Entretanto, encontra todos os anúncios na pesquisa completa.`:`Explora a pesquisa e encontra o que combina contigo.`}),(0,x.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(n),children:[`Explorar `,t,` `,(0,x.jsx)(F,{name:`arrow`,size:14})]})]});return(0,x.jsxs)(`div`,{className:`lp-root`,children:[(0,x.jsx)(m,{title:`Noxvelia | Carros e imóveis em Portugal`,description:`Encontra, compara e publica anúncios de carros e imóveis em Portugal na Noxvelia.`,path:`/`,jsonLd:[{"@context":`https://schema.org`,"@type":`Organization`,name:`Noxvelia`,url:`https://www.noxvelia.com`,logo:`https://www.noxvelia.com/logo-noxvelia.png`},{"@context":`https://schema.org`,"@type":`WebSite`,name:`Noxvelia`,url:`https://www.noxvelia.com`}]}),(0,x.jsx)(`style`,{children:`
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
          backdrop-filter: none;
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
          grid-template-columns: minmax(300px, 0.95fr) minmax(280px, 1.05fr);
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

        .lp-svg-icon {
          flex: 0 0 auto;
          display: inline-block;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
          vertical-align: middle;
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

        .lp-trust-icon,
        .lp-column-icon {
          border-radius: var(--lp-radius-soft) !important;
          background: var(--lp-surface-soft) !important;
        }

        .drive .lp-column-icon,
        .estate .lp-column-icon,
        .lp-trust-icon {
          color: var(--lp-drive) !important;
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
        }
      `}),(0,x.jsx)(S,{}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:(0,x.jsxs)(`div`,{className:`lp-shell`,children:[(0,x.jsxs)(`div`,{className:`lp-hero-card`,children:[(0,x.jsxs)(`div`,{className:`lp-hero-content`,children:[(0,x.jsxs)(`span`,{className:`lp-kicker`,children:[(0,x.jsx)(F,{name:`check`,size:15}),` O teu próximo passo começa aqui`]}),(0,x.jsxs)(`h1`,{id:`lp-hero-title`,children:[`O próximo carro. `,(0,x.jsx)(`span`,{children:`A próxima casa.`}),` Uma escolha mais clara.`]}),(0,x.jsx)(`p`,{className:`lp-hero-copy`,children:`Carros e imóveis reunidos numa experiência simples, cuidada e feita para encontrares o que procuras com confiança.`}),(0,x.jsxs)(`div`,{className:`lp-actions`,children:[(0,x.jsxs)(a,{className:`lp-btn lp-btn-drive`,to:`/carros`,children:[`Descobrir carros `,(0,x.jsx)(F,{name:`arrow`,size:17})]}),(0,x.jsxs)(a,{className:`lp-btn lp-btn-estate`,to:`/imoveis`,children:[`Explorar imóveis `,(0,x.jsx)(F,{name:`estate`,size:17})]})]})]}),(0,x.jsxs)(`div`,{className:`lp-hero-media`,children:[(0,x.jsx)(`img`,{src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`}),(0,x.jsxs)(`div`,{className:`lp-hero-photo-label`,"aria-hidden":`true`,children:[`Drive `,(0,x.jsx)(`i`,{}),` Estate`]})]})]}),(0,x.jsxs)(`div`,{className:`lp-trust-bar`,"aria-label":`Vantagens da Noxvelia`,children:[(0,x.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,x.jsx)(`span`,{className:`lp-trust-icon`,children:(0,x.jsx)(F,{name:`check`,size:16})}),`Anúncios reais, organizados para decidir melhor`]}),(0,x.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,x.jsx)(`span`,{className:`lp-trust-icon`,children:(0,x.jsx)(F,{name:`location`,size:16})}),`Pesquisa em lista ou mapa em todo o país`]}),(0,x.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,x.jsx)(`span`,{className:`lp-trust-icon`,children:(0,x.jsx)(F,{name:`shield`,size:16})}),`Mais contexto antes de cada contacto`]})]})]})}),(0,x.jsx)(`section`,{className:`lp-quick-section`,id:`pesquisa`,"aria-labelledby":`lp-quick-title`,children:(0,x.jsx)(`div`,{className:`lp-shell`,children:(0,x.jsxs)(`form`,{className:`lp-quick-card`,onSubmit:q,children:[(0,x.jsxs)(`div`,{className:`lp-quick-top`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa rápida`}),(0,x.jsx)(`h2`,{className:`lp-quick-title`,id:`lp-quick-title`,children:`Entra logo nos anúncios certos.`})]}),(0,x.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,x.jsxs)(`button`,{type:`button`,className:`lp-type-tab ${H.tipo===`carro`?`active`:``}`,onClick:()=>K(`tipo`,`carro`),children:[(0,x.jsx)(F,{name:`car`,size:15}),` Drive`]}),(0,x.jsxs)(`button`,{type:`button`,className:`lp-type-tab ${H.tipo===`imovel`?`active`:``}`,onClick:()=>K(`tipo`,`imovel`),children:[(0,x.jsx)(F,{name:`estate`,size:15}),` Estate`]})]})]}),(0,x.jsxs)(`div`,{className:`lp-search-form`,children:[H.tipo===`carro`?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(`div`,{className:`lp-field`,children:[(0,x.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,x.jsxs)(`select`,{id:`lp-marca`,value:H.marca,onChange:e=>K(`marca`,e.target.value),children:[(0,x.jsx)(`option`,{value:``,children:`Todas as marcas`}),v.map(e=>(0,x.jsx)(`option`,{value:e,children:e},e))]})]}),(0,x.jsxs)(`div`,{className:`lp-field`,children:[(0,x.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,x.jsxs)(`select`,{id:`lp-modelo`,value:H.modelo,onChange:e=>K(`modelo`,e.target.value),disabled:!H.marca,children:[(0,x.jsx)(`option`,{value:``,children:H.marca?`Todos os modelos`:`Escolhe a marca`}),W.map(e=>(0,x.jsx)(`option`,{value:e,children:e},e))]})]}),(0,x.jsxs)(`div`,{className:`lp-field`,children:[(0,x.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,x.jsxs)(`select`,{id:`lp-combustivel`,value:H.combustivel,onChange:e=>K(`combustivel`,e.target.value),children:[(0,x.jsx)(`option`,{value:``,children:`Todos`}),E.map(e=>(0,x.jsx)(`option`,{value:e,children:e},e))]})]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(`div`,{className:`lp-field`,children:[(0,x.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,x.jsxs)(`select`,{id:`lp-tipologia`,value:H.tipologia,onChange:e=>K(`tipologia`,e.target.value),children:[(0,x.jsx)(`option`,{value:``,children:`Todas`}),O.map(e=>(0,x.jsx)(`option`,{value:e,children:e},e))]})]}),(0,x.jsxs)(`div`,{className:`lp-field`,children:[(0,x.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,x.jsxs)(`select`,{id:`lp-estate-preco`,value:H.precoMax,onChange:e=>K(`precoMax`,e.target.value),children:[(0,x.jsx)(`option`,{value:``,children:`Qualquer preço`}),k.slice(2).map(e=>(0,x.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,x.jsxs)(`div`,{className:`lp-field`,children:[(0,x.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,x.jsxs)(`select`,{id:`lp-distrito`,value:H.distrito,onChange:e=>K(`distrito`,e.target.value),children:[(0,x.jsx)(`option`,{value:``,children:`Portugal inteiro`}),y.map(e=>(0,x.jsx)(`option`,{value:e,children:e},e))]})]}),H.tipo===`carro`&&(0,x.jsxs)(`div`,{className:`lp-field`,children:[(0,x.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,x.jsxs)(`select`,{id:`lp-preco`,value:H.precoMax,onChange:e=>K(`precoMax`,e.target.value),children:[(0,x.jsx)(`option`,{value:``,children:`Qualquer preço`}),k.slice(0,2).map(e=>(0,x.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,x.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]})]})})}),(0,x.jsx)(`section`,{className:`lp-promo-section`,id:`anunciar`,"aria-label":`Anunciar grátis na Noxvelia`,children:(0,x.jsx)(`div`,{className:`lp-shell`,children:(0,x.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,x.jsxs)(a,{className:`lp-promo-link drive`,to:f,state:M,children:[(0,x.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,x.jsx)(`span`,{className:`lp-promo-label`,children:`NOXVELIA Drive`}),(0,x.jsxs)(`strong`,{className:`lp-promo-title`,children:[`Carros bem apresentados. `,(0,x.jsx)(`span`,{children:`Contactos mais certos.`})]}),(0,x.jsx)(`span`,{className:`lp-promo-text`,children:`Publica grátis, organiza os detalhes e mostra o essencial a quem já procura.`}),(0,x.jsxs)(`span`,{className:`lp-promo-overlay`,children:[`Publicar carro `,(0,x.jsx)(F,{name:`arrow`,size:15})]})]}),(0,x.jsx)(`span`,{className:`lp-promo-media`,children:(0,x.jsx)(`img`,{src:`/social/noxvelia-drive-photo.webp`,alt:`Automóvel anunciado na Noxvelia Drive`,loading:`lazy`})})]}),(0,x.jsxs)(a,{className:`lp-promo-link estate`,to:f,state:M,children:[(0,x.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,x.jsx)(`span`,{className:`lp-promo-label`,children:`NOXVELIA Estate`}),(0,x.jsxs)(`strong`,{className:`lp-promo-title`,children:[`Imóveis com melhor presença. `,(0,x.jsx)(`span`,{children:`Menos ruído, mais contactos.`})]}),(0,x.jsx)(`span`,{className:`lp-promo-text`,children:`Apresenta fotografias, localização e informação clara para interessados reais.`}),(0,x.jsxs)(`span`,{className:`lp-promo-overlay`,children:[`Publicar imóvel `,(0,x.jsx)(F,{name:`arrow`,size:15})]})]}),(0,x.jsx)(`span`,{className:`lp-promo-media`,children:(0,x.jsx)(`img`,{src:`/social/noxvelia-estate-photo.webp`,alt:`Imóvel anunciado na Noxvelia Estate`,loading:`lazy`})})]})]})})}),(0,x.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,x.jsxs)(`div`,{className:`lp-shell`,children:[(0,x.jsxs)(`div`,{className:`lp-section-head`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{className:`lp-eyebrow`,children:`As nossas marcas`}),(0,x.jsxs)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:[v.length,` marcas. Uma pesquisa para encontrares a tua.`]}),(0,x.jsx)(`p`,{className:`lp-copy`,children:`Dos clássicos de sempre às novas referências elétricas, escolhe uma marca e entra diretamente nos anúncios disponíveis.`})]}),(0,x.jsxs)(`div`,{className:`lp-brand-controls`,"aria-label":`Navegar pelas marcas`,children:[(0,x.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>Y(-1),"aria-label":`Ver marcas anteriores`,children:(0,x.jsx)(F,{name:`left`,size:18})}),(0,x.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>Y(1),"aria-label":`Ver marcas seguintes`,children:(0,x.jsx)(F,{name:`right`,size:18})})]})]}),(0,x.jsx)(`div`,{className:`lp-brand-scroll`,ref:u,"aria-label":`Lista de marcas automóveis`,children:(0,x.jsx)(`div`,{className:`lp-brand-grid`,children:v.map(e=>(0,x.jsxs)(a,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,x.jsxs)(`span`,{className:`lp-brand-mark`,children:[(0,x.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:I(e)}),(0,x.jsx)(`img`,{src:N(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`}})]}),(0,x.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e))})})]})}),(0,x.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,x.jsxs)(`div`,{className:`lp-shell`,children:[(0,x.jsx)(`div`,{className:`lp-section-head`,children:(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{className:`lp-eyebrow`,children:`Atalhos populares`}),(0,x.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Chega mais depressa ao que muita gente procura.`}),(0,x.jsx)(`p`,{className:`lp-copy`,children:`Marcas, modelos, combustíveis, distritos e tipologias reunidos para reduzir passos entre a intenção e o anúncio certo.`})]})}),(0,x.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,x.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,x.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,x.jsx)(`div`,{className:`lp-chip-list`,children:w.map(e=>(0,x.jsx)(a,{className:`lp-chip`,to:G(`carro`,{marca:e}),children:e},e))})]}),(0,x.jsxs)(`div`,{className:`lp-shortcut-group wide`,children:[(0,x.jsx)(`h3`,{children:`Modelos rápidos`}),(0,x.jsx)(`div`,{className:`lp-chip-list`,children:T.map(([e,t])=>(0,x.jsxs)(a,{className:`lp-chip`,to:G(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,x.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,x.jsx)(`h3`,{children:`Combustíveis`}),(0,x.jsx)(`div`,{className:`lp-chip-list`,children:E.map(e=>(0,x.jsx)(a,{className:`lp-chip`,to:G(`carro`,{combustivel:e}),children:e},e))})]}),(0,x.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,x.jsx)(`h3`,{children:`Distritos`}),(0,x.jsx)(`div`,{className:`lp-chip-list`,children:D.map(e=>(0,x.jsx)(a,{className:`lp-chip`,to:G(`carro`,{distrito:e}),children:e},e))})]}),(0,x.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,x.jsx)(`h3`,{children:`Imóveis`}),(0,x.jsxs)(`div`,{className:`lp-chip-list`,children:[O.map(e=>(0,x.jsx)(a,{className:`lp-chip`,to:G(`imovel`,{tipologia:e}),children:e},e)),D.slice(0,4).map(e=>(0,x.jsx)(a,{className:`lp-chip`,to:G(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),(0,x.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,x.jsxs)(`div`,{className:`lp-shell`,children:[(0,x.jsx)(`div`,{className:`lp-section-head`,children:(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{className:`lp-eyebrow`,children:`Mais vistos esta semana`}),(0,x.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`O que está a captar mais atenção agora.`}),(0,x.jsx)(`p`,{className:`lp-copy`,children:`Os anúncios com mais visitas nos últimos sete dias, com um máximo de dois destaques por área.`})]})}),(0,x.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(0,x.jsxs)(`div`,{className:`lp-example-column drive`,children:[(0,x.jsxs)(`div`,{className:`lp-column-top`,children:[(0,x.jsxs)(`div`,{className:`lp-column-heading`,children:[(0,x.jsx)(`span`,{className:`lp-column-icon`,children:(0,x.jsx)(F,{name:`car`,size:17})}),(0,x.jsx)(`h3`,{className:`lp-column-title`,children:`NOXVELIA Drive`})]}),(0,x.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(`/carros`),children:[`Ver carros `,(0,x.jsx)(F,{name:`arrow`,size:14})]})]}),(0,x.jsx)(`div`,{className:`lp-example-list`,children:P.carro.length>0?P.carro.map(e=>X(e,`/carros`)):Z(`Drive`,`/carros`)})]}),(0,x.jsxs)(`div`,{className:`lp-example-column estate`,children:[(0,x.jsxs)(`div`,{className:`lp-column-top`,children:[(0,x.jsxs)(`div`,{className:`lp-column-heading`,children:[(0,x.jsx)(`span`,{className:`lp-column-icon`,children:(0,x.jsx)(F,{name:`estate`,size:17})}),(0,x.jsx)(`h3`,{className:`lp-column-title`,children:`NOXVELIA Estate`})]}),(0,x.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>e(`/imoveis`),children:[`Ver imóveis `,(0,x.jsx)(F,{name:`arrow`,size:14})]})]}),(0,x.jsx)(`div`,{className:`lp-example-list`,children:P.imovel.length>0?P.imovel.map(e=>X(e,`/imoveis`)):Z(`Estate`,`/imoveis`)})]})]})]})}),(0,x.jsx)(`section`,{className:`lp-section lp-guides-section`,id:`guias`,"aria-labelledby":`lp-guides-title`,children:(0,x.jsxs)(`div`,{className:`lp-shell`,children:[(0,x.jsx)(`div`,{className:`lp-section-head`,children:(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{className:`lp-eyebrow`,children:`Guias rápidos`}),(0,x.jsx)(`h2`,{className:`lp-title`,id:`lp-guides-title`,children:`Conteúdo útil antes do contacto.`}),(0,x.jsx)(`p`,{className:`lp-copy`,children:`A página ganha uma área editorial leve para apoiar quem compra, vende ou guarda anúncios para decidir depois.`})]})}),(0,x.jsx)(`div`,{className:`lp-guides-grid`,children:A.map(e=>(0,x.jsxs)(`article`,{className:`lp-guide-card`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{children:e.tema}),(0,x.jsx)(`h3`,{children:e.titulo}),(0,x.jsx)(`p`,{children:e.texto})]}),(0,x.jsxs)(a,{className:`lp-column-link`,to:e.tema===`Guardar oportunidades`?`/favoritos`:`/carros`,children:[`Continuar `,(0,x.jsx)(F,{name:`arrow`,size:14})]})]},e.titulo))}),(0,x.jsxs)(`div`,{className:`lp-favorites-strip`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h3`,{children:`Guarda favoritos e volta quando quiseres.`}),(0,x.jsx)(`p`,{children:`Com sessão iniciada podes guardar anúncios, comparar opções e continuar a pesquisa mais tarde sem perder oportunidades.`})]}),(0,x.jsxs)(`div`,{className:`lp-actions`,children:[(0,x.jsxs)(a,{className:`lp-btn lp-btn-drive`,to:`/favoritos`,children:[`Ver favoritos `,(0,x.jsx)(F,{name:`arrow`,size:16})]}),(0,x.jsx)(a,{className:`lp-btn lp-btn-estate`,to:`/registo`,children:`Criar conta`})]})]})]})}),(0,x.jsx)(g,{placement:`landing_between_highlights`,vertical:`all`,fallback:(0,x.jsx)(h,{placement:`landing_between_highlights`,minHeight:96})}),(0,x.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,x.jsx)(`div`,{className:`lp-shell`,children:(0,x.jsxs)(`div`,{className:`lp-cv-card`,children:[(0,x.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,x.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,x.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro para lá das fotografias.`}),(0,x.jsx)(`p`,{className:`lp-copy`,children:`Consulta os registos disponíveis sobre quilometragem, danos, roubos e utilização anterior antes de marcares uma visita.`}),(0,x.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,x.jsxs)(`li`,{children:[(0,x.jsx)(F,{name:`check`,size:15}),` Mais contexto sobre o veículo`]}),(0,x.jsxs)(`li`,{children:[(0,x.jsx)(F,{name:`check`,size:15}),` Decisões com melhor informação`]})]}),(0,x.jsxs)(`a`,{className:`lp-btn lp-btn-drive`,href:C,target:`_blank`,rel:`noopener noreferrer`,children:[`Verificar um veículo `,(0,x.jsx)(F,{name:`open`,size:16})]})]}),(0,x.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,x.jsx)(`span`,{children:`Histórico automóvel com`}),(0,x.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,x.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,x.jsx)(`small`,{children:`Código`}),(0,x.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})}),(0,x.jsx)(`section`,{className:`lp-closing-section`,"aria-labelledby":`lp-closing-title`,children:(0,x.jsx)(`div`,{className:`lp-shell`,children:(0,x.jsxs)(`div`,{className:`lp-closing-card`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{className:`lp-eyebrow`,children:`Comprar, vender, arrendar`}),(0,x.jsx)(`h2`,{className:`lp-title`,id:`lp-closing-title`,children:`O lugar certo para encontrar e ser encontrado.`}),(0,x.jsx)(`p`,{className:`lp-copy`,children:`Publica o teu carro ou imóvel e apresenta-o a quem já está à procura da próxima escolha.`})]}),(0,x.jsxs)(`div`,{className:`lp-closing-actions`,children:[(0,x.jsxs)(a,{className:`lp-btn lp-btn-drive`,to:f,state:M,children:[(0,x.jsx)(F,{name:`plus`,size:17}),` Publicar anúncio`]}),(0,x.jsxs)(a,{className:`lp-btn lp-btn-estate`,to:`/carros`,children:[`Explorar Drive `,(0,x.jsx)(F,{name:`arrow`,size:16})]})]})]})})})]}),(0,x.jsx)(l,{})]})}export{L as default};