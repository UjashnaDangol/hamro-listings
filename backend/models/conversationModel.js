import mongoose from "mongoose";

const conversationSchema =
  new mongoose.Schema(
    {
      listing: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
      },

      buyer: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      receiver: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      lastMessage: {
        type: String,
        default: "",
      },

      lastSender: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      unreadCount: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );

conversationSchema.index(
  {
    listing: 1,
    buyer: 1,
    receiver: 1,
  },
  { unique: true }
);

export default mongoose.model(
  "Conversation",
  conversationSchema
);