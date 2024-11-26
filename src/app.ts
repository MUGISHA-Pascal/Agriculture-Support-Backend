import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ConnectionSequelize } from "./config/Dbconnection";
import AuthRoutes from "./routes/authRoutes";
import CropRoutes from "./routes/cropRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";
import UserRoutes from "./routes/userRoutes";
dotenv.config();
const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
(async () => {
  try {
    await ConnectionSequelize.authenticate();
    await ConnectionSequelize.sync({ alter: true });
    console.log("connected to the database and saved");
  } catch (error) {
    console.log(error);
  }
})();
app.use("/auth", AuthRoutes);
app.use("/crops", CropRoutes);
app.use("/orders", orderRoutes);
app.use("/user", UserRoutes);
export default app;
