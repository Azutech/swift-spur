import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 20,
            min: 3,
        },

        lastName: {
            type: String,
            required: true,
            max: 25,
            min: 3,
        },

        email: {
            type: String,
            required: true,
        },

        mobileNumber: {
            type: String,
            required: true,
            trim: true,
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },

        profilePhoto: {
            type: String,
            required: false,
        },

        verificationCode: {
            type: String,
            select: true,
        },

        refreshtoken: {
            type: String,
            index: true,
        },
    },
    { timestamps: true }
)
const User = model('user', userSchema)
export default User
