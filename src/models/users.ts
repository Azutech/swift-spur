import mongoose, { Schema } from 'mongoose'
import Joi from 'joi'
import { AddressSchema } from './schema/AddressSchema'

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'LastName is required'],
        },

        lastName: {
            type: String,
            required: [true, 'LastName is required'],
        },

        email: {
            type: String,
            unique: true,
            required: [true, 'email is required'],
        },

        password: {
            type: String,
            required: [true, 'password is required'],
            trim: true,
        },

        mobileNumber: {
            type: String,
            required: [true, 'mobileNumber is required'],
            trim: true,
        },

        sex: {
            type: String,
            required: [true, 'sex is required'],
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        birthDate: {
            type: Date,
            require: true,
        },
        profilePhoto: {
            type: String,
            required: false,
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

        verificationCode: {
            type: String,
            select: true,
        },
        address: {
            type: AddressSchema,
            default: {},
        },

        image : {
            type: String,
            required: false
        },

        accessToken: {
            type: String,
            index: true,
        },
    },
    { timestamps: true }
)
export const User = mongoose.model('user', userSchema)

export const validateUser = (user: any) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        mobileNumber: Joi.string().length(11).required(),
        // .pattern(/[6-9]{1}[0-9]{9}/).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(5)
            .max(50)
            .required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$')),
        birthDate: Joi.date()
            .greater(new Date('1940-01-01'))
            .less(new Date('2018-01-01'))
            .required(),
        sex: Joi.string()
            .valid(...['M', 'F', 'MALE', 'FEMALE'])
            .required(),
    })
    return schema.validate(user)
}
