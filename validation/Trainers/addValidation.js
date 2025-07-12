const Joi = require('joi');

const addTrainerSchema = Joi.object({
  name: Joi.string().trim().min(2).required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
    }),

  email: Joi.string().trim().email().required()
    .messages({
      'string.email': 'Email must be valid',
      'string.empty': 'Email is required'
    }),

  TrainerId: Joi.string().trim().required()
    .messages({
      'string.empty': 'Trainer ID is required',
    }),

  technology: Joi.string().trim().required()
    .messages({ 'string.empty': 'Technology is required' }),

  mobile: Joi.string().trim().pattern(/^[0-9]{10}$/).required()
    .messages({
      'string.empty': 'Mobile number is required',
      'string.pattern.base': 'Mobile number must be 10 digits'
    }),

  role: Joi.string().trim().required().valid('Student', 'Admin', 'Trainer')
    .messages({
      'any.only': 'Role must be one of Student, Admin, or Trainer',
      'string.empty': 'Role is required'
    }),
});

module.exports = addTrainerSchema;
