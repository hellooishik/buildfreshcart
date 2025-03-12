require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/auth", require("./routes/googleAuth"));


// Debug: Log MongoDB URI
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing. Check your .env file.");
  process.exit(1); // Stop execution
}

// Routes
app.get("/", (req, res) => {
  res.send("FreshCart Backend is running! 🚀");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
