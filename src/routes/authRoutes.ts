import { Router } from "express";
import { login, signup } from "../controllers/authControlller";
const AuthRoutes = Router();
AuthRoutes.post("/login", login);
AuthRoutes.post("/signup", signup);
export default AuthRoutes;
