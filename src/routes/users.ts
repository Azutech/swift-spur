import { Router } from 'express'
import { register } from '../services/users'

export const user = Router()

user.post('/auth/sign-up', register)
