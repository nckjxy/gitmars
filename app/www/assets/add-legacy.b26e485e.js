!function(){function t(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function e(e){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?t(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):t(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e,n,r,a,o,c){try{var i=t[o](c),d=i.value}catch(u){return void n(u)}i.done?e(d):Promise.resolve(d).then(r,a)}var a=document.createElement("style");a.innerHTML=".project-add .content[data-v-3583e60d]{padding:30px;width:800px;height:calc(100% - 110px);margin:0 auto;display:flex;flex-direction:column}.project-add .content h2[data-v-3583e60d]{color:#6a8bad;font-size:16px;line-height:50px}.project-add .content .fold[data-v-3583e60d]{margin-bottom:80px}.project-add .content .fold input[data-v-3583e60d]{background:#3a5169;color:#fff;width:100%;border:0;padding:16px;height:24px;line-height:24px}.project-add .content .btn[data-v-3583e60d]{text-align:center}.project-add .content .btn a[data-v-3583e60d]{display:inline-block;font-size:16px;padding:10px 20px;background:#42b983}.project-add .content .btn a[data-v-3583e60d]:hover,.project-add .content .btn a[data-v-3583e60d]:active{background:#70cca2}\n",document.head.appendChild(a),System.register(["./vendor-legacy.9417a21f.js","./use-current-instance-legacy.6c28e2e1.js","./index-legacy.21ab74de.js"],(function(t){"use strict";var n,a,o,c,i,d,u,p,s,l,f,h,v,b,g;return{setters:[function(t){n=t.L,a=t.a7,o=t.a8,c=t.r,i=t.o,d=t.i,u=t.h,p=t.J,s=t.ac,l=t.u,f=t.s,h=t.v,v=t.p},function(t){b=t.u},function(t){g=t._}],execute:function(){var x=function(t){return f("data-v-3583e60d"),t=t(),h(),t},m={class:"project-add"},j={class:"content"},y=x((function(){return u("h2",null,"导入项目",-1)})),w={class:"fold"},O=[x((function(){return u("span",{class:"iconfont icon-plus-square-fill"},null,-1)})),v(" 导入该项目 ")];var P=n(e(e({},{name:"ProjectAdd"}),{},{setup:function(t,e){var n=e.expose,f=b().globalProperties,h=f.$axios,v=f.$box,g=a();o();var x=c({path:"/Users/saqqdy/www/saqqdy/gitmars"}),P=function(){var t,e=(t=regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return x.path||alert("请输入项目完整路径"),t.next=3,new Promise((function(t,e){h({url:"/common/project/check",data:{path:x.path}}).then((function(e){var n=e.data,r=(n=void 0===n?{}:n).code,a=n.message;0!==r?(v(null,{width:"320px",height:"80px",message:a,showHeader:!1,showMax:!1,showBtn:!1}),t(!1)):t(!0)})).finally((function(){t(!1)}))}));case 3:if(t.t0=t.sent,!t.t0){t.next=6;break}h({url:"/common/project/add",type:"post",data:{path:x.path}}).then((function(){v(null,{width:"320px",height:"80px",message:"操作成功！",showHeader:!1,showMax:!1,showBtn:!1}),g.push("/project/list")}));case 6:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,o){var c=t.apply(e,n);function i(t){r(c,a,o,i,d,"next",t)}function d(t){r(c,a,o,i,d,"throw",t)}i(void 0)}))});return function(){return e.apply(this,arguments)}}();return n({form:x,add:P}),function(t,e){return i(),d("div",m,[u("div",j,[y,u("div",w,[p(u("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=function(t){return l(x).path=t}),placeholder:"请输入项目完整路径"},null,512),[[s,l(x).path,void 0,{trim:!0}]])]),u("div",{class:"btn"},[u("a",{class:"link",href:"javascript:;",onClick:P,type:"button"},O)])])])}}}));t("default",g(P,[["__scopeId","data-v-3583e60d"]]))}}}))}();