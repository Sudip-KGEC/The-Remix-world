const Joi = require("joi");

const transactionValidatorSchema = Joi.object({

  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid user ID",
      "string.empty": "User ID is required"
    }),

  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required"
    }),

  credits: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Credits must be a number",
      "number.positive": "Credits must be greater than 0",
      "any.required": "Credits are required"
    }),

  type: Joi.string()
    .valid("PURCHASE", "ADMIN_PAYOUT")
    .required()
    .messages({
      "any.only": "Transaction type must be PURCHASE or ADMIN_PAYOUT"
    }),

  paymentId: Joi.string()
    .trim()
    .max(200)
    .optional(),

  status: Joi.string()
    .valid("PENDING", "SUCCESS", "FAILED")
    .default("SUCCESS")

});

module.exports = transactionValidatorSchema;