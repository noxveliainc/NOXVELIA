import{r as e,b as P,a as C,u as O,j as t,L as i}from"./index-cmRI-XIE.js";function B(){var b,f,v;const[l,y]=e.useState(""),[c,N]=e.useState(""),[s,S]=e.useState(!1),[d,u]=e.useState(!1),[n,x]=e.useState(""),[z,A]=e.useState(!1),p=P(),o=C(),{login:h}=O(),g=(b=o.state)==null?void 0:b.mensagemRegisto,m=((f=o.state)==null?void 0:f.from)||(localStorage.getItem("@App:contexto_visual")==="carro"?"/carros":"/imoveis"),L=async r=>{var j,w;r.preventDefault(),x(""),u(!0);try{h&&await h(l,c),A(!0),setTimeout(()=>{var k;const a=JSON.parse(localStorage.getItem("@App:user")||"{}");if((a==null?void 0:a.tipo)==="admin"){p("/admin",{replace:!0});return}const E=localStorage.getItem("@App:contexto_visual")==="carro"?"/carros":"/imoveis",I=((k=o.state)==null?void 0:k.from)||E;p(I,{replace:!0})},1e3)}catch(a){console.error(a),x(((w=(j=a.response)==null?void 0:j.data)==null?void 0:w.erro)||"Email ou palavra-passe incorretos."),u(!1)}};return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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
          padding: 48px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          max-height: 90vh;
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
          margin-bottom: 32px;
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
          margin-bottom: 32px;
        }

        .auth-form-group { margin-bottom: 20px; }
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
        .auth-toggle-pwd:hover { color: var(--nx-text); }

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

        .auth-links-group {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }

        .auth-link {
          color: var(--nx-text-sub);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
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

        /* 🌟 NOVO: banner de sucesso (mensagem pós-registo) */
        .auth-info-banner {
          color: #2ac1b4;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
          background: rgba(42, 193, 180, 0.08);
          padding: 14px;
          border: 1px solid rgba(42, 193, 180, 0.25);
          border-radius: var(--nx-radius-sm, 8px);
          line-height: 1.4;
        }

        .auth-success {
          text-align: center;
          padding: 40px 0;
        }
        .auth-success h2 {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 24px;
          color: var(--nx-accent-car, #2ac1b4);
          margin-bottom: 12px;
        }
        .auth-success p {
          color: var(--nx-text-sub);
          font-size: 14px;
        }
      `}),t.jsx("div",{className:"auth-root",children:t.jsxs("div",{className:"auth-card",children:[t.jsx(i,{to:m,className:"auth-back",children:"← Voltar"}),t.jsx("div",{style:{marginBottom:"24px"},children:t.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA",style:{height:"32px",width:"auto",objectFit:"contain"}})}),z?t.jsxs("div",{className:"auth-success",children:[t.jsx("h2",{children:"Bem-vindo de volta!"}),t.jsx("p",{children:"A estabelecer ligação segura com o teu painel..."})]}):t.jsxs(t.Fragment,{children:[t.jsx("h1",{className:"auth-title",children:"Iniciar Sessão"}),t.jsx("p",{className:"auth-subtitle",children:"Acede à tua conta na NOXVELIA."}),g&&!n&&t.jsx("div",{className:"auth-info-banner",children:g}),n&&t.jsx("div",{className:"auth-error",children:n}),t.jsxs("form",{onSubmit:L,children:[t.jsxs("div",{className:"auth-form-group",children:[t.jsx("label",{children:"Email"}),t.jsx("input",{className:"auth-input",type:"email",placeholder:"joao.silva@email.com",value:l,onChange:r=>y(r.target.value),required:!0})]}),t.jsxs("div",{className:"auth-form-group",children:[t.jsx("label",{children:"Palavra-passe"}),t.jsxs("div",{className:"auth-input-wrapper",children:[t.jsx("input",{className:"auth-input",type:s?"text":"password",placeholder:"•••••••••",value:c,onChange:r=>N(r.target.value),required:!0}),t.jsx("button",{type:"button",className:"auth-toggle-pwd",onClick:()=>S(!s),"aria-label":"Alternar visibilidade da palavra-passe",children:s?t.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),t.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):t.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),t.jsx("button",{className:"auth-btn",type:"submit",disabled:d,children:d?"A verificar credenciais...":"Entrar na Plataforma"})]}),t.jsxs("div",{className:"auth-links-group",children:[t.jsx(i,{to:"/forgot-password",className:"auth-link",style:{color:"#2ac1b4",fontWeight:"700"},children:"Esqueceste-te da palavra-passe?"}),t.jsx(i,{to:"/registo",state:{from:((v=o.state)==null?void 0:v.from)||m},className:"auth-link",children:"Ainda não tens conta? Regista-te aqui."})]})]})]})})]})}export{B as default};
//# sourceMappingURL=Login-Ud0P5b4h.js.map
