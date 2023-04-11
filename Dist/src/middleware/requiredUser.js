'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.requiredUser = void 0
const requiredUser = (req, res) => {
    try {
        const user = res.locals.user
        if (!user) {
            return res.status(404).json({ msg: 'Invalid token' })
        }
    } catch (err) {
        return err
    }
}
exports.requiredUser = requiredUser
