const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {
        en: { type: String, required: true },
        ur: { type: String, required: true }
    },
    collection: { type: String, enum: ['Kashmiri Shawls', 'Chicken Kari', 'Kamdani', 'Lehenga', 'Mukesh', 'Chunri', 'Baadla', 'Antique', 'Srinagar', 'Cross-Stitch'], required: true },
    occasion: [{ type: String, enum: ['Wedding', 'Mehndi', 'Eid', 'Formal', 'Casual'] }],
    price: { type: Number, required: true },
    priceRange: { min: Number, max: Number },
    images: [{ type: String }],
    videos: [{ type: String }],
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);