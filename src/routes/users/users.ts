import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'
import {
    getAllUsers,
    getUser,
    destroyerUser,
    uploadImage,
} from '../../services/users/user'
import upload from '../../middleware/multer'

export const admin = Router()

admin.post('/images/:id', upload.single('file'), uploadImage)
admin.get('/user/getAllUser', isAdmin, getAllUsers)
admin.get('/user/getUser/:id', isAdmin, getUser)
admin.delete('/user/destroyUser/:id', isAdmin, destroyerUser)
