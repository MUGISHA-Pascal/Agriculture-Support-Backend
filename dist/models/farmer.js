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
const { DataTypes } = require("sequelize");
const sequelize_1 = require("sequelize");
const Dbconnection_1 = require("../config/Dbconnection");
class FarmerInt extends sequelize_1.Model {
}
const Farmer = Dbconnection_1.ConnectionSequelize.define("Farmer", {
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
}, {
    timestamps: true,
});
Farmer.beforeCreate((farmer) => __awaiter(void 0, void 0, void 0, function* () {
    const lastFarmer = yield Farmer.findOne({
        order: [["createdAt", "DESC"]],
    });
    let newIDNumber = 1;
    if (lastFarmer) {
        const lastID = lastFarmer.farmerGeneratedUniqueID;
        const lastNumber = parseInt(lastID.slice(1), 10);
        newIDNumber = lastNumber + 1;
    }
    farmer.farmerGeneratedUniqueID = `F${String(newIDNumber).padStart(6, "0")}`;
}));
exports.default = Farmer;
