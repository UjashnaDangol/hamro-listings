import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },

    message: { type: String, required: true },

    type: {
      type: String,
      enum: ["visit", "inquiry", "listing", "review", "system", "message"],
    },

    isRead: { type: Boolean, default: false },

    relatedListing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },

    relatedVisit: { type: mongoose.Schema.Types.ObjectId, ref: "Visit" },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);