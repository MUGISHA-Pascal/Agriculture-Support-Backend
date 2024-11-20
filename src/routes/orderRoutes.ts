import { Router, Request, Response } from "express";
import {
  addOrder,
  deleteAllOrder,
  deleteOrderById,
  getAllOrder,
  getOrderById,
  updateOrder,
} from "../controllers/orderController";
import { deleteCropById } from "../controllers/cropController";

const orderRoutes = Router();
orderRoutes.get("/get_all_orders", getAllOrder);
orderRoutes.get("/get_order/:id", getOrderById);
orderRoutes.post("/add_order", addOrder);
orderRoutes.put("/update_order/:id", updateOrder);
orderRoutes.delete("/delete_order/:id", deleteOrderById);
orderRoutes.delete("/delete_all_orders", deleteAllOrder);
export default orderRoutes;
