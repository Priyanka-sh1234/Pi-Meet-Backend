const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    technology: {
      type: String,
      required: [true, 'Technology field is required'],
      trim: true
    },
    batch: {
      type: String,
      required: [true, 'Batch is required'],
      trim: true,
    }
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('StudentDetails', studentSchema);
