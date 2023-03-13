"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required'],
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
        trim: true,
    },
    sex: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    birthDay: {
        type: Date,
        require: true,
    },
    profilePhoto: {
        type: String,
        required: false,
    },
    verificationCode: {
        type: String,
        select: true,
    },
    accessToken: {
        type: String,
        index: true,
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model('user', userSchema);
const validate = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(5)
            .max(50)
            .required(),
        password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        birthDate: joi_1.default.number().integer().min(1900).max(2013).required(),
        sex: joi_1.default.string().equal(['M', 'F', 'MALE', 'FEMALE']).required(),
    });
    return schema.validate(user);
};
exports.validate = validate;
