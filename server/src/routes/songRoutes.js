const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {uploadSong , approvedSong , streamingSong } = require('../controllers/songsController')

const router = express.Router();

// ADMIN Upload Song
router.post(
  "/upload",
  protect,
  authorize("ADMIN"),
  upload.single("audio"),
  uploadSong
);

// SUPER ADMIN Approved 
router.put(
  "/approve/:id",
  protect,
  authorize("SUPER_ADMIN"),
  approvedSong 
);



// Streaming Song User 
router.post(
  "/stream/:id",
  protect,
  streamingSong
);

module.exports = router;