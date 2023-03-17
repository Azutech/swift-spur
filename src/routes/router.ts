import { Router } from 'express'
import { user } from './auth/users'

export const routes = Router()

routes.use('/users', user)
