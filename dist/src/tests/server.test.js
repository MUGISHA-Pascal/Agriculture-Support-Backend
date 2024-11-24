"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_client_1 = require("socket.io-client");
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("../app"));
jest.mock("../models/farmer");
jest.mock("../models/buyer");
describe("Socket io rating system", () => {
    let server;
    let ioServer;
    let socket;
    beforeAll((done) => {
        server = http_1.default.createServer(app_1.default);
        ioServer = new socket_io_1.Server(server);
        server.listen(0, () => {
            const address = server.address();
            if (address) {
                socket = (0, socket_io_client_1.io)(`http://localhost:${address === null || address === void 0 ? void 0 : address.port}`);
            }
            else {
                throw new Error("server address invalid");
            }
            done();
        });
    });
    afterAll(() => {
        ioServer.close();
        server.close();
    });
});
