import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: { type: String, unique: true },

    propertyCode: { type: String, unique: true },

    description: { type: String },

    purpose: { type: String, enum: ["sale", "rent"], required: true },

    category: {
      type: String,
      enum: ["house", "land", "apartment", "project"],
      required: true,
    },


    trendingScore: {
  type: Number,
  default: 0,
},


    subCategory: { type: String },

    price: { type: Number, required: true },

    priceType: { type: String }, // total / per month etc.

    negotiable: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "sold", "rented"],
      default: "pending",
    },

    featured: { type: Boolean, default: false },

    views: { type: Number, default: 0 },

    // Ownership
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Location
    location: {
      province: String,
      district: String,
      municipality: String,
      city: String,
      ward: String,
      area: String,
      address: String,
      latitude: Number,
      longitude: Number,
    },

    // Dynamic property sections
    houseDetails: {
      bedrooms: Number,
      bathrooms: Number,
      kitchens: Number,
      floors: Number,
      totalRooms: Number,
      parkingCars: Number,
      landArea: Number,
      landUnit: String,
    },

    landDetails: {
      area: Number,
      roadAccess: String,
      zoning: String,
      cornerPlot: Boolean,
      utilitiesAvailable: [String],
    },

    apartmentDetails: {
      floorNumber: Number,
      buildingFloors: Number,
      lift: Boolean,
      parking: Boolean,
      balcony: Boolean,
      security: Boolean,
    },

    projectDetails: {
      developer: String,
      totalUnits: Number,
      availableUnits: Number,
      completionDate: Date,
    },

    // Media
    media: {
      images: [String],
      thumbnail: String,
      videoTour: String,
      floorPlan: String,
    },

    amenities: [String],

    nearbyPlaces: [String],

    favoritesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);



export default mongoose.model("Listing", listingSchema);