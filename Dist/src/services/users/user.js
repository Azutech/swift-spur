"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyerUser = exports.getUser = exports.getAllUsers = void 0;
const users_1 = require("../../models/users");
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await users_1.User.find();
        if (!allUsers)
            return res
                .status(404)
                .json({ msg: 'You are able to perfrom this function' });
        return res.status(202).json({
            success: true,
            message: 'All users has been retrieved',
            data: allUsers,
        });
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const getThisUser = await users_1.User.findOne({ _id: id });
        if (!getThisUser)
            return res
                .status(404)
                .json({ msg: 'You are able to perfrom this function' });
        return res.status(200).json({
            success: true,
            message: 'All users has been retrieved',
            data: getThisUser,
        });
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
};
exports.getUser = getUser;
const destroyerUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const removeUser = await users_1.User.findOneAndDelete({ _id: id });
        if (!removeUser)
            return res
                .status(404)
                .json({ msg: 'You are able to perfrom this function' });
        return res.status(200).json({
            success: true,
            message: `user with this id ${id} has been deleted`,
            data: removeUser,
        });
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
};
exports.destroyerUser = destroyerUser;
