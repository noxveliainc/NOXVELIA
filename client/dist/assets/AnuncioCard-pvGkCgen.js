import{u as q,r as L,j as r,L as H,c as K}from"./index-cmRI-XIE.js";import{I as s,Z as Q,_ as u,$ as W,P as X,s as ee}from"./mdi-DqXObCvb.js";function ae({anuncio:e,showStatus:_=!1,onAnuncioEliminado:l}){var w,v,y,k,j,z,N,A,C,P,D,O,I,M,S,E,R;const{user:a,signed:U}=q(),[p,b]=L.useState(!1),[Y,x]=L.useState(!1),G=e!=null&&e.preco?new Intl.NumberFormat("pt-PT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(e.preco):"Sob Consulta",V=((v=(w=e==null?void 0:e.utilizador)==null?void 0:w.nome)==null?void 0:v.charAt(0).toUpperCase())||"?",n={ativo:{bg:"rgba(16,185,129,.12)",color:"#10b981",border:"rgba(16,185,129,.2)",label:"Activo"},pausado:{bg:"rgba(239,68,68,.12)",color:"#ef4444",border:"rgba(239,68,68,.2)",label:"Pausado"},expirado:{bg:"rgba(245,158,11,.12)",color:"#f59e0b",border:"rgba(245,158,11,.2)",label:"A expirar"},pendente:{bg:"rgba(59,130,246,.12)",color:"#3b82f6",border:"rgba(59,130,246,.2)",label:"Pendente"}},i=n[e==null?void 0:e.estado]||n.pendente,g=((y=e==null?void 0:e.utilizador)==null?void 0:y._id)||((k=e==null?void 0:e.utilizador)==null?void 0:k.id)||(e==null?void 0:e.utilizador),m=(a==null?void 0:a._id)||(a==null?void 0:a.id),d=U&&(g&&m&&String(g)===String(m)||!!l),c=(e==null?void 0:e.destacado)===!0,B=((j=e==null?void 0:e.utilizador)==null?void 0:j.tipo)==="admin"||((z=e==null?void 0:e.utilizador)==null?void 0:z.premiumAtivo)===!0,f=(e==null?void 0:e.tipo)==="carro",J=t=>{t.preventDefault(),t.stopPropagation(),x(!0)},h=t=>{t==null||t.preventDefault(),t==null||t.stopPropagation(),x(!1)},Z=async t=>{var T,$;t.preventDefault(),t.stopPropagation(),b(!0);try{const o=e._id||e.id;if(!o)throw new Error("ID não encontrado.");const F=await K.delete(`/anuncios/${o}`);if(F.status>=200&&F.status<300)x(!1),l==null||l(o);else throw new Error("Resposta inesperada.")}catch(o){alert((($=(T=o.response)==null?void 0:T.data)==null?void 0:$.erro)||"Não foi possível eliminar. Tenta novamente."),b(!1)}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        /* ── CARD ── */
        .nxc-wrap {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .3s ease;
          color: #ffffff;
          position: relative;
        }
        .nxc-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.45);
          border-color: rgba(255,255,255,0.12);
        }
        .nxc-wrap.premium {
          border-color: rgba(234,179,8,0.3);
          box-shadow: 0 0 0 1px rgba(234,179,8,0.08) inset, 0 4px 20px rgba(234,179,8,0.08);
        }
        .nxc-wrap.premium:hover {
          border-color: rgba(234,179,8,0.5);
          box-shadow: 0 20px 40px rgba(234,179,8,0.15);
        }

        /* ── IMAGEM ── */
        .nxc-img {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #080c12;
        }
        .nxc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          display: block;
        }
        .nxc-wrap:hover .nxc-img img { transform: scale(1.05); }

        /* Gradient overlay for readability */
        .nxc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.55) 0%,
            rgba(0,0,0,0.1) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        .nxc-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          opacity: .08;
          background: linear-gradient(135deg, #0d1117 0%, #111827 100%);
        }

        /* ── BADGES ── */
        .nxc-badge-premium {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          color: #000;
          font-size: 9px;
          font-weight: 900;
          padding: 4px 9px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: .1em;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 5;
          box-shadow: 0 3px 10px rgba(234,179,8,0.35);
        }
        .nxc-badge-status {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 9px;
          font-weight: 900;
          padding: 4px 9px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: .08em;
          z-index: 5;
        }

        /* Tipo badge (car / home) - bottom-left, always visible */
        .nxc-badge-tipo {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          font-size: 9px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 5px;
          z-index: 5;
          text-transform: uppercase;
          letter-spacing: .06em;
        }

        .nxc-delete-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
          font-size: 9px;
          font-weight: 800;
          padding: 5px 9px;
          border-radius: 6px;
          cursor: pointer;
          z-index: 10;
          text-transform: uppercase;
          letter-spacing: .05em;
          transition: all .2s;
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
        }
        .nxc-delete-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 4px 12px rgba(239,68,68,0.35);
        }
        .nxc-photo-count {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 5;
        }

        /* ── BODY ── */
        .nxc-body {
          padding: 14px 16px 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #0d1117;
          gap: 6px;
        }

        .nxc-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .nxc-price {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 19px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -.03em;
          line-height: 1;
        }
        .nxc-wrap.premium .nxc-price { color: #eab308; }

        .nxc-title {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nxc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 3px;
        }
        .nxc-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 5px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          letter-spacing: .01em;
        }
        .nxc-wrap.premium .nxc-tag {
          background: rgba(234,179,8,0.06);
          border-color: rgba(234,179,8,0.12);
          color: rgba(234,179,8,0.6);
        }

        /* ── SEPARATOR ── */
        .nxc-sep {
          height: 1px;
          background: rgba(255,255,255,0.04);
          margin: 0;
        }

        /* ── FOOTER ── */
        .nxc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #0d1117;
        }
        .nxc-user {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .nxc-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1a2234;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 800;
          color: rgba(255,255,255,0.4);
          overflow: hidden;
          flex-shrink: 0;
        }
        .nxc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nxc-username {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nxc-username.mine {
          color: rgba(255,255,255,0.5);
          font-weight: 700;
        }

        /* ── LOCALIZAÇÃO no footer ── */
        .nxc-loc {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          color: rgba(255,255,255,0.22);
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── MODAL ── */
        .nxc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2,6,23,0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: nxc-fade .2s ease;
        }
        @keyframes nxc-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .nxc-modal-box {
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 40px 32px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 32px 64px rgba(0,0,0,0.7);
          animation: nxc-pop .25s cubic-bezier(.16,1,.3,1);
        }
        @keyframes nxc-pop {
          from { transform: scale(.9) translateY(12px); opacity: 0; }
          to   { transform: scale(1) translateY(0);    opacity: 1; }
        }
        .nxc-modal-icon {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .nxc-modal-title {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 21px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -.02em;
        }
        .nxc-modal-text {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
          margin: 0 0 28px;
        }
        .nxc-modal-text strong { color: rgba(255,255,255,0.75); }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel {
          flex: 1;
          padding: 13px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
          letter-spacing: .02em;
        }
        .nxc-modal-cancel:hover { background: rgba(255,255,255,0.04); color: #fff; border-color: rgba(255,255,255,0.15); }
        .nxc-modal-delete {
          flex: 1;
          padding: 13px;
          border-radius: 10px;
          border: none;
          background: #ef4444;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all .2s;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
          letter-spacing: .03em;
          box-shadow: 0 4px 16px rgba(239,68,68,0.3);
        }
        .nxc-modal-delete:hover { background: #dc2626; box-shadow: 0 6px 20px rgba(239,68,68,0.4); }
        .nxc-modal-delete:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
      `}),r.jsxs(H,{to:`/anuncio/${e==null?void 0:e._id}`,className:`nxc-wrap${c?" premium":""}`,children:[r.jsxs("div",{className:"nxc-img",children:[(N=e==null?void 0:e.fotos)!=null&&N[0]?r.jsx("img",{src:e.fotos[0],alt:e.titulo,loading:"lazy"}):r.jsx("div",{className:"nxc-placeholder",children:f?"🚗":"🏠"}),r.jsx("div",{className:"nxc-img-overlay"}),r.jsx("span",{className:"nxc-badge-tipo",children:f?"Automóvel":"Imóvel"}),c&&r.jsxs("span",{className:"nxc-badge-premium",children:[r.jsx(s,{path:Q,size:.45})," Destaque"]}),!c&&_&&(e==null?void 0:e.estado)&&!d&&r.jsx("span",{className:"nxc-badge-status",style:{background:i.bg,color:i.color,border:`1px solid ${i.border}`},children:i.label}),d&&r.jsxs("button",{type:"button",className:"nxc-delete-btn",onClick:J,children:[r.jsx(s,{path:u,size:.45})," Apagar"]}),((A=e==null?void 0:e.fotos)==null?void 0:A.length)>1&&r.jsxs("div",{className:"nxc-photo-count",children:[r.jsx(s,{path:W,size:.45})," ",e.fotos.length]})]}),r.jsxs("div",{className:"nxc-body",children:[r.jsx("div",{className:"nxc-price",children:G}),r.jsx("div",{className:"nxc-title",children:e==null?void 0:e.titulo}),r.jsxs("div",{className:"nxc-tags",children:[((C=e==null?void 0:e.imovel)==null?void 0:C.area)&&r.jsxs("span",{className:"nxc-tag",children:[e.imovel.area," m²"]}),((P=e==null?void 0:e.imovel)==null?void 0:P.tipologia)&&r.jsx("span",{className:"nxc-tag",children:e.imovel.tipologia}),((D=e==null?void 0:e.carro)==null?void 0:D.marca)&&r.jsxs("span",{className:"nxc-tag",children:[e.carro.marca,e.carro.modelo?` ${e.carro.modelo}`:""]}),((O=e==null?void 0:e.carro)==null?void 0:O.km)!=null&&r.jsxs("span",{className:"nxc-tag",children:[new Intl.NumberFormat("pt-PT").format(e.carro.km)," km"]}),((I=e==null?void 0:e.carro)==null?void 0:I.ano)&&r.jsx("span",{className:"nxc-tag",children:e.carro.ano}),((M=e==null?void 0:e.carro)==null?void 0:M.combustivel)&&r.jsx("span",{className:"nxc-tag",children:e.carro.combustivel})]})]}),r.jsx("div",{className:"nxc-sep"}),r.jsxs("div",{className:"nxc-footer",children:[r.jsxs("div",{className:"nxc-user",children:[r.jsx("div",{className:"nxc-avatar",children:(S=e==null?void 0:e.utilizador)!=null&&S.avatarUrl?r.jsx("img",{src:e.utilizador.avatarUrl,alt:""}):V}),r.jsxs("span",{className:`nxc-username${d?" mine":""}`,children:[d?"O teu anúncio":((E=e==null?void 0:e.utilizador)==null?void 0:E.nome)||"Anunciante",B&&r.jsx(s,{path:X,size:.42,color:"#3b82f6",title:"Vendedor Verificado",style:{flexShrink:0}})]})]}),((R=e==null?void 0:e.localizacao)==null?void 0:R.cidade)&&r.jsxs("div",{className:"nxc-loc",children:[r.jsx(s,{path:ee,size:.45}),e.localizacao.cidade]})]})]}),Y&&r.jsx("div",{className:"nxc-modal-overlay",onClick:h,children:r.jsxs("div",{className:"nxc-modal-box",onClick:t=>t.stopPropagation(),children:[r.jsx("div",{className:"nxc-modal-icon",children:r.jsx(s,{path:u,size:1.4,color:"#ef4444"})}),r.jsx("h3",{className:"nxc-modal-title",children:"Eliminar este anúncio?"}),r.jsxs("p",{className:"nxc-modal-text",children:["Esta ação é ",r.jsx("strong",{children:"permanente e irreversível"}),". O anúncio será removido imediatamente."]}),r.jsxs("div",{className:"nxc-modal-actions",children:[r.jsx("button",{type:"button",className:"nxc-modal-cancel",onClick:h,disabled:p,children:"Cancelar"}),r.jsx("button",{type:"button",className:"nxc-modal-delete",onClick:Z,disabled:p,children:p?"A apagar…":"Apagar"})]})]})})]})}export{ae as A};
//# sourceMappingURL=AnuncioCard-pvGkCgen.js.map
