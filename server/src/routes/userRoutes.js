const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

/**
 * @route   GET /api/v1/users/me
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/me", protect, userController.getMyProfile);

/**
 * @route   GET /api/v1/users/credits
 * @desc    Get logged-in user credit balance
 * @access  Private
 */
router.get("/credits", protect, userController.getMyCredits);

module.exports = router;