import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') // change the destination directory as per your requirement
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    },
})

const fileFilter = function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void
    )
{
    if (!file.mimetype.match(/png|jpeg|jpg|gif$/i)) {
        cb(new Error('File type not supported'), false)
        return
    }
    cb(null, true)
}

// const uploads = multer({ storage: storage, fileFilter: fileFilter })

// export default uploads
