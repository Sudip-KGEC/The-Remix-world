const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const songController = require("../controllers/songController");

const validate = require('../middlewares/validateMiddleware')
const uploadSongSchema = require("../validators/uploadSongValidator");

/**
 * ADMIN Upload Song
 */
router.post(
  "/upload",
  protect,
  authorize("ADMIN", "SUPER_ADMIN"),
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "flac", maxCount: 1 }
  ]),
  validate(uploadSongSchema),
  songController.uploadSong
);

/**
 * SUPER ADMIN Approve Song
 */
router.put(
  "/:id/approve",
  protect,
  authorize("SUPER_ADMIN"),
  songController.approveSong
);

/**
 * USER Stream Song
 */
router.get(
  "/:id/stream",
  protect,
  songController.streamSong
);

/**
 * PUBLIC Get Approved Songs
 */
router.get(
  "/approved",
  songController.getApprovedSongs
);

/**
 * ADMIN Get Own Songs
 */
router.get(
  "/my-songs",
  protect,
  authorize("ADMIN"),
  songController.getMySongs
);

/**
 * USER Like Song
 */
router.post(
  "/:id/like",
  protect,
  songController.likeSong
);

/**
 * USER Comment on Song
 */
router.post(
  "/:id/comments",
  protect,
  songController.addComment
);

/**
 * Get Song Comments
 */
router.get(
  "/:id/comments",
  songController.getSongComments
);

/**
 * Like Comment
 */
router.post(
  "/comments/:id/like",
  protect,
  songController.likeComment
);

/**
 * Share Song
 */
router.post(
  "/:id/share",
  protect,
  songController.shareSong
);

/**
 * Trending Songs
 */
router.get(
  "/trending",
  songController.getTrendingSongs
);

/**
 * User Play History
 */
router.get(
  "/history",
  protect,
  songController.getPlayHistory
);



module.exports = router;