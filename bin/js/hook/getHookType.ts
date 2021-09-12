Object.defineProperty(exports, '__esModule', { value: true })

// isHusky
function isHusky(data: string): boolean {
    return data.indexOf('# husky') > -1 || data.indexOf('#husky') > -1
}

// isGitmars
function isGitmars(data: string): boolean {
    return data.indexOf('# gitmars') > -1
}

// isYorkie
function isYorkie(data: string): boolean {
    return data.indexOf('#yorkie') > -1
}

// isGhooks
function isGhooks(data: string): boolean {
    return data.indexOf('// Generated by ghooks. Do not edit this file.') > -1
}

// isPreCommit
function isPreCommit(data: string): boolean {
    return data.indexOf('./node_modules/pre-commit/hook') > -1
}

module.exports = {
    isHusky,
    isGitmars,
    isYorkie,
    isGhooks,
    isPreCommit
}
