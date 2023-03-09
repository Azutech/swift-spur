"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./connections/database"));
dotenv_1.default.config();
const server = (0, express_1.default)();
const PORT = process.env.PORT;
(0, database_1.default)().catch((err) => console.error(err));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Swift-Spur \n Lets solve your financial problems',
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
