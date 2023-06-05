import { Router } from 'express'
import { validate } from '../../middleware/validate'
import { validateUser } from '../../models/users'
import { register, authenticate, forgotpass } from '../../services/auth/users'

export const user = Router()

user.post('/auth/sign-up', [validate(validateUser)], register)
user.post('/auth/login', authenticate)
user.post('/auth/forgotpass', forgotpass)
