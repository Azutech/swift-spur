"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.secret = process.env.TOKEN_SECRET;
const createToken = (data, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(data, secret, { expiresIn: '1d' });
};
exports.createToken = createToken;
