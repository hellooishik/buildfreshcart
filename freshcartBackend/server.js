require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path"); 
const http = require("http"); 
const { Server } = require("socket.io"); 

const app = express();
const server = http.createServer(app);

// WebSockets Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`🟢 Client Connected: ${socket.id}`);
  
  socket.on("cartUpdated", (cart) => {
    console.log("🔄 Cart Updated:", cart);
    io.emit("cartUpdated", cart); 
  });

  socket.on("orderStatus", (order) => {
    console.log("🚚 Order Status Updated:", order);
    io.emit("orderStatus", order);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client Disconnected: ${socket.id}`);
  });
});

// Import Routes
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const couponRoutes = require("./routes/couponRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

console.log("✅ Routes Loaded");
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/coupons", couponRoutes);
app.use("/pay", paymentRoutes);

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❗ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("FreshCart API is Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
