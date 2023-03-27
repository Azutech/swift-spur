'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const admin_1 = require('../../middleware/admin')
const user_1 = require('../../services/users/user')
const users = (0, express_1.Router)()
users.get('/user/getAllUser', admin_1.isAdmin, user_1.getAllUsers)
users.get('/user/getUser/:id', admin_1.isAdmin, user_1.getUser)
users.delete('/user/destroyUser/:id', admin_1.isAdmin, user_1.destroyerUser)
