import{b,h as j,u as v,r as o,j as e,c as l}from"./index-BBQ9M_rT.js";const p=()=>e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("path",{d:"M20 6L9 17l-5-5"})}),c=()=>e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",className:"pl-spinner",children:e.jsx("path",{d:"M21 12a9 9 0 1 1-6.219-8.56"})});function k(){const d=b(),[i]=j(),{sincronizarUser:f,user:r}=v(),[t,s]=o.useState(!1),[m,n]=o.useState(!1);o.useEffect(()=>{i.get("premium")==="sucesso"&&(n(!0),f().finally(()=>n(!1)))},[i]);const x=async()=>{s(!0);try{const a=await l.post("/stripe/criar-checkout-premium");a.data&&a.data.url&&(window.location.href=a.data.url)}catch{alert("Erro ao iniciar pagamento. Tenta novamente."),s(!1)}},u=async()=>{s(!0);try{const a=await l.post("/stripe/criar-portal-cliente");a.data&&a.data.url&&(window.location.href=a.data.url)}catch{alert("Erro ao abrir o portal de gestão. Tenta novamente."),s(!1)}},g=["Até 10 anúncios simultâneos","Suporte base por email"],h=["Anúncios ilimitados em Estate e Drive","Selo de Vendedor Verificado","Destaque prioritário nos resultados de pesquisa","Gestor de conta dedicado"];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .pl-root {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          color: #0f172a;
          height: auto;
          box-sizing: border-box;
          padding: 48px 24px 60px;
        }

        .pl-header {
          max-width: 640px;
          margin: 0 auto 36px;
          text-align: center;
        }
        .pl-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
          color: #64748b; margin-bottom: 8px; display: block;
        }
        .pl-header h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(28px, 3.5vw, 38px);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          margin-top: 0;
        }
        .pl-header p {
          font-size: 14.5px;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        .pl-sync {
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: #2ac1b4;
          margin-bottom: 20px;
        }

        .pl-grid {
          max-width: 780px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: stretch;
        }

        .pl-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px 24px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px -8px rgba(15, 23, 42, 0.06);
          position: relative;
          box-sizing: border-box;
        }

        .pl-card--pro {
          border-color: #cbd5e1;
          overflow: hidden;
        }
        .pl-card--pro::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3ecf8e, #2ac1b4);
        }

        .pl-badge {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0f172a;
          background: #f0fdf9;
          border: 1px solid #ccf3e6;
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 14px;
          width: fit-content;
        }
        .pl-badge--active {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #15803d;
        }

        .pl-plan-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .pl-plan-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .pl-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .pl-price span {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #64748b;
        }

        .pl-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          flex: 1;
        }
        .pl-features li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 13px;
          color: #334155;
          line-height: 1.45;
          margin-bottom: 10px;
        }
        .pl-features svg {
          width: 15px; height: 15px;
          flex-shrink: 0;
          margin-top: 1px;
          color: #2ac1b4;
        }
        .pl-card:not(.pl-card--pro) .pl-features svg { color: #94a3b8; }

        .pl-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid transparent;
          transition: filter 0.2s, background 0.2s, color 0.2s;
          box-sizing: border-box;
        }
        .pl-btn:disabled { opacity: 0.7; cursor: default; }

        .pl-btn--ghost {
          background: transparent;
          border-color: #e2e8f0;
          color: #0f172a;
        }
        .pl-btn--ghost:hover { background: #f8fafc; }

        .pl-btn--dark {
          background: #0f172a;
          color: #ffffff;
        }
        .pl-btn--dark:hover { filter: brightness(1.15); }

        .pl-btn--outline-pro {
          background: transparent;
          border-color: #2ac1b4;
          color: #0f766e;
        }
        .pl-btn--outline-pro:hover { background: #f0fdfa; }

        .pl-spinner {
          width: 16px; height: 16px;
          animation: pl-spin 0.8s linear infinite;
        }
        @keyframes pl-spin { to { transform: rotate(360deg); } }

        .pl-note {
          max-width: 780px;
          margin: 20px auto 0;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }

        @media (max-width: 720px) {
          .pl-grid { grid-template-columns: 1fr; max-width: 380px; }
        }
      `}),e.jsxs("div",{className:"pl-root",children:[e.jsxs("div",{className:"pl-header",children:[e.jsx("span",{className:"pl-eyebrow",children:"Planos"}),e.jsx("h1",{children:"Escolhe o teu estatuto"}),e.jsx("p",{children:"Eleva a tua presença na NOXVELIA e publica sem limites em Estate e Drive."})]}),m&&e.jsx("p",{className:"pl-sync",children:"A confirmar o teu pagamento..."}),e.jsxs("div",{className:"pl-grid",children:[e.jsxs("div",{className:"pl-card",children:[e.jsx("span",{className:"pl-badge",children:"Particular"}),e.jsx("div",{className:"pl-plan-name",children:"Para quem vende pontualmente"}),e.jsx("p",{className:"pl-plan-desc",children:"Ideal para colocar um imóvel ou um automóvel à venda, sem compromisso."}),e.jsx("div",{className:"pl-price",children:"Gratuito"}),e.jsx("ul",{className:"pl-features",children:g.map(a=>e.jsxs("li",{children:[e.jsx(p,{}),a]},a))}),e.jsx("button",{className:"pl-btn pl-btn--ghost",onClick:()=>d("/perfil"),children:"Ir para o meu Perfil"})]}),e.jsxs("div",{className:"pl-card pl-card--pro",children:[e.jsx("span",{className:`pl-badge ${r!=null&&r.premiumAtivo?"pl-badge--active":""}`,children:r!=null&&r.premiumAtivo?"O teu plano atual":"Mais escolhido"}),e.jsx("div",{className:"pl-plan-name",children:"Profissional"}),e.jsx("p",{className:"pl-plan-desc",children:"Para stands e imobiliárias que operam nos dois mundos NOXVELIA."}),e.jsxs("div",{className:"pl-price",children:["10.99€ ",e.jsx("span",{children:"/mês"})]}),e.jsx("ul",{className:"pl-features",children:h.map(a=>e.jsxs("li",{children:[e.jsx(p,{}),a]},a))}),r!=null&&r.premiumAtivo?e.jsx("button",{className:"pl-btn pl-btn--outline-pro",onClick:u,disabled:t,children:t?e.jsx(c,{}):"Gerir a Minha Subscrição"}):e.jsx("button",{className:"pl-btn pl-btn--dark",onClick:x,disabled:t,children:t?e.jsx(c,{}):"Aderir ao Profissional"})]})]}),e.jsx("p",{className:"pl-note",children:"Podes cancelar a qualquer momento através do portal de gestão da subscrição."})]})]})}export{k as default};
//# sourceMappingURL=Planos-CqHHfoi3.js.map
