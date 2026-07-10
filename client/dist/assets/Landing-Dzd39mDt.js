import{u as k,a as y,r as c,j as e,L as n,b as N,F as z}from"./index-CSt87IlI.js";import{I as r,m as C,a as d,b as x,c as b,d as E,e as P,f as I}from"./mdi-BSZVeaFy.js";function L(){var m,f;const{user:l,signed:a,logout:u}=k(),v=y(),[t,o]=c.useState(!1),p=c.useRef(null);c.useEffect(()=>{const s=w=>{p.current&&!p.current.contains(w.target)&&o(!1)};return window.addEventListener("click",s),()=>window.removeEventListener("click",s)},[]);const i=l||(()=>{try{const s=localStorage.getItem("@App:user");return s?JSON.parse(s):null}catch{return null}})(),g=(i==null?void 0:i.avatarUrl)||(i==null?void 0:i.avatar),j=((m=i==null?void 0:i.nome)==null?void 0:m.charAt(0).toUpperCase())||"U",h=((f=i==null?void 0:i.nome)==null?void 0:f.split(" ")[0])||"";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsxs("nav",{className:"nl-root",children:[e.jsx("div",{className:"nl-side left"}),e.jsx(n,{to:"/",className:"nl-logo",children:e.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA"})}),e.jsx("div",{className:"nl-side right",children:a?e.jsxs("div",{ref:p,style:{position:"relative"},children:[e.jsxs("button",{className:`nl-user-trigger ${t?"active":""}`,onClick:()=>o(!t),children:[e.jsx("div",{className:"nl-avatar",children:g?e.jsx("img",{src:g,alt:"Perfil"}):e.jsx("span",{className:"nl-avatar-initial",children:j})}),h&&e.jsx("span",{className:"nl-username",children:h}),e.jsx("svg",{className:"nl-chevron",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",children:e.jsx("path",{d:"M6 9l6 6 6-6"})})]}),t&&e.jsxs("div",{className:"nl-user-dropdown",onClick:s=>s.stopPropagation(),children:[e.jsxs(n,{to:"/perfil",onClick:()=>o(!1),className:"nl-ud-item",children:[e.jsxs("svg",{viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),"O Meu Perfil"]}),e.jsx("div",{className:"nl-ud-divider"}),e.jsxs("button",{onClick:()=>{o(!1),u()},className:"nl-ud-item logout",children:[e.jsxs("svg",{viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),e.jsx("polyline",{points:"16 17 21 12 16 7"}),e.jsx("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]}),"Terminar Sessão"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(n,{to:"/login",state:{from:v.pathname},className:"nl-btn-ghost",children:"Entrar"}),e.jsx(n,{to:"/registo",className:"nl-btn-solid",children:"Registar"})]})})]})]})}const S=[{id:"estate",label:"Estate",title:"Casas com leitura clara",desc:"Pesquisa por zona, preco e tipologia com uma apresentacao limpa para decidir mais depressa.",cta:"Explorar Estate",route:"/imoveis",color:"#3ecf8e",icon:b,image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1300&q=86"},{id:"drive",label:"Drive",title:"Carros sem ruido",desc:"Marca, modelo, km, combustivel e contacto reunidos numa experiencia direta e visual.",cta:"Explorar Drive",route:"/carros",color:"#2ac1b4",icon:x,image:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=86"}];function V(){const l=N();return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .lp-root {
          --lp-bg: #040711;
          --lp-panel: rgba(255,255,255,0.08);
          --lp-panel-strong: rgba(255,255,255,0.12);
          --lp-border: rgba(255,255,255,0.16);
          --lp-muted: rgba(248,250,252,0.68);
          min-height: 100vh;
          background: var(--lp-bg);
          color: #f8fafc;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .lp-root .nl-root {
          background: rgba(4,7,17,0.82);
          border-bottom-color: rgba(255,255,255,0.1);
          backdrop-filter: blur(18px);
        }
        .lp-root .nl-btn-ghost,
        .lp-root .nl-user-trigger {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.16);
          color: #f8fafc;
        }
        .lp-root .nl-btn-ghost:hover,
        .lp-root .nl-user-trigger:hover,
        .lp-root .nl-user-trigger.active {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.28);
        }
        .lp-root .nl-btn-solid {
          background: #f8fafc;
          color: #040711;
        }
        .lp-root .nl-username,
        .lp-root .nl-avatar-initial { color: #f8fafc; }

        .lp-hero {
          position: relative;
          min-height: min(760px, calc(100vh - 80px));
          display: flex;
          align-items: end;
          padding: 96px 24px 42px;
          overflow: hidden;
        }
        .lp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(4,7,17,0.92), rgba(4,7,17,0.54) 54%, rgba(4,7,17,0.22)),
            linear-gradient(180deg, rgba(4,7,17,0.18), #040711 98%),
            url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1900&q=88');
          background-size: cover;
          background-position: center;
          transform: scale(1.01);
        }
        .lp-shell {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .lp-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 390px;
          gap: 28px;
          align-items: end;
        }
        .lp-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid var(--lp-border);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border-radius: 999px;
          padding: 9px 13px;
          color: rgba(248,250,252,0.86);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .lp-hero h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(54px, 9vw, 116px);
          line-height: .88;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-hero-copy {
          max-width: 640px;
          margin: 24px 0 0;
          color: rgba(248,250,252,0.78);
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.65;
        }
        .lp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }
        .lp-btn {
          border: 1px solid transparent;
          border-radius: 8px;
          min-height: 52px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-estate {
          background: #3ecf8e;
          color: #020617;
          box-shadow: 0 18px 36px -24px rgba(62,207,142,0.95);
        }
        .lp-btn-drive {
          background: rgba(42,193,180,0.16);
          color: #e6fffb;
          border-color: rgba(42,193,180,0.38);
          backdrop-filter: blur(14px);
        }

        .lp-snapshot {
          background: rgba(4,7,17,0.5);
          border: 1px solid var(--lp-border);
          border-radius: 8px;
          padding: 16px;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 70px -38px rgba(0,0,0,0.9);
        }
        .lp-snapshot h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          margin: 0 0 14px;
        }
        .lp-snapshot-row {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 12px;
          align-items: center;
          padding: 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .lp-snapshot-row + .lp-snapshot-row { margin-top: 10px; }
        .lp-snapshot-icon {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #020617;
        }
        .lp-snapshot strong {
          display: block;
          color: #ffffff;
          font-size: 14px;
          line-height: 1.2;
        }
        .lp-snapshot span {
          display: block;
          margin-top: 4px;
          color: var(--lp-muted);
          font-size: 12px;
          line-height: 1.45;
        }

        .lp-section {
          position: relative;
          padding: 76px 24px;
        }
        .lp-section.compact { padding-top: 34px; }
        .lp-section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 24px;
        }
        .lp-eyebrow {
          display: block;
          margin-bottom: 10px;
          color: #3ecf8e;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .12em;
        }
        .lp-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(30px, 5vw, 54px);
          line-height: 1;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-section-copy {
          max-width: 440px;
          margin: 0;
          color: var(--lp-muted);
          line-height: 1.65;
          font-size: 15px;
        }

        .lp-worlds {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .lp-world {
          position: relative;
          min-height: 390px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid var(--lp-border);
          background: rgba(255,255,255,0.06);
          cursor: pointer;
          isolation: isolate;
        }
        .lp-world img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform .6s cubic-bezier(.16,1,.3,1);
          z-index: -2;
        }
        .lp-world::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(4,7,17,0.08), rgba(4,7,17,0.86));
          z-index: -1;
        }
        .lp-world:hover img { transform: scale(1.07); }
        .lp-world-body {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 26px;
        }
        .lp-world-label {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: 999px;
          padding: 8px 11px;
          margin-bottom: 14px;
          color: #020617;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .lp-world h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(24px, 4vw, 36px);
          line-height: 1.05;
          margin: 0 0 10px;
        }
        .lp-world p {
          margin: 0 0 20px;
          color: rgba(248,250,252,0.78);
          line-height: 1.58;
          max-width: 440px;
        }
        .lp-world-cta {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 900;
        }

        .lp-carvertical {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 390px;
          gap: 30px;
          align-items: center;
          padding: 34px;
          border-radius: 8px;
          border: 1px solid rgba(42,193,180,0.28);
          background:
            linear-gradient(135deg, rgba(42,193,180,0.16), rgba(62,207,142,0.07)),
            rgba(255,255,255,0.07);
          backdrop-filter: blur(18px);
          box-shadow: 0 26px 70px -48px rgba(42,193,180,0.8);
        }
        .lp-carvertical h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.04;
          margin: 0 0 14px;
        }
        .lp-carvertical p {
          max-width: 620px;
          margin: 0;
          color: rgba(248,250,252,0.76);
          line-height: 1.65;
          font-size: 15px;
        }
        .lp-carvertical-logo {
          min-height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.75);
          padding: 28px;
        }
        .lp-carvertical-logo img {
          width: min(100%, 300px);
          height: auto;
          display: block;
        }

        .lp-final {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          padding: 28px;
          border-radius: 8px;
          border: 1px solid var(--lp-border);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(18px);
        }
        .lp-final h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.08;
          margin: 0 0 10px;
        }
        .lp-final p {
          margin: 0;
          color: var(--lp-muted);
          line-height: 1.6;
        }
        .lp-mini-list {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 18px;
        }
        .lp-mini-list span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          padding: 8px 10px;
          color: rgba(248,250,252,0.84);
          font-size: 12px;
          font-weight: 800;
        }

        @media (max-width: 920px) {
          .lp-hero { min-height: auto; padding-top: 82px; }
          .lp-hero-grid,
          .lp-carvertical,
          .lp-final { grid-template-columns: 1fr; }
          .lp-snapshot { max-width: 560px; }
          .lp-section-head { align-items: start; flex-direction: column; }
          .lp-worlds { grid-template-columns: 1fr; }
          .lp-final .lp-btn { width: 100%; }
        }
        @media (max-width: 560px) {
          .lp-hero { padding: 70px 18px 34px; }
          .lp-actions { flex-direction: column; }
          .lp-btn { width: 100%; }
          .lp-section { padding: 56px 18px; }
          .lp-carvertical, .lp-final { padding: 22px; }
          .lp-world { min-height: 330px; }
          .lp-world-body { padding: 22px; }
        }
      `}),e.jsxs("div",{className:"lp-root",children:[e.jsx(L,{}),e.jsx("section",{className:"lp-hero",children:e.jsxs("div",{className:"lp-shell lp-hero-grid",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"lp-kicker",children:[e.jsx(r,{path:C,size:.72}),"Mercado premium para comprar melhor"]}),e.jsx("h1",{children:"NOXVELIA"}),e.jsx("p",{className:"lp-hero-copy",children:"Imoveis e automoveis numa experiencia simples, visual e direta. Menos ruido, melhor leitura, contacto mais rapido."}),e.jsxs("div",{className:"lp-actions",children:[e.jsxs("button",{className:"lp-btn lp-btn-estate",onClick:()=>l("/imoveis"),children:["NOXVELIA Estate ",e.jsx(r,{path:d,size:.78})]}),e.jsxs("button",{className:"lp-btn lp-btn-drive",onClick:()=>l("/carros"),children:["NOXVELIA Drive ",e.jsx(r,{path:x,size:.82})]})]})]}),e.jsxs("aside",{className:"lp-snapshot","aria-label":"Resumo NOXVELIA",children:[e.jsx("h2",{children:"O essencial, logo a frente."}),e.jsxs("div",{className:"lp-snapshot-row",children:[e.jsx("span",{className:"lp-snapshot-icon",style:{background:"#3ecf8e"},children:e.jsx(r,{path:b,size:.9})}),e.jsxs("div",{children:[e.jsx("strong",{children:"Estate"}),e.jsx("span",{children:"Casas e apartamentos organizados por contexto real."})]})]}),e.jsxs("div",{className:"lp-snapshot-row",children:[e.jsx("span",{className:"lp-snapshot-icon",style:{background:"#2ac1b4"},children:e.jsx(r,{path:x,size:.9})}),e.jsxs("div",{children:[e.jsx("strong",{children:"Drive"}),e.jsx("span",{children:"Viaturas com dados claros para comparar sem esforco."})]})]})]})]})}),e.jsx("section",{className:"lp-section compact",children:e.jsxs("div",{className:"lp-shell",children:[e.jsxs("div",{className:"lp-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"Escolhe a vertical"}),e.jsx("h2",{className:"lp-title",children:"Dois caminhos. Uma leitura limpa."})]}),e.jsx("p",{className:"lp-section-copy",children:"A plataforma foca-se no que interessa: bons anuncios, informacao sem duplicacao e perfis de vendedor mais completos."})]}),e.jsx("div",{className:"lp-worlds",children:S.map(a=>e.jsxs("article",{className:"lp-world",onClick:()=>l(a.route),children:[e.jsx("img",{src:a.image,alt:a.label}),e.jsxs("div",{className:"lp-world-body",children:[e.jsxs("span",{className:"lp-world-label",style:{background:a.color},children:[e.jsx(r,{path:a.icon,size:.72})," ",a.label]}),e.jsx("h3",{children:a.title}),e.jsx("p",{children:a.desc}),e.jsxs("span",{className:"lp-world-cta",children:[a.cta," ",e.jsx(r,{path:d,size:.74})]})]})]},a.id))})]})}),e.jsx("section",{className:"lp-section",children:e.jsx("div",{className:"lp-shell",children:e.jsxs("div",{className:"lp-carvertical",children:[e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"Parceria Drive"}),e.jsx("h2",{children:"Verifica o historico do teu carro antes de comprar."}),e.jsx("p",{children:"A parceria com a CarVertical reforca a confianca no processo de compra: mais contexto sobre a viatura, menos surpresas depois da decisao."})]}),e.jsx("div",{className:"lp-carvertical-logo",children:e.jsx("img",{src:"/carvertical-logo.png",alt:"CarVertical"})})]})})}),e.jsx("section",{className:"lp-section",children:e.jsx("div",{className:"lp-shell",children:e.jsxs("div",{className:"lp-final",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Publica com presenca cuidada."}),e.jsx("p",{children:"Perfil publico com bio, links e anuncios com dados claros para quem compra."}),e.jsxs("div",{className:"lp-mini-list",children:[e.jsxs("span",{children:[e.jsx(r,{path:E,size:.62})," Bio publica"]}),e.jsxs("span",{children:[e.jsx(r,{path:P,size:.62})," Pesquisa direta"]}),e.jsxs("span",{children:[e.jsx(r,{path:I,size:.62})," Cards limpos"]})]})]}),e.jsxs("button",{className:"lp-btn lp-btn-estate",onClick:()=>l("/publicar"),children:["Publicar anuncio ",e.jsx(r,{path:d,size:.78})]})]})})}),e.jsx(z,{})]})]})}export{V as default};
//# sourceMappingURL=Landing-Dzd39mDt.js.map
