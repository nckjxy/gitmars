(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{455:function(t,i,a){"use strict";a.r(i);var r=a(30),e=Object(r.a)({},(function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/saqqdy/gitmars/master/static/img/logo.png",alt:"logo.png"}})]),t._v(" "),a("p",[a("a",{attrs:{href:"https://npmjs.org/package/gitmars",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/npm/v/gitmars.svg?style=flat-square",alt:"NPM version"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://travis-ci.com/saqqdy/gitmars",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://travis-ci.com/saqqdy/gitmars.svg?branch=master",alt:"build status"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://codecov.io/github/saqqdy/gitmars?branch=master",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/codecov/c/github/saqqdy/gitmars.svg?style=flat-square",alt:"Test coverage"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://david-dm.org/saqqdy/gitmars",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/david/saqqdy/gitmars.svg?style=flat-square",alt:"David deps"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://snyk.io/test/npm/gitmars",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://snyk.io/test/npm/gitmars/badge.svg?style=flat-square",alt:"Known Vulnerabilities"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://npmjs.org/package/gitmars",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/npm/dm/gitmars.svg?style=flat-square",alt:"npm download"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"LICENSE"}},[a("img",{attrs:{src:"https://img.shields.io/badge/License-MIT-yellow.svg",alt:"License"}})])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://sonarcloud.io/dashboard?id=saqqdy_gitmars",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_gitmars",alt:"Sonar"}}),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"它是如何工作的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#它是如何工作的"}},[t._v("#")]),t._v(" 它是如何工作的")]),t._v(" "),a("p",[t._v("周一-周三发布小版本，只修复 bug 不涉及功能迭代，从 bug 线拉取 bugfix/xxxx 分支，开发完成后提测合并到 bug 分支。并且在每天凌晨 5 点会同步代码到 release；周四-周五发布大版本，包含新功能和 bug 修复，从 release 线拉取 feature/xxxx 分支，开发完成后合并到 release 分支。并且在每天凌晨 5 点会同步代码到 bug 线。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("1. gitmars每一个子命令都带了help功能，可输入 gitm [command] --help 获取对应指令的帮助\n2. <type>意思是type必传；[type]意思是type选填；[-a --app [app]]其中-a是--app的简写，后面[app]指的是-a后面的传值\n")])])]),a("h2",{attrs:{id:"工作流展示"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作流展示"}},[t._v("#")]),t._v(" 工作流展示")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/saqqdy/gitmars/master/static/img/gitmars-branch.png",alt:"gitmars.png"}})]),t._v(" "),a("h2",{attrs:{id:"有哪些功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#有哪些功能"}},[t._v("#")]),t._v(" 有哪些功能")]),t._v(" "),a("ul",[a("li",[t._v("初始化 gitmars 配置 "),a("RouterLink",{attrs:{to:"/api/#gitm-init"}},[t._v("gitm init")])],1),t._v(" "),a("li",[t._v("查看/设置 gitmars 的配置项 "),a("RouterLink",{attrs:{to:"/api/#gitm-config"}},[t._v("gitm config")])],1),t._v(" "),a("li",[t._v("分支阶段提测 "),a("RouterLink",{attrs:{to:"/api/#gitm-combine"}},[t._v("gitm combine")])],1),t._v(" "),a("li",[t._v("创建 bugfix 分支、创建/合并 release 分支 "),a("RouterLink",{attrs:{to:"/api/#gitm-start"}},[t._v("gitm start")])],1),t._v(" "),a("li",[t._v("完成开发某项功能 "),a("RouterLink",{attrs:{to:"/api/#gitm-end"}},[t._v("gitm end")])],1),t._v(" "),a("li",[t._v("更新 bug 任务分支、更新 feature 功能开发分支 "),a("RouterLink",{attrs:{to:"/api/#gitm-update"}},[t._v("gitm update")])],1),t._v(" "),a("li",[t._v("分支操作 "),a("RouterLink",{attrs:{to:"/api/#gitm-branch"}},[t._v("gitm branch")])],1),t._v(" "),a("li",[t._v("暂存当前分支文件 "),a("RouterLink",{attrs:{to:"/api/#gitm-save"}},[t._v("gitm save")])],1),t._v(" "),a("li",[t._v("恢复暂存区最近一次暂存的文件 "),a("RouterLink",{attrs:{to:"/api/#gitm-get"}},[t._v("gitm get")])],1),t._v(" "),a("li",[t._v("简化 git 的 cherry-pick 操作 "),a("RouterLink",{attrs:{to:"/api/#gitm-copy"}},[t._v("gitm copy")])],1),t._v(" "),a("li",[t._v("合并代码 "),a("RouterLink",{attrs:{to:"/api/#gitm-merge"}},[t._v("gitm merge")])],1),t._v(" "),a("li",[t._v("继续未完成的操作 "),a("RouterLink",{attrs:{to:"/api/#gitm-continue"}},[t._v("gitm continue")])],1),t._v(" "),a("li",[t._v("撤销提交 "),a("RouterLink",{attrs:{to:"/api/#gitm-revert"}},[t._v("gitm revert")])],1),t._v(" "),a("li",[t._v("撤回某次提交记录或者撤回谋条分支的合并记录 "),a("RouterLink",{attrs:{to:"/api/#gitm-undo"}},[t._v("gitm undo")])],1),t._v(" "),a("li",[t._v("重做某次提交记录或者重做谋条分支的合并记录 "),a("RouterLink",{attrs:{to:"/api/#gitm-redo"}},[t._v("gitm redo")])],1),t._v(" "),a("li",[t._v("升级 gitmars "),a("RouterLink",{attrs:{to:"/api/#gitm-upgrade"}},[t._v("gitm upgrade")])],1),t._v(" "),a("li",[t._v("构建 Jenkins "),a("RouterLink",{attrs:{to:"/api/#gitm-build"}},[t._v("gitm build")])],1),t._v(" "),a("li",[t._v("解除软链接 "),a("RouterLink",{attrs:{to:"/api/#gitm-unlink"}},[t._v("gitm unlink")])],1),t._v(" "),a("li",[t._v("软链接 "),a("RouterLink",{attrs:{to:"/api/#gitm-link"}},[t._v("gitm link")])],1),t._v(" "),a("li",[t._v("清除缓存 "),a("RouterLink",{attrs:{to:"/api/#gitm-clean"}},[t._v("gitm clean")])],1),t._v(" "),a("li",[t._v("推送云之家消息 "),a("RouterLink",{attrs:{to:"/api/#gitm-postmsg"}},[t._v("gitm postmsg")])],1),t._v(" "),a("li",[t._v("提交权限 "),a("RouterLink",{attrs:{to:"/api/#gitm-permission"}},[t._v("gitm permission")])],1),t._v(" "),a("li",[t._v("git 钩子指令 "),a("RouterLink",{attrs:{to:"/api/#gitm-hook"}},[t._v("gitm hook")])],1),t._v(" "),a("li",[t._v("git 钩子运行指令 "),a("RouterLink",{attrs:{to:"/api/#gitm-run"}},[t._v("gitm run")])],1),t._v(" "),a("li",[t._v("查询日志 "),a("RouterLink",{attrs:{to:"/api/#gitm-log"}},[t._v("gitm log")])],1),t._v(" "),a("li",[t._v("智能猜测你要执行的动作 "),a("RouterLink",{attrs:{to:"/api/#gitm-go"}},[t._v("gitm go")])],1),t._v(" "),a("li",[t._v("UI 可视化操作 "),a("RouterLink",{attrs:{to:"/api/#gitm-ui"}},[t._v("gitm ui")])],1),t._v(" "),a("li",[t._v("管理员创建主干分支 "),a("RouterLink",{attrs:{to:"/api/#gitm-admin-create"}},[t._v("gitm admin create")])],1),t._v(" "),a("li",[t._v("发布分支 "),a("RouterLink",{attrs:{to:"/api/#gitm-admin-publish"}},[t._v("gitm admin publish")])],1),t._v(" "),a("li",[t._v("更新主干分支代码 "),a("RouterLink",{attrs:{to:"/api/#gitm-admin-update"}},[t._v("gitm admin update")])],1),t._v(" "),a("li",[t._v("清理分支 "),a("RouterLink",{attrs:{to:"/api/#gitm-admin-clean"}},[t._v("gitm admin clean")])],1),t._v(" "),a("li",[t._v("查看版本号 "),a("RouterLink",{attrs:{to:"/api/#gitm-version"}},[t._v("gitm version")])],1)]),t._v(" "),a("h2",{attrs:{id:"为什么不用-gitflow"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么不用-gitflow"}},[t._v("#")]),t._v(" 为什么不用 GitFlow")]),t._v(" "),a("p",[t._v("GitFlow 工作流不支持高频率发版")])])}),[],!1,null,null,null);i.default=e.exports}}]);