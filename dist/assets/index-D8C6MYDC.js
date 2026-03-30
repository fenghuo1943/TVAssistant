(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,T=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),ee=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},te=/-\w/g,E=ee(e=>e.replace(te,e=>e.slice(1).toUpperCase())),ne=/\B([A-Z])/g,D=ee(e=>e.replace(ne,`-$1`).toLowerCase()),re=ee(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=ee(e=>e?`on${re(e)}`:``),O=(e,t)=>!Object.is(e,t),ae=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},k=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},oe=e=>{let t=parseFloat(e);return isNaN(t)?e:t},se,ce=()=>se||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function le(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?pe(r):le(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(g(e)||v(e))return e}var ue=/;(?![^(]*\))/g,de=/:([^]+)/,fe=/\/\*[^]*?\*\//g;function pe(e){let t={};return e.replace(fe,``).split(ue).forEach(e=>{if(e){let n=e.split(de);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function A(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=A(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var me=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,he=e(me);me+``;function ge(e){return!!e||e===``}function _e(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=ve(e[r],t[r]);return n}function ve(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?_e(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!ve(e[n],t[n]))return!1}}return String(e)===String(t)}var ye=e=>!!(e&&e.__v_isRef===!0),j=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?ye(e)?j(e.value):JSON.stringify(e,be,2):String(e),be=(e,t)=>ye(t)?be(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[xe(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>xe(e))}:_(t)?xe(t):v(t)&&!d(t)&&!C(t)?String(t):t,xe=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,M,Se=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=M,!e&&M&&(this.index=(M.scopes||=[]).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=M;try{return M=this,e()}finally{M=t}}}on(){++this._on===1&&(this.prevScope=M,M=this)}off(){this._on>0&&--this._on===0&&(M=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Ce(){return M}var N,we=new WeakSet,Te=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,M&&M.active&&M.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,we.has(this)&&(we.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||ke(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ve(this),Me(this);let e=N,t=P;N=this,P=!0;try{return this.fn()}finally{Ne(this),N=e,P=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ie(e);this.deps=this.depsTail=void 0,Ve(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?we.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Pe(this)&&this.run()}get dirty(){return Pe(this)}},Ee=0,De,Oe;function ke(e,t=!1){if(e.flags|=8,t){e.next=Oe,Oe=e;return}e.next=De,De=e}function Ae(){Ee++}function je(){if(--Ee>0)return;if(Oe){let e=Oe;for(Oe=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;De;){let t=De;for(De=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Me(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Ne(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Ie(r),Le(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Pe(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Fe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Fe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===He)||(e.globalVersion=He,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Pe(e))))return;e.flags|=2;let t=e.dep,n=N,r=P;N=e,P=!0;try{Me(e);let n=e.fn(e._value);(t.version===0||O(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{N=n,P=r,Ne(e),e.flags&=-3}}function Ie(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Ie(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Le(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var P=!0,Re=[];function ze(){Re.push(P),P=!1}function Be(){let e=Re.pop();P=e===void 0?!0:e}function Ve(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=N;N=void 0;try{t()}finally{N=e}}}var He=0,Ue=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},We=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!N||!P||N===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==N)t=this.activeLink=new Ue(N,this),N.deps?(t.prevDep=N.depsTail,N.depsTail.nextDep=t,N.depsTail=t):N.deps=N.depsTail=t,Ge(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=N.depsTail,t.nextDep=void 0,N.depsTail.nextDep=t,N.depsTail=t,N.deps===t&&(N.deps=e)}return t}trigger(e){this.version++,He++,this.notify(e)}notify(e){Ae();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{je()}}};function Ge(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ge(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ke=new WeakMap,qe=Symbol(``),Je=Symbol(``),Ye=Symbol(``);function F(e,t,n){if(P&&N){let t=Ke.get(e);t||Ke.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new We),r.map=t,r.key=n),r.track()}}function Xe(e,t,n,r,i,a){let o=Ke.get(e);if(!o){He++;return}let s=e=>{e&&e.trigger()};if(Ae(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ye||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ye)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`delete`:i||(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`set`:f(e)&&s(o.get(qe));break}}je()}function Ze(e){let t=L(e);return t===e?t:(F(t,`iterate`,Ye),I(e)?t:t.map(R))}function Qe(e){return F(e=L(e),`iterate`,Ye),e}function $e(e,t){return It(e)?zt(Ft(e)?R(t):t):R(t)}var et={__proto__:null,[Symbol.iterator](){return tt(this,Symbol.iterator,e=>$e(this,e))},concat(...e){return Ze(this).concat(...e.map(e=>d(e)?Ze(e):e))},entries(){return tt(this,`entries`,e=>(e[1]=$e(this,e[1]),e))},every(e,t){return rt(this,`every`,e,t,void 0,arguments)},filter(e,t){return rt(this,`filter`,e,t,e=>e.map(e=>$e(this,e)),arguments)},find(e,t){return rt(this,`find`,e,t,e=>$e(this,e),arguments)},findIndex(e,t){return rt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return rt(this,`findLast`,e,t,e=>$e(this,e),arguments)},findLastIndex(e,t){return rt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return rt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return at(this,`includes`,e)},indexOf(...e){return at(this,`indexOf`,e)},join(e){return Ze(this).join(e)},lastIndexOf(...e){return at(this,`lastIndexOf`,e)},map(e,t){return rt(this,`map`,e,t,void 0,arguments)},pop(){return ot(this,`pop`)},push(...e){return ot(this,`push`,e)},reduce(e,...t){return it(this,`reduce`,e,t)},reduceRight(e,...t){return it(this,`reduceRight`,e,t)},shift(){return ot(this,`shift`)},some(e,t){return rt(this,`some`,e,t,void 0,arguments)},splice(...e){return ot(this,`splice`,e)},toReversed(){return Ze(this).toReversed()},toSorted(e){return Ze(this).toSorted(e)},toSpliced(...e){return Ze(this).toSpliced(...e)},unshift(...e){return ot(this,`unshift`,e)},values(){return tt(this,`values`,e=>$e(this,e))}};function tt(e,t,n){let r=Qe(e),i=r[t]();return r!==e&&!I(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var nt=Array.prototype;function rt(e,t,n,r,i,a){let o=Qe(e),s=o!==e&&!I(e),c=o[t];if(c!==nt[t]){let t=c.apply(e,a);return s?R(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,$e(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function it(e,t,n,r){let i=Qe(e),a=i!==e&&!I(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=$e(e,t)),n.call(this,t,$e(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?$e(e,c):c}function at(e,t,n){let r=L(e);F(r,`iterate`,Ye);let i=r[t](...n);return(i===-1||i===!1)&&Lt(n[0])?(n[0]=L(n[0]),r[t](...n)):i}function ot(e,t,n=[]){ze(),Ae();let r=L(e)[t].apply(e,n);return je(),Be(),r}var st=e(`__proto__,__v_isRef,__isVue`),ct=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function lt(e){_(e)||(e=String(e));let t=L(this);return F(t,`has`,e),t.hasOwnProperty(e)}var ut=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Ot:Dt:i?Et:Tt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=et[t]))return e;if(t===`hasOwnProperty`)return lt}let o=Reflect.get(e,t,z(e)?e:n);if((_(t)?ct.has(t):st(t))||(r||F(e,`get`,t),i))return o;if(z(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Nt(e):e}return v(o)?r?Nt(o):jt(o):o}},dt=class extends ut{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=It(i);if(!I(n)&&!It(n)&&(i=L(i),n=L(n)),!a&&z(i)&&!z(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,z(e)?e:r);return e===L(r)&&(o?O(n,i)&&Xe(e,`set`,t,n,i):Xe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Xe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!ct.has(t))&&F(e,`has`,t),n}ownKeys(e){return F(e,`iterate`,d(e)?`length`:qe),Reflect.ownKeys(e)}},ft=class extends ut{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},pt=new dt,mt=new ft,ht=new dt(!0),gt=e=>e,_t=e=>Reflect.getPrototypeOf(e);function vt(e,t,n){return function(...r){let i=this.__v_raw,a=L(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?gt:t?zt:R;return!t&&F(a,`iterate`,l?Je:qe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function yt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function bt(e,t){let n={get(n){let r=this.__v_raw,i=L(r),a=L(n);e||(O(n,a)&&F(i,`get`,n),F(i,`get`,a));let{has:o}=_t(i),s=t?gt:e?zt:R;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&F(L(t),`iterate`,qe),t.size},has(t){let n=this.__v_raw,r=L(n),i=L(t);return e||(O(t,i)&&F(r,`has`,t),F(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=L(a),s=t?gt:e?zt:R;return!e&&F(o,`iterate`,qe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:yt(`add`),set:yt(`set`),delete:yt(`delete`),clear:yt(`clear`)}:{add(e){let n=L(this),r=_t(n),i=L(e),a=!t&&!I(e)&&!It(e)?i:e;return r.has.call(n,a)||O(e,a)&&r.has.call(n,e)||O(i,a)&&r.has.call(n,i)||(n.add(a),Xe(n,`add`,a,a)),this},set(e,n){!t&&!I(n)&&!It(n)&&(n=L(n));let r=L(this),{has:i,get:a}=_t(r),o=i.call(r,e);o||=(e=L(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?O(n,s)&&Xe(r,`set`,e,n,s):Xe(r,`add`,e,n),this},delete(e){let t=L(this),{has:n,get:r}=_t(t),i=n.call(t,e);i||=(e=L(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Xe(t,`delete`,e,void 0,a),o},clear(){let e=L(this),t=e.size!==0,n=e.clear();return t&&Xe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=vt(r,e,t)}),n}function xt(e,t){let n=bt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var St={get:xt(!1,!1)},Ct={get:xt(!1,!0)},wt={get:xt(!0,!1)},Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap,Ot=new WeakMap;function kt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function At(e){return e.__v_skip||!Object.isExtensible(e)?0:kt(S(e))}function jt(e){return It(e)?e:Pt(e,!1,pt,St,Tt)}function Mt(e){return Pt(e,!1,ht,Ct,Et)}function Nt(e){return Pt(e,!0,mt,wt,Dt)}function Pt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=At(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function Ft(e){return It(e)?Ft(e.__v_raw):!!(e&&e.__v_isReactive)}function It(e){return!!(e&&e.__v_isReadonly)}function I(e){return!!(e&&e.__v_isShallow)}function Lt(e){return e?!!e.__v_raw:!1}function L(e){let t=e&&e.__v_raw;return t?L(t):e}function Rt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&k(e,`__v_skip`,!0),e}var R=e=>v(e)?jt(e):e,zt=e=>v(e)?Nt(e):e;function z(e){return e?e.__v_isRef===!0:!1}function B(e){return Bt(e,!1)}function Bt(e,t){return z(e)?e:new Vt(e,t)}var Vt=class{constructor(e,t){this.dep=new We,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:L(e),this._value=t?e:R(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||I(e)||It(e);e=n?e:L(e),O(e,t)&&(this._rawValue=e,this._value=n?e:R(e),this.dep.trigger())}};function Ht(e){return z(e)?e.value:e}var Ut={get:(e,t,n)=>t===`__v_raw`?e:Ht(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return z(i)&&!z(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Wt(e){return Ft(e)?e:new Proxy(e,Ut)}var Gt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new We(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=He-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&N!==this)return ke(this,!0),!0}get value(){let e=this.dep.track();return Fe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Kt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Gt(r,i,n)}var qt={},Jt=new WeakMap,Yt=void 0;function Xt(e,t=!1,n=Yt){if(n){let t=Jt.get(n);t||Jt.set(n,t=[]),t.push(e)}}function Zt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:I(e)||o===!1||o===0?Qt(e,1):Qt(e),m,g,_,v,y=!1,b=!1;if(z(e)?(g=()=>e.value,y=I(e)):Ft(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Ft(e)||I(e)),g=()=>e.map(e=>{if(z(e))return e.value;if(Ft(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){ze();try{_()}finally{Be()}}let t=Yt;Yt=m;try{return f?f(e,3,[v]):e(v)}finally{Yt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>Qt(e(),t)}let x=Ce(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(qt):qt,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let e=m.run();if(o||y||(b?e.some((e,t)=>O(e,C[t])):O(e,C))){_&&_();let t=Yt;Yt=m;try{let t=[e,C===qt?void 0:b&&C[0]===qt?[]:C,v];C=e,f?f(n,3,t):n(...t)}finally{Yt=t}}}else m.run()};return u&&u(w),m=new Te(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Xt(e,!1,m),_=m.onStop=()=>{let e=Jt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();Jt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function Qt(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,z(e))Qt(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)Qt(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{Qt(e,t,n)});else if(C(e)){for(let r in e)Qt(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Qt(e[r],t,n)}return e}function $t(e,t,n,r){try{return r?e(...r):e()}catch(e){tn(e,t,n)}}function en(e,t,n,r){if(h(e)){let i=$t(e,t,n,r);return i&&y(i)&&i.catch(e=>{tn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(en(e[a],t,n,r));return i}}function tn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){ze(),$t(o,null,10,[e,i,a]),Be();return}}nn(e,r,a,i,s)}function nn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var V=[],rn=-1,an=[],on=null,sn=0,cn=Promise.resolve(),ln=null;function H(e){let t=ln||cn;return e?t.then(this?e.bind(this):e):t}function un(e){let t=rn+1,n=V.length;for(;t<n;){let r=t+n>>>1,i=V[r],a=gn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function dn(e){if(!(e.flags&1)){let t=gn(e),n=V[V.length-1];!n||!(e.flags&2)&&t>=gn(n)?V.push(e):V.splice(un(t),0,e),e.flags|=1,fn()}}function fn(){ln||=cn.then(_n)}function pn(e){d(e)?an.push(...e):on&&e.id===-1?on.splice(sn+1,0,e):e.flags&1||(an.push(e),e.flags|=1),fn()}function mn(e,t,n=rn+1){for(;n<V.length;n++){let t=V[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;V.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function hn(e){if(an.length){let e=[...new Set(an)].sort((e,t)=>gn(e)-gn(t));if(an.length=0,on){on.push(...e);return}for(on=e,sn=0;sn<on.length;sn++){let e=on[sn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}on=null,sn=0}}var gn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function _n(e){try{for(rn=0;rn<V.length;rn++){let e=V[rn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),$t(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;rn<V.length;rn++){let e=V[rn];e&&(e.flags&=-2)}rn=-1,V.length=0,hn(e),ln=null,(V.length||an.length)&&_n(e)}}var U=null,vn=null;function yn(e){let t=U;return U=e,vn=e&&e.type.__scopeId||null,t}function bn(e,t=U,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Di(-1);let i=yn(t),a;try{a=e(...n)}finally{yn(i),r._d&&Di(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function xn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(ze(),en(c,n,8,[e.el,s,e,t]),Be())}}function Sn(e,t){if(Q){let n=Q.provides,r=Q.parent&&Q.parent.provides;r===n&&(n=Q.provides=Object.create(r)),n[e]=t}}function Cn(e,t,n=!1){let r=qi();if(r||Mr){let i=Mr?Mr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var wn=Symbol.for(`v-scx`),Tn=()=>Cn(wn);function En(e,t,n){return Dn(e,t,n)}function Dn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if($i){if(c===`sync`){let e=Tn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=Q;u.call=(e,t,n)=>en(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{G(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():dn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Zt(e,n,u);return $i&&(f?f.push(h):d&&h()),h}function On(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?kn(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Xi(this),s=Dn(i,a.bind(r),n);return o(),s}function kn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var An=Symbol(`_vte`),jn=e=>e.__isTeleport,Mn=Symbol(`_leaveCb`);function Nn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Nn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Pn(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function Fn(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function In(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Ln=new WeakMap;function Rn(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>Rn(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Bn(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&Rn(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?ca(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=L(v),b=v===t?i:e=>In(_,e)?!1:u(y,e),x=(e,t)=>!(t&&In(_,t));if(m!=null&&m!==p){if(zn(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(z(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))$t(p,f,12,[l,_]);else{let t=g(p),n=z(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),Ln.delete(e)};t.id=-1,Ln.set(e,t),G(t,r)}else zn(e),i()}}}function zn(e){let t=Ln.get(e);t&&(t.flags|=8,Ln.delete(e))}ce().requestIdleCallback,ce().cancelIdleCallback;var Bn=e=>!!e.type.__asyncLoader,Vn=e=>e.type.__isKeepAlive;function Hn(e,t){Wn(e,`a`,t)}function Un(e,t){Wn(e,`da`,t)}function Wn(e,t,n=Q){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(Kn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)Vn(e.parent.vnode)&&Gn(r,t,n,e),e=e.parent}}function Gn(e,t,n,r){let i=Kn(t,e,r,!0);$n(()=>{c(r[t],i)},n)}function Kn(e,t,n=Q,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{ze();let i=Xi(n),a=en(t,n,e,r);return i(),Be(),a};return r?i.unshift(a):i.push(a),a}}var qn=e=>(t,n=Q)=>{(!$i||e===`sp`)&&Kn(e,(...e)=>t(...e),n)},Jn=qn(`bm`),Yn=qn(`m`),Xn=qn(`bu`),Zn=qn(`u`),Qn=qn(`bum`),$n=qn(`um`),er=qn(`sp`),tr=qn(`rtg`),nr=qn(`rtc`);function rr(e,t=Q){Kn(`ec`,e,t)}var ir=`components`;function ar(e,t){return sr(ir,e,!0,t)||e}var or=Symbol.for(`v-ndc`);function sr(e,t,n=!0,r=!1){let i=U||Q;if(i){let n=i.type;if(e===ir){let e=la(n,!1);if(e&&(e===t||e===E(t)||e===re(E(t))))return n}let a=cr(i[e]||n[e],t)||cr(i.appContext[e],t);return!a&&r?n:a}}function cr(e,t){return e&&(e[t]||e[E(t)]||e[re(E(t))])}function lr(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Ft(e),r=!1,s=!1;n&&(r=!I(e),s=It(e),e=Qe(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?zt(R(e[n])):R(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}var ur=e=>e?Qi(e)?ca(e):ur(e.parent):null,dr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ur(e.parent),$root:e=>ur(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>br(e),$forceUpdate:e=>e.f||=()=>{dn(e.update)},$nextTick:e=>e.n||=H.bind(e.proxy),$watch:e=>On.bind(e)}),fr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),pr={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(fr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else hr&&(s[n]=0)}let d=dr[n],f,p;if(d)return n===`$attrs`&&F(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return fr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||fr(n,c)||u(o,c)||u(i,c)||u(dr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function mr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var hr=!0;function gr(e){let t=br(e),n=e.proxy,i=e.ctx;hr=!1,t.beforeCreate&&vr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:T,renderTracked:ee,renderTriggered:te,errorCaptured:E,serverPrefetch:ne,expose:D,inheritAttrs:re,components:ie,directives:O,filters:ae}=t;if(u&&_r(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=jt(t))}if(hr=!0,o)for(let e in o){let t=o[e],a=$({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)yr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Sn(t,e[t])})}f&&vr(f,e,`c`);function k(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(k(Jn,p),k(Yn,m),k(Xn,g),k(Zn,_),k(Hn,y),k(Un,b),k(rr,E),k(nr,ee),k(tr,te),k(Qn,S),k($n,w),k(er,ne),d(D))if(D.length){let t=e.exposed||={};D.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};T&&e.render===r&&(e.render=T),re!=null&&(e.inheritAttrs=re),ie&&(e.components=ie),O&&(e.directives=O),ne&&Fn(e)}function _r(e,t,n=r){d(e)&&(e=Tr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?Cn(r.from||n,r.default,!0):Cn(r.from||n):Cn(r),z(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function vr(e,t,n){en(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function yr(e,t,n,r){let i=r.includes(`.`)?kn(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&En(i,n)}else if(h(e))En(i,e.bind(n));else if(v(e))if(d(e))e.forEach(e=>yr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&En(i,r,e)}}function br(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>xr(c,e,o,!0)),xr(c,t,o)),v(t)&&a.set(t,c),c}function xr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&xr(e,a,n,!0),i&&i.forEach(t=>xr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Sr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Sr={data:Cr,props:Dr,emits:Dr,methods:Er,computed:Er,beforeCreate:W,created:W,beforeMount:W,mounted:W,beforeUpdate:W,updated:W,beforeDestroy:W,beforeUnmount:W,destroyed:W,unmounted:W,activated:W,deactivated:W,errorCaptured:W,serverPrefetch:W,components:Er,directives:Er,watch:Or,provide:Cr,inject:wr};function Cr(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function wr(e,t){return Er(Tr(e),Tr(t))}function Tr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function W(e,t){return e?[...new Set([].concat(e,t))]:t}function Er(e,t){return e?s(Object.create(null),e,t):t}function Dr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),mr(e),mr(t??{})):t}function Or(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=W(e[r],t[r]);return n}function kr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Ar=0;function jr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=kr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Ar++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:da,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||Z(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,ca(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(en(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Mr;Mr=l;try{return e()}finally{Mr=t}}};return l}}var Mr=null,Nr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${E(t)}Modifiers`]||e[`${D(t)}Modifiers`];function Pr(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&Nr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=r.map(oe)));let c,l=i[c=ie(n)]||i[c=ie(E(n))];!l&&o&&(l=i[c=ie(D(n))]),l&&en(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,en(u,e,6,a)}}var Fr=new WeakMap;function Ir(e,t,n=!1){let r=n?Fr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Ir(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Lr(e,t){return!e||!a(t)?!1:(t=t.slice(2).replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,D(t))||u(e,t))}function Rr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=yn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=zi(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=zi(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:zr(c)}}catch(t){wi.length=0,tn(t,e,1),v=Z(Si)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Br(y,a)),b=Ii(b,y,!1,!0))}return n.dirs&&(b=Ii(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Nn(b,n.transition),v=b,yn(_),v}var zr=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Br=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Vr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Hr(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Ur(o,r,n)&&!Lr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Hr(r,o,l):!0:!!o;return!1}function Hr(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Ur(t,e,a)&&!Lr(n,a))return!0}return!1}function Ur(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!ve(r,i):r!==i}function Wr({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Gr={},Kr=()=>Object.create(Gr),qr=e=>Object.getPrototypeOf(e)===Gr;function Jr(e,t,n,r=!1){let i={},a=Kr();e.propsDefaults=Object.create(null),Xr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:Mt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function Yr(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=L(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Lr(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=E(o);i[t]=Zr(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{Xr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=D(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Zr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Xe(e.attrs,`set`,``)}function Xr(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(T(t))continue;let l=n[t],d;a&&u(a,d=E(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Lr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=L(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=Zr(a,n,s,i[s],e,!u(i,s))}}return s}function Zr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Xi(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===D(n))&&(r=!0))}return r}var Qr=new WeakMap;function $r(e,r,i=!1){let a=i?Qr:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=$r(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=E(c[e]);ei(n)&&(l[n]=t)}else if(c)for(let e in c){let t=E(e);if(ei(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function ei(e){return e[0]!==`$`&&!T(e)}var ti=e=>e===`_`||e===`_ctx`||e===`$stable`,ni=e=>d(e)?e.map(zi):[zi(e)],ri=(e,t,n)=>{if(t._n)return t;let r=bn((...e)=>ni(t(...e)),n);return r._c=!1,r},ii=(e,t,n)=>{let r=e._ctx;for(let n in e){if(ti(n))continue;let i=e[n];if(h(i))t[n]=ri(n,i,r);else if(i!=null){let e=ni(i);t[n]=()=>e}}},ai=(e,t)=>{let n=ni(t);e.slots.default=()=>n},oi=(e,t,n)=>{for(let r in t)(n||!ti(r))&&(e[r]=t[r])},si=(e,t,n)=>{let r=e.slots=Kr();if(e.vnode.shapeFlag&32){let e=t._;e?(oi(r,t,n),n&&k(r,`_`,e,!0)):ii(t,r)}else t&&ai(e,t)},ci=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:oi(a,n,r):(o=!n.$stable,ii(n,a)),s=n}else n&&(ai(e,n),s={default:1});if(o)for(let e in a)!ti(e)&&s[e]==null&&delete a[e]},G=bi;function li(e){return ui(e)}function ui(e,i){let a=ce();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!ji(e,t)&&(r=ve(e),A(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case xi:y(e,t,n,r);break;case Si:b(e,t,n,r);break;case Ci:e??x(t,n,r,o);break;case K:ie(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?O(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,be)}u!=null&&i?Rn(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&Rn(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)ee(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),ne(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},ee=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&E(e.children,d,null,r,i,di(e,a),s,u),_&&xn(e,null,r,`created`),te(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!T(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Ui(f,r,e)}_&&xn(e,null,r,`beforeMount`);let v=pi(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&G(()=>{try{f&&Ui(f,r,e),v&&g.enter(d),_&&xn(e,null,r,`mounted`)}finally{}},i)},te=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||yi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;te(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},E=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?Bi(e[l]):zi(e[l]),t,n,r,i,a,o,s)},ne=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&fi(r,!1),(g=h.onVnodeBeforeUpdate)&&Ui(g,r,n,e),f&&xn(n,e,r,`beforeUpdate`),r&&fi(r,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?D(e.dynamicChildren,d,l,r,i,di(n,a),o):s||ue(e,n,l,null,r,i,di(n,a),o,!1),u>0){if(u&16)re(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else !s&&d==null&&re(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&G(()=>{g&&Ui(g,r,n,e),f&&xn(n,e,r,`updated`)},i)},D=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===K||!ji(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},re=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!T(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(T(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},ie=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),E(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(D(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&mi(e,t,!0)):ue(e,t,n,f,i,a,s,c,l)},O=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):k(t,n,r,i,a,o,c):oe(e,t,c)},k=(e,t,n,r,i,a,o)=>{let s=e.component=Ki(e,r,i);if(Vn(e)&&(s.ctx.renderer=be),ea(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,se,o),!e.el){let r=s.subTree=Z(Si);b(null,r,t,n),e.placeholder=r.el}}else se(s,e,t,n,i,a,o)},oe=(e,t,n)=>{let r=t.component=e.component;if(Vr(e,t,n))if(r.asyncDep&&!r.asyncResolved){le(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},se=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=gi(e);if(n){t&&(t.el=c.el,le(e,t,o)),n.asyncDep.then(()=>{G(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;fi(e,!1),t?(t.el=c.el,le(e,t,o)):t=c,n&&ae(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Ui(d,s,t,c),fi(e,!0);let f=Rr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),ve(p),e,i,a),t.el=f.el,u===null&&Wr(e,f.el),r&&G(r,i),(d=t.props&&t.props.onVnodeUpdated)&&G(()=>Ui(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Bn(t);if(fi(e,!1),l&&ae(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Ui(o,d,t),fi(e,!0),s&&M){let t=()=>{e.subTree=Rr(e),M(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Rr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&G(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;G(()=>Ui(o,d,e),i)}(t.shapeFlag&256||d&&Bn(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&G(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new Te(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>dn(u),fi(e,!0),l()},le=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Yr(e,t.props,r,n),ci(e,t.children,n),ze(),mn(e),Be()},ue=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){fe(l,d,n,r,i,a,o,s,c);return}else if(f&256){de(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&_e(l,i,a),d!==l&&p(n,d)):u&16?m&16?fe(l,d,n,r,i,a,o,s,c):_e(l,i,a,!0):(u&8&&p(n,``),m&16&&E(d,n,r,i,a,o,s,c))},de=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?Bi(t[p]):zi(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?_e(e,a,o,!0,!1,f):E(t,r,i,a,o,s,c,l,f)},fe=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?Bi(t[u]):zi(t[u]);if(ji(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?Bi(t[p]):zi(t[p]);if(ji(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?Bi(t[u]):zi(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)A(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?Bi(t[u]):zi(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){A(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&ji(n,t[_])){i=_;break}i===void 0?A(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?hi(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||vi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?pe(n,r,p,2):_--)}}},pe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){pe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,be);return}if(c===K){o(a,t,n);for(let e=0;e<u.length;e++)pe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===Ci){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.beforeEnter(a),o(a,t,n),G(()=>l.enter(a),i);else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{a._isLeaving&&a[Mn](!0),r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},A=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(ze(),Rn(s,null,n,e,!0),Be()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Bn(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Ui(_,t,e),u&6)ge(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&xn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,be,r):l&&!l.hasOnce&&(a!==K||d>0&&d&64)?_e(l,t,n,!1,!0):(a===K&&d&384||!i&&u&16)&&_e(c,t,n),r&&me(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&G(()=>{_&&Ui(_,t,e),h&&xn(e,null,t,`unmounted`),v&&(e.el=null)},n)},me=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===K){he(n,r);return}if(t===Ci){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},he=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},ge=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;_i(c),_i(l),r&&ae(r),i.stop(),a&&(a.flags|=8,A(o,e,t,n)),s&&G(s,t),G(()=>{e.isUnmounted=!0},t)},_e=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)A(e[o],t,n,r,i)},ve=e=>{if(e.shapeFlag&6)return ve(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[An];return n?h(n):t},ye=!1,j=(e,t,n)=>{let r;e==null?t._vnode&&(A(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ye||=(ye=!0,mn(r),hn(),!1)},be={p:v,um:A,m:pe,r:me,mt:k,mc:E,pc:ue,pbc:D,n:ve,o:e},xe,M;return i&&([xe,M]=i(be)),{render:j,hydrate:xe,createApp:jr(j,xe)}}function di({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function fi({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function pi(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function mi(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Bi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&mi(t,a)),a.type===xi&&(a.patchFlag===-1&&(a=i[e]=Bi(a)),a.el=t.el),a.type===Si&&!a.el&&(a.el=t.el)}}function hi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function gi(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:gi(t)}function _i(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function vi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?vi(t.subTree):null}var yi=e=>e.__isSuspense;function bi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):pn(e)}var K=Symbol.for(`v-fgt`),xi=Symbol.for(`v-txt`),Si=Symbol.for(`v-cmt`),Ci=Symbol.for(`v-stc`),wi=[],q=null;function J(e=!1){wi.push(q=e?null:[])}function Ti(){wi.pop(),q=wi[wi.length-1]||null}var Ei=1;function Di(e,t=!1){Ei+=e,e<0&&q&&t&&(q.hasOnce=!0)}function Oi(e){return e.dynamicChildren=Ei>0?q||n:null,Ti(),Ei>0&&q&&q.push(e),e}function Y(e,t,n,r,i,a){return Oi(X(e,t,n,r,i,a,!0))}function ki(e,t,n,r,i){return Oi(Z(e,t,n,r,i,!0))}function Ai(e){return e?e.__v_isVNode===!0:!1}function ji(e,t){return e.type===t.type&&e.key===t.key}var Mi=({key:e})=>e??null,Ni=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||z(e)||h(e)?{i:U,r:e,k:t,f:!!n}:e);function X(e,t=null,n=null,r=0,i=null,a=e===K?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Mi(t),ref:t&&Ni(t),scopeId:vn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:U};return s?(Vi(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Ei>0&&!o&&q&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&q.push(c),c}var Z=Pi;function Pi(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===or)&&(e=Si),Ai(e)){let r=Ii(e,t,!0);return n&&Vi(r,n),Ei>0&&!a&&q&&(r.shapeFlag&6?q[q.indexOf(e)]=r:q.push(r)),r.patchFlag=-2,r}if(ua(e)&&(e=e.__vccOpts),t){t=Fi(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=A(e)),v(n)&&(Lt(n)&&!d(n)&&(n=s({},n)),t.style=le(n))}let o=g(e)?1:yi(e)?128:jn(e)?64:v(e)?4:h(e)?2:0;return X(e,t,n,r,i,o,a,!0)}function Fi(e){return e?Lt(e)||qr(e)?s({},e):e:null}function Ii(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Hi(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Mi(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Ni(t)):[a,Ni(t)]:Ni(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==K?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ii(e.ssContent),ssFallback:e.ssFallback&&Ii(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Nn(u,c.clone(u)),u}function Li(e=` `,t=0){return Z(xi,null,e,t)}function Ri(e=``,t=!1){return t?(J(),ki(Si,null,e)):Z(Si,null,e)}function zi(e){return e==null||typeof e==`boolean`?Z(Si):d(e)?Z(K,null,e.slice()):Ai(e)?Bi(e):Z(xi,null,String(e))}function Bi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Ii(e)}function Vi(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Vi(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!qr(t)?t._ctx=U:r===3&&U&&(U.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else h(t)?(t={default:t,_ctx:U},n=32):(t=String(t),r&64?(n=16,t=[Li(t)]):n=8);e.children=t,e.shapeFlag|=n}function Hi(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=A([t.class,r.class]));else if(e===`style`)t.style=le([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Ui(e,t,n,r=null){en(e,t,7,[n,r])}var Wi=kr(),Gi=0;function Ki(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||Wi,o={uid:Gi++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Se(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$r(i,a),emitsOptions:Ir(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=Pr.bind(null,o),e.ce&&e.ce(o),o}var Q=null,qi=()=>Q||U,Ji,Yi;{let e=ce(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};Ji=t(`__VUE_INSTANCE_SETTERS__`,e=>Q=e),Yi=t(`__VUE_SSR_SETTERS__`,e=>$i=e)}var Xi=e=>{let t=Q;return Ji(e),e.scope.on(),()=>{e.scope.off(),Ji(t)}},Zi=()=>{Q&&Q.scope.off(),Ji(null)};function Qi(e){return e.vnode.shapeFlag&4}var $i=!1;function ea(e,t=!1,n=!1){t&&Yi(t);let{props:r,children:i}=e.vnode,a=Qi(e);Jr(e,r,a,t),si(e,i,n||t);let o=a?ta(e,t):void 0;return t&&Yi(!1),o}function ta(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,pr);let{setup:r}=n;if(r){ze();let n=e.setupContext=r.length>1?sa(e):null,i=Xi(e),a=$t(r,e,0,[e.props,n]),o=y(a);if(Be(),i(),(o||e.sp)&&!Bn(e)&&Fn(e),o){if(a.then(Zi,Zi),t)return a.then(n=>{na(e,n,t)}).catch(t=>{tn(t,e,0)});e.asyncDep=a}else na(e,a,t)}else aa(e,t)}function na(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Wt(t)),aa(e,n)}var ra,ia;function aa(e,t,n){let i=e.type;if(!e.render){if(!t&&ra&&!i.render){let t=i.template||br(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=ra(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,ia&&ia(e)}{let t=Xi(e);ze();try{gr(e)}finally{Be(),t()}}}var oa={get(e,t){return F(e,`get`,``),e[t]}};function sa(e){return{attrs:new Proxy(e.attrs,oa),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function ca(e){return e.exposed?e.exposeProxy||=new Proxy(Wt(Rt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in dr)return dr[n](e)},has(e,t){return t in e||t in dr}}):e.proxy}function la(e,t=!0){return h(e)?e.displayName||e.name:e.name||t&&e.__name}function ua(e){return h(e)&&`__vccOpts`in e}var $=(e,t)=>Kt(e,t,$i),da=`3.5.31`,fa=void 0,pa=typeof window<`u`&&window.trustedTypes;if(pa)try{fa=pa.createPolicy(`vue`,{createHTML:e=>e})}catch{}var ma=fa?e=>fa.createHTML(e):e=>e,ha=`http://www.w3.org/2000/svg`,ga=`http://www.w3.org/1998/Math/MathML`,_a=typeof document<`u`?document:null,va=_a&&_a.createElement(`template`),ya={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?_a.createElementNS(ha,e):t===`mathml`?_a.createElementNS(ga,e):n?_a.createElement(e,{is:n}):_a.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>_a.createTextNode(e),createComment:e=>_a.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>_a.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{va.innerHTML=ma(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=va.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},ba=Symbol(`_vtc`);function xa(e,t,n){let r=e[ba];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var Sa=Symbol(`_vod`),Ca=Symbol(`_vsh`),wa=Symbol(``),Ta=/(?:^|;)\s*display\s*:/;function Ea(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t)if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??Oa(r,t,``)}else for(let e in t)n[e]??Oa(r,e,``);for(let e in n)e===`display`&&(a=!0),Oa(r,e,n[e])}else if(i){if(t!==n){let e=r[wa];e&&(n+=`;`+e),r.cssText=n,a=Ta.test(n)}}else t&&e.removeAttribute(`style`);Sa in e&&(e[Sa]=a?r.display:``,e[Ca]&&(r.display=`none`))}var Da=/\s*!important$/;function Oa(e,t,n){if(d(n))n.forEach(n=>Oa(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=ja(e,t);Da.test(n)?e.setProperty(D(r),n.replace(Da,``),`important`):e[r]=n}}var ka=[`Webkit`,`Moz`,`ms`],Aa={};function ja(e,t){let n=Aa[t];if(n)return n;let r=E(t);if(r!==`filter`&&r in e)return Aa[t]=r;r=re(r);for(let n=0;n<ka.length;n++){let i=ka[n]+r;if(i in e)return Aa[t]=i}return t}var Ma=`http://www.w3.org/1999/xlink`;function Na(e,t,n,r,i,a=he(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Ma,t.slice(6,t.length)):e.setAttributeNS(Ma,t,n):n==null||a&&!ge(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function Pa(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?ma(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=ge(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function Fa(e,t,n,r){e.addEventListener(t,n,r)}function Ia(e,t,n,r){e.removeEventListener(t,n,r)}var La=Symbol(`_vei`);function Ra(e,t,n,r,i=null){let a=e[La]||(e[La]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Ba(t);r?Fa(e,n,a[t]=Wa(r,i),s):o&&(Ia(e,n,o,s),a[t]=void 0)}}var za=/(?:Once|Passive|Capture)$/;function Ba(e){let t;if(za.test(e)){t={};let n;for(;n=e.match(za);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):D(e.slice(2)),t]}var Va=0,Ha=Promise.resolve(),Ua=()=>Va||=(Ha.then(()=>Va=0),Date.now());function Wa(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;en(Ga(e,n.value),t,5,[e])};return n.value=e,n.attached=Ua(),n}function Ga(e,t){if(d(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}var Ka=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,qa=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?xa(e,r,c):t===`style`?Ea(e,n,r):a(t)?o(t)||Ra(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):Ja(e,t,r,c))?(Pa(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&Na(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Ya(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?Pa(e,E(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),Na(e,t,r,c))};function Ja(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Ka(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Ka(t)&&g(n)?!1:t in e}function Ya(e,t){let n=e._def.props;if(!n)return!1;let r=E(t);return Array.isArray(n)?n.some(e=>E(e)===r):Object.keys(n).some(e=>E(e)===r)}var Xa=[`ctrl`,`shift`,`alt`,`meta`],Za={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>Xa.some(n=>e[`${n}Key`]&&!t.includes(n))},Qa=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=Za[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},$a=s({patchProp:qa},ya),eo;function to(){return eo||=li($a)}var no=((...e)=>{let t=to().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=io(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,ro(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function ro(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function io(e){return g(e)?document.querySelector(e):e}var ao={class:`browser-shell`},oo={class:`browser-frame`},so={key:0,class:`live-menu-overlay`,"aria-label":`直播频道菜单`},co={class:`live-menu-panel`},lo={class:`live-menu-heading`},uo={class:`live-menu-columns`},fo={class:`live-menu-column live-menu-column-left`},po={class:`live-menu-column live-menu-column-right`},mo=[`onClick`],ho=Pn({__name:`HomeBrowser`,props:{activeUrl:{},setBackButtonRef:{type:Function},setWebviewRef:{type:Function},showLiveMenu:{type:Boolean},liveMenuGroups:{},activeLiveGroupIndex:{},activeLiveColumn:{},activeLiveItemIndex:{},liveMenuHeading:{}},emits:[`browser-ready`,`go-home`,`select-live-channel`],setup(e){return(t,n)=>{let r=ar(`webview`);return J(),Y(`section`,ao,[X(`div`,oo,[Z(r,{ref:e.setWebviewRef,class:`browser-view`,src:e.activeUrl,allowpopups:`false`,onDomReady:n[0]||=e=>t.$emit(`browser-ready`)},null,8,[`src`]),e.showLiveMenu?(J(),Y(`div`,so,[X(`div`,co,[X(`div`,lo,j(e.liveMenuHeading),1),X(`div`,uo,[X(`div`,fo,[(J(!0),Y(K,null,lr(e.liveMenuGroups,(t,n)=>(J(),Y(`button`,{key:t.label,type:`button`,class:A([`live-menu-item live-menu-group-item`,{"is-selected":n===e.activeLiveGroupIndex,"is-active":e.activeLiveColumn===`group`&&n===e.activeLiveGroupIndex}])},j(t.label),3))),128))]),X(`div`,po,[(J(!0),Y(K,null,lr(e.liveMenuGroups[e.activeLiveGroupIndex]?.items??[],(n,r)=>(J(),Y(`button`,{key:`${e.liveMenuGroups[e.activeLiveGroupIndex]?.label}-${n}-${r}`,type:`button`,class:A([`live-menu-item live-menu-channel-item`,{"is-selected":r===e.activeLiveItemIndex,"is-active":e.activeLiveColumn===`item`&&r===e.activeLiveItemIndex}]),onClick:e=>t.$emit(`select-live-channel`,n)},j(n),11,mo))),128))])])])])):Ri(``,!0),X(`button`,{ref:e.setBackButtonRef,type:`button`,class:`back-home-button`,"aria-label":`返回主页`,onClick:n[1]||=e=>t.$emit(`go-home`)},` 返回主页 `,512)])])}}}),go=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},_o=go(ho,[[`__scopeId`,`data-v-91c36454`]]),vo={class:`top-bar`},yo={class:`top-actions`},bo={class:`hero-panel`},xo={class:`time-block`},So={class:`time-value`},Co={class:`time-date`},wo={class:`card-grid`,"aria-label":`快捷入口`},To=[`tabindex`,`onClick`,`onFocus`],Eo={class:`card-art`},Do={class:`card-badge`},Oo={class:`card-title`},ko={class:`card-label`},Ao=go(Pn({__name:`HomeLanding`,props:{currentTime:{},currentDate:{},shortcuts:{},selectedIndex:{},setCardRef:{type:Function}},emits:[`open-settings`,`close-window`,`open-site`,`focus-card`],setup(e){return(t,n)=>(J(),Y(K,null,[n[5]||=X(`div`,{class:`background-image`},null,-1),n[6]||=X(`div`,{class:`background-overlay`},null,-1),X(`header`,vo,[n[2]||=X(`div`,{class:`top-left`},[X(`span`,{class:`status-dot`}),X(`span`,{class:`status-dot`})],-1),X(`div`,yo,[X(`button`,{type:`button`,class:`icon-button`,"aria-label":`打开设置`,onClick:n[0]||=e=>t.$emit(`open-settings`)},` ⚙ `),X(`button`,{type:`button`,class:`icon-button`,"aria-label":`退出应用`,onClick:n[1]||=e=>t.$emit(`close-window`)},` ✕ `)])]),X(`section`,bo,[n[3]||=X(`span`,{class:`hero-line hero-line-top`},null,-1),X(`div`,xo,[X(`div`,So,j(e.currentTime),1),X(`div`,Co,j(e.currentDate),1)]),n[4]||=X(`span`,{class:`hero-line hero-line-bottom`},null,-1)]),X(`section`,wo,[(J(!0),Y(K,null,lr(e.shortcuts,(n,r)=>(J(),Y(`button`,{key:n.name,type:`button`,class:A([`site-card`,[n.theme,{"is-selected":e.selectedIndex===r}]]),tabindex:e.selectedIndex===r?0:-1,ref_for:!0,ref:t=>e.setCardRef(t,r),onClick:e=>t.$emit(`open-site`,n),onFocus:e=>t.$emit(`focus-card`,r)},[X(`div`,Eo,[X(`div`,Do,j(n.badge),1),X(`div`,Oo,j(n.name),1)]),X(`div`,ko,j(n.name),1)],42,To))),128))])],64))}}),[[`__scopeId`,`data-v-fb3cb96d`]]),jo=[{name:`TV 直播`,badge:`LIVE`,url:`https://www.yangshipin.cn/tv/home`,theme:`theme-live`},{name:`央视片库`,badge:`CCTV`,url:`https://tv.cctv.com/`,theme:`theme-cctv`},{name:`抖音`,badge:`DY`,url:`https://www.douyin.com/`,theme:`theme-douyin`},{name:`腾讯视频`,badge:`QQ`,url:`https://v.qq.com/`,theme:`theme-tencent`}],Mo={launchModuleId:``,openModuleOnLaunch:!1,startAtLogin:!1,homeMode:`tv`,enabledShortcuts:jo.map(e=>e.url)},No=[{id:``,name:`无`},...jo.map(e=>({id:e.url,name:e.name}))],Po={class:`settings-header`},Fo={class:`settings-body`},Io={class:`settings-sidebar`,"aria-label":`设置分类`,role:`tablist`},Lo=[`tabindex`,`onClick`,`aria-selected`],Ro={class:`settings-content`},zo={key:0,class:`settings-card`,role:`tabpanel`},Bo={class:`setting-row`},Vo=[`value`,`tabindex`],Ho=[`value`],Uo={class:`setting-row`},Wo=[`aria-pressed`,`tabindex`],Go={class:`setting-row`},Ko={class:`mode-toggle`,role:`tablist`,"aria-label":`主页模式`},qo=[`tabindex`],Jo=[`tabindex`],Yo={key:1,class:`settings-card`,role:`tabpanel`},Xo={class:`site-list`},Zo=[`tabindex`],Qo={class:`site-info`},$o={class:`site-icon`},es={class:`site-name`},ts={class:`site-status`},ns=[`tabindex`,`onClick`],rs={key:2,class:`settings-card settings-placeholder`,role:`tabpanel`},is={class:`placeholder-title`},as=go(Pn({__name:`SettingsPanel`,props:{activeMenu:{},settings:{}},emits:[`back`,`select-menu`,`update-setting`],setup(e,{emit:t}){let n=window.require?.(`electron`)?.ipcRenderer??null,r=e,i=t,a=$(()=>jo.map(e=>({name:e.name,url:e.url,isEnabled:r.settings.enabledShortcuts.includes(e.url)}))),o=[{key:`general`,label:`常规`},{key:`site-management`,label:`网址管理`},{key:`add-site`,label:`添加新网址`},{key:`add-local-app`,label:`添加本地应用`},{key:`wallpaper`,label:`壁纸设置`}],s=$(()=>o.find(e=>e.key===r.activeMenu)?.label??``),c=B(0),l=B(-1),u=B(0),d=B(0),f=B(-1),p=B(null),m=B([]),h=B(null),g=B(null),_=B(null),v=B(null),y=B(null),b=B([]);function x(e,t){e&&(m.value[t]=e)}function S(e,t){e&&(b.value[t]=e)}function C(e){let t=o.length;c.value=(e+t)%t,l.value=-1,f.value=-1;let n=o[c.value].key;i(`select-menu`,n),n===`site-management`&&(d.value=0),H(()=>{m.value[c.value]?.focus()})}function w(e){l.value=e,c.value=-1,H(()=>{e===0?g.value?.focus():e===1?_.value?.focus():e===2&&(u.value===0?v.value?.focus():y.value?.focus())})}function T(e){let t=a.value.length;d.value=(e+t)%t,l.value=-1,f.value=-1,c.value=-1,console.log(`focusSite called, index:`,e,`total:`,t,`refs length:`,b.value.length),console.log(`siteItemRefs[0]:`,b.value[0]),H(()=>{console.log(`nextTick - siteItemRefs[0]:`,b.value[0]);let e=b.value[d.value];console.log(`Trying to focus element:`,e),e&&(e.focus(),e.scrollIntoView({behavior:`smooth`,block:`nearest`}),console.log(`Focused and scrolled!`))})}function ee(e){return{"TV 直播":`📺`,央视片库:`🎬`,抖音:`🎵`,腾讯视频:`🎞️`}[e]||`🌐`}function te(e){let t=r.settings.enabledShortcuts,n;n=e.isEnabled?t.filter(t=>t!==e.url):[...t,e.url],i(`update-setting`,{enabledShortcuts:n})}function E(e){let{key:t}=e;if(c.value>=0){if(t===`ArrowUp`){e.preventDefault(),C(c.value-1);return}if(t===`ArrowDown`){e.preventDefault(),C(c.value+1);return}if(t===`ArrowRight`){e.preventDefault();let t=o[c.value].key;t===`general`?w(0):t===`site-management`&&T(0);return}if(t===`Enter`){e.preventDefault();let t=o[c.value].key;t===`general`?w(0):t===`site-management`&&T(0);return}return}if(r.activeMenu===`site-management`&&console.log(`focusedSiteIndex:`,d.value),(r.activeMenu===`site-management`||d.value>=0)&&d.value>=0){if(console.log(`focusedButtonIndex:`,f.value),f.value>=0){if(t===`ArrowLeft`){e.preventDefault(),f.value=-1,H(()=>{b.value[d.value]?.focus()});return}if(t===`ArrowUp`){if(e.preventDefault(),f.value>0)--f.value,H(()=>{(b.value[f.value]?.querySelector(`.action-button`))?.focus()});else{f.value=-1;let e=o.findIndex(e=>e.key===r.activeMenu);C(e>=0?e:0)}return}if(t===`ArrowDown`){if(e.preventDefault(),f.value<a.value.length-1)f.value+=1,H(()=>{(b.value[f.value]?.querySelector(`.action-button`))?.focus()});else{f.value=-1;let e=o.findIndex(e=>e.key===r.activeMenu);C(e>=0?e:0)}return}if(t===`Enter`){e.preventDefault();let t=a.value[f.value];te(t);return}return}if(t===`ArrowUp`){if(e.preventDefault(),d.value>0)T(d.value-1);else{let e=o.findIndex(e=>e.key===r.activeMenu);C(e>=0?e:0)}return}if(t===`ArrowDown`){if(e.preventDefault(),d.value<a.value.length-1)T(d.value+1);else{let e=o.findIndex(e=>e.key===r.activeMenu);C(e>=0?e:0)}return}if(t===`ArrowLeft`){e.preventDefault();let t=o.findIndex(e=>e.key===r.activeMenu);C(t>=0?t:0);return}if(t===`ArrowRight`){e.preventDefault(),console.log(`ArrowRight123`),f.value=d.value,H(()=>{(b.value[f.value]?.querySelector(`.action-button`))?.focus()});return}if(t===`Enter`){e.preventDefault();let t=a.value[d.value];te(t);return}return}if(l.value>=0){if(t===`ArrowUp`){e.preventDefault(),l.value>0?w(l.value-1):C(0);return}if(t===`ArrowDown`){e.preventDefault(),r.activeMenu===`general`?l.value<2?w(l.value+1):w(0):C(0);return}if(t===`ArrowLeft`){e.preventDefault(),C(0);return}if(t===`ArrowRight`){e.preventDefault(),console.log(`ArrowRight12322`),l.value===2&&(u.value=u.value===0?1:0,H(()=>{u.value===0?v.value?.focus():y.value?.focus()}));return}if(t===`Enter`){e.preventDefault(),l.value===0?g.value?.showPicker?.():l.value===1?i(`update-setting`,{startAtLogin:!r.settings.startAtLogin}):l.value===2&&(u.value===0?i(`update-setting`,{homeMode:`game`}):i(`update-setting`,{homeMode:`tv`}));return}if(l.value===2&&(t===`ArrowLeft`||t===`ArrowRight`)){e.preventDefault(),u.value=t===`ArrowLeft`?0:1,H(()=>{u.value===0?v.value?.focus():y.value?.focus()});return}}(t===`Backspace`||t===`Escape`)&&(e.preventDefault(),i(`back`))}function ne(e){let t=e.target.value;i(`update-setting`,{launchModuleId:t,openModuleOnLaunch:t!==``})}return Yn(()=>{n?.send(`settings-panel:focus-changed`,!0),H(()=>{p.value?.focus(),setTimeout(()=>{m.value[0]?.focus()},50)})}),$n(()=>{n?.send(`settings-panel:focus-changed`,!1)}),(t,n)=>(J(),Y(`section`,{class:`settings-shell`,ref_key:`settingsShellRef`,ref:p,tabindex:`0`,onKeydown:E},[X(`header`,Po,[X(`button`,{type:`button`,class:`back-button`,ref_key:`backButtonRef`,ref:h,onClick:n[0]||=e=>t.$emit(`back`)},` ← 返回 `,512),n[4]||=X(`h1`,{class:`settings-title`},`设置`,-1)]),X(`div`,Fo,[X(`aside`,Io,[(J(),Y(K,null,lr(o,(n,r)=>X(`button`,{key:n.key,type:`button`,class:A([`sidebar-item`,{"is-active":e.activeMenu===n.key,"is-focused":c.value===r}]),tabindex:c.value===r?0:-1,ref_for:!0,ref:e=>x(e,r),onClick:e=>t.$emit(`select-menu`,n.key),role:`tab`,"aria-selected":e.activeMenu===n.key},j(n.label),11,Lo)),64))]),X(`div`,Ro,[e.activeMenu===`general`?(J(),Y(`section`,zo,[X(`div`,Bo,[n[5]||=X(`div`,{class:`setting-copy`},[X(`div`,{class:`setting-label`},`打开应用后直接启动`),X(`div`,{class:`setting-desc`},`选择后可在启动应用时直接进入对应模块。`)],-1),X(`select`,{class:A([`setting-select`,{"is-focused":l.value===0}]),value:e.settings.launchModuleId,onChange:ne,ref_key:`launchModuleSelectRef`,ref:g,tabindex:l.value===0?0:-1},[(J(!0),Y(K,null,lr(Ht(No),e=>(J(),Y(`option`,{key:e.id||`none`,value:e.id},j(e.name),9,Ho))),128))],42,Vo)]),X(`div`,Uo,[n[7]||=X(`div`,{class:`setting-copy`},[X(`div`,{class:`setting-label`},`应用开机自启动`),X(`div`,{class:`setting-desc`},`开启后会在系统登录时自动启动应用。`)],-1),X(`button`,{type:`button`,class:A([`switch-button`,{"is-on":e.settings.startAtLogin,"is-focused":l.value===1}]),"aria-pressed":e.settings.startAtLogin,tabindex:l.value===1?0:-1,ref_key:`startAtLoginSwitchRef`,ref:_,onClick:n[1]||=n=>t.$emit(`update-setting`,{startAtLogin:!e.settings.startAtLogin})},[...n[6]||=[X(`span`,{class:`switch-knob`},null,-1)]],10,Wo)]),X(`div`,Go,[n[8]||=X(`div`,{class:`setting-copy`},[X(`div`,{class:`setting-label`},`主页模式`),X(`div`,{class:`setting-desc`},`当前可切换电视模式和游戏模式，游戏模式页面后续补充。`)],-1),X(`div`,Ko,[X(`button`,{type:`button`,class:A([`mode-option`,{"is-active":e.settings.homeMode===`game`,"is-focused":l.value===2&&u.value===0}]),tabindex:l.value===2&&u.value===0?0:-1,ref_key:`gameModeOptionRef`,ref:v,onClick:n[2]||=e=>t.$emit(`update-setting`,{homeMode:`game`})},` 游戏模式 `,10,qo),X(`button`,{type:`button`,class:A([`mode-option`,{"is-active":e.settings.homeMode===`tv`,"is-focused":l.value===2&&u.value===1}]),tabindex:l.value===2&&u.value===1?0:-1,ref_key:`tvModeOptionRef`,ref:y,onClick:n[3]||=e=>t.$emit(`update-setting`,{homeMode:`tv`})},` 电视模式 `,10,Jo)])])])):e.activeMenu===`site-management`?(J(),Y(`section`,Yo,[X(`div`,Xo,[(J(!0),Y(K,null,lr(a.value,(e,t)=>(J(),Y(`div`,{key:e.url,class:A([`site-item`,{"is-focused":d.value===t}]),ref_for:!0,ref:e=>S(e,t),tabindex:d.value===t?0:-1},[X(`div`,Qo,[X(`span`,$o,j(ee(e.name)),1),X(`span`,es,j(e.name),1)]),X(`div`,ts,[X(`span`,{class:A([`status-text`,e.isEnabled?`is-enabled`:`is-disabled`])},j(e.isEnabled?`已添加`:`未添加`),3),X(`button`,{type:`button`,class:A([`action-button`,[e.isEnabled?`remove`:`add`,{"is-focused":f.value===t}]]),tabindex:f.value===t?0:-1,onClick:Qa(t=>te(e),[`stop`])},j(e.isEnabled?`移除`:`添加`),11,ns)])],10,Zo))),128))])])):(J(),Y(`section`,rs,[X(`div`,is,j(s.value),1),n[9]||=X(`div`,{class:`placeholder-desc`},`该页面内容稍后添加。`,-1)]))])])],544))}}),[[`__scopeId`,`data-v-f20f038a`]]),os=`(function registerYangshipinPlugin() {
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
`,ss={id:`yangshipin`,name:`央视频直播`,matches:[`https://www.yangshipin.cn/tv/home`],capabilities:{liveMenu:!0,volumeControl:!0},defaultConfig:{volume:.6}};function cs(e){return`
${os}
${e}
  `}var ls=[{manifest:ss,matches:e=>ss.matches.some(t=>e.startsWith(t)),buildInitScript:e=>cs(`window.__tvAssistantPlugins.yangshipin.init(${JSON.stringify(e)});`),buildMenuDataScript:()=>cs(`window.__tvAssistantPlugins.yangshipin.waitForMenuData(20000);`),buildSelectChannelScript:e=>cs(`window.__tvAssistantPlugins.yangshipin.selectChannel(${JSON.stringify(e)});`),buildAdjustVolumeScript:e=>cs(`window.__tvAssistantPlugins.yangshipin.adjustVolume(${e});`)}];function us(e){return ls.find(t=>t.matches(e))??null}no(go(Pn({__name:`HomePage`,setup(e){let t=window.require?.(`electron`)?.ipcRenderer??null,n=$(()=>jo.filter(e=>l.value.enabledShortcuts.includes(e.url))),r=B(new Date),i=B(0),a=B(``),o=B(``),s=B(!1),c=B(`general`),l=B({...Mo}),u=B([]),d=B(null),f=B(null),p=B(!1),m=B(0),h=B(`group`),g=B([0,0]),_=B(``),v=B(``),y=B({}),b=B([{label:`央视频道`,items:[`内容稍后添加`]},{label:`卫视频道`,items:[`内容稍后添加`]}]),x,S=0,C=new Intl.DateTimeFormat(`zh-CN`,{month:`long`,day:`numeric`,weekday:`long`}),w=$(()=>r.value.toLocaleTimeString(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,hour12:!1})),T=$(()=>us(a.value)),ee=$(()=>C.format(r.value)),te=$(()=>T.value?.manifest.capabilities.liveMenu??!1),E=$(()=>b.value[m.value]?.items??[]),ne=$(()=>g.value[m.value]??0),D=$(()=>_.value||b.value[m.value]?.label||``);function re(){r.value=new Date}function ie(){s.value=!0}function O(){s.value=!1,H(()=>{ue()})}function ae(e){a.value=e.url,o.value=e.name,s.value=!1,pe(),_.value=``,v.value=``,y.value={},H(()=>{d.value?.focus()})}function k(){if(!l.value.openModuleOnLaunch||!l.value.launchModuleId)return;let e=jo.find(e=>e.url===l.value.launchModuleId);e&&ae(e)}function oe(){a.value=``,o.value=``,pe(),_.value=``,v.value=``,y.value={},H(()=>{ue()})}function se(e,t){if(e instanceof HTMLButtonElement){u.value[t]=e;return}delete u.value[t]}function ce(e){d.value=e instanceof HTMLButtonElement?e:null}function le(e){f.value=e}function ue(){u.value[i.value]?.focus()}function de(e){let t=n.value.length;t!==0&&(i.value=(i.value+e+t)%t,ue())}function fe(){te.value&&(p.value=!p.value,p.value||(h.value=`group`))}function pe(){p.value=!1,h.value=`group`}function me(e){let t=b.value.length;m.value=(m.value+e+t)%t}function he(e){let t=E.value.length,n=(ne.value+e+t)%t;g.value[m.value]=n}function ge(e){if(!e)return;let t=e.trim();_.value=t;let n=b.value.findIndex(e=>e.items.includes(t));if(n===-1)return;let r=b.value[n].items.indexOf(t);m.value=n,g.value[n]=r}function _e(e){let t=e.央视频道?.length?e.央视频道:[`内容稍后添加`],n=e.卫视频道?.length?e.卫视频道:[`内容稍后添加`];b.value=[{label:`央视频道`,items:t},{label:`卫视频道`,items:n}],g.value=b.value.map(()=>0),m.value=0,ge(e.currentChannel??``)}async function ve(e){return await t?.invoke(`plugin-config:get`,e)??{}}async function ye(e,n){y.value=n,await t?.invoke(`plugin-config:set`,e,n)}async function j(){let e=await t?.invoke(`settings:get`);l.value={...Mo,...e??{}}}async function be(e){let n=await t?.invoke(`settings:set`,e);l.value={...l.value,...e,...n??{}}}async function xe(){let e=f.value,t=T.value;if(!e||!t)return null;v.value!==t.manifest.id&&(y.value={...t.manifest.defaultConfig,...await ve(t.manifest.id)},v.value=t.manifest.id);try{await e.executeJavaScript(t.buildInitScript(y.value),!0)}catch(e){return console.error(`初始化插件 ${t.manifest.id} 失败:`,e),null}return t}async function M(){let e=f.value,t=T.value;if(!e||!t?.manifest.capabilities.liveMenu)return;let n=++S;try{await xe();let r=await e.executeJavaScript(t.buildMenuDataScript(),!0);if(n!==S||!r)return;_e(r)}catch(e){console.error(`获取插件 ${t.manifest.id} 菜单数据失败:`,e),_e({})}}async function Se(e){let t=f.value,n=T.value;if(!(!t||!n?.manifest.capabilities.liveMenu))try{ge(e),await xe(),await t.executeJavaScript(n.buildSelectChannelScript(e),!0)&&(pe(),window.setTimeout(()=>{M()},1200))}catch(e){console.error(`插件 ${n.manifest.id} 切换频道失败:`,e)}}async function Ce(e){let t=f.value,n=T.value;if(!(!t||!n?.manifest.capabilities.volumeControl))try{await xe();let r=await t.executeJavaScript(n.buildAdjustVolumeScript(e),!0);typeof r==`number`&&await ye(n.manifest.id,{...y.value,volume:r})}catch(e){console.error(`插件 ${n.manifest.id} 调整音量失败:`,e)}}function N(){let e=T.value;e&&(xe(),e.manifest.capabilities.liveMenu&&M())}function we(e){if(s.value&&!a.value&&(e.key===`Escape`||e.key===`Backspace`)){e.preventDefault(),e.stopPropagation(),O();return}}function Te(e){if(s.value&&!a.value){console.log(e.key),(e.key===`Escape`||e.key===`Backspace`)&&(e.preventDefault(),O());return}if(a.value){if(p.value){if(e.key===`Escape`||e.key===`Backspace`){e.preventDefault(),pe();return}if(e.key===`ArrowLeft`||e.key===`ArrowRight`){e.preventDefault(),h.value=h.value===`group`?`item`:`group`;return}if(e.key===`ArrowUp`){if(e.preventDefault(),h.value===`group`){me(-1);return}he(-1);return}if(e.key===`ArrowDown`){if(e.preventDefault(),h.value===`group`){me(1);return}he(1);return}if(e.key===`Enter`&&h.value===`item`){e.preventDefault(),Se(E.value[ne.value]);return}return}if(te.value&&e.key===`Enter`){e.preventDefault(),fe();return}if(e.key===`-`||e.key===`_`){e.preventDefault(),Ce(-.05);return}if(e.key===`=`||e.key===`+`){e.preventDefault(),Ce(.05);return}(e.key===`Escape`||e.key===`Backspace`)&&(e.preventDefault(),oe());return}if(e.key===`ArrowLeft`||e.key===`ArrowUp`){e.preventDefault(),de(-1);return}if(e.key===`ArrowRight`||e.key===`ArrowDown`){e.preventDefault(),de(1);return}(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),n.value.length>0&&ae(n.value[i.value]))}function Ee(e,t){Te(new KeyboardEvent(`keydown`,{key:t.key}))}function De(){window.close()}return Yn(async()=>{re(),x=window.setInterval(re,1e3),t?.on(`app-keydown`,Ee),await j(),k(),H(()=>{ue()})}),Qn(()=>{x&&window.clearInterval(x),t?.removeListener(`app-keydown`,Ee)}),(e,t)=>(J(),Y(`main`,{class:A([`home-shell`,{"is-browser-open":!!a.value}]),tabindex:`0`,onKeydown:Te,onKeydownCapture:we},[s.value?(J(),ki(as,{key:0,"active-menu":c.value,settings:l.value,onBack:O,onSelectMenu:t[0]||=e=>c.value=e,onUpdateSetting:be},null,8,[`active-menu`,`settings`])):a.value?(J(),ki(_o,{key:2,"active-url":a.value,"set-back-button-ref":ce,"set-webview-ref":le,"show-live-menu":p.value,"live-menu-groups":b.value,"active-live-group-index":m.value,"active-live-column":h.value,"active-live-item-index":ne.value,"live-menu-heading":D.value,onBrowserReady:N,onGoHome:oe,onSelectLiveChannel:Se},null,8,[`active-url`,`show-live-menu`,`live-menu-groups`,`active-live-group-index`,`active-live-column`,`active-live-item-index`,`live-menu-heading`])):(J(),ki(Ao,{key:1,"current-time":w.value,"current-date":ee.value,shortcuts:n.value,"selected-index":i.value,"set-card-ref":se,onOpenSettings:ie,onCloseWindow:De,onOpenSite:ae,onFocusCard:t[1]||=e=>i.value=e},null,8,[`current-time`,`current-date`,`shortcuts`,`selected-index`]))],34))}}),[[`__scopeId`,`data-v-80eb8713`]])).mount(`#app`);