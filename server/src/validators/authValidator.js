const Joi = require("joi");

const registerValidatorSchema = Joi.object({

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
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters"
    }),

  // referral system
  referralCode: Joi.string()
    .trim()
    .alphanum()
    .min(4)
    .max(20)
    .optional()

});


const loginValidatorSchema = Joi.object({

  email: Joi.string()
    .email()
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

});


module.exports = {
  registerValidatorSchema,
  loginValidatorSchema
};