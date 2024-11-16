import { Model } from "sequelize";
import { ConnectionSequelize } from "../config/Dbconnection";
import { buyerInterface } from "../interfaces/buyerInterface";
const { Sequelize, DataTypes } = require("sequelize");
class BuyerInt extends Model<buyerInterface> implements buyerInterface {
  public id!: string;
  public firstname!: string;
  public lastname!: string;
  public phoneNo!: string;
  public password!: string;
  public profilePhoto!: string;
}
const Buyer = ConnectionSequelize.define<BuyerInt>(
  "Buyer",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    // idNo: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneNo: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profilePhoto: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

Buyer.beforeCreate(async (buyer) => {
  const lastBuyer = await Buyer.findOne({
    order: [["createdAt", "DESC"]],
  });

  let newIDNumber = 1;
  if (lastBuyer) {
    const lastID = lastBuyer.id;
    const lastNumber = parseInt(lastID.slice(1), 10);
    newIDNumber = lastNumber + 1;
  }

  buyer.id = `B${String(newIDNumber).padStart(6, "0")}`;
});

export default Buyer;
