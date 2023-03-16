import mongoose, { ConnectOptions } from 'mongoose'
// import { MongoMemoryServer } from 'mongodb-memory-server'

// describe('Database Connection Test', () => {
//     let mongoServer: any

//     beforeAll(async () => {
//         mongoServer = new MongoMemoryServer()

//         await mongoServer.start()
//         const uri = mongoServer.getUri()
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//         } as ConnectOptions)

//     })

//     afterAll(async () => {
//         await mongoose.disconnect()
//         await mongoServer.stop()
//     })

//     it('should connect to the test database', () => {
//         expect(mongoose.connection.readyState).toEqual(1)
//     })
// })

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
