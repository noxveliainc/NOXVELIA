import{C as e,D as t,N as n,O as r,S as i,d as a,h as o,j as s,l as c,u as l,w as u,x as d,y as f}from"./index-BKyG15H3.js";import{r as p}from"./images-io1S19E8.js";import{a as m,i as h,o as g}from"./seo-BZnLo9Qd.js";import{t as _}from"./Seo-Dk3s0xPJ.js";import{t as v}from"./GoogleAdSlot-B9RqfGpj.js";import{n as y,t as b}from"./marcasModelos-CRXT0e16.js";import{t as x}from"./localizacoes-9zKfqZul.js";import{t as S}from"./funnelAnalytics-DgcsP7_w.js";var C=typeof window<`u`,w=C?window:null,T=C?document:null,E={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},D={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},O={NONE:0,AUTO:1,FORCE:2},k={replace:0,none:1,blend:2},A=Symbol(),j=Symbol(),M=Symbol(),N=Symbol(),P=Symbol(),F=1e-11,ee=0xe8d4a51000,I=1e3,L=[],te=(()=>{let e=new Map;return e.set(`x`,`translateX`),e.set(`y`,`translateY`),e.set(`z`,`translateZ`),e})(),R=[`perspective`,`translateX`,`translateY`,`translateZ`,`rotate`,`rotateX`,`rotateY`,`rotateZ`,`scale`,`scaleX`,`scaleY`,`scaleZ`,`skew`,`skewX`,`skewY`],ne=R.reduce((e,t)=>({...e,[t]:t+`(`}),{}),re=()=>{},ie=e=>e,ae=/\)\s*[-.\d]/,oe=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,se=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,ce=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,le=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,ue=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,de=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,fe=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,pe=/([a-z])([A-Z])/g,me=/(\*=|\+=|-=)/,he=/var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/,ge={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:240,loop:0,reversed:!1,alternate:!1,autoplay:!0,persist:!1,duration:I,delay:0,loopDelay:0,ease:`out(2)`,composition:k.replace,modifier:ie,onBegin:re,onBeforeUpdate:re,onUpdate:re,onLoop:re,onPause:re,onComplete:re,onRender:re},_e={current:null,root:T},ve={defaults:ge,precision:4,timeScale:1,tickThreshold:200,editor:null},ye={version:`4.5.0`,engine:null};C&&(w.AnimeJS||=[],w.AnimeJS.push(ye));var be=e=>e.replace(pe,`$1-$2`).toLowerCase(),xe=(e,t)=>e.indexOf(t)===0,Se=Date.now,Ce=Array.isArray,we=e=>e&&e.constructor===Object,Te=e=>typeof e==`number`&&!isNaN(e),Ee=e=>typeof e==`string`,De=e=>typeof e==`function`,z=e=>e===void 0,Oe=e=>z(e)||e===null,ke=e=>C&&e instanceof SVGElement,Ae=e=>oe.test(e),je=e=>xe(e,`rgb`),Me=e=>xe(e,`hsl`),Ne=e=>Ae(e)||(je(e)||Me(e))&&(e[e.length-1]===`)`||!ae.test(e)),Pe=e=>!ve.defaults.hasOwnProperty(e),Fe=[`opacity`,`rotate`,`overflow`,`color`],Ie=(e,t)=>{if(Fe.includes(t))return!1;if(e.getAttribute(t)||t in e){if(t===`scale`){let t=e.parentNode;return t&&t.tagName===`filter`}return!0}},Le=e=>Ee(e)?parseFloat(e):e,Re=Math.pow,ze=Math.sqrt,Be=Math.sin,Ve=Math.cos,He=Math.abs,Ue=Math.floor,We=Math.asin,Ge=Math.PI,Ke=Math.round,qe=(e,t,n)=>e<t?t:e>n?n:e,B=(e,t)=>{if(t<0)return e;if(!t)return Ke(e);let n=10**t;return Ke(e*n)/n},Je=(e,t,n)=>n===1?t:n===0?e:e+(t-e)*n,Ye=e=>e===1/0?ee:e===-1/0?-ee:e,Xe=e=>e<=1e-11?F:Ye(B(e,11)),Ze=e=>Ce(e)?[...e]:e,Qe=(e,t)=>{let n={...e};for(let r in t){let i=e[r];n[r]=z(i)?t[r]:i}return n},$e=(e,t,n,r=`_prev`,i=`_next`)=>{let a=e._head,o=i;for(n&&(a=e._tail,o=r);a;){let e=a[o];t(a),a=e}},et=(e,t,n=`_prev`,r=`_next`)=>{let i=t[n],a=t[r];i?i[r]=a:e._head=a,a?a[n]=i:e._tail=i,t[n]=null,t[r]=null},tt=(e,t,n,r=`_prev`,i=`_next`)=>{let a=e._tail;for(;a&&n&&n(a,t);)a=a[r];let o=a?a[i]:e._head;a?a[i]=t:e._head=t,o?o[r]=t:e._tail=t,t[r]=a,t[i]=o},nt=(e,t,n)=>{let r=e.style.transform;if(r){let i=e[N],a=0,o=r.length,s;for(;a<o;){for(;a<o&&r.charCodeAt(a)===32;)a++;if(a>=o)break;let e=a;for(;a<o&&r.charCodeAt(a)!==40;)a++;if(a>=o)break;let t=r.substring(e,a),n=1,c=a+1,l=-1,u=-1;for(a++;a<o&&n>0;){let e=r.charCodeAt(a);e===40?n++:e===41?n--:e===44&&n===1&&(l===-1?l=a:u===-1&&(u=a)),a++}let d=a-1;t===`translate`||t===`translate3d`?(l===-1?i.translateX=r.substring(c,d).trim():(i.translateX=r.substring(c,l).trim(),u===-1?i.translateY=r.substring(l+1,d).trim():(i.translateY=r.substring(l+1,u).trim(),i.translateZ=r.substring(u+1,d).trim())),s=r.substring(c,d)):t===`scale`||t===`scale3d`?l===-1?i.scale=r.substring(c,d).trim():(i.scaleX=r.substring(c,l).trim(),u===-1?i.scaleY=r.substring(l+1,d).trim():(i.scaleY=r.substring(l+1,u).trim(),i.scaleZ=r.substring(u+1,d).trim())):i[t]=r.substring(c,d)}if(t===`translate3d`&&s)return n&&(n[t]=s),s;let c=i[t];if(!z(c))return n&&(n[t]=c),c}return t===`translate3d`?`0px, 0px, 0px`:t===`rotate3d`?`0, 0, 0, 0deg`:xe(t,`scale`)?`1`:xe(t,`rotate`)||xe(t,`skew`)?`0deg`:`0px`},rt=e=>{let t=``;for(let n=0,r=R.length;n<r;n++){let r=R[n],i=e[r];if(i!==void 0){if(r===`translateX`){let r=e.translateY;if(r!==void 0){let a=e.translateZ;a===void 0?(t+=`translate(${i},${r}) `,n+=1):(t+=`translate3d(${i},${r},${a}) `,n+=2);continue}}if(r===`scaleX`&&e.scale===void 0){let r=e.scaleY;if(r!==void 0){let a=e.scaleZ;a===void 0?(t+=`scale(${i},${r}) `,n+=1):(t+=`scale3d(${i},${r},${a}) `,n+=2);continue}}t+=`${ne[r]}${i}) `}r===`rotateZ`&&e.rotate3d!==void 0&&(t+=`rotate3d(${e.rotate3d}) `)}return e.matrix!==void 0&&(t+=`matrix(${e.matrix}) `),e.matrix3d!==void 0&&(t+=`matrix3d(${e.matrix3d}) `),t},it=[];function at(e,t){if(!e)return null;let n=it.length;outer:for(let r=0;r<n;r++){let n=it[r];if(n.detect&&!n.detect(e))continue;let i=n.targetAdapters;for(let n=0,r=i.length;n<r;n++){let r=i[n];if(r.detect(e)){let n=r.props[t];if(n&&(!n.gate||n.gate(e)))return n;break outer}}}for(let r=0;r<n;r++){let n=it[r];if(n.detect&&!n.detect(e))continue;let i=n.propertyResolvers;for(let n=0,r=i.length;n<r;n++){let r=i[n](e,t);if(r)return r}}return null}var ot=e=>{let t=se.exec(e)||ce.exec(e),n=z(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],n]},st=e=>{let t=e.length,n=t===4||t===5;return[+(`0x`+e[1]+e[n?1:2]),+(`0x`+e[n?2:3]+e[n?2:4]),+(`0x`+e[n?3:5]+e[n?3:6]),t===5||t===9?+((`0x`+e[n?4:7]+e[n?4:8])/255).toFixed(3):1]},ct=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),lt=e=>{let t=le.exec(e)||ue.exec(e),n=t[1]/360,r=t[2]/100,i=t[3]/100,a=z(t[4])?1:+t[4],o,s,c;if(r===0)o=s=c=i;else{let e=i<.5?i*(1+r):i+r-i*r,t=2*i-e;o=B(ct(t,e,n+1/3)*255,0),s=B(ct(t,e,n)*255,0),c=B(ct(t,e,n-1/3)*255,0)}return[o,s,c,a]},ut=e=>je(e)?ot(e):Ae(e)?st(e):Me(e)?lt(e):[0,0,0,1],dt=(e,t)=>z(e)?t:e,ft=(e,t)=>{let n=e.match(he),r=t[j]?t:document.documentElement,i=getComputedStyle(r)?.getPropertyValue(n[1]);return(!i||i.trim()===``)&&n[2]&&(i=n[2].trim()),i||0},pt=(e,t,n,r,i,a)=>{if(De(e)){if(!i){let i=e(t,n,r,a);return isNaN(+i)?i||0:+i}let o=()=>{let i=e(t,n,r,a);return isNaN(+i)?i||0:+i};return i.func=o,o()}if(Ee(e)&&xe(e,`var(`)){if(!i)return ft(e,t);let n=()=>ft(e,t);return i.func=n,n()}return e},mt=(e,t)=>e[j]?e[M]&&Ie(e,t)?E.ATTRIBUTE:R.includes(t)||te.get(t)?E.TRANSFORM:xe(t,`--`)?E.CSS_VAR:t in e.style?E.CSS:t in e?E.OBJECT:E.ATTRIBUTE:E.OBJECT,ht=(e,t,n)=>{let r=e.style[t];r&&n&&(n[t]=r);let i=r||getComputedStyle(e[P]||e).getPropertyValue(t);return i===`auto`?`0`:i},gt=(e,t,n,r)=>{let i=z(n)?mt(e,t):n,a=at(e,t);if(a){let n=a.get(e);return n&&r&&(r[t]=n),n??0}if(i===E.OBJECT){let n=e[t];return n&&r&&(r[t]=n),n||0}if(i===E.ATTRIBUTE){let n=e.getAttribute(t);return n&&r&&(r[t]=n),n}return i===E.TRANSFORM?nt(e,t,r):i===E.CSS_VAR?ht(e,t,r).trimStart():ht(e,t,r)},_t=(e,t,n)=>n===`-`?e-t:n===`+`?e+t:e*t,vt=()=>({t:D.NUMBER,n:0,u:null,o:null,d:null,s:null}),yt=(e,t)=>{if(t.t=D.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!e)return t;let n=+e;if(!isNaN(n))return t.n=n,t;let r=e;r[1]===`=`&&(t.o=r[0],r=r.slice(2));let i=!r.includes(` `)&&fe.exec(r);if(i)return t.t=D.UNIT,t.n=+i[1],t.u=i[2],t;if(t.o)return t.n=+r,t;if(Ne(r))return t.t=D.COLOR,t.d=ut(r),t;{let e=r.match(de);return t.t=D.COMPLEX,t.d=e?e.map(Number):[],t.s=r.split(de)||[],t}},bt=(e,t)=>(t.t=e._valueType,t.n=e._toNumber,t.u=e._unit,t.o=null,t.d=Ze(e._toNumbers),t.s=Ze(e._strings),t),xt=vt(),St=(e,t,n)=>{let r=e._modifier,i=e._fromNumbers,a=e._toNumbers,o=e._strings,s=o[0];for(let c=0,l=a.length;c<l;c++){let l=r(B(Je(i[c],a[c],t),n)),u=o[c+1];s+=`${u?l+u:l}`,e._numbers[c]=l}return s},Ct=(e,t,n,r,i)=>{let a=e.parent,o=e.duration,s=e.completed,c=e.iterationDuration,l=e.iterationCount,u=e._currentIteration,d=e._loopDelay,f=e._reversed,p=e._alternate,m=e._hasChildren,h=e._delay,g=e._currentTime,_=h+c,v=t-h,y=qe(g,-h,o),b=qe(v,-h,o),x=v-g,S=b>0,C=b>=o,w=o<=F,T=i===O.FORCE,A=0,j=v,M=0;if(l>1){let t=c+(C?0:d),n=~~(b/t);e._currentIteration=qe(n,0,l),C&&e._currentIteration--,A=e._currentIteration%2,j=b-n*t||0}let P=f^(p&&A),ee=e._ease,I=C?P?0:o:P?c-j:j;ee&&(I=c*ee(I/c)||0);let L=(a?a.backwards:v<g)?!P:!!P;if(e._currentTime=v,e._iterationTime=I,e.backwards=L,S&&!e.began?(e.began=!0,!n&&!(a&&(L||!a.began))&&e.onBegin(e)):v<=0&&(e.began=!1),!n&&!m&&S&&e._currentIteration!==u&&e.onLoop(e),T||i===O.AUTO&&(t>=(a&&h>0?0:h)&&t<=_||t<=h&&y>h||t>=_&&y!==o)||I>=_&&y!==o||I<=h&&y>0&&!C||t<=y&&y===o&&s||C&&!s&&w){if(S&&(e.computeDeltaTime(y),n||e.onBeforeUpdate(e)),!m){let t=T||(L?x*-1:x)>=ve.tickThreshold,i=B(e._offset+(a?a._offset:0)+h+I,12),o=e._head,s,c,l,u,d=0;for(;o;){let e=o._composition,n=o._currentTime,a=o._changeDuration,f=o._absoluteStartTime+o._changeDuration,p=o._nextRep,m=o._prevRep,h=e!==k.none,g=m?m._absoluteStartTime+m._changeDuration:0,_=m&&m.parent!==o.parent,v=!p||p._isOverridden?f:p.parent===o.parent?f+p._delay:p._absoluteStartTime<p._absoluteUpdateStartTime?p._absoluteStartTime:p._absoluteUpdateStartTime;if((t||(n!==a||i<=v||m&&!_&&(!p||p.parent!==o.parent))&&(n!==0||i>=o._absoluteStartTime||_&&!o._hasFromValue&&!m._isOverridden&&i>=g||p&&!p._isOverridden&&p.parent===o.parent&&p._currentTime!==0&&I<p._startTime))&&(!m||_||I>=o._startTime)&&(!h||!o._isOverridden&&(!o._isOverlapped||i<=f)&&(!p||p._isOverridden||i<=v)&&(!m||m._isOverridden||(_?i>=o._absoluteStartTime||!o._hasFromValue&&i>=g:i>=g+o._delay)))){let t=o._currentTime=qe(I-o._startTime,0,a),n=o._ease(t/o._updateDuration),i=o._modifier,f=o._valueType,p=o._tweenType,m=p===E.OBJECT,g=f===D.NUMBER,_=g&&m||n===0||n===1?-1:ve.precision,v,y;if(g)v=y=i(B(Je(o._fromNumber,o._toNumber,n),_));else if(f===D.UNIT)y=i(B(Je(o._fromNumber,o._toNumber,n),_)),v=`${y}${o._unit}`;else if(f===D.COLOR){let e=o._numbers,t=o._fromNumbers,a=o._toNumbers,s=1-n,c=t[0],l=t[1],u=t[2],d=a[0],f=a[1],p=a[2];e[0]=i(Math.sqrt(c*c*s+d*d*n)),e[1]=i(Math.sqrt(l*l*s+f*f*n)),e[2]=i(Math.sqrt(u*u*s+p*p*n)),e[3]=i(Je(t[3],a[3],n)),(!o._setter||r)&&(v=`rgba(${B(e[0],0)},${B(e[1],0)},${B(e[2],0)},${e[3]})`)}else f===D.COMPLEX&&(v=St(o,n,_));if(h&&(o._number=y),!r&&e!==k.blend){let e=o.property;s=o.target,o._setter?o._setter(s,y,o):m?s[e]=v:p===E.ATTRIBUTE?s.setAttribute(e,v):(c=s.style,p===E.TRANSFORM?(s!==l&&(l=s,u=s[N]),u[e]=v,d=1):p===E.CSS?c[e]=v:p===E.CSS_VAR&&c.setProperty(e,v)),S&&(M=1)}else o._value=v}else n&&m&&!_&&I<o._startTime&&(o._currentTime=0);d&&o._renderTransforms&&(c.transform=rt(u),d=0),o=o._next}!n&&M&&e.onRender(e)}!n&&S&&e.onUpdate(e)}return a&&w?!n&&(a.began&&!L&&v>0&&!s||L&&v<=1e-11&&s)&&(e.onComplete(e),e.completed=!L):S&&C?l===1/0?e._startTime+=e.duration:e._currentIteration>=l-1&&(e.paused=!0,!s&&!m&&(e.completed=!0,!n&&!(a&&(L||!a.began))&&(e.onComplete(e),e._resolve(e)))):e.completed=!1,M},wt=(e,t,n,r,i)=>{let a=e._currentIteration;if(Ct(e,t,n,r,i),e._hasChildren){let o=e,s=o.backwards,c=r?t:o._iterationTime,l=Se(),u=0,d=!0;if(!r&&o._currentIteration!==a){let e=o.iterationDuration;$e(o,t=>{if(!s)!t.completed&&!t.backwards&&t._currentTime<t.iterationDuration&&Ct(t,e,n,1,O.FORCE),t.began=!1,t.completed=!1;else{let r=t.duration,i=t._offset+t._delay,a=i+r;!n&&r<=1e-11&&(!i||a===e)&&t.onComplete(t)}}),n||o.onLoop(o)}$e(o,e=>{let t=B((c-e._offset)*e._speed,12);if(s&&t>e._delay+e.duration)return;let a=e._fps<o._fps?e.requestTick(l):i;u+=Ct(e,t,n,r,a),!e.completed&&d&&(d=!1)},s),!n&&u&&o.onRender(o),(d||s)&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,n||(o.onComplete(o),o._resolve(o))))}},Tt={},Et=(e,t,n)=>{if(n===E.TRANSFORM)return te.get(e)||e;if(n===E.CSS||n===E.ATTRIBUTE&&ke(t)&&e in t.style){let t=Tt[e];if(t)return t;{let t=e&&be(e);return Tt[e]=t,t}}else return e},Dt=(e,t=!1)=>{if(e._hasChildren)$e(e,e=>Dt(e,t),!0);else{let n=e;n.pause(),$e(n,e=>{let r=e.property,i=e.target,a=e._tweenType,o=e._inlineValue,s=Oe(o)||o===``;if(e._setter){if(!t&&!s){if(yt(o,xt),xt.d){let t=xt.d,n=e._numbers;for(let e=0,r=t.length;e<r;e++)n[e]=t[e]}else e._number=xt.n;e._setter(e.target,e._number,e)}}else if(a===E.OBJECT)!t&&!s&&(i[r]=o);else if(i[j])if(a===E.ATTRIBUTE)t||(s?i.removeAttribute(r):i.setAttribute(r,o));else{let t=i.style;if(a===E.TRANSFORM){let n=i[N];s?delete n[r]:n[r]=o,e._renderTransforms&&(Object.keys(n).length?t.transform=rt(n):t.removeProperty(`transform`))}else s?t.removeProperty(be(r)):t[r]=o}i[j]&&n._tail===e&&n.targets.forEach(e=>{e.getAttribute&&e.getAttribute(`style`)===``&&e.removeAttribute(`style`)})})}return e},Ot=class{constructor(e=0){this.deltaTime=0,this._currentTime=e,this._lastTickTime=e,this._startTime=e,this._lastTime=e,this._frameDuration=I/240,this._fps=240,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(e){let t=+e,n=t<1e-11?F:t,r=I/n;n>ge.frameRate&&(ge.frameRate=n),this._fps=n,this._frameDuration=r}get speed(){return this._speed}set speed(e){let t=+e;this._speed=t<1e-11?F:t}requestTick(e){let t=this._frameDuration,n=e-this._lastTickTime,r=t*.25;return n+(r<4?r:4)<t?O.NONE:(this._lastTickTime=n>=t?e-n%t:e,O.AUTO)}computeDeltaTime(e){let t=e-this._lastTime;return this.deltaTime=t,this._lastTime=e,t}},kt={animation:null,update:re},At=e=>{let t=kt.animation;return t||(t={duration:F,computeDeltaTime:re,_offset:0,_delay:0,_head:null,_tail:null},kt.animation=t,kt.update=()=>{e.forEach(e=>{for(let t in e){let n=e[t],r=n._head;if(r){let e=r._valueType,t=e===D.COMPLEX||e===D.COLOR?Ze(r._fromNumbers):null,i=r._fromNumber,a=n._tail;for(;a&&a!==r;){if(t)for(let e=0,n=a._numbers.length;e<n;e++)t[e]+=a._numbers[e];else i+=a._number;a=a._prevAdd}r._toNumber=i,r._toNumbers=t}}}),Ct(t,1,1,0,O.FORCE)}),t},jt=C?requestAnimationFrame:setImmediate,Mt=C?cancelAnimationFrame:clearImmediate,Nt=class extends Ot{constructor(e){super(e),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=ge,this.paused=!0,this.reqId=0}update(){let e=this._currentTime=Se();if(this.requestTick(e)){this.computeDeltaTime(e);let t=this._speed,n=this._fps,r=this._head;for(;r;){let i=r._next;r.paused?(et(this,r),this._hasChildren=!!this._tail,r._running=!1,r.completed&&!r._cancelled&&r.cancel()):wt(r,(e-r._startTime)*r._speed*t,0,0,r._fps<n?r.requestTick(e):O.AUTO),r=i}kt.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&(this.requestTick(Se()),this.reqId=jt(Ft)),this}pause(){if(this.reqId)return this.paused=!0,It()}resume(){if(this.paused)return this.paused=!1,$e(this,e=>e.resetTime()),this.wake()}get speed(){return this._speed*(ve.timeScale===1?1:I)}set speed(e){let t=e*ve.timeScale;this._speed!==t&&(this._speed=t,$e(this,e=>e.speed=e._speed))}get timeUnit(){return ve.timeScale===1?`ms`:`s`}set timeUnit(e){let t=.001,n=e===`s`,r=n?t:1;if(ve.timeScale!==r){ve.timeScale=r,ve.tickThreshold=200*r;let e=n?t:I;this.defaults.duration*=e,this._speed*=e}}get precision(){return ve.precision}set precision(e){ve.precision=e}},Pt=(()=>{let e=new Nt(Se());return C&&(ye.engine=e,T.addEventListener(`visibilitychange`,()=>{e.pauseOnDocumentHidden&&(T.hidden?e.pause():e.resume())})),e})(),Ft=()=>{Pt._head?(Pt.reqId=jt(Ft),Pt.update()):Pt.reqId=0},It=()=>(Mt(Pt.reqId),Pt.reqId=0,Pt),Lt={_rep:new WeakMap,_add:new Map},Rt=(e,t,n=`_rep`)=>{let r=Lt[n],i=r.get(e);return i||(i={},r.set(e,i)),i[t]?i[t]:i[t]={_head:null,_tail:null}},zt=(e,t)=>e._isOverridden||e._absoluteStartTime>t._absoluteStartTime,Bt=e=>{e._isOverlapped=1,e._isOverridden=1,e._changeDuration=F,e._currentTime=F},Vt=(e,t)=>{let n=e._composition;if(n===k.replace){let n=e._absoluteStartTime;tt(t,e,zt,`_prevRep`,`_nextRep`);let r=e._prevRep;if(r){let t=r.parent,i=r._absoluteEndTime;if(e.parent.id!==t.id&&t.iterationCount>1&&i+(t.duration-t.iterationDuration)>n){Bt(r);let e=r._prevRep;for(;e&&e.parent.id===t.id;)Bt(e),e=e._prevRep}let a=e._absoluteUpdateStartTime;if(i>a){let e=r._startTime,t=B(a-(i-(e+r._updateDuration))-e,12);r._changeDuration=t,r._currentTime=t,r._isOverlapped=1,t<1e-11&&Bt(r)}let o=e.parent.parent;if(!o||o!==t.parent){let e=!0;if($e(t,t=>{t._isOverlapped||(e=!1)}),e){let e=t.parent;if(e){let n=!0;$e(e,e=>{e!==t&&$e(e,e=>{e._isOverlapped||(n=!1)})}),n&&e.cancel()}else t.cancel()}}}}else if(n===k.blend){let t=Rt(e.target,e.property,`_add`),n=At(Lt._add),r=t._head;r||(r={...e},r._composition=k.replace,r._updateDuration=F,r._startTime=0,r._numbers=Ze(e._fromNumbers),r._number=0,r._next=null,r._prev=null,tt(t,r),tt(n,r));let i=e._toNumber;if(e._fromNumber=r._fromNumber-i,e._toNumber=0,e._numbers=Ze(e._fromNumbers),e._number=0,r._fromNumber=i,e._toNumbers.length){let t=Ze(e._toNumbers);t.forEach((t,n)=>{e._fromNumbers[n]=r._fromNumbers[n]-t,e._toNumbers[n]=0}),r._fromNumbers=t}tt(t,e,null,`_prevAdd`,`_nextAdd`)}return e},Ht=e=>{let t=e._composition;if(t!==k.none){let n=e.target,r=e.property,i=Lt._rep.get(n)[r];if(et(i,e,`_prevRep`,`_nextRep`),t===k.blend){let t=Lt._add,i=t.get(n);if(!i)return;let a=i[r],o=kt.animation;et(a,e,`_prevAdd`,`_nextAdd`);let s=a._head;if(s&&s===a._tail){et(a,s,`_prevAdd`,`_nextAdd`),et(o,s);let e=!0;for(let t in i)if(i[t]._head){e=!1;break}e&&t.delete(n)}}}return e},Ut=e=>(e.paused=!0,e.began=!1,e.completed=!1,e),Wt=e=>e._cancelled?(e._hasChildren?$e(e,Wt):$e(e,e=>{e._composition!==k.none&&Vt(e,Rt(e.target,e.property))}),e._cancelled=0,e):e,Gt=0,Kt=(e,t)=>e._priority>t._priority,qt=class extends Ot{constructor(e={},t=null,n=0){super(0),++Gt;let{id:r,delay:i,duration:a,reversed:o,alternate:s,loop:c,loopDelay:l,autoplay:u,frameRate:d,playbackRate:f,priority:p,onComplete:m,onLoop:h,onPause:g,onBegin:_,onBeforeUpdate:v,onUpdate:y}=e;_e.current&&_e.current.register(this);let b=t?0:Pt._lastTickTime,x=t?t.defaults:ve.defaults,S=De(i)||z(i)?x.delay:+i,C=De(a)||z(a)?1/0:+a,w=dt(c,x.loop),T=dt(l,x.loopDelay),E=w===!0||w===1/0||w<0?1/0:w+1,D=0;t?D=n:(Pt.reqId||Pt.requestTick(Se()),D=(Pt._lastTickTime-Pt._startTime)*ve.timeScale),this.id=z(r)?Gt:r,this.parent=t,this.duration=Ye((C+T)*E-T)||1e-11,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=_||x.onBegin,this.onBeforeUpdate=v||x.onBeforeUpdate,this.onUpdate=y||x.onUpdate,this.onLoop=h||x.onLoop,this.onPause=g||x.onPause,this.onComplete=m||x.onComplete,this.iterationDuration=C,this.iterationCount=E,this._autoplay=!t&&dt(u,x.autoplay),this._offset=D,this._delay=S,this._loopDelay=T,this._iterationTime=0,this._currentIteration=0,this._resolve=re,this._running=!1,this._reversed=+dt(o,x.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=dt(s,x.alternate),this._prev=null,this._next=null,this._lastTickTime=b,this._startTime=b,this._lastTime=b,this._fps=dt(d,x.frameRate),this._speed=dt(f,x.playbackRate),this._priority=+dt(p,1)}get cancelled(){return!!this._cancelled}set cancelled(e){e?this.cancel():this.reset(!0).play()}get currentTime(){return qe(B(this._currentTime,ve.precision),-this._delay,this.duration)}set currentTime(e){let t=this.paused;this.pause().seek(+e),t||this.resume()}get iterationCurrentTime(){return qe(B(this._iterationTime,ve.precision),0,this.iterationDuration)}set iterationCurrentTime(e){this.currentTime=this.iterationDuration*this._currentIteration+e}get progress(){return qe(B(this._currentTime/this.duration,10),0,1)}set progress(e){this.currentTime=this.duration*e}get iterationProgress(){return qe(B(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(e){let t=this.iterationDuration;this.currentTime=t*this._currentIteration+t*e}get currentIteration(){return this._currentIteration}set currentIteration(e){this.currentTime=this.iterationDuration*qe(+e,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(e){e?this.reverse():this.play()}get speed(){return super.speed}set speed(e){super.speed=e,this.resetTime()}reset(e=!1){return Wt(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,wt(this,0,1,~~e,O.FORCE),Ut(this),this._hasChildren&&$e(this,Ut),this}init(e=!1){this.fps=this._fps,this.speed=this._speed,!e&&this._hasChildren&&wt(this,this.duration,1,~~e,O.FORCE),this.reset(e);let t=this._autoplay;return t===!0?this.resume():t&&!z(t.linked)&&t.link(this),this}resetTime(){let e=1/(this._speed*Pt._speed);return this._startTime=Se()-(this._currentTime+this._delay)*e,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=1e-11&&!this._hasChildren?wt(this,F,0,0,O.FORCE):(this._running||=(tt(Pt,this,Kt),Pt._hasChildren=!0,!0),this.resetTime(),this._startTime-=12,Pt.wake()),this):this}restart(){return this.reset().resume()}seek(e,t=0,n=0){Wt(this),this.completed=!1;let r=this.paused;return this.paused=!0,wt(this,e+this._delay,~~t,~~n,O.AUTO),r?this:this.resume()}alternate(){let e=this._reversed,t=this.iterationCount,n=this.iterationDuration,r=t===1/0?Ue(ee/n):t;return this._reversed=+(this._alternate&&!(r%2)?e:!e),t===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(n*r-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?$e(this,e=>e.cancel(),!0):$e(this,Ht),this._cancelled=1,this.pause()}stretch(e){let t=this.duration,n=Xe(e);if(t===n)return this;let r=e/t,i=e<=F;return this.duration=i?F:n,this.iterationDuration=i?F:Xe(this.iterationDuration*r),this._offset*=r,this._delay*=r,this._loopDelay*=r,this}revert(){wt(this,0,1,0,O.AUTO);let e=this._autoplay;return e&&e.linked&&e.linked===this&&e.revert(),this.cancel()}complete(e=0){return this.seek(this.duration,e).cancel()}then(e=re){let t=this.then,n=()=>{this.then=null,e(this),this.then=t,this._resolve=re};return new Promise(e=>(this._resolve=()=>e(n()),this.completed&&this._resolve(),this))}};function Jt(e){let t=Ee(e)?_e.root.querySelectorAll(e):e;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function Yt(e){if(Oe(e))return[];if(!C)return Ce(e)&&e.flat(1/0)||[e];if(Ce(e)){let t=e.flat(1/0),n=[];for(let e=0,r=t.length;e<r;e++){let r=t[e];if(!Oe(r)){let e=Jt(r);if(e)for(let t=0,r=e.length;t<r;t++){let r=e[t];if(!Oe(r)){let e=!1;for(let t=0,i=n.length;t<i;t++)if(n[t]===r){e=!0;break}e||n.push(r)}}else{let e=!1;for(let t=0,i=n.length;t<i;t++)if(n[t]===r){e=!0;break}e||n.push(r)}}}return n}let t=Jt(e);return t?Array.from(t):[e]}function Xt(e){let t=Yt(e),n=t.length;for(let e=0;e<n;e++){let n=t[e];if(!n[A]){n[A]=!0;let e=ke(n);(n.nodeType||e)&&(n[j]=!0,n[M]=e,n[N]={})}}return t}var Zt={deg:1,rad:180/Ge,turn:360},Qt={},$t=(e,t,n,r=!1)=>{let i=t.u,a=t.n;if(t.t===D.UNIT&&i===n)return t;let o=a+i+n,s=Qt[o];if(!z(s)&&!r)t.n=s;else{let r;if(i in Zt)r=a*Zt[i]/Zt[n];else{let t=e.cloneNode(),o=e.parentNode,s=o&&o!==T?o:T.body;s.appendChild(t);let c=t.style;c.width=100+i;let l=t.offsetWidth||100;c.width=100+n;let u=l/(t.offsetWidth||100);s.removeChild(t),r=u*a}t.n=r,Qt[o]=r}return t.t,D.UNIT,t.u=n,t},en=e=>e,tn=(e=1.68)=>t=>Re(t,+e),nn={in:e=>t=>e(t),out:e=>t=>1-e(1-t),inOut:e=>t=>t<.5?e(t*2)/2:1-e(t*-2+2)/2,outIn:e=>t=>t<.5?(1-e(1-t*2))/2:(e(t*2-1)+1)/2},rn=Ge/2,an=Ge*2,on={"":tn,Quad:tn(2),Cubic:tn(3),Quart:tn(4),Quint:tn(5),Sine:e=>1-Ve(e*rn),Circ:e=>1-ze(1-e*e),Expo:e=>e?Re(2,10*e-10):0,Bounce:e=>{let t,n=4;for(;e<((t=Re(2,--n))-1)/11;);return 1/Re(4,3-n)-7.5625*Re((t*3-2)/22-e,2)},Back:(e=1.7)=>t=>(+e+1)*t*t*t-+e*t*t,Elastic:(e=1,t=.3)=>{let n=qe(+e,1,10),r=qe(+t,F,2),i=r/an*We(1/n),a=an/r;return e=>e===0||e===1?e:-n*Re(2,-10*(1-e))*Be((1-e-i)*a)}},sn=(()=>{let e={linear:en,none:en};for(let t in nn)for(let n in on){let r=on[n],i=nn[t];e[t+n]=n===``||n===`Back`||n===`Elastic`?(e,t)=>i(r(e,t)):i(r)}return e})(),cn={linear:en,none:en},ln=e=>{if(cn[e])return cn[e];if(e.indexOf(`(`)<=-1){let t=nn[e]||e.includes(`Back`)||e.includes(`Elastic`)?sn[e]():sn[e];return t?cn[e]=t:en}else{let t=e.slice(0,-1).split(`(`),n=sn[t[0]];return n?cn[e]=n(...t[1].split(`,`)):en}},un=[`steps(`,`irregular(`,`linear(`,`cubicBezier(`],dn=e=>{if(Ee(e)){for(let t=0,n=un.length;t<n;t++)if(xe(e,un[t]))return console.warn(`String syntax for \`ease: "${e}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${e}\``),en}return De(e)?e:Ee(e)?ln(e):en},V=vt(),H=vt(),fn={},pn={func:null},mn={func:null},hn=[null],gn=[null,null],_n={to:null},vn=0,yn=0,bn,xn,Sn=(e,t)=>{let n={};if(Ce(e)){let t=[].concat(...e.map(e=>Object.keys(e))).filter(Pe);for(let r=0,i=t.length;r<i;r++){let i=t[r];n[i]=e.map(e=>{let t={};for(let n in e){let r=e[n];Pe(n)?n===i&&(t.to=r):t[n]=r}return t})}}else{let r=dt(t.duration,ve.defaults.duration);Object.keys(e).map(t=>({o:parseFloat(t)/100,p:e[t]})).sort((e,t)=>e.o-t.o).forEach(e=>{let t=e.o,i=e.p;for(let e in i)if(Pe(e)){let a=n[e];a||=n[e]=[];let o=t*r,s=a.length,c=a[s-1],l={to:i[e]},u=0;for(let e=0;e<s;e++)u+=a[e].duration;s===1&&(l.from=c.to),i.ease&&(l.ease=i.ease),l.duration=o-(s?u:0),a.push(l)}return e});for(let e in n){let t=n[e],r;for(let e=0,n=t.length;e<n;e++){let n=t[e],i=n.ease;n.ease=r||void 0,r=i}t[0].duration||t.shift()}}return n},Cn=class extends qt{constructor(e,t,n,r,i=!1,a=0,o){super(t,n,r),this._head,this._tail,++yn;let s=Xt(e),c=s.length,l=t.keyframes,u=l?Qe(Sn(l,t),t):t,{id:d,delay:f,duration:p,ease:m,playbackEase:h,modifier:g,composition:_,onRender:v}=u,y=n?n.defaults:ve.defaults,b=dt(m,y.ease),x=dt(h,y.playbackEase),S=x?dn(x):null,C=!z(b.ease),w=C?b.ease:dt(m,S?`linear`:y.ease),T=C?b.settlingDuration:dt(p,y.duration),O=dt(f,y.delay),A=g||y.modifier,j=z(_)&&c>=1e3?k.none:z(_)?y.composition:_,M=this._offset+(n?n._offset:0);C&&(b.parent=this);let N=NaN,P=NaN,ee=0,I=0;for(let e=0;e<c;e++){let t=s[e],r=a||e,c=o||s,l=NaN,d=NaN;for(let e in u)if(Pe(e)){let a=mt(t,e),o=at(t,e),s=Et(e,t,a),f=u[e],p=Ce(f);if(i&&!p&&(gn[0]=f,gn[1]=f,f=gn),p){let e=f.length,t=!we(f[0]);e===2&&t?(_n.to=f,hn[0]=_n,bn=hn):e>2&&t?(bn=[],f.forEach((e,t)=>{t?t===1?(gn[1]=e,bn.push(gn)):bn.push(e):gn[0]=e})):bn=f}else hn[0]=f,bn=hn;let m=null,h=null,g=NaN,_=0,v=0;for(let e=bn.length;v<e;v++){let i=bn[v];we(i)?xn=i:(_n.to=i,xn=_n),pn.func=null,mn.func=null;let l=pt(dt(xn.composition,j),t,r,c,null,null),u=Te(l)?l:k[l];!m&&u!==k.none&&(m=Rt(t,s));let d=m?m._tail:null,f=n&&d&&d.parent.parent===n?d:h,p=pt(xn.to,t,r,c,pn,f),y;we(p)&&!z(p.to)?(xn=p,y=p.to):y=p;let b=pt(xn.from,t,r,c,mn,f),x=xn.ease||w,S=pt(x,t,r,c,null,f),C=De(S)||Ee(S)?S:x,E=!z(C)&&!z(C.ease),N=E?C.ease:C,P=E?C.settlingDuration:pt(dt(xn.duration,e>1?pt(T,t,r,c,null,f)/e:T),t,r,c,null,f),F=pt(dt(xn.delay,v?0:O),t,r,c,null,f),te=xn.modifier||A,R=!z(b),ne=!z(y),re=Ce(y),ie=re||R&&ne,ae=h?_:0,oe=h?_+F:F,se=B(M+oe,12),ce=B(M+ae,12);!I&&(R||re)&&(I=1);let le=h;if(u!==k.none){let e=m._head;for(;e&&e._absoluteStartTime<=se;)if(e._isOverridden||(le=e),e=e._nextRep,e&&e._absoluteStartTime>=se)for(;e;)Bt(e),e=e._nextRep}if(ie){yt(re?pt(y[0],t,r,c,mn,f):b,V),yt(re?pt(y[1],t,r,c,pn,f):y,H);let e=gt(t,s,a,fn);V.t===D.NUMBER&&(le?le._valueType===D.UNIT&&(V.t=D.UNIT,V.u=le._unit):(yt(e,xt),xt.t===D.UNIT&&(V.t=D.UNIT,V.u=xt.u)))}else ne?yt(y,H):h?bt(h,H):yt(n&&le&&le.parent.parent===n?le._value:gt(t,s,a,fn),H),R?yt(b,V):h?bt(h,V):yt(n&&le&&le.parent.parent===n?le._value:gt(t,s,a,fn),V);if(V.o&&(V.n=_t(le?le._toNumber:yt(gt(t,s,a,fn),xt).n,V.n,V.o)),H.o&&(H.n=_t(V.n,H.n,H.o)),V.t!==H.t){if(V.t===D.COMPLEX||H.t===D.COMPLEX){let e=V.t===D.COMPLEX?V:H,t=V.t===D.COMPLEX?H:V;t.t=D.COMPLEX,t.s=Ze(e.s),t.d=e.d.map(()=>t.n)}else if(V.t===D.UNIT||H.t===D.UNIT){let e=V.t===D.UNIT?V:H,t=V.t===D.UNIT?H:V;t.t=D.UNIT,t.u=e.u}else if(V.t===D.COLOR||H.t===D.COLOR){let e=V.t===D.COLOR?V:H,t=V.t===D.COLOR?H:V;t.t=D.COLOR,t.d=e.d.map(()=>0)}}if(V.u!==H.u){let e=H.u?V:H;e=$t(t,e,H.u?H.u:V.u,!1)}if(H.d&&V.d&&H.d.length!==V.d.length){let e=V.d.length>H.d.length?V:H,t=e===V?H:V;t.d=e.d.map((e,n)=>z(t.d[n])?0:t.d[n]),t.s=Ze(e.s)}let ue=B(+P||1e-11,12),de=fn[s];Oe(de)||(fn[s]=null);let fe=o?o.set:null;_=B(oe+ue,12);let pe=V.d,me=H.d,he=H.s,ge={parent:this,id:vn++,property:s,target:t,_value:null,_toFunc:pn.func,_fromFunc:mn.func,_ease:dn(N),_fromNumbers:pe?Ze(pe):L,_toNumbers:me?Ze(me):L,_strings:he?Ze(he):L,_fromNumber:V.n,_toNumber:H.n,_numbers:pe?Ze(pe):L,_number:V.n,_unit:H.u,_modifier:te,_currentTime:0,_startTime:oe,_delay:+F,_updateDuration:ue,_changeDuration:ue,_absoluteStartTime:se,_absoluteUpdateStartTime:ce,_absoluteEndTime:B(M+_,12),_hasFromValue:R||re?1:0,_tweenType:a,_setter:fe,_valueType:H.t,_composition:u,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_inlineValue:de,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};u!==k.none&&Vt(ge,m);let _e=ge._valueType;if(_e===D.COMPLEX)ge._value=St(ge,1,-1);else if(_e===D.UNIT)ge._value=`${te(ge._toNumber)}${ge._unit}`;else if(_e===D.COLOR){let e=H.d;ge._value=`rgba(${B(e[0],0)},${B(e[1],0)},${B(e[2],0)},${e[3]})`}else ge._value=te(ge._toNumber);isNaN(g)&&(g=ge._startTime),h=ge,ee++,tt(this,ge)}(isNaN(P)||g<P)&&(P=g),(isNaN(N)||_>N)&&(N=_),a===E.TRANSFORM&&(l=ee-v,d=ee)}if(!isNaN(l)){let e=0;$e(this,t=>{e>=l&&e<d&&(t._renderTransforms=1,t._composition===k.blend&&$e(kt.animation,e=>{e.id===t.id&&(e._renderTransforms=1)})),e++})}}c||console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`),P?($e(this,e=>{e._startTime-e._delay||(e._delay-=P),e._startTime-=P}),N-=P):P=0,N||(N=F,this.iterationCount=0),this.targets=s,this.id=z(d)?yn:d,this.duration=N===1e-11?F:Ye((N+this._loopDelay)*this.iterationCount-this._loopDelay)||1e-11,this.onRender=v||y.onRender,this._ease=S,this._delay=P,this.iterationDuration=N,!this._autoplay&&I&&this.onRender(this)}stretch(e){let t=this.duration;if(t===Xe(e))return this;let n=e/t;return $e(this,e=>{e._updateDuration=Xe(e._updateDuration*n),e._changeDuration=Xe(e._changeDuration*n),e._currentTime*=n,e._delay*=n,e._startTime*=n,e._absoluteStartTime*=n,e._absoluteUpdateStartTime*=n,e._absoluteEndTime*=n}),super.stretch(e)}refresh(){return $e(this,e=>{let t=e._toFunc,n=e._fromFunc;(t||n)&&(n?(yt(n(),V),V.u!==e._unit&&e.target[j]&&$t(e.target,V,e._unit,!0),e._fromNumbers=Ze(V.d),e._fromNumber=V.n):t&&(yt(gt(e.target,e.property,e._tweenType),xt),e._fromNumbers=Ze(xt.d),e._fromNumber=xt.n),t&&(yt(t(),H),e._toNumbers=Ze(H.d),e._strings=Ze(H.s),e._toNumber=H.o?_t(e._fromNumber,H.n,H.o):H.n))}),this.duration===1e-11&&this.restart(),this}revert(){return super.revert(),Dt(this)}then(e){return super.then(e)}},wn=(e,t)=>ve.editor?ve.editor.addAnimation(e,t):new Cn(e,t,null,0,!1).init(),Tn=(e,t)=>{if(xe(t,`<`)){let n=t[1]===`<`,r=e._tail,i=r?r._offset+r._delay:0;return n?i:i+r.duration}},En=(e,t)=>{let n=e.iterationDuration;if(n===1e-11&&(n=0),z(t))return n;if(Te(+t))return+t;let r=t,i=e?e.labels:null,a=!Oe(i),o=Tn(e,r),s=!z(o),c=me.exec(r);if(c){let e=c[0],t=r.split(e),l=a&&t[0]?i[t[0]]:n;return _t(s?o:a?l:n,+t[1],e[0])}else return s?o:a?z(i[r])?n:i[r]:n},Dn=(e=0,t=1,n=0)=>{let r=10**n;return Math.floor((Math.random()*(t-e+1/r)+e)*r)/r},On=0,kn=(e,t=0,n=1,r=0)=>{let i=e===void 0?On++:e;return(e=t,a=n,o=r)=>{i+=1831565813,i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61);let s=10**o;return Math.floor((((i^i>>>14)>>>0)/4294967296*(a-e+1/s)+e)*s)/s}},An=(e,t=Dn)=>{let n=e.length,r,i;for(;n;)i=t(0,--n),r=e[n],e[n]=e[i],e[i]=r;return e},jn=(e,t={})=>{let n=[],r=0,i,a=null,o=t.from,s=t.reversed,c=t.ease,l=!z(c),u=l&&!z(c.ease)?c.ease:l?dn(c):null,d=t.grid,f=d===!0,p=t.axis,m=t.total,h=z(o)||o===0||o===`first`,g=o===`center`,_=o===`last`,v=o===`random`,y=Ce(o),b=Ce(e),x=t.use,S=Le(b?e[0]:e),C=b?Le(e[1]):0,w=fe.exec((b?e[1]:e)+``),T=t.start||0+(b?S:0),E=t.seed,D=!z(E)&&E!==!1?kn(E===!0?0:E):Dn,O=t.jitter,k=!z(O),A=Ce(O),j=A?O[0]:O||0,M=A?O[1]:O||0,N=h?0:Te(o)?o:0;return(e,c,l,h,E)=>{let[O]=Xt(e),A=z(m)?l.length:m,P=z(x)?!1:De(x)?x(O,c,A):gt(O,x),F=Te(P)||Ee(P)&&Te(+P)?+P:c,ee=F>=0&&F<A?F:c;if(g&&(N=(A-1)/2),_&&(N=A-1),!n.length){if(f){let e=!0,t=!1,r=1/0,i=1/0,a=1/0,s=-1/0,c=-1/0,u=-1/0,d=[],f=[],m=[];for(let n=0;n<A;n++){let o=l[n],p=0,h=0,g=0,_=!1;if(o&&De(o.getBoundingClientRect)){let e=o.getBoundingClientRect();p=e.left+e.width/2,h=e.top+e.height/2,_=!0}else{let e=o;e&&Te(e.x)&&Te(e.y)&&(p=e.x,h=e.y,Te(e.z)&&(g=e.z,t=!0),_=!0)}if(!_){e=!1;break}d.push(p),f.push(h),m.push(g),p<r&&(r=p),h<i&&(i=h),g<a&&(a=g),p>s&&(s=p),h>c&&(c=h),g>u&&(u=g)}if(e){let e=d[0],l=f[0],h=m[0];y?(e=r+o[0]*(s-r),l=i+o[1]*(c-i),h=t?a+(o.length>=3?o[2]:.5)*(u-a):0):g?(e=(r+s)/2,l=(i+c)/2,h=(a+u)/2):_?(e=d[A-1],l=f[A-1],h=m[A-1]):Te(o)&&(e=d[o],l=f[o],h=m[o]);for(let r=0;r<A;r++){let i=e-d[r],a=l-f[r],o=h-m[r],s=ze(i*i+a*a+(t?o*o:0));p===`x`&&(s=-i),p===`y`&&(s=-a),p===`z`&&(s=-o),n.push(s)}let v=1/0;for(let e=0;e<A;e++){let t=He(n[e]);t>0&&t<v&&(v=t)}if(v>0&&v<1/0)for(let e=0;e<A;e++)n[e]=n[e]/v}else for(let e=0;e<A;e++)n.push(He(N-e))}else for(let e=0;e<A;e++)if(!d)n.push(He(N-e));else{let t=d.length,r=d[0]*d[1],i,a,s;y?(i=o[0]*(d[0]-1),a=o[1]*(d[1]-1),s=t===3?(o.length>=3?o[2]:.5)*(d[2]-1):0):g?(i=(d[0]-1)/2,a=(d[1]-1)/2,s=t===3?(d[2]-1)/2:0):(i=N%d[0],a=Ue(N/d[0])%d[1],s=t===3?Ue(N/r):0);let c=e%d[0],l=Ue(e/d[0])%d[1],u=t===3?Ue(e/r):0,f=i-c,m=a-l,h=s-u,_=ze(f*f+m*m+(t===3?h*h:0));p===`x`&&(_=-f),p===`y`&&(_=-m),p===`z`&&(_=-h),n.push(_)}r=n[0];for(let e=1;e<A;e++)n[e]>r&&(r=n[e]);if(u||s)for(let e=0;e<A;e++){let t=n[e];u&&(t=u(t/r)*r),s&&(t=p?-t:He(r-t)),n[e]=t}if(k){a=Array(A);for(let e=0;e<A;e++)a[e]=D(-1,1,4)}v&&(n=An(n,D))}let I=b?(C-S)/r:S;z(i)&&(i=E?En(E,z(t.start)?E.iterationDuration:T):T);let L=i+(I*B(n[ee],2)||0);if(k){let e=r?n[ee]/r:0,t=j+(M-j)*e;L+=a[ee]*t}return t.modifier&&(L=t.modifier(L)),w&&(L=`${L}${w[2]}`),L}},Mn=n(s(),1);function Nn(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function Pn(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var Fn={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},In={duration:.5,overwrite:!1,delay:0},Ln,Rn,U,zn=1e8,W=1/zn,Bn=Math.PI*2,Vn=Bn/4,Hn=0,Un=Math.sqrt,Wn=Math.cos,Gn=Math.sin,Kn=function(e){return typeof e==`string`},G=function(e){return typeof e==`function`},qn=function(e){return typeof e==`number`},Jn=function(e){return e===void 0},Yn=function(e){return typeof e==`object`},Xn=function(e){return e!==!1},Zn=function(){return typeof window<`u`},Qn=function(e){return G(e)||Kn(e)},$n=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},er=Array.isArray,tr=/random\([^)]+\)/g,nr=/,\s*/g,rr=/(?:-?\.?\d|\.)+/gi,ir=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ar=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,or=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,sr=/[+-]=-?[.\d]+/,cr=/[^,'"\[\]\s]+/gi,lr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,K,ur,dr,fr,pr={},mr={},hr,gr=function(e){return(mr=Kr(e,pr))&&co},_r=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},vr=function(e,t){return!t&&console.warn(e)},yr=function(e,t){return e&&(pr[e]=t)&&mr&&(mr[e]=t)||pr},br=function(){return 0},xr={suppressEvents:!0,isStart:!0,kill:!1},Sr={suppressEvents:!0,kill:!1},Cr={suppressEvents:!0},wr={},Tr=[],Er={},Dr,Or={},kr={},Ar=30,jr=[],Mr=``,Nr=function(e){var t=e[0],n,r;if(Yn(t)||G(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=jr.length;r--&&!jr[r].targetTest(t););n=jr[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new ya(e[r],n)))||e.splice(r,1);return e},Pr=function(e){return e._gsap||Nr(ki(e))[0]._gsap},Fr=function(e,t,n){return(n=e[t])&&G(n)?e[t]():Jn(n)&&e.getAttribute&&e.getAttribute(t)||n},Ir=function(e,t){return(e=e.split(`,`)).forEach(t)||e},q=function(e){return Math.round(e*1e5)/1e5||0},J=function(e){return Math.round(e*1e7)/1e7||0},Lr=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},Rr=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},zr=function(){var e=Tr.length,t=Tr.slice(0),n,r;for(Er={},Tr.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Br=function(e){return!!(e._initted||e._startAt||e.add)},Vr=function(e,t,n,r){Tr.length&&!Rn&&zr(),e.render(t,n,r||!!(Rn&&t<0&&Br(e))),Tr.length&&!Rn&&zr()},Hr=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(cr).length<2?t:Kn(e)?e.trim():e},Ur=function(e){return e},Wr=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Gr=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},Kr=function(e,t){for(var n in t)e[n]=t[n];return e},qr=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=Yn(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Jr=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Yr=function(e){var t=e.parent||K,n=e.keyframes?Gr(er(e.keyframes)):Wr;if(Xn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Xr=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Zr=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Qr=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},$r=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ei=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},ti=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ni=function(e,t,n,r){return e._startAt&&(Rn?e._startAt.revert(Sr):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},ri=function e(t){return!t||t._ts&&e(t.parent)},ii=function(e){return e._repeat?ai(e._tTime,e=e.duration()+e._rDelay)*e:0},ai=function(e,t){var n=Math.floor(e=J(e/t));return e&&n===e?n-1:n},oi=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},si=function(e){return e._end=J(e._start+(e._tDur/Math.abs(e._ts||e._rts||W)||0))},ci=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=J(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),si(e),n._dirty||ei(n,e)),e},li=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=oi(e.rawTime(),t),(!t._dur||Ci(0,t.totalDuration(),n)-t._tTime>W)&&t.render(n,!0)),ei(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-W}},ui=function(e,t,n,r){return t.parent&&$r(t),t._start=J((qn(n)?n:n||e!==K?bi(e,n,t):e._time)+t._delay),t._end=J(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Zr(e,t,`_first`,`_last`,e._sort?`_start`:0),mi(t)||(e._recent=t),r||li(e,t),e._ts<0&&ci(e,e._tTime),e},di=function(e,t){return(pr.ScrollTrigger||_r(`scrollTrigger`,t))&&pr.ScrollTrigger.create(t,e)},fi=function(e,t,n,r,i){if(Oa(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!Rn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Dr!==oa.frame)return Tr.push(e),e._lazy=[i,r],1},pi=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},mi=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},hi=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&pi(e)&&!(!e._initted&&mi(e))||(e._ts<0||e._dp._ts<0)&&!mi(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=Ci(0,e._tDur,t),l=ai(s,o),e._yoyo&&l&1&&(a=1-a),l!==ai(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||Rn||r||e._zTime===W||!t&&e._zTime){if(!e._initted&&fi(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?W:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&ni(e,t,n,!0),e._onUpdate&&!n&&Ki(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&Ki(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&$r(e,1),!n&&!Rn&&(Ki(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},gi=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},_i=function(e,t,n,r){var i=e._repeat,a=J(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:J(a*(i+1)+e._rDelay*i):a,o>0&&!r&&ci(e,e._tTime=e._tDur*o),e.parent&&si(e),n||ei(e.parent,e),e},vi=function(e){return e instanceof xa?ei(e):_i(e,e._dur)},yi={_start:0,endTime:br,totalDuration:br},bi=function e(t,n,r){var i=t.labels,a=t._recent||yi,o=t.duration()>=zn?a.endTime(!1):t._dur,s,c,l;return Kn(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(er(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},xi=function(e,t,n){var r=qn(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=Xn(s.vars.inherit)&&s.parent;a.immediateRender=Xn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new Z(t[0],a,t[i+1])},Si=function(e,t){return e||e===0?t(e):t},Ci=function(e,t,n){return n<e?e:n>t?t:n},wi=function(e,t){return!Kn(e)||!(t=lr.exec(e))?``:t[1]},Ti=function(e,t,n){return Si(n,function(n){return Ci(e,t,n)})},Ei=[].slice,Di=function(e,t){return e&&Yn(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&Yn(e[0]))&&!e.nodeType&&e!==ur},Oi=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return Kn(e)&&!t||Di(e,1)?(r=n).push.apply(r,ki(e)):n.push(e)})||n},ki=function(e,t,n){return U&&!t&&U.selector?U.selector(e):Kn(e)&&!n&&(dr||!sa())?Ei.call((t||fr).querySelectorAll(e),0):er(e)?Oi(e,n):Di(e)?Ei.call(e,0):e?[e]:[]},Ai=function(e){return e=ki(e)[0]||vr(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return ki(t,n.querySelectorAll?n:n===e?vr(`Invalid scope`)||fr.createElement(`div`):e)}},ji=function(e){return e.sort(function(){return .5-Math.random()})},Mi=function(e){if(G(e))return e;var t=Yn(e)?e:{each:e},n=ma(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return Kn(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,zn])[1],!S){for(b=-zn;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===zn?0:s?f*u/S-.5:r/S|0,b=0,x=zn,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):Un(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&ji(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=wi(t.amount||t.each)||0,n=n&&f<0?pa(n):n}return f=(p[e]-p.min)/p.max||0,J(p.b+(n?n(f):f)*p.v)+p.u}},Ni=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=J(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(qn(n)?0:wi(n))}},Pi=function(e,t){var n=er(e),r,i;return!n&&Yn(e)&&(r=n=e.radius||zn,e.values?(e=ki(e.values),(i=!qn(e[0]))&&(r*=r)):e=Ni(e.increment)),Si(t,n?G(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=zn,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||qn(t)?s:s+wi(t)}:Ni(e))},Fi=function(e,t,n,r){return Si(er(e)?!t:n===!0?!!(n=0):!r,function(){return er(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Ii=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},Li=function(e,t){return function(n){return e(parseFloat(n))+(t||wi(n))}},Ri=function(e,t,n){return Ui(e,t,0,1,n)},zi=function(e,t,n){return Si(n,function(n){return e[~~t(n)]})},Bi=function e(t,n,r){var i=n-t;return er(t)?zi(t,e(0,t.length),n):Si(r,function(e){return(i+(e-t)%i)%i+t})},Vi=function e(t,n,r){var i=n-t,a=i*2;return er(t)?zi(t,e(0,t.length-1),n):Si(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},Hi=function(e){return e.replace(tr,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(nr);return Fi(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},Ui=function(e,t,n,r,i){var a=t-e,o=r-n;return Si(i,function(t){return n+((t-e)/a*o||0)})},Wi=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=Kn(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(er(t)&&!er(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=Kr(er(t)?[]:{},t));if(!u){for(c in n)Ca.call(s,t,c,`get`,n[c]);a=function(e){return Ua(e,s)||(o?t.p:t)}}}return Si(r,a)},Gi=function(e,t,n){var r=e.labels,i=zn,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},Ki=function(e,t,n){var r=e.vars,i=r[t],a=U,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&Tr.length&&zr(),o&&(U=o),l=s?i.apply(c,s):i.call(c),U=a,l},qi=function(e){return $r(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Rn),e.progress()<1&&Ki(e,`onInterrupt`),e},Ji,Yi=[],Xi=function(e){if(e)if(e=!e.name&&e.default||e,Zn()||e.headless){var t=e.name,n=G(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:br,render:Ua,add:Ca,kill:Ga,modifier:Wa,rawVars:0},a={targetTest:0,get:0,getSetter:za,aliases:{},register:0};if(sa(),e!==r){if(Or[t])return;Wr(r,Wr(Jr(e,i),a)),Kr(r.prototype,Kr(i,Jr(e,a))),Or[r.prop=t]=r,e.targetTest&&(jr.push(r),wr[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}yr(t,r),e.register&&e.register(co,r,Ja)}else Yi.push(e)},Y=255,Zi={aqua:[0,Y,Y],lime:[0,Y,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Y],navy:[0,0,128],white:[Y,Y,Y],olive:[128,128,0],yellow:[Y,Y,0],orange:[Y,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Y,0,0],pink:[Y,192,203],cyan:[0,Y,Y],transparent:[Y,Y,Y,0]},Qi=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Y+.5|0},$i=function(e,t,n){var r=e?qn(e)?[e>>16,e>>8&Y,e&Y]:0:Zi.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Zi[e])r=Zi[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Y,r&Y,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Y,e&Y]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(rr),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Qi(s+1/3,i,a),r[1]=Qi(s,i,a),r[2]=Qi(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(ir),n&&r.length<4&&(r[3]=1),r}else r=e.match(rr)||Zi.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/Y,a=r[1]/Y,o=r[2]/Y,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},ea=function(e){var t=[],n=[],r=-1;return e.split(na).forEach(function(e){var i=e.match(ar)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},ta=function(e,t,n){var r=``,i=(e+r).match(na),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=$i(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=ea(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(na,`1`).split(ar),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(na),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},na=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Zi)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),ra=/hsl[a]?\(/,ia=function(e){var t=e.join(` `),n;if(na.lastIndex=0,na.test(t))return n=ra.test(t),e[1]=ta(e[1],n),e[0]=ta(e[0],n,ea(e[1])),!0},aa,oa=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){hr&&(!dr&&Zn()&&(ur=dr=window,fr=ur.document||{},pr.gsap=co,(ur.gsapVersions||=[]).push(co.version),gr(mr||ur.GreenSockGlobals||!ur.gsap&&ur||{}),Yi.forEach(Xi)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},aa=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),aa=0,l=br},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),sa(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),sa=function(){return!aa&&oa.wake()},X={},ca=/^[\d.\-M][\d.\-,\s]/,la=/["']/g,ua=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(la,``).trim():+c,r=s.substr(o+1).trim();return t},da=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},fa=function(e){var t=(e+``).split(`(`),n=X[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[ua(t[1])]:da(e).split(`,`).map(Hr)):X._CE&&ca.test(e)?X._CE(``,e):n},pa=function(e){return function(t){return 1-e(1-t)}},ma=function(e,t){return e&&(G(e)?e:X[e]||fa(e))||t},ha=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return Ir(e,function(e){for(var t in X[e]=pr[e]=i,X[a=e.toLowerCase()]=n,i)X[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=X[e+`.`+t]=i[t]}),i},ga=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},_a=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/Bn*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*Gn((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:ga(s);return a=Bn/a,c.config=function(n,r){return e(t,n,r)},c},va=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:ga(r);return i.config=function(n){return e(t,n)},i};Ir(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;ha(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),X.Linear.easeNone=X.none=X.Linear.easeIn,ha(`Elastic`,_a(`in`),_a(`out`),_a()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};ha(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),ha(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),ha(`Circ`,function(e){return-(Un(1-e*e)-1)}),ha(`Sine`,function(e){return e===1?1:-Wn(e*Vn)+1}),ha(`Back`,va(`in`),va(`out`),va()),X.SteppedEase=X.steps=pr.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-W;return function(e){return((r*Ci(0,a,e)|0)+i)*n}}},In.ease=X[`quad.out`],Ir(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return Mr+=e+`,`+e+`Params,`});var ya=function(e,t){this.id=Hn++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Fr,this.set=t?t.getSetter:za},ba=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,_i(this,+e.duration,1,1),this.data=e.data,U&&(this._ctx=U,U.data.push(this)),aa||oa.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,_i(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(sa(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(ci(this,e),!n._dp||n.parent||li(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&ui(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===W||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),Vr(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+ii(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+ii(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?ai(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-W?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?oi(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-W?0:this._rts,this.totalTime(Ci(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),si(this),ti(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(sa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==W&&(this._tTime-=W)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=J(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&ui(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Xn(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?oi(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=Cr);var t=Rn;return Rn=e,Br(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),Rn=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,vi(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,vi(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(bi(this,e),Xn(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Xn(t)),this._dur||(this._zTime=-W),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-W:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-W,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-W)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=G(e)?e:Ur,a=function(){var e=t.then;t.then=null,n&&n(),G(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){qi(this)},e}();Wr(ba.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-W,_prom:0,_ps:!1,_rts:1});var xa=function(e){Pn(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Xn(t.sortChildren),K&&ui(t.parent||K,Nn(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&di(Nn(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return xi(0,arguments,this),this},n.from=function(e,t,n){return xi(1,arguments,this),this},n.fromTo=function(e,t,n,r){return xi(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Yr(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new Z(e,t,bi(this,n),1),this},n.call=function(e,t,n){return ui(this,Z.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new Z(e,n,bi(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Yr(n).immediateRender=Xn(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Yr(r).immediateRender=Xn(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:J(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==K&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=J(o%f),o===i?(d=this._repeat,c=a):(_=J(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=ai(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:J(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&Ki(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=gi(this,J(r),J(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(Ki(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-W);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||Rn&&Br(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-W:W);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-W)._zTime=c>=r?1:-1,this._ts))return this._start=g,si(this),this.render(e,t,n);this._onUpdate&&!t&&Ki(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&$r(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(Ki(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(qn(t)||(t=bi(this,t,e)),!(e instanceof ba)){if(er(e))return e.forEach(function(e){return n.add(e,t)}),this;if(Kn(e))return this.addLabel(e,t);if(G(e))e=Z.delayedCall(0,e);else return this}return this===e?this:ui(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-zn);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof Z?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return Kn(e)?this.removeLabel(e):G(e)?this.killTweensOf(e):(e.parent===this&&Qr(this,e),e===this._recent&&(this._recent=this._last),ei(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=J(oa.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=bi(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=Z.delayedCall(0,t||br,n);return r.data=`isPause`,this._hasPause=1,ui(this,r,bi(this,e))},n.removePause=function(e){var t=this._first;for(e=bi(this,e);t;)t._start===e&&t.data===`isPause`&&$r(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)Ea!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=ki(e),i=this._first,a=qn(t),o;i;)i instanceof Z?Rr(i._targets,r)&&(a?(!Ea||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=bi(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=Z.to(n,Wr({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||W,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&_i(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Wr({startAt:{time:bi(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Gi(this,bi(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Gi(this,bi(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+W)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=J(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return ei(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),ei(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=zn,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,ui(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=J(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;_i(n,n===K&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(K._ts&&(Vr(K,oi(e,K)),Dr=oa.frame),oa.frame>=Ar){Ar+=Fn.autoSleep||120;var t=K._first;if((!t||!t._ts)&&Fn.autoSleep&&oa._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||oa.sleep()}}},t}(ba);Wr(xa.prototype,{_lock:0,_hasPause:0,_forcing:0});var Sa=function(e,t,n,r,i,a,o){var s=new Ja(this._pt,e,t,0,1,Ha,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=Hi(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(or)||[];u=or.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?Lr(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=or.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(sr.test(r)||g)&&(s.e=0),this._pt=s,s},Ca=function(e,t,n,r,i,a,o,s,c,l){G(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?G(u)?c?e[t.indexOf(`set`)||!G(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=G(u)?c?La:Ia:Fa,p;if(Kn(r)&&(~r.indexOf(`random(`)&&(r=Hi(r)),r.charAt(1)===`=`&&(p=Lr(d,r)+(wi(d)||0),(p||p===0)&&(r=p))),!l||d!==r||Da)return!isNaN(d*r)&&r!==``?(p=new Ja(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?Va:Ba,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&_r(t,r),Sa.call(this,e,t,d,r,f,s||Fn.stringFilter,c))},wa=function(e,t,n,r,i){if(G(e)&&(e=Ma(e,i,t,n,r)),!Yn(e)||e.style&&e.nodeType||er(e)||$n(e))return Kn(e)?Ma(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=Ma(e[o],i,t,n,r);return a},Ta=function(e,t,n,r,i,a){var o,s,c,l;if(Or[e]&&(o=new Or[e]).init(i,o.rawVars?t[e]:wa(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new Ja(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Ji))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},Ea,Da,Oa=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!Ln,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,A,j,M,N,P;if(b&&(!f||!a)&&(a=`none`),t._ease=ma(a,In.ease),t._rEase=x&&(ma(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?Pr(g[0]).harness:0,N=k&&i[k.prop],S=Jr(i,wr),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Sr:xr),h._lazy=0),o){if($r(t._startAt=Z.set(g,Wr({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&Xn(c),startAt:null,delay:0,onUpdate:l&&function(){return Ki(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Rn||!s&&!p)&&t._startAt.revert(Sr),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=Wr({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&Xn(c),immediateRender:s,stagger:0,parent:_},S),N&&(w[k.prop]=N),$r(t._startAt=Z.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Rn?t._startAt.revert(Sr):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,W,W);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&Xn(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||Nr(g)[C]._gsap,t._ptLookup[C]=j={},Er[O.id]&&Tr.length&&zr(),M=v===g?C:v.indexOf(E),k&&(A=new k).init(E,N||S,t,M,v)!==!1&&(t._pt=T=new Ja(t._pt,E,A.name,0,1,A.render,A,0,A.priority),A._props.forEach(function(e){j[e]=T}),A.priority&&(D=1)),!k||N)for(w in S)Or[w]&&(A=Ta(w,S,t,M,E,v))?A.priority&&(D=1):j[w]=T=Ca.call(t,E,w,`get`,S[w],M,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(Ea=t,K.killTweensOf(E,j,t.globalTime(n)),P=!t.parent,Ea=0),t._pt&&c&&(Er[O.id]=1)}D&&qa(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!P,f&&n<=0&&b.render(zn,!0,!0)},ka=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return Da=1,e.vars[t]=`+=0`,Oa(e,o),Da=0,s?vr(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&=q(n)+wi(u.e),u.b&&=l.s+wi(u.b)},Aa=function(e,t){var n=e[0]?Pr(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=Kr({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},ja=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(er(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},Ma=function(e,t,n,r,i){return G(e)?e.call(t,n,r,i):Kn(e)&&~e.indexOf(`random(`)?Hi(e):e},Na=Mr+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,Pa={};Ir(Na+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return Pa[e]=1});var Z=function(e){Pn(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:Yr(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||K,g=(er(t)||$n(t)?qn(t[0]):`length`in n)?[t]:ki(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?Nr(g):vr(`GSAP target `+t+` not found. https://gsap.com`,!Fn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Qn(s)||Qn(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new xa({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=Nn(a),_._start=0,u||Qn(s)||Qn(c)){if(b=g.length,C=u&&Mi(u),Yn(u))for(x in u)~Na.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Jr(n,Pa),y.stagger=0,T&&(y.easeReverse=T),w&&Kr(y,w),S=g[v],y.duration=+Ma(s,Nn(a),v,S,g),y.delay=(+Ma(c,Nn(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=X.none;_.duration()?s=c=0:a.timeline=0}else if(f){Yr(Wr(_.vars.defaults,{ease:`none`})),_._ease=ma(f.ease||n.ease||`none`);var E=0,D,O,k;if(er(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||ja(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!Ln&&(Ea=Nn(a),K.killTweensOf(g),Ea=0),ui(h,Nn(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===J(h._time)&&Xn(l)&&ri(Nn(a))&&h.data!==`nested`)&&(a._tTime=-W,a.render(Math.max(0,-c)||0)),m&&di(Nn(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-W&&!o?i:e<W?0:e,c,l,u,d,f,p,m,h;if(!a)hi(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=J(s%d),s===i?(u=this._repeat,c=a):(f=J(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=ai(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(J(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(fi(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(Ki(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&ni(this,e,t,n),Ki(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&Ki(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&ni(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&$r(this,1),!t&&!(o&&!r)&&(s||r||p)&&(Ki(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){aa||oa.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||Oa(this,a),o=this._ease(a/this._dur),ka(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(ci(this,0),this.parent||Zr(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?qi(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Rn),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,Ea&&Ea.vars.overwrite!==!0)._first||qi(this),this.parent&&n!==this.timeline.totalDuration()&&_i(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?ki(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Xr(r,i))return t===`all`&&(this._pt=0),qi(this);for(s=this._op=this._op||[],t!==`all`&&(Kn(t)&&(d={},Ir(t,function(e){return d[e]=1}),t=d),t=Aa(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Qr(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&qi(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return xi(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return xi(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return K.killTweensOf(e,t,n)},t}(ba);Wr(Z.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),Ir(`staggerTo,staggerFrom,staggerFromTo`,function(e){Z[e]=function(){var t=new xa,n=Ei.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var Fa=function(e,t,n){return e[t]=n},Ia=function(e,t,n){return e[t](n)},La=function(e,t,n,r){return e[t](r.fp,n)},Ra=function(e,t,n){return e.setAttribute(t,n)},za=function(e,t){return G(e[t])?Ia:Jn(e[t])&&e.setAttribute?Ra:Fa},Ba=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Va=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Ha=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Ua=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Wa=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Ga=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Qr(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Ka=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},qa=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},Ja=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||Ba,this.d=o||this,this.set=s||Fa,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Ka,this.m=e,this.mt=n,this.tween=t},e}();Ir(Mr+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return wr[e]=1}),pr.TweenMax=pr.TweenLite=Z,pr.TimelineLite=pr.TimelineMax=xa,K=new xa({sortChildren:!1,defaults:In,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),Fn.stringFilter=ia;var Ya=[],Xa={},Za=[],Qa=0,$a=0,eo=function(e){return(Xa[e]||Za).map(function(e){return e()})},to=function(){var e=Date.now(),t=[];e-Qa>2&&(eo(`matchMediaInit`),Ya.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=ur.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),eo(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Qa=e,eo(`matchMedia`))},no=function(){function e(e,t){this.selector=t&&Ai(t),this.data=[],this._r=[],this.isReverted=!1,this.id=$a++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){G(e)&&(n=t,t=e,e=G);var r=this,i=function(){var e=U,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=Ai(n)),U=r,a=t.apply(r,arguments),G(a)&&r._r.push(a),U=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===G?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=U;U=null,e(this),U=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof Z&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof xa?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof Z)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=Ya.length;r--;)Ya[r].id===this.id&&Ya.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),ro=function(){function e(e){this.contexts=[],this.scope=e,U&&U.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){Yn(e)||(e={matches:e});var r=new no(0,n||this.scope),i=r.conditions={},a,o,s;for(o in U&&!r.selector&&(r.selector=U.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=ur.matchMedia(e[o]),a&&(Ya.indexOf(r)<0&&Ya.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(to):a.addEventListener(`change`,to)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),io={registerPlugin:function(){[...arguments].forEach(function(e){return Xi(e)})},timeline:function(e){return new xa(e)},getTweensOf:function(e,t){return K.getTweensOf(e,t)},getProperty:function(e,t,n,r){Kn(e)&&(e=ki(e)[0]);var i=Pr(e||{}).get,a=n?Ur:Hr;return n===`native`&&(n=``),e&&(t?a((Or[t]&&Or[t].get||i)(e,t,n,r)):function(t,n,r){return a((Or[t]&&Or[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=ki(e),e.length>1){var r=e.map(function(e){return co.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=Or[t],o=Pr(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Ji._pt=0,r.init(e,n?t+n:t,Ji,0,[e]),r.render(1,r),Ji._pt&&Ua(1,Ji)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=co.to(e,Wr((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return K.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ma(e.ease,In.ease)),qr(In,e||{})},config:function(e){return qr(Fn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!Or[e]&&!pr[e]&&vr(t+` effect requires `+e+` plugin.`)}),kr[t]=function(e,t,r){return n(ki(e),Wr(t||{},i),r)},a&&(xa.prototype[t]=function(e,n,r){return this.add(kr[t](e,Yn(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){X[e]=ma(t)},parseEase:function(e,t){return arguments.length?ma(e,t):X},getById:function(e){return K.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new xa(e),r,i;for(n.smoothChildTiming=Xn(e.smoothChildTiming),K.remove(n),n._dp=0,n._time=n._tTime=K._time,r=K._first;r;)i=r._next,(t||!(!r._dur&&r instanceof Z&&r.vars.onComplete===r._targets[0]))&&ui(n,r,r._start-r._delay),r=i;return ui(K,n,0),n},context:function(e,t){return e?new no(e,t):U},matchMedia:function(e){return new ro(e)},matchMediaRefresh:function(){return Ya.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||to()},addEventListener:function(e,t){var n=Xa[e]||(Xa[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Xa[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Bi,wrapYoyo:Vi,distribute:Mi,random:Fi,snap:Pi,normalize:Ri,getUnit:wi,clamp:Ti,splitColor:$i,toArray:ki,selector:Ai,mapRange:Ui,pipe:Ii,unitize:Li,interpolate:Wi,shuffle:ji},install:gr,effects:kr,ticker:oa,updateRoot:xa.updateRoot,plugins:Or,globalTimeline:K,core:{PropTween:Ja,globals:yr,Tween:Z,Timeline:xa,Animation:ba,getCache:Pr,_removeLinkedListItem:Qr,reverting:function(){return Rn},context:function(e){return e&&U&&(U.data.push(e),e._ctx=U),U},suppressOverwrites:function(e){return Ln=e}}};Ir(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return io[e]=Z[e]}),oa.add(xa.updateRoot),Ji=io.to({},{duration:0});var ao=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},oo=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=ao(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},so=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(Kn(n)&&(r={},Ir(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}oo(e,n)}}}},co=io.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Rn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},so(`roundProps`,Ni),so(`modifiers`),so(`snap`,Pi))||io;Z.version=xa.version=co.version=`3.15.0`,hr=1,Zn()&&sa(),X.Power0,X.Power1,X.Power2,X.Power3,X.Power4,X.Linear,X.Quad,X.Cubic,X.Quart,X.Quint,X.Strong,X.Elastic,X.Back,X.SteppedEase,X.Bounce,X.Sine,X.Expo,X.Circ;var lo,uo,fo,po,mo,ho,go,_o=function(){return typeof window<`u`},vo={},yo=180/Math.PI,bo=Math.PI/180,xo=Math.atan2,So=1e8,Co=/([A-Z])/g,wo=/(left|right|width|margin|padding|x)/i,To=/[\s,\(]\S/,Eo={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},Do=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Oo=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ko=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ao=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},jo=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Mo=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},No=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},Po=function(e,t,n){return e.style[t]=n},Fo=function(e,t,n){return e.style.setProperty(t,n)},Io=function(e,t,n){return e._gsap[t]=n},Lo=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Ro=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},zo=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},Q=`transform`,Bo=Q+`Origin`,Vo=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in vo&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=Eo[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=os(i,e)}):this.tfm[t]=o.x?o[t]:os(i,t),t===Bo&&(this.tfm.zOrigin=o.zOrigin);else return Eo.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(Q)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(Bo,n,``)),t=Q}(a||n)&&this.props.push(t,n,a[t])},Ho=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},Uo=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,i,a;for(i=0;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(Co,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=go(),(!i||!i.isStart)&&!n[Q]&&(Ho(n),r.zOrigin&&n[Bo]&&(n[Bo]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Wo=function(e,t){var n={target:e,props:[],revert:Uo,save:Vo};return e._gsap||co.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},Go,Ko=function(e,t){var n=uo.createElementNS?uo.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):uo.createElement(e);return n&&n.style?n:uo.createElement(e)},qo=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(Co,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Yo(n)||n,1)||``},Jo=`O,Moz,ms,Ms,Webkit`.split(`,`),Yo=function(e,t,n){var r=(t||mo).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Jo[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Jo[i]:``)+e},Xo=function(){_o()&&window.document&&(lo=window,uo=lo.document,fo=uo.documentElement,mo=Ko(`div`)||{style:{}},Ko(`div`),Q=Yo(Q),Bo=Q+`Origin`,mo.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,Go=!!Yo(`perspective`),go=co.core.reverting,po=1)},Zo=function(e){var t=e.ownerSVGElement,n=Ko(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),fo.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),fo.removeChild(n),i},Qo=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},$o=function(e){var t,n;try{t=e.getBBox()}catch{t=Zo(e),n=1}return t&&(t.width||t.height)||n||(t=Zo(e)),t&&!t.width&&!t.x&&!t.y?{x:+Qo(e,[`x`,`cx`,`x1`])||0,y:+Qo(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},es=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&$o(e))},ts=function(e,t){if(t){var n=e.style,r;t in vo&&t!==Bo&&(t=Q),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(Co,`-$1`).toLowerCase())):n.removeAttribute(t)}},ns=function(e,t,n,r,i,a){var o=new Ja(e._pt,t,n,0,1,a?No:Mo);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},rs={deg:1,rad:1,turn:1},is={grid:1,flex:1},as=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=mo.style,c=wo.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||rs[i]||rs[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&es(t),(p||o===`%`)&&(vo[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],q(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===uo||!h.appendChild)&&(h=uo.body),g=h._gsap,g&&p&&g.width&&c&&g.time===oa.time&&!g.uncache)return q(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:ts(t,n)}else(p||o===`%`)&&!is[qo(h,`display`)]&&(s.position=qo(t,`position`)),h===t&&(s.position=`static`),h.appendChild(mo),m=mo[u],h.removeChild(mo),s.position=`absolute`;return c&&p&&(g=Pr(h),g.time=oa.time,g.width=h[u]),q(f?m*a/d:m&&a?d/m*a:0)},os=function(e,t,n,r){var i;return po||Xo(),t in Eo&&t!==`transform`&&(t=Eo[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),vo[t]&&t!==`transform`?(i=vs(e,r),i=t===`transformOrigin`?i.svg?i.origin:ys(qo(e,Bo))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=ds[t]&&ds[t](e,t,n)||qo(e,t)||Fr(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?as(e,t,i,n)+n:i},ss=function(e,t,n,r){if(!n||n===`none`){var i=Yo(t,e,1),a=i&&qo(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=qo(e,`borderTopColor`))}var o=new Ja(this._pt,e.style,t,0,1,Ha),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=qo(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=qo(e,t)||r,m?e.style[t]=m:ts(e,t)),l=[n,r],ia(l),n=l[0],r=l[1],d=n.match(ar)||[],b=r.match(ar)||[],b.length){for(;u=ar.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=Lr(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=ar.lastIndex-v.length,v||(v=v||Fn.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=as(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?No:Mo;return sr.test(r)&&(o.e=0),this._pt=o,o},cs={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},ls=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=cs[n]||n,t[1]=cs[r]||r,t.join(` `)},us=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],vo[o]&&(s=1,o=o===`transformOrigin`?Bo:Q),ts(n,o);s&&(ts(n,Q),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,vs(n,1),a.uncache=1,Ho(r)))}},ds={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new Ja(e._pt,t,n,0,0,us);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},fs=[1,0,0,1,0,0],ps={},ms=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},hs=function(e){var t=qo(e,Q);return ms(t)?fs:t.substr(7).match(ir).map(q)},gs=function(e,t){var n=e._gsap||Pr(e),r=e.style,i=hs(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?fs:i):(i===fs&&!e.offsetParent&&e!==fo&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,fo.appendChild(e)),i=hs(e),s?r.display=s:ts(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):fo.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},_s=function(e,t,n,r,i,a){var o=e._gsap,s=i||gs(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==fs&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=$o(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Bo]=`0px 0px`,a&&(ns(a,o,`xOrigin`,c,y),ns(a,o,`yOrigin`,l,b),ns(a,o,`xOffset`,u,o.xOffset),ns(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},vs=function(e,t){var n=e._gsap||new ya(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=qo(e,Bo)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,ee,I,L,te,R;return n.svg=!!(e.getCTM&&es(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[Q]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[Q]===`none`?``:s[Q])),r.scale=r.rotate=r.translate=`none`),S=gs(e,n.svg),n.svg&&(n.uncache?(N=e.getBBox(),c=n.xOrigin-N.x+`px `+(n.yOrigin-N.y)+`px`,M=``):M=!t&&e.getAttribute(`data-svg-origin`),_s(e,M||c,!!M||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==fs&&(E=S[0],D=S[1],O=S[2],k=S[3],l=A=S[4],u=j=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?xo(D,E)*yo:0,_=O||k?xo(O,k)*yo+m:0,_&&(p*=Math.abs(Math.cos(_*bo))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(R=S[6],L=S[7],F=S[8],ee=S[9],I=S[10],te=S[11],l=S[12],u=S[13],d=S[14],C=xo(R,I),h=C*yo,C&&(w=Math.cos(-C),T=Math.sin(-C),M=A*w+F*T,N=j*w+ee*T,P=R*w+I*T,F=A*-T+F*w,ee=j*-T+ee*w,I=R*-T+I*w,te=L*-T+te*w,A=M,j=N,R=P),C=xo(-O,I),g=C*yo,C&&(w=Math.cos(-C),T=Math.sin(-C),M=E*w-F*T,N=D*w-ee*T,P=O*w-I*T,te=k*T+te*w,E=M,D=N,O=P),C=xo(D,E),m=C*yo,C&&(w=Math.cos(C),T=Math.sin(C),M=E*w+D*T,N=A*w+j*T,D=D*w-E*T,j=j*w-A*T,E=M,A=N),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=q(Math.sqrt(E*E+D*D+O*O)),p=q(Math.sqrt(j*j+R*R)),C=xo(A,j),_=Math.abs(C)>2e-4?C*yo:0,y=te?1/(te<0?-te:te):0),n.svg&&(M=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!ms(qo(e,Q)),M&&e.setAttribute(`transform`,M))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=q(f),n.scaleY=q(p),n.rotation=q(m)+o,n.rotationX=q(h)+o,n.rotationY=q(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[Bo]=ys(c)),n.xOffset=n.yOffset=0,n.force3D=Fn.force3D,n.renderTransform=n.svg?Es:Go?Ts:xs,n.uncache=0,n},ys=function(e){return(e=e.split(` `))[0]+` `+e[1]},bs=function(e,t,n){var r=wi(t);return q(parseFloat(t)+parseFloat(as(e,`x`,n+`px`,r)))+r},xs=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,Ts(e,t)},Ss=`0deg`,Cs=`0px`,ws=`) `,Ts=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==Ss||l!==Ss)){var x=parseFloat(l)*bo,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*bo,w=Math.cos(x),a=bs(_,a,S*w*-v),o=bs(_,o,-Math.sin(x)*-v),s=bs(_,s,C*w*-v+v)}h!==Cs&&(y+=`perspective(`+h+ws),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==Cs||o!==Cs||s!==Cs)&&(y+=s!==Cs||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+ws),c!==Ss&&(y+=`rotate(`+c+ws),l!==Ss&&(y+=`rotateY(`+l+ws),u!==Ss&&(y+=`rotateX(`+u+ws),(d!==Ss||f!==Ss)&&(y+=`skew(`+d+`, `+f+ws),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+ws),_.style[Q]=y||`translate(0, 0)`},Es=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=bo,c*=bo,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=bo,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=q(b),x=q(x),S=q(S),C=q(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=as(f,`x`,a,`px`),y=as(f,`y`,o,`px`)),(p||m||h||g)&&(v=q(v+p-(p*b+m*S)+h),y=q(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=q(v+r/100*w.width),y=q(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[Q]=w)},Ds=function(e,t,n,r,i){var a=360,o=Kn(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?yo:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*So)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*So)%a-~~(s/a)*a)),e._pt=u=new Ja(e._pt,t,n,r,s,Oo),u.e=c,u.u=`deg`,e._props.push(n),u},Os=function(e,t){for(var n in t)e[n]=t[n];return e},ks=function(e,t,n){var r=Os({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[Q]=t,o=vs(n,1),ts(n,Q),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[Q],a[Q]=t,o=vs(n,1),a[Q]=c),vo)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=wi(c),p=wi(l),u=f===p?parseFloat(c):as(n,s,c,p),d=parseFloat(l),e._pt=new Ja(e._pt,o,s,u,d-u,Do),e._pt.u=p||0,e._props.push(s));Os(o,r)};Ir(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});ds[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return os(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var As={name:`css`,register:Xo,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in po||Xo(),this.styles=this.styles||Wo(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(Or[m]&&Ta(m,t,n,r,e,i)))){if(f=typeof l,p=ds[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=Hi(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,na.lastIndex=0,na.test(c)||(h=wi(c),g=wi(l),g?h!==g&&(c=as(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],Kn(c)&&~c.indexOf(`random(`)&&(c=Hi(c)),wi(c+``)||c===`auto`||(c+=Fn.units[m]||wi(os(e,m))||``),(c+``).charAt(1)===`=`&&(c=os(e,m))):c=os(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in Eo&&(m===`autoAlpha`&&(d===1&&os(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),ns(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=Eo[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in vo,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=qo(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=qo(e,`perspective`),T?e.style.perspective=T:ts(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||vs(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new Ja(this._pt,o,Q,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new Ja(this._pt,b,`scaleY`,b.scaleY,(_?Lr(b.scaleY,_+u):u)-b.scaleY||0,Do),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(Bo,0,o[Bo]),l=ls(l),b.svg?_s(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&ns(this,b,`zOrigin`,b.zOrigin,g),ns(this,o,m,ys(c),ys(l)));continue}else if(m===`svgOrigin`){_s(e,l,1,x,0,this);continue}else if(m in ps){Ds(this,b,m,d,_?Lr(d,_+l):l);continue}else if(m===`smoothOrigin`){ns(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){ks(this,l,e);continue}}else m in o||(m=Yo(m)||m);if(v||(u||u===0)&&(d||d===0)&&!To.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=wi(l)||(m in Fn.units?Fn.units[m]:h),h!==g&&(d=as(e,m,c,g)),this._pt=new Ja(this._pt,v?b:o,m,d,(_?Lr(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?jo:Do),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=Ao):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=ko);else if(m in o)ss.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){_r(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&qa(this)},render:function(e,t){if(t.tween._time||!go())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:os,aliases:Eo,getSetter:function(e,t,n){var r=Eo[t];return r&&r.indexOf(`,`)<0&&(t=r),t in vo&&t!==Bo&&(e._gsap.x||os(e,`x`))?n&&ho===n?t===`scale`?Lo:Io:(ho=n||{})&&(t===`scale`?Ro:zo):e.style&&!Jn(e.style[t])?Po:~t.indexOf(`-`)?Fo:za(e,t)},core:{_removeProperty:ts,_getMatrix:gs}};co.utils.checkPrefix=Yo,co.core.getStyleSaver=Wo,(function(e,t,n,r){var i=Ir(e+`,`+t+`,`+n,function(e){vo[e]=1});Ir(t,function(e){Fn.units[e]=`deg`,ps[e]=1}),Eo[i[13]]=e+`,`+t,Ir(r,function(e){var t=e.split(`:`);Eo[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),Ir(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){Fn.units[e]=`px`}),co.registerPlugin(As);var js=co.registerPlugin(As)||co;js.core.Tween;var $=i();function Ms(){let{user:e,signed:n,logout:r}=d(),i=t(),[a,s]=(0,Mn.useState)(!1),[c,l]=(0,Mn.useState)(!1),p=(0,Mn.useRef)(null),m=(0,Mn.useRef)(null);(0,Mn.useEffect)(()=>{let e=e=>{p.current&&!p.current.contains(e.target)&&s(!1),m.current&&!m.current.contains(e.target)&&l(!1)},t=e=>{e.key===`Escape`&&(s(!1),l(!1))};return window.addEventListener(`click`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`keydown`,t)}},[]),(0,Mn.useEffect)(()=>{s(!1),l(!1)},[i.pathname]);let h=e||(()=>{try{let e=sessionStorage.getItem(`@App:user`);return e?JSON.parse(e):null}catch{return null}})(),g=h?.avatarUrl||h?.avatar,_=h?.nome?.charAt(0).toUpperCase()||`U`,v=h?.nome?.split(` `)[0]||``,y=n?`/publicar`:`/login`,b=n?void 0:f(i,`/`);return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`style`,{children:`
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
          background: #2ac1b4 !important;
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
      `}),(0,$.jsxs)(`nav`,{className:`nl-root`,"aria-label":`Navegação principal`,ref:m,children:[(0,$.jsxs)(`div`,{className:`nl-inner`,children:[(0,$.jsxs)(u,{to:`/`,className:`nl-brand`,"aria-label":`Noxvelia — página inicial`,children:[(0,$.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,$.jsx)(`span`,{className:`nl-wordmark`,children:`Noxvelia`})]}),(0,$.jsxs)(`div`,{className:`nl-links`,children:[(0,$.jsx)(`a`,{href:`#pesquisa`,children:`Pesquisar`}),(0,$.jsx)(`a`,{href:`#anunciar`,children:`Anunciar grátis`}),(0,$.jsx)(`a`,{href:`#marcas`,children:`Marcas`}),(0,$.jsx)(`a`,{href:`#atalhos`,children:`Atalhos`}),(0,$.jsx)(u,{to:`/profissionais`,children:`Profissionais`})]}),(0,$.jsxs)(`div`,{className:`nl-actions`,children:[(0,$.jsx)(`button`,{type:`button`,className:`nl-menu-toggle`,onClick:()=>{s(!1),l(e=>!e)},"aria-expanded":c,"aria-controls":`nl-mobile-menu`,"aria-label":c?`Fechar navegação`:`Abrir navegação`,children:c?(0,$.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M6 6l12 12M18 6L6 18`})}):(0,$.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`})})}),(0,$.jsx)(o,{}),!n&&(0,$.jsx)(u,{to:`/login`,state:{from:i.pathname},className:`nl-btn-ghost`,children:`Entrar`}),(0,$.jsx)(u,{to:y,state:b,className:`nl-btn-solid`,children:`Anunciar grátis`}),n?(0,$.jsxs)(`div`,{ref:p,className:`nl-user-wrap`,children:[(0,$.jsxs)(`button`,{type:`button`,className:`nl-user-trigger ${a?`active`:``}`,onClick:()=>{l(!1),s(e=>!e)},"aria-expanded":a,"aria-label":`Abrir menu de utilizador`,children:[(0,$.jsx)(`span`,{className:`nl-avatar`,children:g?(0,$.jsx)(`img`,{src:g,alt:``}):(0,$.jsx)(`span`,{className:`nl-avatar-initial`,children:_})}),v&&(0,$.jsx)(`span`,{className:`nl-username`,children:v}),(0,$.jsx)(`svg`,{className:`nl-chevron`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,strokeWidth:`2`,"aria-hidden":`true`,children:(0,$.jsx)(`path`,{d:`M6 9l6 6 6-6`})})]}),a&&(0,$.jsxs)(`div`,{className:`nl-user-dropdown`,children:[(0,$.jsxs)(u,{to:`/perfil`,onClick:()=>s(!1),className:`nl-ud-item`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,$.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,$.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),`O meu perfil`]}),(0,$.jsx)(`div`,{className:`nl-ud-divider`}),(0,$.jsxs)(`button`,{type:`button`,onClick:()=>{s(!1),r()},className:`nl-ud-item logout`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[(0,$.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,$.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,$.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]}),`Terminar sessão`]})]})]}):null]})]}),c&&(0,$.jsxs)(`div`,{className:`nl-mobile-menu`,id:`nl-mobile-menu`,children:[(0,$.jsxs)(`div`,{className:`nl-mobile-menu-head`,"aria-hidden":`true`,children:[(0,$.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`strong`,{children:`Noxvelia`}),(0,$.jsx)(`span`,{children:`Carros e imóveis em Portugal`})]})]}),(0,$.jsx)(`a`,{href:`#pesquisa`,onClick:()=>l(!1),children:`Pesquisar`}),(0,$.jsx)(`a`,{href:`#anunciar`,onClick:()=>l(!1),children:`Anunciar grátis`}),(0,$.jsx)(`a`,{href:`#marcas`,onClick:()=>l(!1),children:`Marcas`}),(0,$.jsx)(`a`,{href:`#atalhos`,onClick:()=>l(!1),children:`Atalhos`}),(0,$.jsx)(u,{to:`/carros`,onClick:()=>l(!1),children:`Carros`}),(0,$.jsx)(u,{to:`/imoveis`,onClick:()=>l(!1),children:`Imóveis`}),(0,$.jsx)(u,{to:`/profissionais`,onClick:()=>l(!1),children:`Profissionais`}),(0,$.jsx)(u,{className:`nl-mobile-primary`,to:y,state:b,onClick:()=>l(!1),children:`Publicar anúncio`}),n?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(u,{to:`/perfil`,onClick:()=>l(!1),children:`O meu perfil`}),(0,$.jsx)(`button`,{type:`button`,onClick:()=>{l(!1),r()},children:`Terminar sessão`})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(u,{to:`/login`,state:{from:i.pathname},onClick:()=>l(!1),children:`Entrar`}),(0,$.jsx)(u,{to:`/registo`,onClick:()=>l(!1),children:`Registar`})]})]})]})]})}var Ns=`https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`,Ps=[`Peugeot`,`Renault`,`Mercedes-Benz`,`BMW`,`Volkswagen`,`Audi`,`Toyota`,`Tesla`],Fs=[[`Renault`,`Clio`],[`Peugeot`,`208`],[`Peugeot`,`2008`],[`Mercedes-Benz`,`A 180`],[`BMW`,`116`],[`Opel`,`Corsa`]],Is=[`Diesel`,`Gasolina`,`Eléctrico`,`Híbrido`,`GPL`],Ls=[`Lisboa`,`Porto`,`Braga`,`Setúbal`,`Aveiro`,`Faro`,`Coimbra`,`Leiria`],Rs=[`T1`,`T2`,`T3`,`T4`,`T5+`],zs=[{label:`Até 10.000 €`,value:`10000`},{label:`Até 20.000 €`,value:`20000`},{label:`Até 150.000 €`,value:`150000`},{label:`Até 300.000 €`,value:`300000`}],Bs=e=>new Intl.NumberFormat(`pt-PT`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}).format(e||0),Vs=e=>e==null?`...`:new Intl.NumberFormat(`pt-PT`).format(e),Hs=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/&/g,` and `).replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``),Us=e=>`/marcas/${Hs(e)}.${e===`Jaecoo`?`svg`:`png`}`,Ws=e=>e.split(/[\s&-]+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),Gs=new Set([`aiways`,`aston-martin`,`bentley`]);function Ks(){let n=r(),i=t(),{signed:o}=d(),s=(0,Mn.useRef)(null),C=(0,Mn.useRef)(null),w=(0,Mn.useRef)(!1),T=o?`/publicar`:`/login`,E=o?void 0:f(i,`/`),[D,O]=(0,Mn.useState)({carro:[],imovel:[]}),[k,A]=(0,Mn.useState)(null),[j,M]=(0,Mn.useState)(!0),[N,P]=(0,Mn.useState)(!1),[F,ee]=(0,Mn.useState)({tipo:`carro`,marca:``,modelo:``,combustivel:``,tipologia:``,distrito:``,precoMax:``});(0,Mn.useEffect)(()=>{let e=s.current;if(!e||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let t=js.context(()=>{js.from(`.lp-hero-brand, .lp-kicker, #lp-hero-title, .lp-hero-copy, .lp-actions, .lp-quick-card`,{y:22,opacity:0,duration:.78,stagger:.075,ease:`power3.out`})},e),n=wn(e.querySelectorAll(`.lp-brand-card`),{opacity:[0,1],y:[12,0],delay:jn(18,{start:160}),duration:520,ease:`outCubic`});return()=>{t.revert(),n?.pause?.()}},[]),(0,Mn.useEffect)(()=>{let e=()=>{w.current||l()?.external===!0&&(w.current=!0,S(`landing_view`))};e();let t=t=>{(t?.detail?.external===!0||l()?.external===!0)&&e()};return window.addEventListener(c,t),()=>window.removeEventListener(c,t)},[]),(0,Mn.useEffect)(()=>{let t=!0;return e.get(`/anuncios/resumo-publico`).then(({data:e})=>{t&&A(e||null)}).catch(()=>{t&&A(null)}),()=>{t=!1}},[]);let I=F.tipo===`carro`&&F.marca?y(F.marca).map(e=>typeof e==`object`?e.modelo||e.nome:e).filter(Boolean):[],L=Number(k?.profissionais||0)>0,te=[{label:`Anúncios ativos`,value:k?.totalAnuncios},{label:`Carros`,value:k?.carros},{label:`Imóveis`,value:k?.imoveis},L?{label:`Profissionais`,value:k?.profissionais}:null].filter(e=>e&&Number(e.value||0)>0),R=(e,t={})=>{let n=new URLSearchParams;return n.set(`tipo`,e),Object.entries(t).forEach(([e,t])=>{t&&n.set(e,t)}),`${e===`carro`?`/carros`:`/imoveis`}?${n.toString()}`},ne=(e,t)=>{ee(n=>{let r={...n,[e]:t};return e===`tipo`?{...r,marca:``,modelo:``,combustivel:``,tipologia:``}:(e===`marca`&&(r.modelo=``),r)})},re=e=>{e.preventDefault();let{tipo:t,marca:r,modelo:i,combustivel:a,tipologia:o,distrito:s,precoMax:c}=F,l={distrito:s,precoMax:c,...t===`carro`?{marca:r,modelo:i,combustivel:a}:{tipologia:o}};S(`search_start`,{vertical:t}),n(R(t,l))};(0,Mn.useEffect)(()=>{let t=!0;return(async()=>{try{let{data:n}=await e.get(`/anuncios/em-alta/semana`);if(!t)return;O({carro:(n?.carro||[]).slice(0,2),imovel:(n?.imovel||[]).slice(0,2)}),P(!1)}catch{t&&(O({carro:[],imovel:[]}),P(!0))}finally{t&&M(!1)}})(),()=>{t=!1}},[]);let ie=(e,t)=>{try{localStorage.setItem(`@App:contexto_visual`,t===`/carros`?`carro`:`imovel`)}catch{}n(h(e))},ae=e=>{C.current?.scrollBy({left:e*Math.min(720,window.innerWidth*.72),behavior:`smooth`})},oe=j||D.carro.length>0||D.imovel.length>0,se=(e,t)=>{let n=e.tipo===`carro`,r=p(e.fotos?.[0]||e.imagens?.[0],`medium`),i=n?[e.carro?.km==null?null:`${new Intl.NumberFormat(`pt-PT`).format(e.carro.km)} km`,e.carro?.combustivel].filter(Boolean).join(` · `):[e.imovel?.tipologia||e.imovel?.tipoImovel,e.imovel?.area?`${e.imovel.area} m²`:null].filter(Boolean).join(` · `);return(0,$.jsxs)(`button`,{type:`button`,className:`lp-example-card ${n?`drive`:`estate`}`,onClick:()=>ie(e,t),children:[(0,$.jsxs)(`span`,{className:`lp-example-img`,children:[r?(0,$.jsx)(`img`,{src:r,width:`800`,height:`600`,alt:e.titulo||(n?`Automóvel`:`Imóvel`),loading:`lazy`}):(0,$.jsx)(`span`,{className:`lp-example-no-photo`,children:`Sem fotografia`}),(0,$.jsxs)(`span`,{className:`lp-example-weekly`,children:[`Destaque `,n?`Carros`:`Imóveis`]})]}),(0,$.jsxs)(`span`,{className:`lp-example-body`,children:[(0,$.jsx)(`span`,{className:`lp-example-price`,children:Bs(e.preco)}),(0,$.jsx)(`span`,{className:`lp-example-title`,children:e.titulo}),(0,$.jsx)(`span`,{className:`lp-example-meta`,children:i||(n?`Dados técnicos disponíveis`:`Detalhes do imóvel`)}),(0,$.jsx)(`span`,{className:`lp-example-location`,children:e.localizacao?.cidade||`Portugal`})]})]},e._id)},ce=(e,t)=>j?(0,$.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,$.jsx)(`span`,{className:`lp-state-loader`,"aria-hidden":`true`}),(0,$.jsx)(`strong`,{children:`A selecionar os anúncios com mais interesse.`}),(0,$.jsx)(`span`,{children:`Os destaques refletem as visitas dos últimos sete dias.`})]}):(0,$.jsxs)(`div`,{className:`lp-example-state`,role:`status`,children:[(0,$.jsx)(`strong`,{children:N?`A seleção semanal está a ser atualizada.`:`Descobre todas as oportunidades em ${e}.`}),(0,$.jsx)(`span`,{children:N?`Entretanto, encontra todos os anúncios na pesquisa completa.`:`Explora a pesquisa e encontra o que combina contigo.`}),(0,$.jsxs)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>n(t),children:[`Explorar `,e]})]});return(0,$.jsxs)(`div`,{className:`lp-root`,ref:s,children:[(0,$.jsx)(_,{title:`Noxvelia | Plataforma de carros e imóveis em Portugal`,description:`Noxvelia é uma plataforma portuguesa para pesquisar e publicar anúncios de carros e imóveis.`,path:`/`,jsonLd:[g,m]}),(0,$.jsx)(`style`,{children:`
        .lp-root,
        .lp-root * {
          box-sizing: border-box;
        }

        .lp-root {
          --lp-ink: #082126;
          --lp-ink-soft: #254047;
          --lp-drive: #2ac1b4;
          --lp-estate: #3ecf8e;
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
          outline: 3px solid rgba(42, 193, 180, 0.48);
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
          background: rgba(42, 193, 180, 0.12);
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
          border-color: rgba(42, 193, 180, 0.52);
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
          border-color: rgba(42, 193, 180, 0.5);
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
          border: 3px solid rgba(42, 193, 180, 0.2);
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
          color: #7ee3d7;
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
          color: #7ee3d7;
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
          --lp-drive: #24b8ab;
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
          color: #7ee3d7 !important;
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
          color: #7ee3d7 !important;
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
          color: #7ee3d7 !important;
          border-color: rgba(126, 227, 215, 0.28) !important;
          background: rgba(42, 193, 180, 0.12) !important;
        }

        .dark .lp-promo-overlay {
          color: #062326 !important;
          border-color: transparent !important;
          background: #7ee3d7 !important;
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
          border-color: #7ee3d7 !important;
          background: #7ee3d7 !important;
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
          --lp-drive: #2ac1b4;
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
      `}),(0,$.jsx)(Ms,{}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`section`,{className:`lp-hero`,"aria-labelledby":`lp-hero-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsxs)(`div`,{className:`lp-hero-card`,children:[(0,$.jsxs)(`div`,{className:`lp-hero-content`,children:[(0,$.jsxs)(`div`,{className:`lp-hero-brand`,"aria-label":`NOXVELIA`,children:[(0,$.jsx)(`img`,{src:`/logo-noxvelia.png`,alt:``}),(0,$.jsx)(`span`,{children:`NOXVELIA`})]}),(0,$.jsx)(`span`,{className:`lp-kicker`,children:`Pesquisa em Portugal`}),(0,$.jsx)(`h1`,{id:`lp-hero-title`,children:`Carros e imóveis em Portugal, apresentados com clareza.`}),(0,$.jsx)(`p`,{className:`lp-hero-copy`,children:`Pesquisa por marca, modelo, localização e preço. Compara fotografias, características e contactos antes de visitar ou ligar.`}),(0,$.jsxs)(`div`,{className:`lp-actions`,children:[(0,$.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:`#pesquisa`,children:`Pesquisar anúncios`}),(0,$.jsx)(u,{className:`lp-text-link`,to:T,state:E,children:`Publicar grátis`})]})]}),(0,$.jsxs)(`div`,{className:`lp-hero-media`,children:[(0,$.jsx)(`img`,{src:`/noxvelia-hero-coast.webp`,alt:`Automóvel junto a uma casa contemporânea na costa portuguesa`,fetchPriority:`high`,decoding:`async`,onError:e=>{e.currentTarget.src=`/social/noxvelia-estate-photo-premium.webp`}}),(0,$.jsx)(`div`,{className:`lp-hero-photo-label`,"aria-hidden":`true`,children:`Carros / Imóveis`})]})]}),te.length>0&&(0,$.jsx)(`div`,{className:`lp-trust-bar`,"aria-label":`Resumo da plataforma`,children:te.map(e=>(0,$.jsxs)(`div`,{className:`lp-trust-item`,children:[(0,$.jsx)(`strong`,{children:Vs(e.value)}),(0,$.jsx)(`span`,{children:e.label})]},e.label))})]})}),(0,$.jsx)(`section`,{className:`lp-quick-section`,id:`pesquisa`,"aria-labelledby":`lp-quick-title`,children:(0,$.jsx)(`div`,{className:`lp-shell`,children:(0,$.jsxs)(`form`,{className:`lp-quick-card`,onSubmit:re,children:[(0,$.jsxs)(`div`,{className:`lp-quick-top`,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa rápida`}),(0,$.jsx)(`h2`,{className:`lp-quick-title`,id:`lp-quick-title`,children:`Pesquisa rápida`}),(0,$.jsx)(`p`,{className:`lp-quick-copy`,children:`Filtra por marca, modelo, localização e preço para chegares rapidamente aos anúncios certos.`})]}),(0,$.jsxs)(`div`,{className:`lp-type-tabs`,role:`tablist`,"aria-label":`Tipo de pesquisa`,children:[(0,$.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":F.tipo===`carro`,className:`lp-type-tab ${F.tipo===`carro`?`active`:``}`,onClick:()=>ne(`tipo`,`carro`),children:`Carros`}),(0,$.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":F.tipo===`imovel`,className:`lp-type-tab ${F.tipo===`imovel`?`active`:``}`,onClick:()=>ne(`tipo`,`imovel`),children:`Imóveis`})]})]}),(0,$.jsxs)(`div`,{className:`lp-search-form`,children:[F.tipo===`carro`?(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-marca`,children:`Marca`}),(0,$.jsxs)(`select`,{id:`lp-marca`,value:F.marca,onChange:e=>ne(`marca`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Todas as marcas`}),b.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-modelo`,children:`Modelo`}),(0,$.jsxs)(`select`,{id:`lp-modelo`,value:F.modelo,onChange:e=>ne(`modelo`,e.target.value),disabled:!F.marca,children:[(0,$.jsx)(`option`,{value:``,children:F.marca?`Todos os modelos`:`Escolhe a marca`}),I.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-combustivel`,children:`Combustível`}),(0,$.jsxs)(`select`,{id:`lp-combustivel`,value:F.combustivel,onChange:e=>ne(`combustivel`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Todos`}),Is.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-tipologia`,children:`Tipologia`}),(0,$.jsxs)(`select`,{id:`lp-tipologia`,value:F.tipologia,onChange:e=>ne(`tipologia`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Todas`}),Rs.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-estate-preco`,children:`Preço máximo`}),(0,$.jsxs)(`select`,{id:`lp-estate-preco`,value:F.precoMax,onChange:e=>ne(`precoMax`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Qualquer preço`}),zs.slice(2).map(e=>(0,$.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]})]}),(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-distrito`,children:`Distrito`}),(0,$.jsxs)(`select`,{id:`lp-distrito`,value:F.distrito,onChange:e=>ne(`distrito`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Portugal inteiro`}),x.map(e=>(0,$.jsx)(`option`,{value:e,children:e},e))]})]}),F.tipo===`carro`&&(0,$.jsxs)(`div`,{className:`lp-field`,children:[(0,$.jsx)(`label`,{htmlFor:`lp-preco`,children:`Preço máximo`}),(0,$.jsxs)(`select`,{id:`lp-preco`,value:F.precoMax,onChange:e=>ne(`precoMax`,e.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Qualquer preço`}),zs.slice(0,2).map(e=>(0,$.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,$.jsx)(`button`,{type:`submit`,className:`lp-search-submit`,children:`Ver anúncios`})]})]})})}),(0,$.jsx)(`section`,{className:`lp-promo-section`,id:`anunciar`,"aria-label":`Anunciar grátis na Noxvelia`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsxs)(`div`,{className:`lp-promo-grid`,children:[(0,$.jsxs)(u,{className:`lp-promo-link drive`,to:`/carros`,children:[(0,$.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,$.jsx)(`span`,{className:`lp-promo-label`,children:`Carros`}),(0,$.jsx)(`strong`,{className:`lp-promo-title`,children:`Automóveis com informação clara.`}),(0,$.jsx)(`span`,{className:`lp-promo-text`,children:`Vê marca, modelo, quilómetros, combustível, preço e localização num formato fácil de comparar.`}),(0,$.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar carro`})]}),(0,$.jsx)(`span`,{className:`lp-promo-media`,children:(0,$.jsx)(`img`,{src:`/social/noxvelia-drive-photo-premium.webp`,alt:`Automóvel anunciado na Noxvelia`,loading:`lazy`})})]}),(0,$.jsxs)(u,{className:`lp-promo-link estate`,to:`/imoveis`,children:[(0,$.jsxs)(`span`,{className:`lp-promo-copy`,children:[(0,$.jsx)(`span`,{className:`lp-promo-label`,children:`Imóveis`}),(0,$.jsx)(`strong`,{className:`lp-promo-title`,children:`Imóveis fáceis de comparar.`}),(0,$.jsx)(`span`,{className:`lp-promo-text`,children:`Compara fotografias, localização, tipologia, áreas e preço antes de marcar visita.`}),(0,$.jsx)(`span`,{className:`lp-promo-overlay`,children:`Pesquisar imóvel`})]}),(0,$.jsx)(`span`,{className:`lp-promo-media`,children:(0,$.jsx)(`img`,{src:`/social/noxvelia-estate-photo-premium.webp`,alt:`Imóvel anunciado na Noxvelia`,loading:`lazy`})})]})]}),(0,$.jsxs)(u,{className:`lp-pro-strip`,to:L?`/profissionais`:T,state:L?void 0:E,children:[(0,$.jsx)(`span`,{children:L?`Profissionais`:`Anunciar`}),(0,$.jsx)(`strong`,{children:L?`Stands, mediadores e vendedores com anúncios disponíveis.`:`Publica o teu carro ou imóvel e recebe contactos diretamente.`}),(0,$.jsx)(`em`,{children:L?`Ver profissionais`:`Publicar anúncio`})]})]})}),(0,$.jsx)(`section`,{className:`lp-section lp-brands-section`,id:`marcas`,"aria-labelledby":`lp-brands-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsxs)(`div`,{className:`lp-section-head`,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Marcas`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-brands-title`,children:`Marcas auto prontas a pesquisar.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Escolhe a marca e segue diretamente para resultados filtrados.`})]}),(0,$.jsxs)(`div`,{className:`lp-brand-controls`,"aria-label":`Navegar pelas marcas`,children:[(0,$.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>ae(-1),"aria-label":`Ver marcas anteriores`,children:`Anterior`}),(0,$.jsx)(`button`,{type:`button`,className:`lp-round-btn`,onClick:()=>ae(1),"aria-label":`Ver marcas seguintes`,children:`Seguinte`})]})]}),(0,$.jsx)(`div`,{className:`lp-brand-scroll`,ref:C,"aria-label":`Lista de marcas automóveis`,children:(0,$.jsx)(`div`,{className:`lp-brand-grid`,children:b.map(e=>{let t=Hs(e);return(0,$.jsxs)(u,{className:`lp-brand-card`,to:`/carros?marca=${encodeURIComponent(e)}`,"aria-label":`Ver anúncios ${e}`,children:[(0,$.jsxs)(`span`,{className:`lp-brand-mark lp-brand-mark-${t} ${Gs.has(t)?`lp-brand-mark-clean`:``}`,children:[(0,$.jsx)(`span`,{className:`lp-brand-fallback`,"aria-hidden":`true`,children:Ws(e)}),(0,$.jsx)(`img`,{src:Us(e),alt:``,loading:`lazy`,draggable:`false`,onError:e=>{e.currentTarget.style.display=`none`,e.currentTarget.parentElement?.classList.add(`logo-error`)}})]}),(0,$.jsx)(`span`,{className:`lp-brand-name`,children:e})]},e)})})})]})}),(0,$.jsx)(`section`,{className:`lp-section lp-shortcuts-section`,id:`atalhos`,"aria-labelledby":`lp-shortcuts-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsx)(`div`,{className:`lp-section-head`,children:(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Pesquisa guiada`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-shortcuts-title`,children:`Caminhos rápidos para começar.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Entradas diretas para marcas, modelos, distritos e tipologias comuns.`})]})}),(0,$.jsxs)(`div`,{className:`lp-shortcut-grid`,children:[(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Marcas mais procuradas`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:Ps.map(e=>(0,$.jsx)(u,{className:`lp-chip`,to:R(`carro`,{marca:e}),children:e},e))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group wide`,children:[(0,$.jsx)(`h3`,{children:`Modelos rápidos`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:Fs.map(([e,t])=>(0,$.jsxs)(u,{className:`lp-chip`,to:R(`carro`,{marca:e,modelo:t}),children:[e,` `,t]},`${e}-${t}`))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Combustíveis`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:Is.map(e=>(0,$.jsx)(u,{className:`lp-chip`,to:R(`carro`,{combustivel:e}),children:e},e))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Distritos`}),(0,$.jsx)(`div`,{className:`lp-chip-list`,children:Ls.map(e=>(0,$.jsx)(u,{className:`lp-chip`,to:R(`carro`,{distrito:e}),children:e},e))})]}),(0,$.jsxs)(`div`,{className:`lp-shortcut-group`,children:[(0,$.jsx)(`h3`,{children:`Imóveis`}),(0,$.jsxs)(`div`,{className:`lp-chip-list`,children:[Rs.map(e=>(0,$.jsx)(u,{className:`lp-chip`,to:R(`imovel`,{tipologia:e}),children:e},e)),Ls.slice(0,4).map(e=>(0,$.jsx)(u,{className:`lp-chip`,to:R(`imovel`,{distrito:e}),children:e},`imovel-${e}`))]})]})]})]})}),oe&&(0,$.jsx)(`section`,{className:`lp-section lp-popular-section`,id:`destaques`,"aria-labelledby":`lp-popular-title`,children:(0,$.jsxs)(`div`,{className:`lp-shell`,children:[(0,$.jsx)(`div`,{className:`lp-section-head`,children:(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Seleção atual`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-popular-title`,children:`Destaques para explorar.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Anúncios recentes de carros e imóveis, prontos a explorar.`})]})}),(0,$.jsxs)(`div`,{className:`lp-examples-grid`,"aria-live":`polite`,children:[(j||D.carro.length>0)&&(0,$.jsxs)(`div`,{className:`lp-example-column drive`,children:[(0,$.jsxs)(`div`,{className:`lp-column-top`,children:[(0,$.jsx)(`div`,{className:`lp-column-heading`,children:(0,$.jsx)(`h3`,{className:`lp-column-title`,children:`Carros`})}),(0,$.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>n(`/carros`),children:`Ver carros`})]}),(0,$.jsx)(`div`,{className:`lp-example-list`,children:D.carro.length>0?D.carro.map(e=>se(e,`/carros`)):ce(`carros`,`/carros`)})]}),(j||D.imovel.length>0)&&(0,$.jsxs)(`div`,{className:`lp-example-column estate`,children:[(0,$.jsxs)(`div`,{className:`lp-column-top`,children:[(0,$.jsx)(`div`,{className:`lp-column-heading`,children:(0,$.jsx)(`h3`,{className:`lp-column-title`,children:`Imóveis`})}),(0,$.jsx)(`button`,{type:`button`,className:`lp-column-link`,onClick:()=>n(`/imoveis`),children:`Ver imóveis`})]}),(0,$.jsx)(`div`,{className:`lp-example-list`,children:D.imovel.length>0?D.imovel.map(e=>se(e,`/imoveis`)):ce(`imóveis`,`/imoveis`)})]})]})]})}),(0,$.jsx)(v,{placement:`landing_between_highlights`,minHeight:96}),(0,$.jsx)(`section`,{className:`lp-section lp-cv-section`,id:`carvertical`,"aria-labelledby":`lp-cv-title`,children:(0,$.jsx)(`div`,{className:`lp-shell`,children:(0,$.jsxs)(`div`,{className:`lp-cv-card`,children:[(0,$.jsxs)(`div`,{className:`lp-cv-copy`,children:[(0,$.jsx)(`span`,{className:`lp-eyebrow`,children:`Parceiro de histórico automóvel`}),(0,$.jsx)(`h2`,{className:`lp-title`,id:`lp-cv-title`,children:`Conhece o carro antes da visita.`}),(0,$.jsx)(`p`,{className:`lp-copy`,children:`Consulta histórico, quilometragem e registos disponíveis.`}),(0,$.jsxs)(`ul`,{className:`lp-cv-points`,children:[(0,$.jsx)(`li`,{children:`Histórico antes do contacto`}),(0,$.jsx)(`li`,{children:`Mais segurança na compra`})]}),(0,$.jsx)(`a`,{className:`lp-btn lp-btn-drive`,href:Ns,target:`_blank`,rel:`noopener noreferrer`,children:`Verificar um veículo`})]}),(0,$.jsxs)(`div`,{className:`lp-cv-panel`,children:[(0,$.jsx)(`span`,{children:`Histórico automóvel com`}),(0,$.jsx)(`img`,{src:`/carvertical-logo.png`,alt:`carVertical`,loading:`lazy`}),(0,$.jsxs)(`div`,{className:`lp-cv-code`,children:[(0,$.jsx)(`small`,{children:`Código`}),(0,$.jsx)(`strong`,{children:`NOXVELIA`})]})]})]})})})]}),(0,$.jsx)(a,{})]})}export{Ks as default};