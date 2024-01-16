const Joi = require('joi');

const validateContacts = Joi.object({
  name: Joi.string().trim().alphanum().min(2).max(16).required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .trim()
    .min(14)
    .max(14)
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const validateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateUser = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-_]?\w+)*@\w+([.-_]?\w+)*(\.\w{2,3})+$/)
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/
    )
    .required()
    .messages({
      'string.pattern.base':
        'Must be at least 8 symbols, has 1 upper character, 1 number and one special symbol',
    }),
});

const schemas = {
  validateFavorite,
  validateContacts,
  validateUser,
};

module.exports = schemas;
