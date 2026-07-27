import{a as e,n as t,t as n}from"./jsx-runtime-CdvZGgm7.js";import{C as r}from"./index-8jNQuNmY.js";import{a as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./leaflet-CRCtf7AH.js";import{r as d}from"./images-io1S19E8.js";var f=e(t(),1);function p(){return l().map}var m=e(s(),1),h=a(function(e,t){return i(new m.Popup(e,t.overlayContainer),t)},function(e,t,{position:n},r){(0,f.useEffect)(function(){let{instance:i}=e;function a(e){e.popup===i&&(i.update(),r(!0))}function o(e){e.popup===i&&r(!1)}return t.map.on({popupopen:a,popupclose:o}),t.overlayContainer==null?(n!=null&&i.setLatLng(n),i.openOn(t.map)):t.overlayContainer.bindPopup(i),function(){t.map.off({popupopen:a,popupclose:o}),t.overlayContainer?.unbindPopup(),t.map.removeLayer(i)}},[e,t,r,n])}),g=n();function _({bounds:e}){let t=p();return(0,f.useEffect)(()=>{e&&e.length>0&&t.fitBounds(e,{padding:[50,50]})},[e,t]),null}function v({imoveis:e,anuncios:t,tipo:n=`imovel`}){let[i,a]=(0,f.useState)([]),s=(0,f.useMemo)(()=>t||e||[],[t,e]);(0,f.useEffect)(()=>{if(s&&s.length>0){let e=s.filter(e=>e.localizacao?.coordenadas?.lat&&e.localizacao?.coordenadas?.lng).map(e=>[e.localizacao.coordenadas.lat,e.localizacao.coordenadas.lng]);a(e)}else a([])},[s]);let l=[39.3999,-8.2245],p=(e,t=n)=>{let r=new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e),i=t===`carro`?`#d9c49c`:`#102f50`;return m.default.divIcon({className:`custom-NOXVELIA-pin`,html:`
        <div style="
          background: ${i}; 
          color: #020617; 
          font-family: 'Inter', sans-serif;
          font-weight: 800; 
          padding: 4px 8px; 
          border-radius: 8px; 
          font-size: 12px; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.4); 
          border: 2px solid #ffffff;
          white-space: nowrap;
          transform: translate(-50%, -100%);
        ">
          ${r}
        </div>
      `,iconSize:[0,0],iconAnchor:[0,0]})};return(0,g.jsxs)(`div`,{style:{height:`100%`,width:`100%`,borderRadius:`16px`,overflow:`hidden`,zIndex:0,position:`relative`},children:[(0,g.jsxs)(c,{center:l,zoom:6,style:{height:`100%`,width:`100%`,zIndex:1},zoomControl:!1,children:[(0,g.jsx)(u,{url:`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,attribution:`© OpenStreetMap © CARTO`}),i.length>0?(0,g.jsx)(_,{bounds:i}):null,s.map(e=>!e.localizacao?.coordenadas?.lat||!e.localizacao?.coordenadas?.lng?null:(0,g.jsx)(o,{position:[e.localizacao.coordenadas.lat,e.localizacao.coordenadas.lng],icon:p(e.preco,e.tipo),children:(0,g.jsx)(h,{closeButton:!1,className:`NOXVELIA-popup`,children:(0,g.jsxs)(r,{to:`/anuncio/${e._id}`,style:{textDecoration:`none`,color:`inherit`,display:`block`,width:`200px`},children:[(0,g.jsx)(`div`,{style:{height:`120px`,width:`100%`,borderRadius:`8px`,overflow:`hidden`,marginBottom:`8px`},children:d(e.fotos?.[0],`thumbnail`)?(0,g.jsx)(`img`,{src:d(e.fotos?.[0],`thumbnail`),width:`400`,height:`300`,alt:``,loading:`lazy`,decoding:`async`,style:{width:`100%`,height:`100%`,objectFit:`cover`}}):(0,g.jsx)(`div`,{style:{width:`100%`,height:`100%`,background:`#e2e8f0`,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#64748b`,fontWeight:800},children:e.tipo===`carro`?`Drive`:`Estate`})}),(0,g.jsxs)(`div`,{style:{fontFamily:`'Inter', sans-serif`},children:[(0,g.jsx)(`div`,{style:{fontWeight:800,fontSize:`16px`,color:`#0f172a`,marginBottom:`4px`},children:new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e.preco)}),(0,g.jsx)(`div`,{style:{fontSize:`12px`,color:`#64748b`,lineHeight:1.4,display:`-webkit-box`,WebkitLineClamp:2,WebkitBoxOrient:`vertical`,overflow:`hidden`},children:e.titulo})]})]})})},e._id))]}),(0,g.jsx)(`style`,{children:`
        /* Anula estilos default do Leaflet para ficar com aspeto clean */
        .leaflet-popup-content-wrapper { border-radius: 12px; padding: 0; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .leaflet-popup-content { margin: 8px; }
        .leaflet-popup-tip { background: #fff; }
        .custom-NOXVELIA-pin { background: transparent; border: none; }
      `})]})}export{v as default};