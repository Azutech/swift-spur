'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const redis_1 = __importDefault(require('redis'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const redisUrl = process.env.REDIS_UL
const client = redis_1.default.createClient({
    url: redisUrl,
})
const connectRedis = async () => {
    try {
        await client.connect()
        console.log('Redis client connected...')
    } catch (err) {
        console.log(err.message)
        setTimeout(connectRedis, 5000)
    }
}
connectRedis()
client.on('error', (err) => console.log(err))
exports.default = client
