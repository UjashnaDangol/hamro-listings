import Listing from "../models/listingModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import QueryFeatures from "../utils/queryFeatures.js";
import { calculateTrendingScore } from "../utils/updateTrending.js";

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
export const getListings = asyncHandler(async(req,res) => {

  const features = new QueryFeatures(Listing.find(),req.query)
  .search()
  .filter()
  .sort()
  .paginate()

  let listings = await features.query;
  
  listings = listings.map((item)=>{
    const obj = item.toObject()
    obj.trendingScore = calculateTrendingScore(obj)
    return obj
  })
  res.json({
    success : true ,
    count : listings.length ,
    data : listings,
  })

})

//trending
export const getTrendingListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find();

  const sorted = listings
    .map((item) => {
      const obj = item.toObject();
      obj.trendingScore = calculateTrendingScore(obj);
      return obj;
    })
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 10);

  res.json({
    success: true,
    data: sorted,
  });
});


//SINGLE LISTING

export const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id)
  .populate("owner","name email")
  .populate("contactPerson","name email");
  
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


// featured

export const getFeaturedListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ featured: true }).limit(10);

  res.json({
    success: true,
    data: listings,
  });
});

