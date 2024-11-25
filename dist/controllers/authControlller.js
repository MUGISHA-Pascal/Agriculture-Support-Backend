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
const bcrypt_1 = __importDefault(require("bcrypt"));
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
            const buyer = yield buyer_1.default.findOne({ where: { phoneNo } });
            if (buyer) {
                const ismatch = yield bcrypt_1.default.compare(password, buyer.password);
                if (ismatch) {
                    const token = createToken(Number(buyer.id));
                    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
                    res.status(200).json({
                        message: "buyer found",
                        Farmer: {
                            id: buyer.id,
                            firstname: buyer.firstname,
                            lastname: buyer.lastname,
                            phoneNo: buyer.phoneNo,
                        },
                    });
                }
                else {
                    res.status(401).json({ message: "buyer not found(password)" });
                }
            }
            else {
                res.status(401).json({ message: "buyer not found(phone number)" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    else if (role === "farmer") {
        try {
            const farmer = yield farmer_1.default.findOne({ where: { phoneNo } });
            if (farmer) {
                const ismatch = yield bcrypt_1.default.compare(password, farmer.password);
                if (ismatch) {
                    const token = createToken(farmer.id);
                    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
                    res.status(200).json({
                        message: "Farmer found",
                        Farmer: {
                            id: farmer.id,
                            firstname: farmer.firstname,
                            lastname: farmer.lastname,
                            country: farmer.country,
                            district: farmer.district,
                            phoneNo: farmer.phoneNo,
                        },
                    });
                }
                else {
                    res.status(401).json({ password: "password not found" });
                }
            }
            else {
                res.status(401).json({ phone: "phone number not found" });
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
            res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: false });
            res.status(200).json({
                message: "buyer created",
                buyer: {
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
            res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: false });
            res.status(200).json({
                message: "Farmer created",
                Farmer: {
                    id: farmer.id,
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
/**
 * @swagger
 * components:
 *   schemas:
 *     Buyer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the buyer
 *         firstname:
 *           type: string
 *           description: First name of the buyer
 *         lastname:
 *           type: string
 *           description: Last name of the buyer
 *         phoneNo:
 *           type: string
 *           description: Phone number of the buyer
 *         password:
 *           type: string
 *           description: Password for the buyer's account
 *         profilePhoto:
 *           type: string
 *           format: uri
 *           description: URL to the buyer's profile photo
 *       required:
 *         - firstname
 *         - lastname
 *         - phoneNo
 *         - password
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         firstname: "John"
 *         lastname: "Doe"
 *         phoneNo: "+250781234567"
 *         password: "securePassword123"
 *         profilePhoto: "https://example.com/profile/johndoe.jpg"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Farmer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the farmer
 *         firstname:
 *           type: string
 *           description: First name of the farmer
 *         lastname:
 *           type: string
 *           description: Last name of the farmer
 *         country:
 *           type: string
 *           description: Country where the farmer resides
 *         district:
 *           type: string
 *           description: District where the farmer resides
 *         phoneNo:
 *           type: string
 *           description: Phone number of the farmer
 *         password:
 *           type: string
 *           description: Password for the farmer's account
 *         profilePhoto:
 *           type: string
 *           format: uri
 *           description: URL to the farmer's profile photo
 *         subscriptionType:
 *           type: string
 *           enum: ["Basic", "Premium"]
 *           description: Type of subscription the farmer has (Basic or Premium)
 *         subscriptionStartDate:
 *           type: string
 *           format: date
 *           description: Date when the farmer's subscription started
 *         subscriptionEndDate:
 *           type: string
 *           format: date
 *           description: Date when the farmer's subscription ends
 *       required:
 *         - firstname
 *         - lastname
 *         - country
 *         - district
 *         - phoneNo
 *         - password
 *       example:
 *         id: 123
 *         firstname: "Alice"
 *         lastname: "Smith"
 *         country: "Rwanda"
 *         district: "Kigali"
 *         phoneNo: "+250788654321"
 *         password: "securePassword456"
 *         profilePhoto: "https://example.com/profile/alicesmith.jpg"
 *         subscriptionType: "Premium"
 *         subscriptionStartDate: "2024-01-01"
 *         subscriptionEndDate: "2024-12-31"
 */
