import Favorite from "../models/favoriteModel.js";
import Listing from "../models/listingModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const addFavorite = asyncHandler(async (req, res) => {
  const listingId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(listingId)) {
    return res.status(400).json({ message: "Invalid listing ID" });
  }

  const listing = await Listing.findById(listingId);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  const exists = await Favorite.findOne({
    user: req.user._id,
    listing: listingId,
  });

  if (exists) {
    return res.status(400).json({
      message: "Already added to favorites",
    });
  }

  await Favorite.create({
    user: req.user._id,
    listing: listingId,
  });

 
  await Listing.findByIdAndUpdate(listingId, {
    $inc: { favoritesCount: 1 },
  });

  res.status(201).json({
    success: true,
    message: "Added to favorites",
  });
});


export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id })
    .populate({
      path: "listing",
      select: "title price media location favoritesCount views",
      populate: {
        path: "owner",
        select: "name email",
      },
    })
    .sort("-createdAt");

  res.json({
    success: true,
    count: favorites.length,
    data: favorites,
  });
});

export const removeFavorite = asyncHandler(async (req, res) => {
  const listingId = req.params.id;

  const favorite = await Favorite.findOne({
    user: req.user._id,
    listing: listingId,
  });

  if (!favorite) {
    return res.status(404).json({
      message: "Favorite not found",
    });
  }

  await favorite.deleteOne();

 
  await Listing.findByIdAndUpdate(listingId, {
    $inc: { favoritesCount: -1 },
  });


  await Listing.updateOne(
    { _id: listingId, favoritesCount: { $lt: 0 } },
    { $set: { favoritesCount: 0 } }
  );

  res.json({
    success: true,
    message: "Removed from favorites",
  });
});


