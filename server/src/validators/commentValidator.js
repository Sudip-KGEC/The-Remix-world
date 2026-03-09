const Joi = require("joi");

/**
 * MongoDB ObjectId Validation
 */
const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Invalid ID format"
  });


/**
 * CREATE COMMENT VALIDATOR
 */

const commentValidatorSchema = Joi.object({

  songId: objectId
    .required()
    .messages({
      "string.empty": "Song ID is required"
    }),

  comment: Joi.string()
    .trim()
    .min(1)
    .max(500)
    .required()
    .messages({
      "string.empty": "Comment cannot be empty",
      "string.min": "Comment cannot be empty",
      "string.max": "Comment cannot exceed 500 characters"
    }),

  parentCommentId: objectId
    .allow(null)
    .optional()

}).options({ allowUnknown: false });


module.exports = {
  commentValidatorSchema
};