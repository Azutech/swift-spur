'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.connectionParams = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const customLog_1 = __importDefault(require('../logger/customLog'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
mongoose_1.default.set('debug', true)
exports.connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const uri = process.env.MONGO_URI
const database = async () => {
    await mongoose_1.default
        .connect(uri, exports.connectionParams)
        .then(() => {
            customLog_1.default.info('Connected to Swift DB on MongoDB cluster')
        })
        .catch((err) => {
            customLog_1.default.info(
                `Error connecting to the database. n${err}`
            )
            process.exit(1)
        })
}
exports.default = database
