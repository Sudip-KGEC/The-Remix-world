const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const recommendController = require("../controllers/recommendController");

router.get(
  "/recommendations",
  protect,
  recommendController.getRecommendations
);

router.get(
  "/recommendations/trending",
  recommendController.getTrendingRecommendations
);

router.get(
  "/recommendations/genre/:genre",
  recommendController.getGenreRecommendations
);

router.get(
  "/recommendations/dj/:djId",
  recommendController.getDjRecommendations
);

router.get(
  "/songs/:id/similar",
  recommendController.getSimilarSongs
);

module.exports = router;