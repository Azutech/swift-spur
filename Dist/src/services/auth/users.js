'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticate = exports.register = void 0
const dotenv_1 = __importDefault(require('dotenv'))
const token_1 = require('../../utils/token')
const users_1 = require('../../models/users')
const bcrypt_1 = require('bcrypt')
const config_1 = __importDefault(require('config'))
const generateCode_1 = require('../../utils/generateCode')
const sendGrid_1 = require('../mail/sendGrid')
dotenv_1.default.config()
const accessTokenCookieOptions = {
    expires: new Date(
        Date.now() + config_1.default.get('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config_1.default.get('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
}
const register = async (req, res) => {
    const code = (0, generateCode_1.generateCode)()
    const { firstName, lastName, email, mobileNumber, password, sex } = req.body
    try {
        const existingUser = await users_1.User.findOne({ email: email })
        if (existingUser) {
            return res.status(404).json({
                message: 'User already exist',
            })
        }
        const hashPassword = await (0, bcrypt_1.hash)(password, 10)
        const newUser = new users_1.User({
            firstName,
            lastName,
            email,
            mobileNumber,
            password: hashPassword,
            sex,
            emailVerified: false,
            verificationCode: code,
        })
        const accessToken = (0, token_1.createJwt)({ email: newUser.email })
        if (!newUser)
            return res.status(402).json({ message: 'Unable to create user' })
        newUser.accessToken = accessToken
        await newUser.save()
        await (0, sendGrid_1.mailVerification)(
            newUser.firstName,
            newUser.email,
            newUser.verificationCode
        )
        return res.status(202).json({
            success: true,
            message: 'User has been created',
            data: newUser,
        })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: `User not created ${err}` })
    }
}
exports.register = register
const authenticate = async (req, res) => {
    const { email, password } = req.body
    const realCustomer = await users_1.User.findOne({ email: email })
    if (!realCustomer) {
        return res.status(404).json({ message: 'User not found' })
    }
    const hashPassword = (0, bcrypt_1.compare)(password, realCustomer.password)
    if (!hashPassword) {
        return res.status(404).json({ error: 'Invalid Credential' })
    }
    try {
        const access_token = (0, token_1.createJwt)({ realCustomer })
        res.cookie('access_token', access_token, accessTokenCookieOptions)
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        })
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            access_token,
        })
    } catch (err) {
        return err
    }
}
exports.authenticate = authenticate
