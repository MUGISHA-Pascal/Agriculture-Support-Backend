import { ConnectionSequelize } from "../config/Dbconnection";
const { Sequelize, DataTypes } = require("sequelize");

const Crop = ConnectionSequelize.define(
  "Crop",
  {
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
  },
  {
    timestamps: true,
  }
);
