import { Request, Router, Response } from "express";
import upload from "../middlewares/upload";
import {
  fileUpload,
  getAllFarmers,
  imageRetrival,
} from "../controllers/userController";
const UserRoutes = Router();

UserRoutes.post("/upload", upload.single("file"), fileUpload);
UserRoutes.get("/image/:ImageName", imageRetrival);
UserRoutes.get("/farmers/:category", getAllFarmers);
export default UserRoutes;
