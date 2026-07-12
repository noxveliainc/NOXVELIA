import{r as n,n as j,j as o}from"./index-W-wvA4Qe.js";/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(...t)=>t.filter((e,s,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===s).join(" ").trim();/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,s,r)=>r?r.toUpperCase():s.toLowerCase());/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=t=>{const e=_(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var x={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},N=n.createContext({}),L=()=>n.useContext(N),A=n.forwardRef(({color:t,size:e,strokeWidth:s,absoluteStrokeWidth:r,className:l="",children:a,iconNode:i,...c},u)=>{const{size:d=24,strokeWidth:p=2,absoluteStrokeWidth:f=!1,color:g="currentColor",className:b=""}=L()??{},w=r??f?Number(s??p)*24/Number(e??d):s??p;return n.createElement("svg",{ref:u,...x,width:e??d??x.width,height:e??d??x.height,stroke:t??g,strokeWidth:w,className:m("lucide",b,l),...!a&&!y(c)&&{"aria-hidden":"true"},...c},[...i.map(([k,C])=>n.createElement(k,C)),...Array.isArray(a)?a:[a]])});/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=(t,e)=>{const s=n.forwardRef(({className:r,...l},a)=>n.createElement(A,{ref:a,iconNode:e,className:m(`lucide-${v(h(t))}`,`lucide-${t}`,r),...l}));return s.displayName=h(t),s};/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],E=P("external-link",S),W=(t,e,s)=>{try{const r=new URL(t);return r.searchParams.set("utm_source","noxvelia"),r.searchParams.set("utm_medium","sponsor_banner"),r.searchParams.set("utm_campaign",e),r.searchParams.set("utm_content",s),r.href}catch{return"#"}};function $({placement:t,vertical:e="all",className:s="",fallback:r=null}){const{campaigns:l}=j(),a=l.find(i=>{var c;return((c=i.placements)==null?void 0:c.includes(t))&&(i.vertical==="all"||i.vertical===e||e==="all")});return a?o.jsx("aside",{className:`mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 ${s}`,"aria-label":"Conteúdo patrocinado",children:o.jsxs("a",{href:W(a.targetUrl,a.id,t),target:"_blank",rel:"noopener noreferrer sponsored",className:"group grid min-h-[150px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-900 md:grid-cols-[minmax(250px,38%)_1fr]",children:[o.jsxs("div",{className:"relative min-h-[180px] overflow-hidden md:min-h-full",children:[o.jsx("img",{src:a.imageUrl,alt:"",loading:"lazy",referrerPolicy:"no-referrer",className:"absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"}),o.jsx("span",{className:"absolute left-4 top-4 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur",children:a.label})]}),o.jsxs("div",{className:"flex flex-col justify-center gap-3 p-6 sm:p-8",children:[o.jsx("p",{className:"text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-300",children:"Parceiro NOXVELIA"}),o.jsx("h2",{className:"text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl",children:a.title}),a.description&&o.jsx("p",{className:"max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300",children:a.description}),o.jsxs("span",{className:"mt-1 inline-flex items-center gap-2 text-sm font-extrabold text-slate-950 dark:text-white",children:[a.cta,o.jsx(E,{size:15,"aria-hidden":"true"})]})]})]})}):r}export{$ as S};
