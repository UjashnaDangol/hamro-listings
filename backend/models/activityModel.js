import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },

    action: {
      type: String,
      enum: ["view", "favorite", "contact", "share"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);