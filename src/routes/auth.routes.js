const express = require("express");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(401).json({ message: "User not found" });

  const token = generateToken(user._id);
  res.json({ token, userId: user._id });
});

module.exports = router;
