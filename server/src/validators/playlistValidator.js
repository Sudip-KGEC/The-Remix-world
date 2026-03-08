const Joi = require("joi");

const playlistValidatorSchema = Joi.object({

  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Playlist name is required",
      "string.min": "Playlist name must be at least 2 characters",
      "string.max": "Playlist name cannot exceed 100 characters"
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null)
    .messages({
      "string.max": "Description cannot exceed 500 characters"
    }),

  coverImage: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": "Cover image must be a valid URL"
    }),

  createdBy: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid user ID"
    }),

  songs: Joi.array()
    .items(
      Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    )
    .optional()
    .messages({
      "string.pattern.base": "Invalid song ID"
    }),

  category: Joi.string()
    .trim()
    .max(100)
    .optional(),

  isTrending: Joi.boolean()
    .default(false)

});

module.exports = playlistValidatorSchema;