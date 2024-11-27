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
exports.fileUpload = void 0;
const farmer_1 = __importDefault(require("../models/farmer"));
const buyer_1 = __importDefault(require("../models/buyer"));
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
    }
    const user = JSON.parse(req.body.user);
    // console.log(user);
    if (user.role === "farmer") {
        yield farmer_1.default.update({ profilePhoto: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path }, { where: { id: user.id } });
    }
    if (user.role === "buyer") {
        yield buyer_1.default.update({ profilePhoto: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path }, { where: { id: user.id } });
    }
    res
        .status(200)
        .json({ message: "File uploaded successfully", file: req.file });
});
exports.fileUpload = fileUpload;
