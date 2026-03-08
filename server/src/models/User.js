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

    // Credit system
    credits: {
      type: Number,
      default: 100
    },

    // Premium membership
    isPremium: {
      type: Boolean,
      default: false
    },

    premiumExpiry: {
      type: Date
    },

    // Admin earnings
    totalEarning: {
      type: Number,
      default: 0
    },

    // DJ followers
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

    // Referral system
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

    // Payment history
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

    // Account verification (for DJ admins)
    isVerified: {
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);