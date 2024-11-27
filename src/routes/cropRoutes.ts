import { Router, Request, Response } from "express";
import {
  addCrop,
  deleteAllCrops,
  deleteCropById,
  getAllCrops,
  getCropById,
  updateCrop,
} from "../controllers/cropController";

const CropRoutes = Router();
CropRoutes.get("/get_all_crops/:farmerId", getAllCrops);
CropRoutes.get("/get_crop/:id", getCropById);
CropRoutes.post("/add_crop", addCrop);
CropRoutes.put("/update_crop/:id", updateCrop);
CropRoutes.delete("/delete_crop/:id", deleteCropById);
CropRoutes.delete("/delete_all_crops", deleteAllCrops);
export default CropRoutes;
