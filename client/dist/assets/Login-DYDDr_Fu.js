import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{M as t,O as n,S as r,T as i,_ as a,k as o,v as s,x as c}from"./index-K-flNKTY.js";import{n as l,t as u}from"./GoogleAuthButton-isGw6Lub.js";var d=e(t(),1),f=r();function p(){let[e,t]=(0,d.useState)(``),[r,p]=(0,d.useState)(``),[m,h]=(0,d.useState)(!1),[g,_]=(0,d.useState)(!1),[v,y]=(0,d.useState)(``),[b,x]=(0,d.useState)(!1),S=o(),C=n(),{login:w,loginGoogle:T}=c(),E=C.state?.mensagemRegisto,D=a(C.state,localStorage.getItem(`@App:contexto_visual`)===`carro`?`/carros`:`/imoveis`),O=()=>{x(!0),setTimeout(()=>{if(JSON.parse(sessionStorage.getItem(`@App:user`)||`{}`)?.tipo===`admin`){S(`/admin`,{replace:!0});return}let e=localStorage.getItem(`@App:contexto_visual`)===`carro`?`/carros`:`/imoveis`,t=s(C.state,e);S(t,{replace:!0})},700)};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`style`,{children:`
        .auth-root {
          position: relative;
          overflow: hidden;
          background-color: #082126;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: #0f172a;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }

        .auth-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('/noxvelia-hero-coast.webp');
          background-size: cover;
          background-position: center;
          opacity: 0.24;
          filter: saturate(0.95) contrast(1.08);
        }

        .auth-root::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(8, 33, 38, 0.76);
        }

        .auth-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
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

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          height: 1px;
          flex: 1;
          background: #e2e8f0;
        }
        .auth-google-wrap {
          display: flex;
          justify-content: center;
          min-height: 44px;
        }
        .auth-google-wrap.disabled {
          pointer-events: none;
          opacity: 0.65;
        }

        .auth-info-banner {
          color: #102f50;
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 24px;
          background: #fffaf0;
          padding: 14px;
          border: 1px solid rgba(217, 196, 156, 0.42);
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
      `}),(0,f.jsx)(`div`,{className:`auth-root`,children:(0,f.jsxs)(`div`,{className:`auth-card`,children:[(0,f.jsx)(i,{to:D,className:`auth-back`,children:`← Voltar`}),(0,f.jsx)(`div`,{style:{marginBottom:`24px`},children:(0,f.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:`NOXVELIA`,style:{height:`36px`,width:`auto`,objectFit:`contain`}})}),b?(0,f.jsxs)(`div`,{className:`auth-success`,children:[(0,f.jsx)(`h2`,{children:`Bem-vindo de volta!`}),(0,f.jsx)(`p`,{children:`A estabelecer ligação segura com o teu painel...`})]}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`h1`,{className:`auth-title`,children:`Iniciar Sessão`}),(0,f.jsx)(`p`,{className:`auth-subtitle`,children:`Acede à tua conta na NOXVELIA.`}),E&&!v&&(0,f.jsx)(`div`,{className:`auth-info-banner`,children:E}),v&&(0,f.jsx)(`div`,{className:`auth-error`,children:v}),l&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(u,{text:`signin_with`,disabled:g,onCredential:async e=>{y(``),_(!0);try{let t=await T({credential:e});if(t?.requiresCompletion){S(`/registo`,{state:{googleCredential:e,googleProfile:t.profile,from:C.state?.from||D,returnTo:C.state?.returnTo||D}});return}O()}catch(e){console.error(e),y(e.response?.data?.erro||`Não foi possível continuar com Google. Tenta novamente.`),_(!1)}},onError:y}),(0,f.jsx)(`div`,{className:`auth-divider`,children:(0,f.jsx)(`span`,{children:`ou entra com email`})})]}),(0,f.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),y(``),_(!0);try{w&&await w(e,r),O()}catch(e){console.error(e),y(e.response?.data?.erro||`Email ou palavra-passe incorretos.`),_(!1)}},children:[(0,f.jsxs)(`div`,{className:`auth-form-group`,children:[(0,f.jsx)(`label`,{children:`Email`}),(0,f.jsx)(`input`,{className:`auth-input`,type:`email`,placeholder:`exemplo@email.com`,value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,f.jsxs)(`div`,{className:`auth-form-group`,children:[(0,f.jsx)(`label`,{children:`Palavra-passe`}),(0,f.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,f.jsx)(`input`,{className:`auth-input`,type:m?`text`:`password`,placeholder:`•••••••••`,value:r,onChange:e=>p(e.target.value),required:!0}),(0,f.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>h(!m),"aria-label":`Alternar visibilidade da palavra-passe`,children:m?(0,f.jsxs)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,f.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,f.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,f.jsxs)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,f.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,f.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]}),(0,f.jsx)(`button`,{className:`auth-btn`,type:`submit`,disabled:g,children:g?`A verificar...`:`Entrar na Plataforma`})]}),(0,f.jsxs)(`div`,{className:`auth-links-group`,children:[(0,f.jsx)(i,{to:`/forgot-password`,className:`auth-link`,style:{fontWeight:`600`},children:`Esqueceste-te da palavra-passe?`}),(0,f.jsxs)(i,{to:`/registo`,state:{from:C.state?.from||D,returnTo:C.state?.returnTo||D},className:`auth-link`,children:[`Ainda não tens conta? `,(0,f.jsx)(`span`,{style:{color:`#0f172a`,fontWeight:`700`},children:`Regista-te aqui.`})]})]})]})]})})]})}export{p as default};