const { DataTypes } = require("sequelize");
import { Model } from "sequelize";
import { ConnectionSequelize } from "../config/Dbconnection";
import { farmerInterface } from "../interfaces/farmerInterface";

class FarmerInt extends Model<farmerInterface> implements farmerInterface {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public country!: string;
  public district!: string;
  public phoneNo!: string;
  public profilePhoto!: string;
  public password!: string;
  public farmerGeneratedUniqueID!: string;
  public subscriptionType!: "Basic" | "Premium";
  public subscriptionStartDate!: Date;
  public subscriptionEndDate!: Date;
}

const Farmer = ConnectionSequelize.define<FarmerInt>(
  "Farmer",
  {
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    // },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      // primaryKey: true,
      allowNull: false,
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
      primaryKey: true,
      unique: true,
    },
    profilePhoto: { type: DataTypes.STRING },

    subscriptionType: {
      type: DataTypes.ENUM("Basic", "Premium"),
      allowNull: false,
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
  }
);

Farmer.beforeCreate(async (farmer) => {
  const lastFarmer = await Farmer.findOne({
    order: [["createdAt", "DESC"]],
  });

  let newIDNumber = 1;
  if (lastFarmer) {
    const lastID = lastFarmer.farmerGeneratedUniqueID;
    const lastNumber = parseInt(lastID.slice(1), 10);
    newIDNumber = lastNumber + 1;
  }

  farmer.farmerGeneratedUniqueID = `F${String(newIDNumber).padStart(6, "0")}`;
});

export default Farmer;
