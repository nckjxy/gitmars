const crossSpawn = require('cross-spawn')

import type { ExecOptions, SpawnSyncReturns } from 'child_process'

/**
 * 异步执行脚本
 *
 * @param client - 执行脚本的宿主，名称
 * @param argv - 参数
 * @param options - 透传配置
 * @returns result - 返回执行状态
 */
function spawn(
    client: string,
    argv: string[],
    options: ExecOptions
): Partial<SpawnSyncReturns<string>> {
    const program = crossSpawn.sync(client, argv, {
        // stdio: 'inherit',
        shell: process.platform === 'win32',
        ...options
    })
    return {
        pid: program.pid,
        stdout: program.stdout ? program.stdout.toString() : '',
        stderr: program.stderr ? program.stderr.toString() : '',
        status: program.status,
        signal: program.signal,
        error: program.error
    }
}

/**
 * 同步执行脚本
 *
 * @param client - 执行脚本的宿主，名称
 * @param argv - 参数
 * @param options - 透传配置
 * @returns result - 返回执行状态
 */
function spawnSync(
    client: string,
    argv: string[],
    options: ExecOptions
): Partial<SpawnSyncReturns<string>> {
    const program = crossSpawn.sync(client, argv, {
        // stdio: 'inherit',
        shell: process.platform === 'win32',
        ...options
    })
    return {
        pid: program.pid,
        stdout: program.stdout ? program.stdout.toString() : '',
        stderr: program.stderr ? program.stderr.toString() : '',
        status: program.status,
        signal: program.signal,
        error: program.error
    }
}

module.exports = {
    spawnSync,
    spawn
}