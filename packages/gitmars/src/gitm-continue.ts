#!/usr/bin/env ts-node
import type { CommandType, GitmarsOptionOptionsType } from '../typings'
const { program } = require('commander')
const sh = require('shelljs')
const { green, yellow, red } = require('chalk')
const inquirer = require('inquirer')
const { queue } = require('@gitmars/core/lib/queue')
const {
    getCommandCache,
    cleanCommandCache
} = require('@gitmars/core/lib/cache/commandCache')
const getIsGitProject = require('@gitmars/core/lib/git/getIsGitProject')
const getGitStatus = require('@gitmars/core/lib/git/getGitStatus')
const { createArgs } = require('@gitmars/core/lib/utils/command')
const { options, args } = require('./conf/continue')
const i18n = require('./locales')
if (!getIsGitProject()) {
    sh.echo(
        red(i18n.__('The current directory is not a git project directory'))
    )
    process.exit(1)
}
interface GitmBuildOption {
    list?: boolean
}

/**
 * gitm continue
 */
program
    .name('gitm continue')
    .usage('[-l --list]')
    .description(i18n.__('Continue unfinished operations'))
if (args.length > 0) program.arguments(createArgs(args))
options.forEach((o: GitmarsOptionOptionsType) => {
    program.option(o.flags, o.description, o.defaultValue)
})
// .option('-l, --list', i18n.__('Show command queue'), false)
program.action(async (opt: GitmBuildOption) => {
    const sum = getGitStatus()
    const cmd: Array<CommandType | string> = getCommandCache()
    if (opt.list) {
        sh.echo(cmd)
        process.exit(0)
    }
    if (cmd.length > 0) {
        // 检测是否有未提交的文件
        if (
            sum.A.length > 0 ||
            sum.D.length > 0 ||
            sum.M.length > 0 ||
            sum.UU.length > 0
        ) {
            await inquirer
                .prompt({
                    type: 'confirm',
                    name: 'value',
                    message: i18n.__(
                        'A conflict has been detected in the merge branch and you need to run git add . Do you want to force the script to continue?'
                    ),
                    default: false
                })
                .then((answers: any) => {
                    if (!answers.value) {
                        sh.echo(green('已退出'))
                        process.exit(0)
                    }
                })
        } else if (sum['??'].length > 0) {
            sh.echo(
                yellow(
                    i18n.__(
                        'An uncommitted file was detected, please be aware!'
                    )
                )
            )
        }
        queue(cmd).then(() => {
            cleanCommandCache()
        })
    } else {
        sh.echo(red(i18n.__('There are no unexecuted commands in the queue')))
    }
})
program.parse(process.argv)
export {}
