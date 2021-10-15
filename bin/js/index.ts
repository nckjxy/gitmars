const fs = require('fs')
const sh = require('shelljs')
const colors = require('colors')
const getGitConfig = require('./getGitConfig')
const gitRevParse = require('./gitRevParse')
const getConfig = require('./getConfig')

import type { AnyFunction, AnyObject, ShellCode, CommandType, QueueReturnsType, GitStatusInfoType, GitmarsBranchType, GitLogType } from '../../typings'

export interface CommandMessageType {
    success: string
    fail: string
}

export type SendMessageType = {
    silent: boolean
}

export type WaitCallback = {
    (kill?: boolean): void
}

export type QueueStartFunction = {
    (command?: CommandType | string, cb?: WaitCallback): void
}

export interface SearchBranchsMapType {
    heads: string[]
    tags: string[]
    others: string[]
}

function warning(txt: string): string {
    return colors.yellow(txt)
}
function error(txt: string): string {
    return colors.red(txt)
}
function success(txt: string): string {
    return colors.green(txt)
}

/**
 * writeFile
 * @description 写文件
 */
function writeFile(url: string, data: string): Promise<Error | boolean> {
    return new Promise((resolve, reject) => {
        fs.writeFile(url, data, (err: any) => {
            if (err) {
                reject(new Error('文件写入错误'))
            } else {
                resolve(true)
            }
        })
    })
}

/**
 * mapTemplate
 * @description 获取模板数据
 */
function mapTemplate(tmp: string, data: AnyFunction | AnyObject): string | null {
    if (!tmp || !data) return null
    const str: string =
        '' +
        tmp.replace(/\$\{([a-zA-Z0-9-_]+)\}/g, (a, b) => {
            if (typeof data === 'function') {
                return data(b)
            }
            for (const k in data) {
                if (b === k) {
                    return data[k]
                }
            }
        })
    return str
}

/**
 * getSeconds
 * @description 传入字符串转换成时间（秒）
 */
function getSeconds(str: string): number | null {
    const match = String(str).match(/^(\d+)([a-zA-Z]+)$/)
    let time
    if (!match) return null
    time = +match[1]
    switch (match[2]) {
        case 'm':
            time *= 60
            break
        case 'h':
            time *= 3600
            break
        case 'd':
            time *= 86400
            break
        case 'w':
            time *= 604800
            break
        case 'M':
            time *= 2592000
            break
        case 'y':
            time *= 31536000
            break
        default:
            break
    }
    return parseInt(String(Date.now() / 1000 - time))
}
/**
 * wait
 * @description 递归执行程序
 */
function wait(list: Array<CommandType | string>, fun: QueueStartFunction) {
    // 最后一条指令，执行完成之后退出递归
    if (list.length === 0) {
        fun()
        return
    } else {
        fun(list[0], (kill = false) => {
            // 强制中断
            if (kill) return
            list.shift()
            wait(list, fun)
        })
    }
}
/**
 * queue
 * @description 脚本执行主程序
 * @param {Array} list 脚本序列
 */
function queue(list: Array<CommandType | string>): Promise<QueueReturnsType[]> {
    return new Promise((resolve, reject) => {
        const returns: QueueReturnsType[] = []
        if (list.length === 0) reject('指令名称不能为空')
        list = JSON.parse(JSON.stringify(list))
        wait(list, (command?: CommandType | string, cb?: WaitCallback) => {
            let cfg = {
                    silent: true,
                    postmsg: false,
                    kill: true,
                    again: false // 指令执行中断之后是否需要重新执行，类似冲突解决之后的指令，不再需要重复执行
                } as CommandType['config'],
                cmd = command as string
            // 传入对象形式：{ cmd: '', config: {} }
            if (command instanceof Object) {
                cfg = Object.assign(cfg, command.config || {})
                cmd = command.cmd as string
            }
            if (!cmd) {
                // 只有一条指令，不需返回数组形式
                resolve(returns)
            } else {
                sh.exec(cmd, cfg, (code: ShellCode, out: string, err: any) => {
                    const msg = getCommandMessage(cmd)
                    try {
                        out = JSON.parse(out)
                    } catch {
                        out = out.replace(/\n*$/g, '')
                    }
                    returns.push({ code, out, err, cfg, cmd })
                    if (code !== 0) setLog({ command, code, out, err })
                    if (code !== 0 && cfg.kill) {
                        // 当前指令执行错误且设置该条指令需要中断，则中断递归
                        const rest = JSON.parse(JSON.stringify(list))
                        if (!cfg.again) {
                            rest.shift()
                        } else if (cfg.again !== true) {
                            rest.splice(0, 1, cfg.again)
                        }
                        cb && cb(true) // 回调并中断执行
                        setCache(rest)
                        // 只有silent模式才需要输出信息
                        cfg.silent && sh.echo(error(err))
                        sh.echo(error(cfg.fail || msg.fail || '出错了！指令 ' + cmd + ' 执行失败，中断了进程'))
                        cfg.postmsg && postMessage('出错了！指令 ' + cmd + ' 执行失败，中断了进程')
                        rest.length > 0 && sh.echo(error('请处理相关问题之后输入gitm continue继续'))
                        sh.exit(1)
                    } else {
                        if (code === 0) {
                            const m = cfg.success || msg.success
                            if (m) {
                                sh.echo(success(m))
                                cfg.postmsg && postMessage(m)
                            }
                        } else {
                            const m = cfg.fail || msg.fail || '指令 ' + cmd + ' 执行失败'
                            m && sh.echo(warning(m))
                        }
                        cb && cb() // 回调，继续执行下一条
                    }
                })
            }
        })
    })
}

/**
 * getCache
 * @description 获取未执行脚本列表
 * @returns {Array} arr 返回数组
 */
function getCache() {
    const { gitDir } = gitRevParse()
    let arr = []
    if (sh.test('-f', gitDir + '/.gitmarscommands')) {
        arr = sh
            .cat(gitDir + '/.gitmarscommands')
            .stdout.split('\n')[0]
            .replace(/(^\n*)|(\n*$)/g, '')
            .replace(/\n{2,}/g, '\n')
            .replace(/\r/g, '')
        arr = JSON.parse(decodeURIComponent(arr))
    }
    return arr
}

/**
 * setCache
 * @description 存储未执行脚本列表
 */
function setCache(rest: Array<CommandType | string>): void {
    const { gitDir } = gitRevParse()
    sh.touch(gitDir + '/.gitmarscommands')
    // eslint-disable-next-line no-control-regex
    sh.sed('-i', /[\s\S\n\r\x0a\x0d]*/, encodeURIComponent(JSON.stringify(rest)), gitDir + '/.gitmarscommands')
}

/**
 * setLog
 * @description 存储错误日志
 */
function setLog(log: object): void {
    const { gitDir } = gitRevParse()
    sh.touch(gitDir + '/.gitmarslog')
    // eslint-disable-next-line no-control-regex
    sh.sed('-i', /[\s\S\n\r\x0a\x0d]*/, encodeURIComponent(JSON.stringify(log)), gitDir + '/.gitmarslog')
}

/**
 * getStatusInfo
 * @description 获取分支状态
 * @returns {Boolean} true 返回true/false
 */
function getStatusInfo(config: any = {}): GitStatusInfoType {
    const { silent = true } = config
    const out = sh.exec('git status -s --no-column', { silent }).stdout.replace(/(^\s+|\n*$)/g, '') // 去除首尾
    const list = out ? out.replace(/\n(\s+)/g, '\n').split('\n') : []
    const sum: GitStatusInfoType = {
        A: [],
        D: [],
        M: [],
        '??': []
    }
    if (list.length === 0) return sum
    list.forEach((str: string) => {
        const arr: string[] = str.trim().replace(/\s+/g, ' ').split(' ')
        const type = arr.splice(0, 1)[0] as keyof GitStatusInfoType
        if (!sum[type]) sum[type] = []
        sum[type].push(arr.join(' '))
    })
    return sum
}

/**
 * getStatus
 * @description 获取是否有未提交的文件
 * @returns {Boolean} true 返回true/false
 */
function getStatus(): boolean {
    const sum = getStatusInfo({ silent: false })
    if (sum.A.length > 0 || sum.D.length > 0 || sum.M.length > 0) {
        sh.echo(error('您还有未提交的文件，请处理后再继续') + '\n如果需要暂存文件请执行: gitm save\n恢复时执行：gitm get')
        sh.exit(1)
        return false
    } else if (sum['??'].length > 0) {
        sh.echo(warning('您有未加入版本的文件,') + '\n如果需要暂存文件请执行: gitm save --force\n恢复时执行：gitm get')
    }
    return true
}

/**
 * getLogs
 * @description 获取日志
 * @returns {Array} true 返回列表
 */
function getLogs(config: any = {}): GitLogType[] {
    const { lastet, limit, branches } = config
    const keys = [
        '%H',
        // '%h',
        '%T',
        // '%t',
        '%P',
        // '%p',
        '%an',
        // '%aN',
        '%ae',
        // '%aE',
        '%al',
        '%aL',
        '%ad',
        // '%aD',
        '%ar',
        '%at',
        // '%ai',
        '%aI',
        '%as',
        '%cn',
        // '%cN',
        '%ce',
        // '%cE',
        '%cl',
        '%cL',
        '%cd',
        // '%cD',
        '%cr',
        '%ct',
        // '%ci',
        '%cI',
        '%cs',
        '%d',
        '%D',
        '%S',
        '%e',
        '%s'
        // '%f',
        // '%b',
        // '%B',
        // '%N',
        // '%GG',
        // '%G?',
        // '%GS',
        // '%GK',
        // '%GF',
        // '%GP',
        // '%GT',
        // '%gD',
        // '%gd',
        // '%gn',
        // '%gN',
        // '%ge',
        // '%gE',
        // '%gs'
        // '%(trailers:key=Reviewed-by)'
    ]
    const results = sh
        .exec(`git log${limit ? ' -"' + limit + '"' : ''}${lastet ? ' --since="' + getSeconds(lastet) + '"' : ''}${branches ? ' --branches="*' + branches + '"' : ''} --date-order --pretty=format:"${keys.join(',=')}-end-"`, { silent: true })
        .stdout.replace(/[\r\n]+/g, '')
        .replace(/-end-$/, '')
    const logList: GitLogType[] = []
    results &&
        results.split('-end-').forEach((log: string) => {
            const args = log.split(',=')
            const map: {
                [props: string]: string
            } = {}
            keys.forEach((key, i) => {
                map[key] = args[i]
            })
            logList.push(map)
        })
    return logList
}

/**
 * checkBranch
 * @description 获取是否有某个分支
 * @returns {Boolean} true 返回true/false
 */
async function checkBranch(name: string): Promise<string> {
    const data = await queue([`gitm branch -k ${name}`])
    return data[0].out.replace(/^\s+/, '')
}
// function checkBranch(name) {
// 	return queue([`gitm branch -k ${name}`]).then(data => {
// 		return resolve(data[0].out.replace(/^\s+/, ''))
// 	})
// }

/**
 * getCurrent
 * @description 获取当前分支
 * @returns {String} 返回名称
 */
function getCurrent(): string {
    return sh.exec('git symbolic-ref --short -q HEAD', { silent: true }).stdout.replace(/[\n\s]*$/g, '')
}

/**
 * searchBranch
 * @description 获取当前分支
 * @returns array 返回列表数组
 */
async function searchBranch(key: string, type: GitmarsBranchType, remote = false): Promise<string[]> {
    const data = (await queue([`gitm branch${key ? ' -k ' + key : ''}${type ? ' -t ' + type : ''}${remote ? ' -r' : ''}`]))[0].out.replace(/^\*\s+/, '')
    let arr = data ? data.split('\n') : []
    arr = arr.map(el => el.trim())
    return arr
}

/**
 * searchBranchs
 * @description 获取当前分支
 * @returns {Array} 返回列表数组
 */
function searchBranchs(opt: any = {}): string[] {
    const { key, type, remote = false } = opt
    let { path } = opt
    if (!path) path = sh.pwd().stdout
    const data = sh.exec(`git ls-remote${remote ? ' --refs' : ' --heads'} --quiet --sort="version:refname" ${path}`, { silent: true }).stdout.replace(/\n*$/g, '')
    const arr = data ? data.split('\n') : []
    const map: SearchBranchsMapType = {
        heads: [],
        tags: [],
        others: []
    }
    for (const el of arr) {
        const match = el.match(/^\w+[\s]+refs\/(heads|remotes|tags)\/([\w-\/]+)$/)
        if (!match) continue
        switch (match[1]) {
            case 'heads':
                map.heads.push(match[2])
                break
            case 'remotes':
                map.heads.push(match[2])
                break
            case 'tags':
                map.tags.push(match[2])
                break
            default:
                map.others.push(match[2])
                break
        }
    }
    if (type && ['bugfix', 'feature', 'support'].includes(type)) {
        map.heads = map.heads.filter(el => el.indexOf('/' + type + '/') > -1)
    }
    if (key) {
        map.heads = map.heads.filter(el => el.indexOf(key) > -1)
    }
    return map.heads
}

/**
 * filterBranch
 * @description 搜索分支
 * @returns {Array} 返回列表数组
 */
function filterBranch(key: string, types: string, remote = false): string[] {
    let typesList: string[] = [types],
        list: string[]
    if (typeof types === 'string') typesList = types.split(',')
    const out = sh
        .exec(`git branch${remote ? ' -a' : ''}`, { silent: true })
        .stdout.replace(/(^\s+|[\n\r]*$)/g, '') // 去除首尾
        .replace(/\*\s+/, '') // 去除*
    list = out ? out.replace(/\n(\s+)/g, '\n').split('\n') : []
    list = list.filter(el => {
        let result = true
        // 匹配关键词
        if (key && !el.includes(key)) result = false
        // 匹配类型
        if (result && typesList.length > 0) {
            result = false
            type: for (const type of typesList) {
                if (el.includes(type)) {
                    result = true
                    break type
                }
            }
        }
        return result
    })
    return list
}

/**
 * getStashList -------------------------------------------
 * @description 获取暂存区列表
 * @returns {String} 返回名称
 */
async function getStashList(key: string) {
    const data = (await queue(['git stash list']))[0].out.replace(/^\*\s+/, '')
    const list: string[] = (data && data.split('\n')) || []
    const arr: {
        key: string
        index: number
        msg: string
    }[] = []
    if (list.length > 10) sh.echo(warning(`该项目下一共有${list.length}条暂存记录，建议定期清理！`))
    try {
        list.forEach(item => {
            const msgArr: string[] = item.split(':')
            const first = msgArr.shift() as string
            if (!key || (key && key === msgArr[msgArr.length - 1].trim())) {
                const m = first.match(/^stash@\{(\d+)\}$/)
                // 去除不必要的消息
                if (msgArr.length > 1) msgArr.shift()
                arr.push({
                    key: first,
                    index: m ? +m[1] : 0,
                    msg: msgArr.join(':').trim()
                })
            }
        })
    } catch (e) {
        //
    }
    return arr
}

/**
 * getMessage
 * @description 解析模板数据
 */
function getMessage(type: string): string {
    const { root } = gitRevParse()
    const { appName } = getGitConfig()
    const config = getConfig()
    const d = new Date()
    let str = ''
    switch (type) {
        case 'time':
            str = d.toLocaleString()
            break
        case 'timeNum':
            str = String(d.getTime())
            break
        case 'pwd':
            str = root
            break
        case 'project':
            str = appName
            break
        case 'user':
            str = config.user
            break

        default:
            break
    }
    return str
}

/**
 * postMessage
 * @description 生成消息
 */
function postMessage(msg = ''): void {
    const config = getConfig()
    if (!config.msgTemplate) {
        sh.echo(error('请配置消息发送api模板地址'))
        return
    }
    const message = mapTemplate(config.msgTemplate, key => {
        if (key === 'message') return msg
        return getMessage(key)
    })
    config.msgUrl && message && sendMessage(message)
}

/**
 * sendMessage
 * @description 发送消息
 */
function sendMessage(message = '', cfg = {} as SendMessageType): void {
    const config = getConfig()
    const { silent = true } = cfg
    if (!config.msgUrl) {
        sh.echo(error('请配置消息推送地址'))
        return
    }
    message = message.replace(/\s/g, '')
    config.msgUrl && sh.exec(`curl -i -H "Content-Type: application/json" -X POST -d '{"envParams":{"error_msg":"'${message}'"}}' "${config.msgUrl}"`, { silent })
}

/**
 * getCommandMessage
 * @description 获取通用的指令提示信息
 */
function getCommandMessage(cmd: string): CommandMessageType {
    const msg = {} as CommandMessageType
    const arr = cmd.replace(/[\s]+/g, ' ').split(' ')
    if (arr.length < 2 || arr[0] !== 'git') return msg
    switch (arr[1]) {
        case 'checkout':
            msg.success = '切换分支成功'
            msg.fail = '切换分支失败'
            break
        case 'pull':
            msg.success = '拉取代码成功'
            msg.fail = '拉取代码失败'
            break
        case 'fetch':
            msg.success = '抓取成功'
            msg.fail = '抓取失败'
            break
        case 'commit':
            msg.success = '提交成功'
            msg.fail = '提交失败'
            break
        case 'push':
            msg.success = '推送成功'
            msg.fail = '推送失败'
            break
        case 'cherry-pick':
            msg.success = '同步提交记录成功'
            msg.fail = '同步提交记录失败'
            break
        case 'merge':
            msg.success = 'merge分支成功'
            msg.fail = 'merge分支失败'
            break
        case 'rebase':
            msg.success = 'rebase分支成功'
            msg.fail = 'rebase分支失败'
            break
        case 'revert':
            msg.success = '撤销成功'
            msg.fail = '撤销失败'
            break
        case 'clean':
            msg.success = '清理成功'
            msg.fail = '清理失败'
            break

        default:
            break
    }
    return msg
}

/**
 * @description compareVersion版本号大小对比
 * @param appName - app名称
 * @param compareVer - 必传 需要对比的版本号
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
function compareVersion(basicVer: string, compareVer: string): boolean | null {
    if (basicVer === null) return null
    basicVer = basicVer + '.'
    compareVer = compareVer + '.'
    const bStr = parseFloat(basicVer)
    const cStr = parseFloat(compareVer)
    const bStrNext = parseFloat(basicVer.replace(bStr + '.', '')) || 0
    const cStrNext = parseFloat(compareVer.replace(cStr + '.', '')) || 0
    if (cStr > bStr) {
        return false
    } else if (cStr < bStr) {
        return true
    } else {
        if (bStrNext >= cStrNext) {
            return true
        } else {
            return false
        }
    }
}

/**
 * getBranchsFromID
 * @description 获取包含commitID的分支
 * @returns {Array} 返回数组
 */
function getBranchsFromID(commitID: string, remote = false): string[] {
    const out = sh.exec(`git branch ${remote ? '-r' : ''} --contains ${commitID} --format="%(refname:short)`, { silent: true }).stdout.replace(/(^\s+|\n*$)/g, '') // 去除首尾
    return out ? out.split('\n') : []
}

/**
 * getGitUser
 * @description 获取git用户名称
 * @returns {String} 返回字符串
 */
function getGitUser(): string {
    return sh.exec('git config user.name', { silent: true }).stdout.replace(/(^\s+|\n*$)/g, '') // 去除首尾
}

/**
 * getGitEmail
 * @description 获取git用户邮箱
 * @returns {String} 返回字符串
 */
function getGitEmail(): string {
    return sh.exec('git config user.email', { silent: true }).stdout.replace(/(^\s+|\n*$)/g, '') // 去除首尾
}

/**
 * 获取当前是否git项目目录
 *
 * @returns {String} 返回字符串
 */
function isGitProject(): boolean {
    return sh.exec('git rev-parse --is-inside-work-tree', { silent: true }).stdout.includes('true')
}

module.exports = {
    warning,
    error,
    success,
    writeFile,
    mapTemplate,
    getSeconds,
    wait,
    queue,
    getCache,
    setCache,
    setLog,
    getStatusInfo,
    getStatus,
    getLogs,
    checkBranch,
    getCurrent,
    searchBranch,
    searchBranchs,
    filterBranch,
    getStashList,
    postMessage,
    sendMessage,
    getCommandMessage,
    compareVersion,
    getBranchsFromID,
    getGitUser,
    getGitEmail,
    isGitProject
}