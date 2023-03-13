import jwt, { SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
import config from 'config'

dotenv.config()

export const secret = process.env.TOKEN_SECRET as string
const privateKey = process.env.TOKEN_PRIVATE_KEY as string
const publicKey = process.env.TOKEN_PUBLIC_KEY as string

export const createJwt = (payload: Object, option: SignOptions = {}) => {
    // const privateKey = Buffer.from(
    //     config.get<string>('tokenPrivatekey'),
    //     'base64'
    // ).toString('ascii')

    console.log(privateKey)
    return jwt.sign(payload, privateKey, {
        ...(option && option),
        expiresIn: '1d',
    })
}

export const verifyJwt = <T>(token: string): T | null => {
    try {
        // const publicKey = Buffer.from(
        //     config.get<string>('tokenPublickey'),
        //     'base64'
        // ).toString('ascii')
        return jwt.verify(token, publicKey) as T
    } catch (err) {
        return null
    }
}
