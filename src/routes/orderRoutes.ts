import { Router, Request, Response } from "express";

const orderRoutes = Router();
orderRoutes.get("/get_all_orders");
orderRoutes.get("/get_order/:id");
orderRoutes.post("/add_order");
orderRoutes.put("/update_order/:id");
orderRoutes.delete("/delete_order/:id");
orderRoutes.delete("/delete_all_orders");
export default orderRoutes;
