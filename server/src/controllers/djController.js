const User = require("../models/User");
const Song = require("../models/Song");

// GET DJ PROFILE + SONGS
exports.getDjProfile = async (req, res) => {
  try {

    const dj = await User.findById(req.params.id)
      .select("name email role totalEarning");

    if (!dj || dj.role !== "ADMIN") {
      return res.status(404).json({
        success: false,
        message: "DJ not found"
      });
    }

    const songs = await Song.find({
      adminId: req.params.id,
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

    // Prevent duplicate follow
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