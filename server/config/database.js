const mongoose = require('mongoose');

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }
  mongoose.set('sanitizeFilter', true);

  await mongoose.connect(uri, {
    autoIndex: process.env.NODE_ENV !== 'production'
  });
};

module.exports = connectDatabase;
