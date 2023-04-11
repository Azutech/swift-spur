import { User } from '../../models/users'
import { Request, Response, NextFunction } from 'express'
import { uploadToCloudinary } from '../../utils/cloudinary'

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const allUsers = await User.find()
        if (!allUsers)
            return res
                .status(404)
                .json({ msg: 'You are able to perfrom this function' })
        return res.status(202).json({
            success: true,
            message: 'All users has been retrieved',
            data: allUsers,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params
    try {
        const getThisUser = await User.findOne({ _id: id })
        if (!getThisUser)
            return res
                .status(404)
                .json({ msg: 'You are able to perfrom this function' })
        return res.status(200).json({
            success: true,
            message: 'All users has been retrieved',
            data: getThisUser,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

export const destroyerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params
    try {
        const removeUser = await User.findOneAndDelete({ _id: id })
        if (!removeUser)
            return res
                .status(404)
                .json({ msg: 'You are able to perfrom this function' })
        return res.status(200).json({
            success: true,
            message: `user with this id ${id} has been deleted`,
            data: removeUser,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}
