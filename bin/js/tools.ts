const fs = require('fs')
const colors = require('colors')

import type { GitmarsOptionArgsType } from '../../typings'

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
 * createArgs
 * @description 生成参数
 */
function createArgs(args: GitmarsOptionArgsType[]): string {
    const argArr: string[] = []
    args.forEach(arg => {
        let str = arg.name
        if (arg.variadic) str += '...'
        if (arg.required) str = '<' + str + '>'
        else str = '[' + str + ']'
        argArr.push(str)
    })
    return argArr.join(' ')
}

module.exports = {
    warning,
    error,
    success,
    writeFile,
    createArgs
}
