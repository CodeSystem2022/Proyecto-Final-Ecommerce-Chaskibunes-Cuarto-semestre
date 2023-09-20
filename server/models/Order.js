const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  stripeTokenId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
