import REVIEW from "../model/review.js";

const ADD_REVIEW = async (req, res) => {
  const { score, comment, merchant, user } = req.body;
  const review = new REVIEW({ score, comment, merchant, user });
  try {
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const REVIEW_CONTROLLER = {
  ADD_REVIEW,
};

export default REVIEW_CONTROLLER;
