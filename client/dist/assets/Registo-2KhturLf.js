import{g as e,t,u as n,y as r}from"./jsx-runtime-On9Szgki.js";import{_ as i,v as a}from"./index-u74lpmsb.js";var o=r(e(),1),s=t(),c=[`Aveiro`,`Beja`,`Braga`,`Bragança`,`Castelo Branco`,`Coimbra`,`Évora`,`Faro`,`Guarda`,`Leiria`,`Lisboa`,`Portalegre`,`Porto`,`Santarém`,`Setúbal`,`Viana do Castelo`,`Vila Real`,`Viseu`,`Açores`,`Madeira`];function l(){let[e,t]=(0,o.useState)({nome:``,email:``,password:``,confirmarPassword:``,telefone:``,localidade:``,tipoConta:`particular`}),[r,l]=(0,o.useState)(!1),[u,d]=(0,o.useState)(!1),[f,p]=(0,o.useState)(!1),[m,h]=(0,o.useState)(``),[g,_]=(0,o.useState)(!1),[v,y]=(0,o.useState)(!1),b=n(),x=n=>{let r=n.target.value.replace(/\D/g,``);r.length<=9&&t({...e,telefone:r})},S=e=>{let t=e.length>=9,n=/[A-Z]/.test(e),r=/\d/.test(e),i=/[!@#$%^&*(),.?":{}|<>]/.test(e);return t&&n&&r&&i};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`style`,{children:`
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
      `}),g&&(0,s.jsx)(`div`,{className:`modal-overlay`,children:(0,s.jsxs)(`div`,{className:`modal-box`,children:[(0,s.jsx)(`div`,{className:`modal-icon`,children:(0,s.jsx)(`svg`,{width:`32`,height:`32`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,s.jsx)(`path`,{d:`M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z`})})}),(0,s.jsx)(`h2`,{style:{fontFamily:`var(--nx-font-display)`,fontSize:`24px`,fontWeight:800,color:`#0f172a`,margin:`0 0 12px`},children:`Verifica os teus contactos`}),(0,s.jsx)(`p`,{style:{fontSize:`15px`,color:`#64748b`,marginBottom:`24px`,lineHeight:1.6},children:`Vamos enviar um email de confirmação. Vais precisar de clicar no link para ativar a tua conta antes de iniciares sessão. Confirma que os dados estão corretos.`}),(0,s.jsxs)(`div`,{className:`modal-data-box`,children:[(0,s.jsxs)(`div`,{style:{marginBottom:`8px`,color:`#0f172a`,fontSize:`15px`},children:[(0,s.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Email:`}),` `,e.email]}),(0,s.jsxs)(`div`,{style:{color:`#0f172a`,fontSize:`15px`},children:[(0,s.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Telemóvel:`}),` `,e.telefone]})]}),(0,s.jsxs)(`label`,{className:`auth-confirm-check`,children:[(0,s.jsx)(`input`,{type:`checkbox`,checked:v,onChange:e=>y(e.target.checked)}),(0,s.jsx)(`span`,{children:`Confirmo que o email e o telefone estão corretos e que tenho acesso aos mesmos.`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`12px`},children:[(0,s.jsx)(`button`,{onClick:()=>{_(!1),y(!1)},style:{flex:1,padding:`16px`,background:`#ffffff`,border:`1px solid #cbd5e1`,color:`#0f172a`,borderRadius:`12px`,fontWeight:700,cursor:`pointer`,transition:`all 0.2s`},children:`Corrigir Dados`}),(0,s.jsx)(`button`,{onClick:async()=>{if(v){_(!1),p(!0),h(``);try{let t={nome:e.nome,email:e.email,password:e.password,telefone:e.telefone,localidade:e.localidade,tipo:`cliente`,tipoConta:`particular`};await i.post(`/auth/register`,t),b(`/login`,{state:{mensagemRegisto:`Conta criada com sucesso! Verifica o teu email para ativares o acesso.`}})}catch(e){let t=e.response?.data?.erro||e.response?.data?.message||e.response?.data?.detalhes;if(Array.isArray(t))h(t.join(` | `));else if(typeof t==`object`&&t)h(Object.values(t).join(` | `));else if(typeof t==`string`)h(t);else if(e.response?.data?.code===11e3||e.response?.data?.error?.code===11e3){let t=JSON.stringify(e.response?.data);t.includes(`email`)?h(`Este email já se encontra registado.`):t.includes(`telefone`)?h(`Este número de telemóvel já se encontra em uso.`):h(`Estes dados já existem na nossa base de dados.`)}else h(`Erro ao efetuar o registo. Verifica os teus dados e a ligação à internet.`)}finally{p(!1)}}},disabled:!v,style:{flex:1,padding:`16px`,background:`#0f172a`,color:`#ffffff`,border:`none`,borderRadius:`12px`,fontWeight:700,cursor:v?`pointer`:`not-allowed`,opacity:v?1:.5,transition:`all 0.2s`},children:`Tudo Correto!`})]})]})}),(0,s.jsx)(`div`,{className:`auth-root`,children:(0,s.jsxs)(`div`,{className:`auth-card`,children:[(0,s.jsx)(a,{to:`/`,className:`auth-back`,children:`← Voltar`}),(0,s.jsx)(`div`,{style:{marginBottom:`24px`},children:(0,s.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:`NOXVELIA`,style:{height:`36px`,width:`auto`,objectFit:`contain`}})}),(0,s.jsx)(`h1`,{className:`auth-title`,children:`Criar Conta`}),(0,s.jsx)(`p`,{className:`auth-subtitle`,children:`Regista-te para aceder e publicar anúncios.`}),m&&(0,s.jsx)(`div`,{className:`auth-error`,children:m}),(0,s.jsxs)(`form`,{onSubmit:t=>{if(t.preventDefault(),h(``),e.password!==e.confirmarPassword){h(`As palavras-passe não coincidem. Verifica e tenta novamente.`);return}if(!/^9[1236]\d{7}$/.test(e.telefone)){h(`O número tem de ser um telemóvel português válido.`);return}if(!S(e.password)){h(`A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.`);return}if(!e.localidade){h(`Por favor, seleciona um distrito válido.`);return}y(!1),_(!0)},children:[(0,s.jsxs)(`div`,{className:`auth-form-group`,children:[(0,s.jsx)(`label`,{children:`Nome Completo`}),(0,s.jsx)(`input`,{className:`auth-input`,placeholder:`Ex: João Silva`,value:e.nome,onChange:n=>t({...e,nome:n.target.value}),required:!0})]}),(0,s.jsxs)(`div`,{className:`auth-form-group`,children:[(0,s.jsx)(`label`,{children:`Email`}),(0,s.jsx)(`input`,{className:`auth-input`,type:`email`,placeholder:`joao.silva@email.com`,value:e.email,onChange:n=>t({...e,email:n.target.value}),required:!0})]}),(0,s.jsxs)(`div`,{className:`password-grid`,children:[(0,s.jsxs)(`div`,{className:`auth-form-group`,children:[(0,s.jsx)(`label`,{children:`Palavra-passe`}),(0,s.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,s.jsx)(`input`,{className:`auth-input`,type:r?`text`:`password`,placeholder:`•••••••••`,value:e.password,onChange:n=>t({...e,password:n.target.value}),required:!0}),(0,s.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>l(!r),children:r?(0,s.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,s.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,s.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,s.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,s.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,s.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]}),(0,s.jsxs)(`div`,{className:`auth-form-group`,children:[(0,s.jsx)(`label`,{children:`Confirmar Password`}),(0,s.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,s.jsx)(`input`,{className:`auth-input`,type:u?`text`:`password`,placeholder:`•••••••••`,value:e.confirmarPassword,onChange:n=>t({...e,confirmarPassword:n.target.value}),required:!0}),(0,s.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>d(!u),children:u?(0,s.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,s.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,s.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,s.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,s.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,s.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]})]}),(0,s.jsx)(`span`,{className:`auth-hint`,style:{marginTop:`-12px`,marginBottom:`20px`},children:`Mínimo: 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial (!@#$...).`}),(0,s.jsxs)(`div`,{className:`auth-form-group`,children:[(0,s.jsx)(`label`,{children:`Telemóvel`}),(0,s.jsx)(`input`,{className:`auth-input`,type:`tel`,placeholder:`Ex: 912345678`,value:e.telefone,onChange:x,required:!0})]}),(0,s.jsxs)(`div`,{className:`auth-form-group`,children:[(0,s.jsx)(`label`,{children:`Distrito`}),(0,s.jsxs)(`select`,{className:`auth-input`,value:e.localidade,onChange:n=>t({...e,localidade:n.target.value}),required:!0,children:[(0,s.jsx)(`option`,{value:``,disabled:!0,children:`Seleciona o teu distrito`}),c.map(e=>(0,s.jsx)(`option`,{value:e,children:e},e))]})]}),(0,s.jsx)(`button`,{className:`auth-btn`,type:`submit`,disabled:f,children:f?`A processar...`:`Criar Conta`})]}),(0,s.jsxs)(a,{to:`/login`,className:`auth-link`,children:[`Já tens conta? `,(0,s.jsx)(`span`,{style:{fontWeight:700,color:`#0f172a`},children:`Inicia sessão aqui.`})]})]})})]})}export{l as default};