import mongoose, { Schema } from 'mongoose'
import Joi from 'joi'

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: [true, 'LastName is required'],
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
        },

        mobileNumber: {
            type: Number,
            required: true,
            trim: true,
        },

        sex: {
            type: String,
            required: true,
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
