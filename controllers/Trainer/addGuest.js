const GuestSchema = require('../../schema/classes/addGuestSchema');
const CreateClass = require("../../schema/classes/addaclassSchema");

const AddGuest = async (req, res, next) => {
  try {
    const {
      name,
      startDateOfGuest,
      endDateOfGuest,
      classId,
      TrainerID
    } = req.body;

    // Step 1: Basic validation
    if (!name || !startDateOfGuest || !endDateOfGuest || !classId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (name, dates, classId).',
      });
    }

    // Step 2: Check if class exists
    const classData = await CreateClass.findById(classId);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found with provided classId.',
      });
    }

    // Step 3: Check if guest already exists
    const existingGuest = await GuestSchema.findOne({
      name: name.trim(),
      meetingLink: classData.meetingLink,
      TrainerID: classData.TrainerID,
      meetingTitle: classData.meetingTitle,
      startDateOfGuest: new Date(startDateOfGuest),
      endDateOfGuest: new Date(endDateOfGuest),
      classId,
    });

    if (existingGuest) {
      return res.status(409).json({
        success: false,
        message: 'Guest with the same timing already exists in this class.',
      });
    }

    // Step 4: Create new guest using class data
    const newGuest = new GuestSchema({
      name: name.trim(),
      startDateOfGuest: new Date(startDateOfGuest),
      endDateOfGuest: new Date(endDateOfGuest),
      meetingLink: classData.meetingLink,
      TrainerID: TrainerID,
      meetingTitle: classData.meetingTitle,
      classId: classData._id,
    });

    await newGuest.save();

    return res.status(201).json({
      success: true,
      message: 'Guest added successfully.',
      guest: newGuest,
    });
  } catch (error) {
    console.error('AddGuest error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while adding guest.',
      error: error.message,
    });
  }
};

module.exports = { AddGuest };
