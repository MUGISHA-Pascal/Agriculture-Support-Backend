"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buyer_1 = __importDefault(require("./buyer"));
const crop_1 = __importDefault(require("./crop"));
const farmer_1 = __importDefault(require("./farmer"));
const order_1 = __importDefault(require("./order"));
farmer_1.default.hasMany(crop_1.default, { foreignKey: "farmerId", onDelete: "CASCADE" });
crop_1.default.belongsTo(farmer_1.default, { foreignKey: "farmerId" });
buyer_1.default.hasMany(order_1.default, { foreignKey: "buyerId", onDelete: "CASCADE" });
order_1.default.belongsTo(buyer_1.default, { foreignKey: "buyerId" });
farmer_1.default.hasMany(order_1.default, { foreignKey: "farmerId", onDelete: "CASCADE" });
order_1.default.belongsTo(farmer_1.default, { foreignKey: "farmerId" });
exports.default = { Buyer: buyer_1.default, Order: order_1.default, Crop: crop_1.default, Farmer: farmer_1.default };
