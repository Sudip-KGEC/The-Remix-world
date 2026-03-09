const Joi = require("joi");

const playlistValidatorSchema = Joi.object({

  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Playlist name is required"
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null),

  coverImage: Joi.string()
    .uri()
    .optional(),

  category: Joi.string()
    .trim()
    .max(100)
    .optional()

}).options({ allowUnknown: false });

module.exports = { playlistValidatorSchema };