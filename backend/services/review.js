import REVIEW from "../model/review.js";

const getCalculateReview = async (merchantID) => {
  const reviews = await REVIEW.find({ merchant: merchantID });
  let averageScore = reviews.reduce((acc, review) => {
    return acc + review.score;
  }, 0);
  averageScore = averageScore / reviews.length;
  const totalReviews = reviews.length;
  return { averageScore, totalReviews };
};

export default getCalculateReview;
