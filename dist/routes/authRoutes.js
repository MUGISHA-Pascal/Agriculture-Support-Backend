"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControlller_1 = require("../controllers/authControlller");
const AuthRoutes = (0, express_1.Router)();
AuthRoutes.post("/login", authControlller_1.login);
AuthRoutes.post("/signup", authControlller_1.signup);
exports.default = AuthRoutes;
