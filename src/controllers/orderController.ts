import { Request, Response } from "express";
import Order from "../models/order";
// not fixed
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

export const addOrder = async (req: Request, res: Response) => {
  const { cropName, quantity, totalPrice, deliveryStatus } = req.body;
  try {
    const newOrder = await Order.create({
      cropName,
      quantity,
      totalPrice,
      deliveryStatus,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to add the order", error });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { cropName, quantity, totalPrice, deliveryStatus } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    await order.update({
      cropName,
      quantity,
      totalPrice,
      deliveryStatus,
    });

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update the Order", error });
  }
};

export const deleteOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the Order", error });
  }
};

export const deleteAllOrder = async (req: Request, res: Response) => {
  const { ids } = req.body; // Expecting an array of IDs in the body
  if (!Array.isArray(ids) || ids.length === 0) {
    res
      .status(400)
      .json({ message: "Please provide a valid list of order IDs." });
  }

  try {
    const deletedCount = await Order.destroy({
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
  } catch (error) {
    res.status(500).json({ message: "Failed to delete orders", error });
  }
};
/**
 * @swagger
 * /orders:
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
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order successfully added
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
 *
 * /orders/{id}:
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
 *
 *   delete:
 *     summary: Delete a specific order
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
 *         description: Successfully deleted order
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
 *
 * /orders/delete_all:
 *   post:
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
