!function(){function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var c=null!=arguments[n]?arguments[n]:{};n%2?e(Object(c),!0).forEach((function(e){r(t,e,c[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(c)):e(Object(c)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(c,e))}))}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}System.register(["./vendor/vue-router_4.0.12.js-legacy.62dde50d.js","./vendor/vue_3.2.20.js-legacy.970f989e.js"],(function(e){"use strict";var r,n,c,o,u,i,s,a,l,f;return{setters:[function(e){r=e.u,n=e.b},function(e){c=e.q,o=e.R,u=e.x,i=e.y,s=e.B,a=e.U,l=e.O,f=e.a3}],execute:function(){var p={id:"project"},j={class:"head"},b=s("div",{class:"title"},[s("h1",null,"项目管理器")],-1),d={class:"menu"},O=s("span",{class:"iconfont icon-database-fill"},null,-1),v=f(" 项目 "),y=s("span",{class:"iconfont icon-plus-square-fill"},null,-1),g=f(" 导入 ");e("default",c(t(t({},{name:"Project"}),{},{setup:function(e){var t=r();return"project"===n().name&&t.replace("/project/list"),function(e,t){var r=o("router-link"),n=o("router-view");return u(),i("div",p,[s("div",j,[b,s("div",d,[a(r,{to:"/project/list"},{default:l((function(){return[O,v]})),_:1}),a(r,{to:"/project/add"},{default:l((function(){return[y,g]})),_:1})])]),a(n,{class:"routerView"})])}}})))}}}))}();