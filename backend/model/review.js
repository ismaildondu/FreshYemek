import mongoose from "mongoose";

const REVIEW_SCHEMA = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const REVIEW = mongoose.model("Review", REVIEW_SCHEMA);

export default REVIEW;
