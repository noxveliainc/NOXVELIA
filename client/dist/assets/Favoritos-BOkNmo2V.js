import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{O as r,S as i,h as a,w as o}from"./index-CPy_fEDc.js";import{Zt as s,et as c,o as l,ut as u}from"./mdi-xZ3MZ1KH.js";import{t as d}from"./AnuncioCard-Ch2iu5i7.js";var f=e(t(),1),p=s(),m=n();function h(){let[e,t]=(0,f.useState)([]),[n,s]=(0,f.useState)(!0),[h,g]=(0,f.useState)(``),_=r(),v=(localStorage.getItem(`@App:contexto_visual`)||`carro`)===`carro`,y=v?`/carros`:`/imoveis`,b=v?`automóveis`:`imóveis`;return(0,f.useEffect)(()=>{(async()=>{try{let{data:e}=await i.get(`/anuncios/favoritos`);t(e||[])}catch(e){console.error(e),g(`Não foi possível carregar a tua lista de favoritos.`)}finally{s(!1)}})()},[]),n?(0,m.jsx)(a,{label:`A carregar favoritos`,detail:`Estamos a reunir os anúncios que guardaste.`,minHeight:`calc(100vh - 72px)`,tone:`light`}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`style`,{children:`
        .fav-outer {
          background: #ffffff;
          min-height: calc(100vh - 72px);
          padding: 42px 24px 72px;
          font-family: var(--nx-font-body);
          color: #0f172a;
        }
        .fav-shell {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }
        .fav-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 800;
          color: #64748b;
          text-decoration: none;
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .fav-back:hover { color: #0f172a; }
        .fav-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 22px;
          align-items: end;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 24px;
          margin-bottom: 30px;
        }
        .fav-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #102f50;
          background: #ffffff;
          border: 1px solid rgba(217, 196, 156, 0.42);
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .09em;
          margin-bottom: 12px;
        }
        .fav-title {
          font-family: var(--nx-font-display);
          font-size: clamp(30px, 5vw, 46px);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.05;
        }
        .fav-subtitle {
          margin: 10px 0 0;
          max-width: 640px;
          font-size: 14px;
          color: #64748b;
          line-height: 1.7;
        }
        .fav-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 112px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 16px;
          padding: 14px 16px;
          font-family: var(--nx-font-display);
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
        }
        .fav-count span {
          margin-left: 6px;
          font-family: var(--nx-font-body);
          font-size: 11px;
          font-weight: 900;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr)); gap: 24px; }
        .fav-empty {
          max-width: 720px;
          border: 1px solid #e2e8f0;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 22px 54px -44px rgba(15,23,42,0.45);
        }
        .fav-empty-mark {
          width: 76px;
          height: 76px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid rgba(217, 196, 156, 0.42);
          color: #102f50;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }
        .fav-empty-title {
          font-family: var(--nx-font-display);
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
        }
        .fav-empty-text {
          font-size: 14px;
          color: #64748b;
          margin: 12px 0 0;
          line-height: 1.7;
        }
        .fav-empty-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }
        .fav-btn {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #0f172a;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          padding: 0 14px;
          text-decoration: none;
        }
        .fav-btn.primary {
          background: #d9c49c;
          border-color: #d9c49c;
          color: #020617;
        }
        .fav-error {
          color: #dc2626;
          padding: 14px 18px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 24px;
        }
        @media (max-width: 820px) {
          .fav-outer { padding: 28px 18px 56px; }
          .fav-hero { grid-template-columns: 1fr; }
          .fav-count { width: fit-content; }
        }
      `}),(0,m.jsx)(`div`,{className:`fav-outer`,children:(0,m.jsxs)(`div`,{className:`fav-shell`,children:[(0,m.jsxs)(o,{to:y,className:`fav-back`,children:[`Voltar aos `,b]}),(0,m.jsxs)(`div`,{className:`fav-hero`,children:[(0,m.jsxs)(`div`,{children:[(0,m.jsxs)(`span`,{className:`fav-eyebrow`,children:[(0,m.jsx)(p.Icon,{path:c,size:.65}),` Favoritos`]}),(0,m.jsx)(`h1`,{className:`fav-title`,children:`Os teus anúncios guardados`}),(0,m.jsx)(`p`,{className:`fav-subtitle`,children:`Junta aqui os carros e imóveis que queres comparar com calma. Quando voltares, tens a lista pronta para decidir sem repetir a pesquisa.`})]}),(0,m.jsxs)(`div`,{className:`fav-count`,children:[e.length,(0,m.jsx)(`span`,{children:`guardados`})]})]}),h&&(0,m.jsx)(`div`,{className:`fav-error`,children:h}),e.length>0?(0,m.jsx)(`div`,{className:`fav-grid`,children:e.map(e=>(0,m.jsx)(d,{anuncio:e},e._id))}):(0,m.jsx)(`div`,{className:`fav-empty`,children:(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`div`,{className:`fav-empty-mark`,children:(0,m.jsx)(p.Icon,{path:u,size:1.45})}),(0,m.jsx)(`h2`,{className:`fav-empty-title`,children:`Ainda não guardaste nenhum anúncio.`}),(0,m.jsx)(`p`,{className:`fav-empty-text`,children:`Explora a pesquisa, abre os anúncios que te interessam e guarda os melhores para comparar preço, localização, vendedor e características.`}),(0,m.jsxs)(`div`,{className:`fav-empty-actions`,children:[(0,m.jsxs)(`button`,{type:`button`,className:`fav-btn primary`,onClick:()=>_(`/carros`),children:[`Ver carros `,(0,m.jsx)(p.Icon,{path:l,size:.72})]}),(0,m.jsxs)(`button`,{type:`button`,className:`fav-btn`,onClick:()=>_(`/imoveis`),children:[`Ver imóveis `,(0,m.jsx)(p.Icon,{path:l,size:.72})]})]})]})})]})})]})}export{h as default};