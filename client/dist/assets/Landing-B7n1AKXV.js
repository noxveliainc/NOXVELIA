import{u as k,a as j,r as s,j as e,L as u,b as y}from"./index-CTvWiIwb.js";function N(){var a,m;const{user:b,signed:v,logout:w}=k(),n=j(),[c,d]=s.useState(!1),[p,i]=s.useState(!1),h=s.useRef(null);s.useEffect(()=>{const o=()=>Math.max(window.innerHeight-110,240),l=()=>d(window.scrollY>o());return l(),window.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",l),()=>{window.removeEventListener("scroll",l),window.removeEventListener("resize",l)}},[]),s.useEffect(()=>{const o=l=>{h.current&&!h.current.contains(l.target)&&i(!1)};return window.addEventListener("click",o),()=>window.removeEventListener("click",o)},[]);const r=b||(()=>{try{const o=localStorage.getItem("@App:user");return o?JSON.parse(o):null}catch{return null}})(),f=(r==null?void 0:r.avatarUrl)||(r==null?void 0:r.avatar),x=((a=r==null?void 0:r.nome)==null?void 0:a.charAt(0).toUpperCase())||"U",t=((m=r==null?void 0:r.nome)==null?void 0:m.split(" ")[0])||"";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .nl-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          background: linear-gradient(to bottom, rgba(4,7,17,0.45), rgba(4,7,17,0));
          border-bottom: 1px solid transparent;
          transition: background .35s ease, border-color .35s ease, height .35s ease;
          font-family: 'Inter', sans-serif;
        }
        .nl-root.scrolled {
          height: 70px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px -8px rgba(15, 23, 42, 0.08);
        }

        .nl-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          user-select: none;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(6px);
          transition: all .35s ease;
        }
        .nl-root.scrolled .nl-logo {
          background: transparent;
          border-color: transparent;
          padding: 4px 0;
        }
        .nl-logo img {
          height: 42px;
          width: auto;
          object-fit: contain;
          transition: height .35s ease;
        }
        .nl-root.scrolled .nl-logo img { height: 32px; }

        .nl-actions {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nl-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 22px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all .25s ease;
        }
        .nl-btn-ghost:hover { background: rgba(255,255,255,0.18); }
        .nl-root.scrolled .nl-btn-ghost {
          border-color: #cbd5e1;
          background: transparent;
          color: #0f172a;
          backdrop-filter: none;
        }
        .nl-root.scrolled .nl-btn-ghost:hover { border-color: #94a3b8; background: rgba(15,23,42,0.03); }

        .nl-btn-solid {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 22px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(120deg, #3ecf8e, #2ac1b4);
          color: #040711;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 8px 20px -8px rgba(42, 193, 180, 0.6);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .nl-btn-solid:hover { transform: translateY(-1px); box-shadow: 0 10px 24px -8px rgba(42, 193, 180, 0.75); }

        /* --- Utilizador autenticado --- */
        .nl-user-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          padding: 4px 16px 4px 4px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(6px);
          cursor: pointer;
          transition: all .25s ease;
        }
        .nl-user-trigger:hover, .nl-user-trigger.active { background: rgba(255,255,255,0.2); }
        .nl-root.scrolled .nl-user-trigger {
          background: transparent; border-color: transparent; backdrop-filter: none;
        }
        .nl-root.scrolled .nl-user-trigger:hover,
        .nl-root.scrolled .nl-user-trigger.active { background: #f8fafc; border-color: #e2e8f0; }

        .nl-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.5); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          background: #e2e8f0; flex-shrink: 0;
        }
        .nl-root.scrolled .nl-avatar { border-color: #cbd5e1; }
        .nl-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nl-avatar-initial { font-size: 13px; font-weight: 700; color: #0f172a; }
        .nl-username { font-size: 13px; font-weight: 600; color: #ffffff; transition: color .35s ease; }
        .nl-root.scrolled .nl-username { color: #0f172a; }
        .nl-chevron { stroke: #ffffff; transition: stroke .35s ease; }
        .nl-root.scrolled .nl-chevron { stroke: #0f172a; }

        .nl-user-dropdown {
          position: absolute; top: calc(100% + 14px); right: 0;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
          width: 200px; display: flex; flex-direction: column; padding: 8px;
          z-index: 1020;
        }
        .nl-ud-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px;
          font-size: 13px; font-weight: 600; color: #475569;
          text-decoration: none; cursor: pointer; border: none;
          background: transparent; width: 100%; text-align: left;
          transition: all .2s;
        }
        .nl-ud-item:hover { background: #f8fafc; color: #0f172a; }
        .nl-ud-item svg { width: 16px; height: 16px; flex-shrink: 0; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .nl-ud-divider { height: 1px; background: #e2e8f0; margin: 6px 0; }
        .nl-ud-item.logout:hover { background: #fff1f2; color: #be123c; }

        @media (max-width: 560px) {
          .nl-root { padding: 0 16px; height: 76px; }
          .nl-root.scrolled { height: 62px; }
          .nl-logo img { height: 32px; }
          .nl-root.scrolled .nl-logo img { height: 26px; }
          .nl-actions { right: 16px; gap: 6px; }
          .nl-btn-ghost, .nl-btn-solid { padding: 9px 15px; font-size: 12.5px; }
          .nl-username { display: none; }
        }
      `}),e.jsxs("nav",{className:`nl-root${c?" scrolled":""}`,children:[e.jsx(u,{to:"/",className:"nl-logo",children:e.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA"})}),e.jsx("div",{className:"nl-actions",children:v?e.jsxs("div",{ref:h,style:{position:"relative"},children:[e.jsxs("button",{className:`nl-user-trigger ${p?"active":""}`,onClick:()=>i(!p),children:[e.jsx("div",{className:"nl-avatar",children:f?e.jsx("img",{src:f,alt:"Perfil"}):e.jsx("span",{className:"nl-avatar-initial",children:x})}),t&&e.jsx("span",{className:"nl-username",children:t}),e.jsx("svg",{className:"nl-chevron",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",children:e.jsx("path",{d:"M6 9l6 6 6-6"})})]}),p&&e.jsxs("div",{className:"nl-user-dropdown",onClick:o=>o.stopPropagation(),children:[e.jsxs(u,{to:"/perfil",onClick:()=>i(!1),className:"nl-ud-item",children:[e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),"O Meu Perfil"]}),e.jsx("div",{className:"nl-ud-divider"}),e.jsxs("button",{onClick:()=>{i(!1),w()},className:"nl-ud-item logout",children:[e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),e.jsx("polyline",{points:"16 17 21 12 16 7"}),e.jsx("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]}),"Terminar Sessão"]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(u,{to:"/login",state:{from:n.pathname},className:"nl-btn-ghost",children:"Entrar"}),e.jsx(u,{to:"/registo",className:"nl-btn-solid",children:"Registar"})]})})]})]})}const z={estate:{id:"estate",tag:"Imobiliário",title:"Estate",desc:"Casas, apartamentos e investimentos escolhidos com critério.",cta:"Ver Imóveis",route:"/imoveis",accent:"#3ecf8e",img:"https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=75"},drive:{id:"drive",tag:"Automóveis",title:"Drive",desc:"Carros inspecionados ao detalhe, prontos para a estrada.",cta:"Ver Automóveis",route:"/carros",accent:"#2ac1b4",img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=75"}},L=[{titulo:"Curadoria a sério",desc:"Cada imóvel e cada viatura passam pelo nosso crivo antes de chegarem até ti.",icon:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[e.jsx("path",{d:"M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"}),e.jsx("path",{d:"M9 12l2 2 4-4"})]})},{titulo:"Dois mundos, uma conta",desc:"Gere imóveis e automóveis no mesmo perfil, sem trocar de plataforma.",icon:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.5"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.5"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.5"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.5"})]})},{titulo:"Suporte próximo",desc:"Uma equipa dedicada para te acompanhar do primeiro contacto ao negócio fechado.",icon:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[e.jsx("path",{d:"M3 18v-6a9 9 0 0 1 18 0v6"}),e.jsx("path",{d:"M21 19a2 2 0 0 1-2 2h-1v-7h3z"}),e.jsx("path",{d:"M3 19a2 2 0 0 0 2 2h1v-7H3z"})]})}];function C(){var x;const b=y(),{user:v,signed:w}=k(),[n,c]=s.useState(null),d=s.useCallback(()=>typeof window<"u"&&window.matchMedia("(hover: hover) and (pointer: fine)").matches,[]),p=t=>{d()&&c(t)},i=()=>{d()&&c(null)},g=v||(()=>{try{const t=localStorage.getItem("@App:user");return t?JSON.parse(t):null}catch{return null}})(),r=((x=g==null?void 0:g.nome)==null?void 0:x.split(" ")[0])||"",f=t=>n?n===t?"58%":"42%":"50%";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .lp-root {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          color: #0f172a;
        }

        /* ============ HERO PARTIDO ============ */
        .lp-hero {
          position: relative;
          height: 100dvh;
          min-height: 560px;
          display: flex;
          overflow: hidden;
          background: #040711;
        }

        .lp-half {
          position: relative;
          flex: 0 0 50%;
          min-width: 0;
          height: 100%;
          border: none;
          cursor: pointer;
          font: inherit;
          color: inherit;
          overflow: hidden;
          transition: flex-basis .6s cubic-bezier(.16,1,.3,1);
        }

        .lp-half-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.06);
          transition: transform .8s cubic-bezier(.16,1,.3,1), filter .6s ease;
          filter: saturate(0.85) brightness(0.78);
        }
        .lp-half.is-active .lp-half-img { transform: scale(1.12); filter: saturate(1.05) brightness(0.85); }
        .lp-half.is-dim .lp-half-img { filter: saturate(0.55) brightness(0.55); }

        .lp-half-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(4,7,17,0.35) 0%, rgba(4,7,17,0.25) 45%, rgba(4,7,17,0.9) 100%);
        }
        .lp-half-estate .lp-half-overlay { background: linear-gradient(180deg, rgba(4,7,17,0.35) 0%, rgba(4,7,17,0.2) 45%, rgba(3,12,9,0.92) 100%); }
        .lp-half-drive .lp-half-overlay { background: linear-gradient(180deg, rgba(4,7,17,0.35) 0%, rgba(4,7,17,0.2) 45%, rgba(2,14,14,0.92) 100%); }

        .lp-half-content {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: clamp(28px, 5vw, 64px) clamp(20px, 6vw, 64px);
          text-align: left;
          color: #f8fafc;
          opacity: 0;
          transform: translateY(16px);
          animation: lp-rise .7s .25s ease forwards;
        }
        .lp-half:nth-child(1) .lp-half-content { animation-delay: .35s; }
        .lp-half:last-of-type .lp-half-content { animation-delay: .5s; }

        .lp-half-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(4px);
          margin-bottom: 18px;
        }

        .lp-half-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(34px, 6vw, 64px);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 12px;
        }

        .lp-half-desc {
          max-width: 360px;
          font-size: clamp(13px, 1.4vw, 15px);
          color: rgba(248,250,252,0.8);
          line-height: 1.55;
          margin-bottom: 22px;
        }

        .lp-half-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          color: #040711;
          transition: gap .25s ease, transform .25s ease;
        }
        .lp-half:hover .lp-half-cta, .lp-half:focus-visible .lp-half-cta { gap: 13px; transform: translateX(2px); }
        .lp-half-cta svg { flex-shrink: 0; }

        .lp-half:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }

        /* costura central */
        .lp-seam {
          position: relative;
          z-index: 5;
          flex: 0 0 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #040711;
        }
        .lp-seam::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 50%;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, transparent, rgba(62,207,142,0.55) 35%, rgba(42,193,180,0.55) 65%, transparent);
        }
        .lp-seam-badge {
          position: relative;
          width: 58px; height: 58px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(4,7,17,0.75);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          color: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          box-shadow: 0 0 0 8px rgba(255,255,255,0.03);
        }

        .lp-hero-eyebrow {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 4;
          text-align: center;
          padding-top: clamp(112px, 16vh, 150px);
          pointer-events: none;
        }
        .lp-hero-eyebrow p {
          color: rgba(248,250,252,0.65);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .lp-hero-eyebrow h1 {
          margin-top: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(20px, 2.6vw, 28px);
          color: #f8fafc;
          letter-spacing: -0.01em;
        }

        .lp-scroll-hint {
          position: absolute;
          bottom: 22px; left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: rgba(248,250,252,0.55);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          animation: lp-bounce 2s ease-in-out infinite;
        }

        @keyframes lp-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes lp-bounce { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 6px); } }

        @media (max-width: 760px) {
          .lp-hero { flex-direction: column; height: auto; min-height: 100dvh; }
          .lp-half { flex-basis: 50% !important; height: 50%; min-height: 280px; }
          .lp-half-img { transform: scale(1.04) !important; filter: saturate(0.95) brightness(0.8) !important; }
          .lp-seam { flex-basis: 0 !important; width: 100%; height: 0; }
          .lp-seam::before { top: 50%; left: 0; right: 0; width: auto; height: 1px; transform: translateY(-50%); background: linear-gradient(90deg, transparent, rgba(62,207,142,0.6), rgba(42,193,180,0.6), transparent); }
          .lp-seam-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
          .lp-hero-eyebrow { padding-top: 96px; }
          .lp-half-content { padding: 22px 20px; }
          .lp-half-title { font-size: 30px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-half-content { animation: none; opacity: 1; transform: none; }
          .lp-half, .lp-half-img, .lp-half-cta, .lp-scroll-hint { transition: none; animation: none; }
        }

        /* ============ PILARES ============ */
        .lp-pillars {
          padding: clamp(56px, 8vw, 96px) 20px;
          max-width: 1080px;
          margin: 0 auto;
        }
        .lp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 32px);
        }
        .lp-pillar {
          text-align: left;
          padding: 28px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
        }
        .lp-pillar-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(62,207,142,0.1);
          color: #0e9f6e;
          margin-bottom: 18px;
        }
        .lp-pillar-icon svg { width: 21px; height: 21px; }
        .lp-pillar h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }
        .lp-pillar p { font-size: 13.5px; color: #64748b; line-height: 1.6; }

        @media (max-width: 760px) {
          .lp-pillars-grid { grid-template-columns: 1fr; }
        }

        .lp-foot {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          padding: 16px 0 32px;
        }
      `}),e.jsxs("div",{className:"lp-root",children:[e.jsx(N,{}),e.jsxs("section",{className:"lp-hero","aria-label":"Escolhe o teu mundo NOXVELIA",children:[e.jsxs("div",{className:"lp-hero-eyebrow",children:[e.jsx("p",{children:w?`Olá, ${r}`:"Bem-vindo à NOXVELIA"}),e.jsx("h1",{children:"Escolhe o mundo onde queres continuar"})]}),["estate","drive"].map(t=>{const a=z[t],m=n===t,o=n&&n!==t;return e.jsxs("button",{className:`lp-half lp-half-${a.id} ${m?"is-active":""} ${o?"is-dim":""}`,style:{flexBasis:f(t)},onMouseEnter:()=>p(t),onMouseLeave:i,onFocus:()=>p(t),onBlur:i,onClick:()=>b(a.route),"aria-label":a.cta,children:[e.jsx("img",{className:"lp-half-img",src:a.img,alt:"",loading:"eager"}),e.jsx("div",{className:"lp-half-overlay"}),e.jsxs("div",{className:"lp-half-content",children:[e.jsx("span",{className:"lp-half-tag",children:a.tag}),e.jsx("h2",{className:"lp-half-title",children:a.title}),e.jsx("p",{className:"lp-half-desc",children:a.desc}),e.jsxs("span",{className:"lp-half-cta",style:{background:a.accent},children:[a.cta,e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:e.jsx("path",{d:"M2 8h12M9 3l5 5-5 5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]})]},a.id)}),e.jsx("div",{className:"lp-seam","aria-hidden":"true",children:e.jsx("span",{className:"lp-seam-badge",children:"OU"})}),e.jsxs("div",{className:"lp-scroll-hint","aria-hidden":"true",children:[e.jsx("span",{children:"Saber mais"}),e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M6 9l6 6 6-6"})})]})]}),e.jsx("section",{className:"lp-pillars",children:e.jsx("div",{className:"lp-pillars-grid",children:L.map(t=>e.jsxs("div",{className:"lp-pillar",children:[e.jsx("div",{className:"lp-pillar-icon",children:t.icon}),e.jsx("h3",{children:t.titulo}),e.jsx("p",{children:t.desc})]},t.titulo))})}),e.jsx("div",{className:"lp-foot",children:"NOXVELIA Portugal © 2026"})]})]})}export{C as default};
//# sourceMappingURL=Landing-B7n1AKXV.js.map
