const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const recommendController = require("../controllers/recommendController");

/**
 * @route   GET /api/v1/recommendations
 * @desc    Get personalized song recommendations
 * @access  Private
 */
router.get(
  "/recommendations",
  protect,
  recommendController.getRecommendations
);

/**
 * @route   GET /api/v1/recommendations/songs/:id/similar
 * @desc    Get similar songs
 * @access  Public
 */
router.get(
  "/songs/:id/similar",
  recommendController.getSimilarSongs
);

module.exports = router;