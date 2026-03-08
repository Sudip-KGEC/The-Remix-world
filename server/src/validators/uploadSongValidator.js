const Joi = require("joi");

const uploadSongValidatorSchema = Joi.object({

  title: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .required()
    .messages({
      "string.empty": "Title is required"
    }),

  artistName: Joi.string()
    .trim()
    .max(100)
    .allow("", null),

  category: Joi.string()
    .valid("Remix", "Mashup", "Original Remix")
    .default("Remix"),

  bpm: Joi.number()
    .min(40)
    .max(220)
    .default(120),

  energyLevel: Joi.string()
    .valid(
      "Chill",
      "Party",
      "Hard EDM",
      "Vibration Bass",
      "Dance Remix"
    ),

  isEarlyAccess: Joi.boolean()
    .default(false),

  earlyAccessExpiry: Joi.date()
    .greater("now")
    .optional(),

  audioFingerprint: Joi.string()
    .max(255)
    .optional()

});

module.exports = uploadSongValidatorSchema;