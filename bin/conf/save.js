;(function (root) {
	const cmdConfig = {
		command: 'save',
		short: 'sv',
		args: [
			{
				required: false,
				name: 'message',
				variadic: false
			}
		],
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
				description: '没有版本的文件也暂存，这会执行git add .',
				defaultValue: false
			}
		]
	}

	/* istanbul ignore next */
	if (typeof exports === 'object' && typeof module === 'object') module.exports = cmdConfig
	// else if (typeof define === 'function' && define.amd) define(['cmdConfig'], () => cmdConfig)
	else if (typeof exports === 'object') exports['cmdConfig'] = cmdConfig
	else root['cmdConfig'] = cmdConfig
})(typeof window !== 'undefined' ? window : global)
