const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
{
  // Basic Info
  title: {
    type: String,
    required: true
  },

  artistName: {
    type: String
  },

  category: {
    type: String,
    default: "Remix"
  },

  // DJ who uploaded
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Audio storage
  audioUrl: {
    type: String
  },

  flacUrl: {
    type: String
  },

  // Background video
  videoUrl: {
    type: String
  },

  // AI Beat Analyzer
  bpm: {
    type: Number,
    default: 120
  },

  energyLevel: {
    type: String,
    enum: ["Chill", "Party", "Hard EDM" , "Vibration Bass", "Dance Remix"]
  },

  // Streaming analytics
  playCount: {
    type: Number,
    default: 0
  },

  downloadCount: {
    type: Number,
    default: 0
  },

  likeCount: {
    type: Number,
    default: 0
  },

  shareCount: {
    type: Number,
    default: 0
  },

  commentCount: {
    type: Number,
    default: 0
  },

  // Trending algorithm
  trendingScore: {
    type: Number,
    default: 0
  },

  // Premium features
  isEarlyAccess: {
    type: Boolean,
    default: false
  },

  earlyAccessExpiry: {
    type: Date
  },

  // Moderation
  isApproved: {
    type: Boolean,
    default: false
  },

  // Copyright fingerprint
  audioFingerprint: {
    type: String
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);