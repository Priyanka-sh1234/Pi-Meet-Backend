const { model, Schema } = require('mongoose');

const AdminSchema = new Schema(
  {
    AdminId: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['Student', 'Admin', 'Trainer'],
      default: 'Student',
    },
  },
  {
    timestamps: true,
  }
);

const AdminLogin = model('Admin', AdminSchema);

module.exports = AdminLogin;
