import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema(
    {
      conversation: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
      },

      listing: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },

      sender: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      receiver: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      text: {
        type: String,
        trim: true,
      },

      delivered: {
        type: Boolean,
        default: false,
      },

      read: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

export default mongoose.model(
  "Message",
  messageSchema
);