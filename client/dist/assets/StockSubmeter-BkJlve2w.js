import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{S as r,w as i}from"./index-Dovl1ubN.js";var a=e(t(),1),o=n(),s=[{value:`csv`,label:`CSV`},{value:`xlsx`,label:`Excel .xlsx`},{value:`xls`,label:`Excel .xls`},{value:`xml`,label:`XML`},{value:`json`,label:`JSON`},{value:`outro`,label:`Outro`}],c=[{value:`1-10`,label:`1 a 10 anúncios`},{value:`11-30`,label:`11 a 30 anúncios`},{value:`31-80`,label:`31 a 80 anúncios`},{value:`80+`,label:`Mais de 80 anúncios`},{value:`nao_sei`,label:`Ainda não sei`}],l=[{value:`excel`,label:`Excel / CSV`},{value:`mystand`,label:`MyStand / XML / API`},{value:`website`,label:`Website do stand`},{value:`outro`,label:`Outro sistema`},{value:`nao_sei`,label:`Ainda não sei`}],u=[{value:`esta_semana`,label:`Esta semana`},{value:`este_mes`,label:`Este mês`},{value:`sem_pressa`,label:`Sem pressa`}],d={empresa:``,nome:``,email:``,telefone:``,website:``,formato:`csv`,volume:`11-30`,origemStock:`excel`,urgencia:`este_mes`,mensagem:``};function f(){let[e,t]=(0,a.useState)(d),[n,f]=(0,a.useState)(null),[p,m]=(0,a.useState)(!1),[h,g]=(0,a.useState)(``),[_,v]=(0,a.useState)(!1),y=(0,a.useMemo)(()=>n?.size?n.size<1024*1024?`${Math.ceil(n.size/1024)} KB`:`${(n.size/(1024*1024)).toFixed(1)} MB`:``,[n]),b=e=>n=>{t(t=>({...t,[e]:n.target.value}))};return(0,o.jsxs)(`main`,{className:`stock-page`,children:[(0,o.jsx)(`style`,{children:`
        .stock-page, .stock-page * { box-sizing: border-box; }
        .stock-page {
          min-height: 100%;
          background: #ffffff;
          color: #071326;
          padding: 58px 18px 78px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .stock-wrap {
          width: min(1120px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, .88fr) minmax(420px, 1fr);
          gap: 28px;
          align-items: start;
        }
        .stock-hero { padding: 34px 0 0; }
        .stock-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 18px;
          color: #102f50;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .stock-kicker::before { content: ""; width: 34px; height: 1px; background: #d9c49c; }
        .stock-title {
          margin: 0;
          max-width: 680px;
          color: #071326;
          font-size: clamp(38px, 6vw, 72px);
          line-height: .94;
          letter-spacing: -0.035em;
          font-weight: 900;
        }
        .stock-lead {
          max-width: 620px;
          margin: 22px 0 0;
          color: #405a63;
          font-size: 17px;
          line-height: 1.65;
        }
        .stock-points {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 28px;
        }
        .stock-point {
          min-height: 88px;
          padding: 15px;
          border: 1px solid #ddd1bc;
          border-radius: 12px;
          background: #ffffff;
        }
        .stock-point strong { display: block; color: #071326; font-size: 15px; margin-bottom: 5px; }
        .stock-point span { color: #587076; font-size: 12px; line-height: 1.45; }
        .stock-card {
          border: 1px solid #d9d2c4;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 26px 70px -52px rgba(7,19,38,.42);
          overflow: hidden;
        }
        .stock-card-head {
          padding: 24px 26px 18px;
          border-bottom: 1px solid #e4ddcf;
          background: #ffffff;
        }
        .stock-card-head h1 { margin: 0; font-size: 26px; letter-spacing: -.02em; }
        .stock-card-head p { margin: 8px 0 0; color: #536b72; line-height: 1.5; }
        .stock-form { display: grid; gap: 16px; padding: 24px 26px 26px; }
        .stock-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .stock-field { display: grid; gap: 7px; }
        .stock-field label {
          color: #102f50;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .11em;
          text-transform: uppercase;
        }
        .stock-field input, .stock-field select, .stock-field textarea {
          width: 100%;
          min-height: 48px;
          border: 1px solid #d7dfe4;
          border-radius: 11px;
          background: #fff;
          color: #071326;
          padding: 0 13px;
          font: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .stock-field textarea { min-height: 104px; padding-top: 12px; resize: vertical; }
        .stock-field input:focus, .stock-field select:focus, .stock-field textarea:focus {
          border-color: #102f50;
          box-shadow: 0 0 0 4px rgba(16,47,80,.08);
        }
        .stock-file {
          display: grid;
          gap: 9px;
          padding: 16px;
          border: 1px dashed #c9b78f;
          border-radius: 14px;
          background: #ffffff;
        }
        .stock-file input { min-height: auto; padding: 0; border: 0; background: transparent; }
        .stock-file small, .stock-note { color: #60767c; font-size: 12px; line-height: 1.45; }
        .stock-note a { color: #102f50; font-weight: 800; text-underline-offset: 3px; }
        .stock-error {
          padding: 12px 13px;
          border: 1px solid #f0b4a6;
          border-radius: 11px;
          color: #9f2a1f;
          background: #fff2ee;
          font-weight: 700;
          font-size: 13px;
        }
        .stock-success {
          padding: 18px;
          border: 1px solid #d9c49c;
          border-radius: 14px;
          background: #fff7e4;
          color: #102f50;
        }
        .stock-success strong { display: block; color: #071326; margin-bottom: 5px; }
        .stock-submit {
          min-height: 52px;
          border: 0;
          border-radius: 12px;
          background: #071326;
          color: #fffaf0;
          font-weight: 900;
          cursor: pointer;
          transition: transform .15s ease, background .15s ease;
        }
        .stock-submit:hover:not(:disabled) { transform: translateY(-1px); background: #102f50; }
        .stock-submit:disabled { opacity: .62; cursor: wait; }
        .stock-secondary { display: inline-flex; align-items: center; color: #102f50; font-weight: 850; text-decoration: none; }
        @media (max-width: 920px) { .stock-wrap { grid-template-columns: 1fr; } .stock-hero { padding-top: 0; } }
        @media (max-width: 620px) {
          .stock-page { padding: 34px 12px 58px; }
          .stock-grid, .stock-points { grid-template-columns: 1fr; }
          .stock-card-head, .stock-form { padding-left: 18px; padding-right: 18px; }
        }
      `}),(0,o.jsxs)(`div`,{className:`stock-wrap`,children:[(0,o.jsxs)(`section`,{className:`stock-hero`,children:[(0,o.jsx)(`div`,{className:`stock-kicker`,children:`Avaliação gratuita de stock`}),(0,o.jsx)(`h1`,{className:`stock-title`,children:`Envia-nos o stock do teu stand em Excel, XML ou CSV.`}),(0,o.jsx)(`p`,{className:`stock-lead`,children:`Validamos o formato, confirmamos fotos e campos importantes e dizemos-te como colocar os automóveis na NOXVELIA com menos trabalho manual.`}),(0,o.jsxs)(`div`,{className:`stock-points`,children:[(0,o.jsxs)(`div`,{className:`stock-point`,children:[(0,o.jsx)(`strong`,{children:`1. Envia`}),(0,o.jsx)(`span`,{children:`Excel, CSV, XML, JSON ou exportação do teu software.`})]}),(0,o.jsxs)(`div`,{className:`stock-point`,children:[(0,o.jsx)(`strong`,{children:`2. Validamos`}),(0,o.jsx)(`span`,{children:`Vemos duplicados, fotos, preços, marca, modelo e contactos.`})]}),(0,o.jsxs)(`div`,{className:`stock-point`,children:[(0,o.jsx)(`strong`,{children:`3. Publicamos`}),(0,o.jsx)(`span`,{children:`Entramos em contacto antes de qualquer importação ficar ativa.`})]})]})]}),(0,o.jsxs)(`section`,{className:`stock-card`,"aria-label":`Enviar ficheiro de stock`,children:[(0,o.jsxs)(`div`,{className:`stock-card-head`,children:[(0,o.jsx)(`h1`,{children:`Pedir avaliação`}),(0,o.jsx)(`p`,{children:`Preenche os contactos, indica a origem do stock e anexa o ficheiro. A resposta chega pelo email indicado.`})]}),(0,o.jsxs)(`form`,{className:`stock-form`,onSubmit:async i=>{if(i.preventDefault(),g(``),v(!1),!n){g(`Anexa o ficheiro de stock para conseguirmos preparar a importação.`);return}let a=new FormData;Object.entries(e).forEach(([e,t])=>a.append(e,t)),a.append(`ficheiro`,n);try{m(!0),await r.post(`/stock-submissions`,a),v(!0),t(d),f(null),i.currentTarget.reset()}catch(e){g(e.response?.data?.erro||`Não foi possível enviar o stock. Confirma os dados e tenta novamente.`)}finally{m(!1)}},children:[_&&(0,o.jsxs)(`div`,{className:`stock-success`,children:[(0,o.jsx)(`strong`,{children:`Pedido recebido.`}),`Vamos avaliar gratuitamente o ficheiro e responder pelo email indicado com o melhor caminho de importa??o.`]}),h&&(0,o.jsx)(`div`,{className:`stock-error`,children:h}),(0,o.jsxs)(`div`,{className:`stock-grid`,children:[(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`empresa`,children:`Empresa / Stand`}),(0,o.jsx)(`input`,{id:`empresa`,value:e.empresa,onChange:b(`empresa`),required:!0,placeholder:`Nome do stand`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`nome`,children:`Contacto`}),(0,o.jsx)(`input`,{id:`nome`,value:e.nome,onChange:b(`nome`),required:!0,placeholder:`Nome da pessoa`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`email`,children:`Email`}),(0,o.jsx)(`input`,{id:`email`,type:`email`,value:e.email,onChange:b(`email`),required:!0,placeholder:`stock@stand.pt`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`telefone`,children:`Telemóvel`}),(0,o.jsx)(`input`,{id:`telefone`,value:e.telefone,onChange:b(`telefone`),placeholder:`Opcional`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`website`,children:`Website`}),(0,o.jsx)(`input`,{id:`website`,value:e.website,onChange:b(`website`),placeholder:`https://...`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`formato`,children:`Formato`}),(0,o.jsx)(`select`,{id:`formato`,value:e.formato,onChange:b(`formato`),children:s.map(e=>(0,o.jsx)(`option`,{value:e.value,children:e.label},e.value))})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`volume`,children:`Volume`}),(0,o.jsx)(`select`,{id:`volume`,value:e.volume,onChange:b(`volume`),children:c.map(e=>(0,o.jsx)(`option`,{value:e.value,children:e.label},e.value))})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`origemStock`,children:`Origem do stock`}),(0,o.jsx)(`select`,{id:`origemStock`,value:e.origemStock,onChange:b(`origemStock`),children:l.map(e=>(0,o.jsx)(`option`,{value:e.value,children:e.label},e.value))})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`urgencia`,children:`Prazo ideal`}),(0,o.jsx)(`select`,{id:`urgencia`,value:e.urgencia,onChange:b(`urgencia`),children:u.map(e=>(0,o.jsx)(`option`,{value:e.value,children:e.label},e.value))})]})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`mensagem`,children:`Notas`}),(0,o.jsx)(`textarea`,{id:`mensagem`,value:e.mensagem,onChange:b(`mensagem`),placeholder:`Ex: software usado, campo das fotos, se os preços incluem IVA, se há viaturas vendidas a excluir...`})]}),(0,o.jsxs)(`div`,{className:`stock-file`,children:[(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`ficheiro`,children:`Ficheiro de stock`}),(0,o.jsx)(`input`,{id:`ficheiro`,type:`file`,accept:`.csv,.xls,.xlsx,.xml,.json,.txt`,onChange:e=>f(e.target.files?.[0]||null),required:!0})]}),(0,o.jsx)(`small`,{children:n?`${n.name} · ${y}`:`Tamanho máximo: 10 MB.`})]}),(0,o.jsxs)(`p`,{className:`stock-note`,children:[`Modelo recomendado: `,(0,o.jsx)(`a`,{href:`/templates/importacao-stock-noxvelia.csv`,download:!0,children:`descarregar CSV da NOXVELIA`}),`. O ficheiro é usado apenas para avaliar e preparar a importação dos anúncios.`]}),(0,o.jsx)(`button`,{className:`stock-submit`,type:`submit`,disabled:p,children:p?`A enviar...`:`Pedir avaliação gratuita`}),(0,o.jsx)(i,{className:`stock-secondary`,to:`/publicar`,children:`Prefiro criar apenas um anúncio`})]})]})]})]})}export{f as default};