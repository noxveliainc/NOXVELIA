import{A as e,O as t,T as n,b as r,p as i,v as a,y as o}from"./index-C6-CdwxB.js";import{i as s,r as c}from"./images-io1S19E8.js";import{C as l,G as u,It as ee,Jt as d,R as f,Xt as p,Yt as m,Zt as h,_ as te,_t as g,lt as _,ot as v}from"./mdi-B7Ib99Nx.js";import{t as ne}from"./AnuncioCard-DxmPr7dY.js";import{n as y,t as b}from"./ProfileView-BitfwPZ9.js";var x=e(t(),1),S=h(),C=o(),w=[{value:`website`,label:`Website`,icon:d,placeholder:`Ex: https://www.teusite.pt`},{value:`instagram`,label:`Instagram`,icon:v,placeholder:`Ex: https://instagram.com/oteuperfil`},{value:`facebook`,label:`Facebook`,icon:u,placeholder:`Ex: https://facebook.com/oteuperfil`},{value:`linkedin`,label:`LinkedIn`,icon:_,placeholder:`Ex: https://linkedin.com/in/oteuperfil`},{value:`youtube`,label:`YouTube`,icon:p,placeholder:`Ex: https://youtube.com/@oteucanal`},{value:`tiktok`,label:`TikTok`,icon:g,placeholder:`Ex: https://tiktok.com/@oteuperfil`},{value:`whatsapp`,label:`WhatsApp`,icon:m,placeholder:`Ex: 912345678 ou https://wa.me/351912345678`},{value:`outro`,label:`Outro`,icon:f,placeholder:`Ex: https://www.outrolink.pt`}],T=()=>({tipo:`website`,url:``}),E=e=>w.find(t=>t.value===e)||w[w.length-1],re=(e,t)=>{let n=Array.isArray(e)?e.filter(e=>e?.url).slice(0,3):[];return n.length>0?n.map(e=>({tipo:e.tipo||`outro`,url:e.url||``})):t?[{tipo:`website`,url:t}]:[T()]};function D(){let{user:e,signed:t,atualizarAvatar:o,atualizarUser:u,logout:d}=a(),f=n(),p=(0,x.useRef)(null),m=(0,x.useRef)(null),h=localStorage.getItem(`@App:contexto_visual`)||`imovel`,[g,_]=(0,x.useState)(null),[v,D]=(0,x.useState)([]),[O,k]=(0,x.useState)(h),[A,j]=(0,x.useState)(!0),[M,N]=(0,x.useState)(!1),[P,F]=(0,x.useState)(!1),[ie,I]=(0,x.useState)(!1),[L,ae]=(0,x.useState)(null),[oe,R]=(0,x.useState)(!1),[z,B]=(0,x.useState)(null),[V,H]=(0,x.useState)(null),[U,W]=(0,x.useState)(!1),[G,K]=(0,x.useState)({nomeEmpresa:``,nif:``,website:``}),[se,q]=(0,x.useState)(!1),[J,Y]=(0,x.useState)({bio:``,website:``,localidade:``,mostrarTelefonePublico:!0,linksPerfil:[T()]}),ce=O===`carro`?`/carros`:`/imoveis`,le=O===`carro`?`Automóveis`:`Imóveis`;(0,x.useEffect)(()=>{if(!t){f(`/login`);return}e&&_(e);let n=!0;return(async()=>{try{let[e,t]=await Promise.all([r.get(`/users/me`),r.get(`/users/me/anuncios`)]);if(!n)return;_(e.data),D(t.data),j(!1)}catch(e){if(!n)return;e.response?.status===401||e.response?.status===403?(d(),f(`/login`)):(ae(`Não foi possível carregar os teus dados.`),j(!1))}})(),()=>{n=!1}},[f,t,e,d]);let ue=()=>{d(),f(`/`,{replace:!0})},de=async e=>{let t=e.target.files[0];if(t){F(!0);try{let e=new FormData;e.append(`imagens`,t),e.append(`kind`,`avatar`);let n=await r.post(`/upload/imagens`,e,{headers:{"Content-Type":`multipart/form-data`}}),i=s(n.data)[0],a=c(i,`large`)||n.data.url,l=await r.put(`/users/me`,{avatarUrl:a});o&&o(a),_(l.data)}catch{alert(`Erro ao processar a imagem do avatar.`)}finally{F(!1)}}},fe=async e=>{let t=e.target.files[0];if(t){I(!0);try{let e=new FormData;e.append(`imagens`,t),e.append(`kind`,`cover`);let n=await r.post(`/upload/imagens`,e,{headers:{"Content-Type":`multipart/form-data`}}),i=s(n.data)[0],a=c(i,`large`)||n.data.url,o=await r.put(`/users/me`,{capaUrl:a});_(o.data),u&&u(o.data)}catch{alert(`Erro ao processar a imagem de capa.`)}finally{I(!1)}}},pe=async e=>{if(e.preventDefault(),!G.nomeEmpresa){alert(`O Nome da Empresa é obrigatório.`);return}try{W(!1),N(!0);let e=await r.put(`/users/me`,{tipoConta:`profissional`,nome:G.nomeEmpresa,nif:G.nif,website:G.website});_(e.data),u&&u(e.data),alert(`A tua conta foi evoluída para Profissional com sucesso.`)}catch{alert(`Ocorreu um erro ao evoluir a tua conta.`)}finally{N(!1)}},me=()=>{Y({bio:g?.bio||``,website:g?.website||``,localidade:g?.localidade||``,mostrarTelefonePublico:g?.mostrarTelefonePublico!==!1,linksPerfil:re(g?.linksPerfil,g?.website)}),q(!0)},X=(e,t,n)=>{Y(r=>({...r,linksPerfil:r.linksPerfil.map((r,i)=>i===e?{...r,[t]:n}:r)}))},he=()=>{Y(e=>e.linksPerfil.length>=3?e:{...e,linksPerfil:[...e.linksPerfil,T()]})},Z=e=>{Y(t=>{let n=t.linksPerfil.filter((t,n)=>n!==e);return{...t,linksPerfil:n.length?n:[T()]}})},ge=async e=>{e.preventDefault();let t=J.linksPerfil.map(e=>({tipo:e.tipo||`outro`,url:(e.url||``).trim()})).filter(e=>e.url).slice(0,3),n=t.find(e=>e.tipo===`website`)?.url||``;try{N(!0),q(!1);let e=await r.put(`/users/me`,{bio:J.bio,localidade:J.localidade,mostrarTelefonePublico:J.mostrarTelefonePublico,website:n,linksPerfil:t});_(e.data),u&&u(e.data)}catch{alert(`Erro ao guardar as alterações do perfil.`)}finally{N(!1)}},_e=async e=>{if(z===e){B(null),H(null);return}B(e);try{let{data:t}=await r.get(`/analytics/anuncio/${e}`);H(t)}catch{alert(`Erro ao carregar dados.`),B(null)}},ve=e=>{N(!0),D(t=>t.filter(t=>t._id!==e)),setTimeout(()=>N(!1),800)},ye=()=>{let e=`${window.location.origin}/vendedor/${g._id}`;navigator.clipboard.writeText(e),R(!0),setTimeout(()=>R(!1),2e3)},be=v.filter(e=>e.tipo===O),Q=v.filter(e=>e.tipo===`imovel`).length,$=v.filter(e=>e.tipo===`carro`).length,xe=y(g);return A?(0,C.jsx)(i,{label:`A carregar perfil`,detail:`Estamos a preparar a tua área NOXVELIA.`,minHeight:`100vh`,tone:`light`}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`style`,{children:`
        .perfil-outer { background: #f8fafc; min-height: calc(100vh - 72px); padding: 40px 24px; display: flex; justify-content: center; font-family: 'Inter', sans-serif; color: #0f172a; }
        .perfil-moldura { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 32px; width: 100%; max-width: 1100px; padding: 48px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); position: relative; }
        
        .perfil-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; letter-spacing: .05em; text-transform: uppercase; background: none; border: none; cursor: pointer; padding: 0; transition: color .2s; margin-bottom: 32px; }
        .perfil-back:hover { color: #0f172a; }
        
        /* CABEÇALHO DO PERFIL COM CAPA */
        .perfil-header { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        
        .perfil-capa { height: 220px; background: linear-gradient(135deg, #cbd5e1, #f1f5f9); position: relative; cursor: pointer; }
        .perfil-capa img { width: 100%; height: 100%; object-fit: cover; }
        .perfil-capa-overlay { position: absolute; inset: 0; background: rgba(15,23,42,0.3); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; color: #fff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; backdrop-filter: blur(2px); }
        .perfil-capa:hover .perfil-capa-overlay { opacity: 1; }

        .perfil-body { padding: 0 36px 36px; display: flex; gap: 32px; flex-wrap: wrap; position: relative; }
        
        .perfil-avatar-wrap { margin-top: -55px; position: relative; z-index: 2; flex-shrink: 0; cursor: pointer; }
        .perfil-avatar { width: 120px; height: 120px; border-radius: 24px; border: 5px solid #ffffff; overflow: hidden; background: #ffffff; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 38px; color: #2ac1b4; transition: filter .2s; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .perfil-avatar-wrap:hover .perfil-avatar { filter: brightness(.95); }
        .perfil-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .perfil-avatar-overlay { position: absolute; inset: 0; border-radius: 24px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; background: rgba(15,23,42,0.6); pointer-events: none; }
        .perfil-avatar-wrap:hover .perfil-avatar-overlay { opacity: 1; }
        .perfil-avatar-wrap.is-premium .perfil-avatar { border-color: #fef08a; box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.2); }
        
        .perfil-info { flex: 1; min-width: 0; padding-top: 16px; }
        
        .perfil-badges-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .perfil-badge-conta { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 5px 10px; border-radius: 6px; }
        .badge-profissional { background: rgba(42, 193, 180, 0.1); color: #0d9488; border: 1px solid rgba(42, 193, 180, 0.2); }
        .badge-particular { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
        .badge-premium { background: rgba(234, 179, 8, 0.1); color: #d97706; border: 1px solid rgba(234, 179, 8, 0.3); }
        
        .btn-upgrade { background: transparent; color: #2563eb; border: 1px dashed rgba(59, 130, 246, 0.4); border-radius: 6px; font-size: 10px; font-weight: 800; padding: 5px 10px; cursor: pointer; text-transform: uppercase; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
        .btn-upgrade:hover { background: rgba(59, 130, 246, 0.05); border-color: rgba(59, 130, 246, 0.6); }

        .perfil-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 4px; display: flex; align-items: center; gap: 8px; }
        .perfil-email { font-size: 13px; color: #64748b; margin: 0 0 16px 0; display: flex; align-items: center; }
        
        .perfil-bio { font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px 0; max-width: 800px; white-space: pre-wrap; }
        .perfil-link-row { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .perfil-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #3b82f6; text-decoration: none; border: 1px solid #dbeafe; background: #eff6ff; border-radius: 999px; padding: 8px 12px; max-width: 240px; }
        .perfil-link span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .perfil-link:hover { border-color: #93c5fd; background: #dbeafe; }

        .stars-container { display: flex; align-items: center; gap: 4px; color: #f59e0b; margin-bottom: 24px; }
        .stars-text { font-size: 13px; font-weight: 700; color: #0f172a; margin-left: 4px; }
        .stars-count { font-size: 12px; font-weight: 500; color: #64748b; }

        .perfil-stats { display: flex; gap: 32px; }
        .perfil-stat-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1; }
        .perfil-stat-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #64748b; margin-top: 3px; }
        .perfil-stat-divider { width: 1px; background: #e2e8f0; margin: 0 4px; }
        
        .perfil-actions { display: flex; flex-direction: column; gap: 10px; width: 220px; padding-top: 16px; }
        @media (max-width: 768px) { .perfil-actions { width: 100%; padding-top: 0; } }

        .btn-action-primary { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(42, 193, 180, 0.1); color: #0d9488; border: 1px solid rgba(42, 193, 180, 0.2); border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: all .2s; }
        .btn-action-primary:hover { background: rgba(42, 193, 180, 0.15); }

        .btn-action-solid { padding: 12px; background: #0f172a; color: #ffffff; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: opacity .2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-action-solid:hover { opacity: 0.85; }
        
        .btn-action-outline { padding: 12px; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
        .btn-action-outline:hover { border-color: #94a3b8; color: #0f172a; background: #f8fafc; }
        .btn-action-outline.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        
        /* RESTO DA INTERFACE (Tabs, Cards, Analytics) MANTIDO INTACTO */
        .tabs-row { display: flex; gap: 4px; margin-bottom: 28px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px; width: fit-content; }
        .tab-btn { padding: 9px 22px; border: none; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; background: transparent; color: #64748b; }
        .tab-btn.active-imovel { background: #3ecf8e; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .tab-btn.active-carro { background: #2ac1b4; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 24px; }
        .card-wrapper { display: flex; flex-direction: column; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; gap: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); transition: border-color .2s; }
        .card-wrapper:hover { border-color: #cbd5e1; }
        
        .btn-destacar,
        .badge-destacado,
        .analytics-trigger-btn {
          width: 100%;
          min-height: 42px;
          padding: 10px 12px;
          border-radius: 8px;
          box-sizing: border-box;
          font-size: 11px;
          font-weight: 800;
          line-height: 1.2;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-destacar { background: #fefce8; color: #a16207; border: 1px solid #fde047; cursor: pointer; transition: all 0.2s; }
        .btn-destacar:hover { background: #fef08a; }
        .badge-destacado { background: #fefce8; color: #ca8a04; border: 1px dashed #fde047; text-align: center; }
        
        .analytics-trigger-btn { background: #f8fafc; border: 1px dashed #cbd5e1; color: #64748b; cursor: pointer; transition: all 0.2s;}
        .analytics-trigger-btn:hover { border-color: #2ac1b4; color: #0d9488; background: #f1f5f9; }
        
        .analytics-panel { margin-top: 4px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
        .stat-box { text-align: center; }
        .stat-box-val { font-size: 20px; font-weight: 800; color: #0f172a; }
        .stat-box-lbl { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #64748b; }
        
        .chart-row { display: flex; align-items: flex-end; justify-content: space-between; height: 60px; padding-top: 10px; border-top: 1px dashed #cbd5e1; }
        .chart-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
        .chart-bar { width: 8px; background: #2ac1b4; border-radius: 2px 2px 0 0; }
        .chart-day { font-size: 8px; font-weight: 700; color: #64748b; }
        
        .perfil-loading-overlay { position: absolute; inset: 0; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; border-radius: 32px; }

        /* MODAIS PADRÃO */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; overflow-y: auto;}
        .modal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; width: 100%; max-width: 500px; padding: 40px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); margin: auto; }
        .modal-close { position: absolute; top: 24px; right: 24px; background: transparent; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s; }
        .modal-close:hover { color: #0f172a; }
        .modal-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 8px; display: flex; align-items: center; gap: 10px; }
        .modal-desc { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.5; }
        
        .modal-form-group { margin-bottom: 20px; }
        .modal-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px; }
        .modal-input { width: 100%; padding: 14px 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; outline: none; font-size: 14px; transition: all 0.2s; box-sizing: border-box; font-family: inherit; }
        .modal-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
        .modal-input::placeholder { color: #94a3b8; }
        textarea.modal-input { resize: vertical; min-height: 100px; }

        .links-editor-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
        .links-editor-header label { margin-bottom: 0; }
        .links-editor-count { font-size: 11px; color: #94a3b8; font-weight: 700; }
        .link-editor-list { display: flex; flex-direction: column; gap: 10px; }
        .link-editor-row { display: grid; grid-template-columns: 120px minmax(0, 1fr) 40px; gap: 10px; align-items: center; }
        .modal-select { width: 100%; height: 48px; padding: 0 34px 0 12px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; outline: none; font-size: 13px; font-weight: 700; font-family: inherit; appearance: none; cursor: pointer; }
        .modal-select-wrap { position: relative; }
        .modal-select-wrap::after { content: '\\25BE'; position: absolute; right: 12px; top: 50%; transform: translateY(-55%); color: #64748b; pointer-events: none; font-size: 14px; line-height: 1; }
        .link-remove-btn { width: 40px; height: 40px; border-radius: 999px; border: 1px solid #e2e8f0; background: #ffffff; color: #94a3b8; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; }
        .link-remove-btn:hover { color: #ef4444; border-color: #fecaca; background: #fef2f2; }
        .link-add-btn { margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; background: #f8fafc; color: #2563eb; border: 1px dashed #93c5fd; border-radius: 8px; padding: 10px 12px; font-size: 12px; font-weight: 800; cursor: pointer; text-transform: uppercase; }
        .link-add-btn:hover { background: #eff6ff; }
        .link-add-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .privacy-toggle { display: flex; align-items: flex-start; gap: 12px; padding: 14px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; }
        .privacy-toggle input { width: 18px; height: 18px; margin-top: 2px; accent-color: #2ac1b4; flex: 0 0 auto; }
        .privacy-toggle-title { display: block; font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .privacy-toggle-text { display: block; font-size: 12px; line-height: 1.45; color: #64748b; text-transform: none; letter-spacing: 0; font-weight: 600; }

        @media (max-width: 560px) {
          .link-editor-row { grid-template-columns: 1fr 40px; }
          .modal-select-wrap { grid-column: 1 / -1; }
        }
        
        .modal-btn-submit { width: 100%; padding: 16px; background: #3b82f6; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s; margin-top: 12px; }
        .modal-btn-submit:hover { opacity: 0.9; }
      `}),U&&(0,C.jsx)(`div`,{className:`modal-overlay`,children:(0,C.jsxs)(`div`,{className:`modal-card`,children:[(0,C.jsx)(`button`,{className:`modal-close`,onClick:()=>W(!1),children:(0,C.jsx)(S.Icon,{path:`M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z`,size:1})}),(0,C.jsxs)(`h2`,{className:`modal-title`,children:[(0,C.jsx)(S.Icon,{path:`M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z`,size:1.2,color:`#3b82f6`}),` Evolução de Conta`]}),(0,C.jsx)(`p`,{className:`modal-desc`,children:`Transforma a tua conta num perfil empresarial. Terás direito a uma montra exclusiva com links para o teu website e contactos diretos.`}),(0,C.jsxs)(`form`,{onSubmit:pe,children:[(0,C.jsxs)(`div`,{className:`modal-form-group`,children:[(0,C.jsx)(`label`,{children:`Nome do Stand / Agência *`}),(0,C.jsx)(`input`,{className:`modal-input`,type:`text`,placeholder:`Ex: Stand Vale do Sousa`,value:G.nomeEmpresa,onChange:e=>K({...G,nomeEmpresa:e.target.value}),required:!0})]}),(0,C.jsxs)(`div`,{className:`modal-form-group`,children:[(0,C.jsx)(`label`,{children:`NIF da Empresa (Opcional)`}),(0,C.jsx)(`input`,{className:`modal-input`,type:`text`,placeholder:`Ex: 501234567`,value:G.nif,onChange:e=>K({...G,nif:e.target.value})})]}),(0,C.jsxs)(`div`,{className:`modal-form-group`,children:[(0,C.jsx)(`label`,{children:`Website (Opcional)`}),(0,C.jsx)(`input`,{className:`modal-input`,type:`url`,placeholder:`Ex: https://www.omeustand.pt`,value:G.website,onChange:e=>K({...G,website:e.target.value})})]}),(0,C.jsx)(`button`,{className:`modal-btn-submit`,type:`submit`,children:`Confirmar Evolução`})]})]})}),se&&(0,C.jsx)(`div`,{className:`modal-overlay`,children:(0,C.jsxs)(`div`,{className:`modal-card`,children:[(0,C.jsx)(`button`,{className:`modal-close`,onClick:()=>q(!1),children:(0,C.jsx)(S.Icon,{path:`M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z`,size:1})}),(0,C.jsxs)(`h2`,{className:`modal-title`,children:[(0,C.jsx)(S.Icon,{path:`M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z`,size:1.2,color:`#3b82f6`}),` Editar Perfil`]}),(0,C.jsx)(`p`,{className:`modal-desc`,children:`Personaliza a tua presença na plataforma. Adiciona uma biografia para que os compradores saibam quem és.`}),(0,C.jsxs)(`form`,{onSubmit:ge,children:[(0,C.jsxs)(`div`,{className:`modal-form-group`,children:[(0,C.jsx)(`label`,{children:`Biografia do Perfil (Máx 800 Carateres)`}),(0,C.jsx)(`textarea`,{className:`modal-input`,placeholder:`Escreve um pouco sobre ti ou sobre o teu stand...`,value:J.bio,onChange:e=>Y({...J,bio:e.target.value}),maxLength:800})]}),(0,C.jsxs)(`div`,{className:`modal-form-group`,children:[(0,C.jsxs)(`div`,{className:`links-editor-header`,children:[(0,C.jsx)(`label`,{children:`Links do Perfil`}),(0,C.jsxs)(`span`,{className:`links-editor-count`,children:[J.linksPerfil.filter(e=>e.url).length,`/3`]})]}),(0,C.jsx)(`div`,{className:`link-editor-list`,children:J.linksPerfil.map((e,t)=>{let n=E(e.tipo);return(0,C.jsxs)(`div`,{className:`link-editor-row`,children:[(0,C.jsx)(`div`,{className:`modal-select-wrap`,children:(0,C.jsx)(`select`,{className:`modal-select`,value:e.tipo,onChange:e=>X(t,`tipo`,e.target.value),children:w.map(e=>(0,C.jsx)(`option`,{value:e.value,children:e.label},e.value))})}),(0,C.jsx)(`input`,{className:`modal-input`,type:`text`,inputMode:`url`,placeholder:n.placeholder,value:e.url,onChange:e=>X(t,`url`,e.target.value)}),(0,C.jsx)(`button`,{type:`button`,className:`link-remove-btn`,onClick:()=>Z(t),"aria-label":`Remover link`,children:(0,C.jsx)(S.Icon,{path:`M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z`,size:.72})})]},t)})}),(0,C.jsxs)(`button`,{type:`button`,className:`link-add-btn`,onClick:he,disabled:J.linksPerfil.length>=3,children:[(0,C.jsx)(S.Icon,{path:`M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z`,size:.65}),` Adicionar Link`]})]}),(0,C.jsx)(`div`,{className:`modal-form-group`,children:(0,C.jsxs)(`label`,{className:`privacy-toggle`,children:[(0,C.jsx)(`input`,{type:`checkbox`,checked:J.mostrarTelefonePublico,onChange:e=>Y({...J,mostrarTelefonePublico:e.target.checked})}),(0,C.jsxs)(`span`,{children:[(0,C.jsx)(`span`,{className:`privacy-toggle-title`,children:`Mostrar o meu telemóvel nos anúncios e no perfil`}),(0,C.jsx)(`span`,{className:`privacy-toggle-text`,children:`Se desligares esta opção, o perfil público e os anúncios apresentam apenas o email.`})]})]})}),(0,C.jsx)(`button`,{className:`modal-btn-submit`,type:`submit`,children:`Guardar Alterações`})]})]})}),(0,C.jsx)(`div`,{className:`perfil-outer`,children:(0,C.jsxs)(`div`,{className:`perfil-moldura`,children:[L&&(0,C.jsx)(`div`,{style:{background:`#fef2f2`,border:`1px solid #fecaca`,color:`#b91c1c`,padding:`14px 16px`,borderRadius:12,marginBottom:24,fontSize:14,fontWeight:600},children:L}),M&&(0,C.jsx)(`div`,{className:`perfil-loading-overlay`,children:(0,C.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`16px`},children:[(0,C.jsx)(`div`,{className:`nx-spinner`,style:{borderColor:`rgba(42, 193, 180, 0.2)`,borderTopColor:`#2ac1b4`}}),(0,C.jsx)(`span`,{style:{fontFamily:`var(--nx-font-body)`,fontWeight:600,color:`#0f172a`,fontSize:`14px`},children:`A processar...`})]})}),(0,C.jsxs)(`button`,{onClick:()=>f(ce),className:`perfil-back`,children:[(0,C.jsx)(S.Icon,{path:l,size:.7}),` `,le]}),(0,C.jsx)(b,{user:g,isOwner:!0,totalImoveis:Q,totalCarros:$,links:xe,onEditProfile:me,onShare:ye,onLogout:ue,onUpgrade:()=>W(!0),onAvatarChange:de,onCapaChange:fe,fileInputAvatarRef:p,fileInputCapaRef:m,uploadingAvatar:P,uploadingCapa:ie,linkCopiado:oe}),!1,(0,C.jsxs)(`div`,{className:`tabs-row`,children:[(0,C.jsxs)(`button`,{className:`tab-btn${O===`imovel`?` active-imovel`:``}`,onClick:()=>k(`imovel`),children:[`Imóveis `,Q>0&&`(${Q})`]}),(0,C.jsxs)(`button`,{className:`tab-btn${O===`carro`?` active-carro`:``}`,onClick:()=>k(`carro`),children:[`Automóveis `,$>0&&`(${$})`]})]}),(0,C.jsx)(`div`,{className:`cards-grid`,children:be.map(e=>(0,C.jsxs)(`div`,{className:`card-wrapper`,children:[(0,C.jsx)(ne,{anuncio:e,showStatus:!0,onAnuncioEliminado:ve}),e.destacado?(0,C.jsxs)(`div`,{className:`badge-destacado`,children:[(0,C.jsx)(S.Icon,{path:ee,size:.6}),` Destaque Ativo`]}):(0,C.jsx)(`button`,{className:`btn-destacar`,onClick:()=>f(`/sucesso/`+e._id),children:`Promover Anúncio (1.99€)`}),(0,C.jsxs)(`button`,{className:`analytics-trigger-btn`,onClick:()=>_e(e._id),children:[(0,C.jsx)(S.Icon,{path:te,size:.7}),` `,z===e._id?`Ocultar Relatório`:`Ver Performance`]}),z===e._id&&V&&(0,C.jsxs)(`div`,{className:`analytics-panel`,children:[(0,C.jsxs)(`div`,{className:`stat-grid`,children:[(0,C.jsxs)(`div`,{className:`stat-box`,children:[(0,C.jsx)(`div`,{className:`stat-box-val`,children:V.totalVisitas}),(0,C.jsx)(`div`,{className:`stat-box-lbl`,children:`Visitas`})]}),(0,C.jsxs)(`div`,{className:`stat-box`,style:{borderLeft:`1px solid #e2e8f0`,borderRight:`1px solid #e2e8f0`},children:[(0,C.jsx)(`div`,{className:`stat-box-val`,style:{color:`#3b82f6`},children:V.guardadoEmFavoritos}),(0,C.jsx)(`div`,{className:`stat-box-lbl`,children:`Favoritos`})]}),(0,C.jsxs)(`div`,{className:`stat-box`,children:[(0,C.jsx)(`div`,{className:`stat-box-val`,style:{color:`#2ac1b4`},children:V.contactosGerados}),(0,C.jsx)(`div`,{className:`stat-box-lbl`,children:`Mensagens`})]})]}),(0,C.jsx)(`div`,{className:`chart-row`,children:V.graficoSeteDias.map((e,t)=>(0,C.jsxs)(`div`,{className:`chart-bar-wrap`,children:[(0,C.jsx)(`div`,{className:`chart-bar`,style:{height:`${Math.max(e.visitas/Math.max(...V.graficoSeteDias.map(e=>e.visitas),10)*100,5)}%`,opacity:e.visitas===0?.3:1}}),(0,C.jsx)(`div`,{className:`chart-day`,children:e.dataLabel})]},t))})]})]},e._id))})]})})]})}export{D as default};