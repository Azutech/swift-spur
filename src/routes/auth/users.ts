import { Router } from 'express'
import { register, authenticate } from '../../services/auth/users'

export const user = Router()

user.post('/auth/sign-up', register)
user.post('/auth/login', authenticate)
