import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

export const uploadToCloudinary = (file: string, folder: string) => {
    return cloudinary.uploader.upload(file, { folder }).then((data) => {
        return data
    })
}
