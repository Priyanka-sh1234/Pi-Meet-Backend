const { model, Schema } = require('mongoose');

const CreateClassSchema = new Schema(
  {
    meetingTitle: {
      type: String,
      required: [true, 'Meeting title is required'],
      trim: true,
    },
    technology: {
      type: String,
      required: true,
      trim: true,
    },
    meetingType: {
      type: String,
      enum: ['custom', 'week', 'monthly', 'daily'],
      required: [true, 'Meeting type is required'],
    },
    startingDate: {
      type: Date,
      required: [true, 'Starting date is required'],
    },
    endingDate: {
      type: Date,
      required: [true, 'Ending date is required'],
    },
    startingTime: {
      type: String,
      required: [true, 'Starting time is required'],
    },
    endingTime: {
      type: String,
      required: [true, 'Ending time is required'],
    },
    nameOfTrainer: {
      type: String,
      required: [true, 'Trainer name is required'],
      trim: true,
    },
    TrainerID: {
      type: String,
      required: [true, 'Trainer ID is required'],
      trim: true,
      uppercase: true,
    },
    meetingLink: {
      type: String,
      required: [true, 'Meeting link is required'],
      trim: true,
    },
    addGuest: {
      type: [String],
      default: [],
    },
    studentCategory: {
      type: String,
      enum: ['online', 'offline'],
      default: 'online',
    },
  },
  {
    timestamps: true,
  }
);

const CreateClass = model('CreateClass', CreateClassSchema);

module.exports = CreateClass;
