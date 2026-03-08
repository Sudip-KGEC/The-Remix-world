const Song = require("../models/Song");
const User = require("../models/User");

const calculateEarnings = async () => {
  const totalPlays = await Song.aggregate([
    { $group: { _id: null, total: { $sum: "$playCount" } } }
  ]);

  if (!totalPlays.length) return;

  const totalRevenue = 100000; // Example revenue for month
  const platformPlays = totalPlays[0].total;

  const admins = await User.find({ role: "ADMIN" });

  for (let admin of admins) {
    const adminSongs = await Song.find({ adminId: admin._id });

    const adminPlays = adminSongs.reduce(
      (sum, song) => sum + song.playCount,
      0
    );

    const earning =
      (adminPlays / platformPlays) *
      totalRevenue *
      0.4;

    admin.totalEarning = earning;
    await admin.save();
  }
};

module.exports = calculateEarnings;