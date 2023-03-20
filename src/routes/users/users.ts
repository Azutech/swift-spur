import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'
import { getAllUsers, getUser, destroyerUser } from '../../services/users/user'

const users = Router()

users.get('/user/getAllUser', isAdmin, getAllUsers)
users.get('/user/getUser/:id', isAdmin, getUser)
users.delete('/user/destroyUser/:id', isAdmin, destroyerUser)
