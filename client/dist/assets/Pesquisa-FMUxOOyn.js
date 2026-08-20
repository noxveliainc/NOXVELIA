const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MapaResultados-DPYP3VkN.js","assets/rolldown-runtime-QTnfLwEv.js","assets/jsx-runtime-BX1tsrJU.js","assets/index-C_Kkb_RE.js","assets/index-BOrgRrA0.css","assets/images-io1S19E8.js","assets/MapaResultados-CcXJxNtP.css"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{n as t,t as n}from"./jsx-runtime-BX1tsrJU.js";import{D as r,S as i,T as a,t as o,w as s,y as c}from"./index-C_Kkb_RE.js";import{n as l,t as u}from"./localizacoes-9zKfqZul.js";import{C as d,D as f,J as p,Kt as m,S as h,Zt as g,ft as ee,ut as te}from"./mdi-xZ3MZ1KH.js";import{t as ne}from"./Seo-D5_y1DZX.js";import{c as _,l as re,n as v,s as ie,t as y}from"./marcasModelos-B1QQaHuN.js";import{t as ae}from"./AnuncioCard-vQePsbIf.js";import{t as oe}from"./AdBanner-Dgl66GGt.js";import{n as se}from"./funnelAnalytics-DN2nD2bc.js";var b=e(t(),1);function ce(e,t){let[n,r]=(0,b.useState)(e);return(0,b.useEffect)(()=>{let n=setTimeout(()=>{r(e)},t);return()=>{clearTimeout(n)}},[e,t]),n}function x(e){return Array.isArray?Array.isArray(e):D(e)===`[object Array]`}function le(e){if(typeof e==`string`)return e;if(typeof e==`bigint`)return e.toString();let t=e+``;return t==`0`&&1/e==-1/0?`-0`:t}function S(e){return e==null?``:le(e)}function C(e){return typeof e==`string`}function w(e){return typeof e==`number`}function ue(e){return e===!0||e===!1||de(e)&&D(e)==`[object Boolean]`}function T(e){return typeof e==`object`}function de(e){return T(e)&&e!==null}function E(e){return e!=null}function fe(e){return!e.trim().length}function D(e){return e==null?e===void 0?`[object Undefined]`:`[object Null]`:Object.prototype.toString.call(e)}var O=`Incorrect 'index' type`,pe=`Invalid doc index: must be a non-negative integer within the bounds of the docs array`,me=e=>`Invalid value for key ${e}`,k=e=>`Pattern length exceeds max of ${e}.`,he=e=>`Missing ${e} property in key`,ge=e=>`Property 'weight' in key '${e}' must be a positive integer`,_e=`Fuse.match does not support useTokenSearch: token search requires corpus-level statistics (df, fieldCount) that a one-off string comparison does not have. Use new Fuse(...).search(...) instead.`,A=Object.prototype.hasOwnProperty,ve=class{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach(e=>{let n=ye(e);this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight}),this._keys.forEach(e=>{e.weight/=t})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}};function ye(e){let t=null,n=null,r=null,i=1,a=null;if(C(e)||x(e))r=e,t=be(e),n=j(e);else{if(!A.call(e,`name`))throw Error(he(`name`));let o=e.name;if(r=o,A.call(e,`weight`)&&e.weight!==void 0&&(i=e.weight,i<=0))throw Error(ge(j(o)));t=be(o),n=j(o),a=e.getFn??null}return{path:t,id:n,weight:i,src:r,getFn:a}}function be(e){return x(e)?e:e.split(`.`)}function j(e){return x(e)?e.join(`.`):e}function xe(e,t){let n=[],r=!1,i=(e,t,a,o)=>{if(E(e))if(!t[a])n.push(o===void 0?e:{v:e,i:o});else{let s=e[t[a]];if(!E(s))return;if(a===t.length-1&&(C(s)||w(s)||ue(s)||typeof s==`bigint`))n.push(o===void 0?S(s):{v:S(s),i:o});else if(x(s)){r=!0;for(let e=0,n=s.length;e<n;e+=1)i(s[e],t,a+1,e)}else t.length&&i(s,t,a+1,o)}};return i(e,C(t)?t.split(`.`):t,0),r?n:n[0]}var M={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},Se={isCaseSensitive:!1,ignoreDiacritics:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1},Ce={location:0,threshold:.6,distance:100},we={useExtendedSearch:!1,useTokenSearch:!1,tokenize:void 0,tokenMatch:`any`,getFn:xe,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1},N=Object.freeze({...Se,...M,...Ce,...we});function P(e=1,t=3){let n=new Map,r=10**t;return{get(t){let i=1,a=!1;for(let e=0;e<t.length;e++)t.charCodeAt(e)===32?a||=(i++,!0):a=!1;if(n.has(i))return n.get(i);let o=Math.round(r/i**(.5*e))/r;return n.set(i,o),o},clear(){n.clear()}}}var F=class{constructor({getFn:e=N.getFn,fieldNormWeight:t=N.fieldNormWeight}={}){this.norm=P(t,3),this.getFn=e,this.isCreated=!1,this.docs=[],this.keys=[],this._keysMap={},this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((e,t)=>{this._keysMap[e.id]=t})}create(){if(this.isCreated||!this.docs.length)return;this.isCreated=!0;let e=this.docs.length;this.records=Array(e);let t=0;if(C(this.docs[0]))for(let n=0;n<e;n++){let e=this._createStringRecord(this.docs[n],n);e&&(this.records[t++]=e)}else for(let n=0;n<e;n++)this.records[t++]=this._createObjectRecord(this.docs[n],n);this.records.length=t,this.norm.clear()}add(e,t){if(!Number.isInteger(t)||t<0)throw Error(pe);if(C(e)){let n=this._createStringRecord(e,t);return n&&this.records.push(n),n}let n=this._createObjectRecord(e,t);return this.records.push(n),n}removeAt(e){if(!Number.isInteger(e)||e<0)throw Error(pe);for(let t=0,n=this.records.length;t<n;t+=1)if(this.records[t].i===e){this.records.splice(t,1);break}for(let t=0,n=this.records.length;t<n;t+=1)this.records[t].i>e&&--this.records[t].i}removeAll(e){let t=new Set;for(let n of e)Number.isInteger(n)&&n>=0&&t.add(n);if(t.size===0)return;this.records=this.records.filter(e=>!t.has(e.i));let n=Array.from(t).sort((e,t)=>e-t);for(let e of this.records){let t=0,r=n.length;for(;t<r;){let i=t+r>>>1;n[i]<e.i?t=i+1:r=i}e.i-=t}}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_createStringRecord(e,t){return!E(e)||fe(e)?null:{v:e,i:t,n:this.norm.get(e)}}_createObjectRecord(e,t){let n={i:t,$:{}};for(let t=0,r=this.keys.length;t<r;t++){let r=this.keys[t],i=r.getFn?r.getFn(e):this.getFn(e,r.path);if(E(i)){if(x(i)){let e=[];for(let t=0,n=i.length;t<n;t+=1){let n=i[t];if(E(n)){if(C(n)){if(!fe(n)){let r={v:n,i:t,n:this.norm.get(n)};e.push(r)}}else if(E(n.v)){let t=C(n.v)?n.v:S(n.v);if(!fe(t)){let r={v:t,i:n.i,n:this.norm.get(t)};e.push(r)}}}}n.$[t]=e}else if(C(i)&&!fe(i)){let e={v:i,n:this.norm.get(i)};n.$[t]=e}}}return n}toJSON(){return{keys:this.keys.map(({getFn:e,...t})=>t),records:this.records}}};function I(e,t,{getFn:n=N.getFn,fieldNormWeight:r=N.fieldNormWeight}={}){let i=new F({getFn:n,fieldNormWeight:r});return i.setKeys(e.map(ye)),i.setSources(t),i.create(),i}function L(e,{getFn:t=N.getFn,fieldNormWeight:n=N.fieldNormWeight}={}){let{keys:r,records:i}=e,a=new F({getFn:t,fieldNormWeight:n});return a.setKeys(r),a.setIndexRecords(i),a}function Te(e=[],t=N.minMatchCharLength){let n=[],r=-1,i=-1,a=0;for(let o=e.length;a<o;a+=1){let o=e[a];o&&r===-1?r=a:!o&&r!==-1&&(i=a-1,i-r+1>=t&&n.push([r,i]),r=-1)}return e[a-1]&&a-r>=t&&n.push([r,a-1]),n}function Ee(e,t,n,{location:r=N.location,distance:i=N.distance,threshold:a=N.threshold,findAllMatches:o=N.findAllMatches,minMatchCharLength:s=N.minMatchCharLength,includeMatches:c=N.includeMatches,ignoreLocation:l=N.ignoreLocation}={}){if(t.length>32)throw Error(k(32));let u=t.length,d=e.length,f=Math.max(0,Math.min(r,d)),p=a,m=f,h=(e,t)=>{let n=e/u;if(l)return n;let r=Math.abs(f-t);return i?n+r/i:r?1:n},g=s>1||c,ee=g?Array(d):[],te;for(;(te=e.indexOf(t,m))>-1;){let e=h(0,te);if(p=Math.min(e,p),m=te+u,g){let e=0;for(;e<u;)ee[te+e]=1,e+=1}}m=-1;let ne=[],_=1,re=0,v=u+d,ie=1<<u-1;for(let t=0;t<u;t+=1){let r=0,i=v;for(;r<i;)h(t,f+i)<=p?r=i:v=i,i=Math.floor((v-r)/2+r);v=i;let a=Math.max(1,f-i+1),s=o?d:Math.min(f+i,d)+u,c=Array(s+2);c[s+1]=(1<<t)-1;for(let r=s;r>=a;--r){let i=r-1,o=n[e[i]];if(c[r]=(c[r+1]<<1|1)&o,t&&(c[r]|=(ne[r+1]|ne[r])<<1|1|ne[r+1]),c[r]&ie&&(_=h(t,i),_<=p)){if(p=_,m=i,re=t,m<=f)break;a=Math.max(1,2*f-m)}}if(h(t+1,f)>p)break;ne=c}if(g&&m>=0){let t=Math.min(d-1,m+u-1+re);for(let r=m;r<=t;r+=1)n[e[r]]&&(ee[r]=1)}let y={isMatch:m>=0,score:Math.max(.001,_)};if(g){let e=Te(ee,s);e.length?c&&(y.indices=e):y.isMatch=!1}return y}function De(e){let t={};for(let n=0,r=e.length;n<r;n+=1){let i=e.charAt(n);t[i]=(t[i]||0)|1<<r-n-1}return t}function R(e){if(e.length<=1)return e;e.sort((e,t)=>e[0]-t[0]||e[1]-t[1]);let t=[e[0]];for(let n=1,r=e.length;n<r;n+=1){let r=t[t.length-1],i=e[n];i[0]<=r[1]+1?r[1]=Math.max(r[1],i[1]):t.push(i)}return t}var Oe={ł:`l`,Ł:`L`,đ:`d`,Đ:`D`,ø:`o`,Ø:`O`,ħ:`h`,Ħ:`H`,ŧ:`t`,Ŧ:`T`,ı:`i`,ß:`ss`},z=RegExp(`[`+Object.keys(Oe).join(``)+`]`,`g`),B=typeof String.prototype.normalize==`function`?e=>e.normalize(`NFD`).replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g,``).replace(z,e=>Oe[e]):e=>e,ke=class{constructor(e,{location:t=N.location,threshold:n=N.threshold,distance:r=N.distance,includeMatches:i=N.includeMatches,findAllMatches:a=N.findAllMatches,minMatchCharLength:o=N.minMatchCharLength,isCaseSensitive:s=N.isCaseSensitive,ignoreDiacritics:c=N.ignoreDiacritics,ignoreLocation:l=N.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:r,includeMatches:i,findAllMatches:a,minMatchCharLength:o,isCaseSensitive:s,ignoreDiacritics:c,ignoreLocation:l},e=s?e:e.toLowerCase(),e=c?B(e):e,this.pattern=e,this.chunks=[],!this.pattern.length)return;let u=(e,t)=>{this.chunks.push({pattern:e,alphabet:De(e),startIndex:t})},d=this.pattern.length;if(d>32){let e=0,t=d%32,n=d-t;for(;e<n;)u(this.pattern.substr(e,32),e),e+=32;if(t){let e=d-32;u(this.pattern.substr(e),e)}}else u(this.pattern,0)}searchIn(e){let{isCaseSensitive:t,ignoreDiacritics:n,includeMatches:r}=this.options;if(e=t?e:e.toLowerCase(),e=n?B(e):e,this.pattern===e){let t={isMatch:!0,score:0};return r&&(t.indices=[[0,e.length-1]]),t}let{location:i,distance:a,threshold:o,findAllMatches:s,minMatchCharLength:c,ignoreLocation:l}=this.options,u=[],d=0,f=!1;this.chunks.forEach(({pattern:t,alphabet:n,startIndex:p})=>{let{isMatch:m,score:h,indices:g}=Ee(e,t,n,{location:i+p,distance:a,threshold:o,findAllMatches:s,minMatchCharLength:c,includeMatches:r,ignoreLocation:l});m&&(f=!0),d+=h,m&&g&&u.push(...g)});let p={isMatch:f,score:f?d/this.chunks.length:1};return f&&r&&(p.indices=R(u)),p}},Ae=new Set([`fuzzy`,`include`]);function V(e){return e.startsWith(`inverse`)}var H=[{type:`exact`,multiRegex:/^="(.*)"$/,singleRegex:/^=(.*)$/,create:e=>({type:`exact`,search(t){let n=t===e;return{isMatch:n,score:+!n,indices:[0,e.length-1]}}})},{type:`include`,multiRegex:/^'"(.*)"$/,singleRegex:/^'(.*)$/,create:e=>({type:`include`,search(t){let n=0,r,i=[],a=e.length;for(;(r=t.indexOf(e,n))>-1;)n=r+a,i.push([r,n-1]);let o=!!i.length;return{isMatch:o,score:+!o,indices:i}}})},{type:`prefix-exact`,multiRegex:/^\^"(.*)"$/,singleRegex:/^\^(.*)$/,create:e=>({type:`prefix-exact`,search(t){let n=t.startsWith(e);return{isMatch:n,score:+!n,indices:[0,e.length-1]}}})},{type:`inverse-prefix-exact`,multiRegex:/^!\^"(.*)"$/,singleRegex:/^!\^(.*)$/,create:e=>({type:`inverse-prefix-exact`,search(t){let n=!t.startsWith(e);return{isMatch:n,score:+!n,indices:[0,t.length-1]}}})},{type:`inverse-suffix-exact`,multiRegex:/^!"(.*)"\$$/,singleRegex:/^!(.*)\$$/,create:e=>({type:`inverse-suffix-exact`,search(t){let n=!t.endsWith(e);return{isMatch:n,score:+!n,indices:[0,t.length-1]}}})},{type:`suffix-exact`,multiRegex:/^"(.*)"\$$/,singleRegex:/^(.*)\$$/,create:e=>({type:`suffix-exact`,search(t){let n=t.endsWith(e);return{isMatch:n,score:+!n,indices:[t.length-e.length,t.length-1]}}})},{type:`inverse-exact`,multiRegex:/^!"(.*)"$/,singleRegex:/^!(.*)$/,create:e=>({type:`inverse-exact`,search(t){let n=t.indexOf(e)===-1;return{isMatch:n,score:+!n,indices:[0,t.length-1]}}})},{type:`fuzzy`,multiRegex:/^"(.*)"$/,singleRegex:/^(.*)$/,create:(e,t={})=>{let n=new ke(e,{location:t.location??N.location,threshold:t.threshold??N.threshold,distance:t.distance??N.distance,includeMatches:t.includeMatches??N.includeMatches,findAllMatches:t.findAllMatches??N.findAllMatches,minMatchCharLength:t.minMatchCharLength??N.minMatchCharLength,isCaseSensitive:t.isCaseSensitive??N.isCaseSensitive,ignoreDiacritics:t.ignoreDiacritics??N.ignoreDiacritics,ignoreLocation:t.ignoreLocation??N.ignoreLocation});return{type:`fuzzy`,search(e){return n.searchIn(e)}}}}],je=H.length,Me=`\0`,U=`|`;function Ne(e){let t=[],n=e.length,r=0;for(;r<n;){for(;r<n&&e[r]===` `;)r++;if(r>=n)break;let i=r;for(;i<n&&e[i]!==` `&&e[i]!==`"`;)i++;if(i<n&&e[i]===`"`){for(i++;i<n;){if(e[i]===`"`){let t=i+1;if(t>=n||e[t]===` `){i++;break}if(e[t]===`$`&&(t+1>=n||e[t+1]===` `)){i+=2;break}}i++}t.push(e.substring(r,i)),r=i}else{for(;i<n&&e[i]!==` `;)i++;t.push(e.substring(r,i)),r=i}}return t}function Pe(e,t){let n=e.match(t);return n?n[1]:null}function Fe(e,t={}){return e.replace(/\\\|/g,Me).split(U).map(e=>{let n=Ne(e.replace(/\u0000/g,`|`).trim()).filter(e=>e&&!!e.trim()),r=[];for(let e=0,i=n.length;e<i;e+=1){let i=n[e],a=!1,o=-1;for(;!a&&++o<je;){let e=H[o],n=Pe(i,e.multiRegex);n&&(r.push(e.create(n,t)),a=!0)}if(!a)for(o=-1;++o<je;){let e=H[o],n=Pe(i,e.singleRegex);if(n){r.push(e.create(n,t));break}}}return r})}var Ie=class{constructor(e,{isCaseSensitive:t=N.isCaseSensitive,ignoreDiacritics:n=N.ignoreDiacritics,includeMatches:r=N.includeMatches,minMatchCharLength:i=N.minMatchCharLength,ignoreLocation:a=N.ignoreLocation,findAllMatches:o=N.findAllMatches,location:s=N.location,threshold:c=N.threshold,distance:l=N.distance}={}){this.query=null,this.options={isCaseSensitive:t,ignoreDiacritics:n,includeMatches:r,minMatchCharLength:i,findAllMatches:o,ignoreLocation:a,location:s,threshold:c,distance:l},e=t?e:e.toLowerCase(),e=n?B(e):e,this.pattern=e,this.query=Fe(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){let t=this.query;if(!t)return{isMatch:!1,score:1};let{includeMatches:n,isCaseSensitive:r,ignoreDiacritics:i}=this.options;e=r?e:e.toLowerCase(),e=i?B(e):e;let a=0,o=[],s=0,c=!1;for(let r=0,i=t.length;r<i;r+=1){let i=t[r];o.length=0,a=0,c=!1;for(let t=0,r=i.length;t<r;t+=1){let r=i[t],{isMatch:l,indices:u,score:d}=r.search(e);if(l)a+=1,s+=d,V(r.type)&&(c=!0),n&&(Ae.has(r.type)?o.push(...u):o.push(u));else{s=0,a=0,o.length=0,c=!1;break}}if(a){let e={isMatch:!0,score:s/a};return c&&(e.hasInverse=!0),n&&(e.indices=R(o)),e}}return{isMatch:!1,score:1}}},W=[];function G(...e){W.push(...e)}function Le(e,t){for(let n=0,r=W.length;n<r;n+=1){let r=W[n];if(r.condition(e,t))return new r(e,t)}return new ke(e,t)}var Re={AND:`$and`,OR:`$or`},ze={PATH:`$path`,PATTERN:`$val`},K=e=>!!(e[Re.AND]||e[Re.OR]),Be=e=>!!e[ze.PATH],Ve=e=>!x(e)&&T(e)&&!K(e),He=e=>({[Re.AND]:Object.keys(e).map(t=>({[t]:e[t]}))});function q(e,t,{auto:n=!0}={}){let r=e=>{if(C(e)){let r={keyId:null,pattern:e};return n&&(r.searcher=Le(e,t)),r}let i=Object.keys(e),a=Be(e);if(!a&&i.length>1&&!K(e))return r(He(e));if(Ve(e)){let r=a?e[ze.PATH]:i[0],o=a?e[ze.PATTERN]:e[r];if(!C(o))throw Error(me(r));let s={keyId:j(r),pattern:o};return n&&(s.searcher=Le(o,t)),s}let o={children:[],operator:i[0]};return i.forEach(t=>{let n=e[t];x(n)&&n.forEach(e=>{o.children.push(r(e))})}),o};return K(e)||(e=He(e)),r(e)}function Ue(e,{ignoreFieldNorm:t=N.ignoreFieldNorm}){let n=1;return e.forEach(({key:e,norm:r,score:i})=>{let a=e?e.weight:null;n*=(i===0&&a?2**-52:i)**+((a||1)*(t?1:r))}),n}function We(e,{ignoreFieldNorm:t=N.ignoreFieldNorm}){e.forEach(e=>{e.score=Ue(e.matches,{ignoreFieldNorm:t})})}var Ge=class{constructor(e){this.limit=e,this.heap=[]}get size(){return this.heap.length}shouldInsert(e){return this.size<this.limit||e<this.heap[0].score}insert(e){this.size<this.limit?(this.heap.push(e),this._bubbleUp(this.size-1)):e.score<this.heap[0].score&&(this.heap[0]=e,this._sinkDown(0))}extractSorted(e){return this.heap.sort(e)}_bubbleUp(e){let t=this.heap;for(;e>0;){let n=e-1>>1;if(t[e].score<=t[n].score)break;let r=t[e];t[e]=t[n],t[n]=r,e=n}}_sinkDown(e){let t=this.heap,n=t.length,r=e;do{e=r;let i=2*e+1,a=2*e+2;if(i<n&&t[i].score>t[r].score&&(r=i),a<n&&t[a].score>t[r].score&&(r=a),r!==e){let n=t[e];t[e]=t[r],t[r]=n}}while(r!==e)}};function Ke(e){let t=[];return e.matches.forEach(e=>{if(!E(e.indices)||!e.indices.length)return;let n={indices:e.indices,value:e.value};e.key&&(n.key=e.key.id),e.idx>-1&&(n.refIndex=e.idx),t.push(n)}),t}function qe(e,t,{includeMatches:n=N.includeMatches,includeScore:r=N.includeScore}={}){return e.map(e=>{let{idx:i}=e,a={item:t[i],refIndex:i};return n&&(a.matches=Ke(e)),r&&(a.score=e.score),a})}var J=/[\p{L}\p{M}\p{N}_]+/gu,Je=new WeakSet;function Ye(e){Je.has(e)||(Je.add(e),console.warn(`[Fuse] tokenize regex ${e} lacks the global flag; only the first match per text will be returned. Add the 'g' flag.`))}function Xe(e){if(typeof e==`function`){let t=!1;return n=>{let r=e(n);if(!t&&(t=!0,!Array.isArray(r)||r.some(e=>typeof e!=`string`)))throw Error(`[Fuse] tokenize function must return string[]; received ${Array.isArray(r)?`array containing non-strings`:typeof r}.`);return r}}return e instanceof RegExp?(e.global||Ye(e),t=>t.match(e)||[]):e=>e.match(J)||[]}function Y({isCaseSensitive:e=!1,ignoreDiacritics:t=!1,tokenize:n}={}){let r=Xe(n);return{tokenize(n){return e||(n=n.toLowerCase()),t&&(n=B(n)),r(n)}}}var Ze=class{static condition(e,t){return t.useTokenSearch}constructor(e,t){this.options=t,this.analyzer=Y({isCaseSensitive:t.isCaseSensitive,ignoreDiacritics:t.ignoreDiacritics,tokenize:t.tokenize});let n=this.analyzer.tokenize(e),{df:r,fieldCount:i}=t._invertedIndex;this.termSearchers=[],this.idfWeights=[];for(let e of n){this.termSearchers.push(new ke(e,{location:t.location,threshold:t.threshold,distance:t.distance,includeMatches:t.includeMatches,findAllMatches:t.findAllMatches,minMatchCharLength:t.minMatchCharLength,isCaseSensitive:t.isCaseSensitive,ignoreDiacritics:t.ignoreDiacritics,ignoreLocation:!0}));let n=r.get(e)||0,a=Math.log(1+(i-n+.5)/(n+.5));this.idfWeights.push(a)}this.combineAll=t.tokenMatch===`all`,this.numTerms=this.termSearchers.length,this.useMask=this.numTerms<=31}searchIn(e){if(!this.termSearchers.length)return{isMatch:!1,score:1};let t=[],n=0,r=0,i=0,a=0,o=this.combineAll&&!this.useMask?new Set:null;for(let s=0;s<this.termSearchers.length;s++){let c=this.termSearchers[s].searchIn(e),l=this.idfWeights[s];r+=l,c.isMatch&&(i++,n+=l*(1-c.score),c.indices&&t.push(...c.indices),this.combineAll&&(this.useMask?a|=1<<s:o.add(s)))}if(i===0)return{isMatch:!1,score:1};let s=r>0?1-n/r:0,c={isMatch:!0,score:Math.max(.001,s)};return this.options.includeMatches&&t.length&&(c.indices=R(t)),this.combineAll&&(this.useMask?c.matchedMask=a:c.matchedTerms=o,c.termCount=this.numTerms),c}};function Qe(e,t,n,r){let i=r.tokenize(t);if(!i.length)return;e.fieldCount++,e.docFieldCount.set(n,(e.docFieldCount.get(n)||0)+1);let a=new Set(i),o=e.docTermFieldHits.get(n);o||(o=new Map,e.docTermFieldHits.set(n,o));for(let t of a)o.set(t,(o.get(t)||0)+1),e.df.set(t,(e.df.get(t)||0)+1)}function $e(e,t,n,r){let{i,v:a,$:o}=t;if(a!==void 0){Qe(e,a,i,r);return}if(o)for(let t=0;t<n;t++){let n=o[t];if(n)if(Array.isArray(n))for(let t of n)Qe(e,t.v,i,r);else Qe(e,n.v,i,r)}}function et(e,t,n){let r={fieldCount:0,df:new Map,docFieldCount:new Map,docTermFieldHits:new Map};for(let i of e)$e(r,i,t,n);return r}function tt(e,t,n,r){$e(e,t,n,r)}function nt(e,t){let n=e.docFieldCount.get(t);if(n===void 0)return;e.fieldCount-=n,e.docFieldCount.delete(t);let r=e.docTermFieldHits.get(t);if(r){for(let[t,n]of r){let r=(e.df.get(t)||0)-n;r<=0?e.df.delete(t):e.df.set(t,r)}e.docTermFieldHits.delete(t)}}function rt(e,t){if(t.length===0)return;let n=Array.from(new Set(t)).sort((e,t)=>e-t);for(let t of n)nt(e,t);let r=e=>{let t=0,r=n.length;for(;t<r;){let i=t+r>>>1;n[i]<e?t=i+1:r=i}return e-t},i=n[0],a=new Map;for(let[t,n]of e.docFieldCount)a.set(t>i?r(t):t,n);e.docFieldCount=a;let o=new Map;for(let[t,n]of e.docTermFieldHits)o.set(t>i?r(t):t,n);e.docTermFieldHits=o}var X=class{constructor(e,t,n){this.options={...N,...t},this.options.useExtendedSearch,this.options.useTokenSearch,this._keyStore=new ve(this.options.keys),this._docs=e,this._myIndex=null,this._invertedIndex=null,this.setCollection(e,n),this._lastQuery=null,this._lastSearcher=null}_getSearcher(e){if(this._lastQuery===e)return this._lastSearcher;let t=Le(e,this._invertedIndex?{...this.options,_invertedIndex:this._invertedIndex}:this.options);return this._lastQuery=e,this._lastSearcher=t,t}setCollection(e,t){if(this._docs=e,t&&!(t instanceof F))throw Error(O);if(this._myIndex=t||I(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight}),this.options.useTokenSearch){let e=Y({isCaseSensitive:this.options.isCaseSensitive,ignoreDiacritics:this.options.ignoreDiacritics,tokenize:this.options.tokenize});this._invertedIndex=et(this._myIndex.records,this._myIndex.keys.length,e)}this._invalidateSearcherCache()}add(e){if(!E(e))return;this._docs.push(e);let t=this._myIndex.add(e,this._docs.length-1);if(this._invertedIndex&&t){let e=Y({isCaseSensitive:this.options.isCaseSensitive,ignoreDiacritics:this.options.ignoreDiacritics,tokenize:this.options.tokenize});tt(this._invertedIndex,t,this._myIndex.keys.length,e)}this._invalidateSearcherCache()}remove(e=()=>!1){let t=[],n=[];for(let r=0,i=this._docs.length;r<i;r+=1)e(this._docs[r],r)&&(t.push(this._docs[r]),n.push(r));if(n.length){this._invertedIndex&&rt(this._invertedIndex,n);let e=new Set(n);this._docs=this._docs.filter((t,n)=>!e.has(n)),this._myIndex.removeAll(n),this._invalidateSearcherCache()}return t}removeAt(e){if(!Number.isInteger(e)||e<0||e>=this._docs.length)throw Error(pe);this._invertedIndex&&rt(this._invertedIndex,[e]);let t=this._docs.splice(e,1)[0];return this._myIndex.removeAt(e),this._invalidateSearcherCache(),t}_invalidateSearcherCache(){this._lastQuery=null,this._lastSearcher=null}getIndex(){return this._myIndex}search(e,t){let{limit:n=-1}=t||{},{includeMatches:r,includeScore:i,shouldSort:a,sortFn:o,ignoreFieldNorm:s}=this.options;if(C(e)&&!e.trim()){let e=this._docs.map((e,t)=>({item:e,refIndex:t}));return w(n)&&n>-1&&(e=e.slice(0,n)),e}let c=w(n)&&n>0&&C(e),l;if(c){let t=new Ge(n);C(this._docs[0])?this._searchStringList(e,{heap:t,ignoreFieldNorm:s}):this._searchObjectList(e,{heap:t,ignoreFieldNorm:s}),l=t.extractSorted(o)}else l=C(e)?C(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e),We(l,{ignoreFieldNorm:s}),a&&l.sort(o),w(n)&&n>-1&&(l=l.slice(0,n));return qe(l,this._docs,{includeMatches:r,includeScore:i})}_searchStringList(e,{heap:t,ignoreFieldNorm:n}={}){let r=this._getSearcher(e),i=this.options.useTokenSearch&&this.options.tokenMatch===`all`,{records:a}=this._myIndex,o=t?null:[];return a.forEach(({v:e,i:a,n:s})=>{if(!E(e))return;let c=r.searchIn(e);if(c.isMatch){let r={score:c.score,value:e,norm:s,indices:c.indices};i&&(r.matchedMask=c.matchedMask,r.matchedTerms=c.matchedTerms,r.termCount=c.termCount);let l=[r];if(!i||this._coversAllTokens(l)){let r={item:e,idx:a,matches:l};t?(r.score=Ue(r.matches,{ignoreFieldNorm:n}),t.shouldInsert(r.score)&&t.insert(r)):o.push(r)}}}),o}_searchLogical(e){let t=q(e,this.options),n=(e,t,r)=>{if(!(`children`in e)){let{keyId:n,searcher:i}=e,a;return n===null?(a=[],this._myIndex.keys.forEach((e,n)=>{a.push(...this._findMatches({key:e,value:t[n],searcher:i}))})):a=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:i}),a&&a.length?[{idx:r,item:t,matches:a}]:[]}let{children:i,operator:a}=e,o=[];for(let e=0,s=i.length;e<s;e+=1){let s=i[e],c=n(s,t,r);if(c.length)o.push(...c);else if(a===Re.AND)return[]}return o},r=this._myIndex.records,i=new Map,a=[];return r.forEach(({$:e,i:r})=>{if(E(e)){let o=n(t,e,r);o.length&&(i.has(r)||(i.set(r,{idx:r,item:e,matches:[]}),a.push(i.get(r))),o.forEach(({matches:e})=>{i.get(r).matches.push(...e)}))}}),a}_searchObjectList(e,{heap:t,ignoreFieldNorm:n}={}){let r=this._getSearcher(e),i=this.options.useTokenSearch&&this.options.tokenMatch===`all`,{keys:a,records:o}=this._myIndex,s=t?null:[];return o.forEach(({$:e,i:o})=>{if(!E(e))return;let c=[],l=!1,u=!1;if(a.forEach((t,n)=>{let i=this._findMatches({key:t,value:e[n],searcher:r});i.length?(c.push(...i),i[0].hasInverse&&(u=!0)):l=!0}),!(u&&l)&&c.length&&(!i||this._coversAllTokens(c))){let r={idx:o,item:e,matches:c};t?(r.score=Ue(r.matches,{ignoreFieldNorm:n}),t.shouldInsert(r.score)&&t.insert(r)):s.push(r)}}),s}_findMatches({key:e,value:t,searcher:n}){if(!E(t))return[];let r=[];if(x(t))t.forEach(({v:t,i,n:a})=>{if(!E(t))return;let o=n.searchIn(t);if(o.isMatch){let n={score:o.score,key:e,value:t,idx:i,norm:a,indices:o.indices,hasInverse:o.hasInverse};o.termCount!==void 0&&(n.matchedMask=o.matchedMask,n.matchedTerms=o.matchedTerms,n.termCount=o.termCount),r.push(n)}});else{let{v:i,n:a}=t,o=n.searchIn(i);if(o.isMatch){let t={score:o.score,key:e,value:i,norm:a,indices:o.indices,hasInverse:o.hasInverse};o.termCount!==void 0&&(t.matchedMask=o.matchedMask,t.matchedTerms=o.matchedTerms,t.termCount=o.termCount),r.push(t)}}return r}_coversAllTokens(e){let t=e.length?e[0].termCount:void 0;if(t===void 0)return!0;if(t<=31){let n=0;for(let t=0;t<e.length;t++)n|=e[t].matchedMask||0;return n===2**t-1}let n=new Set;for(let t=0;t<e.length;t++){let r=e[t].matchedTerms;if(r)for(let e of r)n.add(e)}return n.size===t}};X.version=`7.4.2`,X.createIndex=I,X.parseIndex=L,X.config=N,X.match=function(e,t,n){if(n&&n.useTokenSearch)throw Error(_e);return Le(e,{...N,...n}).searchIn(t)},X.parseQuery=q,G(Ie),G(Ze),X.use=function(...e){e.forEach(e=>G(e))};var it=X,Z=g(),Q=n(),at=[`T0`,`T1`,`T2`,`T3`,`T4`,`T5+`],ot=[{value:`apartamento`,label:`Apartamento`},{value:`moradia`,label:`Moradia`},{value:`terreno`,label:`Terreno`},{value:`loja`,label:`Loja`},{value:`escritorio`,label:`Escritorio`}],st=[`Gasolina`,`Diesel`,`Eléctrico`,`Híbrido`,`GPL`],ct=[`Manual`,`Automático`],lt=[{value:`citadino`,label:`Citadino`},{value:`utilitario`,label:`Utilitário`},{value:`sedan`,label:`Sedan`},{value:`carrinha`,label:`Carrinha`},{value:`suv`,label:`SUV`},{value:`crossover`,label:`Crossover`},{value:`coupe`,label:`Coupé`},{value:`cabrio`,label:`Cabrio`},{value:`monovolume`,label:`Monovolume`},{value:`pickup`,label:`Pick-up`},{value:`comercial`,label:`Comercial`}],ut=(0,b.lazy)(()=>o(()=>import(`./MapaResultados-DPYP3VkN.js`),__vite__mapDeps([0,1,2,3,4,5,6]))),dt=e=>String(e||``).split(`,`).map(e=>e.trim()).filter(Boolean),$=e=>Number(e).toLocaleString(`pt-PT`),ft=e=>typeof e==`object`?e.modelo||e.nome||``:e;function pt({tipoPadrao:e=`imovel`,seoParams:t=null}){let[n]=a(),o=r(),g=o.pathname.includes(`carro`)?`carro`:e||`imovel`,x=n.toString(),le=t?.toString()||``,S=(0,b.useMemo)(()=>({search:new URLSearchParams(x),seo:le?new URLSearchParams(le):null}),[x,le]),C=(0,b.useCallback)(e=>S.seo?.get(e)||S.search.get(e)||``,[S]),w=C(`marca`),ue=g===`carro`&&(y.includes(w)||_(w))?w:``,T=C(`q`),de=(0,b.useCallback)(()=>({tipo:g,precoMin:C(`precoMin`),precoMax:C(`precoMax`),distrito:C(`distrito`)||`Todos`,cidade:C(`cidade`),marca:ue,modelo:C(`modelo`),tiposImovel:dt(C(`tipoImovel`)),tipologias:dt(C(`tipologia`)),combustiveis:dt(C(`combustivel`)),transmissao:dt(C(`transmissao`)),tipoVeiculo:dt(C(`tipoVeiculo`)),anoMin:C(`anoMin`),anoMax:C(`anoMax`),kmMax:C(`kmMax`),potenciaMin:C(`potenciaMin`),potenciaMax:C(`potenciaMax`),areaMin:C(`areaMin`),quartosMin:C(`quartosMin`),garantia:C(`garantia`)===`true`,aceitaRetoma:C(`aceitaRetoma`)===`true`,garagem:C(`garagem`)===`true`,tipoAnunciante:C(`tipoAnunciante`)}),[C,ue,g]),E=(0,b.useMemo)(()=>de(),[de]),fe=c(o,g===`carro`?`/carros`:`/imoveis`),[D,O]=(0,b.useState)([]),[pe,me]=(0,b.useState)([]),[k,he]=(0,b.useState)(!1),[ge,_e]=(0,b.useState)(!1),[A,ve]=(0,b.useState)(null),[ye,be]=(0,b.useState)(0),[j,xe]=(0,b.useState)(`relevancia`),[M,Se]=(0,b.useState)(T),[Ce,we]=(0,b.useState)(!1),[N,P]=(0,b.useState)(!1),[F,I]=(0,b.useState)(!1),[L,Te]=(0,b.useState)(!0),[Ee,De]=(0,b.useState)(!1),[R,Oe]=(0,b.useState)(`grelha`),[z,B]=(0,b.useState)(E),ke=(0,b.useRef)(null),Ae=(0,b.useRef)(!1),V=(0,b.useRef)(1),H=(0,b.useRef)(z),je=(0,b.useRef)(j),Me=(0,b.useRef)(j),U=(0,b.useRef)(``),Ne=(0,b.useRef)(!1),Pe=ce(M,300);(0,b.useEffect)(()=>{H.current=z},[z]),(0,b.useEffect)(()=>{je.current=j},[j]),(0,b.useEffect)(()=>{let e=()=>I(e=>!e);return window.addEventListener(`toggle-filtros`,e),()=>window.removeEventListener(`toggle-filtros`,e)},[]),(0,b.useEffect)(()=>{let e=window.matchMedia(`(max-width: 1024px)`),t=()=>De(e.matches);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,b.useEffect)(()=>{if(!F)return;let e=e=>{e.key===`Escape`&&I(!1)},t=document.body.style.overflow;return document.body.style.overflow=`hidden`,window.addEventListener(`keydown`,e),()=>{document.body.style.overflow=t,window.removeEventListener(`keydown`,e)}},[F]);let Fe=(0,b.useCallback)((e,t,n)=>{t.precoMin&&e.set(`precoMin`,t.precoMin),t.precoMax&&e.set(`precoMax`,t.precoMax),t.distrito&&t.distrito!==`Todos`&&e.set(`distrito`,t.distrito),t.cidade&&e.set(`cidade`,t.cidade),t.garantia&&e.set(`garantia`,`true`),t.aceitaRetoma&&e.set(`aceitaRetoma`,`true`),t.tipoAnunciante&&e.set(`tipoAnunciante`,t.tipoAnunciante),n===`carro`&&(t.marca&&e.set(`marca`,t.marca),t.modelo&&e.set(`modelo`,t.modelo),t.combustiveis.length&&e.set(`combustivel`,t.combustiveis.join(`,`)),t.transmissao.length&&e.set(`transmissao`,t.transmissao.join(`,`)),t.tipoVeiculo.length&&e.set(`tipoVeiculo`,t.tipoVeiculo.join(`,`)),t.anoMin&&e.set(`anoMin`,t.anoMin),t.anoMax&&e.set(`anoMax`,t.anoMax),t.kmMax&&e.set(`kmMax`,t.kmMax),t.potenciaMin&&e.set(`potenciaMin`,t.potenciaMin),t.potenciaMax&&e.set(`potenciaMax`,t.potenciaMax)),n===`imovel`&&(t.tipologias.length&&e.set(`tipologia`,t.tipologias.join(`,`)),t.tiposImovel?.length&&e.set(`tipoImovel`,t.tiposImovel.join(`,`)),t.areaMin&&e.set(`areaMin`,t.areaMin),t.quartosMin&&e.set(`quartosMin`,t.quartosMin),t.garagem&&e.set(`garagem`,`true`))},[]),Ie=(0,b.useCallback)(async()=>{try{let e=H.current,t=U.current,n=e.tipo||g,r=new URLSearchParams;r.set(`tipo`,n),Fe(r,e,n),t&&t.trim()&&r.set(`q`,t.trim());let{data:a}=await i.get(`/anuncios/pesquisa/mapa?${r.toString()}`);me(Array.isArray(a)?a:[])}catch(e){console.warn(`Erro ao carregar mapa:`,e)}},[Fe,g]),W=(0,b.useCallback)(async(t,n=!1,r=null)=>{if(!Ae.current){Ae.current=!0,t===1?he(!0):_e(!0),ve(null);try{let a=H.current,s=je.current,c=U.current,l=new URLSearchParams,u=r||a.tipo;(!u||u===`undefined`)&&(u=o.pathname.includes(`carro`)?`carro`:e||`imovel`),l.set(`tipo`,u),l.set(`page`,t),l.set(`limit`,12),l.set(`sort`,s),Fe(l,a,u),c&&c.trim()&&l.set(`q`,c.trim());let{data:d}=await i.get(`/anuncios?${l.toString()}`),f=d.anuncios||(Array.isArray(d)?d:[]),p=d.totalAnuncios===void 0?f.length:d.totalAnuncios;O(n?e=>[...e,...f]:f),be(p);let m=f.length===12;P(m),m&&(V.current=t)}catch{ve(`Não conseguimos carregar novos anúncios neste momento.`),P(!1)}finally{he(!1),_e(!1),Ae.current=!1}}},[Fe,e,o.pathname]);(0,b.useEffect)(()=>{H.current=E,B(E),I(!1),P(!1),O([]),Se(T),U.current=T,V.current=1;let e=setTimeout(()=>{W(1,!1,g)},50);return()=>clearTimeout(e)},[g,E,T,W]),(0,b.useEffect)(()=>{if(Me.current===j)return;Me.current=j;let e=!1,t,n=()=>{if(!e){if(Ae.current){t=setTimeout(n,80);return}P(!1),O([]),V.current=1,W(1,!1,H.current.tipo)}};return n(),()=>{e=!0,clearTimeout(t)}},[j,W]),(0,b.useEffect)(()=>{if(U.current=Pe,!Ne.current){Ne.current=!0;return}P(!1),O([]),V.current=1,W(1,!1,null)},[Pe]),(0,b.useEffect)(()=>{if(R!==`mapa`)return;let e=setTimeout(()=>{Ie()},60);return()=>clearTimeout(e)},[g,z.precoMin,z.precoMax,z.distrito,z.cidade,z.marca,z.modelo,z.tiposImovel,z.tipologias,z.combustiveis,z.transmissao,z.tipoVeiculo,z.anoMin,z.anoMax,z.kmMax,z.potenciaMin,z.potenciaMax,z.areaMin,z.quartosMin,z.garantia,z.aceitaRetoma,z.garagem,z.tipoAnunciante,Pe,Ie,R]),(0,b.useEffect)(()=>{if(!N||R===`mapa`)return;let e=new IntersectionObserver(e=>{if(e[0].isIntersecting){let e=V.current+1;W(e,!0,H.current.tipo)}},{rootMargin:`200px`,threshold:.1}),t=ke.current;return t&&e.observe(t),()=>e.disconnect()},[N,W,R]);let G=(e,t)=>{B(n=>{let r=n[e]||[],i=r.includes(t)?r.filter(e=>e!==t):[...r,t];return{...n,[e]:i}})},Le=()=>{se(`search_start`,{vertical:g}),P(!1),O([]),V.current=1,setTimeout(()=>{W(1,!1,H.current.tipo)},50),I(!1)},Re=z.marca?_(z.marca)?[v]:ie(z.marca):[],ze=z.distrito&&z.distrito!==`Todos`?l[z.distrito]:[],K=g===`imovel`?`#2ac1b4`:`#3ecf8e`,Be=`#071326`,Ve=g===`imovel`?`rgba(42,193,180,.18)`:`rgba(62,207,142,.18)`,He=Ee?!F:!L,q=[z.precoMin&&`Desde ${$(z.precoMin)} EUR`,z.precoMax&&`Até ${$(z.precoMax)} EUR`,z.distrito!==`Todos`&&z.distrito,z.cidade,z.marca,z.modelo,...(z.tiposImovel||[]).map(e=>ot.find(t=>t.value===e)?.label||e),...z.tipologias,...z.combustiveis,...z.transmissao,...(z.tipoVeiculo||[]).map(e=>lt.find(t=>t.value===e)?.label||e),z.anoMin&&`Ano desde ${z.anoMin}`,z.anoMax&&`Ano até ${z.anoMax}`,z.kmMax&&`Até ${$(z.kmMax)} km`,z.potenciaMin&&`Desde ${z.potenciaMin} cv`,z.potenciaMax&&`Até ${z.potenciaMax} cv`,z.areaMin&&`Desde ${$(z.areaMin)} m²`,z.quartosMin&&`${z.quartosMin}+ quartos`,z.garantia&&`Com garantia`,z.aceitaRetoma&&`Aceita retoma`,z.garagem&&`Com garagem`,z.tipoAnunciante===`profissional`&&`Profissional`,z.tipoAnunciante===`particular`&&`Particular`,M.trim()&&`"${M.trim()}"`].filter(Boolean),Ue=()=>{let e={tipo:g,precoMin:``,precoMax:``,distrito:`Todos`,cidade:``,marca:``,modelo:``,tiposImovel:[],tipologias:[],combustiveis:[],transmissao:[],tipoVeiculo:[],anoMin:``,anoMax:``,kmMax:``,potenciaMin:``,potenciaMax:``,areaMin:``,quartosMin:``,garantia:!1,aceitaRetoma:!1,garagem:!1,tipoAnunciante:``};H.current=e,B(e),Se(``),U.current=``,P(!1),O([]),V.current=1,setTimeout(()=>{W(1,!1,g)},50)},We=g===`carro`?`Marca, modelo, distrito ou palavra-chave...`:`Tipologia, cidade, característica ou palavra-chave...`,Ge=(0,b.useMemo)(()=>{let e=[];return g===`carro`?(y.forEach(t=>{e.push({label:t,detail:`Marca automóvel`,patch:{marca:t,modelo:``}}),ie(t).forEach(n=>{let r=ft(n);r&&e.push({label:`${t} ${re(r,`modelo`)}`,detail:`Modelo automóvel`,patch:{marca:t,modelo:r}})})}),e.push({label:`Outra marca`,detail:`Marca fora da lista`,patch:{marca:v,modelo:``}})):(ot.forEach(t=>e.push({label:t.label,detail:`Tipo de imóvel`,patch:{tiposImovel:[t.value]}})),at.forEach(t=>e.push({label:t,detail:`Tipologia`,patch:{tipologias:[t]}}))),u.forEach(t=>{e.push({label:t,detail:`Distrito`,patch:{distrito:t,cidade:``}}),(l[t]||[]).forEach(n=>{e.push({label:n,detail:`${t} · cidade`,patch:{distrito:t,cidade:n}})})}),e},[g]),Ke=(0,b.useMemo)(()=>new it(Ge,{keys:[`label`,`detail`],threshold:.3,ignoreLocation:!0,minMatchCharLength:2}),[Ge]),qe=(0,b.useMemo)(()=>{let e=M.trim();return e.length<2?[]:Ke.search(e).slice(0,7).map(e=>e.item)},[Ke,M]),J=(0,b.useCallback)((e,t=``)=>{let n={...H.current,...e,tipo:g};H.current=n,U.current=t,B(n),Se(t),we(!1),P(!1),O([]),V.current=1,setTimeout(()=>{W(1,!1,g)},50)},[W,g]),Je=(0,b.useCallback)(e=>{let t={},n=M;e===`"${M.trim()}"`&&(n=``),e===(z.precoMin&&`Desde ${$(z.precoMin)} EUR`)&&(t.precoMin=``),e===(z.precoMax&&`Até ${$(z.precoMax)} EUR`)&&(t.precoMax=``),e===z.distrito&&(t.distrito=`Todos`,t.cidade=``),e===z.cidade&&(t.cidade=``),e===re(z.marca,`marca`)&&(t.marca=``,t.modelo=``),e===re(z.modelo,`modelo`)&&(t.modelo=``),(z.tiposImovel||[]).map(e=>ot.find(t=>t.value===e)?.label||e).includes(e)&&(t.tiposImovel=(z.tiposImovel||[]).filter(t=>(ot.find(e=>e.value===t)?.label||t)!==e)),z.tipologias.includes(e)&&(t.tipologias=z.tipologias.filter(t=>t!==e)),z.combustiveis.includes(e)&&(t.combustiveis=z.combustiveis.filter(t=>t!==e)),z.transmissao.includes(e)&&(t.transmissao=z.transmissao.filter(t=>t!==e)),(z.tipoVeiculo||[]).map(e=>lt.find(t=>t.value===e)?.label||e).includes(e)&&(t.tipoVeiculo=(z.tipoVeiculo||[]).filter(t=>(lt.find(e=>e.value===t)?.label||t)!==e)),e===(z.anoMin&&`Ano desde ${z.anoMin}`)&&(t.anoMin=``),e===(z.anoMax&&`Ano até ${z.anoMax}`)&&(t.anoMax=``),e===(z.kmMax&&`Até ${$(z.kmMax)} km`)&&(t.kmMax=``),e===(z.potenciaMin&&`Desde ${z.potenciaMin} cv`)&&(t.potenciaMin=``),e===(z.potenciaMax&&`Até ${z.potenciaMax} cv`)&&(t.potenciaMax=``),e===(z.areaMin&&`Desde ${$(z.areaMin)} m²`)&&(t.areaMin=``),e===(z.quartosMin&&`${z.quartosMin}+ quartos`)&&(t.quartosMin=``),e===`Com garantia`&&(t.garantia=!1),e===`Aceita retoma`&&(t.aceitaRetoma=!1),e===`Com garagem`&&(t.garagem=!1),(e===`Profissional`||e===`Particular`)&&(t.tipoAnunciante=``),J(t,n)},[J,z,M]),Ye=(0,b.useCallback)(e=>{J(e.patch||{},``)},[J]),Xe=Ce&&qe.length>0,Y=Number(ye||D.length||0),Ze=!k&&R===`grelha`&&Y>=3,Qe=!k&&Y>=8,$e=!k&&R===`grelha`&&Y>=6;return(0,Q.jsxs)(Q.Fragment,{children:[!t&&(0,Q.jsx)(ne,{title:g===`carro`?`Carros usados e novos em Portugal | Noxvelia`:`Imóveis para venda em Portugal | Noxvelia`,description:g===`carro`?`Pesquisa carros usados e novos em Portugal por marca, modelo, preço e localização.`:`Pesquisa apartamentos, moradias e terrenos em Portugal por tipologia, preço e localização.`,path:g===`carro`?`/carros`:`/imoveis`}),(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`style`,{children:`
        .pesquisa-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: var(--cor-texto);
          font-family: var(--nx-font-body);
        }

        .pesquisa-layout {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: clamp(20px, 2vw, 36px);
          padding: clamp(22px, 2.8vw, 46px);
          flex: 1;
          transition: padding .22s ease, gap .22s ease;
        }

        .pesquisa-layout.filters-closed {
          padding-inline: clamp(22px, 3vw, 54px);
        }

        .pesquisa-sidebar {
          width: 320px;
          flex: 0 0 320px;
          position: sticky;
          top: 92px;
          max-height: calc(100vh - 112px);
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 22px;
          border: 1px solid var(--cor-borda);
          border-radius: 22px;
          background: #ffffff;
          transition: width .24s ease, flex-basis .24s ease, padding .24s ease, opacity .18s ease, border-color .18s ease;
        }

        .pesquisa-sidebar.collapsed {
          width: 0;
          flex-basis: 0;
          min-width: 0;
          padding: 0;
          border-color: transparent;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .pesquisa-sidebar::-webkit-scrollbar { width: 6px; }
        .pesquisa-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pesquisa-sidebar::-webkit-scrollbar-thumb { background: var(--cor-borda); border-radius: 999px; }

        .pesquisa-sidebar-toggle {
          flex: 0 0 34px;
          width: 34px;
          height: 52px;
          position: sticky;
          top: 92px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--cor-borda);
          border-radius: 14px;
          background: #ffffff;
          color: var(--cor-navy);
          cursor: pointer;
          transition: border-color .18s ease, background .18s ease, transform .18s ease;
        }

        .pesquisa-sidebar-toggle:hover {
          border-color: var(--cor-navy);
          background: var(--cor-fundo-suave);
          transform: translateY(-1px);
        }

        .pesquisa-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 18px;
          margin-bottom: 18px;
          border-bottom: 1px solid var(--cor-borda);
        }

        .pesquisa-sidebar-title {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--cor-texto);
          font-size: 19px;
          font-weight: 850;
          letter-spacing: 0;
        }

        .pesquisa-sidebar-close {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 40px;
          padding: 0 12px;
          border: 1px solid var(--cor-borda);
          border-radius: 12px;
          background: #ffffff;
          color: var(--cor-navy);
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .pesquisa-filter-status {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 18px;
        }

        .pesquisa-filter-stat {
          padding: 13px 14px;
          border: 1px solid var(--cor-borda);
          border-radius: 16px;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-filter-stat strong {
          display: block;
          color: var(--cor-texto);
          font-size: 22px;
          font-weight: 900;
          line-height: 1;
        }

        .pesquisa-filter-stat span {
          display: block;
          margin-top: 6px;
          color: var(--cor-texto-secundario);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .pesquisa-filter-section {
          display: grid;
          gap: 14px;
          margin-bottom: 16px;
          padding: 16px;
          border: 1px solid var(--cor-borda);
          border-radius: 20px;
          background: #ffffff;
        }

        .pesquisa-filter-section-title,
        .pesquisa-filter-title {
          margin: 0;
          color: var(--cor-navy);
          font-size: 10px;
          font-weight: 850;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .pesquisa-filter-group {
          display: grid;
          gap: 9px;
          margin: 0;
        }

        .pesquisa-filter-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
        }

        .pesquisa-filter-input {
          width: 100%;
          min-height: 46px;
          border: 1px solid var(--cor-borda);
          border-radius: 13px;
          background: #ffffff;
          color: var(--cor-texto);
          padding: 0 13px;
          font-size: 13px;
          font-weight: 600;
          outline: none;
          transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }

        .pesquisa-filter-input:focus {
          border-color: ${K};
          box-shadow: 0 0 0 3px ${Ve};
        }

        .pesquisa-filter-input:disabled {
          color: #98a5b3;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pesquisa-tag {
          flex: 1 1 calc(50% - 8px);
          min-height: 38px;
          border: 1px solid var(--cor-borda);
          border-radius: 999px;
          background: #ffffff;
          color: var(--cor-texto-secundario);
          padding: 0 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color .18s ease, background .18s ease, color .18s ease, transform .18s ease;
        }

        .pesquisa-tag:hover {
          border-color: var(--cor-navy);
          color: var(--cor-texto);
        }

        .pesquisa-tag.active {
          border-color: ${K};
          background: ${K};
          color: ${Be};
        }

        .pesquisa-apply-btn {
          width: 100%;
          min-height: 50px;
          border: 1px solid var(--cor-navy);
          border-radius: 15px;
          background: var(--cor-navy);
          color: #ffffff;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          letter-spacing: .02em;
          transition: background .18s ease, transform .18s ease;
        }

        .pesquisa-apply-btn:hover {
          background: #071f38;
          transform: translateY(-1px);
        }

        .pesquisa-main-content {
          flex: 1 1 auto;
          min-width: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .pesquisa-search-row {
          width: 100%;
          display: flex;
          align-items: stretch;
          gap: 12px;
          margin-bottom: 22px;
        }

        .pesquisa-search-composer {
          position: relative;
          min-width: 0;
          flex: 1;
        }

        .pesquisa-omnibar-wrapper {
          min-height: 64px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--cor-borda);
          border-radius: 18px;
          background: #ffffff;
          padding: 0 20px;
          transition: border-color .18s ease, box-shadow .18s ease;
        }

        .pesquisa-omnibar-wrapper:focus-within {
          border-color: ${K};
          box-shadow: 0 0 0 3px ${Ve};
        }

        .pesquisa-omnibar-wrapper input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          color: var(--cor-texto);
          padding: 0;
          font-size: 16px;
          font-weight: 500;
          outline: none;
        }

        .pesquisa-omnibar-wrapper input::placeholder { color: #8998a7; }

        .pesquisa-input-clear {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: var(--cor-texto-secundario);
          cursor: pointer;
        }

        .pesquisa-input-clear:hover {
          background: var(--cor-fundo-suave);
          color: var(--cor-texto);
        }

        .pesquisa-suggestions {
          position: absolute;
          z-index: 30;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          display: grid;
          gap: 6px;
          padding: 8px;
          border: 1px solid var(--cor-borda);
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 22px 52px -36px rgba(7,19,38,.42);
        }

        .pesquisa-suggestion {
          width: 100%;
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 12px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: var(--cor-texto);
          cursor: pointer;
          text-align: left;
        }

        .pesquisa-suggestion:hover { background: var(--cor-fundo-suave); }
        .pesquisa-suggestion span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 800; }
        .pesquisa-suggestion em { flex-shrink: 0; color: var(--cor-texto-secundario); font-size: 11px; font-style: normal; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }

        .pesquisa-mobile-filter-btn {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
          border: 1px solid var(--cor-borda);
          border-radius: 15px;
          background: #ffffff;
          color: var(--cor-navy);
          padding: 0 16px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .pesquisa-active-row {
          min-height: 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin: -8px 0 20px;
        }

        .pesquisa-active-chip,
        .pesquisa-clear-btn,
        .pesquisa-results-count {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 34px;
          border: 1px solid var(--cor-borda);
          border-radius: 999px;
          background: #ffffff;
          color: var(--cor-navy);
          padding: 0 12px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .pesquisa-active-chip {
          background: ${Ve};
          border-color: ${K};
        }

        .pesquisa-active-chip.is-removable,
        .pesquisa-clear-btn { cursor: pointer; }

        .pesquisa-active-chip.is-removable:hover,
        .pesquisa-clear-btn:hover {
          border-color: var(--cor-navy);
          background: var(--cor-fundo-suave);
        }

        .pesquisa-active-chip span {
          min-width: 0;
          max-width: 230px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pesquisa-topbar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 22px;
          padding: 12px;
          border: 1px solid var(--cor-borda);
          border-radius: 18px;
          background: #ffffff;
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
          gap: 5px;
          padding: 5px;
          border: 1px solid var(--cor-borda);
          border-radius: 15px;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-view-switch button {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 11px;
          background: transparent;
          color: var(--cor-texto-secundario);
          padding: 0 14px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: background .18s ease, color .18s ease;
        }

        .pesquisa-view-switch button:hover { color: var(--cor-texto); }
        .pesquisa-view-switch button.active { background: ${K}; color: ${Be}; }

        .pesquisa-sort {
          min-height: 48px;
          border: 1px solid var(--cor-borda);
          border-radius: 14px;
          background: #ffffff;
          color: var(--cor-texto);
          padding: 0 40px 0 14px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          outline: none;
        }

        .pesquisa-grid,
        .pesquisa-skeleton-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 238px), 1fr));
          gap: clamp(16px, 1.7vw, 28px);
          align-items: start;
        }

        .pesquisa-layout.filters-closed .pesquisa-grid,
        .pesquisa-layout.filters-closed .pesquisa-skeleton-grid {
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 232px), 1fr));
        }

        .pesquisa-grid .nxc-wrap {
          max-width: 330px;
        }

        .pesquisa-grid .nx-ad-banner-card,
        .pesquisa-grid .nx-ad-slot-card,
        .pesquisa-top-ad,
        .pesquisa-inline-ad,
        .pesquisa-bottom-ad {
          grid-column: 1 / -1;
        }

        .pesquisa-skeleton-card {
          min-height: 330px;
          border: 1px solid var(--cor-borda);
          border-radius: 20px;
          background: linear-gradient(110deg, #ffffff 0%, var(--cor-fundo-suave) 44%, #ffffff 76%);
          background-size: 220% 100%;
          animation: pesquisaSkeleton 1.3s ease-in-out infinite;
        }

        @keyframes pesquisaSkeleton { from { background-position: 180% 0; } to { background-position: -40% 0; } }

        .pesquisa-map-shell {
          position: relative;
          height: min(760px, calc(100vh - 220px));
          min-height: 540px;
          overflow: hidden;
          border: 1px solid var(--cor-borda);
          border-radius: 22px;
          background: var(--cor-fundo-suave);
        }

        .pesquisa-map-empty {
          position: absolute;
          left: 50%;
          top: 18px;
          transform: translateX(-50%);
          z-index: 500;
          border-radius: 999px;
          background: var(--cor-navy);
          color: #ffffff;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 800;
        }

        .pesquisa-map-loading {
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--cor-fundo-suave);
          color: var(--cor-texto-secundario);
          font-size: 13px;
          font-weight: 800;
        }

        .sidebar-mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(7,19,38,.28);
        }

        .pesquisa-empty {
          text-align: center;
          padding: 100px 20px;
          color: var(--cor-texto-secundario);
        }

        .pesquisa-empty-action {
          margin-top: 18px;
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--cor-navy);
          border-radius: 14px;
          background: var(--cor-navy);
          color: #ffffff;
          padding: 0 18px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
        }

        .infinite-spinner-container {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 42px 0;
          color: var(--cor-texto-secundario);
          font-size: 13px;
          font-weight: 650;
        }

        .infinite-dot-pulse { width: 6px; height: 6px; background: var(--cor-texto-secundario); border-radius: 50%; display: inline-block; animation: pulse .6s infinite alternate; }
        .infinite-dot-pulse:nth-child(2) { animation-delay: .2s; }
        .infinite-dot-pulse:nth-child(3) { animation-delay: .4s; }
        @keyframes pulse { from { opacity: .25; transform: scale(.8); } to { opacity: 1; transform: scale(1.2); } }

        @media (max-width: 1024px) {
          .pesquisa-layout { padding: 18px 12px 34px; flex-direction: column; gap: 14px; }
          .pesquisa-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: min(88vw, 380px);
            max-width: 380px;
            height: 100dvh;
            max-height: 100dvh;
            z-index: 9999;
            border-radius: 0 18px 18px 0;
            transform: ${F?`translateX(0)`:`translateX(-105%)`};
            transition: transform .24s ease;
          }
          .pesquisa-sidebar.collapsed { width: min(88vw, 380px); flex-basis: auto; padding: 22px; border: 1px solid var(--cor-borda); opacity: 1; pointer-events: auto; }
          .pesquisa-sidebar-header { position: sticky; top: -22px; z-index: 2; margin: -22px -22px 18px; padding: 16px 18px; background: #ffffff; }
          .pesquisa-sidebar-close { display: inline-flex; }
          .pesquisa-apply-btn { position: sticky; bottom: -22px; z-index: 2; margin: 18px -22px -22px; width: calc(100% + 44px); border-radius: 0; min-height: 56px; }
          .sidebar-mobile-overlay { display: ${F?`block`:`none`}; }
          .pesquisa-sidebar-toggle { display: none; }
          .pesquisa-mobile-filter-btn { display: inline-flex; }
          .pesquisa-main-content { width: 100%; }
        }

        @media (max-width: 640px) {
          .pesquisa-layout { padding: 14px 10px 30px; }
          .pesquisa-search-row { display: grid; grid-template-columns: 1fr; }
          .pesquisa-omnibar-wrapper { min-height: 58px; padding-inline: 16px; }
          .pesquisa-topbar { align-items: stretch; }
          .pesquisa-results-count { justify-content: center; width: 100%; }
          .pesquisa-view-tools { width: 100%; display: grid; grid-template-columns: 1fr; }
          .pesquisa-view-switch { width: 100%; }
          .pesquisa-view-switch button { flex: 1; }
          .pesquisa-sort { width: 100%; }
          .pesquisa-grid, .pesquisa-skeleton-grid { grid-template-columns: repeat(auto-fill, minmax(min(100%, 172px), 1fr)); gap: 14px; }
          .pesquisa-grid .nxc-wrap { max-width: none; }
          .pesquisa-map-shell { height: calc(100vh - 210px); min-height: 420px; border-radius: 18px; }
        }
      `}),(0,Q.jsxs)(`div`,{className:`pesquisa-root is-${g}`,children:[(0,Q.jsx)(`div`,{className:`sidebar-mobile-overlay`,onClick:()=>I(!1),"aria-hidden":`true`}),(0,Q.jsxs)(`div`,{className:`pesquisa-layout vista-${R} ${L?`filters-open`:`filters-closed`}`,children:[(0,Q.jsxs)(`aside`,{className:`pesquisa-sidebar${L?``:` collapsed`}`,role:F?`dialog`:void 0,"aria-label":`Filtros de pesquisa`,"aria-modal":F?`true`:void 0,"aria-hidden":He,inert:He?``:void 0,children:[(0,Q.jsxs)(`div`,{className:`pesquisa-sidebar-header`,children:[(0,Q.jsxs)(`span`,{className:`pesquisa-sidebar-title`,children:[(0,Q.jsx)(Z.Icon,{path:p,size:1}),` Filtros`]}),(0,Q.jsxs)(`button`,{type:`button`,className:`pesquisa-sidebar-close`,onClick:()=>I(!1),"aria-label":`Fechar filtros`,children:[(0,Q.jsx)(Z.Icon,{path:f,size:.85}),` Fechar`]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-status`,"aria-label":`Resumo dos filtros`,children:[(0,Q.jsxs)(`div`,{className:`pesquisa-filter-stat`,children:[(0,Q.jsx)(`strong`,{children:q.length}),(0,Q.jsx)(`span`,{children:`ativos`})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-stat`,children:[(0,Q.jsx)(`strong`,{children:k&&D.length===0?`...`:ye}),(0,Q.jsx)(`span`,{children:`anúncios`})]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-section`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-section-title`,children:`Preço e localização`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Orçamento (€)`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,Q.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Mínimo`,value:z.precoMin,onChange:e=>B(t=>({...t,precoMin:e.target.value}))}),(0,Q.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Máximo`,value:z.precoMax,onChange:e=>B(t=>({...t,precoMax:e.target.value}))})]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Distrito / Região`}),(0,Q.jsxs)(`select`,{className:`pesquisa-filter-input`,value:z.distrito,onChange:e=>B(t=>({...t,distrito:e.target.value,cidade:``})),children:[(0,Q.jsx)(`option`,{value:`Todos`,children:`Portugal inteiro`}),u.map(e=>(0,Q.jsx)(`option`,{value:e,children:e},e))]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Cidade / Concelho`}),(0,Q.jsxs)(`select`,{className:`pesquisa-filter-input`,value:z.cidade,onChange:e=>B(t=>({...t,cidade:e.target.value})),disabled:!z.distrito||z.distrito===`Todos`,children:[(0,Q.jsx)(`option`,{value:``,children:z.distrito&&z.distrito!==`Todos`?`Todas as cidades`:`Escolhe primeiro o distrito`}),ze.map(e=>(0,Q.jsx)(`option`,{value:e,children:e},e))]})]})]}),g===`carro`?(0,Q.jsxs)(`div`,{className:`pesquisa-filter-section`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-section-title`,children:`Automóvel`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Marca`}),(0,Q.jsxs)(`select`,{className:`pesquisa-filter-input`,value:z.marca,onChange:e=>B(t=>({...t,marca:e.target.value,modelo:``})),children:[(0,Q.jsx)(`option`,{value:``,children:`Todas as marcas`}),y.map(e=>(0,Q.jsx)(`option`,{value:e,children:e},e)),(0,Q.jsx)(`option`,{value:v,children:`Outra marca`})]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Modelo`}),(0,Q.jsxs)(`select`,{className:`pesquisa-filter-input`,value:z.modelo,onChange:e=>B(t=>({...t,modelo:e.target.value})),disabled:!z.marca,children:[(0,Q.jsx)(`option`,{value:``,children:z.marca?`Todos os modelos`:`Escolhe primeiro a marca`}),Re.map((e,t)=>{let n=typeof e==`object`?e.modelo||e.nome||``:e;return(0,Q.jsx)(`option`,{value:n,children:re(n,`modelo`)},`mod-${t}`)})]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Ano`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,Q.jsx)(`input`,{type:`number`,min:`1930`,className:`pesquisa-filter-input`,placeholder:`Desde`,value:z.anoMin,onChange:e=>B(t=>({...t,anoMin:e.target.value}))}),(0,Q.jsx)(`input`,{type:`number`,min:`1930`,className:`pesquisa-filter-input`,placeholder:`Até`,value:z.anoMax,onChange:e=>B(t=>({...t,anoMax:e.target.value}))})]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Quilómetros máximos`}),(0,Q.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Ex: 80000`,value:z.kmMax,onChange:e=>B(t=>({...t,kmMax:e.target.value}))})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Potência (cv)`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,Q.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Mínima`,value:z.potenciaMin,onChange:e=>B(t=>({...t,potenciaMin:e.target.value}))}),(0,Q.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Máxima`,value:z.potenciaMax,onChange:e=>B(t=>({...t,potenciaMax:e.target.value}))})]})]}),`                `,(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Combustível`}),(0,Q.jsx)(`div`,{className:`pesquisa-tags`,children:st.map(e=>(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.combustiveis.includes(e)?`active`:``}`,onClick:()=>G(`combustiveis`,e),children:e},e))})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipo de veículo`}),(0,Q.jsx)(`div`,{className:`pesquisa-tags`,children:lt.map(e=>(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.tipoVeiculo.includes(e.value)?`active`:``}`,onClick:()=>G(`tipoVeiculo`,e.value),children:e.label},e.value))})]}),`                `,(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Caixa / Transmissão`}),(0,Q.jsx)(`div`,{className:`pesquisa-tags`,children:ct.map(e=>(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.transmissao.includes(e)?`active`:``}`,onClick:()=>G(`transmissao`,e),children:e},e))})]})]}):(0,Q.jsxs)(`div`,{className:`pesquisa-filter-section`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-section-title`,children:`Imóvel`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipo de imóvel`}),(0,Q.jsx)(`div`,{className:`pesquisa-tags`,children:ot.map(e=>(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${(z.tiposImovel||[]).includes(e.value)?`active`:``}`,onClick:()=>G(`tiposImovel`,e.value),children:e.label},e.value))})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Tipologias disponíveis`}),(0,Q.jsx)(`div`,{className:`pesquisa-tags`,children:at.map(e=>(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.tipologias.includes(e)?`active`:``}`,onClick:()=>G(`tipologias`,e),children:e},e))})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Área e quartos`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-grid-2`,children:[(0,Q.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Área mín.`,value:z.areaMin,onChange:e=>B(t=>({...t,areaMin:e.target.value}))}),(0,Q.jsx)(`input`,{type:`number`,min:`0`,className:`pesquisa-filter-input`,placeholder:`Quartos mín.`,value:z.quartosMin,onChange:e=>B(t=>({...t,quartosMin:e.target.value}))})]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Características`}),(0,Q.jsx)(`div`,{className:`pesquisa-tags`,children:(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.garagem?`active`:``}`,onClick:()=>B(e=>({...e,garagem:!e.garagem})),children:`Garagem`})})]})]}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-section`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-section-title`,children:`Confiança`}),(0,Q.jsxs)(`div`,{className:`pesquisa-filter-group`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-filter-title`,children:`Anunciante`}),(0,Q.jsxs)(`div`,{className:`pesquisa-tags`,children:[(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.garantia?`active`:``}`,onClick:()=>B(e=>({...e,garantia:!e.garantia})),children:`Com garantia`}),g===`carro`&&(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.aceitaRetoma?`active`:``}`,onClick:()=>B(e=>({...e,aceitaRetoma:!e.aceitaRetoma})),children:`Aceita retoma`}),(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.tipoAnunciante===`profissional`?`active`:``}`,onClick:()=>B(e=>({...e,tipoAnunciante:e.tipoAnunciante===`profissional`?``:`profissional`})),children:`Profissional`}),(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-tag ${z.tipoAnunciante===`particular`?`active`:``}`,onClick:()=>B(e=>({...e,tipoAnunciante:e.tipoAnunciante===`particular`?``:`particular`})),children:`Particular`})]})]})]}),(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-apply-btn`,onClick:Le,children:`Aplicar Filtros`})]}),(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-sidebar-toggle`,onClick:()=>Te(e=>!e),title:L?`Ocultar filtros`:`Mostrar filtros`,"aria-label":L?`Ocultar filtros`:`Mostrar filtros`,"aria-expanded":L,children:(0,Q.jsx)(Z.Icon,{path:L?h:d,size:.9})}),(0,Q.jsxs)(`main`,{className:`pesquisa-main-content`,children:[(0,Q.jsxs)(`div`,{className:`pesquisa-search-row`,children:[(0,Q.jsxs)(`button`,{type:`button`,className:`pesquisa-mobile-filter-btn`,onClick:()=>I(!0),children:[(0,Q.jsx)(Z.Icon,{path:p,size:.8}),`Filtros`]}),(0,Q.jsxs)(`div`,{className:`pesquisa-search-composer`,children:[(0,Q.jsxs)(`div`,{className:`pesquisa-omnibar-wrapper`,children:[(0,Q.jsx)(Z.Icon,{path:te,size:.9,color:`var(--nx-text-sub)`,style:{marginRight:`12px`}}),(0,Q.jsx)(`input`,{type:`text`,placeholder:We,value:M,onFocus:()=>we(!0),onBlur:()=>setTimeout(()=>we(!1),140),onKeyDown:e=>{e.key===`Enter`&&J({},e.currentTarget.value)},onChange:e=>Se(e.target.value)}),M&&!k&&(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-input-clear`,onMouseDown:e=>e.preventDefault(),onClick:()=>J({},``),"aria-label":`Limpar pesquisa`,children:(0,Q.jsx)(Z.Icon,{path:`M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z`,size:.7})}),k&&(0,Q.jsx)(Z.Icon,{path:`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,size:.9,color:K,className:`animate-spin`})]}),Xe&&(0,Q.jsx)(`div`,{className:`pesquisa-suggestions`,role:`listbox`,"aria-label":`Sugestões de pesquisa`,children:qe.map(e=>(0,Q.jsxs)(`button`,{type:`button`,className:`pesquisa-suggestion`,onMouseDown:e=>e.preventDefault(),onClick:()=>Ye(e),children:[(0,Q.jsx)(`span`,{children:e.label}),(0,Q.jsx)(`em`,{children:e.detail})]},`${e.detail}-${e.label}`))})]})]}),q.length>0&&(0,Q.jsxs)(`div`,{className:`pesquisa-active-row`,children:[q.slice(0,7).map(e=>(0,Q.jsxs)(`button`,{type:`button`,className:`pesquisa-active-chip is-removable`,onClick:()=>Je(e),title:`Remover ${e}`,children:[(0,Q.jsx)(Z.Icon,{path:`M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9`,size:.55}),` `,(0,Q.jsx)(`span`,{children:e}),(0,Q.jsx)(Z.Icon,{path:`M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z`,size:.56})]},e)),q.length>7&&(0,Q.jsxs)(`span`,{className:`pesquisa-active-chip`,children:[`+`,q.length-7]}),(0,Q.jsxs)(`button`,{type:`button`,className:`pesquisa-clear-btn`,onClick:Ue,children:[(0,Q.jsx)(Z.Icon,{path:`M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z`,size:.6}),` Limpar`]})]}),A&&(0,Q.jsx)(`div`,{style:{color:`#92400e`,padding:`16px`,background:`rgba(245, 158, 11, 0.1)`,borderRadius:`8px`,fontSize:`14px`,fontWeight:600,border:`1px solid rgba(245, 158, 11, 0.22)`,marginBottom:`24px`},children:A}),(0,Q.jsxs)(`div`,{className:`pesquisa-topbar`,children:[(0,Q.jsx)(`div`,{className:`pesquisa-results-count`,children:k&&D.length===0?`A procurar...`:`${ye} anúncios`}),(0,Q.jsxs)(`div`,{className:`pesquisa-view-tools`,children:[(0,Q.jsxs)(`div`,{className:`pesquisa-view-switch`,"aria-label":`Alternar vista`,children:[(0,Q.jsxs)(`button`,{type:`button`,className:R===`grelha`?`active`:``,onClick:()=>Oe(`grelha`),children:[(0,Q.jsx)(Z.Icon,{path:m,size:.72}),` Grelha`]}),(0,Q.jsxs)(`button`,{type:`button`,className:R===`mapa`?`active`:``,onClick:()=>Oe(`mapa`),children:[(0,Q.jsx)(Z.Icon,{path:ee,size:.72}),` Mapa`]})]}),(0,Q.jsxs)(`select`,{className:`pesquisa-sort`,value:j,onChange:e=>xe(e.target.value),children:[(0,Q.jsx)(`option`,{value:`relevancia`,style:{background:`var(--nx-bg-2)`},children:`Relevância`}),(0,Q.jsx)(`option`,{value:`recentes`,style:{background:`var(--nx-bg-2)`},children:`Mais recentes`}),(0,Q.jsx)(`option`,{value:`preco_asc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais baixo`}),(0,Q.jsx)(`option`,{value:`preco_desc`,style:{background:`var(--nx-bg-2)`},children:`Preço: Mais alto`}),g===`carro`&&(0,Q.jsx)(`option`,{value:`ano_desc`,style:{background:`var(--nx-bg-2)`},children:`Ano: mais recente`}),g===`carro`&&(0,Q.jsx)(`option`,{value:`km_asc`,style:{background:`var(--nx-bg-2)`},children:`Km: menor primeiro`}),(0,Q.jsx)(`option`,{value:`qualidade_desc`,style:{background:`var(--nx-bg-2)`},children:`Anúncio mais completo`})]})]})]}),Ze&&(0,Q.jsx)(oe,{mode:`direct`,placement:g===`carro`?`listagem_topo_carros`:`listagem_topo_imoveis`,adsensePlacement:`listing_top`,vertical:g,className:`pesquisa-top-ad`,minHeight:116,mobileMinHeight:72}),R===`mapa`?(0,Q.jsxs)(`div`,{className:`pesquisa-map-shell`,children:[(0,Q.jsx)(b.Suspense,{fallback:(0,Q.jsx)(`div`,{className:`pesquisa-map-loading`,children:`A carregar mapa...`}),children:(0,Q.jsx)(ut,{anuncios:pe,tipo:g})}),pe.length===0&&!k&&(0,Q.jsx)(`div`,{className:`pesquisa-map-empty`,children:`Os anúncios encontrados ainda não têm localização suficiente para aparecer no mapa.`})]}):k&&D.length===0?(0,Q.jsx)(`div`,{className:`pesquisa-skeleton-grid`,"aria-label":`A carregar anúncios`,children:Array.from({length:6}).map((e,t)=>(0,Q.jsx)(`div`,{className:`pesquisa-skeleton-card`},t))}):(0,Q.jsxs)(`div`,{className:`pesquisa-grid`,children:[D.map((e,t)=>(0,Q.jsxs)(b.Fragment,{children:[(0,Q.jsx)(ae,{anuncio:e,showStatus:!1}),Qe&&(t+1)%6==0&&t<D.length-1&&(0,Q.jsx)(oe,{mode:`direct`,placement:g===`carro`?`feed_pesquisa_carros`:`feed_pesquisa_imoveis`,adsensePlacement:`search_results_inline`,vertical:g,variant:`inline`,className:`pesquisa-inline-ad`,minHeight:104,mobileMinHeight:66})]},e._id)),N&&!k&&D.length>0&&(0,Q.jsxs)(`div`,{ref:ke,className:`infinite-spinner-container`,children:[(0,Q.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,Q.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,Q.jsx)(`div`,{className:`infinite-dot-pulse`})]})]}),$e&&(0,Q.jsx)(oe,{mode:`direct`,placement:g===`carro`?`listagem_fundo_carros`:`listagem_fundo_imoveis`,adsensePlacement:`listing_bottom`,vertical:g,className:`pesquisa-bottom-ad`,minHeight:110,mobileMinHeight:70}),R===`grelha`&&ge&&(0,Q.jsxs)(`div`,{className:`infinite-spinner-container`,style:{marginTop:`24px`},children:[(0,Q.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,Q.jsx)(`div`,{className:`infinite-dot-pulse`}),(0,Q.jsx)(`div`,{className:`infinite-dot-pulse`})]}),R===`grelha`&&!k&&D.length===0&&(0,Q.jsxs)(`div`,{className:`pesquisa-empty`,children:[(0,Q.jsx)(`div`,{style:{fontSize:`32px`,color:`var(--nx-text-muted)`,marginBottom:`16px`},children:`∅`}),(0,Q.jsx)(`h3`,{style:{fontFamily:`var(--nx-font-display)`,fontSize:`18px`,fontWeight:700,color:`var(--nx-text)`,margin:`0 0 8px 0`},children:A?`Pesquisa temporariamente indisponível`:g===`carro`?`Não encontrámos carros com estes filtros`:`Não encontrámos imóveis com estes filtros`}),(0,Q.jsx)(`p`,{style:{fontSize:`14px`,margin:0},children:A?`Tenta novamente daqui a instantes.`:q.length>0?`Ajusta a marca, localização ou preço para veres mais opções.`:`Podes voltar mais tarde ou publicar uma oferta nesta categoria.`}),A?(0,Q.jsx)(`button`,{type:`button`,className:`pesquisa-empty-action`,onClick:()=>W(1,!1,g),children:`Tentar novamente`}):(0,Q.jsx)(s,{to:`/publicar`,state:fe,className:`pesquisa-empty-action`,children:`Criar anúncio`})]})]})]})]})]})]})}export{pt as t};