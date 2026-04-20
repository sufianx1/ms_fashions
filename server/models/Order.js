const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['stripe', 'jazzcash', 'cash'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    orderStatus: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
    appointmentLinked: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    invoiceURL: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);