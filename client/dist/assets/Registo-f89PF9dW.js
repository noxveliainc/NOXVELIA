import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{C as t,M as n,O as r,S as i,T as a,_ as o,k as s,v as c,x as l}from"./index-BGpTq8fw.js";import{n as u,t as d}from"./GoogleAuthButton-khECJJby.js";var f=e(n(),1),p=i(),m=[`Aveiro`,`Beja`,`Braga`,`Bragança`,`Castelo Branco`,`Coimbra`,`Évora`,`Faro`,`Guarda`,`Leiria`,`Lisboa`,`Portalegre`,`Porto`,`Santarém`,`Setúbal`,`Viana do Castelo`,`Vila Real`,`Viseu`,`Açores`,`Madeira`];function h(){let e=s(),n=r(),{loginGoogle:i}=l(),h=n.state?.googleProfile||null,[g,_]=(0,f.useState)(n.state?.googleCredential||``),[v,y]=(0,f.useState)({nome:h?.nome||``,email:h?.email||``,password:``,confirmarPassword:``,telefone:``,mostrarTelefonePublico:!0,localidade:``,aceitouTermos:!1,tipoConta:`particular`}),[b,x]=(0,f.useState)(!1),[S,C]=(0,f.useState)(!1),[w,T]=(0,f.useState)(!1),[E,D]=(0,f.useState)(``),[O,k]=(0,f.useState)(!1),[A,j]=(0,f.useState)(!1),M=o(n.state,`/`),N=!!g,P=()=>c(n.state,M),F=e=>{let t=e.target.value.replace(/\D/g,``);t.length<=9&&y({...v,telefone:t})},I=e=>{let t=e.length>=9,n=/[A-Z]/.test(e),r=/\d/.test(e),i=/[!@#$%^&*(),.?":{}|<>]/.test(e);return t&&n&&r&&i};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`style`,{children:`
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
      `}),O&&(0,p.jsx)(`div`,{className:`modal-overlay`,children:(0,p.jsxs)(`div`,{className:`modal-box`,children:[(0,p.jsx)(`div`,{className:`modal-icon`,children:(0,p.jsx)(`svg`,{width:`32`,height:`32`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,p.jsx)(`path`,{d:`M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z`})})}),(0,p.jsx)(`h2`,{style:{fontFamily:`var(--nx-font-display)`,fontSize:`24px`,fontWeight:800,color:`#0f172a`,margin:`0 0 12px`},children:`Verifica os teus contactos`}),(0,p.jsx)(`p`,{style:{fontSize:`15px`,color:`#64748b`,marginBottom:`24px`,lineHeight:1.6},children:N?`A tua conta Google já confirma o email. Confirma agora os dados que vão identificar a tua conta na Noxvelia.`:`Vamos enviar um email de confirmação. Vais precisar de clicar no link para ativar a tua conta antes de iniciares sessão. Confirma que os dados estão corretos.`}),(0,p.jsxs)(`div`,{className:`modal-data-box`,children:[(0,p.jsxs)(`div`,{style:{marginBottom:`8px`,color:`#0f172a`,fontSize:`15px`},children:[(0,p.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Email:`}),` `,v.email]}),(0,p.jsxs)(`div`,{style:{marginBottom:`8px`,color:`#0f172a`,fontSize:`15px`},children:[(0,p.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Telemóvel:`}),` `,v.telefone]}),(0,p.jsxs)(`div`,{style:{color:`#0f172a`,fontSize:`15px`},children:[(0,p.jsx)(`strong`,{style:{color:`#64748b`,fontWeight:600},children:`Telemóvel público:`}),` `,v.mostrarTelefonePublico?`Sim, mostrar nos anúncios e no perfil`:`Não, mostrar apenas email`]})]}),(0,p.jsxs)(`label`,{className:`auth-confirm-check`,children:[(0,p.jsx)(`input`,{type:`checkbox`,checked:A,onChange:e=>j(e.target.checked)}),(0,p.jsx)(`span`,{children:`Confirmo que o email e o telefone estão corretos e que tenho acesso aos mesmos.`})]}),(0,p.jsxs)(`div`,{style:{display:`flex`,gap:`12px`},children:[(0,p.jsx)(`button`,{onClick:()=>{k(!1),j(!1)},style:{flex:1,padding:`16px`,background:`#ffffff`,border:`1px solid #cbd5e1`,color:`#0f172a`,borderRadius:`12px`,fontWeight:700,cursor:`pointer`,transition:`all 0.2s`},children:`Corrigir Dados`}),(0,p.jsx)(`button`,{onClick:async()=>{if(A){k(!1),T(!0),D(``);try{if(N){if((await i({credential:g,nome:v.nome,telefone:v.telefone,mostrarTelefonePublico:v.mostrarTelefonePublico,localidade:v.localidade,tipoConta:v.tipoConta,aceitouTermos:v.aceitouTermos}))?.requiresCompletion){D(`Completa os dados obrigatórios para criar a conta com Google.`);return}e(P(),{replace:!0});return}let r={nome:v.nome,email:v.email,password:v.password,telefone:v.telefone,mostrarTelefonePublico:v.mostrarTelefonePublico,localidade:v.localidade,tipo:`cliente`,tipoConta:`particular`,aceitouTermos:v.aceitouTermos};await t.post(`/auth/register`,r),e(`/login`,{state:{mensagemRegisto:`Conta criada com sucesso! Verifica o teu email para ativares o acesso.`,from:n.state?.from,returnTo:n.state?.returnTo}})}catch(e){let t=e.response?.data?.erro||e.response?.data?.message||e.response?.data?.detalhes;if(Array.isArray(t))D(t.join(` | `));else if(typeof t==`object`&&t)D(Object.values(t).join(` | `));else if(typeof t==`string`)D(t);else if(e.response?.data?.code===11e3||e.response?.data?.error?.code===11e3){let t=JSON.stringify(e.response?.data);t.includes(`email`)?D(`Este email já se encontra registado.`):t.includes(`telefone`)?D(`Este número de telemóvel já se encontra em uso.`):D(`Já existe uma conta com estes dados.`)}else D(`Erro ao efetuar o registo. Verifica os teus dados e a ligação à internet.`)}finally{T(!1)}}},disabled:!A,style:{flex:1,padding:`16px`,background:`#0f172a`,color:`#ffffff`,border:`none`,borderRadius:`12px`,fontWeight:700,cursor:A?`pointer`:`not-allowed`,opacity:A?1:.5,transition:`all 0.2s`},children:N?`Concluir registo`:`Tudo Correto!`})]})]})}),(0,p.jsx)(`div`,{className:`auth-root`,children:(0,p.jsxs)(`div`,{className:`auth-card`,children:[(0,p.jsx)(a,{to:M,className:`auth-back`,children:`← Voltar`}),(0,p.jsx)(`div`,{style:{marginBottom:`24px`},children:(0,p.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:`NOXVELIA`,style:{height:`36px`,width:`auto`,objectFit:`contain`}})}),(0,p.jsx)(`h1`,{className:`auth-title`,children:N?`Completar registo`:`Criar Conta`}),(0,p.jsx)(`p`,{className:`auth-subtitle`,children:N?`Confirma os dados obrigatórios da Noxvelia para entrares com Google.`:`Regista-te para aceder e publicar anúncios.`}),E&&(0,p.jsx)(`div`,{className:`auth-error`,children:E}),!N&&u&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(d,{text:`signup_with`,disabled:w,onCredential:async t=>{D(``),T(!0);try{let n=await i({credential:t});if(n?.requiresCompletion){_(t),y(e=>({...e,nome:n.profile?.nome||e.nome,email:n.profile?.email||e.email,password:``,confirmarPassword:``})),j(!1),k(!1),window.requestAnimationFrame(()=>window.scrollTo({top:0,behavior:`smooth`}));return}e(P(),{replace:!0})}catch(e){console.error(e),D(e.response?.data?.erro||`Não foi possível continuar com Google. Tenta novamente.`)}finally{T(!1)}},onError:D}),(0,p.jsx)(`div`,{className:`auth-divider`,children:(0,p.jsx)(`span`,{children:`ou cria com email`})})]}),(0,p.jsxs)(`form`,{onSubmit:e=>{if(e.preventDefault(),D(``),!N){if(v.password!==v.confirmarPassword){D(`As palavras-passe não coincidem. Verifica e tenta novamente.`);return}if(!I(v.password)){D(`A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.`);return}}if(!/^9[1236]\d{7}$/.test(v.telefone)){D(`O número tem de ser um telemóvel português válido.`);return}if(!v.localidade){D(`Por favor, seleciona um distrito válido.`);return}if(!v.aceitouTermos){D(`Tens de aceitar os Termos e Condições para criar a conta.`);return}j(!1),k(!0)},children:[(0,p.jsxs)(`div`,{className:`auth-form-group`,children:[(0,p.jsx)(`label`,{children:`Nome Completo`}),(0,p.jsx)(`input`,{className:`auth-input`,placeholder:`Ex: João Silva`,value:v.nome,onChange:e=>y({...v,nome:e.target.value}),required:!0})]}),(0,p.jsxs)(`div`,{className:`auth-form-group`,children:[(0,p.jsx)(`label`,{children:`Email`}),(0,p.jsx)(`input`,{className:`auth-input`,type:`email`,placeholder:`joao.silva@email.com`,value:v.email,onChange:e=>y({...v,email:e.target.value}),readOnly:N,required:!0})]}),!N&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(`div`,{className:`password-grid`,children:[(0,p.jsxs)(`div`,{className:`auth-form-group`,children:[(0,p.jsx)(`label`,{children:`Palavra-passe`}),(0,p.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,p.jsx)(`input`,{className:`auth-input`,type:b?`text`:`password`,placeholder:`•••••••••`,value:v.password,onChange:e=>y({...v,password:e.target.value}),required:!0}),(0,p.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>x(!b),children:b?(0,p.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,p.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,p.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,p.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,p.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,p.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]}),(0,p.jsxs)(`div`,{className:`auth-form-group`,children:[(0,p.jsx)(`label`,{children:`Confirmar Password`}),(0,p.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,p.jsx)(`input`,{className:`auth-input`,type:S?`text`:`password`,placeholder:`•••••••••`,value:v.confirmarPassword,onChange:e=>y({...v,confirmarPassword:e.target.value}),required:!0}),(0,p.jsx)(`button`,{type:`button`,className:`auth-toggle-pwd`,onClick:()=>C(!S),children:S?(0,p.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,p.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,p.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,p.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,p.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,p.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]})]}),(0,p.jsx)(`span`,{className:`auth-hint`,style:{marginTop:`-12px`,marginBottom:`20px`},children:`Mínimo: 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial (!@#$...).`})]}),(0,p.jsxs)(`div`,{className:`auth-form-group`,children:[(0,p.jsx)(`label`,{children:`Telemóvel`}),(0,p.jsx)(`input`,{className:`auth-input`,type:`tel`,placeholder:`Ex: 912345678`,value:v.telefone,onChange:F,required:!0})]}),(0,p.jsxs)(`label`,{className:`auth-phone-visibility`,children:[(0,p.jsx)(`input`,{type:`checkbox`,checked:v.mostrarTelefonePublico,onChange:e=>y({...v,mostrarTelefonePublico:e.target.checked})}),(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`strong`,{children:`Pretendes mostrar este número de telemóvel nos teus anúncios e no teu perfil?`}),(0,p.jsx)(`small`,{children:`Se disseres que não, apresentamos apenas o email como contacto público.`})]})]}),(0,p.jsxs)(`div`,{className:`auth-form-group`,children:[(0,p.jsx)(`label`,{children:`Distrito`}),(0,p.jsxs)(`select`,{className:`auth-input`,value:v.localidade,onChange:e=>y({...v,localidade:e.target.value}),required:!0,children:[(0,p.jsx)(`option`,{value:``,disabled:!0,children:`Seleciona o teu distrito`}),m.map(e=>(0,p.jsx)(`option`,{value:e,children:e},e))]})]}),(0,p.jsxs)(`div`,{className:`auth-terms-accept`,children:[(0,p.jsx)(`input`,{id:`aceitar-termos`,type:`checkbox`,"aria-label":`Aceito os Termos e Condições`,checked:v.aceitouTermos,onChange:e=>y({...v,aceitouTermos:e.target.checked}),required:!0}),(0,p.jsxs)(`span`,{children:[`Declaro que li e aceito os`,` `,(0,p.jsx)(a,{to:`/privacidade`,target:`_blank`,rel:`noopener noreferrer`,children:`Termos e Condições`}),`.`]})]}),(0,p.jsx)(`button`,{className:`auth-btn`,type:`submit`,disabled:w,children:w?`A processar...`:N?`Concluir registo`:`Criar Conta`})]}),(0,p.jsxs)(a,{to:`/login`,state:{from:n.state?.from,returnTo:n.state?.returnTo},className:`auth-link`,children:[`Já tens conta? `,(0,p.jsx)(`span`,{style:{fontWeight:700,color:`#0f172a`},children:`Inicia sessão aqui.`})]})]})})]})}export{h as default};