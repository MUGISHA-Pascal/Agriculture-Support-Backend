import { Request, Response } from "express";
import Farmer from "../models/farmer";
import fs from "fs";
import Buyer from "../models/buyer";
import path from "path";
import Crop from "../models/crop";
import { Op } from "sequelize";
export const fileUpload = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
  }
  const user = JSON.parse(req.body.user);

  if (user.role === "farmer") {
    await Farmer.update(
      { profilePhoto: req.file?.filename },
      { where: { id: user.id } }
    );
  }
  if (user.role === "buyer") {
    await Buyer.update(
      { profilePhoto: req.file?.filename },
      { where: { id: user.id } }
    );
  }
  res
    .status(200)
    .json({ message: "File uploaded successfully", file: req.file });
};

export const imageRetrival = async (req: Request, res: Response) => {
  const { ImageName } = req.params;
  const filePath = path.join(__dirname, "../../uploads", ImageName);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: "Image not found" });
    }
    res.sendFile(filePath);
  });
};

export const getAllFarmers = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const crops = await Crop.findAll({
      where: { cropName: category },
    });
    const cropsIds: number[] = [
      ...new Set(crops.map((crop) => crop.cropOwner)),
    ];
    const farmers = await Farmer.findAll({
      where: { id: { [Op.in]: cropsIds } },
    });
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch farmers", error });
  }
};
