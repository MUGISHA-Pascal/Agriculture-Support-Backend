"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dbconnection_1 = require("../config/Dbconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Buyer = Dbconnection_1.ConnectionSequelize.define("Buyer", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    idNo: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneNo: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true,
});
exports.default = Buyer;
