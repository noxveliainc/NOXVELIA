import{g as e,t}from"./jsx-runtime-On9Szgki.js";import{B as n,Ft as r,Mt as i,Nt as a,P as o,Pt as s,Q as c,Tt as l,et as u,st as d}from"./mdi-CnOwmxTs.js";e();var f=r(),p=t(),m=[{value:`website`,label:`Site`,icon:i},{value:`instagram`,label:`Instagram`,icon:c},{value:`facebook`,label:`Facebook`,icon:n},{value:`linkedin`,label:`LinkedIn`,icon:u},{value:`youtube`,label:`YouTube`,icon:s},{value:`tiktok`,label:`TikTok`,icon:d},{value:`whatsapp`,label:`WhatsApp`,icon:a},{value:`outro`,label:`Link`,icon:o}],h=e=>m.find(t=>t.value===e)||m[m.length-1],g=e=>e?/^https?:\/\//i.test(e)?e:`https://${e}`:`#`,_=e=>{if(e?.tipo!==`whatsapp`)return g(e?.url);let t=String(e.url||``).replace(/\D/g,``);return t?`https://wa.me/${t.length===9?`351${t}`:t}`:`#`},v=e=>{if(e.tipo===`whatsapp`)return`WhatsApp`;let t=_(e);try{let n=new URL(t),r=n.pathname.split(`/`).filter(Boolean)[0];return[`instagram`,`tiktok`].includes(e.tipo)&&r?`@${r.replace(/^@/,``)}`:n.hostname.replace(/^www\./,``)}catch{return String(e.url).replace(/(^\w+:|^)\/\//,``)}},y=e=>{let t=Array.isArray(e?.linksPerfil)?e.linksPerfil.filter(e=>e?.url).slice(0,3):[];return t.length>0?t:e?.website?[{tipo:`website`,url:e.website}]:[]};function b({user:e,isOwner:t=!1,totalImoveis:n=0,totalCarros:r=0,links:i=[],shareLabel:a=`Partilhar Montra`,onShare:o,onEditProfile:s,onLogout:c,onUpgrade:u,onAvatarChange:d,onCapaChange:m,fileInputAvatarRef:g,fileInputCapaRef:y,uploadingAvatar:b=!1,uploadingCapa:x=!1,linkCopiado:S=!1}){let C=e?.nome?.charAt(0).toUpperCase()||`?`,w=e?.tipo===`admin`,T=e?.premiumAtivo===!0,E=e?.tipoConta===`profissional`||w,D=w?e?.nome?.toUpperCase().includes(`NOXVELIA`)?e?.nome:`NOXVELIA ${e?.nome}`:e?.nome,O=e?.mostrarTelefonePublico===!1?``:e?.telefone?.replace(/\D/g,``);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`style`,{children:`
        .profile-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }
        .profile-cover {
          height: 220px;
          background: linear-gradient(135deg, #cbd5e1, #f1f5f9);
          position: relative;
          cursor: default;
        }
        .profile-cover.is-editable { cursor: pointer; }
        .profile-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .profile-cover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15,23,42,0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .2s;
          color: #fff;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .06em;
          backdrop-filter: blur(2px);
        }
        .profile-cover.is-editable:hover .profile-cover-overlay { opacity: 1; }
        .profile-body {
          padding: 0 36px 36px;
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          position: relative;
        }
        .profile-avatar-wrap {
          margin-top: -55px;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          cursor: default;
        }
        .profile-avatar-wrap.is-editable { cursor: pointer; }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          border: 5px solid #ffffff;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 38px;
          color: #2ac1b4;
          transition: filter .2s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .profile-avatar-wrap.is-premium .profile-avatar {
          border-color: #fef08a;
          box-shadow: 0 0 0 4px rgba(234,179,8,0.2);
        }
        .profile-avatar-wrap.is-editable:hover .profile-avatar { filter: brightness(.95); }
        .profile-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .profile-avatar-overlay {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .2s;
          background: rgba(15,23,42,0.62);
          pointer-events: none;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .profile-avatar-wrap.is-editable:hover .profile-avatar-overlay { opacity: 1; }
        .profile-info { flex: 1; min-width: 0; padding-top: 16px; }
        .profile-badges {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .profile-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .05em;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: #f1f5f9;
          color: #475569;
        }
        .profile-badge.profissional { background: rgba(42,193,180,0.1); color: #0d9488; border-color: rgba(42,193,180,0.2); }
        .profile-badge.premium { background: rgba(234,179,8,0.1); color: #d97706; border-color: rgba(234,179,8,0.3); }
        .profile-upgrade {
          background: transparent;
          color: #2563eb;
          border: 1px dashed rgba(59,130,246,0.4);
          border-radius: 6px;
          font-size: 10px;
          font-weight: 900;
          padding: 6px 10px;
          cursor: pointer;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .profile-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .profile-contact-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 0 16px;
          color: #64748b;
          font-size: 13px;
        }
        .profile-contact-line span, .profile-contact-line a {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #64748b;
          text-decoration: none;
        }
        .profile-bio {
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
          margin: 0 0 16px;
          max-width: 800px;
          white-space: pre-wrap;
        }
        .profile-links {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .profile-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 800;
          color: #2563eb;
          text-decoration: none;
          border: 1px solid #dbeafe;
          background: #eff6ff;
          border-radius: 999px;
          padding: 8px 12px;
          max-width: 240px;
        }
        .profile-link.whatsapp { color: #15803d; border-color: #bbf7d0; background: #f0fdf4; }
        .profile-link span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .profile-stars { display: flex; align-items: center; gap: 4px; color: #f59e0b; margin-bottom: 24px; }
        .profile-stars-text { font-size: 13px; font-weight: 800; color: #0f172a; margin-left: 4px; }
        .profile-stars-count { font-size: 12px; font-weight: 600; color: #64748b; }
        .profile-stats { display: flex; gap: 32px; }
        .profile-stat-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; line-height: 1; }
        .profile-stat-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; color: #64748b; margin-top: 3px; }
        .profile-stat-divider { width: 1px; background: #e2e8f0; margin: 0 4px; }
        .profile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 220px;
          padding-top: 16px;
        }
        .profile-btn-solid, .profile-btn-primary, .profile-btn-outline {
          padding: 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity .2s, background .2s, border-color .2s, color .2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .profile-btn-solid { background: #0f172a; color: #ffffff; border: none; }
        .profile-btn-primary { background: rgba(42,193,180,0.1); color: #0d9488; border: 1px solid rgba(42,193,180,0.2); }
        .profile-btn-outline { background: #ffffff; color: #475569; border: 1px solid #cbd5e1; }
        .profile-btn-outline.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .dark .profile-card {
          background: #111c30;
          border-color: #334155;
          box-shadow: 0 22px 54px -34px rgba(0,0,0,0.95);
        }
        .dark .profile-cover {
          background: linear-gradient(135deg, #0f172a, #1e293b);
        }
        .dark .profile-avatar {
          background: #0f172a;
          border-color: #111c30;
          color: #2ac1b4;
        }
        .dark .profile-name,
        .dark .profile-stars-text,
        .dark .profile-stat-val {
          color: #f8fafc;
        }
        .dark .profile-contact-line,
        .dark .profile-contact-line span,
        .dark .profile-contact-line a,
        .dark .profile-bio,
        .dark .profile-stars-count,
        .dark .profile-stat-label {
          color: #cbd5e1;
        }
        .dark .profile-badge,
        .dark .profile-link,
        .dark .profile-btn-outline {
          background: #0f172a;
          border-color: #334155;
          color: #e2e8f0;
        }
        .dark .profile-badge.profissional,
        .dark .profile-link.whatsapp,
        .dark .profile-btn-primary {
          background: rgba(42,193,180,0.14);
          border-color: rgba(42,193,180,0.32);
          color: #5eead4;
        }
        .dark .profile-badge.premium {
          background: rgba(234,179,8,0.16);
          border-color: rgba(234,179,8,0.34);
          color: #facc15;
        }
        .dark .profile-btn-solid {
          background: #f8fafc;
          color: #020617;
        }
        .dark .profile-stat-divider {
          background: #334155;
        }
        @media (max-width: 768px) {
          .profile-body { padding: 0 22px 28px; }
          .profile-actions { width: 100%; padding-top: 0; }
          .profile-name { font-size: 24px; }
        }
      `}),(0,p.jsxs)(`div`,{className:`profile-card`,children:[(0,p.jsxs)(`div`,{className:`profile-cover${t&&m?` is-editable`:``}`,onClick:()=>t&&y?.current?.click(),children:[e?.capaUrl?(0,p.jsx)(`img`,{src:e.capaUrl,alt:`Capa`,loading:`lazy`,decoding:`async`}):null,t&&m&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(`div`,{className:`profile-cover-overlay`,children:[(0,p.jsx)(f.Icon,{path:`M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z`,size:.7,style:{marginRight:6}}),x?`A carregar...`:`Alterar Capa (16:9)`]}),(0,p.jsx)(`input`,{ref:y,type:`file`,accept:`image/*`,style:{display:`none`},onChange:m})]})]}),(0,p.jsxs)(`div`,{className:`profile-body`,children:[(0,p.jsxs)(`div`,{className:`profile-avatar-wrap${T?` is-premium`:``}${t&&d?` is-editable`:``}`,onClick:()=>t&&g?.current?.click(),children:[(0,p.jsx)(`div`,{className:`profile-avatar`,children:e?.avatarUrl?(0,p.jsx)(`img`,{src:e.avatarUrl,alt:D||`Perfil`,loading:`lazy`,decoding:`async`}):C}),t&&d&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`div`,{className:`profile-avatar-overlay`,children:b?`A carregar...`:`Alterar`}),(0,p.jsx)(`input`,{ref:g,type:`file`,accept:`image/*`,style:{display:`none`},onChange:d})]})]}),(0,p.jsxs)(`div`,{className:`profile-info`,children:[(0,p.jsxs)(`div`,{className:`profile-badges`,children:[(0,p.jsx)(`div`,{className:`profile-badge ${E?`profissional`:``}`,children:E?`Conta Empresa`:`Conta Particular`}),(0,p.jsxs)(`div`,{className:`profile-badge ${T?`premium`:``}`,children:[T?(0,p.jsx)(f.Icon,{path:l,size:.45}):null,T?`Premium`:`Não Premium`]}),t&&!E&&e?.tipo!==`admin`&&u&&(0,p.jsxs)(`button`,{type:`button`,className:`profile-upgrade`,onClick:u,children:[(0,p.jsx)(f.Icon,{path:`M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z`,size:.5}),` Evoluir`]})]}),(0,p.jsxs)(`h1`,{className:`profile-name`,children:[D,w&&(0,p.jsx)(f.Icon,{path:`M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z`,size:1,color:`#3b82f6`}),!w&&T&&(0,p.jsx)(f.Icon,{path:`M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z`,size:1,color:`#eab308`,title:`Membro Premium`})]}),(0,p.jsxs)(`div`,{className:`profile-contact-line`,children:[e?.email&&(0,p.jsxs)(`span`,{children:[(0,p.jsx)(f.Icon,{path:`M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z`,size:.62}),` `,e.email]}),!t&&O&&(0,p.jsxs)(`a`,{href:`tel:+351${O}`,children:[(0,p.jsx)(f.Icon,{path:`M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z`,size:.62}),` `,e.telefone]}),e?.localidade&&(0,p.jsxs)(`span`,{children:[(0,p.jsx)(f.Icon,{path:`M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z`,size:.62}),` `,e.localidade]})]}),e?.bio&&(0,p.jsx)(`p`,{className:`profile-bio`,children:e.bio}),i.length>0&&(0,p.jsx)(`div`,{className:`profile-links`,children:i.map((e,t)=>{let n=h(e.tipo);return(0,p.jsxs)(`a`,{href:_(e),target:`_blank`,rel:`noopener noreferrer`,className:`profile-link${e.tipo===`whatsapp`?` whatsapp`:``}`,children:[(0,p.jsx)(f.Icon,{path:n.icon,size:.7}),(0,p.jsx)(`span`,{children:v(e)})]},`${e.tipo}-${t}`)})}),(0,p.jsx)(`div`,{className:`profile-stars`,children:e?.rating>0?(0,p.jsxs)(p.Fragment,{children:[Array.from({length:5}).map((t,n)=>(0,p.jsx)(f.Icon,{path:l,size:.7,color:n<Math.round(e.rating)?`#f59e0b`:`#e2e8f0`},n)),(0,p.jsx)(`span`,{className:`profile-stars-text`,children:e.rating.toFixed(1)}),(0,p.jsxs)(`span`,{className:`profile-stars-count`,children:[`(`,e.totalAvaliacoes||0,` avaliacoes)`]})]}):(0,p.jsx)(`span`,{className:`profile-stars-count`,style:{marginLeft:0},children:`Sem avaliacoes recebidas`})}),(0,p.jsxs)(`div`,{className:`profile-stats`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`profile-stat-val`,children:n}),(0,p.jsx)(`div`,{className:`profile-stat-label`,children:`Imoveis`})]}),(0,p.jsx)(`div`,{className:`profile-stat-divider`}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`profile-stat-val`,children:r}),(0,p.jsx)(`div`,{className:`profile-stat-label`,children:`Automoveis`})]})]})]}),(0,p.jsxs)(`div`,{className:`profile-actions`,children:[t&&s&&(0,p.jsxs)(`button`,{className:`profile-btn-solid`,onClick:s,children:[(0,p.jsx)(f.Icon,{path:`M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z`,size:.7}),` Editar Perfil`]}),o&&(0,p.jsxs)(`button`,{className:`profile-btn-primary`,onClick:o,children:[(0,p.jsx)(f.Icon,{path:`M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08M18 4C18.55 4 19 4.45 19 5S18.55 6 18 6 17 5.55 17 5 17.45 4 18 4M6 13C5.45 13 5 12.55 5 12S5.45 11 6 11 7 11.45 7 12 6.55 13 6 13M18 20C17.45 20 17 19.55 17 19S17.45 18 18 18 19 18.45 19 19 18.55 20 18 20Z`,size:.7}),S?`Link Copiado!`:a]}),t&&c&&(0,p.jsx)(`button`,{className:`profile-btn-outline danger`,onClick:c,children:`Terminar Sessao`})]})]})]})]})}export{y as n,b as t};