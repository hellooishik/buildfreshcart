const mongoose = require("mongoose");

const VariationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "500g", "1kg", "1pc"
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Percentage-based discount
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Base price
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, default: 0 },
    image: { type: String },
    variations: [VariationSchema], // Add variations
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
