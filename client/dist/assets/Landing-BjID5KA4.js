import{u as q,a as L,r as p,j as e,L as b,b as O,F as P,c as D}from"./index-B1n1uUR6.js";import{I as i,m as V,a as h,b as S,c as M,d as F,e as J,f as I,g as A,h as R}from"./mdi-xYj-u21I.js";function B(){var t,f;const{user:l,signed:c,logout:g}=q(),v=L(),[x,n]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{const o=u=>{d.current&&!d.current.contains(u.target)&&n(!1)};return window.addEventListener("click",o),()=>window.removeEventListener("click",o)},[]);const s=l||(()=>{try{const o=localStorage.getItem("@App:user");return o?JSON.parse(o):null}catch{return null}})(),m=(s==null?void 0:s.avatarUrl)||(s==null?void 0:s.avatar),a=((t=s==null?void 0:s.nome)==null?void 0:t.charAt(0).toUpperCase())||"U",r=((f=s==null?void 0:s.nome)==null?void 0:f.split(" ")[0])||"";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .nl-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 80px;
          padding: 0 32px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          font-family: 'Inter', sans-serif;
        }

        .nl-side { display: flex; align-items: center; height: 100%; }
        .nl-side.right { justify-content: flex-end; gap: 12px; position: relative; }

        .nl-logo {
          grid-column: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .nl-logo img {
          height: 38px;
          width: auto;
          object-fit: contain;
        }

        .nl-btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #0f172a;
          font-size: 13px; font-weight: 600;
          text-decoration: none;
          transition: all .2s ease;
        }
        .nl-btn-ghost:hover { background: #f8fafc; border-color: #94a3b8; }

        .nl-btn-solid {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 24px;
          border-radius: 999px;
          border: none;
          background: #0f172a;
          color: #ffffff;
          font-size: 13px; font-weight: 700;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .nl-btn-solid:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(15,23,42,0.15); }

        .nl-user-trigger {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 14px 4px 4px;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          cursor: pointer;
          transition: all .2s ease;
        }
        .nl-user-trigger:hover, .nl-user-trigger.active { background: #f8fafc; border-color: #cbd5e1; }

        .nl-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: #f1f5f9; border: 1px solid #e2e8f0; flex-shrink: 0;
        }
        .nl-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nl-avatar-initial { font-size: 12px; font-weight: 700; color: #0f172a; }
        .nl-username { font-size: 13px; font-weight: 600; color: #0f172a; }
        .nl-chevron { stroke: #64748b; }

        .nl-user-dropdown {
          position: absolute; top: calc(100% + 12px); right: 0;
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          width: 200px; padding: 8px; display: flex; flex-direction: column;
          z-index: 1020;
        }
        .nl-ud-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px;
          font-size: 13px; font-weight: 600; color: #475569;
          text-decoration: none; border: none; background: transparent;
          width: 100%; text-align: left; cursor: pointer; transition: all .2s;
        }
        .nl-ud-item:hover { background: #f8fafc; color: #0f172a; }
        .nl-ud-item svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .nl-ud-divider { height: 1px; background: #e2e8f0; margin: 6px 0; }
        .nl-ud-item.logout:hover { background: #fef2f2; color: #dc2626; }

        @media (max-width: 768px) {
          .nl-root { padding: 0 16px; height: 70px; }
          .nl-logo img { height: 32px; }
          .nl-actions { right: 16px; gap: 8px; }
          .nl-btn-ghost, .nl-btn-solid { padding: 8px 16px; font-size: 12px; }
          .nl-username { display: none; }
        }
      `}),e.jsxs("nav",{className:"nl-root",children:[e.jsx("div",{className:"nl-side left"}),e.jsx(b,{to:"/",className:"nl-logo",children:e.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA"})}),e.jsx("div",{className:"nl-side right",children:c?e.jsxs("div",{ref:d,style:{position:"relative"},children:[e.jsxs("button",{className:`nl-user-trigger ${x?"active":""}`,onClick:()=>n(!x),children:[e.jsx("div",{className:"nl-avatar",children:m?e.jsx("img",{src:m,alt:"Perfil"}):e.jsx("span",{className:"nl-avatar-initial",children:a})}),r&&e.jsx("span",{className:"nl-username",children:r}),e.jsx("svg",{className:"nl-chevron",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",children:e.jsx("path",{d:"M6 9l6 6 6-6"})})]}),x&&e.jsxs("div",{className:"nl-user-dropdown",onClick:o=>o.stopPropagation(),children:[e.jsxs(b,{to:"/perfil",onClick:()=>n(!1),className:"nl-ud-item",children:[e.jsxs("svg",{viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),"O Meu Perfil"]}),e.jsx("div",{className:"nl-ud-divider"}),e.jsxs("button",{onClick:()=>{n(!1),g()},className:"nl-ud-item logout",children:[e.jsxs("svg",{viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),e.jsx("polyline",{points:"16 17 21 12 16 7"}),e.jsx("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]}),"Terminar Sessão"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(b,{to:"/login",state:{from:v.pathname},className:"nl-btn-ghost",children:"Entrar"}),e.jsx(b,{to:"/registo",className:"nl-btn-solid",children:"Registar"})]})})]})]})}const $=l=>new Intl.NumberFormat("pt-PT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(l||0),H=[{tema:"Drive",titulo:"Histórico, quilómetros e manutenção pesam cada vez mais na decisão.",texto:"Antes de avançar para uma visita, os compradores procuram sinais simples de confiança: registos claros, fotos honestas e dados técnicos sem ruído."},{tema:"Estate",titulo:"Eficiência energética e localização continuam a marcar diferença.",texto:"Nos imóveis, a decisão começa muitas vezes pela zona, luz natural, transportes e custos previsíveis. Um anúncio bem estruturado encurta esse caminho."},{tema:"Mercado",titulo:"Bons anúncios contam uma história curta, concreta e verificável.",texto:"Preço, estado, contacto e prova visual devem aparecer cedo. Quanto menos fricção houver, maior a probabilidade de contacto qualificado."}];function Y(){const l=O(),[c,g]=p.useState({carro:[],imovel:[]}),[v,x]=p.useState(!0),[n,d]=p.useState(!1);p.useEffect(()=>{let a=!0;return(async()=>{try{const{data:t}=await D.get("/anuncios/em-alta/semana");if(!a)return;g({carro:((t==null?void 0:t.carro)||[]).slice(0,2),imovel:((t==null?void 0:t.imovel)||[]).slice(0,2)}),d(!1)}catch{a&&(g({carro:[],imovel:[]}),d(!0))}finally{a&&x(!1)}})(),()=>{a=!1}},[]);const j=(a,r)=>{localStorage.setItem("@App:contexto_visual",r==="/carros"?"carro":"imovel"),window.history.replaceState(window.history.state,"",r),l(`/anuncio/${a._id}`)},s=(a,r)=>{var u,w,N,y,k,z,E,C;const t=a.tipo==="carro",f=((u=a.fotos)==null?void 0:u[0])||((w=a.imagens)==null?void 0:w[0]),o=t?[((N=a.carro)==null?void 0:N.km)!=null?`${new Intl.NumberFormat("pt-PT").format(a.carro.km)} km`:null,(y=a.carro)==null?void 0:y.combustivel].filter(Boolean).join(" · "):[((k=a.imovel)==null?void 0:k.tipologia)||((z=a.imovel)==null?void 0:z.tipoImovel),(E=a.imovel)!=null&&E.area?`${a.imovel.area} m²`:null].filter(Boolean).join(" · ");return e.jsxs("button",{type:"button",className:`lp-example-card ${t?"drive":"estate"}`,onClick:()=>j(a,r),children:[e.jsxs("span",{className:"lp-example-img",children:[f?e.jsx("img",{src:f,alt:a.titulo,loading:"lazy"}):e.jsx("span",{className:"lp-example-no-photo",children:"Sem fotografia"}),e.jsxs("span",{className:"lp-example-weekly",children:[a.visitasSemana||0," visitas esta semana"]})]}),e.jsxs("span",{className:"lp-example-body",children:[e.jsx("span",{className:"lp-example-price",children:$(a.preco)}),e.jsx("span",{className:"lp-example-title",children:a.titulo}),e.jsxs("span",{className:"lp-example-meta",children:[e.jsx(i,{path:t?R:I,size:.58}),o||(t?"Dados técnicos visíveis":"Detalhes do imóvel")]}),e.jsxs("span",{className:"lp-example-location",children:[e.jsx(i,{path:A,size:.58}),((C=a.localizacao)==null?void 0:C.cidade)||"Portugal"]})]})]},a._id)},m=(a,r)=>v?e.jsx("div",{className:"lp-example-state",children:"A carregar os anúncios com mais interesse…"}):e.jsxs("div",{className:"lp-example-state",children:[e.jsx("strong",{children:n?"Não foi possível carregar esta seleção.":`Ainda não existem anúncios publicados em ${a}.`}),e.jsx("span",{children:n?"Podes explorar diretamente a pesquisa.":"Assim que forem publicados, aparecem aqui sem conteúdo fictício."}),e.jsxs("button",{type:"button",className:"lp-column-link",onClick:()=>l(r),children:["Explorar ",a," ",e.jsx(i,{path:h,size:.58})]})]});return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .lp-root {
          min-height: 100vh;
          background: #ffffff;
          color: #0f172a;
          font-family: 'Inter', sans-serif;
        }
        .lp-shell {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .lp-hero {
          padding: 70px 0 42px;
          background:
            radial-gradient(circle at 78% 18%, rgba(42,193,180,0.16), transparent 30%),
            linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(360px, 1fr);
          gap: 38px;
          align-items: center;
        }
        .lp-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #0f766e;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .1em;
          margin-bottom: 18px;
        }
        .lp-hero h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(43px, 7vw, 84px);
          line-height: .95;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-hero-copy {
          color: #475569;
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.65;
          max-width: 610px;
          margin: 22px 0 0;
        }
        .lp-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 30px;
        }
        .lp-btn {
          min-height: 52px;
          border-radius: 8px;
          border: 1px solid transparent;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-weight: 900;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          transition: transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-drive {
          background: #2ac1b4;
          color: #020617;
          box-shadow: 0 18px 36px -26px rgba(42,193,180,0.8);
        }
        .lp-btn-estate {
          background: #ffffff;
          color: #047857;
          border-color: #bbf7d0;
        }
        .lp-hero-media {
          position: relative;
          min-height: 430px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #dbeafe;
          box-shadow: 0 28px 70px -48px rgba(15,23,42,0.5);
          background: #e2e8f0;
        }
        .lp-hero-media img {
          width: 100%;
          height: 100%;
          min-height: 430px;
          display: block;
          object-fit: cover;
        }
        .lp-media-panel {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }
        .lp-media-chip {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 10px;
          padding: 11px 10px;
          color: #0f172a;
          min-width: 0;
        }
        .lp-media-chip strong {
          display: block;
          font-size: 13px;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 5px;
        }
        .lp-media-chip span {
          display: block;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .07em;
        }
        .lp-strip {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 24px;
        }
        .lp-strip-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 10px;
          padding: 14px;
          color: #334155;
          font-size: 13px;
          font-weight: 800;
        }
        .lp-strip-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #ccfbf1;
          color: #0f766e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .lp-section {
          padding: 66px 0;
        }
        .lp-section.alt {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 26px;
        }
        .lp-eyebrow {
          display: block;
          color: #0f766e;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 10px;
        }
        .lp-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(29px, 5vw, 48px);
          line-height: 1.05;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-copy {
          max-width: 640px;
          margin: 16px 0 0;
          color: #475569;
          line-height: 1.65;
          font-size: 15px;
        }
        .lp-examples-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .lp-example-column {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 22px 54px -44px rgba(15,23,42,0.45);
        }
        .lp-example-column.drive { border-top: 4px solid #2ac1b4; }
        .lp-example-column.estate { border-top: 4px solid #3ecf8e; }
        .lp-column-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }
        .lp-column-title {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 800;
        }
        .lp-column-link {
          border: none;
          background: transparent;
          color: #64748b;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .lp-example-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .lp-example-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
          color: inherit;
          display: flex;
          flex-direction: column;
          min-width: 0;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .lp-example-card:hover {
          transform: translateY(-3px);
          border-color: #cbd5e1;
          box-shadow: 0 18px 38px -28px rgba(15,23,42,0.5);
        }
        .lp-example-img {
          display: block;
          aspect-ratio: 16/10;
          background: #f1f5f9;
          overflow: hidden;
          position: relative;
        }
        .lp-example-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .lp-example-no-photo {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .lp-example-weekly {
          position: absolute;
          left: 9px;
          bottom: 9px;
          max-width: calc(100% - 18px);
          padding: 6px 8px;
          border-radius: 999px;
          background: rgba(15,23,42,.84);
          color: #ffffff;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .04em;
          backdrop-filter: blur(8px);
        }
        .lp-example-state {
          grid-column: 1 / -1;
          min-height: 190px;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          background: #f8fafc;
          padding: 26px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
        }
        .lp-example-state strong { color: #0f172a; font-size: 15px; }
        .lp-example-state .lp-column-link { padding: 7px 0; color: #0f766e; }
        .lp-example-body {
          display: grid;
          gap: 6px;
          padding: 13px;
        }
        .lp-example-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
        }
        .lp-example-title {
          color: #334155;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.35;
          min-height: 35px;
        }
        .lp-example-meta,
        .lp-example-location {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #64748b;
          font-size: 11.5px;
          font-weight: 700;
          min-width: 0;
        }
        .lp-carvertical {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 390px;
          gap: 34px;
          align-items: center;
        }
        .lp-carvertical-logo {
          min-height: 210px;
          border: 1px solid #dbeafe;
          background: #ffffff;
          border-radius: 14px;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-carvertical-logo img {
          width: min(100%, 330px);
          height: auto;
          display: block;
        }
        .lp-news-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .lp-news-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 18px 42px -36px rgba(15,23,42,0.45);
        }
        .lp-news-tag {
          width: fit-content;
          border-radius: 999px;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          color: #0f766e;
          padding: 5px 9px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .09em;
          margin-bottom: 16px;
        }
        .lp-news-card h3 {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          line-height: 1.25;
        }
        .lp-news-card p {
          margin: 12px 0 0;
          color: #475569;
          font-size: 13.5px;
          line-height: 1.65;
        }
        .lp-estate-band {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 24px;
          align-items: center;
          border: 1px solid #bbf7d0;
          border-radius: 14px;
          padding: 28px;
          background:
            linear-gradient(135deg, rgba(62,207,142,0.14), rgba(255,255,255,0.9)),
            #ffffff;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-estate-points {
          display: grid;
          gap: 10px;
        }
        .lp-estate-point {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #334155;
          font-size: 13px;
          font-weight: 800;
        }
        .lp-estate-point span {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #dcfce7;
          color: #047857;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 920px) {
          .lp-hero-grid,
          .lp-carvertical,
          .lp-examples-grid,
          .lp-estate-band { grid-template-columns: 1fr; }
          .lp-hero-media, .lp-hero-media img { min-height: 320px; }
          .lp-strip,
          .lp-news-grid { grid-template-columns: 1fr; }
          .lp-section-head { align-items: flex-start; flex-direction: column; }
        }
        @media (max-width: 650px) {
          .lp-shell { padding: 0 18px; }
          .lp-hero { padding: 48px 0 38px; }
          .lp-actions { flex-direction: column; }
          .lp-btn { width: 100%; }
          .lp-section { padding: 52px 0; }
          .lp-example-list { grid-template-columns: 1fr; }
          .lp-media-panel { grid-template-columns: 1fr; }
          .lp-hero h1 { font-size: clamp(40px, 14vw, 64px); }
        }
      `}),e.jsxs("div",{className:"lp-root",children:[e.jsx(B,{}),e.jsx("section",{className:"lp-hero",children:e.jsxs("div",{className:"lp-shell",children:[e.jsxs("div",{className:"lp-hero-grid",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"lp-kicker",children:[e.jsx(i,{path:V,size:.72})," NOXVELIA Drive"]}),e.jsx("h1",{children:"Carros com dados claros. Imóveis a um clique."}),e.jsx("p",{className:"lp-hero-copy",children:"O Drive é o ponto de partida: pesquisa rápida, anúncios limpos e histórico em destaque. O Estate mantém a mesma clareza para quem procura casa, sem complicar a experiência."}),e.jsxs("div",{className:"lp-actions",children:[e.jsxs("button",{className:"lp-btn lp-btn-drive",onClick:()=>l("/carros"),children:["Explorar Drive ",e.jsx(i,{path:h,size:.78})]}),e.jsxs("button",{className:"lp-btn lp-btn-estate",onClick:()=>l("/imoveis"),children:["Ver Estate ",e.jsx(i,{path:S,size:.78})]})]})]}),e.jsxs("div",{className:"lp-hero-media",children:[e.jsx("img",{src:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=86",alt:"NOXVELIA Drive"}),e.jsxs("div",{className:"lp-media-panel",children:[e.jsxs("div",{className:"lp-media-chip",children:[e.jsx("strong",{children:"Drive"}),e.jsx("span",{children:"Foco principal"})]}),e.jsxs("div",{className:"lp-media-chip",children:[e.jsx("strong",{children:"Estate"}),e.jsx("span",{children:"Imóveis filtrados"})]}),e.jsxs("div",{className:"lp-media-chip",children:[e.jsx("strong",{children:"Verificação"}),e.jsx("span",{children:"CarVertical"})]})]})]})]}),e.jsxs("div",{className:"lp-strip",children:[e.jsxs("div",{className:"lp-strip-item",children:[e.jsx("span",{className:"lp-strip-icon",children:e.jsx(i,{path:M,size:.78})}),"Cards com preço, vendedor e dados essenciais"]}),e.jsxs("div",{className:"lp-strip-item",children:[e.jsx("span",{className:"lp-strip-icon",children:e.jsx(i,{path:F,size:.78})}),"Histórico automóvel sempre visível no processo"]}),e.jsxs("div",{className:"lp-strip-item",children:[e.jsx("span",{className:"lp-strip-icon",children:e.jsx(i,{path:J,size:.78})}),"Pesquisa em grelha ou mapa, sem excesso visual"]})]})]})}),e.jsx("section",{className:"lp-section",children:e.jsxs("div",{className:"lp-shell",children:[e.jsx("div",{className:"lp-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"Mais vistos esta semana"}),e.jsx("h2",{className:"lp-title",children:"O que está a despertar mais interesse."}),e.jsx("p",{className:"lp-copy",children:"Até dois anúncios publicados e reais de cada área, ordenados pelas visitas dos últimos sete dias. A seleção atualiza-se automaticamente com o interesse dos visitantes."})]})}),e.jsxs("div",{className:"lp-examples-grid",children:[e.jsxs("div",{className:"lp-example-column drive",children:[e.jsxs("div",{className:"lp-column-top",children:[e.jsx("h3",{className:"lp-column-title",children:"Noxvelia Drive"}),e.jsxs("button",{className:"lp-column-link",onClick:()=>l("/carros"),children:["Ver carros ",e.jsx(i,{path:h,size:.58})]})]}),e.jsx("div",{className:"lp-example-list",children:c.carro.length>0?c.carro.map(a=>s(a,"/carros")):m("Drive","/carros")})]}),e.jsxs("div",{className:"lp-example-column estate",children:[e.jsxs("div",{className:"lp-column-top",children:[e.jsx("h3",{className:"lp-column-title",children:"Noxvelia Estate"}),e.jsxs("button",{className:"lp-column-link",onClick:()=>l("/imoveis"),children:["Ver imóveis ",e.jsx(i,{path:h,size:.58})]})]}),e.jsx("div",{className:"lp-example-list",children:c.imovel.length>0?c.imovel.map(a=>s(a,"/imoveis")):m("Estate","/imoveis")})]})]})]})}),e.jsx("section",{className:"lp-section alt",children:e.jsxs("div",{className:"lp-shell lp-carvertical",children:[e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"Parceria CarVertical"}),e.jsx("h2",{className:"lp-title",children:"Verifica o histórico do teu carro antes de comprar."}),e.jsx("p",{className:"lp-copy",children:"A NOXVELIA Drive dá destaque à verificação de histórico para ajudar a perceber quilometragem, acidentes, registos e sinais de risco antes do contacto ou da visita."})]}),e.jsx("div",{className:"lp-carvertical-logo",children:e.jsx("img",{src:"/carvertical-logo.png",alt:"CarVertical"})})]})}),e.jsx("section",{className:"lp-section",children:e.jsxs("div",{className:"lp-shell",children:[e.jsx("div",{className:"lp-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"Notícias e tendências"}),e.jsx("h2",{className:"lp-title",children:"O que interessa antes de comprar."})]})}),e.jsx("div",{className:"lp-news-grid",children:H.map(a=>e.jsxs("article",{className:"lp-news-card",children:[e.jsx("span",{className:"lp-news-tag",children:a.tema}),e.jsx("h3",{children:a.titulo}),e.jsx("p",{children:a.texto})]},a.titulo))})]})}),e.jsx("section",{className:"lp-section alt",children:e.jsx("div",{className:"lp-shell",children:e.jsxs("div",{className:"lp-estate-band",children:[e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"NOXVELIA Estate"}),e.jsx("h2",{className:"lp-title",children:"Mais Drive, sem deixar o Estate para trás."}),e.jsx("p",{className:"lp-copy",children:"O foco visual está no Drive, mas a procura por casa continua com uma experiência cuidada: localização, área, tipologia e contacto aparecem com a mesma prioridade."})]}),e.jsxs("div",{className:"lp-estate-points",children:[e.jsxs("div",{className:"lp-estate-point",children:[e.jsx("span",{children:e.jsx(i,{path:S,size:.72})}),"Imóveis com leitura rápida"]}),e.jsxs("div",{className:"lp-estate-point",children:[e.jsx("span",{children:e.jsx(i,{path:I,size:.72})}),"Área e tipologia em destaque"]}),e.jsxs("div",{className:"lp-estate-point",children:[e.jsx("span",{children:e.jsx(i,{path:A,size:.72})}),"Localização sempre visível"]}),e.jsxs("button",{className:"lp-btn lp-btn-estate",onClick:()=>l("/imoveis"),children:["Explorar Estate ",e.jsx(i,{path:h,size:.78})]})]})]})})}),e.jsx(P,{})]})]})}export{Y as default};
//# sourceMappingURL=Landing-BjID5KA4.js.map
