import{g as e,l as t,t as n,u as r,y as i}from"./jsx-runtime-On9Szgki.js";import{g as a,v as o}from"./index-u74lpmsb.js";var s=i(e(),1),c=n();function l(){let[e,n]=(0,s.useState)(``),[i,l]=(0,s.useState)(``),[u,d]=(0,s.useState)(!1),[f,p]=(0,s.useState)(!1),[m,h]=(0,s.useState)(``),[g,_]=(0,s.useState)(!1),v=r(),y=t(),{login:b}=a(),x=y.state?.mensagemRegisto,S=y.state?.from||(localStorage.getItem(`@App:contexto_visual`)===`carro`?`/carros`:`/imoveis`);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`style`,{children:`
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
      `}),(0,c.jsx)(`div`,{className:`auth-root`,children:(0,c.jsxs)(`div`,{className:`auth-card`,children:[(0,c.jsx)(o,{to:S,className:`auth-back`,children:`← Voltar`}),(0,c.jsx)(`div`,{style:{marginBottom:`24px`},children:(0,c.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:`NOXVELIA`,style:{height:`36px`,width:`auto`,objectFit:`contain`}})}),g?(0,c.jsxs)(`div`,{className:`auth-success`,children:[(0,c.jsx)(`h2`,{children:`Bem-vindo de volta!`}),(0,c.jsx)(`p`,{children:`A estabelecer ligação segura com o teu painel...`})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`h1`,{className:`auth-title`,children:`Iniciar Sessão`}),(0,c.jsx)(`p`,{className:`auth-subtitle`,children:`Acede à tua conta na NOXVELIA.`}),x&&!m&&(0,c.jsx)(`div`,{className:`auth-info-banner`,children:x}),m&&(0,c.jsx)(`div`,{className:`auth-error`,children:m}),(0,c.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),h(``),p(!0);try{b&&await b(e,i),_(!0),setTimeout(()=>{if(JSON.parse(sessionStorage.getItem(`@App:user`)||`{}`)?.tipo===`admin`){v(`/admin`,{replace:!0});return}let e=localStorage.getItem(`@App:contexto_visual`)===`carro`?`/carros`:`/imoveis`,t=y.state?.from||e;v(t,{replace:!0})},1e3)}catch(e){console.error(e),h(e.response?.data?.erro||`Email ou palavra-passe incorretos.`),p(!1)}},children:[(0,c.jsxs)(`div`,{className:`auth-form-group`,children:[(0,c.jsx)(`label`,{children:`Email`}),(0,c.jsx)(`input`,{className:`auth-input`,type:`email`,placeholder:`exemplo@email.com`,value:e,onChange:e=>n(e.target.value),required:!0})]}),(0,c.jsxs)(`div`,{className:`auth-form-group`,children:[(0,c.jsx)(`label`,{children:`Palavra-passe`}),(0,c.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,c.jsx)(`input`,{className:`auth-input`,type:u?`text`:`password`,placeholder:`•••••••••`,value:i,onChange:e=>l(e.target.value),required:!0}),(0,c.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>d(!u),"aria-label":`Alternar visibilidade da palavra-passe`,children:u?(0,c.jsxs)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,c.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,c.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,c.jsxs)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,c.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,c.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]}),(0,c.jsx)(`button`,{className:`auth-btn`,type:`submit`,disabled:f,children:f?`A verificar...`:`Entrar na Plataforma`})]}),(0,c.jsxs)(`div`,{className:`auth-links-group`,children:[(0,c.jsx)(o,{to:`/forgot-password`,className:`auth-link`,style:{fontWeight:`600`},children:`Esqueceste-te da palavra-passe?`}),(0,c.jsxs)(o,{to:`/registo`,state:{from:y.state?.from||S},className:`auth-link`,children:[`Ainda não tens conta? `,(0,c.jsx)(`span`,{style:{color:`#0f172a`,fontWeight:`700`},children:`Regista-te aqui.`})]})]})]})]})})]})}export{l as default};