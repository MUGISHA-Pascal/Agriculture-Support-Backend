import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Farmer from "../models/farmer";

const maxAge = 24 * 60 * 60;

const createToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_KEY as string, { expiresIn: "1d" });
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
export const login = async (req: Request, res: Response) => {
  const { phoneNo, password } = req.body;
  try {
    const farmer = await Farmer.findOne({ where: { password } });
    if (farmer) {
      const auth = await Farmer.findOne({ where: { phoneNo } });
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
      } else {
        res.status(401).json({ message: "Farmer not found(phone number)" });
      }
    } else {
      res.status(401).json({ message: "Farmer not found(password)" });
    }
  } catch (error) {
    console.log(error);
  }
};

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
export const signup = async (req: Request, res: Response) => {
  const { firstname, lastname, country, district, phoneNo, password } =
    req.body;
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
  } catch (error) {
    console.log(error);
  }
};
