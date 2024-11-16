import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectionSequelize } from "./config/Dbconnection";
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
(async () => {
  try {
    await ConnectionSequelize.authenticate();
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
  }
})();

app.listen(4000, () => {
  console.log("app running on port 4000");
});
