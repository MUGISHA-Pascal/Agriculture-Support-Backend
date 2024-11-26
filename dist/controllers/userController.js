"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const fileUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res
        .status(200)
        .json({ message: "File uploaded successfully", file: req.file });
};
exports.fileUpload = fileUpload;
