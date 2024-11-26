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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Dbconnection_1 = require("./config/Dbconnection");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cropRoutes_1 = __importDefault(require("./routes/cropRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(body_parser_1.default.json());
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Dbconnection_1.ConnectionSequelize.authenticate();
        yield Dbconnection_1.ConnectionSequelize.sync({ alter: true });
        console.log("connected to the database and saved");
    }
    catch (error) {
        console.log(error);
    }
}))();
app.use("/auth", authRoutes_1.default);
app.use("/crops", cropRoutes_1.default);
app.use("/orders", orderRoutes_1.default);
app.use("/user", userRoutes_1.default);
exports.default = app;
