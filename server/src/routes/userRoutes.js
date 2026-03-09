const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");


router.get("/me", protect, userController.getMyProfile);

router.get("/credits", protect, userController.getMyCredits);

router.get("/downloads", protect, userController.getDownloads);

router.get("/playlists", protect, userController.getPlaylists);

router.post("/follow-dj", protect, userController.followDJ);

router.get("/following", protect, userController.getFollowing);

router.get("/history", protect, userController.getHistory);

module.exports = router;