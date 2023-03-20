import { Request, Response, NextFunction } from 'express'
import { User } from '../models/users'

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(200).json({ message: 'Unathorized' })
        }

        //    const roles = await User.find({role : {$in : user.role}})

        if (user.role !== 'admin') {
            return res
                .status(403)
                .json({ message: 'Forbidden, You are not an admin' })
        }

        next()
    } catch (err) {
        console.error(err)
        res.status(503).json({ message: 'Server Error' })
    }
}
