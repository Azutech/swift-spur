import { Request, Response } from "express"
import { User } from "../../models/users"
import { uploadToCloudinary } from "../../utils/cloudinary"


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

export const addNIN = async (req: Request, res: Response) => {
    const { id } = req.params

    const  { NIN } = req.body

    if(!NIN ) {return res.status(404).json({err: 'Input parameters required'})}

    try {
        const user = await User.findOne({_id: id})
        if(!user) {return res.status(404).json({err: 'user not found'})}

        


    } catch (err) {
        console.error(err)
    }
}
