import { Schema, model } from 'mongoose'
import { User } from './users'

const loanSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: User,
        },

        loanApproved: {
            type: Boolean,
            default: false,
        },

        loanEligiblity: {
            type: Boolean,
            required: true,
            default: false,
        },

        loanAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

export const Loans = model('loans', loanSchema)
