import { DataTypes, Model } from "sequelize";
import { RatingInterface } from "../interfaces/RatingInterface";
import { ConnectionSequelize } from "../config/Dbconnection";

class RatingInt extends Model<RatingInterface> implements RatingInterface {
  public rating!: number;
  public farmerId!: number;
}

const Rating = ConnectionSequelize.define<RatingInt>(
  "Rating",
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    farmerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
