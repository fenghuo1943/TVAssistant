(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,T=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),ee=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},te=/-\w/g,E=ee(e=>e.replace(te,e=>e.slice(1).toUpperCase())),ne=/\B([A-Z])/g,D=ee(e=>e.replace(ne,`-$1`).toLowerCase()),re=ee(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=ee(e=>e?`on${re(e)}`:``),O=(e,t)=>!Object.is(e,t),k=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},A=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},ae=e=>{let t=parseFloat(e);return isNaN(t)?e:t},oe,se=()=>oe||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function ce(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?fe(r):ce(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(g(e)||v(e))return e}var le=/;(?![^(]*\))/g,ue=/:([^]+)/,de=/\/\*[^]*?\*\//g;function fe(e){let t={};return e.replace(de,``).split(le).forEach(e=>{if(e){let n=e.split(ue);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function j(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=j(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var pe=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,me=e(pe);pe+``;function he(e){return!!e||e===``}function ge(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=_e(e[r],t[r]);return n}function _e(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?ge(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!_e(e[n],t[n]))return!1}}return String(e)===String(t)}var ve=e=>!!(e&&e.__v_isRef===!0),M=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?ve(e)?M(e.value):JSON.stringify(e,ye,2):String(e),ye=(e,t)=>ve(t)?ye(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[be(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>be(e))}:_(t)?be(t):v(t)&&!d(t)&&!C(t)?String(t):t,be=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,N,xe=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=N,!e&&N&&(this.index=(N.scopes||=[]).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=N;try{return N=this,e()}finally{N=t}}}on(){++this._on===1&&(this.prevScope=N,N=this)}off(){this._on>0&&--this._on===0&&(N=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Se(){return N}var P,Ce=new WeakSet,we=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,N&&N.active&&N.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ce.has(this)&&(Ce.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Oe(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Be(this),je(this);let e=P,t=F;P=this,F=!0;try{return this.fn()}finally{Me(this),P=e,F=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Fe(e);this.deps=this.depsTail=void 0,Be(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ce.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ne(this)&&this.run()}get dirty(){return Ne(this)}},Te=0,Ee,De;function Oe(e,t=!1){if(e.flags|=8,t){e.next=De,De=e;return}e.next=Ee,Ee=e}function ke(){Te++}function Ae(){if(--Te>0)return;if(De){let e=De;for(De=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;Ee;){let t=Ee;for(Ee=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function je(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Me(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Fe(r),Ie(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ne(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Pe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Pe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Ve)||(e.globalVersion=Ve,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ne(e))))return;e.flags|=2;let t=e.dep,n=P,r=F;P=e,F=!0;try{je(e);let n=e.fn(e._value);(t.version===0||O(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{P=n,F=r,Me(e),e.flags&=-3}}function Fe(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Fe(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ie(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var F=!0,Le=[];function Re(){Le.push(F),F=!1}function ze(){let e=Le.pop();F=e===void 0?!0:e}function Be(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=P;P=void 0;try{t()}finally{P=e}}}var Ve=0,He=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Ue=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!P||!F||P===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==P)t=this.activeLink=new He(P,this),P.deps?(t.prevDep=P.depsTail,P.depsTail.nextDep=t,P.depsTail=t):P.deps=P.depsTail=t,We(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=P.depsTail,t.nextDep=void 0,P.depsTail.nextDep=t,P.depsTail=t,P.deps===t&&(P.deps=e)}return t}trigger(e){this.version++,Ve++,this.notify(e)}notify(e){ke();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ae()}}};function We(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)We(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ge=new WeakMap,Ke=Symbol(``),qe=Symbol(``),Je=Symbol(``);function I(e,t,n){if(F&&P){let t=Ge.get(e);t||Ge.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new Ue),r.map=t,r.key=n),r.track()}}function Ye(e,t,n,r,i,a){let o=Ge.get(e);if(!o){Ve++;return}let s=e=>{e&&e.trigger()};if(ke(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Je||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Je)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Ke)),f(e)&&s(o.get(qe)));break;case`delete`:i||(s(o.get(Ke)),f(e)&&s(o.get(qe)));break;case`set`:f(e)&&s(o.get(Ke));break}}Ae()}function Xe(e){let t=R(e);return t===e?t:(I(t,`iterate`,Je),L(e)?t:t.map(z))}function Ze(e){return I(e=R(e),`iterate`,Je),e}function Qe(e,t){return Ft(e)?Rt(Pt(e)?z(t):t):z(t)}var $e={__proto__:null,[Symbol.iterator](){return et(this,Symbol.iterator,e=>Qe(this,e))},concat(...e){return Xe(this).concat(...e.map(e=>d(e)?Xe(e):e))},entries(){return et(this,`entries`,e=>(e[1]=Qe(this,e[1]),e))},every(e,t){return nt(this,`every`,e,t,void 0,arguments)},filter(e,t){return nt(this,`filter`,e,t,e=>e.map(e=>Qe(this,e)),arguments)},find(e,t){return nt(this,`find`,e,t,e=>Qe(this,e),arguments)},findIndex(e,t){return nt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return nt(this,`findLast`,e,t,e=>Qe(this,e),arguments)},findLastIndex(e,t){return nt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return nt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return it(this,`includes`,e)},indexOf(...e){return it(this,`indexOf`,e)},join(e){return Xe(this).join(e)},lastIndexOf(...e){return it(this,`lastIndexOf`,e)},map(e,t){return nt(this,`map`,e,t,void 0,arguments)},pop(){return at(this,`pop`)},push(...e){return at(this,`push`,e)},reduce(e,...t){return rt(this,`reduce`,e,t)},reduceRight(e,...t){return rt(this,`reduceRight`,e,t)},shift(){return at(this,`shift`)},some(e,t){return nt(this,`some`,e,t,void 0,arguments)},splice(...e){return at(this,`splice`,e)},toReversed(){return Xe(this).toReversed()},toSorted(e){return Xe(this).toSorted(e)},toSpliced(...e){return Xe(this).toSpliced(...e)},unshift(...e){return at(this,`unshift`,e)},values(){return et(this,`values`,e=>Qe(this,e))}};function et(e,t,n){let r=Ze(e),i=r[t]();return r!==e&&!L(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var tt=Array.prototype;function nt(e,t,n,r,i,a){let o=Ze(e),s=o!==e&&!L(e),c=o[t];if(c!==tt[t]){let t=c.apply(e,a);return s?z(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,Qe(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function rt(e,t,n,r){let i=Ze(e),a=i!==e&&!L(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=Qe(e,t)),n.call(this,t,Qe(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?Qe(e,c):c}function it(e,t,n){let r=R(e);I(r,`iterate`,Je);let i=r[t](...n);return(i===-1||i===!1)&&It(n[0])?(n[0]=R(n[0]),r[t](...n)):i}function at(e,t,n=[]){Re(),ke();let r=R(e)[t].apply(e,n);return Ae(),ze(),r}var ot=e(`__proto__,__v_isRef,__isVue`),st=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function ct(e){_(e)||(e=String(e));let t=R(this);return I(t,`has`,e),t.hasOwnProperty(e)}var lt=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Dt:Et:i?Tt:wt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=$e[t]))return e;if(t===`hasOwnProperty`)return ct}let o=Reflect.get(e,t,B(e)?e:n);if((_(t)?st.has(t):ot(t))||(r||I(e,`get`,t),i))return o;if(B(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Mt(e):e}return v(o)?r?Mt(o):At(o):o}},ut=class extends lt{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=Ft(i);if(!L(n)&&!Ft(n)&&(i=R(i),n=R(n)),!a&&B(i)&&!B(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,B(e)?e:r);return e===R(r)&&(o?O(n,i)&&Ye(e,`set`,t,n,i):Ye(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Ye(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!st.has(t))&&I(e,`has`,t),n}ownKeys(e){return I(e,`iterate`,d(e)?`length`:Ke),Reflect.ownKeys(e)}},dt=class extends lt{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},ft=new ut,pt=new dt,mt=new ut(!0),ht=e=>e,gt=e=>Reflect.getPrototypeOf(e);function _t(e,t,n){return function(...r){let i=this.__v_raw,a=R(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?ht:t?Rt:z;return!t&&I(a,`iterate`,l?qe:Ke),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function vt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function yt(e,t){let n={get(n){let r=this.__v_raw,i=R(r),a=R(n);e||(O(n,a)&&I(i,`get`,n),I(i,`get`,a));let{has:o}=gt(i),s=t?ht:e?Rt:z;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&I(R(t),`iterate`,Ke),t.size},has(t){let n=this.__v_raw,r=R(n),i=R(t);return e||(O(t,i)&&I(r,`has`,t),I(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=R(a),s=t?ht:e?Rt:z;return!e&&I(o,`iterate`,Ke),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:vt(`add`),set:vt(`set`),delete:vt(`delete`),clear:vt(`clear`)}:{add(e){let n=R(this),r=gt(n),i=R(e),a=!t&&!L(e)&&!Ft(e)?i:e;return r.has.call(n,a)||O(e,a)&&r.has.call(n,e)||O(i,a)&&r.has.call(n,i)||(n.add(a),Ye(n,`add`,a,a)),this},set(e,n){!t&&!L(n)&&!Ft(n)&&(n=R(n));let r=R(this),{has:i,get:a}=gt(r),o=i.call(r,e);o||=(e=R(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?O(n,s)&&Ye(r,`set`,e,n,s):Ye(r,`add`,e,n),this},delete(e){let t=R(this),{has:n,get:r}=gt(t),i=n.call(t,e);i||=(e=R(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Ye(t,`delete`,e,void 0,a),o},clear(){let e=R(this),t=e.size!==0,n=e.clear();return t&&Ye(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=_t(r,e,t)}),n}function bt(e,t){let n=yt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var xt={get:bt(!1,!1)},St={get:bt(!1,!0)},Ct={get:bt(!0,!1)},wt=new WeakMap,Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap;function Ot(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function kt(e){return e.__v_skip||!Object.isExtensible(e)?0:Ot(S(e))}function At(e){return Ft(e)?e:Nt(e,!1,ft,xt,wt)}function jt(e){return Nt(e,!1,mt,St,Tt)}function Mt(e){return Nt(e,!0,pt,Ct,Et)}function Nt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=kt(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function Pt(e){return Ft(e)?Pt(e.__v_raw):!!(e&&e.__v_isReactive)}function Ft(e){return!!(e&&e.__v_isReadonly)}function L(e){return!!(e&&e.__v_isShallow)}function It(e){return e?!!e.__v_raw:!1}function R(e){let t=e&&e.__v_raw;return t?R(t):e}function Lt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&A(e,`__v_skip`,!0),e}var z=e=>v(e)?At(e):e,Rt=e=>v(e)?Mt(e):e;function B(e){return e?e.__v_isRef===!0:!1}function V(e){return zt(e,!1)}function zt(e,t){return B(e)?e:new Bt(e,t)}var Bt=class{constructor(e,t){this.dep=new Ue,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:R(e),this._value=t?e:z(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||L(e)||Ft(e);e=n?e:R(e),O(e,t)&&(this._rawValue=e,this._value=n?e:z(e),this.dep.trigger())}};function Vt(e){return B(e)?e.value:e}var Ht={get:(e,t,n)=>t===`__v_raw`?e:Vt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return B(i)&&!B(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Ut(e){return Pt(e)?e:new Proxy(e,Ht)}var Wt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Ue(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ve-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&P!==this)return Oe(this,!0),!0}get value(){let e=this.dep.track();return Pe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Gt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Wt(r,i,n)}var Kt={},qt=new WeakMap,Jt=void 0;function Yt(e,t=!1,n=Jt){if(n){let t=qt.get(n);t||qt.set(n,t=[]),t.push(e)}}function Xt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:L(e)||o===!1||o===0?Zt(e,1):Zt(e),m,g,_,v,y=!1,b=!1;if(B(e)?(g=()=>e.value,y=L(e)):Pt(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Pt(e)||L(e)),g=()=>e.map(e=>{if(B(e))return e.value;if(Pt(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){Re();try{_()}finally{ze()}}let t=Jt;Jt=m;try{return f?f(e,3,[v]):e(v)}finally{Jt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>Zt(e(),t)}let x=Se(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(Kt):Kt,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let e=m.run();if(o||y||(b?e.some((e,t)=>O(e,C[t])):O(e,C))){_&&_();let t=Jt;Jt=m;try{let t=[e,C===Kt?void 0:b&&C[0]===Kt?[]:C,v];C=e,f?f(n,3,t):n(...t)}finally{Jt=t}}}else m.run()};return u&&u(w),m=new we(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Yt(e,!1,m),_=m.onStop=()=>{let e=qt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();qt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function Zt(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,B(e))Zt(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)Zt(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{Zt(e,t,n)});else if(C(e)){for(let r in e)Zt(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Zt(e[r],t,n)}return e}function Qt(e,t,n,r){try{return r?e(...r):e()}catch(e){en(e,t,n)}}function $t(e,t,n,r){if(h(e)){let i=Qt(e,t,n,r);return i&&y(i)&&i.catch(e=>{en(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push($t(e[a],t,n,r));return i}}function en(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){Re(),Qt(o,null,10,[e,i,a]),ze();return}}tn(e,r,a,i,s)}function tn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var H=[],nn=-1,rn=[],an=null,on=0,sn=Promise.resolve(),cn=null;function U(e){let t=cn||sn;return e?t.then(this?e.bind(this):e):t}function ln(e){let t=nn+1,n=H.length;for(;t<n;){let r=t+n>>>1,i=H[r],a=hn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function un(e){if(!(e.flags&1)){let t=hn(e),n=H[H.length-1];!n||!(e.flags&2)&&t>=hn(n)?H.push(e):H.splice(ln(t),0,e),e.flags|=1,dn()}}function dn(){cn||=sn.then(gn)}function fn(e){d(e)?rn.push(...e):an&&e.id===-1?an.splice(on+1,0,e):e.flags&1||(rn.push(e),e.flags|=1),dn()}function pn(e,t,n=nn+1){for(;n<H.length;n++){let t=H[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;H.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function mn(e){if(rn.length){let e=[...new Set(rn)].sort((e,t)=>hn(e)-hn(t));if(rn.length=0,an){an.push(...e);return}for(an=e,on=0;on<an.length;on++){let e=an[on];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}an=null,on=0}}var hn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function gn(e){try{for(nn=0;nn<H.length;nn++){let e=H[nn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Qt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;nn<H.length;nn++){let e=H[nn];e&&(e.flags&=-2)}nn=-1,H.length=0,mn(e),cn=null,(H.length||rn.length)&&gn(e)}}var W=null,_n=null;function vn(e){let t=W;return W=e,_n=e&&e.type.__scopeId||null,t}function yn(e,t=W,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Di(-1);let i=vn(t),a;try{a=e(...n)}finally{vn(i),r._d&&Di(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function bn(e,n){if(W===null)return e;let r=la(W),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&Zt(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function xn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(Re(),$t(c,n,8,[e.el,s,e,t]),ze())}}function Sn(e,t){if(Q){let n=Q.provides,r=Q.parent&&Q.parent.provides;r===n&&(n=Q.provides=Object.create(r)),n[e]=t}}function Cn(e,t,n=!1){let r=Ji();if(r||Mr){let i=Mr?Mr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var wn=Symbol.for(`v-scx`),Tn=()=>Cn(wn);function En(e,t,n){return Dn(e,t,n)}function Dn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(ea){if(c===`sync`){let e=Tn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=Q;u.call=(e,t,n)=>$t(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{K(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():un(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Xt(e,n,u);return ea&&(f?f.push(h):d&&h()),h}function On(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?kn(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Zi(this),s=Dn(i,a.bind(r),n);return o(),s}function kn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var An=Symbol(`_vte`),jn=e=>e.__isTeleport,Mn=Symbol(`_leaveCb`);function Nn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Nn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Pn(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function Fn(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function In(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Ln=new WeakMap;function Rn(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>Rn(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Bn(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&Rn(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?la(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=R(v),b=v===t?i:e=>In(_,e)?!1:u(y,e),x=(e,t)=>!(t&&In(_,t));if(m!=null&&m!==p){if(zn(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(B(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))Qt(p,f,12,[l,_]);else{let t=g(p),n=B(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),Ln.delete(e)};t.id=-1,Ln.set(e,t),K(t,r)}else zn(e),i()}}}function zn(e){let t=Ln.get(e);t&&(t.flags|=8,Ln.delete(e))}se().requestIdleCallback,se().cancelIdleCallback;var Bn=e=>!!e.type.__asyncLoader,Vn=e=>e.type.__isKeepAlive;function Hn(e,t){Wn(e,`a`,t)}function Un(e,t){Wn(e,`da`,t)}function Wn(e,t,n=Q){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(Kn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)Vn(e.parent.vnode)&&Gn(r,t,n,e),e=e.parent}}function Gn(e,t,n,r){let i=Kn(t,e,r,!0);$n(()=>{c(r[t],i)},n)}function Kn(e,t,n=Q,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{Re();let i=Zi(n),a=$t(t,n,e,r);return i(),ze(),a};return r?i.unshift(a):i.push(a),a}}var qn=e=>(t,n=Q)=>{(!ea||e===`sp`)&&Kn(e,(...e)=>t(...e),n)},Jn=qn(`bm`),Yn=qn(`m`),Xn=qn(`bu`),Zn=qn(`u`),Qn=qn(`bum`),$n=qn(`um`),er=qn(`sp`),tr=qn(`rtg`),nr=qn(`rtc`);function rr(e,t=Q){Kn(`ec`,e,t)}var ir=`components`;function ar(e,t){return sr(ir,e,!0,t)||e}var or=Symbol.for(`v-ndc`);function sr(e,t,n=!0,r=!1){let i=W||Q;if(i){let n=i.type;if(e===ir){let e=ua(n,!1);if(e&&(e===t||e===E(t)||e===re(E(t))))return n}let a=cr(i[e]||n[e],t)||cr(i.appContext[e],t);return!a&&r?n:a}}function cr(e,t){return e&&(e[t]||e[E(t)]||e[re(E(t))])}function lr(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Pt(e),r=!1,s=!1;n&&(r=!L(e),s=Ft(e),e=Ze(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Rt(z(e[n])):z(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}var ur=e=>e?$i(e)?la(e):ur(e.parent):null,dr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ur(e.parent),$root:e=>ur(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>br(e),$forceUpdate:e=>e.f||=()=>{un(e.update)},$nextTick:e=>e.n||=U.bind(e.proxy),$watch:e=>On.bind(e)}),fr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),pr={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(fr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else hr&&(s[n]=0)}let d=dr[n],f,p;if(d)return n===`$attrs`&&I(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return fr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||fr(n,c)||u(o,c)||u(i,c)||u(dr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function mr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var hr=!0;function gr(e){let t=br(e),n=e.proxy,i=e.ctx;hr=!1,t.beforeCreate&&vr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:T,renderTracked:ee,renderTriggered:te,errorCaptured:E,serverPrefetch:ne,expose:D,inheritAttrs:re,components:ie,directives:O,filters:k}=t;if(u&&_r(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=At(t))}if(hr=!0,o)for(let e in o){let t=o[e],a=$({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)yr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Sn(t,e[t])})}f&&vr(f,e,`c`);function A(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(A(Jn,p),A(Yn,m),A(Xn,g),A(Zn,_),A(Hn,y),A(Un,b),A(rr,E),A(nr,ee),A(tr,te),A(Qn,S),A($n,w),A(er,ne),d(D))if(D.length){let t=e.exposed||={};D.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};T&&e.render===r&&(e.render=T),re!=null&&(e.inheritAttrs=re),ie&&(e.components=ie),O&&(e.directives=O),ne&&Fn(e)}function _r(e,t,n=r){d(e)&&(e=Tr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?Cn(r.from||n,r.default,!0):Cn(r.from||n):Cn(r),B(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function vr(e,t,n){$t(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function yr(e,t,n,r){let i=r.includes(`.`)?kn(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&En(i,n)}else if(h(e))En(i,e.bind(n));else if(v(e))if(d(e))e.forEach(e=>yr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&En(i,r,e)}}function br(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>xr(c,e,o,!0)),xr(c,t,o)),v(t)&&a.set(t,c),c}function xr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&xr(e,a,n,!0),i&&i.forEach(t=>xr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Sr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Sr={data:Cr,props:Dr,emits:Dr,methods:Er,computed:Er,beforeCreate:G,created:G,beforeMount:G,mounted:G,beforeUpdate:G,updated:G,beforeDestroy:G,beforeUnmount:G,destroyed:G,unmounted:G,activated:G,deactivated:G,errorCaptured:G,serverPrefetch:G,components:Er,directives:Er,watch:Or,provide:Cr,inject:wr};function Cr(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function wr(e,t){return Er(Tr(e),Tr(t))}function Tr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function G(e,t){return e?[...new Set([].concat(e,t))]:t}function Er(e,t){return e?s(Object.create(null),e,t):t}function Dr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),mr(e),mr(t??{})):t}function Or(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=G(e[r],t[r]);return n}function kr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Ar=0;function jr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=kr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Ar++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:fa,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||Pi(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,la(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&($t(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Mr;Mr=l;try{return e()}finally{Mr=t}}};return l}}var Mr=null,Nr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${E(t)}Modifiers`]||e[`${D(t)}Modifiers`];function Pr(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&Nr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=r.map(ae)));let c,l=i[c=ie(n)]||i[c=ie(E(n))];!l&&o&&(l=i[c=ie(D(n))]),l&&$t(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,$t(u,e,6,a)}}var Fr=new WeakMap;function Ir(e,t,n=!1){let r=n?Fr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Ir(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Lr(e,t){return!e||!a(t)?!1:(t=t.slice(2).replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,D(t))||u(e,t))}function Rr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=vn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Bi(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Bi(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:zr(c)}}catch(t){wi.length=0,en(t,e,1),v=Pi(Si)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Br(y,a)),b=Li(b,y,!1,!0))}return n.dirs&&(b=Li(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Nn(b,n.transition),v=b,vn(_),v}var zr=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Br=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Vr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Hr(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Ur(o,r,n)&&!Lr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Hr(r,o,l):!0:!!o;return!1}function Hr(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Ur(t,e,a)&&!Lr(n,a))return!0}return!1}function Ur(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!_e(r,i):r!==i}function Wr({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Gr={},Kr=()=>Object.create(Gr),qr=e=>Object.getPrototypeOf(e)===Gr;function Jr(e,t,n,r=!1){let i={},a=Kr();e.propsDefaults=Object.create(null),Xr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:jt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function Yr(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=R(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Lr(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=E(o);i[t]=Zr(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{Xr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=D(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Zr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Ye(e.attrs,`set`,``)}function Xr(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(T(t))continue;let l=n[t],d;a&&u(a,d=E(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Lr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=R(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=Zr(a,n,s,i[s],e,!u(i,s))}}return s}function Zr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Zi(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===D(n))&&(r=!0))}return r}var Qr=new WeakMap;function $r(e,r,i=!1){let a=i?Qr:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=$r(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=E(c[e]);ei(n)&&(l[n]=t)}else if(c)for(let e in c){let t=E(e);if(ei(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function ei(e){return e[0]!==`$`&&!T(e)}var ti=e=>e===`_`||e===`_ctx`||e===`$stable`,ni=e=>d(e)?e.map(Bi):[Bi(e)],ri=(e,t,n)=>{if(t._n)return t;let r=yn((...e)=>ni(t(...e)),n);return r._c=!1,r},ii=(e,t,n)=>{let r=e._ctx;for(let n in e){if(ti(n))continue;let i=e[n];if(h(i))t[n]=ri(n,i,r);else if(i!=null){let e=ni(i);t[n]=()=>e}}},ai=(e,t)=>{let n=ni(t);e.slots.default=()=>n},oi=(e,t,n)=>{for(let r in t)(n||!ti(r))&&(e[r]=t[r])},si=(e,t,n)=>{let r=e.slots=Kr();if(e.vnode.shapeFlag&32){let e=t._;e?(oi(r,t,n),n&&A(r,`_`,e,!0)):ii(t,r)}else t&&ai(e,t)},ci=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:oi(a,n,r):(o=!n.$stable,ii(n,a)),s=n}else n&&(ai(e,n),s={default:1});if(o)for(let e in a)!ti(e)&&s[e]==null&&delete a[e]},K=bi;function li(e){return ui(e)}function ui(e,i){let a=se();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!ji(e,t)&&(r=_e(e),j(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case xi:y(e,t,n,r);break;case Si:b(e,t,n,r);break;case Ci:e??x(t,n,r,o);break;case q:ie(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?O(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,ye)}u!=null&&i?Rn(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&Rn(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)ee(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),ne(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},ee=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&E(e.children,d,null,r,i,di(e,a),s,u),_&&xn(e,null,r,`created`),te(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!T(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Wi(f,r,e)}_&&xn(e,null,r,`beforeMount`);let v=pi(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&K(()=>{try{f&&Wi(f,r,e),v&&g.enter(d),_&&xn(e,null,r,`mounted`)}finally{}},i)},te=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||yi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;te(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},E=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?Vi(e[l]):Bi(e[l]),t,n,r,i,a,o,s)},ne=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&fi(r,!1),(g=h.onVnodeBeforeUpdate)&&Wi(g,r,n,e),f&&xn(n,e,r,`beforeUpdate`),r&&fi(r,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?D(e.dynamicChildren,d,l,r,i,di(n,a),o):s||le(e,n,l,null,r,i,di(n,a),o,!1),u>0){if(u&16)re(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else !s&&d==null&&re(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&K(()=>{g&&Wi(g,r,n,e),f&&xn(n,e,r,`updated`)},i)},D=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===q||!ji(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},re=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!T(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(T(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},ie=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),E(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(D(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&mi(e,t,!0)):le(e,t,n,f,i,a,s,c,l)},O=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):A(t,n,r,i,a,o,c):ae(e,t,c)},A=(e,t,n,r,i,a,o)=>{let s=e.component=qi(e,r,i);if(Vn(e)&&(s.ctx.renderer=ye),ta(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,oe,o),!e.el){let r=s.subTree=Pi(Si);b(null,r,t,n),e.placeholder=r.el}}else oe(s,e,t,n,i,a,o)},ae=(e,t,n)=>{let r=t.component=e.component;if(Vr(e,t,n))if(r.asyncDep&&!r.asyncResolved){ce(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},oe=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=gi(e);if(n){t&&(t.el=c.el,ce(e,t,o)),n.asyncDep.then(()=>{K(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;fi(e,!1),t?(t.el=c.el,ce(e,t,o)):t=c,n&&k(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Wi(d,s,t,c),fi(e,!0);let f=Rr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),_e(p),e,i,a),t.el=f.el,u===null&&Wr(e,f.el),r&&K(r,i),(d=t.props&&t.props.onVnodeUpdated)&&K(()=>Wi(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Bn(t);if(fi(e,!1),l&&k(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Wi(o,d,t),fi(e,!0),s&&N){let t=()=>{e.subTree=Rr(e),N(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Rr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&K(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;K(()=>Wi(o,d,e),i)}(t.shapeFlag&256||d&&Bn(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&K(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new we(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>un(u),fi(e,!0),l()},ce=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Yr(e,t.props,r,n),ci(e,t.children,n),Re(),pn(e),ze()},le=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){de(l,d,n,r,i,a,o,s,c);return}else if(f&256){ue(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&ge(l,i,a),d!==l&&p(n,d)):u&16?m&16?de(l,d,n,r,i,a,o,s,c):ge(l,i,a,!0):(u&8&&p(n,``),m&16&&E(d,n,r,i,a,o,s,c))},ue=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?Vi(t[p]):Bi(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?ge(e,a,o,!0,!1,f):E(t,r,i,a,o,s,c,l,f)},de=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?Vi(t[u]):Bi(t[u]);if(ji(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?Vi(t[p]):Bi(t[p]);if(ji(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?Vi(t[u]):Bi(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)j(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?Vi(t[u]):Bi(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){j(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&ji(n,t[_])){i=_;break}i===void 0?j(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?hi(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||vi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?fe(n,r,p,2):_--)}}},fe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){fe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,ye);return}if(c===q){o(a,t,n);for(let e=0;e<u.length;e++)fe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===Ci){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.beforeEnter(a),o(a,t,n),K(()=>l.enter(a),i);else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{a._isLeaving&&a[Mn](!0),r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},j=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(Re(),Rn(s,null,n,e,!0),ze()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Bn(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Wi(_,t,e),u&6)he(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&xn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,ye,r):l&&!l.hasOnce&&(a!==q||d>0&&d&64)?ge(l,t,n,!1,!0):(a===q&&d&384||!i&&u&16)&&ge(c,t,n),r&&pe(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&K(()=>{_&&Wi(_,t,e),h&&xn(e,null,t,`unmounted`),v&&(e.el=null)},n)},pe=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===q){me(n,r);return}if(t===Ci){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},me=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},he=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;_i(c),_i(l),r&&k(r),i.stop(),a&&(a.flags|=8,j(o,e,t,n)),s&&K(s,t),K(()=>{e.isUnmounted=!0},t)},ge=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)j(e[o],t,n,r,i)},_e=e=>{if(e.shapeFlag&6)return _e(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[An];return n?h(n):t},ve=!1,M=(e,t,n)=>{let r;e==null?t._vnode&&(j(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ve||=(ve=!0,pn(r),mn(),!1)},ye={p:v,um:j,m:fe,r:pe,mt:A,mc:E,pc:le,pbc:D,n:_e,o:e},be,N;return i&&([be,N]=i(ye)),{render:M,hydrate:be,createApp:jr(M,be)}}function di({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function fi({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function pi(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function mi(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Vi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&mi(t,a)),a.type===xi&&(a.patchFlag===-1&&(a=i[e]=Vi(a)),a.el=t.el),a.type===Si&&!a.el&&(a.el=t.el)}}function hi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function gi(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:gi(t)}function _i(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function vi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?vi(t.subTree):null}var yi=e=>e.__isSuspense;function bi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):fn(e)}var q=Symbol.for(`v-fgt`),xi=Symbol.for(`v-txt`),Si=Symbol.for(`v-cmt`),Ci=Symbol.for(`v-stc`),wi=[],J=null;function Y(e=!1){wi.push(J=e?null:[])}function Ti(){wi.pop(),J=wi[wi.length-1]||null}var Ei=1;function Di(e,t=!1){Ei+=e,e<0&&J&&t&&(J.hasOnce=!0)}function Oi(e){return e.dynamicChildren=Ei>0?J||n:null,Ti(),Ei>0&&J&&J.push(e),e}function X(e,t,n,r,i,a){return Oi(Z(e,t,n,r,i,a,!0))}function ki(e,t,n,r,i){return Oi(Pi(e,t,n,r,i,!0))}function Ai(e){return e?e.__v_isVNode===!0:!1}function ji(e,t){return e.type===t.type&&e.key===t.key}var Mi=({key:e})=>e??null,Ni=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||B(e)||h(e)?{i:W,r:e,k:t,f:!!n}:e);function Z(e,t=null,n=null,r=0,i=null,a=e===q?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Mi(t),ref:t&&Ni(t),scopeId:_n,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:W};return s?(Hi(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Ei>0&&!o&&J&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&J.push(c),c}var Pi=Fi;function Fi(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===or)&&(e=Si),Ai(e)){let r=Li(e,t,!0);return n&&Hi(r,n),Ei>0&&!a&&J&&(r.shapeFlag&6?J[J.indexOf(e)]=r:J.push(r)),r.patchFlag=-2,r}if(da(e)&&(e=e.__vccOpts),t){t=Ii(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=j(e)),v(n)&&(It(n)&&!d(n)&&(n=s({},n)),t.style=ce(n))}let o=g(e)?1:yi(e)?128:jn(e)?64:v(e)?4:h(e)?2:0;return Z(e,t,n,r,i,o,a,!0)}function Ii(e){return e?It(e)||qr(e)?s({},e):e:null}function Li(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Ui(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Mi(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Ni(t)):[a,Ni(t)]:Ni(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==q?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Li(e.ssContent),ssFallback:e.ssFallback&&Li(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Nn(u,c.clone(u)),u}function Ri(e=` `,t=0){return Pi(xi,null,e,t)}function zi(e=``,t=!1){return t?(Y(),ki(Si,null,e)):Pi(Si,null,e)}function Bi(e){return e==null||typeof e==`boolean`?Pi(Si):d(e)?Pi(q,null,e.slice()):Ai(e)?Vi(e):Pi(xi,null,String(e))}function Vi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Li(e)}function Hi(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Hi(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!qr(t)?t._ctx=W:r===3&&W&&(W.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else h(t)?(t={default:t,_ctx:W},n=32):(t=String(t),r&64?(n=16,t=[Ri(t)]):n=8);e.children=t,e.shapeFlag|=n}function Ui(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=j([t.class,r.class]));else if(e===`style`)t.style=ce([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Wi(e,t,n,r=null){$t(e,t,7,[n,r])}var Gi=kr(),Ki=0;function qi(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||Gi,o={uid:Ki++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new xe(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$r(i,a),emitsOptions:Ir(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=Pr.bind(null,o),e.ce&&e.ce(o),o}var Q=null,Ji=()=>Q||W,Yi,Xi;{let e=se(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};Yi=t(`__VUE_INSTANCE_SETTERS__`,e=>Q=e),Xi=t(`__VUE_SSR_SETTERS__`,e=>ea=e)}var Zi=e=>{let t=Q;return Yi(e),e.scope.on(),()=>{e.scope.off(),Yi(t)}},Qi=()=>{Q&&Q.scope.off(),Yi(null)};function $i(e){return e.vnode.shapeFlag&4}var ea=!1;function ta(e,t=!1,n=!1){t&&Xi(t);let{props:r,children:i}=e.vnode,a=$i(e);Jr(e,r,a,t),si(e,i,n||t);let o=a?na(e,t):void 0;return t&&Xi(!1),o}function na(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,pr);let{setup:r}=n;if(r){Re();let n=e.setupContext=r.length>1?ca(e):null,i=Zi(e),a=Qt(r,e,0,[e.props,n]),o=y(a);if(ze(),i(),(o||e.sp)&&!Bn(e)&&Fn(e),o){if(a.then(Qi,Qi),t)return a.then(n=>{ra(e,n,t)}).catch(t=>{en(t,e,0)});e.asyncDep=a}else ra(e,a,t)}else oa(e,t)}function ra(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Ut(t)),oa(e,n)}var ia,aa;function oa(e,t,n){let i=e.type;if(!e.render){if(!t&&ia&&!i.render){let t=i.template||br(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=ia(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,aa&&aa(e)}{let t=Zi(e);Re();try{gr(e)}finally{ze(),t()}}}var sa={get(e,t){return I(e,`get`,``),e[t]}};function ca(e){return{attrs:new Proxy(e.attrs,sa),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function la(e){return e.exposed?e.exposeProxy||=new Proxy(Ut(Lt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in dr)return dr[n](e)},has(e,t){return t in e||t in dr}}):e.proxy}function ua(e,t=!0){return h(e)?e.displayName||e.name:e.name||t&&e.__name}function da(e){return h(e)&&`__vccOpts`in e}var $=(e,t)=>Gt(e,t,ea),fa=`3.5.31`,pa=void 0,ma=typeof window<`u`&&window.trustedTypes;if(ma)try{pa=ma.createPolicy(`vue`,{createHTML:e=>e})}catch{}var ha=pa?e=>pa.createHTML(e):e=>e,ga=`http://www.w3.org/2000/svg`,_a=`http://www.w3.org/1998/Math/MathML`,va=typeof document<`u`?document:null,ya=va&&va.createElement(`template`),ba={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?va.createElementNS(ga,e):t===`mathml`?va.createElementNS(_a,e):n?va.createElement(e,{is:n}):va.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>va.createTextNode(e),createComment:e=>va.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>va.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{ya.innerHTML=ha(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=ya.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},xa=Symbol(`_vtc`);function Sa(e,t,n){let r=e[xa];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var Ca=Symbol(`_vod`),wa=Symbol(`_vsh`),Ta=Symbol(``),Ea=/(?:^|;)\s*display\s*:/;function Da(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t)if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??ka(r,t,``)}else for(let e in t)n[e]??ka(r,e,``);for(let e in n)e===`display`&&(a=!0),ka(r,e,n[e])}else if(i){if(t!==n){let e=r[Ta];e&&(n+=`;`+e),r.cssText=n,a=Ea.test(n)}}else t&&e.removeAttribute(`style`);Ca in e&&(e[Ca]=a?r.display:``,e[wa]&&(r.display=`none`))}var Oa=/\s*!important$/;function ka(e,t,n){if(d(n))n.forEach(n=>ka(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=Ma(e,t);Oa.test(n)?e.setProperty(D(r),n.replace(Oa,``),`important`):e[r]=n}}var Aa=[`Webkit`,`Moz`,`ms`],ja={};function Ma(e,t){let n=ja[t];if(n)return n;let r=E(t);if(r!==`filter`&&r in e)return ja[t]=r;r=re(r);for(let n=0;n<Aa.length;n++){let i=Aa[n]+r;if(i in e)return ja[t]=i}return t}var Na=`http://www.w3.org/1999/xlink`;function Pa(e,t,n,r,i,a=me(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Na,t.slice(6,t.length)):e.setAttributeNS(Na,t,n):n==null||a&&!he(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function Fa(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?ha(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=he(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function Ia(e,t,n,r){e.addEventListener(t,n,r)}function La(e,t,n,r){e.removeEventListener(t,n,r)}var Ra=Symbol(`_vei`);function za(e,t,n,r,i=null){let a=e[Ra]||(e[Ra]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Va(t);r?Ia(e,n,a[t]=Ga(r,i),s):o&&(La(e,n,o,s),a[t]=void 0)}}var Ba=/(?:Once|Passive|Capture)$/;function Va(e){let t;if(Ba.test(e)){t={};let n;for(;n=e.match(Ba);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):D(e.slice(2)),t]}var Ha=0,Ua=Promise.resolve(),Wa=()=>Ha||=(Ua.then(()=>Ha=0),Date.now());function Ga(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;$t(Ka(e,n.value),t,5,[e])};return n.value=e,n.attached=Wa(),n}function Ka(e,t){if(d(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}var qa=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ja=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?Sa(e,r,c):t===`style`?Da(e,n,r):a(t)?o(t)||za(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):Ya(e,t,r,c))?(Fa(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&Pa(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Xa(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?Fa(e,E(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),Pa(e,t,r,c))};function Ya(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&qa(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return qa(t)&&g(n)?!1:t in e}function Xa(e,t){let n=e._def.props;if(!n)return!1;let r=E(t);return Array.isArray(n)?n.some(e=>E(e)===r):Object.keys(n).some(e=>E(e)===r)}var Za=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>k(t,e):t};function Qa(e){e.target.composing=!0}function $a(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var eo=Symbol(`_assign`);function to(e,t,n){return t&&(e=e.trim()),n&&(e=ae(e)),e}var no={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[eo]=Za(i);let a=r||i.props&&i.props.type===`number`;Ia(e,t?`change`:`input`,t=>{t.target.composing||e[eo](to(e.value,n,a))}),(n||a)&&Ia(e,`change`,()=>{e.value=to(e.value,n,a)}),t||(Ia(e,`compositionstart`,Qa),Ia(e,`compositionend`,$a),Ia(e,`change`,$a))},mounted(e,{value:t}){e.value=t??``},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[eo]=Za(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?ae(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},ro=[`ctrl`,`shift`,`alt`,`meta`],io={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>ro.some(n=>e[`${n}Key`]&&!t.includes(n))},ao=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=io[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},oo=s({patchProp:Ja},ba),so;function co(){return so||=li(oo)}var lo=((...e)=>{let t=co().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=fo(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,uo(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function uo(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function fo(e){return g(e)?document.querySelector(e):e}var po={class:`browser-shell`},mo={class:`browser-frame`},ho={key:0,class:`live-menu-overlay`,"aria-label":`直播频道菜单`,role:`dialog`,"aria-modal":`true`},go={class:`live-menu-panel`,role:`region`,"aria-label":`频道列表`},_o={class:`live-menu-heading`,"aria-live":`polite`},vo={class:`live-menu-columns`,role:`group`},yo={class:`live-menu-column live-menu-column-left`,role:`tablist`,"aria-label":`频道分组`},bo=[`aria-label`,`aria-current`,`tabindex`],xo={class:`live-menu-column live-menu-column-right`,role:`grid`,"aria-label":`频道项目`},So=[`aria-label`,`aria-current`,`tabindex`,`onClick`],Co=Pn({__name:`HomeBrowser`,props:{activeUrl:{},setBackButtonRef:{type:Function},setWebviewRef:{type:Function},showLiveMenu:{type:Boolean},liveMenuGroups:{},activeLiveGroupIndex:{},activeLiveColumn:{},activeLiveItemIndex:{},liveMenuHeading:{}},emits:[`browser-ready`,`go-home`,`select-live-channel`],setup(e){return(t,n)=>{let r=ar(`webview`);return Y(),X(`section`,po,[Z(`div`,mo,[Pi(r,{ref:e.setWebviewRef,class:`browser-view`,src:e.activeUrl,allowpopups:`false`,onDomReady:n[0]||=e=>t.$emit(`browser-ready`)},null,8,[`src`]),e.showLiveMenu?(Y(),X(`div`,ho,[Z(`div`,go,[Z(`div`,_o,M(e.liveMenuHeading),1),Z(`div`,vo,[Z(`div`,yo,[(Y(!0),X(q,null,lr(e.liveMenuGroups,(t,n)=>(Y(),X(`button`,{key:t.label,type:`button`,class:j([`live-menu-item live-menu-group-item`,{"is-selected":n===e.activeLiveGroupIndex,"is-active":e.activeLiveColumn===`group`&&n===e.activeLiveGroupIndex}]),"aria-label":`选择${t.label}`,"aria-current":n===e.activeLiveGroupIndex?`true`:void 0,role:`tab`,tabindex:e.activeLiveColumn===`group`&&n===e.activeLiveGroupIndex?0:-1},M(t.label),11,bo))),128))]),Z(`div`,xo,[(Y(!0),X(q,null,lr(e.liveMenuGroups[e.activeLiveGroupIndex]?.items??[],(n,r)=>(Y(),X(`button`,{key:`${e.liveMenuGroups[e.activeLiveGroupIndex]?.label}-${n}-${r}`,type:`button`,class:j([`live-menu-item live-menu-channel-item`,{"is-selected":r===e.activeLiveItemIndex,"is-active":e.activeLiveColumn===`item`&&r===e.activeLiveItemIndex}]),"aria-label":`选择${n}频道`,"aria-current":r===e.activeLiveItemIndex?`true`:void 0,tabindex:e.activeLiveColumn===`item`&&r===e.activeLiveItemIndex?0:-1,onClick:e=>t.$emit(`select-live-channel`,n)},M(n),11,So))),128))])])])])):zi(``,!0),Z(`button`,{ref:e.setBackButtonRef,type:`button`,class:`back-home-button`,"aria-label":`返回主页`,onClick:n[1]||=e=>t.$emit(`go-home`)},` 返回主页 `,512)])])}}}),wo=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},To=wo(Co,[[`__scopeId`,`data-v-e85425b4`]]),Eo={class:`top-bar`},Do={class:`top-actions`},Oo={class:`hero-panel`},ko={class:`time-block`},Ao={class:`time-value`},jo={class:`time-date`},Mo={class:`card-grid`,"aria-label":`快捷入口`,role:`list`},No=[`tabindex`,`aria-label`,`aria-current`,`onClick`,`onFocus`],Po={class:`card-art`},Fo={class:`card-badge`},Io={class:`card-title`},Lo={class:`card-label`},Ro=wo(Pn({__name:`HomeLanding`,props:{currentTime:{},currentDate:{},shortcuts:{},selectedIndex:{},setCardRef:{type:Function}},emits:[`open-settings`,`close-window`,`open-site`,`focus-card`],setup(e){return(t,n)=>(Y(),X(q,null,[n[5]||=Z(`div`,{class:`background-image`},null,-1),n[6]||=Z(`div`,{class:`background-overlay`},null,-1),Z(`header`,Eo,[n[2]||=Z(`div`,{class:`top-left`},[Z(`span`,{class:`status-dot`}),Z(`span`,{class:`status-dot`})],-1),Z(`div`,Do,[Z(`button`,{type:`button`,class:`icon-button`,"aria-label":`打开设置`,onClick:n[0]||=e=>t.$emit(`open-settings`)},` ⚙ `),Z(`button`,{type:`button`,class:`icon-button`,"aria-label":`退出应用`,onClick:n[1]||=e=>t.$emit(`close-window`)},` ✕ `)])]),Z(`section`,Oo,[n[3]||=Z(`span`,{class:`hero-line hero-line-top`},null,-1),Z(`div`,ko,[Z(`div`,Ao,M(e.currentTime),1),Z(`div`,jo,M(e.currentDate),1)]),n[4]||=Z(`span`,{class:`hero-line hero-line-bottom`},null,-1)]),Z(`section`,Mo,[(Y(!0),X(q,null,lr(e.shortcuts,(n,r)=>(Y(),X(`button`,{key:n.name,type:`button`,class:j([`site-card`,[n.theme,{"is-selected":e.selectedIndex===r}]]),tabindex:e.selectedIndex===r?0:-1,ref_for:!0,ref:t=>e.setCardRef(t,r),"aria-label":`打开${n.name}`,"aria-current":e.selectedIndex===r?`true`:void 0,role:`listitem`,onClick:e=>t.$emit(`open-site`,n),onFocus:e=>t.$emit(`focus-card`,r)},[Z(`div`,Po,[Z(`div`,Fo,M(n.badge),1),Z(`div`,Io,M(n.name),1)]),Z(`div`,Lo,M(n.name),1)],42,No))),128))])],64))}}),[[`__scopeId`,`data-v-d7a463cd`]]),zo=[{name:`TV 直播`,badge:`LIVE`,url:`https://www.yangshipin.cn/tv/home`,theme:`theme-live`},{name:`央视片库`,badge:`CCTV`,url:`https://tv.cctv.com/`,theme:`theme-cctv`},{name:`抖音`,badge:`DY`,url:`https://www.douyin.com/`,theme:`theme-douyin`},{name:`腾讯视频`,badge:`QQ`,url:`https://v.qq.com/`,theme:`theme-tencent`}],Bo={launchModuleId:``,openModuleOnLaunch:!1,startAtLogin:!1,homeMode:`tv`,enabledShortcuts:zo.map(e=>e.url)},Vo=[{id:``,name:`无`},...zo.map(e=>({id:e.url,name:e.name}))],Ho={class:`settings-header`},Uo={class:`settings-body`},Wo={class:`settings-sidebar`,"aria-label":`设置分类`,role:`tablist`,"aria-labelledby":`settings-title`},Go=[`tabindex`,`onClick`,`aria-selected`,`aria-label`,`aria-controls`],Ko={class:`settings-content`,role:`presentation`},qo={class:`setting-row`},Jo=[`value`,`tabindex`],Yo=[`value`],Xo={class:`setting-row`},Zo=[`aria-pressed`,`tabindex`],Qo={class:`setting-row`},$o={class:`mode-toggle`,role:`tablist`,"aria-label":`主页模式`},es=[`tabindex`],ts=[`tabindex`],ns={class:`site-list`},rs=[`tabindex`],is={class:`site-info`},as={class:`site-icon`},os={class:`site-name`},ss={class:`site-status`},cs=[`tabindex`,`onClick`],ls={class:`add-site-form`},us={class:`form-row`},ds=[`tabindex`,`aria-invalid`],fs={key:0,class:`form-error`,role:`alert`},ps={class:`form-row`},ms=[`tabindex`,`aria-invalid`],hs={key:0,class:`form-error`,role:`alert`},gs={class:`form-actions`},_s=[`tabindex`],vs=[`tabindex`],ys=wo(Pn({__name:`SettingsPanel`,props:{activeMenu:{},settings:{}},emits:[`back`,`select-menu`,`update-setting`],setup(e,{emit:t}){let n=window.require?.(`electron`)?.ipcRenderer??null,r=e,i=t,a=$(()=>zo.map(e=>({name:e.name,url:e.url,isEnabled:r.settings.enabledShortcuts.includes(e.url)}))),o=[{key:`general`,label:`常规`},{key:`site-management`,label:`网址管理`},{key:`add-site`,label:`添加新网址`},{key:`add-local-app`,label:`添加本地应用`},{key:`wallpaper`,label:`壁纸设置`}],s=$(()=>{if(c.value>=0)return!1;switch(r.activeMenu){case`general`:return l.value>=0;case`site-management`:return d.value>=0||f.value>=0;case`add-site`:return p.value>=0||f.value>=0;default:return!1}}),c=V(0),l=V(-1),u=V(0),d=V(0),f=V(-1),p=V(-1),m=V(null),h=V([]),g=V(null),_=V(null),v=V(null),y=V(null),b=V(null),x=V([]),S=V(null),C=V(null),w=V(null),T=V(null);function ee(e,t){e&&(h.value[t]=e)}function te(e,t){e&&(x.value[t]=e)}function E(e){let t=o.length;c.value=(e+t)%t,l.value=-1,f.value=-1;let n=o[c.value].key;i(`select-menu`,n),n===`site-management`&&(d.value=0),U(()=>{h.value[c.value]?.focus()})}function ne(e){l.value=e,c.value=-1,U(()=>{e===0?_.value?.focus():e===1?v.value?.focus():e===2&&(u.value===0?y.value?.focus():b.value?.focus())})}function D(e){let t=a.value.length;d.value=(e+t)%t,l.value=-1,f.value=-1,c.value=-1,U(()=>{let e=x.value[d.value];e&&(e.focus(),e.scrollIntoView({behavior:`smooth`,block:`nearest`}))})}function re(e){return{"TV 直播":`📺`,央视片库:`🎬`,抖音:`🎵`,腾讯视频:`🎞️`}[e]||`🌐`}function ie(e){let t=r.settings.enabledShortcuts,n;n=e.isEnabled?t.filter(t=>t!==e.url):[...t,e.url],i(`update-setting`,{enabledShortcuts:n})}let O=V({name:``,url:``}),k=V({name:``,url:``}),A=V(``),ae=V(`success`);function oe(){let e=O.value.name.trim();return e?e.length>20?(k.value.name=`网站名称不能超过 20 个字符`,!1):zo.find(t=>t.name===e)?(k.value.name=`该网站名称已存在`,!1):(k.value.name=``,!0):(k.value.name=`请输入网站名称`,!1)}function se(){let e=O.value.url.trim();if(!e)return k.value.url=`请输入网址`,!1;if(!e.startsWith(`https://`))return k.value.url=`网址必须以 https:// 开头`,!1;try{new URL(e)}catch{return k.value.url=`请输入有效的网址格式`,!1}return zo.find(t=>t.url===e)?(k.value.url=`该网址已存在`,!1):(k.value.url=``,!0)}function ce(){let e=oe(),t=se();return e&&t}function le(){if(A.value=``,!ce()){ae.value=`error`,A.value=`请修正表单中的错误`;return}let e={name:O.value.name.trim(),badge:O.value.name.trim().toUpperCase().slice(0,4),url:O.value.url.trim(),theme:`theme-custom`};zo.push(e),i(`update-setting`,{enabledShortcuts:[...r.settings.enabledShortcuts,e.url]}),ae.value=`success`,A.value=`已成功添加 ${e.name}`,O.value={name:``,url:``},k.value={name:``,url:``},U(()=>{S.value?.focus(),p.value=0,f.value=-1})}function ue(){O.value={name:``,url:``},k.value={name:``,url:``},A.value=``,U(()=>{S.value?.focus(),p.value=0,f.value=-1})}function de(e){let{key:t}=e;if(c.value>=0){if(t===`ArrowUp`){e.preventDefault(),E(c.value-1);return}if(t===`ArrowDown`){e.preventDefault(),E(c.value+1);return}if(t===`ArrowRight`){e.preventDefault();let t=o[c.value].key;t===`general`?ne(0):t===`site-management`?D(0):t===`add-site`&&(c.value=-1,p.value=0,U(()=>{S.value?.focus()}));return}if(t===`Enter`){e.preventDefault();let t=o[c.value].key;t===`general`?ne(0):t===`site-management`?D(0):t===`add-site`&&(c.value=-1,p.value=0,U(()=>{S.value?.focus()}));return}return}if(r.activeMenu===`site-management`&&d.value>=0){if(f.value>=0){if(t===`ArrowLeft`){e.preventDefault(),f.value=-1,U(()=>{x.value[d.value]?.focus()});return}if(t===`ArrowUp`){e.preventDefault(),f.value>0?(--f.value,U(()=>{(x.value[f.value]?.querySelector(`.action-button`))?.focus()})):(f.value=-1,d.value=0,U(()=>{x.value[d.value]?.focus()}));return}if(t===`ArrowDown`){e.preventDefault(),f.value<a.value.length-1?(f.value+=1,U(()=>{(x.value[f.value]?.querySelector(`.action-button`))?.focus()})):(f.value=-1,d.value=a.value.length-1,U(()=>{x.value[d.value]?.focus()}));return}if(t===`Enter`){e.preventDefault();let t=a.value[f.value];ie(t);return}return}if(t===`ArrowUp`){e.preventDefault(),d.value>0?(--d.value,U(()=>{x.value[d.value]?.focus()})):a.value.length>1&&(d.value=a.value.length-1,U(()=>{x.value[d.value]?.focus()}));return}if(t===`ArrowDown`){e.preventDefault(),d.value<a.value.length-1?(d.value+=1,U(()=>{x.value[d.value]?.focus()})):a.value.length>1&&(d.value=0,U(()=>{x.value[d.value]?.focus()}));return}if(t===`ArrowLeft`){e.preventDefault();let t=o.findIndex(e=>e.key===r.activeMenu);E(t>=0?t:0);return}if(t===`ArrowRight`){e.preventDefault(),f.value=d.value,U(()=>{(x.value[f.value]?.querySelector(`.action-button`))?.focus()});return}if(t===`Enter`){e.preventDefault();let t=a.value[d.value];ie(t);return}return}if(r.activeMenu===`add-site`){if(p.value>=0){if(t===`ArrowUp`){e.preventDefault(),p.value>0&&(--p.value,U(()=>{p.value===0&&S.value?.focus()}));return}if(t===`ArrowDown`){e.preventDefault(),p.value<1?(p.value+=1,U(()=>{p.value===1&&C.value?.focus()})):(p.value=-1,f.value=0,U(()=>{w.value?.focus()}));return}if(t===`ArrowLeft`){e.preventDefault();let t=o.findIndex(e=>e.key===r.activeMenu);E(t>=0?t:0);return}if(t===`Tab`){e.preventDefault(),p.value===0?(p.value=1,U(()=>{C.value?.focus()})):p.value===1?(p.value=-1,f.value=0,U(()=>{w.value?.focus()})):(f.value=f.value===0?1:0,U(()=>{f.value===0?w.value?.focus():T.value?.focus()}));return}if(t===`Enter`){e.preventDefault(),p.value===0?(p.value=1,U(()=>{C.value?.focus()})):p.value===1&&le();return}return}if(f.value>=0){if(t===`ArrowLeft`){e.preventDefault(),f.value>0?(--f.value,U(()=>{f.value===0&&w.value?.focus()})):(f.value=-1,p.value=1,U(()=>{C.value?.focus()}));return}if(t===`ArrowRight`){e.preventDefault(),f.value<1?(f.value+=1,U(()=>{f.value===1&&T.value?.focus()})):(f.value=-1,p.value=1,U(()=>{C.value?.focus()}));return}if(t===`ArrowUp`){e.preventDefault(),f.value>0?(--f.value,U(()=>{f.value===0&&w.value?.focus()})):(f.value=-1,p.value=1,U(()=>{C.value?.focus()}));return}if(t===`ArrowDown`){e.preventDefault(),f.value<1&&(f.value+=1,U(()=>{f.value===1&&T.value?.focus()}));return}if(t===`Enter`){e.preventDefault(),f.value===0?le():f.value===1&&ue();return}return}if(t===`ArrowLeft`){e.preventDefault();let t=o.findIndex(e=>e.key===r.activeMenu);E(t>=0?t:0);return}}if(l.value>=0){if(t===`ArrowUp`){e.preventDefault(),l.value>0?ne(l.value-1):E(0);return}if(t===`ArrowDown`){e.preventDefault(),r.activeMenu===`general`?l.value<2?ne(l.value+1):ne(0):E(0);return}if(t===`ArrowLeft`){e.preventDefault(),E(0);return}if(t===`ArrowRight`){e.preventDefault(),l.value===2&&(u.value=u.value===0?1:0,U(()=>{u.value===0?y.value?.focus():b.value?.focus()}));return}if(t===`Enter`){e.preventDefault(),l.value===0?_.value?.showPicker?.():l.value===1?i(`update-setting`,{startAtLogin:!r.settings.startAtLogin}):l.value===2&&(u.value===0?i(`update-setting`,{homeMode:`game`}):i(`update-setting`,{homeMode:`tv`}));return}if(l.value===2&&(t===`ArrowLeft`||t===`ArrowRight`)){e.preventDefault(),u.value=t===`ArrowLeft`?0:1,U(()=>{u.value===0?y.value?.focus():b.value?.focus()});return}}(t===`Backspace`||t===`Escape`)&&(e.preventDefault(),i(`back`))}function fe(e){let t=e.target.value;i(`update-setting`,{launchModuleId:t,openModuleOnLaunch:t!==``})}return Yn(()=>{n?.send(`settings-panel:focus-changed`,!0),U(()=>{m.value?.focus(),setTimeout(()=>{h.value[0]?.focus()},50)})}),$n(()=>{n?.send(`settings-panel:focus-changed`,!1)}),(t,n)=>(Y(),X(`section`,{class:`settings-shell`,ref_key:`settingsShellRef`,ref:m,tabindex:`0`,onKeydown:de,role:`application`,"aria-label":`设置面板`},[Z(`header`,Ho,[Z(`button`,{type:`button`,class:`back-button`,ref_key:`backButtonRef`,ref:g,onClick:n[0]||=e=>t.$emit(`back`),"aria-label":`返回上一页`},` ← 返回 `,512),n[10]||=Z(`h1`,{class:`settings-title`,id:`settings-title`},`设置`,-1)]),Z(`div`,Uo,[Z(`aside`,Wo,[(Y(),X(q,null,lr(o,(n,r)=>Z(`button`,{key:n.key,type:`button`,class:j([`sidebar-item`,{"is-active":e.activeMenu===n.key,"is-focused":c.value===r}]),tabindex:c.value===r?0:-1,ref_for:!0,ref:e=>ee(e,r),onClick:e=>t.$emit(`select-menu`,n.key),role:`tab`,"aria-selected":e.activeMenu===n.key,"aria-label":`打开${n.label}设置`,"aria-controls":`panel-${n.key}`},M(n.label),11,Go)),64))]),Z(`div`,Ko,[e.activeMenu===`general`?(Y(),X(`section`,{key:0,class:j([`settings-card`,{"is-secondary-focused":s.value}]),role:`tabpanel`,id:`panel-general`,"aria-labelledby":`settings-title`},[Z(`div`,qo,[n[11]||=Z(`div`,{class:`setting-copy`},[Z(`div`,{class:`setting-label`,id:`launch-module-label`},`打开应用后直接启动`),Z(`div`,{class:`setting-desc`},`选择后可在启动应用时直接进入对应模块。`)],-1),Z(`select`,{class:j([`setting-select`,{"is-focused":l.value===0}]),value:e.settings.launchModuleId,onChange:fe,ref_key:`launchModuleSelectRef`,ref:_,tabindex:l.value===0?0:-1,"aria-labelledby":`launch-module-label`},[(Y(!0),X(q,null,lr(Vt(Vo),e=>(Y(),X(`option`,{key:e.id||`none`,value:e.id},M(e.name),9,Yo))),128))],42,Jo)]),Z(`div`,Xo,[n[13]||=Z(`div`,{class:`setting-copy`},[Z(`div`,{class:`setting-label`,id:`start-at-login-label`},`应用开机自启动`),Z(`div`,{class:`setting-desc`},`开启后会在系统登录时自动启动应用。`)],-1),Z(`button`,{type:`button`,class:j([`switch-button`,{"is-on":e.settings.startAtLogin,"is-focused":l.value===1}]),"aria-pressed":e.settings.startAtLogin,tabindex:l.value===1?0:-1,ref_key:`startAtLoginSwitchRef`,ref:v,onClick:n[1]||=n=>t.$emit(`update-setting`,{startAtLogin:!e.settings.startAtLogin}),"aria-labelledby":`start-at-login-label`},[...n[12]||=[Z(`span`,{class:`switch-knob`},null,-1)]],10,Zo)]),Z(`div`,Qo,[n[14]||=Z(`div`,{class:`setting-copy`},[Z(`div`,{class:`setting-label`},`主页模式`),Z(`div`,{class:`setting-desc`},`当前可切换电视模式和游戏模式，游戏模式页面后续补充。`)],-1),Z(`div`,$o,[Z(`button`,{type:`button`,class:j([`mode-option`,{"is-active":e.settings.homeMode===`game`,"is-focused":l.value===2&&u.value===0}]),tabindex:l.value===2&&u.value===0?0:-1,ref_key:`gameModeOptionRef`,ref:y,onClick:n[2]||=e=>t.$emit(`update-setting`,{homeMode:`game`})},` 游戏模式 `,10,es),Z(`button`,{type:`button`,class:j([`mode-option`,{"is-active":e.settings.homeMode===`tv`,"is-focused":l.value===2&&u.value===1}]),tabindex:l.value===2&&u.value===1?0:-1,ref_key:`tvModeOptionRef`,ref:b,onClick:n[3]||=e=>t.$emit(`update-setting`,{homeMode:`tv`})},` 电视模式 `,10,ts)])])],2)):e.activeMenu===`site-management`?(Y(),X(`section`,{key:1,class:j([`settings-card`,{"is-secondary-focused":s.value}]),role:`tabpanel`,id:`panel-site-management`,"aria-labelledby":`settings-title`},[Z(`div`,ns,[(Y(!0),X(q,null,lr(a.value,(e,t)=>(Y(),X(`div`,{key:e.url,class:j([`site-item`,{"is-focused":d.value===t}]),ref_for:!0,ref:e=>te(e,t),tabindex:d.value===t?0:-1},[Z(`div`,is,[Z(`span`,as,M(re(e.name)),1),Z(`span`,os,M(e.name),1)]),Z(`div`,ss,[Z(`span`,{class:j([`status-text`,e.isEnabled?`is-enabled`:`is-disabled`])},M(e.isEnabled?`已添加`:`未添加`),3),Z(`button`,{type:`button`,class:j([`action-button`,[e.isEnabled?`remove`:`add`,{"is-focused":f.value===t}]]),tabindex:f.value===t?0:-1,onClick:ao(t=>ie(e),[`stop`])},M(e.isEnabled?`移除`:`添加`),11,cs)])],10,rs))),128))])],2)):e.activeMenu===`add-site`?(Y(),X(`section`,{key:2,class:j([`settings-card`,{"is-secondary-focused":s.value}]),role:`tabpanel`,id:`panel-add-site`,"aria-labelledby":`settings-title`},[Z(`div`,ls,[n[17]||=Z(`div`,{class:`form-header`},[Z(`h2`,{class:`form-title`},`添加新网址`),Z(`span`,{class:`form-hint`},`需要用鼠标键盘`)],-1),Z(`div`,us,[n[15]||=Z(`label`,{class:`form-label`,for:`site-name-input`,id:`site-name-label`},`网站名称`,-1),bn(Z(`input`,{id:`site-name-input`,ref_key:`siteNameInputRef`,ref:S,type:`text`,class:j([`form-input`,{"is-focused":p.value===0,"is-error":k.value.name}]),placeholder:`例如：优酷`,"onUpdate:modelValue":n[4]||=e=>O.value.name=e,tabindex:p.value===0?0:-1,"aria-labelledby":`site-name-label`,"aria-invalid":k.value.name?`true`:`false`,onFocus:n[5]||=e=>p.value=0,onBlur:oe},null,42,ds),[[no,O.value.name]]),k.value.name?(Y(),X(`div`,fs,M(k.value.name),1)):zi(``,!0)]),Z(`div`,ps,[n[16]||=Z(`label`,{class:`form-label`,for:`site-url-input`,id:`site-url-label`},`网址`,-1),bn(Z(`input`,{id:`site-url-input`,ref_key:`siteUrlInputRef`,ref:C,type:`text`,class:j([`form-input`,{"is-focused":p.value===1,"is-error":k.value.url}]),placeholder:`https:// 开头`,"onUpdate:modelValue":n[6]||=e=>O.value.url=e,tabindex:p.value===1?0:-1,"aria-labelledby":`site-url-label`,"aria-invalid":k.value.url?`true`:`false`,onFocus:n[7]||=e=>p.value=1,onBlur:se},null,42,ms),[[no,O.value.url]]),k.value.url?(Y(),X(`div`,hs,M(k.value.url),1)):zi(``,!0)]),Z(`div`,gs,[Z(`button`,{type:`button`,class:j([`action-btn confirm-btn`,{"is-focused":f.value===0}]),tabindex:f.value===0?0:-1,ref_key:`confirmBtnRef`,ref:w,onClick:le,onFocus:n[8]||=e=>f.value=0},` 确认添加 `,42,_s),Z(`button`,{type:`button`,class:j([`action-btn cancel-btn`,{"is-focused":f.value===1}]),tabindex:f.value===1?0:-1,ref_key:`cancelBtnRef`,ref:T,onClick:ue,onFocus:n[9]||=e=>f.value=1},` 取消 `,42,vs)]),A.value?(Y(),X(`div`,{key:0,class:j([`form-message`,ae.value]),role:`status`},M(A.value),3)):zi(``,!0)])],2)):zi(``,!0)])])],544))}}),[[`__scopeId`,`data-v-bee49861`]]),bs=`(function registerYangshipinPlugin() {
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
`,xs={id:`yangshipin`,name:`央视频直播`,matches:[`https://www.yangshipin.cn/tv/home`],capabilities:{liveMenu:!0,volumeControl:!0},defaultConfig:{volume:.6}};function Ss(e){return`
${bs}
${e}
  `}var Cs=[{manifest:xs,matches:e=>xs.matches.some(t=>e.startsWith(t)),buildInitScript:e=>Ss(`window.__tvAssistantPlugins.yangshipin.init(${JSON.stringify(e)});`),buildMenuDataScript:()=>Ss(`window.__tvAssistantPlugins.yangshipin.waitForMenuData(20000);`),buildSelectChannelScript:e=>Ss(`window.__tvAssistantPlugins.yangshipin.selectChannel(${JSON.stringify(e)});`),buildAdjustVolumeScript:e=>Ss(`window.__tvAssistantPlugins.yangshipin.adjustVolume(${e});`)}];function ws(e){return Cs.find(t=>t.matches(e))??null}function Ts(e,t={}){let{level:n=`error`}=t;if(console.error(`[${n}] ${e}`),typeof window<`u`){let t=document.createElement(`div`);t.className=`error-toast`,t.textContent=e;let r={info:`rgba(0, 122, 255, 0.9)`,warning:`rgba(255, 149, 0, 0.9)`,error:`rgba(255, 59, 48, 0.9)`};t.style.cssText=`
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: ${r[n]};
      color: white;
      border-radius: 8px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 14px;
      max-width: 400px;
    `,document.body.appendChild(t),setTimeout(()=>{t.style.animation=`slideOut 0.3s ease`,setTimeout(()=>t.remove(),300)},3e3)}}async function Es(e,t={}){let{maxRetries:n=3,retryable:r=!0,message:i}=t,a;for(let t=0;t<n;t++)try{return await e()}catch(e){if(a=e,!r||t===n-1)break;let i=1e3*(t+1);console.warn(`重试中... (${t+1}/${n})，${i}ms 后重试`),await new Promise(e=>setTimeout(e,i))}throw i&&Ts(i,{...t,level:`error`}),a}var Ds={GENERAL:`general`,SITE_MANAGEMENT:`site-management`,ADD_SITE:`add-site`,ADD_LOCAL_APP:`add-local-app`,WALLPAPER:`wallpaper`},Os=[{name:`TV 直播`,badge:`LIVE`,url:`https://www.yangshipin.cn/tv/home`,theme:`theme-live`},{name:`央视片库`,badge:`CCTV`,url:`https://tv.cctv.com/`,theme:`theme-cctv`},{name:`抖音`,badge:`DY`,url:`https://www.douyin.com/`,theme:`theme-douyin`},{name:`腾讯视频`,badge:`QQ`,url:`https://v.qq.com/`,theme:`theme-tencent`}];function ks(){let e=V([]);return{refs:e,setRef:(t,n)=>{t?e.value[n]=t:delete e.value[n]},focus:t=>{let n=e.value[t];n instanceof HTMLElement&&(n.focus(),n.scrollIntoView({behavior:`smooth`,block:`nearest`}))},blur:t=>{let n=e.value[t];n instanceof HTMLElement&&n.blur()},getRef:t=>e.value[t]??null,getTotal:()=>e.value.length}}function As(e=null){let t=V(e);return{ref:t,setRef:e=>{e instanceof Element?t.value=e:t.value=null},focus:()=>{t.value instanceof HTMLElement&&(t.value.focus(),t.value.scrollIntoView({behavior:`smooth`,block:`nearest`}))},blur:()=>{t.value instanceof HTMLElement&&t.value.blur()},exists:()=>t.value!==null}}function js(){let e=At({visible:!1,groupIndex:0,column:`group`,groups:[{label:`央视频道`,items:[`内容稍后添加`]},{label:`卫视频道`,items:[`内容稍后添加`]}],itemIndices:[0,0]}),t=V(``),n=V(``),r=V({}),i=$(()=>e.groups[e.groupIndex]),a=$(()=>e.itemIndices[e.groupIndex]??0),o=$(()=>i.value?.items??[]),s=$(()=>t.value||i.value?.label||``);function c(){e.visible=!e.visible,e.visible||(e.column=`group`)}function l(){e.visible=!1,e.column=`group`}function u(t){let n=e.groups.length;e.groupIndex=(e.groupIndex+t+n)%n}function d(t){let n=o.value.length,r=(a.value+t+n)%n;e.itemIndices[e.groupIndex]=r}function f(n){if(!n)return;let r=n.trim();t.value=r;let i=e.groups.findIndex(e=>e.items.includes(r));if(i===-1)return;let a=e.groups[i].items.indexOf(r);e.groupIndex=i,e.itemIndices[i]=a}function p(t){let n=t.央视频道?.length?t.央视频道:[`内容稍后添加`],r=t.卫视频道?.length?t.卫视频道:[`内容稍后添加`];e.groups=[{label:`央视频道`,items:n},{label:`卫视频道`,items:r}],e.itemIndices=e.groups.map(()=>0),e.groupIndex=0,f(t.currentChannel??``)}function m(){e.column=e.column===`group`?`item`:`group`}return{state:e,currentChannel:t,currentPluginId:n,currentPluginConfig:r,currentGroup:i,currentItemIndex:a,currentItems:o,heading:s,toggle:c,close:l,moveGroup:u,moveItem:d,syncChannel:f,applyGroups:p,switchColumn:m}}lo(wo(Pn({__name:`HomePage`,setup(e){let t=window.require?.(`electron`)?.ipcRenderer??null,n=js(),r=ks(),i=As(),a=As(),o=At({now:new Date,selectedIndex:0,activeUrl:``,activeTitle:``,showSettings:!1,activeSettingsMenu:Ds.GENERAL,settings:{...Bo}}),s=At({currentPluginId:``,currentPluginConfig:{}}),c,l=0,u=new Intl.DateTimeFormat(`zh-CN`,{month:`long`,day:`numeric`,weekday:`long`}),d=$(()=>Os.filter(e=>o.settings.enabledShortcuts.includes(e.url))),f=$(()=>o.now.toLocaleTimeString(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,hour12:!1})),p=$(()=>ws(o.activeUrl)),m=$(()=>u.format(o.now)),h=$(()=>p.value?.manifest.capabilities.liveMenu??!1);function g(){o.now=new Date}function _(){o.showSettings=!0}function v(){o.showSettings=!1,U(()=>{T()})}function y(e){o.activeUrl=e.url,o.activeTitle=e.name,o.showSettings=!1,n.close(),n.currentChannel.value=``,s.currentPluginId=``,s.currentPluginConfig={},U(()=>{i.ref.value?.focus()})}function b(){if(!o.settings.openModuleOnLaunch||!o.settings.launchModuleId)return;let e=Os.find(e=>e.url===o.settings.launchModuleId);e&&y(e)}function x(){o.activeUrl=``,o.activeTitle=``,n.close(),n.currentChannel.value=``,s.currentPluginId=``,s.currentPluginConfig={},U(()=>{T()})}function S(e,t){r.setRef(e,t)}function C(e){i.setRef(e)}function w(e){a.setRef(e)}function T(){r.getRef(o.selectedIndex)?.focus()}function ee(e){let t=d.value.length;t!==0&&(o.selectedIndex=(o.selectedIndex+e+t)%t,T())}function te(){h.value&&n.toggle()}function E(){n.close()}function ne(e){let t=n.state.groupIndex;n.moveGroup(e),t!==n.state.groupIndex&&U(()=>{setTimeout(()=>{let e=document.querySelector(`.live-menu-channel-item.is-active`)||document.querySelector(`.live-menu-channel-item.is-selected`);e&&e.scrollIntoView({behavior:`smooth`,block:`nearest`})},80)})}function D(e){n.moveItem(e),U(()=>{setTimeout(()=>{let e=document.querySelector(`.live-menu-channel-item.is-active`)||document.querySelector(`.live-menu-channel-item.is-selected`);e&&e.scrollIntoView({behavior:`smooth`,block:`nearest`})},50)})}function re(e){n.syncChannel(e)}function ie(e){n.applyGroups(e)}async function O(e){try{return await Es(async()=>await t?.invoke(`plugin-config:get`,e)??{},{message:`加载插件 ${e} 配置失败`,retryable:!0,maxRetries:3})}catch{return Ts(`无法加载插件配置，请检查网络连接`),{}}}async function k(e,n){try{s.currentPluginConfig=n,await Es(async()=>{await t?.invoke(`plugin-config:set`,e,n)},{message:`保存插件 ${e} 配置失败`,retryable:!0,maxRetries:3})}catch(e){throw Ts(`保存插件配置失败，请稍后重试`),e}}async function A(){try{let e=await Es(async()=>await t?.invoke(`settings:get`),{message:`加载设置失败`,retryable:!0,maxRetries:3});o.settings={...Bo,...e}}catch{Ts(`无法加载设置，将使用默认配置`),o.settings={...Bo}}}async function ae(e){try{await Es(async()=>await t?.invoke(`settings:set`,e),{message:`保存设置失败`,retryable:!0,maxRetries:3}),o.settings={...o.settings,...e},Ts(`设置已保存`,{level:`info`})}catch(e){throw Ts(`保存设置失败，请稍后重试`),e}}async function oe(){let e=a.ref.value,t=p.value;if(!e||!t)return null;s.currentPluginId!==t.manifest.id&&(s.currentPluginConfig={...t.manifest.defaultConfig,...await O(t.manifest.id)},s.currentPluginId=t.manifest.id);try{await e.executeJavaScript(t.buildInitScript(s.currentPluginConfig),!0)}catch(e){return console.error(`初始化插件 ${t.manifest.id} 失败:`,e),null}return t}async function se(){let e=a.ref.value,t=p.value;if(!e||!t?.manifest.capabilities.liveMenu)return;let n=++l;try{await oe();let r=await e.executeJavaScript(t.buildMenuDataScript(),!0);if(n!==l||!r)return;ie(r)}catch(e){console.error(`获取插件 ${t.manifest.id} 菜单数据失败:`,e),ie({})}}async function ce(e){let t=a.ref.value,n=p.value;if(!(!t||!n?.manifest.capabilities.liveMenu))try{re(e),await oe(),await t.executeJavaScript(n.buildSelectChannelScript(e),!0)&&(E(),window.setTimeout(()=>{se()},1200))}catch(e){console.error(`插件 ${n.manifest.id} 切换频道失败:`,e)}}async function le(e){let t=a.ref.value,n=p.value;if(!(!t||!n?.manifest.capabilities.volumeControl))try{await oe();let r=await t.executeJavaScript(n.buildAdjustVolumeScript(e),!0);typeof r==`number`&&await k(n.manifest.id,{...s.currentPluginConfig,volume:r})}catch(e){console.error(`插件 ${n.manifest.id} 调整音量失败:`,e)}}function ue(){let e=p.value;e&&(oe(),e.manifest.capabilities.liveMenu&&se())}function de(e){if(o.showSettings&&!o.activeUrl&&(e.key===`Escape`||e.key===`Backspace`)){e.preventDefault(),e.stopPropagation(),v();return}}function fe(e){if(o.showSettings&&!o.activeUrl){console.log(e.key),(e.key===`Escape`||e.key===`Backspace`)&&(e.preventDefault(),v());return}if(o.activeUrl){if(n.state.visible){if(e.key===`Escape`||e.key===`Backspace`){e.preventDefault(),E();return}if(e.key===`ArrowLeft`||e.key===`ArrowRight`){e.preventDefault(),n.switchColumn();return}if(e.key===`ArrowUp`){if(e.preventDefault(),n.state.column===`group`){ne(-1);return}D(-1);return}if(e.key===`ArrowDown`){if(e.preventDefault(),n.state.column===`group`){ne(1);return}D(1);return}if(e.key===`Enter`&&n.state.column===`item`){e.preventDefault(),ce(n.currentItems.value[n.currentItemIndex.value]);return}return}if(h.value&&e.key===`Enter`){e.preventDefault(),te();return}if(e.key===`-`||e.key===`_`){e.preventDefault(),le(-.05);return}if(e.key===`=`||e.key===`+`){e.preventDefault(),le(.05);return}(e.key===`Escape`||e.key===`Backspace`)&&(e.preventDefault(),x());return}if(e.key===`ArrowLeft`||e.key===`ArrowUp`){e.preventDefault(),ee(-1);return}if(e.key===`ArrowRight`||e.key===`ArrowDown`){e.preventDefault(),ee(1);return}(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),d.value.length>0&&y(d.value[o.selectedIndex]))}function pe(e,t){fe(new KeyboardEvent(`keydown`,{key:t.key}))}function me(){window.close()}return Yn(async()=>{g(),c=window.setInterval(g,1e3),t?.on(`app-keydown`,pe),await A(),b(),U(()=>{T()})}),Qn(()=>{c&&window.clearInterval(c),t?.removeListener(`app-keydown`,pe)}),(e,t)=>(Y(),X(`main`,{class:j([`home-shell`,{"is-browser-open":!!o.activeUrl}]),tabindex:`0`,onKeydown:fe,onKeydownCapture:de},[o.showSettings?(Y(),ki(ys,{key:0,"active-menu":o.activeSettingsMenu,settings:o.settings,onBack:v,onSelectMenu:t[0]||=e=>o.activeSettingsMenu=e,onUpdateSetting:ae},null,8,[`active-menu`,`settings`])):o.activeUrl?(Y(),ki(To,{key:2,"active-url":o.activeUrl,"set-back-button-ref":C,"set-webview-ref":w,"show-live-menu":Vt(n).state.visible,"live-menu-groups":Vt(n).state.groups,"active-live-group-index":Vt(n).state.groupIndex,"active-live-column":Vt(n).state.column,"active-live-item-index":Vt(n).currentItemIndex.value,"live-menu-heading":Vt(n).heading.value,onBrowserReady:ue,onGoHome:x,onSelectLiveChannel:ce},null,8,[`active-url`,`show-live-menu`,`live-menu-groups`,`active-live-group-index`,`active-live-column`,`active-live-item-index`,`live-menu-heading`])):(Y(),ki(Ro,{key:1,"current-time":f.value,"current-date":m.value,shortcuts:d.value,"selected-index":o.selectedIndex,"set-card-ref":S,onOpenSettings:_,onCloseWindow:me,onOpenSite:y,onFocusCard:t[1]||=e=>o.selectedIndex=e},null,8,[`current-time`,`current-date`,`shortcuts`,`selected-index`]))],34))}}),[[`__scopeId`,`data-v-576fc48f`]])).mount(`#app`);