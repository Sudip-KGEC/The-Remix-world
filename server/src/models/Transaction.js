const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  amount: Number,

  credits: Number,

  type: {
    type: String,
    enum: ["PURCHASE", "ADMIN_PAYOUT"]
  },

  paymentId: String,

  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "SUCCESS"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);