const PlayHistory = require("../models/PlayHistory");
const Song = require("../models/Song");
const mongoose = require("mongoose");


/**
 * PERSONALIZED RECOMMENDATIONS
 */
exports.getRecommendations = async (req, res) => {

  try {

    const userId = req.user.id;

    const history = await PlayHistory.find({ userId }).select("songId");

    const songIds = history.map(h => h.songId);

    if (!songIds.length) {
      return res.status(200).json({
        success: true,
        songs: []
      });
    }

    const similarUsers = await PlayHistory.find({
      songId: { $in: songIds }
    }).distinct("userId");

    const recommendedSongs = await PlayHistory.find({
      userId: { $in: similarUsers },
      songId: { $nin: songIds }
    }).distinct("songId");

    const songs = await Song.find({
      _id: { $in: recommendedSongs },
      isApproved: true
    })
      .limit(20)
      .populate("adminId", "name");

    res.status(200).json({
      success: true,
      songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * SIMILAR SONGS
 */
exports.getSimilarSongs = async (req, res) => {

  try {

    const songId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    const similarSongs = await Song.find({
      bpm: { $gte: song.bpm - 5, $lte: song.bpm + 5 },
      category: song.category,
      isApproved: true,
      _id: { $ne: song._id }
    })
    .limit(10)
    .populate("adminId", "name");

    res.status(200).json({
      success: true,
      songs: similarSongs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * TRENDING SONGS
 */
exports.getTrendingRecommendations = async (req, res) => {

  try {

    const songs = await Song.find({ isApproved: true })
      .sort({ trendingScore: -1, playCount: -1 })
      .limit(20)
      .populate("adminId", "name");

    res.status(200).json({
      success: true,
      songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * GENRE BASED RECOMMENDATIONS
 */
exports.getGenreRecommendations = async (req, res) => {

  try {

    const genre = req.params.genre;

    const songs = await Song.find({
      category: genre,
      isApproved: true
    })
      .sort({ playCount: -1 })
      .limit(20)
      .populate("adminId", "name");

    res.status(200).json({
      success: true,
      genre,
      songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * DJ BASED RECOMMENDATIONS
 */
exports.getDjRecommendations = async (req, res) => {

  try {

    const djId = req.params.djId;

    const songs = await Song.find({
      adminId: djId,
      isApproved: true
    })
      .sort({ playCount: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};