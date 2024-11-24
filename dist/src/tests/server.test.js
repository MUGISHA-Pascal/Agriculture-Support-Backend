"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_client_1 = require("socket.io-client");
const farmer_1 = __importDefault(require("../models/farmer"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("../app"));
const buyer_1 = __importDefault(require("../models/buyer"));
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
    it("should handle rating event and update farmer's rating ", (done) => {
        const mockFindAll = jest
            .fn()
            .mockResolvedValue([{ id: 1, ratingCount: 5 }]);
        const mockFindOne = jest
            .fn()
            .mockResolvedValue({ id: 1, ratingCount: 5, ratingAverage: 4 });
        const mockUpdate = jest.fn().mockResolvedValue([1]);
        farmer_1.default.findAll = mockFindAll;
        farmer_1.default.findOne = mockFindOne;
        farmer_1.default.update = mockUpdate;
        const mockBuyerCount = jest.fn().mockResolvedValue(10);
        buyer_1.default.count = mockBuyerCount;
        const rate = 4;
        const farmerId = 1;
        socket.emit("rate", { rate, farmerId });
        setTimeout(() => {
            expect(mockFindOne).toHaveBeenCalledWith({ where: { id: farmerId } });
            expect(mockUpdate).toHaveBeenCalledWith({
                ratingAverage: expect.any(Number),
            }, { where: { id: farmerId } });
            done();
        }, 10000);
    });
    it("should not crash on error in rating event ", (done) => {
        const mockFindAll = jest
            .fn()
            .mockResolvedValue([{ id: 1, ratingCount: 5 }]);
        const mockFindOne = jest.fn().mockResolvedValue({ id: 1, ratingCount: 5 });
        const mockUpdate = jest
            .fn()
            .mockResolvedValue(new Error("Failed to update"));
        farmer_1.default.findAll = mockFindAll;
        farmer_1.default.findOne = mockFindOne;
        farmer_1.default.update = mockUpdate;
        const mockBuyerCount = jest.fn().mockResolvedValue(10);
        buyer_1.default.count = mockBuyerCount;
        const rate = 3;
        const farmerId = 1;
        const consoleSpy = jest.spyOn(console, "log");
        socket.emit("rate", { rate, farmerId });
        setTimeout(() => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
            done();
        }, 10000);
    });
});
