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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize_1 = require("sequelize");
const Dbconnection_1 = require("../config/Dbconnection");
const bcrypt_1 = __importDefault(require("bcrypt"));
class FarmerInt extends sequelize_1.Model {
}
const Farmer = Dbconnection_1.ConnectionSequelize.define("Farmer", {
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
    // rating: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    // subscriptionType: {
    // 	type: DataTypes.ENUM("Basic", "Premium"),
    // 	// allowNull: false,
    // 	defaultValue: "Basic",
    // },
    subscriptionStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    subscriptionEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    ratingAverage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    ratingCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    hooks: {
        beforeSave: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(user.password, salt);
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.changed("password")) {
                const salt = yield bcrypt_1.default.genSalt(10);
                user.password = yield bcrypt_1.default.hash(user.password, salt);
            }
        }),
    },
});
exports.default = Farmer;
