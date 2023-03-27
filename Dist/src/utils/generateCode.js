'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateCode = void 0
const generateCode = () => {
    const characters =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < 6; i++) {
        code += characters[Math.floor(Math.random() * characters.length)]
    }
    return code
}
exports.generateCode = generateCode
