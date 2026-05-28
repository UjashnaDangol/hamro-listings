import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      enum: ["Kathmandu", "Pokhara", "Lalitpur"],
      required: true,
    },

    address: String,

    price: {
      type: Number,
      required: true,
    },

    bedrooms: Number,
    bathrooms: Number,

    status: {
      type: String,
      enum: ["available", "rented", "sold"],
      default: "available",
    },

    images: [String],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    views: {
      type: Number,
      default: 0,
    },

    favoritesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Listing", listingSchema);