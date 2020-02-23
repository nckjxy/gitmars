#!/usr/bin/env node
const program = require('commander')
const sh = require('shelljs')
const { warning, success, defaults, config, configFrom, wait, queue, pwd } = require('./index')
/**
 * gitm combine
 */
program
	.name('gitm combine')
	.usage('<type> <name>')
	.arguments('<type> <name>')
	.description('创建bugfix任务分支、创建feature功能开发分支')
	.action((type, name) => {
		const opts = ['bugfix', 'feature'] // 允许执行的指令
		if (configFrom === 0) {
			sh.echo(warning('您还没有初始化项目\n请先执行: gitm init'))
			sh.exit(1)
		}
		if (opts.includes(type)) {
			queue(['git status']).then(d => {
				if (d.out.indexOf('Changes to be committed') > -1 || d.out.indexOf('Changes not staged for commit') > -1) {
					sh.echo(warning('您还有未提交的文件，请处理后再继续') + '\n如果需要暂存文件请执行: gitm save\n恢复时执行：gitm get')
					sh.exit(1)
				} else if (d.out.indexOf('Untracked files') > -1) {
					sh.echo(warning('您还有未加入版本的文件，请处理后再继续') + '\n如果需要暂存文件请执行: gitm save --force\n恢复时执行：gitm get')
					sh.exit(1)
				} else {
					// feature从release拉取，bugfix从bug拉取
					let base = type === 'bugfix' ? config.bugfix : config.release,
					cmd = [
						`cd ${pwd}`,
						`git checkout ${base}`,
						`git pull`,
						`git merge --no-ff ${type}/${name}`,
						`git push`,
						`git checkout ${type}/${name}`
					]
					queue(cmd).then(data => {
						data.forEach((el, index) => {
							if (index === 3 || index === 4) {
								if (el.code === 0) {
									sh.echo(success(index === 3 ? '分支合并成功！' : '推送远程成功!'))
								} else {
									sh.echo(warning(el.out))
								}
							}
							// if (el.code !== 0) {
							// 	sh.echo(warning('指令' + cmd[index] + '执行失败，请联系管理员'))
							// }
						})
					}).catch(err => {
						let last = err.result.pop()
						if (cmd.length - err.rest.length === 4) {
							// 执行到merge的时候中断
							sh.echo('合并过程出现了文件冲突\n' + warning(last.out))
							sh.echo('\n请解决冲突后吧文件加入暂存区，并继续执行以下指令：\n    ' + success(err.rest.join('\n    ')))
						}
					})
				}
			})
		} else {
			sh.echo(warning('type只允许输入：' + JSON.stringify(opts)))
			sh.exit(1)
		}
	})
program.parse(process.argv)