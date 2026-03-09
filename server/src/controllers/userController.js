const User = require("../models/User");


// GET USER PROFILE
exports.getMyProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// GET USER CREDITS
exports.getMyCredits = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("credits");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      credits: user.credits
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET DOWNLOAD HISTORY
exports.getDownloads = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .populate("downloads");

    res.status(200).json({
      success: true,
      downloads: user.downloads
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET USER PLAYLISTS
exports.getPlaylists = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("playlists");

    res.status(200).json({
      success: true,
      playlists: user.playlists
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// FOLLOW DJ
exports.followDJ = async (req, res) => {

  try {

    const { djId } = req.body;

    const user = await User.findById(req.user.id);
    const dj = await User.findById(djId);

    if (!dj || dj.role !== "ADMIN") {
      return res.status(404).json({
        success: false,
        message: "DJ not found"
      });
    }

    if (user.followingDJs.includes(djId)) {
      return res.status(400).json({
        success: false,
        message: "Already following this DJ"
      });
    }

    user.followingDJs.push(djId);
    dj.followers += 1;

    await user.save();
    await dj.save();

    res.status(200).json({
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



// GET FOLLOWING DJs
exports.getFollowing = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .populate("followingDJs", "name followers");

    res.status(200).json({
      success: true,
      following: user.followingDJs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// PLAY HISTORY
exports.getHistory = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .populate("history.song");

    res.status(200).json({
      success: true,
      history: user.history
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};