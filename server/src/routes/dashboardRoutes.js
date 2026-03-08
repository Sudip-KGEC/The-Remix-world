const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");

const dashboardController = require("../controllers/dashboardController");

/**
 * @route   GET /api/v1/dashboard/user
 * @desc    Get user dashboard statistics
 * @access  Private (USER)
 */
router.get(
  "/user",
  protect,
  authorize("USER"),
  dashboardController.userDashboard
);

/**
 * @route   GET /api/v1/dashboard/admin
 * @desc    Get admin dashboard statistics
 * @access  Private (ADMIN)
 */
router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  dashboardController.adminDashboard
);

/**
 * @route   GET /api/v1/dashboard/super-admin
 * @desc    Get super admin dashboard statistics
 * @access  Private (SUPER_ADMIN)
 */
router.get(
  "/super-admin",
  protect,
  authorize("SUPER_ADMIN"),
  dashboardController.superAdminDashboard
);

module.exports = router;