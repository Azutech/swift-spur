import redis from 'redis'
import dotenv from 'dotenv'

dotenv.config()



const redisUrl = process.env.REDIS_UL as string


const client = redis.createClient({
    url : redisUrl
}) 

const connectRedis = async () => {
    try {
        await client.connect()
        console.log('Redis client connected...');
    } catch (err: any) {
        console.log(err.message);
    setTimeout(connectRedis, 5000);
        
    }
}

connectRedis();

client.on('error', (err) => console.log(err));

export default client