const { Sequelize, DataTypes } = require("sequelize");
import { ConnectionSequelize } from "../config/Dbconnection";
const Order = ConnectionSequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cropName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.FLOAT, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    deliveryStatus: { type: DataTypes.STRING, defaultValue: "Pending" },
  },
  {
    timestamps: true,
  }
);
export default Order;
