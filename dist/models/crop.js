"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dbconnection_1 = require("../config/Dbconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Crop = Dbconnection_1.ConnectionSequelize.define("Crop", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    cropName: { type: DataTypes.STRING, allowNull: false },
    harvestSeason: { type: DataTypes.STRING, allowNull: false },
    qtyPerSeason: { type: DataTypes.FLOAT, allowNull: false },
    pricePerKg: { type: DataTypes.FLOAT, allowNull: false },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false }, // For the badge
}, {
    timestamps: true,
});
exports.default = Crop;
