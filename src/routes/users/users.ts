import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'
import { getAllUsers, getUser, destroyerUser } from '../../services/users/user'

export const admin = Router()

admin.get('/user/getAllUser', isAdmin, getAllUsers)
admin.get('/user/getUser/:id', isAdmin, getUser)
admin.delete('/user/destroyUser/:id', isAdmin, destroyerUser)
