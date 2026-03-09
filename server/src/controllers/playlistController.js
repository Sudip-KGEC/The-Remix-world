const mongoose = require("mongoose");
const Playlist = require("../models/Playlist");

/**
 * CREATE PLAYLIST
 */
exports.createPlaylist = async (req, res) => {
  try {

    const playlist = await Playlist.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      playlist
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


/**
 * GET USER PLAYLISTS
 */
exports.getUserPlaylists = async (req, res) => {

  try {

    const playlists = await Playlist.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      playlists
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/**
 * GET PLAYLIST BY ID
 */
exports.getPlaylistById = async (req, res) => {

  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid playlist ID"
      });
    }

    const playlist = await Playlist.findById(id)
      .populate("songs", "title artistName");

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found"
      });
    }

    res.status(200).json({
      success: true,
      playlist
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/**
 * ADD SONG TO PLAYLIST
 */
exports.addSongToPlaylist = async (req, res) => {

  try {

    const { id } = req.params;
    const { songId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(songId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID"
      });
    }

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found"
      });
    }

    if (playlist.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song already exists"
      });
    }

    playlist.songs.push(songId);

    await playlist.save();

    res.status(200).json({
      success: true,
      playlist
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/**
 * REMOVE SONG
 */
exports.removeSongFromPlaylist = async (req, res) => {

  try {

    const { id, songId } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found"
      });
    }

    playlist.songs = playlist.songs.filter(
      song => song.toString() !== songId
    );

    await playlist.save();

    res.status(200).json({
      success: true,
      playlist
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/**
 * DELETE PLAYLIST
 */
exports.deletePlaylist = async (req, res) => {

  try {

    const { id } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found"
      });
    }

    if (playlist.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    await playlist.deleteOne();

    res.status(200).json({
      success: true,
      message: "Playlist deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};