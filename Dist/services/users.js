"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const token_1 = require("../utils/token");
const users_1 = require("../models/users");
const bcrypt_1 = require("bcrypt");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const register = async (req, res) => {
    const { firstName, lastName, email, mobileNumber, password, sex } = req.body;
    try {
        const existingUser = await users_1.User.findOne({ email: email });
        if (existingUser) {
            return res.status(404).json({
                message: 'User already exist',
            });
        }
        const hashPassword = await (0, bcrypt_1.hash)(password, 10);
        const newUser = new users_1.User({
            firstName,
            lastName,
            email,
            mobileNumber,
            password: hashPassword,
            sex,
            emailVerified: false,
        });
        const accessToken = (0, token_1.createToken)({ email: newUser.email }, TOKEN_SECRET, '30s');
        if (!newUser)
            return res.status(402).json({ message: 'Unable to create user' });
        newUser.accessToken = accessToken;
        await newUser.save();
        return res.status(202).json({
            success: true,
            message: 'User has been created',
            data: newUser,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ message: `User not created ${err}` });
    }
};
exports.register = register;
