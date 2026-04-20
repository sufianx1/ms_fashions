const mongoose = require('mongoose');

const COLLECTIONS = [
  'Kashmiri Shawls',
  'Chicken Kari',
  'Kamdani',
  'Lehenga',
  'Mukesh',
  'Chunri',
  'Baadla',
  'Antique',
  'Srinagar',
  'Cross-Stitch'
];

const OCCASIONS = ['Wedding', 'Mehndi', 'Eid', 'Formal', 'Casual'];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true, lowercase: true, trim: true },
    description: {
      en: { type: String, required: true, trim: true },
      ur: { type: String, required: true, trim: true }
    },
    collection: { type: String, enum: COLLECTIONS, required: true },
    occasions: [{ type: String, enum: OCCASIONS }],
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String, trim: true }],
    videos: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    stock: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
module.exports.COLLECTIONS = COLLECTIONS;
module.exports.OCCASIONS = OCCASIONS;
