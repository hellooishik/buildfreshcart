const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Create Product
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, category, stock, variations } = req.body;

        if (!req.file) {
            return res.status(400).json({ msg: "Image is required" });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        const parsedVariations = JSON.parse(variations);

        const product = new Product({ name, description, price, category, stock, image: imageUrl, variations: parsedVariations });
        await product.save();

        res.status(201).json(product);
    } catch (err) {
        console.error("🔥 Error creating product:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});
// Get All Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ Get Product by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("category");
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("🔥 Error fetching product:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
