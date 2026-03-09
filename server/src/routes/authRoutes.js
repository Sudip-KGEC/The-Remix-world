const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");

const {
  userRegisterValidatorSchema,
  userLoginValidatorSchema
} = require("../validators/authValidator");


// Register
router.post(
  "/register",
  validate(userRegisterValidatorSchema),
  authController.register
);


// Login
router.post(
  "/login",
  validate(userLoginValidatorSchema),
  authController.login
);

module.exports = router;