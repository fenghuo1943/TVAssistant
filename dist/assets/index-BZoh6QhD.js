(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,T=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),ee=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},te=/-\w/g,E=ee(e=>e.replace(te,e=>e.slice(1).toUpperCase())),ne=/\B([A-Z])/g,D=ee(e=>e.replace(ne,`-$1`).toLowerCase()),re=ee(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=ee(e=>e?`on${re(e)}`:``),O=(e,t)=>!Object.is(e,t),ae=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},k=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},oe=e=>{let t=parseFloat(e);return isNaN(t)?e:t},se,ce=()=>se||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function le(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?pe(r):le(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(g(e)||v(e))return e}var ue=/;(?![^(]*\))/g,de=/:([^]+)/,fe=/\/\*[^]*?\*\//g;function pe(e){let t={};return e.replace(fe,``).split(ue).forEach(e=>{if(e){let n=e.split(de);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function A(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=A(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var me=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,he=e(me);me+``;function ge(e){return!!e||e===``}function _e(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=ve(e[r],t[r]);return n}function ve(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?_e(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!ve(e[n],t[n]))return!1}}return String(e)===String(t)}var ye=e=>!!(e&&e.__v_isRef===!0),j=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?ye(e)?j(e.value):JSON.stringify(e,be,2):String(e),be=(e,t)=>ye(t)?be(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[xe(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>xe(e))}:_(t)?xe(t):v(t)&&!d(t)&&!C(t)?String(t):t,xe=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,M,Se=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=M,!e&&M&&(this.index=(M.scopes||=[]).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=M;try{return M=this,e()}finally{M=t}}}on(){++this._on===1&&(this.prevScope=M,M=this)}off(){this._on>0&&--this._on===0&&(M=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Ce(){return M}var N,we=new WeakSet,Te=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,M&&M.active&&M.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,we.has(this)&&(we.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||ke(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ve(this),Me(this);let e=N,t=P;N=this,P=!0;try{return this.fn()}finally{Ne(this),N=e,P=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ie(e);this.deps=this.depsTail=void 0,Ve(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?we.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Pe(this)&&this.run()}get dirty(){return Pe(this)}},Ee=0,De,Oe;function ke(e,t=!1){if(e.flags|=8,t){e.next=Oe,Oe=e;return}e.next=De,De=e}function Ae(){Ee++}function je(){if(--Ee>0)return;if(Oe){let e=Oe;for(Oe=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;De;){let t=De;for(De=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Me(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Ne(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Ie(r),Le(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Pe(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Fe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Fe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===He)||(e.globalVersion=He,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Pe(e))))return;e.flags|=2;let t=e.dep,n=N,r=P;N=e,P=!0;try{Me(e);let n=e.fn(e._value);(t.version===0||O(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{N=n,P=r,Ne(e),e.flags&=-3}}function Ie(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Ie(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Le(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var P=!0,Re=[];function ze(){Re.push(P),P=!1}function Be(){let e=Re.pop();P=e===void 0?!0:e}function Ve(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=N;N=void 0;try{t()}finally{N=e}}}var He=0,Ue=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},We=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!N||!P||N===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==N)t=this.activeLink=new Ue(N,this),N.deps?(t.prevDep=N.depsTail,N.depsTail.nextDep=t,N.depsTail=t):N.deps=N.depsTail=t,Ge(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=N.depsTail,t.nextDep=void 0,N.depsTail.nextDep=t,N.depsTail=t,N.deps===t&&(N.deps=e)}return t}trigger(e){this.version++,He++,this.notify(e)}notify(e){Ae();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{je()}}};function Ge(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ge(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ke=new WeakMap,qe=Symbol(``),Je=Symbol(``),Ye=Symbol(``);function F(e,t,n){if(P&&N){let t=Ke.get(e);t||Ke.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new We),r.map=t,r.key=n),r.track()}}function Xe(e,t,n,r,i,a){let o=Ke.get(e);if(!o){He++;return}let s=e=>{e&&e.trigger()};if(Ae(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ye||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ye)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`delete`:i||(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`set`:f(e)&&s(o.get(qe));break}}je()}function Ze(e){let t=R(e);return t===e?t:(F(t,`iterate`,Ye),L(e)?t:t.map(z))}function Qe(e){return F(e=R(e),`iterate`,Ye),e}function I(e,t){return Ft(e)?Rt(Pt(e)?z(t):t):z(t)}var $e={__proto__:null,[Symbol.iterator](){return et(this,Symbol.iterator,e=>I(this,e))},concat(...e){return Ze(this).concat(...e.map(e=>d(e)?Ze(e):e))},entries(){return et(this,`entries`,e=>(e[1]=I(this,e[1]),e))},every(e,t){return nt(this,`every`,e,t,void 0,arguments)},filter(e,t){return nt(this,`filter`,e,t,e=>e.map(e=>I(this,e)),arguments)},find(e,t){return nt(this,`find`,e,t,e=>I(this,e),arguments)},findIndex(e,t){return nt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return nt(this,`findLast`,e,t,e=>I(this,e),arguments)},findLastIndex(e,t){return nt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return nt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return it(this,`includes`,e)},indexOf(...e){return it(this,`indexOf`,e)},join(e){return Ze(this).join(e)},lastIndexOf(...e){return it(this,`lastIndexOf`,e)},map(e,t){return nt(this,`map`,e,t,void 0,arguments)},pop(){return at(this,`pop`)},push(...e){return at(this,`push`,e)},reduce(e,...t){return rt(this,`reduce`,e,t)},reduceRight(e,...t){return rt(this,`reduceRight`,e,t)},shift(){return at(this,`shift`)},some(e,t){return nt(this,`some`,e,t,void 0,arguments)},splice(...e){return at(this,`splice`,e)},toReversed(){return Ze(this).toReversed()},toSorted(e){return Ze(this).toSorted(e)},toSpliced(...e){return Ze(this).toSpliced(...e)},unshift(...e){return at(this,`unshift`,e)},values(){return et(this,`values`,e=>I(this,e))}};function et(e,t,n){let r=Qe(e),i=r[t]();return r!==e&&!L(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var tt=Array.prototype;function nt(e,t,n,r,i,a){let o=Qe(e),s=o!==e&&!L(e),c=o[t];if(c!==tt[t]){let t=c.apply(e,a);return s?z(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,I(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function rt(e,t,n,r){let i=Qe(e),a=i!==e&&!L(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=I(e,t)),n.call(this,t,I(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?I(e,c):c}function it(e,t,n){let r=R(e);F(r,`iterate`,Ye);let i=r[t](...n);return(i===-1||i===!1)&&It(n[0])?(n[0]=R(n[0]),r[t](...n)):i}function at(e,t,n=[]){ze(),Ae();let r=R(e)[t].apply(e,n);return je(),Be(),r}var ot=e(`__proto__,__v_isRef,__isVue`),st=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function ct(e){_(e)||(e=String(e));let t=R(this);return F(t,`has`,e),t.hasOwnProperty(e)}var lt=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Dt:Et:i?Tt:wt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=$e[t]))return e;if(t===`hasOwnProperty`)return ct}let o=Reflect.get(e,t,B(e)?e:n);if((_(t)?st.has(t):ot(t))||(r||F(e,`get`,t),i))return o;if(B(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Mt(e):e}return v(o)?r?Mt(o):At(o):o}},ut=class extends lt{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=Ft(i);if(!L(n)&&!Ft(n)&&(i=R(i),n=R(n)),!a&&B(i)&&!B(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,B(e)?e:r);return e===R(r)&&(o?O(n,i)&&Xe(e,`set`,t,n,i):Xe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Xe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!st.has(t))&&F(e,`has`,t),n}ownKeys(e){return F(e,`iterate`,d(e)?`length`:qe),Reflect.ownKeys(e)}},dt=class extends lt{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},ft=new ut,pt=new dt,mt=new ut(!0),ht=e=>e,gt=e=>Reflect.getPrototypeOf(e);function _t(e,t,n){return function(...r){let i=this.__v_raw,a=R(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?ht:t?Rt:z;return!t&&F(a,`iterate`,l?Je:qe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function vt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function yt(e,t){let n={get(n){let r=this.__v_raw,i=R(r),a=R(n);e||(O(n,a)&&F(i,`get`,n),F(i,`get`,a));let{has:o}=gt(i),s=t?ht:e?Rt:z;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&F(R(t),`iterate`,qe),t.size},has(t){let n=this.__v_raw,r=R(n),i=R(t);return e||(O(t,i)&&F(r,`has`,t),F(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=R(a),s=t?ht:e?Rt:z;return!e&&F(o,`iterate`,qe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:vt(`add`),set:vt(`set`),delete:vt(`delete`),clear:vt(`clear`)}:{add(e){let n=R(this),r=gt(n),i=R(e),a=!t&&!L(e)&&!Ft(e)?i:e;return r.has.call(n,a)||O(e,a)&&r.has.call(n,e)||O(i,a)&&r.has.call(n,i)||(n.add(a),Xe(n,`add`,a,a)),this},set(e,n){!t&&!L(n)&&!Ft(n)&&(n=R(n));let r=R(this),{has:i,get:a}=gt(r),o=i.call(r,e);o||=(e=R(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?O(n,s)&&Xe(r,`set`,e,n,s):Xe(r,`add`,e,n),this},delete(e){let t=R(this),{has:n,get:r}=gt(t),i=n.call(t,e);i||=(e=R(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Xe(t,`delete`,e,void 0,a),o},clear(){let e=R(this),t=e.size!==0,n=e.clear();return t&&Xe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=_t(r,e,t)}),n}function bt(e,t){let n=yt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var xt={get:bt(!1,!1)},St={get:bt(!1,!0)},Ct={get:bt(!0,!1)},wt=new WeakMap,Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap;function Ot(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function kt(e){return e.__v_skip||!Object.isExtensible(e)?0:Ot(S(e))}function At(e){return Ft(e)?e:Nt(e,!1,ft,xt,wt)}function jt(e){return Nt(e,!1,mt,St,Tt)}function Mt(e){return Nt(e,!0,pt,Ct,Et)}function Nt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=kt(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function Pt(e){return Ft(e)?Pt(e.__v_raw):!!(e&&e.__v_isReactive)}function Ft(e){return!!(e&&e.__v_isReadonly)}function L(e){return!!(e&&e.__v_isShallow)}function It(e){return e?!!e.__v_raw:!1}function R(e){let t=e&&e.__v_raw;return t?R(t):e}function Lt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&k(e,`__v_skip`,!0),e}var z=e=>v(e)?At(e):e,Rt=e=>v(e)?Mt(e):e;function B(e){return e?e.__v_isRef===!0:!1}function V(e){return zt(e,!1)}function zt(e,t){return B(e)?e:new Bt(e,t)}var Bt=class{constructor(e,t){this.dep=new We,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:R(e),this._value=t?e:z(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||L(e)||Ft(e);e=n?e:R(e),O(e,t)&&(this._rawValue=e,this._value=n?e:z(e),this.dep.trigger())}};function Vt(e){return B(e)?e.value:e}var Ht={get:(e,t,n)=>t===`__v_raw`?e:Vt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return B(i)&&!B(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Ut(e){return Pt(e)?e:new Proxy(e,Ht)}var Wt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new We(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=He-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&N!==this)return ke(this,!0),!0}get value(){let e=this.dep.track();return Fe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Gt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Wt(r,i,n)}var Kt={},qt=new WeakMap,Jt=void 0;function Yt(e,t=!1,n=Jt){if(n){let t=qt.get(n);t||qt.set(n,t=[]),t.push(e)}}function Xt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:L(e)||o===!1||o===0?Zt(e,1):Zt(e),m,g,_,v,y=!1,b=!1;if(B(e)?(g=()=>e.value,y=L(e)):Pt(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Pt(e)||L(e)),g=()=>e.map(e=>{if(B(e))return e.value;if(Pt(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){ze();try{_()}finally{Be()}}let t=Jt;Jt=m;try{return f?f(e,3,[v]):e(v)}finally{Jt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>Zt(e(),t)}let x=Ce(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(Kt):Kt,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let e=m.run();if(o||y||(b?e.some((e,t)=>O(e,C[t])):O(e,C))){_&&_();let t=Jt;Jt=m;try{let t=[e,C===Kt?void 0:b&&C[0]===Kt?[]:C,v];C=e,f?f(n,3,t):n(...t)}finally{Jt=t}}}else m.run()};return u&&u(w),m=new Te(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Yt(e,!1,m),_=m.onStop=()=>{let e=qt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();qt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function Zt(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,B(e))Zt(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)Zt(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{Zt(e,t,n)});else if(C(e)){for(let r in e)Zt(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Zt(e[r],t,n)}return e}function Qt(e,t,n,r){try{return r?e(...r):e()}catch(e){$t(e,t,n)}}function H(e,t,n,r){if(h(e)){let i=Qt(e,t,n,r);return i&&y(i)&&i.catch(e=>{$t(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(H(e[a],t,n,r));return i}}function $t(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){ze(),Qt(o,null,10,[e,i,a]),Be();return}}en(e,r,a,i,s)}function en(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var U=[],W=-1,tn=[],nn=null,rn=0,an=Promise.resolve(),on=null;function sn(e){let t=on||an;return e?t.then(this?e.bind(this):e):t}function cn(e){let t=W+1,n=U.length;for(;t<n;){let r=t+n>>>1,i=U[r],a=mn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function ln(e){if(!(e.flags&1)){let t=mn(e),n=U[U.length-1];!n||!(e.flags&2)&&t>=mn(n)?U.push(e):U.splice(cn(t),0,e),e.flags|=1,un()}}function un(){on||=an.then(hn)}function dn(e){d(e)?tn.push(...e):nn&&e.id===-1?nn.splice(rn+1,0,e):e.flags&1||(tn.push(e),e.flags|=1),un()}function fn(e,t,n=W+1){for(;n<U.length;n++){let t=U[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;U.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function pn(e){if(tn.length){let e=[...new Set(tn)].sort((e,t)=>mn(e)-mn(t));if(tn.length=0,nn){nn.push(...e);return}for(nn=e,rn=0;rn<nn.length;rn++){let e=nn[rn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}nn=null,rn=0}}var mn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function hn(e){try{for(W=0;W<U.length;W++){let e=U[W];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Qt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;W<U.length;W++){let e=U[W];e&&(e.flags&=-2)}W=-1,U.length=0,pn(e),on=null,(U.length||tn.length)&&hn(e)}}var G=null,gn=null;function _n(e){let t=G;return G=e,gn=e&&e.type.__scopeId||null,t}function vn(e,t=G,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Ti(-1);let i=_n(t),a;try{a=e(...n)}finally{_n(i),r._d&&Ti(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function yn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(ze(),H(c,n,8,[e.el,s,e,t]),Be())}}function bn(e,t){if($){let n=$.provides,r=$.parent&&$.parent.provides;r===n&&(n=$.provides=Object.create(r)),n[e]=t}}function xn(e,t,n=!1){let r=Ki();if(r||Ar){let i=Ar?Ar._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var Sn=Symbol.for(`v-scx`),Cn=()=>xn(Sn);function wn(e,t,n){return Tn(e,t,n)}function Tn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(Qi){if(c===`sync`){let e=Cn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=$;u.call=(e,t,n)=>H(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{q(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():ln(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Xt(e,n,u);return Qi&&(f?f.push(h):d&&h()),h}function En(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?Dn(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Yi(this),s=Tn(i,a.bind(r),n);return o(),s}function Dn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var On=Symbol(`_vte`),kn=e=>e.__isTeleport,An=Symbol(`_leaveCb`);function jn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,jn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Mn(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function Nn(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function Pn(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Fn=new WeakMap;function In(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>In(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Rn(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&In(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?sa(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=R(v),b=v===t?i:e=>Pn(_,e)?!1:u(y,e),x=(e,t)=>!(t&&Pn(_,t));if(m!=null&&m!==p){if(Ln(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(B(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))Qt(p,f,12,[l,_]);else{let t=g(p),n=B(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),Fn.delete(e)};t.id=-1,Fn.set(e,t),q(t,r)}else Ln(e),i()}}}function Ln(e){let t=Fn.get(e);t&&(t.flags|=8,Fn.delete(e))}ce().requestIdleCallback,ce().cancelIdleCallback;var Rn=e=>!!e.type.__asyncLoader,zn=e=>e.type.__isKeepAlive;function Bn(e,t){Hn(e,`a`,t)}function Vn(e,t){Hn(e,`da`,t)}function Hn(e,t,n=$){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(Wn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)zn(e.parent.vnode)&&Un(r,t,n,e),e=e.parent}}function Un(e,t,n,r){let i=Wn(t,e,r,!0);Zn(()=>{c(r[t],i)},n)}function Wn(e,t,n=$,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{ze();let i=Yi(n),a=H(t,n,e,r);return i(),Be(),a};return r?i.unshift(a):i.push(a),a}}var Gn=e=>(t,n=$)=>{(!Qi||e===`sp`)&&Wn(e,(...e)=>t(...e),n)},Kn=Gn(`bm`),qn=Gn(`m`),Jn=Gn(`bu`),Yn=Gn(`u`),Xn=Gn(`bum`),Zn=Gn(`um`),Qn=Gn(`sp`),$n=Gn(`rtg`),er=Gn(`rtc`);function tr(e,t=$){Wn(`ec`,e,t)}var nr=`components`;function rr(e,t){return ar(nr,e,!0,t)||e}var ir=Symbol.for(`v-ndc`);function ar(e,t,n=!0,r=!1){let i=G||$;if(i){let n=i.type;if(e===nr){let e=ca(n,!1);if(e&&(e===t||e===E(t)||e===re(E(t))))return n}let a=or(i[e]||n[e],t)||or(i.appContext[e],t);return!a&&r?n:a}}function or(e,t){return e&&(e[t]||e[E(t)]||e[re(E(t))])}function sr(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Pt(e),r=!1,s=!1;n&&(r=!L(e),s=Ft(e),e=Qe(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Rt(z(e[n])):z(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}var cr=e=>e?Zi(e)?sa(e):cr(e.parent):null,lr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>cr(e.parent),$root:e=>cr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>vr(e),$forceUpdate:e=>e.f||=()=>{ln(e.update)},$nextTick:e=>e.n||=sn.bind(e.proxy),$watch:e=>En.bind(e)}),ur=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),dr={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(ur(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else pr&&(s[n]=0)}let d=lr[n],f,p;if(d)return n===`$attrs`&&F(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return ur(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||ur(n,c)||u(o,c)||u(i,c)||u(lr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function fr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var pr=!0;function mr(e){let t=vr(e),n=e.proxy,i=e.ctx;pr=!1,t.beforeCreate&&gr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:T,renderTracked:ee,renderTriggered:te,errorCaptured:E,serverPrefetch:ne,expose:D,inheritAttrs:re,components:ie,directives:O,filters:ae}=t;if(u&&hr(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=At(t))}if(pr=!0,o)for(let e in o){let t=o[e],a=ua({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)_r(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{bn(t,e[t])})}f&&gr(f,e,`c`);function k(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(k(Kn,p),k(qn,m),k(Jn,g),k(Yn,_),k(Bn,y),k(Vn,b),k(tr,E),k(er,ee),k($n,te),k(Xn,S),k(Zn,w),k(Qn,ne),d(D))if(D.length){let t=e.exposed||={};D.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};T&&e.render===r&&(e.render=T),re!=null&&(e.inheritAttrs=re),ie&&(e.components=ie),O&&(e.directives=O),ne&&Nn(e)}function hr(e,t,n=r){d(e)&&(e=Cr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?xn(r.from||n,r.default,!0):xn(r.from||n):xn(r),B(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function gr(e,t,n){H(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function _r(e,t,n,r){let i=r.includes(`.`)?Dn(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&wn(i,n)}else if(h(e))wn(i,e.bind(n));else if(v(e))if(d(e))e.forEach(e=>_r(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&wn(i,r,e)}}function vr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>yr(c,e,o,!0)),yr(c,t,o)),v(t)&&a.set(t,c),c}function yr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&yr(e,a,n,!0),i&&i.forEach(t=>yr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=br[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var br={data:xr,props:Tr,emits:Tr,methods:wr,computed:wr,beforeCreate:K,created:K,beforeMount:K,mounted:K,beforeUpdate:K,updated:K,beforeDestroy:K,beforeUnmount:K,destroyed:K,unmounted:K,activated:K,deactivated:K,errorCaptured:K,serverPrefetch:K,components:wr,directives:wr,watch:Er,provide:xr,inject:Sr};function xr(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function Sr(e,t){return wr(Cr(e),Cr(t))}function Cr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function K(e,t){return e?[...new Set([].concat(e,t))]:t}function wr(e,t){return e?s(Object.create(null),e,t):t}function Tr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),fr(e),fr(t??{})):t}function Er(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=K(e[r],t[r]);return n}function Dr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Or=0;function kr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Dr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Or++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:da,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||Mi(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,sa(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(H(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Ar;Ar=l;try{return e()}finally{Ar=t}}};return l}}var Ar=null,jr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${E(t)}Modifiers`]||e[`${D(t)}Modifiers`];function Mr(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&jr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=r.map(oe)));let c,l=i[c=ie(n)]||i[c=ie(E(n))];!l&&o&&(l=i[c=ie(D(n))]),l&&H(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,H(u,e,6,a)}}var Nr=new WeakMap;function Pr(e,t,n=!1){let r=n?Nr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Pr(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Fr(e,t){return!e||!a(t)?!1:(t=t.slice(2).replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,D(t))||u(e,t))}function Ir(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=_n(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Ri(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Ri(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Lr(c)}}catch(t){Si.length=0,$t(t,e,1),v=Mi(bi)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Rr(y,a)),b=Fi(b,y,!1,!0))}return n.dirs&&(b=Fi(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&jn(b,n.transition),v=b,_n(_),v}var Lr=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Rr=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function zr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Br(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Vr(o,r,n)&&!Fr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Br(r,o,l):!0:!!o;return!1}function Br(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Vr(t,e,a)&&!Fr(n,a))return!0}return!1}function Vr(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!ve(r,i):r!==i}function Hr({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Ur={},Wr=()=>Object.create(Ur),Gr=e=>Object.getPrototypeOf(e)===Ur;function Kr(e,t,n,r=!1){let i={},a=Wr();e.propsDefaults=Object.create(null),Jr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:jt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function qr(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=R(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Fr(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=E(o);i[t]=Yr(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{Jr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=D(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Yr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Xe(e.attrs,`set`,``)}function Jr(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(T(t))continue;let l=n[t],d;a&&u(a,d=E(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Fr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=R(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=Yr(a,n,s,i[s],e,!u(i,s))}}return s}function Yr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Yi(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===D(n))&&(r=!0))}return r}var Xr=new WeakMap;function Zr(e,r,i=!1){let a=i?Xr:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=Zr(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=E(c[e]);Qr(n)&&(l[n]=t)}else if(c)for(let e in c){let t=E(e);if(Qr(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function Qr(e){return e[0]!==`$`&&!T(e)}var $r=e=>e===`_`||e===`_ctx`||e===`$stable`,ei=e=>d(e)?e.map(Ri):[Ri(e)],ti=(e,t,n)=>{if(t._n)return t;let r=vn((...e)=>ei(t(...e)),n);return r._c=!1,r},ni=(e,t,n)=>{let r=e._ctx;for(let n in e){if($r(n))continue;let i=e[n];if(h(i))t[n]=ti(n,i,r);else if(i!=null){let e=ei(i);t[n]=()=>e}}},ri=(e,t)=>{let n=ei(t);e.slots.default=()=>n},ii=(e,t,n)=>{for(let r in t)(n||!$r(r))&&(e[r]=t[r])},ai=(e,t,n)=>{let r=e.slots=Wr();if(e.vnode.shapeFlag&32){let e=t._;e?(ii(r,t,n),n&&k(r,`_`,e,!0)):ni(t,r)}else t&&ri(e,t)},oi=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:ii(a,n,r):(o=!n.$stable,ni(n,a)),s=n}else n&&(ri(e,n),s={default:1});if(o)for(let e in a)!$r(e)&&s[e]==null&&delete a[e]},q=vi;function si(e){return ci(e)}function ci(e,i){let a=ce();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!ki(e,t)&&(r=ve(e),A(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case yi:y(e,t,n,r);break;case bi:b(e,t,n,r);break;case xi:e??x(t,n,r,o);break;case J:ie(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?O(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,be)}u!=null&&i?In(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&In(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)ee(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),ne(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},ee=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&E(e.children,d,null,r,i,li(e,a),s,u),_&&yn(e,null,r,`created`),te(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!T(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Hi(f,r,e)}_&&yn(e,null,r,`beforeMount`);let v=di(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&q(()=>{try{f&&Hi(f,r,e),v&&g.enter(d),_&&yn(e,null,r,`mounted`)}finally{}},i)},te=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||_i(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;te(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},E=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?zi(e[l]):Ri(e[l]),t,n,r,i,a,o,s)},ne=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&ui(r,!1),(g=h.onVnodeBeforeUpdate)&&Hi(g,r,n,e),f&&yn(n,e,r,`beforeUpdate`),r&&ui(r,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?D(e.dynamicChildren,d,l,r,i,li(n,a),o):s||ue(e,n,l,null,r,i,li(n,a),o,!1),u>0){if(u&16)re(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else !s&&d==null&&re(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&q(()=>{g&&Hi(g,r,n,e),f&&yn(n,e,r,`updated`)},i)},D=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===J||!ki(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},re=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!T(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(T(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},ie=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),E(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(D(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&fi(e,t,!0)):ue(e,t,n,f,i,a,s,c,l)},O=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):k(t,n,r,i,a,o,c):oe(e,t,c)},k=(e,t,n,r,i,a,o)=>{let s=e.component=Gi(e,r,i);if(zn(e)&&(s.ctx.renderer=be),$i(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,se,o),!e.el){let r=s.subTree=Mi(bi);b(null,r,t,n),e.placeholder=r.el}}else se(s,e,t,n,i,a,o)},oe=(e,t,n)=>{let r=t.component=e.component;if(zr(e,t,n))if(r.asyncDep&&!r.asyncResolved){le(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},se=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=mi(e);if(n){t&&(t.el=c.el,le(e,t,o)),n.asyncDep.then(()=>{q(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;ui(e,!1),t?(t.el=c.el,le(e,t,o)):t=c,n&&ae(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Hi(d,s,t,c),ui(e,!0);let f=Ir(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),ve(p),e,i,a),t.el=f.el,u===null&&Hr(e,f.el),r&&q(r,i),(d=t.props&&t.props.onVnodeUpdated)&&q(()=>Hi(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Rn(t);if(ui(e,!1),l&&ae(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Hi(o,d,t),ui(e,!0),s&&M){let t=()=>{e.subTree=Ir(e),M(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Ir(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&q(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;q(()=>Hi(o,d,e),i)}(t.shapeFlag&256||d&&Rn(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&q(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new Te(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>ln(u),ui(e,!0),l()},le=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,qr(e,t.props,r,n),oi(e,t.children,n),ze(),fn(e),Be()},ue=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){fe(l,d,n,r,i,a,o,s,c);return}else if(f&256){de(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&_e(l,i,a),d!==l&&p(n,d)):u&16?m&16?fe(l,d,n,r,i,a,o,s,c):_e(l,i,a,!0):(u&8&&p(n,``),m&16&&E(d,n,r,i,a,o,s,c))},de=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?zi(t[p]):Ri(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?_e(e,a,o,!0,!1,f):E(t,r,i,a,o,s,c,l,f)},fe=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?zi(t[u]):Ri(t[u]);if(ki(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?zi(t[p]):Ri(t[p]);if(ki(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?zi(t[u]):Ri(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)A(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?zi(t[u]):Ri(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){A(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&ki(n,t[_])){i=_;break}i===void 0?A(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?pi(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||gi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?pe(n,r,p,2):_--)}}},pe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){pe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,be);return}if(c===J){o(a,t,n);for(let e=0;e<u.length;e++)pe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===xi){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.beforeEnter(a),o(a,t,n),q(()=>l.enter(a),i);else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{a._isLeaving&&a[An](!0),r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},A=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(ze(),In(s,null,n,e,!0),Be()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Rn(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Hi(_,t,e),u&6)ge(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&yn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,be,r):l&&!l.hasOnce&&(a!==J||d>0&&d&64)?_e(l,t,n,!1,!0):(a===J&&d&384||!i&&u&16)&&_e(c,t,n),r&&me(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&q(()=>{_&&Hi(_,t,e),h&&yn(e,null,t,`unmounted`),v&&(e.el=null)},n)},me=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===J){he(n,r);return}if(t===xi){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},he=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},ge=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;hi(c),hi(l),r&&ae(r),i.stop(),a&&(a.flags|=8,A(o,e,t,n)),s&&q(s,t),q(()=>{e.isUnmounted=!0},t)},_e=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)A(e[o],t,n,r,i)},ve=e=>{if(e.shapeFlag&6)return ve(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[On];return n?h(n):t},ye=!1,j=(e,t,n)=>{let r;e==null?t._vnode&&(A(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ye||=(ye=!0,fn(r),pn(),!1)},be={p:v,um:A,m:pe,r:me,mt:k,mc:E,pc:ue,pbc:D,n:ve,o:e},xe,M;return i&&([xe,M]=i(be)),{render:j,hydrate:xe,createApp:kr(j,xe)}}function li({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function ui({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function di(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function fi(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=zi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&fi(t,a)),a.type===yi&&(a.patchFlag===-1&&(a=i[e]=zi(a)),a.el=t.el),a.type===bi&&!a.el&&(a.el=t.el)}}function pi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function mi(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:mi(t)}function hi(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function gi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?gi(t.subTree):null}var _i=e=>e.__isSuspense;function vi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):dn(e)}var J=Symbol.for(`v-fgt`),yi=Symbol.for(`v-txt`),bi=Symbol.for(`v-cmt`),xi=Symbol.for(`v-stc`),Si=[],Y=null;function X(e=!1){Si.push(Y=e?null:[])}function Ci(){Si.pop(),Y=Si[Si.length-1]||null}var wi=1;function Ti(e,t=!1){wi+=e,e<0&&Y&&t&&(Y.hasOnce=!0)}function Ei(e){return e.dynamicChildren=wi>0?Y||n:null,Ci(),wi>0&&Y&&Y.push(e),e}function Z(e,t,n,r,i,a){return Ei(Q(e,t,n,r,i,a,!0))}function Di(e,t,n,r,i){return Ei(Mi(e,t,n,r,i,!0))}function Oi(e){return e?e.__v_isVNode===!0:!1}function ki(e,t){return e.type===t.type&&e.key===t.key}var Ai=({key:e})=>e??null,ji=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||B(e)||h(e)?{i:G,r:e,k:t,f:!!n}:e);function Q(e,t=null,n=null,r=0,i=null,a=e===J?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ai(t),ref:t&&ji(t),scopeId:gn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:G};return s?(Bi(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),wi>0&&!o&&Y&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Y.push(c),c}var Mi=Ni;function Ni(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===ir)&&(e=bi),Oi(e)){let r=Fi(e,t,!0);return n&&Bi(r,n),wi>0&&!a&&Y&&(r.shapeFlag&6?Y[Y.indexOf(e)]=r:Y.push(r)),r.patchFlag=-2,r}if(la(e)&&(e=e.__vccOpts),t){t=Pi(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=A(e)),v(n)&&(It(n)&&!d(n)&&(n=s({},n)),t.style=le(n))}let o=g(e)?1:_i(e)?128:kn(e)?64:v(e)?4:h(e)?2:0;return Q(e,t,n,r,i,o,a,!0)}function Pi(e){return e?It(e)||Gr(e)?s({},e):e:null}function Fi(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Vi(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Ai(l),ref:t&&t.ref?n&&a?d(a)?a.concat(ji(t)):[a,ji(t)]:ji(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==J?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Fi(e.ssContent),ssFallback:e.ssFallback&&Fi(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&jn(u,c.clone(u)),u}function Ii(e=` `,t=0){return Mi(yi,null,e,t)}function Li(e=``,t=!1){return t?(X(),Di(bi,null,e)):Mi(bi,null,e)}function Ri(e){return e==null||typeof e==`boolean`?Mi(bi):d(e)?Mi(J,null,e.slice()):Oi(e)?zi(e):Mi(yi,null,String(e))}function zi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Fi(e)}function Bi(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Bi(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!Gr(t)?t._ctx=G:r===3&&G&&(G.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else h(t)?(t={default:t,_ctx:G},n=32):(t=String(t),r&64?(n=16,t=[Ii(t)]):n=8);e.children=t,e.shapeFlag|=n}function Vi(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=A([t.class,r.class]));else if(e===`style`)t.style=le([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Hi(e,t,n,r=null){H(e,t,7,[n,r])}var Ui=Dr(),Wi=0;function Gi(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||Ui,o={uid:Wi++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Se(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zr(i,a),emitsOptions:Pr(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=Mr.bind(null,o),e.ce&&e.ce(o),o}var $=null,Ki=()=>$||G,qi,Ji;{let e=ce(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};qi=t(`__VUE_INSTANCE_SETTERS__`,e=>$=e),Ji=t(`__VUE_SSR_SETTERS__`,e=>Qi=e)}var Yi=e=>{let t=$;return qi(e),e.scope.on(),()=>{e.scope.off(),qi(t)}},Xi=()=>{$&&$.scope.off(),qi(null)};function Zi(e){return e.vnode.shapeFlag&4}var Qi=!1;function $i(e,t=!1,n=!1){t&&Ji(t);let{props:r,children:i}=e.vnode,a=Zi(e);Kr(e,r,a,t),ai(e,i,n||t);let o=a?ea(e,t):void 0;return t&&Ji(!1),o}function ea(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,dr);let{setup:r}=n;if(r){ze();let n=e.setupContext=r.length>1?oa(e):null,i=Yi(e),a=Qt(r,e,0,[e.props,n]),o=y(a);if(Be(),i(),(o||e.sp)&&!Rn(e)&&Nn(e),o){if(a.then(Xi,Xi),t)return a.then(n=>{ta(e,n,t)}).catch(t=>{$t(t,e,0)});e.asyncDep=a}else ta(e,a,t)}else ia(e,t)}function ta(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Ut(t)),ia(e,n)}var na,ra;function ia(e,t,n){let i=e.type;if(!e.render){if(!t&&na&&!i.render){let t=i.template||vr(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=na(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,ra&&ra(e)}{let t=Yi(e);ze();try{mr(e)}finally{Be(),t()}}}var aa={get(e,t){return F(e,`get`,``),e[t]}};function oa(e){return{attrs:new Proxy(e.attrs,aa),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function sa(e){return e.exposed?e.exposeProxy||=new Proxy(Ut(Lt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in lr)return lr[n](e)},has(e,t){return t in e||t in lr}}):e.proxy}function ca(e,t=!0){return h(e)?e.displayName||e.name:e.name||t&&e.__name}function la(e){return h(e)&&`__vccOpts`in e}var ua=(e,t)=>Gt(e,t,Qi),da=`3.5.31`,fa=void 0,pa=typeof window<`u`&&window.trustedTypes;if(pa)try{fa=pa.createPolicy(`vue`,{createHTML:e=>e})}catch{}var ma=fa?e=>fa.createHTML(e):e=>e,ha=`http://www.w3.org/2000/svg`,ga=`http://www.w3.org/1998/Math/MathML`,_a=typeof document<`u`?document:null,va=_a&&_a.createElement(`template`),ya={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?_a.createElementNS(ha,e):t===`mathml`?_a.createElementNS(ga,e):n?_a.createElement(e,{is:n}):_a.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>_a.createTextNode(e),createComment:e=>_a.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>_a.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{va.innerHTML=ma(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=va.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},ba=Symbol(`_vtc`);function xa(e,t,n){let r=e[ba];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var Sa=Symbol(`_vod`),Ca=Symbol(`_vsh`),wa=Symbol(``),Ta=/(?:^|;)\s*display\s*:/;function Ea(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t)if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??Oa(r,t,``)}else for(let e in t)n[e]??Oa(r,e,``);for(let e in n)e===`display`&&(a=!0),Oa(r,e,n[e])}else if(i){if(t!==n){let e=r[wa];e&&(n+=`;`+e),r.cssText=n,a=Ta.test(n)}}else t&&e.removeAttribute(`style`);Sa in e&&(e[Sa]=a?r.display:``,e[Ca]&&(r.display=`none`))}var Da=/\s*!important$/;function Oa(e,t,n){if(d(n))n.forEach(n=>Oa(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=ja(e,t);Da.test(n)?e.setProperty(D(r),n.replace(Da,``),`important`):e[r]=n}}var ka=[`Webkit`,`Moz`,`ms`],Aa={};function ja(e,t){let n=Aa[t];if(n)return n;let r=E(t);if(r!==`filter`&&r in e)return Aa[t]=r;r=re(r);for(let n=0;n<ka.length;n++){let i=ka[n]+r;if(i in e)return Aa[t]=i}return t}var Ma=`http://www.w3.org/1999/xlink`;function Na(e,t,n,r,i,a=he(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Ma,t.slice(6,t.length)):e.setAttributeNS(Ma,t,n):n==null||a&&!ge(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function Pa(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?ma(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=ge(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function Fa(e,t,n,r){e.addEventListener(t,n,r)}function Ia(e,t,n,r){e.removeEventListener(t,n,r)}var La=Symbol(`_vei`);function Ra(e,t,n,r,i=null){let a=e[La]||(e[La]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Ba(t);r?Fa(e,n,a[t]=Wa(r,i),s):o&&(Ia(e,n,o,s),a[t]=void 0)}}var za=/(?:Once|Passive|Capture)$/;function Ba(e){let t;if(za.test(e)){t={};let n;for(;n=e.match(za);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):D(e.slice(2)),t]}var Va=0,Ha=Promise.resolve(),Ua=()=>Va||=(Ha.then(()=>Va=0),Date.now());function Wa(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;H(Ga(e,n.value),t,5,[e])};return n.value=e,n.attached=Ua(),n}function Ga(e,t){if(d(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}var Ka=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,qa=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?xa(e,r,c):t===`style`?Ea(e,n,r):a(t)?o(t)||Ra(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):Ja(e,t,r,c))?(Pa(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&Na(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Ya(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?Pa(e,E(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),Na(e,t,r,c))};function Ja(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Ka(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Ka(t)&&g(n)?!1:t in e}function Ya(e,t){let n=e._def.props;if(!n)return!1;let r=E(t);return Array.isArray(n)?n.some(e=>E(e)===r):Object.keys(n).some(e=>E(e)===r)}var Xa=s({patchProp:qa},ya),Za;function Qa(){return Za||=si(Xa)}var $a=((...e)=>{let t=Qa().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=to(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,eo(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function eo(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function to(e){return g(e)?document.querySelector(e):e}var no={class:`browser-shell`},ro={class:`browser-frame`},io={key:0,class:`live-menu-overlay`,"aria-label":`直播频道菜单`},ao={class:`live-menu-panel`},oo={class:`live-menu-heading`},so={class:`live-menu-columns`},co={class:`live-menu-column live-menu-column-left`},lo={class:`live-menu-column live-menu-column-right`},uo=[`onClick`],fo=Mn({__name:`HomeBrowser`,props:{activeUrl:{},setBackButtonRef:{type:Function},setWebviewRef:{type:Function},showLiveMenu:{type:Boolean},liveMenuGroups:{},activeLiveGroupIndex:{},activeLiveColumn:{},activeLiveItemIndex:{},liveMenuHeading:{}},emits:[`browser-ready`,`go-home`,`select-live-channel`],setup(e){return(t,n)=>{let r=rr(`webview`);return X(),Z(`section`,no,[Q(`div`,ro,[Mi(r,{ref:e.setWebviewRef,class:`browser-view`,src:e.activeUrl,allowpopups:`false`,onDomReady:n[0]||=e=>t.$emit(`browser-ready`)},null,8,[`src`]),e.showLiveMenu?(X(),Z(`div`,io,[Q(`div`,ao,[Q(`div`,oo,j(e.liveMenuHeading),1),Q(`div`,so,[Q(`div`,co,[(X(!0),Z(J,null,sr(e.liveMenuGroups,(t,n)=>(X(),Z(`button`,{key:t.label,type:`button`,class:A([`live-menu-item live-menu-group-item`,{"is-selected":n===e.activeLiveGroupIndex,"is-active":e.activeLiveColumn===`group`&&n===e.activeLiveGroupIndex}])},j(t.label),3))),128))]),Q(`div`,lo,[(X(!0),Z(J,null,sr(e.liveMenuGroups[e.activeLiveGroupIndex]?.items??[],(n,r)=>(X(),Z(`button`,{key:`${e.liveMenuGroups[e.activeLiveGroupIndex]?.label}-${n}-${r}`,type:`button`,class:A([`live-menu-item live-menu-channel-item`,{"is-selected":r===e.activeLiveItemIndex,"is-active":e.activeLiveColumn===`item`&&r===e.activeLiveItemIndex}]),onClick:e=>t.$emit(`select-live-channel`,n)},j(n),11,uo))),128))])])])])):Li(``,!0),Q(`button`,{ref:e.setBackButtonRef,type:`button`,class:`back-home-button`,"aria-label":`返回主页`,onClick:n[1]||=e=>t.$emit(`go-home`)},` 返回主页 `,512)])])}}}),po=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},mo=po(fo,[[`__scopeId`,`data-v-91c36454`]]),ho={class:`top-bar`},go={class:`top-actions`},_o={class:`hero-panel`},vo={class:`time-block`},yo={class:`time-value`},bo={class:`time-date`},xo={class:`card-grid`,"aria-label":`快捷入口`},So=[`tabindex`,`onClick`,`onFocus`],Co={class:`card-art`},wo={class:`card-badge`},To={class:`card-title`},Eo={class:`card-label`},Do=po(Mn({__name:`HomeLanding`,props:{currentTime:{},currentDate:{},shortcuts:{},selectedIndex:{},setCardRef:{type:Function}},emits:[`refresh-time`,`close-window`,`open-site`,`focus-card`],setup(e){return(t,n)=>(X(),Z(J,null,[n[5]||=Q(`div`,{class:`background-image`},null,-1),n[6]||=Q(`div`,{class:`background-overlay`},null,-1),Q(`header`,ho,[n[2]||=Q(`div`,{class:`top-left`},[Q(`span`,{class:`status-dot`}),Q(`span`,{class:`status-dot`})],-1),Q(`div`,go,[Q(`button`,{type:`button`,class:`icon-button`,"aria-label":`刷新时间`,onClick:n[0]||=e=>t.$emit(`refresh-time`)},` ↻ `),Q(`button`,{type:`button`,class:`icon-button`,"aria-label":`退出应用`,onClick:n[1]||=e=>t.$emit(`close-window`)},` ✕ `)])]),Q(`section`,_o,[n[3]||=Q(`span`,{class:`hero-line hero-line-top`},null,-1),Q(`div`,vo,[Q(`div`,yo,j(e.currentTime),1),Q(`div`,bo,j(e.currentDate),1)]),n[4]||=Q(`span`,{class:`hero-line hero-line-bottom`},null,-1)]),Q(`section`,xo,[(X(!0),Z(J,null,sr(e.shortcuts,(n,r)=>(X(),Z(`button`,{key:n.name,type:`button`,class:A([`site-card`,[n.theme,{"is-selected":e.selectedIndex===r}]]),tabindex:e.selectedIndex===r?0:-1,ref_for:!0,ref:t=>e.setCardRef(t,r),onClick:e=>t.$emit(`open-site`,n),onFocus:e=>t.$emit(`focus-card`,r)},[Q(`div`,Co,[Q(`div`,wo,j(n.badge),1),Q(`div`,To,j(n.name),1)]),Q(`div`,Eo,j(n.name),1)],42,So))),128))])],64))}}),[[`__scopeId`,`data-v-22d2bd2c`]]),Oo=[{name:`TV直播`,badge:`LIVE`,url:`https://www.yangshipin.cn/tv/home`,theme:`theme-live`},{name:`央视片库`,badge:`CCTV`,url:`https://tv.cctv.com/`,theme:`theme-cctv`},{name:`抖音`,badge:`DY`,url:`https://www.douyin.com/`,theme:`theme-douyin`},{name:`腾讯视频`,badge:`QQ`,url:`https://v.qq.com/`,theme:`theme-tencent`}],ko=`(function registerYangshipinPlugin() {
  window.__tvAssistantPlugins = window.__tvAssistantPlugins || {};
  if (window.__tvAssistantPlugins.yangshipin) {
    return;
  }

  const OVERLAY_ID = 'tv-assistant-yangshipin-overlay';
  const STYLE_ID = 'tv-assistant-yangshipin-style';
  const HIDDEN_CLASS = 'tv-assistant-yangshipin-hidden';
  const SELECTOR_CANDIDATES = [
    '.tv-main-con-r-list-left',
    '.tv-main-con-r-list',
    '[class*="tv-main-con-r-list"]',
    '[class*="channel"]',
    '[class*="list"]'
  ];
  const CCTV_PATTERN = /^(CCTV|CGTN)/i;
  const SATELLITE_PATTERN = /(卫视)$/;

  const state = {
    initialized: false,
    config: {
      volume: 0.6
    },
    overlay: null,
    volumeIndicator: null,
    lastBoundVideo: null,
    videoObserver: null
  };

  function clampVolume(volume) {
    if (typeof volume !== 'number' || Number.isNaN(volume)) {
      return state.config.volume;
    }

    return Math.max(0, Math.min(1, volume));
  }

  function normalizeText(text) {
    return String(text || '')
      .replace(/\\s+/g, ' ')
      .replace(/\\([^)]*\\)/g, '')
      .replace(/[（(][^）)]*[）)]/g, '')
      .replace(/高清|超清|标清|4K|HD/gi, '')
      .trim();
  }

  function isChannelName(name) {
    if (!name || name.length > 20) {
      return false;
    }

    if (/VIP|充值|登录|扫码|下载|打开APP|节目单|更多/.test(name)) {
      return false;
    }

    return CCTV_PATTERN.test(name) || SATELLITE_PATTERN.test(name);
  }

  function dedupe(values) {
    return [...new Set(values)];
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = \`
      #\${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 26px;
        background:
          radial-gradient(circle at center, rgba(16, 31, 28, 0.28), rgba(0, 0, 0, 0.92) 70%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.96));
        color: #f7fff8;
        font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
        pointer-events: none;
      }

      #\${OVERLAY_ID}[hidden] {
        display: none !important;
      }

      #\${OVERLAY_ID} .spinner {
        width: 72px;
        height: 72px;
        border: 5px solid rgba(255, 255, 255, 0.18);
        border-top-color: #7dff9c;
        border-radius: 50%;
        box-shadow: 0 0 32px rgba(125, 255, 156, 0.18);
        animation: tv-assistant-spin 1s linear infinite;
      }

      #\${OVERLAY_ID} .loading-text {
        font-size: 22px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(238, 248, 239, 0.72);
      }

      #\${OVERLAY_ID} .channel-title {
        font-size: clamp(44px, 5vw, 88px);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-align: center;
        text-shadow: 0 0 28px rgba(125, 255, 156, 0.18);
      }

      .\${HIDDEN_CLASS} {
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }

      .tv-assistant-volume-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2147483647;
        min-width: 180px;
        padding: 16px 28px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.72);
        color: #ffffff;
        font-size: 34px;
        font-weight: 700;
        text-align: center;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }

      .tv-assistant-volume-indicator.visible {
        opacity: 1;
      }

      @keyframes tv-assistant-spin {
        to {
          transform: rotate(360deg);
        }
      }
    \`;

    document.head.appendChild(style);
  }

  function ensureOverlay() {
    injectStyles();

    if (state.overlay?.isConnected) {
      return state.overlay;
    }

    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;

    const title = document.createElement('div');
    title.className = 'channel-title';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Loading';

    overlay.appendChild(title);
    overlay.appendChild(spinner);
    overlay.appendChild(loadingText);
    document.body.appendChild(overlay);
    state.overlay = overlay;

    return overlay;
  }

  function showOverlay(channelName = '') {
    const overlay = ensureOverlay();
    const title = overlay.querySelector('.channel-title');
    if (title) {
      title.textContent = channelName;
    }

    overlay.hidden = false;
  }

  function hideOverlay() {
    const overlay = ensureOverlay();
    overlay.hidden = true;
  }

  function ensureVolumeIndicator() {
    if (state.volumeIndicator?.isConnected) {
      return state.volumeIndicator;
    }

    const indicator = document.createElement('div');
    indicator.className = 'tv-assistant-volume-indicator';
    document.body.appendChild(indicator);
    state.volumeIndicator = indicator;
    return indicator;
  }

  function showVolumeIndicator(volume) {
    const indicator = ensureVolumeIndicator();
    indicator.textContent = volume === 0 ? '静音' : \`音量 \${Math.round(volume * 100)}\`;
    indicator.classList.add('visible');

    window.clearTimeout(indicator.__hideTimer);
    indicator.__hideTimer = window.setTimeout(() => {
      indicator.classList.remove('visible');
    }, 1200);
  }

  function applyFullscreen(video) {
    if (!(video instanceof HTMLVideoElement)) {
      return false;
    }

    for (const child of document.body.children) {
      if (child.id === OVERLAY_ID || child === state.volumeIndicator) {
        continue;
      }

      if (child.contains(video)) {
        child.classList.remove(HIDDEN_CLASS);
        continue;
      }

      child.classList.add(HIDDEN_CLASS);
    }

    let current = video;
    while (current && current !== document.body) {
      current.style.setProperty('position', 'static', 'important');
      current.style.setProperty('display', 'block', 'important');
      current.style.setProperty('width', '100%', 'important');
      current.style.setProperty('height', '100%', 'important');
      current.style.setProperty('max-width', 'none', 'important');
      current.style.setProperty('max-height', 'none', 'important');
      current.style.setProperty('margin', '0', 'important');
      current.style.setProperty('padding', '0', 'important');
      current.style.setProperty('opacity', '1', 'important');
      current.style.setProperty('visibility', 'visible', 'important');
      current = current.parentElement;
    }

    document.documentElement.style.setProperty('width', '100%', 'important');
    document.documentElement.style.setProperty('height', '100%', 'important');
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('width', '100%', 'important');
    document.body.style.setProperty('height', '100%', 'important');
    document.body.style.setProperty('margin', '0', 'important');
    document.body.style.setProperty('padding', '0', 'important');
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('background', '#000', 'important');

    video.style.setProperty('position', 'fixed', 'important');
    video.style.setProperty('inset', '0', 'important');
    video.style.setProperty('width', '100vw', 'important');
    video.style.setProperty('height', '100vh', 'important');
    video.style.setProperty('object-fit', 'cover', 'important');
    video.style.setProperty('z-index', '2147483644', 'important');

    return true;
  }

  function extractCurrentChannelName() {
    const candidates = ['.tvSelect', '[class*="select"]', '[class*="active"]', '[aria-selected="true"]'];
    for (const selector of candidates) {
      const element = document.querySelector(selector);
      const text = normalizeText(element?.textContent || '');
      if (isChannelName(text)) {
        return text;
      }
    }

    return '';
  }

  function applyConfiguredVolume(video) {
    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    const volume = clampVolume(state.config.volume);
    video.volume = volume;
    video.muted = volume === 0;
  }

  function bindVideo(video) {
    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    state.lastBoundVideo = video;
    applyConfiguredVolume(video);
    applyFullscreen(video);

    if (video.dataset.tvAssistantBound === 'true') {
      return;
    }

    video.dataset.tvAssistantBound = 'true';

    const showLoading = () => showOverlay(extractCurrentChannelName());
    const hideLoading = () => hideOverlay();

    video.addEventListener('loadstart', showLoading);
    video.addEventListener('waiting', showLoading);
    video.addEventListener('seeking', showLoading);
    video.addEventListener('stalled', showLoading);
    video.addEventListener('playing', hideLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('play', hideLoading);
  }

  function ensureVideoWatcher() {
    if (state.videoObserver) {
      return;
    }

    state.videoObserver = new MutationObserver(() => {
      const video = document.querySelector('video');
      if (video) {
        bindVideo(video);
      }
    });

    state.videoObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function collectFromContainer(container) {
    const names = [];
    const nodes = container.querySelectorAll('div, span, a, button, li');

    nodes.forEach((node) => {
      const text = normalizeText(node.textContent || '');
      if (isChannelName(text)) {
        names.push(text);
      }
    });

    return dedupe(names);
  }

  function findBestContainer() {
    for (const selector of SELECTOR_CANDIDATES) {
      const containers = document.querySelectorAll(selector);
      for (const container of containers) {
        const names = collectFromContainer(container);
        if (names.length >= 8) {
          return { container, names };
        }
      }
    }

    return null;
  }

  function collectFromWholePage() {
    const names = [];
    const nodes = document.querySelectorAll('div, span, a, button, li');

    nodes.forEach((node) => {
      const text = normalizeText(node.textContent || '');
      if (isChannelName(text)) {
        names.push(text);
      }
    });

    return dedupe(names);
  }

  function getChannelEntries() {
    const entries = [];
    const nodes = document.querySelectorAll('div, span, a, button, li');

    nodes.forEach((node) => {
      const text = normalizeText(node.textContent || '');
      if (!isChannelName(text)) {
        return;
      }

      let clickable = node;
      while (
        clickable &&
        clickable !== document.body &&
        clickable.tagName !== 'A' &&
        clickable.tagName !== 'BUTTON' &&
        clickable.getAttribute('role') !== 'button' &&
        typeof clickable.onclick !== 'function'
      ) {
        clickable = clickable.parentElement;
      }

      entries.push({
        name: text,
        element: clickable && clickable !== document.body ? clickable : node
      });
    });

    return entries.filter((entry, index, array) => array.findIndex((item) => item.name === entry.name) === index);
  }

  function buildMenuData(channelNames) {
    const result = {
      currentChannel: extractCurrentChannelName(),
      央视频道: [],
      卫视频道: []
    };

    channelNames.forEach((name) => {
      if (CCTV_PATTERN.test(name)) {
        result.央视频道.push(name);
        return;
      }

      if (SATELLITE_PATTERN.test(name)) {
        result.卫视频道.push(name);
      }
    });

    result.央视频道 = dedupe(result.央视频道);
    result.卫视频道 = dedupe(result.卫视频道);
    return result;
  }

  function getMenuData() {
    const bestContainer = findBestContainer();
    const channelNames = bestContainer?.names?.length ? bestContainer.names : collectFromWholePage();
    return buildMenuData(channelNames);
  }

  function waitForMenuData(timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const startedAt = Date.now();

      const tryResolve = () => {
        const data = getMenuData();
        if (data.央视频道.length > 0 || data.卫视频道.length > 0) {
          resolve(data);
          return true;
        }

        return false;
      };

      if (tryResolve()) {
        return;
      }

      const observer = new MutationObserver(() => {
        if (tryResolve()) {
          observer.disconnect();
          clearInterval(timer);
        }
      });

      const timer = window.setInterval(() => {
        if (Date.now() - startedAt > timeoutMs) {
          observer.disconnect();
          clearInterval(timer);
          reject(new Error('等待频道列表超时'));
        }
      }, 500);

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  function simulateClick(element) {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    element.dispatchEvent(event);
  }

  function selectChannel(channelName) {
    const targetName = normalizeText(channelName);
    const entries = getChannelEntries();
    const target = entries.find((entry) => entry.name === targetName);

    if (!target) {
      return false;
    }

    showOverlay(targetName);
    target.element.scrollIntoView({ block: 'nearest' });
    simulateClick(target.element);
    return true;
  }

  function setVolume(volume) {
    const nextVolume = clampVolume(volume);
    state.config.volume = nextVolume;

    const video = document.querySelector('video');
    if (video instanceof HTMLVideoElement) {
      video.volume = nextVolume;
      video.muted = nextVolume === 0;
    }

    showVolumeIndicator(nextVolume);
    return nextVolume;
  }

  function adjustVolume(delta) {
    const video = document.querySelector('video');
    const baseVolume = video instanceof HTMLVideoElement ? video.volume : state.config.volume;
    return setVolume(baseVolume + delta);
  }

  function init(config = {}) {
    if (typeof config === 'object' && config) {
      state.config.volume = clampVolume(config.volume ?? state.config.volume);
    }

    ensureOverlay();
    ensureVideoWatcher();

    const video = document.querySelector('video');
    if (video) {
      bindVideo(video);
      if (video.readyState >= 3 && !video.paused) {
        hideOverlay();
      } else {
        showOverlay(extractCurrentChannelName());
      }
    } else {
      showOverlay(extractCurrentChannelName());
    }

    state.initialized = true;
    return true;
  }

  window.__tvAssistantPlugins.yangshipin = {
    id: 'yangshipin',
    init,
    getMenuData,
    waitForMenuData,
    selectChannel,
    setVolume,
    adjustVolume,
    showOverlay,
    hideOverlay
  };
})();
`;function Ao(e){return`
${ko}
${e}
  `}var jo=[{id:`yangshipin`,matches:e=>e.startsWith(`https://www.yangshipin.cn/tv/home`),supportsLiveMenu:!0,supportsVolume:!0,script:ko,buildInitScript:e=>Ao(`window.__tvAssistantPlugins.yangshipin.init(${JSON.stringify(e)});`),buildMenuDataScript:()=>Ao(`window.__tvAssistantPlugins.yangshipin.waitForMenuData(20000);`),buildSelectChannelScript:e=>Ao(`window.__tvAssistantPlugins.yangshipin.selectChannel(${JSON.stringify(e)});`),buildAdjustVolumeScript:e=>Ao(`window.__tvAssistantPlugins.yangshipin.adjustVolume(${e});`)}];function Mo(e){return jo.find(t=>t.matches(e))??null}$a(po(Mn({__name:`HomePage`,setup(e){let t=window.require?.(`electron`)?.ipcRenderer??null,n=V(new Date),r=V(0),i=V(``),a=V(``),o=V([]),s=V(null),c=V(null),l=V(!1),u=V(0),d=V(`group`),f=V([0,0]),p=V(``),m=V(``),h=V({}),g=V([{label:`央视频道`,items:[`内容稍后添加`]},{label:`卫视频道`,items:[`内容稍后添加`]}]),_,v=0,y=new Intl.DateTimeFormat(`zh-CN`,{month:`long`,day:`numeric`,weekday:`long`}),b=ua(()=>n.value.toLocaleTimeString(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,hour12:!1})),x=ua(()=>Mo(i.value)),S=ua(()=>y.format(n.value)),C=ua(()=>x.value?.supportsLiveMenu??!1),w=ua(()=>g.value[u.value]?.items??[]),T=ua(()=>f.value[u.value]??0),ee=ua(()=>p.value||g.value[u.value]?.label||``);function te(){n.value=new Date}function E(e){i.value=e.url,a.value=e.name,oe(),p.value=``,m.value=``,h.value={},sn(()=>{s.value?.focus()})}function ne(){i.value=``,a.value=``,oe(),p.value=``,m.value=``,h.value={},sn(()=>{O()})}function D(e,t){if(e instanceof HTMLButtonElement){o.value[t]=e;return}delete o.value[t]}function re(e){s.value=e instanceof HTMLButtonElement?e:null}function ie(e){c.value=e}function O(){o.value[r.value]?.focus()}function ae(e){let t=Oo.length;r.value=(r.value+e+t)%t,O()}function k(){C.value&&(l.value=!l.value,l.value||(d.value=`group`))}function oe(){l.value=!1,d.value=`group`}function se(e){let t=g.value.length;u.value=(u.value+e+t)%t}function ce(e){let t=w.value.length,n=(T.value+e+t)%t;f.value[u.value]=n}function le(e){if(!e)return;let t=e.trim();p.value=t;let n=g.value.findIndex(e=>e.items.includes(t));if(n===-1)return;let r=g.value[n].items.indexOf(t);u.value=n,f.value[n]=r}function ue(e){let t=e.央视频道?.length?e.央视频道:[`内容稍后添加`],n=e.卫视频道?.length?e.卫视频道:[`内容稍后添加`];g.value=[{label:`央视频道`,items:t},{label:`卫视频道`,items:n}],f.value=g.value.map(()=>0),u.value=0,le(e.currentChannel??``)}async function de(e){return await t?.invoke(`plugin-config:get`,e)??{}}async function fe(e,n){h.value=n,await t?.invoke(`plugin-config:set`,e,n)}async function pe(){let e=c.value,t=x.value;if(!e||!t)return null;m.value!==t.id&&(h.value=await de(t.id),m.value=t.id);try{await e.executeJavaScript(t.buildInitScript(h.value),!0)}catch(e){return console.error(`初始化插件 ${t.id} 失败:`,e),null}return t}async function me(){let e=c.value,t=x.value;if(!e||!t?.supportsLiveMenu)return;let n=++v;try{await pe();let r=await e.executeJavaScript(t.buildMenuDataScript(),!0);if(n!==v||!r)return;ue(r)}catch(e){console.error(`获取插件 ${t.id} 菜单数据失败:`,e),ue({})}}async function he(e){let t=c.value,n=x.value;if(!(!t||!n?.supportsLiveMenu))try{le(e),await pe(),await t.executeJavaScript(n.buildSelectChannelScript(e),!0)&&(oe(),window.setTimeout(()=>{me()},1200))}catch(e){console.error(`插件 ${n.id} 切换频道失败:`,e)}}async function ge(e){let t=c.value,n=x.value;if(!(!t||!n?.supportsVolume))try{await pe();let r=await t.executeJavaScript(n.buildAdjustVolumeScript(e),!0);typeof r==`number`&&await fe(n.id,{...h.value,volume:r})}catch(e){console.error(`插件 ${n.id} 调整音量失败:`,e)}}function _e(){let e=x.value;e&&(pe(),e.supportsLiveMenu&&me())}function ve(e){if(i.value){if(l.value){if(e.key===`Escape`||e.key===`Backspace`){e.preventDefault(),oe();return}if(e.key===`ArrowLeft`||e.key===`ArrowRight`){e.preventDefault(),d.value=d.value===`group`?`item`:`group`;return}if(e.key===`ArrowUp`){if(e.preventDefault(),d.value===`group`){se(-1);return}ce(-1);return}if(e.key===`ArrowDown`){if(e.preventDefault(),d.value===`group`){se(1);return}ce(1);return}if(e.key===`Enter`&&d.value===`item`){e.preventDefault(),he(w.value[T.value]);return}return}if(C.value&&e.key===`Enter`){e.preventDefault(),k();return}if(e.key===`-`||e.key===`_`){e.preventDefault(),ge(-.05);return}if(e.key===`=`||e.key===`+`){e.preventDefault(),ge(.05);return}(e.key===`Escape`||e.key===`Backspace`)&&(e.preventDefault(),ne());return}if(e.key===`ArrowLeft`||e.key===`ArrowUp`){e.preventDefault(),ae(-1);return}if(e.key===`ArrowRight`||e.key===`ArrowDown`){e.preventDefault(),ae(1);return}(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),E(Oo[r.value]))}function ye(e,t){ve(new KeyboardEvent(`keydown`,{key:t.key}))}function j(){window.close()}return qn(()=>{te(),_=window.setInterval(te,1e3),t?.on(`app-keydown`,ye),sn(()=>{O()})}),Xn(()=>{_&&window.clearInterval(_),t?.removeListener(`app-keydown`,ye)}),(e,t)=>(X(),Z(`main`,{class:A([`home-shell`,{"is-browser-open":!!i.value}]),tabindex:`0`,onKeydown:ve},[i.value?(X(),Di(mo,{key:1,"active-url":i.value,"set-back-button-ref":re,"set-webview-ref":ie,"show-live-menu":l.value,"live-menu-groups":g.value,"active-live-group-index":u.value,"active-live-column":d.value,"active-live-item-index":T.value,"live-menu-heading":ee.value,onBrowserReady:_e,onGoHome:ne,onSelectLiveChannel:he},null,8,[`active-url`,`show-live-menu`,`live-menu-groups`,`active-live-group-index`,`active-live-column`,`active-live-item-index`,`live-menu-heading`])):(X(),Di(Do,{key:0,"current-time":b.value,"current-date":S.value,shortcuts:Vt(Oo),"selected-index":r.value,"set-card-ref":D,onRefreshTime:te,onCloseWindow:j,onOpenSite:E,onFocusCard:t[0]||=e=>r.value=e},null,8,[`current-time`,`current-date`,`shortcuts`,`selected-index`]))],34))}}),[[`__scopeId`,`data-v-a35c862f`]])).mount(`#app`);