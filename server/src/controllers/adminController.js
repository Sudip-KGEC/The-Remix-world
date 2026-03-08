
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Song = require("../models/Song");
const calculateEarnings = require("../utils/earnings");


// CREATE ADMIN (SUPER ADMIN)
exports.createAdmin = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const generateReferralCode ="REF" + Math.random().toString(36).substring(2,8).toUpperCase();


    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      referralCode: generateReferralCode
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        referralCode: admin.referralCode
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// ADMIN - GET OWN EARNINGS
exports.getAdminEarnings = async (req, res) => {
  try {

    const admin = await User.findById(req.user.id)
      .select("name totalEarning");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      data: admin
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// PLATFORM STATS (SUPER ADMIN)
exports.platformStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({ role: "USER" });
    const totalAdmins = await User.countDocuments({ role: "ADMIN" });
    const totalSongs = await Song.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers,
      totalAdmins,
      totalSongs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// TOTAL PLAYS ANALYTICS
exports.totalPlays = async (req, res) => {
  try {

    const totalPlaysData = await Song.aggregate([
      { $group: { _id: null, total: { $sum: "$playCount" } } }
    ]);

    res.status(200).json({
      success: true,
      totalPlays: totalPlaysData[0]?.total || 0
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// DISTRIBUTE REVENUE
exports.distributeRevenue = async (req, res) => {
  try {

    const { monthlyRevenue } = req.body;

    if (!monthlyRevenue) {
      return res.status(400).json({
        success: false,
        message: "Monthly revenue required"
      });
    }

    await calculateEarnings(monthlyRevenue);

    res.status(200).json({
      success: true,
      message: "Revenue distributed successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


  