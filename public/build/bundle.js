var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c,a;function l(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}function i(t){let e;return l(t,(t=>e=t))(),e}function u(t,e,n){t.$$.on_destroy.push(l(e,n))}function f(t,e,n){return t.set(n),e}function d(t,e){t.appendChild(e)}function m(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function g(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function $(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function y(){return h(" ")}function v(){return h("")}function k(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function w(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function x(t,e){t.value=null==e?"":e}function _(t,e,n,s){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,s?"important":"")}function S(t){a=t}function T(){if(!a)throw new Error("Function called outside component initialization");return a}const C=[],j=[],E=[],P=[],D=Promise.resolve();let L=!1;function N(t){E.push(t)}const q=new Set;let A=0;function O(){const t=a;do{for(;A<C.length;){const t=C[A];A++,S(t),R(t.$$)}for(S(null),C.length=0,A=0;j.length;)j.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];q.has(e)||(q.add(e),e())}E.length=0}while(C.length);for(;P.length;)P.pop()();L=!1,q.clear(),S(t)}function R(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const K=new Set;let I;function U(){I={r:0,c:[],p:I}}function z(){I.r||s(I.c),I=I.p}function B(t,e){t&&t.i&&(K.delete(t),t.i(e))}function J(t,e,n,s){if(t&&t.o){if(K.has(t))return;K.add(t),I.c.push((()=>{K.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}const M="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function G(t){t&&t.c()}function H(t,n,o,c){const{fragment:a,on_mount:l,on_destroy:i,after_update:u}=t.$$;a&&a.m(n,o),c||N((()=>{const n=l.map(e).filter(r);i?i.push(...n):s(n),t.$$.on_mount=[]})),u.forEach(N)}function F(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function W(t,e){-1===t.$$.dirty[0]&&(C.push(t),L||(L=!0,D.then(O)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(e,r,o,c,l,i,u,f=[-1]){const d=a;S(e);const m=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:r.target||d.$$.root};u&&u(m.root);let g=!1;if(m.ctx=o?o(e,r.props||{},((t,n,...s)=>{const r=s.length?s[0]:n;return m.ctx&&l(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),g&&W(e,t)),n})):[],m.update(),g=!0,s(m.before_update),m.fragment=!!c&&c(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(p)}else m.fragment&&m.fragment.c();r.intro&&B(e.$$.fragment),H(e,r.target,r.anchor,r.customElement),O()}S(d)}class V{$destroy(){F(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const X="lecker";function Y(e){let n,s;return{c(){n=$("span"),s=h(e[0]),w(n,"class","svelte-lo467y")},m(t,e){m(t,n,e),d(n,s)},p(t,[e]){1&e&&b(s,t[0])},i:t,o:t,d(t){t&&p(n)}}}function Z(t,e,n){let{key:s=""}=e;return t.$$set=t=>{"key"in t&&n(0,s=t.key)},[s]}class tt extends V{constructor(t){super(),Q(this,t,Z,Y,o,{key:0})}}const{window:et}=M;function nt(e){let n,s,r,o,c,a,l,i,u,f,g,v,b,x,_,S,T,C,j,E,P,D,L,N,q,A,O,R,K,I,U,z,M,W,Q,V,X;return j=new tt({props:{key:"A"}}),P=new tt({props:{key:"ENTER"}}),I=new tt({props:{key:"G"}}),W=new tt({props:{key:"S"}}),{c(){n=$("div"),s=$("div"),r=$("h1"),r.textContent="LECKER",o=y(),c=$("p"),c.innerHTML='<i class="svelte-161fvmf">lécka</i> • German • Adjetive',a=y(),l=$("p"),l.textContent="yummy, delicious",i=y(),u=$("hr"),f=y(),g=$("p"),g.innerHTML="Lecker is a <strong>keyboard-only</strong> music player, yes, your mouse / trackpad won&#39;t help you here.",v=y(),b=$("p"),b.innerHTML="It uses <strong>Spotify</strong>, so you&#39;ll need a <strong>Premium</strong> account.",x=y(),_=$("hr"),S=y(),T=$("p"),C=h("Press "),G(j.$$.fragment),E=h(" or "),G(P.$$.fragment),D=h(" to authorize the app and start listening!"),L=y(),N=$("hr"),q=y(),A=$("p"),O=h("Source code available on "),R=$("strong"),R.textContent="Github",K=y(),G(I.$$.fragment),U=y(),z=$("p"),M=h("Made for fun by @sucufruli "),G(W.$$.fragment),w(r,"class","svelte-161fvmf"),w(c,"class","definition svelte-161fvmf"),w(l,"class","examples svelte-161fvmf"),w(u,"class","svelte-161fvmf"),w(g,"class","body svelte-161fvmf"),w(b,"class","body svelte-161fvmf"),w(_,"class","svelte-161fvmf"),w(T,"class","svelte-161fvmf"),w(N,"class","svelte-161fvmf"),w(A,"class","body-secondary svelte-161fvmf"),w(z,"class","body-secondary svelte-161fvmf"),w(s,"class","card svelte-161fvmf"),w(n,"class","container svelte-161fvmf")},m(t,p){m(t,n,p),d(n,s),d(s,r),d(s,o),d(s,c),d(s,a),d(s,l),d(s,i),d(s,u),d(s,f),d(s,g),d(s,v),d(s,b),d(s,x),d(s,_),d(s,S),d(s,T),d(T,C),H(j,T,null),d(T,E),H(P,T,null),d(T,D),d(s,L),d(s,N),d(s,q),d(s,A),d(A,O),d(A,R),d(A,K),H(I,A,null),d(s,U),d(s,z),d(z,M),H(W,z,null),Q=!0,V||(X=k(et,"keydown",e[0]),V=!0)},p:t,i(t){Q||(B(j.$$.fragment,t),B(P.$$.fragment,t),B(I.$$.fragment,t),B(W.$$.fragment,t),Q=!0)},o(t){J(j.$$.fragment,t),J(P.$$.fragment,t),J(I.$$.fragment,t),J(W.$$.fragment,t),Q=!1},d(t){t&&p(n),F(j),F(P),F(I),F(W),V=!1,X()}}}function st(t){return[t=>{switch(t.code){case"KeyA":case"Enter":t.preventDefault();const e=`https://accounts.spotify.com/authorize?client_id=6619b58643b74163b1fbfbc49f2b81b4&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=${encodeURIComponent("streaming user-read-email user-read-private user-library-read user-library-modify")}`;window.location=e;break;case"KeyG":t.preventDefault(),window.open("https://github.com/emiprandi/lecker");break;case"KeyS":t.preventDefault(),window.open("https://twitter.com/sucufruli")}}]}class rt extends V{constructor(t){super(),Q(this,t,st,nt,o,{})}}const ot=t=>window.localStorage.getItem(t),ct=(t,e)=>{window.localStorage.setItem(t,e)};function at(t){return new URLSearchParams(window.location.search).get(t)}const lt=()=>!!at("code")||!!ot(X),it=(t,e)=>t.find((t=>t.width===e)).url;const ut=[];function ft(e,n=t){let s;const r=new Set;function c(t){if(o(e,t)&&(e=t,s)){const t=!ut.length;for(const t of r)t[1](),ut.push(t,e);if(t){for(let t=0;t<ut.length;t+=2)ut[t][0](ut[t+1]);ut.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(o,a=t){const l=[o,a];return r.add(l),1===r.size&&(s=n(c)||t),o(e),()=>{r.delete(l),0===r.size&&(s(),s=null)}}}}const dt=ft(""),mt=ft();mt.subscribe((t=>{var e;t&&(e=t,ct(X,JSON.stringify(e)))}));const pt=ft(""),gt=ft([]),$t=ft(),ht=ft(0);function yt(t){var e;return e=async()=>{const t=at("code");if(t){const e=await function(t){return fetch("/api/get-token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t})}).then((t=>t.json()))}(t);mt.set(e),window.history.replaceState(null,"","/"),dt.set("player")}else{const t=JSON.parse(ot(X)),e=await function(t){return fetch("/api/refresh-token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:t})}).then((t=>t.json()))}(t.refresh_token),n=Object.assign({},t,e);mt.set(n),dt.set("player")}},T().$$.on_mount.push(e),[]}class vt extends V{constructor(t){super(),Q(this,t,yt,null,o,{})}}const kt=async(t,e,n={})=>{const s=i(mt);n.headers={"Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`};const r=new URL(t,"https://api.spotify.com/v1/");r.search=new URLSearchParams(e).toString();const o=await fetch(r,n);return 202===o.status||204===o.status?"":await o.json()};function wt(t){let e,n,r,o,c,a,l,i,u;return n=new tt({props:{key:"S"}}),{c(){e=$("div"),G(n.$$.fragment),r=y(),o=$("input"),c=y(),a=$("div"),a.textContent="LECKER",w(o,"type","text"),w(o,"maxlength","35"),w(o,"placeholder","Search"),w(o,"class","svelte-l2wxxi"),w(e,"class","search svelte-l2wxxi"),w(a,"class","logo svelte-l2wxxi")},m(s,f){var p;m(s,e,f),H(n,e,null),d(e,r),d(e,o),t[4](o),x(o,t[1]),m(s,c,f),m(s,a,f),l=!0,i||(u=[k(o,"input",t[5]),k(o,"keydown",(p=t[2],function(t){return t.stopPropagation(),p.call(this,t)}))],i=!0)},p(t,[e]){2&e&&o.value!==t[1]&&x(o,t[1])},i(t){l||(B(n.$$.fragment,t),l=!0)},o(t){J(n.$$.fragment,t),l=!1},d(r){r&&p(e),F(n),t[4](null),r&&p(c),r&&p(a),i=!1,s(u)}}}function bt(t,e,n){let s,r;u(t,gt,(t=>n(6,s=t)));let o="";return[r,o,async t=>{if("Enter"===t.code&&""!==o.trim()){t.target.blur();const{albums:{items:e}}=await(async t=>await kt("search",{q:t,type:"album",limit:5}))(o.trim());f(gt,s=e,s)}},()=>{n(1,o=""),r.focus()},function(t){j[t?"unshift":"push"]((()=>{r=t,n(0,r)}))},function(){o=this.value,n(1,o)}]}class xt extends V{constructor(t){super(),Q(this,t,bt,wt,o,{focus:3})}get focus(){return this.$$.ctx[3]}}function _t(t,e,n){const s=t.slice();return s[1]=e[n],s[3]=n,s}function St(t){let e,n,s,r,o,c,a,l,i,u,f,g,v,k,x,S,T,C,j,E=t[1].name+"",P=t[1].artists.map(Ct).join(", ")+"",D=t[1].total_tracks+"",L=t[1].total_tracks>1?"s":"";return n=new tt({props:{key:t[3]+1}}),{c(){e=$("div"),G(n.$$.fragment),s=y(),r=$("div"),o=y(),c=$("div"),a=$("div"),l=h(E),i=y(),u=$("div"),f=$("div"),g=h(P),v=y(),k=$("div"),x=h(D),S=h(" track"),T=h(L),C=y(),w(r,"class","image svelte-19ftsqc"),_(r,"background-image","url("+it(t[1].images,300)+")"),w(a,"class","info-primary svelte-19ftsqc"),w(f,"class","artists svelte-19ftsqc"),w(k,"class","tracks svelte-19ftsqc"),w(u,"class","info-secondary svelte-19ftsqc"),w(c,"class","info svelte-19ftsqc"),w(e,"class","result svelte-19ftsqc")},m(t,p){m(t,e,p),H(n,e,null),d(e,s),d(e,r),d(e,o),d(e,c),d(c,a),d(a,l),d(c,i),d(c,u),d(u,f),d(f,g),d(u,v),d(u,k),d(k,x),d(k,S),d(k,T),d(e,C),j=!0},p(t,e){(!j||1&e)&&_(r,"background-image","url("+it(t[1].images,300)+")"),(!j||1&e)&&E!==(E=t[1].name+"")&&b(l,E),(!j||1&e)&&P!==(P=t[1].artists.map(Ct).join(", ")+"")&&b(g,P),(!j||1&e)&&D!==(D=t[1].total_tracks+"")&&b(x,D),(!j||1&e)&&L!==(L=t[1].total_tracks>1?"s":"")&&b(T,L)},i(t){j||(B(n.$$.fragment,t),j=!0)},o(t){J(n.$$.fragment,t),j=!1},d(t){t&&p(e),F(n)}}}function Tt(t){let e,n,s=t[0],r=[];for(let e=0;e<s.length;e+=1)r[e]=St(_t(t,s,e));const o=t=>J(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=v()},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);m(t,e,s),n=!0},p(t,[n]){if(1&n){let c;for(s=t[0],c=0;c<s.length;c+=1){const o=_t(t,s,c);r[c]?(r[c].p(o,n),B(r[c],1)):(r[c]=St(o),r[c].c(),B(r[c],1),r[c].m(e.parentNode,e))}for(U(),c=s.length;c<r.length;c+=1)o(c);z()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)B(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)J(r[t]);n=!1},d(t){g(r,t),t&&p(e)}}}const Ct=t=>t.name;function jt(t,e,n){let s;return u(t,gt,(t=>n(0,s=t))),[s]}class Et extends V{constructor(t){super(),Q(this,t,jt,Tt,o,{})}}function Pt(e){let n,s,r,o,c,a,l,i,u,f=e[0].track.name+"",g=e[0].track.artists.map(Dt).join(", ")+"";return{c(){n=$("div"),s=y(),r=$("div"),o=y(),c=$("h1"),a=h(f),l=y(),i=$("p"),u=h(g),w(n,"class","artwork svelte-1qsx2n"),_(n,"background-image","url('"+it(e[0].track.album.images,640)+"')"),w(r,"class","progress-bar svelte-1qsx2n"),_(r,"width",e[1]+"%"),w(c,"class","svelte-1qsx2n"),w(i,"class","svelte-1qsx2n")},m(t,e){m(t,n,e),m(t,s,e),m(t,r,e),m(t,o,e),m(t,c,e),d(c,a),m(t,l,e),m(t,i,e),d(i,u)},p(t,[e]){1&e&&_(n,"background-image","url('"+it(t[0].track.album.images,640)+"')"),2&e&&_(r,"width",t[1]+"%"),1&e&&f!==(f=t[0].track.name+"")&&b(a,f),1&e&&g!==(g=t[0].track.artists.map(Dt).join(", ")+"")&&b(u,g)},i:t,o:t,d(t){t&&p(n),t&&p(s),t&&p(r),t&&p(o),t&&p(c),t&&p(l),t&&p(i)}}}const Dt=t=>t.name;function Lt(t,e,n){let s,r;return u(t,$t,(t=>n(0,s=t))),u(t,ht,(t=>n(1,r=t))),[s,r]}class Nt extends V{constructor(t){super(),Q(this,t,Lt,Pt,o,{})}}function qt(t,e,n){const s=t.slice();return s[1]=e[n],s}function At(t){let e,n,s,r,o,c,a,l,i,u,f=t[1].name+"",g=t[1].artists.map(Rt).join(", ")+"";return{c(){e=$("div"),n=$("div"),s=y(),r=$("div"),o=$("div"),c=h(f),a=y(),l=$("div"),i=h(g),u=y(),w(n,"class","image svelte-rcks1y"),_(n,"background-image","url("+it(t[1].images,64)+")"),w(o,"class","info-name svelte-rcks1y"),w(l,"class","info-artists svelte-rcks1y"),w(r,"class","info svelte-rcks1y"),w(e,"class","track svelte-rcks1y")},m(t,f){m(t,e,f),d(e,n),d(e,s),d(e,r),d(r,o),d(o,c),d(r,a),d(r,l),d(l,i),d(e,u)},p(t,e){1&e&&_(n,"background-image","url("+it(t[1].images,64)+")"),1&e&&f!==(f=t[1].name+"")&&b(c,f),1&e&&g!==(g=t[1].artists.map(Rt).join(", ")+"")&&b(i,g)},d(t){t&&p(e)}}}function Ot(e){let n,s,r,o,c,a,l,i,u=e[0].context.name+"",f=e[0].context.next_items,k=[];for(let t=0;t<f.length;t+=1)k[t]=At(qt(e,f,t));return{c(){n=$("p"),n.textContent="Now Playing:",s=y(),r=$("div"),o=h(u),c=y(),a=$("p"),a.textContent="Up Next:",l=y();for(let t=0;t<k.length;t+=1)k[t].c();i=v(),w(n,"class","svelte-rcks1y"),w(r,"class","context svelte-rcks1y"),w(a,"class","svelte-rcks1y")},m(t,e){m(t,n,e),m(t,s,e),m(t,r,e),d(r,o),m(t,c,e),m(t,a,e),m(t,l,e);for(let n=0;n<k.length;n+=1)k[n].m(t,e);m(t,i,e)},p(t,[e]){if(1&e&&u!==(u=t[0].context.name+"")&&b(o,u),1&e){let n;for(f=t[0].context.next_items,n=0;n<f.length;n+=1){const s=qt(t,f,n);k[n]?k[n].p(s,e):(k[n]=At(s),k[n].c(),k[n].m(i.parentNode,i))}for(;n<k.length;n+=1)k[n].d(1);k.length=f.length}},i:t,o:t,d(t){t&&p(n),t&&p(s),t&&p(r),t&&p(c),t&&p(a),t&&p(l),g(k,t),t&&p(i)}}}const Rt=t=>t.name;function Kt(t,e,n){let s;return u(t,$t,(t=>n(0,s=t))),[s]}class It extends V{constructor(t){super(),Q(this,t,Kt,Ot,o,{})}}const{window:Ut}=M;function zt(t){let e,n;return e=new Et({}),{c(){G(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Bt(t){let e,n;return e=new Nt({}),{c(){G(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Jt(t){let e,n;return e=new It({}),{c(){G(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Mt(t){let e,n,s,r,o,a,l,i,u,f,g,h,v,b,x,_,S,T,C,j,E,P,D,L,N,q,A,O,R,K,I,M;document.title=e=(t[2]?`${t[2].track.name} • `:"")+"Lecker";l=new xt({props:{}}),t[4](l);let W=t[1]&&zt(),Q=t[2]&&Bt(),V=t[2]&&Jt();return S=new tt({props:{key:"SPACE"}}),P=new tt({props:{key:"TAB"}}),A=new tt({props:{key:"⇧+TAB"}}),{c(){var t,e;n=$("script"),r=y(),o=$("div"),a=$("div"),G(l.$$.fragment),i=y(),u=$("div"),W&&W.c(),f=y(),g=$("div"),Q&&Q.c(),h=y(),v=$("div"),V&&V.c(),b=y(),x=$("div"),_=$("span"),G(S.$$.fragment),T=y(),C=$("span"),C.textContent="Toggle Pause",j=y(),E=$("span"),G(P.$$.fragment),D=y(),L=$("span"),L.textContent="Next song",N=y(),q=$("span"),G(A.$$.fragment),O=y(),R=$("span"),R.textContent="Previous song",t=n.src,e=s="https://sdk.scdn.co/spotify-player.js",c||(c=document.createElement("a")),c.href=e,t!==c.href&&w(n,"src","https://sdk.scdn.co/spotify-player.js"),w(a,"class","header svelte-o5d7ly"),w(u,"class","search-results svelte-o5d7ly"),w(g,"class","now-playing svelte-o5d7ly"),w(v,"class","context-info svelte-o5d7ly"),w(C,"class","svelte-o5d7ly"),w(_,"class","tip svelte-o5d7ly"),w(L,"class","svelte-o5d7ly"),w(E,"class","tip svelte-o5d7ly"),w(R,"class","svelte-o5d7ly"),w(q,"class","tip svelte-o5d7ly"),w(x,"class","help svelte-o5d7ly"),w(o,"class","container svelte-o5d7ly")},m(e,s){d(document.head,n),m(e,r,s),m(e,o,s),d(o,a),H(l,a,null),d(o,i),d(o,u),W&&W.m(u,null),d(o,f),d(o,g),Q&&Q.m(g,null),d(o,h),d(o,v),V&&V.m(v,null),d(o,b),d(o,x),d(x,_),H(S,_,null),d(_,T),d(_,C),d(x,j),d(x,E),H(P,E,null),d(E,D),d(E,L),d(x,N),d(x,q),H(A,q,null),d(q,O),d(q,R),K=!0,I||(M=k(Ut,"keydown",t[3]),I=!0)},p(t,[n]){(!K||4&n)&&e!==(e=(t[2]?`${t[2].track.name} • `:"")+"Lecker")&&(document.title=e);l.$set({}),t[1]?W?2&n&&B(W,1):(W=zt(),W.c(),B(W,1),W.m(u,null)):W&&(U(),J(W,1,1,(()=>{W=null})),z()),t[2]?Q?4&n&&B(Q,1):(Q=Bt(),Q.c(),B(Q,1),Q.m(g,null)):Q&&(U(),J(Q,1,1,(()=>{Q=null})),z()),t[2]?V?4&n&&B(V,1):(V=Jt(),V.c(),B(V,1),V.m(v,null)):V&&(U(),J(V,1,1,(()=>{V=null})),z())},i(t){K||(B(l.$$.fragment,t),B(W),B(Q),B(V),B(S.$$.fragment,t),B(P.$$.fragment,t),B(A.$$.fragment,t),K=!0)},o(t){J(l.$$.fragment,t),J(W),J(Q),J(V),J(S.$$.fragment,t),J(P.$$.fragment,t),J(A.$$.fragment,t),K=!1},d(e){p(n),e&&p(r),e&&p(o),t[4](null),F(l),W&&W.d(),Q&&Q.d(),V&&V.d(),F(S),F(P),F(A),I=!1,M()}}}function Gt(t,e,n){let s,r,o,c,a,l,d,m;u(t,gt,(t=>n(1,s=t))),u(t,$t,(t=>n(2,r=t))),u(t,ht,(t=>n(7,o=t))),u(t,pt,(t=>n(8,c=t))),u(t,mt,(t=>n(9,a=t))),window.onSpotifyWebPlaybackSDKReady=()=>{l=new Spotify.Player({name:"Lecker",getOAuthToken:t=>{t(a.access_token)},volume:.5}),l.addListener("ready",(({device_id:t})=>{f(pt,c=t,c),m=setInterval((async()=>{const t=await l.getCurrentState();t&&f(ht,o=100*t.position/t.duration,o)}),1e3)})),l.addListener("player_state_changed",(async t=>{t&&t.track_window&&t.track_window.current_track&&(f(ht,o=100*t.position/t.duration,o),f($t,r={context:t.context.metadata,track:t.track_window.current_track},r))})),l.connect()};const p=t=>{s.length>0&&(async t=>{const e=i(pt);await kt("me/player/play",{device_id:e},{method:"PUT",body:JSON.stringify({context_uri:t,offset:{position:0},position_ms:0})})})(s[t].uri)};var g;return g=()=>{clearInterval(m)},T().$$.on_destroy.push(g),[d,s,r,t=>{switch(t.code){case"KeyS":t.preventDefault(),d.focus();break;case"Space":t.preventDefault(),l.togglePlay();break;case"Tab":t.preventDefault(),t.shiftKey?l.previousTrack():l.nextTrack();break;case"Digit1":t.preventDefault(),p(0);break;case"Digit2":t.preventDefault(),p(1);break;case"Digit3":t.preventDefault(),p(2);break;case"Digit4":t.preventDefault(),p(3);break;case"Digit5":t.preventDefault(),p(4)}},function(t){j[t?"unshift":"push"]((()=>{d=t,n(0,d)}))}]}class Ht extends V{constructor(t){super(),Q(this,t,Gt,Mt,o,{})}}function Ft(t){let e,n;return e=new Ht({}),{c(){G(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Wt(t){let e,n;return e=new vt({}),{c(){G(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Qt(t){let e,n;return e=new rt({}),{c(){G(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Vt(t){let e,n,s,r;const o=[Qt,Wt,Ft],c=[];function a(t,e){return"login"===t[0]?0:"auth"===t[0]?1:"player"===t[0]?2:-1}return~(e=a(t))&&(n=c[e]=o[e](t)),{c(){n&&n.c(),s=v()},m(t,n){~e&&c[e].m(t,n),m(t,s,n),r=!0},p(t,[r]){let l=e;e=a(t),e!==l&&(n&&(U(),J(c[l],1,1,(()=>{c[l]=null})),z()),~e?(n=c[e],n||(n=c[e]=o[e](t),n.c()),B(n,1),n.m(s.parentNode,s)):n=null)},i(t){r||(B(n),r=!0)},o(t){J(n),r=!1},d(t){~e&&c[e].d(t),t&&p(s)}}}function Xt(t,e,n){let s;return u(t,dt,(t=>n(0,s=t))),lt()?dt.set("auth"):dt.set("login"),[s]}return new class extends V{constructor(t){super(),Q(this,t,Xt,Vt,o,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
