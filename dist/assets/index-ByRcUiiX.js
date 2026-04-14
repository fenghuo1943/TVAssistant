(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ee=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),te=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ne=/-\w/g,T=te(e=>e.replace(ne,e=>e.slice(1).toUpperCase())),re=/\B([A-Z])/g,E=te(e=>e.replace(re,`-$1`).toLowerCase()),D=te(e=>e.charAt(0).toUpperCase()+e.slice(1)),O=te(e=>e?`on${D(e)}`:``),k=(e,t)=>!Object.is(e,t),ie=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},A=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},ae=e=>{let t=parseFloat(e);return isNaN(t)?e:t},oe,se=()=>oe||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function ce(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?fe(r):ce(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(g(e)||v(e))return e}var le=/;(?![^(]*\))/g,ue=/:([^]+)/,de=/\/\*[^]*?\*\//g;function fe(e){let t={};return e.replace(de,``).split(le).forEach(e=>{if(e){let n=e.split(ue);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function j(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=j(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var pe=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,me=e(pe);pe+``;function he(e){return!!e||e===``}function ge(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=_e(e[r],t[r]);return n}function _e(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?ge(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!_e(e[n],t[n]))return!1}}return String(e)===String(t)}var ve=e=>!!(e&&e.__v_isRef===!0),M=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?ve(e)?M(e.value):JSON.stringify(e,ye,2):String(e),ye=(e,t)=>ve(t)?ye(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[be(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>be(e))}:_(t)?be(t):v(t)&&!d(t)&&!C(t)?String(t):t,be=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,N,xe=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=N,!e&&N&&(this.index=(N.scopes||=[]).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=N;try{return N=this,e()}finally{N=t}}}on(){++this._on===1&&(this.prevScope=N,N=this)}off(){this._on>0&&--this._on===0&&(N=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Se(){return N}var P,Ce=new WeakSet,we=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,N&&N.active&&N.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ce.has(this)&&(Ce.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Oe(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ve(this),je(this);let e=P,t=Le;P=this,Le=!0;try{return this.fn()}finally{Me(this),P=e,Le=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Fe(e);this.deps=this.depsTail=void 0,Ve(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ce.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ne(this)&&this.run()}get dirty(){return Ne(this)}},Te=0,Ee,De;function Oe(e,t=!1){if(e.flags|=8,t){e.next=De,De=e;return}e.next=Ee,Ee=e}function ke(){Te++}function Ae(){if(--Te>0)return;if(De){let e=De;for(De=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;Ee;){let t=Ee;for(Ee=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function je(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Me(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Fe(r),Ie(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ne(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Pe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Pe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===He)||(e.globalVersion=He,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ne(e))))return;e.flags|=2;let t=e.dep,n=P,r=Le;P=e,Le=!0;try{je(e);let n=e.fn(e._value);(t.version===0||k(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{P=n,Le=r,Me(e),e.flags&=-3}}function Fe(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Fe(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ie(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var Le=!0,Re=[];function ze(){Re.push(Le),Le=!1}function Be(){let e=Re.pop();Le=e===void 0?!0:e}function Ve(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=P;P=void 0;try{t()}finally{P=e}}}var He=0,Ue=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},We=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!P||!Le||P===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==P)t=this.activeLink=new Ue(P,this),P.deps?(t.prevDep=P.depsTail,P.depsTail.nextDep=t,P.depsTail=t):P.deps=P.depsTail=t,Ge(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=P.depsTail,t.nextDep=void 0,P.depsTail.nextDep=t,P.depsTail=t,P.deps===t&&(P.deps=e)}return t}trigger(e){this.version++,He++,this.notify(e)}notify(e){ke();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ae()}}};function Ge(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ge(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ke=new WeakMap,qe=Symbol(``),Je=Symbol(``),Ye=Symbol(``);function F(e,t,n){if(Le&&P){let t=Ke.get(e);t||Ke.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new We),r.map=t,r.key=n),r.track()}}function Xe(e,t,n,r,i,a){let o=Ke.get(e);if(!o){He++;return}let s=e=>{e&&e.trigger()};if(ke(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ye||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ye)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`delete`:i||(s(o.get(qe)),f(e)&&s(o.get(Je)));break;case`set`:f(e)&&s(o.get(qe));break}}Ae()}function Ze(e){let t=L(e);return t===e?t:(F(t,`iterate`,Ye),I(e)?t:t.map(R))}function Qe(e){return F(e=L(e),`iterate`,Ye),e}function $e(e,t){return It(e)?zt(Ft(e)?R(t):t):R(t)}var et={__proto__:null,[Symbol.iterator](){return tt(this,Symbol.iterator,e=>$e(this,e))},concat(...e){return Ze(this).concat(...e.map(e=>d(e)?Ze(e):e))},entries(){return tt(this,`entries`,e=>(e[1]=$e(this,e[1]),e))},every(e,t){return rt(this,`every`,e,t,void 0,arguments)},filter(e,t){return rt(this,`filter`,e,t,e=>e.map(e=>$e(this,e)),arguments)},find(e,t){return rt(this,`find`,e,t,e=>$e(this,e),arguments)},findIndex(e,t){return rt(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return rt(this,`findLast`,e,t,e=>$e(this,e),arguments)},findLastIndex(e,t){return rt(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return rt(this,`forEach`,e,t,void 0,arguments)},includes(...e){return at(this,`includes`,e)},indexOf(...e){return at(this,`indexOf`,e)},join(e){return Ze(this).join(e)},lastIndexOf(...e){return at(this,`lastIndexOf`,e)},map(e,t){return rt(this,`map`,e,t,void 0,arguments)},pop(){return ot(this,`pop`)},push(...e){return ot(this,`push`,e)},reduce(e,...t){return it(this,`reduce`,e,t)},reduceRight(e,...t){return it(this,`reduceRight`,e,t)},shift(){return ot(this,`shift`)},some(e,t){return rt(this,`some`,e,t,void 0,arguments)},splice(...e){return ot(this,`splice`,e)},toReversed(){return Ze(this).toReversed()},toSorted(e){return Ze(this).toSorted(e)},toSpliced(...e){return Ze(this).toSpliced(...e)},unshift(...e){return ot(this,`unshift`,e)},values(){return tt(this,`values`,e=>$e(this,e))}};function tt(e,t,n){let r=Qe(e),i=r[t]();return r!==e&&!I(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var nt=Array.prototype;function rt(e,t,n,r,i,a){let o=Qe(e),s=o!==e&&!I(e),c=o[t];if(c!==nt[t]){let t=c.apply(e,a);return s?R(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,$e(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function it(e,t,n,r){let i=Qe(e),a=i!==e&&!I(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=$e(e,t)),n.call(this,t,$e(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?$e(e,c):c}function at(e,t,n){let r=L(e);F(r,`iterate`,Ye);let i=r[t](...n);return(i===-1||i===!1)&&Lt(n[0])?(n[0]=L(n[0]),r[t](...n)):i}function ot(e,t,n=[]){ze(),ke();let r=L(e)[t].apply(e,n);return Ae(),Be(),r}var st=e(`__proto__,__v_isRef,__isVue`),ct=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function lt(e){_(e)||(e=String(e));let t=L(this);return F(t,`has`,e),t.hasOwnProperty(e)}var ut=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Ot:Dt:i?Et:Tt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=et[t]))return e;if(t===`hasOwnProperty`)return lt}let o=Reflect.get(e,t,z(e)?e:n);if((_(t)?ct.has(t):st(t))||(r||F(e,`get`,t),i))return o;if(z(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Nt(e):e}return v(o)?r?Nt(o):jt(o):o}},dt=class extends ut{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=It(i);if(!I(n)&&!It(n)&&(i=L(i),n=L(n)),!a&&z(i)&&!z(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,z(e)?e:r);return e===L(r)&&(o?k(n,i)&&Xe(e,`set`,t,n,i):Xe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Xe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!ct.has(t))&&F(e,`has`,t),n}ownKeys(e){return F(e,`iterate`,d(e)?`length`:qe),Reflect.ownKeys(e)}},ft=class extends ut{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},pt=new dt,mt=new ft,ht=new dt(!0),gt=e=>e,_t=e=>Reflect.getPrototypeOf(e);function vt(e,t,n){return function(...r){let i=this.__v_raw,a=L(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?gt:t?zt:R;return!t&&F(a,`iterate`,l?Je:qe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function yt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function bt(e,t){let n={get(n){let r=this.__v_raw,i=L(r),a=L(n);e||(k(n,a)&&F(i,`get`,n),F(i,`get`,a));let{has:o}=_t(i),s=t?gt:e?zt:R;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&F(L(t),`iterate`,qe),t.size},has(t){let n=this.__v_raw,r=L(n),i=L(t);return e||(k(t,i)&&F(r,`has`,t),F(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=L(a),s=t?gt:e?zt:R;return!e&&F(o,`iterate`,qe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:yt(`add`),set:yt(`set`),delete:yt(`delete`),clear:yt(`clear`)}:{add(e){let n=L(this),r=_t(n),i=L(e),a=!t&&!I(e)&&!It(e)?i:e;return r.has.call(n,a)||k(e,a)&&r.has.call(n,e)||k(i,a)&&r.has.call(n,i)||(n.add(a),Xe(n,`add`,a,a)),this},set(e,n){!t&&!I(n)&&!It(n)&&(n=L(n));let r=L(this),{has:i,get:a}=_t(r),o=i.call(r,e);o||=(e=L(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?k(n,s)&&Xe(r,`set`,e,n,s):Xe(r,`add`,e,n),this},delete(e){let t=L(this),{has:n,get:r}=_t(t),i=n.call(t,e);i||=(e=L(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Xe(t,`delete`,e,void 0,a),o},clear(){let e=L(this),t=e.size!==0,n=e.clear();return t&&Xe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=vt(r,e,t)}),n}function xt(e,t){let n=bt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var St={get:xt(!1,!1)},Ct={get:xt(!1,!0)},wt={get:xt(!0,!1)},Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap,Ot=new WeakMap;function kt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function At(e){return e.__v_skip||!Object.isExtensible(e)?0:kt(S(e))}function jt(e){return It(e)?e:Pt(e,!1,pt,St,Tt)}function Mt(e){return Pt(e,!1,ht,Ct,Et)}function Nt(e){return Pt(e,!0,mt,wt,Dt)}function Pt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=At(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function Ft(e){return It(e)?Ft(e.__v_raw):!!(e&&e.__v_isReactive)}function It(e){return!!(e&&e.__v_isReadonly)}function I(e){return!!(e&&e.__v_isShallow)}function Lt(e){return e?!!e.__v_raw:!1}function L(e){let t=e&&e.__v_raw;return t?L(t):e}function Rt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&A(e,`__v_skip`,!0),e}var R=e=>v(e)?jt(e):e,zt=e=>v(e)?Nt(e):e;function z(e){return e?e.__v_isRef===!0:!1}function B(e){return Bt(e,!1)}function Bt(e,t){return z(e)?e:new Vt(e,t)}var Vt=class{constructor(e,t){this.dep=new We,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:L(e),this._value=t?e:R(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||I(e)||It(e);e=n?e:L(e),k(e,t)&&(this._rawValue=e,this._value=n?e:R(e),this.dep.trigger())}};function Ht(e){return z(e)?e.value:e}var Ut={get:(e,t,n)=>t===`__v_raw`?e:Ht(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return z(i)&&!z(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Wt(e){return Ft(e)?e:new Proxy(e,Ut)}var Gt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new We(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=He-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&P!==this)return Oe(this,!0),!0}get value(){let e=this.dep.track();return Pe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Kt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Gt(r,i,n)}var qt={},Jt=new WeakMap,Yt=void 0;function Xt(e,t=!1,n=Yt){if(n){let t=Jt.get(n);t||Jt.set(n,t=[]),t.push(e)}}function Zt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:I(e)||o===!1||o===0?Qt(e,1):Qt(e),m,g,_,v,y=!1,b=!1;if(z(e)?(g=()=>e.value,y=I(e)):Ft(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Ft(e)||I(e)),g=()=>e.map(e=>{if(z(e))return e.value;if(Ft(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){ze();try{_()}finally{Be()}}let t=Yt;Yt=m;try{return f?f(e,3,[v]):e(v)}finally{Yt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>Qt(e(),t)}let x=Se(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(qt):qt,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e))if(n){let e=m.run();if(o||y||(b?e.some((e,t)=>k(e,C[t])):k(e,C))){_&&_();let t=Yt;Yt=m;try{let t=[e,C===qt?void 0:b&&C[0]===qt?[]:C,v];C=e,f?f(n,3,t):n(...t)}finally{Yt=t}}}else m.run()};return u&&u(w),m=new we(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Xt(e,!1,m),_=m.onStop=()=>{let e=Jt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();Jt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function Qt(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,z(e))Qt(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)Qt(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{Qt(e,t,n)});else if(C(e)){for(let r in e)Qt(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Qt(e[r],t,n)}return e}function $t(e,t,n,r){try{return r?e(...r):e()}catch(e){tn(e,t,n)}}function en(e,t,n,r){if(h(e)){let i=$t(e,t,n,r);return i&&y(i)&&i.catch(e=>{tn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(en(e[a],t,n,r));return i}}function tn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){ze(),$t(o,null,10,[e,i,a]),Be();return}}nn(e,r,a,i,s)}function nn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var V=[],rn=-1,an=[],on=null,sn=0,cn=Promise.resolve(),ln=null;function H(e){let t=ln||cn;return e?t.then(this?e.bind(this):e):t}function un(e){let t=rn+1,n=V.length;for(;t<n;){let r=t+n>>>1,i=V[r],a=gn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function dn(e){if(!(e.flags&1)){let t=gn(e),n=V[V.length-1];!n||!(e.flags&2)&&t>=gn(n)?V.push(e):V.splice(un(t),0,e),e.flags|=1,fn()}}function fn(){ln||=cn.then(_n)}function pn(e){d(e)?an.push(...e):on&&e.id===-1?on.splice(sn+1,0,e):e.flags&1||(an.push(e),e.flags|=1),fn()}function mn(e,t,n=rn+1){for(;n<V.length;n++){let t=V[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;V.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function hn(e){if(an.length){let e=[...new Set(an)].sort((e,t)=>gn(e)-gn(t));if(an.length=0,on){on.push(...e);return}for(on=e,sn=0;sn<on.length;sn++){let e=on[sn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}on=null,sn=0}}var gn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function _n(e){try{for(rn=0;rn<V.length;rn++){let e=V[rn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),$t(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;rn<V.length;rn++){let e=V[rn];e&&(e.flags&=-2)}rn=-1,V.length=0,hn(e),ln=null,(V.length||an.length)&&_n(e)}}var U=null,vn=null;function yn(e){let t=U;return U=e,vn=e&&e.type.__scopeId||null,t}function bn(e,t=U,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Oi(-1);let i=yn(t),a;try{a=e(...n)}finally{yn(i),r._d&&Oi(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function xn(e,n){if(U===null)return e;let r=ua(U),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&Qt(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function Sn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(ze(),en(c,n,8,[e.el,s,e,t]),Be())}}function Cn(e,t){if(Z){let n=Z.provides,r=Z.parent&&Z.parent.provides;r===n&&(n=Z.provides=Object.create(r)),n[e]=t}}function wn(e,t,n=!1){let r=Yi();if(r||Nr){let i=Nr?Nr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var Tn=Symbol.for(`v-scx`),En=()=>wn(Tn);function Dn(e,t,n){return On(e,t,n)}function On(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(ta){if(c===`sync`){let e=En();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=Z;u.call=(e,t,n)=>en(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{G(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():dn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Zt(e,n,u);return ta&&(f?f.push(h):d&&h()),h}function kn(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?An(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Qi(this),s=On(i,a.bind(r),n);return o(),s}function An(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var jn=Symbol(`_vte`),Mn=e=>e.__isTeleport,Nn=Symbol(`_leaveCb`);function Pn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Pn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Fn(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function In(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function Ln(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Rn=new WeakMap;function zn(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>zn(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Vn(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&zn(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?ua(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=L(v),b=v===t?i:e=>Ln(_,e)?!1:u(y,e),x=(e,t)=>!(t&&Ln(_,t));if(m!=null&&m!==p){if(Bn(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(z(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))$t(p,f,12,[l,_]);else{let t=g(p),n=z(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),Rn.delete(e)};t.id=-1,Rn.set(e,t),G(t,r)}else Bn(e),i()}}}function Bn(e){let t=Rn.get(e);t&&(t.flags|=8,Rn.delete(e))}se().requestIdleCallback,se().cancelIdleCallback;var Vn=e=>!!e.type.__asyncLoader,Hn=e=>e.type.__isKeepAlive;function Un(e,t){Gn(e,`a`,t)}function Wn(e,t){Gn(e,`da`,t)}function Gn(e,t,n=Z){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(qn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)Hn(e.parent.vnode)&&Kn(r,t,n,e),e=e.parent}}function Kn(e,t,n,r){let i=qn(t,e,r,!0);er(()=>{c(r[t],i)},n)}function qn(e,t,n=Z,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{ze();let i=Qi(n),a=en(t,n,e,r);return i(),Be(),a};return r?i.unshift(a):i.push(a),a}}var Jn=e=>(t,n=Z)=>{(!ta||e===`sp`)&&qn(e,(...e)=>t(...e),n)},Yn=Jn(`bm`),Xn=Jn(`m`),Zn=Jn(`bu`),Qn=Jn(`u`),$n=Jn(`bum`),er=Jn(`um`),tr=Jn(`sp`),nr=Jn(`rtg`),rr=Jn(`rtc`);function ir(e,t=Z){qn(`ec`,e,t)}var ar=`components`;function or(e,t){return cr(ar,e,!0,t)||e}var sr=Symbol.for(`v-ndc`);function cr(e,t,n=!0,r=!1){let i=U||Z;if(i){let n=i.type;if(e===ar){let e=da(n,!1);if(e&&(e===t||e===T(t)||e===D(T(t))))return n}let a=lr(i[e]||n[e],t)||lr(i.appContext[e],t);return!a&&r?n:a}}function lr(e,t){return e&&(e[t]||e[T(t)]||e[D(T(t))])}function ur(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Ft(e),r=!1,s=!1;n&&(r=!I(e),s=It(e),e=Qe(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?zt(R(e[n])):R(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}var dr=e=>e?ea(e)?ua(e):dr(e.parent):null,fr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>dr(e.parent),$root:e=>dr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>xr(e),$forceUpdate:e=>e.f||=()=>{dn(e.update)},$nextTick:e=>e.n||=H.bind(e.proxy),$watch:e=>kn.bind(e)}),pr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),mr={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(pr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else gr&&(s[n]=0)}let d=fr[n],f,p;if(d)return n===`$attrs`&&F(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return pr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||pr(n,c)||u(o,c)||u(i,c)||u(fr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function hr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var gr=!0;function _r(e){let t=xr(e),n=e.proxy,i=e.ctx;gr=!1,t.beforeCreate&&yr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:ee,renderTracked:te,renderTriggered:ne,errorCaptured:T,serverPrefetch:re,expose:E,inheritAttrs:D,components:O,directives:k,filters:ie}=t;if(u&&vr(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=jt(t))}if(gr=!0,o)for(let e in o){let t=o[e],a=Q({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)br(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Cn(t,e[t])})}f&&yr(f,e,`c`);function A(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(A(Yn,p),A(Xn,m),A(Zn,g),A(Qn,_),A(Un,y),A(Wn,b),A(ir,T),A(rr,te),A(nr,ne),A($n,S),A(er,w),A(tr,re),d(E))if(E.length){let t=e.exposed||={};E.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};ee&&e.render===r&&(e.render=ee),D!=null&&(e.inheritAttrs=D),O&&(e.components=O),k&&(e.directives=k),re&&In(e)}function vr(e,t,n=r){d(e)&&(e=Er(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?wn(r.from||n,r.default,!0):wn(r.from||n):wn(r),z(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function yr(e,t,n){en(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function br(e,t,n,r){let i=r.includes(`.`)?An(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&Dn(i,n)}else if(h(e))Dn(i,e.bind(n));else if(v(e))if(d(e))e.forEach(e=>br(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&Dn(i,r,e)}}function xr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>Sr(c,e,o,!0)),Sr(c,t,o)),v(t)&&a.set(t,c),c}function Sr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&Sr(e,a,n,!0),i&&i.forEach(t=>Sr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Cr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Cr={data:wr,props:Or,emits:Or,methods:Dr,computed:Dr,beforeCreate:W,created:W,beforeMount:W,mounted:W,beforeUpdate:W,updated:W,beforeDestroy:W,beforeUnmount:W,destroyed:W,unmounted:W,activated:W,deactivated:W,errorCaptured:W,serverPrefetch:W,components:Dr,directives:Dr,watch:kr,provide:wr,inject:Tr};function wr(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function Tr(e,t){return Dr(Er(e),Er(t))}function Er(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function W(e,t){return e?[...new Set([].concat(e,t))]:t}function Dr(e,t){return e?s(Object.create(null),e,t):t}function Or(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),hr(e),hr(t??{})):t}function kr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=W(e[r],t[r]);return n}function Ar(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var jr=0;function Mr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Ar(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:jr++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:pa,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||Fi(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,ua(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(en(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Nr;Nr=l;try{return e()}finally{Nr=t}}};return l}}var Nr=null,Pr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${T(t)}Modifiers`]||e[`${E(t)}Modifiers`];function Fr(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&Pr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=r.map(ae)));let c,l=i[c=O(n)]||i[c=O(T(n))];!l&&o&&(l=i[c=O(E(n))]),l&&en(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,en(u,e,6,a)}}var Ir=new WeakMap;function Lr(e,t,n=!1){let r=n?Ir:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Lr(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Rr(e,t){return!e||!a(t)?!1:(t=t.slice(2).replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,E(t))||u(e,t))}function zr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=yn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Vi(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Vi(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Br(c)}}catch(t){Ti.length=0,tn(t,e,1),v=Fi(Ci)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Vr(y,a)),b=Ri(b,y,!1,!0))}return n.dirs&&(b=Ri(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Pn(b,n.transition),v=b,yn(_),v}var Br=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Vr=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Hr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Ur(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Wr(o,r,n)&&!Rr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Ur(r,o,l):!0:!!o;return!1}function Ur(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Wr(t,e,a)&&!Rr(n,a))return!0}return!1}function Wr(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!_e(r,i):r!==i}function Gr({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Kr={},qr=()=>Object.create(Kr),Jr=e=>Object.getPrototypeOf(e)===Kr;function Yr(e,t,n,r=!1){let i={},a=qr();e.propsDefaults=Object.create(null),Zr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:Mt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function Xr(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=L(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Rr(e.emitsOptions,o))continue;let d=t[o];if(c)if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=T(o);i[t]=Qr(c,s,t,d,e,!1)}else d!==a[o]&&(a[o]=d,l=!0)}}}else{Zr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=E(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Qr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Xe(e.attrs,`set`,``)}function Zr(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(ee(t))continue;let l=n[t],d;a&&u(a,d=T(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Rr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=L(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=Qr(a,n,s,i[s],e,!u(i,s))}}return s}function Qr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Qi(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===E(n))&&(r=!0))}return r}var $r=new WeakMap;function ei(e,r,i=!1){let a=i?$r:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=ei(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=T(c[e]);ti(n)&&(l[n]=t)}else if(c)for(let e in c){let t=T(e);if(ti(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}else n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function ti(e){return e[0]!==`$`&&!ee(e)}var ni=e=>e===`_`||e===`_ctx`||e===`$stable`,ri=e=>d(e)?e.map(Vi):[Vi(e)],ii=(e,t,n)=>{if(t._n)return t;let r=bn((...e)=>ri(t(...e)),n);return r._c=!1,r},ai=(e,t,n)=>{let r=e._ctx;for(let n in e){if(ni(n))continue;let i=e[n];if(h(i))t[n]=ii(n,i,r);else if(i!=null){let e=ri(i);t[n]=()=>e}}},oi=(e,t)=>{let n=ri(t);e.slots.default=()=>n},si=(e,t,n)=>{for(let r in t)(n||!ni(r))&&(e[r]=t[r])},ci=(e,t,n)=>{let r=e.slots=qr();if(e.vnode.shapeFlag&32){let e=t._;e?(si(r,t,n),n&&A(r,`_`,e,!0)):ai(t,r)}else t&&oi(e,t)},li=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:si(a,n,r):(o=!n.$stable,ai(n,a)),s=n}else n&&(oi(e,n),s={default:1});if(o)for(let e in a)!ni(e)&&s[e]==null&&delete a[e]},G=xi;function ui(e){return di(e)}function di(e,i){let a=se();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Mi(e,t)&&(r=_e(e),j(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Si:y(e,t,n,r);break;case Ci:b(e,t,n,r);break;case wi:e??x(t,n,r,o);break;case K:O(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?k(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,ye)}u!=null&&i?zn(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&zn(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)te(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),re(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},te=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&T(e.children,d,null,r,i,fi(e,a),s,u),_&&Sn(e,null,r,`created`),ne(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!ee(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Gi(f,r,e)}_&&Sn(e,null,r,`beforeMount`);let v=mi(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&G(()=>{try{f&&Gi(f,r,e),v&&g.enter(d),_&&Sn(e,null,r,`mounted`)}finally{}},i)},ne=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||bi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;ne(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},T=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?Hi(e[l]):Vi(e[l]),t,n,r,i,a,o,s)},re=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&pi(r,!1),(g=h.onVnodeBeforeUpdate)&&Gi(g,r,n,e),f&&Sn(n,e,r,`beforeUpdate`),r&&pi(r,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?E(e.dynamicChildren,d,l,r,i,fi(n,a),o):s||le(e,n,l,null,r,i,fi(n,a),o,!1),u>0){if(u&16)D(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else !s&&d==null&&D(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&G(()=>{g&&Gi(g,r,n,e),f&&Sn(n,e,r,`updated`)},i)},E=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===K||!Mi(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},D=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!ee(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(ee(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},O=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),T(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(E(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&hi(e,t,!0)):le(e,t,n,f,i,a,s,c,l)},k=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):A(t,n,r,i,a,o,c):ae(e,t,c)},A=(e,t,n,r,i,a,o)=>{let s=e.component=Ji(e,r,i);if(Hn(e)&&(s.ctx.renderer=ye),na(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,oe,o),!e.el){let r=s.subTree=Fi(Ci);b(null,r,t,n),e.placeholder=r.el}}else oe(s,e,t,n,i,a,o)},ae=(e,t,n)=>{let r=t.component=e.component;if(Hr(e,t,n))if(r.asyncDep&&!r.asyncResolved){ce(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},oe=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=_i(e);if(n){t&&(t.el=c.el,ce(e,t,o)),n.asyncDep.then(()=>{G(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;pi(e,!1),t?(t.el=c.el,ce(e,t,o)):t=c,n&&ie(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Gi(d,s,t,c),pi(e,!0);let f=zr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),_e(p),e,i,a),t.el=f.el,u===null&&Gr(e,f.el),r&&G(r,i),(d=t.props&&t.props.onVnodeUpdated)&&G(()=>Gi(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Vn(t);if(pi(e,!1),l&&ie(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Gi(o,d,t),pi(e,!0),s&&N){let t=()=>{e.subTree=zr(e),N(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=zr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&G(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;G(()=>Gi(o,d,e),i)}(t.shapeFlag&256||d&&Vn(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&G(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new we(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>dn(u),pi(e,!0),l()},ce=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Xr(e,t.props,r,n),li(e,t.children,n),ze(),mn(e),Be()},le=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){de(l,d,n,r,i,a,o,s,c);return}else if(f&256){ue(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&ge(l,i,a),d!==l&&p(n,d)):u&16?m&16?de(l,d,n,r,i,a,o,s,c):ge(l,i,a,!0):(u&8&&p(n,``),m&16&&T(d,n,r,i,a,o,s,c))},ue=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?Hi(t[p]):Vi(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?ge(e,a,o,!0,!1,f):T(t,r,i,a,o,s,c,l,f)},de=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?Hi(t[u]):Vi(t[u]);if(Mi(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?Hi(t[p]):Vi(t[p]);if(Mi(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?Hi(t[u]):Vi(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)j(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?Hi(t[u]):Vi(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){j(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Mi(n,t[_])){i=_;break}i===void 0?j(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?gi(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||yi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?fe(n,r,p,2):_--)}}},fe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){fe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,ye);return}if(c===K){o(a,t,n);for(let e=0;e<u.length;e++)fe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===wi){S(e,t,n);return}if(r!==2&&d&1&&l)if(r===0)l.beforeEnter(a),o(a,t,n),G(()=>l.enter(a),i);else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{a._isLeaving&&a[Nn](!0),r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}else o(a,t,n)},j=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(ze(),zn(s,null,n,e,!0),Be()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Vn(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Gi(_,t,e),u&6)he(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Sn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,ye,r):l&&!l.hasOnce&&(a!==K||d>0&&d&64)?ge(l,t,n,!1,!0):(a===K&&d&384||!i&&u&16)&&ge(c,t,n),r&&pe(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&G(()=>{_&&Gi(_,t,e),h&&Sn(e,null,t,`unmounted`),v&&(e.el=null)},n)},pe=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===K){me(n,r);return}if(t===wi){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},me=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},he=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;vi(c),vi(l),r&&ie(r),i.stop(),a&&(a.flags|=8,j(o,e,t,n)),s&&G(s,t),G(()=>{e.isUnmounted=!0},t)},ge=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)j(e[o],t,n,r,i)},_e=e=>{if(e.shapeFlag&6)return _e(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[jn];return n?h(n):t},ve=!1,M=(e,t,n)=>{let r;e==null?t._vnode&&(j(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ve||=(ve=!0,mn(r),hn(),!1)},ye={p:v,um:j,m:fe,r:pe,mt:A,mc:T,pc:le,pbc:E,n:_e,o:e},be,N;return i&&([be,N]=i(ye)),{render:M,hydrate:be,createApp:Mr(M,be)}}function fi({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function pi({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function mi(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function hi(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Hi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&hi(t,a)),a.type===Si&&(a.patchFlag===-1&&(a=i[e]=Hi(a)),a.el=t.el),a.type===Ci&&!a.el&&(a.el=t.el)}}function gi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function _i(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:_i(t)}function vi(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function yi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?yi(t.subTree):null}var bi=e=>e.__isSuspense;function xi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):pn(e)}var K=Symbol.for(`v-fgt`),Si=Symbol.for(`v-txt`),Ci=Symbol.for(`v-cmt`),wi=Symbol.for(`v-stc`),Ti=[],q=null;function J(e=!1){Ti.push(q=e?null:[])}function Ei(){Ti.pop(),q=Ti[Ti.length-1]||null}var Di=1;function Oi(e,t=!1){Di+=e,e<0&&q&&t&&(q.hasOnce=!0)}function ki(e){return e.dynamicChildren=Di>0?q||n:null,Ei(),Di>0&&q&&q.push(e),e}function Y(e,t,n,r,i,a){return ki(X(e,t,n,r,i,a,!0))}function Ai(e,t,n,r,i){return ki(Fi(e,t,n,r,i,!0))}function ji(e){return e?e.__v_isVNode===!0:!1}function Mi(e,t){return e.type===t.type&&e.key===t.key}var Ni=({key:e})=>e??null,Pi=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||z(e)||h(e)?{i:U,r:e,k:t,f:!!n}:e);function X(e,t=null,n=null,r=0,i=null,a=e===K?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ni(t),ref:t&&Pi(t),scopeId:vn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:U};return s?(Ui(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Di>0&&!o&&q&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&q.push(c),c}var Fi=Ii;function Ii(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===sr)&&(e=Ci),ji(e)){let r=Ri(e,t,!0);return n&&Ui(r,n),Di>0&&!a&&q&&(r.shapeFlag&6?q[q.indexOf(e)]=r:q.push(r)),r.patchFlag=-2,r}if(fa(e)&&(e=e.__vccOpts),t){t=Li(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=j(e)),v(n)&&(Lt(n)&&!d(n)&&(n=s({},n)),t.style=ce(n))}let o=g(e)?1:bi(e)?128:Mn(e)?64:v(e)?4:h(e)?2:0;return X(e,t,n,r,i,o,a,!0)}function Li(e){return e?Lt(e)||Jr(e)?s({},e):e:null}function Ri(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Wi(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Ni(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Pi(t)):[a,Pi(t)]:Pi(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==K?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ri(e.ssContent),ssFallback:e.ssFallback&&Ri(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Pn(u,c.clone(u)),u}function zi(e=` `,t=0){return Fi(Si,null,e,t)}function Bi(e=``,t=!1){return t?(J(),Ai(Ci,null,e)):Fi(Ci,null,e)}function Vi(e){return e==null||typeof e==`boolean`?Fi(Ci):d(e)?Fi(K,null,e.slice()):ji(e)?Hi(e):Fi(Si,null,String(e))}function Hi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Ri(e)}function Ui(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Ui(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!Jr(t)?t._ctx=U:r===3&&U&&(U.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else h(t)?(t={default:t,_ctx:U},n=32):(t=String(t),r&64?(n=16,t=[zi(t)]):n=8);e.children=t,e.shapeFlag|=n}function Wi(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=j([t.class,r.class]));else if(e===`style`)t.style=ce([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Gi(e,t,n,r=null){en(e,t,7,[n,r])}var Ki=Ar(),qi=0;function Ji(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||Ki,o={uid:qi++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new xe(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ei(i,a),emitsOptions:Lr(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=Fr.bind(null,o),e.ce&&e.ce(o),o}var Z=null,Yi=()=>Z||U,Xi,Zi;{let e=se(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};Xi=t(`__VUE_INSTANCE_SETTERS__`,e=>Z=e),Zi=t(`__VUE_SSR_SETTERS__`,e=>ta=e)}var Qi=e=>{let t=Z;return Xi(e),e.scope.on(),()=>{e.scope.off(),Xi(t)}},$i=()=>{Z&&Z.scope.off(),Xi(null)};function ea(e){return e.vnode.shapeFlag&4}var ta=!1;function na(e,t=!1,n=!1){t&&Zi(t);let{props:r,children:i}=e.vnode,a=ea(e);Yr(e,r,a,t),ci(e,i,n||t);let o=a?ra(e,t):void 0;return t&&Zi(!1),o}function ra(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,mr);let{setup:r}=n;if(r){ze();let n=e.setupContext=r.length>1?la(e):null,i=Qi(e),a=$t(r,e,0,[e.props,n]),o=y(a);if(Be(),i(),(o||e.sp)&&!Vn(e)&&In(e),o){if(a.then($i,$i),t)return a.then(n=>{ia(e,n,t)}).catch(t=>{tn(t,e,0)});e.asyncDep=a}else ia(e,a,t)}else sa(e,t)}function ia(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Wt(t)),sa(e,n)}var aa,oa;function sa(e,t,n){let i=e.type;if(!e.render){if(!t&&aa&&!i.render){let t=i.template||xr(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:o}=i;i.render=aa(t,s(s({isCustomElement:n,delimiters:a},r),o))}}e.render=i.render||r,oa&&oa(e)}{let t=Qi(e);ze();try{_r(e)}finally{Be(),t()}}}var ca={get(e,t){return F(e,`get`,``),e[t]}};function la(e){return{attrs:new Proxy(e.attrs,ca),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function ua(e){return e.exposed?e.exposeProxy||=new Proxy(Wt(Rt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in fr)return fr[n](e)},has(e,t){return t in e||t in fr}}):e.proxy}function da(e,t=!0){return h(e)?e.displayName||e.name:e.name||t&&e.__name}function fa(e){return h(e)&&`__vccOpts`in e}var Q=(e,t)=>Kt(e,t,ta),pa=`3.5.31`,ma=void 0,ha=typeof window<`u`&&window.trustedTypes;if(ha)try{ma=ha.createPolicy(`vue`,{createHTML:e=>e})}catch{}var ga=ma?e=>ma.createHTML(e):e=>e,_a=`http://www.w3.org/2000/svg`,va=`http://www.w3.org/1998/Math/MathML`,ya=typeof document<`u`?document:null,ba=ya&&ya.createElement(`template`),xa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?ya.createElementNS(_a,e):t===`mathml`?ya.createElementNS(va,e):n?ya.createElement(e,{is:n}):ya.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>ya.createTextNode(e),createComment:e=>ya.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ya.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{ba.innerHTML=ga(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=ba.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Sa=Symbol(`_vtc`);function Ca(e,t,n){let r=e[Sa];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var wa=Symbol(`_vod`),Ta=Symbol(`_vsh`),Ea={name:`show`,beforeMount(e,{value:t},{transition:n}){e[wa]=e.style.display===`none`?``:e.style.display,n&&t?n.beforeEnter(e):Da(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),Da(e,!0),r.enter(e)):r.leave(e,()=>{Da(e,!1)}):Da(e,t))},beforeUnmount(e,{value:t}){Da(e,t)}};function Da(e,t){e.style.display=t?e[wa]:`none`,e[Ta]=!t}var Oa=Symbol(``),ka=/(?:^|;)\s*display\s*:/;function Aa(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t)if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??Ma(r,t,``)}else for(let e in t)n[e]??Ma(r,e,``);for(let e in n)e===`display`&&(a=!0),Ma(r,e,n[e])}else if(i){if(t!==n){let e=r[Oa];e&&(n+=`;`+e),r.cssText=n,a=ka.test(n)}}else t&&e.removeAttribute(`style`);wa in e&&(e[wa]=a?r.display:``,e[Ta]&&(r.display=`none`))}var ja=/\s*!important$/;function Ma(e,t,n){if(d(n))n.forEach(n=>Ma(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=Fa(e,t);ja.test(n)?e.setProperty(E(r),n.replace(ja,``),`important`):e[r]=n}}var Na=[`Webkit`,`Moz`,`ms`],Pa={};function Fa(e,t){let n=Pa[t];if(n)return n;let r=T(t);if(r!==`filter`&&r in e)return Pa[t]=r;r=D(r);for(let n=0;n<Na.length;n++){let i=Na[n]+r;if(i in e)return Pa[t]=i}return t}var Ia=`http://www.w3.org/1999/xlink`;function La(e,t,n,r,i,a=me(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Ia,t.slice(6,t.length)):e.setAttributeNS(Ia,t,n):n==null||a&&!he(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function Ra(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?ga(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=he(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function za(e,t,n,r){e.addEventListener(t,n,r)}function Ba(e,t,n,r){e.removeEventListener(t,n,r)}var Va=Symbol(`_vei`);function Ha(e,t,n,r,i=null){let a=e[Va]||(e[Va]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Wa(t);r?za(e,n,a[t]=Ja(r,i),s):o&&(Ba(e,n,o,s),a[t]=void 0)}}var Ua=/(?:Once|Passive|Capture)$/;function Wa(e){let t;if(Ua.test(e)){t={};let n;for(;n=e.match(Ua);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):E(e.slice(2)),t]}var Ga=0,Ka=Promise.resolve(),qa=()=>Ga||=(Ka.then(()=>Ga=0),Date.now());function Ja(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;en(Ya(e,n.value),t,5,[e])};return n.value=e,n.attached=qa(),n}function Ya(e,t){if(d(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}var Xa=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Za=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?Ca(e,r,c):t===`style`?Aa(e,n,r):a(t)?o(t)||Ha(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):Qa(e,t,r,c))?(Ra(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&La(e,t,r,c,s,t!==`value`)):e._isVueCE&&($a(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?Ra(e,T(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),La(e,t,r,c))};function Qa(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Xa(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Xa(t)&&g(n)?!1:t in e}function $a(e,t){let n=e._def.props;if(!n)return!1;let r=T(t);return Array.isArray(n)?n.some(e=>T(e)===r):Object.keys(n).some(e=>T(e)===r)}var eo=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>ie(t,e):t};function to(e){e.target.composing=!0}function no(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var ro=Symbol(`_assign`);function io(e,t,n){return t&&(e=e.trim()),n&&(e=ae(e)),e}var ao={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[ro]=eo(i);let a=r||i.props&&i.props.type===`number`;za(e,t?`change`:`input`,t=>{t.target.composing||e[ro](io(e.value,n,a))}),(n||a)&&za(e,`change`,()=>{e.value=io(e.value,n,a)}),t||(za(e,`compositionstart`,to),za(e,`compositionend`,no),za(e,`change`,no))},mounted(e,{value:t}){e.value=t??``},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[ro]=eo(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?ae(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},oo=[`ctrl`,`shift`,`alt`,`meta`],so={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>oo.some(n=>e[`${n}Key`]&&!t.includes(n))},co=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=so[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},lo=s({patchProp:Za},xa),uo;function fo(){return uo||=ui(lo)}var po=((...e)=>{let t=fo().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=ho(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,mo(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function mo(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function ho(e){return g(e)?document.querySelector(e):e}var go={class:`browser-shell`},_o={class:`browser-frame`},vo={key:0,class:`live-menu-overlay`,"aria-label":`直播频道菜单`,role:`dialog`,"aria-modal":`true`},yo={class:`live-menu-panel`,role:`region`,"aria-label":`频道列表`},bo={class:`live-menu-heading`,"aria-live":`polite`},xo={class:`live-menu-columns`,role:`group`},So={class:`live-menu-column live-menu-column-left`,role:`tablist`,"aria-label":`频道分组`},Co=[`aria-label`,`aria-current`,`tabindex`],wo={class:`live-menu-column live-menu-column-right`,role:`grid`,"aria-label":`频道项目`},To=[`aria-label`,`aria-current`,`tabindex`,`onClick`],Eo=Fn({__name:`HomeBrowser`,props:{activeUrl:{},setBackButtonRef:{type:Function},setWebviewRef:{type:Function},showLiveMenu:{type:Boolean},liveMenuGroups:{},activeLiveGroupIndex:{},activeLiveColumn:{},activeLiveItemIndex:{},liveMenuHeading:{},isMouseVisible:{type:Boolean}},emits:[`browser-ready`,`go-home`,`select-live-channel`],setup(e){return(t,n)=>{let r=or(`webview`);return J(),Y(`section`,go,[X(`div`,_o,[Fi(r,{ref:e.setWebviewRef,class:`browser-view`,src:e.activeUrl,allowpopups:`false`,onDomReady:n[0]||=e=>t.$emit(`browser-ready`)},null,8,[`src`]),e.showLiveMenu?(J(),Y(`div`,vo,[X(`div`,yo,[X(`div`,bo,M(e.liveMenuHeading),1),X(`div`,xo,[X(`div`,So,[(J(!0),Y(K,null,ur(e.liveMenuGroups,(t,n)=>(J(),Y(`button`,{key:t.label,type:`button`,class:j([`live-menu-item live-menu-group-item`,{"is-selected":n===e.activeLiveGroupIndex,"is-active":e.activeLiveColumn===`group`&&n===e.activeLiveGroupIndex}]),"aria-label":`选择${t.label}`,"aria-current":n===e.activeLiveGroupIndex?`true`:void 0,role:`tab`,tabindex:e.activeLiveColumn===`group`&&n===e.activeLiveGroupIndex?0:-1},M(t.label),11,Co))),128))]),X(`div`,wo,[(J(!0),Y(K,null,ur(e.liveMenuGroups[e.activeLiveGroupIndex]?.items??[],(n,r)=>(J(),Y(`button`,{key:`${e.liveMenuGroups[e.activeLiveGroupIndex]?.label}-${n}-${r}`,type:`button`,class:j([`live-menu-item live-menu-channel-item`,{"is-selected":r===e.activeLiveItemIndex,"is-active":e.activeLiveColumn===`item`&&r===e.activeLiveItemIndex}]),"aria-label":`选择${n}频道`,"aria-current":r===e.activeLiveItemIndex?`true`:void 0,tabindex:e.activeLiveColumn===`item`&&r===e.activeLiveItemIndex?0:-1,onClick:e=>t.$emit(`select-live-channel`,n)},M(n),11,To))),128))])])])])):Bi(``,!0),xn(X(`button`,{ref:e.setBackButtonRef,type:`button`,class:`back-home-button`,"aria-label":`返回主页`,onClick:n[1]||=e=>t.$emit(`go-home`)},` 返回主页 `,512),[[Ea,e.isMouseVisible]])])])}}}),Do=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},Oo=Do(Eo,[[`__scopeId`,`data-v-2eeff8cb`]]),ko={class:`top-bar`},Ao={class:`toolbar-content`},jo=[`tabindex`],Mo=[`tabindex`],No={class:`hero-panel`},Po={class:`time-block`},Fo={class:`time-value`},Io={class:`time-date`},Lo={class:`card-grid`,"aria-label":`快捷入口`,role:`list`},Ro=[`tabindex`,`aria-label`,`aria-current`,`onClick`,`onFocus`],zo={class:`card-art`},Bo={class:`card-icon`},Vo=[`src`,`alt`,`onError`],Ho={key:1,class:`icon-fallback`},Uo={class:`card-label`},Wo=Do(Fn({__name:`HomeLanding`,props:{currentTime:{},currentDate:{},shortcuts:{},selectedIndex:{},setCardRef:{type:Function}},emits:[`open-settings`,`close-window`,`open-site`,`focus-card`,`toolbar-focus-change`],setup(e,{expose:t,emit:n}){let r=window.require,i=null;if(r)try{i=r(`electron`)?.ipcRenderer??null,i&&i.invoke(`settings:get`).then(e=>{}).catch(e=>{console.error(`[HomeLanding] IPC 测试失败:`,e)})}catch(e){console.error(`[HomeLanding] 加载 electron 模块失败:`,e)}else console.warn(`[HomeLanding] require 函数不存在`);let a=e,o=n,s=B(new Map),c=B(null),l=B([]),u=B(!1),d=B(0),f=B(!1);function p(e,t){e&&(l.value[t]=e)}function m(e){return!!(e.icon||e.type===`website`&&e.url)}async function h(e){let t=e.icon||e.url||``;if(!t)return null;if(s.value.has(t))return s.value.get(t)||null;let n=``;if(e.icon)n=e.icon;else if(e.type===`website`&&e.url)try{n=`https://favicon.im/${new URL(e.url).hostname}`}catch(t){return console.error(`解析 URL 失败：${e.url}`,t),null}if(!n)return null;if(n.startsWith(`file://`))return s.value.set(t,n),n;try{if(!i)return s.value.set(t,n),n;let e=await i.invoke(`icon:get-cached`,n);if(e)return s.value.set(t,e),e;let r=await i.invoke(`icon:cache`,n);if(r)return s.value.set(t,r),r;console.warn(`[图标缓存] 后端返回空结果，可能下载失败`)}catch(t){console.error(`获取图标失败: ${e.name}`,t),console.error(`[图标缓存] 错误详情:`,t instanceof Error?t.message:t)}return s.value.set(t,n),n}function g(e){let t=e.icon||e.url||``;if(s.value.has(t))return s.value.get(t)||``;if(e.icon)return e.icon;if(e.type===`website`&&e.url)try{return`https://favicon.im/${new URL(e.url).hostname}`}catch{return``}return``}function _(e,t){let n=e.target;console.log(`图标加载失败：${t.name}, URL: ${n.src}`),n.style.display=`none`;let r=n.parentElement;if(r){let e=r.querySelector(`.icon-fallback`);e&&(e.style.display=`flex`)}}Xn(async()=>{let e=a.shortcuts.map(async e=>{if(e.type===`website`&&e.url)try{await h(e),s.value=new Map(s.value)}catch(t){console.error(`预加载图标失败: ${e.name}`,t)}});Promise.allSettled(e).catch(e=>{console.error(`批量加载图标失败:`,e)})});function v(e){return e.icon,e.name.charAt(0).toUpperCase()}function y(){if(u.value=!0,o(`toolbar-focus-change`,!0),f.value){f.value=!1;return}d.value=0,H(()=>{x(0)})}function b(e){let t=e.relatedTarget,n=c.value;t&&n&&n.contains(t)||(u.value=!1,o(`toolbar-focus-change`,!1))}function x(e){let t=l.value;if(t.length===0)return;let n=Math.max(0,Math.min(e,t.length-1));d.value=n;let r=t[n];r?H(()=>{r.focus()}):console.error(`[Toolbar] 按钮不存在`)}function S(e){let t=l.value;t.length!==0&&(f.value=!0,e===`left`?d.value=d.value===0?t.length-1:d.value-1:d.value=d.value===t.length-1?0:d.value+1,x(d.value))}t({focusToolbar:C,focusFirstToolbarButton:w,moveToolbarFocus:S,toolbarButtonRefs:l,currentToolbarIndex:d});function C(){u.value=!0,d.value=0,H(()=>{x(0)})}function w(){d.value=0,x(0)}return(t,n)=>(J(),Y(K,null,[n[6]||=X(`div`,{class:`background-image`},null,-1),n[7]||=X(`div`,{class:`background-overlay`},null,-1),X(`header`,ko,[X(`div`,{ref_key:`toolbarRef`,ref:c,class:j([`toolbar-container`,{"is-focused":u.value}]),tabindex:`-1`,onFocusCapture:y,onBlurCapture:b},[X(`div`,Ao,[X(`button`,{ref:e=>p(e,0),type:`button`,class:`toolbar-button`,"aria-label":`打开设置`,tabindex:u.value&&d.value===0?0:-1,onClick:n[0]||=e=>t.$emit(`open-settings`)},[...n[2]||=[X(`svg`,{class:`button-icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},[X(`circle`,{cx:`12`,cy:`12`,r:`3`}),X(`path`,{d:`M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z`})],-1)]],8,jo),X(`button`,{ref:e=>p(e,1),type:`button`,class:`toolbar-button`,"aria-label":`退出应用`,tabindex:u.value&&d.value===1?0:-1,onClick:n[1]||=e=>t.$emit(`close-window`)},[...n[3]||=[X(`svg`,{class:`button-icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},[X(`path`,{d:`M18 6L6 18M6 6l12 12`})],-1)]],8,Mo)])],34)]),X(`section`,No,[n[4]||=X(`span`,{class:`hero-line hero-line-top`},null,-1),X(`div`,Po,[X(`div`,Fo,M(e.currentTime),1),X(`div`,Io,M(e.currentDate),1)]),n[5]||=X(`span`,{class:`hero-line hero-line-bottom`},null,-1)]),X(`section`,Lo,[(J(!0),Y(K,null,ur(e.shortcuts,(n,r)=>(J(),Y(`button`,{key:n.name,type:`button`,class:j([`site-card`,[n.theme,{"is-selected":e.selectedIndex===r&&!u.value}]]),tabindex:e.selectedIndex===r&&!u.value?0:-1,ref_for:!0,ref:t=>e.setCardRef(t,r),"aria-label":`打开${n.name}`,"aria-current":e.selectedIndex===r&&!u.value?`true`:void 0,role:`listitem`,onClick:e=>t.$emit(`open-site`,n),onFocus:e=>t.$emit(`focus-card`,r)},[X(`div`,zo,[X(`div`,Bo,[m(n)?(J(),Y(`img`,{key:0,src:g(n),alt:n.name,class:`icon-image`,onError:e=>_(e,n)},null,40,Vo)):(J(),Y(`span`,Ho,M(v(n)),1))])]),X(`div`,Uo,M(n.name),1)],42,Ro))),128))])],64))}}),[[`__scopeId`,`data-v-42d0d3f2`]]);function Go(){let e=B(0),t=B(-1),n=B(0),r=B(0),i=B(-1),a=B(-1),o=B([]),s=B([]);function c(n,r){let a=r.length;e.value=(n+a)%a,t.value=-1,i.value=-1,H(()=>{o.value[e.value]?.focus()})}function l(n){t.value=n,e.value=-1}function u(e,n){let a=n.length;r.value=(e+a)%a,t.value=-1,i.value=-1,H(()=>{let e=s.value[r.value];e&&(e.focus(),e.scrollIntoView({behavior:`smooth`,block:`nearest`}))})}function d(){e.value=0,t.value=-1,n.value=0,r.value=0,i.value=-1,a.value=-1}return{focusedSidebarIndex:e,focusedContentIndex:t,modeFocusedIndex:n,focusedSiteIndex:r,focusedButtonIndex:i,focusedInputIndex:a,sidebarItemRefs:o,siteItemRefs:s,focusSidebar:c,focusContent:l,focusSite:u,resetFocus:d}}var Ko={class:`settings-sidebar`,"aria-label":`设置分类`,role:`tablist`},qo=[`tabindex`,`onClick`,`aria-selected`,`aria-label`],Jo=Do(Fn({__name:`SettingsSidebar`,props:{activeMenu:{},focusedIndex:{}},emits:[`select-menu`,`set-ref`],setup(e,{emit:t}){let n=t,r=[{key:`general`,label:`常规`},{key:`site-management`,label:`网址管理`},{key:`add-site`,label:`添加新网址`},{key:`add-local-app`,label:`添加本地应用`},{key:`wallpaper`,label:`壁纸设置`}];function i(e,t){n(`set-ref`,e,t)}return(t,n)=>(J(),Y(`aside`,Ko,[(J(),Y(K,null,ur(r,(n,r)=>X(`button`,{key:n.key,type:`button`,class:j([`sidebar-item`,{"is-active":e.activeMenu===n.key,"is-focused":e.focusedIndex===r}]),tabindex:e.focusedIndex===r?0:-1,ref_for:!0,ref:e=>i(e,r),onClick:e=>t.$emit(`select-menu`,n.key),role:`tab`,"aria-selected":e.activeMenu===n.key,"aria-label":`打开${n.label}设置`},M(n.label),11,qo)),64))]))}}),[[`__scopeId`,`data-v-00c61314`]]),Yo=[{name:`TV 直播`,badge:`LIVE`,url:`https://www.yangshipin.cn/tv/home`,theme:`theme-live`,type:`website`},{name:`央视片库`,badge:`CCTV`,url:`https://tv.cctv.com/`,theme:`theme-cctv`,type:`website`},{name:`抖音`,badge:`DY`,url:`https://www.douyin.com/`,theme:`theme-douyin`,type:`website`},{name:`腾讯视频`,badge:`QQ`,url:`https://v.qq.com/`,theme:`theme-tencent`,type:`website`}],Xo={launchModuleId:``,openModuleOnLaunch:!1,startAtLogin:!1,homeMode:`tv`,enabledShortcuts:Yo.map(e=>e.url),customShortcuts:[]},Zo=[{id:``,name:`无`},...Yo.map(e=>({id:e.url,name:e.name}))],Qo={class:`setting-row`},$o=[`value`],es=[`value`],ts={class:`setting-row`},ns=[`aria-pressed`],rs={class:`setting-row`},is={class:`mode-toggle`,role:`tablist`,"aria-label":`主页模式`},as=Do(Fn({__name:`GeneralSettings`,props:{settings:{},isSecondaryFocused:{type:Boolean}},emits:[`update-setting`],setup(e,{emit:t}){let n=e,r=t;function i(e){let t=e.target.value;r(`update-setting`,{launchModuleId:t,openModuleOnLaunch:t!==``})}return(t,r)=>(J(),Y(`section`,{class:j([`settings-card`,{"is-secondary-focused":n.isSecondaryFocused}]),role:`tabpanel`,id:`panel-general`},[X(`div`,Qo,[r[3]||=X(`div`,{class:`setting-copy`},[X(`div`,{class:`setting-label`,id:`launch-module-label`},`打开应用后直接启动`),X(`div`,{class:`setting-desc`},`选择后可在启动应用时直接进入对应模块。`)],-1),X(`select`,{class:`setting-select`,value:e.settings.launchModuleId,onChange:i,"aria-labelledby":`launch-module-label`},[(J(!0),Y(K,null,ur(Ht(Zo),e=>(J(),Y(`option`,{key:e.id||`none`,value:e.id},M(e.name),9,es))),128))],40,$o)]),X(`div`,ts,[r[5]||=X(`div`,{class:`setting-copy`},[X(`div`,{class:`setting-label`,id:`start-at-login-label`},`应用开机自启动`),X(`div`,{class:`setting-desc`},`开启后会在系统登录时自动启动应用。`)],-1),X(`button`,{type:`button`,class:j([`switch-button`,{"is-on":e.settings.startAtLogin}]),"aria-pressed":e.settings.startAtLogin,onClick:r[0]||=n=>t.$emit(`update-setting`,{startAtLogin:!e.settings.startAtLogin}),"aria-labelledby":`start-at-login-label`},[...r[4]||=[X(`span`,{class:`switch-knob`},null,-1)]],10,ns)]),X(`div`,rs,[r[6]||=X(`div`,{class:`setting-copy`},[X(`div`,{class:`setting-label`},`主页模式`),X(`div`,{class:`setting-desc`},`当前可切换电视模式和游戏模式，游戏模式页面后续补充。`)],-1),X(`div`,is,[X(`button`,{type:`button`,class:j([`mode-option`,{"is-active":e.settings.homeMode===`game`}]),onClick:r[1]||=e=>t.$emit(`update-setting`,{homeMode:`game`})},` 游戏模式 `,2),X(`button`,{type:`button`,class:j([`mode-option`,{"is-active":e.settings.homeMode===`tv`}]),onClick:r[2]||=e=>t.$emit(`update-setting`,{homeMode:`tv`})},` 电视模式 `,2)])])],2))}}),[[`__scopeId`,`data-v-19e553e6`]]),$=function(e){return e.BACK=`Escape`,e.MENU=`Alt`,e.CONFIRM=` `,e.UP=`ArrowUp`,e.DOWN=`ArrowDown`,e.LEFT=`ArrowLeft`,e.RIGHT=`ArrowRight`,e.MINUS=`-`,e.UNDERSCORE=`_`,e.EQUALS=`=`,e.PLUS=`+`,e.TAB=`Tab`,e.BACKSPACE=`Backspace`,e}({});$.BACK,$.CONFIRM,$.MENU,$.UP,$.DOWN,$.LEFT,$.RIGHT,$.MINUS,$.UNDERSCORE,$.EQUALS,$.PLUS,$.TAB,$.BACKSPACE;function os(e){return[$.MINUS,$.UNDERSCORE,$.EQUALS,$.PLUS].includes(e)}function ss(){let e=document.activeElement;if(!e)return!1;let t=e.tagName.toLowerCase();return t===`input`||t===`textarea`||e.isContentEditable}var cs={class:`site-list`},ls={class:`site-info`},us={class:`site-icon`},ds={class:`site-details`},fs={class:`site-name`},ps={class:`site-type`},ms={class:`site-status`},hs=[`onClick`],gs=[`onClick`],_s={class:`form-row`},vs={key:0,class:`form-error`,role:`alert`},ys={class:`form-row`},bs={key:0,class:`form-error`,role:`alert`},xs={class:`form-row`},Ss={key:0,class:`form-error`,role:`alert`},Cs={class:`form-actions`},ws=Do(Fn({__name:`SiteManagement`,props:{settings:{},focusedIndex:{},isSecondaryFocused:{type:Boolean}},emits:[`update-setting`,`set-ref`,`item-removed`,`open-edit-dialog`,`close-edit-dialog`,`edit-dialog-state-change`,`focus-first-button`],setup(e,{emit:t}){let n=window.require?.(`electron`)?.ipcRenderer??null,r=e,i=t,a=Q(()=>[...Yo.map(e=>({name:e.name,url:e.url,type:e.type,icon:e.icon,isEnabled:r.settings.enabledShortcuts.includes(e.url),isCustom:!1})),...r.settings.customShortcuts.map(e=>({name:e.name,url:e.url,type:e.type,icon:e.icon,isEnabled:r.settings.enabledShortcuts.includes(e.url),isCustom:!0}))]);function o(e){return e===`application`?`本地应用`:`网站`}function s(e){return e.type===`application`?`💻`:{"TV 直播":`📺`,央视片库:`🎬`,抖音:`🎵`,腾讯视频:`🎞️`}[e.name]||`🌐`}async function c(e){let t=r.settings.enabledShortcuts,o=r.settings.customShortcuts,s=a.value.findIndex(t=>t.url===e.url);if(e.isEnabled)if(e.isCustom){console.log(`[SiteManagement] 执行移除操作，site.url: ${e.url}，site.isCustom: ${e.isCustom}`);let r=t.filter(t=>t!==e.url),a=o.filter(t=>t.url!==e.url);if(console.log(e),console.log(e.icon),console.log(e.icon?`[SiteManagement] 图标存在，正在删除图标缓存: ${e.name}`:`[SiteManagement] 图标不存在`),e.icon)try{if(console.log(`[SiteManagement] 正在删除图标缓存: ${e.name}`),console.log(`[SiteManagement] 图标路径: ${e.icon}`),e.icon.startsWith(`file://`)){let t=e.icon.replace(`file://`,``);console.log(`文件路径: ${t}`),await n?.invoke(`icon:delete-by-path`,t)}else (e.icon.startsWith(`http://`)||e.icon.startsWith(`https://`))&&await n?.invoke(`icon:delete`,e.icon);console.log(`图标缓存已删除: ${e.name}`)}catch(e){console.error(`删除图标缓存失败:`,e)}i(`update-setting`,{enabledShortcuts:r,customShortcuts:a}),H(()=>{i(`item-removed`,s)})}else i(`update-setting`,{enabledShortcuts:t.filter(t=>t!==e.url)});else i(`update-setting`,{enabledShortcuts:[...t,e.url]})}function l(e,t){i(`set-ref`,e,t),e&&(v.value[t]=e)}let u=B(!1),d=B(-1),f=B(``),p=B(null),m=B(null),h=B(null),g=B(null),_=B(null),v=B([]),y=B({name:``,url:``,icon:``}),b=B({name:``,url:``,icon:``});function x(e,t){let n=t-Yo.length;if(!e.isCustom||n<0||n>=r.settings.customShortcuts.length){console.error(`Invalid edit attempt for non-custom shortcut`);return}d.value=n,f.value=e.url,y.value={name:e.name,url:e.url,icon:``},b.value={name:``,url:``,icon:``},u.value=!0,i(`edit-dialog-state-change`,!0),H(()=>{p.value?.focus(),i(`open-edit-dialog`)})}function S(){u.value=!1,d.value=-1,f.value=``,y.value={name:``,url:``,icon:``},b.value={name:``,url:``,icon:``},i(`close-edit-dialog`),i(`edit-dialog-state-change`,!1),H(()=>{i(`focus-first-button`)})}function C(){let e=y.value.name.trim(),t=y.value.url.trim();if(!e)return b.value.name=`请输入网站名称`,!1;if(e.length>20)return b.value.name=`网站名称不能超过 20 个字符`,!1;if(!t)return b.value.url=`请输入网址`,!1;try{new URL(t)}catch{return b.value.url=`请输入有效的网址（以 http:// 或 https:// 开头）`,!1}return b.value.name=``,b.value.url=``,!0}async function w(){if(!C())return;let e=d.value;if(e<0||e>=r.settings.customShortcuts.length)return;let t=f.value,a=y.value.url.trim(),o=r.settings.enabledShortcuts.includes(t),s=y.value.icon.trim()||void 0;if(!s&&a)try{s=`https://favicon.im/${new URL(a).hostname}`,console.log(`自动生成 favicon URL: ${s}`)}catch(e){console.error(`解析 URL 失败:`,e)}if(s&&(s.startsWith(`http://`)||s.startsWith(`https://`)))try{console.log(`正在缓存图标: ${y.value.name}`);let e=await n?.invoke(`icon:cache`,s);e?(console.log(`图标已缓存: ${y.value.name}`),s=e):console.warn(`图标缓存失败，将使用原始 URL`)}catch(e){console.error(`缓存图标失败:`,e)}let c={...r.settings.customShortcuts[e],name:y.value.name.trim(),url:a,icon:s},l=[...r.settings.customShortcuts];l[e]=c;let u=r.settings.enabledShortcuts;o&&(u=[...u.filter(e=>e!==t),a]),i(`update-setting`,{customShortcuts:l,enabledShortcuts:u}),S()}function ee(e){if(!u.value)return;let{key:t}=e,n=document.activeElement;if(n?.tagName,t===$.BACK){e.preventDefault(),S();return}if(t===$.TAB){e.preventDefault();return}if(t===$.CONFIRM){if(e.preventDefault(),n?.classList.contains(`confirm-btn`))document.querySelector(`.dialog-content .confirm-btn`)?.click();else if(n?.classList.contains(`cancel-btn`))document.querySelector(`.dialog-content .cancel-btn`)?.click();else{let e=[document.querySelector(`#edit-name-input`),document.querySelector(`#edit-url-input`),document.querySelector(`#edit-icon-input`),document.querySelector(`.dialog-content .confirm-btn`),document.querySelector(`.dialog-content .cancel-btn`)];e[(e.findIndex(e=>e===n)+1)%e.length]?.focus()}return}if(t===$.UP||t===$.DOWN){e.preventDefault();let n=[document.querySelector(`#edit-name-input`),document.querySelector(`#edit-url-input`),document.querySelector(`#edit-icon-input`),document.querySelector(`.dialog-content .confirm-btn`),document.querySelector(`.dialog-content .cancel-btn`)],r=document.activeElement;n[((n.findIndex(e=>e===r)+(t===$.UP?-1:1))%n.length+n.length)%n.length]?.focus();return}if(t===$.LEFT||t===$.RIGHT){if(n?.classList.contains(`confirm-btn`)||n?.classList.contains(`cancel-btn`)){e.preventDefault();let n=document.querySelector(`.dialog-content .confirm-btn`),r=document.querySelector(`.dialog-content .cancel-btn`);t===$.LEFT?n?.focus():t===$.RIGHT&&r?.focus()}return}}return(t,n)=>(J(),Y(`section`,{class:j([`settings-card`,{"is-secondary-focused":r.isSecondaryFocused}]),role:`tabpanel`,id:`panel-site-management`},[X(`div`,cs,[(J(!0),Y(K,null,ur(a.value,(t,n)=>(J(),Y(`div`,{key:t.url,class:j([`site-item`,{"is-focused":e.focusedIndex===n}]),ref_for:!0,ref:e=>l(e,n),tabindex:-1},[X(`div`,ls,[X(`span`,us,M(s(t)),1),X(`div`,ds,[X(`span`,fs,M(t.name),1),X(`span`,ps,M(o(t.type)),1)])]),X(`div`,ms,[X(`span`,{class:j([`status-text`,t.isEnabled?`is-enabled`:`is-disabled`])},M(t.isEnabled?`已添加`:`未添加`),3),t.isCustom?(J(),Y(`button`,{key:0,type:`button`,class:`action-button edit`,onClick:co(e=>x(t,n),[`stop`])},` 编辑 `,8,hs)):Bi(``,!0),X(`button`,{type:`button`,class:j([`action-button`,[t.isEnabled?`remove`:`add`]]),onClick:co(e=>c(t),[`stop`])},M(t.isEnabled?`移除`:`添加`),11,gs)])],2))),128))]),u.value?(J(),Y(`div`,{key:0,class:`dialog-overlay`,onClick:S,onKeydownCapture:ee,tabindex:`-1`},[X(`div`,{class:`dialog-content`,onClick:n[3]||=co(()=>{},[`stop`]),role:`dialog`,"aria-modal":`true`,"aria-labelledby":`edit-dialog-title`,tabindex:`0`},[n[7]||=X(`h3`,{id:`edit-dialog-title`,class:`dialog-title`},`编辑网址`,-1),X(`div`,_s,[n[4]||=X(`label`,{class:`form-label`,for:`edit-name-input`},`网站名称`,-1),xn(X(`input`,{id:`edit-name-input`,ref_key:`editNameInputRef`,ref:p,type:`text`,class:j([`form-input`,{"is-error":b.value.name}]),placeholder:`例如：优酷`,"onUpdate:modelValue":n[0]||=e=>y.value.name=e},null,2),[[ao,y.value.name]]),b.value.name?(J(),Y(`div`,vs,M(b.value.name),1)):Bi(``,!0)]),X(`div`,ys,[n[5]||=X(`label`,{class:`form-label`,for:`edit-url-input`},`网址`,-1),xn(X(`input`,{id:`edit-url-input`,ref_key:`editUrlInputRef`,ref:m,type:`text`,class:j([`form-input`,{"is-error":b.value.url}]),placeholder:`https:// 开头`,"onUpdate:modelValue":n[1]||=e=>y.value.url=e},null,2),[[ao,y.value.url]]),b.value.url?(J(),Y(`div`,bs,M(b.value.url),1)):Bi(``,!0)]),X(`div`,xs,[n[6]||=X(`label`,{class:`form-label`,for:`edit-icon-input`},`图标 URL（可选）`,-1),xn(X(`input`,{id:`edit-icon-input`,ref_key:`editIconInputRef`,ref:h,type:`text`,class:j([`form-input`,{"is-error":b.value.icon}]),placeholder:`https://example.com/icon.png`,"onUpdate:modelValue":n[2]||=e=>y.value.icon=e},null,2),[[ao,y.value.icon]]),b.value.icon?(J(),Y(`div`,Ss,M(b.value.icon),1)):Bi(``,!0)]),X(`div`,Cs,[X(`button`,{type:`button`,class:`action-btn confirm-btn`,ref_key:`editConfirmBtnRef`,ref:g,onClick:w},` 确认修改 `,512),X(`button`,{type:`button`,class:`action-btn cancel-btn`,ref_key:`editCancelBtnRef`,ref:_,onClick:S},` 取消 `,512)])])],32)):Bi(``,!0)],2))}}),[[`__scopeId`,`data-v-fce699b3`]]),Ts={class:`add-site-form`},Es={class:`form-row`},Ds=[`disabled`],Os={key:0,class:`form-error`,role:`alert`},ks={class:`form-row`},As=[`disabled`],js={key:0,class:`form-error`,role:`alert`},Ms={class:`form-actions`},Ns=[`disabled`],Ps=[`disabled`],Fs=Do(Fn({__name:`AddSiteForm`,props:{settings:{},isSecondaryFocused:{type:Boolean}},emits:[`update-setting`],setup(e,{expose:t,emit:n}){let r=window.require?.(`electron`)?.ipcRenderer??null,i=e,a=n,o=B({name:``,url:``}),s=B({name:``,url:``}),c=B(``),l=B(`success`),u=B(!1),d=B(null),f=B(null),p=B(null),m=B(null);function h(){let e=o.value.name.trim();return e?e.length>20?(s.value.name=`网站名称不能超过 20 个字符`,!1):Yo.find(t=>t.name===e)?(s.value.name=`该网站名称已存在`,!1):(s.value.name=``,!0):(s.value.name=`请输入网站名称`,!1)}function g(){let e=o.value.url.trim();if(!e)return s.value.url=`请输入网址`,!1;if(!e.startsWith(`https://`))return s.value.url=`网址必须以 https:// 开头`,!1;try{new URL(e)}catch{return s.value.url=`请输入有效的网址格式`,!1}return Yo.find(t=>t.url===e)?(s.value.url=`该网址已存在`,!1):(s.value.url=``,!0)}async function _(){if(!u.value){if(c.value=``,!h()||!g()){l.value=`error`;return}u.value=!0;try{let e=o.value.url.trim(),t=``;try{t=`https://favicon.im/${new URL(e).hostname}`,console.log(`正在缓存新添加网站的图标: ${o.value.name}`);let n=await r?.invoke(`icon:cache`,t);n?(console.log(`图标已缓存: ${o.value.name}`),t=n):console.warn(`图标缓存失败，将使用网络 URL: ${o.value.name}`)}catch(e){console.error(`解析 URL 或缓存图标失败:`,e)}let n={name:o.value.name.trim(),badge:o.value.name.trim().toUpperCase().slice(0,4),url:e,theme:`theme-custom`,type:`website`,icon:t};a(`update-setting`,{customShortcuts:JSON.parse(JSON.stringify([...i.settings.customShortcuts,n])),enabledShortcuts:[...new Set([...i.settings.enabledShortcuts,n.url])]}),l.value=`success`,c.value=`已成功添加 ${n.name}`,o.value={name:``,url:``},s.value={name:``,url:``}}catch(e){console.error(`添加网址失败:`,e),l.value=`error`,c.value=`添加网址失败，请重试`}finally{u.value=!1}}}function v(){u.value||(o.value={name:``,url:``},s.value={name:``,url:``},c.value=``)}return t({siteNameInputRef:d,siteUrlInputRef:f,confirmBtnRef:p,cancelBtnRef:m,handleSubmit:_,handleCancel:v}),(e,t)=>(J(),Y(`section`,{class:j([`settings-card`,{"is-secondary-focused":i.isSecondaryFocused}]),role:`tabpanel`,id:`panel-add-site`},[X(`div`,Ts,[t[4]||=X(`div`,{class:`form-header`},[X(`h2`,{class:`form-title`},`添加新网址`),X(`span`,{class:`form-hint`},`需要用鼠标键盘`)],-1),X(`div`,Es,[t[2]||=X(`label`,{class:`form-label`,for:`site-name-input`,id:`site-name-label`},`网站名称`,-1),xn(X(`input`,{id:`site-name-input`,ref_key:`siteNameInputRef`,ref:d,type:`text`,class:j([`form-input`,{"is-error":s.value.name,"is-disabled":u.value}]),placeholder:`例如：优酷`,"onUpdate:modelValue":t[0]||=e=>o.value.name=e,disabled:u.value},null,10,Ds),[[ao,o.value.name]]),s.value.name?(J(),Y(`div`,Os,M(s.value.name),1)):Bi(``,!0)]),X(`div`,ks,[t[3]||=X(`label`,{class:`form-label`,for:`site-url-input`,id:`site-url-label`},`网址`,-1),xn(X(`input`,{id:`site-url-input`,ref_key:`siteUrlInputRef`,ref:f,type:`text`,class:j([`form-input`,{"is-error":s.value.url,"is-disabled":u.value}]),placeholder:`https:// 开头`,"onUpdate:modelValue":t[1]||=e=>o.value.url=e,disabled:u.value},null,10,As),[[ao,o.value.url]]),s.value.url?(J(),Y(`div`,js,M(s.value.url),1)):Bi(``,!0)]),X(`div`,Ms,[X(`button`,{type:`button`,class:j([`action-btn confirm-btn`,{"is-disabled":u.value}]),ref_key:`confirmBtnRef`,ref:p,onClick:_,disabled:u.value},M(u.value?`添加中...`:`确认添加`),11,Ns),X(`button`,{type:`button`,class:j([`action-btn cancel-btn`,{"is-disabled":u.value}]),ref_key:`cancelBtnRef`,ref:m,onClick:v,disabled:u.value},` 取消 `,10,Ps)]),c.value?(J(),Y(`div`,{key:0,class:j([`form-message`,l.value]),role:`status`},M(c.value),3)):Bi(``,!0)])],2))}}),[[`__scopeId`,`data-v-ffaccb37`]]),Is={class:`settings-header`},Ls={class:`settings-body`},Rs={class:`settings-content`,role:`presentation`},zs=Do(Fn({__name:`SettingsPanel`,props:{activeMenu:{},settings:{}},emits:[`back`,`select-menu`,`update-setting`],setup(e,{emit:t}){let n=window.require?.(`electron`)?.ipcRenderer??null,r=e,i=t,{focusedSidebarIndex:a,focusedContentIndex:o,modeFocusedIndex:s,focusedSiteIndex:c,focusedButtonIndex:l,focusedInputIndex:u,sidebarItemRefs:d,siteItemRefs:f,focusSidebar:p,focusContent:m,focusSite:h,resetFocus:g}=Go(),_=B(null),v=B(null),y=B(null),b=B(!1),x=B(0),S=[{key:`general`,label:`常规`},{key:`site-management`,label:`网址管理`},{key:`add-site`,label:`添加新网址`},{key:`add-local-app`,label:`添加本地应用`},{key:`wallpaper`,label:`壁纸设置`}],C=Q(()=>{if(a.value>=0||b.value)return!1;switch(r.activeMenu){case`general`:return o.value>=0;case`site-management`:return c.value>=0||l.value>=0;case`add-site`:return u.value>=0||l.value>=0;default:return!1}});function w(e,t){e&&(d.value[t]=e)}function ee(e,t){e&&(f.value[t]=e)}function te(e){let{key:t}=e;if(!b.value&&!(ss()&&t===$.CONFIRM)){if(a.value>=0){ne(e);return}if(r.activeMenu===`site-management`&&c.value>=0){E(e);return}if(r.activeMenu===`add-site`){ce(e);return}if(o.value>=0){T(e);return}}}function ne(e){let{key:t}=e;if(t===$.BACK){e.preventDefault(),i(`back`);return}if(t===$.UP){e.preventDefault();let t=(a.value-1+S.length)%S.length;a.value=t,d.value[t]?.focus(),i(`select-menu`,S[t].key);return}if(t===$.DOWN){e.preventDefault();let t=(a.value+1)%S.length;a.value=t,d.value[t]?.focus(),i(`select-menu`,S[t].key);return}if(t===$.RIGHT||t===$.CONFIRM){e.preventDefault();let t=S[a.value].key;a.value=-1,t===`general`?(o.value=0,s.value=0,H(()=>{document.querySelector(`#panel-general .setting-select`)?.focus()})):t===`site-management`?(c.value=0,l.value=0,H(()=>{O(0)})):t===`add-site`&&(u.value=0,l.value=-1,H(()=>{y.value?.siteNameInputRef?.focus()}));return}}function T(e){let{key:t}=e;if(t===$.BACK){e.preventDefault();let t=S.findIndex(e=>e.key===r.activeMenu);a.value=t>=0?t:0,o.value=-1,H(()=>{d.value[a.value]?.focus()});return}if(t===$.UP){e.preventDefault(),o.value>0?(o.value--,H(()=>{re(o.value)})):(o.value=2,H(()=>{re(o.value)}));return}if(t===$.DOWN){e.preventDefault(),o.value<2?(o.value++,H(()=>{re(o.value)})):(o.value=0,H(()=>{re(o.value)}));return}if(t===$.LEFT){e.preventDefault();let t=S.findIndex(e=>e.key===r.activeMenu);a.value=t>=0?t:0,o.value=-1,H(()=>{d.value[a.value]?.focus()});return}if(t===$.RIGHT&&o.value===2){e.preventDefault(),s.value=s.value===0?1:0,H(()=>{re(o.value)});return}if(t===$.CONFIRM){e.preventDefault(),o.value===0?document.querySelector(`#panel-general .setting-select`)?.showPicker?.():o.value===1?i(`update-setting`,{startAtLogin:!r.settings.startAtLogin}):o.value===2&&(s.value=s.value===0?1:0,i(`update-setting`,{homeMode:s.value===0?`game`:`tv`}),H(()=>{re(o.value)}));return}}function re(e){if(e===0)document.querySelector(`#panel-general .setting-select`)?.focus();else if(e===1)document.querySelector(`#panel-general .switch-button`)?.focus();else if(e===2){let e=document.querySelectorAll(`#panel-general .mode-option`),t=s.value;t>=0&&t<e.length&&e[t]?.focus()}}function E(e){let{key:t}=e;if(t===$.BACK){e.preventDefault();let t=S.findIndex(e=>e.key===r.activeMenu);a.value=t>=0?t:0,c.value=0,l.value=-1,H(()=>{d.value[a.value]?.focus()});return}if(t===$.LEFT){if(e.preventDefault(),l.value>0)l.value--,H(()=>{O(l.value)});else{let e=D();e>1&&(l.value=e-1,H(()=>{O(l.value)}))}return}if(t===$.RIGHT){e.preventDefault();let t=D();l.value<t-1?(l.value++,H(()=>{O(l.value)})):t>1&&(l.value=0,H(()=>{O(l.value)}));return}if(t===$.UP){if(e.preventDefault(),c.value>0){c.value--;let e=D();l.value>=e&&(l.value=Math.max(0,e-1)),H(()=>{O(l.value)})}else{c.value=f.value.length-1;let e=D();l.value>=e&&(l.value=Math.max(0,e-1)),H(()=>{O(l.value)})}return}if(t===$.DOWN){if(e.preventDefault(),c.value<f.value.length-1){c.value++;let e=D();l.value>=e&&(l.value=Math.max(0,e-1)),H(()=>{O(l.value)})}else{c.value=0;let e=D();l.value>=e&&(l.value=Math.max(0,e-1)),H(()=>{O(l.value)})}return}if(t===$.CONFIRM){e.preventDefault(),k(l.value)?.click();return}}function D(){let e=f.value[c.value];return e?e.querySelectorAll(`.action-button`).length:0}function O(e){let t=f.value[c.value];if(!t)return;let n=t.querySelectorAll(`.action-button`);e>=0&&e<n.length&&n[e]?.focus()}function k(e){let t=f.value[c.value];if(!t)return null;let n=t.querySelectorAll(`.action-button`);return e>=0&&e<n.length?n[e]:null}function ie(e){let t=Math.max(0,e-1);if(t<f.value.length)c.value=t,l.value=0,H(()=>{O(0)});else if(f.value.length===0){let e=S.findIndex(e=>e.key===r.activeMenu);a.value=e>=0?e:0,c.value=0,l.value=-1,H(()=>{d.value[a.value]?.focus()})}}function A(){b.value=!0,x.value=0}function ae(){b.value=!1,x.value=0}function oe(e){b.value=e,e||(x.value=0)}function se(){c.value=0,l.value=0,H(()=>{O(0)})}function ce(e){let{key:t}=e;if(t===$.BACK){e.preventDefault();let t=S.findIndex(e=>e.key===r.activeMenu);a.value=t>=0?t:0,u.value=-1,l.value=-1,H(()=>{d.value[a.value]?.focus()});return}if(u.value>=0){if(t===$.UP){e.preventDefault(),u.value>0&&(u.value--,H(()=>{u.value===0&&y.value?.siteNameInputRef?.focus()}));return}if(t===$.DOWN){e.preventDefault(),u.value<1?(u.value++,H(()=>{u.value===1&&y.value?.siteUrlInputRef?.focus()})):(u.value=-1,l.value=0,H(()=>{y.value?.confirmBtnRef?.focus()}));return}if(t===$.LEFT){e.preventDefault(),l.value>0?(l.value--,H(()=>{y.value?.confirmBtnRef?.focus()})):(l.value=-1,u.value=1,H(()=>{y.value?.siteUrlInputRef?.focus()}));return}if(t===$.CONFIRM){e.preventDefault(),u.value===0?(u.value=1,H(()=>{y.value?.siteUrlInputRef?.focus()})):u.value===1&&y.value?.handleSubmit();return}return}if(l.value>=0){if(t===$.LEFT){e.preventDefault(),l.value>0?(l.value--,H(()=>{y.value?.confirmBtnRef?.focus()})):(l.value=-1,u.value=1,H(()=>{y.value?.siteUrlInputRef?.focus()}));return}if(t===$.RIGHT){e.preventDefault(),l.value<1?(l.value++,H(()=>{y.value?.cancelBtnRef?.focus()})):(l.value=-1,u.value=1,H(()=>{y.value?.siteUrlInputRef?.focus()}));return}if(t===$.UP){e.preventDefault(),l.value>0?(l.value--,H(()=>{y.value?.confirmBtnRef?.focus()})):(l.value=-1,u.value=1,H(()=>{y.value?.siteUrlInputRef?.focus()}));return}if(t===$.DOWN){e.preventDefault(),l.value<1&&(l.value++,H(()=>{y.value?.cancelBtnRef?.focus()}));return}if(t===$.CONFIRM){e.preventDefault(),l.value===0?y.value?.handleSubmit():l.value===1&&y.value?.handleCancel();return}return}if(t===$.LEFT){e.preventDefault();let t=S.findIndex(e=>e.key===r.activeMenu);p(t>=0?t:0,S);return}}return Xn(()=>{n?.send(`settings-panel:focus-changed`,!0);let e=S.findIndex(e=>e.key===r.activeMenu);a.value=e>=0?e:0,console.log(`当前菜单索引`,e),H(()=>{_.value?.focus()})}),er(()=>{n?.send(`settings-panel:focus-changed`,!1)}),(t,n)=>(J(),Y(`section`,{class:`settings-shell`,ref_key:`settingsShellRef`,ref:_,tabindex:`0`,onKeydownCapture:te,role:`application`,"aria-label":`设置面板`},[X(`header`,Is,[X(`button`,{type:`button`,class:`back-button`,ref_key:`backButtonRef`,ref:v,onClick:n[0]||=e=>t.$emit(`back`),"aria-label":`返回上一页`},` 返回 `,512),n[5]||=X(`h1`,{class:`settings-title`,id:`settings-title`},`设置`,-1)]),X(`div`,Ls,[Fi(Jo,{"active-menu":e.activeMenu,"focused-index":Ht(a),onSelectMenu:n[1]||=e=>t.$emit(`select-menu`,e),onSetRef:w},null,8,[`active-menu`,`focused-index`]),X(`div`,Rs,[e.activeMenu===`general`?(J(),Ai(as,{key:0,settings:e.settings,"is-secondary-focused":C.value,onUpdateSetting:n[2]||=e=>t.$emit(`update-setting`,e)},null,8,[`settings`,`is-secondary-focused`])):e.activeMenu===`site-management`?(J(),Ai(ws,{key:1,settings:e.settings,"focused-index":Ht(c),"is-secondary-focused":C.value,onUpdateSetting:n[3]||=e=>t.$emit(`update-setting`,e),onSetRef:ee,onItemRemoved:ie,onOpenEditDialog:A,onCloseEditDialog:ae,onEditDialogStateChange:oe,onFocusFirstButton:se},null,8,[`settings`,`focused-index`,`is-secondary-focused`])):e.activeMenu===`add-site`?(J(),Ai(Fs,{key:2,ref_key:`addSiteFormRef`,ref:y,settings:e.settings,"is-secondary-focused":C.value,onUpdateSetting:n[4]||=e=>t.$emit(`update-setting`,e)},null,8,[`settings`,`is-secondary-focused`])):Bi(``,!0)])])],544))}}),[[`__scopeId`,`data-v-df56bb9e`]]),Bs=`(function registerYangshipinPlugin() {\r
  window.__tvAssistantPlugins = window.__tvAssistantPlugins || {};\r
  if (window.__tvAssistantPlugins.yangshipin) {\r
    return;\r
  }\r
\r
  const OVERLAY_ID = 'tv-assistant-yangshipin-overlay';\r
  const STYLE_ID = 'tv-assistant-yangshipin-style';\r
  const HIDDEN_CLASS = 'tv-assistant-yangshipin-hidden';\r
  const SELECTOR_CANDIDATES = [\r
    '.tv-main-con-r-list-left',\r
    '.tv-main-con-r-list',\r
    '[class*="tv-main-con-r-list"]',\r
    '[class*="channel"]',\r
    '[class*="list"]'\r
  ];\r
  const CCTV_PATTERN = /^(CCTV|CGTN)/i;\r
  const SATELLITE_PATTERN = /(卫视)$/;\r
\r
  const state = {\r
    initialized: false,\r
    config: {\r
      volume: 0.6\r
    },\r
    overlay: null,\r
    volumeIndicator: null,\r
    lastBoundVideo: null,\r
    videoObserver: null\r
  };\r
\r
  function clampVolume(volume) {\r
    if (typeof volume !== 'number' || Number.isNaN(volume)) {\r
      return state.config.volume;\r
    }\r
\r
    return Math.max(0, Math.min(1, volume));\r
  }\r
\r
  function normalizeText(text) {\r
    return String(text || '')\r
      .replace(/\\s+/g, ' ')\r
      .replace(/\\([^)]*\\)/g, '')\r
      .replace(/[（(][^）)]*[）)]/g, '')\r
      .replace(/高清|超清|标清|4K|HD/gi, '')\r
      .trim();\r
  }\r
\r
  function isChannelName(name) {\r
    if (!name || name.length > 20) {\r
      return false;\r
    }\r
\r
    if (/VIP|充值|登录|扫码|下载|打开APP|节目单|更多/.test(name)) {\r
      return false;\r
    }\r
\r
    return CCTV_PATTERN.test(name) || SATELLITE_PATTERN.test(name);\r
  }\r
\r
  function dedupe(values) {\r
    return [...new Set(values)];\r
  }\r
\r
  function injectStyles() {\r
    if (document.getElementById(STYLE_ID)) {\r
      return;\r
    }\r
\r
    const style = document.createElement('style');\r
    style.id = STYLE_ID;\r
    style.textContent = \`\r
      #\${OVERLAY_ID} {\r
        position: fixed;\r
        inset: 0;\r
        z-index: 2147483646;\r
        display: flex;\r
        flex-direction: column;\r
        align-items: center;\r
        justify-content: center;\r
        gap: 26px;\r
        background:\r
          radial-gradient(circle at center, rgba(16, 31, 28, 0.28), rgba(0, 0, 0, 0.92) 70%),\r
          linear-gradient(180deg, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.96));\r
        color: #f7fff8;\r
        font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;\r
        pointer-events: none;\r
      }\r
\r
      #\${OVERLAY_ID}[hidden] {\r
        display: none !important;\r
      }\r
\r
      #\${OVERLAY_ID} .spinner {\r
        width: 72px;\r
        height: 72px;\r
        border: 5px solid rgba(255, 255, 255, 0.18);\r
        border-top-color: #7dff9c;\r
        border-radius: 50%;\r
        box-shadow: 0 0 32px rgba(125, 255, 156, 0.18);\r
        animation: tv-assistant-spin 1s linear infinite;\r
      }\r
\r
      #\${OVERLAY_ID} .loading-text {\r
        font-size: 22px;\r
        letter-spacing: 0.18em;\r
        text-transform: uppercase;\r
        color: rgba(238, 248, 239, 0.72);\r
      }\r
\r
      #\${OVERLAY_ID} .channel-title {\r
        font-size: clamp(44px, 5vw, 88px);\r
        font-weight: 700;\r
        letter-spacing: 0.08em;\r
        text-align: center;\r
        text-shadow: 0 0 28px rgba(125, 255, 156, 0.18);\r
      }\r
\r
      .\${HIDDEN_CLASS} {\r
        opacity: 0 !important;\r
        pointer-events: none !important;\r
        visibility: hidden !important;\r
      }\r
\r
      .tv-assistant-volume-indicator {\r
        position: fixed;\r
        top: 50%;\r
        left: 50%;\r
        transform: translate(-50%, -50%);\r
        z-index: 2147483647;\r
        min-width: 180px;\r
        padding: 16px 28px;\r
        border-radius: 16px;\r
        background: rgba(0, 0, 0, 0.72);\r
        color: #ffffff;\r
        font-size: 34px;\r
        font-weight: 700;\r
        text-align: center;\r
        opacity: 0;\r
        transition: opacity 0.2s ease;\r
        pointer-events: none;\r
      }\r
\r
      .tv-assistant-volume-indicator.visible {\r
        opacity: 1;\r
      }\r
\r
      @keyframes tv-assistant-spin {\r
        to {\r
          transform: rotate(360deg);\r
        }\r
      }\r
    \`;\r
\r
    document.head.appendChild(style);\r
  }\r
\r
  function ensureOverlay() {\r
    injectStyles();\r
\r
    if (state.overlay?.isConnected) {\r
      return state.overlay;\r
    }\r
\r
    const overlay = document.createElement('div');\r
    overlay.id = OVERLAY_ID;\r
\r
    const title = document.createElement('div');\r
    title.className = 'channel-title';\r
\r
    const spinner = document.createElement('div');\r
    spinner.className = 'spinner';\r
\r
    const loadingText = document.createElement('div');\r
    loadingText.className = 'loading-text';\r
    loadingText.textContent = 'Loading';\r
\r
    overlay.appendChild(title);\r
    overlay.appendChild(spinner);\r
    overlay.appendChild(loadingText);\r
    document.body.appendChild(overlay);\r
    state.overlay = overlay;\r
\r
    return overlay;\r
  }\r
\r
  function showOverlay(channelName = '') {\r
    const overlay = ensureOverlay();\r
    const title = overlay.querySelector('.channel-title');\r
    if (title) {\r
      title.textContent = channelName;\r
    }\r
\r
    overlay.hidden = false;\r
  }\r
\r
  function hideOverlay() {\r
    const overlay = ensureOverlay();\r
    overlay.hidden = true;\r
  }\r
\r
  function ensureVolumeIndicator() {\r
    if (state.volumeIndicator?.isConnected) {\r
      return state.volumeIndicator;\r
    }\r
\r
    const indicator = document.createElement('div');\r
    indicator.className = 'tv-assistant-volume-indicator';\r
    document.body.appendChild(indicator);\r
    state.volumeIndicator = indicator;\r
    return indicator;\r
  }\r
\r
  function showVolumeIndicator(volume) {\r
    const indicator = ensureVolumeIndicator();\r
    indicator.textContent = volume === 0 ? '静音' : \`音量 \${Math.round(volume * 100)}\`;\r
    indicator.classList.add('visible');\r
\r
    window.clearTimeout(indicator.__hideTimer);\r
    indicator.__hideTimer = window.setTimeout(() => {\r
      indicator.classList.remove('visible');\r
    }, 1200);\r
  }\r
\r
  function isEssentialElement(element) {\r
    // 判断是否是必要元素（如遮罩层、音量指示器等）\r
    return element.id === OVERLAY_ID || element === state.volumeIndicator;\r
  }\r
\r
  function hideUnrelatedElements(container, video) {\r
    // 隐藏容器内不包含视频的兄弟元素\r
    const siblings = container.children;\r
    for (const sibling of siblings) {\r
      if (!sibling.contains(video) && !isEssentialElement(sibling)) {\r
        // 检查是否是需要隐藏的UI元素（header、footer、导航等）\r
        const shouldHide = \r
          sibling.classList.contains('header') ||\r
          sibling.classList.contains('footer') ||\r
          sibling.tagName === 'NAV' ||\r
          sibling.tagName === 'ASIDE' ||\r
          sibling.querySelector('.header') ||\r
          sibling.querySelector('nav') ||\r
          sibling.querySelector('aside');\r
        \r
        if (shouldHide) {\r
          sibling.style.setProperty('display', 'none', 'important');\r
        }\r
      }\r
    }\r
  }\r
\r
  function applyFullscreen(video) {\r
    if (!(video instanceof HTMLVideoElement)) {\r
      return false;\r
    }\r
\r
    // 查找并点击全屏按钮\r
     /* const fullscreenButton = document.querySelector('div[data-v-03d5f916].full.full2');\r
    if (fullscreenButton) {\r
      // 模拟点击事件\r
      const clickEvent = new MouseEvent('click', {\r
        bubbles: true,\r
        cancelable: true,\r
        view: window\r
      });\r
      fullscreenButton.dispatchEvent(clickEvent);\r
      return true;\r
    } */\r
\r
    // 如果找不到指定的全屏按钮，回退到原来的CSS全屏方案\r
    for (const child of document.body.children) {\r
      if (child.id === OVERLAY_ID || child === state.volumeIndicator) {\r
        continue;\r
      }\r
\r
      if (child.contains(video)) {\r
        child.classList.remove(HIDDEN_CLASS);\r
        // 新增：在包含视频的容器中，隐藏与视频无关的子元素\r
        hideUnrelatedElements(child, video);\r
        continue;\r
      }\r
\r
      child.classList.add(HIDDEN_CLASS);\r
    }\r
\r
    let current = video;\r
    while (current && current !== document.body) {\r
      current.style.setProperty('position', 'static', 'important');\r
      current.style.setProperty('display', 'block', 'important');\r
      current.style.setProperty('width', '100%', 'important');\r
      current.style.setProperty('height', '100%', 'important');\r
      current.style.setProperty('max-width', 'none', 'important');\r
      current.style.setProperty('max-height', 'none', 'important');\r
      current.style.setProperty('margin', '0', 'important');\r
      current.style.setProperty('padding', '0', 'important');\r
      current.style.setProperty('opacity', '1', 'important');\r
      current.style.setProperty('visibility', 'visible', 'important');\r
      current = current.parentElement;\r
    }\r
\r
    document.documentElement.style.setProperty('width', '100%', 'important');\r
    document.documentElement.style.setProperty('height', '100%', 'important');\r
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');\r
    document.body.style.setProperty('width', '100%', 'important');\r
    document.body.style.setProperty('height', '100%', 'important');\r
    document.body.style.setProperty('margin', '0', 'important');\r
    document.body.style.setProperty('padding', '0', 'important');\r
    document.body.style.setProperty('overflow', 'hidden', 'important');\r
    document.body.style.setProperty('background', '#000', 'important');\r
\r
    video.style.setProperty('position', 'fixed', 'important');\r
    video.style.setProperty('inset', '0', 'important');\r
    video.style.setProperty('width', '100vw', 'important');\r
    video.style.setProperty('height', '100vh', 'important');\r
    video.style.setProperty('object-fit', 'cover', 'important');\r
    video.style.setProperty('z-index', '2147483644', 'important'); \r
\r
    return true;\r
  }\r
\r
  function extractCurrentChannelName() {\r
    const candidates = ['.tvSelect', '[class*="select"]', '[class*="active"]', '[aria-selected="true"]'];\r
    for (const selector of candidates) {\r
      const element = document.querySelector(selector);\r
      const text = normalizeText(element?.textContent || '');\r
      if (isChannelName(text)) {\r
        return text;\r
      }\r
    }\r
\r
    return '';\r
  }\r
\r
  function applyConfiguredVolume(video) {\r
    if (!(video instanceof HTMLVideoElement)) {\r
      return;\r
    }\r
\r
    const volume = clampVolume(state.config.volume);\r
    video.volume = volume;\r
    video.muted = volume === 0;\r
  }\r
\r
  function bindVideo(video) {\r
    if (!(video instanceof HTMLVideoElement)) {\r
      return;\r
    }\r
\r
    state.lastBoundVideo = video;\r
    applyConfiguredVolume(video);\r
    applyFullscreen(video);\r
\r
    if (video.dataset.tvAssistantBound === 'true') {\r
      return;\r
    }\r
\r
    video.dataset.tvAssistantBound = 'true';\r
\r
    const showLoading = () => showOverlay(extractCurrentChannelName());\r
    const hideLoading = () => hideOverlay();\r
\r
    video.addEventListener('loadstart', showLoading);\r
    video.addEventListener('waiting', showLoading);\r
    video.addEventListener('seeking', showLoading);\r
    video.addEventListener('stalled', showLoading);\r
    video.addEventListener('playing', hideLoading);\r
    video.addEventListener('canplay', hideLoading);\r
    video.addEventListener('play', hideLoading); \r
  }\r
\r
  function ensureVideoWatcher() {\r
    if (state.videoObserver) {\r
      return;\r
    } \r
\r
    state.videoObserver = new MutationObserver(() => {\r
      const video = document.querySelector('video');\r
      if (video) {\r
        bindVideo(video);\r
      }\r
    });\r
\r
    state.videoObserver.observe(document.body, {\r
      childList: true,\r
      subtree: true\r
    });\r
  }\r
\r
  function collectFromContainer(container) {\r
    const names = [];\r
    const nodes = container.querySelectorAll('div, span, a, button, li');\r
\r
    nodes.forEach((node) => {\r
      const text = normalizeText(node.textContent || '');\r
      if (isChannelName(text)) {\r
        names.push(text);\r
      }\r
    });\r
\r
    return dedupe(names);\r
  }\r
\r
  function findBestContainer() {\r
    for (const selector of SELECTOR_CANDIDATES) {\r
      const containers = document.querySelectorAll(selector);\r
      for (const container of containers) {\r
        const names = collectFromContainer(container);\r
        if (names.length >= 8) {\r
          return { container, names };\r
        }\r
      }\r
    }\r
\r
    return null;\r
  }\r
\r
  function collectFromWholePage() {\r
    const names = [];\r
    const nodes = document.querySelectorAll('div, span, a, button, li');\r
\r
    nodes.forEach((node) => {\r
      const text = normalizeText(node.textContent || '');\r
      if (isChannelName(text)) {\r
        names.push(text);\r
      }\r
    });\r
\r
    return dedupe(names);\r
  }\r
\r
  function getChannelEntries() {\r
    const entries = [];\r
    const nodes = document.querySelectorAll('div, span, a, button, li');\r
\r
    nodes.forEach((node) => {\r
      const text = normalizeText(node.textContent || '');\r
      if (!isChannelName(text)) {\r
        return;\r
      }\r
\r
      let clickable = node;\r
      while (\r
        clickable &&\r
        clickable !== document.body &&\r
        clickable.tagName !== 'A' &&\r
        clickable.tagName !== 'BUTTON' &&\r
        clickable.getAttribute('role') !== 'button' &&\r
        typeof clickable.onclick !== 'function'\r
      ) {\r
        clickable = clickable.parentElement;\r
      }\r
\r
      entries.push({\r
        name: text,\r
        element: clickable && clickable !== document.body ? clickable : node\r
      });\r
    });\r
\r
    return entries.filter((entry, index, array) => array.findIndex((item) => item.name === entry.name) === index);\r
  }\r
\r
  function buildMenuData(channelNames) {\r
    const result = {\r
      currentChannel: extractCurrentChannelName(),\r
      央视频道: [],\r
      卫视频道: []\r
    };\r
\r
    channelNames.forEach((name) => {\r
      if (CCTV_PATTERN.test(name)) {\r
        result.央视频道.push(name);\r
        return;\r
      }\r
\r
      if (SATELLITE_PATTERN.test(name)) {\r
        result.卫视频道.push(name);\r
      }\r
    });\r
\r
    result.央视频道 = dedupe(result.央视频道);\r
    result.卫视频道 = dedupe(result.卫视频道);\r
    return result;\r
  }\r
\r
  function getMenuData() {\r
    const bestContainer = findBestContainer();\r
    const channelNames = bestContainer?.names?.length ? bestContainer.names : collectFromWholePage();\r
    return buildMenuData(channelNames);\r
  }\r
\r
  function waitForMenuData(timeoutMs = 15000) {\r
    return new Promise((resolve, reject) => {\r
      const startedAt = Date.now();\r
\r
      const tryResolve = () => {\r
        const data = getMenuData();\r
        if (data.央视频道.length > 0 || data.卫视频道.length > 0) {\r
          resolve(data);\r
          return true;\r
        }\r
\r
        return false;\r
      };\r
\r
      if (tryResolve()) {\r
        return;\r
      }\r
\r
      const observer = new MutationObserver(() => {\r
        if (tryResolve()) {\r
          observer.disconnect();\r
          clearInterval(timer);\r
        }\r
      });\r
\r
      const timer = window.setInterval(() => {\r
        if (Date.now() - startedAt > timeoutMs) {\r
          observer.disconnect();\r
          clearInterval(timer);\r
          reject(new Error('等待频道列表超时'));\r
        }\r
      }, 500);\r
\r
      observer.observe(document.body, {\r
        childList: true,\r
        subtree: true\r
      });\r
    });\r
  }\r
\r
  function simulateClick(element) {\r
    const event = new MouseEvent('click', {\r
      bubbles: true,\r
      cancelable: true,\r
      view: window\r
    });\r
\r
    element.dispatchEvent(event);\r
  }\r
\r
  function selectChannel(channelName) {\r
    const targetName = normalizeText(channelName);\r
    const entries = getChannelEntries();\r
    const target = entries.find((entry) => entry.name === targetName);\r
\r
    if (!target) {\r
      return false;\r
    }\r
\r
    showOverlay(targetName);\r
    target.element.scrollIntoView({ block: 'nearest' });\r
    simulateClick(target.element);\r
    return true;\r
  }\r
\r
  function setVolume(volume) {\r
    const nextVolume = clampVolume(volume);\r
    state.config.volume = nextVolume;\r
\r
    const video = document.querySelector('video');\r
    if (video instanceof HTMLVideoElement) {\r
      video.volume = nextVolume;\r
      video.muted = nextVolume === 0;\r
    }\r
\r
    showVolumeIndicator(nextVolume);\r
    return nextVolume;\r
  }\r
\r
  function adjustVolume(delta) {\r
    const video = document.querySelector('video');\r
    const baseVolume = video instanceof HTMLVideoElement ? video.volume : state.config.volume;\r
    return setVolume(baseVolume + delta);\r
  }\r
\r
  function init(config = {}) {\r
     if (typeof config === 'object' && config) {\r
      state.config.volume = clampVolume(config.volume ?? state.config.volume);\r
    }\r
\r
    ensureOverlay();\r
    ensureVideoWatcher();\r
\r
    const video = document.querySelector('video');\r
    if (video) {\r
      bindVideo(video);\r
      if (video.readyState >= 3 && !video.paused) {\r
        hideOverlay();\r
      } else {\r
        showOverlay(extractCurrentChannelName());\r
      }\r
    } else {\r
      showOverlay(extractCurrentChannelName());\r
    } \r
\r
    state.initialized = true;\r
    return true;\r
  }\r
\r
  window.__tvAssistantPlugins.yangshipin = {\r
    id: 'yangshipin',\r
    init,\r
    getMenuData,\r
    waitForMenuData,\r
    selectChannel,\r
    setVolume,\r
    adjustVolume,\r
    showOverlay,\r
    hideOverlay\r
  };\r
})();\r
`,Vs={id:`yangshipin`,name:`央视频直播`,matches:[`https://www.yangshipin.cn/tv/home`],capabilities:{liveMenu:!0,volumeControl:!0},defaultConfig:{volume:.6}};function Hs(e){return`
${Bs}
${e}
  `}var Us=[{manifest:Vs,matches:e=>Vs.matches.some(t=>e.startsWith(t)),buildInitScript:e=>Hs(`window.__tvAssistantPlugins.yangshipin.init(${JSON.stringify(e)});`),buildMenuDataScript:()=>Hs(`window.__tvAssistantPlugins.yangshipin.waitForMenuData(20000);`),buildSelectChannelScript:e=>Hs(`window.__tvAssistantPlugins.yangshipin.selectChannel(${JSON.stringify(e)});`),buildAdjustVolumeScript:e=>Hs(`window.__tvAssistantPlugins.yangshipin.adjustVolume(${e});`)}];function Ws(e){return Us.find(t=>t.matches(e))??null}function Gs(e,t={}){let{level:n=`error`}=t;if(console.error(`[${n}] ${e}`),typeof window<`u`){let t=document.createElement(`div`);t.className=`error-toast`,t.textContent=e;let r={info:`rgba(0, 122, 255, 0.9)`,warning:`rgba(255, 149, 0, 0.9)`,error:`rgba(255, 59, 48, 0.9)`};t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.style.animation=`slideOut 0.3s ease`,setTimeout(()=>t.remove(),300)},3e3)}}async function Ks(e,t={}){let{maxRetries:n=3,retryable:r=!0,message:i}=t,a;for(let t=0;t<n;t++)try{return await e()}catch(e){if(a=e,!r||t===n-1)break;let i=1e3*(t+1);console.warn(`重试中... (${t+1}/${n})，${i}ms 后重试`),await new Promise(e=>setTimeout(e,i))}throw i&&Gs(i,{...t,level:`error`}),a}var qs={GENERAL:`general`,SITE_MANAGEMENT:`site-management`,ADD_SITE:`add-site`,ADD_LOCAL_APP:`add-local-app`,WALLPAPER:`wallpaper`},Js=[{name:`TV 直播`,badge:`LIVE`,url:`https://www.yangshipin.cn/tv/home`,theme:`theme-live`,type:`website`,icon:`https://favicon.im/www.yangshipin.cn`},{name:`央视片库`,badge:`CCTV`,url:`https://tv.cctv.com/`,theme:`theme-cctv`,type:`website`,icon:`https://favicon.im/tv.cctv.com`},{name:`抖音`,badge:`DY`,url:`https://www.douyin.com/`,theme:`theme-douyin`,type:`website`,icon:`https://favicon.im/www.douyin.com`},{name:`腾讯视频`,badge:`QQ`,url:`https://v.qq.com/`,theme:`theme-tencent`,type:`website`,icon:`https://favicon.im/v.qq.com`}];function Ys(){let e=B([]);return{refs:e,setRef:(t,n)=>{t?e.value[n]=t:delete e.value[n]},focus:t=>{let n=e.value[t];n instanceof HTMLElement&&(n.focus(),n.scrollIntoView({behavior:`smooth`,block:`nearest`}))},blur:t=>{let n=e.value[t];n instanceof HTMLElement&&n.blur()},getRef:t=>e.value[t]??null,getTotal:()=>e.value.length}}function Xs(e=null){let t=B(e);return{ref:t,setRef:e=>{e instanceof Element?t.value=e:t.value=null},focus:()=>{t.value instanceof HTMLElement&&(t.value.focus(),t.value.scrollIntoView({behavior:`smooth`,block:`nearest`}))},blur:()=>{t.value instanceof HTMLElement&&t.value.blur()},exists:()=>t.value!==null}}var Zs=`tv-assistant-host-auto-hide-cursor-style`,Qs=`tv-assistant-host-cursor-hidden`;function $s(){if(document.getElementById(Zs))return;let e=document.createElement(`style`);e.id=Zs,e.textContent=`
    .${Qs},
    .${Qs} * {
      cursor: none !important;
    }
  `,document.head.appendChild(e)}function ec(e){return`
    (() => {
      const STYLE_ID = 'tv-assistant-webview-auto-hide-cursor-style';
      const HIDDEN_CLASS = 'tv-assistant-webview-cursor-hidden';

      if (!document.getElementById(STYLE_ID)) {
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = \`
          .\${HIDDEN_CLASS},
          .\${HIDDEN_CLASS} * {
            cursor: none !important;
          }
        \`;
        document.head.appendChild(style);
      }

      const root = document.documentElement;
      const state = window.__tvAssistantAutoHideCursor ?? {
        enabled: false,
        hideDelay: ${e}
      };

      state.hideDelay = ${e};

      let hideTimer = null;

      function clearHideTimer() {
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = null;
        }
      }

      function showCursor() {
        root.classList.remove(HIDDEN_CLASS);
        clearHideTimer();
        hideTimer = setTimeout(() => {
          if (state.enabled) {
            root.classList.add(HIDDEN_CLASS);
          }
        }, state.hideDelay);
      }

      state.enable = () => {
        state.enabled = true;
        root.classList.remove(HIDDEN_CLASS);
        showCursor();
      };

      state.disable = () => {
        state.enabled = false;
        root.classList.remove(HIDDEN_CLASS);
        clearHideTimer();
      };

      state.show = () => {
        showCursor();
      };

      state.hide = () => {
        if (!state.enabled) {
          return;
        }
        clearHideTimer();
        root.classList.add(HIDDEN_CLASS);
      };

      window.__tvAssistantAutoHideCursor = state;
      
      document.addEventListener('mousemove', () => {
        if (state.enabled) {
          showCursor();
        }
      }, { passive: true });

      state.enable();
      return true;
    })();
  `}function tc(){return`
    (() => {
      window.__tvAssistantAutoHideCursor?.disable?.();
      return true;
    })();
  `}function nc(e){return`
    (() => {
      const controller = window.__tvAssistantAutoHideCursor;
      if (!controller) {
        return false;
      }

      if (${e?`true`:`false`}) {
        controller.show?.();
      } else {
        controller.hide?.();
      }

      return true;
    })();
  `}function rc(e={}){let{hideDelay:t=3e3,immediate:n=!1}=e,r=B(n),i=B(!0),a=B(null),o=B(!1),s=null,c=null,l=!1,u=null,d=window.require?.(`robotjs`)??null;function f(e){document.documentElement.classList.toggle(Qs,!e),a.value&&(a.value.style.cursor=e?``:`none`)}function p(){s&&=(clearTimeout(s),null)}function m(){c&&=(clearInterval(c),null)}async function h(e){let t=a.value;if(!(!t||!o.value))try{await t.executeJavaScript(nc(e),!0)}catch(e){console.error(`[AutoHideMouse] webview cursor visibility sync failed:`,e)}}function g(){let e=i.value;i.value=!0,f(!0),e||h(!0)}function _(){!r.value||!i.value||(i.value=!1,f(!1),h(!1))}async function v(e){let n=a.value;if(!(!n||!o.value))try{e?await n.executeJavaScript(ec(t),!0):await n.executeJavaScript(tc(),!0)}catch(e){console.error(`[AutoHideMouse] webview cursor sync failed:`,e)}}function y(){r.value&&(i.value||g(),p(),s=setTimeout(()=>{_()},t))}function b(){y()}function x(){b()}function S(){m(),d&&(u=d.getMousePos(),c=setInterval(()=>{if(!r.value)return;let e=d.getMousePos();(!u||e.x!==u.x||e.y!==u.y)&&(u=e,b())},120))}function C(){if(r.value){y(),v(!0);return}r.value=!0}function w(){if(!r.value){g(),v(!1);return}r.value=!1,u=null}function ee(){if(r.value){w();return}C()}function te(e){a.value=e,o.value=!1}function ne(){o.value=!0,r.value?(v(!0),h(i.value)):v(!1)}return Xn(()=>{l=!0,$s(),f(!0),r.value&&(document.addEventListener(`mousemove`,x,{passive:!0}),S(),y())}),Dn(r,e=>{if(l){if(e){document.addEventListener(`mousemove`,x,{passive:!0}),S(),y(),v(!0),h(i.value);return}document.removeEventListener(`mousemove`,x),p(),m(),u=null,g(),v(!1)}}),$n(()=>{document.removeEventListener(`mousemove`,x),p(),m(),u=null,g(),v(!1)}),{isEnabled:r,isMouseVisible:i,enable:C,disable:w,toggle:ee,showMouse:g,hideMouse:_,resetHideTimer:y,attachWebview:te,markWebviewReady:ne}}function ic(){let e=jt({visible:!1,groupIndex:0,column:`group`,groups:[{label:`央视频道`,items:[`内容稍后添加`]},{label:`卫视频道`,items:[`内容稍后添加`]}],itemIndices:[0,0]}),t=B(``),n=B(``),r=B({}),i=Q(()=>e.groups[e.groupIndex]),a=Q(()=>e.itemIndices[e.groupIndex]??0),o=Q(()=>i.value?.items??[]),s=Q(()=>t.value||i.value?.label||``);function c(){e.visible=!e.visible,e.visible||(e.column=`group`)}function l(){e.visible=!1,e.column=`group`}function u(t){let n=e.groups.length;e.groupIndex=(e.groupIndex+t+n)%n}function d(t){let n=o.value.length,r=(a.value+t+n)%n;e.itemIndices[e.groupIndex]=r}function f(n){if(!n)return;let r=n.trim();t.value=r;let i=e.groups.findIndex(e=>e.items.includes(r));if(i===-1)return;let a=e.groups[i].items.indexOf(r);e.groupIndex=i,e.itemIndices[i]=a}function p(t){let n=t.央视频道?.length?t.央视频道:[`内容稍后添加`],r=t.卫视频道?.length?t.卫视频道:[`内容稍后添加`];e.groups=[{label:`央视频道`,items:n},{label:`卫视频道`,items:r}],e.itemIndices=e.groups.map(()=>0),e.groupIndex=0,f(t.currentChannel??``)}function m(){e.column=e.column===`group`?`item`:`group`}return{state:e,currentChannel:t,currentPluginId:n,currentPluginConfig:r,currentGroup:i,currentItemIndex:a,currentItems:o,heading:s,toggle:c,close:l,moveGroup:u,moveItem:d,syncChannel:f,applyGroups:p,switchColumn:m}}var ac=function(e){return e.TOOLBAR=`toolbar`,e.CARDS=`cards`,e}(ac||{});po(Do(Fn({__name:`HomePage`,setup(e){let t=window.require?.(`electron`)?.ipcRenderer??null,n=ic(),{enable:r,disable:i,attachWebview:a,markWebviewReady:o,isMouseVisible:s}=rc({hideDelay:3e3,immediate:!1}),c=Ys(),l=Xs(),u=Xs(),d=B(null),f=B(ac.CARDS),p=jt({now:new Date,selectedIndex:0,activeUrl:``,activeTitle:``,showSettings:!1,activeSettingsMenu:qs.GENERAL,settings:{...Xo}}),m=jt({currentPluginId:``,currentPluginConfig:{}}),h,g=0,_=new Intl.DateTimeFormat(`zh-CN`,{month:`long`,day:`numeric`,weekday:`long`}),v=Q(()=>[...Js,...p.settings.customShortcuts].filter(e=>p.settings.enabledShortcuts.includes(e.url))),y=Q(()=>p.now.toLocaleTimeString(`zh-CN`,{hour:`2-digit`,minute:`2-digit`,hour12:!1})),b=Q(()=>Ws(p.activeUrl)),x=Q(()=>_.format(p.now)),S=Q(()=>b.value?.manifest.capabilities.liveMenu??!1);function C(){p.now=new Date}function w(){p.showSettings=!0,i()}function ee(){p.showSettings=!1,H(()=>{O()})}function te(e){p.activeUrl=e.url,p.activeTitle=e.name,p.showSettings=!1,n.close(),n.currentChannel.value=``,m.currentPluginId=``,m.currentPluginConfig={},r(),H(()=>{let e=u.ref.value;e?e.focus():l.ref.value?.focus()})}function ne(){if(!p.settings.openModuleOnLaunch||!p.settings.launchModuleId)return;let e=Js.find(e=>e.url===p.settings.launchModuleId);e&&te(e)}function T(){p.activeUrl=``,p.activeTitle=``,n.close(),n.currentChannel.value=``,m.currentPluginId=``,m.currentPluginConfig={},i(),H(()=>{O()})}function re(e,t){c.setRef(e,t)}function E(e){l.setRef(e)}function D(e){u.setRef(e),a(e??null)}function O(){c.getRef(p.selectedIndex)?.focus(),f.value=ac.CARDS}function k(){console.log(`[HomePage] focusToolbar 被调用`),console.log(`[HomePage] homeLandingRef:`,d.value),d.value&&(d.value.focusToolbar(),f.value=ac.TOOLBAR,console.log(`[HomePage] 焦点区域已设置为 TOOLBAR`))}function ie(e=!1){e&&(p.selectedIndex=0),O()}function A(){let e=window.innerWidth;return e<=640?3:e<=1100?4:5}function ae(e){let t=v.value.length;if(t===0)return;let n=A(),r=p.selectedIndex;switch(e){case`left`:if(r%n===0){let e=Math.floor(r/n),i=e===0?Math.ceil(t/n)-1:e-1,a=Math.min(n-1,t-1-i*n);r=i*n+a}else --r;break;case`right`:(r+1)%n===0||r===t-1?r=(Math.floor(r/n)+1)%Math.ceil(t/n)*n:r+=1;break;case`up`:{let e=Math.floor(r/n),i=r%n,a=Math.ceil(t/n);if(e===0){let e=(a-1)*n,o=Math.min(t-1,e+n-1);r=e+Math.min(i,o-e)}else r=(e-1)*n+i}break;case`down`:{let e=Math.floor(r/n),i=r%n;e===Math.ceil(t/n)-1?(r=i,r>=t&&(r=t-1)):(r=(e+1)*n+i,r>=t&&(r=t-1))}break}r=Math.max(0,Math.min(t-1,r)),p.selectedIndex=r,O()}function oe(e){console.log(`[HomePage] handleToolbarNavigation 被调用，direction:`,e),d.value?(console.log(`[HomePage] 调用子组件的 moveToolbarFocus`),d.value.moveToolbarFocus(e)):console.warn(`[HomePage] homeLandingRef 为空`)}function se(){S.value&&n.toggle()}function ce(){n.close()}function le(e){let t=n.state.groupIndex;n.moveGroup(e),t!==n.state.groupIndex&&H(()=>{setTimeout(()=>{let e=document.querySelector(`.live-menu-channel-item.is-active`)||document.querySelector(`.live-menu-channel-item.is-selected`);e&&e.scrollIntoView({behavior:`smooth`,block:`nearest`})},80)})}function ue(e){n.moveItem(e),H(()=>{setTimeout(()=>{let e=document.querySelector(`.live-menu-channel-item.is-active`)||document.querySelector(`.live-menu-channel-item.is-selected`);e&&e.scrollIntoView({behavior:`smooth`,block:`nearest`})},50)})}function de(e){n.syncChannel(e)}function fe(e){n.applyGroups(e)}async function pe(e){try{return await Ks(async()=>await t?.invoke(`plugin-config:get`,e)??{},{message:`加载插件 ${e} 配置失败`,retryable:!0,maxRetries:3})}catch{return Gs(`无法加载插件配置，请检查网络连接`),{}}}async function me(e,n){try{m.currentPluginConfig=n,await Ks(async()=>{await t?.invoke(`plugin-config:set`,e,n)},{message:`保存插件 ${e} 配置失败`,retryable:!0,maxRetries:3})}catch(e){throw Gs(`保存插件配置失败，请稍后重试`),e}}async function he(){try{let e=await Ks(async()=>await t?.invoke(`settings:get`),{message:`加载设置失败`,retryable:!0,maxRetries:3});p.settings={...Xo,...e}}catch{Gs(`无法加载设置，将使用默认配置`),p.settings={...Xo}}}async function ge(e){try{let n=JSON.parse(JSON.stringify(e));await Ks(async()=>await t?.invoke(`settings:set`,n),{message:`保存设置失败`,retryable:!0,maxRetries:3}),p.settings={...p.settings,...e},Gs(`设置已保存`,{level:`info`})}catch(e){throw Gs(`保存设置失败，请稍后重试`),console.error(`保存设置失败:`,e),e}}async function _e(){let e=u.ref.value,t=b.value;if(!e||!t)return null;m.currentPluginId!==t.manifest.id&&(m.currentPluginConfig={...t.manifest.defaultConfig,...await pe(t.manifest.id)},m.currentPluginId=t.manifest.id);try{await e.executeJavaScript(t.buildInitScript(m.currentPluginConfig),!0)}catch(e){return console.error(`初始化插件 ${t.manifest.id} 失败:`,e),null}return t}async function ve(){let e=u.ref.value,t=b.value;if(!e||!t?.manifest.capabilities.liveMenu)return;let n=++g;try{await _e();let r=await e.executeJavaScript(t.buildMenuDataScript(),!0);if(n!==g||!r)return;fe(r)}catch(e){console.error(`获取插件 ${t.manifest.id} 菜单数据失败:`,e),fe({})}}async function M(e){let t=u.ref.value,n=b.value;if(!(!t||!n?.manifest.capabilities.liveMenu))try{de(e),await _e(),await t.executeJavaScript(n.buildSelectChannelScript(e),!0)&&(ce(),window.setTimeout(()=>{ve()},1200))}catch(e){console.error(`插件 ${n.manifest.id} 切换频道失败:`,e)}}async function ye(e){let t=u.ref.value,n=b.value;if(!(!t||!n?.manifest.capabilities.volumeControl))try{await _e();let r=await t.executeJavaScript(n.buildAdjustVolumeScript(e),!0);typeof r==`number`&&await me(n.manifest.id,{...m.currentPluginConfig,volume:r})}catch(e){console.error(`插件 ${n.manifest.id} 调整音量失败:`,e)}}function be(){o();let e=b.value;e&&(_e(),e.manifest.capabilities.liveMenu&&ve())}function N(e){p.showSettings&&p.activeUrl}function xe(e){if(console.log(`[HomePage] 按键事件:`,e.key),!(p.showSettings&&!p.activeUrl)){if(p.activeUrl){if(console.log(`[HomePage] 当前活动 URL:`,p.activeUrl),n.state.visible){if(e.key===$.BACK){e.preventDefault(),ce();return}if(e.key===$.LEFT||e.key===$.RIGHT){e.preventDefault(),n.switchColumn();return}if(e.key===$.UP){if(e.preventDefault(),n.state.column===`group`){le(-1);return}ue(-1);return}if(e.key===$.DOWN){if(e.preventDefault(),n.state.column===`group`){le(1);return}ue(1);return}if(e.key===$.CONFIRM&&n.state.column===`item`){e.preventDefault(),M(n.currentItems.value[n.currentItemIndex.value]);return}return}if(S.value&&e.key===$.MENU){e.preventDefault(),console.log(`[HomePage] 菜单键，切换直播菜单`),se();return}if(os(e.key)){e.preventDefault(),ye(e.key===$.MINUS||e.key===$.UNDERSCORE?-.05:.05);return}e.key===$.BACK&&(e.preventDefault(),T());return}if(f.value===ac.TOOLBAR){if(e.key===$.LEFT||e.key===$.RIGHT){e.preventDefault(),oe(e.key===$.LEFT?`left`:`right`);return}if(e.key===$.DOWN){e.preventDefault(),ie(!0);return}if(e.key===$.CONFIRM){if(e.preventDefault(),console.log(`[HomePage] 工具栏确认键，触发按钮点击`),d.value){let e=d.value;console.log(`[HomePage] landingInstance:`,e.currentToolbarIndex);let t=e.toolbarButtonRefs,n=e.currentToolbarIndex;if(console.log(`[HomePage] buttons:`,t,`currentIndex:`,n),t&&t.length>0&&typeof n==`number`){let e=t[n];console.log(`[HomePage] 准备点击的按钮:`,e),e&&(e.click(),console.log(`[HomePage] 按钮已点击`))}else console.log(`[HomePage] buttons:`,t,`currentIndex:`,n),console.warn(`[HomePage] 按钮数组为空或 currentIndex 不是数字`),console.warn(`[HomePage] landingInstance:`,e)}else console.warn(`[HomePage] homeLandingRef 为空`);return}}else{if(e.key===$.UP){e.preventDefault();let t=A();if(Math.floor(p.selectedIndex/t)===0){k();return}ae(`up`);return}if(e.key===$.DOWN){e.preventDefault(),ae(`down`);return}if(e.key===$.LEFT){e.preventDefault(),ae(`left`);return}if(e.key===$.RIGHT){e.preventDefault(),ae(`right`);return}e.key===$.CONFIRM&&(e.preventDefault(),v.value.length>0&&te(v.value[p.selectedIndex]))}}}function Se(e,t){xe(new KeyboardEvent(`keydown`,{key:t.key}))}function P(){window.close()}return Xn(async()=>{C(),h=window.setInterval(C,1e3),t?.on(`app-keydown`,Se),await he(),ne(),H(()=>{O()})}),$n(()=>{h&&window.clearInterval(h),i(),t?.removeListener(`app-keydown`,Se)}),(e,t)=>(J(),Y(`main`,{class:j([`home-shell`,{"is-browser-open":!!p.activeUrl}]),tabindex:`0`,onKeydown:xe,onKeydownCapture:N},[p.showSettings?(J(),Ai(zs,{key:0,"active-menu":p.activeSettingsMenu,settings:p.settings,onBack:ee,onSelectMenu:t[0]||=e=>p.activeSettingsMenu=e,onUpdateSetting:ge},null,8,[`active-menu`,`settings`])):p.activeUrl?(J(),Ai(Oo,{key:2,"active-url":p.activeUrl,"set-back-button-ref":E,"set-webview-ref":D,"show-live-menu":Ht(n).state.visible,"live-menu-groups":Ht(n).state.groups,"active-live-group-index":Ht(n).state.groupIndex,"active-live-column":Ht(n).state.column,"active-live-item-index":Ht(n).currentItemIndex.value,"live-menu-heading":Ht(n).heading.value,"is-mouse-visible":Ht(s),onBrowserReady:be,onGoHome:T,onSelectLiveChannel:M},null,8,[`active-url`,`show-live-menu`,`live-menu-groups`,`active-live-group-index`,`active-live-column`,`active-live-item-index`,`live-menu-heading`,`is-mouse-visible`])):(J(),Ai(Wo,{key:1,ref_key:`homeLandingRef`,ref:d,"current-time":y.value,"current-date":x.value,shortcuts:v.value,"selected-index":p.selectedIndex,"set-card-ref":re,onOpenSettings:w,onCloseWindow:P,onOpenSite:te,onFocusCard:t[1]||=e=>p.selectedIndex=e,onToolbarFocusChange:t[2]||=e=>f.value=e?ac.TOOLBAR:ac.CARDS},null,8,[`current-time`,`current-date`,`shortcuts`,`selected-index`]))],34))}}),[[`__scopeId`,`data-v-16560e7b`]])).mount(`#app`);