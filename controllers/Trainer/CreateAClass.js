const dayjs = require('dayjs');
const Classes = require('../../schema/classes/addaclassSchema');

const createAClass = async (req, res) => {
  try {
    const {
      meetingTitle,
      technology,
      meetingType,
      startingDate,
      endingDate,
      startingTime,
      endingTime,
      nameOfTrainer,
      TrainerID,
      meetingLink,
      addGuest,
      // startDateOfGuest,
      // endDateOfGuest,
    } = req.body;

    console.log(req.body)

    if (
      !meetingTitle || !meetingType || !startingDate || !endingDate ||
      !startingTime || !endingTime || !nameOfTrainer || !technology ||
      !TrainerID || !meetingLink
    ) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const parsedStartDate = dayjs(startingDate);
    const parsedEndDate = dayjs(endingDate);
    // const parsedGuestStart = startDateOfGuest ? dayjs(startDateOfGuest) : null;
    // const parsedGuestEnd = endDateOfGuest ? dayjs(endDateOfGuest) : null;


    if (!parsedStartDate.isValid() || !parsedEndDate.isValid()) {
      return res.status(400).json({ message: 'Invalid start or end date.' });
    }

    const newClass = new Classes({
      meetingTitle,
      meetingType,
      technology,
      startingDate: parsedStartDate.toDate(),
      endingDate: parsedEndDate.toDate(),
      startingTime,
      endingTime,
      nameOfTrainer,
      TrainerID: TrainerID,
      meetingLink,
      addGuest: Array.isArray(addGuest) ? addGuest : [],
      // startDateOfGuest: parsedGuestStart?.isValid() ? parsedGuestStart.toDate() : null,
      // endDateOfGuest: parsedGuestEnd?.isValid() ? parsedGuestEnd.toDate() : null,
    });

    await newClass.save();

    return res.status(201).json({
      message: 'Class created successfully',
      class: newClass,
    });

  } catch (error) {
    console.error('Error creating class:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAClass };
