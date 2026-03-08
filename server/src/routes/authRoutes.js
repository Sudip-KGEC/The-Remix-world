const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");
const { registerValidatorSchema, loginValidatorSchema } = require("../validators/authValidator");



// Register
router.post(
  "/register",
  validate(registerValidatorSchema),
  authController.register
);

// Login
router.post(
  "/login",
  validate(loginValidatorSchema),
  authController.login
);

// // Get current logged in user
// router.get(
//   "/me",
//   protect,
//   authController.getMe
// );

module.exports = router;