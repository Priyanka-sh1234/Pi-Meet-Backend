const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    TrainerId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email'],
    },
    password: {
      type: String,
      default: null,
    },
    technology: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Mobile number must be 10 digits'],
      trim: true,
    },
    PassChangeStatus: {
      type: String,
      enum: ['inactive', 'active'],
      default: 'inactive',
    },
    role: {
      type: String,
      default: 'Trainer',
    },
    batch: {
      type: String,
      enum: ['Batch 9-11', 'Batch 11-1', 'Batch 2-4', 'Batch 4-6', 'Batch offline'],
      default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TrainerDetails', trainerSchema);
