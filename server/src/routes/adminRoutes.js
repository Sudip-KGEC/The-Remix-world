const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");

const adminController = require("../controllers/adminController");
const { getMySongs } = require("../controllers/songController");

/**
 * SUPER ADMIN - Create Admin / DJ
 */
router.post(
  "/admins",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.createAdmin
);

/**
 * ADMIN - View own earnings
 */
router.get(
  "/earnings",
  protect,
  authorize("ADMIN"),
  adminController.getAdminEarnings
);


/**
 * SUPER ADMIN - Platform overview
 */
router.get(
  "/platform/overview",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.platformStats
);

/**
 * SUPER ADMIN - Total plays analytics
 */
router.get(
  "/platform/plays",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.totalPlays
);

/**
 * SUPER ADMIN - Distribute revenue
 */
router.post(
  "/platform/distribute-revenue",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.distributeRevenue
);

module.exports = router;