import{E as e,F as t,N as n,T as r,j as i,w as a}from"./index-CjA2JSwO.js";var o=t(n(),1),s=a();function c(){let{token:t}=i(),[n,a]=(0,o.useState)(`a_verificar`),[c,l]=(0,o.useState)(``);return(0,o.useEffect)(()=>{t&&(async()=>{try{let e=await r.get(`/auth/verify-email/${t}`);l(e.data?.mensagem||`Email verificado com sucesso!`),a(`sucesso`)}catch(e){l(e.response?.data?.erro||`Não foi possível verificar o teu email.`),a(`erro`)}})()},[t]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`style`,{children:`
        .auth-root {
          background-color: #040711;
          background-image: radial-gradient(circle at top right, rgba(217, 196, 156, 0.05), transparent 45%),
                            radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.05), transparent 45%);

          --nx-text: #f8fafc;
          --nx-text-sub: #94a3b8;
          --nx-text-muted: #64748b;
          --nx-card-bg: rgba(15, 23, 42, 0.6);
          --nx-card-border: rgba(255, 255, 255, 0.08);

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
          text-align: center;
        }

        .verify-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .verify-icon.loading { background: rgba(148, 163, 184, 0.1); color: #94a3b8; }
        .verify-icon.sucesso { background: rgba(217, 196, 156, 0.1); color: #d9c49c; }
        .verify-icon.erro { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .verify-icon.loading svg {
          animation: nx-spin 1s linear infinite;
        }
        @keyframes nx-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .auth-title {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 14px;
          color: var(--nx-text-sub);
          margin-bottom: 32px;
          line-height: 1.5;
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
          text-decoration: none;
          display: inline-block;
          box-sizing: border-box;
        }
        .auth-btn:hover { opacity: 0.85; }

        .auth-btn.outline {
          background: transparent;
          color: var(--nx-text);
          border: 1px solid rgba(255,255,255,0.2);
          margin-top: 12px;
        }
      `}),(0,s.jsx)(`div`,{className:`auth-root`,children:(0,s.jsxs)(`div`,{className:`auth-card`,children:[(0,s.jsx)(`div`,{style:{marginBottom:`24px`},children:(0,s.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:`NOXVELIA`,style:{height:`32px`,width:`auto`,objectFit:`contain`,margin:`0 auto`}})}),n===`a_verificar`&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`div`,{className:`verify-icon loading`,children:(0,s.jsx)(`svg`,{width:`28`,height:`28`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,children:(0,s.jsx)(`path`,{d:`M21 12a9 9 0 11-9-9`})})}),(0,s.jsx)(`h1`,{className:`auth-title`,children:`A verificar a tua conta...`}),(0,s.jsx)(`p`,{className:`auth-subtitle`,children:`Aguarda um momento, estamos a confirmar o teu email.`})]}),n===`sucesso`&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`div`,{className:`verify-icon sucesso`,children:(0,s.jsx)(`svg`,{width:`28`,height:`28`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,s.jsx)(`polyline`,{points:`20 6 9 17 4 12`})})}),(0,s.jsx)(`h1`,{className:`auth-title`,children:`Conta verificada!`}),(0,s.jsxs)(`p`,{className:`auth-subtitle`,children:[c,` Já podes iniciar sessão na plataforma.`]}),(0,s.jsx)(e,{to:`/login`,className:`auth-btn`,children:`Iniciar Sessão`})]}),n===`erro`&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`div`,{className:`verify-icon erro`,children:(0,s.jsxs)(`svg`,{width:`28`,height:`28`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,s.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,s.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})}),(0,s.jsx)(`h1`,{className:`auth-title`,children:`Não foi possível verificar`}),(0,s.jsx)(`p`,{className:`auth-subtitle`,children:c}),(0,s.jsx)(e,{to:`/login`,className:`auth-btn outline`,children:`Voltar ao Login`})]})]})})]})}export{c as default};