const { DataTypes } = require("sequelize");
import { Model } from "sequelize";
import { ConnectionSequelize } from "../config/Dbconnection";
import { farmerInterface } from "../interfaces/farmerInterface";
import bcrypt from "bcrypt";
class FarmerInt extends Model<farmerInterface> implements farmerInterface {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public country!: string;
  public district!: string;
  public phoneNo!: string;
  public profilePhoto!: string;
  public password!: string;
  public subscriptionType!: "Basic" | "Premium";
  public subscriptionStartDate!: Date;
  public subscriptionEndDate!: Date;
  public rating?: number;
}

const Farmer = ConnectionSequelize.define<FarmerInt>(
  "Farmer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: false },
    phoneNo: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profilePhoto: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    subscriptionType: {
      type: DataTypes.ENUM("Basic", "Premium"),
      // allowNull: false,
      defaultValue: "Basic",
    },
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeSave: async (user: FarmerInt) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user: FarmerInt) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default Farmer;
