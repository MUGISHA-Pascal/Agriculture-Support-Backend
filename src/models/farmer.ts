const { Sequelize, DataTypes } = require("sequelize");
import { ConnectionSequelize } from "../config/Dbconnection";
const Farmer = ConnectionSequelize.define(
  "Farmer",
  {
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
  },
  {
    timestamps: true,
  }
);
export default Farmer;
