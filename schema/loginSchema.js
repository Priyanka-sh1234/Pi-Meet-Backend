const { model, Schema } = require('mongoose');

const LoginSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
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

const LoginModel = model('Login', LoginSchema);

module.exports = LoginModel;
