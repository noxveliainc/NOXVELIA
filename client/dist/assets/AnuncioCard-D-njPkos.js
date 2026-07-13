import{g as e,t,y as n}from"./jsx-runtime-On9Szgki.js";import{_ as r,v as i,y as a}from"./index-Bm6yTU-b.js";import{wt as o}from"./mdi-CgcECdTh.js";import{r as s}from"./seo-BmrZTbI5.js";var c=n(e(),1),l=o(),u=t();function d({anuncio:e,showStatus:t=!1,onAnuncioEliminado:n,forceSellerIdentity:o=!1}){let{user:d,signed:f}=r(),[p,m]=(0,c.useState)(!1),[h,g]=(0,c.useState)(!1),_=e?.preco?new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e.preco):`Sob Consulta`,v=e?.utilizador?.nome?.charAt(0).toUpperCase()||`?`,y={ativo:{bg:`rgba(16,185,129,.12)`,color:`#10b981`,border:`rgba(16,185,129,.2)`,label:`Activo`},pausado:{bg:`rgba(239,68,68,.12)`,color:`#ef4444`,border:`rgba(239,68,68,.2)`,label:`Pausado`},expirado:{bg:`rgba(245,158,11,.12)`,color:`#f59e0b`,border:`rgba(245,158,11,.2)`,label:`A expirar`},pendente:{bg:`rgba(59,130,246,.12)`,color:`#3b82f6`,border:`rgba(59,130,246,.2)`,label:`Pendente`}},b=y[e?.estado]||y.pendente,x=e?.utilizador?._id||e?.utilizador?.id||e?.utilizador,S=d?._id||d?.id,C=!o&&f&&(x&&S&&String(x)===String(S)||!!n),w=e?.destacado===!0,T=e?.utilizador?.tipo===`admin`||e?.utilizador?.premiumAtivo===!0,E=e?.tipo===`carro`,D=(E?[{label:`Quilometros`,value:e?.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`},{label:`Combustivel`,value:(e=>e?{gasolina:`Gasolina`,diesel:`Diesel`,eletrico:`Eletrico`,hibrido:`Hibrido`,gpl:`GPL`}[String(e).toLowerCase()]||e:null)(e?.carro?.combustivel)},{label:`Cilindrada`,value:e?.carro?.cilindrada?`${new Intl.NumberFormat(`pt-PT`).format(e.carro.cilindrada)} cc`:null}]:[{label:`Tipo`,value:e?.imovel?.tipologia||e?.imovel?.tipoImovel},{label:`Area`,value:e?.imovel?.area?`${e.imovel.area} m2`:null},{label:`Zona`,value:e?.localizacao?.cidade}]).filter(e=>e.value).slice(0,3),O=e=>{e.preventDefault(),e.stopPropagation(),g(!0)},k=e=>{e?.preventDefault(),e?.stopPropagation(),g(!1)};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`style`,{children:`
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

        .dark .nxc-wrap {
          background: #111c30;
          border-color: #334155;
          color: #f8fafc;
          box-shadow: 0 18px 42px -30px rgba(0,0,0,0.95);
        }
        .dark .nxc-wrap::after { box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
        .dark .nxc-wrap:hover {
          border-color: #475569;
          box-shadow: 0 26px 54px -30px rgba(0,0,0,0.95);
        }
        .dark .nxc-img,
        .dark .nxc-placeholder {
          background: #0f172a;
          color: #64748b;
        }
        .dark .nxc-price,
        .dark .nxc-insight-value,
        .dark .nxc-username.mine,
        .dark .nxc-modal-title {
          color: #f8fafc;
        }
        .dark .nxc-title,
        .dark .nxc-username,
        .dark .nxc-loc,
        .dark .nxc-modal-text {
          color: #cbd5e1;
        }
        .dark .nxc-insight,
        .dark .nxc-tag,
        .dark .nxc-footer,
        .dark .nxc-modal-box {
          background: #0f172a;
          border-color: #334155;
        }
        .dark .nxc-insight-label { color: #94a3b8; }
        .dark .nxc-avatar {
          background: #111c30;
          border-color: #475569;
          color: #cbd5e1;
        }
        .dark .nxc-badge-tipo,
        .dark .nxc-delete-btn,
        .dark .nxc-modal-cancel {
          background: rgba(15, 23, 42, 0.86);
          border-color: rgba(148, 163, 184, 0.24);
          color: #f8fafc;
        }
      `}),(0,u.jsxs)(a,{to:s(e),className:`nxc-wrap${w?` premium`:``}`,children:[(0,u.jsxs)(`div`,{className:`nxc-img`,children:[e?.fotos?.[0]?(0,u.jsx)(`img`,{src:e.fotos[0],alt:e.titulo,loading:`lazy`,decoding:`async`}):(0,u.jsx)(`div`,{className:`nxc-placeholder`,children:E?`🚗`:`🏠`}),(0,u.jsx)(`div`,{className:`nxc-img-overlay`}),(0,u.jsx)(`span`,{className:`nxc-badge-tipo`,children:E?`Automóvel`:`Imóvel`}),w&&(0,u.jsxs)(`span`,{className:`nxc-badge-premium`,children:[(0,u.jsx)(l.Icon,{path:`M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z`,size:.45}),` Destaque`]}),!w&&t&&e?.estado&&!C&&(0,u.jsx)(`span`,{className:`nxc-badge-status`,style:{background:b.bg,color:b.color,border:`1px solid ${b.border}`},children:b.label}),C&&(0,u.jsxs)(`button`,{type:`button`,className:`nxc-delete-btn`,onClick:O,children:[(0,u.jsx)(l.Icon,{path:`M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z`,size:.45}),` Apagar`]}),e?.fotos?.length>1&&(0,u.jsxs)(`div`,{className:`nxc-photo-count`,children:[(0,u.jsx)(l.Icon,{path:`M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z`,size:.45}),` `,e.fotos.length]})]}),(0,u.jsxs)(`div`,{className:`nxc-body`,children:[(0,u.jsx)(`div`,{className:`nxc-price`,children:_}),(0,u.jsx)(`div`,{className:`nxc-title`,children:e?.titulo}),D.length>0&&(0,u.jsx)(`div`,{className:`nxc-insights`,children:D.map(e=>(0,u.jsxs)(`span`,{className:`nxc-insight`,children:[(0,u.jsx)(`span`,{className:`nxc-insight-label`,children:e.label}),(0,u.jsx)(`span`,{className:`nxc-insight-value`,children:e.value})]},e.label))}),!E&&(0,u.jsxs)(`div`,{className:`nxc-tags`,children:[e?.imovel?.area&&(0,u.jsxs)(`span`,{className:`nxc-tag`,children:[e.imovel.area,` m²`]}),e?.imovel?.tipologia&&(0,u.jsx)(`span`,{className:`nxc-tag`,children:e.imovel.tipologia})]})]}),(0,u.jsxs)(`div`,{className:`nxc-footer`,children:[(0,u.jsxs)(`div`,{className:`nxc-user`,children:[(0,u.jsx)(`div`,{className:`nxc-avatar`,children:e?.utilizador?.avatarUrl?(0,u.jsx)(`img`,{src:e.utilizador.avatarUrl,alt:``}):v}),(0,u.jsxs)(`span`,{className:`nxc-username${C?` mine`:``}`,children:[C?`O teu anúncio`:e?.utilizador?.nome||`Anunciante`,T&&(0,u.jsx)(l.Icon,{path:`M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z`,size:.45,color:`#3b82f6`,title:`Vendedor Verificado`,style:{flexShrink:0}})]})]}),e?.localizacao?.cidade&&(0,u.jsxs)(`div`,{className:`nxc-loc`,children:[(0,u.jsx)(l.Icon,{path:`M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z`,size:.5}),e.localizacao.cidade]})]})]}),h&&(0,u.jsx)(`div`,{className:`nxc-modal-overlay`,onClick:k,children:(0,u.jsxs)(`div`,{className:`nxc-modal-box`,onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(`div`,{className:`nxc-modal-icon`,children:(0,u.jsx)(l.Icon,{path:`M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z`,size:1.8,color:`#ef4444`})}),(0,u.jsx)(`h3`,{className:`nxc-modal-title`,children:`Eliminar anúncio?`}),(0,u.jsxs)(`p`,{className:`nxc-modal-text`,children:[`Esta ação é `,(0,u.jsx)(`strong`,{children:`permanente e irreversível`}),`.`]}),(0,u.jsxs)(`div`,{className:`nxc-modal-actions`,children:[(0,u.jsx)(`button`,{type:`button`,className:`nxc-modal-cancel`,onClick:k,disabled:p,children:`Cancelar`}),(0,u.jsx)(`button`,{type:`button`,className:`nxc-modal-delete`,onClick:async t=>{t.preventDefault(),t.stopPropagation(),m(!0);try{let t=e._id||e.id;if(!t)throw Error(`ID não encontrado.`);let r=await i.delete(`/anuncios/${t}`);if(r.status>=200&&r.status<300)g(!1),n?.(t);else throw Error(`Resposta inesperada.`)}catch(e){alert(e.response?.data?.erro||`Não foi possível eliminar. Tenta novamente.`),m(!1)}},disabled:p,children:p?`A apagar…`:`Apagar`})]})]})})]})}export{d as t};