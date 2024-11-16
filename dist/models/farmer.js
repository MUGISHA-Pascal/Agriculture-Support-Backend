"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, DataTypes } = require("sequelize");
const Dbconnection_1 = require("../config/Dbconnection");
const Farmer = Dbconnection_1.ConnectionSequelize.define("Farmer", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: false },
    phoneNo: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    farmerGeneratedUniqueID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [6, 6] },
    },
    profilePhoto: { type: DataTypes.STRING },
}, {
    timestamps: true,
});
exports.default = Farmer;
