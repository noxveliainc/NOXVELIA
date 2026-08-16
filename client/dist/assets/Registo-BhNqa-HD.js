import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{D as r,O as i,S as a,_ as o,g as s,w as c,x as l}from"./index-BoKioywp.js";import{i as u,n as d,r as f,t as p}from"./TurnstileWidget-B6r7_idl.js";var m=e(t(),1),h=n(),g=[`Aveiro`,`Beja`,`Braga`,`Bragança`,`Castelo Branco`,`Coimbra`,`Évora`,`Faro`,`Guarda`,`Leiria`,`Lisboa`,`Portalegre`,`Porto`,`Santarém`,`Setúbal`,`Viana do Castelo`,`Vila Real`,`Viseu`,`Açores`,`Madeira`];function _(){let e=i(),t=r(),{loginGoogle:n}=l(),_=t.state?.googleProfile||null,[v,y]=(0,m.useState)(t.state?.googleCredential||``),[b,x]=(0,m.useState)({nome:_?.nome||``,email:_?.email||``,password:``,confirmarPassword:``,telefone:``,mostrarTelefonePublico:!0,localidade:``,aceitouTermos:!1,tipoConta:`particular`}),[S,C]=(0,m.useState)(!1),[w,T]=(0,m.useState)(!1),[E,D]=(0,m.useState)(!1),[O,k]=(0,m.useState)(``),[A,j]=(0,m.useState)(``),[M,N]=(0,m.useState)(!1),[P,F]=(0,m.useState)(!1),I=s(t.state,`/`),L=!!v,R=()=>o(t.state,I),z=e=>{let t=e.target.value.replace(/\D/g,``);t.length<=9&&x({...b,telefone:t})},B=e=>{let t=e.length>=9,n=/[A-Z]/.test(e),r=/\d/.test(e),i=/[!@#$%^&*(),.?":{}|<>]/.test(e);return t&&n&&r&&i};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`style`,{children:`
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
          background-image: url('/social/noxvelia-estate-photo-premium.webp');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          filter: saturate(0.95) contrast(1.08);
        }

        .auth-root::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(8, 33, 38, 0.78);
        }

        .auth-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 42px 48px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
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
        .auth-input[readonly] { background: #f8fafc; color: #334155; cursor: default; }
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
        .auth-phone-visibility {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          border: 1px solid #dbe5e2;
          border-radius: 12px;
          background: #f8fafc;
          margin: -4px 0 20px;
          cursor: pointer;
        }
        .auth-phone-visibility input {
          width: 18px;
          height: 18px;
          margin-top: 3px;
          accent-color: #d9c49c;
          cursor: pointer;
          flex: 0 0 auto;
        }
        .auth-phone-visibility strong {
          display: block;
          font-size: 13px;
          line-height: 1.35;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .auth-phone-visibility small {
          display: block;
          font-size: 12px;
          line-height: 1.45;
          color: #64748b;
          font-weight: 600;
        }

        .auth-terms-accept {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          border: 1px solid #dbe5e2;
          border-radius: 12px;
          background: #f8fafc;
          margin: 0 0 20px;
        }
        .auth-terms-accept input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: #d9c49c;
          cursor: pointer;
          flex: 0 0 auto;
        }
        .auth-terms-accept span {
          display: block;
          font-size: 13px;
          line-height: 1.5;
          color: #475569;
          font-weight: 600;
        }
        .auth-terms-accept a {
          color: #0f172a;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .auth-terms-accept a:hover { color: #2a7f78; }

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
        .auth-turnstile { margin: 14px 0 4px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .auth-turnstile small { color: #64748b; font-size: 12px; font-weight: 600; }
      `}),M&&(0,h.jsx)(`div`,{className:`modal-overlay`,children:(0,h.jsxs)(`div`,{className:`modal-box`,children:[(0,h.jsx)(`div`,{className:`modal-icon`,children:(0,h.jsx)(`svg`,{width:`32`,height:`32`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,h.jsx)(`path`,{d:`M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z`})})}),(0,h.jsx)(`h2`,{style:{fontFamily:`var(--nx-font-display)`,fontSize:`24px`,fontWeight:800,color:`#0f172a`,margin:`0 0 12px`},children:`Verifica os teus contactos`}),(0,h.jsx)(`p`,{style:{fontSize:`15px`,color:`#64748b`,marginBottom:`24px`,lineHeight:1.6},children:L?`A tua conta Google já confirma o email. Confirma agora os dados que vão identificar a tua conta na Noxvelia.`:`Vamos enviar um email de confirmação. Vais precisar de clicar no link para ativar a tua conta antes de iniciares sessão. Confirma que os dados estão corretos.`}),(0,h.jsxs)(`div`,{className:`modal-data-box`,children:[(0,h.jsxs)(`div`,{style:{marginBottom:`8px`,color:`#0f172a`,fontSize:`15px`},children:[(0,h.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Email:`}),` `,b.email]}),(0,h.jsxs)(`div`,{style:{marginBottom:`8px`,color:`#0f172a`,fontSize:`15px`},children:[(0,h.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Telemóvel:`}),` `,b.telefone]}),(0,h.jsxs)(`div`,{style:{color:`#0f172a`,fontSize:`15px`},children:[(0,h.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Telemóvel público:`}),` `,b.mostrarTelefonePublico?`Sim, mostrar nos anúncios e no perfil`:`Não, mostrar apenas email`]})]}),(0,h.jsxs)(`label`,{className:`auth-confirm-check`,children:[(0,h.jsx)(`input`,{type:`checkbox`,checked:P,onChange:e=>F(e.target.checked)}),(0,h.jsx)(`span`,{children:`Confirmo que o email e o telefone estão corretos e que tenho acesso aos mesmos.`})]}),(0,h.jsxs)(`div`,{style:{display:`flex`,gap:`12px`},children:[(0,h.jsx)(`button`,{onClick:()=>{N(!1),F(!1)},style:{flex:1,padding:`16px`,background:`#ffffff`,border:`1px solid #cbd5e1`,color:`#0f172a`,borderRadius:`12px`,fontWeight:700,cursor:`pointer`,transition:`all 0.2s`},children:`Corrigir Dados`}),(0,h.jsx)(`button`,{onClick:async()=>{if(P){N(!1),D(!0),k(``);try{if(L){if((await n({credential:v,nome:b.nome,telefone:b.telefone,mostrarTelefonePublico:b.mostrarTelefonePublico,localidade:b.localidade,tipoConta:b.tipoConta,aceitouTermos:b.aceitouTermos,turnstileToken:A}))?.requiresCompletion){k(`Completa os dados obrigatórios para criar a conta com Google.`);return}e(R(),{replace:!0});return}let r={nome:b.nome,email:b.email,password:b.password,telefone:b.telefone,mostrarTelefonePublico:b.mostrarTelefonePublico,localidade:b.localidade,tipo:`cliente`,tipoConta:`particular`,aceitouTermos:b.aceitouTermos,turnstileToken:A};await a.post(`/auth/register`,r),e(`/login`,{state:{mensagemRegisto:`Conta criada com sucesso! Verifica o teu email para ativares o acesso.`,from:t.state?.from,returnTo:t.state?.returnTo}})}catch(e){let t=e.response?.data?.erro||e.response?.data?.message||e.response?.data?.detalhes;if(Array.isArray(t))k(t.join(` | `));else if(typeof t==`object`&&t)k(Object.values(t).join(` | `));else if(typeof t==`string`)k(t);else if(e.response?.data?.code===11e3||e.response?.data?.error?.code===11e3){let t=JSON.stringify(e.response?.data);t.includes(`email`)?k(`Este email já se encontra registado.`):t.includes(`telefone`)?k(`Este número de telemóvel já se encontra em uso.`):k(`Já existe uma conta com estes dados.`)}else k(`Erro ao efetuar o registo. Verifica os teus dados e a ligação à internet.`)}finally{D(!1)}}},disabled:!P,style:{flex:1,padding:`16px`,background:`#0f172a`,color:`#ffffff`,border:`none`,borderRadius:`12px`,fontWeight:700,cursor:P?`pointer`:`not-allowed`,opacity:P?1:.5,transition:`all 0.2s`},children:L?`Concluir registo`:`Tudo Correto!`})]})]})}),(0,h.jsx)(`div`,{className:`auth-root`,children:(0,h.jsxs)(`div`,{className:`auth-card`,children:[(0,h.jsx)(c,{to:I,className:`auth-back`,children:`← Voltar`}),(0,h.jsx)(`div`,{style:{marginBottom:`24px`},children:(0,h.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:`NOXVELIA`,style:{height:`36px`,width:`auto`,objectFit:`contain`}})}),(0,h.jsx)(`h1`,{className:`auth-title`,children:L?`Completar registo`:`Criar Conta`}),(0,h.jsx)(`p`,{className:`auth-subtitle`,children:L?`Confirma os dados obrigatórios da Noxvelia para entrares com Google.`:`Regista-te para aceder e publicar anúncios.`}),O&&(0,h.jsx)(`div`,{className:`auth-error`,children:O}),!L&&u&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(f,{text:`signup_with`,disabled:E,onCredential:async t=>{if(k(``),d&&!A){k(`Confirma a verificacao de seguranca para continuar.`);return}D(!0);try{let r=await n({credential:t,turnstileToken:A});if(r?.requiresCompletion){y(t),x(e=>({...e,nome:r.profile?.nome||e.nome,email:r.profile?.email||e.email,password:``,confirmarPassword:``})),F(!1),N(!1),window.requestAnimationFrame(()=>window.scrollTo({top:0,behavior:`smooth`}));return}e(R(),{replace:!0})}catch(e){console.error(e),k(e.response?.data?.erro||`Não foi possível continuar com Google. Tenta novamente.`)}finally{D(!1)}},onError:k}),(0,h.jsx)(`div`,{className:`auth-divider`,children:(0,h.jsx)(`span`,{children:`ou cria com email`})})]}),(0,h.jsxs)(`form`,{onSubmit:e=>{if(e.preventDefault(),k(``),!L){if(b.password!==b.confirmarPassword){k(`As palavras-passe não coincidem. Verifica e tenta novamente.`);return}if(!B(b.password)){k(`A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.`);return}}if(!/^9[1236]\d{7}$/.test(b.telefone)){k(`O número tem de ser um telemóvel português válido.`);return}if(!b.localidade){k(`Por favor, seleciona um distrito válido.`);return}if(!b.aceitouTermos){k(`Tens de aceitar os Termos e Condições para criar a conta.`);return}F(!1),N(!0)},children:[(0,h.jsxs)(`div`,{className:`auth-form-group`,children:[(0,h.jsx)(`label`,{children:`Nome Completo`}),(0,h.jsx)(`input`,{className:`auth-input`,placeholder:`Ex: João Silva`,value:b.nome,onChange:e=>x({...b,nome:e.target.value}),required:!0})]}),(0,h.jsxs)(`div`,{className:`auth-form-group`,children:[(0,h.jsx)(`label`,{children:`Email`}),(0,h.jsx)(`input`,{className:`auth-input`,type:`email`,placeholder:`joao.silva@email.com`,value:b.email,onChange:e=>x({...b,email:e.target.value}),readOnly:L,required:!0})]}),!L&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(`div`,{className:`password-grid`,children:[(0,h.jsxs)(`div`,{className:`auth-form-group`,children:[(0,h.jsx)(`label`,{children:`Palavra-passe`}),(0,h.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,h.jsx)(`input`,{className:`auth-input`,type:S?`text`:`password`,placeholder:`•••••••••`,value:b.password,onChange:e=>x({...b,password:e.target.value}),required:!0}),(0,h.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>C(!S),children:S?(0,h.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,h.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,h.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,h.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,h.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,h.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]}),(0,h.jsxs)(`div`,{className:`auth-form-group`,children:[(0,h.jsx)(`label`,{children:`Confirmar Password`}),(0,h.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,h.jsx)(`input`,{className:`auth-input`,type:w?`text`:`password`,placeholder:`•••••••••`,value:b.confirmarPassword,onChange:e=>x({...b,confirmarPassword:e.target.value}),required:!0}),(0,h.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>T(!w),children:w?(0,h.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,h.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,h.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,h.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,h.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,h.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]})]}),(0,h.jsx)(`span`,{className:`auth-hint`,style:{marginTop:`-12px`,marginBottom:`20px`},children:`Mínimo: 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial (!@#$...).`})]}),(0,h.jsxs)(`div`,{className:`auth-form-group`,children:[(0,h.jsx)(`label`,{children:`Telemóvel`}),(0,h.jsx)(`input`,{className:`auth-input`,type:`tel`,placeholder:`Ex: 912345678`,value:b.telefone,onChange:z,required:!0})]}),(0,h.jsxs)(`label`,{className:`auth-phone-visibility`,children:[(0,h.jsx)(`input`,{type:`checkbox`,checked:b.mostrarTelefonePublico,onChange:e=>x({...b,mostrarTelefonePublico:e.target.checked})}),(0,h.jsxs)(`span`,{children:[(0,h.jsx)(`strong`,{children:`Pretendes mostrar este número de telemóvel nos teus anúncios e no teu perfil?`}),(0,h.jsx)(`small`,{children:`Se disseres que não, apresentamos apenas o email como contacto público.`})]})]}),(0,h.jsxs)(`div`,{className:`auth-form-group`,children:[(0,h.jsx)(`label`,{children:`Distrito`}),(0,h.jsxs)(`select`,{className:`auth-input`,value:b.localidade,onChange:e=>x({...b,localidade:e.target.value}),required:!0,children:[(0,h.jsx)(`option`,{value:``,disabled:!0,children:`Seleciona o teu distrito`}),g.map(e=>(0,h.jsx)(`option`,{value:e,children:e},e))]})]}),(0,h.jsxs)(`div`,{className:`auth-terms-accept`,children:[(0,h.jsx)(`input`,{id:`aceitar-termos`,type:`checkbox`,"aria-label":`Aceito os Termos e Condições`,checked:b.aceitouTermos,onChange:e=>x({...b,aceitouTermos:e.target.checked}),required:!0}),(0,h.jsxs)(`span`,{children:[`Declaro que li e aceito os`,` `,(0,h.jsx)(c,{to:`/privacidade`,target:`_blank`,rel:`noopener noreferrer`,children:`Termos e Condições`}),`.`]})]}),(0,h.jsx)(p,{value:A,onChange:j,action:`register`}),(0,h.jsx)(`button`,{className:`auth-btn`,type:`submit`,disabled:E,children:E?`A processar...`:L?`Concluir registo`:`Criar Conta`})]}),(0,h.jsxs)(c,{to:`/login`,state:{from:t.state?.from,returnTo:t.state?.returnTo},className:`auth-link`,children:[`Já tens conta? `,(0,h.jsx)(`span`,{style:{fontWeight:700,color:`#0f172a`},children:`Inicia sessão aqui.`})]})]})})]})}export{_ as default};