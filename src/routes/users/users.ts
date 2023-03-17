import { Router } from 'express'
import { getAllUsers, getUser, destroyerUser } from '../../services/users/user'

const users = Router()

users.get('/user/getAllUser', getAllUsers)
users.get('/user/getUser/:id', getUser)
users.delete('/user/destroyUser/:id', destroyerUser)
