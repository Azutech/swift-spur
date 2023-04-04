"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.createJwt = exports.secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// import config from 'config'
dotenv_1.default.config();
exports.secret = process.env.TOKEN_SECRET;
const privateKey = process.env.TOKEN_PRIVATE_KEY;
const publicKey = process.env.TOKEN_PUBLIC_KEY;
const tokenExpiry = process.env.TOKEN_EXPIRY_DATE;
const createJwt = (payload, option = {}) => {
    // const privateKey = Buffer.from(
    //     config.get<string>('tokenPrivatekey'),
    //     'base64'
    // ).toString('ascii')
    console.log(privateKey);
    return jsonwebtoken_1.default.sign(payload, privateKey, {
        ...(option && option),
        expiresIn: tokenExpiry,
    });
};
exports.createJwt = createJwt;
const verifyJwt = (token) => {
    try {
        // const publicKey = Buffer.from(
        //     config.get<string>('tokenPublickey'),
        //     'base64'
        // ).toString('ascii')
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (err) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
