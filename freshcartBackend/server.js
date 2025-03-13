require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path"); // ✅ Added path import

const app = express();

// Import Routes
// const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/product"); // ✅ Ensure correct casing
const orderRoutes = require("./routes/orderRoutes"); // ✅ Added order routes

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
console.log("✅ Order Routes Loaded");
app.use("/orders", orderRoutes); // ✅ Register order routes

// Routes
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
// app.use("/cart", cartRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ Fixed missing path import

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("FreshCart API is Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
