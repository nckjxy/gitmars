var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,l=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a;import{M as n,aa as c,ab as i,g as p,o as u,j as f,i as d,e as j,w as b,q as v}from"./vendor.e07efed3.js";const O={id:"project"},m={class:"head"},y=d("div",{class:"title"},[d("h1",null,"项目管理器")],-1),w={class:"menu"},P=d("span",{class:"iconfont icon-database-fill"},null,-1),g=v(" 项目 "),h=d("span",{class:"iconfont icon-plus-square-fill"},null,-1),q=v(" 导入 ");const _=n((k=((e,t)=>{for(var r in t||(t={}))o.call(t,r)&&l(e,r,t[r]);if(a)for(var r of a(t))s.call(t,r)&&l(e,r,t[r]);return e})({},{name:"Project"}),t(k,r({setup:function(e){const t=c();return"project"===i().name&&t.replace("/project/list"),(e,t)=>{const r=p("router-link"),a=p("router-view");return u(),f("div",O,[d("div",m,[y,d("div",w,[j(r,{to:"/project/list"},{default:b((()=>[P,g])),_:1}),j(r,{to:"/project/add"},{default:b((()=>[h,q])),_:1})])]),j(a,{class:"routerView"})])}}}))));var k;export{_ as default};
