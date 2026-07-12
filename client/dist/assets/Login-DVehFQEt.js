import{r as a,b as P,a as C,u as q,j as t,L as i}from"./index-DYFHoXvP.js";function R(){var m,b,v;const[l,y]=a.useState(""),[c,N]=a.useState(""),[r,S]=a.useState(!1),[d,p]=a.useState(!1),[n,u]=a.useState(""),[z,A]=a.useState(!1),h=P(),s=C(),{login:x}=q(),f=(m=s.state)==null?void 0:m.mensagemRegisto,g=((b=s.state)==null?void 0:b.from)||(localStorage.getItem("@App:contexto_visual")==="carro"?"/carros":"/imoveis"),L=async o=>{var j,w;o.preventDefault(),u(""),p(!0);try{x&&await x(l,c),A(!0),setTimeout(()=>{var k;const e=JSON.parse(localStorage.getItem("@App:user")||"{}");if((e==null?void 0:e.tipo)==="admin"){h("/admin",{replace:!0});return}const E=localStorage.getItem("@App:contexto_visual")==="carro"?"/carros":"/imoveis",I=((k=s.state)==null?void 0:k.from)||E;h(I,{replace:!0})},1e3)}catch(e){console.error(e),u(((w=(j=e.response)==null?void 0:j.data)==null?void 0:w.erro)||"Email ou palavra-passe incorretos."),p(!1)}};return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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
          padding: 48px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          max-height: 90vh;
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
          margin-bottom: 32px;
          transition: color 0.2s;
        }
        .auth-back:hover { color: #0f172a; }

        .auth-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          color: #0f172a;
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

        .auth-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

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

        .auth-input-wrapper .auth-input { padding-right: 48px; }

        .auth-toggle-pwd {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: color 0.2s;
        }
        .auth-toggle-pwd:hover { color: #0f172a; }

        .auth-btn {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 12px;
        }
        .auth-btn:hover:not(:disabled) { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 20px -10px rgba(15, 23, 42, 0.3); 
        }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-links-group {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: center;
        }

        .auth-link {
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .auth-link:hover { color: #0f172a; }

        .auth-error {
          color: #b91c1c;
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 24px;
          background: #fef2f2;
          padding: 14px;
          border: 1px solid #fecaca;
          border-radius: 12px;
        }

        .auth-info-banner {
          color: #0f766e;
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 24px;
          background: #f0fdfa;
          padding: 14px;
          border: 1px solid #ccfbf1;
          border-radius: 12px;
          line-height: 1.5;
        }

        .auth-success { text-align: center; padding: 40px 0; }
        .auth-success h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 24px;
          color: #0f172a;
          margin-bottom: 12px;
        }
        .auth-success p { color: #64748b; font-size: 15px; }
      `}),t.jsx("div",{className:"auth-root",children:t.jsxs("div",{className:"auth-card",children:[t.jsx(i,{to:g,className:"auth-back",children:"← Voltar"}),t.jsx("div",{style:{marginBottom:"24px"},children:t.jsx("img",{src:"/logo-noxvelia.png",alt:"NOXVELIA",style:{height:"36px",width:"auto",objectFit:"contain"}})}),z?t.jsxs("div",{className:"auth-success",children:[t.jsx("h2",{children:"Bem-vindo de volta!"}),t.jsx("p",{children:"A estabelecer ligação segura com o teu painel..."})]}):t.jsxs(t.Fragment,{children:[t.jsx("h1",{className:"auth-title",children:"Iniciar Sessão"}),t.jsx("p",{className:"auth-subtitle",children:"Acede à tua conta na NOXVELIA."}),f&&!n&&t.jsx("div",{className:"auth-info-banner",children:f}),n&&t.jsx("div",{className:"auth-error",children:n}),t.jsxs("form",{onSubmit:L,children:[t.jsxs("div",{className:"auth-form-group",children:[t.jsx("label",{children:"Email"}),t.jsx("input",{className:"auth-input",type:"email",placeholder:"exemplo@email.com",value:l,onChange:o=>y(o.target.value),required:!0})]}),t.jsxs("div",{className:"auth-form-group",children:[t.jsx("label",{children:"Palavra-passe"}),t.jsxs("div",{className:"auth-input-wrapper",children:[t.jsx("input",{className:"auth-input",type:r?"text":"password",placeholder:"•••••••••",value:c,onChange:o=>N(o.target.value),required:!0}),t.jsx("button",{type:"button",className:"auth-toggle-pwd",onClick:()=>S(!r),"aria-label":"Alternar visibilidade da palavra-passe",children:r?t.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),t.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):t.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),t.jsx("button",{className:"auth-btn",type:"submit",disabled:d,children:d?"A verificar...":"Entrar na Plataforma"})]}),t.jsxs("div",{className:"auth-links-group",children:[t.jsx(i,{to:"/forgot-password",className:"auth-link",style:{fontWeight:"600"},children:"Esqueceste-te da palavra-passe?"}),t.jsxs(i,{to:"/registo",state:{from:((v=s.state)==null?void 0:v.from)||g},className:"auth-link",children:["Ainda não tens conta? ",t.jsx("span",{style:{color:"#0f172a",fontWeight:"700"},children:"Regista-te aqui."})]})]})]})]})})]})}export{R as default};
//# sourceMappingURL=Login-DVehFQEt.js.map
