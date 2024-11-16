import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectionSequelize } from "./config/Dbconnection";
import swaggerDocs from "./swagger";
import AuthRoutes from "./routes/authRoutes";
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
(async () => {
  try {
    await ConnectionSequelize.authenticate();
    await ConnectionSequelize.sync({ force: true }); //change it to false in deployement
    console.log("connected to the database and saved");
  } catch (error) {
    console.log(error);
  }
})();
app.use("/auth", AuthRoutes);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("app running on port 4000");
});
swaggerDocs(app, port);
