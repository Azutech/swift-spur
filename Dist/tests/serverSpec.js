"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe('Tests server connection', () => {
    it('it expects server to be running', async () => {
        const request = (0, supertest_1.default)(server_1.default);
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.body.message).toBe('Welcome to Swift-Spur \n Lets solve your financial problems');
    });
});
