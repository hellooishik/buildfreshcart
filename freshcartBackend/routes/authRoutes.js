const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// 📌 Register a new user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword });

      await user.save();

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// 📌 Login with email/password
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
