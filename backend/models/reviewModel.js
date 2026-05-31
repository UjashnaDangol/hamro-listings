import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },

    rating: { type: Number, min: 1, max: 5, required: true },

    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);