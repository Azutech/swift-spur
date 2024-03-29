'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = __importDefault(require('mongoose'))
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
const database_1 = require('../connections/database')
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const uri = process.env.MONGO_URI
describe('Mongoose Connection Test', () => {
    beforeAll(async () => {
        // Connect to the test database
        await mongoose_1.default.connect(uri, database_1.connectionParams)
    })
    afterAll(async () => {
        // Disconnect from the test database
        await mongoose_1.default.disconnect()
    })
    it('should connect to the test database', () => {
        expect(mongoose_1.default.connection.readyState).toEqual(2)
    })
})
