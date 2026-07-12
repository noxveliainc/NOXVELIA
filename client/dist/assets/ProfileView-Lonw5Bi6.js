import{j as a}from"./index-W-wvA4Qe.js";import{I as r,U as $,Q as u,T as M,P as T,R as U,N as V,y as W,a3 as _,A as D,V as J,W as X,X as Y,Y as H,Z as B,_ as K,O as Q,$ as Z}from"./mdi-B2-VfyGs.js";const b=[{value:"website",label:"Site",icon:J},{value:"instagram",label:"Instagram",icon:X},{value:"facebook",label:"Facebook",icon:Y},{value:"linkedin",label:"LinkedIn",icon:H},{value:"youtube",label:"YouTube",icon:B},{value:"tiktok",label:"TikTok",icon:K},{value:"whatsapp",label:"WhatsApp",icon:Q},{value:"outro",label:"Link",icon:Z}],q=e=>b.find(i=>i.value===e)||b[b.length-1],G=e=>e?/^https?:\/\//i.test(e)?e:`https://${e}`:"#",L=e=>{if((e==null?void 0:e.tipo)!=="whatsapp")return G(e==null?void 0:e.url);const i=String(e.url||"").replace(/\D/g,"");return i?`https://wa.me/${i.length===9?`351${i}`:i}`:"#"},O=e=>{if(e.tipo==="whatsapp")return"WhatsApp";const i=L(e);try{const t=new URL(i),n=t.pathname.split("/").filter(Boolean)[0];return["instagram","tiktok"].includes(e.tipo)&&n?`@${n.replace(/^@/,"")}`:t.hostname.replace(/^www\./,"")}catch{return String(e.url).replace(/(^\w+:|^)\/\//,"")}},ae=e=>{const i=Array.isArray(e==null?void 0:e.linksPerfil)?e.linksPerfil.filter(t=>t==null?void 0:t.url).slice(0,3):[];return i.length>0?i:e!=null&&e.website?[{tipo:"website",url:e.website}]:[]};function ie({user:e,isOwner:i=!1,totalImoveis:t=0,totalCarros:n=0,links:g=[],shareLabel:I="Partilhar Montra",onShare:h,onEditProfile:v,onLogout:j,onUpgrade:y,onAvatarChange:d,onCapaChange:x,fileInputAvatarRef:s,fileInputCapaRef:p,uploadingAvatar:S=!1,uploadingCapa:A=!1,linkCopiado:E=!1}){var N,P,z;const F=((N=e==null?void 0:e.nome)==null?void 0:N.charAt(0).toUpperCase())||"?",c=(e==null?void 0:e.tipo)==="admin",l=(e==null?void 0:e.premiumAtivo)===!0,m=(e==null?void 0:e.tipoConta)==="profissional"||c,w=c?(P=e==null?void 0:e.nome)!=null&&P.toUpperCase().includes("NOXVELIA")?e==null?void 0:e.nome:`NOXVELIA ${e==null?void 0:e.nome}`:e==null?void 0:e.nome,k=(z=e==null?void 0:e.telefone)==null?void 0:z.replace(/\D/g,"");return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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
        @media (max-width: 768px) {
          .profile-body { padding: 0 22px 28px; }
          .profile-actions { width: 100%; padding-top: 0; }
          .profile-name { font-size: 24px; }
        }
      `}),a.jsxs("div",{className:"profile-card",children:[a.jsxs("div",{className:`profile-cover${i&&x?" is-editable":""}`,onClick:()=>{var o;return i&&((o=p==null?void 0:p.current)==null?void 0:o.click())},children:[e!=null&&e.capaUrl?a.jsx("img",{src:e.capaUrl,alt:"Capa"}):null,i&&x&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"profile-cover-overlay",children:[a.jsx(r.Icon,{path:$,size:.7,style:{marginRight:6}}),A?"A carregar...":"Alterar Capa (16:9)"]}),a.jsx("input",{ref:p,type:"file",accept:"image/*",style:{display:"none"},onChange:x})]})]}),a.jsxs("div",{className:"profile-body",children:[a.jsxs("div",{className:`profile-avatar-wrap${l?" is-premium":""}${i&&d?" is-editable":""}`,onClick:()=>{var o;return i&&((o=s==null?void 0:s.current)==null?void 0:o.click())},children:[a.jsx("div",{className:"profile-avatar",children:e!=null&&e.avatarUrl?a.jsx("img",{src:e.avatarUrl,alt:w||"Perfil"}):F}),i&&d&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"profile-avatar-overlay",children:S?"A carregar...":"Alterar"}),a.jsx("input",{ref:s,type:"file",accept:"image/*",style:{display:"none"},onChange:d})]})]}),a.jsxs("div",{className:"profile-info",children:[a.jsxs("div",{className:"profile-badges",children:[a.jsx("div",{className:`profile-badge ${m?"profissional":""}`,children:m?"Conta Empresa":"Conta Particular"}),a.jsxs("div",{className:`profile-badge ${l?"premium":""}`,children:[l?a.jsx(r.Icon,{path:u,size:.45}):null,l?"Premium":"Nao Premium"]}),i&&!m&&(e==null?void 0:e.tipo)!=="admin"&&y&&a.jsxs("button",{type:"button",className:"profile-upgrade",onClick:y,children:[a.jsx(r.Icon,{path:M,size:.5})," Evoluir"]})]}),a.jsxs("h1",{className:"profile-name",children:[w,c&&a.jsx(r.Icon,{path:T,size:1,color:"#3b82f6"}),!c&&l&&a.jsx(r.Icon,{path:U,size:1,color:"#eab308",title:"Membro Premium"})]}),a.jsxs("div",{className:"profile-contact-line",children:[(e==null?void 0:e.email)&&a.jsxs("span",{children:[a.jsx(r.Icon,{path:V,size:.62})," ",e.email]}),!i&&k&&a.jsxs("a",{href:`tel:+351${k}`,children:[a.jsx(r.Icon,{path:W,size:.62})," ",e.telefone]}),(e==null?void 0:e.localidade)&&a.jsxs("span",{children:[a.jsx(r.Icon,{path:_,size:.62})," ",e.localidade]})]}),(e==null?void 0:e.bio)&&a.jsx("p",{className:"profile-bio",children:e.bio}),g.length>0&&a.jsx("div",{className:"profile-links",children:g.map((o,f)=>{const C=q(o.tipo);return a.jsxs("a",{href:L(o),target:"_blank",rel:"noopener noreferrer",className:`profile-link${o.tipo==="whatsapp"?" whatsapp":""}`,children:[a.jsx(r.Icon,{path:C.icon,size:.7}),a.jsx("span",{children:O(o)})]},`${o.tipo}-${f}`)})}),a.jsx("div",{className:"profile-stars",children:(e==null?void 0:e.rating)>0?a.jsxs(a.Fragment,{children:[Array.from({length:5}).map((o,f)=>a.jsx(r.Icon,{path:u,size:.7,color:f<Math.round(e.rating)?"#f59e0b":"#e2e8f0"},f)),a.jsx("span",{className:"profile-stars-text",children:e.rating.toFixed(1)}),a.jsxs("span",{className:"profile-stars-count",children:["(",e.totalAvaliacoes||0," avaliacoes)"]})]}):a.jsx("span",{className:"profile-stars-count",style:{marginLeft:0},children:"Sem avaliacoes recebidas"})}),a.jsxs("div",{className:"profile-stats",children:[a.jsxs("div",{children:[a.jsx("div",{className:"profile-stat-val",children:t}),a.jsx("div",{className:"profile-stat-label",children:"Imoveis"})]}),a.jsx("div",{className:"profile-stat-divider"}),a.jsxs("div",{children:[a.jsx("div",{className:"profile-stat-val",children:n}),a.jsx("div",{className:"profile-stat-label",children:"Automoveis"})]})]})]}),a.jsxs("div",{className:"profile-actions",children:[i&&v&&a.jsxs("button",{className:"profile-btn-solid",onClick:v,children:[a.jsx(r.Icon,{path:$,size:.7})," Editar Perfil"]}),h&&a.jsxs("button",{className:"profile-btn-primary",onClick:h,children:[a.jsx(r.Icon,{path:D,size:.7}),E?"Link Copiado!":I]}),i&&j&&a.jsx("button",{className:"profile-btn-outline danger",onClick:j,children:"Terminar Sessao"})]})]})]})]})}export{ie as P,ae as o};
