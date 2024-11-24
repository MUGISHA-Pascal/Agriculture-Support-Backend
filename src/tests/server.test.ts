import http from "http";
import { io, Socket } from "socket.io-client";
import {
  Server,
  Server as SocketIOServer,
  Socket as SocketIOSocket,
} from "socket.io";
import app from "../app";
import { AddressInfo } from "net";
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
});
