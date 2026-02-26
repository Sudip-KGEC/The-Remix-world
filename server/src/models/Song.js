const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  filePath: String,
  playCount: {
    type: Number,
    default: 0
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Song", songSchema);