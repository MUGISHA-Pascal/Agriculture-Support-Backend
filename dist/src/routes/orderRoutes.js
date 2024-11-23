"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const orderRoutes = (0, express_1.Router)();
orderRoutes.get("/get_all_orders", orderController_1.getAllOrder);
orderRoutes.get("/get_order/:id", orderController_1.getOrderById);
orderRoutes.post("/add_order", orderController_1.addOrder);
orderRoutes.put("/update_order/:id", orderController_1.updateOrder);
orderRoutes.delete("/delete_order/:id", orderController_1.deleteOrderById);
orderRoutes.delete("/delete_all_orders", orderController_1.deleteAllOrder);
exports.default = orderRoutes;
