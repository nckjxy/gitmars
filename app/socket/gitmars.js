"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = require('../lib/home')();
const { getCurrent, searchBranchs } = require('../../lib/js/index');
let glob = {}, config = {}, branch = [], current = '', interval = null;
/**
 * getData
 *
 * @param {Socket} socket
 * @param {*} option 参数
 */
const getData = (socket, option) => {
    delete require.cache[require.resolve('../../lib/js/global')];
    delete require.cache[require.resolve('../../lib/js/config')];
    let g = require('../../lib/js/global'), c = require('../../lib/js/config'), bh = searchBranchs({ path: option.cwd || home }), cur = getCurrent({ path: option.cwd || home });
    if (!glob || JSON.stringify(glob) !== JSON.stringify(g)) {
        glob = g;
        socket.emit(option.name + '-global', g);
    }
    if (!config || JSON.stringify(config) !== JSON.stringify(c)) {
        config = c;
        socket.emit(option.name + '-config', c);
    }
    if (!branch || branch.join() !== bh.join()) {
        branch = bh;
        socket.emit(option.name + '-branch', bh);
    }
    if (!current || current !== cur) {
        current = cur;
        socket.emit(option.name + '-current', cur);
    }
};
module.exports = (socket) => {
    socket.on('create', option => {
        process.chdir(option.cwd || home);
        getData(socket, option);
        if (!interval)
            interval = setInterval(() => getData(socket, option), 2000);
    });
    socket.on('remove', name => {
        glob = {};
        config = {};
        branch = [];
        current = '';
        interval && interval.unref();
        clearInterval(interval);
        interval = null;
        socket.removeAllListeners(name + '-global');
        socket.removeAllListeners(name + '-config');
        socket.removeAllListeners(name + '-branch');
        socket.removeAllListeners(name + '-current');
    });
};