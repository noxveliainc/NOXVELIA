import{d as e,g as t,t as n,u as r,y as i}from"./jsx-runtime-On9Szgki.js";import{x as a}from"./index-CAifC5r_.js";import{wt as o}from"./mdi-CgcECdTh.js";import{n as s}from"./seo-BmrZTbI5.js";import{t as c}from"./Seo-C5HNgTco.js";import{t as l}from"./AnuncioCard-CZxDqW6f.js";import{n as u,t as d}from"./ProfileView-CkuWCa7S.js";var f=i(t(),1);o();var p=n();function m(){let{id:t}=e(),n=r(),[i,o]=(0,f.useState)(null),[m,h]=(0,f.useState)([]),[g,_]=(0,f.useState)(!0),[v,y]=(0,f.useState)(``),[b,x]=(0,f.useState)(!1);(0,f.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:n}=await a.get(`/users/vendedor/${t}`);if(!e)return;o(n.vendedor),h(n.anuncios||[])}catch{e&&y(`Erro ao carregar a montra do vendedor.`)}finally{e&&_(!1)}})(),()=>{e=!1}},[t]);let S=()=>{let e=window.location.href;navigator.clipboard.writeText(e),x(!0),setTimeout(()=>x(!1),2e3)};if(g)return(0,p.jsx)(`div`,{style:{minHeight:`calc(100vh - 80px)`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`#f8fafc`},children:(0,p.jsx)(`div`,{className:`nx-spinner`,style:{borderColor:`#e2e8f0`,borderTopColor:`#0f172a`}})});if(v)return(0,p.jsxs)(`div`,{style:{minHeight:`calc(100vh - 80px)`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,background:`#f8fafc`,color:`#0f172a`},children:[(0,p.jsx)(`p`,{style:{color:`#64748b`,marginBottom:`24px`,fontSize:`15px`},children:v}),(0,p.jsx)(`button`,{onClick:()=>n(-1),style:{padding:`12px 24px`,background:`#0f172a`,color:`#fff`,border:`none`,borderRadius:`8px`,fontWeight:700,cursor:`pointer`},children:`Voltar a pesquisa`})]});i?.nome?.charAt(0).toUpperCase();let C=i?.tipo===`admin`;C||i?.premiumAtivo;let w=C?i.nome.toUpperCase().includes(`NOXVELIA`)?i.nome:`NOXVELIA ${i.nome}`:i?.nome,T=i?.tipoConta===`profissional`||C;i?.telefone?.replace(/\D/g,``);let E=u(i);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c,{title:`${w} — vendedor na Noxvelia`,description:(i?.bio||`Consulta os anúncios de ${w} na Noxvelia.`).slice(0,160),path:`/vendedor/${t}`,image:i?.avatarUrl||void 0,type:`profile`,jsonLd:{"@context":`https://schema.org`,"@type":T?`Organization`:`Person`,name:w,description:i?.bio,image:i?.avatarUrl,url:s(`/vendedor/${t}`)}}),(0,p.jsx)(`style`,{children:`
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
      `}),(0,p.jsxs)(`div`,{className:`pp-root`,children:[(0,p.jsxs)(`div`,{className:`pp-hero`,children:[(0,p.jsx)(`div`,{className:`pp-cover`,children:i?.capaUrl&&(0,p.jsx)(`img`,{src:i.capaUrl,alt:``})}),(0,p.jsxs)(`div`,{className:`pp-hero-content`,children:[(0,p.jsx)(`button`,{onClick:()=>n(-1),className:`pp-back`,children:`Voltar atras`}),(0,p.jsx)(d,{user:i,isOwner:!1,totalImoveis:m.filter(e=>e.tipo===`imovel`).length,totalCarros:m.filter(e=>e.tipo===`carro`).length,links:E,onShare:S,linkCopiado:b}),!1]})]}),(0,p.jsxs)(`div`,{className:`pp-main`,children:[(0,p.jsxs)(`div`,{className:`pp-section-header`,children:[(0,p.jsx)(`h2`,{className:`pp-section-title`,children:`Portfolio de Ativos`}),(0,p.jsxs)(`div`,{className:`pp-count`,children:[m.length,` disponíveis`]})]}),(0,p.jsx)(`div`,{className:`pp-grid`,children:m.map(e=>{let t=e?.utilizador&&typeof e.utilizador==`object`?e.utilizador:i;return(0,p.jsx)(l,{anuncio:{...e,utilizador:t},forceSellerIdentity:!0},e._id)})})]})]})]})}export{m as default};