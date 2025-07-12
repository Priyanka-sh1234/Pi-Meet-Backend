const Joi = require('joi');

const addStudentValidtionSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
    }),

  studentId: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Student ID is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters'
    }),

  technology: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Technology is required'
    }),

  batch: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Batch is required',
      'string.pattern.base': 'Batch format is invalid'
    })
});

module.exports = addStudentValidtionSchema;
