!function(){function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var c=null!=arguments[n]?arguments[n]:{};n%2?e(Object(c),!0).forEach((function(e){r(t,e,c[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(c)):e(Object(c)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(c,e))}))}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}System.register(["./vendor-legacy.ef7e4f2e.js"],(function(e){"use strict";var r,n,c,o,i,u,a,s,l,f;return{setters:[function(e){r=e.L,n=e.a7,c=e.a8,o=e.g,i=e.j,u=e.i,a=e.e,s=e.w,l=e.o,f=e.s}],execute:function(){var p={id:"project"},j={class:"head"},b=u("div",{class:"title"},[u("h1",null,"项目管理器")],-1),O={class:"menu"},d=u("span",{class:"iconfont icon-database-fill"},null,-1),v=f(" 项目 "),y=u("span",{class:"iconfont icon-plus-square-fill"},null,-1),g=f(" 导入 ");e("default",r(t(t({},{name:"Project"}),{},{setup:function(e){var t=n();return"project"===c().name&&t.replace("/project/list"),function(e,t){var r=o("router-link"),n=o("router-view");return l(),i("div",p,[u("div",j,[b,u("div",O,[a(r,{to:"/project/list"},{default:s((function(){return[d,v]})),_:1}),a(r,{to:"/project/add"},{default:s((function(){return[y,g]})),_:1})])]),a(n,{class:"routerView"})])}}})))}}}))}();