import{C as e,N as t,O as n,S as r,T as i,j as a,x as o}from"./index-CvIKgv8j.js";var s=t(a(),1),c=r(),l=()=>(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,children:(0,c.jsx)(`path`,{d:`M20 6L9 17l-5-5`})}),u=()=>(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,className:`pl-spinner`,children:(0,c.jsx)(`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`})});function d(){let t=n(),[r]=i(),{sincronizarUser:a,user:d}=o(),[f,p]=(0,s.useState)(!1),[m,h]=(0,s.useState)(!1),g=!!(d?.stripeCustomerId||d?.stripeSubscriptionId),_=!!(d?.premiumAtivo&&!g);return(0,s.useEffect)(()=>{r.get(`premium`)===`sucesso`&&(h(!0),a().finally(()=>h(!1)))},[r]),(0,s.useEffect)(()=>{if(!(d?._id||d?.id))return;let e=!0;return h(!0),a().finally(()=>{e&&h(!1)}),()=>{e=!1}},[d?._id,d?.id]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`style`,{children:`
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
          border: 1px solid rgba(217, 196, 156, 0.42);
          border-radius: 16px;
          padding: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(217,196,156,0.08));
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

        .pl-btn--dark {
          background: #0f172a;
          color: #ffffff;
        }
        .pl-btn--dark:hover { filter: brightness(1.15); }

        .pl-btn--outline-pro {
          background: transparent;
          border-color: #d9c49c;
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
        .pl-manual-note {
          margin: 10px 0 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }

        @media (max-width: 720px) {
          .pl-grid { grid-template-columns: 1fr; max-width: 380px; }
          .pl-premium-strip { grid-template-columns: 1fr; max-width: 380px; }
        }
      `}),(0,c.jsxs)(`div`,{className:`pl-root`,children:[(0,c.jsxs)(`div`,{className:`pl-header`,children:[(0,c.jsx)(`span`,{className:`pl-eyebrow`,children:`Planos`}),(0,c.jsx)(`h1`,{children:`Escolhe como queres vender`}),(0,c.jsx)(`p`,{children:`Publica com mais visibilidade e menos limites em carros e imóveis.`})]}),m&&(0,c.jsx)(`p`,{className:`pl-sync`,children:`A confirmar o teu pagamento...`}),(0,c.jsx)(`div`,{className:`pl-premium-strip`,children:[{title:`Mais visibilidade`,text:`Os anúncios premium aparecem com prioridade e sinalização própria.`},{title:`Montra completa`,text:`Perfil público preparado para stands, mediadores e vendedores ativos.`},{title:`Leitura rápida`,text:`Métricas simples para perceber visitas, contactos e qualidade dos anúncios.`},{title:`Sem surpresas`,text:`Antes do pagamento mostramos exatamente o que acontece se cancelares.`}].map(e=>(0,c.jsxs)(`div`,{className:`pl-premium-note`,children:[(0,c.jsx)(`strong`,{children:e.title}),(0,c.jsx)(`span`,{children:e.text})]},e.title))}),(0,c.jsxs)(`div`,{className:`pl-grid`,children:[(0,c.jsxs)(`div`,{className:`pl-card`,children:[(0,c.jsx)(`span`,{className:`pl-badge`,children:`Particular`}),(0,c.jsx)(`div`,{className:`pl-plan-name`,children:`Para quem vende pontualmente`}),(0,c.jsx)(`p`,{className:`pl-plan-desc`,children:`Ideal para colocar um imóvel ou um automóvel à venda, sem compromisso.`}),(0,c.jsx)(`div`,{className:`pl-price`,children:`Gratuito`}),(0,c.jsx)(`ul`,{className:`pl-features`,children:[`Até 10 anúncios simultâneos`,`Suporte base por email`].map(e=>(0,c.jsxs)(`li`,{children:[(0,c.jsx)(l,{}),e]},e))}),(0,c.jsx)(`button`,{className:`pl-btn pl-btn--ghost`,onClick:()=>t(`/perfil`),children:`Ir para o meu Perfil`})]}),(0,c.jsxs)(`div`,{className:`pl-card pl-card--pro`,children:[(0,c.jsx)(`span`,{className:`pl-badge ${d?.premiumAtivo?`pl-badge--active`:``}`,children:d?.premiumAtivo?`O teu plano atual`:`Mais escolhido`}),(0,c.jsx)(`div`,{className:`pl-plan-name`,children:`Profissional`}),(0,c.jsx)(`p`,{className:`pl-plan-desc`,children:`Para stands e imobiliárias que operam nos dois mundos NOXVELIA.`}),(0,c.jsxs)(`div`,{className:`pl-price`,children:[`10.99€ `,(0,c.jsx)(`span`,{children:`/mês`})]}),(0,c.jsx)(`ul`,{className:`pl-features`,children:[`Anúncios ilimitados em carros e imóveis`,`Destaque automático nos anúncios publicados`,`Prioridade nos resultados de pesquisa`,`Montra pública com contactos, links e mapa opcional`,`Painel Premium com métricas da tua carteira`,`Edição de anúncios ativos depois de publicados`,`Regras claras: se cancelares, os anúncios ativos continuam online`].map(e=>(0,c.jsxs)(`li`,{children:[(0,c.jsx)(l,{}),e]},e))}),_?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`button`,{className:`pl-btn pl-btn--outline-pro pl-btn--manual`,disabled:!0,children:`Plano profissional ativo`}),(0,c.jsx)(`p`,{className:`pl-manual-note`,children:`Este acesso foi atribuído pela administração e não tem portal de faturação Stripe.`})]}):d?.premiumAtivo?(0,c.jsx)(`button`,{className:`pl-btn pl-btn--outline-pro`,onClick:async()=>{p(!0);try{let t=await e.post(`/stripe/criar-portal-cliente`);t.data&&t.data.url&&(window.location.href=t.data.url)}catch{alert(`Erro ao abrir o portal de gestão. Tenta novamente.`),p(!1)}},disabled:f,children:f?(0,c.jsx)(u,{}):`Gerir a Minha Subscrição`}):(0,c.jsx)(`button`,{className:`pl-btn pl-btn--dark`,onClick:()=>{t(`/premium-confirmar`)},disabled:f,children:`Ver detalhes e aderir`})]})]}),(0,c.jsx)(`p`,{className:`pl-note`,children:`Podes cancelar a qualquer momento através do portal de gestão da subscrição.`})]})]})}export{d as default};