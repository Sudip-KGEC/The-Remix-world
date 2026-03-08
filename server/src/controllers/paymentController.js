
const { response } = require("../app");
const User = require("../models/User");

exports.createOrder = async (req, res) => {

  const { amount } = req.body;

  res.status(200).json({message: "payment Sucessfull" , amount : `INR ${amount}`})

  // const options = {
  //   amount: amount * 100,
  //   currency: "INR"
  // };

  // const order = await razorpay.orders.create(options);

  // res.json(order);
};


exports.verifyPayment = async (req,res)=>{

const {userId, credits} = req.body;

const user = await User.findById(userId);

user.credits += credits;

await user.save();

res.json({
message:"Credits added successfully"
});

}