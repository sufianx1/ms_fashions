const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    occasion: { type: String, required: true },
    interestedCollections: [String],
    budget: { type: Number },
    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    whatsappConfirmed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    confirmedAt: { type: Date }
});

module.exports = mongoose.model('Appointment', appointmentSchema);