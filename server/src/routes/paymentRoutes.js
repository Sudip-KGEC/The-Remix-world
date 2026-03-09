const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const paymentController = require("../controllers/paymentController");


/**
 * CREATE PAYMENT ORDER
 */
router.post(
  "/order",
  protect,
  paymentController.createOrder
);

/**
 * VERIFY PAYMENT
 */
router.post(
  "/verify",
  protect,
  paymentController.verifyPayment
);

/**
 * PAYMENT HISTORY
 */
router.get(
  "/history",
  protect,
  paymentController.getPaymentHistory
);

/**
 * PAYMENT PLANS
 */
router.get(
  "/plans",
  paymentController.getPaymentPlans
);

/**
 * SUBSCRIBE PLAN
 */
router.post(
  "/subscribe",
  protect,
  paymentController.subscribePlan
);

/**
 * PAYMENT WEBHOOK
 */
router.post(
  "/webhook",
  paymentController.paymentWebhook
);

module.exports = router;