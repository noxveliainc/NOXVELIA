import{A as e,C as t,E as n,F as r,N as i,T as a,_ as o,d as s,f as c,k as l,l as u,p as d,u as f,w as p,x as m}from"./index-BgEfNgzv.js";import{r as h}from"./images-io1S19E8.js";import{a as g,i as _,o as v}from"./seo-BZnLo9Qd.js";import{t as y}from"./Seo-Xapklu3Y.js";import{t as b}from"./GoogleAdSlot-Ba6YwMPv.js";import{n as x,t as S}from"./marcasModelos-CRXT0e16.js";import{t as ee}from"./localizacoes-9zKfqZul.js";import{t as C}from"./funnelAnalytics-Da3c0bKl.js";var w=r(i(),1);function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e,t,n){return t&&T(e.prototype,t),n&&T(e,n),e}var D,te,O,k,A,ne,j,re,ie,ae,M,oe,se,N=function(){return D||typeof window<`u`&&(D=window.gsap)&&D.registerPlugin&&D},ce=1,P=[],F=[],le=[],I=Date.now,ue=function(e,t){return t},de=function(){var e=ie.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,F),r.push.apply(r,le),F=n,le=r,ue=function(e,n){return t[e](n)}},L=function(e,t){return~le.indexOf(e)&&le[le.indexOf(e)+1][t]},R=function(e){return!!~ae.indexOf(e)},z=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:r!==!1,capture:!!i})},B=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},fe=`scrollLeft`,pe=`scrollTop`,me=function(){return M&&M.isPressed||F.cache++},V=function(e,t){var n=function n(r){if(r||r===0){ce&&(O.history.scrollRestoration=`manual`);var i=M&&M.isPressed;r=n.v=Math.round(r)||(M&&M.iOS?1:0),e(r),n.cacheID=F.cache,i&&ue(`ss`,r)}else(t||F.cache!==n.cacheID||ue(`ref`))&&(n.cacheID=F.cache,n.v=e());return n.v+n.offset};return n.offset=0,e&&n},he={s:fe,p:`left`,p2:`Left`,os:`right`,os2:`Right`,d:`width`,d2:`Width`,a:`x`,sc:V(function(e){return arguments.length?O.scrollTo(e,ge.sc()):O.pageXOffset||k[fe]||A[fe]||ne[fe]||0})},ge={s:pe,p:`top`,p2:`Top`,os:`bottom`,os2:`Bottom`,d:`height`,d2:`Height`,a:`y`,op:he,sc:V(function(e){return arguments.length?O.scrollTo(he.sc(),e):O.pageYOffset||k[pe]||A[pe]||ne[pe]||0})},_e=function(e,t){return(t&&t._ctx&&t._ctx.selector||D.utils.toArray)(e)[0]||(typeof e==`string`&&D.config().nullTargetWarn!==!1?console.warn(`Element not found:`,e):null)},ve=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},ye=function(e,t){var n=t.s,r=t.sc;R(e)&&(e=k.scrollingElement||A);var i=F.indexOf(e),a=r===ge.sc?1:2;!~i&&(i=F.push(e)-1),F[i+a]||z(e,`scroll`,me);var o=F[i+a],s=o||(F[i+a]=V(L(e,n),!0)||(R(e)?r:V(function(t){return arguments.length?e[n]=t:e[n]})));return s.target=e,o||(s.smooth=D.getProperty(e,`scrollBehavior`)===`smooth`),s},H=function(e,t,n){var r=e,i=e,a=I(),o=a,s=t||50,c=Math.max(500,s*3),l=function(e,t){var c=I();t||c-a>s?(i=r,r=e,o=a,a=c):n?r+=e:r=i+(e-i)/(c-o)*(a-o)};return{update:l,reset:function(){i=r=n?0:r,o=a=0},getVelocity:function(e){var t=o,s=i,u=I();return(e||e===0)&&e!==r&&l(e),a===o||u-o>c?0:(r+(n?s:-s))/((n?u:a)-t)*1e3}}},be=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},xe=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Se=function(){ie=D.core.globals().ScrollTrigger,ie&&ie.core&&de()},Ce=function(e){return D=e||N(),!te&&D&&typeof document<`u`&&document.body&&(O=window,k=document,A=k.documentElement,ne=k.body,ae=[O,k,A,ne],D.utils.clamp,se=D.core.context||function(){},re=`onpointerenter`in ne?`pointer`:`mouse`,j=U.isTouch=O.matchMedia&&O.matchMedia(`(hover: none), (pointer: coarse)`).matches?1:`ontouchstart`in O||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,oe=U.eventTypes=(`ontouchstart`in A?`touchstart,touchmove,touchcancel,touchend`:`onpointerdown`in A?`pointerdown,pointermove,pointercancel,pointerup`:`mousedown,mousemove,mouseup,mouseup`).split(`,`),setTimeout(function(){return ce=0},500),te=1),ie||Se(),te};he.op=ge,F.cache=0;var U=function(){function e(e){this.init(e)}var t=e.prototype;return t.init=function(e){te||Ce(D)||console.warn(`Please gsap.registerPlugin(Observer)`),ie||Se();var t=e.tolerance,n=e.dragMinimum,r=e.type,i=e.target,a=e.lineHeight,o=e.debounce,s=e.preventDefault,c=e.onStop,l=e.onStopDelay,u=e.ignore,d=e.wheelSpeed,f=e.event,p=e.onDragStart,m=e.onDragEnd,h=e.onDrag,g=e.onPress,_=e.onRelease,v=e.onRight,y=e.onLeft,b=e.onUp,x=e.onDown,S=e.onChangeX,ee=e.onChangeY,C=e.onChange,w=e.onToggleX,T=e.onToggleY,E=e.onHover,ae=e.onHoverEnd,N=e.onMove,ce=e.ignoreCheck,F=e.isNormalizer,le=e.onGestureStart,ue=e.onGestureEnd,de=e.onWheel,L=e.onEnable,fe=e.onDisable,pe=e.onClick,V=e.scrollSpeed,U=e.capture,W=e.allowClicks,we=e.lockAxis,G=e.onLockAxis;this.target=i=_e(i)||A,this.vars=e,u&&=D.utils.toArray(u),t||=1e-9,n||=0,d||=1,V||=1,r||=`wheel,touch,pointer`,o=o!==!1,a||=parseFloat(O.getComputedStyle(ne).lineHeight)||22;var K,Te,q,Ee,De,Oe,ke,J=this,Ae=0,je=0,Me=e.passive||!s&&e.passive!==!1,Ne=ye(i,he),Pe=ye(i,ge),Fe=Ne(),Ie=Pe(),Le=~r.indexOf(`touch`)&&!~r.indexOf(`pointer`)&&oe[0]===`pointerdown`,Re=R(i),ze=i.ownerDocument||k,Be=[0,0,0],Y=[0,0,0],Ve=0,He=function(){return Ve=I()},X=function(e,t){return(J.event=e)&&u&&ve(e.target,u)||t&&Le&&e.pointerType!==`touch`||ce&&ce(e,t)},Ue=function(){J._vx.reset(),J._vy.reset(),Te.pause(),c&&c(J)},We=function(){var e=J.deltaX=xe(Be),n=J.deltaY=xe(Y),r=Math.abs(e)>=t,i=Math.abs(n)>=t;C&&(r||i)&&C(J,e,n,Be,Y),r&&(v&&J.deltaX>0&&v(J),y&&J.deltaX<0&&y(J),S&&S(J),w&&J.deltaX<0!=Ae<0&&w(J),Ae=J.deltaX,Be[0]=Be[1]=Be[2]=0),i&&(x&&J.deltaY>0&&x(J),b&&J.deltaY<0&&b(J),ee&&ee(J),T&&J.deltaY<0!=je<0&&T(J),je=J.deltaY,Y[0]=Y[1]=Y[2]=0),(Ee||q)&&(N&&N(J),q&&=(p&&q===1&&p(J),h&&h(J),0),Ee=!1),Oe&&!(Oe=!1)&&G&&G(J),De&&=(de(J),!1),K=0},Ge=function(e,t,n){Be[n]+=e,Y[n]+=t,J._vx.update(e),J._vy.update(t),o?K||=requestAnimationFrame(We):We()},Ke=function(e,t){we&&!ke&&(J.axis=ke=Math.abs(e)>Math.abs(t)?`x`:`y`,Oe=!0),ke!==`y`&&(Be[2]+=e,J._vx.update(e,!0)),ke!==`x`&&(Y[2]+=t,J._vy.update(t,!0)),o?K||=requestAnimationFrame(We):We()},qe=function(e){if(!X(e,1)){e=be(e,s);var t=e.clientX,r=e.clientY,i=t-J.x,a=r-J.y,o=J.isDragging;J.x=t,J.y=r,(o||(i||a)&&(Math.abs(J.startX-t)>=n||Math.abs(J.startY-r)>=n))&&(q||=o?2:1,o||(J.isDragging=!0),Ke(i,a))}},Je=J.onPress=function(e){X(e,1)||e&&e.button||(J.axis=ke=null,Te.pause(),J.isPressed=!0,e=be(e),Ae=je=0,J.startX=J.x=e.clientX,J.startY=J.y=e.clientY,J._vx.reset(),J._vy.reset(),z(F?i:ze,oe[1],qe,Me,!0),J.deltaX=J.deltaY=0,g&&g(J))},Ye=J.onRelease=function(e){if(!X(e,1)){B(F?i:ze,oe[1],qe,!0);var t=!isNaN(J.y-J.startY),n=J.isDragging,r=n&&(Math.abs(J.x-J.startX)>3||Math.abs(J.y-J.startY)>3),a=be(e);!r&&t&&(J._vx.reset(),J._vy.reset(),s&&W&&D.delayedCall(.08,function(){if(I()-Ve>300&&!e.defaultPrevented){if(e.target.click)e.target.click();else if(ze.createEvent){var t=ze.createEvent(`MouseEvents`);t.initMouseEvent(`click`,!0,!0,O,1,a.screenX,a.screenY,a.clientX,a.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(t)}}})),J.isDragging=J.isGesturing=J.isPressed=!1,c&&n&&!F&&Te.restart(!0),q&&We(),m&&n&&m(J),_&&_(J,r)}},Xe=function(e){return e.touches&&e.touches.length>1&&(J.isGesturing=!0)&&le(e,J.isDragging)},Ze=function(){return(J.isGesturing=!1)||ue(J)},Qe=function(e){if(!X(e)){var t=Ne(),n=Pe();Ge((t-Fe)*V,(n-Ie)*V,1),Fe=t,Ie=n,c&&Te.restart(!0)}},$e=function(e){if(!X(e)){e=be(e,s),de&&(De=!0);var t=(e.deltaMode===1?a:e.deltaMode===2?O.innerHeight:1)*d;Ge(e.deltaX*t,e.deltaY*t,0),c&&!F&&Te.restart(!0)}},et=function(e){if(!X(e)){var t=e.clientX,n=e.clientY,r=t-J.x,i=n-J.y;J.x=t,J.y=n,Ee=!0,c&&Te.restart(!0),(r||i)&&Ke(r,i)}},tt=function(e){J.event=e,E(J)},nt=function(e){J.event=e,ae(J)},rt=function(e){return X(e)||be(e,s)&&pe(J)};Te=J._dc=D.delayedCall(l||.25,Ue).pause(),J.deltaX=J.deltaY=0,J._vx=H(0,50,!0),J._vy=H(0,50,!0),J.scrollX=Ne,J.scrollY=Pe,J.isDragging=J.isGesturing=J.isPressed=!1,se(this),J.enable=function(e){return J.isEnabled||(z(Re?ze:i,`scroll`,me),r.indexOf(`scroll`)>=0&&z(Re?ze:i,`scroll`,Qe,Me,U),r.indexOf(`wheel`)>=0&&z(i,`wheel`,$e,Me,U),(r.indexOf(`touch`)>=0&&j||r.indexOf(`pointer`)>=0)&&(z(i,oe[0],Je,Me,U),z(ze,oe[2],Ye),z(ze,oe[3],Ye),W&&z(i,`click`,He,!0,!0),pe&&z(i,`click`,rt),le&&z(ze,`gesturestart`,Xe),ue&&z(ze,`gestureend`,Ze),E&&z(i,re+`enter`,tt),ae&&z(i,re+`leave`,nt),N&&z(i,re+`move`,et)),J.isEnabled=!0,J.isDragging=J.isGesturing=J.isPressed=Ee=q=!1,J._vx.reset(),J._vy.reset(),Fe=Ne(),Ie=Pe(),e&&e.type&&Je(e),L&&L(J)),J},J.disable=function(){J.isEnabled&&(P.filter(function(e){return e!==J&&R(e.target)}).length||B(Re?ze:i,`scroll`,me),J.isPressed&&(J._vx.reset(),J._vy.reset(),B(F?i:ze,oe[1],qe,!0)),B(Re?ze:i,`scroll`,Qe,U),B(i,`wheel`,$e,U),B(i,oe[0],Je,U),B(ze,oe[2],Ye),B(ze,oe[3],Ye),B(i,`click`,He,!0),B(i,`click`,rt),B(ze,`gesturestart`,Xe),B(ze,`gestureend`,Ze),B(i,re+`enter`,tt),B(i,re+`leave`,nt),B(i,re+`move`,et),J.isEnabled=J.isPressed=J.isDragging=!1,fe&&fe(J))},J.kill=J.revert=function(){J.disable();var e=P.indexOf(J);e>=0&&P.splice(e,1),M===J&&(M=0)},P.push(J),F&&R(i)&&(M=J),J.enable(f)},E(e,[{key:`velocityX`,get:function(){return this._vx.getVelocity()}},{key:`velocityY`,get:function(){return this._vy.getVelocity()}}]),e}();U.version=`3.15.0`,U.create=function(e){return new U(e)},U.register=Ce,U.getAll=function(){return P.slice()},U.getById=function(e){return P.filter(function(t){return t.vars.id===e})[0]},N()&&D.registerPlugin(U);var W,we,G,K,Te,q,Ee,De,Oe,ke,J,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Y,Ve,He,X,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze=1,Qe=Date.now,$e=Qe(),et=0,tt=0,nt=function(e,t,n){var r=vt(e)&&(e.substr(0,6)===`clamp(`||e.indexOf(`max`)>-1);return n[`_`+t+`Clamp`]=r,r?e.substr(6,e.length-7):e},rt=function(e,t){return t&&(!vt(e)||e.substr(0,6)!==`clamp(`)?`clamp(`+e+`)`:e},it=function e(){return tt&&requestAnimationFrame(e)},at=function(){return Me=1},ot=function(){return Me=0},st=function(e){return e},ct=function(e){return Math.round(e*1e5)/1e5||0},lt=function(){return typeof window<`u`},ut=function(){return W||lt()&&(W=window.gsap)&&W.registerPlugin&&W},dt=function(e){return!!~Ee.indexOf(e)},ft=function(e){return(e===`Height`?qe:G[`inner`+e])||Te[`client`+e]||q[`client`+e]},pt=function(e){return L(e,`getBoundingClientRect`)||(dt(e)?function(){return Bn.width=G.innerWidth,Bn.height=qe,Bn}:function(){return Ut(e)})},mt=function(e,t,n){var r=n.d,i=n.d2,a=n.a;return(a=L(e,`getBoundingClientRect`))?function(){return a()[r]}:function(){return(t?ft(i):e[`client`+i])||0}},ht=function(e,t){return!t||~le.indexOf(e)?pt(e):function(){return Bn}},gt=function(e,t){var n=t.s,r=t.d2,i=t.d,a=t.a;return Math.max(0,(n=`scroll`+r)&&(a=L(e,n))?a()-pt(e)()[i]:dt(e)?(Te[n]||q[n])-ft(r):e[n]-e[`offset`+r])},_t=function(e,t){for(var n=0;n<Le.length;n+=3)(!t||~t.indexOf(Le[n+1]))&&e(Le[n],Le[n+1],Le[n+2])},vt=function(e){return typeof e==`string`},yt=function(e){return typeof e==`function`},bt=function(e){return typeof e==`number`},xt=function(e){return typeof e==`object`},St=function(e,t,n){return e&&e.progress(+!t)&&n&&e.pause()},Ct=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},wt=Math.abs,Tt=`left`,Et=`top`,Dt=`right`,Ot=`bottom`,kt=`width`,At=`height`,jt=`Right`,Mt=`Left`,Nt=`Top`,Pt=`Bottom`,Ft=`padding`,It=`margin`,Lt=`Width`,Rt=`Height`,zt=`px`,Bt=function(e){return G.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Vt=function(e){var t=Bt(e).position;e.style.position=t===`absolute`||t===`fixed`?t:`relative`},Ht=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ut=function(e,t){var n=t&&Bt(e)[Ne]!==`matrix(1, 0, 0, 1, 0, 0)`&&W.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},Wt=function(e,t){var n=t.d2;return e[`offset`+n]||e[`client`+n]||0},Gt=function(e){var t=[],n=e.labels,r=e.duration(),i;for(i in n)t.push(n[i]/r);return t},Kt=function(e){return function(t){return W.utils.snap(Gt(e),t)}},qt=function(e){var t=W.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(e,t){return e-t});return n?function(e,r,i){i===void 0&&(i=.001);var a;if(!r)return t(e);if(r>0){for(e-=i,a=0;a<n.length;a++)if(n[a]>=e)return n[a];return n[a-1]}else for(a=n.length,e+=i;a--;)if(n[a]<=e)return n[a];return n[0]}:function(n,r,i){i===void 0&&(i=.001);var a=t(n);return!r||Math.abs(a-n)<i||a-n<0==r<0?a:t(r<0?n-e:n+e)}},Jt=function(e){return function(t,n){return qt(Gt(e))(t,n.direction)}},Yt=function(e,t,n,r){return n.split(`,`).forEach(function(n){return e(t,n,r)})},Xt=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:!r,capture:!!i})},Zt=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Qt=function(e,t,n){n&&=n.wheelHandler,n&&(e(t,`wheel`,n),e(t,`touchmove`,n))},$t={startColor:`green`,endColor:`red`,indent:0,fontSize:`16px`,fontWeight:`normal`},en={toggleActions:`play`,anticipatePin:0},tn={top:0,left:0,center:.5,bottom:1,right:1},nn=function(e,t){if(vt(e)){var n=e.indexOf(`=`),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf(`%`)>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in tn?tn[e]*t:~e.indexOf(`%`)?parseFloat(e)*t/100:parseFloat(e)||0)}return e},rn=function(e,t,n,r,i,a,o,s){var c=i.startColor,l=i.endColor,u=i.fontSize,d=i.indent,f=i.fontWeight,p=K.createElement(`div`),m=dt(n)||L(n,`pinType`)===`fixed`,h=e.indexOf(`scroller`)!==-1,g=m?q:n.tagName===`IFRAME`?n.contentDocument.body:n,_=e.indexOf(`start`)!==-1,v=_?c:l,y=`border-color:`+v+`;font-size:`+u+`;color:`+v+`;font-weight:`+f+`;pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;`;return y+=`position:`+((h||s)&&m?`fixed;`:`absolute;`),(h||s||!m)&&(y+=(r===ge?Dt:Ot)+`:`+(a+parseFloat(d))+`px;`),o&&(y+=`box-sizing:border-box;text-align:left;width:`+o.offsetWidth+`px;`),p._isStart=_,p.setAttribute(`class`,`gsap-marker-`+e+(t?` marker-`+t:``)),p.style.cssText=y,p.innerText=t||t===0?e+`-`+t:e,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p[`offset`+r.op.d2],an(p,0,r,_),p},an=function(e,t,n,r){var i={display:`block`},a=n[r?`os2`:`p2`],o=n[r?`p2`:`os2`];e._isFlipped=r,i[n.a+`Percent`]=r?-100:0,i[n.a]=r?`1px`:0,i[`border`+a+Lt]=1,i[`border`+o+Lt]=0,i[n.p]=t+`px`,W.set(e,i)},Z=[],on={},sn,cn=function(){return Qe()-et>34&&(sn||=requestAnimationFrame(jn))},ln=function(){(!Y||!Y.isPressed||Y.startX>q.clientWidth)&&(F.cache++,Y?sn||=requestAnimationFrame(jn):jn(),et||hn(`scrollStart`),et=Qe())},un=function(){X=G.innerWidth,He=G.innerHeight},dn=function(e){F.cache++,(e===!0||!je&&!Be&&!K.fullscreenElement&&!K.webkitFullscreenElement&&(!Ve||X!==G.innerWidth||Math.abs(G.innerHeight-He)>G.innerHeight*.25))&&De.restart(!0)},fn={},pn=[],mn=function e(){return Zt(Q,`scrollEnd`,e)||Dn(!0)},hn=function(e){return fn[e]&&fn[e].map(function(e){return e()})||pn},gn=[],_n=function(e){for(var t=0;t<gn.length;t+=5)(!e||gn[t+4]&&gn[t+4].query===e)&&(gn[t].style.cssText=gn[t+1],gn[t].getBBox&&gn[t].setAttribute(`transform`,gn[t+2]||``),gn[t+3].uncache=1)},vn=function(){return F.forEach(function(e){return yt(e)&&++e.cacheID&&(e.rec=e())})},yn=function(e,t){var n;for(Pe=0;Pe<Z.length;Pe++)n=Z[Pe],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Je=!0,t&&_n(t),t||hn(`revert`)},bn=function(e,t){F.cache++,(t||!xn)&&F.forEach(function(e){return yt(e)&&e.cacheID++&&(e.rec=0)}),vt(e)&&(G.history.scrollRestoration=Ge=e)},xn,Sn=0,Cn,wn=function(){if(Cn!==Sn){var e=Cn=Sn;requestAnimationFrame(function(){return e===Sn&&Dn(!0)})}},Tn=function(){q.appendChild(Ke),qe=!Y&&Ke.offsetHeight||G.innerHeight,q.removeChild(Ke)},En=function(e){return Oe(`.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end`).forEach(function(t){return t.style.display=e?`none`:`block`})},Dn=function(e,t){if(Te=K.documentElement,q=K.body,Ee=[G,K,Te,q],et&&!e&&!Je){Xt(Q,`scrollEnd`,mn);return}Tn(),xn=Q.isRefreshing=!0,Je||vn();var n=hn(`refreshInit`);Re&&Q.sort(),t||yn(),F.forEach(function(e){yt(e)&&(e.smooth&&(e.target.style.scrollBehavior=`auto`),e(0))}),Z.slice(0).forEach(function(e){return e.refresh()}),Je=!1,Z.forEach(function(e){if(e._subPinOffset&&e.pin){var t=e.vars.horizontal?`offsetWidth`:`offsetHeight`,n=e.pin[t];e.revert(!0,1),e.adjustPinSpacing(e.pin[t]-n),e.refresh()}}),Ye=1,En(!0),Z.forEach(function(e){var t=gt(e.scroller,e._dir),n=e.vars.end===`max`||e._endClamp&&e.end>t,r=e._startClamp&&e.start>=t;(n||r)&&e.setPositions(r?t-1:e.start,n?Math.max(r?t:e.start+1,t):e.end,!0)}),En(!1),Ye=0,n.forEach(function(e){return e&&e.render&&e.render(-1)}),F.forEach(function(e){yt(e)&&(e.smooth&&requestAnimationFrame(function(){return e.target.style.scrollBehavior=`smooth`}),e.rec&&e(e.rec))}),bn(Ge,1),De.pause(),Sn++,xn=2,jn(2),Z.forEach(function(e){return yt(e.vars.onRefresh)&&e.vars.onRefresh(e)}),xn=Q.isRefreshing=!1,hn(`refresh`)},On=0,kn=1,An,jn=function(e){if(e===2||!xn&&!Je){Q.isUpdating=!0,An&&An.update(0);var t=Z.length,n=Qe(),r=n-$e>=50,i=t&&Z[0].scroll();if(kn=On>i?-1:1,xn||(On=i),r&&(et&&!Me&&n-et>200&&(et=0,hn(`scrollEnd`)),J=$e,$e=n),kn<0){for(Pe=t;Pe-->0;)Z[Pe]&&Z[Pe].update(0,r);kn=1}else for(Pe=0;Pe<t;Pe++)Z[Pe]&&Z[Pe].update(0,r);Q.isUpdating=!1}sn=0},Mn=[Tt,Et,Ot,Dt,It+Pt,It+jt,It+Nt,It+Mt,`display`,`flexShrink`,`float`,`zIndex`,`gridColumnStart`,`gridColumnEnd`,`gridRowStart`,`gridRowEnd`,`gridArea`,`justifySelf`,`alignSelf`,`placeSelf`,`order`],Nn=Mn.concat([kt,At,`boxSizing`,`max`+Lt,`max`+Rt,`position`,It,Ft,Ft+Nt,Ft+jt,Ft+Pt,Ft+Mt]),Pn=function(e,t,n){Ln(n);var r=e._gsap;if(r.spacerIsNative)Ln(r.spacerState);else if(e._gsap.swappedIn){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}e._gsap.swappedIn=!1},Fn=function(e,t,n,r){if(!e._gsap.swappedIn){for(var i=Mn.length,a=t.style,o=e.style,s;i--;)s=Mn[i],a[s]=n[s];a.position=n.position===`absolute`?`absolute`:`relative`,n.display===`inline`&&(a.display=`inline-block`),o[Ot]=o[Dt]=`auto`,a.flexBasis=n.flexBasis||`auto`,a.overflow=`visible`,a.boxSizing=`border-box`,a[kt]=Wt(e,he)+zt,a[At]=Wt(e,ge)+zt,a[Ft]=o[It]=o[Et]=o[Tt]=`0`,Ln(r),o[kt]=o[`max`+Lt]=n[kt],o[At]=o[`max`+Rt]=n[At],o[Ft]=n[Ft],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},In=/([A-Z])/g,Ln=function(e){if(e){var t=e.t.style,n=e.length,r=0,i,a;for((e.t._gsap||W.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],i=e[r],a?t[i]=a:t[i]&&t.removeProperty(i.replace(In,`-$1`).toLowerCase())}},Rn=function(e){for(var t=Nn.length,n=e.style,r=[],i=0;i<t;i++)r.push(Nn[i],n[Nn[i]]);return r.t=e,r},zn=function(e,t,n){for(var r=[],i=e.length,a=n?8:0,o;a<i;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},Bn={left:0,top:0},Vn=function(e,t,n,r,i,a,o,s,c,l,u,d,f,p){yt(e)&&(e=e(s)),vt(e)&&e.substr(0,3)===`max`&&(e=d+(e.charAt(4)===`=`?nn(`0`+e.substr(3),n):0));var m=f?f.time():0,h,g,_;if(f&&f.seek(0),isNaN(e)||(e=+e),bt(e))f&&(e=W.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),o&&an(o,n,r,!0);else{yt(t)&&(t=t(s));var v=(e||`0`).split(` `),y,b,x,S;_=_e(t,s)||q,y=Ut(_)||{},(!y||!y.left&&!y.top)&&Bt(_).display===`none`&&(S=_.style.display,_.style.display=`block`,y=Ut(_),S?_.style.display=S:_.style.removeProperty(`display`)),b=nn(v[0],y[r.d]),x=nn(v[1]||`0`,n),e=y[r.p]-c[r.p]-l+b+i-x,o&&an(o,x,r,n-x<20||o._isStart&&x>20),n-=n-x}if(p&&(s[p]=e||-.001,e<0&&(e=0)),a){var ee=e+n,C=a._isStart;h=`scroll`+r.d2,an(a,ee,r,C&&ee>20||!C&&(u?Math.max(q[h],Te[h]):a.parentNode[h])<=ee+1),u&&(c=Ut(o),u&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+zt))}return f&&_&&(h=Ut(_),f.seek(d),g=Ut(_),f._caScrollDist=h[r.p]-g[r.p],e=e/f._caScrollDist*d),f&&f.seek(m),f?e:Math.round(e)},Hn=/(webkit|moz|length|cssText|inset)/i,Un=function(e,t,n,r){if(e.parentNode!==t){var i=e.style,a,o;if(t===q){for(a in e._stOrig=i.cssText,o=Bt(e),o)!+a&&!Hn.test(a)&&o[a]&&typeof i[a]==`string`&&a!==`0`&&(i[a]=o[a]);i.top=n,i.left=r}else i.cssText=e._stOrig;W.core.getCache(e).uncache=1,t.appendChild(e)}},Wn=function(e,t,n){var r=t,i=r;return function(t){var a=Math.round(e());return a!==r&&a!==i&&Math.abs(a-r)>3&&Math.abs(a-i)>3&&(t=a,n&&n()),i=r,r=Math.round(t),r}},Gn=function(e,t,n){var r={};r[t.p]=`+=`+n,W.set(e,r)},Kn=function(e,t){var n=ye(e,t),r=`_scroll`+t.p2,i=function t(i,a,o,s,c){var l=t.tween,u=a.onComplete,d={};o||=n();var f=Wn(n,o,function(){l.kill(),t.tween=0});return c=s&&c||0,s||=i-o,l&&l.kill(),a[r]=i,a.inherit=!1,a.modifiers=d,d[r]=function(){return f(o+s*l.ratio+c*l.ratio*l.ratio)},a.onUpdate=function(){F.cache++,t.tween&&jn()},a.onComplete=function(){t.tween=0,u&&u.call(l)},l=t.tween=W.to(e,a),l};return e[r]=n,n.wheelHandler=function(){return i.tween&&i.tween.kill()&&(i.tween=0)},Xt(e,`wheel`,n.wheelHandler),Q.isTouch&&Xt(e,`touchmove`,n.wheelHandler),i},Q=function(){function e(t,n){we||e.register(W)||console.warn(`Please gsap.registerPlugin(ScrollTrigger)`),We(this),this.init(t,n)}var t=e.prototype;return t.init=function(t,n){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!tt){this.update=this.refresh=this.kill=st;return}t=Ht(vt(t)||bt(t)||t.nodeType?{trigger:t}:t,en);var r=t,i=r.onUpdate,a=r.toggleClass,o=r.id,s=r.onToggle,c=r.onRefresh,l=r.scrub,u=r.trigger,d=r.pin,f=r.pinSpacing,p=r.invalidateOnRefresh,m=r.anticipatePin,h=r.onScrubComplete,g=r.onSnapComplete,_=r.once,v=r.snap,y=r.pinReparent,b=r.pinSpacer,x=r.containerAnimation,S=r.fastScrollEnd,ee=r.preventOverlaps,C=t.horizontal||t.containerAnimation&&t.horizontal!==!1?he:ge,w=!l&&l!==0,T=_e(t.scroller||G),E=W.core.getCache(T),D=dt(T),te=(`pinType`in t?t.pinType:L(T,`pinType`)||D&&`fixed`)===`fixed`,O=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],k=w&&t.toggleActions.split(` `),A=`markers`in t?t.markers:en.markers,ne=D?0:parseFloat(Bt(T)[`border`+C.p2+Lt])||0,j=this,re=t.onRefreshInit&&function(){return t.onRefreshInit(j)},ie=mt(T,D,C),ae=ht(T,D),M=0,oe=0,se=0,N=ye(T,C),ce,P,I,ue,de,R,z,B,fe,pe,me,V,ve,H,be,xe,Se,Ce,U,we,Ee,De,Ae,Ne,Fe,Ie,Le,Be,Y,Ve,He,X,Ue,We,Ge,Ke,qe,Je,$e;if(j._startClamp=j._endClamp=!1,j._dir=C,m*=45,j.scroller=T,j.scroll=x?x.time.bind(x):N,ue=N(),j.vars=t,n||=t.animation,`refreshPriority`in t&&(Re=1,t.refreshPriority===-9999&&(An=j)),E.tweenScroll=E.tweenScroll||{top:Kn(T,ge),left:Kn(T,he)},j.tweenTo=ce=E.tweenScroll[C.p],j.scrubDuration=function(e){Ue=bt(e)&&e,Ue?X?X.duration(e):X=W.to(n,{ease:`expo`,totalProgress:`+=0`,inherit:!1,duration:Ue,paused:!0,onComplete:function(){return h&&h(j)}}):(X&&X.progress(1).kill(),X=0)},n&&(n.vars.lazy=!1,n._initted&&!j.isReverted||n.vars.immediateRender!==!1&&t.immediateRender!==!1&&n.duration()&&n.render(0,!0,!0),j.animation=n.pause(),n.scrollTrigger=j,j.scrubDuration(l),Ve=0,o||=n.vars.id),v&&((!xt(v)||v.push)&&(v={snapTo:v}),`scrollBehavior`in q.style&&W.set(D?[q,Te]:T,{scrollBehavior:`auto`}),F.forEach(function(e){return yt(e)&&e.target===(D?K.scrollingElement||Te:T)&&(e.smooth=!1)}),I=yt(v.snapTo)?v.snapTo:v.snapTo===`labels`?Kt(n):v.snapTo===`labelsDirectional`?Jt(n):v.directional===!1?W.utils.snap(v.snapTo):function(e,t){return qt(v.snapTo)(e,Qe()-oe<500?0:t.direction)},We=v.duration||{min:.1,max:2},We=xt(We)?ke(We.min,We.max):ke(We,We),Ge=W.delayedCall(v.delay||Ue/2||.1,function(){var e=N(),t=Qe()-oe<500,r=ce.tween;if((t||Math.abs(j.getVelocity())<10)&&!r&&!Me&&M!==e){var i=(e-R)/H,a=n&&!w?n.totalProgress():i,o=t?0:(a-He)/(Qe()-J)*1e3||0,s=W.utils.clamp(-i,1-i,wt(o/2)*o/.185),c=i+(v.inertia===!1?0:s),l,u,d=v,f=d.onStart,p=d.onInterrupt,m=d.onComplete;if(l=I(c,j),bt(l)||(l=c),u=Math.max(0,Math.round(R+l*H)),e<=z&&e>=R&&u!==e){if(r&&!r._initted&&r.data<=wt(u-e))return;v.inertia===!1&&(s=l-i),ce(u,{duration:We(wt(Math.max(wt(c-a),wt(l-a))*.185/o/.05||0)),ease:v.ease||`power3`,data:wt(u-e),onInterrupt:function(){return Ge.restart(!0)&&p&&Ct(j,p)},onComplete:function(){j.update(),M=N(),n&&!w&&(X?X.resetTo(`totalProgress`,l,n._tTime/n._tDur):n.progress(l)),Ve=He=n&&!w?n.totalProgress():j.progress,g&&g(j),m&&Ct(j,m)}},e,s*H,u-e-s*H),f&&Ct(j,f,ce.tween)}}else j.isActive&&M!==e&&Ge.restart(!0)}).pause()),o&&(on[o]=j),u=j.trigger=_e(u||d!==!0&&d),$e=u&&u._gsap&&u._gsap.stRevert,$e&&=$e(j),d=d===!0?u:_e(d),vt(a)&&(a={targets:u,className:a}),d&&(f===!1||f===It||(f=!f&&d.parentNode&&d.parentNode.style&&Bt(d.parentNode).display===`flex`?!1:Ft),j.pin=d,P=W.core.getCache(d),P.spacer?be=P.pinState:(b&&(b=_e(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),P.spacerIsNative=!!b,b&&(P.spacerState=Rn(b))),P.spacer=Ce=b||K.createElement(`div`),Ce.classList.add(`pin-spacer`),o&&Ce.classList.add(`pin-spacer-`+o),P.pinState=be=Rn(d)),t.force3D!==!1&&W.set(d,{force3D:!0}),j.spacer=Ce=P.spacer,Y=Bt(d),Ne=Y[f+C.os2],we=W.getProperty(d),Ee=W.quickSetter(d,C.a,zt),Fn(d,Ce,Y),Se=Rn(d)),A){V=xt(A)?Ht(A,$t):$t,pe=rn(`scroller-start`,o,T,C,V,0),me=rn(`scroller-end`,o,T,C,V,0,pe),U=pe[`offset`+C.op.d2];var it=_e(L(T,`content`)||T);B=this.markerStart=rn(`start`,o,it,C,V,U,0,x),fe=this.markerEnd=rn(`end`,o,it,C,V,U,0,x),x&&(Je=W.quickSetter([B,fe],C.a,zt)),!te&&!(le.length&&L(T,`fixedMarkers`)===!0)&&(Vt(D?q:T),W.set([pe,me],{force3D:!0}),Ie=W.quickSetter(pe,C.a,zt),Be=W.quickSetter(me,C.a,zt))}if(x){var at=x.vars.onUpdate,ot=x.vars.onUpdateParams;x.eventCallback(`onUpdate`,function(){j.update(0,0,1),at&&at.apply(x,ot||[])})}if(j.previous=function(){return Z[Z.indexOf(j)-1]},j.next=function(){return Z[Z.indexOf(j)+1]},j.revert=function(e,t){if(!t)return j.kill(!0);var r=e!==!1||!j.enabled,i=je;r!==j.isReverted&&(r&&(Ke=Math.max(N(),j.scroll.rec||0),se=j.progress,qe=n&&n.progress()),B&&[B,fe,pe,me].forEach(function(e){return e.style.display=r?`none`:`block`}),r&&(je=j,j.update(r)),d&&(!y||!j.isActive)&&(r?Pn(d,Ce,be):Fn(d,Ce,Bt(d),Fe)),r||j.update(r),je=i,j.isReverted=r)},j.refresh=function(r,i,a,o){if(!((je||!j.enabled)&&!i)){if(d&&r&&et){Xt(e,`scrollEnd`,mn);return}!xn&&re&&re(j),je=j,ce.tween&&!a&&(ce.tween.kill(),ce.tween=0),X&&X.pause(),p&&n&&(n.revert({kill:!1}).invalidate(),n.getChildren?n.getChildren(!0,!0,!1).forEach(function(e){return e.vars.immediateRender&&e.render(0,!0,!0)}):n.vars.immediateRender&&n.render(0,!0,!0)),j.isReverted||j.revert(!0,!0),j._subPinOffset=!1;var s=ie(),l=ae(),m=x?x.duration():gt(T,C),h=H<=.01||!H,g=0,_=o||0,v=xt(a)?a.end:t.end,b=t.endTrigger||u,S=xt(a)?a.start:t.start||(t.start===0||!u?0:d?`0 0`:`0 100%`),ee=j.pinnedContainer=t.pinnedContainer&&_e(t.pinnedContainer,j),E=u&&Math.max(0,Z.indexOf(j))||0,O=E,k,P,F,le,I,L,V,U,G,Ee,Oe,ke,J;for(A&&xt(a)&&(ke=W.getProperty(pe,C.p),J=W.getProperty(me,C.p));O-->0;)L=Z[O],L.end||L.refresh(0,1)||(je=j),V=L.pin,V&&(V===u||V===d||V===ee)&&!L.isReverted&&(Ee||=[],Ee.unshift(L),L.revert(!0,!0)),L!==Z[O]&&(E--,O--);for(yt(S)&&(S=S(j)),S=nt(S,`start`,j),R=Vn(S,u,s,C,N(),B,pe,j,l,ne,te,m,x,j._startClamp&&`_startClamp`)||(d?-.001:0),yt(v)&&(v=v(j)),vt(v)&&!v.indexOf(`+=`)&&(~v.indexOf(` `)?v=(vt(S)?S.split(` `)[0]:``)+v:(g=nn(v.substr(2),s),v=vt(S)?S:(x?W.utils.mapRange(0,x.duration(),x.scrollTrigger.start,x.scrollTrigger.end,R):R)+g,b=u)),v=nt(v,`end`,j),z=Math.max(R,Vn(v||(b?`100% 0`:m),b,s,C,N()+g,fe,me,j,l,ne,te,m,x,j._endClamp&&`_endClamp`))||-.001,g=0,O=E;O--;)L=Z[O]||{},V=L.pin,V&&L.start-L._pinPush<=R&&!x&&L.end>0&&(k=L.end-(j._startClamp?Math.max(0,L.start):L.start),(V===u&&L.start-L._pinPush<R||V===ee)&&isNaN(S)&&(g+=k*(1-L.progress)),V===d&&(_+=k));if(R+=g,z+=g,j._startClamp&&(j._startClamp+=g),j._endClamp&&!xn&&(j._endClamp=z||-.001,z=Math.min(z,gt(T,C))),H=z-R||(R-=.01)&&.001,h&&(se=W.utils.clamp(0,1,W.utils.normalize(R,z,Ke))),j._pinPush=_,B&&g&&(k={},k[C.a]=`+=`+g,ee&&(k[C.p]=`-=`+N()),W.set([B,fe],k)),d&&!(Ye&&j.end>=gt(T,C)))k=Bt(d),le=C===ge,F=N(),De=parseFloat(we(C.a))+_,!m&&z>1&&(Oe=(D?K.scrollingElement||Te:T).style,Oe={style:Oe,value:Oe[`overflow`+C.a.toUpperCase()]},D&&Bt(q)[`overflow`+C.a.toUpperCase()]!==`scroll`&&(Oe.style[`overflow`+C.a.toUpperCase()]=`scroll`)),Fn(d,Ce,k),Se=Rn(d),P=Ut(d,!0),U=te&&ye(T,le?he:ge)(),f?(Fe=[f+C.os2,H+_+zt],Fe.t=Ce,O=f===Ft?Wt(d,C)+H+_:0,O&&(Fe.push(C.d,O+zt),Ce.style.flexBasis!==`auto`&&(Ce.style.flexBasis=O+zt)),Ln(Fe),ee&&Z.forEach(function(e){e.pin===ee&&e.vars.pinSpacing!==!1&&(e._subPinOffset=!0)}),te&&N(Ke)):(O=Wt(d,C),O&&Ce.style.flexBasis!==`auto`&&(Ce.style.flexBasis=O+zt)),te&&(I={top:P.top+(le?F-R:U)+zt,left:P.left+(le?U:F-R)+zt,boxSizing:`border-box`,position:`fixed`},I[kt]=I[`max`+Lt]=Math.ceil(P.width)+zt,I[At]=I[`max`+Rt]=Math.ceil(P.height)+zt,I[It]=I[It+Nt]=I[It+jt]=I[It+Pt]=I[It+Mt]=`0`,I[Ft]=k[Ft],I[Ft+Nt]=k[Ft+Nt],I[Ft+jt]=k[Ft+jt],I[Ft+Pt]=k[Ft+Pt],I[Ft+Mt]=k[Ft+Mt],xe=zn(be,I,y),xn&&N(0)),n?(G=n._initted,ze(1),n.render(n.duration(),!0,!0),Ae=we(C.a)-De+H+_,Le=Math.abs(H-Ae)>1,te&&Le&&xe.splice(xe.length-2,2),n.render(0,!0,!0),G||n.invalidate(!0),n.parent||n.totalTime(n.totalTime()),ze(0)):Ae=H,Oe&&(Oe.value?Oe.style[`overflow`+C.a.toUpperCase()]=Oe.value:Oe.style.removeProperty(`overflow-`+C.a));else if(u&&N()&&!x)for(P=u.parentNode;P&&P!==q;)P._pinOffset&&(R-=P._pinOffset,z-=P._pinOffset),P=P.parentNode;Ee&&Ee.forEach(function(e){return e.revert(!1,!0)}),j.start=R,j.end=z,ue=de=xn?Ke:N(),!x&&!xn&&(ue<Ke&&N(Ke),j.scroll.rec=0),j.revert(!1,!0),oe=Qe(),Ge&&(M=-1,Ge.restart(!0)),je=0,n&&w&&(n._initted||qe)&&n.progress()!==qe&&n.progress(qe||0,!0).render(n.time(),!0,!0),(h||se!==j.progress||x||p||n&&!n._initted)&&(n&&!w&&(n._initted||se||n.vars.immediateRender!==!1)&&n.totalProgress(x&&R<-.001&&!se?W.utils.normalize(R,z,0):se,!0),j.progress=h||(ue-R)/H===se?0:se),d&&f&&(Ce._pinOffset=Math.round(j.progress*Ae)),X&&X.invalidate(),isNaN(ke)||(ke-=W.getProperty(pe,C.p),J-=W.getProperty(me,C.p),Gn(pe,C,ke),Gn(B,C,ke-(o||0)),Gn(me,C,J),Gn(fe,C,J-(o||0))),h&&!xn&&j.update(),c&&!xn&&!ve&&(ve=!0,c(j),ve=!1)}},j.getVelocity=function(){return(N()-de)/(Qe()-J)*1e3||0},j.endAnimation=function(){St(j.callbackAnimation),n&&(X?X.progress(1):n.paused()?w||St(n,j.direction<0,1):St(n,n.reversed()))},j.labelToScroll=function(e){return n&&n.labels&&(R||j.refresh()||R)+n.labels[e]/n.duration()*H||0},j.getTrailing=function(e){var t=Z.indexOf(j),n=j.direction>0?Z.slice(0,t).reverse():Z.slice(t+1);return(vt(e)?n.filter(function(t){return t.vars.preventOverlaps===e}):n).filter(function(e){return j.direction>0?e.end<=R:e.start>=z})},j.update=function(e,t,r){if(!(x&&!r&&!e)){var o=xn===!0?Ke:j.scroll(),c=e?0:(o-R)/H,u=c<0?0:c>1?1:c||0,p=j.progress,h,g,b,E,D,A,ne,re;if(t&&(de=ue,ue=x?N():o,v&&(He=Ve,Ve=n&&!w?n.totalProgress():u)),m&&d&&!je&&!Ze&&et&&(!u&&R<o+(o-de)/(Qe()-J)*m?u=1e-4:u===1&&z>o+(o-de)/(Qe()-J)*m&&(u=.9999)),u!==p&&j.enabled){if(h=j.isActive=!!u&&u<1,g=!!p&&p<1,A=h!==g,D=A||!!u!=!!p,j.direction=u>p?1:-1,j.progress=u,D&&!je&&(b=u&&!p?0:u===1?1:p===1?2:3,w&&(E=!A&&k[b+1]!==`none`&&k[b+1]||k[b],re=n&&(E===`complete`||E===`reset`||E in n))),ee&&(A||re)&&(re||l||!n)&&(yt(ee)?ee(j):j.getTrailing(ee).forEach(function(e){return e.endAnimation()})),w||(X&&!je&&!Ze?(X._dp._time-X._start!==X._time&&X.render(X._dp._time-X._start),X.resetTo?X.resetTo(`totalProgress`,u,n._tTime/n._tDur):(X.vars.totalProgress=u,X.invalidate().restart())):n&&n.totalProgress(u,!!(je&&(oe||e)))),d){if(e&&f&&(Ce.style[f+C.os2]=Ne),!te)Ee(ct(De+Ae*u));else if(D){if(ne=!e&&u>p&&z+1>o&&o+1>=gt(T,C),y)if(!e&&(h||ne)){var ie=Ut(d,!0),ae=o-R;Un(d,q,ie.top+(C===ge?ae:0)+zt,ie.left+(C===ge?0:ae)+zt)}else Un(d,Ce);Ln(h||ne?xe:Se),Le&&u<1&&h||Ee(De+(u===1&&!ne?Ae:0))}}v&&!ce.tween&&!je&&!Ze&&Ge.restart(!0),a&&(A||_&&u&&(u<1||!Xe))&&Oe(a.targets).forEach(function(e){return e.classList[h||_?`add`:`remove`](a.className)}),i&&!w&&!e&&i(j),D&&!je?(w&&(re&&(E===`complete`?n.pause().totalProgress(1):E===`reset`?n.restart(!0).pause():E===`restart`?n.restart(!0):n[E]()),i&&i(j)),(A||!Xe)&&(s&&A&&Ct(j,s),O[b]&&Ct(j,O[b]),_&&(u===1?j.kill(!1,1):O[b]=0),A||(b=u===1?1:3,O[b]&&Ct(j,O[b]))),S&&!h&&Math.abs(j.getVelocity())>(bt(S)?S:2500)&&(St(j.callbackAnimation),X?X.progress(1):St(n,E===`reverse`?1:!u,1))):w&&i&&!je&&i(j)}if(Be){var M=x?o/x.duration()*(x._caScrollDist||0):o;Ie(M+ +!!pe._isFlipped),Be(M)}Je&&Je(-o/x.duration()*(x._caScrollDist||0))}},j.enable=function(t,n){j.enabled||(j.enabled=!0,Xt(T,`resize`,dn),D||Xt(T,`scroll`,ln),re&&Xt(e,`refreshInit`,re),t!==!1&&(j.progress=se=0,ue=de=M=N()),n!==!1&&j.refresh())},j.getTween=function(e){return e&&ce?ce.tween:X},j.setPositions=function(e,t,n,r){if(x){var i=x.scrollTrigger,a=x.duration(),o=i.end-i.start;e=i.start+o*e/a,t=i.start+o*t/a}j.refresh(!1,!1,{start:rt(e,n&&!!j._startClamp),end:rt(t,n&&!!j._endClamp)},r),j.update()},j.adjustPinSpacing=function(e){if(Fe&&e){var t=Fe.indexOf(C.d)+1;Fe[t]=parseFloat(Fe[t])+e+zt,Fe[1]=parseFloat(Fe[1])+e+zt,Ln(Fe)}},j.disable=function(t,n){if(t!==!1&&j.revert(!0,!0),j.enabled&&(j.enabled=j.isActive=!1,n||X&&X.pause(),Ke=0,P&&(P.uncache=1),re&&Zt(e,`refreshInit`,re),Ge&&(Ge.pause(),ce.tween&&ce.tween.kill()&&(ce.tween=0)),!D)){for(var r=Z.length;r--;)if(Z[r].scroller===T&&Z[r]!==j)return;Zt(T,`resize`,dn),D||Zt(T,`scroll`,ln)}},j.kill=function(e,r){j.disable(e,r),X&&!r&&X.kill(),o&&delete on[o];var i=Z.indexOf(j);i>=0&&Z.splice(i,1),i===Pe&&kn>0&&Pe--,i=0,Z.forEach(function(e){return e.scroller===j.scroller&&(i=1)}),i||xn||(j.scroll.rec=0),n&&(n.scrollTrigger=null,e&&n.revert({kill:!1}),r||n.kill()),B&&[B,fe,pe,me].forEach(function(e){return e.parentNode&&e.parentNode.removeChild(e)}),An===j&&(An=0),d&&(P&&(P.uncache=1),i=0,Z.forEach(function(e){return e.pin===d&&i++}),i||(P.spacer=0)),t.onKill&&t.onKill(j)},Z.push(j),j.enable(!1,!1),$e&&$e(j),n&&n.add&&!H){var lt=j.update;j.update=function(){j.update=lt,F.cache++,R||z||j.refresh()},W.delayedCall(.01,j.update),H=.01,R=z=0}else j.refresh();d&&wn()},e.register=function(t){return we||=(W=t||ut(),lt()&&window.document&&e.enable(),tt),we},e.defaults=function(e){if(e)for(var t in e)en[t]=e[t];return en},e.disable=function(e,t){tt=0,Z.forEach(function(n){return n[t?`kill`:`disable`](e)}),Zt(G,`wheel`,ln),Zt(K,`scroll`,ln),clearInterval(Ae),Zt(K,`touchcancel`,st),Zt(q,`touchstart`,st),Yt(Zt,K,`pointerdown,touchstart,mousedown`,at),Yt(Zt,K,`pointerup,touchend,mouseup`,ot),De.kill(),_t(Zt);for(var n=0;n<F.length;n+=3)Qt(Zt,F[n],F[n+1]),Qt(Zt,F[n],F[n+2])},e.enable=function(){if(G=window,K=document,Te=K.documentElement,q=K.body,W)if(Oe=W.utils.toArray,ke=W.utils.clamp,We=W.core.context||st,ze=W.core.suppressOverwrites||st,Ge=G.history.scrollRestoration||`auto`,On=G.pageYOffset||0,W.core.globals(`ScrollTrigger`,e),q){tt=1,Ke=document.createElement(`div`),Ke.style.height=`100vh`,Ke.style.position=`absolute`,Tn(),it(),U.register(W),e.isTouch=U.isTouch,Ue=U.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ve=U.isTouch===1,Xt(G,`wheel`,ln),Ee=[G,K,Te,q],W.matchMedia?(e.matchMedia=function(e){var t=W.matchMedia(),n;for(n in e)t.add(n,e[n]);return t},W.addEventListener(`matchMediaInit`,function(){vn(),yn()}),W.addEventListener(`matchMediaRevert`,function(){return _n()}),W.addEventListener(`matchMedia`,function(){Dn(0,1),hn(`matchMedia`)}),W.matchMedia().add(`(orientation: portrait)`,function(){return un(),un})):console.warn(`Requires GSAP 3.11.0 or later`),un(),Xt(K,`scroll`,ln);var t=q.hasAttribute(`style`),n=q.style,r=n.borderTopStyle,i=W.core.Animation.prototype,a,o;for(i.revert||Object.defineProperty(i,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle=`solid`,a=Ut(q),ge.m=Math.round(a.top+ge.sc())||0,he.m=Math.round(a.left+he.sc())||0,r?n.borderTopStyle=r:n.removeProperty(`border-top-style`),t||(q.setAttribute(`style`,``),q.removeAttribute(`style`)),Ae=setInterval(cn,250),W.delayedCall(.5,function(){return Ze=0}),Xt(K,`touchcancel`,st),Xt(q,`touchstart`,st),Yt(Xt,K,`pointerdown,touchstart,mousedown`,at),Yt(Xt,K,`pointerup,touchend,mouseup`,ot),Ne=W.utils.checkPrefix(`transform`),Nn.push(Ne),we=Qe(),De=W.delayedCall(.2,Dn).pause(),Le=[K,`visibilitychange`,function(){var e=G.innerWidth,t=G.innerHeight;K.hidden?(Fe=e,Ie=t):(Fe!==e||Ie!==t)&&dn()},K,`DOMContentLoaded`,Dn,G,`load`,Dn,G,`resize`,dn],_t(Xt),Z.forEach(function(e){return e.enable(0,1)}),o=0;o<F.length;o+=3)Qt(Zt,F[o],F[o+1]),Qt(Zt,F[o],F[o+2])}else K&&K.addEventListener(`DOMContentLoaded`,function t(){e.enable(),K.removeEventListener(`DOMContentLoaded`,t)})},e.config=function(t){`limitCallbacks`in t&&(Xe=!!t.limitCallbacks);var n=t.syncInterval;n&&clearInterval(Ae)||(Ae=n)&&setInterval(cn,n),`ignoreMobileResize`in t&&(Ve=e.isTouch===1&&t.ignoreMobileResize),`autoRefreshEvents`in t&&(_t(Zt)||_t(Xt,t.autoRefreshEvents||`none`),Be=(t.autoRefreshEvents+``).indexOf(`resize`)===-1)},e.scrollerProxy=function(e,t){var n=_e(e),r=F.indexOf(n),i=dt(n);~r&&F.splice(r,i?6:2),t&&(i?le.unshift(G,t,q,t,Te,t):le.unshift(n,t))},e.clearMatchMedia=function(e){Z.forEach(function(t){return t._ctx&&t._ctx.query===e&&t._ctx.kill(!0,!0)})},e.isInViewport=function(e,t,n){var r=(vt(e)?_e(e):e).getBoundingClientRect(),i=r[n?kt:At]*t||0;return n?r.right-i>0&&r.left+i<G.innerWidth:r.bottom-i>0&&r.top+i<G.innerHeight},e.positionInViewport=function(e,t,n){vt(e)&&(e=_e(e));var r=e.getBoundingClientRect(),i=r[n?kt:At],a=t==null?i/2:t in tn?tn[t]*i:~t.indexOf(`%`)?parseFloat(t)*i/100:parseFloat(t)||0;return n?(r.left+a)/G.innerWidth:(r.top+a)/G.innerHeight},e.killAll=function(e){if(Z.slice(0).forEach(function(e){return e.vars.id!==`ScrollSmoother`&&e.kill()}),e!==!0){var t=fn.killAll||[];fn={},t.forEach(function(e){return e()})}},e}();Q.version=`3.15.0`,Q.saveStyles=function(e){return e?Oe(e).forEach(function(e){if(e&&e.style){var t=gn.indexOf(e);t>=0&&gn.splice(t,5),gn.push(e,e.style.cssText,e.getBBox&&e.getAttribute(`transform`),W.core.getCache(e),We())}}):gn},Q.revert=function(e,t){return yn(!e,t)},Q.create=function(e,t){return new Q(e,t)},Q.refresh=function(e){return e?dn(!0):(we||Q.register())&&Dn(!0)},Q.update=function(e){return++F.cache&&jn(e===!0?2:0)},Q.clearScrollMemory=bn,Q.maxScroll=function(e,t){return gt(e,t?he:ge)},Q.getScrollFunc=function(e,t){return ye(_e(e),t?he:ge)},Q.getById=function(e){return on[e]},Q.getAll=function(){return Z.filter(function(e){return e.vars.id!==`ScrollSmoother`})},Q.isScrolling=function(){return!!et},Q.snapDirectional=qt,Q.addEventListener=function(e,t){var n=fn[e]||(fn[e]=[]);~n.indexOf(t)||n.push(t)},Q.removeEventListener=function(e,t){var n=fn[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},Q.batch=function(e,t){var n=[],r={},i=t.interval||.016,a=t.batchMax||1e9,o=function(e,t){var n=[],r=[],o=W.delayedCall(i,function(){t(n,r),n=[],r=[]}).pause();return function(e){n.length||o.restart(!0),n.push(e.trigger),r.push(e),a<=n.length&&o.progress(1)}},s;for(s in t)r[s]=s.substr(0,2)===`on`&&yt(t[s])&&s!==`onRefreshInit`?o(s,t[s]):t[s];return yt(a)&&(a=a(),Xt(Q,`refresh`,function(){return a=t.batchMax()})),Oe(e).forEach(function(e){var t={};for(s in r)t[s]=r[s];t.trigger=e,n.push(Q.create(t))}),n};var qn=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Jn=function e(t,n){n===!0?t.style.removeProperty(`touch-action`):t.style.touchAction=n===!0?`auto`:n?`pan-`+n+(U.isTouch?` pinch-zoom`:``):`none`,t===Te&&e(q,n)},Yn={auto:1,scroll:1},Xn=function(e){var t=e.event,n=e.target,r=e.axis,i=(t.changedTouches?t.changedTouches[0]:t).target,a=i._gsap||W.core.getCache(i),o=Qe(),s;if(!a._isScrollT||o-a._isScrollT>2e3){for(;i&&i!==q&&(i.scrollHeight<=i.clientHeight&&i.scrollWidth<=i.clientWidth||!(Yn[(s=Bt(i)).overflowY]||Yn[s.overflowX]));)i=i.parentNode;a._isScroll=i&&i!==n&&!dt(i)&&(Yn[(s=Bt(i)).overflowY]||Yn[s.overflowX]),a._isScrollT=o}(a._isScroll||r===`x`)&&(t.stopPropagation(),t._gsapAllow=!0)},Zn=function(e,t,n,r){return U.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r&&=Xn,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&Xt(K,U.eventTypes[0],er,!1,!0)},onDisable:function(){return Zt(K,U.eventTypes[0],er,!0)}})},Qn=/(input|label|select|textarea)/i,$n,er=function(e){var t=Qn.test(e.target.tagName);(t||$n)&&(e._gsapAllow=!0,$n=t)},tr=function(e){xt(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||=`wheel,touch`,e.debounce=!!e.debounce,e.id=e.id||`normalizer`;var t=e,n=t.normalizeScrollX,r=t.momentum,i=t.allowNestedScroll,a=t.onRelease,o,s,c=_e(e.target)||Te,l=W.core.globals().ScrollSmoother,u=l&&l.get(),d=Ue&&(e.content&&_e(e.content)||u&&e.content!==!1&&!u.smooth()&&u.content()),f=ye(c,ge),p=ye(c,he),m=1,h=(U.isTouch&&G.visualViewport?G.visualViewport.scale*G.visualViewport.width:G.outerWidth)/G.innerWidth,g=0,_=yt(r)?function(){return r(o)}:function(){return r||2.8},v,y,b=Zn(c,e.type,!0,i),x=function(){return y=!1},S=st,ee=st,C=function(){s=gt(c,ge),ee=ke(+!!Ue,s),n&&(S=ke(0,gt(c,he))),v=Sn},w=function(){d._gsap.y=ct(parseFloat(d._gsap.y)+f.offset)+`px`,d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+parseFloat(d._gsap.y)+`, 0, 1)`,f.offset=f.cacheID=0},T=function(){if(y){requestAnimationFrame(x);var e=ct(o.deltaY/2),t=ee(f.v-e);if(d&&t!==f.v+f.offset){f.offset=t-f.v;var n=ct((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+n+`, 0, 1)`,d._gsap.y=n+`px`,f.cacheID=F.cache,jn()}return!0}f.offset&&w(),y=!0},E,D,te,O,k=function(){C(),E.isActive()&&E.vars.scrollY>s&&(f()>s?E.progress(1)&&f(s):E.resetTo(`scrollY`,s))};return d&&W.set(d,{y:`+=0`}),e.ignoreCheck=function(e){return Ue&&e.type===`touchmove`&&T(e)||m>1.05&&e.type!==`touchstart`||o.isGesturing||e.touches&&e.touches.length>1},e.onPress=function(){y=!1;var e=m;m=ct((G.visualViewport&&G.visualViewport.scale||1)/h),E.pause(),e!==m&&Jn(c,m>1.01||!n&&`x`),D=p(),te=f(),C(),v=Sn},e.onRelease=e.onGestureStart=function(e,t){if(f.offset&&w(),!t)O.restart(!0);else{F.cache++;var r=_(),i,o;n&&(i=p(),o=i+r*.05*-e.velocityX/.227,r*=qn(p,i,o,gt(c,he)),E.vars.scrollX=S(o)),i=f(),o=i+r*.05*-e.velocityY/.227,r*=qn(f,i,o,gt(c,ge)),E.vars.scrollY=ee(o),E.invalidate().duration(r).play(.01),(Ue&&E.vars.scrollY>=s||i>=s-1)&&W.to({},{onUpdate:k,duration:r})}a&&a(e)},e.onWheel=function(){E._ts&&E.pause(),Qe()-g>1e3&&(v=0,g=Qe())},e.onChange=function(e,t,r,i,a){if(Sn!==v&&C(),t&&n&&p(S(i[2]===t?D+(e.startX-e.x):p()+t-i[1])),r){f.offset&&w();var o=a[2]===r,s=o?te+e.startY-e.y:f()+r-a[1],c=ee(s);o&&s!==c&&(te+=c-s),f(c)}(r||t)&&jn()},e.onEnable=function(){Jn(c,!n&&`x`),Q.addEventListener(`refresh`,k),Xt(G,`resize`,k),f.smooth&&=(f.target.style.scrollBehavior=`auto`,p.smooth=!1),b.enable()},e.onDisable=function(){Jn(c,!0),Zt(G,`resize`,k),Q.removeEventListener(`refresh`,k),b.kill()},e.lockAxis=e.lockAxis!==!1,o=new U(e),o.iOS=Ue,Ue&&!f()&&f(1),Ue&&W.ticker.add(st),O=o._dc,E=W.to(o,{ease:`power4`,paused:!0,inherit:!1,scrollX:n?`+=0.1`:`+=0`,scrollY:`+=0.1`,modifiers:{scrollY:Wn(f,f(),function(){return E.pause()})},onUpdate:jn,onComplete:O.vars.onComplete}),o};Q.sort=function(e){if(yt(e))return Z.sort(e);var t=G.pageYOffset||0;return Q.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+G.innerHeight}),Z.sort(e||function(e,t){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+(t.vars.refreshPriority||0)*-1e6)})},Q.observe=function(e){return new U(e)},Q.normalizeScroll=function(e){if(e===void 0)return Y;if(e===!0&&Y)return Y.enable();if(e===!1){Y&&Y.kill(),Y=e;return}var t=e instanceof U?e:tr(e);return Y&&Y.target===t.target&&Y.kill(),dt(t.target)&&(Y=t),t},Q.core={_getVelocityProp:H,_inputObserver:Zn,_scrollers:F,_proxies:le,bridge:{ss:function(){et||hn(`scrollStart`),et=Qe()},ref:function(){return je}}},ut()&&W.registerPlugin(Q);var $=p();function nr(){let{user:e,signed:r,logout:i}=t(),a=l(),[s,c]=(0,w.useState)(!1),[u,d]=(0,w.useState)(!1),f=(0,w.useRef)(null),p=(0,w.useRef)(null);(0,w.useEffect)(()=>{let e=e=>{f.current&&!f.current.contains(e.target)&&c(!1),p.current&&!p.current.contains(e.target)&&d(!1)},t=e=>{e.key===`Escape`&&(c(!1),d(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,w.useEffect)(()=>{c(!1),d(!1)},[a.pathname]);let h=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=h?.avatarUrl||h?.avatar,_=h?.nome?.charAt(0).toUpperCase()||`U`,v=h?.nome?.split(` `)[0]||``,y=r?`/publicar`:`/login`,b=r?void 0:m(a,`/`);return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`style`,{children:`
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
      `}),(0,$.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:p,children:[(0,$.jsxs)(`div`,{className:`nl-inner`,children:[(0,$.jsxs)(n,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,$.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,$.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,$.jsxs)(`div`,{className:`nl-links`,children:[(0,$.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,$.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,$.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,$.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,$.jsx)(n,{to:`/profissionais`,children:`Profissionais`})]}),(0,$.jsxs)(`div`,{className:`nl-actions`,children:[(0,$.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{c(!1),d(e=>!e)},"aria-expanded":u,"aria-controls":`nl-mobile-menu`,"aria-label":u?`Fechar navegação`:`Abrir navegação`,children:u?(0,$.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,$.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,$.jsx)(o,{}),!r&&(0,$.jsx)(n,{to:`/login`,state:{from:a.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,$.jsx)(n,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),r?(0,$.jsxs)(`div`,{ref:f,className:`nl-user-wrap`,children:[(0,$.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${s?`active`:``}`,onClick:()=>{d(!1),c(e=>!e)},"aria-expanded":s,"aria-label":`Abrir menu de utilizador`,children:[(0,$.jsx)(`span`,{className:`nl-avatar`,children:g?(0,$.jsx)(`img`,{src:g,alt:``}):(0,$.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,$.jsx)(`span`,{className:`nl-username`,children:v}),(0,$.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),s&&(0,$.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,$.jsxs)(n,{to:`/perfil`,onClick:()=>c(!1),className:`nl-ud-item`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,$.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,$.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,$.jsx)(`div`,{className:`nl-ud-divider`}),(0,$.jsxs)(`button`,{type:`button`,onClick:()=>{c(!1),i()},className:`nl-ud-item logout`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,$.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,$.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,$.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),u&&(0,$.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,$.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,$.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`strong`,{children:`Noxvelia`}),(0,$.jsx)(`span`,{children:`Carros e imóveis em Portugal`})]})]}),(0,$.jsx)(`a`,{href:`#pesquisa`,onClick:()=>d(!1),children:`Pesquisar`}),(0,$.jsx)(`a`,{href:`#anunciar`,onClick:()=>d(!1),children:`Anunciar grátis`}),(0,$.jsx)(`a`,{href:`#marcas`,onClick:()=>d(!1),children:`Marcas`}),(0,$.jsx)(`a`,{href:`#atalhos`,onClick:()=>d(!1),children:`Atalhos`}),(0,$.jsx)(n,{to:`/carros`,onClick:()=>d(!1),children:`Carros`}),(0,$.jsx)(n,{to:`/imoveis`,onClick:()=>d(!1),children:`Imóveis`}),(0,$.jsx)(n,{to:`/profissionais`,onClick:()=>d(!1),children:`Profissionais`}),(0,$.jsx)(n,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>d(!1),children:`Publicar anúncio`}),r?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(n,{to:`/perfil`,onClick:()=>d(!1),children:`O meu perfil`}),(0,$.jsx)(`button`,{type:`button`,onClick:()=>{d(!1),i()},children:`Terminar sessão`})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(n,{to:`/login`,state:{from:a.pathname},onClick:()=>d(!1),children:`Entrar`}),(0,$.jsx)(n,{to:`/registo`,onClick:()=>d(!1),children:`Registar`})]})]})]})]})}c.registerPlugin(Q);var rr=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,ir=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],ar=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],or=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],sr=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],cr=[`T1`,`T2`,`T3`,`T4`,`T5+`],lr=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],ur=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),dr=e=>e==null?`...`:new Intl.NumberFormat(`pt-PT`).format(e),fr=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),pr=e=>`/marcas/${fr(e)}.${e===`Jaecoo`?`svg`:`png`}`,mr=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),hr=new Set([`aiways`,`aston-martin`,`bentley`]),gr=()=>window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;function _r(e,{duration:t=1200}={}){let[n,r]=(0,w.useState)(null),i=(0,w.useRef)(null),a=(0,w.useRef)(!1);return(0,w.useEffect)(()=>{let n=i.current,o=Number(e);if(!n||e==null||Number.isNaN(o))return;if(gr()){r(o);return}let s=new IntersectionObserver(([e])=>{if(!e.isIntersecting||a.current)return;a.current=!0;let n=performance.now(),i=e=>{let a=Math.min((e-n)/t,1),s=1-(1-a)**3;r(Math.round(o*s)),a<1&&requestAnimationFrame(i)};requestAnimationFrame(i)},{threshold:.4});return s.observe(n),()=>s.disconnect()},[e,t]),[n,i]}function vr({label:e,value:t}){let[n,r]=_r(t);return(0,$.jsxs)(`div`,{className:`lp-trust-item`,ref:r,children:[(0,$.jsx)(`strong`,{children:dr(n)}),(0,$.jsx)(`span`,{children:e})]})}function yr(){let r=e(),i=l(),{signed:o}=t(),p=(0,w.useRef)(null),T=(0,w.useRef)(null),E=(0,w.useRef)(!1),D=o?`/publicar`:`/login`,te=o?void 0:m(i,`/`),[O,k]=(0,w.useState)({carro:[],imovel:[]}),[A,ne]=(0,w.useState)(null),[j,re]=(0,w.useState)(!0),[ie,ae]=(0,w.useState)(!1),[M,oe]=(0,w.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``});(0,w.useEffect)(()=>{let e=p.current;if(!e||gr())return;let t=c.context(()=>{c.from(`.lp-hero-brand, .lp-kicker, #lp-hero-title, .lp-hero-copy, .lp-hero-proof span, .lp-actions`,{y:22,opacity:0,duration:.78,stagger:.075,ease:`power3.out`}),c.from(`.lp-trust-item`,{y:16,opacity:0,duration:.6,delay:.25,stagger:.06,ease:`power2.out`}),e.querySelectorAll(`.lp-quick-card, .lp-promo-link, .lp-pro-strip, .lp-brands-section, .lp-shortcut-group, .lp-example-column, .lp-cv-card`).forEach(e=>{c.from(e,{y:26,opacity:0,duration:.65,ease:`power2.out`,scrollTrigger:{trigger:e,start:`top 88%`,once:!0}})})},e);return()=>{t.revert()}},[]),(0,w.useEffect)(()=>{T.current&&d(T.current,{translateX:M.tipo===`carro`?`0%`:`100%`,duration:260,ease:`outCubic`})},[M.tipo]),(0,w.useEffect)(()=>{let e=()=>{E.current||f()?.external===!0&&(E.current=!0,C(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||f()?.external===!0)&&e()};return window.addEventListener(u,t),()=>window.removeEventListener(u,t)},[]),(0,w.useEffect)(()=>{let e=!0;return a.get(`/anuncios/resumo-publico`).then(({data:t})=>{e&&ne(t||null)}).catch(()=>{e&&ne(null)}),()=>{e=!1}},[]);let se=M.tipo===`carro`&&M.marca?x(M.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],N=Number(A?.profissionais||0)>0,ce=[{label:`Anúncios ativos`,value:A?.totalAnuncios},{label:`Carros`,value:A?.carros},{label:`Imóveis`,value:A?.imoveis},N?{label:`Profissionais`,value:A?.profissionais}:null].filter(e=>e&&Number(e.value||0)>0),P=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},F=(e,t)=>{oe(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},le=e=>{e.preventDefault();let{tipo:t,marca:n,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=M,l={distrito:s,precoMax:c,...t===`carro`?{marca:n,modelo:i,combustivel:a}:{tipologia:o}};C(`search_start`,{vertical:t}),r(P(t,l))};(0,w.useEffect)(()=>{let e=!0;return(async()=>{try{let{data:t}=await a.get(`/anuncios/em-alta/semana`);if(!e)return;k({carro:(t?.carro||[]).slice(0,2),imovel:(t?.imovel||[]).slice(0,2)}),ae(!1)}catch{e&&(k({carro:[],imovel:[]}),ae(!0))}finally{e&&re(!1)}})(),()=>{e=!1}},[]);let I=(e,t)=>{try{localStorage.setItem(`@App:contexto_visual`,t===`/carros`?`carro`:`imovel`)}catch{}r(_(e))},ue=j||O.carro.length>0||O.imovel.length>0,de=(e,t)=>{let n=e.tipo===`carro`,r=h(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,$.jsxs)(`button`,{type:`button`,className:`lp-example-card ${n?`drive`:`estate`}`,onClick:()=>I(e,t),children:[(0,$.jsxs)(`span`,{className:`lp-example-img`,children:[r?(0,$.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,$.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`}),(0,$.jsxs)(`span`,{className:`lp-example-weekly`,children:[`Destaque `,n?`Carros`:`Imóveis`]})]}),(0,$.jsxs)(`span`,{className:`lp-example-body`,children:[(0,$.jsx)(`span`,{className:`lp-example-price`,children:ur(e.preco)}),(0,$.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,$.jsx)(`span`,{className:`lp-example-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,$.jsx)(`span`,{className:`lp-example-location`,children:e.localizacao?.cidade||`Portugal`})]})]},e._id)},L=(e,t)=>j?(0,$.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,$.jsx)(`span`,{className:`lp-state-loader`,"aria-hidden":`true`}),(0,$.jsx)(`strong`,{children:`A selecionar os anúncios com mais interesse.`}),(0,$.jsx)(`span`,{children:`Os destaques refletem as visitas dos últimos sete dias.`})]}):(0,$.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,$.jsx)(`strong`,{children:ie?`A seleção semanal está a ser atualizada.`:`Descobre todas as oportunidades em ${e}.`}),(0,$.jsx)(`span`,{children:ie?`Entretanto, encontra todos os anúncios na pesquisa completa.`:`Explora a pesquisa e encontra o que combina contigo.`}),(0,$.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>r(t),children:[`Explorar `,e]})]});return(0,$.jsxs)(`div`,{className:`lp-root`,ref:p,children:[(0,$.jsx)(y,{title:`Noxvelia | Plataforma de carros e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.`,path:`/`,jsonLd:[v,g]}),(0,$.jsx)(`style`,{children:`
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
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .lp-trust-item {
          min-height: 70px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          color: #365158;
          border: 1px solid rgba(8, 33, 38, 0.1);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.66);
          font-size: 12.5px;
          font-weight: 750;
          backdrop-filter: none;
        }

        .lp-trust-item strong {
          color: var(--lp-ink);
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0;
        }

        .lp-trust-item span {
          color: #5b7076;
          font-size: 10.5px;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
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
          position: relative;
          display: inline-grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          min-width: 204px;
          overflow: hidden;
          padding: 5px;
          border: 1px solid rgba(8, 33, 38, 0.09);
          border-radius: 13px;
          background: #f4f7f4;
        }

        .lp-type-indicator {
          position: absolute;
          top: 5px;
          bottom: 5px;
          left: 5px;
          width: calc(50% - 5px);
          border-radius: 9px;
          background: var(--lp-drive);
          box-shadow: inset 0 0 0 1px rgba(8, 33, 38, 0.08);
          pointer-events: none;
          z-index: 0;
        }

        .lp-type-tab {
          position: relative;
          z-index: 1;
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
          transition: color 0.18s ease;
        }

        .lp-type-tab.active {
          color: #042326;
          background: transparent;
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

        .lp-brand-scroll {
          overflow: hidden;
          padding: 4px 0 14px;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
        }

        .lp-brand-track {
          width: max-content;
          display: flex;
          gap: 10px;
          animation: lp-brand-loop 52s linear infinite !important;
          will-change: transform;
        }

        .lp-brand-scroll:hover .lp-brand-track,
        .lp-brand-track:focus-within {
          animation-play-state: paused !important;
        }

        @keyframes lp-brand-loop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .lp-brand-card {
          --lp-brand-card-bg: rgba(255, 255, 255, 0.7);
          scroll-snap-align: start;
          flex: 0 0 158px;
          min-width: 0;
          min-height: 94px;
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
          transform: translateY(-3px);
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

          .lp-brand-card {
            flex-basis: 132px;
            min-height: 82px;
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

        /* Restrained professional polish */
        .lp-hero-card {
          isolation: isolate !important;
          overflow: hidden !important;
          border-radius: 24px !important;
          border-color: rgba(240, 223, 187, 0.18) !important;
          box-shadow: 0 42px 110px -70px rgba(0, 0, 0, 0.7) !important;
        }

        .lp-hero-content {
          z-index: 4 !important;
          background: linear-gradient(90deg, rgba(7, 19, 38, 0.96) 0%, rgba(7, 19, 38, 0.82) 58%, rgba(7, 19, 38, 0.06) 100%) !important;
        }

        .lp-hero-media img {
          filter: saturate(1.04) contrast(1.04) !important;
          transform-origin: center center !important;
          transition: transform 900ms cubic-bezier(.2,.8,.2,1), filter 900ms cubic-bezier(.2,.8,.2,1) !important;
        }

        .lp-hero-card:hover .lp-hero-media img {
          transform: scale(1.025) !important;
          filter: saturate(1.08) contrast(1.06) !important;
        }

        .lp-hero-proof {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 8px !important;
          margin-top: 22px !important;
        }

        .lp-hero-proof span {
          min-height: 34px !important;
          display: inline-flex !important;
          align-items: center !important;
          padding: 0 11px !important;
          color: #fffaf0 !important;
          border: 1px solid rgba(240, 223, 187, 0.26) !important;
          border-radius: 8px !important;
          background: rgba(255, 250, 240, 0.08) !important;
          font-size: 12px !important;
          font-weight: 780 !important;
          letter-spacing: 0 !important;
          backdrop-filter: blur(10px) !important;
        }

        .lp-btn,
        .lp-search-submit,
        .lp-promo-overlay,
        .lp-chip,
        .lp-column-link,
        .lp-brand-card,
        .lp-promo-link,
        .lp-shortcut-group,
        .lp-example-card,
        .lp-cv-card {
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease, box-shadow 220ms ease, color 220ms ease, filter 220ms ease !important;
        }

        .lp-btn:hover,
        .lp-search-submit:hover,
        .lp-promo-overlay:hover,
        .lp-chip:hover,
        .lp-column-link:hover {
          transform: translateY(-1px) !important;
        }

        .lp-promo-link:hover,
        .lp-shortcut-group:hover,
        .lp-brand-card:hover,
        .lp-example-card:hover,
        .lp-cv-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 24px 70px -58px rgba(7, 19, 38, 0.72) !important;
        }

        .lp-promo-link:hover .lp-promo-media img,
        .lp-example-card:hover .lp-example-img img {
          transform: scale(1.035) !important;
        }

        .lp-promo-media img,
        .lp-example-img img {
          transition: transform 700ms cubic-bezier(.2,.8,.2,1) !important;
        }

        .lp-quick-card {
          border-radius: 14px !important;
          box-shadow: 0 28px 80px -68px rgba(7, 19, 38, 0.82) !important;
        }

        .lp-quick-card:focus-within {
          border-color: rgba(217, 196, 156, 0.82) !important;
          box-shadow: 0 30px 86px -68px rgba(7, 19, 38, 0.82), 0 0 0 4px rgba(217, 196, 156, 0.16) !important;
        }

        .lp-field select:hover,
        .lp-field input:hover {
          border-color: rgba(217, 196, 156, 0.72) !important;
        }

        .lp-type-indicator {
          background: linear-gradient(135deg, #f0dfbb 0%, #d9c49c 100%) !important;
          box-shadow: inset 0 0 0 1px rgba(7, 19, 38, 0.12), 0 10px 22px -18px rgba(7, 19, 38, 0.7) !important;
        }

        .lp-brand-track {
          animation-duration: 68s !important;
        }

        .lp-brand-card {
          background: linear-gradient(180deg, rgba(255, 250, 240, 0.98), rgba(244, 239, 229, 0.92)) !important;
        }

        .lp-brand-card:hover {
          border-color: rgba(217, 196, 156, 0.78) !important;
          background: #fffaf0 !important;
        }

        .dark .lp-hero-proof span {
          color: #fffaf0 !important;
          background: rgba(240, 223, 187, 0.1) !important;
          border-color: rgba(240, 223, 187, 0.22) !important;
        }

        @media (max-width: 700px) {
          .lp-hero-proof {
            gap: 7px !important;
          }

          .lp-hero-proof span {
            min-height: 31px !important;
            font-size: 11.5px !important;
          }
        }
      `}),(0,$.jsx)(nr,{}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsxs)(`div`,{className:`lp-hero-card`,children:[(0,$.jsxs)(`div`,{className:`lp-hero-content`,children:[(0,$.jsxs)(`div`,{className:`lp-hero-brand`,"aria-label":`NOXVELIA`,children:[(0,$.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,$.jsx)(`span`,{children:`NOXVELIA`})]}),(0,$.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisa em Portugal`}),(0,$.jsx)(`h1`,{id:`lp-hero-title`,children:`Pesquisa carros e imóveis em Portugal com informação clara.`}),(0,$.jsx)(`p`,{className:`lp-hero-copy`,children:`Encontra anúncios com fotografias, preço, localização e contacto direto. Tudo organizado para comparares melhor antes de visitar ou ligar.`}),(0,$.jsxs)(`div`,{className:`lp-hero-proof`,"aria-label":`Vantagens da Noxvelia`,children:[(0,$.jsx)(`span`,{children:`Fotografias grandes`}),(0,$.jsx)(`span`,{children:`Preço visível`}),(0,$.jsx)(`span`,{children:`Contacto direto`})]}),(0,$.jsxs)(`div`,{className:`lp-actions`,children:[(0,$.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:`#pesquisa`,children:`Pesquisar anúncios`}),(0,$.jsx)(n,{className:`lp-text-link`,to:D,state:te,children:`Publicar grátis`})]})]}),(0,$.jsxs)(`div`,{className:`lp-hero-media`,children:[(0,$.jsx)(`img`,{src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`,onError:e=>{e.currentTarget.src=`/social/noxvelia-estate-photo-premium.webp`}}),(0,$.jsx)(`div`,{className:`lp-hero-photo-label`,"aria-hidden":`true`,children:`Carros / Imóveis`})]})]}),ce.length>0&&(0,$.jsx)(`div`,{className:`lp-trust-bar`,"aria-label":`Resumo da plataforma`,children:ce.map(e=>(0,$.jsx)(vr,{label:e.label,value:e.value},e.label))})]})}),(0,$.jsx)(`section`,{className:`lp-quick-section`,id:`pesquisa`,"aria-labelledby":`lp-quick-title`,children:(0,$.jsx)(`div`,{className:`lp-shell`,children:(0,$.jsxs)(`form`,{className:`lp-quick-card`,onSubmit:le,children:[(0,$.jsxs)(`div`,{className:`lp-quick-top`,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Começa por aqui`}),(0,$.jsx)(`h2`,{className:`lp-quick-title`,id:`lp-quick-title`,children:`Encontra anúncios em segundos.`}),(0,$.jsx)(`p`,{className:`lp-quick-copy`,children:`Escolhe tipo, localização e preço. Depois podes afinar pelos filtros da pesquisa.`})]}),(0,$.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,$.jsx)(`span`,{className:`lp-type-indicator`,ref:T,"aria-hidden":`true`}),(0,$.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":M.tipo===`carro`,className:`lp-type-tab ${M.tipo===`carro`?`active`:``}`,onClick:()=>F(`tipo`,`carro`),children:`Carros`}),(0,$.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":M.tipo===`imovel`,className:`lp-type-tab ${M.tipo===`imovel`?`active`:``}`,onClick:()=>F(`tipo`,`imovel`),children:`Imóveis`})]})]}),(0,$.jsxs)(`div`,{className:`lp-search-form`,children:[M.tipo===`carro`?(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,$.jsxs)(`select`,{id:`lp-marca`,value:M.marca,onChange:e=>F(`marca`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Todas as marcas`}),S.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,$.jsxs)(`select`,{id:`lp-modelo`,value:M.modelo,onChange:e=>F(`modelo`,e.target.value),disabled:!M.marca,children:[(0,$.jsx)(`option`,{value:``,children:M.marca?`Todos os modelos`:`Escolhe a marca`}),se.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,$.jsxs)(`select`,{id:`lp-combustivel`,value:M.combustivel,onChange:e=>F(`combustivel`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Todos`}),or.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,$.jsxs)(`select`,{id:`lp-tipologia`,value:M.tipologia,onChange:e=>F(`tipologia`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Todas`}),cr.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,$.jsxs)(`select`,{id:`lp-estate-preco`,value:M.precoMax,onChange:e=>F(`precoMax`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Qualquer preço`}),lr.slice(2).map(e=>(0,$.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,$.jsxs)(`select`,{id:`lp-distrito`,value:M.distrito,onChange:e=>F(`distrito`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Portugal inteiro`}),ee.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),M.tipo===`carro`&&(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,$.jsxs)(`select`,{id:`lp-preco`,value:M.precoMax,onChange:e=>F(`precoMax`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Qualquer preço`}),lr.slice(0,2).map(e=>(0,$.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,$.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]})]})})}),(0,$.jsx)(`section`,{className:`lp-promo-section`,id:`anunciar`,"aria-label":`Anunciar grátis na Noxvelia`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,$.jsxs)(n,{className:`lp-promo-link drive`,to:`/carros`,children:[(0,$.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,$.jsx)(`span`,{className:`lp-promo-label`,children:`Carros`}),(0,$.jsx)(`strong`,{className:`lp-promo-title`,children:`Automóveis com informação clara.`}),(0,$.jsx)(`span`,{className:`lp-promo-text`,children:`Vê marca, modelo, quilómetros, combustível, preço e localização num formato fácil de comparar.`}),(0,$.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar carro`})]}),(0,$.jsx)(`span`,{className:`lp-promo-media`,children:(0,$.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`,loading:`lazy`})})]}),(0,$.jsxs)(n,{className:`lp-promo-link estate`,to:`/imoveis`,children:[(0,$.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,$.jsx)(`span`,{className:`lp-promo-label`,children:`Imóveis`}),(0,$.jsx)(`strong`,{className:`lp-promo-title`,children:`Imóveis fáceis de comparar.`}),(0,$.jsx)(`span`,{className:`lp-promo-text`,children:`Compara fotografias, localização, tipologia, áreas e preço antes de marcar visita.`}),(0,$.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar imóvel`})]}),(0,$.jsx)(`span`,{className:`lp-promo-media`,children:(0,$.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`,loading:`lazy`})})]})]}),(0,$.jsxs)(n,{className:`lp-pro-strip`,to:N?`/profissionais`:D,state:N?void 0:te,children:[(0,$.jsx)(`span`,{children:N?`Profissionais`:`Anunciar`}),(0,$.jsx)(`strong`,{children:N?`Stands, mediadores e vendedores com anúncios disponíveis.`:`Publica o teu carro ou imóvel e recebe contactos diretamente.`}),(0,$.jsx)(`em`,{children:N?`Ver profissionais`:`Publicar anúncio`})]})]})}),(0,$.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsx)(`div`,{className:`lp-section-head`,children:(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Marcas`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:`Marcas auto prontas a pesquisar.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Escolhe a marca e segue diretamente para resultados filtrados.`})]})}),(0,$.jsx)(`div`,{className:`lp-brand-scroll`,"aria-label":`Lista de marcas automóveis`,children:(0,$.jsx)(`div`,{className:`lp-brand-track`,children:[...S,...S].map((e,t)=>{let r=fr(e),i=t>=S.length;return(0,$.jsxs)(n,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":i?void 0:`Ver anúncios ${e}`,"aria-hidden":i||void 0,tabIndex:i?-1:void 0,children:[(0,$.jsxs)(`span`,{className:`lp-brand-mark lp-brand-mark-${r} ${hr.has(r)?`lp-brand-mark-clean`:``}`,children:[(0,$.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:mr(e)}),(0,$.jsx)(`img`,{src:pr(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,$.jsx)(`span`,{className:`lp-brand-name`,children:e})]},`${e}-${t}`)})})})]})}),(0,$.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsx)(`div`,{className:`lp-section-head`,children:(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa guiada`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Caminhos rápidos para começar.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Entradas diretas para marcas, modelos, distritos e tipologias comuns.`})]})}),(0,$.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:ir.map(e=>(0,$.jsx)(n,{className:`lp-chip`,to:P(`carro`,{marca:e}),children:e},e))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group wide`,children:[(0,$.jsx)(`h3`,{children:`Modelos rápidos`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:ar.map(([e,t])=>(0,$.jsxs)(n,{className:`lp-chip`,to:P(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Combustíveis`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:or.map(e=>(0,$.jsx)(n,{className:`lp-chip`,to:P(`carro`,{combustivel:e}),children:e},e))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Distritos`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:sr.map(e=>(0,$.jsx)(n,{className:`lp-chip`,to:P(`carro`,{distrito:e}),children:e},e))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Imóveis`}),(0,$.jsxs)(`div`,{className:`lp-chip-list`,children:[cr.map(e=>(0,$.jsx)(n,{className:`lp-chip`,to:P(`imovel`,{tipologia:e}),children:e},e)),sr.slice(0,4).map(e=>(0,$.jsx)(n,{className:`lp-chip`,to:P(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),ue&&(0,$.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsx)(`div`,{className:`lp-section-head`,children:(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Seleção atual`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`Destaques para explorar.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Anúncios recentes de carros e imóveis, prontos a explorar.`})]})}),(0,$.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(j||O.carro.length>0)&&(0,$.jsxs)(`div`,{className:`lp-example-column drive`,children:[(0,$.jsxs)(`div`,{className:`lp-column-top`,children:[(0,$.jsx)(`div`,{className:`lp-column-heading`,children:(0,$.jsx)(`h3`,{className:`lp-column-title`,children:`Carros`})}),(0,$.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>r(`/carros`),children:`Ver carros`})]}),(0,$.jsx)(`div`,{className:`lp-example-list`,children:O.carro.length>0?O.carro.map(e=>de(e,`/carros`)):L(`carros`,`/carros`)})]}),(j||O.imovel.length>0)&&(0,$.jsxs)(`div`,{className:`lp-example-column estate`,children:[(0,$.jsxs)(`div`,{className:`lp-column-top`,children:[(0,$.jsx)(`div`,{className:`lp-column-heading`,children:(0,$.jsx)(`h3`,{className:`lp-column-title`,children:`Imóveis`})}),(0,$.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>r(`/imoveis`),children:`Ver imóveis`})]}),(0,$.jsx)(`div`,{className:`lp-example-list`,children:O.imovel.length>0?O.imovel.map(e=>de(e,`/imoveis`)):L(`imóveis`,`/imoveis`)})]})]})]})}),(0,$.jsx)(b,{placement:`landing_between_highlights`,minHeight:96}),(0,$.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,$.jsx)(`div`,{className:`lp-shell`,children:(0,$.jsxs)(`div`,{className:`lp-cv-card`,children:[(0,$.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro antes da visita.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Consulta histórico, quilometragem e registos disponíveis.`}),(0,$.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,$.jsx)(`li`,{children:`Histórico antes do contacto`}),(0,$.jsx)(`li`,{children:`Mais segurança na compra`})]}),(0,$.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:rr,target:`_blank`,rel:`noopener noreferrer`,children:`Verificar um veículo`})]}),(0,$.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,$.jsx)(`span`,{children:`Histórico automóvel com`}),(0,$.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,$.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,$.jsx)(`small`,{children:`Código`}),(0,$.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})})]}),(0,$.jsx)(s,{})]})}export{yr as default};