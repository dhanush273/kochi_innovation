import mongoose from 'mongoose';

const AttendeePostSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    photoUrl: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'qr_venue_registration'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.AttendeePost || mongoose.model('AttendeePost', AttendeePostSchema);
