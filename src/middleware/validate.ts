import { Request, Response, NextFunction } from 'express'

export const validate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema(req.body)
        console.log('error: ', error)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        next()
    }
}
