const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true, trim: true },
    occasion: { type: String, required: true, trim: true },
    interestedCollections: [{ type: String, trim: true }],
    budget: { type: Number, min: 0 },
    location: {
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      area: { type: String, required: true, trim: true }
    },
    phone: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },
    whatsappConfirmed: { type: Boolean, default: false },
    confirmedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
