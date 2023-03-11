import { Router } from 'express'
import { user } from './users'

export const routes = Router()

routes.use('/users', user)
