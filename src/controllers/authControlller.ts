import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Farmer from "../models/farmer";

const maxAge = 24 * 60 * 60;

const createToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_KEY as string, { expiresIn: "1d" });
};

export const login = async (req: Request, res: Response) => {
  const { phoneNo, password } = req.body;
  try {
    const farmer = await Farmer.findOne({ where: { password } });
    if (Farmer) {
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
        res.status(401).json({ message: "Farmer not found(password)" });
      }
    } else {
      res.status(401).json({ message: "Farmer not found(email)" });
    }
  } catch (error) {
    console.log(error);
  }
};

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
