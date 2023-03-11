import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { createToken } from '../utils/token'
import { User } from '../models/users'
import { hash } from 'bcrypt'

const TOKEN_SECRET = process.env.TOKEN_SECRET as string

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, mobileNumber, password, sex } = req.body

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
        })

        const accessToken = createToken(
            { email: newUser.email },
            TOKEN_SECRET,
            '30s'
        )

        if (!newUser)
            return res.status(402).json({ message: 'Unable to create user' })
        newUser.accessToken = accessToken
        await newUser.save()
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
