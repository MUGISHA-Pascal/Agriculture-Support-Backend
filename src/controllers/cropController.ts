import { Request, Response } from "express";
import Crop from "../models/crop";

/**
 * @swagger
 * /crops/get_all_crops:
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
export const getAllCrops = async (req: Request, res: Response) => {
  try {
    const crops = await Crop.findAll();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch crops", error });
  }
};

/**
 * @swagger
 * /crops/get_crop/{id}:
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
export const getCropById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      res.status(404).json({ message: "Crop not found" });
    }
    res.status(200).json(crop);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the crop", error });
  }
};

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
 *         description: The crop was successfully added.
 *       500:
 *         description: Failed to add the crop.
 */
export const addCrop = async (req: Request, res: Response) => {
  const { cropName, harvestSeason, qtyPerSeason, pricePerKg, verified } =
    req.body;
  try {
    const newCrop = await Crop.create({
      cropName,
      harvestSeason,
      qtyPerSeason,
      pricePerKg,
      verified,
    });
    res.status(201).json(newCrop);
  } catch (error) {
    res.status(500).json({ message: "Failed to add the crop", error });
  }
};

/**
 * @swagger
 * /crops/update_crop/{id}:
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
export const updateCrop = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { cropName, harvestSeason, qtyPerSeason, pricePerKg, verified } =
    req.body;
  try {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      res.status(404).json({ message: "Crop not found" });
      return;
    }

    await crop.update({
      cropName,
      harvestSeason,
      qtyPerSeason,
      pricePerKg,
      verified,
    });

    res.status(200).json({ message: "Crop updated successfully", crop });
  } catch (error) {
    res.status(500).json({ message: "Failed to update the crop", error });
  }
};

/**
 * @swagger
 * /crops/delete_crop/{id}:
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
export const deleteCropById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      res.status(404).json({ message: "Crop not found" });
      return;
    }

    await crop.destroy();
    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the crop", error });
  }
};

/**
 * @swagger
 * /crops/delete_all_crops:
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
export const deleteAllCrops = async (req: Request, res: Response) => {
  const { ids } = req.body; // Expecting an array of IDs in the body
  if (!Array.isArray(ids) || ids.length === 0) {
    res
      .status(400)
      .json({ message: "Please provide a valid list of crop IDs." });
  }

  try {
    const deletedCount = await Crop.destroy({
      where: {
        id: ids,
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
  } catch (error) {
    res.status(500).json({ message: "Failed to delete crops", error });
  }
};
