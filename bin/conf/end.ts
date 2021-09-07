import type { GitmarsOptionType } from '../../typings'

const cmdConfig: GitmarsOptionType = {
    command: 'end',
    short: 'ed',
    args: [
        { required: false, name: 'type', variadic: false, description: '分支类型' },
        { required: false, name: 'name', variadic: false, description: '分支名称(不带feature/bugfix前缀)' }
    ],
    options: []
}

export const args = cmdConfig.args
export const options = cmdConfig.options
export default cmdConfig
