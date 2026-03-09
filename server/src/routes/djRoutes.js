const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const djController = require("../controllers/djController");


router.get("/", djController.getAllDjs);

router.get("/trending", djController.getTrendingDjs);

router.get("/top-remix", djController.getTopRemixDjs);

router.get("/new", djController.getNewDjs);

router.get("/:id", djController.getDjProfile);

router.get("/:id/songs", djController.getDjSongs);

router.get("/:id/followers", djController.getDjFollowers);

router.post("/:id/follow", protect, djController.followDj);

router.delete("/:id/unfollow", protect, djController.unfollowDj);

module.exports = router;