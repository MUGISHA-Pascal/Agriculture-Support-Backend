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
exports.deleteAllCrops = exports.deleteCropById = exports.updateCrop = exports.addCrop = exports.getCropById = exports.getAllCrops = void 0;
const crop_1 = __importDefault(require("../models/crop"));
/**
 * @swagger
 * /crops/get_all_crops:
 *   get:
 *     summary: Retrieve all crops
 *     tags: [Crops]
 *     responses:
 *       200:
 *         description: List of all crops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crop'
 *       500:
 *         description: Server error
 */
const getAllCrops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmerId } = req.params;
    try {
        const crops = yield crop_1.default.findAll({
            where: { cropOwner: farmerId },
        });
        res.status(200).json(crops);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch crops", error });
    }
});
exports.getAllCrops = getAllCrops;
/**
 * @swagger
 * /crops/get_crop/{id}:
 *   get:
 *     summary: Retrieve a crop by its ID
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique ID of the crop
 *     responses:
 *       200:
 *         description: The crop details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       404:
 *         description: Crop not found
 *       500:
 *         description: Server error
 */
const getCropById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, farmerId } = req.params;
    try {
        const crop = yield crop_1.default.findAll({
            where: { id, cropOwner: farmerId },
        });
        if (!crop) {
            res.status(404).json({ message: "Crop not found" });
        }
        res.status(200).json(crop);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch the crop", error });
    }
});
exports.getCropById = getCropById;
/**
 * @swagger
 * /crops/add_crop:
 *   post:
 *     summary: Add a new crop
 *     tags: [Crops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crop'
 *     responses:
 *       201:
 *         description: Crop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       500:
 *         description: Server error
 */
const addCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cropName, harvestSeason, qtyPerSeason, pricePerKg, farmerId } = req.body;
    try {
        const newCrop = yield crop_1.default.create({
            cropName,
            harvestSeason,
            qtyPerSeason,
            pricePerKg,
            cropOwner: farmerId,
        });
        res.status(201).json(newCrop);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add the crop", error });
    }
});
exports.addCrop = addCrop;
/**
 * @swagger
 * /crops/update_crop/{id}:
 *   put:
 *     summary: Update a crop by its ID
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique ID of the crop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crop'
 *     responses:
 *       200:
 *         description: Crop updated successfully
 *       404:
 *         description: Crop not found
 *       500:
 *         description: Server error
 */
const updateCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { cropName, harvestSeason, qtyPerSeason, pricePerKg, farmerId } = req.body;
    try {
        const crop = yield crop_1.default.findOne({ where: { id, cropOwner: farmerId } });
        if (!crop) {
            res.status(404).json({ message: "Crop not found" });
            return;
        }
        yield crop.update({
            cropName,
            harvestSeason,
            qtyPerSeason,
            pricePerKg,
        });
        res.status(200).json({ message: "Crop updated successfully", crop });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update the crop", error });
    }
});
exports.updateCrop = updateCrop;
/**
 * @swagger
 * /crops/delete_crop/{id}:
 *   delete:
 *     summary: Delete a crop by its ID
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique ID of the crop
 *     responses:
 *       200:
 *         description: Crop deleted successfully
 *       404:
 *         description: Crop not found
 *       500:
 *         description: Server error
 */
const deleteCropById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const crop = yield crop_1.default.findByPk(id);
        if (!crop) {
            res.status(404).json({ message: "Crop not found" });
            return;
        }
        yield crop.destroy();
        res.status(200).json({ message: "Crop deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete the crop", error });
    }
});
exports.deleteCropById = deleteCropById;
/**
 * @swagger
 * /crops/delete_all_crops:
 *   delete:
 *     summary: Delete multiple crops
 *     tags: [Crops]
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
 *                 description: List of crop IDs to delete
 *             required:
 *               - ids
 *             example:
 *               ids: ["123e4567-e89b-12d3-a456-426614174000", "123e4567-e89b-12d3-a456-426614174001"]
 *     responses:
 *       200:
 *         description: Crops deleted successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: No crops found with the provided IDs
 *       500:
 *         description: Server error
 */
const deleteAllCrops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, farmerId } = req.body; // Expecting an array of IDs in the body
    if (!Array.isArray(ids) || ids.length === 0) {
        res
            .status(400)
            .json({ message: "Please provide a valid list of crop IDs." });
    }
    try {
        const deletedCount = yield crop_1.default.destroy({
            where: {
                id: ids,
                cropOwner: farmerId,
            },
        });
        if (deletedCount === 0) {
            res
                .status(404)
                .json({ message: "No crops found with the provided IDs." });
        }
        res
            .status(200)
            .json({ message: `${deletedCount} crops deleted successfully.` });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete crops", error });
    }
});
exports.deleteAllCrops = deleteAllCrops;
/**
 * @swagger
 * components:
 *   schemas:
 *     Crop:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the crop
 *         cropName:
 *           type: string
 *           description: Name of the crop
 *         harvestSeason:
 *           type: string
 *           description: Harvest season of the crop
 *         qtyPerSeason:
 *           type: number
 *           format: float
 *           description: Quantity harvested per season
 *         pricePerKg:
 *           type: number
 *           format: float
 *           description: Price per kilogram of the crop
 *         verified:
 *           type: boolean
 *           description: Whether the crop is verified
 *       required:
 *         - cropName
 *         - harvestSeason
 *         - qtyPerSeason
 *         - pricePerKg
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         cropName: "Maize"
 *         harvestSeason: "Summer"
 *         qtyPerSeason: 2000
 *         pricePerKg: 5.5
 *         verified: true
 */
