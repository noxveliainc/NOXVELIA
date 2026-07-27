import{C as e,E as t,F as n,N as r,T as i,w as a}from"./index-CjA2JSwO.js";import{n as o,r as s,t as c}from"./images-io1S19E8.js";import{i as l}from"./seo-BZnLo9Qd.js";var u=n(r(),1),d=a(),f={camera:`M4 8h3l1.5-2h7L17 8h3v10H4V8zm8 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z`,check:`M12 3l7 3v5c0 5-3.1 8.3-7 10-3.9-1.7-7-5-7-10V6l7-3zm-3 9 2 2 4-5`,location:`M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z`,star:`M12 4l2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L12 4z`,trash:`M6 7h12M9 7V5h6v2m-7 3 .6 9h6.8l.6-9`};function p({name:e,size:t=14,color:n}){return(0,d.jsx)(`svg`,{className:`nxc-icon`,width:t,height:t,viewBox:`0 0 24 24`,"aria-hidden":`true`,focusable:`false`,style:n?{color:n}:void 0,children:(0,d.jsx)(`path`,{d:f[e]})})}function m({anuncio:n,showStatus:r=!1,onAnuncioEliminado:a,forceSellerIdentity:f=!1}){let{user:m,signed:h}=e(),[g,_]=(0,u.useState)(!1),[v,y]=(0,u.useState)(!1),b=n?.preco?new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(n.preco):`Sob Consulta`,x=n?.utilizador?.nome?.charAt(0).toUpperCase()||`?`,S={ativo:{bg:`rgba(16,185,129,.12)`,color:`#10b981`,border:`rgba(16,185,129,.2)`,label:`Activo`},pausado:{bg:`rgba(239,68,68,.12)`,color:`#ef4444`,border:`rgba(239,68,68,.2)`,label:`Pausado`},expirado:{bg:`rgba(245,158,11,.12)`,color:`#f59e0b`,border:`rgba(245,158,11,.2)`,label:`A expirar`},pendente:{bg:`rgba(59,130,246,.12)`,color:`#3b82f6`,border:`rgba(59,130,246,.2)`,label:`Pendente`}},C=S[n?.estado]||S.pendente,w=n?.utilizador?._id||n?.utilizador?.id||n?.utilizador,T=m?._id||m?.id,E=!f&&h&&(w&&T&&String(w)===String(T)||!!a),D=n?.destacado===!0,O=n?.utilizador?.tipo===`admin`||n?.utilizador?.premiumAtivo===!0,k=n?.utilizador?.tipoConta===`profissional`||n?.utilizador?.premiumAtivo===!0,A=n?.tipo===`carro`,j=n?.precoAnalise,M=Number(n?.scoreQualidade||0),N=Math.max(0,Math.min(100,Math.round(M/10*100))),P=n?.fotos?.[0]||n?.imagens?.[0]||n?.imagem,F=s(P,`medium`),I=o(P),L=c(P,{width:800,height:600}),R=(A?[{label:`Ano`,value:n?.carro?.ano||null},{label:`Km`,value:n?.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(n.carro.km)} km`},{label:`Combustível`,value:(e=>e?{gasolina:`Gasolina`,diesel:`Diesel`,eletrico:`Eletrico`,hibrido:`Hibrido`,gpl:`GPL`}[String(e).toLowerCase()]||e:null)(n?.carro?.combustivel)},{label:`Caixa`,value:n?.carro?.transmissao||null}]:[{label:`Tipo`,value:n?.imovel?.tipologia||n?.imovel?.tipoImovel},{label:`Área`,value:n?.imovel?.area?`${n.imovel.area} m2`:null},{label:`Quartos`,value:n?.imovel?.quartos==null?null:`${n.imovel.quartos}`},{label:`Garagem`,value:n?.imovel?.garagem?`Sim`:null}]).filter(e=>e.value).slice(0,3),z=[n?.garantia&&{label:`Garantia`},n?.aceitaRetoma&&{label:`Retoma`},k&&{label:`Profissional`}].filter(Boolean).slice(0,3),B=e=>{e.preventDefault(),e.stopPropagation(),y(!0)},V=e=>{e?.preventDefault(),e?.stopPropagation(),y(!1)};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`style`,{children:`
        /* ── CARD ── */
        .nxc-wrap {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          transition: border-color .16s ease, background-color .16s ease;
          color: #0f172a;
          position: relative;
          box-shadow: none;
        }
        .nxc-wrap::after {
          display: none;
        }
        .nxc-wrap:hover {
          background: #fbfcfb;
          border-color: #b8c5c1;
        }
        .nxc-wrap.premium {
          border-color: #c6a86a;
          box-shadow: none;
        }
        .nxc-wrap.premium:hover {
          border-color: #9d7b3f;
          box-shadow: none;
        }

        /* ── IMAGEM ── */
        .nxc-img {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #f8fafc;
        }
        .nxc-img::after {
          display: none;
        }
        .nxc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Overlay para legibilidade das tags */
        .nxc-img-overlay {
          display: none;
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
          background: #9d7b3f;
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
          box-shadow: none;
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
          transition: background-color .16s ease, color .16s ease, border-color .16s ease;
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

        .nxc-price-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }
        .nxc-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -.02em;
          line-height: 1;
        }
        .nxc-price-signal {
          flex-shrink: 0;
          max-width: 122px;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 9px;
          font-weight: 900;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: .06em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
        }
        .nxc-price-signal.baixo { background: #fff7e6; border-color: #d9c49c; color: #806040; }
        .nxc-price-signal.justo { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
        .nxc-price-signal.alto { background: #fff7ed; border-color: #fed7aa; color: #c2410c; }

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

        .nxc-trust-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 2px;
        }
        .nxc-trust-pill {
          display: inline-flex;
          align-items: center;
          min-height: 22px;
          padding: 0 7px;
          border-radius: 999px;
          border: 1px solid #e2d1a9;
          background: #fff7e6;
          color: #102f50;
          font-size: 10px;
          font-weight: 850;
          white-space: nowrap;
        }
        .nxc-quality {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }
        .nxc-quality-label {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 900;
          color: #64748b;
          white-space: nowrap;
        }
        .nxc-quality-track {
          height: 5px;
          flex: 1;
          min-width: 44px;
          border-radius: 999px;
          background: #e2e8f0;
          overflow: hidden;
        }
        .nxc-quality-fill {
          height: 100%;
          width: ${N}%;
          border-radius: inherit;
          background: linear-gradient(90deg, #102f50, #d9c49c);
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
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.72);
          z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .nxc-modal-box {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;
          max-width: 400px; width: 100%; text-align: center; box-shadow: none;
        }
        .nxc-modal-icon { margin: 0 auto 20px; display: flex; justify-content: center; }
        .nxc-modal-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px; }
        .nxc-modal-text { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.6; }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; color: #475569; font-weight: 700; cursor: pointer; transition: background-color .16s ease, color .16s ease, border-color .16s ease; }
        .nxc-modal-cancel:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }
        .nxc-modal-delete { flex: 1; padding: 12px; border-radius: 8px; border: none; background: #ef4444; color: #fff; font-weight: 800; cursor: pointer; transition: background-color .16s ease; }
        .nxc-modal-delete:hover { background: #dc2626; }

        .dark .nxc-wrap {
          background: #111c30;
          border-color: #334155;
          color: #f8fafc;
          box-shadow: none;
        }
        .dark .nxc-wrap::after { display: none; }
        .dark .nxc-wrap:hover {
          border-color: #475569;
          background: #142037;
          box-shadow: none;
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
        .dark .nxc-modal-box,
        .dark .nxc-price-signal,
        .dark .nxc-quality-track {
          background: #0f172a;
          border-color: #334155;
        }
        .dark .nxc-quality-label { color: #94a3b8; }
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

        .nxc-icon {
          flex: 0 0 auto;
          display: inline-block;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
          vertical-align: middle;
        }
      `}),(0,d.jsxs)(t,{to:l(n),className:`nxc-wrap${D?` premium`:``}`,children:[(0,d.jsxs)(`div`,{className:`nxc-img`,children:[F?(0,d.jsx)(`img`,{src:F,srcSet:I||void 0,sizes:`(max-width: 720px) 100vw, 360px`,width:L.width,height:L.height,alt:n.titulo,loading:`lazy`,decoding:`async`}):(0,d.jsx)(`div`,{className:`nxc-placeholder`,children:A?`🚗`:`🏠`}),(0,d.jsx)(`div`,{className:`nxc-img-overlay`}),(0,d.jsx)(`span`,{className:`nxc-badge-tipo`,children:A?`Automóvel`:`Imóvel`}),D&&(0,d.jsxs)(`span`,{className:`nxc-badge-premium`,children:[(0,d.jsx)(p,{name:`star`,size:12}),` Destaque`]}),!D&&r&&n?.estado&&!E&&(0,d.jsx)(`span`,{className:`nxc-badge-status`,style:{background:C.bg,color:C.color,border:`1px solid ${C.border}`},children:C.label}),E&&(0,d.jsxs)(`button`,{type:`button`,className:`nxc-delete-btn`,onClick:B,children:[(0,d.jsx)(p,{name:`trash`,size:12}),` Apagar`]}),n?.fotos?.length>1&&(0,d.jsxs)(`div`,{className:`nxc-photo-count`,children:[(0,d.jsx)(p,{name:`camera`,size:12}),` `,n.fotos.length]})]}),(0,d.jsxs)(`div`,{className:`nxc-body`,children:[(0,d.jsxs)(`div`,{className:`nxc-price-row`,children:[(0,d.jsx)(`div`,{className:`nxc-price`,children:b}),j&&(0,d.jsx)(`span`,{className:`nxc-price-signal ${j.estado}`,title:j.detalhe,children:j.label})]}),(0,d.jsx)(`div`,{className:`nxc-title`,children:n?.titulo}),z.length>0&&(0,d.jsx)(`div`,{className:`nxc-trust-strip`,"aria-label":`Sinais de confiança`,children:z.map(e=>(0,d.jsx)(`span`,{className:`nxc-trust-pill`,children:e.label},e.label))}),M>0&&(0,d.jsxs)(`div`,{className:`nxc-quality`,title:`Força do anúncio: ${M}/10`,children:[(0,d.jsxs)(`span`,{className:`nxc-quality-label`,children:[M,`/10`]}),(0,d.jsx)(`span`,{className:`nxc-quality-track`,children:(0,d.jsx)(`span`,{className:`nxc-quality-fill`})})]}),R.length>0&&(0,d.jsx)(`div`,{className:`nxc-insights`,children:R.map(e=>(0,d.jsxs)(`span`,{className:`nxc-insight`,children:[(0,d.jsx)(`span`,{className:`nxc-insight-label`,children:e.label}),(0,d.jsx)(`span`,{className:`nxc-insight-value`,children:e.value})]},e.label))}),!A&&(0,d.jsxs)(`div`,{className:`nxc-tags`,children:[n?.imovel?.area&&(0,d.jsxs)(`span`,{className:`nxc-tag`,children:[n.imovel.area,` m²`]}),n?.imovel?.tipologia&&(0,d.jsx)(`span`,{className:`nxc-tag`,children:n.imovel.tipologia})]})]}),(0,d.jsxs)(`div`,{className:`nxc-footer`,children:[(0,d.jsxs)(`div`,{className:`nxc-user`,children:[(0,d.jsx)(`div`,{className:`nxc-avatar`,children:n?.utilizador?.avatarUrl?(0,d.jsx)(`img`,{src:n.utilizador.avatarUrl,alt:``}):x}),(0,d.jsxs)(`span`,{className:`nxc-username${E?` mine`:``}`,children:[E?`O teu anúncio`:n?.utilizador?.nome||`Anunciante`,O&&(0,d.jsx)(p,{name:`check`,size:13,color:`#2563eb`})]})]}),n?.localizacao?.cidade&&(0,d.jsxs)(`div`,{className:`nxc-loc`,children:[(0,d.jsx)(p,{name:`location`,size:13}),n.localizacao.cidade]})]})]}),v&&(0,d.jsx)(`div`,{className:`nxc-modal-overlay`,onClick:V,children:(0,d.jsxs)(`div`,{className:`nxc-modal-box`,onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(`div`,{className:`nxc-modal-icon`,children:(0,d.jsx)(p,{name:`trash`,size:42,color:`#ef4444`})}),(0,d.jsx)(`h3`,{className:`nxc-modal-title`,children:`Eliminar anúncio?`}),(0,d.jsxs)(`p`,{className:`nxc-modal-text`,children:[`Esta ação é `,(0,d.jsx)(`strong`,{children:`permanente e irreversível`}),`.`]}),(0,d.jsxs)(`div`,{className:`nxc-modal-actions`,children:[(0,d.jsx)(`button`,{type:`button`,className:`nxc-modal-cancel`,onClick:V,disabled:g,children:`Cancelar`}),(0,d.jsx)(`button`,{type:`button`,className:`nxc-modal-delete`,onClick:async e=>{e.preventDefault(),e.stopPropagation(),_(!0);try{let e=n._id||n.id;if(!e)throw Error(`ID não encontrado.`);let t=await i.delete(`/anuncios/${e}`);if(t.status>=200&&t.status<300)y(!1),a?.(e);else throw Error(`Resposta inesperada.`)}catch(e){alert(e.response?.data?.erro||`Não foi possível eliminar. Tenta novamente.`),_(!1)}},disabled:g,children:g?`A apagar…`:`Apagar`})]})]})})]})}export{m as t};