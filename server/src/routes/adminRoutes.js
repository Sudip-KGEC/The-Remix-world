const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create DJ Admin (only SUPER_ADMIN)
router.post(
  "/create",
  protect,
  authorize("SUPER_ADMIN"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Admin already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      });

     res.json({
  message: "Admin created successfully",
  admin: {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role
  }
});

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;