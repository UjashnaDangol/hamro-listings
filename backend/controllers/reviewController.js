import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.create({
    reviewer: req.user._id,
    targetUser: req.params.id,
    rating,
    comment,
  });

  const reviews = await Review.find({
    targetUser: req.params.id,
  });

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) /
    reviews.length;

  await User.findByIdAndUpdate(req.params.id, {
    "agentProfile.rating": avgRating,
  });

  res.status(201).json({
    success: true,
    data: review,
  });
});
