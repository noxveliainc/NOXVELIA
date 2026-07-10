import{u as b,a as y,r as c,j as e,L as t,b as k,F as N}from"./index-BBQ9M_rT.js";import{I as a,m as z,a as h,b as u,c as C,d as E,e as A}from"./mdi-B3DqShuu.js";function L(){var g,m;const{user:r,signed:l,logout:o}=b(),j=y(),[p,n]=c.useState(!1),d=c.useRef(null);c.useEffect(()=>{const s=w=>{d.current&&!d.current.contains(w.target)&&n(!1)};return window.addEventListener("click",s),()=>window.removeEventListener("click",s)},[]);const i=r||(()=>{try{const s=localStorage.getItem("@App:user");return s?JSON.parse(s):null}catch{return null}})(),x=(i==null?void 0:i.avatarUrl)||(i==null?void 0:i.avatar),v=((g=i==null?void 0:i.nome)==null?void 0:g.charAt(0).toUpperCase())||"U",f=((m=i==null?void 0:i.nome)==null?void 0:m.split(" ")[0])||"";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsxs("nav",{className:"nl-root",children:[e.jsx("div",{className:"nl-side left"}),e.jsx(t,{to:"/",className:"nl-logo",children:e.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA"})}),e.jsx("div",{className:"nl-side right",children:l?e.jsxs("div",{ref:d,style:{position:"relative"},children:[e.jsxs("button",{className:`nl-user-trigger ${p?"active":""}`,onClick:()=>n(!p),children:[e.jsx("div",{className:"nl-avatar",children:x?e.jsx("img",{src:x,alt:"Perfil"}):e.jsx("span",{className:"nl-avatar-initial",children:v})}),f&&e.jsx("span",{className:"nl-username",children:f}),e.jsx("svg",{className:"nl-chevron",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",children:e.jsx("path",{d:"M6 9l6 6 6-6"})})]}),p&&e.jsxs("div",{className:"nl-user-dropdown",onClick:s=>s.stopPropagation(),children:[e.jsxs(t,{to:"/perfil",onClick:()=>n(!1),className:"nl-ud-item",children:[e.jsxs("svg",{viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),"O Meu Perfil"]}),e.jsx("div",{className:"nl-ud-divider"}),e.jsxs("button",{onClick:()=>{n(!1),o()},className:"nl-ud-item logout",children:[e.jsxs("svg",{viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),e.jsx("polyline",{points:"16 17 21 12 16 7"}),e.jsx("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]}),"Terminar Sessão"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(t,{to:"/login",state:{from:j.pathname},className:"nl-btn-ghost",children:"Entrar"}),e.jsx(t,{to:"/registo",className:"nl-btn-solid",children:"Registar"})]})})]})]})}function O(){const r=k(),{signed:l}=b(),o=()=>{if(l){r("/publicar");return}r("/login",{state:{from:"/publicar"}})};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
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
          padding: 72px 0 52px;
          background:
            linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1fr);
          gap: 40px;
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
          font-size: clamp(44px, 7vw, 88px);
          line-height: .94;
          margin: 0;
          letter-spacing: 0;
        }
        .lp-hero-copy {
          color: #475569;
          font-size: clamp(16px, 2vw, 20px);
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
          transition: transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-drive {
          background: #2ac1b4;
          color: #020617;
          box-shadow: 0 18px 36px -26px rgba(42,193,180,0.8);
        }
        .lp-btn-light {
          background: #ffffff;
          color: #0f172a;
          border-color: #cbd5e1;
        }
        .lp-hero-media {
          position: relative;
          min-height: 450px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 28px 70px -48px rgba(15,23,42,0.5);
          background: #e2e8f0;
        }
        .lp-hero-media img {
          width: 100%;
          height: 100%;
          min-height: 450px;
          display: block;
          object-fit: cover;
        }
        .lp-media-label {
          position: absolute;
          left: 18px;
          bottom: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 999px;
          padding: 10px 13px;
          color: #0f172a;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .08em;
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
          border-radius: 8px;
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
          padding: 68px 0;
        }
        .lp-section.alt {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }
        .lp-section-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 390px;
          gap: 34px;
          align-items: center;
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
          font-size: clamp(30px, 5vw, 50px);
          line-height: 1.04;
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
        .lp-carvertical-logo {
          min-height: 190px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 8px;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-carvertical-logo img {
          width: min(100%, 310px);
          height: auto;
          display: block;
        }
        .lp-final {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 22px;
          align-items: center;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 28px;
          background: #ffffff;
          box-shadow: 0 20px 50px -42px rgba(15,23,42,0.5);
        }
        .lp-final h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin: 0 0 8px;
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.08;
        }
        .lp-final p {
          margin: 0;
          color: #475569;
          line-height: 1.6;
        }
        @media (max-width: 920px) {
          .lp-hero-grid,
          .lp-section-grid,
          .lp-final { grid-template-columns: 1fr; }
          .lp-hero-media, .lp-hero-media img { min-height: 320px; }
          .lp-strip { grid-template-columns: 1fr; }
          .lp-final .lp-btn { width: 100%; }
        }
        @media (max-width: 560px) {
          .lp-shell { padding: 0 18px; }
          .lp-hero { padding: 48px 0 42px; }
          .lp-actions { flex-direction: column; }
          .lp-btn { width: 100%; }
          .lp-section { padding: 52px 0; }
        }
      `}),e.jsxs("div",{className:"lp-root",children:[e.jsx(L,{}),e.jsx("section",{className:"lp-hero",children:e.jsxs("div",{className:"lp-shell",children:[e.jsxs("div",{className:"lp-hero-grid",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"lp-kicker",children:[e.jsx(a,{path:z,size:.72})," NOXVELIA Drive"]}),e.jsx("h1",{children:"Compra e vende carros com menos ruido."}),e.jsx("p",{className:"lp-hero-copy",children:"Pesquisa direta, cards limpos, dados essenciais e perfis de vendedor mais claros para decidir sem perder tempo."}),e.jsxs("div",{className:"lp-actions",children:[e.jsxs("button",{className:"lp-btn lp-btn-drive",onClick:()=>r("/carros"),children:["Explorar Drive ",e.jsx(a,{path:h,size:.78})]}),e.jsxs("button",{className:"lp-btn lp-btn-light",onClick:o,children:["Publicar Anuncio ",e.jsx(a,{path:h,size:.78})]})]})]}),e.jsxs("div",{className:"lp-hero-media",children:[e.jsx("img",{src:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=86",alt:"NOXVELIA Drive"}),e.jsxs("div",{className:"lp-media-label",children:[e.jsx(a,{path:u,size:.7})," Drive em destaque"]})]})]}),e.jsxs("div",{className:"lp-strip",children:[e.jsxs("div",{className:"lp-strip-item",children:[e.jsx("span",{className:"lp-strip-icon",children:e.jsx(a,{path:C,size:.78})}),"Dados essenciais sem repeticao"]}),e.jsxs("div",{className:"lp-strip-item",children:[e.jsx("span",{className:"lp-strip-icon",children:e.jsx(a,{path:u,size:.78})}),"Perfis com bio, links e contacto"]}),e.jsxs("div",{className:"lp-strip-item",children:[e.jsx("span",{className:"lp-strip-icon",children:e.jsx(a,{path:E,size:.78})}),"Pesquisa rapida em grelha ou mapa"]})]})]})}),e.jsx("section",{className:"lp-section alt",children:e.jsxs("div",{className:"lp-shell lp-section-grid",children:[e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"Parceria CarVertical"}),e.jsx("h2",{className:"lp-title",children:"Verifica o historico do carro antes de comprar."}),e.jsx("p",{className:"lp-copy",children:"A NOXVELIA Drive destaca a verificacao de historico para apoiar decisoes mais informadas antes do contacto ou visita."})]}),e.jsx("div",{className:"lp-carvertical-logo",children:e.jsx("img",{src:"/carvertical-logo.png",alt:"CarVertical"})})]})}),e.jsx("section",{className:"lp-section",children:e.jsx("div",{className:"lp-shell",children:e.jsxs("div",{className:"lp-final",children:[e.jsxs("div",{children:[e.jsx("span",{className:"lp-eyebrow",children:"Tambem disponivel"}),e.jsx("h2",{children:"Estate continua a um clique."}),e.jsx("p",{children:"Se procuras imoveis, podes alternar para a vertical Estate quando quiseres."})]}),e.jsxs("button",{className:"lp-btn lp-btn-light",onClick:()=>r("/imoveis"),children:["Explorar Estate ",e.jsx(a,{path:A,size:.78})]})]})})}),e.jsx(N,{})]})]})}export{O as default};
//# sourceMappingURL=Landing-CsklXBtZ.js.map
