import { Router } from 'express'
import { validate } from '../../middleware/validate'
import { validateUser } from '../../models/users'
import { register, authenticate } from '../../services/auth/users'

export const user = Router()

user.post('/auth/sign-up', [validate(validateUser)], register)
user.post('/auth/login', authenticate)
