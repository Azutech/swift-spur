import mongoose from 'mongoose'

export const IdentitySchema = new mongoose.Schema(
    {
        NationtalIndentityNumber: {
            type: Number,
        },
       
    },
    { _id: false }
)
