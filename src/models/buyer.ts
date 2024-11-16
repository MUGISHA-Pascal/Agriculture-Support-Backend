import { ConnectionSequelize } from "../config/Dbconnection";
const { Sequelize, DataTypes } = require("sequelize");
const Buyer = ConnectionSequelize.define(
  "Buyer",
  {
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
  },
  {
    timestamps: true,
  }
);

export default Buyer;
