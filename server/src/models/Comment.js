const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
{
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true,
    index: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },

  likes: {
    type: Number,
    default: 0
  },

  // optional reply support
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);