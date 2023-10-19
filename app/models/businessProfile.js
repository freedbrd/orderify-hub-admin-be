const mongoose = require('mongoose');

const businessProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['product', 'service'],
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  
}, { timestamps: true, versionKey: false });

const BusinessProfile = mongoose.model('businessProfile', businessProfileSchema);

module.exports = BusinessProfile;
