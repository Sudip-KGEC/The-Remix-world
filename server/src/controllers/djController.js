const mongoose = require("mongoose");
const User = require("../models/User");
const Song = require("../models/Song");


// GET ALL DJs
exports.getAllDjs = async (req, res) => {
  try {

    const djs = await User.find({ role: "ADMIN" })
      .select("name followers totalEarning")
      .sort({ followers: -1 });

    res.status(200).json({
      success: true,
      count: djs.length,
      djs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET DJ PROFILE
exports.getDjProfile = async (req, res) => {
  try {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "DJ not found"
      });
    }

    const dj = await User.findById(id)
      .select("name email role totalEarning followers");

    if (!dj || dj.role !== "ADMIN") {
      return res.status(404).json({
        success: false,
        message: "DJ not found"
      });
    }

    const songs = await Song.find({
      adminId: id,
      isApproved: true
    }).select("-__v");

    res.json({
      success: true,
      dj,
      totalSongs: songs.length,
      songs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET DJ SONGS
exports.getDjSongs = async (req, res) => {
  try {

    const songs = await Song.find({
      adminId: req.params.id,
      isApproved: true
    }).sort({ createdAt: -1 });

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



// FOLLOW DJ
exports.followDj = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);
    const dj = await User.findById(req.params.id);

    if (!dj || dj.role !== "ADMIN") {
      return res.status(404).json({
        success: false,
        message: "DJ not found"
      });
    }

    if (user.followingDJs.includes(dj._id)) {
      return res.json({
        success: false,
        message: "Already following DJ"
      });
    }

    user.followingDJs.push(dj._id);
    await user.save();

    dj.followers += 1;
    await dj.save();

    res.json({
      success: true,
      message: "DJ followed successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// UNFOLLOW DJ
exports.unfollowDj = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);
    const djId = req.params.id;

    user.followingDJs = user.followingDJs.filter(
      id => id.toString() !== djId
    );

    await user.save();

    await User.findByIdAndUpdate(djId, {
      $inc: { followers: -1 }
    });

    res.json({
      success: true,
      message: "DJ unfollowed"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET DJ FOLLOWERS
exports.getDjFollowers = async (req, res) => {
  try {

    const dj = await User.findOne({
      _id: req.params.id,
      role: "ADMIN"
    }).select("name followers");

    if (!dj) {
      return res.status(404).json({
        success: false,
        message: "DJ not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        djId: dj._id,
        name: dj.name,
        followers: dj.followers
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// TRENDING DJs
exports.getTrendingDjs = async (req, res) => {
  try {

    const djs = await User.find({ role: "ADMIN" })
      .sort({ followers: -1 })
      .limit(10)
      .select("name followers");

    res.json({
      success: true,
      djs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// TOP REMIX DJs
exports.getTopRemixDjs = async (req, res) => {
  try {

    const djs = await Song.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: "$adminId",
          totalPlays: { $sum: "$playCount" }
        }
      },
      { $sort: { totalPlays: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      djs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// NEW DJs
exports.getNewDjs = async (req, res) => {
  try {

    const djs = await User.find({ role: "ADMIN" })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name followers createdAt");

    res.json({
      success: true,
      djs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};