const { Sequelize, DataTypes } = require("sequelize");
import { Model } from "sequelize";
import { ConnectionSequelize } from "../config/Dbconnection";
import { orderInterface } from "../interfaces/orderInterface";
class OrderInt extends Model<orderInterface> implements orderInterface {
  public id!: string;
  public cropName!: string;
  public quantity!: number;
  public totalPrice!: number;
  public deliveryStatus!: string;
}
const Order = ConnectionSequelize.define<OrderInt>(
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
