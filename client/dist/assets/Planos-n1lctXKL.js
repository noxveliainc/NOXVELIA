import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{O as r,S as i,T as a,x as o}from"./index-C_Kkb_RE.js";var s=e(t(),1),c=n(),l=()=>(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,children:(0,c.jsx)(`path`,{d:`M20 6L9 17l-5-5`})}),u=()=>(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,className:`pl-spinner`,children:(0,c.jsx)(`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`})});function d(){let e=r(),[t]=a(),{sincronizarUser:n,user:d,signed:f}=o(),[p,m]=(0,s.useState)(!1),[h,g]=(0,s.useState)(!1),_=!!(d?.stripeCustomerId||d?.stripeSubscriptionId),v=!!(d?.premiumAtivo&&!_),y=d?.proximoPagamentoPremium?new Date(d.proximoPagamentoPremium):null,b=y&&!Number.isNaN(y.getTime()),x=b?Math.max(0,Math.ceil((y.getTime()-Date.now())/864e5)):null,S=x===null?null:x===0?`hoje`:x===1?`1 dia`:`${x} dias`,C=b?y.toLocaleDateString(`pt-PT`,{day:`2-digit`,month:`long`,year:`numeric`}):null;(0,s.useEffect)(()=>{t.get(`premium`)===`sucesso`&&f&&(g(!0),n().finally(()=>g(!1)))},[t]),(0,s.useEffect)(()=>{let e=d?._id||d?.id;if(!f||!e)return;let t=!0;return g(!0),n().finally(()=>{t&&g(!1)}),()=>{t=!1}},[d?._id,d?.id]);let w=()=>{if(!f){e(`/login`,{state:{from:`/premium-confirmar`}});return}e(`/premium-confirmar`)},T=async()=>{m(!0);try{let e=await i.post(`/stripe/criar-portal-cliente`);e.data&&e.data.url&&(window.location.href=e.data.url)}catch{alert(`Erro ao abrir o portal de gestão. Tenta novamente.`),m(!1)}};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`style`,{children:`
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
          color: #d9c49c;
          margin-bottom: 20px;
        }

        .pl-active-panel {
          max-width: 780px;
          margin: 0 auto;
          padding: 26px;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 20px 45px -30px rgba(15, 23, 42, 0.32);
        }
        .pl-active-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        .pl-active-head h2 {
          margin: 6px 0 4px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 25px;
          letter-spacing: 0;
        }
        .pl-active-head p {
          margin: 0;
          color: #64748b;
          font-size: 13.5px;
          line-height: 1.5;
        }
        .pl-active-status {
          flex: 0 0 auto;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(16, 47, 80, .08);
          color: #102f50;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .pl-active-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 18px;
        }
        .pl-active-metric {
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #fbfaf7;
        }
        .pl-active-label {
          display: block;
          margin-bottom: 8px;
          color: #64748b;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .pl-active-value {
          display: block;
          color: #071326;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 24px;
          font-weight: 850;
          line-height: 1.1;
        }
        .pl-active-small {
          display: block;
          margin-top: 7px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }
        .pl-active-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pl-active-actions .pl-btn {
          width: auto;
          min-width: 190px;
          padding-inline: 18px;
        }
        .pl-grid {
          max-width: 780px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .pl-premium-strip {
          max-width: 780px;
          margin: 0 auto 24px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .pl-premium-note {
          min-height: 118px;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 18px;
          background: #ffffff;
          box-shadow: 0 10px 25px -18px rgba(15, 23, 42, 0.16);
          position: relative;
          overflow: hidden;
        }
        .pl-premium-note::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #102f50, #d9c49c);
        }
        .pl-premium-note strong {
          display: block;
          color: #102f50;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          margin-bottom: 8px;
        }
        .pl-premium-note span {
          display: block;
          color: #64748b;
          font-size: 12.5px;
          line-height: 1.5;
          font-weight: 650;
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
          background: linear-gradient(90deg, #102f50, #d9c49c);
        }

        .pl-badge {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0f172a;
          background: #ffffff;
          border: 1px solid rgba(217,196,156,.38);
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 14px;
          width: fit-content;
        }
        .pl-badge--active {
          background: rgba(217, 196, 156, 0.18);
          border-color: rgba(217, 196, 156, 0.48);
          color: #102f50;
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
          color: #d9c49c;
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
        .pl-btn--manual:disabled { opacity: 1; }

        .pl-btn--ghost {
          background: transparent;
          border-color: #e2e8f0;
          color: #0f172a;
        }
        .pl-btn--ghost:hover { background: #f8fafc; }

        .pl-btn--primary {
          background: #0f172a;
          color: #ffffff;
        }
        .pl-btn--primary:hover { filter: brightness(1.15); }

        .pl-btn--outline-pro {
          background: transparent;
          border-color: #d9c49c;
          color: #102f50;
        }
        .pl-btn--outline-pro:hover { background: #ffffff; }

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
        .pl-manual-note {
          margin: 10px 0 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }

        @media (max-width: 720px) {
          .pl-grid { grid-template-columns: 1fr; max-width: 380px; }
          .pl-premium-strip { grid-template-columns: 1fr; max-width: 380px; }
          .pl-active-panel { max-width: 380px; padding: 20px; }
          .pl-active-head, .pl-active-actions { flex-direction: column; }
          .pl-active-grid { grid-template-columns: 1fr; }
          .pl-active-actions .pl-btn { width: 100%; }
        }
      `}),(0,c.jsxs)(`div`,{className:`pl-root`,children:[(0,c.jsxs)(`div`,{className:`pl-header`,children:[(0,c.jsx)(`span`,{className:`pl-eyebrow`,children:`Planos`}),(0,c.jsx)(`h1`,{children:`Escolhe como queres vender`}),(0,c.jsx)(`p`,{children:`Publica com mais visibilidade e menos limites em carros e imóveis.`})]}),h&&(0,c.jsx)(`p`,{className:`pl-sync`,children:`A confirmar o teu pagamento...`}),d?.premiumAtivo?(0,c.jsxs)(`section`,{className:`pl-active-panel`,"aria-label":`Estado do plano PRO`,children:[(0,c.jsxs)(`div`,{className:`pl-active-head`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`span`,{className:`pl-badge pl-badge--active`,children:`Plano atual`}),(0,c.jsx)(`h2`,{children:`PRO ativo`}),(0,c.jsx)(`p`,{children:v?`Acesso atribuído pela administração.`:`A tua subscrição está ativa na Stripe.`})]}),(0,c.jsx)(`span`,{className:`pl-active-status`,children:`Ativo`})]}),(0,c.jsxs)(`div`,{className:`pl-active-grid`,children:[(0,c.jsxs)(`div`,{className:`pl-active-metric`,children:[(0,c.jsx)(`span`,{className:`pl-active-label`,children:`Próximo pagamento`}),(0,c.jsx)(`strong`,{className:`pl-active-value`,children:v?`Sem cobrança`:S||`A confirmar`}),(0,c.jsx)(`span`,{className:`pl-active-small`,children:v?`Este plano não tem portal Stripe associado.`:C||`A data aparece após sincronização da subscrição.`})]}),(0,c.jsxs)(`div`,{className:`pl-active-metric`,children:[(0,c.jsx)(`span`,{className:`pl-active-label`,children:`Renovação`}),(0,c.jsx)(`strong`,{className:`pl-active-value`,children:`10,99€ / mês`}),(0,c.jsx)(`span`,{className:`pl-active-small`,children:`Cobrança automática no método de pagamento guardado na Stripe.`})]})]}),(0,c.jsxs)(`div`,{className:`pl-active-actions`,children:[!v&&(0,c.jsx)(`button`,{className:`pl-btn pl-btn--outline-pro`,onClick:T,disabled:p,children:p?(0,c.jsx)(u,{}):`Gerir subscrição`}),(0,c.jsx)(`button`,{className:`pl-btn pl-btn--primary`,type:`button`,onClick:()=>e(`/pro`),children:`Abrir painel PRO`})]})]}):(0,c.jsxs)(`div`,{className:`pl-grid`,children:[(0,c.jsxs)(`div`,{className:`pl-card`,children:[(0,c.jsx)(`span`,{className:`pl-badge`,children:`Particular`}),(0,c.jsx)(`div`,{className:`pl-plan-name`,children:`Para quem vende pontualmente`}),(0,c.jsx)(`p`,{className:`pl-plan-desc`,children:`Ideal para colocar um imóvel ou um automóvel à venda, sem compromisso.`}),(0,c.jsx)(`div`,{className:`pl-price`,children:`Gratuito`}),(0,c.jsx)(`ul`,{className:`pl-features`,children:[`Até 5 anúncios ativos`,`Suporte base por email`].map(e=>(0,c.jsxs)(`li`,{children:[(0,c.jsx)(l,{}),e]},e))}),(0,c.jsx)(`button`,{className:`pl-btn pl-btn--ghost`,onClick:()=>e(f?`/perfil`:`/registo`),children:f?`Ir para o meu Perfil`:`Começar grátis`})]}),(0,c.jsxs)(`div`,{className:`pl-card pl-card--pro`,children:[(0,c.jsx)(`span`,{className:`pl-badge ${d?.premiumAtivo?`pl-badge--active`:``}`,children:d?.premiumAtivo?`O teu plano atual`:`Mais escolhido`}),(0,c.jsx)(`div`,{className:`pl-plan-name`,children:`PRO`}),(0,c.jsx)(`p`,{className:`pl-plan-desc`,children:`Para stands e imobiliárias que operam nos dois mundos NOXVELIA.`}),(0,c.jsxs)(`div`,{className:`pl-price`,children:[`10.99€ `,(0,c.jsx)(`span`,{children:`/mês`})]}),(0,c.jsx)(`ul`,{className:`pl-features`,children:[`Anúncios ilimitados em carros e imóveis`,`Destaque automático nos anúncios publicados`,`Prioridade nos resultados de pesquisa`,`Montra pública com contactos, links e mapa opcional`,`Painel PRO com métricas da tua carteira`,`Edição de anúncios ativos depois de publicados`,`Regras claras: se cancelares, os anúncios ativos continuam online`].map(e=>(0,c.jsxs)(`li`,{children:[(0,c.jsx)(l,{}),e]},e))}),v?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`button`,{className:`pl-btn pl-btn--outline-pro pl-btn--manual`,disabled:!0,children:`Plano PRO ativo`}),(0,c.jsx)(`p`,{className:`pl-manual-note`,children:`Este acesso foi atribuído pela administração e não tem portal de faturação Stripe.`})]}):d?.premiumAtivo?(0,c.jsx)(`button`,{className:`pl-btn pl-btn--outline-pro`,onClick:T,disabled:p,children:p?(0,c.jsx)(u,{}):`Gerir a Minha Subscrição`}):(0,c.jsx)(`button`,{className:`pl-btn pl-btn--primary`,onClick:w,disabled:p,children:`Ver detalhes e aderir`})]})]})]})]})}export{d as default};