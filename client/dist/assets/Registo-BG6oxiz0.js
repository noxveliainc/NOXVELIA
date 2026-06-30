import{r as i,b as T,j as e,L as P,c as W}from"./index-CTvWiIwb.js";const I=["Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro","Guarda","Leiria","Lisboa","Portalegre","Porto","Santarém","Setúbal","Viana do Castelo","Vila Real","Viseu","Açores","Madeira"];function F(){const[t,l]=i.useState({nome:"",email:"",password:"",confirmarPassword:"",telefone:"",localidade:"",tipoConta:"particular"}),[h,A]=i.useState(!1),[m,B]=i.useState(!1),[b,v]=i.useState(!1),[j,r]=i.useState(""),[L,g]=i.useState(!1),[c,f]=i.useState(!1),R=T(),E=a=>{const s=a.target.value.replace(/\D/g,"");s.length<=9&&l({...t,telefone:s})},M=a=>{const s=a.length>=9,d=/[A-Z]/.test(a),p=/\d/.test(a),u=/[!@#$%^&*(),.?":{}|<>]/.test(a);return s&&d&&p&&u},V=a=>{if(a.preventDefault(),r(""),t.password!==t.confirmarPassword){r("As palavras-passe não coincidem. Verifica e tenta novamente.");return}if(!/^9[1236]\d{7}$/.test(t.telefone)){r("O número tem de ser um telemóvel português válido (começar por 91, 92, 93 ou 96 e ter 9 dígitos).");return}if(!M(t.password)){r("A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.");return}if(!t.localidade){r("Por favor, seleciona um distrito válido.");return}f(!1),g(!0)},q=async()=>{var a,s,d,p,u,y,k,w,C,N,S,z;if(c){g(!1),v(!0),r("");try{const{confirmarPassword:n,...o}=t,x={...o,tipo:"cliente",tipoConta:"particular"};await W.post("/auth/register",x),R("/login",{state:{mensagemRegisto:"Conta criada! Verifica o teu email para ativares o acesso."}})}catch(n){const o=((s=(a=n.response)==null?void 0:a.data)==null?void 0:s.erro)||((p=(d=n.response)==null?void 0:d.data)==null?void 0:p.message)||((y=(u=n.response)==null?void 0:u.data)==null?void 0:y.detalhes);if(Array.isArray(o))r(o.join(" | "));else if(typeof o=="object"&&o!==null)r(Object.values(o).join(" | "));else if(typeof o=="string")r(o);else if(((w=(k=n.response)==null?void 0:k.data)==null?void 0:w.code)===11e3||((S=(N=(C=n.response)==null?void 0:C.data)==null?void 0:N.error)==null?void 0:S.code)===11e3){const x=JSON.stringify((z=n.response)==null?void 0:z.data);x.includes("email")?r("Este email já se encontra registado."):x.includes("telefone")?r("Este número de telemóvel já se encontra em uso."):r("Estes dados já existem na nossa base de dados.")}else r("Erro ao efetuar o registo. Verifica os teus dados e a ligação à internet.")}finally{v(!1)}}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .auth-root { 
          background-color: #040711; 
          background-image: radial-gradient(circle at top right, rgba(42, 193, 180, 0.05), transparent 45%), 
                            radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.05), transparent 45%);
          
          --nx-text: #f8fafc;
          --nx-text-sub: #94a3b8;
          --nx-text-muted: #64748b;
          --nx-card-bg: rgba(15, 23, 42, 0.6);
          --nx-card-border: rgba(255, 255, 255, 0.08);
          --nx-input-bg: rgba(15, 23, 42, 0.5);
          --nx-input-border: rgba(255, 255, 255, 0.1);

          height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 24px; 
          color: var(--nx-text);
          font-family: var(--nx-font-body, 'Inter', sans-serif);
          
          overflow: hidden; 
          box-sizing: border-box;
        }

        .auth-card { 
          background: var(--nx-card-bg); 
          border: 1px solid var(--nx-card-border); 
          border-radius: var(--nx-radius-lg, 20px);
          padding: 42px 48px; 
          width: 100%; 
          max-width: 460px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          
          max-height: 94vh;
          overflow-y: auto;
        }
        
        .auth-card::-webkit-scrollbar { display: none; }
        .auth-card { -ms-overflow-style: none; scrollbar-width: none; }
        
        .auth-back { 
          color: var(--nx-text-sub); 
          font-size: 11px; 
          font-weight: 700;
          text-transform: uppercase; 
          letter-spacing: 0.05em; 
          text-decoration: none; 
          display: inline-block; 
          margin-bottom: 24px; 
          transition: color 0.2s;
        }
        .auth-back:hover { color: var(--nx-text); }
        
        .auth-title { 
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); 
          font-size: 32px; 
          font-weight: 800; 
          margin-bottom: 8px; 
          letter-spacing: -0.02em;
        }
        
        .auth-subtitle {
          font-size: 14px;
          color: var(--nx-text-sub);
          margin-bottom: 24px;
        }
        
        .auth-form-group { margin-bottom: 18px; }
        .auth-form-group label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--nx-text-muted);
          margin-bottom: 8px;
        }
        
        .auth-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .auth-input { 
          width: 100%; 
          padding: 14px 16px; 
          background: var(--nx-input-bg); 
          border: 1px solid var(--nx-input-border); 
          border-radius: var(--nx-radius-sm, 8px);
          color: var(--nx-text); 
          outline: none; 
          font-family: inherit;
          font-size: 14px;
          transition: all 0.2s; 
          box-sizing: border-box; 
        }
        .auth-input:focus { 
          border-color: var(--nx-accent-car, #2ac1b4); 
          box-shadow: 0 0 0 3px rgba(42, 193, 180, 0.12);
        }
        .auth-input::placeholder { color: var(--nx-text-muted); }
        select.auth-input option { background: #0f172a; color: #f8fafc; }
        select.auth-input:invalid { color: var(--nx-text-muted); }

        .auth-input-wrapper .auth-input {
          padding-right: 48px;
        }

        .auth-toggle-pwd {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--nx-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: color 0.2s;
        }
        .auth-toggle-pwd:hover {
          color: var(--nx-text);
        }
        
        .auth-btn { 
          width: 100%; 
          padding: 16px; 
          background: var(--nx-text); 
          color: #040711; 
          border: none; 
          border-radius: var(--nx-radius-sm, 8px);
          font-weight: 700; 
          text-transform: uppercase; 
          letter-spacing: 0.05em; 
          cursor: pointer; 
          font-family: inherit; 
          transition: opacity 0.2s; 
          margin-top: 12px;
        }
        .auth-btn:hover { opacity: 0.85; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .auth-link { 
          color: var(--nx-text-sub); 
          font-size: 13px; 
          font-weight: 600;
          text-decoration: none; 
          display: block; 
          margin-top: 24px; 
          text-align: center; 
          transition: color 0.2s;
        }
        .auth-link:hover { color: var(--nx-text); }
        
        .auth-error { 
          color: #ef4444; 
          font-size: 13px; 
          font-weight: 500;
          margin-bottom: 24px; 
          background: rgba(239, 68, 68, 0.08); 
          padding: 14px; 
          border: 1px solid rgba(239, 68, 68, 0.2); 
          border-radius: var(--nx-radius-sm, 8px); 
        }

        .auth-hint {
          display: block;
          font-size: 11px;
          color: var(--nx-text-muted);
          margin-top: 6px;
        }

        .password-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 500px) {
          .password-grid { grid-template-columns: 1fr; gap: 0; }
        }

        /* 🌟 NOVO: checkbox de confirmação de contacto */
        .auth-confirm-check {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-align: left;
          background: rgba(42, 193, 180, 0.06);
          border: 1px solid rgba(42, 193, 180, 0.25);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 24px;
          cursor: pointer;
        }
        .auth-confirm-check input {
          margin-top: 2px;
          width: 16px;
          height: 16px;
          accent-color: #2ac1b4;
          cursor: pointer;
          flex-shrink: 0;
        }
        .auth-confirm-check span {
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.4;
        }
      `}),L&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(4, 7, 17, 0.9)",backdropFilter:"blur(8px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"},children:e.jsxs("div",{style:{background:"#0f172a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"24px",padding:"40px",maxWidth:"480px",width:"100%",textAlign:"center",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.5)"},children:[e.jsx("div",{style:{width:"64px",height:"64px",background:"rgba(42, 193, 180, 0.1)",color:"#2ac1b4",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"},children:e.jsx("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})})}),e.jsx("h2",{style:{fontFamily:"var(--nx-font-display)",fontSize:"22px",fontWeight:800,color:"#fff",marginBottom:"12px"},children:"Verifica os teus contactos"}),e.jsx("p",{style:{fontSize:"14px",color:"#94a3b8",marginBottom:"24px",lineHeight:1.5},children:"Vamos enviar um email de confirmação para o endereço abaixo — vais precisar de clicar no link para ativar a tua conta antes de poderes iniciar sessão. Confirma que os teus contactos estão corretos."}),e.jsxs("div",{style:{background:"rgba(0,0,0,0.3)",borderRadius:"12px",padding:"16px",marginBottom:"20px",textAlign:"left",border:"1px solid rgba(255,255,255,0.05)"},children:[e.jsxs("div",{style:{marginBottom:"8px",color:"#f8fafc",fontSize:"15px"},children:[e.jsx("strong",{style:{color:"#64748b"},children:"Email:"})," ",t.email]}),e.jsxs("div",{style:{color:"#f8fafc",fontSize:"15px"},children:[e.jsx("strong",{style:{color:"#64748b"},children:"Telefone:"})," ",t.telefone]})]}),e.jsxs("label",{className:"auth-confirm-check",children:[e.jsx("input",{type:"checkbox",checked:c,onChange:a=>f(a.target.checked)}),e.jsx("span",{children:"Confirmo que o email e o telefone indicados acima estão corretos e que tenho acesso a este email."})]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("button",{onClick:()=>{g(!1),f(!1)},style:{flex:1,padding:"14px",background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",borderRadius:"10px",fontWeight:700,cursor:"pointer",transition:"all 0.2s"},children:"Corrigir Dados"}),e.jsx("button",{onClick:q,disabled:!c,style:{flex:1,padding:"14px",background:c?"#2ac1b4":"rgba(42, 193, 180, 0.3)",color:"#040711",border:"none",borderRadius:"10px",fontWeight:800,cursor:c?"pointer":"not-allowed",opacity:c?1:.6,transition:"all 0.2s"},children:"Tudo Correto!"})]})]})}),e.jsx("div",{className:"auth-root",children:e.jsxs("div",{className:"auth-card",children:[e.jsx(P,{to:"/",className:"auth-back",children:"← Voltar"}),e.jsx("div",{style:{marginBottom:"20px"},children:e.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA",style:{height:"32px",width:"auto",objectFit:"contain"}})}),e.jsx("h1",{className:"auth-title",children:"Registo"}),e.jsx("p",{className:"auth-subtitle",children:"Cria a tua conta e gere os teus anúncios."}),j&&e.jsx("div",{className:"auth-error",children:j}),e.jsxs("form",{onSubmit:V,children:[e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Nome Completo"}),e.jsx("input",{className:"auth-input",placeholder:"Ex: João Silva",value:t.nome,onChange:a=>l({...t,nome:a.target.value}),required:!0})]}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Email"}),e.jsx("input",{className:"auth-input",type:"email",placeholder:"joao.silva@email.com",value:t.email,onChange:a=>l({...t,email:a.target.value}),required:!0})]}),e.jsxs("div",{className:"password-grid",children:[e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Palavra-passe"}),e.jsxs("div",{className:"auth-input-wrapper",children:[e.jsx("input",{className:"auth-input",type:h?"text":"password",placeholder:"•••••••••",value:t.password,onChange:a=>l({...t,password:a.target.value}),required:!0}),e.jsx("button",{type:"button",className:"auth-toggle-pwd",onClick:()=>A(!h),children:h?e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Confirmar Password"}),e.jsxs("div",{className:"auth-input-wrapper",children:[e.jsx("input",{className:"auth-input",type:m?"text":"password",placeholder:"•••••••••",value:t.confirmarPassword,onChange:a=>l({...t,confirmarPassword:a.target.value}),required:!0}),e.jsx("button",{type:"button",className:"auth-toggle-pwd",onClick:()=>B(!m),children:m?e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]})]}),e.jsx("span",{className:"auth-hint",style:{marginTop:"-12px",marginBottom:"18px"},children:"Mín. 9 caracteres, 1 maiúscula, 1 número e 1 especial (!@#$...)."}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Telemóvel"}),e.jsx("input",{className:"auth-input",type:"tel",placeholder:"Ex: 912345678",value:t.telefone,onChange:E,required:!0})]}),e.jsxs("div",{className:"auth-form-group",children:[e.jsx("label",{children:"Distrito"}),e.jsxs("select",{className:"auth-input",value:t.localidade,onChange:a=>l({...t,localidade:a.target.value}),required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Seleciona o teu distrito"}),I.map(a=>e.jsx("option",{value:a,children:a},a))]})]}),e.jsx("button",{className:"auth-btn",type:"submit",disabled:b,children:b?"A processar...":"Criar Conta"})]}),e.jsx(P,{to:"/login",className:"auth-link",children:"Já tens conta? Inicia sessão aqui."})]})})]})}export{F as default};
//# sourceMappingURL=Registo-BG6oxiz0.js.map
