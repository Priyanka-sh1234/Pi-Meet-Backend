const { Schema, model } = require('mongoose');

const GuestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDateOfGuest: {
      type: Date,
      required: true,
    },
    endDateOfGuest: {
      type: Date,
      required: true,
    },
    meetingLink: {
      type: String,
      required: true,
      trim: true,
    },
    TrainerID: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    meetingTitle: {
      type: String,
      required: true,
      trim: true,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'CreateClass',
    },
     studentCategory: {
      type: String,
       enum: ['online', 'offline'],
    },  
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Guest = model('Guest', GuestSchema);
module.exports = Guest;
