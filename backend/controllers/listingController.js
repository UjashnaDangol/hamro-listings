import Listing from "../models/listingModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import QueryFeatures from "../utils/queryFeatures.js";

//CREATE LISTING

export const createListing = asyncHandler(async (req, res) => {
  const imageUrls = req.files?.map((file) => file.path); 


  const listing = await Listing.create({
    ...req.body,
    owner: req.user._id,
    media: {
      images: imageUrls || [],
    },
  });

  res.status(201).json(listing);
});


//GET ALL LISTINGS (FILTER + PAGINATION)
export const getListings = asyncHandler(async (req, res) => {
  const features = new QueryFeatures(Listing.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const listings = await features.query;

  res.json(listings);
});


//SINGLE LISTING

export const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  listing.views += 1;
  await listing.save();

  res.json(listing);
});


// UPDATE LISTING

export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  if (
    listing.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }


  if (req.files?.length > 0) {
    const newImages = req.files.map((file) => file.path);
    listing.media.images.push(...newImages);
  }

  Object.assign(listing, req.body);

  await listing.save();

  res.json(listing);
});



// DELETE LISTING

export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Not found" });
  }

  if (
    listing.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await listing.deleteOne();

  res.json({ message: "Listing deleted successfully" });
});