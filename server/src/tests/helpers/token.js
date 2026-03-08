const jwt = require("jsonwebtoken");

function generateToken(userId, role = "USER") {

  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || "testsecret",
    { expiresIn: "1h" }
  );

}

module.exports = generateToken;