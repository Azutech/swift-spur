"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, express_1.default)();
const PORT = process.env.PORT;
server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Swift-Spur \n Lets solve your financial problems'
    });
    console.log('BOOM 🔥🔥');
});
server.get('*', (req, res) => {
    res.status(404).json({ message: 'This route does not exist' });
});
server.listen(PORT, () => {
    console.log(`Express is listening at http://localhost:${PORT}`);
});
exports.default = server;
