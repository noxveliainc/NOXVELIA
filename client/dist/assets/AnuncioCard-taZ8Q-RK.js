import{u as ee,r as V,j as r,L as re,c as te}from"./index-W-wvA4Qe.js";import{I as s,ag as ae,a0 as _,ak as se,P as le,c as oe}from"./mdi-B2-VfyGs.js";import{a as ie}from"./seo-DNd8R9iT.js";function ce({anuncio:e,showStatus:q=!1,onAnuncioEliminado:o,forceSellerIdentity:B=!1}){var j,y,k,z,N,C,A,I,P,D,u,M,S,O,E,F,T,$,L,R;const{user:a,signed:Y}=ee(),[x,g]=V.useState(!1),[H,c]=V.useState(!1),J=e!=null&&e.preco?new Intl.NumberFormat("pt-PT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(e.preco):"Sob Consulta",Q=((y=(j=e==null?void 0:e.utilizador)==null?void 0:j.nome)==null?void 0:y.charAt(0).toUpperCase())||"?",b={ativo:{bg:"rgba(16,185,129,.12)",color:"#10b981",border:"rgba(16,185,129,.2)",label:"Activo"},pausado:{bg:"rgba(239,68,68,.12)",color:"#ef4444",border:"rgba(239,68,68,.2)",label:"Pausado"},expirado:{bg:"rgba(245,158,11,.12)",color:"#f59e0b",border:"rgba(245,158,11,.2)",label:"A expirar"},pendente:{bg:"rgba(59,130,246,.12)",color:"#3b82f6",border:"rgba(59,130,246,.2)",label:"Pendente"}},i=b[e==null?void 0:e.estado]||b.pendente,m=((k=e==null?void 0:e.utilizador)==null?void 0:k._id)||((z=e==null?void 0:e.utilizador)==null?void 0:z.id)||(e==null?void 0:e.utilizador),h=(a==null?void 0:a._id)||(a==null?void 0:a.id),d=!B&&Y&&(m&&h&&String(m)===String(h)||!!o),n=(e==null?void 0:e.destacado)===!0,Z=((N=e==null?void 0:e.utilizador)==null?void 0:N.tipo)==="admin"||((C=e==null?void 0:e.utilizador)==null?void 0:C.premiumAtivo)===!0,p=(e==null?void 0:e.tipo)==="carro",K=t=>t?{gasolina:"Gasolina",diesel:"Diesel",eletrico:"Eletrico",hibrido:"Hibrido",gpl:"GPL"}[String(t).toLowerCase()]||t:null,v=(p?[{label:"Quilometros",value:((A=e==null?void 0:e.carro)==null?void 0:A.km)!=null?`${new Intl.NumberFormat("pt-PT").format(e.carro.km)} km`:null},{label:"Combustivel",value:K((I=e==null?void 0:e.carro)==null?void 0:I.combustivel)},{label:"Cilindrada",value:(P=e==null?void 0:e.carro)!=null&&P.cilindrada?`${new Intl.NumberFormat("pt-PT").format(e.carro.cilindrada)} cc`:null}]:[{label:"Tipo",value:((D=e==null?void 0:e.imovel)==null?void 0:D.tipologia)||((u=e==null?void 0:e.imovel)==null?void 0:u.tipoImovel)},{label:"Area",value:(M=e==null?void 0:e.imovel)!=null&&M.area?`${e.imovel.area} m2`:null},{label:"Zona",value:(S=e==null?void 0:e.localizacao)==null?void 0:S.cidade}]).filter(t=>t.value).slice(0,3),W=t=>{t.preventDefault(),t.stopPropagation(),c(!0)},w=t=>{t==null||t.preventDefault(),t==null||t.stopPropagation(),c(!1)},X=async t=>{var f,G;t.preventDefault(),t.stopPropagation(),g(!0);try{const l=e._id||e.id;if(!l)throw new Error("ID não encontrado.");const U=await te.delete(`/anuncios/${l}`);if(U.status>=200&&U.status<300)c(!1),o==null||o(l);else throw new Error("Resposta inesperada.")}catch(l){alert(((G=(f=l.response)==null?void 0:f.data)==null?void 0:G.erro)||"Não foi possível eliminar. Tenta novamente."),g(!1)}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        /* ── CARD ── */
        .nxc-wrap {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .3s ease;
          color: #0f172a;
          position: relative;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .nxc-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .nxc-wrap:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 38px -18px rgba(15,23,42,0.28);
          border-color: #cbd5e1;
        }
        .nxc-wrap.premium {
          border-color: rgba(234, 179, 8, 0.4);
          box-shadow: 0 0 0 1px rgba(234, 179, 8, 0.15) inset, 0 4px 20px rgba(234, 179, 8, 0.1);
        }
        .nxc-wrap.premium:hover {
          border-color: rgba(234, 179, 8, 0.6);
          box-shadow: 0 20px 40px rgba(234, 179, 8, 0.15);
        }

        /* ── IMAGEM ── */
        .nxc-img {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #f8fafc;
        }
        .nxc-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.16), transparent 36%);
          opacity: 0;
          transition: opacity .3s;
          z-index: 2;
          pointer-events: none;
        }
        .nxc-wrap:hover .nxc-img::after { opacity: 1; }
        .nxc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          display: block;
        }
        .nxc-wrap:hover .nxc-img img { transform: scale(1.05); }

        /* Overlay para legibilidade das tags */
        .nxc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.6) 0%,
            rgba(15, 23, 42, 0.1) 40%,
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
          color: #cbd5e1;
        }

        /* ── BADGES ── */
        .nxc-badge-premium {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          color: #fff;
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

        .nxc-badge-tipo {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          color: #0f172a;
          font-size: 9px;
          font-weight: 800;
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
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
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
        }
        .nxc-delete-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
        }

        .nxc-photo-count {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
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
          padding: 14px 16px 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 6px;
        }

        .nxc-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -.02em;
          line-height: 1;
        }

        .nxc-title {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nxc-insights {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          margin-top: 8px;
        }
        .nxc-insight {
          min-width: 0;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 7px 8px;
        }
        .nxc-insight-label {
          display: block;
          font-size: 8.5px;
          font-weight: 900;
          color: #94a3b8;
          letter-spacing: .08em;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 4px;
        }
        .nxc-insight-value {
          display: block;
          font-size: 11.5px;
          font-weight: 800;
          color: #0f172a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.1;
        }

        .nxc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .nxc-tag {
          font-size: 10.5px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          white-space: nowrap;
        }
        .nxc-wrap.premium .nxc-tag {
          background: #fefce8;
          border-color: #fde047;
          color: #854d0e;
        }

        /* ── FOOTER ── */
        .nxc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
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
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          overflow: hidden;
          flex-shrink: 0;
        }
        .nxc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nxc-username {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #475569;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nxc-username.mine { color: #0f172a; font-weight: 700; }

        .nxc-loc {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── MODAL ── */
        .nxc-modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px);
          z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .nxc-modal-box {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px;
          max-width: 400px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
        }
        .nxc-modal-icon { margin: 0 auto 20px; display: flex; justify-content: center; }
        .nxc-modal-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px; }
        .nxc-modal-text { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.6; }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; color: #475569; font-weight: 700; cursor: pointer; transition: all .2s; }
        .nxc-modal-cancel:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }
        .nxc-modal-delete { flex: 1; padding: 12px; border-radius: 10px; border: none; background: #ef4444; color: #fff; font-weight: 800; cursor: pointer; transition: all .2s; }
        .nxc-modal-delete:hover { background: #dc2626; }
      `}),r.jsxs(re,{to:ie(e),className:`nxc-wrap${n?" premium":""}`,children:[r.jsxs("div",{className:"nxc-img",children:[(O=e==null?void 0:e.fotos)!=null&&O[0]?r.jsx("img",{src:e.fotos[0],alt:e.titulo,loading:"lazy"}):r.jsx("div",{className:"nxc-placeholder",children:p?"🚗":"🏠"}),r.jsx("div",{className:"nxc-img-overlay"}),r.jsx("span",{className:"nxc-badge-tipo",children:p?"Automóvel":"Imóvel"}),n&&r.jsxs("span",{className:"nxc-badge-premium",children:[r.jsx(s.Icon,{path:ae,size:.45})," Destaque"]}),!n&&q&&(e==null?void 0:e.estado)&&!d&&r.jsx("span",{className:"nxc-badge-status",style:{background:i.bg,color:i.color,border:`1px solid ${i.border}`},children:i.label}),d&&r.jsxs("button",{type:"button",className:"nxc-delete-btn",onClick:W,children:[r.jsx(s.Icon,{path:_,size:.45})," Apagar"]}),((E=e==null?void 0:e.fotos)==null?void 0:E.length)>1&&r.jsxs("div",{className:"nxc-photo-count",children:[r.jsx(s.Icon,{path:se,size:.45})," ",e.fotos.length]})]}),r.jsxs("div",{className:"nxc-body",children:[r.jsx("div",{className:"nxc-price",children:J}),r.jsx("div",{className:"nxc-title",children:e==null?void 0:e.titulo}),v.length>0&&r.jsx("div",{className:"nxc-insights",children:v.map(t=>r.jsxs("span",{className:"nxc-insight",children:[r.jsx("span",{className:"nxc-insight-label",children:t.label}),r.jsx("span",{className:"nxc-insight-value",children:t.value})]},t.label))}),!p&&r.jsxs("div",{className:"nxc-tags",children:[((F=e==null?void 0:e.imovel)==null?void 0:F.area)&&r.jsxs("span",{className:"nxc-tag",children:[e.imovel.area," m²"]}),((T=e==null?void 0:e.imovel)==null?void 0:T.tipologia)&&r.jsx("span",{className:"nxc-tag",children:e.imovel.tipologia})]})]}),r.jsxs("div",{className:"nxc-footer",children:[r.jsxs("div",{className:"nxc-user",children:[r.jsx("div",{className:"nxc-avatar",children:($=e==null?void 0:e.utilizador)!=null&&$.avatarUrl?r.jsx("img",{src:e.utilizador.avatarUrl,alt:""}):Q}),r.jsxs("span",{className:`nxc-username${d?" mine":""}`,children:[d?"O teu anúncio":((L=e==null?void 0:e.utilizador)==null?void 0:L.nome)||"Anunciante",Z&&r.jsx(s.Icon,{path:le,size:.45,color:"#3b82f6",title:"Vendedor Verificado",style:{flexShrink:0}})]})]}),((R=e==null?void 0:e.localizacao)==null?void 0:R.cidade)&&r.jsxs("div",{className:"nxc-loc",children:[r.jsx(s.Icon,{path:oe,size:.5}),e.localizacao.cidade]})]})]}),H&&r.jsx("div",{className:"nxc-modal-overlay",onClick:w,children:r.jsxs("div",{className:"nxc-modal-box",onClick:t=>t.stopPropagation(),children:[r.jsx("div",{className:"nxc-modal-icon",children:r.jsx(s.Icon,{path:_,size:1.8,color:"#ef4444"})}),r.jsx("h3",{className:"nxc-modal-title",children:"Eliminar anúncio?"}),r.jsxs("p",{className:"nxc-modal-text",children:["Esta ação é ",r.jsx("strong",{children:"permanente e irreversível"}),"."]}),r.jsxs("div",{className:"nxc-modal-actions",children:[r.jsx("button",{type:"button",className:"nxc-modal-cancel",onClick:w,disabled:x,children:"Cancelar"}),r.jsx("button",{type:"button",className:"nxc-modal-delete",onClick:X,disabled:x,children:x?"A apagar…":"Apagar"})]})]})})]})}export{ce as A};
