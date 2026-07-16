const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MapaResultados-CKaBs8PU.js","assets/jsx-runtime-On9Szgki.js","assets/index-BZDLs_Cz.js","assets/index-BuZ8BbjI.css","assets/MapaResultados-CcXJxNtP.css"])))=>i.map(i=>d[i]);
import{g as e,l as t,t as n,u as r,y as i}from"./jsx-runtime-On9Szgki.js";import{D as a,E as o,S as s,T as c,t as l,w as u}from"./index-BZDLs_Cz.js";import{Ft as d,T as f,U as p,b as m,bt as ee,c as te,h as ne,it as re,jt as ie,nt as ae,x as oe}from"./mdi-CnOwmxTs.js";import{t as se}from"./Seo-CW40BSL4.js";import{t as ce}from"./AnuncioCard-B5kVHP4f.js";import{t as le}from"./GoogleAdSlot-51SDhZU4.js";import{t as ue}from"./SponsorBanner-BXtMtXb-.js";import{i as de,n as fe,r as pe,t as me}from"./localizacoes-CvOZjRrK.js";var h=i(e(),1);function he(e,t){let[n,r]=(0,h.useState)(e);return(0,h.useEffect)(()=>{let n=setTimeout(()=>{r(e)},t);return()=>{clearTimeout(n)}},[e,t]),n}var g=d(),_=n(),ge=[`T0`,`T1`,`T2`,`T3`,`T4`,`T5+`],v=[{value:`apartamento`,label:`Apartamento`},{value:`moradia`,label:`Moradia`},{value:`terreno`,label:`Terreno`},{value:`loja`,label:`Loja`},{value:`escritorio`,label:`Escritorio`}],_e=[`Gasolina`,`Diesel`,`Eléctrico`,`Híbrido`,`GPL`],ve=[`Manual`,`Automático`],ye=(0,h.lazy)(()=>l(()=>import(`./MapaResultados-CKaBs8PU.js`),__vite__mapDeps([0,1,2,3,4]))),y=e=>String(e||``).split(`,`).map(e=>e.trim()).filter(Boolean);function b({tipoPadrao:e=`imovel`,seoParams:n=null}){let[i]=a(),l=t(),d=r(),{signed:b}=u(),x=l.pathname.includes(`carro`)?`carro`:e||`imovel`,be=i.toString(),S=n?.toString()||``,C=(0,h.useMemo)(()=>({search:new URLSearchParams(be),seo:S?new URLSearchParams(S):null}),[be,S]),w=(0,h.useCallback)(e=>C.seo?.get(e)||C.search.get(e)||``,[C]),xe=w(`marca`),Se=x===`carro`&&pe.includes(xe)?xe:``,T=w(`q`),E=(0,h.useCallback)(()=>({tipo:x,precoMin:``,precoMax:w(`precoMax`),distrito:w(`distrito`)||`Todos`,cidade:w(`cidade`),marca:Se,modelo:w(`modelo`),tiposImovel:y(w(`tipoImovel`)),tipologias:y(w(`tipologia`)),combustiveis:y(w(`combustivel`)),transmissao:y(w(`transmissao`))}),[w,Se,x]),D=(0,h.useMemo)(()=>E(),[E]),Ce=s(l,x===`carro`?`/carros`:`/imoveis`),[O,k]=(0,h.useState)([]),[A,we]=(0,h.useState)([]),[j,M]=(0,h.useState)(!1),[Te,Ee]=(0,h.useState)(!1),[De,Oe]=(0,h.useState)(null),[ke,Ae]=(0,h.useState)(0),[N,je]=(0,h.useState)(`relevancia`),[P,F]=(0,h.useState)(T),[I,L]=(0,h.useState)(!1),[R,z]=(0,h.useState)(!1),[B,Me]=(0,h.useState)(!0),[V,Ne]=(0,h.useState)(`grelha`),[Pe,Fe]=(0,h.useState)(!1),[Ie,H]=(0,h.useState)(``),[U,W]=(0,h.useState)(D),Le=(0,h.useRef)(null),G=(0,h.useRef)(!1),K=(0,h.useRef)(1),q=(0,h.useRef)(U),Re=(0,h.useRef)(N),ze=(0,h.useRef)(N),J=(0,h.useRef)(``),Be=(0,h.useRef)(!1),Y=he(P,300);(0,h.useEffect)(()=>{q.current=U},[U]),(0,h.useEffect)(()=>{Re.current=N},[N]),(0,h.useEffect)(()=>{let e=()=>z(e=>!e);return window.addEventListener(`toggle-filtros`,e),()=>window.removeEventListener(`toggle-filtros`,e)},[]),(0,h.useEffect)(()=>{if(!R)return;let e=e=>{e.key===`Escape`&&z(!1)},t=document.body.style.overflow;return document.body.style.overflow=`hidden`,window.addEventListener(`keydown`,e),()=>{document.body.style.overflow=t,window.removeEventListener(`keydown`,e)}},[R]);let Ve=(0,h.useCallback)(async()=>{try{let e=q.current,t=J.current,n=e.tipo||x,r=new URLSearchParams;r.set(`tipo`,n),e.distrito&&e.distrito!==`Todos`&&r.set(`distrito`,e.distrito),e.cidade&&r.set(`cidade`,e.cidade),e.tipologias.length&&r.set(`tipologia`,e.tipologias.join(`,`)),e.tiposImovel?.length&&r.set(`tipoImovel`,e.tiposImovel.join(`,`)),e.precoMax&&r.set(`precoMax`,e.precoMax),t&&t.trim()&&r.set(`q`,t.trim()),n===`carro`&&(e.marca&&r.set(`marca`,e.marca),e.modelo&&r.set(`modelo`,e.modelo),e.combustiveis.length&&r.set(`combustivel`,e.combustiveis.join(`,`)),e.transmissao.length&&r.set(`transmissao`,e.transmissao.join(`,`))),n===`imovel`&&e.tipologias.length&&r.set(`tipologia`,e.tipologias.join(`,`)),n===`imovel`&&e.tiposImovel?.length&&r.set(`tipoImovel`,e.tiposImovel.join(`,`));let{data:i}=await c.get(`/anuncios/pesquisa/mapa?${r.toString()}`);we(Array.isArray(i)?i:[])}catch(e){console.warn(`Erro ao carregar mapa:`,e)}},[x]),X=(0,h.useCallback)(async(t,n=!1,r=null)=>{if(!G.current){G.current=!0,t===1?M(!0):Ee(!0),Oe(null);try{let i=q.current,a=Re.current,o=J.current,s=new URLSearchParams,u=r||i.tipo;(!u||u===`undefined`)&&(u=l.pathname.includes(`carro`)?`carro`:e||`imovel`),s.set(`tipo`,u),s.set(`page`,t),s.set(`limit`,12),s.set(`sort`,a),o&&o.trim()&&s.set(`q`,o.trim()),i.precoMax&&s.set(`precoMax`,i.precoMax),i.distrito&&i.distrito!==`Todos`&&s.set(`distrito`,i.distrito),i.cidade&&s.set(`cidade`,i.cidade),u===`carro`&&(i.marca&&s.set(`marca`,i.marca),i.modelo&&s.set(`modelo`,i.modelo),i.combustiveis.length&&s.set(`combustivel`,i.combustiveis.join(`,`)),i.transmissao.length&&s.set(`transmissao`,i.transmissao.join(`,`))),u===`imovel`&&i.tipologias.length&&s.set(`tipologia`,i.tipologias.join(`,`)),u===`imovel`&&i.tiposImovel?.length&&s.set(`tipoImovel`,i.tiposImovel.join(`,`));let{data:d}=await c.get(`/anuncios?${s.toString()}`),f=d.anuncios||(Array.isArray(d)?d:[]),p=d.totalAnuncios===void 0?f.length:d.totalAnuncios;k(n?e=>[...e,...f]:f),Ae(p);let m=f.length===12;L(m),m&&(K.current=t)}catch{Oe(`Falha ao atualizar dados.`),L(!1)}finally{M(!1),Ee(!1),G.current=!1}}},[e,l.pathname]);(0,h.useEffect)(()=>{q.current=D,W(D),z(!1),L(!1),k([]),F(T),J.current=T,K.current=1;let e=setTimeout(()=>{X(1,!1,x)},50);return()=>clearTimeout(e)},[x,D,T,X]),(0,h.useEffect)(()=>{if(ze.current===N)return;ze.current=N;let e=!1,t,n=()=>{if(!e){if(G.current){t=setTimeout(n,80);return}L(!1),k([]),K.current=1,X(1,!1,q.current.tipo)}};return n(),()=>{e=!0,clearTimeout(t)}},[N,X]),(0,h.useEffect)(()=>{if(J.current=Y,!Be.current){Be.current=!0;return}L(!1),k([]),K.current=1,X(1,!1,null)},[Y]),(0,h.useEffect)(()=>{if(V!==`mapa`)return;let e=setTimeout(()=>{Ve()},60);return()=>clearTimeout(e)},[x,U.distrito,U.cidade,U.precoMax,U.marca,U.modelo,U.tiposImovel,U.tipologias,U.combustiveis,U.transmissao,Y,Ve,V]),(0,h.useEffect)(()=>{if(!I||V===`mapa`)return;let e=new IntersectionObserver(e=>{if(e[0].isIntersecting){let e=K.current+1;X(e,!0,q.current.tipo)}},{rootMargin:`200px`,threshold:.1}),t=Le.current;return t&&e.observe(t),()=>e.disconnect()},[I,X,V]);let Z=(e,t)=>{W(n=>{let r=n[e]||[],i=r.includes(t)?r.filter(e=>e!==t):[...r,t];return{...n,[e]:i}})},He=()=>{L(!1),k([]),K.current=1,setTimeout(()=>{X(1,!1,q.current.tipo)},50),z(!1)},Ue=U.marca?de(U.marca):[],We=U.distrito&&U.distrito!==`Todos`?fe[U.distrito]:[],Q=x===`carro`?`var(--nx-accent-car)`:`var(--nx-accent-home)`,$=[U.precoMax&&`Ate ${Number(U.precoMax).toLocaleString(`pt-PT`)} EUR`,U.distrito!==`Todos`&&U.distrito,U.cidade,U.marca,U.modelo,...(U.tiposImovel||[]).map(e=>v.find(t=>t.value===e)?.label||e),...U.tipologias,...U.combustiveis,...U.transmissao,P.trim()&&`"${P.trim()}"`].filter(Boolean);return(0,_.jsxs)(_.Fragment,{children:[!n&&(0,_.jsx)(se,{title:x===`carro`?`Carros usados e novos em Portugal | Noxvelia`:`Imóveis para venda em Portugal | Noxvelia`,description:x===`carro`?`Pesquisa carros usados e novos em Portugal por marca, modelo, preço e localização.`:`Pesquisa apartamentos, moradias e terrenos em Portugal por tipologia, preço e localização.`,path:x===`carro`?`/carros`:`/imoveis`}),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`style`,{children:`
        .pesquisa-root { background: var(--nx-bg); font-family: var(--nx-font-body); color: var(--nx-text); min-height: 100vh; display: flex; flex-direction: column; }
        .pesquisa-layout { display: flex; max-width: 1400px; margin: 0 auto; width: 100%; padding: 32px; gap: 24px; flex: 1; align-items: flex-start; }

        .pesquisa-sidebar { width: 320px; flex-shrink: 0; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: var(--nx-radius-lg); padding: 24px; position: sticky; top: 96px; max-height: calc(100vh - 120px); overflow-y: auto; box-shadow: 0 18px 40px -28px rgba(15,23,42,0.35); transition: width 0.25s ease, opacity 0.2s ease, padding 0.25s ease, border-color 0.25s ease; }
        .pesquisa-sidebar::-webkit-scrollbar { width: 4px; }
        .pesquisa-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pesquisa-sidebar::-webkit-scrollbar-thumb { background: var(--nx-border); border-radius: 4px; }

        .pesquisa-sidebar.collapsed { width: 0; min-width: 0; padding: 0; border: none; opacity: 0; overflow: hidden; pointer-events: none; }

        .pesquisa-sidebar-toggle { flex-shrink: 0; width: 28px; height: 48px; border-radius: 8px; border: 1px solid var(--nx-border); background: var(--nx-bg-2); color: var(--nx-text-sub); cursor: pointer; display: flex; align-items: center; justify-content: center; position: sticky; top: 96px; transition: all 0.2s ease; }
        .pesquisa-sidebar-toggle:hover { background: var(--nx-border); color: var(--nx-text); }

        .pesquisa-sidebar-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-family: var(--nx-font-display); font-size: 18px; font-weight: 800; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--nx-border); }
        .pesquisa-sidebar-title { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
        .pesquisa-sidebar-close { display: none; align-items: center; justify-content: center; gap: 6px; min-height: 38px; padding: 0 11px; border: 1px solid var(--nx-border); border-radius: 9px; background: #ffffff; color: #334155; font-size: 12px; font-weight: 850; cursor: pointer; }
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
        .pesquisa-alert-btn {
          min-height: 44px;
          border: 1px solid rgba(42,193,180,.24);
          border-radius: 14px;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #0f172a;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 12px 24px -22px rgba(15,23,42,.5);
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }
        .pesquisa-alert-btn:hover:not(:disabled) { transform: translateY(-1px); border-color: ${Q}; background: rgba(42,193,180,.06); }
        .pesquisa-alert-btn:disabled { opacity: .65; cursor: wait; }
        .pesquisa-alert-feedback {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(16,185,129,.18);
          background: rgba(16,185,129,.08);
          color: #047857;
          border-radius: 999px;
          padding: 8px 11px;
          font-size: 12px;
          font-weight: 800;
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
        .dark .pesquisa-active-chip,
        .dark .pesquisa-alert-btn {
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

        .sidebar-mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(15,23,42,0.48); z-index: 9998; backdrop-filter: none; }

        @media (max-width: 1024px) {
          .pesquisa-layout { padding: 24px 16px; flex-direction: column; }
          .pesquisa-sidebar { position: fixed; top: 0; left: ${R?`0`:`-100%`}; height: 100dvh; max-height: 100dvh; overflow-y: auto; overscroll-behavior: contain; border-radius: 0 14px 14px 0; z-index: 9999; transition: left 0.24s ease; width: min(88vw, 380px); max-width: 380px; opacity: 1; box-sizing: border-box; }
          .pesquisa-sidebar.collapsed { width: min(88vw, 380px); max-width: 380px; padding: 24px; border: 1px solid var(--nx-border); opacity: 1; pointer-events: auto; }
          .pesquisa-sidebar-header { position: sticky; top: -24px; z-index: 2; margin: -24px -24px 20px; padding: 16px 18px; background: #ffffff; }
          .pesquisa-sidebar-close { display: inline-flex; }
          .pesquisa-apply-btn { position: sticky; bottom: -24px; z-index: 2; margin: 18px -24px -24px; width: calc(100% + 48px); border-radius: 0; min-height: 54px; }
          .sidebar-mobile-overlay { display: ${R?`block`:`none`}; }
          .pesquisa-sidebar-toggle { display: none; }
          .pesquisa-mobile-filter-btn { display: inline-flex; }
          .pesquisa-main-content { width: 100%; }
          .pesquisa-command { grid-template-columns: 1fr; }
          .pesquisa-command-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 640px) {
          .pesquisa-layout { padding: 18px 10px 34px; gap: 14px; }
          .pesquisa-sidebar { width: min(88vw, 360px); padding: 20px; }
          .pesquisa-sidebar.collapsed { width: min(88vw, 360px); padding: 20px; }
          .pesquisa-sidebar-header { top: -20px; margin: -20px -20px 18px; padding: 15px 16px; }
          .pesquisa-apply-btn { bottom: -20px; margin: 18px -20px -20px; width: calc(100% + 40px); }
          .pesquisa-search-row { display: grid; grid-template-columns: 1fr; padding: 8px; }
          .pesquisa-mobile-filter-btn { min-height: 44px; justify-content: center; }
          .pesquisa-topbar { align-items: stretch; }
          .pesquisa-results-count { justify-content: center; width: 100%; box-sizing: border-box; }
          .pesquisa-view-tools { width: 100%; display: grid; grid-template-columns: 1fr; }
          .pesquisa-view-switch { width: 100%; box-sizing: border-box; }
          .pesquisa-view-switch button { flex: 1; justify-content: center; }
          .pesquisa-alert-btn, .pesquisa-sort { width: 100%; justify-content: center; min-height: 44px; box-sizing: border-box; }
          .pesquisa-grid { gap: 16px; }
          .pesquisa-map-shell { height: calc(100vh - 220px); min-height: 420px; border-radius: 14px; }
        }

        .pesquisa-empty { text-align: center; padding: 100px 20px; color: var(--nx-text-sub); }
        .pesquisa-empty-action { margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 18px; border-radius: 12px; background: ${Q}; color: #020617; text-decoration: none; font-size: 13px; font-weight: 900; }
        .pesquisa-empty-action:hover { filter: brightness(0.96); }
        .infinite-spinner-container { text-align: center; padding: 40px 0; font-size: 13px; color: var(--nx-text-sub); font-weight: 500; grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--nx-text-sub); border-radius: 50%; display: inline-block; animation: pulse 0.6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: 0.2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }
      `}),(0,_.jsxs)(`div`,{className:`pesquisa-root`,children:[(0,_.jsx)(`div`,{className:`sidebar-mobile-overlay`,onClick:()=>z(!1),"aria-hidden":`true`}),(0,_.jsxs)(`div`,{className:`pesquisa-layout vista-${V}`,children:[(0,_.jsxs)(`aside`,{className:`pesquisa-sidebar${B?``:` collapsed`}`,role:R?`dialog`:void 0,"aria-label":`Filtros de pesquisa`,"aria-modal":R?`true`:void 0,children:[(0,_.jsxs)(`div`,{className:`pesquisa-sidebar-header`,children:[(0,_.jsxs)(`span`,{className:`pesquisa-sidebar-title`,children:[(0,_.jsx)(g.Icon,{path:p,size:1}),` Filtros`]}),(0,_.jsxs)(`button`,{type:`button`,className:`pesquisa-sidebar-close`,onClick:()=>z(!1),"aria-label":`Fechar filtros`,children:[(0,_.jsx)(g.Icon,{path:f,size:.85}),` Fechar`]})]}),(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Orçamento Máximo (€)`}),(0,_.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Ex: 120000`,value:U.precoMax,onChange:e=>W(t=>({...t,precoMax:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Distrito / Região`}),(0,_.jsxs)(`select`,{className:`pesquisa-filter-input`,value:U.distrito,onChange:e=>W(t=>({...t,distrito:e.target.value,cidade:``})),children:[(0,_.jsx)(`option`,{value:`Todos`,children:`Portugal (Todos)`}),me.map(e=>(0,_.jsx)(`option`,{value:e,children:e},e))]})]}),(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Cidade / Concelho`}),(0,_.jsxs)(`select`,{className:`pesquisa-filter-input`,value:U.cidade,onChange:e=>W(t=>({...t,cidade:e.target.value})),disabled:!U.distrito||U.distrito===`Todos`,children:[(0,_.jsx)(`option`,{value:``,children:U.distrito&&U.distrito!==`Todos`?`Todas as Cidades`:`Escolhe o Distrito Primeiro`}),We.map(e=>(0,_.jsx)(`option`,{value:e,children:e},e))]})]}),x===`carro`?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Marca do Veículo`}),(0,_.jsxs)(`select`,{className:`pesquisa-filter-input`,value:U.marca,onChange:e=>W(t=>({...t,marca:e.target.value,modelo:``})),children:[(0,_.jsx)(`option`,{value:``,children:`Todas as Marcas`}),pe.map(e=>(0,_.jsx)(`option`,{value:e,children:e},e))]})]}),(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Modelo Específico`}),(0,_.jsxs)(`select`,{className:`pesquisa-filter-input`,value:U.modelo,onChange:e=>W(t=>({...t,modelo:e.target.value})),disabled:!U.marca,children:[(0,_.jsx)(`option`,{value:``,children:U.marca?`Todos os Modelos`:`Escolha a Marca Primeiro`}),Ue.map((e,t)=>{let n=typeof e==`object`?e.modelo||e.nome||``:e;return(0,_.jsx)(`option`,{value:n,children:n},`mod-${t}`)})]})]}),(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Combustível`}),(0,_.jsx)(`div`,{className:`pesquisa-tags`,children:_e.map(e=>(0,_.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${U.combustiveis.includes(e)?`active`:``}`,onClick:()=>Z(`combustiveis`,e),children:e},e))})]}),(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Caixa / Transmissão`}),(0,_.jsx)(`div`,{className:`pesquisa-tags`,children:ve.map(e=>(0,_.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${U.transmissao.includes(e)?`active`:``}`,onClick:()=>Z(`transmissao`,e),children:e},e))})]})]}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipo de imovel`}),(0,_.jsx)(`div`,{className:`pesquisa-tags`,children:v.map(e=>(0,_.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${(U.tiposImovel||[]).includes(e.value)?`active`:``}`,onClick:()=>Z(`tiposImovel`,e.value),children:e.label},e.value))})]}),(0,_.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,_.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipologias disponíveis`}),(0,_.jsx)(`div`,{className:`pesquisa-tags`,children:ge.map(e=>(0,_.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${U.tipologias.includes(e)?`active`:``}`,onClick:()=>Z(`tipologias`,e),children:e},e))})]})]}),(0,_.jsx)(`button`,{type:`button`,className:`pesquisa-apply-btn`,onClick:He,children:`Aplicar Filtros`})]}),(0,_.jsx)(`button`,{type:`button`,className:`pesquisa-sidebar-toggle`,onClick:()=>Me(e=>!e),title:B?`Ocultar filtros`:`Mostrar filtros`,children:(0,_.jsx)(g.Icon,{path:B?m:oe,size:.9})}),(0,_.jsxs)(`main`,{className:`pesquisa-main-content`,children:[(0,_.jsxs)(`div`,{className:`pesquisa-search-row`,children:[(0,_.jsxs)(`button`,{type:`button`,className:`pesquisa-mobile-filter-btn`,onClick:()=>z(!0),children:[(0,_.jsx)(g.Icon,{path:p,size:.8}),`Filtros`]}),(0,_.jsxs)(`div`,{className:`pesquisa-omnibar-wrapper`,children:[(0,_.jsx)(g.Icon,{path:ae,size:.9,color:`var(--nx-text-sub)`,style:{marginRight:`12px`}}),(0,_.jsx)(`input`,{type:`text`,placeholder:x===`carro`?`Pesquisar por marca, modelo, versão...`:`Pesquisar por título, características...`,value:P,onChange:e=>F(e.target.value)}),j&&(0,_.jsx)(g.Icon,{path:`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,size:.9,color:Q,className:`animate-spin`})]})]}),(0,_.jsx)(`div`,{className:`pesquisa-active-row`,children:$.length>0?(0,_.jsxs)(_.Fragment,{children:[$.slice(0,7).map(e=>(0,_.jsxs)(`span`,{className:`pesquisa-active-chip`,children:[(0,_.jsx)(g.Icon,{path:ee,size:.55}),` `,e]},e)),$.length>7&&(0,_.jsxs)(`span`,{className:`pesquisa-active-chip`,children:[`+`,$.length-7]}),(0,_.jsxs)(`button`,{type:`button`,className:`pesquisa-clear-btn`,onClick:()=>{let e={tipo:x,precoMin:``,precoMax:``,distrito:`Todos`,cidade:``,marca:``,modelo:``,tiposImovel:[],tipologias:[],combustiveis:[],transmissao:[]};q.current=e,W(e),F(``),J.current=``,L(!1),k([]),K.current=1,setTimeout(()=>{X(1,!1,x)},50)},children:[(0,_.jsx)(g.Icon,{path:f,size:.6}),` Limpar`]})]}):(0,_.jsxs)(`span`,{className:`pesquisa-active-chip`,style:{background:`#f8fafc`,color:`#64748b`,borderColor:`#e2e8f0`},children:[(0,_.jsx)(g.Icon,{path:ne,size:.6}),` Exploração livre`]})}),De&&(0,_.jsx)(`div`,{style:{color:`var(--nx-danger)`,padding:`16px`,background:`rgba(239, 68, 68, 0.1)`,borderRadius:`8px`,fontSize:`14px`,fontWeight:500,border:`1px solid rgba(239, 68, 68, 0.2)`,marginBottom:`24px`},children:De}),(0,_.jsxs)(`div`,{className:`pesquisa-topbar`,children:[(0,_.jsx)(`div`,{className:`pesquisa-results-count`,children:j&&O.length===0?`A procurar...`:`${ke} registos`}),(0,_.jsxs)(`div`,{className:`pesquisa-view-tools`,children:[(0,_.jsxs)(`div`,{className:`pesquisa-view-switch`,"aria-label":`Alternar vista`,children:[(0,_.jsxs)(`button`,{type:`button`,className:V===`grelha`?`active`:``,onClick:()=>Ne(`grelha`),children:[(0,_.jsx)(g.Icon,{path:ie,size:.72}),` Grelha`]}),(0,_.jsxs)(`button`,{type:`button`,className:V===`mapa`?`active`:``,onClick:()=>Ne(`mapa`),children:[(0,_.jsx)(g.Icon,{path:re,size:.72}),` Mapa`]})]}),(0,_.jsxs)(`button`,{type:`button`,className:`pesquisa-alert-btn`,onClick:async()=>{if(!b){d(`/login`,{state:{from:`${l.pathname}${l.search}`}});return}Fe(!0),H(``);try{await c.post(`/alertas`,{tipo:x,filtros:{q:P.trim(),precoMax:U.precoMax,distrito:U.distrito,cidade:U.cidade,marca:U.marca,modelo:U.modelo,tipoImovel:U.tiposImovel,tipologias:U.tipologias,combustiveis:U.combustiveis,transmissao:U.transmissao}}),H(`Alerta criado. Vais receber notificacoes quando surgirem anuncios compativeis.`)}catch(e){H(e.response?.data?.erro||`Nao foi possivel guardar este alerta.`)}finally{Fe(!1)}},disabled:Pe,children:[(0,_.jsx)(g.Icon,{path:te,size:.72}),Pe?`A guardar...`:`Criar alerta`]}),(0,_.jsxs)(`select`,{className:`pesquisa-sort`,value:N,onChange:e=>je(e.target.value),children:[(0,_.jsx)(`option`,{value:`relevancia`,style:{background:`var(--nx-bg-2)`},children:`Relevância`}),(0,_.jsx)(`option`,{value:`preco_asc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais Baixo`}),(0,_.jsx)(`option`,{value:`preco_desc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais Alto`})]})]})]}),Ie&&(0,_.jsx)(`div`,{className:`pesquisa-active-row`,style:{marginTop:`-12px`},children:(0,_.jsx)(`span`,{className:`pesquisa-alert-feedback`,children:Ie})}),(0,_.jsx)(ue,{placement:`search_results_top`,vertical:x,className:`!my-6 !px-0`,fallback:(0,_.jsx)(le,{placement:`search_results_top`,className:`!my-6 !px-0`,minHeight:96})}),V===`mapa`?(0,_.jsxs)(`div`,{className:`pesquisa-map-shell`,children:[(0,_.jsx)(h.Suspense,{fallback:(0,_.jsx)(`div`,{className:`pesquisa-map-loading`,children:`A carregar mapa...`}),children:(0,_.jsx)(ye,{anuncios:A,tipo:x})}),A.length===0&&!j&&(0,_.jsx)(`div`,{className:`pesquisa-map-empty`,children:`Sem resultados com coordenadas para mostrar no mapa.`})]}):(0,_.jsxs)(`div`,{className:`pesquisa-grid`,children:[O.map(e=>(0,_.jsx)(ce,{anuncio:e,showStatus:!1},e._id)),I&&!j&&O.length>0&&(0,_.jsxs)(`div`,{ref:Le,className:`infinite-spinner-container`,children:[(0,_.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,_.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,_.jsx)(`div`,{className:`infinite-dot-pulse`})]})]}),V===`grelha`&&Te&&(0,_.jsxs)(`div`,{className:`infinite-spinner-container`,style:{marginTop:`24px`},children:[(0,_.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,_.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,_.jsx)(`div`,{className:`infinite-dot-pulse`})]}),V===`grelha`&&!j&&O.length===0&&(0,_.jsxs)(`div`,{className:`pesquisa-empty`,children:[(0,_.jsx)(`div`,{style:{fontSize:`32px`,color:`var(--nx-text-muted)`,marginBottom:`16px`},children:`∅`}),(0,_.jsx)(`h3`,{style:{fontFamily:`var(--nx-font-display)`,fontSize:`18px`,fontWeight:700,color:`var(--nx-text)`,margin:`0 0 8px 0`},children:x===`carro`?`Ainda não há carros ativos no Drive`:`Ainda não há imóveis ativos no Estate`}),(0,_.jsx)(`p`,{style:{fontSize:`14px`,margin:0},children:$.length>0?`Tenta limpar alguns filtros na barra lateral.`:`Quando houver anúncios ativos, aparecem aqui automaticamente.`}),(0,_.jsx)(o,{to:`/publicar`,state:Ce,className:`pesquisa-empty-action`,children:`Publicar anúncio`})]})]})]})]})]})]})}export{b as t};