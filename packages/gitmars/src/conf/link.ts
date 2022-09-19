import type { GitmarsOptionType } from '../../typings'
// import i18n from '#lib/locales/index'
const i18n = { __: (txt: string) => txt }

export const cmdConfig: GitmarsOptionType = {
    command: 'link',
    short: null,
    args: [
        {
            required: false,
            name: 'name',
            variadic: false,
            validator: (val, opts, cb) => {
                if (/\s+/.test(val)) {
                    cb(new Error(i18n.__('Please do not enter spaces')))
                    return
                }
                cb()
            },
            // transformer: null,
            description: i18n.__('Name of the package')
        }
        // {
        //     required: true,
        //     name: 'path',
        //     variadic: false,
        //     validator: (val, opts, cb) => {
        //         if (/\s+/.test(val)) {
        //             cb(new Error(i18n.__('Please do not enter spaces')))
        //             return
        //         }
        //         cb()
        //     },
        //     transformer: null,
        //     description: i18n.__('Path of package')
        // }
    ],
    options: []
}

export { cmdConfig as default }
