const Joi = require("joi");

/**
 * USER REGISTER VALIDATOR
 */

const userRegisterValidatorSchema = Joi.object({

  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cannot exceed 30 characters"
    }),

  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  password: Joi.string()
    .trim()
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 100 characters"
    }),

  // Referral code used during signup
  referralCode: Joi.string()
    .trim()
    .alphanum()
    .min(4)
    .max(20)
    .optional()
    .messages({
      "string.alphanum": "Referral code must be alphanumeric",
      "string.min": "Referral code must be at least 4 characters",
      "string.max": "Referral code cannot exceed 20 characters"
    })

}).options({ allowUnknown: false });



/**
 * USER LOGIN VALIDATOR
 */

const userLoginValidatorSchema = Joi.object({

  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required"
    })

}).options({ allowUnknown: false });



module.exports = {
  userRegisterValidatorSchema,
  userLoginValidatorSchema
};