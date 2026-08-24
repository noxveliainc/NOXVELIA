import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{S as r,w as i,x as a}from"./index-DIni-zfh.js";import{n as o,r as s,t as c}from"./images-io1S19E8.js";import{i as l}from"./seo-CHiNf1yD.js";import{r as u}from"./marcasModelos-B1QQaHuN.js";var d=e(t(),1),f=n(),p={camera:`M4 8h3l1.5-2h7L17 8h3v10H4V8zm8 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z`,car:`M7 16h10M6 16l1-5 2-3h6l2 3 1 5M8 18h.01M16 18h.01`,check:`M12 3l7 3v5c0 5-3.1 8.3-7 10-3.9-1.7-7-5-7-10V6l7-3zm-3 9 2 2 4-5`,home:`M4 11l8-7 8 7v9h-5v-5H9v5H4v-9`,location:`M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z`,star:`M12 4l2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L12 4z`,trash:`M6 7h12M9 7V5h6v2m-7 3 .6 9h6.8l.6-9`,calendar:`M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z`,gauge:`M12 12l4-3M4 15a8 8 0 1 1 16 0M12 6v1`,fuel:`M5 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15M4 21h10M15 9l2.5 2v6a1.5 1.5 0 0 0 3 0v-5L18 9`,gearbox:`M12 4v3M12 17v3M4.9 6.9l2.1 2.1M17 15l2.1 2.1M4.9 17.1 7 15M17 9l2.1-2.1M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z`,ruler:`M4 8h16v8H4zM8 8v3M12 8v3M16 8v3`,bed:`M4 18v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M4 18H2M20 18h2M4 14h16M7 10V8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2`,garage:`M4 21V10l8-6 8 6v11M4 21h16M9 21v-6h6v6`};function m({name:e,size:t=14,color:n,className:r=``}){return(0,f.jsx)(`svg`,{className:`nxc-icon ${r}`.trim(),width:t,height:t,viewBox:`0 0 24 24`,"aria-hidden":`true`,focusable:`false`,style:n?{color:n}:void 0,children:(0,f.jsx)(`path`,{d:p[e]})})}function h({anuncio:e,showStatus:t=!1,onAnuncioEliminado:n,forceSellerIdentity:p=!1}){let{user:h,signed:g}=a(),[_,v]=(0,d.useState)(!1),[y,b]=(0,d.useState)(!1),[x,S]=(0,d.useState)(!1),C=e?.preco?new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e.preco):`Sob consulta`,w=e?.utilizador?.nome?.charAt(0).toUpperCase()||`?`,T={ativo:{bg:`rgba(217,196,156,.18)`,color:`#102f50`,border:`rgba(217,196,156,.38)`,label:`Ativo`},pausado:{bg:`rgba(239,68,68,.12)`,color:`#ef4444`,border:`rgba(239,68,68,.2)`,label:`Pausado`},expirado:{bg:`rgba(245,158,11,.12)`,color:`#f59e0b`,border:`rgba(245,158,11,.2)`,label:`A expirar`},pendente:{bg:`rgba(59,130,246,.12)`,color:`#3b82f6`,border:`rgba(59,130,246,.2)`,label:`Pendente`},vendido:{bg:`rgba(16,47,80,.12)`,color:`#102f50`,border:`rgba(16,47,80,.2)`,label:`Vendido`}},E=T[e?.estado]||T.pendente,D=e?.utilizador?._id||e?.utilizador?.id||e?.utilizador,O=h?._id||h?.id,k=!p&&g&&(D&&O&&String(D)===String(O)||!!n),A=e?.destacado===!0,j=e?.utilizador?.tipo===`admin`||e?.utilizador?.premiumAtivo===!0,M=e?.utilizador?.tipoConta===`profissional`||e?.utilizador?.tipo===`admin`,N=e?.tipo===`carro`,P=!N,F=N?u(e?.carro):``,I=e?.titulo||F||(N?`Automóvel`:`Imóvel`),L=N&&F&&F!==I,R=e?.fotos?.[0]||e?.imagens?.[0]||e?.imagem,z=s(R,`original`)||s(R,`large`)||s(R,`medium`)||s(R),B=o(R),V=c(R,{width:800,height:600}),H=(N?[{label:`Ano`,value:e?.carro?.ano||null},{label:`Km`,value:(e=>{let t=Number(e);return Number.isFinite(t)?`${new Intl.NumberFormat(`pt-PT`).format(t)} km`:null})(e?.carro?.km)},{label:`Combustível`,value:(e=>e?{gasolina:`Gasolina`,diesel:`Diesel`,eletrico:`Eletrico`,hibrido:`Hibrido`,gpl:`GPL`}[String(e).toLowerCase()]||e:null)(e?.carro?.combustivel)},{label:`Caixa`,value:e?.carro?.transmissao||null}]:[{label:`Tipologia`,value:e?.imovel?.tipologia||e?.imovel?.tipoImovel},{label:`Área`,value:(e=>{let t=Number(e);return!Number.isFinite(t)||t<=0?null:`${new Intl.NumberFormat(`pt-PT`).format(t)} m²`})(e?.imovel?.area)},{label:`Quartos`,value:e?.imovel?.quartos==null?null:`${e.imovel.quartos}`},{label:`Garagem`,value:e?.imovel?.garagem?`Sim`:null}]).filter(e=>e.value).slice(0,3),U=[e?.garantia&&{label:`Garantia`,tone:`trust`},e?.aceitaRetoma&&{label:`Retoma`,tone:`trust`},M&&{label:`Profissional`,tone:`business`}].filter(Boolean).slice(0,3),W=e=>{e.preventDefault(),e.stopPropagation(),b(!0)},G=e=>{e?.preventDefault(),e?.stopPropagation(),b(!1)};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`style`,{children:`
        /* ── CARD ── */
        .nxc-wrap {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color .18s ease, box-shadow .22s ease, transform .22s ease;
          color: #0f172a;
          position: relative;
          box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
          box-sizing: border-box;
          min-width: 250px;
        }
        .nxc-wrap * { box-sizing: border-box; }
        .nxc-wrap:hover {
          border-color: #94a3b8;
          box-shadow: 0 16px 32px -20px rgba(15, 23, 42, .28);
          transform: translateY(-3px);
        }
        .nxc-wrap:focus-visible {
          outline: 2px solid #102f50;
          outline-offset: 2px;
        }
        .nxc-wrap.is-imovel { border-color: rgba(107, 90, 54, .2); }
        .nxc-wrap.is-imovel:hover { border-color: rgba(120, 96, 49, .48); }

        /* ── PREMIUM / DESTAQUE: tem de se ver à distância, mesmo sem hover ── */
        .nxc-wrap.premium {
          border: 3px solid #d9c49c;
          background: linear-gradient(165deg, #fbf1d9 0%, #f9ecd0 45%, #f6e6c2 100%);
          box-shadow:
            0 0 0 1px rgba(217, 196, 156, .55),
            0 26px 50px -22px rgba(16, 47, 80, .4),
            0 0 0 6px rgba(217, 196, 156, .12);
        }
        .nxc-wrap.premium .nxc-footer { background: rgba(251, 241, 217, .6); border-top-color: rgba(217, 196, 156, .35); }
        .nxc-wrap.premium:hover {
          border-color: #c7a252;
          box-shadow:
            0 0 0 1px rgba(217, 196, 156, .75),
            0 34px 64px -22px rgba(16, 47, 80, .5),
            0 0 0 9px rgba(217, 196, 156, .18);
          transform: translateY(-6px) scale(1.008);
        }
        .nxc-wrap.premium::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 7px;
          background: linear-gradient(90deg, #0c2540 0%, #f5e6bf 22%, #d9c49c 45%, #f5e6bf 68%, #0c2540 100%);
          background-size: 220% 100%;
          z-index: 8;
          animation: nxc-shimmer 3s linear infinite;
        }
        @keyframes nxc-shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 220% 0; }
        }
        @keyframes nxc-badge-pulse {
          0%, 100% { box-shadow: 0 12px 24px -12px rgba(2,6,23,.8), 0 0 0 0 rgba(217,196,156,.55); }
          50% { box-shadow: 0 12px 24px -12px rgba(2,6,23,.8), 0 0 0 6px rgba(217,196,156,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nxc-wrap.premium::before { animation: none; }
          .nxc-badge-premium { animation: none !important; }
        }
        .nxc-wrap.premium .nxc-price { color: #102f50; }
        .nxc-wrap.premium .nxc-body { padding-top: 17px; }

        /* ── IMAGEM: fundo desfocado da própria foto + foto completa nítida por cima ── */
        .nxc-img {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #eef1f4;
        }
        .nxc-img-bg {
          position: absolute;
          inset: -12px;
          background-size: cover;
          background-position: center;
          filter: blur(18px) saturate(1.15) brightness(.92);
          transform: scale(1.08);
        }
        .nxc-img-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.38) 100%);
          z-index: 2;
          pointer-events: none;
        }
        .nxc-img-fg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          z-index: 1;
          opacity: 0;
          transition: opacity .3s ease, transform .5s ease;
        }
        .nxc-img-fg.loaded { opacity: 1; }
        .nxc-wrap:hover .nxc-img-fg { transform: scale(1.035); }

        .nxc-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #102f50;
          background: linear-gradient(135deg, rgba(217,196,156,.18), rgba(255,255,255,.85)), #f8fafc;
        }
        .nxc-placeholder-inner {
          display: grid;
          place-items: center;
          gap: 8px;
          color: #102f50;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .nxc-placeholder-inner svg { width: 42px; height: 42px; color: currentColor; opacity: .72; }
        .nxc-placeholder.is-imovel {
          color: #5f683a;
          background: radial-gradient(circle at 24% 22%, rgba(95,104,58,.16), transparent 34%), linear-gradient(135deg, rgba(224,214,189,.44), rgba(255,255,255,.9)), #f8fafc;
        }

        /* ── BADGES ── */
        .nxc-badge-premium {
          position: absolute;
          top: 14px; left: 14px;
          background: linear-gradient(135deg, #0c2540 0%, #1b4573 55%, #b9944e 100%);
          color: #fffaf0;
          font-size: 11.5px; font-weight: 900;
          padding: 8px 14px 8px 11px;
          border-radius: 999px;
          text-transform: uppercase; letter-spacing: .09em;
          display: flex; align-items: center; gap: 6px;
          z-index: 9;
          border: 1.5px solid rgba(255, 250, 240, 0.5);
          animation: nxc-badge-pulse 2.4s ease-in-out infinite;
        }
        .nxc-badge-premium svg { color: #f5e0ab; }

        .nxc-badge-status {
          position: absolute;
          top: 12px; left: 12px;
          font-size: 9px; font-weight: 900;
          padding: 5px 10px; border-radius: 7px;
          text-transform: uppercase; letter-spacing: .08em;
          z-index: 5;
          backdrop-filter: blur(4px);
        }

        .nxc-badge-tipo {
          position: absolute;
          bottom: 10px; left: 10px;
          background: rgba(15, 23, 42, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #f8fafc;
          font-size: 9px; font-weight: 800;
          padding: 4px 9px; border-radius: 6px;
          z-index: 5;
          text-transform: uppercase; letter-spacing: .06em;
          backdrop-filter: blur(4px);
        }

        .nxc-delete-btn {
          position: absolute;
          top: 12px; right: 12px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444; font-size: 9px; font-weight: 800;
          padding: 6px 10px; border-radius: 7px;
          cursor: pointer; z-index: 10;
          text-transform: uppercase; letter-spacing: .05em;
          transition: background-color .16s ease, color .16s ease, border-color .16s ease;
          display: flex; align-items: center; gap: 4px;
        }
        .nxc-delete-btn:hover { background: #ef4444; color: #fff; border-color: #ef4444; }

        .nxc-photo-count {
          position: absolute;
          bottom: 10px; right: 10px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #fff; font-size: 10px; font-weight: 700;
          padding: 5px 9px; border-radius: 6px;
          display: flex; align-items: center; gap: 4px; z-index: 5;
          backdrop-filter: blur(4px);
        }

        /* ── BODY ── */
        .nxc-body {
          padding: 14px 15px 15px;
          display: flex; flex-direction: column; flex: 1; gap: 10px;
        }
        .nxc-title { font-size: 14px; font-weight: 800; color: #0f172a; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .nxc-subtitle { margin-top: -4px; font-size: 11.5px; font-weight: 700; color: #64748b; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }

        /* ── ESPECIFICAÇÕES: uma linha de texto corrido, sem caixas nem ícones —
           nunca corta, quebra a palavra inteira para a linha seguinte se precisar. */
        .nxc-specs {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          line-height: 1.5;
        }
        .nxc-specs-sep { margin: 0 6px; color: #cbd5e1; font-weight: 400; }
        .nxc-wrap.is-imovel .nxc-specs { color: #7a8454; }

        .nxc-featured-note {
          width: max-content; max-width: 100%; min-height: 24px;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 9px; border: 1px solid rgba(217, 196, 156, .55); border-radius: 999px;
          background: linear-gradient(135deg, rgba(217,196,156,.22), rgba(217,196,156,.1)); color: #102f50;
          font-size: 12px; font-weight: 850; line-height: 1;
        }
        .nxc-trust-strip { display: flex; flex-wrap: wrap; gap: 5px; }
        .nxc-trust-pill { display: inline-flex; align-items: center; min-height: 22px; padding: 0 7px; border-radius: 999px; border: 1px solid #e2d1a9; background: #fff7e6; color: #102f50; font-size: 10px; font-weight: 850; white-space: nowrap; }
        .nxc-trust-pill.business { background: rgba(16,47,80,.08); border-color: rgba(16,47,80,.18); color: #102f50; }

        /* ── PREÇO: em destaque no fim do corpo, como na referência ── */
        .nxc-price-row { margin-top: auto; padding-top: 8px; }
        .nxc-price { font-family: var(--nx-font-display); font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -.02em; line-height: 1; }

        /* ── FOOTER ── */
        .nxc-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #ffffff; border-top: 1px solid #eef2f6; }
        .nxc-user { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .nxc-avatar { width: 26px; height: 26px; border-radius: 50%; background: #f8fafc; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #64748b; overflow: hidden; flex-shrink: 0; position: relative; }
        .nxc-avatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .nxc-username { min-width: 0; display: flex; align-items: center; gap: 4px; font-size: 12px; color: #475569; font-weight: 600; white-space: normal; overflow-wrap: anywhere; line-height: 1.2; }
        .nxc-username.mine { color: #0f172a; font-weight: 700; }
        .nxc-loc { display: flex; align-items: center; gap: 3px; font-size: 11px; color: #64748b; font-weight: 600; white-space: nowrap; flex-shrink: 0; }

        /* ── MODAL ── */
        .nxc-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.72); z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .nxc-modal-box { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; max-width: 400px; width: 100%; text-align: center; }
        .nxc-modal-icon { margin: 0 auto 20px; display: flex; justify-content: center; }
        .nxc-modal-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px; }
        .nxc-modal-text { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.6; }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; color: #475569; font-weight: 700; cursor: pointer; }
        .nxc-modal-delete { flex: 1; padding: 12px; border-radius: 8px; border: none; background: #ef4444; color: #fff; font-weight: 800; cursor: pointer; }

        @media (max-width: 640px) {
          .nxc-wrap { border-radius: 12px; min-width: 0; }
          .nxc-wrap.premium { border-width: 2px; }
          .nxc-badge-premium, .nxc-badge-status { top: 8px; left: 8px; padding: 5px 9px; font-size: 8.5px; }
          .nxc-badge-tipo { bottom: 8px; left: 8px; padding: 3px 7px; font-size: 8px; }
          .nxc-photo-count { right: 8px; bottom: 8px; padding: 3px 7px; font-size: 9px; }
          .nxc-body { padding: 11px 12px 12px; gap: 5px; }
          .nxc-price { font-size: 17px; }
          .nxc-title { font-size: 13px; line-height: 1.35; -webkit-line-clamp: 2; }
          .nxc-featured-note { min-height: 18px; padding: 3px 7px; font-size: 10px; }
          .nxc-specs { font-size: 11px; }
          .nxc-footer { padding: 9px 12px; }
        }

        .nxc-icon { flex: 0 0 auto; display: inline-block; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; vertical-align: middle; }
      `}),(0,f.jsxs)(i,{to:l(e),className:`nxc-wrap ${N?`is-carro`:`is-imovel`}${A?` premium`:``}`,children:[(0,f.jsxs)(`div`,{className:`nxc-img`,children:[z?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`div`,{className:`nxc-img-bg`,style:{backgroundImage:`url(${z})`}}),(0,f.jsx)(`div`,{className:`nxc-img-scrim`}),(0,f.jsx)(`img`,{className:`nxc-img-fg${x?` loaded`:``}`,src:z,srcSet:B||void 0,sizes:`(max-width: 720px) 100vw, 360px`,width:V.width,height:V.height,alt:I,loading:`lazy`,decoding:`async`,onLoad:()=>S(!0)})]}):(0,f.jsx)(`div`,{className:`nxc-placeholder ${P?`is-imovel`:`is-carro`}`,children:(0,f.jsxs)(`span`,{className:`nxc-placeholder-inner`,children:[(0,f.jsx)(m,{name:P?`home`:`car`,size:44}),P?`Imóvel sem foto`:`Automóvel sem foto`]})}),(0,f.jsx)(`span`,{className:`nxc-badge-tipo`,children:N?`Automóvel`:`Imóvel`}),A&&(0,f.jsxs)(`span`,{className:`nxc-badge-premium`,children:[(0,f.jsx)(m,{name:`star`,size:12}),` Destaque`]}),!A&&t&&e?.estado&&!k&&(0,f.jsx)(`span`,{className:`nxc-badge-status`,style:{background:E.bg,color:E.color,border:`1px solid ${E.border}`},children:E.label}),k&&(0,f.jsxs)(`button`,{type:`button`,className:`nxc-delete-btn`,onClick:W,children:[(0,f.jsx)(m,{name:`trash`,size:12}),` Apagar`]}),e?.fotos?.length>1&&(0,f.jsxs)(`div`,{className:`nxc-photo-count`,children:[(0,f.jsx)(m,{name:`camera`,size:12}),` `,e.fotos.length]})]}),(0,f.jsxs)(`div`,{className:`nxc-body`,children:[(0,f.jsx)(`div`,{className:`nxc-title`,children:I}),L&&(0,f.jsx)(`div`,{className:`nxc-subtitle`,children:F}),H.length>0&&(0,f.jsx)(`div`,{className:`nxc-specs`,children:H.map((e,t)=>(0,f.jsxs)(d.Fragment,{children:[t>0&&(0,f.jsx)(`span`,{className:`nxc-specs-sep`,children:`·`}),e.value]},e.label))}),A&&(0,f.jsxs)(`div`,{className:`nxc-featured-note`,children:[(0,f.jsx)(m,{name:`star`,size:12}),` Anúncio em destaque`]}),U.length>0&&(0,f.jsx)(`div`,{className:`nxc-trust-strip`,"aria-label":`Sinais de confiança`,children:U.map(e=>(0,f.jsx)(`span`,{className:`nxc-trust-pill ${e.tone||``}`.trim(),children:e.label},e.label))}),(0,f.jsx)(`div`,{className:`nxc-price-row`,children:(0,f.jsx)(`div`,{className:`nxc-price`,children:C})})]}),(0,f.jsxs)(`div`,{className:`nxc-footer`,children:[(0,f.jsxs)(`div`,{className:`nxc-user`,children:[(0,f.jsx)(`div`,{className:`nxc-avatar`,children:e?.utilizador?.avatarUrl?(0,f.jsx)(`img`,{src:e.utilizador.avatarUrl,alt:``}):w}),(0,f.jsxs)(`span`,{className:`nxc-username${k?` mine`:``}`,children:[k?`O teu anúncio`:e?.utilizador?.nome||`Anunciante`,j&&(0,f.jsx)(m,{name:`check`,size:13,color:`#2563eb`})]})]}),e?.localizacao?.cidade&&(0,f.jsxs)(`div`,{className:`nxc-loc`,children:[(0,f.jsx)(m,{name:`location`,size:13}),e.localizacao.cidade]})]})]}),y&&(0,f.jsx)(`div`,{className:`nxc-modal-overlay`,onClick:G,children:(0,f.jsxs)(`div`,{className:`nxc-modal-box`,onClick:e=>e.stopPropagation(),children:[(0,f.jsx)(`div`,{className:`nxc-modal-icon`,children:(0,f.jsx)(m,{name:`trash`,size:42,color:`#ef4444`})}),(0,f.jsx)(`h3`,{className:`nxc-modal-title`,children:`Eliminar anúncio?`}),(0,f.jsx)(`p`,{className:`nxc-modal-text`,children:`Esta ação é permanente e irreversível.`}),(0,f.jsxs)(`div`,{className:`nxc-modal-actions`,children:[(0,f.jsx)(`button`,{type:`button`,className:`nxc-modal-cancel`,onClick:G,disabled:_,children:`Cancelar`}),(0,f.jsx)(`button`,{type:`button`,className:`nxc-modal-delete`,onClick:async t=>{t.preventDefault(),t.stopPropagation(),v(!0);try{let t=e._id||e.id;if(!t)throw Error(`ID não encontrado.`);let i=await r.delete(`/anuncios/${t}`);if(i.status>=200&&i.status<300)b(!1),n?.(t);else throw Error(`Resposta inesperada.`)}catch(e){alert(e.response?.data?.erro||`Não foi possível eliminar. Tenta novamente.`),v(!1)}},disabled:_,children:_?`A apagar…`:`Apagar`})]})]})})]})}export{h as t};