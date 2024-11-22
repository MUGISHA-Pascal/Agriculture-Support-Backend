import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectionSequelize } from "./config/Dbconnection";
import swaggerDocs from "./swagger";
import AuthRoutes from "./routes/authRoutes";
import CropRoutes from "./routes/cropRoutes";
import orderRoutes from "./routes/orderRoutes";
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
(async () => {
  try {
    await ConnectionSequelize.authenticate();
    await ConnectionSequelize.sync({ force: false });
    console.log("connected to the database and saved");
  } catch (error) {
    console.log(error);
  }
})();
app.use("/auth", AuthRoutes);
app.use("/crops", CropRoutes);
app.use("/orders", orderRoutes);
export default app;
