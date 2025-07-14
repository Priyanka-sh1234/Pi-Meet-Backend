const Trainer = require('../../schema/Trainers/addTrainerSchema');

const UpdateActiveStatus = async (req, res, next) => {
  try {
    const { TrainerId } = req.params;
    const { status } = req.body;

    if (!TrainerId || !status) {
      return res.status(400).json({ message: 'Trainer ID and status are required.' });
    }

    const allowedStatuses = ['active', 'inactive'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updatedTrainer = await Trainer.findOneAndUpdate(
      { TrainerId },
      { PassChangeStatus: status },
      { new: true }
    );

    if (!updatedTrainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    return res.status(200).json({
      message: `Trainer status updated to "${status}"`,
      trainer: {
        id: updatedTrainer._id,
        name: updatedTrainer.name,
        email: updatedTrainer.email,
        PassChangeStatus: updatedTrainer.PassChangeStatus
      }
    });
  } catch (error) {
    console.error('Error updating trainer status:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { UpdateActiveStatus };
