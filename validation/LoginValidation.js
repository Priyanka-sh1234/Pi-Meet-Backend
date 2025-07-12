const Joi = require('joi');

const loginValidationSchema = Joi.object({
    userEmail: Joi.string().email({ tlds: { allow: false } }).required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
        }),

    password: Joi.string().min(8).required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
        }),


    role: Joi.string().valid('Student', 'Admin', 'Trainer').optional(),
});

module.exports = loginValidationSchema;
