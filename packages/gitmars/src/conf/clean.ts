import type { GitmarsOptionType } from '../../typings'
import i18n from '../locales'

const cmdConfig: GitmarsOptionType = {
    command: 'clean',
    short: null,
    args: [],
    options: [
        {
            flags: '-f, --force',
            required: false,
            optional: false,
            variadic: false,
            mandatory: false,
            short: '-f',
            long: '--force',
            negate: false,
            description: i18n.__('Force cleanup'),
            defaultValue: false
        }
    ],
    // validator opts
    validatorOpts: (val, opts, cb) => {
        cb()
    },
    // validator args
    validatorArgs: (val, opts, cb) => {
        cb()
    },
    // transform opts
    transformOpts: (val, opts, cb) => {
        cb()
    },
    // transform args
    transformArgs: (val, opts, cb) => {
        cb()
    }
}

export default cmdConfig
