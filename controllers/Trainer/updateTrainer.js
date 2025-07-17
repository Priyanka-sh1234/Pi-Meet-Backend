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

    const oldEmail = trainer.email;

    // Update trainer fields
    trainer.name = name || trainer.name;
    trainer.email = email || trainer.email;
    trainer.mobile = mobile || trainer.mobile;
    trainer.technology = technology || trainer.technology;
    trainer.role = role || trainer.role;

    // If email is not changed, set status to "awaiting"
    if (!email || email === oldEmail) {
      trainer.status = "active";
    }

    await trainer.save();

    // If email has changed, send reset password email
    if (email && email !== oldEmail) {
      trainer.status = "awaiting"
      const token = jwt.sign(
        { id: trainer._id, email: trainer.email, role: trainer.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const resetLink = `http://localhost:5173/Trainer/reset?token=${token}`;

      await sendMail(
        trainer.email,
        'Reset Your Password (Email Changed)',
        `<h3>Hello ${trainer.name},</h3>
          <p>Your email has been updated. Please click the link below to set a new password:</p>
          <a href="${resetLink}">Set Password</a>
          <p>Your Trainer ID is: <strong>${TrainerId}</strong></p>
          <p>This link will expire in 1 hour.</p>
        `
      );
    }

    return res.status(200).json({
      message: 'Trainer updated successfully.',
      trainer: {
        id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        role: trainer.role,
        status: trainer.status,
      }
    });

  } catch (error) {
    console.error('Error updating trainer:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { UpdateTrainer };
