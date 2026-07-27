const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MapaResultados-_GfGzLH_.js","assets/jsx-runtime-On9Szgki.js","assets/index-C7yYFwV9.js","assets/index-CN2iWocE.css","assets/images-io1S19E8.js","assets/MapaResultados-CcXJxNtP.css"])))=>i.map(i=>d[i]);
import{g as e,l as t,t as n,y as r}from"./jsx-runtime-On9Szgki.js";import{C as i,S as ee,t as a,w as te,y as o}from"./index-C7yYFwV9.js";import{C as s,D as c,Gt as l,J as u,S as ne,Xt as d,_ as re,ft as ie,jt as ae,ut as oe}from"./mdi-lCQrejZI.js";import{t as se}from"./Seo-YRqs8Wna.js";import{t as ce}from"./AnuncioCard-CaRbBV0n.js";import{t as le}from"./GoogleAdSlot-CiaP_fId.js";import{n as ue,t as de}from"./marcasModelos-CRXT0e16.js";import{n as fe,t as pe}from"./localizacoes-9zKfqZul.js";import{t as me}from"./funnelAnalytics-DKgpMxOh.js";var f=r(e(),1);function he(e,t){let[n,r]=(0,f.useState)(e);return(0,f.useEffect)(()=>{let n=setTimeout(()=>{r(e)},t);return()=>{clearTimeout(n)}},[e,t]),n}var p=d(),m=n(),ge=[`T0`,`T1`,`T2`,`T3`,`T4`,`T5+`],_e=[{value:`apartamento`,label:`Apartamento`},{value:`moradia`,label:`Moradia`},{value:`terreno`,label:`Terreno`},{value:`loja`,label:`Loja`},{value:`escritorio`,label:`Escritorio`}],ve=[`Gasolina`,`Diesel`,`Eléctrico`,`Híbrido`,`GPL`],ye=[`Manual`,`Automático`],be=[{value:`citadino`,label:`Citadino`},{value:`utilitario`,label:`Utilitário`},{value:`sedan`,label:`Sedan`},{value:`carrinha`,label:`Carrinha`},{value:`suv`,label:`SUV`},{value:`crossover`,label:`Crossover`},{value:`coupe`,label:`Coupé`},{value:`cabrio`,label:`Cabrio`},{value:`monovolume`,label:`Monovolume`},{value:`pickup`,label:`Pick-up`},{value:`comercial`,label:`Comercial`}],xe=(0,f.lazy)(()=>a(()=>import(`./MapaResultados-_GfGzLH_.js`),__vite__mapDeps([0,1,2,3,4,5]))),h=e=>String(e||``).split(`,`).map(e=>e.trim()).filter(Boolean),g=e=>Number(e).toLocaleString(`pt-PT`);function _({tipoPadrao:e=`imovel`,seoParams:n=null}){let[r]=te(),a=t(),d=a.pathname.includes(`carro`)?`carro`:e||`imovel`,_=r.toString(),v=n?.toString()||``,y=(0,f.useMemo)(()=>({search:new URLSearchParams(_),seo:v?new URLSearchParams(v):null}),[_,v]),b=(0,f.useCallback)(e=>y.seo?.get(e)||y.search.get(e)||``,[y]),Se=b(`marca`),Ce=d===`carro`&&de.includes(Se)?Se:``,x=b(`q`),we=(0,f.useCallback)(()=>({tipo:d,precoMin:b(`precoMin`),precoMax:b(`precoMax`),distrito:b(`distrito`)||`Todos`,cidade:b(`cidade`),marca:Ce,modelo:b(`modelo`),tiposImovel:h(b(`tipoImovel`)),tipologias:h(b(`tipologia`)),combustiveis:h(b(`combustivel`)),transmissao:h(b(`transmissao`)),tipoVeiculo:h(b(`tipoVeiculo`)),anoMin:b(`anoMin`),anoMax:b(`anoMax`),kmMax:b(`kmMax`),potenciaMin:b(`potenciaMin`),potenciaMax:b(`potenciaMax`),areaMin:b(`areaMin`),quartosMin:b(`quartosMin`),garantia:b(`garantia`)===`true`,aceitaRetoma:b(`aceitaRetoma`)===`true`,garagem:b(`garagem`)===`true`,tipoAnunciante:b(`tipoAnunciante`)}),[b,Ce,d]),S=(0,f.useMemo)(()=>we(),[we]),Te=o(a,d===`carro`?`/carros`:`/imoveis`),[C,w]=(0,f.useState)([]),[T,Ee]=(0,f.useState)([]),[E,D]=(0,f.useState)(!1),[De,O]=(0,f.useState)(!1),[k,A]=(0,f.useState)(null),[Oe,ke]=(0,f.useState)(0),[j,Ae]=(0,f.useState)(`relevancia`),[M,N]=(0,f.useState)(x),[P,F]=(0,f.useState)(!1),[I,L]=(0,f.useState)(!1),[R,je]=(0,f.useState)(!0),[Me,Ne]=(0,f.useState)(!1),[z,Pe]=(0,f.useState)(`grelha`),[B,V]=(0,f.useState)(S),Fe=(0,f.useRef)(null),H=(0,f.useRef)(!1),U=(0,f.useRef)(1),W=(0,f.useRef)(B),Ie=(0,f.useRef)(j),Le=(0,f.useRef)(j),G=(0,f.useRef)(``),K=(0,f.useRef)(!1),q=he(M,300);(0,f.useEffect)(()=>{W.current=B},[B]),(0,f.useEffect)(()=>{Ie.current=j},[j]),(0,f.useEffect)(()=>{let e=()=>L(e=>!e);return window.addEventListener(`toggle-filtros`,e),()=>window.removeEventListener(`toggle-filtros`,e)},[]),(0,f.useEffect)(()=>{let e=window.matchMedia(`(max-width: 1024px)`),t=()=>Ne(e.matches);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,f.useEffect)(()=>{if(!I)return;let e=e=>{e.key===`Escape`&&L(!1)},t=document.body.style.overflow;return document.body.style.overflow=`hidden`,window.addEventListener(`keydown`,e),()=>{document.body.style.overflow=t,window.removeEventListener(`keydown`,e)}},[I]);let J=(0,f.useCallback)((e,t,n)=>{t.precoMin&&e.set(`precoMin`,t.precoMin),t.precoMax&&e.set(`precoMax`,t.precoMax),t.distrito&&t.distrito!==`Todos`&&e.set(`distrito`,t.distrito),t.cidade&&e.set(`cidade`,t.cidade),t.garantia&&e.set(`garantia`,`true`),t.aceitaRetoma&&e.set(`aceitaRetoma`,`true`),t.tipoAnunciante&&e.set(`tipoAnunciante`,t.tipoAnunciante),n===`carro`&&(t.marca&&e.set(`marca`,t.marca),t.modelo&&e.set(`modelo`,t.modelo),t.combustiveis.length&&e.set(`combustivel`,t.combustiveis.join(`,`)),t.transmissao.length&&e.set(`transmissao`,t.transmissao.join(`,`)),t.tipoVeiculo.length&&e.set(`tipoVeiculo`,t.tipoVeiculo.join(`,`)),t.anoMin&&e.set(`anoMin`,t.anoMin),t.anoMax&&e.set(`anoMax`,t.anoMax),t.kmMax&&e.set(`kmMax`,t.kmMax),t.potenciaMin&&e.set(`potenciaMin`,t.potenciaMin),t.potenciaMax&&e.set(`potenciaMax`,t.potenciaMax)),n===`imovel`&&(t.tipologias.length&&e.set(`tipologia`,t.tipologias.join(`,`)),t.tiposImovel?.length&&e.set(`tipoImovel`,t.tiposImovel.join(`,`)),t.areaMin&&e.set(`areaMin`,t.areaMin),t.quartosMin&&e.set(`quartosMin`,t.quartosMin),t.garagem&&e.set(`garagem`,`true`))},[]),Re=(0,f.useCallback)(async()=>{try{let e=W.current,t=G.current,n=e.tipo||d,r=new URLSearchParams;r.set(`tipo`,n),J(r,e,n),t&&t.trim()&&r.set(`q`,t.trim());let{data:i}=await ee.get(`/anuncios/pesquisa/mapa?${r.toString()}`);Ee(Array.isArray(i)?i:[])}catch(e){console.warn(`Erro ao carregar mapa:`,e)}},[J,d]),Y=(0,f.useCallback)(async(t,n=!1,r=null)=>{if(!H.current){H.current=!0,t===1?D(!0):O(!0),A(null);try{let i=W.current,te=Ie.current,o=G.current,s=new URLSearchParams,c=r||i.tipo;(!c||c===`undefined`)&&(c=a.pathname.includes(`carro`)?`carro`:e||`imovel`),s.set(`tipo`,c),s.set(`page`,t),s.set(`limit`,12),s.set(`sort`,te),J(s,i,c),o&&o.trim()&&s.set(`q`,o.trim());let{data:l}=await ee.get(`/anuncios?${s.toString()}`),u=l.anuncios||(Array.isArray(l)?l:[]),ne=l.totalAnuncios===void 0?u.length:l.totalAnuncios;w(n?e=>[...e,...u]:u),ke(ne);let d=u.length===12;F(d),d&&(U.current=t)}catch{A(`Não conseguimos carregar novos anúncios neste momento.`),F(!1)}finally{D(!1),O(!1),H.current=!1}}},[J,e,a.pathname]);(0,f.useEffect)(()=>{W.current=S,V(S),L(!1),F(!1),w([]),N(x),G.current=x,U.current=1;let e=setTimeout(()=>{Y(1,!1,d)},50);return()=>clearTimeout(e)},[d,S,x,Y]),(0,f.useEffect)(()=>{if(Le.current===j)return;Le.current=j;let e=!1,t,n=()=>{if(!e){if(H.current){t=setTimeout(n,80);return}F(!1),w([]),U.current=1,Y(1,!1,W.current.tipo)}};return n(),()=>{e=!0,clearTimeout(t)}},[j,Y]),(0,f.useEffect)(()=>{if(G.current=q,!K.current){K.current=!0;return}F(!1),w([]),U.current=1,Y(1,!1,null)},[q]),(0,f.useEffect)(()=>{if(z!==`mapa`)return;let e=setTimeout(()=>{Re()},60);return()=>clearTimeout(e)},[d,B.precoMin,B.precoMax,B.distrito,B.cidade,B.marca,B.modelo,B.tiposImovel,B.tipologias,B.combustiveis,B.transmissao,B.tipoVeiculo,B.anoMin,B.anoMax,B.kmMax,B.potenciaMin,B.potenciaMax,B.areaMin,B.quartosMin,B.garantia,B.aceitaRetoma,B.garagem,B.tipoAnunciante,q,Re,z]),(0,f.useEffect)(()=>{if(!P||z===`mapa`)return;let e=new IntersectionObserver(e=>{if(e[0].isIntersecting){let e=U.current+1;Y(e,!0,W.current.tipo)}},{rootMargin:`200px`,threshold:.1}),t=Fe.current;return t&&e.observe(t),()=>e.disconnect()},[P,Y,z]);let X=(e,t)=>{V(n=>{let r=n[e]||[],i=r.includes(t)?r.filter(e=>e!==t):[...r,t];return{...n,[e]:i}})},ze=()=>{me(`search_start`,{vertical:d}),F(!1),w([]),U.current=1,setTimeout(()=>{Y(1,!1,W.current.tipo)},50),L(!1)},Be=B.marca?ue(B.marca):[],Ve=B.distrito&&B.distrito!==`Todos`?fe[B.distrito]:[],Z=`var(--nx-gold)`,Q=Me?!I:!R,$=[B.precoMin&&`Desde ${g(B.precoMin)} EUR`,B.precoMax&&`Até ${g(B.precoMax)} EUR`,B.distrito!==`Todos`&&B.distrito,B.cidade,B.marca,B.modelo,...(B.tiposImovel||[]).map(e=>_e.find(t=>t.value===e)?.label||e),...B.tipologias,...B.combustiveis,...B.transmissao,...(B.tipoVeiculo||[]).map(e=>be.find(t=>t.value===e)?.label||e),B.anoMin&&`Ano desde ${B.anoMin}`,B.anoMax&&`Ano até ${B.anoMax}`,B.kmMax&&`Até ${g(B.kmMax)} km`,B.potenciaMin&&`Desde ${B.potenciaMin} cv`,B.potenciaMax&&`Até ${B.potenciaMax} cv`,B.areaMin&&`Desde ${g(B.areaMin)} m²`,B.quartosMin&&`${B.quartosMin}+ quartos`,B.garantia&&`Com garantia`,B.aceitaRetoma&&`Aceita retoma`,B.garagem&&`Com garagem`,B.tipoAnunciante===`profissional`&&`Profissional`,B.tipoAnunciante===`particular`&&`Particular`,M.trim()&&`"${M.trim()}"`].filter(Boolean);return(0,m.jsxs)(m.Fragment,{children:[!n&&(0,m.jsx)(se,{title:d===`carro`?`Carros usados e novos em Portugal | Noxvelia`:`Imóveis para venda em Portugal | Noxvelia`,description:d===`carro`?`Pesquisa carros usados e novos em Portugal por marca, modelo, preço e localização.`:`Pesquisa apartamentos, moradias e terrenos em Portugal por tipologia, preço e localização.`,path:d===`carro`?`/carros`:`/imoveis`}),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`style`,{children:`
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
        .pesquisa-filter-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .pesquisa-filter-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--nx-text-sub); margin-bottom: 12px; }

        .pesquisa-filter-input { width: 100%; padding: 12px 14px; border: 1px solid var(--nx-input-border); border-radius: var(--nx-radius-sm); font-size: 14px; font-family: var(--nx-font-body); color: var(--nx-text); outline: none; background: var(--nx-input-bg); box-sizing: border-box; transition: all 0.2s ease; }
        .pesquisa-filter-input:focus { border-color: var(--nx-accent-car); }

        .pesquisa-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pesquisa-tag { padding: 8px 12px; border: 1px solid var(--nx-border); border-radius: 6px; background: var(--nx-bg-3); font-size: 12px; font-weight: 600; cursor: pointer; color: var(--nx-text-sub); transition: all 0.2s ease; flex: 1 1 calc(50% - 8px); text-align: center; }
        .pesquisa-tag:hover { background: var(--nx-border); color: var(--nx-text); }
        .pesquisa-tag.active { background: ${Z}; color: #071326; border-color: ${Z}; }

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
        .pesquisa-command::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: ${Z}; }
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
        .pesquisa-omnibar-wrapper:focus-within { border-color: ${Z}; box-shadow: 0 0 0 3px rgba(217,196,156,0.18); }
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
          background: ${Z};
          color: #020617;
          box-shadow: 0 8px 18px -14px ${Z};
        }
        .pesquisa-alert-btn {
          min-height: 44px;
          border: 1px solid rgba(217,196,156,.24);
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
        .pesquisa-alert-btn:hover:not(:disabled) { transform: translateY(-1px); border-color: ${Z}; background: rgba(217,196,156,.06); }
        .pesquisa-alert-btn:disabled { opacity: .65; cursor: wait; }
        .pesquisa-alert-feedback {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(16,185,129,.18);
          background: rgba(16,185,129,.08);
          color: #806040;
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
          .pesquisa-sidebar { position: fixed; top: 0; left: ${I?`0`:`-100%`}; height: 100dvh; max-height: 100dvh; overflow-y: auto; overscroll-behavior: contain; border-radius: 0 14px 14px 0; z-index: 9999; transition: left 0.24s ease; width: min(88vw, 380px); max-width: 380px; opacity: 1; box-sizing: border-box; }
          .pesquisa-sidebar.collapsed { width: min(88vw, 380px); max-width: 380px; padding: 24px; border: 1px solid var(--nx-border); opacity: 1; pointer-events: auto; }
          .pesquisa-sidebar-header { position: sticky; top: -24px; z-index: 2; margin: -24px -24px 20px; padding: 16px 18px; background: #ffffff; }
          .pesquisa-sidebar-close { display: inline-flex; }
          .pesquisa-apply-btn { position: sticky; bottom: -24px; z-index: 2; margin: 18px -24px -24px; width: calc(100% + 48px); border-radius: 0; min-height: 54px; }
          .sidebar-mobile-overlay { display: ${I?`block`:`none`}; }
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
        .pesquisa-empty-action { margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 18px; border: 0; border-radius: 12px; background: ${Z}; color: #020617; text-decoration: none; font-family: var(--nx-font-body); font-size: 13px; font-weight: 900; cursor: pointer; }
        .pesquisa-empty-action:hover { filter: brightness(0.96); }
        .infinite-spinner-container { text-align: center; padding: 40px 0; font-size: 13px; color: var(--nx-text-sub); font-weight: 500; grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--nx-text-sub); border-radius: 50%; display: inline-block; animation: pulse 0.6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: 0.2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }
      `}),(0,m.jsxs)(`div`,{className:`pesquisa-root`,children:[(0,m.jsx)(`div`,{className:`sidebar-mobile-overlay`,onClick:()=>L(!1),"aria-hidden":`true`}),(0,m.jsxs)(`div`,{className:`pesquisa-layout vista-${z}`,children:[(0,m.jsxs)(`aside`,{className:`pesquisa-sidebar${R?``:` collapsed`}`,role:I?`dialog`:void 0,"aria-label":`Filtros de pesquisa`,"aria-modal":I?`true`:void 0,"aria-hidden":Q,inert:Q?``:void 0,children:[(0,m.jsxs)(`div`,{className:`pesquisa-sidebar-header`,children:[(0,m.jsxs)(`span`,{className:`pesquisa-sidebar-title`,children:[(0,m.jsx)(p.Icon,{path:u,size:1}),` Filtros`]}),(0,m.jsxs)(`button`,{type:`button`,className:`pesquisa-sidebar-close`,onClick:()=>L(!1),"aria-label":`Fechar filtros`,children:[(0,m.jsx)(p.Icon,{path:c,size:.85}),` Fechar`]})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Orçamento (€)`}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,m.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Mínimo`,value:B.precoMin,onChange:e=>V(t=>({...t,precoMin:e.target.value}))}),(0,m.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Máximo`,value:B.precoMax,onChange:e=>V(t=>({...t,precoMax:e.target.value}))})]})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Distrito / Região`}),(0,m.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.distrito,onChange:e=>V(t=>({...t,distrito:e.target.value,cidade:``})),children:[(0,m.jsx)(`option`,{value:`Todos`,children:`Portugal (Todos)`}),pe.map(e=>(0,m.jsx)(`option`,{value:e,children:e},e))]})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Cidade / Concelho`}),(0,m.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.cidade,onChange:e=>V(t=>({...t,cidade:e.target.value})),disabled:!B.distrito||B.distrito===`Todos`,children:[(0,m.jsx)(`option`,{value:``,children:B.distrito&&B.distrito!==`Todos`?`Todas as Cidades`:`Escolhe o Distrito Primeiro`}),Ve.map(e=>(0,m.jsx)(`option`,{value:e,children:e},e))]})]}),d===`carro`?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Marca do Veículo`}),(0,m.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.marca,onChange:e=>V(t=>({...t,marca:e.target.value,modelo:``})),children:[(0,m.jsx)(`option`,{value:``,children:`Todas as Marcas`}),de.map(e=>(0,m.jsx)(`option`,{value:e,children:e},e))]})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Modelo Específico`}),(0,m.jsxs)(`select`,{className:`pesquisa-filter-input`,value:B.modelo,onChange:e=>V(t=>({...t,modelo:e.target.value})),disabled:!B.marca,children:[(0,m.jsx)(`option`,{value:``,children:B.marca?`Todos os Modelos`:`Escolha a Marca Primeiro`}),Be.map((e,t)=>{let n=typeof e==`object`?e.modelo||e.nome||``:e;return(0,m.jsx)(`option`,{value:n,children:n},`mod-${t}`)})]})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Ano`}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,m.jsx)(`input`,{type:`number`,min:`1930`,className:`pesquisa-filter-input`,placeholder:`Desde`,value:B.anoMin,onChange:e=>V(t=>({...t,anoMin:e.target.value}))}),(0,m.jsx)(`input`,{type:`number`,min:`1930`,className:`pesquisa-filter-input`,placeholder:`Até`,value:B.anoMax,onChange:e=>V(t=>({...t,anoMax:e.target.value}))})]})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Quilómetros máximos`}),(0,m.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Ex: 80000`,value:B.kmMax,onChange:e=>V(t=>({...t,kmMax:e.target.value}))})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Potência (cv)`}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,m.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Mínima`,value:B.potenciaMin,onChange:e=>V(t=>({...t,potenciaMin:e.target.value}))}),(0,m.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Máxima`,value:B.potenciaMax,onChange:e=>V(t=>({...t,potenciaMax:e.target.value}))})]})]}),`                `,(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Combustível`}),(0,m.jsx)(`div`,{className:`pesquisa-tags`,children:ve.map(e=>(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.combustiveis.includes(e)?`active`:``}`,onClick:()=>X(`combustiveis`,e),children:e},e))})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipo de veículo`}),(0,m.jsx)(`div`,{className:`pesquisa-tags`,children:be.map(e=>(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.tipoVeiculo.includes(e.value)?`active`:``}`,onClick:()=>X(`tipoVeiculo`,e.value),children:e.label},e.value))})]}),`                `,(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Caixa / Transmissão`}),(0,m.jsx)(`div`,{className:`pesquisa-tags`,children:ye.map(e=>(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.transmissao.includes(e)?`active`:``}`,onClick:()=>X(`transmissao`,e),children:e},e))})]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipo de imovel`}),(0,m.jsx)(`div`,{className:`pesquisa-tags`,children:_e.map(e=>(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${(B.tiposImovel||[]).includes(e.value)?`active`:``}`,onClick:()=>X(`tiposImovel`,e.value),children:e.label},e.value))})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipologias disponíveis`}),(0,m.jsx)(`div`,{className:`pesquisa-tags`,children:ge.map(e=>(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.tipologias.includes(e)?`active`:``}`,onClick:()=>X(`tipologias`,e),children:e},e))})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Área e quartos`}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,m.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Área mín.`,value:B.areaMin,onChange:e=>V(t=>({...t,areaMin:e.target.value}))}),(0,m.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Quartos mín.`,value:B.quartosMin,onChange:e=>V(t=>({...t,quartosMin:e.target.value}))})]})]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Características`}),(0,m.jsx)(`div`,{className:`pesquisa-tags`,children:(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.garagem?`active`:``}`,onClick:()=>V(e=>({...e,garagem:!e.garagem})),children:`Garagem`})})]}),`              `]}),(0,m.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,m.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Confiança e anunciante`}),(0,m.jsxs)(`div`,{className:`pesquisa-tags`,children:[(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.garantia?`active`:``}`,onClick:()=>V(e=>({...e,garantia:!e.garantia})),children:`Com garantia`}),d===`carro`&&(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.aceitaRetoma?`active`:``}`,onClick:()=>V(e=>({...e,aceitaRetoma:!e.aceitaRetoma})),children:`Aceita retoma`}),(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.tipoAnunciante===`profissional`?`active`:``}`,onClick:()=>V(e=>({...e,tipoAnunciante:e.tipoAnunciante===`profissional`?``:`profissional`})),children:`Profissional`}),(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${B.tipoAnunciante===`particular`?`active`:``}`,onClick:()=>V(e=>({...e,tipoAnunciante:e.tipoAnunciante===`particular`?``:`particular`})),children:`Particular`})]})]}),(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-apply-btn`,onClick:ze,children:`Aplicar Filtros`})]}),(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-sidebar-toggle`,onClick:()=>je(e=>!e),title:R?`Ocultar filtros`:`Mostrar filtros`,children:(0,m.jsx)(p.Icon,{path:R?ne:s,size:.9})}),(0,m.jsxs)(`main`,{className:`pesquisa-main-content`,children:[(0,m.jsxs)(`div`,{className:`pesquisa-search-row`,children:[(0,m.jsxs)(`button`,{type:`button`,className:`pesquisa-mobile-filter-btn`,onClick:()=>L(!0),children:[(0,m.jsx)(p.Icon,{path:u,size:.8}),`Filtros`]}),(0,m.jsxs)(`div`,{className:`pesquisa-omnibar-wrapper`,children:[(0,m.jsx)(p.Icon,{path:oe,size:.9,color:`var(--nx-text-sub)`,style:{marginRight:`12px`}}),(0,m.jsx)(`input`,{type:`text`,placeholder:d===`carro`?`Pesquisar por marca, modelo, versão...`:`Pesquisar por título, características...`,value:M,onChange:e=>N(e.target.value)}),E&&(0,m.jsx)(p.Icon,{path:`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,size:.9,color:Z,className:`animate-spin`})]})]}),(0,m.jsx)(`div`,{className:`pesquisa-active-row`,children:$.length>0?(0,m.jsxs)(m.Fragment,{children:[$.slice(0,7).map(e=>(0,m.jsxs)(`span`,{className:`pesquisa-active-chip`,children:[(0,m.jsx)(p.Icon,{path:ae,size:.55}),` `,e]},e)),$.length>7&&(0,m.jsxs)(`span`,{className:`pesquisa-active-chip`,children:[`+`,$.length-7]}),(0,m.jsxs)(`button`,{type:`button`,className:`pesquisa-clear-btn`,onClick:()=>{let e={tipo:d,precoMin:``,precoMax:``,distrito:`Todos`,cidade:``,marca:``,modelo:``,tiposImovel:[],tipologias:[],combustiveis:[],transmissao:[],tipoVeiculo:[],anoMin:``,anoMax:``,kmMax:``,potenciaMin:``,potenciaMax:``,areaMin:``,quartosMin:``,garantia:!1,aceitaRetoma:!1,garagem:!1,tipoAnunciante:``};W.current=e,V(e),N(``),G.current=``,F(!1),w([]),U.current=1,setTimeout(()=>{Y(1,!1,d)},50)},children:[(0,m.jsx)(p.Icon,{path:c,size:.6}),` Limpar`]})]}):(0,m.jsxs)(`span`,{className:`pesquisa-active-chip`,style:{background:`#f8fafc`,color:`#64748b`,borderColor:`#e2e8f0`},children:[(0,m.jsx)(p.Icon,{path:re,size:.6}),` Exploração livre`]})}),k&&(0,m.jsx)(`div`,{style:{color:`#92400e`,padding:`16px`,background:`rgba(245, 158, 11, 0.1)`,borderRadius:`8px`,fontSize:`14px`,fontWeight:600,border:`1px solid rgba(245, 158, 11, 0.22)`,marginBottom:`24px`},children:k}),(0,m.jsxs)(`div`,{className:`pesquisa-topbar`,children:[(0,m.jsx)(`div`,{className:`pesquisa-results-count`,children:E&&C.length===0?`A procurar...`:`${Oe} registos`}),(0,m.jsxs)(`div`,{className:`pesquisa-view-tools`,children:[(0,m.jsxs)(`div`,{className:`pesquisa-view-switch`,"aria-label":`Alternar vista`,children:[(0,m.jsxs)(`button`,{type:`button`,className:z===`grelha`?`active`:``,onClick:()=>Pe(`grelha`),children:[(0,m.jsx)(p.Icon,{path:l,size:.72}),` Grelha`]}),(0,m.jsxs)(`button`,{type:`button`,className:z===`mapa`?`active`:``,onClick:()=>Pe(`mapa`),children:[(0,m.jsx)(p.Icon,{path:ie,size:.72}),` Mapa`]})]}),(0,m.jsxs)(`select`,{className:`pesquisa-sort`,value:j,onChange:e=>Ae(e.target.value),children:[(0,m.jsx)(`option`,{value:`relevancia`,style:{background:`var(--nx-bg-2)`},children:`Relevância`}),(0,m.jsx)(`option`,{value:`recentes`,style:{background:`var(--nx-bg-2)`},children:`Mais recentes`}),(0,m.jsx)(`option`,{value:`preco_asc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais baixo`}),(0,m.jsx)(`option`,{value:`preco_desc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais alto`}),d===`carro`&&(0,m.jsx)(`option`,{value:`ano_desc`,style:{background:`var(--nx-bg-2)`},children:`Ano: mais recente`}),d===`carro`&&(0,m.jsx)(`option`,{value:`km_asc`,style:{background:`var(--nx-bg-2)`},children:`Km: menor primeiro`}),(0,m.jsx)(`option`,{value:`qualidade_desc`,style:{background:`var(--nx-bg-2)`},children:`Anúncio mais completo`})]})]})]}),(0,m.jsx)(le,{placement:`search_results_top`,className:`!my-6 !px-0`,minHeight:96}),z===`mapa`?(0,m.jsxs)(`div`,{className:`pesquisa-map-shell`,children:[(0,m.jsx)(f.Suspense,{fallback:(0,m.jsx)(`div`,{className:`pesquisa-map-loading`,children:`A carregar mapa...`}),children:(0,m.jsx)(xe,{anuncios:T,tipo:d})}),T.length===0&&!E&&(0,m.jsx)(`div`,{className:`pesquisa-map-empty`,children:`Sem resultados com coordenadas para mostrar no mapa.`})]}):(0,m.jsxs)(`div`,{className:`pesquisa-grid`,children:[C.map(e=>(0,m.jsx)(ce,{anuncio:e,showStatus:!1},e._id)),P&&!E&&C.length>0&&(0,m.jsxs)(`div`,{ref:Fe,className:`infinite-spinner-container`,children:[(0,m.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,m.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,m.jsx)(`div`,{className:`infinite-dot-pulse`})]})]}),z===`grelha`&&De&&(0,m.jsxs)(`div`,{className:`infinite-spinner-container`,style:{marginTop:`24px`},children:[(0,m.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,m.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,m.jsx)(`div`,{className:`infinite-dot-pulse`})]}),z===`grelha`&&!E&&C.length===0&&(0,m.jsxs)(`div`,{className:`pesquisa-empty`,children:[(0,m.jsx)(`div`,{style:{fontSize:`32px`,color:`var(--nx-text-muted)`,marginBottom:`16px`},children:`∅`}),(0,m.jsx)(`h3`,{style:{fontFamily:`var(--nx-font-display)`,fontSize:`18px`,fontWeight:700,color:`var(--nx-text)`,margin:`0 0 8px 0`},children:k?`Pesquisa temporariamente indisponível`:d===`carro`?`Ainda não há carros publicados`:`Ainda não há imóveis publicados`}),(0,m.jsx)(`p`,{style:{fontSize:`14px`,margin:0},children:k?`Tenta novamente daqui a instantes.`:$.length>0?`Tenta limpar alguns filtros.`:`Assim que entrarem anúncios, aparecem aqui.`}),k?(0,m.jsx)(`button`,{type:`button`,className:`pesquisa-empty-action`,onClick:()=>Y(1,!1,d),children:`Tentar novamente`}):(0,m.jsx)(i,{to:`/publicar`,state:Te,className:`pesquisa-empty-action`,children:`Publicar anúncio`})]})]})]})]})]})]})}export{_ as t};