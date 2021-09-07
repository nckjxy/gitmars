"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("shelljs");require("fs");var a=require("colors");require("slash"),require("cosmiconfig");var r=require("inquirer");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=t(e),o=t(a),n=t(r);const s=(e,{options:a,validator:r,transform:t},i)=>{if("checkbox"===i){if(!a.length)return null;let t={type:i,message:"请选择",name:e,choices:[],validate:e=>{if(r){let t=!0;return r(e,a,(e=>{e&&(t=e.message)})),t}return!0}};return a.forEach((e=>{t.choices.push({name:e.description,value:e.long,checked:e.recommend})})),t}if("input"===i){let e=[];return a.forEach((({validator:a,transformer:t,...i})=>{a&&(r=a);let n={type:"input",name:i.name,message:`${i.description||"请输入参数"+i.name+"的值"}${i.required?"":(s="(可不填"+(["",void 0].includes(i.defaultValue)?"":'，默认"'+i.defaultValue+'"')+")",o.default.yellow(s))}`,transformer:(e,a,r)=>t?t instanceof Function?t(e,a,r,i):void 0:e,validate:e=>{let a=!0;return!e&&i.required&&(a="请填写"+i.description),r&&!0===a&&r(e,i,(e=>{e&&(a=e.message)})),a}};var s;""!==i.defaultValue&&(n.defaultValue=i.defaultValue),e.push(n)})),e}},d=async({command:e,args:a,options:r,validatorOpts:t,validatorArgs:i,transformOpts:o,transformArgs:d})=>{let l=[],u=[];if(r.length>0){if(r.some((e=>!e.optional&&!e.required||!e.recommend))){const a=await n.default.prompt(s(e,{options:r,validator:t,transform:o},"checkbox")),{[e]:i}=a;i.forEach((e=>{let a=r.find((a=>a.long===e));a.optional||a.required?u.push({required:a.required,name:a.long,variadic:!1,defaultValue:a.defaultValue,description:a.description}):l.push(e)}))}else u=r.map((e=>({required:e.required,name:e.long,variadic:!1,defaultValue:e.defaultValue,description:e.description})))}if(a.length>0){const r=await n.default.prompt(s(e,{options:a,validator:i,transform:d},"input"));l=[].concat(Object.values(r)).concat(l)}if(u.length>0){const a=await n.default.prompt(s(e,{options:u},"input"));let r=Object.entries(a).map((e=>(""!==e[1]&&(e[1]='"'+e[1]+'"'),e)));l=l.concat(r.flat(1/0))}return Promise.resolve(`${l.join(" ").replace(/\s+/g," ").trim()}`)},l=(e,a={})=>{const{delOptions:r=[],requiredOptions:t=[],delArgs:i=[],requiredArgs:o=[]}=a;if(r.length){let a=e.options.length;for(;a--;)r.includes(e.options[a].long)&&e.options.splice(a,1)}if(i.length){let a=e.args.length;for(;a--;)i.includes(e.args[a].name)&&e.args.splice(a,1)}if(t.length){let a=e.options.length;for(;a--;)t.includes(e.options[a].long)&&(e.options[a].required=!0)}if(o.length){let a=e.args.length;for(;a--;)o.includes(e.args[a].name)&&(e.args[a].required=!0)}return e},u={command:"combine",short:"cb",args:[{required:!1,name:"type",variadic:!1,description:"分支类型"},{required:!1,name:"name",variadic:!1,description:"分支名称(不带feature/bugfix前缀)"}],options:[{flags:"-d, --dev",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-d",long:"--dev",negate:!1,description:"同步到dev环境",defaultValue:!1,value:!0,recommend:!0},{flags:"-p, --prod",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-p",long:"--prod",negate:!1,description:"同步到prod环境",defaultValue:!1,value:!1,recommend:!1},{flags:"-b, --build [build]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-b",long:"--build",negate:!1,description:"构建应用",value:"all",recommend:!0},{flags:"-m, --commit <commit>",required:!0,optional:!1,variadic:!1,mandatory:!1,short:"-m",long:"--commit",negate:!1,description:"执行commit，需填写信息",defaultValue:"",recommend:!1},{flags:"-a, --add",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-a",long:"--add",negate:!1,description:"执行add",defaultValue:!1,recommend:!1},{flags:"--no-bugfix",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--no-bugfix",negate:!0,description:"bug分支合并到release时不合并到bug分支",defaultValue:!0,recommend:!1},{flags:"--as-feature",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--as-feature",negate:!1,description:"bug分支合并到release",recommend:!1}],validatorOpts:(e,a,r)=>{e.includes("--dev")||e.includes("--prod")?e.includes("--add")&&!e.includes("--commit")||!e.includes("--add")&&e.includes("--commit")?r(new Error("add和commit需要同时选择")):r():r(new Error("合并dev或者prod必须至少选一个"))},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},c={command:"end",short:"ed",args:[{required:!1,name:"type",variadic:!1,description:"分支类型"},{required:!1,name:"name",variadic:!1,description:"分支名称(不带feature/bugfix前缀)"}],options:[]},m={command:"update",short:"up",args:[{required:!1,name:"type",variadic:!1,description:"分支类型"},{required:!1,name:"name",variadic:!1,description:"分支名称(不带feature/bugfix前缀)"}],options:[{flags:"--use-merge",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--use-merge",negate:!1,description:"使用merge方式更新(默认merge)",defaultValue:!0,recommend:!0},{flags:"--use-rebase",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--use-rebase",negate:!1,description:"使用rebase方式更新(默认merge)",defaultValue:!1,recommend:!0},{flags:"-a --all",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-a",long:"--all",negate:!1,description:"更新本地所有bugfix、feature、support分支",defaultValue:!1,recommend:!1}]},p={command:"branch",short:"bh",args:[],options:[{flags:"-k, --key [keyword]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-k",long:"--key",negate:!1,description:"查询分支的关键词",defaultValue:null},{flags:"-r, --remote",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-r",long:"--remote",negate:!1,description:"是否查询远程分支（这个参数不用于删除分支）默认只查询本地",defaultValue:!1},{flags:"-t, --type [type]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-t",long:"--type",negate:!1,description:"查询分支的类型，共有3种：feature、bugfix、support，不传则查询全部",defaultValue:null},{flags:"-d, --delete [branch]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-d",long:"--delete",negate:!1,description:"删除分支",defaultValue:null},{flags:"-D, --forcedelete [branch]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-D",long:"--forcedelete",negate:!1,description:"强行删除分支",defaultValue:null},{flags:"-u, --upstream [upstream]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-u",long:"--upstream",negate:!1,description:"设置与远程分支关联"}],validatorOpts:(e,a,r)=>{e.includes("--upstream")&&(e.includes("--key")||e.includes("--remote")||e.includes("--type")||e.includes("--delete")||e.includes("--forcedelete"))?r(new Error("使用绑定/取消绑定远程分支功能时，不能与其他功能混用")):!e.includes("--delete")&&!e.includes("--forcedelete")||!e.includes("--key")&&!e.includes("--type")?r():r(new Error("使用删除分支功能时，不能与查询分支功能混用"))},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},g={command:"build",short:"bd",args:[{required:!0,name:"project",variadic:!1,description:"项目名称"}],options:[{flags:"-e, --env [env]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-e",long:"--env",negate:!1,description:"构建环境，可选dev、prod、bug、all",defaultValue:"dev",recommend:!0},{flags:"-a, --app [app]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-a",long:"--app",negate:!1,description:"构建应用",defaultValue:"all",recommend:!0}]},f={command:"start",short:"st",args:[{required:!0,name:"type",variadic:!1,description:"分支类型"},{required:!0,name:"name",variadic:!1,description:"分支名称(不带feature/bugfix前缀)"}],options:[]},v={command:"copy",short:"cp",args:[{required:!0,name:"from",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"来源分支"},{required:!1,name:"commitid",variadic:!0,validator:(e,a,r)=>{r()},description:"提交记录ID"}],options:[{flags:"-k, --key [keyword]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-k",long:"--key",negate:!1,description:"模糊搜索commit信息关键词",defaultValue:""},{flags:"-a, --author [author]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-a",long:"--author",negate:!1,description:"提交者",defaultValue:""}],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},y={command:"get",short:"gt",args:[{required:!1,name:"message",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"存取关键字"},{required:!1,name:"index",variadic:!1,description:"序号"}],options:[{flags:"-k, --keep [keep]",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-k",long:"--keep",negate:!1,description:"保留暂存区不删除",defaultValue:!1}],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},h={command:"save",short:"sv",args:[{required:!1,name:"message",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"存取关键字"}],options:[{flags:"-f, --force",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-f",long:"--force",negate:!1,description:"没有版本的文件也暂存，这会执行git add .",defaultValue:!1}],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},q={command:"revert",short:"rt",args:[{required:!1,name:"commitid",variadic:!1,validator:(e,a,r)=>{r()},description:"需要撤销的ID"}],options:[{flags:"-n, --number [number]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-n",long:"--number",negate:!1,description:"撤销最后一次提交（或者撤销倒数第n次提交）",defaultValue:""},{flags:"-m, --mode [mode]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-m",long:"--mode",negate:!1,description:"针对撤销一次merge记录，需要传入类型：1 = 保留当前分支代码，2 = 保留传入代码",defaultValue:""}],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},b={command:"link",short:null,args:[{required:!1,name:"name",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"包的名称"}],options:[]},x={command:"unlink",short:null,args:[{required:!1,name:"name",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"包的名称"}],options:[]},w={command:"postmsg",short:null,args:[{required:!0,name:"message",variadic:!1}],options:[{flags:"-u, --url [url]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-u",long:"--url",negate:!1,description:"推送消息的api地址",defaultValue:""}],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},V={command:"admin",short:null,create:{command:"create",short:null,args:[{required:!0,name:"type",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"分支类型"}],options:[],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},publish:{command:"publish",short:null,args:[{required:!0,name:"type",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"分支类型"}],options:[{flags:"-c, --combine",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-c",long:"--combine",negate:!1,description:"是否把release代码同步到bug",defaultValue:!1,recommend:!1},{flags:"--use-rebase",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--use-rebase",negate:!1,description:"是否使用rebase方式更新，默认merge",defaultValue:!1,recommend:!1},{flags:"-p, --prod",required:!1,optional:!1,variadic:!1,mandatory:!1,short:"-p",long:"--prod",negate:!1,description:"发布bug分支时，是否合并bug到master",defaultValue:!1,recommend:!1},{flags:"-b, --build [build]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-b",long:"--build",negate:!1,description:"构建应用",recommend:!0},{flags:"--postmsg",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--postmsg",negate:!1,description:"发送消息",defaultValue:!1,recommend:!1}],validatorOpts:(e,a,r)=>{e.includes("--combine")&&e.includes("--prod")?r(new Error("不能同时选择“把release合并到bug”和“合并bug到master”")):r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},update:{command:"update",short:null,args:[{required:!0,name:"type",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"分支类型"}],options:[{flags:"--use-rebase",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--use-rebase",negate:!1,description:"是否使用rebase方式更新，默认merge",defaultValue:!1,recommend:!1},{flags:"-m, --mode [mode]",required:!1,optional:!0,variadic:!1,mandatory:!1,short:"-m",long:"--mode",negate:!1,description:"出现冲突时，保留传入代码还是保留当前代码；1=采用当前 2=采用传入；默认为 0=手动处理。本参数不可与--use-rebase同时使用",defaultValue:0,recommend:!1},{flags:"--postmsg",required:!1,optional:!1,variadic:!1,mandatory:!1,long:"--postmsg",negate:!1,description:"发送消息",defaultValue:!1,recommend:!1}],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}},clean:{command:"clean",short:null,args:[{required:!0,name:"type",variadic:!1,validator:(e,a,r)=>{/\s+/.test(e)?r(new Error("请不要输入空格")):r()},description:"分支类型"}],options:[],validatorOpts:(e,a,r)=>{r()},validatorArgs:(e,a,r)=>{r()},transformOpts:(e,a,r)=>{r()},transformArgs:(e,a,r)=>{r()}}},A=V.create,O=V.publish,k=V.update,E=V.clean,j=i.default.exec("git symbolic-ref --short -q HEAD",{silent:!0}).stdout.replace(/[\n\s]*$/g,"").split("/")[0],D=["feature","bugfix","support"],$={create:async()=>{const e=l(A),a="gitm admin create "+await d(e);i.default.exec(a)},publish:async()=>{const e=l(O),a="gitm admin publish "+await d(e);i.default.exec(a)},update:async()=>{const e=l(k),a="gitm admin update "+await d(e);i.default.exec(a)},clean:async()=>{const e=l(E),a="gitm admin clean "+await d(e);i.default.exec(a)}};exports.admin=$,exports.branch=async()=>{const e=l(p),a="gitm branch "+await d(e);i.default.exec(a)},exports.build=async()=>{const e=l(g),a="gitm build "+await d(e);i.default.exec(a)},exports.combine=async()=>{let e=[],a=[],r=[];if(D.includes(j))switch(a=["type","name"],j){case"feature":case"support":e=["--as-feature"]}else e=["--as-feature","--no-bugfix"],r=["type","name"];const t=l(u,{delOptions:e,requiredOptions:[],delArgs:a,requiredArgs:r}),o="gitm combine "+await d(t);i.default.exec(o)},exports.copy=async()=>{const e=l(v),a="gitm copy "+await d(e);i.default.exec(a)},exports.end=async()=>{let e=[],a=[];D.includes(j)?e=["type","name"]:a=["type","name"];const r=l(c,{delArgs:e,requiredArgs:a}),t="gitm end "+await d(r);i.default.exec(t)},exports.get=async()=>{const e=l(y),a="gitm get "+await d(e);i.default.exec(a)},exports.link=async()=>{const e=l(b),a="gitm link "+await d(e);i.default.exec(a)},exports.postmsg=async()=>{const e=l(w),a="gitm postmsg "+await d(e);i.default.exec(a)},exports.revert=async()=>{const e=l(q),a="gitm revert "+await d(e);i.default.exec(a)},exports.save=async()=>{const e=l(h),a="gitm save "+await d(e);i.default.exec(a)},exports.start=async()=>{const e=l(f),a="gitm start "+await d(e);i.default.exec(a)},exports.unlink=async()=>{const e=l(x),a="gitm unlink "+await d(e);i.default.exec(a)},exports.update=async()=>{let e=[],a=[];D.includes(j)?e=["type","name"]:a=["type","name"];const r=l(m,{delArgs:e,requiredArgs:a}),t="gitm update "+await d(r);i.default.exec(t)};