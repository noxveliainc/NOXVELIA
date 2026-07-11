import{u as be,b as me,r as l,j as e,c}from"./index-C7SzHtCp.js";import{A as ge}from"./AnuncioCard-Cp6DyeqO.js";import{o as he,P as ve}from"./ProfileView-D1e1kOEW.js";import{I as p,G as $,_ as ye,$ as we,a0 as ke,a1 as je,a2 as Ne,a3 as Ee,a4 as Pe,a5 as Ae,V as Ce,a6 as ze,a7 as Se,i as Ie,e as Le,X as De,a8 as Te}from"./mdi-CxpZ9yvV.js";const j=[{value:"website",label:"Website",icon:ke,placeholder:"Ex: https://www.teusite.pt"},{value:"instagram",label:"Instagram",icon:je,placeholder:"Ex: https://instagram.com/oteuperfil"},{value:"facebook",label:"Facebook",icon:Ne,placeholder:"Ex: https://facebook.com/oteuperfil"},{value:"linkedin",label:"LinkedIn",icon:Ee,placeholder:"Ex: https://linkedin.com/in/oteuperfil"},{value:"youtube",label:"YouTube",icon:Pe,placeholder:"Ex: https://youtube.com/@oteucanal"},{value:"tiktok",label:"TikTok",icon:Ae,placeholder:"Ex: https://tiktok.com/@oteuperfil"},{value:"whatsapp",label:"WhatsApp",icon:Ce,placeholder:"Ex: 912345678 ou https://wa.me/351912345678"},{value:"outro",label:"Outro",icon:ze,placeholder:"Ex: https://www.outrolink.pt"}],N=()=>({tipo:"website",url:""}),Me=f=>j.find(b=>b.value===f)||j[j.length-1],Oe=(f,b)=>{const y=Array.isArray(f)?f.filter(n=>n==null?void 0:n.url).slice(0,3):[];return y.length>0?y.map(n=>({tipo:n.tipo||"outro",url:n.url||""})):b?[{tipo:"website",url:b}]:[N()]};function $e(){const{user:f,signed:b,atualizarAvatar:y,atualizarUser:n,logout:E}=be(),m=me(),G=l.useRef(null),W=l.useRef(null),q=localStorage.getItem("@App:contexto_visual")||"imovel",[s,g]=l.useState(null),[P,T]=l.useState([]),[w,M]=l.useState(q),[B,O]=l.useState(!0),[J,h]=l.useState(!1),[Y,R]=l.useState(!1),[H,F]=l.useState(!1),[Re,K]=l.useState(null),[X,V]=l.useState(!1),[A,C]=l.useState(null),[v,_]=l.useState(null),[Q,z]=l.useState(!1),[d,S]=l.useState({nomeEmpresa:"",nif:"",website:""}),[Z,I]=l.useState(!1),[x,k]=l.useState({bio:"",website:"",localidade:"",linksPerfil:[N()]}),ee=w==="carro"?"/carros":"/imoveis",ae=w==="carro"?"Automóveis":"Imóveis";l.useEffect(()=>{if(!b){m("/login");return}f&&g(f);let a=!0;return(async()=>{var i,t;try{const[o,u]=await Promise.all([c.get("/users/me"),c.get("/users/me/anuncios")]);if(!a)return;g(o.data),T(u.data),O(!1)}catch(o){if(!a)return;((i=o.response)==null?void 0:i.status)===401||((t=o.response)==null?void 0:t.status)===403?(E(),m("/login")):(K("Não foi possível carregar os teus dados."),O(!1))}})(),()=>{a=!1}},[m,b,f,E]);const re=()=>{E(),m("/",{replace:!0})},te=async a=>{const r=a.target.files[0];if(r){R(!0);try{const i=new FormData;i.append("imagens",r);const t=await c.post("/upload/imagens",i,{headers:{"Content-Type":"multipart/form-data"}}),o=Array.isArray(t.data.urls)?t.data.urls[0]:t.data.url,u=await c.put("/users/me",{avatarUrl:o});y&&y(o),g(u.data)}catch{alert("Erro ao processar a imagem do avatar.")}finally{R(!1)}}},oe=async a=>{const r=a.target.files[0];if(r){F(!0);try{const i=new FormData;i.append("imagens",r);const t=await c.post("/upload/imagens",i,{headers:{"Content-Type":"multipart/form-data"}}),o=Array.isArray(t.data.urls)?t.data.urls[0]:t.data.url,u=await c.put("/users/me",{capaUrl:o});g(u.data),n&&n(u.data)}catch{alert("Erro ao processar a imagem de capa.")}finally{F(!1)}}},ie=async a=>{if(a.preventDefault(),!d.nomeEmpresa){alert("O Nome da Empresa é obrigatório.");return}try{z(!1),h(!0);const r=await c.put("/users/me",{tipoConta:"profissional",nome:d.nomeEmpresa,nif:d.nif,website:d.website});g(r.data),n&&n(r.data),alert("A tua conta foi evoluída para Profissional com sucesso.")}catch{alert("Ocorreu um erro ao evoluir a tua conta.")}finally{h(!1)}},se=()=>{k({bio:(s==null?void 0:s.bio)||"",website:(s==null?void 0:s.website)||"",localidade:(s==null?void 0:s.localidade)||"",linksPerfil:Oe(s==null?void 0:s.linksPerfil,s==null?void 0:s.website)}),I(!0)},U=(a,r,i)=>{k(t=>({...t,linksPerfil:t.linksPerfil.map((o,u)=>u===a?{...o,[r]:i}:o)}))},le=()=>{k(a=>a.linksPerfil.length>=3?a:{...a,linksPerfil:[...a.linksPerfil,N()]})},ne=a=>{k(r=>{const i=r.linksPerfil.filter((t,o)=>o!==a);return{...r,linksPerfil:i.length?i:[N()]}})},de=async a=>{var t;a.preventDefault();const r=x.linksPerfil.map(o=>({tipo:o.tipo||"outro",url:(o.url||"").trim()})).filter(o=>o.url).slice(0,3),i=((t=r.find(o=>o.tipo==="website"))==null?void 0:t.url)||"";try{h(!0),I(!1);const o=await c.put("/users/me",{bio:x.bio,localidade:x.localidade,website:i,linksPerfil:r});g(o.data),n&&n(o.data)}catch{alert("Erro ao guardar as alterações do perfil.")}finally{h(!1)}},ce=async a=>{if(A===a){C(null),_(null);return}C(a);try{const{data:r}=await c.get(`/analytics/anuncio/${a}`);_(r)}catch{alert("Erro ao carregar dados."),C(null)}},pe=a=>{h(!0),T(r=>r.filter(i=>i._id!==a)),setTimeout(()=>h(!1),800)},fe=()=>{const a=`${window.location.origin}/vendedor/${s._id}`;navigator.clipboard.writeText(a),V(!0),setTimeout(()=>V(!1),2e3)},xe=P.filter(a=>a.tipo===w),L=P.filter(a=>a.tipo==="imovel").length,D=P.filter(a=>a.tipo==="carro").length,ue=he(s);return B?e.jsx("div",{style:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc"},children:e.jsx("div",{className:"nx-spinner",style:{borderColor:"rgba(42, 193, 180, 0.2)",borderTopColor:"#2ac1b4"}})}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

        @media (max-width: 560px) {
          .link-editor-row { grid-template-columns: 1fr 40px; }
          .modal-select-wrap { grid-column: 1 / -1; }
        }
        
        .modal-btn-submit { width: 100%; padding: 16px; background: #3b82f6; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s; margin-top: 12px; }
        .modal-btn-submit:hover { opacity: 0.9; }
      `}),Q&&e.jsx("div",{className:"modal-overlay",children:e.jsxs("div",{className:"modal-card",children:[e.jsx("button",{className:"modal-close",onClick:()=>z(!1),children:e.jsx(p,{path:$,size:1})}),e.jsxs("h2",{className:"modal-title",children:[e.jsx(p,{path:ye,size:1.2,color:"#3b82f6"})," Evolução de Conta"]}),e.jsx("p",{className:"modal-desc",children:"Transforma a tua conta num perfil empresarial. Terás direito a uma montra exclusiva com links para o teu website e contactos diretos."}),e.jsxs("form",{onSubmit:ie,children:[e.jsxs("div",{className:"modal-form-group",children:[e.jsx("label",{children:"Nome do Stand / Agência *"}),e.jsx("input",{className:"modal-input",type:"text",placeholder:"Ex: Stand Vale do Sousa",value:d.nomeEmpresa,onChange:a=>S({...d,nomeEmpresa:a.target.value}),required:!0})]}),e.jsxs("div",{className:"modal-form-group",children:[e.jsx("label",{children:"NIF da Empresa (Opcional)"}),e.jsx("input",{className:"modal-input",type:"text",placeholder:"Ex: 501234567",value:d.nif,onChange:a=>S({...d,nif:a.target.value})})]}),e.jsxs("div",{className:"modal-form-group",children:[e.jsx("label",{children:"Website (Opcional)"}),e.jsx("input",{className:"modal-input",type:"url",placeholder:"Ex: https://www.omeustand.pt",value:d.website,onChange:a=>S({...d,website:a.target.value})})]}),e.jsx("button",{className:"modal-btn-submit",type:"submit",children:"Confirmar Evolução"})]})]})}),Z&&e.jsx("div",{className:"modal-overlay",children:e.jsxs("div",{className:"modal-card",children:[e.jsx("button",{className:"modal-close",onClick:()=>I(!1),children:e.jsx(p,{path:$,size:1})}),e.jsxs("h2",{className:"modal-title",children:[e.jsx(p,{path:we,size:1.2,color:"#3b82f6"})," Editar Perfil"]}),e.jsx("p",{className:"modal-desc",children:"Personaliza a tua presença na plataforma. Adiciona uma biografia para que os compradores saibam quem és."}),e.jsxs("form",{onSubmit:de,children:[e.jsxs("div",{className:"modal-form-group",children:[e.jsx("label",{children:"Biografia do Perfil (Máx 800 Carateres)"}),e.jsx("textarea",{className:"modal-input",placeholder:"Escreve um pouco sobre ti ou sobre o teu stand...",value:x.bio,onChange:a=>k({...x,bio:a.target.value}),maxLength:800})]}),e.jsxs("div",{className:"modal-form-group",children:[e.jsxs("div",{className:"links-editor-header",children:[e.jsx("label",{children:"Links do Perfil"}),e.jsxs("span",{className:"links-editor-count",children:[x.linksPerfil.filter(a=>a.url).length,"/3"]})]}),e.jsx("div",{className:"link-editor-list",children:x.linksPerfil.map((a,r)=>{const i=Me(a.tipo);return e.jsxs("div",{className:"link-editor-row",children:[e.jsx("div",{className:"modal-select-wrap",children:e.jsx("select",{className:"modal-select",value:a.tipo,onChange:t=>U(r,"tipo",t.target.value),children:j.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))})}),e.jsx("input",{className:"modal-input",type:"text",inputMode:"url",placeholder:i.placeholder,value:a.url,onChange:t=>U(r,"url",t.target.value)}),e.jsx("button",{type:"button",className:"link-remove-btn",onClick:()=>ne(r),"aria-label":"Remover link",children:e.jsx(p,{path:Se,size:.72})})]},r)})}),e.jsxs("button",{type:"button",className:"link-add-btn",onClick:le,disabled:x.linksPerfil.length>=3,children:[e.jsx(p,{path:Ie,size:.65})," Adicionar Link"]})]}),e.jsx("button",{className:"modal-btn-submit",type:"submit",children:"Guardar Alterações"})]})]})}),e.jsx("div",{className:"perfil-outer",children:e.jsxs("div",{className:"perfil-moldura",children:[J&&e.jsx("div",{className:"perfil-loading-overlay",children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[e.jsx("div",{className:"nx-spinner",style:{borderColor:"rgba(42, 193, 180, 0.2)",borderTopColor:"#2ac1b4"}}),e.jsx("span",{style:{fontFamily:"var(--nx-font-body)",fontWeight:600,color:"#0f172a",fontSize:"14px"},children:"A processar..."})]})}),e.jsxs("button",{onClick:()=>m(ee),className:"perfil-back",children:[e.jsx(p,{path:Le,size:.7})," ",ae]}),e.jsx(ve,{user:s,isOwner:!0,totalImoveis:L,totalCarros:D,links:ue,onEditProfile:se,onShare:fe,onLogout:re,onUpgrade:()=>z(!0),onAvatarChange:te,onCapaChange:oe,fileInputAvatarRef:G,fileInputCapaRef:W,uploadingAvatar:Y,uploadingCapa:H,linkCopiado:X}),!1,e.jsxs("div",{className:"tabs-row",children:[e.jsxs("button",{className:`tab-btn${w==="imovel"?" active-imovel":""}`,onClick:()=>M("imovel"),children:["Imóveis ",L>0&&`(${L})`]}),e.jsxs("button",{className:`tab-btn${w==="carro"?" active-carro":""}`,onClick:()=>M("carro"),children:["Automóveis ",D>0&&`(${D})`]})]}),e.jsx("div",{className:"cards-grid",children:xe.map(a=>e.jsxs("div",{className:"card-wrapper",children:[e.jsx(ge,{anuncio:a,showStatus:!0,onAnuncioEliminado:pe}),a.destacado?e.jsxs("div",{className:"badge-destacado",children:[e.jsx(p,{path:De,size:.6})," Destaque Ativo"]}):e.jsx("button",{className:"btn-destacar",onClick:()=>m("/sucesso/"+a._id),children:"Promover Anúncio (1.99€)"}),e.jsxs("button",{className:"analytics-trigger-btn",onClick:()=>ce(a._id),children:[e.jsx(p,{path:Te,size:.7})," ",A===a._id?"Ocultar Relatório":"Ver Performance"]}),A===a._id&&v&&e.jsxs("div",{className:"analytics-panel",children:[e.jsxs("div",{className:"stat-grid",children:[e.jsxs("div",{className:"stat-box",children:[e.jsx("div",{className:"stat-box-val",children:v.totalVisitas}),e.jsx("div",{className:"stat-box-lbl",children:"Visitas"})]}),e.jsxs("div",{className:"stat-box",style:{borderLeft:"1px solid #e2e8f0",borderRight:"1px solid #e2e8f0"},children:[e.jsx("div",{className:"stat-box-val",style:{color:"#3b82f6"},children:v.guardadoEmFavoritos}),e.jsx("div",{className:"stat-box-lbl",children:"Favoritos"})]}),e.jsxs("div",{className:"stat-box",children:[e.jsx("div",{className:"stat-box-val",style:{color:"#2ac1b4"},children:v.contactosGerados}),e.jsx("div",{className:"stat-box-lbl",children:"Mensagens"})]})]}),e.jsx("div",{className:"chart-row",children:v.graficoSeteDias.map((r,i)=>e.jsxs("div",{className:"chart-bar-wrap",children:[e.jsx("div",{className:"chart-bar",style:{height:`${Math.max(r.visitas/Math.max(...v.graficoSeteDias.map(t=>t.visitas),10)*100,5)}%`,opacity:r.visitas===0?.3:1}}),e.jsx("div",{className:"chart-day",children:r.dataLabel})]},i))})]})]},a._id))})]})})]})}export{$e as default};
//# sourceMappingURL=Perfil-qfeDQ-e7.js.map
