import { Request, Response } from "express";
export const fileUpload = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
  }
  res
    .status(200)
    .json({ message: "File uploaded successfully", file: req.file });
};
