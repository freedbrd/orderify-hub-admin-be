const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'businessProfile',
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
