import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Farmer from "../models/farmer";
import Buyer from "../models/buyer";
import bcrypt from "bcrypt";
import { count } from "console";
const maxAge = 24 * 60 * 60;

const createToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_KEY as string, { expiresIn: "1d" });
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
export const login = async (req: Request, res: Response) => {
  const { phoneNo, password, role } = req.body;
  if (role === "buyer") {
    try {
      const buyer = await Buyer.findOne({ where: { phoneNo } });
      if (buyer) {
        const ismatch = await bcrypt.compare(password, buyer.password);
        if (ismatch) {
          const token = createToken(Number(buyer.id));
          res.cookie("jwt", token, { maxAge: maxAge * 1000 });
          res.status(200).json({
            message: "buyer found",
            user: {
              id: buyer.id,
              firstname: buyer.firstname,
              lastname: buyer.lastname,
              country: buyer.country,
              phoneNo: buyer.phoneNo,
            },
          });
        } else {
          res.status(401).json({ message: "buyer not found(password)" });
        }
      } else {
        res.status(401).json({ message: "buyer not found(phone number)" });
      }
    } catch (error) {
      console.log(error);
    }
  } else if (role === "farmer") {
    try {
      const farmer = await Farmer.findOne({ where: { phoneNo } });
      if (farmer) {
        const ismatch = await bcrypt.compare(password, farmer.password);
        if (ismatch) {
          const token = createToken(farmer.id);
          res.cookie("jwt", token, { maxAge: maxAge * 1000 });
          res.status(200).json({
            message: "Farmer found",
            user: {
              id: farmer.id,
              firstname: farmer.firstname,
              lastname: farmer.lastname,
              country: farmer.country,
              district: farmer.district,
              phoneNo: farmer.phoneNo,
            },
          });
        } else {
          res.status(401).json({ password: "password not found" });
        }
      } else {
        res.status(401).json({ phone: "phone number not found" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json(404).json({
      message: "unknown role",
    });
  }
};
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
export const signup = async (req: Request, res: Response) => {
  const { firstname, lastname, country, district, phoneNo, password, role } =
    req.body;
  if (role === "buyer") {
    try {
      const buyer = await Buyer.create({
        firstname,
        lastname,
        phoneNo,
        country,
        password,
      });
      const buyerId = parseInt(buyer.id.slice(1), 10);
      const token = createToken(buyerId);
      res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: false });
      res.status(200).json({
        message: "buyer created",
        user: {
          id: buyer.id,
          firstname: buyer.firstname,
          lastname: buyer.lastname,
          country: buyer.country,
          phoneNo: buyer.phoneNo,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else if (role === "farmer") {
    try {
      const farmer = await Farmer.create({
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
        user: {
          id: farmer.id,
          firstname: farmer.firstname,
          lastname: farmer.lastname,
          country: farmer.country,
          district: farmer.district,
          phoneNo: farmer.phoneNo,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json(404).json({
      message: "unknown role",
    });
  }
};
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
