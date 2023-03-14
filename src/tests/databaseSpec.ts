import mongoose from 'mongoose'
import { connectionParams } from '../connections/database'
import { ConnectionOptions } from 'tls'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI as string

describe('Mongoose Connection Test', () => {
    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(uri, connectionParams as ConnectionOptions)
    })

    afterAll(async () => {
        // Disconnect from the test database
        await mongoose.disconnect()
    })

    it('should connect to the test database', () => {
        expect(mongoose.connection.readyState).toEqual(2)
    })
})
