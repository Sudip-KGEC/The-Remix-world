const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user", protect, authorize("USER"), (req, res) => {
  res.json({ message: "User Dashboard" });
});

router.get("/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Admin Dashboard" });
});

router.get("/super", protect, authorize("SUPER_ADMIN"), (req, res) => {
  res.json({ message: "Super Admin Dashboard" });
});

module.exports = router;