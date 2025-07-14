const Trainer = require('../../schema/Trainers/addTrainerSchema');

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({}, '-password'); // Exclude password field

    if (!trainers || trainers.length === 0) {
      return res.status(404).json({ message: 'No trainers found.' });
    }

    return res.status(200).json({
      message: 'All trainers fetched successfully.',
      total: trainers.length,
      trainers,
    });
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getAllTrainers };
