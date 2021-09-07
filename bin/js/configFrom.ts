import sh from 'shelljs'
import gitRevParse from './gitRevParse'
const { root } = gitRevParse()
/**
 * getConfigFrom
 * @description 读取配置来源
 * @returns {Number} 返回来源0，1，2
 */
const getConfigFrom = (): 0 | 1 | 2 => {
    if (sh.test('-f', root + '/.gitmarsrc')) {
        return 1
    } else if (sh.test('-f', root + '/gitmarsconfig.json')) {
        return 2
    }
    return 0
}
export default getConfigFrom()
