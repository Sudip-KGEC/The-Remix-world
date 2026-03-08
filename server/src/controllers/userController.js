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

    const user = await User.findById(req.user.id)
      .select("credits");

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