import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

export const uploadToCloudinary = (
    path: string | undefined,
    folder: string
) => {
    if (!path) {
        throw new Error('Path is required for uploadToCloudinary function')
    }
    return cloudinary.uploader.upload(path, { folder }).then((data) => {
        return data
    })
}
