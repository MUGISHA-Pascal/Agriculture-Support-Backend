import { Request, Router, Response } from "express";
import upload from "../middlewares/upload";
import { fileUpload } from "../controllers/userController";
const UserRoutes = Router();

UserRoutes.post("/upload", upload.single("file"), fileUpload);
export default UserRoutes;
