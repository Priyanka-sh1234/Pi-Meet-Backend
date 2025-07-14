const Classes = require('../../schema/classes/addaclassSchema');

const getAllClasses = async (req, res) => {
  try {
    const allClasses = await Classes.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'All classes retrieved successfully.',
      total: allClasses.length,
      classes: allClasses,
    });
  } catch (error) {
    console.error('Error retrieving classes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllClasses };
