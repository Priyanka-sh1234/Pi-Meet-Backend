const TrainerModel = require('../schema/Trainers/addTrainerSchema');
const bcrypt = require('bcryptjs');

const resetTrainerPassword = async (req, res) => {
  try {
    const { newPassword, id } = req.body;

    if (!newPassword || !id) {
      return res.status(400).json({ message: 'Both trainer ID and new password are required.' });
    }

    const trainer = await TrainerModel.findOne(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    trainer.password = hashedPassword;
    trainer.PassChangeStatus = 'active';

    await trainer.save();

    return res.status(200).json({ message: 'Password set successfully. Account activated.' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Server error while resetting password.' });
  }
};

module.exports = { resetTrainerPassword };
