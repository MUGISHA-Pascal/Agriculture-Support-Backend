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
 * /auth/login:
 *   post:
 *     summary: Farmer login
 *     description: Logs a farmer in and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNo:
 *                 type: string
 *                 description: Farmer's phone number.
 *               password:
 *                 type: string
 *                 description: Farmer's password.
 *     responses:
 *       200:
 *         description: Successful login, JWT returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Farmer found"
 *                 Farmer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Farmer's unique ID.
 *                     farmerUniqueId:
 *                       type: string
 *                       description: Farmer's generated unique ID.
 *                     firstname:
 *                       type: string
 *                       description: Farmer's first name.
 *                     lastname:
 *                       type: string
 *                       description: Farmer's last name.
 *                     country:
 *                       type: string
 *                       description: Country of the farmer.
 *                     district:
 *                       type: string
 *                       description: District of the farmer.
 *                     phoneNo:
 *                       type: string
 *                       description: Farmer's phone number.
 *       401:
 *         description: Invalid phone number or password.
 *       500:
 *         description: Internal server error.
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNo, password } = req.body;
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
});
exports.login = login;
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Farmer signup
 *     description: Registers a new farmer and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Farmer's first name.
 *               lastname:
 *                 type: string
 *                 description: Farmer's last name.
 *               country:
 *                 type: string
 *                 description: Farmer's country.
 *               district:
 *                 type: string
 *                 description: Farmer's district.
 *               phoneNo:
 *                 type: string
 *                 description: Farmer's phone number.
 *               password:
 *                 type: string
 *                 description: Farmer's password.
 *     responses:
 *       200:
 *         description: Successful signup, JWT returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Farmer created"
 *                 Farmer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Farmer's unique ID.
 *                     farmerUniqueId:
 *                       type: string
 *                       description: Farmer's generated unique ID.
 *                     firstname:
 *                       type: string
 *                       description: Farmer's first name.
 *                     lastname:
 *                       type: string
 *                       description: Farmer's last name.
 *                     country:
 *                       type: string
 *                       description: Farmer's country.
 *                     district:
 *                       type: string
 *                       description: Farmer's district.
 *                     phoneNo:
 *                       type: string
 *                       description: Farmer's phone number.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, country, district, phoneNo, password, role } = req.body;
    if (role === "buyer") {
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
