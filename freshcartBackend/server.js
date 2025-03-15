require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path"); // ✅ Added path import
const http = require("http"); // ✅ Required for WebSockets
const { Server } = require("socket.io"); // ✅ Import Socket.io

const app = express();
const server = http.createServer(app); // ✅ Create HTTP server
// WebSockets Setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (Modify for security)
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`🟢 Client Connected: ${socket.id}`);

  // Listen for cart updates
  socket.on("cartUpdated", (cart) => {
    console.log("🔄 Cart Updated:", cart);
    io.emit("cartUpdated", cart); // Broadcast update to all users
  });

  // Listen for order status updates
  socket.on("orderStatus", (order) => {
    console.log("🚚 Order Status Updated:", order);
    io.emit("orderStatus", order);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client Disconnected: ${socket.id}`);
  });
});

// Import Routes
// const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/Product"); // ✅ Ensure correct casing
const orderRoutes = require("./routes/orderRoutes"); // ✅ Added order routes
const adminRoutes = require("./routes/adminRoutes"); // ✅ Import Admin Routes
const couponRoutes = require("./routes/couponRoutes"); // ✅ Import coupon routes
const paymentRoutes = require("./routes/paymentRoutes"); // ✅ Import Payment Routes
const cartRoutes = require("./routes/cartRoutes"); // ✅ Import Cart Routes


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
console.log("✅ Order Routes Loaded");
app.use("/cart", cartRoutes); // ✅ Register Cart Routes
app.use("/orders", orderRoutes); // ✅ Register order routes
app.use("/admin", adminRoutes); // ✅ Register Admin Routes
app.use("/coupons", couponRoutes); // ✅ Register coupon routes
app.use("/pay", paymentRoutes); // ✅ Register Payment Routes

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
// ✅ LOGIN Endpoint
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user; // Store user in session
    res.json({ user });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// ✅ GET AUTHENTICATED USER Endpoint
app.get("/auth/user", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Not logged in" });
  } 
});

// ✅ LOGOUT Endpoint
app.post("/auth/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});

mongoose.connect("mongodb://localhost:27017/mydatabase", { useNewUrlParser: true });
app.listen(5000, () => console.log("Server running on port 5000"));
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
