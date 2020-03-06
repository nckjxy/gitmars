#!/usr/bin/env node
const program = require('commander')
const sh = require('shelljs')
const { error, success, queue, pwd } = require('./index')
/**
 * gitm revert
 */
program
	.name('gitm revert')
	.usage('[commitid] [-n --number [number]]')
	.arguments('[commitid]')
	.description('撤销一次提交记录')
	.option('-n, --number [number]', '撤销最后一次提交（或者撤销倒数第n次提交）', 1)
	.action((commitid, opt) => {
		let cmd = []
		if (opt.number !== '') {
			let n = Math.abs(Number(opt.number)),
				set = 'HEAD'
			if (n > 1) set += '~' + (n - 1)
			cmd.push({ cmd: `git revert ${set}`, config: { slient: false, again: true, success: '撤销成功', fail: '出错了，请根据提示处理' } })
		} else {
			cmd.push({ cmd: `git revert ${commitid}`, config: { slient: false, again: true, success: '撤销成功', fail: '出错了，请根据提示处理' } })
		}
		queue(cmd)
	})
program.parse(process.argv)