const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  })

  module.exports = contactSchema;
