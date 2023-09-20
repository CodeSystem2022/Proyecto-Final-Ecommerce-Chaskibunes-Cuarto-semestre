const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchasedProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PurchasedProduct = mongoose.model(
  "PurchasedProduct",
  purchasedProductSchema
);

module.exports = PurchasedProduct;
