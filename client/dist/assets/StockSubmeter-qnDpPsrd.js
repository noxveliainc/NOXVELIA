import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{C as r,T as i}from"./index-ivs6hXma.js";var a=e(t(),1),o=n(),s=[{value:`csv`,label:`CSV`},{value:`xlsx`,label:`Excel .xlsx`},{value:`xls`,label:`Excel .xls`},{value:`xml`,label:`XML`},{value:`json`,label:`JSON`},{value:`outro`,label:`Outro`}],c={empresa:``,nome:``,email:``,telefone:``,website:``,formato:`csv`,mensagem:``};function l(){let[e,t]=(0,a.useState)(c),[n,l]=(0,a.useState)(null),[u,d]=(0,a.useState)(!1),[f,p]=(0,a.useState)(``),[m,h]=(0,a.useState)(!1),g=(0,a.useMemo)(()=>n?.size?n.size<1024*1024?`${Math.ceil(n.size/1024)} KB`:`${(n.size/(1024*1024)).toFixed(1)} MB`:``,[n]),_=e=>n=>{t(t=>({...t,[e]:n.target.value}))};return(0,o.jsxs)(`main`,{className:`stock-page`,children:[(0,o.jsx)(`style`,{children:`
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
      `}),(0,o.jsxs)(`div`,{className:`stock-wrap`,children:[(0,o.jsxs)(`section`,{className:`stock-hero`,children:[(0,o.jsx)(`div`,{className:`stock-kicker`,children:`Stock de stands`}),(0,o.jsx)(`h1`,{className:`stock-title`,children:`Coloca vários automóveis na NOXVELIA sem teres de os inserir um a um.`}),(0,o.jsx)(`p`,{className:`stock-lead`,children:`Envia o ficheiro de stock do teu stand. A equipa valida o formato, prepara a importação e responde-te com os próximos passos.`}),(0,o.jsxs)(`div`,{className:`stock-points`,children:[(0,o.jsxs)(`div`,{className:`stock-point`,children:[(0,o.jsx)(`strong`,{children:`Rápido`}),(0,o.jsx)(`span`,{children:`CSV, Excel, XML ou JSON num único envio.`})]}),(0,o.jsxs)(`div`,{className:`stock-point`,children:[(0,o.jsx)(`strong`,{children:`Sem API`}),(0,o.jsx)(`span`,{children:`Funciona mesmo antes de existir integração automática.`})]}),(0,o.jsxs)(`div`,{className:`stock-point`,children:[(0,o.jsx)(`strong`,{children:`Controlado`}),(0,o.jsx)(`span`,{children:`Os anúncios só entram depois de validação.`})]})]})]}),(0,o.jsxs)(`section`,{className:`stock-card`,"aria-label":`Enviar ficheiro de stock`,children:[(0,o.jsxs)(`div`,{className:`stock-card-head`,children:[(0,o.jsx)(`h1`,{children:`Enviar stock`}),(0,o.jsx)(`p`,{children:`Preenche os contactos e anexa o ficheiro. Se tiveres dúvidas, usa o modelo recomendado.`})]}),(0,o.jsxs)(`form`,{className:`stock-form`,onSubmit:async i=>{if(i.preventDefault(),p(``),h(!1),!n){p(`Anexa o ficheiro de stock para conseguirmos preparar a importação.`);return}let a=new FormData;Object.entries(e).forEach(([e,t])=>a.append(e,t)),a.append(`ficheiro`,n);try{d(!0),await r.post(`/stock-submissions`,a),h(!0),t(c),l(null),i.currentTarget.reset()}catch(e){p(e.response?.data?.erro||`Não foi possível enviar o stock. Confirma os dados e tenta novamente.`)}finally{d(!1)}},children:[m&&(0,o.jsxs)(`div`,{className:`stock-success`,children:[(0,o.jsx)(`strong`,{children:`Pedido recebido.`}),`Vamos analisar o ficheiro e responder pelo email indicado.`]}),f&&(0,o.jsx)(`div`,{className:`stock-error`,children:f}),(0,o.jsxs)(`div`,{className:`stock-grid`,children:[(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`empresa`,children:`Empresa / Stand`}),(0,o.jsx)(`input`,{id:`empresa`,value:e.empresa,onChange:_(`empresa`),required:!0,placeholder:`Nome do stand`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`nome`,children:`Contacto`}),(0,o.jsx)(`input`,{id:`nome`,value:e.nome,onChange:_(`nome`),required:!0,placeholder:`Nome da pessoa`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`email`,children:`Email`}),(0,o.jsx)(`input`,{id:`email`,type:`email`,value:e.email,onChange:_(`email`),required:!0,placeholder:`stock@stand.pt`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`telefone`,children:`Telemóvel`}),(0,o.jsx)(`input`,{id:`telefone`,value:e.telefone,onChange:_(`telefone`),placeholder:`Opcional`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`website`,children:`Website`}),(0,o.jsx)(`input`,{id:`website`,value:e.website,onChange:_(`website`),placeholder:`https://...`})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`formato`,children:`Formato`}),(0,o.jsx)(`select`,{id:`formato`,value:e.formato,onChange:_(`formato`),children:s.map(e=>(0,o.jsx)(`option`,{value:e.value,children:e.label},e.value))})]})]}),(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`mensagem`,children:`Notas`}),(0,o.jsx)(`textarea`,{id:`mensagem`,value:e.mensagem,onChange:_(`mensagem`),placeholder:`Ex: todos os automóveis estão disponíveis, imagens no ficheiro, preços com IVA incluído...`})]}),(0,o.jsxs)(`div`,{className:`stock-file`,children:[(0,o.jsxs)(`div`,{className:`stock-field`,children:[(0,o.jsx)(`label`,{htmlFor:`ficheiro`,children:`Ficheiro de stock`}),(0,o.jsx)(`input`,{id:`ficheiro`,type:`file`,accept:`.csv,.xls,.xlsx,.xml,.json,.txt`,onChange:e=>l(e.target.files?.[0]||null),required:!0})]}),(0,o.jsx)(`small`,{children:n?`${n.name} · ${g}`:`Tamanho máximo: 10 MB.`})]}),(0,o.jsxs)(`p`,{className:`stock-note`,children:[`Modelo recomendado: `,(0,o.jsx)(`a`,{href:`/templates/importacao-stock-noxvelia.csv`,download:!0,children:`descarregar CSV da NOXVELIA`}),`. Não partilhamos o ficheiro com terceiros; é usado apenas para preparar a publicação dos anúncios.`]}),(0,o.jsx)(`button`,{className:`stock-submit`,type:`submit`,disabled:u,children:u?`A enviar...`:`Enviar ficheiro de stock`}),(0,o.jsx)(i,{className:`stock-secondary`,to:`/publicar`,children:`Prefiro criar apenas um anúncio`})]})]})]})]})}export{l as default};