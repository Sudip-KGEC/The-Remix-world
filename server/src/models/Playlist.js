const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },

  description: {
    type: String,
    trim: true,
    default: ""
  },

  coverImage: {
    type: String,
    default: ""
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song"
    }
  ],

  category: {
    type: String,
    trim: true,
    default: ""
  },

  isTrending: {
    type: Boolean,
    default: false,
    index: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);