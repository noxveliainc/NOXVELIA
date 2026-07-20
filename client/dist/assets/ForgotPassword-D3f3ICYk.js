import{A as e,O as t,b as n,x as r,y as i}from"./index-DHrbdB_k.js";var a=e(t(),1),o=i();function s(){let[e,t]=(0,a.useState)(``),[i,s]=(0,a.useState)(!1),[c,l]=(0,a.useState)(``),[u,d]=(0,a.useState)(!1);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`style`,{children:`
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
        }

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
          line-height: 1.5;
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

        .auth-success { text-align: center; padding: 20px 0; }
        .auth-success h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; color: #0f172a; margin-bottom: 12px; }
        .auth-success p { color: #64748b; font-size: 15px; line-height: 1.6; }
      `}),(0,o.jsx)(`div`,{className:`auth-root`,children:(0,o.jsxs)(`div`,{className:`auth-card`,children:[(0,o.jsx)(r,{to:`/login`,className:`auth-back`,children:`← Voltar`}),(0,o.jsx)(`div`,{style:{marginBottom:`24px`},children:(0,o.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:`NOXVELIA`,style:{height:`36px`,width:`auto`,objectFit:`contain`}})}),u?(0,o.jsxs)(`div`,{className:`auth-success`,children:[(0,o.jsx)(`h2`,{children:`E-mail Enviado!`}),(0,o.jsx)(`p`,{children:`Se o e-mail existir no nosso sistema, vais receber um link de recuperação válido por 1 hora. Verifica também a tua pasta de Spam.`})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`h1`,{className:`auth-title`,children:`Recuperação`}),(0,o.jsx)(`p`,{className:`auth-subtitle`,children:`Insere o teu e-mail para receberes as instruções de redefinição de palavra-passe.`}),c&&(0,o.jsx)(`div`,{className:`auth-error`,children:c}),(0,o.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),s(!0),l(``);try{await n.post(`/auth/forgot-password`,{email:e}),d(!0)}catch(e){l(e.response?.data?.erro||`Ocorreu um erro ao processar o pedido.`)}finally{s(!1)}},children:[(0,o.jsxs)(`div`,{className:`auth-form-group`,children:[(0,o.jsx)(`label`,{children:`Email Associado`}),(0,o.jsx)(`input`,{className:`auth-input`,type:`email`,placeholder:`joao.silva@email.com`,value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,o.jsx)(`button`,{className:`auth-btn`,type:`submit`,disabled:i,children:i?`A processar...`:`Enviar Link`})]})]})]})})]})}export{s as default};