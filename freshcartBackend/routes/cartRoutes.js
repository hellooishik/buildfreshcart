// const express = require("express");
// const router = express.Router();
// const { getCart, addToCart, removeFromCart } = require("../controllers/cartController");  // ✅ Correct import

// const authMiddleware = require("../middleware/authMiddleware");
// const { protect } = require("../middleware/authMiddleware"); // ✅ Use destructuring
// router.get("/", protect, getCart); // ✅ Correct usage
// router.post("/add", authMiddleware, addToCart);
// router.delete("/remove/:id", authMiddleware, removeFromCart);

// module.exports = router;
