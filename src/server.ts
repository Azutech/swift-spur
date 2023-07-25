import express, { Application, Request, Response } from 'express'
import log from '../src/logger/customLog'
import dotenv from 'dotenv'
import { routes } from './routes/router'
import database from './connections/database'

dotenv.config()

const server: Application = express()
const PORT = process.env.PORT

database().catch((err) => console.error(err))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/api',routes)

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to Swift-Spur \n Lets solve your financial problems',
    })
    log.info('BOOM 🔥🔥')
})

server.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'This route does not exist' })
})

server.listen(PORT, () => {
    log.info(`Express is listening at http://localhost:${PORT}`)
})

export default server
