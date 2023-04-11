'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.deserializedUser = void 0
const token_1 = require('../utils/token')
const redis_1 = __importDefault(require('../utils/redis'))
const users_1 = require('../models/users')
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const deserializedUser = async (req, res, next) => {
    try {
        let token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('bearer')
        ) {
            token = req.headers.authorization.split('')[1]
        } else if (req.cookies.token) {
            token = req.cookies.token
        }
        if (!token) {
            return res.status(403).json({ message: 'You are not logged in' })
        }
        const encryption = (0, token_1.verifyJwt)(token)
        if (!encryption) {
            return res.status(404).json({ message: 'Invalid token' })
        }
        const session = redis_1.default.get(encryption.sub)
        if (!session) {
            return res.status(404).json({ message: 'User session expired' })
        }
        const user = await users_1.User.findById({ _id: session })
        if (!user) {
            return res
                .status(404)
                .json({ message: 'User with that token no longer exist' })
        }
        res.locals.user = user
        next()
    } catch (err) {
        return err
    }
}
exports.deserializedUser = deserializedUser
