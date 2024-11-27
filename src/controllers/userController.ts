import { Request, Response } from "express";
import Farmer from "../models/farmer";
import { where } from "sequelize";
import Buyer from "../models/buyer";
export const fileUpload = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
  }
  const user = JSON.parse(req.body.user);
  // console.log(user);

  if (user.role === "farmer") {
    await Farmer.update(
      { profilePhoto: req.file?.path },
      { where: { id: user.id } }
    );
  }
  if (user.role === "buyer") {
    await Buyer.update(
      { profilePhoto: req.file?.path },
      { where: { id: user.id } }
    );
  }
  res
    .status(200)
    .json({ message: "File uploaded successfully", file: req.file });
};
