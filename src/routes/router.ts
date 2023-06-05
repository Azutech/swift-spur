        import { Router } from 'express'
import { user } from './auth/users'
import { admin } from './users/users'

export const routes = Router()

routes.use('/users', user)
routes.use('/users', admin)
