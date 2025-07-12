const Class = require('../../schema/classes/addaclassSchema');

const deleteClass = async (req, res) => {
  try {
    const { meetingLink } = req.params;

    if (!meetingLink) {
      return res.status(400).json({ message: 'Meeting Link is required.' });
    }

    const deletedClass = await Class.findOneAndDelete({ meetingLink: meetingLink.trim()});

    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    return res.status(200).json({
      message: 'Class deleted successfully.',
      deletedClass: {
        MeetingTitle: deletedClass.meetingLink,
        NameOfTrainer: deletedClass.nameOfTrainer,
        TrainerId: deletedClass.TrainerId,
        StartingDate: deletedClass.startingDate,
        EndingDate: deletedClass.endingDate,
        StartingTime: deletedClass.StartingTime,
        EndingTime: deletedClass.endingTime,
      }
    });
  } catch (error) {
    console.error('Error deleting Class:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { deleteClass };
