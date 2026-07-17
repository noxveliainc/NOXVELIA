import{g as e,t,u as n,y as r}from"./jsx-runtime-On9Szgki.js";import{C as i,_ as a,g as o,w as s}from"./index-D2Xr4Zru.js";import{B as c,Ft as l,Mt as u,Nt as d,P as f,Pt as p,Q as m,Tt as h,b as ee,et as g,m as te,st as _}from"./mdi-CnOwmxTs.js";import{t as v}from"./AnuncioCard-CwG-qNfg.js";import{n as ne,t as y}from"./ProfileView-CWHQ3P14.js";var b=r(e(),1),x=l(),S=t(),C=[{value:`website`,label:`Website`,icon:u,placeholder:`Ex: https://www.teusite.pt`},{value:`instagram`,label:`Instagram`,icon:m,placeholder:`Ex: https://instagram.com/oteuperfil`},{value:`facebook`,label:`Facebook`,icon:c,placeholder:`Ex: https://facebook.com/oteuperfil`},{value:`linkedin`,label:`LinkedIn`,icon:g,placeholder:`Ex: https://linkedin.com/in/oteuperfil`},{value:`youtube`,label:`YouTube`,icon:p,placeholder:`Ex: https://youtube.com/@oteucanal`},{value:`tiktok`,label:`TikTok`,icon:_,placeholder:`Ex: https://tiktok.com/@oteuperfil`},{value:`whatsapp`,label:`WhatsApp`,icon:d,placeholder:`Ex: 912345678 ou https://wa.me/351912345678`},{value:`outro`,label:`Outro`,icon:f,placeholder:`Ex: https://www.outrolink.pt`}],w=()=>({tipo:`website`,url:``}),re=e=>C.find(t=>t.value===e)||C[C.length-1],ie=(e,t)=>{let n=Array.isArray(e)?e.filter(e=>e?.url).slice(0,3):[];return n.length>0?n.map(e=>({tipo:e.tipo||`outro`,url:e.url||``})):t?[{tipo:`website`,url:t}]:[w()]};function T(){let{user:e,signed:t,atualizarAvatar:r,atualizarUser:c,logout:l}=i(),u=n(),d=(0,b.useRef)(null),f=(0,b.useRef)(null),p=localStorage.getItem(`@App:contexto_visual`)||`imovel`,[m,g]=(0,b.useState)(null),[_,T]=(0,b.useState)([]),[E,D]=(0,b.useState)(p),[O,k]=(0,b.useState)(!0),[ae,A]=(0,b.useState)(!1),[j,M]=(0,b.useState)(!1),[N,P]=(0,b.useState)(!1),[F,I]=(0,b.useState)(null),[oe,L]=(0,b.useState)(!1),[R,z]=(0,b.useState)(null),[B,V]=(0,b.useState)(null),[H,U]=(0,b.useState)(!1),[W,G]=(0,b.useState)({nomeEmpresa:``,nif:``,website:``}),[K,q]=(0,b.useState)(!1),[J,Y]=(0,b.useState)({bio:``,website:``,localidade:``,mostrarTelefonePublico:!0,linksPerfil:[w()]}),se=E===`carro`?`/carros`:`/imoveis`,ce=E===`carro`?`Automóveis`:`Imóveis`;(0,b.useEffect)(()=>{if(!t){u(`/login`);return}e&&g(e);let n=!0;return(async()=>{try{let[e,t]=await Promise.all([s.get(`/users/me`),s.get(`/users/me/anuncios`)]);if(!n)return;g(e.data),T(t.data),k(!1)}catch(e){if(!n)return;e.response?.status===401||e.response?.status===403?(l(),u(`/login`)):(I(`Não foi possível carregar os teus dados.`),k(!1))}})(),()=>{n=!1}},[u,t,e,l]);let le=()=>{l(),u(`/`,{replace:!0})},ue=async e=>{let t=e.target.files[0];if(t){M(!0);try{let e=new FormData;e.append(`imagens`,t),e.append(`kind`,`avatar`);let n=await s.post(`/upload/imagens`,e,{headers:{"Content-Type":`multipart/form-data`}}),i=a(n.data)[0],c=o(i,`large`)||n.data.url,l=await s.put(`/users/me`,{avatarUrl:c});r&&r(c),g(l.data)}catch{alert(`Erro ao processar a imagem do avatar.`)}finally{M(!1)}}},de=async e=>{let t=e.target.files[0];if(t){P(!0);try{let e=new FormData;e.append(`imagens`,t),e.append(`kind`,`cover`);let n=await s.post(`/upload/imagens`,e,{headers:{"Content-Type":`multipart/form-data`}}),r=a(n.data)[0],i=o(r,`large`)||n.data.url,l=await s.put(`/users/me`,{capaUrl:i});g(l.data),c&&c(l.data)}catch{alert(`Erro ao processar a imagem de capa.`)}finally{P(!1)}}},fe=async e=>{if(e.preventDefault(),!W.nomeEmpresa){alert(`O Nome da Empresa é obrigatório.`);return}try{U(!1),A(!0);let e=await s.put(`/users/me`,{tipoConta:`profissional`,nome:W.nomeEmpresa,nif:W.nif,website:W.website});g(e.data),c&&c(e.data),alert(`A tua conta foi evoluída para Profissional com sucesso.`)}catch{alert(`Ocorreu um erro ao evoluir a tua conta.`)}finally{A(!1)}},pe=()=>{Y({bio:m?.bio||``,website:m?.website||``,localidade:m?.localidade||``,mostrarTelefonePublico:m?.mostrarTelefonePublico!==!1,linksPerfil:ie(m?.linksPerfil,m?.website)}),q(!0)},X=(e,t,n)=>{Y(r=>({...r,linksPerfil:r.linksPerfil.map((r,i)=>i===e?{...r,[t]:n}:r)}))},me=()=>{Y(e=>e.linksPerfil.length>=3?e:{...e,linksPerfil:[...e.linksPerfil,w()]})},he=e=>{Y(t=>{let n=t.linksPerfil.filter((t,n)=>n!==e);return{...t,linksPerfil:n.length?n:[w()]}})},Z=async e=>{e.preventDefault();let t=J.linksPerfil.map(e=>({tipo:e.tipo||`outro`,url:(e.url||``).trim()})).filter(e=>e.url).slice(0,3),n=t.find(e=>e.tipo===`website`)?.url||``;try{A(!0),q(!1);let e=await s.put(`/users/me`,{bio:J.bio,localidade:J.localidade,mostrarTelefonePublico:J.mostrarTelefonePublico,website:n,linksPerfil:t});g(e.data),c&&c(e.data)}catch{alert(`Erro ao guardar as alterações do perfil.`)}finally{A(!1)}},ge=async e=>{if(R===e){z(null),V(null);return}z(e);try{let{data:t}=await s.get(`/analytics/anuncio/${e}`);V(t)}catch{alert(`Erro ao carregar dados.`),z(null)}},_e=e=>{A(!0),T(t=>t.filter(t=>t._id!==e)),setTimeout(()=>A(!1),800)},ve=()=>{let e=`${window.location.origin}/vendedor/${m._id}`;navigator.clipboard.writeText(e),L(!0),setTimeout(()=>L(!1),2e3)},ye=_.filter(e=>e.tipo===E),Q=_.filter(e=>e.tipo===`imovel`).length,$=_.filter(e=>e.tipo===`carro`).length,be=ne(m);return O?(0,S.jsx)(`div`,{style:{height:`100vh`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`#f8fafc`},children:(0,S.jsx)(`div`,{className:`nx-spinner`,style:{borderColor:`rgba(42, 193, 180, 0.2)`,borderTopColor:`#2ac1b4`}})}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(`style`,{children:`
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
      `}),H&&(0,S.jsx)(`div`,{className:`modal-overlay`,children:(0,S.jsxs)(`div`,{className:`modal-card`,children:[(0,S.jsx)(`button`,{className:`modal-close`,onClick:()=>U(!1),children:(0,S.jsx)(x.Icon,{path:`M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z`,size:1})}),(0,S.jsxs)(`h2`,{className:`modal-title`,children:[(0,S.jsx)(x.Icon,{path:`M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z`,size:1.2,color:`#3b82f6`}),` Evolução de Conta`]}),(0,S.jsx)(`p`,{className:`modal-desc`,children:`Transforma a tua conta num perfil empresarial. Terás direito a uma montra exclusiva com links para o teu website e contactos diretos.`}),(0,S.jsxs)(`form`,{onSubmit:fe,children:[(0,S.jsxs)(`div`,{className:`modal-form-group`,children:[(0,S.jsx)(`label`,{children:`Nome do Stand / Agência *`}),(0,S.jsx)(`input`,{className:`modal-input`,type:`text`,placeholder:`Ex: Stand Vale do Sousa`,value:W.nomeEmpresa,onChange:e=>G({...W,nomeEmpresa:e.target.value}),required:!0})]}),(0,S.jsxs)(`div`,{className:`modal-form-group`,children:[(0,S.jsx)(`label`,{children:`NIF da Empresa (Opcional)`}),(0,S.jsx)(`input`,{className:`modal-input`,type:`text`,placeholder:`Ex: 501234567`,value:W.nif,onChange:e=>G({...W,nif:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`modal-form-group`,children:[(0,S.jsx)(`label`,{children:`Website (Opcional)`}),(0,S.jsx)(`input`,{className:`modal-input`,type:`url`,placeholder:`Ex: https://www.omeustand.pt`,value:W.website,onChange:e=>G({...W,website:e.target.value})})]}),(0,S.jsx)(`button`,{className:`modal-btn-submit`,type:`submit`,children:`Confirmar Evolução`})]})]})}),K&&(0,S.jsx)(`div`,{className:`modal-overlay`,children:(0,S.jsxs)(`div`,{className:`modal-card`,children:[(0,S.jsx)(`button`,{className:`modal-close`,onClick:()=>q(!1),children:(0,S.jsx)(x.Icon,{path:`M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z`,size:1})}),(0,S.jsxs)(`h2`,{className:`modal-title`,children:[(0,S.jsx)(x.Icon,{path:`M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z`,size:1.2,color:`#3b82f6`}),` Editar Perfil`]}),(0,S.jsx)(`p`,{className:`modal-desc`,children:`Personaliza a tua presença na plataforma. Adiciona uma biografia para que os compradores saibam quem és.`}),(0,S.jsxs)(`form`,{onSubmit:Z,children:[(0,S.jsxs)(`div`,{className:`modal-form-group`,children:[(0,S.jsx)(`label`,{children:`Biografia do Perfil (Máx 800 Carateres)`}),(0,S.jsx)(`textarea`,{className:`modal-input`,placeholder:`Escreve um pouco sobre ti ou sobre o teu stand...`,value:J.bio,onChange:e=>Y({...J,bio:e.target.value}),maxLength:800})]}),(0,S.jsxs)(`div`,{className:`modal-form-group`,children:[(0,S.jsxs)(`div`,{className:`links-editor-header`,children:[(0,S.jsx)(`label`,{children:`Links do Perfil`}),(0,S.jsxs)(`span`,{className:`links-editor-count`,children:[J.linksPerfil.filter(e=>e.url).length,`/3`]})]}),(0,S.jsx)(`div`,{className:`link-editor-list`,children:J.linksPerfil.map((e,t)=>{let n=re(e.tipo);return(0,S.jsxs)(`div`,{className:`link-editor-row`,children:[(0,S.jsx)(`div`,{className:`modal-select-wrap`,children:(0,S.jsx)(`select`,{className:`modal-select`,value:e.tipo,onChange:e=>X(t,`tipo`,e.target.value),children:C.map(e=>(0,S.jsx)(`option`,{value:e.value,children:e.label},e.value))})}),(0,S.jsx)(`input`,{className:`modal-input`,type:`text`,inputMode:`url`,placeholder:n.placeholder,value:e.url,onChange:e=>X(t,`url`,e.target.value)}),(0,S.jsx)(`button`,{type:`button`,className:`link-remove-btn`,onClick:()=>he(t),"aria-label":`Remover link`,children:(0,S.jsx)(x.Icon,{path:`M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z`,size:.72})})]},t)})}),(0,S.jsxs)(`button`,{type:`button`,className:`link-add-btn`,onClick:me,disabled:J.linksPerfil.length>=3,children:[(0,S.jsx)(x.Icon,{path:`M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z`,size:.65}),` Adicionar Link`]})]}),(0,S.jsx)(`div`,{className:`modal-form-group`,children:(0,S.jsxs)(`label`,{className:`privacy-toggle`,children:[(0,S.jsx)(`input`,{type:`checkbox`,checked:J.mostrarTelefonePublico,onChange:e=>Y({...J,mostrarTelefonePublico:e.target.checked})}),(0,S.jsxs)(`span`,{children:[(0,S.jsx)(`span`,{className:`privacy-toggle-title`,children:`Mostrar telemóvel publicamente`}),(0,S.jsx)(`span`,{className:`privacy-toggle-text`,children:`Se desligares esta opção, o perfil público e os anúncios mostram apenas o email.`})]})]})}),(0,S.jsx)(`button`,{className:`modal-btn-submit`,type:`submit`,children:`Guardar Alterações`})]})]})}),(0,S.jsx)(`div`,{className:`perfil-outer`,children:(0,S.jsxs)(`div`,{className:`perfil-moldura`,children:[F&&(0,S.jsx)(`div`,{style:{background:`#fef2f2`,border:`1px solid #fecaca`,color:`#b91c1c`,padding:`14px 16px`,borderRadius:12,marginBottom:24,fontSize:14,fontWeight:600},children:F}),ae&&(0,S.jsx)(`div`,{className:`perfil-loading-overlay`,children:(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`16px`},children:[(0,S.jsx)(`div`,{className:`nx-spinner`,style:{borderColor:`rgba(42, 193, 180, 0.2)`,borderTopColor:`#2ac1b4`}}),(0,S.jsx)(`span`,{style:{fontFamily:`var(--nx-font-body)`,fontWeight:600,color:`#0f172a`,fontSize:`14px`},children:`A processar...`})]})}),(0,S.jsxs)(`button`,{onClick:()=>u(se),className:`perfil-back`,children:[(0,S.jsx)(x.Icon,{path:ee,size:.7}),` `,ce]}),(0,S.jsx)(y,{user:m,isOwner:!0,totalImoveis:Q,totalCarros:$,links:be,onEditProfile:pe,onShare:ve,onLogout:le,onUpgrade:()=>U(!0),onAvatarChange:ue,onCapaChange:de,fileInputAvatarRef:d,fileInputCapaRef:f,uploadingAvatar:j,uploadingCapa:N,linkCopiado:oe}),!1,(0,S.jsxs)(`div`,{className:`tabs-row`,children:[(0,S.jsxs)(`button`,{className:`tab-btn${E===`imovel`?` active-imovel`:``}`,onClick:()=>D(`imovel`),children:[`Imóveis `,Q>0&&`(${Q})`]}),(0,S.jsxs)(`button`,{className:`tab-btn${E===`carro`?` active-carro`:``}`,onClick:()=>D(`carro`),children:[`Automóveis `,$>0&&`(${$})`]})]}),(0,S.jsx)(`div`,{className:`cards-grid`,children:ye.map(e=>(0,S.jsxs)(`div`,{className:`card-wrapper`,children:[(0,S.jsx)(v,{anuncio:e,showStatus:!0,onAnuncioEliminado:_e}),e.destacado?(0,S.jsxs)(`div`,{className:`badge-destacado`,children:[(0,S.jsx)(x.Icon,{path:h,size:.6}),` Destaque Ativo`]}):(0,S.jsx)(`button`,{className:`btn-destacar`,onClick:()=>u(`/sucesso/`+e._id),children:`Promover Anúncio (1.99€)`}),(0,S.jsxs)(`button`,{className:`analytics-trigger-btn`,onClick:()=>ge(e._id),children:[(0,S.jsx)(x.Icon,{path:te,size:.7}),` `,R===e._id?`Ocultar Relatório`:`Ver Performance`]}),R===e._id&&B&&(0,S.jsxs)(`div`,{className:`analytics-panel`,children:[(0,S.jsxs)(`div`,{className:`stat-grid`,children:[(0,S.jsxs)(`div`,{className:`stat-box`,children:[(0,S.jsx)(`div`,{className:`stat-box-val`,children:B.totalVisitas}),(0,S.jsx)(`div`,{className:`stat-box-lbl`,children:`Visitas`})]}),(0,S.jsxs)(`div`,{className:`stat-box`,style:{borderLeft:`1px solid #e2e8f0`,borderRight:`1px solid #e2e8f0`},children:[(0,S.jsx)(`div`,{className:`stat-box-val`,style:{color:`#3b82f6`},children:B.guardadoEmFavoritos}),(0,S.jsx)(`div`,{className:`stat-box-lbl`,children:`Favoritos`})]}),(0,S.jsxs)(`div`,{className:`stat-box`,children:[(0,S.jsx)(`div`,{className:`stat-box-val`,style:{color:`#2ac1b4`},children:B.contactosGerados}),(0,S.jsx)(`div`,{className:`stat-box-lbl`,children:`Mensagens`})]})]}),(0,S.jsx)(`div`,{className:`chart-row`,children:B.graficoSeteDias.map((e,t)=>(0,S.jsxs)(`div`,{className:`chart-bar-wrap`,children:[(0,S.jsx)(`div`,{className:`chart-bar`,style:{height:`${Math.max(e.visitas/Math.max(...B.graficoSeteDias.map(e=>e.visitas),10)*100,5)}%`,opacity:e.visitas===0?.3:1}}),(0,S.jsx)(`div`,{className:`chart-day`,children:e.dataLabel})]},t))})]})]},e._id))})]})})]})}export{T as default};