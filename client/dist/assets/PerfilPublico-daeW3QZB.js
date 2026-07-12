import{d as e,g as t,t as n,u as r,y as i}from"./jsx-runtime-On9Szgki.js";import{c as a}from"./index-CJvlEbxj.js";import{wt as o}from"./mdi-CgcECdTh.js";import{t as s}from"./AnuncioCard-C_NSPb_3.js";import{n as c,t as l}from"./ProfileView-BUyMB-D8.js";var u=i(t(),1);o();var d=n();function f(){let{id:t}=e(),n=r(),[i,o]=(0,u.useState)(null),[f,p]=(0,u.useState)([]),[m,h]=(0,u.useState)(!0),[g,_]=(0,u.useState)(``),[v,y]=(0,u.useState)(!1);(0,u.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:n}=await a.get(`/users/vendedor/${t}`);if(!e)return;o(n.vendedor),p(n.anuncios||[])}catch{e&&_(`Erro ao carregar a montra do vendedor.`)}finally{e&&h(!1)}})(),()=>{e=!1}},[t]);let b=()=>{let e=window.location.href;navigator.clipboard.writeText(e),y(!0),setTimeout(()=>y(!1),2e3)};if(m)return(0,d.jsx)(`div`,{style:{minHeight:`calc(100vh - 80px)`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`#f8fafc`},children:(0,d.jsx)(`div`,{className:`nx-spinner`,style:{borderColor:`#e2e8f0`,borderTopColor:`#0f172a`}})});if(g)return(0,d.jsxs)(`div`,{style:{minHeight:`calc(100vh - 80px)`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,background:`#f8fafc`,color:`#0f172a`},children:[(0,d.jsx)(`p`,{style:{color:`#64748b`,marginBottom:`24px`,fontSize:`15px`},children:g}),(0,d.jsx)(`button`,{onClick:()=>n(-1),style:{padding:`12px 24px`,background:`#0f172a`,color:`#fff`,border:`none`,borderRadius:`8px`,fontWeight:700,cursor:`pointer`},children:`Voltar a pesquisa`})]});i?.nome?.charAt(0).toUpperCase();let x=i?.tipo===`admin`;x||i?.premiumAtivo,x?i.nome.toUpperCase().includes(`NOXVELIA`)?i.nome:`${i.nome}`:i?.nome,i?.tipoConta,i?.telefone?.replace(/\D/g,``);let S=c(i);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`style`,{children:`
        .pp-root { background: #f8fafc; min-height: calc(100vh - 80px); font-family: 'Inter', sans-serif; color: #0f172a; padding-bottom: 80px; }
        .pp-hero { position: relative; background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 36px 24px 20px; margin-bottom: 48px; overflow: hidden; }
        .pp-cover { display: none; }
        .pp-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pp-cover::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,23,42,0.42), rgba(15,23,42,0.22) 45%, rgba(248,250,252,0.95)); }
        .pp-hero-content { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .pp-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; margin-bottom: 24px; transition: color 0.2s; }
        .pp-back:hover { color: #0f172a; }
        .pp-user-section { display: flex; align-items: flex-start; gap: 40px; background: #ffffff; border: 1px solid #e2e8f0; padding: 40px; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); margin-top: 86px; }
        .pp-avatar { width: 140px; height: 140px; border-radius: 24px; background: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 48px; font-weight: 800; color: #0f172a; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); flex-shrink: 0; }
        .pp-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .pp-info { flex: 1; min-width: 0; }
        .pp-badge-pro, .pp-badge-particular { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 8px; margin-bottom: 12px; }
        .pp-badge-pro { color: #0f766e; background: #f0fdfa; border: 1px solid #ccfbf1; }
        .pp-badge-particular { color: #475569; background: #f1f5f9; border: 1px solid #e2e8f0; }
        .pp-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 36px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 12px; display: flex; align-items: center; gap: 10px; color: #0f172a; }
        .pp-location { font-size: 15px; color: #475569; font-weight: 500; margin: 0 0 24px; display: flex; align-items: center; gap: 6px; }
        .pp-bio { max-width: 760px; color: #334155; font-size: 15px; line-height: 1.65; margin: -8px 0 24px; white-space: pre-wrap; }
        .pp-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-contact { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .btn-whatsapp { background: #25d366; color: #ffffff; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2); }
        .btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3); }
        .btn-secondary { background: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; }
        .btn-secondary:hover { background: #f8fafc; border-color: #94a3b8; }
        .btn-website { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
        .btn-website:hover { background: #e0f2fe; border-color: #7dd3fc; }
        .btn-social { background: #f8fafc; color: #0f172a; border: 1px solid #cbd5e1; }
        .btn-social:hover { background: #f1f5f9; border-color: #94a3b8; transform: translateY(-1px); }
        .pp-main { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .pp-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
        .pp-section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; margin: 0; color: #0f172a; }
        .pp-count { font-size: 13px; color: #475569; font-weight: 700; background: #e2e8f0; padding: 6px 12px; border-radius: 20px; }
        .pp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 32px; }
        @media (max-width: 860px) {
          .pp-user-section { flex-direction: column; text-align: center; align-items: center; gap: 24px; padding: 32px 20px; }
          .pp-name, .pp-location, .pp-actions { justify-content: center; }
          .pp-actions { width: 100%; }
          .pp-bio { text-align: center; }
        }
      `}),(0,d.jsxs)(`div`,{className:`pp-root`,children:[(0,d.jsxs)(`div`,{className:`pp-hero`,children:[(0,d.jsx)(`div`,{className:`pp-cover`,children:i?.capaUrl&&(0,d.jsx)(`img`,{src:i.capaUrl,alt:``})}),(0,d.jsxs)(`div`,{className:`pp-hero-content`,children:[(0,d.jsx)(`button`,{onClick:()=>n(-1),className:`pp-back`,children:`Voltar atras`}),(0,d.jsx)(l,{user:i,isOwner:!1,totalImoveis:f.filter(e=>e.tipo===`imovel`).length,totalCarros:f.filter(e=>e.tipo===`carro`).length,links:S,onShare:b,linkCopiado:v}),!1]})]}),(0,d.jsxs)(`div`,{className:`pp-main`,children:[(0,d.jsxs)(`div`,{className:`pp-section-header`,children:[(0,d.jsx)(`h2`,{className:`pp-section-title`,children:`Portfolio de Ativos`}),(0,d.jsxs)(`div`,{className:`pp-count`,children:[f.length,` Disponiveis`]})]}),(0,d.jsx)(`div`,{className:`pp-grid`,children:f.map(e=>{let t=e?.utilizador&&typeof e.utilizador==`object`?e.utilizador:i;return(0,d.jsx)(s,{anuncio:{...e,utilizador:t},forceSellerIdentity:!0},e._id)})})]})]})]})}export{f as default};