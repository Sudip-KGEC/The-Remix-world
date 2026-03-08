const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const paymentController = require("../controllers/paymentController");

/**
 * @route   POST /api/v1/payments/order
 * @desc    Create payment order
 * @access  Private
 */
router.post(
  "/order",
  protect,
  paymentController.createOrder
);

/**
 * @route   POST /api/v1/payments/verify
 * @desc    Verify payment after checkout
 * @access  Private
 */
router.post(
  "/verify",
  protect,
  paymentController.verifyPayment
);

module.exports = router;