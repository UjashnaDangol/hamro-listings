import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },

    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    lastMessage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);