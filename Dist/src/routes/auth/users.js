'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.user = void 0
const express_1 = require('express')
const users_1 = require('../../services/auth/users')
exports.user = (0, express_1.Router)()
exports.user.post('/auth/sign-up', users_1.register)
exports.user.post('/auth/login', users_1.authenticate)
