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
exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const farmer_1 = __importDefault(require("../models/farmer"));
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_KEY, { expiresIn: "1d" });
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNo, password } = req.body;
    try {
        const farmer = yield farmer_1.default.findOne({ where: { password } });
        if (farmer_1.default) {
            const auth = yield farmer_1.default.findOne({ where: { phoneNo } });
            if (auth) {
                const token = createToken(auth.id);
                res.cookie("jwt", token, { maxAge: maxAge * 1000 });
                res.status(200).json({
                    message: "Farmer found",
                    Farmer: {
                        id: auth.id,
                        farmerUniqueId: auth.farmerGeneratedUniqueID,
                        firstname: auth.firstname,
                        lastname: auth.lastname,
                        country: auth.country,
                        district: auth.district,
                        phoneNo: auth.phoneNo,
                    },
                });
            }
            else {
                res.status(401).json({ message: "Farmer not found(password)" });
            }
        }
        else {
            res.status(401).json({ message: "Farmer not found(email)" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, country, district, phoneNo, password } = req.body;
    try {
        const farmer = yield farmer_1.default.create({
            firstname,
            lastname,
            country,
            district,
            phoneNo,
            password,
        });
        const token = createToken(farmer.id);
        res.cookie("jwt", token, { maxAge: maxAge * 1000 });
        res.status(200).json({
            message: "Farmer created",
            Farmer: {
                id: farmer.id,
                farmerUniqueId: farmer.farmerGeneratedUniqueID,
                firstname: farmer.firstname,
                lastname: farmer.lastname,
                country: farmer.country,
                district: farmer.district,
                phoneNo: farmer.phoneNo,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signup = signup;
