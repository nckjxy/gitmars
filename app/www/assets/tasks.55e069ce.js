import{u as a,b as s,o as t}from"./vendor/vue-router_4.0.12.js.c21f23ca.js";import{X as r}from"./index.9cb24d1f.js";import{_ as e,T as n,S as o}from"./index.4936dfd2.js";import{u as d}from"./use-current-instance.7f019932.js";import{k as i,p as c,c as p,d as j,E as m,v as l,J as u,A as v,K as f,F as _,a0 as b,I as h,O as y,z as k,a4 as x,ag as g,ah as w,s as I,P as C}from"./vendor/vue_3.2.23.js.2057d383.js";import"./vendor/element-plus_1.2.0-beta.4.js.16579006.js";import"./vendor/lodash_4.17.21.js.c6f7cdcc.js";import"./vendor/xterm_4.15.0.js.3e95bd6a.js";import"./vendor/dayjs_1.10.7.js.c37b32ae.js";import"./vendor/async-validator_4.0.7.js.656181ea.js";import"./vendor/axios_0.24.0.js.52256a15.js";import"./vendor/qs_6.10.1.js.0baad282.js";import"./vendor/side-channel_1.0.4.js.290c0f4d.js";import"./vendor/get-intrinsic_1.1.1.js.d604dad5.js";import"./vendor/has-symbols_1.0.2.js.208f1d3f.js";import"./vendor/function-bind_1.1.1.js.34bf890b.js";import"./vendor/has_1.0.3.js.e7f09f2c.js";import"./vendor/call-bind_1.0.2.js.ad02ab55.js";import"./vendor/object-inspect_1.11.0.js.ad22ecab.js";import"./vendor/js-cool_2.3.0.js.13999879.js";import"./vendor/core-js_3.19.2.js.6f042051.js";import"./vendor/uuid_8.3.2.js.8656f24a.js";import"./vendor/xterm-style_1.1.0.js.323fb105.js";import"./vendor/xterm-addon-fit_0.5.0.js.e3a24a28.js";import"./vendor/xterm-addon-search_0.8.1.js.d370edfa.js";import"./vendor/xterm-addon-web-links_0.4.0.js.e4a83512.js";import"./vendor/vuex_4.0.2.js.c27c299e.js";const $={name:"ControlTasks",components:{Xterm:r},async setup(){const{getTerminal:r}=i(n,{}),{socket:e}=i(o,{}),{globalProperties:{$axios:m}}=d(),l=a(),u=s(),v=window.innerWidth,f=window.innerHeight,_=c({project:{id:"",name:"",path:""},scripts:[],terminal:{name:""},ready:!1}),b=p((()=>"tasks-"+_.project.id));j((()=>{})),t((()=>{}));const h=a=>{_.terminal&&e.emit(_.terminal.name+"-input",` ${a}\r`)};return _.project=await(async()=>(await m({url:"/common/project/list",data:{id:u.query.id}})).data)(),_.scripts=await(async()=>{const{data:{scripts:a}}=await m({url:"/cmd/fs/read",data:{path:`${_.project.path}/package.json`}});return a})(),await m({url:"/cmd/cd",data:{dir:_.project.path}}),_.terminal=r&&r(b.value,_.project.path,parseInt(String((v-60-300-32)/7.05)),parseInt(String((f-64-32-34)/17.6))),_.ready=!0,{data:_,terminalID:b,back:()=>{l.push("/project/list")},exec:h,run:a=>{h(`yarn run ${a}`)},route:u}}},S=a=>(g("data-v-46505152"),a=a(),w(),a),T={key:0,class:"page"},X=x(" tasks "),q=x("返回"),z={class:"cont"},D={class:"nav"},O={key:0,class:"bugfix"},P=S((()=>u("dt",null,"脚本指令",-1))),A=x("执行"),E={class:"main"},F=S((()=>u("span",null,[u("span",{class:"iconfont icon-layout"}),x(" 当前分支： ")],-1)));var H=e($,[["render",function(a,s,t,r,e,n){const o=m("v3-button"),d=m("Xterm");return r.data.ready?(I(),l("div",T,[u("h1",null,[X,u("p",null,[v(o,{type:"default",onClick:r.back},{default:f((()=>[q])),_:1},8,["onClick"])])]),u("div",z,[u("div",D,[Object.keys(r.data.scripts).length>0?(I(),l("dl",O,[P,(I(!0),l(_,null,b(r.data.scripts,((a,s)=>(I(),l("dd",{class:C({active:!1}),key:s},[x(y(s)+" ",1),v(o,{type:"primary",size:"mini",onClick:a=>r.run(s),plain:""},{default:f((()=>[A])),_:2},1032,["onClick"])])))),128))])):h("",!0)]),u("div",E,[u("h3",null,[F,u("p",null,y(r.data.project.path),1)]),r.data.project?(I(),k(d,{ref:"xterm",class:"xterm",key:"tasks-xterm",id:r.terminalID,path:r.data.project.path},null,8,["id","path"])):h("",!0)])])])):h("",!0)}],["__scopeId","data-v-46505152"]]);export{H as default};
