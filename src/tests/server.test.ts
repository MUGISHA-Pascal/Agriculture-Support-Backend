import http from "http";
import { io, Socket } from "socket.io-client";
import Farmer from "../models/farmer";
import {
  Server,
  Server as SocketIOServer,
  Socket as SocketIOSocket,
} from "socket.io";
import app from "../app";
import { AddressInfo } from "net";
import { farmerInterface } from "../interfaces/farmerInterface";
import Buyer from "../models/buyer";
import { where } from "sequelize";
jest.mock("../models/farmer");
jest.mock("../models/buyer");

describe("Socket io rating system", () => {
  let server: http.Server;
  let ioServer: SocketIOServer;
  let socket: Socket;
  beforeAll((done) => {
    server = http.createServer(app);
    ioServer = new Server(server);
    server.listen(0, () => {
      const address = server.address() as AddressInfo;
      if (address) {
        socket = io(`http://localhost:${address?.port}`);
      } else {
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
    Farmer.findAll = mockFindAll;
    Farmer.findOne = mockFindOne;
    Farmer.update = mockUpdate;
    const mockBuyerCount = jest.fn().mockResolvedValue(10);
    Buyer.count = mockBuyerCount;
    const rate = 4;
    const farmerId = 1;
    socket.emit("rate", { rate, farmerId });
    setTimeout(() => {
      expect(mockFindOne).toHaveBeenCalledWith({ where: { id: farmerId } });
      expect(mockUpdate).toHaveBeenCalledWith(
        {
          ratingAverage: expect.any(Number),
        },

        { where: { id: farmerId } }
      );
      done();
    }, 1000);
  });

  it("should not crash on error in rating event ", (done) => {
    const mockFindAll = jest
      .fn()
      .mockResolvedValue([{ id: 1, ratingCount: 5 }]);
    const mockFindOne = jest.fn().mockResolvedValue({ id: 1, ratingCount: 5 });
    const mockUpdate = jest
      .fn()
      .mockResolvedValue(new Error("Failed to update"));
    Farmer.findAll = mockFindAll;
    Farmer.findOne = mockFindOne;
    Farmer.update = mockUpdate;
    const mockBuyerCount = jest.fn().mockResolvedValue(10);
    Buyer.count = mockBuyerCount;

    const rate = 3;
    const farmerId = 1;
    const consoleSpy = jest.spyOn(console, "log");
    socket.emit("rate", { rate, farmerId });
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      done();
    }, 1000);
  });
});
