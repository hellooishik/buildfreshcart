const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User"); // Ensure correct path
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to validate request body
const validateRegister = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be 6 or more characters").isLength({ min: 6 }),
];

// ✅ REGISTER ROUTE
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body; // ✅ Accept `role` input

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({ name, email, password, role: role || "user" }); // ✅ Default to "user"

      await user.save();

      const payload = { user: { id: user.id, role: user.role } }; // ✅ Include role in token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.json({ token });
    } catch (err) {
      console.error("🔥 Error in /register:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);
// ✅ LOGIN ROUTE
router.post("/login", [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    console.error("🔥 Error in /login:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
