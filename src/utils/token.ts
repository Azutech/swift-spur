import jwt, { SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
import config from 'config'

dotenv.config()

export const secret = process.env.TOKEN_SECRET as string

// export const createToken = (
//     data: object,
//     secret: string,
//     expiresIn: string
// ) => {
//     return jwt.sign(data, secret, { expiresIn: '1d' })
// }

export const createJwt = (payload: Object, option: SignOptions = {}) => {
    const privateKey = Buffer.from(
        config.get<string>('tokenPrivatekeys'),
        'base64'
    ).toString('ascii')
    return jwt.sign(payload, privateKey, {
        ...(option && option),
        algorithm: 'RS256',
        expiresIn: '1d',
    })
}

export const verifyJwt = <T>(token: string): T | null => {
    try {
        const publicKey = Buffer.from(
            config.get<string>('tokenPublickeys'),
            'base64'
        ).toString('ascii')
        return jwt.verify(token, publicKey) as T
    } catch (err) {
        return null
    }
}
