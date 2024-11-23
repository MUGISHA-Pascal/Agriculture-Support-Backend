"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, DataTypes } = require("sequelize");
const sequelize_1 = require("sequelize");
const Dbconnection_1 = require("../config/Dbconnection");
class OrderInt extends sequelize_1.Model {
}
const Order = Dbconnection_1.ConnectionSequelize.define("Order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    cropName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.FLOAT, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    deliveryStatus: { type: DataTypes.STRING, defaultValue: "Pending" },
}, {
    timestamps: true,
});
exports.default = Order;
