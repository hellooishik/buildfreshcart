const express = require("express");
const { placeOrder, getOrderDetails, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, placeOrder); // Place a new order
router.get("/:id", protect, getOrderDetails); // Get order details by ID
router.put("/:id/status", protect, updateOrderStatus); // Update order status

module.exports = router;