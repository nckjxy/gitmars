#!/usr/bin/env ts-node
import { program } from 'commander'
import dayjs from 'dayjs'
import inquirer from 'inquirer'
import sh from 'shelljs'
import chalk from 'chalk'
import { queue } from '@gitmars/core/lib/queue'
import getIsGitProject from '@gitmars/core/lib/git/getIsGitProject'
import getCurrentBranch from '@gitmars/core/lib/git/getCurrentBranch'
import { createArgs } from '@gitmars/core/lib/utils/command'
import echo from '@gitmars/core/lib/utils/echo'
import {
    delRevertCache,
    getRevertCache
} from '@gitmars/core/lib/cache/revertCache'
import type {
    CommandType,
    GitmarsOptionOptionsType,
    InitInquirerPromptType,
    RevertCacheType
} from '../typings'
import redoConfig from '#lib/conf/redo'
import i18n from '#lib/locales/index'

const { blue, green, red, yellow } = chalk
const { args, options } = redoConfig

if (!getIsGitProject()) {
    sh.echo(
        red(i18n.__('The current directory is not a git project directory'))
    )
    process.exit(1)
}

interface GitmBuildOption {
    branch?: string
    mode?: 1 | 2
}

/**
 * gitm redo
 */
program
    .name('gitm redo')
    .usage('[commitid...] [-m --mode [mode]]')
    .description(i18n.__('Undo a commit record'))
if (args.length > 0) program.arguments(createArgs(args))
options.forEach((o: GitmarsOptionOptionsType) => {
    program.option(o.flags, o.description, o.defaultValue)
})
// .arguments('[commitid...]')
// .option('-m, --mode [mode]', i18n.__('For undoing a merge record, the type to be passed in: 1 = keep current branch code, 2 = keep incoming code'), null)
program.action(async (commitid: string[], opt: GitmBuildOption) => {
    const current = getCurrentBranch()
    let revertCache: RevertCacheType[] = getRevertCache(current),
        cmd: Array<CommandType | string> = [],
        commitIDs: string[] = [], // 需要恢复的commitID
        mode = ''
    mode = ' -m ' + Math.abs(Number(opt.mode || 1))
    if (commitid.length > 0) {
        // 传入了commitIDs
        revertCache = revertCache.filter(item =>
            commitid.some(id => item.after['%H']!.includes(id))
        )
    }
    // 没有查询到日志
    if (revertCache.length === 0) {
        // 没有查找到任何记录
        echo(yellow('没有找到可恢复的撤销记录，进程已退出'))
        process.exit(0)
    }
    // 多条记录
    const prompt: InitInquirerPromptType = {
        type: 'checkbox',
        message: i18n.__('Please select the undo record to restore'),
        name: 'commitIDs',
        choices: []
    }
    revertCache.forEach(({ after }, index) => {
        const _time = dayjs(after['%aI']).format('YYYY/MM/DD HH:mm')
        prompt.choices.push({
            name: `${green(index + 1 + '.')} ${green(after['%s'])} | ${yellow(
                after['%an']
            )} | ${blue(_time)}`,
            value: after['%H'],
            checked: false
        })
    })
    commitIDs = (await inquirer.prompt(prompt)).commitIDs
    // 没有选择任何记录
    if (commitIDs.length === 0) {
        echo(yellow('没有选择任何记录，进程已退出'))
        process.exit(0)
    }
    // 筛选被选择的记录
    revertCache = revertCache.filter(item =>
        commitIDs.includes(item.after['%H']!)
    )
    cmd = revertCache.map(item => ({
        cmd: `git revert -s --no-edit ${item.after['%H']}${mode}`,
        config: {
            again: false,
            success: `撤销成功：${item.after['%s']}`,
            fail: i18n.__(
                'An error has occurred, please follow the instructions'
            )
        }
    }))
    // 执行
    queue(cmd).then(() => {
        delRevertCache(commitIDs)
    })
})
program.parse(process.argv)
export {}
