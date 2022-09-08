import type { GitmarsOptionType } from '../../typings'
import i18n from '../locales'

const cmdConfig: GitmarsOptionType = {
    command: 'get',
    short: 'gt',
    args: [
        {
            required: false,
            name: 'message',
            variadic: false,
            validator: (val, opts, cb) => {
                if (/\s+/.test(val)) {
                    cb(new Error(i18n.__('Please do not enter spaces')))
                    return
                }
                cb()
            },
            // transformer: null,
            description: i18n.__('AccessKeyword')
        },
        {
            required: false,
            name: 'index',
            variadic: false,
            // validator: null,
            // transformer: null,
            description: i18n.__('Serial Number')
        }
    ],
    options: [
        {
            flags: '-k, --keep [keep]',
            required: false,
            optional: false,
            variadic: false,
            mandatory: false,
            short: '-k',
            long: '--keep',
            negate: false,
            description: i18n.__('Keep staging area not deleted'),
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
