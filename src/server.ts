import  express, {Application, Request, Response} from "express";
import dotenv from "dotenv"

dotenv.config()


const server: Application  = express()
const PORT = process.env.PORT


server.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message : 'Welcome to Swift-Spur \n Lets solve your financial problems'
  })
  console.log('BOOM 🔥🔥')
})

server.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'This route does not exist' });
  });

  server.listen(PORT, () => {
    console.log(`Express is listening at http://localhost:${PORT}`);
  });

export default server
  