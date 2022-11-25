import mongoose from "mongoose";
import slugify from "slugify";

const MERCH_SCHEMA = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  category: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  minOrder: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: Number,
    required: true,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
});
MERCH_SCHEMA.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const MERCH = mongoose.model("Merchant", MERCH_SCHEMA);

export default MERCH;
