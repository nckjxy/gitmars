"use strict";const r=require("fs"),e=require("colors");module.exports={warning:function(r){return e.yellow(r)},error:function(r){return e.red(r)},success:function(r){return e.green(r)},writeFile:function(e,n){return new Promise(((t,i)=>{r.writeFile(e,n,(r=>{r?i(new Error("文件写入错误")):t(!0)}))}))},createArgs:function(r){const e=[];return r.forEach((r=>{let n=r.name;r.variadic&&(n+="..."),n=r.required?"<"+n+">":"["+n+"]",e.push(n)})),e.join(" ")}};