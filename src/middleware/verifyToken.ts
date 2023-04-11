import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/token'
import client from '../utils/redis'
import { User } from '../models/users'
import dotenv from 'dotenv'

dotenv.config()

export const deserializedUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

        const encryption = verifyJwt<{ sub: string }>(token)
        if (!encryption) {
            return res.status(404).json({ message: 'Invalid token' })
        }

        const session = client.get(encryption.sub)

        if (!session) {
            return res.status(404).json({ message: 'User session expired' })
        }

        const user = await User.findById({ _id: session })

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
