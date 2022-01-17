!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["touch/mini-player"]=t():e["touch/mini-player"]=t()}(self,(function(){return function(){var e={304:function(e,t,n){"use strict";n.r(t),n.d(t,{touchLiveMiniPlayer:function(){return i}});var o=n(569);const i=async e=>{const t=await(0,o.select)(".live-player-ctnr");if(!t)return void console.warn("mini player touch move: player not found");const{enableTouchMove:i,disableTouchMove:r}=await Promise.resolve().then(n.bind(n,110));e?i(t,{minMoveDistance:10}):r(t)}},110:function(e,t,n){"use strict";n.r(t),n.d(t,{disableTouchMove:function(){return s},enableTouchMove:function(){return a}});var o=coreApis.settings;const i=(e,t)=>new MouseEvent(e,{screenX:t.screenX,screenY:t.screenY,clientX:t.clientX,clientY:t.clientY,bubbles:!0,cancelable:!0,view:unsafeWindow,detail:1}),r=[],c={passive:!1,capture:!0},a=(e,t)=>{if(r.some((t=>t.element===e)))return;let n,a,s;const u=lodash.get(t,"minMoveDistance",(0,o.getComponentSettings)("touchMiniPlayer").options.touchMoveDistance),l=e=>{if(e.touches.length<1)return;const t=e.touches[0];n={x:t.clientX,y:t.clientY},e.target.dispatchEvent(i("mousedown",t))};e.addEventListener("touchstart",l,c);const d=e=>{if(1!==e.touches.length)return;const t=e.touches[0],o={x:t.clientX,y:t.clientY};((e,t,n)=>Math.abs(e.x-t.x)**2+Math.abs(e.y-t.y)**2>=n*n)(n,o,u)?(e.target.dispatchEvent(i("mousemove",t)),s=!0,e.cancelable&&e.preventDefault()):s=!1,a=t};e.addEventListener("touchmove",d,c);const p=e=>{s&&(e.target.dispatchEvent(i("mouseup",a)),e.cancelable&&e.preventDefault(),s=!1)};e.addEventListener("touchend",p,c),e.addEventListener("touchcancel",p,c),r.push({element:e,touchstart:l,touchmove:d,touchend:p})},s=e=>{const t=r.findIndex((t=>t.element===e));if(-1===t)return;const n=r[t];["touchstart","touchmove","touchend"].forEach((t=>{e.removeEventListener(t,n[t],c)})),e.removeEventListener("touchcancel",n.touchend,c),r.splice(t,1)}},47:function(e,t,n){"use strict";n.r(t),n.d(t,{touchVideoMiniPlayer:function(){return a}});var o=n(569),i=coreApis.style,r=n(844),c=n.n(r);const a=async e=>{const t=await(0,o.select)("#bilibili-player");if(!t)return void console.warn("mini player touch move: player not found");const{enableTouchMove:r,disableTouchMove:a}=await Promise.resolve().then(n.bind(n,110)),s="touch-mini-player";e?((0,i.addStyle)(c(),s),r(t)):((0,i.removeStyle)(s),a(t))}},333:function(e,t,n){var o=n(645)((function(e){return e[1]}));o.push([e.id,"#bilibili-player.mini-player .drag-bar {\n  touch-action: none !important;\n  height: 40px !important;\n  line-height: 40px !important;\n  top: -40px !important;\n}\n#bilibili-player.mini-player .drag-bar i:last-child {\n  margin: 10px !important;\n}",""]),e.exports=o},645:function(e){"use strict";
// eslint-disable-next-line func-names
e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},
// eslint-disable-next-line func-names
t.i=function(e,n,o){"string"==typeof e&&(
// eslint-disable-next-line no-param-reassign
e=[[null,e,""]]);var i={};if(o)for(var r=0;r<this.length;r++){
// eslint-disable-next-line prefer-destructuring
var c=this[r][0];null!=c&&(i[c]=!0)}for(var a=0;a<e.length;a++){var s=[].concat(e[a]);o&&i[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},844:function(e,t,n){var o=n(333);o&&o.__esModule&&(o=o.default),e.exports="string"==typeof o?o:o.toString()},569:function(e){"use strict";e.exports=coreApis.spinQuery}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={id:o,exports:{}};return e[o](r,r.exports,n),r.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return function(){"use strict";n.d(o,{component:function(){return i}});var e=coreApis.utils.urls;const t=async e=>{if(document.URL.startsWith("https://live.bilibili.com")){const{touchLiveMiniPlayer:t}=await Promise.resolve().then(n.bind(n,304));await t(e)}else{const{touchVideoMiniPlayer:t}=await Promise.resolve().then(n.bind(n,47));await t(e)}},i={name:"touchMiniPlayer",displayName:"迷你播放器触摸拖动",description:{"zh-CN":"使迷你播放器的拖动条可以触摸拖动."},enabledByDefault:navigator.maxTouchPoints>0,tags:[componentsTags.touch],urlInclude:[...e.videoAndBangumiUrls,...e.liveUrls],entry:()=>t(!0),reload:()=>t(!0),unload:()=>t(!1),options:{touchMoveDistance:{displayName:"拖动触发最小距离",defaultValue:10,hidden:!0}},commitHash:"115c9d61e8c64d705cd1287b4408e1e329e968d4"}}(),o=o.component}()}));