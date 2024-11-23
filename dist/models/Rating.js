"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Dbconnection_1 = require("../config/Dbconnection");
class RatingInt extends sequelize_1.Model {
}
const Rating = Dbconnection_1.ConnectionSequelize.define("Rating", {
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    farmerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});
