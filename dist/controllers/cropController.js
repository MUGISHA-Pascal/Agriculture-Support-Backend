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
 * /crops:
 *   get:
 *     summary: Fetch all crops
 *     tags: [Crops]
 *     responses:
 *       200:
 *         description: A list of crops.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crop'
 *       500:
 *         description: Failed to fetch crops.
 */
const getAllCrops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const crops = yield crop_1.default.findAll();
        res.status(200).json(crops);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch crops", error });
    }
});
exports.getAllCrops = getAllCrops;
/**
 * @swagger
 * /crops/{id}:
 *   get:
 *     summary: Fetch a single crop by ID
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the crop to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The crop data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       404:
 *         description: Crop not found.
 *       500:
 *         description: Failed to fetch the crop.
 */
const getCropById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const crop = yield crop_1.default.findByPk(id);
        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
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
 * /crops:
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
 *         description: The crop was successfully added.
 *       500:
 *         description: Failed to add the crop.
 */
const addCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cropName, harvestSeason, qtyPerSeason, pricePerKg, verified } = req.body;
    try {
        const newCrop = yield crop_1.default.create({
            cropName,
            harvestSeason,
            qtyPerSeason,
            pricePerKg,
            verified,
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
 * /crops/{id}:
 *   put:
 *     summary: Update a crop by ID
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the crop to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crop'
 *     responses:
 *       200:
 *         description: The crop was updated successfully.
 *       404:
 *         description: Crop not found.
 *       500:
 *         description: Failed to update the crop.
 */
const updateCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { cropName, harvestSeason, qtyPerSeason, pricePerKg, verified } = req.body;
    try {
        const crop = yield crop_1.default.findByPk(id);
        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
        }
        yield crop.update({
            cropName,
            harvestSeason,
            qtyPerSeason,
            pricePerKg,
            verified,
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
 * /crops/{id}:
 *   delete:
 *     summary: Delete a crop by ID
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the crop to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The crop was deleted successfully.
 *       404:
 *         description: Crop not found.
 *       500:
 *         description: Failed to delete the crop.
 */
const deleteCropById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const crop = yield crop_1.default.findByPk(id);
        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
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
 * /crops:
 *   delete:
 *     summary: Delete multiple crops by IDs
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
 *     responses:
 *       200:
 *         description: Crops deleted successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: No crops found with the provided IDs.
 *       500:
 *         description: Failed to delete crops.
 */
const deleteAllCrops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body; // Expecting an array of IDs in the body
    if (!Array.isArray(ids) || ids.length === 0) {
        return res
            .status(400)
            .json({ message: "Please provide a valid list of crop IDs." });
    }
    try {
        const deletedCount = yield crop_1.default.destroy({
            where: {
                id: ids,
            },
        });
        if (deletedCount === 0) {
            return res
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
