"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllOrder = exports.deleteOrderById = exports.updateOrder = exports.addOrder = exports.getOrderById = exports.getAllOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
// not fixed
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.findAll();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error });
    }
});
exports.getAllOrder = getAllOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            res.status(404).json({ message: "order not found" });
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch the order", error });
    }
});
exports.getOrderById = getOrderById;
/**
 * @swagger
 * /orders/add_order:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cropName
 *               - quantity
 *               - totalPrice
 *               - deliveryStatus
 *             properties:
 *               cropName:
 *                 type: string
 *                 example: "Wheat"
 *                 description: The name of the crop
 *               quantity:
 *                 type: integer
 *                 example: 100
 *                 description: The quantity of the crop
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 example: 500.75
 *                 description: The total price of the order
 *               deliveryStatus:
 *                 type: string
 *                 example: "Pending"
 *                 description: The delivery status of the order
 *     responses:
 *       201:
 *         description: Successfully created a new order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Failed to add the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to add the order"
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 */
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cropName, quantity, totalPrice, deliveryStatus } = req.body;
    try {
        const newOrder = yield order_1.default.create({
            cropName,
            quantity,
            totalPrice,
            deliveryStatus,
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add the order", error });
    }
});
exports.addOrder = addOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { cropName, quantity, totalPrice, deliveryStatus } = req.body;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        yield order.update({
            cropName,
            quantity,
            totalPrice,
            deliveryStatus,
        });
        res.status(200).json({ message: "Order updated successfully", order });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update the Order", error });
    }
});
exports.updateOrder = updateOrder;
/**
 * @swagger
 * /orders/delete_order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order deleted successfully"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Failed to delete the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete the Order"
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 */
const deleteOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        yield order.destroy();
        res.status(200).json({ message: "Order deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete the Order", error });
    }
});
exports.deleteOrderById = deleteOrderById;
const deleteAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body; // Expecting an array of IDs in the body
    if (!Array.isArray(ids) || ids.length === 0) {
        res
            .status(400)
            .json({ message: "Please provide a valid list of order IDs." });
    }
    try {
        const deletedCount = yield order_1.default.destroy({
            where: {
                id: ids,
            },
        });
        if (deletedCount === 0) {
            res
                .status(404)
                .json({ message: "No orders found with the provided IDs." });
        }
        res
            .status(200)
            .json({ message: `${deletedCount} orders deleted successfully.` });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete orders", error });
    }
});
exports.deleteAllOrder = deleteAllOrder;
/**
 * @swagger
 * /orders/get_order/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 customerName:
 *                   type: string
 *                   example: "John Doe"
 *                 totalAmount:
 *                   type: number
 *                   example: 99.99
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-19T12:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-19T13:00:00.000Z"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Server error while fetching the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch the order"
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 */
/**
 * @swagger
 * /orders/get_all_orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully fetched orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Failed to fetch orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch orders"
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 *
 * /orders/update_order/{id}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Successfully updated order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order updated successfully"
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Failed to update the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update the Order"
 *                 error:
 *                   type: object
 *                   additionalProperties: true

 * /orders/delete_all_orders:
 *   delete:
 *     summary: Delete multiple orders by their IDs
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The IDs of the orders to delete
 *                 example: ["1", "2", "3"]
 *     responses:
 *       200:
 *         description: Successfully deleted multiple orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "3 orders deleted successfully."
 *       400:
 *         description: Invalid or missing IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide a valid list of order IDs."
 *       404:
 *         description: No orders found with the provided IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No orders found with the provided IDs."
 *       500:
 *         description: Failed to delete orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete orders"
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 *
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - cropName
 *         - quantity
 *         - totalPrice
 *         - deliveryStatus
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         cropName:
 *           type: string
 *           example: "Wheat"
 *         quantity:
 *           type: integer
 *           example: 100
 *         totalPrice:
 *           type: number
 *           format: float
 *           example: 500.75
 *         deliveryStatus:
 *           type: string
 *           example: "Pending"
 */
