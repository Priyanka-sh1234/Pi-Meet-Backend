const TrainerModel = require('../schema/Trainers/addTrainerSchema');
const bcrypt = require('bcryptjs');

const resetTrainerPassword = async (req, res) => {
  try {
    const { trainerId, newPassword } = req.body;

    if (!trainerId || !newPassword) {
      return res.status(400).json({ message: 'Trainer ID and new password are required.' });
    }

    const trainer = await TrainerModel.findOne({ TrainerId: trainerId });

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    trainer.password = hashedPassword;
    trainer.PassChangeStatus = 'active';

    await trainer.save();

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { resetTrainerPassword };