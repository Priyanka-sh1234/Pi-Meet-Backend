const Trainer = require('../../schema/Trainers/addTrainerSchema');
const addTrainerSchema = require('../../validation/Trainers/addValidation');
const sendMail = require('../../utils/trainerMailAdd');
const jwt = require('jsonwebtoken');

const addTrainer = async (req, res) => {
    try {
        const { error } = addTrainerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, TrainerId, technology, mobile, role } = req.body;

        const existingTrainer = await Trainer.findOne({ email });
        if (existingTrainer) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const newTrainer = new Trainer({
            name,
            email,
            TrainerId,
            password: null,
            technology,
            mobile,
            role,
            PassChangeStatus: 'inactive',
        });

        await newTrainer.save();

        const resetLink = `http://localhost:5173/Trainer/reset`;

        await sendMail(
            email,
            'Set Your Password',
            `
                <h3>Hello ${name},</h3>
                <p>Welcome! Please click the link below to set your password and activate your account:</p>
                <a href="${resetLink}">Set Password</a>
                <p>Your Trainer ID is:" ${TrainerId} " </a>
                <p>This link will expire in 1 hour.</p>
            `
        );

        return res.status(201).json({
            message: 'Trainer added successfully. Activation link sent to email.',
            trainer: {
                id: newTrainer._id,
                name,
                email,
                PassChangeStatus: newTrainer.PassChangeStatus,
            }
        });

    } catch (error) {
        console.error('Error adding trainer:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addTrainer };
