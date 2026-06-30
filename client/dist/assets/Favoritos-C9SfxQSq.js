import{r as t,b as x,a as m,j as a,L as v,c as g}from"./index-cmRI-XIE.js";import{A as u}from"./AnuncioCard-pvGkCgen.js";import"./mdi-DqXObCvb.js";function N(){const[e,n]=t.useState([]),[l,c]=t.useState(!0),[s,f]=t.useState("");x(),m();const i=(localStorage.getItem("@App:contexto_visual")||"carro")==="carro",p=i?"/carros":"/imoveis",d=i?"Automóveis":"Imóveis";return t.useEffect(()=>{(async()=>{try{const{data:r}=await g.get("/anuncios/favoritos");n(r||[])}catch(r){console.error(r),f("Não foi possível carregar a lista de favoritos.")}finally{c(!1)}})()},[]),l?a.jsx("div",{style:{height:"calc(100vh - 72px)",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f172a"},children:a.jsx("div",{className:"nx-spinner",style:{borderColor:"rgba(255,255,255,0.2)",borderTopColor:"#fff"}})}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        /* O FUNDO AZUL PROFUNDO (Igual ao Perfil) */
        .fav-outer {
          background: #0f172a; 
          min-height: calc(100vh - 72px);
          padding: 40px 24px;
          display: flex;
          justify-content: center;
          font-family: var(--nx-font-body);
        }

        /* A MOLDURA BRANCA GIGANTE */
        .fav-moldura {
          background: #ffffff;
          border-radius: 32px;
          width: 100%;
          max-width: 1100px;
          padding: 48px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          color: #0f172a;
        }

        .fav-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .fav-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; letter-spacing: .05em; text-transform: uppercase; transition: color .2s; }
        .fav-back:hover { color: #0f172a; }

        .fav-header { border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 32px; }
        .fav-title { font-family: var(--nx-font-display); font-size: 28px; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.02em; }
        .fav-subtitle { margin: 4px 0 0 0; font-size: 13px; color: #64748b; }

        .fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 24px; }
        
        .fav-empty { padding: 100px 20px; color: #64748b; max-width: 400px; margin: 0 auto; text-align: center; }
        .fav-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .fav-empty-title { font-family: var(--nx-font-display); font-weight: 700; margin: 0 0 6px 0; color: #0f172a; font-size: 18px; }
        .fav-empty-text { font-size: 13px; margin: 0; line-height: 1.5; }
        
        .fav-error { color: #dc2626; padding: 14px 18px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; font-weight: 500; margin-bottom: 24px; }

        @media (max-width: 768px) {
          .fav-outer { padding: 20px 16px; }
          .fav-moldura { padding: 32px 24px; border-radius: 24px; }
        }
      `}),a.jsx("div",{className:"fav-outer",children:a.jsxs("div",{className:"fav-moldura",children:[a.jsx("div",{className:"fav-top-bar",children:a.jsxs(v,{to:p,className:"fav-back",children:["← Voltar aos ",d]})}),a.jsxs("div",{className:"fav-header",children:[a.jsx("h1",{className:"fav-title",children:"Os meus Favoritos ❤"}),a.jsxs("p",{className:"fav-subtitle",children:["Tens ",e.length," anúncio",e.length!==1?"s":""," guardado",e.length!==1?"s":""," na tua conta."]})]}),s&&a.jsx("div",{className:"fav-error",children:s}),e.length>0?a.jsx("div",{className:"fav-grid",children:e.map(o=>a.jsx(u,{anuncio:o},o._id))}):a.jsxs("div",{className:"fav-empty",children:[a.jsx("div",{className:"fav-empty-icon",children:"♡"}),a.jsx("h3",{className:"fav-empty-title",children:"Lista vazia"}),a.jsx("p",{className:"fav-empty-text",children:"Navega pela plataforma e clica no ícone de coração nos anúncios para arquivares os teus interesses aqui."})]})]})})]})}export{N as default};
//# sourceMappingURL=Favoritos-C9SfxQSq.js.map
