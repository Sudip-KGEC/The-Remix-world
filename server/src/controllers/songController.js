const Song = require("../models/Song");
const User = require("../models/User");
const Comment = require("../models/Comment");
const PlayHistory = require("../models/PlayHistory");
const uploadToImageKit = require("../services/storage.service");
const generateStreamUrl = require("../utils/generateStreamUrl");



// ADMIN - Upload Song
exports.uploadSong = async (req, res) => {
  try {

    const {
      title,
      artistName,
      category,
      bpm,
      energyLevel,
      isEarlyAccess,
      earlyAccessExpiry,
      audioFingerprint
    } = req.body;

    let audioUrl = null;
    let videoUrl = null;
    let flacUrl = null;

    const artistFolder = (artistName || "unknown")
      .replace(/\s+/g, "_")
      .toLowerCase();

    // AUDIO Upload
    if (req.files?.audio) {

      const uniqueName = `${artistFolder}-${Date.now()}-${req.files.audio[0].originalname}`;

      const audioUpload = await uploadToImageKit(
        req.files.audio[0].buffer,
        uniqueName,
        "remix_songs",
        artistFolder
      );

      audioUrl = audioUpload.url;
    }

    // VIDEO Upload
    if (req.files?.video) {

      const uniqueName = `${Date.now()}-${req.files.video[0].originalname}`;

      const videoUpload = await uploadToImageKit(
        req.files.video[0].buffer,
        uniqueName,
        "videos",
        artistFolder
      );

      videoUrl = videoUpload.url;
    }

    // FLAC Upload
    if (req.files?.flac) {

      const uniqueName = `${Date.now()}-${req.files.flac[0].originalname}`;

      const flacUpload = await uploadToImageKit(
        req.files.flac[0].buffer,
        uniqueName,
        "flac",
        artistFolder
      );

      flacUrl = flacUpload.url;
    }

    const song = await Song.create({
      title,
      artistName,
      category,
      adminId: req.user.id,
      audioUrl,
      videoUrl,
      flacUrl,
      bpm: bpm || 120,
      energyLevel,
      isEarlyAccess,
      earlyAccessExpiry,
      audioFingerprint
    });

    res.status(201).json({
      success: true,
      message: "Song uploaded successfully. Waiting for admin approval.",
      data: song
    });

  } catch (error) {

    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// SUPER ADMIN - Approve Song
exports.approveSong = async (req, res) => {
  try {

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    song.isApproved = true;
    await song.save();

    res.status(200).json({
      success: true,
      message: "Song approved successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// USER - Stream Song
exports.streamSong = async (req, res) => {
  try {

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    if (!song.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Song not approved"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user || user.credits < 1) {
      return res.status(400).json({
        success: false,
        message: "Not enough credits"
      });
    }

    // Save play history
    await PlayHistory.create({
      userId: req.user.id,
      songId: song._id
    });

    // Deduct credit
    user.credits -= 1;
    await user.save();

    // Increase play count
    song.playCount += 1;
    await song.save();

    // Generate secure streaming URLs
    const audioUrl = generateStreamUrl(song.audioUrl);
    const videoUrl = song.videoUrl
      ? generateStreamUrl(song.videoUrl)
      : null;

    res.status(200).json({
      success: true,
      message: "Streaming allowed",
      audioUrl,
      videoUrl,
      remainingCredits: user.credits
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// PUBLIC - Get Approved Songs
exports.getApprovedSongs = async (req, res) => {
  try {

    const songs = await Song.find({ isApproved: true })
      .populate("adminId", "name")
      .select("-__v");

    res.status(200).json({
      success: true,
      data: songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// ADMIN - Get Own Songs
exports.getMySongs = async (req, res) => {
  try {

    const songs = await Song.find({
      adminId: req.user.id
    }).select("-__v");

    res.status(200).json({
      success: true,
      data: songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Like Song 
exports.likeSong = async (req, res) => {
  try {

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    song.likeCount += 1;
    await song.save();

    res.json({
      success: true,
      message: "Song liked",
      likes: song.likeCount
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// comment 
exports.addComment = async (req, res) => {
  try {

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    const comment = await Comment.create({
      songId: req.params.id,
      userId: req.user.id,
      comment: req.body.comment
    });

    // increase comment counter
    song.commentCount += 1;
    await song.save();

    res.status(201).json({
      success: true,
      message: "Comment added",
      data: comment
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.getSongComments = async (req, res) => {

  try {

    const comments = await Comment
      .find({
        songId: req.params.id,
        isDeleted: false
      })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      comments
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.likeComment = async (req, res) => {

  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    comment.likes += 1;

    await comment.save();

    res.json({
      success: true,
      likes: comment.likes
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.shareSong = async (req, res) => {

  try {

    const song = await Song.findById(req.params.id);

    song.shareCount += 1;

    await song.save();

    res.json({
      success: true,
      shares: song.shareCount
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getTrendingSongs = async (req, res) => {

  try {

    const songs = await Song.find({ isApproved: true })
      .sort({ trendingScore: -1 })
      .limit(20)
      .populate("adminId", "name");

    res.json({
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

exports.getPlayHistory = async (req, res) => {

  const history = await PlayHistory
    .find({ userId: req.user.id })
    .populate("songId");

  res.json({
    success: true,
    history
  });

};

exports.getDjProfile = async (req, res) => {

  const songs = await Song.find({
    adminId: req.params.id,
    isApproved: true
  });

  res.json({
    success: true,
    songs
  });

};

// GET SINGLE SONG DETAILS
exports.getSongById = async (req, res) => {

  try {

    const song = await Song
      .findById(req.params.id)
      .populate("adminId", "name");

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    res.json({
      success: true,
      song
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// SEARCH SONGS
exports.searchSongs = async (req, res) => {

  try {

    const { q, category } = req.query;

    const filter = { isApproved: true };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { artistName: { $regex: q, $options: "i" } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    const songs = await Song
      .find(filter)
      .sort({ playCount: -1 })
      .limit(20)
      .populate("adminId", "name");

    res.json({
      success: true,
      count: songs.length,
      songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET RECOMMENDED SONGS
exports.getRecommendedSongs = async (req, res) => {
  try {

    const songs = await Song.find({
      isApproved: true
    })
      .sort({
        trendingScore: -1,
        playCount: -1,
        likeCount: -1
      })
      .limit(15)
      .populate({
        path: "adminId",
        select: "name",
        model: "User"
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: songs.length,
      songs
    });

  } catch (error) {

    console.error("Recommended Songs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recommended songs"
    });

  }
};



// GET SONGS BY DJ
exports.getSongsByDJ = async (req, res) => {

  try {

    const songs = await Song
      .find({
        adminId: req.params.djId,
        isApproved: true
      })
      .sort({ createdAt: -1 });

    res.json({
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



// DOWNLOAD SONG
exports.downloadSong = async (req, res) => {

  try {

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    if (!song.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Song not approved"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user.isPremium && user.credits < 1) {
      return res.status(400).json({
        success: false,
        message: "Not enough credits"
      });
    }

    // deduct credit if not premium
    if (!user.isPremium) {
      user.credits -= 1;
      await user.save();
    }

    // increase download count
    song.downloadCount += 1;
    await song.save();

    res.json({
      success: true,
      downloadUrl: song.audioUrl,
      remainingCredits: user.credits
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};