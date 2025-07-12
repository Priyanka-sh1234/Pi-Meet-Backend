const Classes = require('../../schema/classes/addaclassSchema');

const getTrainerClasses = async (req, res) => {
  try {
    const { trainerID } = req.query;

    if (!trainerID) {
      return res.status(400).json({ message: 'Trainer ID is required.' });
    }

    const classes = await Classes.find({ TrainerID: trainerID })
      .sort({ startingDate: 1 });

    return res.status(200).json({
      message: `Classes for trainer ${trainerID}`,
      classes,
    });

  } catch (error) {
    console.error('Error fetching classes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTrainerClasses };
