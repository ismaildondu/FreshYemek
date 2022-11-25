import mongoose from "mongoose";

const PRODUCT_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
  },
});

const PRODUCT = mongoose.model("Product", PRODUCT_SCHEMA);

export default PRODUCT;
