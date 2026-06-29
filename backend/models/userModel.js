import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: String,

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "buyer",
        "owner",
        "agent",
        "admin",
      ],
      default: "buyer",
    },

    avatar: String,

    lastSeen: {
  type: Date,
  default: null,
},


    status: {
      type: String,
      enum: [
        "active",
        "blocked",
      ],
      default: "active",
    },

    // buyer only
    favorites: [
      {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Listing",
      },
    ],

    // agent only
    agentProfile: {
      verificationStatus: {
        type: String,
        enum: [
          "pending",
          "verified",
          "rejected",
        ],
        default: "pending",
      },

      agentLevel: {
        type: String,
        enum: [
          "verified",
          "silver",
          "gold",
          "top-agent",
        ],
        default: "verified",
      },

      commission: {
        type: Number,
        default: 0,
      },

      totalSalesCount: {
        type: Number,
        default: 0,
      },

      totalSalesValue: {
        type: Number,
        default: 0,
      },

      rating: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "User",
  userSchema
);