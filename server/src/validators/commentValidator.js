const Joi = require("joi");

const commentValidatorSchema = Joi.object({

  songId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Song ID is required",
      "string.pattern.base": "Invalid song ID"
    }),

  comment: Joi.string()
    .trim()
    .min(1)
    .max(500)
    .required()
    .messages({
      "string.empty": "Comment cannot be empty",
      "string.max": "Comment cannot exceed 500 characters"
    }),

  parentCommentId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null)
    .optional()
    .messages({
      "string.pattern.base": "Invalid parent comment ID"
    })

});

module.exports = commentValidatorSchema;