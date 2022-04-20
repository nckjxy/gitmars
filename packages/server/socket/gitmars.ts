import type { Socket } from 'socket.io'
const home = require('../lib/home')()
const getCurrentBranch = require('../../lib/core/git/getCurrentBranch')
const searchBranches = require('../../lib/core/git/searchBranches')
export interface SocketOption {
    name: string
    cwd: string
}

let glob = {},
    config = {},
    branch: string[] = [],
    current = '',
    interval: any = null

/**
 * getData
 *
 * @param {Socket} socket
 * @param {*} option 参数
 */
const getData = (socket: Socket, option: SocketOption) => {
    delete require.cache[require.resolve('../../lib/core/global')]
    delete require.cache[require.resolve('../../lib/core/getConfig')]
    const g = require('../../lib/core/global')
    const c = require('../../lib/core/getConfig')()
    const bh = searchBranches({ path: option.cwd || home })
    const cur = getCurrentBranch({ path: option.cwd || home })
    if (!glob || JSON.stringify(glob) !== JSON.stringify(g)) {
        glob = g
        socket.emit(option.name + '-global', g)
    }
    if (!config || JSON.stringify(config) !== JSON.stringify(c)) {
        config = c
        socket.emit(option.name + '-config', c)
    }
    if (!branch || branch.join() !== bh.join()) {
        branch = bh
        socket.emit(option.name + '-branch', bh)
    }
    if (!current || current !== cur) {
        current = cur
        socket.emit(option.name + '-current', cur)
    }
}

module.exports = (socket: Socket) => {
    socket.on('create', option => {
        process.chdir(option.cwd || home)
        getData(socket, option)

        if (!interval) {
            interval = setInterval(() => getData(socket, option), 2000)
        }
    })
    socket.on('remove', name => {
        glob = {}
        config = {}
        branch = []
        current = ''
        interval && interval.unref()
        clearInterval(interval)
        interval = null
        socket.removeAllListeners(name + '-global')
        socket.removeAllListeners(name + '-config')
        socket.removeAllListeners(name + '-branch')
        socket.removeAllListeners(name + '-current')
    })
}
export {}