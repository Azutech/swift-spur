import { CookieOptions, Request, Response } from 'express'
import dotenv from 'dotenv'
import { createJwt } from '../../utils/token'
import { User } from '../../models/users'
import { hash, compare } from 'bcrypt'
import config from 'config'
import { generateCode } from '../../utils/generateCode'
import { mailVerification } from '../mail/sendGrid'

dotenv.config()

const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
}

export const register = async (req: Request, res: Response) => {
    const code = generateCode()

    const {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        sex,
        birthDate,
    } = req.body

    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(404).json({
                message: 'User already exist',
            })
        }
        const hashPassword = await hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            email,
            mobileNumber,
            password: hashPassword,
            sex,
            emailVerified: false,
            verificationCode: code,
            birthDate,
        })

        const accessToken = createJwt({ email: newUser.email })

        if (!newUser)
            return res.status(402).json({ message: 'Unable to create user' })

        newUser.accessToken = accessToken

        await newUser.save()

        await mailVerification(
            newUser.firstName as string,
            newUser.email as string,
            newUser.verificationCode as string
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

export const authenticate = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const realCustomer = await User.findOne({ email: email })
    if (!realCustomer) {
        return res.status(404).json({ message: 'User not found' })
    }
    const hashPassword = compare(password, realCustomer.password as string)
    if (!hashPassword) {
        return res.status(404).json({ error: 'Invalid Credential' })
    }

    try {
        const access_token = createJwt({ realCustomer })
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
