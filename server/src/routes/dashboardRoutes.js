const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");

const dashboardController = require("../controllers/dashboardController");


/**
 * USER DASHBOARD
 */
router.get(
  "/user",
  protect,
  authorize("USER"),
  dashboardController.userDashboard
);

router.get(
  "/user/activity",
  protect,
  authorize("USER"),
  dashboardController.userActivity
);


/**
 * ADMIN DASHBOARD
 */
router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  dashboardController.adminDashboard
);

router.get(
  "/admin/songs",
  protect,
  authorize("ADMIN"),
  dashboardController.adminSongs
);

router.get(
  "/admin/revenue",
  protect,
  authorize("ADMIN"),
  dashboardController.adminRevenue
);


/**
 * SUPER ADMIN DASHBOARD
 */
router.get(
  "/super-admin",
  protect,
  authorize("SUPER_ADMIN"),
  dashboardController.superAdminDashboard
);

router.get(
  "/super-admin/analytics",
  protect,
  authorize("SUPER_ADMIN"),
  dashboardController.superAdminAnalytics
);

router.get(
  "/super-admin/users",
  protect,
  authorize("SUPER_ADMIN"),
  dashboardController.superAdminUsers
);

module.exports = router;