import type { GitmarsOptionType } from '../../typings'

const cmdConfig: GitmarsOptionType = {
    command: 'log',
    short: 'lg',
    args: [
        {
            required: false,
            name: 'branche',
            variadic: false
        }
    ],
    options: [
        {
            flags: '--latest [latest]',
            required: false,
            optional: false,
            variadic: false,
            mandatory: false,
            short: '',
            long: '--latest',
            negate: false,
            description: '查询在某个时间之后的日志，填写格式：10s/2m/2h/3d/4M/5y',
            defaultValue: '7d'
        },
        {
            flags: '--limit [limit]',
            required: false,
            optional: false,
            variadic: false,
            mandatory: false,
            short: '',
            long: '--limit',
            negate: false,
            description: '最多查询的日志条数',
            defaultValue: 20
        }
    ]
}

module.exports = cmdConfig
