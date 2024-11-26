"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../middlewares/upload"));
const userController_1 = require("../controllers/userController");
const UserRoutes = (0, express_1.Router)();
UserRoutes.post("/upload", upload_1.default.single("file"), userController_1.fileUpload);
exports.default = UserRoutes;
