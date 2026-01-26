import mongoose from 'mongoose';

const pledgeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  college: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  yearOfStudy: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year (Medical/Nursing)']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  certificateId: {
    type: String,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Pledge', pledgeSchema);
