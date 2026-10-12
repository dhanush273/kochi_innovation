import mongoose from 'mongoose';

export const DeletedRegistrationSchema = new mongoose.Schema(
  {
    originalId: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    workEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      default: '',
      trim: true
    },
    jobRole: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Attended', 'Cancelled'],
      default: 'Confirmed'
    },
    emailSent: {
      type: Boolean,
      default: false
    },
    emailSentAt: {
      type: Date,
      default: null
    },
    attendedAt: {
      type: Date,
      default: null
    },
    qrCodeToken: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    },
    deletedBy: {
      type: String,
      required: true,
      default: 'Admin',
      trim: true
    },
    deletedAt: {
      type: Date,
      default: Date.now
    },
    reason: {
      type: String,
      default: '',
      trim: true
    },
    originalCreatedAt: {
      type: Date,
      default: null
    },
    originalUpdatedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const DeletedRegistration =
  mongoose.models.DeletedRegistration || mongoose.model('DeletedRegistration', DeletedRegistrationSchema);

export default DeletedRegistration;
