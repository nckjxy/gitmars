import type { GitmarsMultiOptionType } from '../../typings'
const i18n = require('../locales')
;(function (root) {
    const cmdConfig: GitmarsMultiOptionType = {
        command: 'admin',
        short: null,
        create: {
            command: 'create',
            short: null,
            args: [
                {
                    required: true,
                    name: 'type',
                    variadic: false,
                    validator: (val, opts, cb) => {
                        if (/\s+/.test(val)) {
                            cb(new Error(i18n.__('Please do not enter spaces')))
                            return
                        }
                        cb()
                    },
                    // transformer: null,
                    description: i18n.__('Branch Type')
                }
            ],
            options: [],
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
        },
        publish: {
            command: 'publish',
            short: null,
            args: [
                {
                    required: true,
                    name: 'type',
                    variadic: false,
                    validator: (val, opts, cb) => {
                        if (/\s+/.test(val)) {
                            cb(new Error(i18n.__('Please do not enter spaces')))
                            return
                        }
                        cb()
                    },
                    // transformer: null,
                    description: i18n.__('Branch Type'),
                    options: ['release', 'bugfix'],
                    value: ''
                }
            ],
            options: [
                {
                    flags: '-c, --combine',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    short: '-c',
                    long: '--combine',
                    negate: false,
                    description: i18n.__(
                        'Whether to sync the release code to the bug'
                    ),
                    defaultValue: false,
                    recommend: false
                },
                {
                    flags: '--use-rebase',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    long: '--use-rebase',
                    negate: false,
                    description: i18n.__(
                        'Whether to update using rebase method, default merge'
                    ),
                    defaultValue: false,
                    recommend: false
                },
                {
                    flags: '-p, --prod',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    short: '-p',
                    long: '--prod',
                    negate: false,
                    description: i18n.__(
                        'Whether to merge bugs to master when publishing bug branches'
                    ),
                    defaultValue: false,
                    recommend: false
                },
                {
                    flags: '-b, --build [build]',
                    required: false,
                    optional: true,
                    variadic: false,
                    mandatory: false,
                    short: '-b',
                    long: '--build',
                    negate: false,
                    description: i18n.__('Build application'),
                    recommend: true
                },
                {
                    flags: '--postmsg',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    long: '--postmsg',
                    negate: false,
                    description: i18n.__('Send Message'),
                    defaultValue: false,
                    recommend: false
                },
                {
                    flags: '--description [description]',
                    required: false,
                    optional: true,
                    variadic: false,
                    mandatory: false,
                    long: '--description',
                    negate: false,
                    description: i18n.__(
                        'Description of the reason for this commit'
                    ),
                    defaultValue: '',
                    recommend: false
                },
                {
                    flags: '-f, --force',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    short: '-f',
                    long: '--force',
                    negate: false,
                    description: i18n.__('Whether to force a merge request'),
                    recommend: false
                }
            ],
            // validator opts
            validatorOpts: (val, opts, cb) => {
                if (val.includes('--combine') && val.includes('--prod')) {
                    cb(
                        new Error(
                            i18n.__(
                                'You cannot select both "Merge release to bug" and "Merge bug to master"'
                            )
                        )
                    )
                    return
                }
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
        },
        update: {
            command: 'update',
            short: null,
            args: [
                {
                    required: true,
                    name: 'type',
                    variadic: false,
                    validator: (val, opts, cb) => {
                        if (/\s+/.test(val)) {
                            cb(new Error(i18n.__('Please do not enter spaces')))
                            return
                        }
                        cb()
                    },
                    // transformer: null,
                    description: i18n.__('Branch Type')
                }
            ],
            options: [
                {
                    flags: '--use-rebase',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    long: '--use-rebase',
                    negate: false,
                    description: i18n.__(
                        'Whether to update using rebase method, default merge'
                    ),
                    defaultValue: false,
                    recommend: false
                },
                {
                    flags: '-m, --mode [mode]',
                    required: false,
                    optional: true,
                    variadic: false,
                    mandatory: false,
                    short: '-m',
                    long: '--mode',
                    negate: false,
                    description: i18n.__(
                        'In case of a conflict, whether to keep the incoming code or the current code; 1=use current 2=use incoming; default is 0=handle manually. This parameter must not be used with --use-rebase'
                    ),
                    defaultValue: 0,
                    recommend: false
                },
                {
                    flags: '--postmsg',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    long: '--postmsg',
                    negate: false,
                    description: i18n.__('Send Message'),
                    defaultValue: false,
                    recommend: false
                },
                {
                    flags: '--description [description]',
                    required: false,
                    optional: true,
                    variadic: false,
                    mandatory: false,
                    long: '--description',
                    negate: false,
                    description: i18n.__(
                        'Description of the reason for this commit'
                    ),
                    defaultValue: '',
                    recommend: false
                },
                {
                    flags: '-f, --force',
                    required: false,
                    optional: false,
                    variadic: false,
                    mandatory: false,
                    short: '-f',
                    long: '--force',
                    negate: false,
                    description: i18n.__('Whether to force a merge request'),
                    recommend: false
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
        },
        clean: {
            command: 'clean',
            short: null,
            args: [
                {
                    required: true,
                    name: 'type',
                    variadic: false,
                    validator: (val, opts, cb) => {
                        if (/\s+/.test(val)) {
                            cb(new Error(i18n.__('Please do not enter spaces')))
                            return
                        }
                        cb()
                    },
                    // transformer: null,
                    description: i18n.__('Branch Type')
                }
            ],
            options: [],
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
        },
        approve: {
            command: 'approve',
            short: null,
            args: [],
            options: [],
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
    }

    /* istanbul ignore next */
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = cmdConfig
    } else if (typeof exports === 'object') exports.cmdConfig = cmdConfig
    else {
        if (!root.gitmarsCmdConfig) root.gitmarsCmdConfig = {}
        root.gitmarsCmdConfig.admin = cmdConfig
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
})(typeof window !== 'undefined' ? window : global)
