import{r as n,b as q,j as e,L as P,c as T}from"./index-BBQ9M_rT.js";const D=["Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro","Guarda","Leiria","Lisboa","Portalegre","Porto","Santarém","Setúbal","Viana do Castelo","Vila Real","Viseu","Açores","Madeira"];function I(){const[o,l]=n.useState({nome:"",email:"",password:"",confirmarPassword:"",telefone:"",localidade:"",tipoConta:"particular"}),[x,A]=n.useState(!1),[f,L]=n.useState(!1),[b,j]=n.useState(!1),[v,t]=n.useState(""),[B,m]=n.useState(!1),[c,g]=n.useState(!1),M=q(),E=a=>{const s=a.target.value.replace(/\D/g,"");s.length<=9&&l({...o,telefone:s})},R=a=>{const s=a.length>=9,d=/[A-Z]/.test(a),p=/\d/.test(a),u=/[!@#$%^&*(),.?":{}|<>]/.test(a);return s&&d&&p&&u},V=a=>{if(a.preventDefault(),t(""),o.password!==o.confirmarPassword){t("As palavras-passe não coincidem. Verifica e tenta novamente.");return}if(!/^9[1236]\d{7}$/.test(o.telefone)){t("O número tem de ser um telemóvel português válido.");return}if(!R(o.password)){t("A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.");return}if(!o.localidade){t("Por favor, seleciona um distrito válido.");return}g(!1),m(!0)},W=async()=>{var a,s,d,p,u,w,y,k,C,N,S,z;if(c){m(!1),j(!0),t("");try{const{confirmarPassword:i,...r}=o,h={...r,tipo:"cliente",tipoConta:"particular"};await T.post("/auth/register",h),M("/login",{state:{mensagemRegisto:"Conta criada com sucesso! Verifica o teu email para ativares o acesso."}})}catch(i){const r=((s=(a=i.response)==null?void 0:a.data)==null?void 0:s.erro)||((p=(d=i.response)==null?void 0:d.data)==null?void 0:p.message)||((w=(u=i.response)==null?void 0:u.data)==null?void 0:w.detalhes);if(Array.isArray(r))t(r.join(" | "));else if(typeof r=="object"&&r!==null)t(Object.values(r).join(" | "));else if(typeof r=="string")t(r);else if(((k=(y=i.response)==null?void 0:y.data)==null?void 0:k.code)===11e3||((S=(N=(C=i.response)==null?void 0:C.data)==null?void 0:N.error)==null?void 0:S.code)===11e3){const h=JSON.stringify((z=i.response)==null?void 0:z.data);h.includes("email")?t("Este email já se encontra registado."):h.includes("telefone")?t("Este número de telemóvel já se encontra em uso."):t("Estes dados já existem na nossa base de dados.")}else t("Erro ao efetuar o registo. Verifica os teus dados e a ligação à internet.")}finally{j(!1)}}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .auth-root { 
          background-color: #f8fafc; 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 24px; 
          color: #0f172a;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }

        .auth-card { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 24px;
          padding: 42px 48px; 
          width: 100%; 
          max-width: 480px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          max-height: 94vh;
          overflow-y: auto;
        }
        
        .auth-card::-webkit-scrollbar { display: none; }
        .auth-card { -ms-overflow-style: none; scrollbar-width: none; }
        
        .auth-back { 
          color: #64748b; 
          font-size: 12px; 
          font-weight: 700;
          text-transform: uppercase; 
          letter-spacing: 0.05em; 
          text-decoration: none; 
          display: inline-block; 
          margin-bottom: 24px; 
          transition: color 0.2s;
        }
        .auth-back:hover { color: #0f172a; }
        
        .auth-title { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          font-size: 32px; 
          font-weight: 800; 
          margin-bottom: 8px; 
          letter-spacing: -0.02em;
        }
        
        .auth-subtitle {
          font-size: 15px;
          color: #475569;
          margin-bottom: 32px;
        }
        
        .auth-form-group { margin-bottom: 20px; }
        .auth-form-group label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 8px;
        }
        
        .auth-input-wrapper { position: relative; display: flex; align-items: center; }

        .auth-input { 
          width: 100%; 
          padding: 14px 16px; 
          background: #ffffff; 
          border: 1px solid #cbd5e1; 
          border-radius: 12px;
          color: #0f172a; 
          outline: none; 
          font-family: inherit;
          font-size: 15px;
          transition: all 0.2s; 
          box-sizing: border-box; 
        }
        .auth-input:focus { 
          border-color: #0f172a; 
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.05);
        }
        .auth-input::placeholder { color: #94a3b8; }
        select.auth-input { cursor: pointer; }
        select.auth-input:invalid { color: #94a3b8; }

        .auth-input-wrapper .auth-input { padding-right: 48px; }

        .auth-toggle-pwd {
          position: absolute; right: 12px; background: transparent; border: none;
          color: #94a3b8; cursor: pointer; display: flex; align-items: center;
          justify-content: center; padding: 4px; transition: color 0.2s;
        }
        .auth-toggle-pwd:hover { color: #0f172a; }
        
        .auth-btn { 
          width: 100%; padding: 16px; background: #0f172a; color: #ffffff; 
          border: none; border-radius: 12px; font-weight: 700; 
          font-size: 14px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; 
          margin-top: 12px;
        }
        .auth-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(15, 23, 42, 0.3); }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .auth-link { 
          color: #475569; font-size: 14px; font-weight: 600; text-decoration: none; 
          display: block; margin-top: 24px; text-align: center; transition: color 0.2s;
        }
        .auth-link:hover { color: #0f172a; }
        
        .auth-error { 
          color: #b91c1c; font-size: 13.5px; font-weight: 500; margin-bottom: 24px; 
          background: #fef2f2; padding: 14px; border: 1px solid #fecaca; border-radius: 12px; 
        }

        .auth-hint { display: block; font-size: 12px; color: #64748b; margin-top: 6px; }
        .password-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 500px) { .password-grid { grid-template-columns: 1fr; gap: 0; } }

        /* Modal Styles */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); 
          backdrop-filter: blur(4px); z-index: 9999; display: flex; 
          align-items: center; justify-content: center; padding: 24px;
        }
        .modal-box {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; 
          padding: 40px; max-width: 480px; width: 100%; text-align: center; 
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
        }
        .modal-icon {
          width: 64px; height: 64px; background: #f1f5f9; color: #0f172a; 
          border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;
        }
        .modal-data-box {
          background: #f8fafc; border-radius: 12px; padding: 16px; 
          margin-bottom: 20px; text-align: left; border: 1px solid #e2e8f0;
        }
        
        .auth-confirm-check {
          display: flex; align-items: flex-start; gap: 10px; text-align: left;
          background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px;
          padding: 16px; margin-bottom: 24px; cursor: pointer; transition: background 0.2s;
        }
        .auth-confirm-check:hover { background: #f1f5f9; }
        .auth-confirm-check input { margin-top: 2px; width: 18px; height: 18px; accent-color: #0f172a; cursor: pointer; flex-shrink: 0; }
        .auth-confirm-check span { font-size: 14px; color: #475569; line-height: 1.5; font-weight: 500; }
      `}),B&&e.jsx("div",{className:"modal-overlay",children:e.jsxs("div",{className:"modal-box",children:[e.jsx("div",{className:"modal-icon",children:e.jsx("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})})}),e.jsx("h2",{style:{fontFamily:"var(--nx-font-display)",fontSize:"24px",fontWeight:800,color:"#0f172a",margin:"0 0 12px"},children:"Verifica os teus contactos"}),e.jsx("p",{style:{fontSize:"15px",color:"#64748b",marginBottom:"24px",lineHeight:1.6},children:"Vamos enviar um email de confirmação. Vais precisar de clicar no link para ativar a tua conta antes de iniciares sessão. Confirma que os dados estão corretos."}),e.jsxs("div",{className:"modal-data-box",children:[e.jsxs("div",{style:{marginBottom:"8px",color:"#0f172a",fontSize:"15px"},children:[e.jsx("strong",{style:{color:"#64748b",fontWeight:600},children:"Email:"})," ",o.email]}),e.jsxs("div",{style:{color:"#0f172a",fontSize:"15px"},children:[e.jsx("strong",{style:{color:"#64748b",fontWeight:600},children:"Telemóvel:"})," ",o.telefone]})]}),e.jsxs("label",{className:"auth-confirm-check",children:[e.jsx("input",{type:"checkbox",checked:c,onChange:a=>g(a.target.checked)}),e.jsx("span",{children:"Confirmo que o email e o telefone estão corretos e que tenho acesso aos mesmos."})]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("button",{onClick:()=>{m(!1),g(!1)},style:{flex:1,padding:"16px",background:"#ffffff",border:"1px solid #cbd5e1",color:"#0f172a",borderRadius:"12px",fontWeight:700,cursor:"pointer",transition:"all 0.2s"},children:"Corrigir Dados"}),e.jsx("button",{onClick:W,disabled:!c,style:{flex:1,padding:"16px",background:"#0f172a",color:"#ffffff",border:"none",borderRadius:"12px",fontWeight:700,cursor:c?"pointer":"not-allowed",opacity:c?1:.5,transition:"all 0.2s"},children:"Tudo Correto!"})]})]})}),e.jsx("div",{className:"auth-root",children:e.jsxs("div",{className:"auth-card",children:[e.jsx(P,{to:"/",className:"auth-back",children:"← Voltar"}),e.jsx("div",{style:{marginBottom:"24px"},children:e.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA",style:{height:"36px",width:"auto",objectFit:"contain"}})}),e.jsx("h1",{className:"auth-title",children:"Criar Conta"}),e.jsx("p",{className:"auth-subtitle",children:"Regista-te para aceder e publicar anúncios."}),v&&e.jsx("div",{className:"auth-error",children:v}),e.jsxs("form",{onSubmit:V,children:[e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Nome Completo"}),e.jsx("input",{className:"auth-input",placeholder:"Ex: João Silva",value:o.nome,onChange:a=>l({...o,nome:a.target.value}),required:!0})]}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Email"}),e.jsx("input",{className:"auth-input",type:"email",placeholder:"joao.silva@email.com",value:o.email,onChange:a=>l({...o,email:a.target.value}),required:!0})]}),e.jsxs("div",{className:"password-grid",children:[e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Palavra-passe"}),e.jsxs("div",{className:"auth-input-wrapper",children:[e.jsx("input",{className:"auth-input",type:x?"text":"password",placeholder:"•••••••••",value:o.password,onChange:a=>l({...o,password:a.target.value}),required:!0}),e.jsx("button",{type:"button",className:"auth-toggle-pwd",onClick:()=>A(!x),children:x?e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Confirmar Password"}),e.jsxs("div",{className:"auth-input-wrapper",children:[e.jsx("input",{className:"auth-input",type:f?"text":"password",placeholder:"•••••••••",value:o.confirmarPassword,onChange:a=>l({...o,confirmarPassword:a.target.value}),required:!0}),e.jsx("button",{type:"button",className:"auth-toggle-pwd",onClick:()=>L(!f),children:f?e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]})]}),e.jsx("span",{className:"auth-hint",style:{marginTop:"-12px",marginBottom:"20px"},children:"Mínimo: 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial (!@#$...)."}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Telemóvel"}),e.jsx("input",{className:"auth-input",type:"tel",placeholder:"Ex: 912345678",value:o.telefone,onChange:E,required:!0})]}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Distrito"}),e.jsxs("select",{className:"auth-input",value:o.localidade,onChange:a=>l({...o,localidade:a.target.value}),required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Seleciona o teu distrito"}),D.map(a=>e.jsx("option",{value:a,children:a},a))]})]}),e.jsx("button",{className:"auth-btn",type:"submit",disabled:b,children:b?"A processar...":"Criar Conta"})]}),e.jsxs(P,{to:"/login",className:"auth-link",children:["Já tens conta? ",e.jsx("span",{style:{fontWeight:700,color:"#0f172a"},children:"Inicia sessão aqui."})]})]})})]})}export{I as default};
//# sourceMappingURL=Registo-DHBvmN9e.js.map
