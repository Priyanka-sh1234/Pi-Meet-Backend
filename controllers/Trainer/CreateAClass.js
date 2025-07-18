const dayjs = require('dayjs');
const Classes = require('../../schema/classes/addaclassSchema');
const sendMail = require('../../utils/mailer');

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
    } = req.body;

    console.log(req.body);

    if (
      !meetingTitle || !meetingType || !startingDate || !endingDate ||
      !startingTime || !endingTime || !nameOfTrainer || !technology ||
      !TrainerID || !meetingLink
    ) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const parsedStartDate = dayjs(startingDate);
    const parsedEndDate = dayjs(endingDate);

    if (!parsedStartDate.isValid() || !parsedEndDate.isValid()) {
      return res.status(400).json({ message: 'Invalid start or end date.' });
    }

    const guestList = Array.isArray(addGuest) ? addGuest : [];

    const newClass = new Classes({
      meetingTitle,
      meetingType,
      technology,
      startingDate: parsedStartDate.toDate(),
      endingDate: parsedEndDate.toDate(),
      startingTime,
      endingTime,
      nameOfTrainer,
      TrainerID,
      meetingLink,
      addGuest: guestList,
    });

    await newClass.save();

    // Send email to each guest
    for (const guest of guestList) {
      if (guest.email) {
        const message = `
Hello ${guest.name},

You have been invited to join the meeting: "${meetingTitle}".

📅 Date: ${startingDate} to ${endingDate}
⏰ Time: ${startingTime} to ${endingTime}
📍 Meeting Link: ${meetingLink}

Your login credentials:
- Login ID: ${guest.email}

Regards,
${nameOfTrainer}
        `;
        await sendMail(guest.email, 'Class Invitation: ' + meetingTitle, message);
      }
    }

    return res.status(201).json({
      message: 'Class created successfully and emails sent to guests',
      class: newClass,
    });

  } catch (error) {
    console.error('Error creating class:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAClass };
