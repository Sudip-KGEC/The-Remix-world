const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const djController = require("../controllers/djController");

/**
 * @route   GET /api/v1/djs/:id
 * @desc    Get DJ profile
 * @access  Public
 */
router.get("/:id", djController.getDjProfile);

/**
 * @route   GET /api/v1/djs/:id/followers
 * @desc    Get DJ followers list
 * @access  Public
 */
router.get("/:id/followers", djController.getDjFollowers);

/**
 * @route   POST /api/v1/djs/:id/follow
 * @desc    Follow a DJ
 * @access  Private
 */
router.post("/:id/follow", protect, djController.followDj);

module.exports = router;