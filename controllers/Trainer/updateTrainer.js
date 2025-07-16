const Trainer = require('../../schema/Trainers/addTrainerSchema');
const sendMail = require('../../utils/trainerMailAdd');
const jwt = require('jsonwebtoken');

const UpdateTrainer = async (req, res) => {
  try {
    const { TrainerId } = req.params;
    const { name, email, mobile, technology, role } = req.body;

    const trainer = await Trainer.findOne({ TrainerId });

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // Update trainer fields
    trainer.name = name || trainer.name;
    trainer.email = email || trainer.email;
    trainer.mobile = mobile || trainer.mobile;
    trainer.technology = technology || trainer.technology;
    trainer.role = role || trainer.role;

    await trainer.save();

    // Send reset password email
    const token = jwt.sign(
      { id: trainer._id, email: trainer.email, role: trainer.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resetLink = `http://localhost:5173/Trainer/reset-password`;

    await sendMail(
      trainer.email,
      'Reset Your Password (Update)',
      `<h3>Hello ${name},</h3>
        <p>Welcome! Please click the link below to set your password and activate your account:</p>
        <a href="${resetLink}">Set Password</a>
        <p>Your Trainer ID is: <strong>${TrainerId}</strong></p>
        <p>This link will expire in 1 hour.</p>
      `
    );

    return res.status(200).json({
      message: 'Trainer updated and reset password email sent.',
      trainer: {
        id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        role: trainer.role,
      }
    });

  } catch (error) {
    console.error('Error updating trainer:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { UpdateTrainer };
