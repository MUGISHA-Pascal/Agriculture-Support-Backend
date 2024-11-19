import { Router } from "express";

const CropRoutes = Router();
CropRoutes.get("/get_all_crops");
CropRoutes.get("/get_crop/:id");
CropRoutes.post("/add_crop");
CropRoutes.put("/update_crop/:id");
CropRoutes.delete("/delete_crop/:id");
CropRoutes.delete("delete_all_crops");
export default CropRoutes;
