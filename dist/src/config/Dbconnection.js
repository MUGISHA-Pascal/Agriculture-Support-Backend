"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionSequelize = void 0;
const sequelize_1 = require("sequelize");
exports.ConnectionSequelize = new sequelize_1.Sequelize({
    username: "postgres",
    password: "postgres",
    host: "localhost",
    dialect: "postgres",
    logging: false,
    port: 5432,
    database: "farm2global",
});
