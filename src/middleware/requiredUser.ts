import { Request, Response } from 'express'

export const requiredUser = (req: Request, res: Response) => {
    try {
        const user = res.locals.user
        if (!user) {
            return res.status(404).json({ msg: 'Invalid token' })
        }
    } catch (err) {
        return err
    }
}
