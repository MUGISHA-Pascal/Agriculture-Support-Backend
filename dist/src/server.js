"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const swagger_1 = __importDefault(require("./swagger"));
const buyer_1 = __importDefault(require("./models/buyer"));
const farmer_1 = __importDefault(require("./models/farmer"));
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server);
const port = process.env.PORT;
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    let farmers = yield farmer_1.default.findAll();
    let SocketRateManage = new Map();
    farmers.map((farmer) => {
        SocketRateManage.set(farmer.id, farmer.ratingCount);
    });
    socket.on("rate", (_a) => __awaiter(void 0, [_a], void 0, function* ({ rate, farmerId }) {
        const farmerSpecified = yield farmer_1.default.findOne({ where: { id: farmerId } });
        (farmerSpecified === null || farmerSpecified === void 0 ? void 0 : farmerSpecified.ratingCount)
            ? (farmerSpecified.ratingCount += rate)
            : farmerSpecified === null || farmerSpecified === void 0 ? void 0 : farmerSpecified.ratingCount;
        SocketRateManage.set(farmerId, farmerSpecified === null || farmerSpecified === void 0 ? void 0 : farmerSpecified.ratingCount);
        try {
            const AllBuyers = yield buyer_1.default.count();
            const totalRatings = AllBuyers * 5;
            const averageRating = (SocketRateManage.get(farmerId) / totalRatings) * 100;
            let farmerUpdated = yield farmer_1.default.update({ ratingAverage: averageRating }, { where: { id: farmerId } });
            if (!farmerUpdated)
                throw new Error("error finding the farmer to be updated");
            io.emit("rating", {
                ratingAverage: farmerSpecified === null || farmerSpecified === void 0 ? void 0 : farmerSpecified.ratingAverage,
                farmerId: farmerSpecified === null || farmerSpecified === void 0 ? void 0 : farmerSpecified.id,
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
}));
server.listen(port, () => {
    console.log("app running on port", port);
});
(0, swagger_1.default)(app_1.default, port);
