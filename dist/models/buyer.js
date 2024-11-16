"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Dbconnection_1 = require("../config/Dbconnection");
const { Sequelize, DataTypes } = require("sequelize");
class BuyerInt extends sequelize_1.Model {
}
const Buyer = Dbconnection_1.ConnectionSequelize.define("Buyer", {
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
}, {
    timestamps: true,
});
Buyer.beforeCreate((buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const lastBuyer = yield Buyer.findOne({
        order: [["createdAt", "DESC"]],
    });
    let newIDNumber = 1;
    if (lastBuyer) {
        const lastID = lastBuyer.id;
        const lastNumber = parseInt(lastID.slice(1), 10);
        newIDNumber = lastNumber + 1;
    }
    buyer.id = `B${String(newIDNumber).padStart(6, "0")}`;
}));
exports.default = Buyer;
