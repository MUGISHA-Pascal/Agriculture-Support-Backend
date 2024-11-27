import { Request, Router, Response } from "express";
import upload from "../middlewares/upload";
import { fileUpload, imageRetrival } from "../controllers/userController";
const UserRoutes = Router();

UserRoutes.post("/upload", upload.single("file"), fileUpload);
UserRoutes.get("/image/:ImageName", imageRetrival);
export default UserRoutes;
