const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");


/**
 * SUPER ADMIN - Create Admin
 */
router.post(
  "/admins",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.createAdmin
);


/**
 * SUPER ADMIN - Get all admins
 */
router.get(
  "/admins",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.getAllAdmins
);


/**
 * SUPER ADMIN - Delete admin
 */
router.delete(
  "/admins/:id",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.deleteAdmin
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
 * ADMIN - Withdrawal request
 */
router.post(
  "/withdraw-request",
  protect,
  authorize("ADMIN"),
  adminController.withdrawRequest
);


/**
 * SUPER ADMIN - Withdrawal requests
 */
router.get(
  "/withdraw-requests",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.getWithdrawRequests
);


/**
 * SUPER ADMIN - Approve withdraw
 */
router.post(
  "/withdraw-approve/:id",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.approveWithdraw
);


/**
 * PLATFORM STATS
 */
router.get(
  "/platform/overview",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.platformStats
);


/**
 * TOTAL PLAYS
 */
router.get(
  "/platform/plays",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.totalPlays
);


/**
 * TOTAL PLATFORM REVENUE
 */
router.get(
  "/platform/revenue",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.totalRevenue
);


/**
 * TOP DJs
 */
router.get(
  "/platform/top-djs",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.topDjs
);


/**
 * TOP SONGS
 */
router.get(
  "/platform/top-songs",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.topSongs
);


/**
 * DISTRIBUTE REVENUE
 */
router.post(
  "/platform/distribute-revenue",
  protect,
  authorize("SUPER_ADMIN"),
  adminController.distributeRevenue
);

module.exports = router;