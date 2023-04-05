'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isAdmin = void 0
const users_1 = require('../models/users')
const isAdmin = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await users_1.User.findById(id)
        if (!user) {
            return res.status(200).json({ message: 'Unathorized' })
        }
        //    const roles = await User.find({role : {$in : user.role}})
        if (user.role !== 'admin') {
            return res
                .status(403)
                .json({ message: 'Forbidden, You are not an admin' })
        }
        next()
    } catch (err) {
        console.error(err)
        res.status(503).json({ message: 'Server Error' })
    }
}
exports.isAdmin = isAdmin
