const User = require('../models/User');
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generateToken');

// USER REGISTER 
exports.register = async (req , res) => {
   try {
       const {name , email , password } = req.body;
    
       const userExists = await User.findOne({email});

       if(userExists) {
           return res.status(400).json(
            { message: "User already exists" }
        )
       };

       const hashedPassword = await bcrypt.hash(password , 10);

       const user = await User.create(
        { 
            name,
            email,
            password: hashedPassword

        }
    );

   const token = generateToken(user);

res.cookie("token", token, {
  httpOnly: true,
  secure: false, 
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000 
});

res.status(201).json({
  message: "User registered",
  role: user.role
});

   } catch (error) {
       res.status(500).json({message: error.message});
   }
};


// USER LOGIN
exports.login = async (req , res ) => {
    
  try {
    const { email , password } = req.body;
    
    const user = await User.findOne({email});
    
    if(!user) {
        return res.status(400).json({message: "Invalid credentials please register."});
    };

    const isMatch = await bcrypt.compare(password , user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    };

 const token = generateToken(user);

res.cookie("token", token, {
  httpOnly: true,
  secure: false, 
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000 
});

res.status(201).json({
  message: "User login successfully",
  role: user.role
});

  } catch (error) {
     
     res.status(500).json({message: error.message});
  }
};



