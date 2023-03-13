import mongoose from 'mongoose'
import { ConnectionOptions } from 'tls'
import dotenv from 'dotenv'

dotenv.config()
mongoose.set('debug', true)
export const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const uri = process.env.MONGO_URI as string

const database = async () => {
    await mongoose
        .connect(uri, connectionParams as ConnectionOptions)
        .then(() => {
            console.log('Connected to Swift DB on MongoDB cluster')
        })
        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`)
            process.exit(1)
        })
}

export default database
