const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const validate = require("../middlewares/validateMiddleware");

const { commentValidatorSchema } = require("../validators/commentValidator");
const uploadSongSchema = require("../validators/uploadSongValidator");

const songController = require("../controllers/songController");



/* ======================================================
   ADMIN SONG MANAGEMENT
====================================================== */

/**
 * Upload Song
 * POST /api/v1/songs/upload
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
 * Approve Song
 * PUT /api/v1/songs/:id/approve
 */
router.put(
  "/:id/approve",
  protect,
  authorize("SUPER_ADMIN"),
  songController.approveSong
);


/**
 * Get Admin Songs
 * GET /api/v1/songs/my-songs
 */
router.get(
  "/my-songs",
  protect,
  authorize("ADMIN"),
  songController.getMySongs
);



/* ======================================================
   PUBLIC DISCOVERY APIs
====================================================== */

/**
 * Get Approved Songs
 */
router.get(
  "/approved",
  songController.getApprovedSongs
);

/**
 * Trending Songs
 */
router.get(
  "/trending",
  songController.getTrendingSongs
);

/**
 * Recommended Songs
 */
router.get(
  "/recommended",
  songController.getRecommendedSongs
);

/**
 * Search Songs
 */
router.get(
  "/search",
  songController.searchSongs
);

/**
 * Songs by DJ
 */
router.get(
  "/dj/:djId",
  songController.getSongsByDJ
);



/* ======================================================
   USER INTERACTION APIs
====================================================== */

/**
 * Play History
 */
router.get(
  "/history",
  protect,
  songController.getPlayHistory
);

/**
 * Like Comment
 */
router.post(
  "/comments/:id/like",
  protect,
  songController.likeComment
);



/* ======================================================
   SONG ACTION ROUTES (ID BASED)
====================================================== */

/**
 * Stream Song
 */
router.get(
  "/:id/stream",
  protect,
  songController.streamSong
);

/**
 * Download Song
 */
router.post(
  "/:id/download",
  protect,
  songController.downloadSong
);

/**
 * Like Song
 */
router.post(
  "/:id/like",
  protect,
  songController.likeSong
);

/**
 * Comment on Song
 */
router.post(
  "/:id/comments",
  protect,
  validate(commentValidatorSchema),
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
 * Share Song
 */
router.post(
  "/:id/share",
  protect,
  songController.shareSong
);

/**
 * Get Song Details
 */
router.get(
  "/:id",
  songController.getSongById
);


module.exports = router;