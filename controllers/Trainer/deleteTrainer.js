const Trainer = require('../../schema/Trainers/addTrainerSchema');

const deleteTrainer = async (req, res) => {
  try {
    const { TrainerId } = req.params;

    if (!TrainerId) {
      return res.status(400).json({ message: 'TrainerId is required.' });
    }

    const deletedTrainer = await Trainer.findOneAndDelete({ TrainerId: TrainerId.trim()});

    if (!deletedTrainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    return res.status(200).json({
      message: 'Trainer deleted successfully.',
      deletedTrainer: {
        name: deletedTrainer.name,
        email: deletedTrainer.email,
        TrainerId: deletedTrainer.TrainerId,
        role: deletedTrainer.role
      }
    });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { deleteTrainer };
