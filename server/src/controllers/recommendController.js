const PlayHistory = require("../models/PlayHistory");
const Song = require("../models/Song");

exports.getRecommendations = async (req, res) => {

  const userId = req.user.id;

  // songs listened by user
  const history = await PlayHistory.find({ userId });

  const songIds = history.map(h => h.songId);

  // find other users who listened to same songs
  const similarUsers = await PlayHistory.find({
    songId: { $in: songIds }
  }).distinct("userId");

  // songs those users listened
  const recommendedSongs = await PlayHistory.find({
    userId: { $in: similarUsers },
    songId: { $nin: songIds }
  }).distinct("songId");

  const songs = await Song.find({
    _id: { $in: recommendedSongs },
    isApproved: true
  }).limit(20);

  res.json(songs);
};

exports.getSimilarSongs = async (req, res) => {
  try {

    const songId = req.params.id;

    // find current song
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        message: "Song not found"
      });
    }

    // find songs with similar bpm + category
    const similarSongs = await Song.find({
      bpm: { $gte: song.bpm - 5, $lte: song.bpm + 5 },
      category: song.category,
      isApproved: true,
      _id: { $ne: song._id }
    })
    .limit(10)
    .populate("adminId", "name");

    res.json({
      message: "Similar remix songs",
      songs: similarSongs
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};