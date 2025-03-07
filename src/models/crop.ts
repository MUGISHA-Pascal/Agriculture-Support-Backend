import { Model } from "sequelize";
import { ConnectionSequelize } from "../config/Dbconnection";
import { CropInterface } from "../interfaces/cropInterface";
const { Sequelize, DataTypes } = require("sequelize");

class CropInt extends Model<CropInterface> implements CropInterface {
  public id!: string;
  public cropName!: string;
  public harvestSeason!: string;
  public qtyPerSeason!: number;
  public pricePerKg!: number;
  public cropOwner!: number;
}
const Crop = ConnectionSequelize.define<CropInt>(
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
    cropOwner: { type: DataTypes.INTEGER },
  },
  {
    timestamps: true,
  }
);
export default Crop;
