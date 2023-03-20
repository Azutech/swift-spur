import mongoose, { Schema } from 'mongoose'
import Joi from 'joi'

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
            type: Number,
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
        birthDay: {
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

        accessToken: {
            type: String,
            index: true,
        },
    },
    { timestamps: true }
)
export const User = mongoose.model('user', userSchema)

export const validate = (user: any) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(5)
            .max(50)
            .required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        birthDate: Joi.number().integer().min(1900).max(2013).required(),
        sex: Joi.string().equal(['M', 'F', 'MALE', 'FEMALE']).required(),
    })
    return schema.validate(user)
}
