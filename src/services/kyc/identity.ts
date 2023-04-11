import { Request, Response } from 'express'
import { User } from '../../models/users'
import { uploadToCloudinary } from '../../utils/cloudinary'

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
        return res.status(500).json({ err: 'server error' })
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
        return res.status(500).json({ err: 'server error' })
    }
}

export const addNIN = async (req: Request, res: Response) => {
    const { id } = req.params

    const { NIN } = req.body

    if (!NIN) {
        return res.status(404).json({ err: 'Input parameters required' })
    }

    try {
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ err: 'user not found' })
        }

        const userId = await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    IdendityNumber: NIN,
                },
            }
        )
        return res.status(201).json({
            message: 'NIN number has been added',
            data: userId,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ err: 'server error' })
    }
}

export const kyc = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ err: 'User not found' })

        if ((user.address || user.IdendityNumber || user.image) === null) {
            return res.status(404).json({ err: 'documents not updated' })
        }

        const userId = await User.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    kycVerificationStatus: 'approved',
                },
            }
        )

        if (!userId)
            return res.status(404).json({ err: 'Unable to approve KYC' })

        await userId.save()

        return res.status(200).json({
            msg: 'KYC has been appproved',
            data: userId,
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({
            status: 'server error',
            message: err.message,
        })
    }
}
