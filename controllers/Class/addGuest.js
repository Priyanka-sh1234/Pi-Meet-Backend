// const dayjs = require('dayjs');
// const Classes = require('../../schema/classes/addaclassSchema');
// const Guest = require('../../schema/classes/addGuestSchema');

// const addGuestToClassByLink = async (req, res) => {
//   try {
//     const { meetingLink } = req.params;
//     const { guestName, startDateOfGuest, endDateOfGuest, TrainerID, meetingTitle } = req.body;

//     if (!meetingLink || !guestName || !startDateOfGuest || !endDateOfGuest || !TrainerID || !meetingTitle) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedStart = dayjs(startDateOfGuest);
//     const parsedEnd = dayjs(endDateOfGuest);

//     if (!parsedStart.isValid() || !parsedEnd.isValid()) {
//       return res.status(400).json({ message: 'Invalid guest dates.' });
//     }

//     const existingClass = await Classes.findOne({
//       meetingLink,
//       TrainerID,
//       meetingTitle: meetingTitle.trim(),
//     });

//     if (!existingClass) {
//       return res.status(404).json({ message: 'Class not found with given details.' });
//     }

//     const newGuest = new Guest({
//       name: guestName,
//       startDateOfGuest: parsedStart.toDate(),
//       endDateOfGuest: parsedEnd.toDate(),
//       meetingLink,
//       TrainerID,
//       meetingTitle,
//       classId: existingClass._id,
//     });

//     await newGuest.save();

//     existingClass.guests.push(newGuest._id);
//     await existingClass.save();

//     return res.status(200).json({
//       message: 'Guest added successfully.',
//       guest: newGuest,
//     });

//   } catch (error) {
//     console.error('Error adding guest:', error);
//     return res.status(500).json({ message: 'Server error.' });
//   }
// };

// module.exports = { addGuestToClassByLink };
