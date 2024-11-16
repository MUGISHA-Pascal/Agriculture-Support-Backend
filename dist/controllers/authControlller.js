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
const buyer_1 = __importDefault(require("../models/buyer"));
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_KEY, { expiresIn: "1d" });
};
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user (buyer or farmer)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNo:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [buyer, farmer]
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 Farmer:
 *                   type: object
 *       401:
 *         description: Unauthorized, incorrect phone number or password
 *       404:
 *         description: Unknown role
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNo, password, role } = req.body;
    if (role === "buyer") {
        try {
            const buyer = yield buyer_1.default.findOne({ where: { password } });
            if (buyer) {
                const auth = yield buyer_1.default.findOne({ where: { phoneNo } });
                if (auth) {
                    const buyerId = parseInt(auth.id.slice(1), 10);
                    const token = createToken(buyerId);
                    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
                    res.status(200).json({
                        message: "buyer found",
                        Farmer: {
                            id: auth.id,
                            firstname: auth.firstname,
                            lastname: auth.lastname,
                            phoneNo: auth.phoneNo,
                        },
                    });
                }
                else {
                    res.status(401).json({ message: "buyer not found(phone number)" });
                }
            }
            else {
                res.status(401).json({ message: "buyer not found(password)" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    else if (role === "farmer") {
        try {
            const farmer = yield farmer_1.default.findOne({ where: { password } });
            if (farmer) {
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
                    res.status(401).json({ message: "Farmer not found(phone number)" });
                }
            }
            else {
                res.status(401).json({ message: "Farmer not found(password)" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.json(404).json({
            message: "unknown role",
        });
    }
});
exports.login = login;
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user (buyer or farmer)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               country:
 *                 type: string
 *               district:
 *                 type: string
 *               phoneNo:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [buyer, farmer]
 *     responses:
 *       200:
 *         description: Successfully signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 Farmer:
 *                   type: object
 *       404:
 *         description: Unknown role
 */
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, country, district, phoneNo, password, role } = req.body;
    if (role === "buyer") {
        try {
            const buyer = yield buyer_1.default.create({
                firstname,
                lastname,
                phoneNo,
                password,
            });
            const buyerId = parseInt(buyer.id.slice(1), 10);
            const token = createToken(buyerId);
            res.cookie("jwt", token, { maxAge: maxAge * 1000 });
            res.status(200).json({
                message: "buyer created",
                Farmer: {
                    id: buyer.id,
                    firstname: buyer.firstname,
                    lastname: buyer.lastname,
                    phoneNo: buyer.phoneNo,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    else if (role === "farmer") {
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
    }
    else {
        res.json(404).json({
            message: "unknown role",
        });
    }
});
exports.signup = signup;
