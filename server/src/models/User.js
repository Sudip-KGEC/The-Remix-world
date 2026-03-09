const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["USER", "ADMIN", "SUPER_ADMIN"],
    default: "USER"
  },

  credits: {
    type: Number,
    default: 100
  },

  isPremium: {
    type: Boolean,
    default: false
  },

  premiumExpiry: Date,

  totalEarning: {
    type: Number,
    default: 0
  },

  followingDJs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  followers: {
    type: Number,
    default: 0
  },

  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },

  referredUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  payments: [
    {
      amount: Number,
      creditsAdded: Number,
      paymentId: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  isVerified: {
    type: Boolean,
    default: false
  },

  // NEW FEATURES

  downloads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song"
    }
  ],

  playlists: [
    {
      name: String,
      songs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Song"
        }
      ]
    }
  ],

  history: [
    {
      song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
      },
      playedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]

},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);