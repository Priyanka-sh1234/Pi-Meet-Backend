const Trainer = require('../../schema/Trainers/addTrainerSchema');

const getTrainerDetails = async (req, res) => {
  try {
    const { TrainerId, email } = req.query;

    let trainer;

    if (TrainerId) {
      trainer = await Trainer.findOne({TrainerId}).select('-password');
    } else if (email) {
      trainer = await Trainer.findOne({ email }).select('-password');
    } else {
      return res.status(400).json({ message: 'Trainer ID or email is required' });
    }

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    return res.status(200).json({ trainer });
  } 
  catch (error) {
    console.error('Error fetching trainer:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports ={getTrainerDetails}