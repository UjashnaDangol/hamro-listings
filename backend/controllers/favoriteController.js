import Favorite from "../models/favoriteModel.js";
import Listing from "../models/listingModel.js";

// ADD FAVORITE
export const addFavorite = async (
  req,
  res
) => {
  try {
    const listing =
      await Listing.findById(
        req.params.id
      );

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const exists =
      await Favorite.findOne({
        user: req.user._id,
        listing: req.params.id,
      });

    if (exists) {
      return res.status(400).json({
        message:
          "Already added to favorites",
      });
    }

    await Favorite.create({
      user: req.user._id,
      listing: req.params.id,
    });

    listing.favoritesCount += 1;

    await listing.save();

    return res.status(201).json({
      success: true,
      message:
        "Added to favorites",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET FAVORITES
export const getFavorites =
  async (req, res) => {
    try {
      const favorites =
        await Favorite.find({
          user: req.user._id,
        }).populate({
          path: "listing",
          populate: {
            path: "owner",
            select: "name email",
          },
        });

      return res.json({
        success: true,
        data: favorites,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

// REMOVE FAVORITE
export const removeFavorite =
  async (req, res) => {
    try {
      const favorite =
        await Favorite.findOne({
          user: req.user._id,
          listing: req.params.id,
        });

      if (!favorite) {
        return res.status(404).json({
          message:
            "Favorite not found",
        });
      }

      await favorite.deleteOne();

      const listing =
        await Listing.findById(
          req.params.id
        );

      if (
        listing &&
        listing.favoritesCount > 0
      ) {
        listing.favoritesCount -= 1;

        await listing.save();
      }

      return res.json({
        success: true,
        message:
          "Removed from favorites",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };