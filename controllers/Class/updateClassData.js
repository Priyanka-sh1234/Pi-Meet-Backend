const CreateClass = require('../../schema/classes/addaclassSchema');

// Update a class by ID
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the class by ID and update with the new data
    const updatedClass = await CreateClass.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({
      message: 'Class updated successfully',
      data: updatedClass,
    });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({
      message: 'Failed to update class',
      error: error.message,
    });
  }
};

module.exports = {
  updateClass,
};
