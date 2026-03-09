const User = require("../models/User");
const Song = require("../models/Song");
const Transaction = require("../models/Transaction");


// USER DASHBOARD
exports.userDashboard = async (req, res) => {

  try {

    res.status(200).json({
      success: true,
      message: "User Dashboard",
      userId: req.user.id,
      role: req.user.role
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// USER ACTIVITY
exports.userActivity = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("downloads playlists history");

    res.json({
      success: true,
      downloads: user.downloads.length,
      playlists: user.playlists.length,
      history: user.history.length
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ADMIN DASHBOARD
exports.adminDashboard = async (req, res) => {

  try {

    res.status(200).json({
      success: true,
      message: "Admin Dashboard",
      adminId: req.user.id,
      role: req.user.role
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ADMIN SONG STATS
exports.adminSongs = async (req, res) => {

  try {

    const songs = await Song.find({
      adminId: req.user.id
    });

    res.json({
      success: true,
      totalSongs: songs.length
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ADMIN REVENUE
exports.adminRevenue = async (req, res) => {

  try {

    const admin = await User.findById(req.user.id)
      .select("totalEarning");

    res.json({
      success: true,
      revenue: admin.totalEarning
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// SUPER ADMIN DASHBOARD
exports.superAdminDashboard = async (req, res) => {

  try {

    res.status(200).json({
      success: true,
      message: "Super Admin Dashboard",
      superAdminId: req.user.id,
      role: req.user.role
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// SUPER ADMIN ANALYTICS
exports.superAdminAnalytics = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();
    const totalSongs = await Song.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    res.json({
      success: true,
      totalUsers,
      totalSongs,
      totalTransactions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// SUPER ADMIN USERS LIST
exports.superAdminUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("name email role");

    res.json({
      success: true,
      totalUsers: users.length,
      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};