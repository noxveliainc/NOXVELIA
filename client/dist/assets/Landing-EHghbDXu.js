import{B as e,C as t,D as n,E as r,G as i,H as a,I as o,J as s,M as c,O as l,Q as u,S as d,T as f,U as p,W as m,Y as h,_ as g,b as _,d as v,et as y,f as b,g as x,h as S,j as C,k as w,l as T,m as E,p as D,u as O,v as k,w as A,x as j,y as M}from"./index-KDzsWxbj.js";import{r as N}from"./images-io1S19E8.js";import{a as P,i as F,o as I}from"./seo-BZnLo9Qd.js";import{t as L}from"./Seo-Dj4sAz2r.js";import{t as R}from"./GoogleAdSlot-DQIJ_Cux.js";import{n as z,t as B}from"./marcasModelos-CRXT0e16.js";import{t as V}from"./localizacoes-9zKfqZul.js";import{t as H}from"./funnelAnalytics-hvz0U_OX.js";var U=(e,t)=>{if(w(t,`<`)){let n=t[1]===`<`,r=e._tail,i=r?r._offset+r._delay:0;return n?i:i+r.duration}},W=(e,n)=>{let r=e.iterationDuration;if(r===1e-11&&(r=0),f(n))return r;if(t(+n))return+n;let i=n,a=e?e.labels:null,o=!d(a),s=U(e,i),c=!f(s),l=C.exec(i);if(l){let e=l[0],t=i.split(e),n=o&&t[0]?a[t[0]]:r;return g(c?s:o?n:r,+t[1],e[0])}else return c?s:o?f(a[i])?r:a[i]:r},G=(e=0,t=1,n=0)=>{let r=10**n;return Math.floor((Math.random()*(t-e+1/r)+e)*r)/r},K=0,q=(e,t=0,n=1,r=0)=>{let i=e===void 0?K++:e;return(e=t,a=n,o=r)=>{i+=1831565813,i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61);let s=10**o;return Math.floor((((i^i>>>14)>>>0)/4294967296*(a-e+1/s)+e)*s)/s}},J=(e,t=G)=>{let n=e.length,r,i;for(;n;)i=t(0,--n),r=e[n],e[n]=e[i],e[i]=r;return e},Y=(e,i={})=>{let a=[],o=0,s,u=null,d=i.from,p=i.reversed,m=i.ease,h=!f(m),g=h&&!f(m.ease)?m.ease:h?E(m):null,v=i.grid,y=v===!0,b=i.axis,C=i.total,w=f(d)||d===0||d===`first`,T=d===`center`,D=d===`last`,O=d===`random`,N=_(d),P=_(e),F=i.use,I=r(P?e[0]:e),L=P?r(e[1]):0,R=c.exec((P?e[1]:e)+``),z=i.start||0+(P?I:0),B=i.seed,V=!f(B)&&B!==!1?q(B===!0?0:B):G,H=i.jitter,U=!f(H),K=_(H),Y=K?H[0]:H||0,X=K?H[1]:H||0,Z=w?0:t(d)?d:0;return(e,r,c,m,h)=>{let[_]=S(e),w=f(C)?c.length:C,E=f(F)?!1:j(F)?F(_,r,w):x(_,F),B=t(E)||A(E)&&t(+E)?+E:r,H=B>=0&&B<w?B:r;if(T&&(Z=(w-1)/2),D&&(Z=w-1),!a.length){if(y){let e=!0,n=!1,r=1/0,i=1/0,o=1/0,s=-1/0,u=-1/0,f=-1/0,p=[],m=[],h=[];for(let a=0;a<w;a++){let l=c[a],d=0,g=0,_=0,v=!1;if(l&&j(l.getBoundingClientRect)){let e=l.getBoundingClientRect();d=e.left+e.width/2,g=e.top+e.height/2,v=!0}else{let e=l;e&&t(e.x)&&t(e.y)&&(d=e.x,g=e.y,t(e.z)&&(_=e.z,n=!0),v=!0)}if(!v){e=!1;break}p.push(d),m.push(g),h.push(_),d<r&&(r=d),g<i&&(i=g),_<o&&(o=_),d>s&&(s=d),g>u&&(u=g),_>f&&(f=_)}if(e){let e=p[0],c=m[0],g=h[0];N?(e=r+d[0]*(s-r),c=i+d[1]*(u-i),g=n?o+(d.length>=3?d[2]:.5)*(f-o):0):T?(e=(r+s)/2,c=(i+u)/2,g=(o+f)/2):D?(e=p[w-1],c=m[w-1],g=h[w-1]):t(d)&&(e=p[d],c=m[d],g=h[d]);for(let t=0;t<w;t++){let r=e-p[t],i=c-m[t],o=g-h[t],s=l(r*r+i*i+(n?o*o:0));b===`x`&&(s=-r),b===`y`&&(s=-i),b===`z`&&(s=-o),a.push(s)}let _=1/0;for(let e=0;e<w;e++){let t=k(a[e]);t>0&&t<_&&(_=t)}if(_>0&&_<1/0)for(let e=0;e<w;e++)a[e]=a[e]/_}else for(let e=0;e<w;e++)a.push(k(Z-e))}else for(let e=0;e<w;e++)if(!v)a.push(k(Z-e));else{let t=v.length,n=v[0]*v[1],r,i,o;N?(r=d[0]*(v[0]-1),i=d[1]*(v[1]-1),o=t===3?(d.length>=3?d[2]:.5)*(v[2]-1):0):T?(r=(v[0]-1)/2,i=(v[1]-1)/2,o=t===3?(v[2]-1)/2:0):(r=Z%v[0],i=M(Z/v[0])%v[1],o=t===3?M(Z/n):0);let s=e%v[0],c=M(e/v[0])%v[1],u=t===3?M(e/n):0,f=r-s,p=i-c,m=o-u,h=l(f*f+p*p+(t===3?m*m:0));b===`x`&&(h=-f),b===`y`&&(h=-p),b===`z`&&(h=-m),a.push(h)}o=a[0];for(let e=1;e<w;e++)a[e]>o&&(o=a[e]);if(g||p)for(let e=0;e<w;e++){let t=a[e];g&&(t=g(t/o)*o),p&&(t=b?-t:k(o-t)),a[e]=t}if(U){u=Array(w);for(let e=0;e<w;e++)u[e]=V(-1,1,4)}O&&(a=J(a,V))}let G=P?(L-I)/o:I;f(s)&&(s=h?W(h,f(i.start)?h.iterationDuration:z):z);let K=s+(G*n(a[H],2)||0);if(U){let e=o?a[H]/o:0,t=Y+(X-Y)*e;K+=u[H]*t}return i.modifier&&(K=i.modifier(K)),R&&(K=`${K}${R[2]}`),K}},X=y(u(),1),Z=p();function ee(){let{user:t,signed:n,logout:r}=a(),c=s(),[l,u]=(0,X.useState)(!1),[d,f]=(0,X.useState)(!1),p=(0,X.useRef)(null),m=(0,X.useRef)(null);(0,X.useEffect)(()=>{let e=e=>{p.current&&!p.current.contains(e.target)&&u(!1),m.current&&!m.current.contains(e.target)&&f(!1)},t=e=>{e.key===`Escape`&&(u(!1),f(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,X.useEffect)(()=>{u(!1),f(!1)},[c.pathname]);let h=t||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=h?.avatarUrl||h?.avatar,_=h?.nome?.charAt(0).toUpperCase()||`U`,v=h?.nome?.split(` `)[0]||``,y=n?`/publicar`:`/login`,b=n?void 0:e(c,`/`);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`style`,{children:`
        .nl-root,
        .nl-root * {
          box-sizing: border-box;
        }

        .nl-root {
          position: sticky;
          top: 0;
          z-index: 9990;
          width: 100%;
          isolation: isolate;
          height: 74px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid rgba(8, 33, 38, 0.1);
          background: rgba(248, 246, 239, 0.88);
          backdrop-filter: blur(18px) saturate(145%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .nl-inner {
          width: min(1260px, 100%);
          height: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 28px;
        }

        .nl-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: #071326;
          text-decoration: none;
        }

        .nl-brand img {
          width: 44px;
          height: 44px;
          display: block;
          object-fit: contain;
        }

        .nl-wordmark {
          font-size: 15px;
          font-weight: 850;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .nl-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(18px, 2.5vw, 34px);
        }

        .nl-links a {
          position: relative;
          padding: 8px 0;
          color: #456067;
          text-decoration: none;
          font-size: 12px;
          font-weight: 760;
          transition: color 0.2s ease;
        }

        .nl-links a::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 3px;
          height: 2px;
          border-radius: 2px;
          background: #d9c49c;
          transition: right 0.2s ease;
        }

        .nl-links a:hover {
          color: #071326;
        }

        .nl-links a:hover::after {
          right: 0;
        }

        .nl-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
          min-width: 0;
        }

        .nl-menu-toggle {
          width: 40px;
          height: 40px;
          display: none;
          place-items: center;
          padding: 0;
          color: #102f50;
          border: 1px solid rgba(8, 33, 38, 0.16);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.62);
          cursor: pointer;
        }

        .nl-menu-toggle svg {
          width: 19px;
          height: 19px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
        }

        .nl-mobile-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 16px;
          right: 16px;
          display: none;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          padding: 12px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-mobile-menu-head {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 6px 6px 12px;
          border-bottom: 1px solid #e3ebe8;
          color: #071326;
        }

        .nl-mobile-menu-head img {
          width: 38px;
          height: 38px;
          display: block;
          object-fit: contain;
        }

        .nl-mobile-menu-head strong {
          display: block;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .nl-mobile-menu-head span {
          display: block;
          margin-top: 2px;
          color: #60767c;
          font-size: 11px;
          font-weight: 720;
        }

        .dark .nl-mobile-menu-head {
          color: #ecfdfb !important;
          border-bottom-color: #334155 !important;
        }

        .dark .nl-mobile-menu-head span {
          color: #b7c7cb !important;
        }

        .nl-mobile-menu a,
        .nl-mobile-menu button {
          display: flex;
          align-items: center;
          min-height: 42px;
          width: 100%;
          padding: 0 12px;
          color: #355158;
          border: 0;
          border-radius: 9px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 780;
          background: transparent;
          cursor: pointer;
        }

        .nl-mobile-menu a.nl-mobile-primary {
          grid-column: 1 / -1;
          justify-content: center;
          min-height: 46px;
          color: #ffffff;
          background: #071326;
        }

        .nl-mobile-menu a:hover,
        .nl-mobile-menu button:hover {
          color: #071326;
          background: #edf6f3;
        }

        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #ffffff;
          background: #102f50;
        }

        .dark .nl-mobile-menu a.nl-mobile-primary {
          color: #062326 !important;
          background: #d9c49c !important;
        }

        .nl-btn-ghost,
        .nl-btn-solid {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .nl-btn-ghost {
          color: #102f50;
          border: 1px solid rgba(8, 33, 38, 0.16);
          background: rgba(255, 255, 255, 0.56);
        }

        .nl-btn-ghost:hover {
          border-color: rgba(8, 33, 38, 0.28);
          background: #fff;
        }

        .nl-btn-solid {
          color: #fff;
          border: 1px solid #071326;
          background: #071326;
          box-shadow: 0 12px 24px -18px rgba(8, 33, 38, 0.75);
        }

        .nl-btn-solid:hover {
          transform: translateY(-1px);
          background: #102f50;
          box-shadow: 0 16px 28px -18px rgba(8, 33, 38, 0.8);
        }

        .nl-user-wrap {
          position: relative;
        }

        .nl-user-trigger {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px 4px 4px;
          color: #102f50;
          border: 1px solid rgba(8, 33, 38, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nl-user-trigger:hover,
        .nl-user-trigger.active {
          border-color: rgba(217, 196, 156, 0.62);
          background: #fff;
        }

        .nl-avatar {
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          overflow: hidden;
          display: grid;
          place-items: center;
          color: #102f50;
          border: 1px solid rgba(217, 196, 156, 0.42);
          border-radius: 50%;
          background: rgba(217, 196, 156, 0.18);
        }

        .nl-avatar img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .nl-avatar-initial,
        .nl-username {
          font-size: 12px;
          font-weight: 800;
        }

        .nl-chevron {
          stroke: #6b7d82;
          transition: transform 0.2s ease;
        }

        .nl-user-trigger.active .nl-chevron {
          transform: rotate(180deg);
        }

        .nl-user-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 210px;
          display: flex;
          flex-direction: column;
          padding: 8px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-ud-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 11px;
          color: #4d656b;
          border: 0;
          border-radius: 9px;
          background: transparent;
          text-align: left;
          text-decoration: none;
          font-size: 12px;
          font-weight: 720;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .nl-ud-item:hover {
          color: #071326;
          background: #f1f6f4;
        }

        .nl-ud-item svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .nl-ud-divider {
          height: 1px;
          margin: 6px 0;
          background: #e5eceb;
        }

        .nl-ud-item.logout:hover {
          color: #b42318;
          background: #fff3f1;
        }

        @media (max-width: 920px) {
          .nl-inner {
            gap: 18px;
          }

          .nl-links {
            display: none;
          }

          .nl-inner {
            grid-template-columns: auto 1fr;
          }

          .nl-actions {
            grid-column: 2;
          }

          .nl-menu-toggle,
          .nl-mobile-menu {
            display: grid;
          }
        }

        @media (max-width: 540px) {
          .nl-root {
            height: 66px;
            padding: 0 14px;
          }

          .nl-inner {
            gap: 10px;
          }

          .nl-brand img {
            width: 38px;
            height: 38px;
          }

          .nl-wordmark {
            display: inline;
            font-size: 12px;
            letter-spacing: 0.1em;
          }

          .nl-actions {
            gap: 6px;
          }

          .nl-btn-ghost,
          .nl-btn-solid,
          .nl-user-wrap {
            display: none;
          }

          .nl-user-trigger {
            padding-right: 8px;
          }

          .nl-menu-toggle {
            width: 36px;
            height: 36px;
          }

          .nl-mobile-menu {
            left: 10px;
            right: 10px;
            grid-template-columns: 1fr;
          }
        }

        /* Noxvelia logo palette navbar */
        .nl-root {
          border-bottom-color: rgba(7, 19, 38, 0.12) !important;
          background: rgba(255, 250, 240, 0.9) !important;
        }

        .nl-brand,
        .nl-links a,
        .nl-btn-ghost,
        .nl-user-trigger {
          color: #071326 !important;
        }

        .nl-links a::after {
          background: #d9c49c !important;
        }

        .nl-btn-ghost {
          border-color: rgba(7, 19, 38, 0.16) !important;
          background: rgba(255, 255, 255, 0.66) !important;
        }

        .nl-btn-ghost:hover {
          border-color: #d9c49c !important;
          background: #f0dfbb !important;
        }

        .nl-btn-solid,
        .nl-mobile-menu a.nl-mobile-primary {
          color: #071326 !important;
          border-color: #d9c49c !important;
          background: #d9c49c !important;
        }

        .nl-btn-solid:hover,
        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #071326 !important;
          background: #f0dfbb !important;
          border-color: #f0dfbb !important;
        }

        .dark .nl-root {
          border-bottom-color: rgba(240, 223, 187, 0.14) !important;
          background: rgba(7, 19, 38, 0.92) !important;
        }

        .dark .nl-brand,
        .dark .nl-links a,
        .dark .nl-btn-ghost,
        .dark .nl-user-trigger {
          color: #fffaf0 !important;
        }
      `}),(0,Z.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:m,children:[(0,Z.jsxs)(`div`,{className:`nl-inner`,children:[(0,Z.jsxs)(i,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,Z.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,Z.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,Z.jsxs)(`div`,{className:`nl-links`,children:[(0,Z.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,Z.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,Z.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,Z.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,Z.jsx)(i,{to:`/profissionais`,children:`Profissionais`})]}),(0,Z.jsxs)(`div`,{className:`nl-actions`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{u(!1),f(e=>!e)},"aria-expanded":d,"aria-controls":`nl-mobile-menu`,"aria-label":d?`Fechar navegação`:`Abrir navegação`,children:d?(0,Z.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,Z.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,Z.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,Z.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,Z.jsx)(o,{}),!n&&(0,Z.jsx)(i,{to:`/login`,state:{from:c.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,Z.jsx)(i,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),n?(0,Z.jsxs)(`div`,{ref:p,className:`nl-user-wrap`,children:[(0,Z.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${l?`active`:``}`,onClick:()=>{f(!1),u(e=>!e)},"aria-expanded":l,"aria-label":`Abrir menu de utilizador`,children:[(0,Z.jsx)(`span`,{className:`nl-avatar`,children:g?(0,Z.jsx)(`img`,{src:g,alt:``}):(0,Z.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,Z.jsx)(`span`,{className:`nl-username`,children:v}),(0,Z.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,Z.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),l&&(0,Z.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,Z.jsxs)(i,{to:`/perfil`,onClick:()=>u(!1),className:`nl-ud-item`,children:[(0,Z.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,Z.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,Z.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,Z.jsx)(`div`,{className:`nl-ud-divider`}),(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>{u(!1),r()},className:`nl-ud-item logout`,children:[(0,Z.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,Z.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,Z.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,Z.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),d&&(0,Z.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,Z.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,Z.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`strong`,{children:`Noxvelia`}),(0,Z.jsx)(`span`,{children:`Carros e imóveis em Portugal`})]})]}),(0,Z.jsx)(`a`,{href:`#pesquisa`,onClick:()=>f(!1),children:`Pesquisar`}),(0,Z.jsx)(`a`,{href:`#anunciar`,onClick:()=>f(!1),children:`Anunciar grátis`}),(0,Z.jsx)(`a`,{href:`#marcas`,onClick:()=>f(!1),children:`Marcas`}),(0,Z.jsx)(`a`,{href:`#atalhos`,onClick:()=>f(!1),children:`Atalhos`}),(0,Z.jsx)(i,{to:`/carros`,onClick:()=>f(!1),children:`Carros`}),(0,Z.jsx)(i,{to:`/imoveis`,onClick:()=>f(!1),children:`Imóveis`}),(0,Z.jsx)(i,{to:`/profissionais`,onClick:()=>f(!1),children:`Profissionais`}),(0,Z.jsx)(i,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>f(!1),children:`Publicar anúncio`}),n?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(i,{to:`/perfil`,onClick:()=>f(!1),children:`O meu perfil`}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>{f(!1),r()},children:`Terminar sessão`})]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(i,{to:`/login`,state:{from:c.pathname},onClick:()=>f(!1),children:`Entrar`}),(0,Z.jsx)(i,{to:`/registo`,onClick:()=>f(!1),children:`Registar`})]})]})]})]})}var te=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,ne=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],re=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],Q=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],ie=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],ae=[`T1`,`T2`,`T3`,`T4`,`T5+`],oe=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],se=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),ce=e=>e==null?`...`:new Intl.NumberFormat(`pt-PT`).format(e),le=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),ue=e=>`/marcas/${le(e)}.${e===`Jaecoo`?`svg`:`png`}`,de=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),fe=new Set([`aiways`,`aston-martin`,`bentley`]);function $(){let t=h(),n=s(),{signed:r}=a(),o=(0,X.useRef)(null),c=(0,X.useRef)(null),l=(0,X.useRef)(!1),u=r?`/publicar`:`/login`,d=r?void 0:e(n,`/`),[f,p]=(0,X.useState)({carro:[],imovel:[]}),[g,_]=(0,X.useState)(null),[y,x]=(0,X.useState)(!0),[S,C]=(0,X.useState)(!1),[w,E]=(0,X.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``});(0,X.useEffect)(()=>{let e=o.current;if(!e||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let t=b.context(()=>{b.from(`.lp-hero-brand, .lp-kicker, #lp-hero-title, .lp-hero-copy, .lp-actions, .lp-quick-card`,{y:22,opacity:0,duration:.78,stagger:.075,ease:`power3.out`})},e),n=D(e.querySelectorAll(`.lp-brand-card`),{opacity:[0,1],y:[12,0],delay:Y(18,{start:160}),duration:520,ease:`outCubic`});return()=>{t.revert(),n?.pause?.()}},[]),(0,X.useEffect)(()=>{let e=()=>{l.current||O()?.external===!0&&(l.current=!0,H(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||O()?.external===!0)&&e()};return window.addEventListener(T,t),()=>window.removeEventListener(T,t)},[]),(0,X.useEffect)(()=>{let e=!0;return m.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&_(t||null)}).catch(()=>{e&&_(null)}),()=>{e=!1}},[]);let k=w.tipo===`carro`&&w.marca?z(w.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],A=Number(g?.profissionais||0)>0,j=[{label:`Anúncios ativos`,value:g?.totalAnuncios},{label:`Carros`,value:g?.carros},{label:`Imóveis`,value:g?.imoveis},A?{label:`Profissionais`,value:g?.profissionais}:null].filter(e=>e&&Number(e.value||0)>0),M=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},U=(e,t)=>{E(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},W=e=>{e.preventDefault();let{tipo:n,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=w,l={distrito:s,precoMax:c,...n===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};H(`search_start`,{vertical:n}),t(M(n,l))};(0,X.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await m.get(`/anuncios/em-alta/semana`);if(!e)return;p({carro:(t?.carro||[]).slice(0,2),imovel:(t?.imovel||[]).slice(0,2)}),C(!1)}catch{e&&(p({carro:[],imovel:[]}),C(!0))}finally{e&&x(!1)}})(),()=>{e=!1}},[]);let G=(e,n)=>{try{localStorage.setItem(`@App:contexto_visual`,n===`/carros`?`carro`:`imovel`)}catch{}t(F(e))},K=e=>{c.current?.scrollBy({left:e*Math.min(720,window.innerWidth*.72),behavior:`smooth`})},q=y||f.carro.length>0||f.imovel.length>0,J=(e,t)=>{let n=e.tipo===`carro`,r=N(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,Z.jsxs)(`button`,{type:`button`,className:`lp-example-card ${n?`drive`:`estate`}`,onClick:()=>G(e,t),children:[(0,Z.jsxs)(`span`,{className:`lp-example-img`,children:[r?(0,Z.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,Z.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`}),(0,Z.jsxs)(`span`,{className:`lp-example-weekly`,children:[`Destaque `,n?`Carros`:`Imóveis`]})]}),(0,Z.jsxs)(`span`,{className:`lp-example-body`,children:[(0,Z.jsx)(`span`,{className:`lp-example-price`,children:se(e.preco)}),(0,Z.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,Z.jsx)(`span`,{className:`lp-example-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,Z.jsx)(`span`,{className:`lp-example-location`,children:e.localizacao?.cidade||`Portugal`})]})]},e._id)},$=(e,n)=>y?(0,Z.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,Z.jsx)(`span`,{className:`lp-state-loader`,"aria-hidden":`true`}),(0,Z.jsx)(`strong`,{children:`A selecionar os anúncios com mais interesse.`}),(0,Z.jsx)(`span`,{children:`Os destaques refletem as visitas dos últimos sete dias.`})]}):(0,Z.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,Z.jsx)(`strong`,{children:S?`A seleção semanal está a ser atualizada.`:`Descobre todas as oportunidades em ${e}.`}),(0,Z.jsx)(`span`,{children:S?`Entretanto, encontra todos os anúncios na pesquisa completa.`:`Explora a pesquisa e encontra o que combina contigo.`}),(0,Z.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>t(n),children:[`Explorar `,e]})]});return(0,Z.jsxs)(`div`,{className:`lp-root`,ref:o,children:[(0,Z.jsx)(L,{title:`Noxvelia | Plataforma de carros e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.`,path:`/`,jsonLd:[I,P]}),(0,Z.jsx)(`style`,{children:`
        .lp-root,
        .lp-root * {
          box-sizing: border-box;
        }

        .lp-root {
          --lp-ink: #082126;
          --lp-ink-soft: #254047;
          --lp-drive: #d9c49c;
          --lp-estate: #102f50;
          --lp-gold: #c6a86a;
          --lp-stone: #f2f0e8;
          --lp-cream: #fbfaf6;
          min-height: 100vh;
          overflow: clip;
          background: var(--lp-stone);
          color: var(--lp-ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .lp-root button,
        .lp-root a {
          font: inherit;
        }

        .lp-root a:focus-visible,
        .lp-root button:focus-visible {
          outline: 3px solid rgba(217, 196, 156, 0.48);
          outline-offset: 3px;
        }

        .lp-shell {
          width: min(1260px, calc(100% - 48px));
          margin: 0 auto;
        }

        .lp-hero {
          position: relative;
          padding: 30px 0 58px;
          background: var(--lp-bg);
        }

        .lp-hero-card {
          min-height: 520px;
          display: grid;
          grid-template-columns: minmax(430px, 0.86fr) minmax(0, 1.14fr);
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 32px;
          background: var(--lp-ink);
          box-shadow: none;
        }

        .lp-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(38px, 4vw, 54px);
          color: #fff;
          background: var(--lp-ink);
        }

        .lp-hero-content::after {
          content: "";
          position: absolute;
          right: -56px;
          top: 0;
          bottom: 0;
          width: 112px;
          z-index: -1;
          background: transparent;
          pointer-events: none;
        }

        .lp-kicker,
        .lp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .lp-kicker {
          margin-bottom: 22px;
          padding: 8px 11px;
          color: #dcfff9;
          border: 1px solid rgba(104, 232, 214, 0.28);
          border-radius: 999px;
          background: rgba(217, 196, 156, 0.12);
        }

        .lp-hero h1 {
          max-width: 680px;
          margin: 0;
          font-size: clamp(39px, 4.4vw, 54px);
          font-weight: 780;
          line-height: 0.99;
          letter-spacing: -0.052em;
          text-wrap: balance;
        }

        .lp-hero h1 span {
          color: #7be0d4;
        }

        .lp-hero-copy {
          max-width: 570px;
          margin: 20px 0 0;
          color: #c8d6d8;
          font-size: 15px;
          line-height: 1.65;
        }

        .lp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 24px;
        }

        .lp-btn {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 19px;
          border: 1px solid transparent;
          border-radius: 12px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .lp-btn:hover {
          border-color: rgba(255, 255, 255, 0.28);
        }

        .lp-btn-drive {
          color: #052326;
          background: var(--lp-drive);
          box-shadow: none;
        }

        .lp-btn-estate {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }

        .lp-btn-estate:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.36);
        }

        .lp-hero-media {
          position: relative;
          min-width: 0;
          background: #b8d4cd;
        }

        .lp-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: transparent;
          pointer-events: none;
        }

        .lp-hero-media img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          display: block;
          object-fit: cover;
          object-position: 58% center;
        }

        .lp-hero-photo-label {
          position: absolute;
          z-index: 2;
          right: 22px;
          bottom: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          color: #102b30;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.88);
          box-shadow: none;
          backdrop-filter: none;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-trust-bar {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .lp-trust-item {
          min-height: 62px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 15px;
          color: #365158;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.58);
          font-size: 12.5px;
          font-weight: 750;
          backdrop-filter: none;
        }

        .lp-quick-section {
          position: relative;
          z-index: 4;
          padding: 0 0 72px;
          background: var(--lp-stone);
        }

        .lp-quick-card {
          margin-top: -34px;
          padding: 18px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: none;
          backdrop-filter: none;
        }

        .lp-quick-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 16px;
        }

        .lp-quick-title {
          margin: 0;
          color: var(--lp-ink);
          font-size: 18px;
          font-weight: 850;
          letter-spacing: -0.02em;
        }

        .lp-type-tabs {
          display: inline-grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 5px;
          padding: 5px;
          border: 1px solid rgba(8, 33, 38, 0.09);
          border-radius: 13px;
          background: #f4f7f4;
        }

        .lp-type-tab {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 14px;
          color: #4a656b;
          border: 0;
          border-radius: 9px;
          background: transparent;
          font-size: 12px;
          font-weight: 820;
          cursor: pointer;
        }

        .lp-type-tab.active {
          color: #042326;
          background: #fff;
          box-shadow: none;
        }

        .lp-search-form {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr)) auto;
          gap: 10px;
          align-items: end;
        }

        .lp-field {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lp-field label {
          color: #60767c;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-field select,
        .lp-field input {
          width: 100%;
          min-height: 46px;
          padding: 0 12px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.13);
          border-radius: 11px;
          background: #fff;
          font-size: 13px;
          font-weight: 680;
        }

        .lp-field select:disabled {
          color: #87979b;
          background: #f4f6f5;
        }

        .lp-search-submit {
          min-height: 46px;
          min-width: 148px;
          color: #062326;
          border: 0;
          border-radius: 11px;
          background: var(--lp-drive);
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          box-shadow: none;
        }

        .lp-promo-section {
          padding: 0 0 78px;
          background: var(--lp-stone);
        }

        .lp-promo-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lp-promo-link {
          position: relative;
          min-height: 320px;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
          align-items: stretch;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 22px;
          background: #fff;
          text-decoration: none;
          box-shadow: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-promo-link:hover {
          border-color: rgba(8, 33, 38, 0.22);
        }

        .lp-promo-copy {
          position: relative;
          z-index: 2;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          padding: clamp(24px, 4vw, 42px);
          color: var(--lp-ink);
        }

        .lp-promo-label {
          width: fit-content;
          color: #49646a;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 8px;
          background: #f7f8f5;
          padding: 6px 9px;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-promo-title {
          max-width: 380px;
          color: var(--lp-ink);
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 830;
          line-height: 1.08;
        }

        .lp-promo-title span {
          display: block;
          color: #4d6268;
          font-weight: 520;
        }

        .lp-promo-text {
          max-width: 320px;
          margin: 0;
          color: #5d7278;
          font-size: 13.5px;
          line-height: 1.55;
        }

        .lp-promo-media {
          min-width: 0;
          display: block;
          background: #d8e2df;
        }

        .lp-promo-media img {
          width: 100%;
          height: 100%;
          min-height: 320px;
          display: block;
          object-fit: cover;
          object-position: 76% center;
        }

        .lp-promo-overlay {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 14px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.16);
          border-radius: 8px;
          background: #fff;
          box-shadow: none;
          font-size: 12px;
          font-weight: 850;
        }

        .lp-shortcuts-section {
          background: #f8f6ef;
          border-top: 1px solid rgba(8, 33, 38, 0.08);
          border-bottom: 1px solid rgba(8, 33, 38, 0.08);
        }

        .lp-shortcut-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .lp-shortcut-group {
          min-width: 0;
          padding: 18px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
        }

        .lp-shortcut-group.wide {
          grid-column: span 2;
        }

        .lp-shortcut-group h3 {
          margin: 0 0 13px;
          color: var(--lp-ink);
          font-size: 14px;
          font-weight: 850;
        }

        .lp-chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .lp-chip {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          padding: 0 11px;
          color: #315057;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 999px;
          background: #fff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 760;
          transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .lp-chip:hover {
          color: var(--lp-ink);
          border-color: rgba(217, 196, 156, 0.52);
        }

        .lp-guides-section {
          background: #edf4f2;
        }

        .lp-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .lp-guide-card {
          min-height: 210px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 22px;
          padding: 20px;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
        }

        .lp-guide-card span {
          color: #16776f;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .lp-guide-card h3 {
          margin: 0;
          font-size: 20px;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }

        .lp-guide-card p {
          margin: 10px 0 0;
          color: #526b72;
          font-size: 13px;
          line-height: 1.55;
        }

        .lp-favorites-strip {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          margin-top: 18px;
          padding: 22px;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 19px;
          background: #fff;
        }

        .lp-favorites-strip h3 {
          margin: 0;
          color: var(--lp-ink);
          font-size: 20px;
          letter-spacing: -0.02em;
        }

        .lp-favorites-strip p {
          margin: 7px 0 0;
          color: #526b72;
          font-size: 13px;
          line-height: 1.55;
        }

        .lp-section {
          position: relative;
          padding: 78px 0;
        }

        .lp-section[id] {
          scroll-margin-top: 86px;
        }

        .lp-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 26px;
          margin-bottom: 30px;
        }

        .lp-section-head > div:first-child {
          max-width: 730px;
        }

        .lp-eyebrow {
          margin-bottom: 12px;
          color: #16776f;
        }

        .lp-title {
          margin: 0;
          color: var(--lp-ink);
          font-size: clamp(31px, 4.2vw, 46px);
          font-weight: 780;
          line-height: 1.06;
          letter-spacing: -0.042em;
          text-wrap: balance;
        }

        .lp-copy {
          max-width: 680px;
          margin: 15px 0 0;
          color: #587077;
          font-size: 14.5px;
          line-height: 1.7;
        }

        .lp-brands-section {
          overflow: hidden;
          background: #f3f0e6;
        }

        .lp-brand-controls {
          display: flex;
          gap: 8px;
          flex: 0 0 auto;
        }

        .lp-round-btn {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          color: var(--lp-ink);
          border: 1px solid rgba(8, 33, 38, 0.15);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .lp-round-btn:hover {
          background: #fff;
        }

        .lp-brand-scroll {
          overflow-x: auto;
          overscroll-behavior-inline: contain;
          scroll-snap-type: x proximity;
          scrollbar-width: thin;
          scrollbar-color: rgba(8, 33, 38, 0.22) transparent;
          padding: 4px 0 14px;
        }

        .lp-brand-grid {
          width: max-content;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 158px;
          grid-template-rows: repeat(2, 94px);
          gap: 10px;
          padding-right: 24px;
        }

        .lp-brand-card {
          --lp-brand-card-bg: rgba(255, 255, 255, 0.7);
          scroll-snap-align: start;
          min-width: 0;
          display: grid;
          grid-template-rows: 46px auto;
          align-items: center;
          justify-items: center;
          gap: 5px;
          padding: 11px 10px 9px;
          color: #284248;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 15px;
          background: var(--lp-brand-card-bg);
          text-decoration: none;
          box-shadow: none;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-brand-card:hover {
          border-color: rgba(217, 196, 156, 0.5);
          background: #fff;
        }

        .lp-brand-mark {
          position: relative;
          width: 104px;
          height: 42px;
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .lp-brand-mark img {
          position: relative;
          z-index: 1;
          max-width: 100%;
          max-height: 42px;
          display: block;
          object-fit: contain;
        }

        .lp-brand-fallback {
          position: absolute;
          inset: 0;
          display: none;
          place-items: center;
          color: #567077;
          font-size: 16px;
          font-weight: 850;
          letter-spacing: 0.08em;
        }

        .lp-brand-mark.logo-error .lp-brand-fallback {
          display: grid;
        }

        .lp-brand-mark-clean::after {
          content: "";
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: 0;
          left: 0;
          height: 15px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0), var(--lp-brand-card-bg) 48%);
          pointer-events: none;
        }

        .lp-brand-name {
          max-width: 100%;
          overflow: hidden;
          color: #405a60;
          font-size: 10.5px;
          font-weight: 750;
          line-height: 1.2;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .lp-popular-section {
          background: #e5ebe5;
          border-top: 1px solid rgba(8, 33, 38, 0.08);
          border-bottom: 1px solid rgba(8, 33, 38, 0.08);
        }

        .lp-examples-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lp-example-column {
          min-width: 0;
          padding: 17px;
          overflow: hidden;
          border: 1px solid rgba(8, 33, 38, 0.11);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: none;
        }

        .lp-example-column.drive,
        .lp-example-column.estate {
          border-color: rgba(8, 33, 38, 0.14);
        }

        .lp-column-top {
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 13px;
          padding: 2px 2px 0;
        }

        .lp-column-heading {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lp-column-title {
          margin: 0;
          font-size: 16px;
          font-weight: 820;
          letter-spacing: -0.02em;
        }

        .lp-column-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 0;
          color: #2e5e5a;
          border: 0;
          background: transparent;
          font-size: 11.5px;
          font-weight: 820;
          cursor: pointer;
          white-space: nowrap;
        }

        .lp-example-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 11px;
        }

        .lp-example-card {
          min-width: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 0;
          color: inherit;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 15px;
          background: #fff;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .lp-example-card:hover {
          border-color: rgba(8, 33, 38, 0.22);
        }

        .lp-example-img {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          display: block;
          background: #dfe7e4;
        }

        .lp-example-img img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .lp-example-card:hover .lp-example-img img {
          opacity: 0.96;
        }

        .lp-example-no-photo {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: #7c9195;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-example-weekly {
          position: absolute;
          left: 9px;
          bottom: 9px;
          max-width: calc(100% - 18px);
          padding: 6px 8px;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: rgba(8, 33, 38, 0.82);
          font-size: 9px;
          font-weight: 800;
          backdrop-filter: none;
        }

        .lp-example-body {
          display: grid;
          gap: 6px;
          padding: 13px;
        }

        .lp-example-price {
          color: var(--lp-ink);
          font-size: 19px;
          font-weight: 830;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .lp-example-title {
          min-height: 34px;
          color: #2f484e;
          font-size: 12.5px;
          font-weight: 780;
          line-height: 1.35;
        }

        .lp-example-meta,
        .lp-example-location {
          min-width: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #718388;
          font-size: 10.8px;
          font-weight: 680;
        }

        .lp-example-state {
          grid-column: 1 / -1;
          min-height: 218px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          padding: 26px;
          color: #62797f;
          border: 1px dashed rgba(8, 33, 38, 0.22);
          border-radius: 14px;
          background: rgba(239, 244, 241, 0.78);
          font-size: 12.5px;
          line-height: 1.5;
        }

        .lp-example-state strong {
          color: var(--lp-ink);
          font-size: 14.5px;
        }

        .lp-state-loader {
          width: 24px;
          height: 24px;
          margin-bottom: 3px;
          border: 3px solid rgba(217, 196, 156, 0.2);
          border-top-color: var(--lp-drive);
          border-radius: 50%;
        }

        .lp-cv-section {
          background: #f1ede3;
        }

        .lp-cv-card {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.72fr);
          gap: 44px;
          align-items: center;
          padding: clamp(34px, 5vw, 62px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          background: #071b20;
          box-shadow: none;
        }

        .lp-cv-card::before {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          left: -110px;
          bottom: -130px;
          border: 1px solid rgba(198, 168, 106, 0.3);
          border-radius: 50%;
        }

        .lp-cv-copy {
          position: relative;
          z-index: 1;
        }

        .lp-cv-copy .lp-eyebrow {
          color: #f0dfbb;
        }

        .lp-cv-copy .lp-title {
          max-width: 700px;
          color: #fff;
        }

        .lp-cv-copy .lp-copy {
          color: #bfd1d4;
        }

        .lp-cv-points {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px 18px;
          margin: 23px 0 0;
          padding: 0;
          list-style: none;
        }

        .lp-cv-points li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #d3dfe1;
          font-size: 12px;
          font-weight: 700;
        }

        .lp-cv-copy .lp-btn {
          margin-top: 28px;
        }

        .lp-cv-panel {
          position: relative;
          z-index: 1;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 30px;
          color: var(--lp-ink);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: none;
        }

        .lp-cv-panel > span {
          color: #72878c;
          font-size: 10px;
          font-weight: 820;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
        }

        .lp-cv-panel img {
          width: min(100%, 320px);
          height: auto;
          display: block;
        }

        .lp-cv-code {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 13px;
          border: 1px solid #d9e3e4;
          border-radius: 10px;
          background: #f3f7f7;
        }

        .lp-cv-code small {
          color: #73878c;
          font-size: 9px;
          font-weight: 780;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-cv-code strong {
          color: #0b5961;
          font-size: 13px;
          letter-spacing: 0.06em;
        }

        .lp-closing-section {
          position: relative;
          padding: 76px 0;
          background: var(--lp-ink);
        }

        .lp-closing-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 34px;
          align-items: center;
          padding: clamp(30px, 5vw, 54px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 26px;
          background: #0a282e;
        }

        .lp-closing-card .lp-eyebrow {
          color: #f0dfbb;
        }

        .lp-closing-card .lp-title {
          max-width: 760px;
          color: #fff;
        }

        .lp-closing-card .lp-copy {
          color: #bfd0d3;
        }

        .lp-closing-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 190px;
        }

        .lp-closing-actions .lp-btn {
          width: 100%;
        }

        @keyframes lp-rise {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lp-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 980px) {
          .lp-hero-card {
            grid-template-columns: 1fr;
          }

          .lp-hero-content::after {
            display: none;
          }

          .lp-hero-media,
          .lp-hero-media img {
            min-height: 390px;
          }

          .lp-examples-grid,
          .lp-promo-grid,
          .lp-guides-grid,
          .lp-cv-card,
          .lp-closing-card {
            grid-template-columns: 1fr;
          }

          .lp-search-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lp-search-submit {
            grid-column: span 2;
          }

          .lp-shortcut-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lp-cv-panel {
            min-height: 220px;
          }

          .lp-closing-actions {
            width: min(100%, 440px);
            flex-direction: row;
          }
        }

        @media (max-width: 700px) {
          .lp-shell {
            width: min(100% - 32px, 1260px);
          }

          .lp-hero {
            padding: 16px 0 42px;
          }

          .lp-hero-card {
            min-height: 0;
            border-radius: 23px;
          }

          .lp-hero-content {
            padding: 34px 22px 32px;
          }

          .lp-kicker {
            margin-bottom: 17px;
            font-size: 9.5px;
          }

          .lp-hero h1 {
            font-size: clamp(34px, 10vw, 42px);
            line-height: 1.01;
          }

          .lp-hero-copy {
            margin-top: 18px;
            font-size: 14px;
          }

          .lp-actions {
            display: grid;
            grid-template-columns: 1fr;
            margin-top: 24px;
          }

          .lp-btn {
            width: 100%;
          }

          .lp-hero-media,
          .lp-hero-media img {
            min-height: 292px;
          }

          .lp-hero-photo-label {
            right: 14px;
            bottom: 14px;
          }

          .lp-trust-bar {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .lp-trust-item {
            min-height: 54px;
          }

          .lp-quick-section,
          .lp-promo-section {
            padding-bottom: 58px;
          }

          .lp-quick-card {
            margin-top: -22px;
            padding: 14px;
            border-radius: 18px;
          }

          .lp-quick-top,
          .lp-favorites-strip {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }

          .lp-quick-top {
            flex-direction: column;
          }

          .lp-type-tabs {
            width: 100%;
          }

          .lp-search-form,
          .lp-shortcut-grid {
            grid-template-columns: 1fr;
          }

          .lp-search-submit,
          .lp-shortcut-group.wide {
            grid-column: auto;
          }

          .lp-promo-link,
          .lp-promo-media img {
            min-height: 245px;
          }

          .lp-promo-link {
            grid-template-columns: 1fr;
          }

          .lp-promo-media {
            order: -1;
          }

          .lp-promo-copy {
            padding: 22px;
          }

          .lp-section,
          .lp-closing-section {
            padding: 58px 0;
          }

          .lp-section-head {
            align-items: flex-start;
            margin-bottom: 24px;
          }

          .lp-title {
            font-size: clamp(29px, 9vw, 38px);
          }

          .lp-copy {
            font-size: 13.5px;
          }

          .lp-brand-controls {
            display: none;
          }

          .lp-brand-grid {
            grid-auto-columns: 132px;
            grid-template-rows: repeat(2, 82px);
            gap: 8px;
          }

          .lp-brand-card {
            grid-template-rows: 38px auto;
            padding: 8px;
            border-radius: 13px;
          }

          .lp-brand-mark {
            width: 90px;
            height: 36px;
          }

          .lp-brand-mark img {
            max-height: 35px;
          }

          .lp-example-column {
            padding: 14px;
            border-radius: 18px;
          }

          .lp-example-list {
            grid-template-columns: 1fr;
          }

          .lp-example-state {
            min-height: 185px;
          }

          .lp-cv-card,
          .lp-closing-card {
            gap: 28px;
            padding: 28px 21px;
            border-radius: 22px;
          }

          .lp-cv-points {
            grid-template-columns: 1fr;
          }

          .lp-cv-panel {
            min-height: 190px;
            padding: 24px 18px;
          }

          .lp-closing-actions {
            width: 100%;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-root *,
          .lp-root *::before,
          .lp-root *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .lp-root {
          --lp-ink: #102326;
          --lp-ink-soft: #394f54;
          --lp-muted: #617277;
          --lp-border: #d6dedb;
          --lp-border-strong: #b8c5c1;
          --lp-surface: #ffffff;
          --lp-surface-soft: #f4f6f2;
          --lp-bg: #eceee8;
          --lp-bg-alt: #f6f7f3;
          --lp-dark: #0d2327;
          --lp-drive: #d9c49c;
          --lp-estate: #2f8f63;
          --lp-gold: #9d7b3f;
          --lp-radius: 10px;
          --lp-radius-soft: 8px;
          background: var(--lp-bg) !important;
        }

        .lp-root :where(h1, h2, h3, .lp-title, .lp-quick-title, .lp-column-title, .lp-example-price) {
          letter-spacing: 0 !important;
        }

        .lp-root :where(.lp-hero, .lp-quick-section, .lp-promo-section, .lp-brands-section, .lp-shortcuts-section, .lp-guides-section, .lp-popular-section, .lp-cv-section, .lp-closing-section) {
          background: var(--lp-bg) !important;
          border: 0 !important;
        }

        .lp-root :where(.lp-brands-section, .lp-shortcuts-section, .lp-guides-section, .lp-cv-section) {
          background: var(--lp-bg-alt) !important;
        }

        .lp-root :where(.lp-hero-card, .lp-cv-card, .lp-closing-card) {
          border-radius: var(--lp-radius) !important;
          box-shadow: none !important;
          animation: none !important;
        }

        .lp-hero-card {
          border: 1px solid #18373d !important;
          background: var(--lp-dark) !important;
        }

        .lp-hero-content,
        .lp-cv-card,
        .lp-closing-card {
          background: var(--lp-dark) !important;
        }

        .lp-hero-content::after,
        .lp-hero-media::after,
        .lp-cv-card::before {
          display: none !important;
        }

        .lp-hero-media {
          animation: none !important;
          background: #d7dfdc !important;
        }

        .lp-kicker,
        .lp-eyebrow {
          letter-spacing: 0.08em !important;
        }

        .lp-kicker {
          color: #dff8f5 !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: var(--lp-radius-soft) !important;
          background: rgba(36, 184, 171, 0.16) !important;
        }

        .lp-hero h1 span {
          color: #7fded6 !important;
        }

        .lp-btn,
        .lp-search-submit,
        .lp-type-tab,
        .lp-chip,
        .lp-round-btn,
        .lp-column-link {
          transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease !important;
        }

        .lp-btn:hover,
        .lp-promo-link:hover,
        .lp-chip:hover,
        .lp-brand-card:hover,
        .lp-round-btn:hover,
        .lp-example-card:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .lp-btn,
        .lp-search-submit {
          border-radius: var(--lp-radius-soft) !important;
          box-shadow: none !important;
        }

        .lp-btn-drive,
        .lp-search-submit {
          color: #062326 !important;
          background: var(--lp-drive) !important;
        }

        .lp-btn-estate {
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          background: transparent !important;
        }

        .lp-btn-estate:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .lp-hero-photo-label,
        .lp-promo-overlay,
        .lp-example-weekly {
          border-radius: var(--lp-radius-soft) !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        .lp-trust-item,
        .lp-quick-card,
        .lp-promo-link,
        .lp-shortcut-group,
        .lp-guide-card,
        .lp-favorites-strip,
        .lp-example-column,
        .lp-example-card,
        .lp-example-state,
        .lp-cv-panel,
        .lp-cv-code,
          .lp-brand-card,
          .lp-type-tabs {
          border: 1px solid var(--lp-border) !important;
          border-radius: var(--lp-radius) !important;
          background: var(--lp-surface) !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        .lp-example-column.drive,
        .lp-example-column.estate {
          box-shadow: none !important;
        }

        .lp-example-img img {
          transition: none !important;
        }

        .lp-example-card:hover .lp-example-img img {
          transform: none !important;
        }

        .lp-state-loader {
          animation: none !important;
          border-color: var(--lp-border-strong) !important;
          border-top-color: var(--lp-drive) !important;
        }

        .lp-brand-card {
          border-radius: var(--lp-radius-soft) !important;
        }

        .lp-promo-link {
          isolation: isolate;
          border-color: var(--lp-border-strong) !important;
          background: var(--lp-surface) !important;
        }

        .lp-promo-link::before,
        .lp-promo-link::after {
          display: none !important;
        }

        .lp-promo-copy {
          background: var(--lp-surface) !important;
        }

        .lp-promo-label {
          color: var(--lp-ink-soft) !important;
          border-color: var(--lp-border) !important;
          border-radius: var(--lp-radius-soft) !important;
          background: var(--lp-surface-soft) !important;
        }

        .lp-promo-title,
        .lp-promo-title span {
          letter-spacing: 0 !important;
        }

        .lp-promo-title {
          color: var(--lp-ink) !important;
        }

        .lp-promo-title span {
          color: var(--lp-muted) !important;
        }

        .lp-promo-media {
          border-left: 1px solid var(--lp-border) !important;
          background: var(--lp-surface-soft) !important;
        }

        .lp-promo-overlay {
          border-color: var(--lp-border-strong) !important;
          background: var(--lp-surface) !important;
        }

        .lp-brand-scroll {
          scrollbar-color: var(--lp-border-strong) transparent !important;
        }

        .lp-cv-card {
          border: 1px solid #18373d !important;
        }

        .lp-cv-panel {
          color: var(--lp-ink) !important;
        }

        .lp-closing-card {
          border: 1px solid #18373d !important;
        }

        .lp-root :where(
          .lp-hero,
          .lp-hero-card,
          .lp-hero-content,
          .lp-hero-media,
          .lp-quick-section,
          .lp-promo-section,
          .lp-promo-link,
          .lp-promo-copy,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-guides-section,
          .lp-cv-section,
          .lp-cv-card,
          .lp-cv-panel,
          .lp-closing-section,
          .lp-closing-card,
          .lp-btn,
          .lp-search-submit,
          .lp-type-tab.active
        ) {
          background-image: none !important;
        }

        .lp-copy,
        .lp-promo-text,
        .lp-guide-card p,
        .lp-favorites-strip p,
        .lp-cv-points {
          max-width: 560px !important;
        }

        .lp-section-head {
          margin-bottom: 18px !important;
        }

        .lp-title {
          max-width: 720px !important;
        }

        .lp-root :where(.lp-hero-content, .lp-hero-media, .lp-cv-card, .lp-promo-link)::before,
        .lp-root :where(.lp-hero-content, .lp-hero-media, .lp-cv-card, .lp-promo-link)::after {
          content: none !important;
          display: none !important;
        }

        .lp-trust-item {
          align-items: flex-start !important;
          justify-content: center !important;
          gap: 0 !important;
          padding: 16px 17px !important;
          color: var(--lp-ink-soft) !important;
          line-height: 1.45 !important;
        }

        .lp-type-tab,
        .lp-column-heading,
        .lp-cv-points li,
        .lp-example-meta,
        .lp-example-location {
          gap: 0 !important;
        }

        .lp-round-btn {
          width: auto !important;
          min-width: 82px !important;
          padding: 0 12px !important;
          border-radius: var(--lp-radius-soft) !important;
          font-size: 11px !important;
        }

        .lp-hero {
          padding: 42px 0 22px !important;
          background: var(--lp-bg) !important;
        }

        .lp-hero-card {
          min-height: 0 !important;
          display: grid !important;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr) !important;
          position: relative !important;
          overflow: hidden !important;
          background: #ffffff !important;
          border: 1px solid var(--lp-border) !important;
          border-radius: 8px !important;
          box-shadow: 0 18px 44px rgba(7, 27, 34, 0.08) !important;
        }

        .lp-hero-media {
          position: relative !important;
          inset: auto !important;
          min-height: 440px !important;
          background: #eef3ef !important;
          border-left: 1px solid var(--lp-border) !important;
        }

        .lp-hero-media img {
          width: 100% !important;
          height: 100% !important;
          min-height: 440px !important;
          object-fit: cover !important;
          object-position: center !important;
          opacity: 1 !important;
          filter: none !important;
        }

        .lp-hero-content {
          position: relative !important;
          z-index: 2 !important;
          width: auto !important;
          min-height: 440px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          padding: clamp(32px, 5vw, 64px) !important;
          background: #ffffff !important;
        }

        .lp-hero h1 {
          max-width: 560px !important;
          font-size: clamp(38px, 5vw, 62px) !important;
          line-height: 1.02 !important;
          color: var(--lp-ink) !important;
        }

        .lp-kicker {
          color: #06373b !important;
          border-color: rgba(36, 184, 171, 0.34) !important;
          background: rgba(36, 184, 171, 0.16) !important;
        }

        .lp-hero h1 span {
          display: block !important;
          color: var(--lp-teal-dark) !important;
        }

        .lp-hero-copy {
          max-width: 470px !important;
          font-size: 16px !important;
          color: var(--lp-ink-soft) !important;
        }

        .lp-actions {
          margin-top: 28px !important;
          align-items: center !important;
          gap: 12px !important;
        }

        .lp-btn {
          border-radius: 8px !important;
          box-shadow: none !important;
          min-width: 112px !important;
        }

        .lp-btn-estate {
          color: var(--lp-ink) !important;
          border-color: var(--lp-border-strong) !important;
          background: #ffffff !important;
        }

        .lp-btn-estate:hover {
          color: var(--lp-ink) !important;
          background: #f7faf8 !important;
          border-color: var(--lp-teal-dark) !important;
        }

        .lp-hero-photo-label {
          display: none !important;
        }

        .lp-trust-bar {
          display: none !important;
        }

        .lp-quick-section {
          padding: 0 0 48px !important;
        }

        .lp-quick-card {
          margin-top: 10px !important;
          border-radius: 8px !important;
          padding: 18px !important;
          box-shadow: none !important;
          border: 1px solid var(--lp-border) !important;
        }

        .lp-quick-top {
          margin-bottom: 13px !important;
        }

        .lp-quick-title {
          font-size: 17px !important;
        }

        .lp-promo-section,
        .lp-section,
        .lp-closing-section {
          padding-top: 50px !important;
          padding-bottom: 50px !important;
        }

        .lp-promo-grid {
          gap: 18px !important;
        }

        .lp-promo-link {
          display: grid !important;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr) !important;
          min-height: 300px !important;
          background: #ffffff !important;
          border: 1px solid var(--lp-border) !important;
          box-shadow: none !important;
          overflow: hidden !important;
        }

        .lp-promo-copy {
          min-height: 300px !important;
          padding: 32px !important;
          justify-content: center !important;
          background: #ffffff !important;
        }

        .lp-promo-title {
          max-width: 360px !important;
          font-size: clamp(24px, 2.4vw, 34px) !important;
          line-height: 1.05 !important;
        }

        .lp-promo-text {
          max-width: 300px !important;
        }

        .lp-promo-media {
          min-height: 300px !important;
          border-left: 1px solid var(--lp-border) !important;
          background: #eef3ef !important;
        }

        .lp-promo-media img {
          height: 100% !important;
          opacity: 1 !important;
          filter: none !important;
          transform: none !important;
        }

        .lp-promo-link,
        .lp-shortcut-group,
        .lp-guide-card,
        .lp-favorites-strip,
        .lp-example-column,
        .lp-cv-card,
        .lp-closing-card {
          border-radius: 8px !important;
        }

        @media (max-width: 700px) {
          .lp-root :where(.lp-hero-card, .lp-cv-card, .lp-closing-card) {
            border-radius: var(--lp-radius) !important;
          }

          .lp-trust-item,
          .lp-quick-card,
          .lp-promo-link,
          .lp-shortcut-group,
          .lp-guide-card,
          .lp-favorites-strip,
          .lp-example-column,
          .lp-example-card,
          .lp-example-state,
          .lp-cv-panel,
          .lp-cv-code,
            .lp-brand-card,
            .lp-type-tabs {
            border-radius: var(--lp-radius-soft) !important;
          }

          .lp-promo-media {
            border-left: 0 !important;
            border-bottom: 1px solid var(--lp-border) !important;
          }

          .lp-section-head .lp-copy,
          .lp-guide-card p,
          .lp-favorites-strip p,
          .lp-cv-points {
            display: none !important;
          }

          .lp-trust-bar {
            grid-template-columns: 1fr !important;
          }

          .lp-hero {
            padding-top: 18px !important;
          }

          .lp-hero-card {
            grid-template-columns: 1fr !important;
          }

          .lp-hero-content {
            min-height: auto !important;
            padding: 28px 22px 24px !important;
          }

          .lp-hero-media {
            min-height: 260px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }

          .lp-hero-media img {
            min-height: 260px !important;
          }

          .lp-hero h1 {
            font-size: clamp(36px, 12vw, 50px) !important;
          }

          .lp-hero-copy {
            max-width: 330px !important;
          }

          .lp-promo-link {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }

          .lp-promo-copy {
            min-height: auto !important;
            padding: 24px !important;
          }

          .lp-promo-media {
            min-height: 220px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }
        }

        .lp-root {
          --lp-teal-dark: #168b82;
          --lp-dark: #082126;
          --lp-bg: #eef1ec;
          --lp-bg-alt: #fbfcf9;
          --lp-surface-soft: #f5f7f2;
        }

        .lp-shell {
          width: min(1180px, calc(100% - 48px)) !important;
        }

        .lp-hero {
          padding: 22px 0 0 !important;
        }

        .lp-hero .lp-shell {
          width: min(1180px, calc(100% - 48px)) !important;
        }

        .lp-hero-card {
          height: 420px !important;
          min-height: 0 !important;
          grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr) !important;
          overflow: hidden !important;
          background: var(--lp-dark) !important;
          border-color: rgba(8, 33, 38, 0.22) !important;
          border-radius: 8px !important;
          box-shadow: none !important;
          transform: translateY(8px) !important;
        }

        .lp-hero-content {
          height: 100% !important;
          min-height: 0 !important;
          padding: 30px 42px !important;
          color: #ffffff !important;
          background: var(--lp-dark) !important;
        }

        .lp-hero-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 12px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lp-hero-brand img {
          width: 44px;
          height: 44px;
          display: block;
          object-fit: contain;
        }

        .lp-hero .lp-kicker {
          margin-bottom: 14px !important;
          padding: 7px 10px !important;
          color: #dff8f5 !important;
          border-color: rgba(126, 227, 215, 0.28) !important;
          background: rgba(36, 184, 171, 0.14) !important;
        }

        .lp-hero h1 {
          color: #ffffff !important;
          font-size: clamp(31px, 2.7vw, 42px) !important;
          line-height: 1.02 !important;
        }

        .lp-hero h1 span {
          color: #f0dfbb !important;
        }

        .lp-hero-copy {
          max-width: 420px !important;
          color: #c5d8d8 !important;
          font-size: 14.5px !important;
          line-height: 1.55 !important;
        }

        .lp-text-link {
          display: inline-flex;
          align-items: center;
          min-height: 46px;
          color: #e6fbf8;
          text-decoration: none;
          font-size: 13px;
          font-weight: 850;
          border-bottom: 1px solid rgba(126, 227, 215, 0.46);
        }

        .lp-text-link:hover {
          color: #ffffff;
          border-color: #ffffff;
        }

        .lp-hero-media,
        .lp-hero-media img {
          height: 100% !important;
          min-height: 0 !important;
        }

        .lp-hero-media {
          overflow: hidden !important;
          border-left: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 0 8px 8px 0 !important;
          background: #dfe9e3 !important;
        }

        .lp-trust-bar {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 0 !important;
          margin-top: 0 !important;
          border: 1px solid var(--lp-border) !important;
          border-top: 0 !important;
          background: #ffffff !important;
        }

        .lp-trust-item {
          min-height: 72px !important;
          border: 0 !important;
          border-right: 1px solid var(--lp-border) !important;
          border-radius: 0 !important;
          background: #ffffff !important;
          color: #31494f !important;
          font-size: 13px !important;
        }

        .lp-trust-item:last-child {
          border-right: 0 !important;
        }

        .lp-trust-item {
          flex-direction: column !important;
          align-items: flex-start !important;
          justify-content: center !important;
          gap: 5px !important;
        }

        .lp-trust-item strong {
          color: #082126;
          font-size: 20px;
          font-weight: 900;
          line-height: 1;
        }

        .lp-trust-item span {
          color: #5e747a;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lp-quick-section {
          padding: 0 0 18px !important;
          background: var(--lp-bg) !important;
        }

        .lp-quick-card {
          margin-top: 10px !important;
          padding: clamp(18px, 2.4vw, 28px) !important;
          border-color: rgba(8, 33, 38, 0.18) !important;
          background: rgba(255, 255, 255, 0.98) !important;
        }

        .lp-type-tabs {
          gap: 4px !important;
          padding: 4px !important;
          border-color: rgba(8, 33, 38, 0.18) !important;
          background: #eef5f3 !important;
        }

        .lp-type-tab {
          position: relative !important;
          min-width: 82px !important;
          gap: 6px !important;
          border: 1px solid transparent !important;
          color: #38555b !important;
          background: transparent !important;
          font-weight: 880 !important;
        }

        .lp-type-tab.active {
          color: #ffffff !important;
          border-color: #082126 !important;
          background: #082126 !important;
          box-shadow: 0 10px 20px -16px rgba(8, 33, 38, 0.8) !important;
        }


        .lp-quick-top {
          align-items: flex-end !important;
          margin-bottom: 18px !important;
        }

        .lp-quick-title {
          font-size: clamp(22px, 2.4vw, 30px) !important;
          line-height: 1.08 !important;
        }

        .lp-quick-copy {
          max-width: 520px;
          margin: 8px 0 0;
          color: #4c6268;
          font-size: 14px;
          line-height: 1.5;
        }

        .dark .lp-quick-copy {
          color: #b7c7cb !important;
        }

        .lp-field label {
          color: #425b62 !important;
        }

        .lp-field select,
        .lp-field input {
          min-height: 50px !important;
          border-color: rgba(8, 33, 38, 0.18) !important;
        }

        .lp-search-submit {
          min-height: 50px !important;
          min-width: 162px !important;
        }

        .lp-promo-section {
          padding: 66px 0 !important;
          background: var(--lp-dark) !important;
        }

        .lp-promo-link {
          min-height: 330px !important;
          border-color: rgba(255, 255, 255, 0.14) !important;
          background: rgba(255, 255, 255, 0.04) !important;
        }

        .lp-promo-copy {
          min-height: 330px !important;
          background: transparent !important;
        }

        .lp-promo-label {
          color: #dff8f5 !important;
          border-color: rgba(126, 227, 215, 0.2) !important;
          background: rgba(36, 184, 171, 0.12) !important;
        }

        .lp-promo-title {
          color: #ffffff !important;
        }

        .lp-promo-text {
          color: #c5d8d8 !important;
        }

        .lp-promo-media {
          min-height: 330px !important;
          border-left-color: rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.06) !important;
        }

        .lp-promo-overlay {
          color: #082126 !important;
          border-color: transparent !important;
          background: #ffffff !important;
        }

        .lp-pro-strip {
          width: 100% !important;
          min-height: 86px !important;
          margin-top: 18px !important;
          display: grid !important;
          grid-template-columns: auto minmax(0, 1fr) auto !important;
          align-items: center !important;
          gap: 18px !important;
          padding: 18px 22px !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
          border-radius: 14px !important;
          background: rgba(255, 255, 255, 0.08) !important;
          color: #ffffff !important;
          text-decoration: none !important;
          box-shadow: none !important;
        }

        .lp-pro-strip:hover {
          border-color: rgba(126, 227, 215, 0.44) !important;
          background: rgba(255, 255, 255, 0.12) !important;
        }

        .lp-pro-strip span {
          color: #f0dfbb !important;
          font-size: 11px !important;
          font-weight: 900 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          white-space: nowrap !important;
        }

        .lp-pro-strip strong {
          min-width: 0 !important;
          color: #ffffff !important;
          font-size: clamp(17px, 2vw, 24px) !important;
          font-weight: 850 !important;
          line-height: 1.15 !important;
          letter-spacing: 0 !important;
        }

        .lp-pro-strip em {
          justify-self: end !important;
          min-height: 42px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 14px !important;
          border-radius: 10px !important;
          background: #ffffff !important;
          color: #082126 !important;
          font-size: 12px !important;
          font-style: normal !important;
          font-weight: 900 !important;
          white-space: nowrap !important;
        }

        .lp-brands-section {
          padding: 56px 0 46px !important;
          background: #ffffff !important;
        }

        .lp-shortcuts-section {
          padding: 54px 0 !important;
          background: var(--lp-bg) !important;
        }

        .lp-shortcut-grid {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.15fr) minmax(0, 0.9fr) !important;
          gap: 14px !important;
        }

        .lp-shortcut-group {
          padding: 18px !important;
        }

        .lp-shortcut-group:nth-child(4),
        .lp-shortcut-group:nth-child(5) {
          grid-column: span 1 !important;
        }

        .lp-popular-section {
          padding: 58px 0 !important;
          background: #ffffff !important;
        }

        .lp-example-weekly {
          color: #123033 !important;
          background: rgba(255, 255, 255, 0.92) !important;
        }

        .lp-cv-section {
          padding: 60px 0 72px !important;
          background: var(--lp-bg-alt) !important;
        }

        .lp-cv-card {
          min-height: 0 !important;
          border: 1px solid var(--lp-border) !important;
          background: #ffffff !important;
        }

        .lp-cv-copy {
          padding: clamp(28px, 4vw, 46px) !important;
        }

        .lp-cv-card .lp-title {
          color: var(--lp-ink) !important;
        }

        .lp-cv-card .lp-copy,
        .lp-cv-points {
          color: #4c6268 !important;
        }

        .lp-cv-panel {
          background: var(--lp-surface-soft) !important;
        }

        @media (max-width: 980px) {
          .lp-hero-card,
          .lp-promo-grid,
          .lp-cv-card {
            grid-template-columns: 1fr !important;
          }

          .lp-hero-card {
            height: auto !important;
            transform: none !important;
          }

          .lp-hero-content {
            height: auto !important;
            min-height: auto !important;
          }

          .lp-hero-media,
          .lp-hero-media img {
            height: auto !important;
            min-height: 330px !important;
          }

          .lp-hero-media,
          .lp-promo-media {
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }

          .lp-hero-media {
            border-radius: 0 0 8px 8px !important;
          }

          .lp-search-form,
          .lp-shortcut-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .lp-search-submit {
            grid-column: 1 / -1 !important;
            width: 100% !important;
          }
        }

        @media (max-width: 700px) {
          .lp-shell {
            width: min(100% - 28px, 1180px) !important;
          }

          .lp-hero {
            padding-top: 14px !important;
          }

          .lp-hero-content {
            min-height: auto !important;
            padding: 22px 20px 24px !important;
          }

          .lp-hero-brand {
            gap: 10px;
            margin-bottom: 12px;
            font-size: 13px;
          }

          .lp-hero-brand img {
            width: 42px;
            height: 42px;
          }

          .lp-hero h1 {
            font-size: clamp(34px, 10vw, 44px) !important;
            line-height: 1.02 !important;
          }

          .lp-hero-copy {
            font-size: 15.5px !important;
          }

          .lp-actions {
            align-items: stretch !important;
          }

          .lp-text-link {
            justify-content: center;
          }

          .lp-trust-bar {
            display: none !important;
          }

          .lp-hero-media {
            display: none !important;
          }

          .lp-quick-card {
            margin-top: 12px !important;
          }

          .lp-quick-top {
            align-items: stretch !important;
          }

          .lp-quick-copy {
            font-size: 13.5px;
          }

          .lp-search-form,
          .lp-shortcut-grid {
            grid-template-columns: 1fr !important;
          }

          .lp-promo-section,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-cv-section {
            padding-top: 42px !important;
            padding-bottom: 42px !important;
          }

          .lp-promo-copy,
          .lp-cv-copy {
            padding: 22px !important;
          }

          .lp-promo-media,
          .lp-promo-media img {
            min-height: 210px !important;
          }

          .lp-brand-controls {
            display: none !important;
          }

          .lp-examples-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .lp-root {
          --lp-bg: #ffffff;
          --lp-bg-alt: #ffffff;
          --lp-surface-soft: #f6f8f6;
          background: #ffffff !important;
          background-image: none !important;
        }

        .dark .lp-root {
          --lp-ink: #f4fbfa;
          --lp-ink-soft: #d8e5e7;
          --lp-muted: #a9bcc0;
          --lp-border: rgba(148, 163, 184, 0.22);
          --lp-border-strong: rgba(148, 163, 184, 0.3);
          --lp-surface: #0d2327;
          --lp-surface-soft: #102a2f;
          --lp-bg: #071619;
          --lp-bg-alt: #0a1d21;
          background: #071619 !important;
          background-image: none !important;
          color: #edf7f6 !important;
        }

        .lp-root :where(
          .lp-hero,
          .lp-quick-section,
          .lp-promo-section,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-cv-section
        ) {
          background: #ffffff !important;
          background-image: none !important;
        }

        .dark .lp-root :where(
          .lp-hero,
          .lp-quick-section,
          .lp-promo-section,
          .lp-brands-section,
          .lp-shortcuts-section,
          .lp-popular-section,
          .lp-cv-section
        ) {
          background: var(--lp-bg) !important;
          background-image: none !important;
        }

        .dark .lp-root :where(.lp-brands-section, .lp-shortcuts-section, .lp-cv-section) {
          background: var(--lp-bg-alt) !important;
        }

        .lp-promo-section {
          padding: 20px 0 54px !important;
        }

        .lp-promo-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }

        .lp-promo-link {
          min-height: 260px !important;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
          border: 1px solid var(--lp-border) !important;
          background: #ffffff !important;
          color: var(--lp-ink) !important;
        }

        .lp-promo-link.estate .lp-promo-copy {
          order: 2;
        }

        .lp-promo-link.estate .lp-promo-media {
          order: 1;
          border-left: 0 !important;
          border-right: 1px solid var(--lp-border) !important;
        }

        .lp-promo-copy {
          min-height: 260px !important;
          padding: clamp(26px, 3vw, 40px) !important;
          background: #ffffff !important;
        }

        .lp-promo-title {
          max-width: 520px !important;
          color: var(--lp-ink) !important;
          font-size: clamp(25px, 2.55vw, 34px) !important;
          line-height: 1.08 !important;
        }

        .lp-promo-text {
          max-width: 420px !important;
          color: #3f5960 !important;
        }

        .lp-promo-label {
          color: #0f4a4b !important;
          border-color: rgba(36, 184, 171, 0.28) !important;
          background: rgba(36, 184, 171, 0.1) !important;
        }

        .lp-promo-overlay {
          width: fit-content !important;
          color: #062326 !important;
          border: 1px solid rgba(8, 33, 38, 0.14) !important;
          background: #ffffff !important;
        }

        .lp-promo-media {
          min-height: 260px !important;
          border-left: 1px solid var(--lp-border) !important;
          background: #f3f6f3 !important;
        }

        .lp-shortcuts-section,
        .lp-cv-section {
          border-top: 1px solid var(--lp-border) !important;
          border-bottom: 1px solid var(--lp-border) !important;
        }

        .lp-cv-points li {
          color: #4c6268 !important;
        }

        .dark .lp-promo-link {
          border-color: rgba(148, 163, 184, 0.22) !important;
          background: #0d2327 !important;
          color: #edf7f6 !important;
        }

        .dark .lp-promo-copy {
          background: #0d2327 !important;
        }

        .dark .lp-promo-title {
          color: #f4fbfa !important;
        }

        .dark .lp-promo-text {
          color: #b7c9cd !important;
        }

        .dark .lp-promo-label {
          color: #f0dfbb !important;
          border-color: rgba(126, 227, 215, 0.28) !important;
          background: rgba(217, 196, 156, 0.12) !important;
        }

        .dark .lp-promo-overlay {
          color: #062326 !important;
          border-color: transparent !important;
          background: #f0dfbb !important;
        }

        .dark .lp-promo-media {
          border-left-color: rgba(148, 163, 184, 0.22) !important;
          background: #071619 !important;
        }

        .dark .lp-shortcuts-section,
        .dark .lp-cv-section {
          border-top-color: rgba(148, 163, 184, 0.22) !important;
          border-bottom-color: rgba(148, 163, 184, 0.22) !important;
        }

        .dark .lp-cv-points li {
          color: #b7c9cd !important;
        }

        .dark .lp-trust-bar,
        .dark .lp-trust-item,
        .dark .lp-quick-card,
        .dark .lp-type-tabs,
        .dark .lp-brand-card,
        .dark .lp-shortcut-group,
        .dark .lp-example-column,
        .dark .lp-example-card,
        .dark .lp-example-state,
        .dark .lp-cv-card,
        .dark .lp-cv-panel {
          border-color: rgba(148, 163, 184, 0.22) !important;
          background: #0d2327 !important;
          color: #edf7f6 !important;
        }

        .dark .lp-brand-card {
          --lp-brand-card-bg: #0d2327;
        }

        .dark .lp-trust-item {
          border-right-color: rgba(148, 163, 184, 0.22) !important;
          color: #cfe0e2 !important;
        }

        .dark .lp-quick-title,
        .dark .lp-title,
        .dark .lp-column-title,
        .dark .lp-shortcut-group h3,
        .dark .lp-example-price,
        .dark .lp-cv-card .lp-title {
          color: #f4fbfa !important;
        }

        .dark .lp-copy,
        .dark .lp-example-meta,
        .dark .lp-example-location,
        .dark .lp-cv-card .lp-copy,
        .dark .lp-cv-panel > span {
          color: #b7c9cd !important;
        }

        .dark .lp-field label {
          color: #bfd1d4 !important;
        }

        .dark .lp-field select,
        .dark .lp-field input {
          border-color: rgba(148, 163, 184, 0.26) !important;
          background: #071619 !important;
          color: #f4fbfa !important;
        }

        .dark .lp-field select:disabled {
          color: #8fa3a7 !important;
          background: #102a2f !important;
        }

        .dark .lp-type-tab {
          color: #b7c9cd !important;
        }

        .dark .lp-type-tab.active {
          border-color: #f0dfbb !important;
          background: #f0dfbb !important;
          color: #062326 !important;
          box-shadow: 0 10px 20px -16px rgba(126, 227, 215, 0.62) !important;
        }


        .dark .lp-brand-card:hover,
        .dark .lp-example-card:hover {
          border-color: rgba(126, 227, 215, 0.38) !important;
          background: #102a2f !important;
        }

        .dark .lp-chip,
        .dark .lp-column-link {
          border-color: rgba(126, 227, 215, 0.18) !important;
          background: rgba(126, 227, 215, 0.08) !important;
          color: #dff8f5 !important;
        }

        .dark .lp-example-weekly {
          color: #062326 !important;
          background: rgba(126, 227, 215, 0.92) !important;
        }

        @media (max-width: 760px) {
          .lp-promo-link {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }

          .lp-promo-link.estate .lp-promo-copy,
          .lp-promo-link.estate .lp-promo-media {
            order: initial;
          }

          .lp-promo-link.estate .lp-promo-media {
            border-right: 0 !important;
          }

          .lp-promo-copy {
            min-height: auto !important;
          }

          .lp-promo-media {
            min-height: 210px !important;
            border-left: 0 !important;
            border-top: 1px solid var(--lp-border) !important;
          }

          .dark .lp-promo-media {
            border-top-color: rgba(148, 163, 184, 0.22) !important;
          }
        }

        /* Landing visual correction: align content with the header and avoid the squeezed desktop layout. */
        .lp-shell,
        .lp-hero .lp-shell {
          width: min(1260px, calc(100% - 56px)) !important;
        }

        .lp-hero {
          padding: 32px 0 0 !important;
        }

        .lp-hero-card {
          height: clamp(485px, 54vh, 570px) !important;
          min-height: 485px !important;
          grid-template-columns: minmax(500px, 0.92fr) minmax(0, 1.08fr) !important;
          transform: none !important;
        }

        .lp-hero-content {
          padding: clamp(34px, 4vw, 50px) clamp(42px, 4.4vw, 64px) clamp(50px, 5vw, 72px) !important;
          justify-content: center !important;
        }

        .lp-hero-brand {
          margin-bottom: 16px !important;
        }

        .lp-hero h1 {
          max-width: 650px !important;
          font-size: clamp(38px, 3.25vw, 50px) !important;
          line-height: 1.02 !important;
        }

        .lp-hero-copy {
          max-width: 560px !important;
          margin-top: 22px !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
        }

        .lp-actions {
          margin-top: 26px !important;
        }

        .lp-hero-media img {
          min-height: 485px !important;
          object-position: center center !important;
        }

        .lp-quick-section {
          padding: 24px 0 64px !important;
        }

        .lp-quick-card {
          margin-top: 0 !important;
          padding: clamp(22px, 2.6vw, 32px) !important;
        }

        .lp-quick-top {
          align-items: center !important;
          margin-bottom: 22px !important;
        }

        .lp-quick-title {
          max-width: 760px !important;
          font-size: clamp(28px, 2.45vw, 38px) !important;
          line-height: 1.08 !important;
        }

        .lp-search-form {
          grid-template-columns: repeat(5, minmax(0, 1fr)) minmax(150px, 0.9fr) !important;
          gap: 12px !important;
        }

        .lp-promo-section {
          padding-top: 0 !important;
        }

        @media (max-width: 1180px) {
          .lp-search-form {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }

          .lp-search-submit {
            width: 100% !important;
          }
        }

        @media (max-width: 920px) {
          .lp-shell,
          .lp-hero .lp-shell {
            width: min(100% - 28px, 1260px) !important;
          }

          .lp-hero-card {
            height: auto !important;
            min-height: 0 !important;
            grid-template-columns: 1fr !important;
          }

          .lp-hero-content {
            min-height: 420px !important;
          }

          .lp-hero-media,
          .lp-hero-media img {
            min-height: 260px !important;
            height: 260px !important;
          }
        }

        @media (max-width: 620px) {
          .lp-hero {
            padding-top: 16px !important;
          }

          .lp-hero-content {
            min-height: 0 !important;
            padding: 28px 22px !important;
          }

          .lp-hero h1 {
            font-size: clamp(34px, 10vw, 42px) !important;
          }

          .lp-quick-section {
            padding-top: 16px !important;
          }

          .lp-quick-top,
          .lp-actions {
            align-items: stretch !important;
          }
        }

        /* Noxvelia editorial refresh */
        .lp-root {
          --lp-ink: #071116;
          --lp-ink-soft: #243b42;
          --lp-drive: #d9c49c;
          --lp-estate: #315f7d;
          --lp-rust: #b56347;
          --lp-gold: #c6a86a;
          --lp-stone: #f7f2e9;
          --lp-cream: #fffdf8;
          --lp-line: rgba(7, 17, 22, 0.14);
          background: var(--lp-stone);
        }

        .lp-shell { width: min(1240px, calc(100% - 48px)); }
        .lp-hero { padding: 0 0 0 !important; min-height: 720px; background: #071116 !important; color: #fff; }
        .lp-hero > .lp-shell { width: 100%; }
        .lp-hero-card {
          position: relative;
          min-height: 650px;
          display: block !important;
          overflow: hidden;
          border: 0 !important;
          border-radius: 0 !important;
          background: #071116 !important;
        }
        .lp-hero-media { position: absolute !important; inset: 0; z-index: 0; background: #071116; }
        .lp-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(4, 12, 15, 0.92) 0%, rgba(4, 12, 15, 0.72) 45%, rgba(4, 12, 15, 0.24) 100%), linear-gradient(0deg, rgba(4, 12, 15, 0.72), rgba(4, 12, 15, 0) 48%);
        }
        .lp-hero-media img { min-height: 650px !important; object-position: 58% center; filter: saturate(1.05) contrast(1.02); }
        .lp-hero-content {
          position: relative;
          z-index: 2;
          width: min(1240px, calc(100% - 48px));
          min-height: 650px;
          margin: 0 auto;
          padding: 92px 0 112px !important;
          justify-content: center;
          background: transparent !important;
          color: #ffffff !important;
        }
        .lp-hero-content::after { display: none !important; }
        .lp-hero-brand { display: inline-flex; align-items: center; gap: 11px; margin-bottom: 28px; font-size: 13px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; }
        .lp-hero-brand img { width: 34px; height: 34px; object-fit: contain; }
        .lp-kicker { margin-bottom: 18px !important; padding: 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; color: #9cefe7 !important; }
        .lp-hero h1 { max-width: 760px; font-size: 72px !important; line-height: 0.96 !important; letter-spacing: 0 !important; font-weight: 950 !important; }
        .lp-hero h1 span { color: #9cefe7 !important; }
        .lp-hero-copy { max-width: 560px !important; color: rgba(255,255,255,0.82) !important; font-size: 17px !important; line-height: 1.65 !important; }
        .lp-btn, .lp-text-link, .lp-search-submit, .lp-column-link, .lp-round-btn { border-radius: 8px !important; }
        .lp-btn-drive { color: #061417 !important; background: var(--lp-drive) !important; box-shadow: none !important; }
        .lp-text-link { min-height: 46px; display: inline-flex; align-items: center; color: #ffffff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.48); font-weight: 900; }
        .lp-hero-photo-label { right: calc((100% - min(1240px, calc(100% - 48px))) / 2); bottom: 32px; border-radius: 8px !important; background: rgba(255,253,248,0.92) !important; box-shadow: none !important; }

        .lp-trust-bar {
          position: relative;
          z-index: 5;
          width: min(1240px, calc(100% - 48px));
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 0 !important;
          margin: -64px auto 0 !important;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 8px;
          background: rgba(255,253,248,0.94);
          box-shadow: 0 18px 42px rgba(7,17,22,0.18);
        }
        .lp-trust-item {
          min-height: 86px !important;
          display: block !important;
          padding: 18px !important;
          border: 0 !important;
          border-right: 1px solid rgba(7,17,22,0.1) !important;
          border-radius: 0 !important;
          background: transparent !important;
          color: var(--lp-ink) !important;
        }
        .lp-trust-item:last-child { border-right: 0 !important; }
        .lp-trust-item strong { display: block; font-size: 30px; line-height: 1; font-weight: 950; }
        .lp-trust-item span { display: block; margin-top: 8px; color: #647178; font-size: 11px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }

        .lp-quick-section { padding: 96px 0 70px !important; background: var(--lp-stone) !important; }
        .lp-quick-card {
          margin-top: 0 !important;
          padding: 18px !important;
          border-radius: 8px !important;
          border-color: var(--lp-line) !important;
          background: rgba(255,253,248,0.96) !important;
          box-shadow: none !important;
        }
        .lp-quick-title { font-size: 24px !important; letter-spacing: 0 !important; }
        .lp-type-tabs { border-radius: 8px !important; background: #ece7dc !important; }
        .lp-type-tab { border-radius: 6px !important; }
        .lp-type-tab.active { box-shadow: none !important; }
        .lp-field select, .lp-field input { border-radius: 8px !important; }

        .lp-promo-section { padding: 0 0 76px !important; background: var(--lp-stone) !important; }
        .lp-promo-link, .lp-pro-strip, .lp-brand-card, .lp-shortcut-group, .lp-example-column, .lp-cv-card, .lp-cv-panel, .lp-cv-code { border-radius: 8px !important; }
        .lp-promo-link { border-color: var(--lp-line) !important; background: var(--lp-cream) !important; box-shadow: none !important; }
        .lp-promo-title { font-size: 28px !important; line-height: 1.08 !important; letter-spacing: 0 !important; }
        .lp-promo-text { color: #566970 !important; }
        .lp-promo-overlay { border-radius: 8px !important; background: #071116 !important; }
        .lp-pro-strip { grid-template-columns: 150px minmax(0, 1fr) auto; background: #071116 !important; color: #fff !important; }
        .lp-pro-strip span { color: #9cefe7 !important; }

        .lp-section { padding: 82px 0 !important; }
        .lp-brands-section { background: #fffaf1 !important; border-top: 1px solid rgba(7,17,22,0.08); border-bottom: 1px solid rgba(7,17,22,0.08); }
        .lp-title { font-size: 38px !important; line-height: 1.05 !important; letter-spacing: 0 !important; font-weight: 950 !important; }
        .lp-copy { color: #52676e !important; }
        .lp-shortcuts-section { background: var(--lp-stone) !important; }
        .lp-shortcut-grid { gap: 12px !important; }
        .lp-shortcut-group { background: var(--lp-cream) !important; border-color: var(--lp-line) !important; }
        .lp-chip { background: #fff !important; }
        .lp-popular-section { background: #071116 !important; }
        .lp-popular-section .lp-title { color: #fff !important; }
        .lp-popular-section .lp-copy { color: rgba(255,255,255,0.72) !important; }
        .lp-example-column { background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.16) !important; }
        .lp-example-card { border-bottom-color: rgba(255,255,255,0.12) !important; }
        .lp-example-price { color: #9cefe7 !important; }
        .lp-cv-section { background: #fffaf1 !important; }
        .lp-cv-card { background: #fff !important; border-color: var(--lp-line) !important; }

        .dark .lp-root { background: #071116; }
        .dark .lp-quick-section, .dark .lp-promo-section, .dark .lp-shortcuts-section { background: #071116 !important; }
        .dark .lp-brands-section, .dark .lp-cv-section { background: #0d171d !important; }
        .dark .lp-trust-bar, .dark .lp-quick-card { background: rgba(9,20,26,0.94) !important; border-color: rgba(255,255,255,0.16) !important; }
        .dark .lp-trust-item { color: #f8fafc !important; border-color: rgba(255,255,255,0.12) !important; }
        .dark .lp-trust-item span { color: #a8bac0 !important; }
        .dark .lp-promo-link, .dark .lp-shortcut-group, .dark .lp-brand-card, .dark .lp-cv-card, .dark .lp-cv-panel { background: #111f27 !important; border-color: rgba(255,255,255,0.12) !important; }
        .dark .lp-promo-title, .dark .lp-title, .dark .lp-shortcut-group h3 { color: #f8fafc !important; }
        .dark .lp-promo-text, .dark .lp-copy, .dark .lp-brand-name { color: #b7c6ca !important; }

        @media (max-width: 980px) {
          .lp-hero-card, .lp-hero-content, .lp-hero-media img { min-height: 610px !important; }
          .lp-hero h1 { font-size: 56px !important; }
          .lp-trust-bar { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; margin-top: 0 !important; }
          .lp-trust-item:nth-child(2n) { border-right: 0 !important; }
          .lp-quick-section { padding-top: 44px !important; }
        }

        @media (max-width: 640px) {
          .lp-shell, .lp-hero-content, .lp-trust-bar { width: min(100% - 28px, 1240px) !important; }
          .lp-hero-card, .lp-hero-content, .lp-hero-media img { min-height: 580px !important; }
          .lp-hero-content { padding: 62px 0 96px !important; }
          .lp-hero h1 { font-size: 42px !important; line-height: 1 !important; }
          .lp-hero-copy { font-size: 15px !important; }
          .lp-hero-photo-label { right: 14px; bottom: 14px; }
          .lp-trust-bar { grid-template-columns: 1fr !important; }
          .lp-trust-item { border-right: 0 !important; border-bottom: 1px solid rgba(7,17,22,0.1) !important; }
          .lp-trust-item:last-child { border-bottom: 0 !important; }
          .lp-pro-strip { grid-template-columns: 1fr !important; }
          .lp-title { font-size: 30px !important; }
        }
        /* Production copy/layout fixes */
        .lp-hero { min-height: 0 !important; }
        .lp-hero-card,
        .lp-hero-content,
        .lp-hero-media img { min-height: 590px !important; }
        .lp-hero-content { padding: 96px 0 118px !important; }
        .lp-hero h1 { max-width: 720px !important; font-size: 64px !important; line-height: 1 !important; }
        .lp-actions { position: relative; z-index: 8; }
        .lp-trust-bar { margin: -44px auto 0 !important; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important; }
        .lp-trust-item strong { color: var(--lp-ink) !important; }
        .dark .lp-trust-item strong { color: #f8fafc !important; }
        .lp-quick-section { padding-top: 64px !important; }
        @media (max-width: 980px) {
          .lp-hero-card,
          .lp-hero-content,
          .lp-hero-media img { min-height: 560px !important; }
          .lp-hero h1 { font-size: 48px !important; }
          .lp-trust-bar { margin-top: 0 !important; }
        }
        @media (max-width: 640px) {
          .lp-hero-card,
          .lp-hero-content,
          .lp-hero-media img { min-height: 520px !important; }
          .lp-hero-content { padding: 68px 0 84px !important; }
          .lp-hero h1 { font-size: 38px !important; }
          .lp-quick-section { padding-top: 36px !important; }
        }
        /* Production visual fixes */
        .lp-hero-card {
          min-height: 620px !important;
          background: #071116 url('/noxvelia-hero-coast.webp') center center / cover no-repeat !important;
        }

        .lp-hero-media {
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          z-index: 0 !important;
          overflow: hidden !important;
          opacity: 1 !important;
          visibility: visible !important;
          background: #071116 url('/noxvelia-hero-coast.webp') center center / cover no-repeat !important;
        }

        .lp-hero-media::after {
          display: block !important;
          content: "" !important;
          position: absolute !important;
          inset: 0 !important;
          pointer-events: none !important;
          background:
            linear-gradient(90deg, rgba(4, 12, 15, 0.94) 0%, rgba(4, 12, 15, 0.78) 42%, rgba(4, 12, 15, 0.34) 66%, rgba(4, 12, 15, 0.08) 100%),
            linear-gradient(0deg, rgba(4, 12, 15, 0.50), rgba(4, 12, 15, 0) 48%) !important;
        }

        .lp-hero-media img {
          width: 100% !important;
          height: 100% !important;
          min-height: 620px !important;
          display: block !important;
          object-fit: cover !important;
          object-position: 64% center !important;
          opacity: 1 !important;
          visibility: visible !important;
          filter: saturate(1.04) contrast(1.03) !important;
        }

        .lp-hero-content {
          min-height: 620px !important;
          background: transparent !important;
        }

        .lp-hero .lp-text-link {
          min-height: 50px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 19px !important;
          border: 1px solid rgba(255, 255, 255, 0.34) !important;
          border-radius: 8px !important;
          background: rgba(255, 255, 255, 0.10) !important;
          color: #ffffff !important;
          text-decoration: none !important;
          box-shadow: none !important;
        }

        .lp-hero .lp-text-link:hover {
          border-color: rgba(255, 255, 255, 0.58) !important;
          background: rgba(255, 255, 255, 0.17) !important;
        }

        .lp-promo-overlay {
          color: #ffffff !important;
          border-color: #071116 !important;
          background: #071116 !important;
        }

        @media (max-width: 980px) {
          .lp-hero-card,
          .lp-hero-content,
          .lp-hero-media img {
            min-height: 580px !important;
          }
        }

        @media (max-width: 640px) {
          .lp-hero-card,
          .lp-hero-content,
          .lp-hero-media img {
            min-height: 560px !important;
          }

          .lp-hero .lp-actions {
            display: grid !important;
            grid-template-columns: 1fr !important;
          }

          .lp-hero .lp-text-link {
            width: 100% !important;
          }
        }      
        /* Noxvelia premium production direction */
        .lp-root {
          --lp-ink: #071326;
          --lp-ink-soft: #24364a;
          --lp-drive: #d9c49c;
          --lp-estate: #102f50;
          --lp-gold: #d9c49c;
          --lp-gold-soft: #f0dfbb;
          --lp-stone: #f4efe5;
          --lp-cream: #fffaf0;
          --lp-line: rgba(7, 19, 38, 0.14);
          background: var(--lp-stone) !important;
          color: var(--lp-ink) !important;
        }

        .lp-root a:focus-visible,
        .lp-root button:focus-visible {
          outline-color: rgba(217, 196, 156, 0.72) !important;
        }

        .lp-hero {
          background: #071326 !important;
        }

        .lp-hero-card,
        .lp-hero-media {
          background-color: #071326 !important;
        }

        .lp-hero-media::after {
          background:
            linear-gradient(90deg, rgba(7, 19, 38, 0.96) 0%, rgba(7, 19, 38, 0.82) 42%, rgba(7, 19, 38, 0.42) 68%, rgba(7, 19, 38, 0.12) 100%),
            linear-gradient(0deg, rgba(7, 19, 38, 0.62), rgba(7, 19, 38, 0) 50%) !important;
        }

        .lp-kicker,
        .lp-eyebrow {
          color: var(--lp-gold-soft) !important;
          background: rgba(217, 196, 156, 0.12) !important;
          border-color: rgba(217, 196, 156, 0.34) !important;
        }

        .lp-kicker {
          padding: 9px 13px !important;
          border: 1px solid rgba(217, 196, 156, 0.34) !important;
          border-radius: 6px !important;
        }

        .lp-hero h1 {
          max-width: 800px !important;
          text-wrap: balance;
        }

        .lp-btn-drive,
        .lp-search-submit,
        .lp-type-tab.active {
          color: #071326 !important;
          border-color: #d9c49c !important;
          background: #d9c49c !important;
          box-shadow: 0 18px 34px -24px rgba(217, 196, 156, 0.78) !important;
        }

        .lp-btn-drive:hover,
        .lp-search-submit:hover,
        .lp-type-tab.active:hover {
          background: #f0dfbb !important;
          border-color: #f0dfbb !important;
        }

        .lp-hero .lp-text-link {
          color: #fffaf0 !important;
          border-color: rgba(240, 223, 187, 0.42) !important;
          background: rgba(255, 250, 240, 0.09) !important;
        }

        .lp-hero .lp-text-link:hover {
          color: #071326 !important;
          border-color: #f0dfbb !important;
          background: #f0dfbb !important;
        }

        .lp-hero-photo-label,
        .lp-trust-bar,
        .lp-quick-card,
        .lp-promo-link,
        .lp-shortcut-group,
        .lp-brand-card,
        .lp-cv-card {
          border-color: var(--lp-line) !important;
          background: rgba(255, 250, 240, 0.96) !important;
        }

        .lp-trust-item strong,
        .lp-title,
        .lp-quick-title,
        .lp-promo-title,
        .lp-column-title,
        .lp-shortcut-group h3 {
          color: #071326 !important;
        }

        .lp-copy,
        .lp-quick-copy,
        .lp-promo-text,
        .lp-brand-name,
        .lp-field label {
          color: #4a5a6a !important;
        }

        .lp-field select,
        .lp-field input {
          color: #071326 !important;
          border-color: rgba(7, 19, 38, 0.18) !important;
          background: #ffffff !important;
        }

        .lp-type-tabs {
          border-color: rgba(7, 19, 38, 0.16) !important;
          background: #e8dfcf !important;
        }

        .lp-type-tab {
          color: #26384d !important;
        }

        .lp-promo-overlay {
          color: #071326 !important;
          border-color: #d9c49c !important;
          background: #d9c49c !important;
        }

        .lp-pro-strip,
        .lp-popular-section {
          background: #071326 !important;
        }

        .lp-pro-strip span,
        .lp-popular-section .lp-eyebrow,
        .lp-example-price {
          color: #f0dfbb !important;
        }

        .lp-popular-section .lp-title,
        .lp-popular-section .lp-column-title {
          color: #fffaf0 !important;
        }

        .lp-popular-section .lp-copy,
        .lp-example-title,
        .lp-example-meta,
        .lp-example-location {
          color: rgba(255, 250, 240, 0.74) !important;
        }

        .lp-example-column {
          background: rgba(255, 250, 240, 0.06) !important;
          border-color: rgba(240, 223, 187, 0.18) !important;
        }

        .lp-column-link,
        .lp-round-btn,
        .lp-chip {
          color: #071326 !important;
          border-color: rgba(7, 19, 38, 0.14) !important;
          background: #fffaf0 !important;
        }

        .lp-column-link:hover,
        .lp-round-btn:hover,
        .lp-chip:hover {
          color: #071326 !important;
          border-color: #d9c49c !important;
          background: #f0dfbb !important;
        }

        .dark .lp-root {
          --lp-stone: #071326;
          --lp-cream: #0d1d33;
          background: #071326 !important;
        }

        .dark .lp-quick-section,
        .dark .lp-promo-section,
        .dark .lp-shortcuts-section {
          background: #071326 !important;
        }

        .dark .lp-brands-section,
        .dark .lp-cv-section {
          background: #0d1d33 !important;
        }

        .dark .lp-quick-card,
        .dark .lp-promo-link,
        .dark .lp-shortcut-group,
        .dark .lp-brand-card,
        .dark .lp-cv-card {
          color: #fffaf0 !important;
          background: #102f50 !important;
          border-color: rgba(240, 223, 187, 0.18) !important;
        }

        .dark .lp-title,
        .dark .lp-quick-title,
        .dark .lp-promo-title,
        .dark .lp-shortcut-group h3,
        .dark .lp-brand-name {
          color: #fffaf0 !important;
        }

        .dark .lp-copy,
        .dark .lp-quick-copy,
        .dark .lp-promo-text {
          color: rgba(255, 250, 240, 0.76) !important;
        }
      `}),(0,Z.jsx)(ee,{}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:(0,Z.jsxs)(`div`,{className:`lp-shell`,children:[(0,Z.jsxs)(`div`,{className:`lp-hero-card`,children:[(0,Z.jsxs)(`div`,{className:`lp-hero-content`,children:[(0,Z.jsxs)(`div`,{className:`lp-hero-brand`,"aria-label":`NOXVELIA`,children:[(0,Z.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,Z.jsx)(`span`,{children:`NOXVELIA`})]}),(0,Z.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisa em Portugal`}),(0,Z.jsx)(`h1`,{id:`lp-hero-title`,children:`Carros e imóveis em Portugal, apresentados com clareza.`}),(0,Z.jsx)(`p`,{className:`lp-hero-copy`,children:`Pesquisa por marca, modelo, localização e preço. Compara fotografias, características e contactos antes de visitar ou ligar.`}),(0,Z.jsxs)(`div`,{className:`lp-actions`,children:[(0,Z.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:`#pesquisa`,children:`Pesquisar anúncios`}),(0,Z.jsx)(i,{className:`lp-text-link`,to:u,state:d,children:`Publicar grátis`})]})]}),(0,Z.jsxs)(`div`,{className:`lp-hero-media`,children:[(0,Z.jsx)(`img`,{src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`,onError:e=>{e.currentTarget.src=`/social/noxvelia-estate-photo-premium.webp`}}),(0,Z.jsx)(`div`,{className:`lp-hero-photo-label`,"aria-hidden":`true`,children:`Carros / Imóveis`})]})]}),j.length>0&&(0,Z.jsx)(`div`,{className:`lp-trust-bar`,"aria-label":`Resumo da plataforma`,children:j.map(e=>(0,Z.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,Z.jsx)(`strong`,{children:ce(e.value)}),(0,Z.jsx)(`span`,{children:e.label})]},e.label))})]})}),(0,Z.jsx)(`section`,{className:`lp-quick-section`,id:`pesquisa`,"aria-labelledby":`lp-quick-title`,children:(0,Z.jsx)(`div`,{className:`lp-shell`,children:(0,Z.jsxs)(`form`,{className:`lp-quick-card`,onSubmit:W,children:[(0,Z.jsxs)(`div`,{className:`lp-quick-top`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa rápida`}),(0,Z.jsx)(`h2`,{className:`lp-quick-title`,id:`lp-quick-title`,children:`Pesquisa rápida`}),(0,Z.jsx)(`p`,{className:`lp-quick-copy`,children:`Filtra por marca, modelo, localização e preço para chegares rapidamente aos anúncios certos.`})]}),(0,Z.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,Z.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":w.tipo===`carro`,className:`lp-type-tab ${w.tipo===`carro`?`active`:``}`,onClick:()=>U(`tipo`,`carro`),children:`Carros`}),(0,Z.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":w.tipo===`imovel`,className:`lp-type-tab ${w.tipo===`imovel`?`active`:``}`,onClick:()=>U(`tipo`,`imovel`),children:`Imóveis`})]})]}),(0,Z.jsxs)(`div`,{className:`lp-search-form`,children:[w.tipo===`carro`?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`lp-field`,children:[(0,Z.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,Z.jsxs)(`select`,{id:`lp-marca`,value:w.marca,onChange:e=>U(`marca`,e.target.value),children:[(0,Z.jsx)(`option`,{value:``,children:`Todas as marcas`}),B.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))]})]}),(0,Z.jsxs)(`div`,{className:`lp-field`,children:[(0,Z.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,Z.jsxs)(`select`,{id:`lp-modelo`,value:w.modelo,onChange:e=>U(`modelo`,e.target.value),disabled:!w.marca,children:[(0,Z.jsx)(`option`,{value:``,children:w.marca?`Todos os modelos`:`Escolhe a marca`}),k.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))]})]}),(0,Z.jsxs)(`div`,{className:`lp-field`,children:[(0,Z.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,Z.jsxs)(`select`,{id:`lp-combustivel`,value:w.combustivel,onChange:e=>U(`combustivel`,e.target.value),children:[(0,Z.jsx)(`option`,{value:``,children:`Todos`}),Q.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))]})]})]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`lp-field`,children:[(0,Z.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,Z.jsxs)(`select`,{id:`lp-tipologia`,value:w.tipologia,onChange:e=>U(`tipologia`,e.target.value),children:[(0,Z.jsx)(`option`,{value:``,children:`Todas`}),ae.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))]})]}),(0,Z.jsxs)(`div`,{className:`lp-field`,children:[(0,Z.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,Z.jsxs)(`select`,{id:`lp-estate-preco`,value:w.precoMax,onChange:e=>U(`precoMax`,e.target.value),children:[(0,Z.jsx)(`option`,{value:``,children:`Qualquer preço`}),oe.slice(2).map(e=>(0,Z.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,Z.jsxs)(`div`,{className:`lp-field`,children:[(0,Z.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,Z.jsxs)(`select`,{id:`lp-distrito`,value:w.distrito,onChange:e=>U(`distrito`,e.target.value),children:[(0,Z.jsx)(`option`,{value:``,children:`Portugal inteiro`}),V.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))]})]}),w.tipo===`carro`&&(0,Z.jsxs)(`div`,{className:`lp-field`,children:[(0,Z.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,Z.jsxs)(`select`,{id:`lp-preco`,value:w.precoMax,onChange:e=>U(`precoMax`,e.target.value),children:[(0,Z.jsx)(`option`,{value:``,children:`Qualquer preço`}),oe.slice(0,2).map(e=>(0,Z.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,Z.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]})]})})}),(0,Z.jsx)(`section`,{className:`lp-promo-section`,id:`anunciar`,"aria-label":`Anunciar grátis na Noxvelia`,children:(0,Z.jsxs)(`div`,{className:`lp-shell`,children:[(0,Z.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,Z.jsxs)(i,{className:`lp-promo-link drive`,to:`/carros`,children:[(0,Z.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,Z.jsx)(`span`,{className:`lp-promo-label`,children:`Carros`}),(0,Z.jsx)(`strong`,{className:`lp-promo-title`,children:`Automóveis com informação clara.`}),(0,Z.jsx)(`span`,{className:`lp-promo-text`,children:`Vê marca, modelo, quilómetros, combustível, preço e localização num formato fácil de comparar.`}),(0,Z.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar carro`})]}),(0,Z.jsx)(`span`,{className:`lp-promo-media`,children:(0,Z.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`,loading:`lazy`})})]}),(0,Z.jsxs)(i,{className:`lp-promo-link estate`,to:`/imoveis`,children:[(0,Z.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,Z.jsx)(`span`,{className:`lp-promo-label`,children:`Imóveis`}),(0,Z.jsx)(`strong`,{className:`lp-promo-title`,children:`Imóveis fáceis de comparar.`}),(0,Z.jsx)(`span`,{className:`lp-promo-text`,children:`Compara fotografias, localização, tipologia, áreas e preço antes de marcar visita.`}),(0,Z.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar imóvel`})]}),(0,Z.jsx)(`span`,{className:`lp-promo-media`,children:(0,Z.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`,loading:`lazy`})})]})]}),(0,Z.jsxs)(i,{className:`lp-pro-strip`,to:A?`/profissionais`:u,state:A?void 0:d,children:[(0,Z.jsx)(`span`,{children:A?`Profissionais`:`Anunciar`}),(0,Z.jsx)(`strong`,{children:A?`Stands, mediadores e vendedores com anúncios disponíveis.`:`Publica o teu carro ou imóvel e recebe contactos diretamente.`}),(0,Z.jsx)(`em`,{children:A?`Ver profissionais`:`Publicar anúncio`})]})]})}),(0,Z.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,Z.jsxs)(`div`,{className:`lp-shell`,children:[(0,Z.jsxs)(`div`,{className:`lp-section-head`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`span`,{className:`lp-eyebrow`,children:`Marcas`}),(0,Z.jsx)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:`Marcas auto prontas a pesquisar.`}),(0,Z.jsx)(`p`,{className:`lp-copy`,children:`Escolhe a marca e segue diretamente para resultados filtrados.`})]}),(0,Z.jsxs)(`div`,{className:`lp-brand-controls`,"aria-label":`Navegar pelas marcas`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>K(-1),"aria-label":`Ver marcas anteriores`,children:`Anterior`}),(0,Z.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>K(1),"aria-label":`Ver marcas seguintes`,children:`Seguinte`})]})]}),(0,Z.jsx)(`div`,{className:`lp-brand-scroll`,ref:c,"aria-label":`Lista de marcas automóveis`,children:(0,Z.jsx)(`div`,{className:`lp-brand-grid`,children:B.map(e=>{let t=le(e);return(0,Z.jsxs)(i,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,Z.jsxs)(`span`,{className:`lp-brand-mark lp-brand-mark-${t} ${fe.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,Z.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:de(e)}),(0,Z.jsx)(`img`,{src:ue(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,Z.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e)})})})]})}),(0,Z.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,Z.jsxs)(`div`,{className:`lp-shell`,children:[(0,Z.jsx)(`div`,{className:`lp-section-head`,children:(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa guiada`}),(0,Z.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Caminhos rápidos para começar.`}),(0,Z.jsx)(`p`,{className:`lp-copy`,children:`Entradas diretas para marcas, modelos, distritos e tipologias comuns.`})]})}),(0,Z.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,Z.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,Z.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,Z.jsx)(`div`,{className:`lp-chip-list`,children:ne.map(e=>(0,Z.jsx)(i,{className:`lp-chip`,to:M(`carro`,{marca:e}),children:e},e))})]}),(0,Z.jsxs)(`div`,{className:`lp-shortcut-group wide`,children:[(0,Z.jsx)(`h3`,{children:`Modelos rápidos`}),(0,Z.jsx)(`div`,{className:`lp-chip-list`,children:re.map(([e,t])=>(0,Z.jsxs)(i,{className:`lp-chip`,to:M(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,Z.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,Z.jsx)(`h3`,{children:`Combustíveis`}),(0,Z.jsx)(`div`,{className:`lp-chip-list`,children:Q.map(e=>(0,Z.jsx)(i,{className:`lp-chip`,to:M(`carro`,{combustivel:e}),children:e},e))})]}),(0,Z.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,Z.jsx)(`h3`,{children:`Distritos`}),(0,Z.jsx)(`div`,{className:`lp-chip-list`,children:ie.map(e=>(0,Z.jsx)(i,{className:`lp-chip`,to:M(`carro`,{distrito:e}),children:e},e))})]}),(0,Z.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,Z.jsx)(`h3`,{children:`Imóveis`}),(0,Z.jsxs)(`div`,{className:`lp-chip-list`,children:[ae.map(e=>(0,Z.jsx)(i,{className:`lp-chip`,to:M(`imovel`,{tipologia:e}),children:e},e)),ie.slice(0,4).map(e=>(0,Z.jsx)(i,{className:`lp-chip`,to:M(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),q&&(0,Z.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,Z.jsxs)(`div`,{className:`lp-shell`,children:[(0,Z.jsx)(`div`,{className:`lp-section-head`,children:(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`span`,{className:`lp-eyebrow`,children:`Seleção atual`}),(0,Z.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`Destaques para explorar.`}),(0,Z.jsx)(`p`,{className:`lp-copy`,children:`Anúncios recentes de carros e imóveis, prontos a explorar.`})]})}),(0,Z.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(y||f.carro.length>0)&&(0,Z.jsxs)(`div`,{className:`lp-example-column drive`,children:[(0,Z.jsxs)(`div`,{className:`lp-column-top`,children:[(0,Z.jsx)(`div`,{className:`lp-column-heading`,children:(0,Z.jsx)(`h3`,{className:`lp-column-title`,children:`Carros`})}),(0,Z.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>t(`/carros`),children:`Ver carros`})]}),(0,Z.jsx)(`div`,{className:`lp-example-list`,children:f.carro.length>0?f.carro.map(e=>J(e,`/carros`)):$(`carros`,`/carros`)})]}),(y||f.imovel.length>0)&&(0,Z.jsxs)(`div`,{className:`lp-example-column estate`,children:[(0,Z.jsxs)(`div`,{className:`lp-column-top`,children:[(0,Z.jsx)(`div`,{className:`lp-column-heading`,children:(0,Z.jsx)(`h3`,{className:`lp-column-title`,children:`Imóveis`})}),(0,Z.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>t(`/imoveis`),children:`Ver imóveis`})]}),(0,Z.jsx)(`div`,{className:`lp-example-list`,children:f.imovel.length>0?f.imovel.map(e=>J(e,`/imoveis`)):$(`imóveis`,`/imoveis`)})]})]})]})}),(0,Z.jsx)(R,{placement:`landing_between_highlights`,minHeight:96}),(0,Z.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,Z.jsx)(`div`,{className:`lp-shell`,children:(0,Z.jsxs)(`div`,{className:`lp-cv-card`,children:[(0,Z.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,Z.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,Z.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro antes da visita.`}),(0,Z.jsx)(`p`,{className:`lp-copy`,children:`Consulta histórico, quilometragem e registos disponíveis.`}),(0,Z.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,Z.jsx)(`li`,{children:`Histórico antes do contacto`}),(0,Z.jsx)(`li`,{children:`Mais segurança na compra`})]}),(0,Z.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:te,target:`_blank`,rel:`noopener noreferrer`,children:`Verificar um veículo`})]}),(0,Z.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,Z.jsx)(`span`,{children:`Histórico automóvel com`}),(0,Z.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,Z.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,Z.jsx)(`small`,{children:`Código`}),(0,Z.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})})]}),(0,Z.jsx)(v,{})]})}export{$ as default};