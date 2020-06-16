#!/usr/bin/env node
"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.function.name");

require("core-js/modules/es.regexp.exec");

var set = require('../package.json');

var program = require('commander');

var sh = require('shelljs');

var _require = require('./js/index'),
    error = _require.error;

var _require2 = require('./js/global'),
    system = _require2.system;

var isWindows = system.indexOf('MINGW') > -1;

if (!sh.which('git')) {
  sh.echo(error('gitmars只能在git环境下执行，请先安装git'));
  sh.exit(1);
}

program.version((isWindows ? '' : "\n e88~~  ,e,   d8                                         \nd888      \"  _d88__ 888-~88e-~88e   /~~~8e  888-~  d88~ \n8888 __  888  888   888  888  888       88b 888    C888   \n8888   | 888  888   888  888  888  e88~-888 888     Y88b  \nY888   | 888  888   888  888  888 C888  888 888      888D \n \"88__/  888  \"88_/ 888  888  888  \"88_-888 888    _88P  \n                                                          \n") + "v".concat(set.version, ", powered by saqqdy\n"), '-v, --version', '查看gitmars版本');
program.name('gitm').usage('[command] options').command('init', '初始化gitmars配置').command('config [options]', '查看/设置gitmars的配置项').command('combine', '分支阶段提测').alias('cb').command('start <type> <name>', '创建bugfix分支、创建/合并release分支').alias('st').command('end <type> <name>', '完成开发某项功能').alias('ed').command('update <type> <name>', '更新bug任务分支、更新feature功能开发分支').alias('up').command('branch', '列出分支列表').alias('bh').command('save', '暂存当前分支文件').alias('sv').command('get', '恢复暂存区最近一次暂存的文件').alias('gt').command('copy <id>', '简化git的cherry-pick操作').alias('cp').command('merge <name>', '合并代码').alias('mg').command('continue', '继续未完成的操作').alias('ct').command('revert', '撤销提交').alias('rt').command('upgrade', '升级gitmars').alias('ug').command('build', '构建Jenkins').alias('bd').command('clean', '提交权限').command('permission', '提交权限').command('admin <command>', '管理员功能，包含对发版分支bugfix、release的操作');
program.on('--help', function () {
  sh.echo('使用案例:');
  sh.echo('  $ gitm init');
  sh.echo('  $ gitm --help');
  sh.echo('  $ gitm -h');
});
program.on('command:*', function (types, opts) {
  var cmd = ['init', 'config', 'combine', 'cb', 'start', 'st', 'end', 'ed', 'update', 'up', 'branch', 'bh', 'save', 'sv', 'get', 'gt', 'copy', 'cp', 'merge', 'mg', 'continue', 'ct', 'revert', 'rt', 'upgrade', 'ug', 'build', 'bd', 'clean', 'permission', 'admin'];

  if (!cmd.includes(types[0])) {
    var arr = [].concat(types).concat(opts);
    sh.exec('git ' + arr.join(' '), {
      silent: false
    });
  }
});
program.parse(process.argv);