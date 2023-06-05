import { model, Schema } from 'mongoose'
import { User } from './users'

const tokenSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: User,
        },

        token: {
            type: String,
            required: true,
        },

        createdAt: { type: Date, default: Date.now(), expires: 360 },
    },
    { timestamps: true }
)
export const Token = model('Token', tokenSchema)