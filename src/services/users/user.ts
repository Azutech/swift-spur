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

export const uploadImage = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await uploadToCloudinary(req.file?.path, 'file')

        const uploadImg = await User.findOneAndUpdate(
            { _id: id },
            { $set: { image: data } },
            { new: true }
        )
        if (!uploadImg) {
            return res.status(404).json({ err: 'unable to upload image' })
        }
        return res.status(202).json({
            msg: 'Image uploaded successfully',
            data: uploadImg,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json('server')
    }
}

export const address = async (req: Request, res: Response) => {
    const { id } = req.params
    const { address, city, state, zipcode } = req.body

    if (!(address || city || state || zipcode)) {
        return res.status(404).json({
            message: 'Input parameters required',
        })
    }

    try {
        const user = await User.findOne({ _id: id })
        if (!user) return res.status(404).json({ message: 'user not found' })

        const update = await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    Address: address,
                    'address.city': city,
                    'address.state': state,
                    'address.zipcode': zipcode,
                },
            }
        )
        console.log(update)
        return res.status(200).json({
            message: 'Address has been updated',
            status: true,
            data: update,
        })
    } catch (err) {
        console.error(err)
    }
}
