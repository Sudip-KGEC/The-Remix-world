const User = require("../models/User");
const Transaction = require("../models/Transaction");


/**
 * CREATE ORDER
 */
exports.createOrder = async (req, res) => {

  try {

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount required"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order created",
      amount: `INR ${amount}`
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * VERIFY PAYMENT
 */
exports.verifyPayment = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    const credits = 10;

    user.credits += credits;

    await user.save();

    await Transaction.create({
      userId: user._id,
      amount: 100,
      credits,
      type: "PURCHASE",
      paymentId: "test_payment",
      status: "SUCCESS"
    });

    res.json({
      success: true,
      message: "Credits added successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * PAYMENT HISTORY
 */
exports.getPaymentHistory = async (req, res) => {

  try {

    const history = await Transaction.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      history
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * PAYMENT PLANS
 */
exports.getPaymentPlans = async (req, res) => {

  res.json({
    success: true,
    plans: [
      {
        name: "Starter",
        price: 100,
        credits: 20
      },
      {
        name: "Pro",
        price: 500,
        credits: 120
      },
      {
        name: "Unlimited",
        price: 999,
        premium: true
      }
    ]
  });

};



/**
 * SUBSCRIBE PLAN
 */
exports.subscribePlan = async (req, res) => {

  try {

    const { plan } = req.body;

    const user = await User.findById(req.user.id);

    if (plan === "premium") {
      user.isPremium = true;
      user.premiumExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    await user.save();

    res.json({
      success: true,
      message: "Subscription activated"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/**
 * PAYMENT WEBHOOK
 */
exports.paymentWebhook = async (req, res) => {

  try {

    const event = req.body;

    console.log("Webhook received:", event);

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false
    });

  }

};