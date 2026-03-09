const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist
} = require("../controllers/playlistController");

const { protect } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const { playlistValidatorSchema } = require("../validators/playlistValidator");

router.post("/", protect, validate(playlistValidatorSchema), createPlaylist);

router.get("/my-playlists", protect, getUserPlaylists);

router.get("/:id", getPlaylistById);

router.post("/:id/songs", protect, addSongToPlaylist);

router.delete("/:id/songs/:songId", protect, removeSongFromPlaylist);

router.delete("/:id", protect, deletePlaylist);

module.exports = router;