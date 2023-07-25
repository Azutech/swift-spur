import { CookieOptions, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { createJwt } from '../../utils/token'
import { User } from '../../models/users'
import { hash, compare } from 'bcrypt'
import config from 'config'
import { generateCode } from '../../utils/generateCode'
import { passGenerator } from '../../utils/passwordCode'
import { mailVerification, forgotPasswordMail } from '../mail/sendGrid'
import { AppError } from '../../utils/errors'
import { Token } from '../../models/token'


dotenv.config()

const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
}

const CLIENT_URL = process.env.CLIENT_URL as string

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
            return next(new AppError('User already Exist', 404))
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

        if (!newUser) return next(new AppError('Unable to Create User', 404))

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
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 500))
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body

    const realCustomer = await User.findOne({ email: email })
    if (!realCustomer) {
        return next(new AppError('User does not Exist', 404))
    }
    const hashPassword = compare(password, String(realCustomer.password))
    if (!hashPassword) {
        return next(new AppError('Invalid Credentials', 404))
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
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 500))
    }
}

export const forgotpass = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const code = passGenerator()

    try {
        const { email } = req.body

        const founder = await User.findOne({ email: email })

        if (!founder) {
            return next(new AppError('Email not found', 404))
        }

        let token = await Token.findOne({ owner: founder._id })
        if (token) await token.deleteOne()

        const newToken = await new Token({
            owner: founder._id,
            token: code,
        }).save()

        const link = `${CLIENT_URL}/passwordReset?token=${code}/&id=${founder._id}`

        await forgotPasswordMail(String(founder.firstName), String(founder.email), link)

        return res.status(200).json({
            success: true,
            message: 'mail has been sent to email',
            data: newToken,
        })
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 501))
    }
}
