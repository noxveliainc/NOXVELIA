const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MapaResultados-BBAchwQR.js","assets/jsx-runtime-On9Szgki.js","assets/index-DLKImtlB.js","assets/index-Cfo_4t-H.css","assets/MapaResultados-CcXJxNtP.css"])))=>i.map(i=>d[i]);
import{g as e,l as t,t as n,y as r}from"./jsx-runtime-On9Szgki.js";import{C as i,S as a,t as o,v as s,x as c}from"./index-DLKImtlB.js";import{L as l,Q as u,X as d,b as f,bt as p,dt as m,h as ee,w as te,wt as h,x as ne}from"./mdi-CgcECdTh.js";import{t as re}from"./Seo-Cp794OT8.js";import{t as ie}from"./AnuncioCard-CYUlDSlL.js";import{t as ae}from"./GoogleAdSlot-q8Hj0tht.js";import{t as oe}from"./SponsorBanner-DHeqhs2c.js";import{i as se,n as ce,r as g,t as le}from"./localizacoes-CvOZjRrK.js";var _=r(e(),1);function ue(e,t){let[n,r]=(0,_.useState)(e);return(0,_.useEffect)(()=>{let n=setTimeout(()=>{r(e)},t);return()=>{clearTimeout(n)}},[e,t]),n}var v=h(),y=n(),de=[`T0`,`T1`,`T2`,`T3`,`T4`,`T5+`],fe=[`Gasolina`,`Diesel`,`Eléctrico`,`Híbrido`,`GPL`],pe=[`Manual`,`Automático`],me=(0,_.lazy)(()=>o(()=>import(`./MapaResultados-BBAchwQR.js`),__vite__mapDeps([0,1,2,3,4]))),b=e=>String(e||``).split(`,`).map(e=>e.trim()).filter(Boolean);function x({tipoPadrao:e=`imovel`,seoParams:n=null}){let[r]=i(),o=t(),h=o.pathname.includes(`carro`)?`carro`:e||`imovel`,x=e=>n?.get(e)||r.get(e)||``,he=n?.toString()||``,ge=x(`marca`),_e=h===`carro`&&g.includes(ge)?ge:``,S=()=>({tipo:h,precoMin:``,precoMax:x(`precoMax`),distrito:x(`distrito`)||`Todos`,cidade:x(`cidade`),marca:_e,modelo:x(`modelo`),tipologias:b(x(`tipologia`)),combustiveis:b(x(`combustivel`)),transmissao:b(x(`transmissao`))}),ve=S(),ye=s(o,h===`carro`?`/carros`:`/imoveis`),[C,w]=(0,_.useState)([]),[T,be]=(0,_.useState)([]),[E,D]=(0,_.useState)(!1),[xe,O]=(0,_.useState)(!1),[k,A]=(0,_.useState)(null),[Se,Ce]=(0,_.useState)(0),[j,we]=(0,_.useState)(`relevancia`),[M,N]=(0,_.useState)(x(`q`)),[P,F]=(0,_.useState)(!1),[Te,I]=(0,_.useState)(!1),[L,Ee]=(0,_.useState)(!0),[R,z]=(0,_.useState)(`grelha`),[B,V]=(0,_.useState)(ve),H=(0,_.useRef)(null),U=(0,_.useRef)(!1),W=(0,_.useRef)(1),G=(0,_.useRef)(B),K=(0,_.useRef)(j),q=(0,_.useRef)(j),J=(0,_.useRef)(``),De=(0,_.useRef)(!1),Y=ue(M,300);(0,_.useEffect)(()=>{G.current=B},[B]),(0,_.useEffect)(()=>{K.current=j},[j]),(0,_.useEffect)(()=>{let e=()=>I(e=>!e);return window.addEventListener(`toggle-filtros`,e),()=>window.removeEventListener(`toggle-filtros`,e)},[]);let Oe=(0,_.useCallback)(async()=>{try{let e=G.current,t=J.current,n=e.tipo||h,r=new URLSearchParams;r.set(`tipo`,n),e.distrito&&e.distrito!==`Todos`&&r.set(`distrito`,e.distrito),e.cidade&&r.set(`cidade`,e.cidade),e.tipologias.length&&r.set(`tipologia`,e.tipologias.join(`,`)),e.precoMax&&r.set(`precoMax`,e.precoMax),t&&t.trim()&&r.set(`q`,t.trim()),n===`carro`&&(e.marca&&r.set(`marca`,e.marca),e.modelo&&r.set(`modelo`,e.modelo),e.combustiveis.length&&r.set(`combustivel`,e.combustiveis.join(`,`)),e.transmissao.length&&r.set(`transmissao`,e.transmissao.join(`,`))),n===`imovel`&&e.tipologias.length&&r.set(`tipologia`,e.tipologias.join(`,`));let{data:i}=await c.get(`/anuncios/pesquisa/mapa?${r.toString()}`);be(Array.isArray(i)?i:[])}catch(e){console.warn(`Erro ao carregar mapa:`,e)}},[h]),X=(0,_.useCallback)(async(t,n=!1,r=null)=>{if(!U.current){U.current=!0,t===1?D(!0):O(!0),A(null);try{let i=G.current,a=K.current,s=J.current,l=new URLSearchParams,u=r||i.tipo;(!u||u===`undefined`)&&(u=o.pathname.includes(`carro`)?`carro`:e||`imovel`),l.set(`tipo`,u),l.set(`page`,t),l.set(`limit`,12),l.set(`sort`,a),s&&s.trim()&&l.set(`q`,s.trim()),i.precoMax&&l.set(`precoMax`,i.precoMax),i.distrito&&i.distrito!==`Todos`&&l.set(`distrito`,i.distrito),i.cidade&&l.set(`cidade`,i.cidade),u===`carro`&&(i.marca&&l.set(`marca`,i.marca),i.modelo&&l.set(`modelo`,i.modelo),i.combustiveis.length&&l.set(`combustivel`,i.combustiveis.join(`,`)),i.transmissao.length&&l.set(`transmissao`,i.transmissao.join(`,`))),u===`imovel`&&i.tipologias.length&&l.set(`tipologia`,i.tipologias.join(`,`));let{data:d}=await c.get(`/anuncios?${l.toString()}`),f=d.anuncios||(Array.isArray(d)?d:[]),p=d.totalAnuncios===void 0?f.length:d.totalAnuncios;w(n?e=>[...e,...f]:f),Ce(p);let m=f.length===12;F(m),m&&(W.current=t)}catch{A(`Falha ao atualizar dados.`),F(!1)}finally{D(!1),O(!1),U.current=!1}}},[e,o.pathname]);(0,_.useEffect)(()=>{let e=S(),t=x(`q`);G.current=e,V(e),I(!1),F(!1),w([]),N(t),J.current=t,W.current=1;let n=setTimeout(()=>{X(1,!1,h)},50);return()=>clearTimeout(n)},[h,_e,o.search,he,X]),(0,_.useEffect)(()=>{if(q.current===j)return;q.current=j;let e=!1,t,n=()=>{if(!e){if(U.current){t=setTimeout(n,80);return}F(!1),w([]),W.current=1,X(1,!1,G.current.tipo)}};return n(),()=>{e=!0,clearTimeout(t)}},[j,X]),(0,_.useEffect)(()=>{if(J.current=Y,!De.current){De.current=!0;return}F(!1),w([]),W.current=1,X(1,!1,null)},[Y]),(0,_.useEffect)(()=>{if(R!==`mapa`)return;let e=setTimeout(()=>{Oe()},60);return()=>clearTimeout(e)},[h,B.distrito,B.cidade,B.precoMax,B.marca,B.modelo,B.tipologias,B.combustiveis,B.transmissao,Y,Oe,R]),(0,_.useEffect)(()=>{if(!P||R===`mapa`)return;let e=new IntersectionObserver(e=>{if(e[0].isIntersecting){let e=W.current+1;X(e,!0,G.current.tipo)}},{rootMargin:`200px`,threshold:.1}),t=H.current;return t&&e.observe(t),()=>e.disconnect()},[P,X,R]);let Z=(e,t)=>{V(n=>{let r=n[e]||[],i=r.includes(t)?r.filter(e=>e!==t):[...r,t];return{...n,[e]:i}})},ke=()=>{F(!1),w([]),W.current=1,setTimeout(()=>{X(1,!1,G.current.tipo)},50),I(!1)},Ae=B.marca?se(B.marca):[],je=B.distrito&&B.distrito!==`Todos`?ce[B.distrito]:[],Q=h===`carro`?`var(--nx-accent-car)`:`var(--nx-accent-home)`,$=[B.precoMax&&`Ate ${Number(B.precoMax).toLocaleString(`pt-PT`)} EUR`,B.distrito!==`Todos`&&B.distrito,B.cidade,B.marca,B.modelo,...B.tipologias,...B.combustiveis,...B.transmissao,M.trim()&&`"${M.trim()}"`].filter(Boolean);return(0,y.jsxs)(y.Fragment,{children:[!n&&(0,y.jsx)(re,{title:h===`carro`?`Carros usados e novos em Portugal | Noxvelia`:`Imóveis para venda em Portugal | Noxvelia`,description:h===`carro`?`Pesquisa carros usados e novos em Portugal por marca, modelo, preço e localização.`:`Pesquisa apartamentos, moradias e terrenos em Portugal por tipologia, preço e localização.`,path:h===`carro`?`/carros`:`/imoveis`}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`style`,{children:`
        .pesquisa-root { background: var(--nx-bg); font-family: var(--nx-font-body); color: var(--nx-text); min-height: 100vh; display: flex; flex-direction: column; }
        .pesquisa-layout { display: flex; max-width: 1400px; margin: 0 auto; width: 100%; padding: 32px; gap: 24px; flex: 1; align-items: flex-start; }

        .pesquisa-sidebar { width: 320px; flex-shrink: 0; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-lg); padding: 24px; position: sticky; top: 96px; max-height: calc(100vh - 120px); overflow-y: auto; box-shadow: 0 18px 40px -28px rgba(15,23,42,0.35); transition: width 0.25s ease, opacity 0.2s ease, padding 0.25s ease, border-color 0.25s ease; }
        .pesquisa-sidebar::-webkit-scrollbar { width: 4px; }
        .pesquisa-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pesquisa-sidebar::-webkit-scrollbar-thumb { background: var(--nx-border); border-radius: 4px; }

        .pesquisa-sidebar.collapsed { width: 0; min-width: 0; padding: 0; border: none; opacity: 0; overflow: hidden; pointer-events: none; }

        .pesquisa-sidebar-toggle { flex-shrink: 0; width: 28px; height: 48px; border-radius: 8px; border: 1px solid var(--nx-border); background: var(--nx-bg-2); color: var(--nx-text-sub); cursor: pointer; display: flex; align-items: center; justify-content: center; position: sticky; top: 96px; transition: all 0.2s ease; }
        .pesquisa-sidebar-toggle:hover { background: var(--nx-border); color: var(--nx-text); }

        .pesquisa-sidebar-header { display: flex; align-items: center; gap: 8px; font-family: var(--nx-font-display); font-size: 18px; font-weight: 800; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--nx-border); }
        .pesquisa-filter-status { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: -8px 0 20px; }
        .pesquisa-filter-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px; }
        .pesquisa-filter-stat strong { display: block; font-size: 17px; color: #0f172a; font-family: var(--nx-font-display); line-height: 1; }
        .pesquisa-filter-stat span { display: block; margin-top: 5px; font-size: 10px; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }
        .pesquisa-filter-group { margin-bottom: 24px; }
        .pesquisa-filter-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--nx-text-sub); margin-bottom: 12px; }

        .pesquisa-filter-input { width: 100%; padding: 12px 14px; border: 1px solid var(--nx-input-border); border-radius: var(--nx-radius-sm); font-size: 14px; font-family: var(--nx-font-body); color: var(--nx-text); outline: none; background: var(--nx-input-bg); box-sizing: border-box; transition: all 0.2s ease; }
        .pesquisa-filter-input:focus { border-color: var(--nx-accent-car); }

        .pesquisa-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pesquisa-tag { padding: 8px 12px; border: 1px solid var(--nx-border); border-radius: 6px; background: var(--nx-bg-3); font-size: 12px; font-weight: 600; cursor: pointer; color: var(--nx-text-sub); transition: all 0.2s ease; flex: 1 1 calc(50% - 8px); text-align: center; }
        .pesquisa-tag:hover { background: var(--nx-border); color: var(--nx-text); }
        .pesquisa-tag.active { background: ${Q}; color: #040711; border-color: ${Q}; }

        .pesquisa-apply-btn { width: 100%; padding: 14px; background: var(--nx-text); color: var(--nx-bg); border: none; border-radius: var(--nx-radius-sm); font-family: var(--nx-font-body); font-weight: 800; font-size: 13px; cursor: pointer; transition: opacity 0.2s ease; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 8px; }
        .pesquisa-apply-btn:hover { opacity: 0.85; }

        .pesquisa-main-content { flex: 1; min-width: 0; display: flex; flex-direction: column; }

        .pesquisa-command {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: 22px 24px;
          margin-bottom: 18px;
          box-shadow: 0 18px 40px -30px rgba(15,23,42,0.35);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 20px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .pesquisa-command::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: ${Q}; }
        .pesquisa-command-kicker { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
        .pesquisa-command h1 { margin: 0; font-size: clamp(24px, 3vw, 34px); line-height: 1.08; letter-spacing: -0.02em; color: #0f172a; }
        .pesquisa-command p { margin: 8px 0 0; color: #64748b; font-size: 14px; line-height: 1.6; max-width: 640px; }
        .pesquisa-command-metrics { display: grid; grid-template-columns: repeat(2, 118px); gap: 10px; }
        .pesquisa-command-metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 12px; }
        .pesquisa-command-metric strong { display: block; font-family: var(--nx-font-display); font-size: 22px; line-height: 1; color: #0f172a; }
        .pesquisa-command-metric span { display: block; margin-top: 6px; color: #64748b; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; }

        .pesquisa-search-row { display: flex; gap: 12px; align-items: stretch; margin-bottom: 24px; }
        .pesquisa-search-row .pesquisa-omnibar-wrapper { margin-bottom: 0; flex: 1; }

        .pesquisa-omnibar-wrapper { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: var(--nx-radius-md); display: flex; align-items: center; padding: 10px 20px; box-shadow: 0 10px 26px -24px rgba(15,23,42,0.45); }
        .pesquisa-omnibar-wrapper:focus-within { border-color: ${Q}; box-shadow: 0 0 0 3px rgba(42,193,180,0.12); }
        .pesquisa-omnibar-wrapper input { flex: 1; border: none; padding: 8px; font-size: 15px; color: var(--nx-text); outline: none; background: transparent; }

        .pesquisa-mobile-filter-btn { display: none; align-items: center; gap: 6px; padding: 0 18px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-md); color: var(--nx-text); font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; flex-shrink: 0; }

        .pesquisa-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .pesquisa-results-count { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 900; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 999px; padding: 8px 11px; text-transform: uppercase; letter-spacing: .06em; }
        .pesquisa-sort { border: 1px solid #e2e8f0; background: #ffffff; border-radius: 12px; padding: 10px 34px 10px 12px; font-family: var(--nx-font-body); font-size: 13px; font-weight: 800; color: var(--nx-text); cursor: pointer; outline: none; }
        .pesquisa-active-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin: -8px 0 22px; min-height: 34px; }
        .pesquisa-active-chip { display: inline-flex; align-items: center; gap: 6px; border: 1px solid #dbeafe; background: #eff6ff; color: #2563eb; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; }
        .pesquisa-clear-btn { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #64748b; border: 1px solid #e2e8f0; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; cursor: pointer; }
        .pesquisa-clear-btn:hover { border-color: #cbd5e1; color: #0f172a; }

        .pesquisa-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 24px; }

        .pesquisa-root { background: var(--nx-bg); }
        .pesquisa-layout {
          max-width: 1480px;
          padding: 28px;
          gap: 18px;
        }
        .pesquisa-sidebar {
          background: rgba(255,255,255,0.92);
          border-color: rgba(226,232,240,0.92);
          border-radius: 18px;
          box-shadow: 0 28px 70px -52px rgba(15,23,42,0.8);
        }
        .pesquisa-sidebar-toggle {
          background: rgba(255,255,255,0.92);
          border-color: rgba(226,232,240,0.92);
          box-shadow: 0 16px 34px -30px rgba(15,23,42,0.6);
        }
        .pesquisa-command {
          background: #ffffff;
          border-color: #e2e8f0;
          color: #0f172a;
          border-radius: 18px;
          box-shadow: 0 22px 54px -44px rgba(15,23,42,0.45);
        }
        .pesquisa-command::before { width: 4px; }
        .pesquisa-command-kicker { color: #64748b; }
        .pesquisa-command h1 { color: #0f172a; }
        .pesquisa-command p { color: #64748b; }
        .pesquisa-command-metric {
          background: #f8fafc;
          border-color: #e2e8f0;
        }
        .pesquisa-command-metric strong { color: #0f172a; }
        .pesquisa-command-metric span { color: #64748b; }
        .pesquisa-search-row {
          background: rgba(255,255,255,0.94);
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 10px;
          box-shadow: 0 22px 54px -46px rgba(15,23,42,0.7);
        }
        .pesquisa-omnibar-wrapper {
          border: none;
          box-shadow: none;
          background: #f8fafc;
        }
        .pesquisa-topbar {
          gap: 16px;
          flex-wrap: wrap;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 12px 14px;
          box-shadow: 0 18px 42px -36px rgba(15,23,42,0.45);
        }
        .pesquisa-view-tools {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pesquisa-view-switch {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #f8fafc;
        }
        .pesquisa-view-switch button {
          min-height: 36px;
          border: none;
          border-radius: 10px;
          padding: 0 12px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          color: #64748b;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }
        .pesquisa-view-switch button:hover { color: #0f172a; }
        .pesquisa-view-switch button.active {
          background: ${Q};
          color: #020617;
          box-shadow: 0 8px 18px -14px ${Q};
        }
        .pesquisa-map-shell {
          position: relative;
          height: min(720px, calc(100vh - 260px));
          min-height: 520px;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          background: #e2e8f0;
          box-shadow: 0 24px 64px -46px rgba(15,23,42,0.55);
        }
        .pesquisa-map-empty {
          position: absolute;
          left: 50%;
          top: 22px;
          transform: translateX(-50%);
          z-index: 500;
          background: rgba(15,23,42,0.88);
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 14px 30px -20px rgba(0,0,0,0.9);
        }
        .pesquisa-map-loading {
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--nx-bg-2);
          color: var(--nx-text-sub);
          font-size: 13px;
          font-weight: 800;
        }

        .dark .pesquisa-root { background: #020617; }
        .dark .pesquisa-sidebar,
        .dark .pesquisa-sidebar-toggle,
        .dark .pesquisa-search-row,
        .dark .pesquisa-topbar {
          background: rgba(15, 23, 42, 0.94) !important;
          border-color: rgba(71, 85, 105, 0.8) !important;
          box-shadow: 0 24px 64px -48px rgba(0,0,0,0.95) !important;
        }
        .dark .pesquisa-omnibar-wrapper,
        .dark .pesquisa-filter-stat,
        .dark .pesquisa-view-switch,
        .dark .pesquisa-results-count,
        .dark .pesquisa-sort,
        .dark .pesquisa-clear-btn,
        .dark .pesquisa-active-chip {
          background: rgba(30, 41, 59, 0.92) !important;
          border-color: rgba(71, 85, 105, 0.9) !important;
          color: #e2e8f0 !important;
        }
        .dark .pesquisa-filter-stat strong,
        .dark .pesquisa-command h1,
        .dark .pesquisa-command-metric strong {
          color: #f8fafc !important;
        }
        .dark .pesquisa-filter-stat span,
        .dark .pesquisa-command-kicker,
        .dark .pesquisa-command p,
        .dark .pesquisa-command-metric span {
          color: #94a3b8 !important;
        }
        .dark .pesquisa-view-switch button,
        .dark .pesquisa-filter-title,
        .dark .pesquisa-tag {
          color: #cbd5e1 !important;
        }
        .dark .pesquisa-view-switch button:hover,
        .dark .pesquisa-clear-btn:hover {
          color: #ffffff !important;
        }
        .dark .pesquisa-view-switch button.active,
        .dark .pesquisa-tag.active {
          color: #020617 !important;
        }
        .dark .pesquisa-map-shell {
          background: #0f172a;
          border-color: #334155;
          box-shadow: 0 28px 70px -48px rgba(0,0,0,0.95);
        }

        .sidebar-mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 9998; backdrop-filter: blur(4px); }

        @media (max-width: 1024px) {
          .pesquisa-layout { padding: 24px 16px; flex-direction: column; }
          .pesquisa-sidebar { position: fixed; top: 0; left: ${Te?`0`:`-100%`}; height: 100vh; max-height: 100vh; border-radius: 0; z-index: 9999; transition: left 0.3s ease; width: 85%; max-width: 360px; opacity: 1; }
          .pesquisa-sidebar.collapsed { width: 85%; max-width: 360px; padding: 24px; border: 1px solid var(--nx-border); opacity: 1; pointer-events: auto; }
          .sidebar-mobile-overlay { display: ${Te?`block`:`none`}; }
          .pesquisa-sidebar-toggle { display: none; }
          .pesquisa-mobile-filter-btn { display: inline-flex; }
          .pesquisa-main-content { width: 100%; }
          .pesquisa-command { grid-template-columns: 1fr; }
          .pesquisa-command-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        .pesquisa-empty { text-align: center; padding: 100px 20px; color: var(--nx-text-sub); }
        .pesquisa-empty-action { margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 18px; border-radius: 12px; background: ${Q}; color: #020617; text-decoration: none; font-size: 13px; font-weight: 900; }
        .pesquisa-empty-action:hover { filter: brightness(0.96); }
        .infinite-spinner-container { text-align: center; padding: 40px 0; font-size: 13px; color: var(--nx-text-sub); font-weight: 500; grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--nx-text-sub); border-radius: 50%; display: inline-block; animation: pulse 0.6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: 0.2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }
      `}),(0,y.jsxs)(`div`,{className:`pesquisa-root`,children:[(0,y.jsx)(`div`,{className:`sidebar-mobile-overlay`,onClick:()=>I(!1)}),(0,y.jsxs)(`div`,{className:`pesquisa-layout vista-${R}`,children:[(0,y.jsxs)(`aside`,{className:`pesquisa-sidebar${L?``:` collapsed`}`,children:[(0,y.jsxs)(`div`,{className:`pesquisa-sidebar-header`,children:[(0,y.jsx)(v.Icon,{path:l,size:1}),` Filtros Avançados`]}),(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Orçamento Máximo (€)`}),(0,y.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Ex: 120000`,value:B.precoMax,onChange:e=>V(t=>({...t,precoMax:e.target.value}))})]}),(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Distrito / Região`}),(0,y.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.distrito,onChange:e=>V(t=>({...t,distrito:e.target.value,cidade:``})),children:[(0,y.jsx)(`option`,{value:`Todos`,children:`Portugal (Todos)`}),le.map(e=>(0,y.jsx)(`option`,{value:e,children:e},e))]})]}),(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Cidade / Concelho`}),(0,y.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.cidade,onChange:e=>V(t=>({...t,cidade:e.target.value})),disabled:!B.distrito||B.distrito===`Todos`,children:[(0,y.jsx)(`option`,{value:``,children:B.distrito&&B.distrito!==`Todos`?`Todas as Cidades`:`Escolhe o Distrito Primeiro`}),je.map(e=>(0,y.jsx)(`option`,{value:e,children:e},e))]})]}),h===`carro`?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Marca do Veículo`}),(0,y.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.marca,onChange:e=>V(t=>({...t,marca:e.target.value,modelo:``})),children:[(0,y.jsx)(`option`,{value:``,children:`Todas as Marcas`}),g.map(e=>(0,y.jsx)(`option`,{value:e,children:e},e))]})]}),(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Modelo Específico`}),(0,y.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.modelo,onChange:e=>V(t=>({...t,modelo:e.target.value})),disabled:!B.marca,children:[(0,y.jsx)(`option`,{value:``,children:B.marca?`Todos os Modelos`:`Escolha a Marca Primeiro`}),Ae.map((e,t)=>{let n=typeof e==`object`?e.modelo||e.nome||``:e;return(0,y.jsx)(`option`,{value:n,children:n},`mod-${t}`)})]})]}),(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Combustível`}),(0,y.jsx)(`div`,{className:`pesquisa-tags`,children:fe.map(e=>(0,y.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.combustiveis.includes(e)?`active`:``}`,onClick:()=>Z(`combustiveis`,e),children:e},e))})]}),(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Caixa / Transmissão`}),(0,y.jsx)(`div`,{className:`pesquisa-tags`,children:pe.map(e=>(0,y.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.transmissao.includes(e)?`active`:``}`,onClick:()=>Z(`transmissao`,e),children:e},e))})]})]}):(0,y.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,y.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipologias disponíveis`}),(0,y.jsx)(`div`,{className:`pesquisa-tags`,children:de.map(e=>(0,y.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.tipologias.includes(e)?`active`:``}`,onClick:()=>Z(`tipologias`,e),children:e},e))})]}),(0,y.jsx)(`button`,{type:`button`,className:`pesquisa-apply-btn`,onClick:ke,children:`Aplicar Filtros`})]}),(0,y.jsx)(`button`,{type:`button`,className:`pesquisa-sidebar-toggle`,onClick:()=>Ee(e=>!e),title:L?`Ocultar filtros`:`Mostrar filtros`,children:(0,y.jsx)(v.Icon,{path:L?f:ne,size:.9})}),(0,y.jsxs)(`main`,{className:`pesquisa-main-content`,children:[(0,y.jsxs)(`div`,{className:`pesquisa-search-row`,children:[(0,y.jsxs)(`button`,{type:`button`,className:`pesquisa-mobile-filter-btn`,onClick:()=>I(!0),children:[(0,y.jsx)(v.Icon,{path:l,size:.8}),`Filtros`]}),(0,y.jsxs)(`div`,{className:`pesquisa-omnibar-wrapper`,children:[(0,y.jsx)(v.Icon,{path:d,size:.9,color:`var(--nx-text-sub)`,style:{marginRight:`12px`}}),(0,y.jsx)(`input`,{type:`text`,placeholder:h===`carro`?`Pesquisar por marca, modelo, versão...`:`Pesquisar por título, características...`,value:M,onChange:e=>N(e.target.value)}),E&&(0,y.jsx)(v.Icon,{path:`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,size:.9,color:Q,className:`animate-spin`})]})]}),(0,y.jsx)(`div`,{className:`pesquisa-active-row`,children:$.length>0?(0,y.jsxs)(y.Fragment,{children:[$.slice(0,7).map(e=>(0,y.jsxs)(`span`,{className:`pesquisa-active-chip`,children:[(0,y.jsx)(v.Icon,{path:m,size:.55}),` `,e]},e)),$.length>7&&(0,y.jsxs)(`span`,{className:`pesquisa-active-chip`,children:[`+`,$.length-7]}),(0,y.jsxs)(`button`,{type:`button`,className:`pesquisa-clear-btn`,onClick:()=>{let e={tipo:h,precoMin:``,precoMax:``,distrito:`Todos`,cidade:``,marca:``,modelo:``,tipologias:[],combustiveis:[],transmissao:[]};G.current=e,V(e),N(``),J.current=``,F(!1),w([]),W.current=1,setTimeout(()=>{X(1,!1,h)},50)},children:[(0,y.jsx)(v.Icon,{path:te,size:.6}),` Limpar`]})]}):(0,y.jsxs)(`span`,{className:`pesquisa-active-chip`,style:{background:`#f8fafc`,color:`#64748b`,borderColor:`#e2e8f0`},children:[(0,y.jsx)(v.Icon,{path:ee,size:.6}),` Exploração livre`]})}),k&&(0,y.jsx)(`div`,{style:{color:`var(--nx-danger)`,padding:`16px`,background:`rgba(239, 68, 68, 0.1)`,borderRadius:`8px`,fontSize:`14px`,fontWeight:500,border:`1px solid rgba(239, 68, 68, 0.2)`,marginBottom:`24px`},children:k}),(0,y.jsxs)(`div`,{className:`pesquisa-topbar`,children:[(0,y.jsx)(`div`,{className:`pesquisa-results-count`,children:E&&C.length===0?`A procurar...`:`${Se} registos`}),(0,y.jsxs)(`div`,{className:`pesquisa-view-tools`,children:[(0,y.jsxs)(`div`,{className:`pesquisa-view-switch`,"aria-label":`Alternar vista`,children:[(0,y.jsxs)(`button`,{type:`button`,className:R===`grelha`?`active`:``,onClick:()=>z(`grelha`),children:[(0,y.jsx)(v.Icon,{path:p,size:.72}),` Grelha`]}),(0,y.jsxs)(`button`,{type:`button`,className:R===`mapa`?`active`:``,onClick:()=>z(`mapa`),children:[(0,y.jsx)(v.Icon,{path:u,size:.72}),` Mapa`]})]}),(0,y.jsxs)(`select`,{className:`pesquisa-sort`,value:j,onChange:e=>we(e.target.value),children:[(0,y.jsx)(`option`,{value:`relevancia`,style:{background:`var(--nx-bg-2)`},children:`Relevância`}),(0,y.jsx)(`option`,{value:`preco_asc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais Baixo`}),(0,y.jsx)(`option`,{value:`preco_desc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais Alto`})]})]})]}),(0,y.jsx)(oe,{placement:`search_results_top`,vertical:h,className:`!my-6 !px-0`,fallback:(0,y.jsx)(ae,{placement:`search_results_top`,className:`!my-6 !px-0`,minHeight:96})}),R===`mapa`?(0,y.jsxs)(`div`,{className:`pesquisa-map-shell`,children:[(0,y.jsx)(_.Suspense,{fallback:(0,y.jsx)(`div`,{className:`pesquisa-map-loading`,children:`A carregar mapa...`}),children:(0,y.jsx)(me,{anuncios:T,tipo:h})}),T.length===0&&!E&&(0,y.jsx)(`div`,{className:`pesquisa-map-empty`,children:`Sem resultados com coordenadas para mostrar no mapa.`})]}):(0,y.jsxs)(`div`,{className:`pesquisa-grid`,children:[C.map(e=>(0,y.jsx)(ie,{anuncio:e,showStatus:!1},e._id)),P&&!E&&C.length>0&&(0,y.jsxs)(`div`,{ref:H,className:`infinite-spinner-container`,children:[(0,y.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,y.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,y.jsx)(`div`,{className:`infinite-dot-pulse`})]})]}),R===`grelha`&&xe&&(0,y.jsxs)(`div`,{className:`infinite-spinner-container`,style:{marginTop:`24px`},children:[(0,y.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,y.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,y.jsx)(`div`,{className:`infinite-dot-pulse`})]}),R===`grelha`&&!E&&C.length===0&&(0,y.jsxs)(`div`,{className:`pesquisa-empty`,children:[(0,y.jsx)(`div`,{style:{fontSize:`32px`,color:`var(--nx-text-muted)`,marginBottom:`16px`},children:`∅`}),(0,y.jsx)(`h3`,{style:{fontFamily:`var(--nx-font-display)`,fontSize:`18px`,fontWeight:700,color:`var(--nx-text)`,margin:`0 0 8px 0`},children:h===`carro`?`Ainda não há carros ativos no Drive`:`Ainda não há imóveis ativos no Estate`}),(0,y.jsx)(`p`,{style:{fontSize:`14px`,margin:0},children:$.length>0?`Tenta limpar alguns filtros na barra lateral.`:`Quando houver anúncios ativos, aparecem aqui automaticamente.`}),(0,y.jsx)(a,{to:`/publicar`,state:ye,className:`pesquisa-empty-action`,children:`Publicar anúncio`})]})]})]})]})]})]})}export{x as t};