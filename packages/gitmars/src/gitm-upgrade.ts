#!/usr/bin/env ts-node
import { program } from 'commander'
import { green, red } from 'chalk'
import ora from 'ora'
import { spawnSync } from '@gitmars/core/lib/spawn'
import { createArgs } from '@gitmars/core/lib/utils/command'
import type { GitmarsOptionOptionsType, PackageVersionTag } from '../typings'
import upgradeConfig from '#lib/conf/upgrade'
import i18n from '#lib/locales/index'

const { args, options } = upgradeConfig

interface GitmBuildOption {
    mirror?: boolean
    client?: 'npm' | 'yarn' | 'pnpm' | 'cnpm' | string
    registry?: string
}

/**
 * gitm upgrade
 */
program
    .name('gitm upgrade')
    .usage(
        '[version] [-m --mirror] [-c --client [client]] [-r --registry <registry>]'
    )
    .description(i18n.__('Upgrade gitmars'))
if (args.length > 0) program.arguments(createArgs(args))
options.forEach((o: GitmarsOptionOptionsType) => {
    program.option(o.flags, o.description, o.defaultValue)
})
// .option('-m, --mirror', i18n.__('Whether to use Taobao Mirror'), false)
// .option('-c, --client [client]', i18n.__('The name of the client used to load the package'), 'npm')
// .option('-r, --registry <registry]>', i18n.__('Use mirror address'), '')
program.action(
    async (version: PackageVersionTag | string, opt: GitmBuildOption) => {
        const spinner = ora()
        if (version) {
            const match = version.match(/[0-9.]+$/)
            if (match) version = match[0]
            else if (
                ![
                    'alpha',
                    'lite',
                    'beta',
                    'release',
                    'latest',
                    'next'
                ].includes(version)
            ) {
                console.error(
                    i18n.__(
                        'Incorrect version number entered, only supported: alpha, lite, beta, release, latest, next'
                    )
                )
                process.exit(0)
            }
        } else {
            version = 'latest'
        }
        let cmdAdd: any[], cmdDel: any[]
        switch (opt.client) {
            case 'yarn':
                cmdAdd = [opt.client, ['global', 'add', `gitmars@${version}`]]
                cmdDel = [opt.client, ['global', 'remove', 'gitmars']]
                break
            case 'pnpm':
                cmdAdd = [opt.client, ['add', '-g', `gitmars@${version}`]]
                cmdDel = [opt.client, ['remove', '-g', 'gitmars']]
                break
            default:
                // default npm or cnpm
                cmdAdd = [opt.client, ['install', '-g', `gitmars@${version}`]]
                cmdDel = [opt.client, ['uninstall', '-g', 'gitmars']]
                break
        }
        // 这一行后面准备删掉
        if (!opt.registry && opt.mirror) {
            opt.registry = 'https://registry.npmmirror.com'
        }
        if (opt.registry) {
            cmdAdd[1] = cmdAdd[1].concat(['-registry', opt.registry])
        }
        spinner.start(green(i18n.__('Uninstalling')))
        const uninstall = spawnSync(cmdDel[0], cmdDel[1], {
            stdio: 'ignore',
            shell: process.platform === 'win32' /*, env: { detached: true } */
        })
        if (uninstall.status !== 0) {
            spinner.fail(
                red(
                    i18n.__(
                        'There was an error uninstalling, please try running after manually removing: npm install -g gitmars'
                    )
                )
            )
            process.exit(0)
        }
        spinner.succeed(green(i18n.__('Uninstallation complete')))
        spinner.start(green(i18n.__('Installing')))
        const install = spawnSync(cmdAdd[0], cmdAdd[1], {
            stdio: 'ignore',
            shell: process.platform === 'win32' /*, env: { detached: true } */
        })
        if (install.status === 0) {
            spinner.succeed(green(i18n.__('Installation complete')))
            spawnSync('gitm', ['-v'], {
                stdio: 'inherit',
                shell:
                    process.platform === 'win32' /*, env: { detached: true } */
            })
        } else {
            spinner.fail(
                red(
                    i18n.__(
                        'There was an error installing, please try running: npm install -g gitmars'
                    )
                )
            )
        }
        spinner.stop()
        process.exit(0)
    }
)
program.parse(process.argv)
export {}
