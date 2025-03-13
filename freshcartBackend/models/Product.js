const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
