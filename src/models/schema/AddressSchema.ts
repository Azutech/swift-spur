import mongoose from 'mongoose'

export const AddressSchema = new mongoose.Schema(
    {
        streetAdress: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        zipcode: {
            type: String,
        },
    },
    { _id: false }
)
