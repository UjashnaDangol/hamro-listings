import express from "express";

import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getFeaturedListings,
  getTrendingListings
} from "../controllers/listingController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router()

router.get("/trending", getTrendingListings);

router.get("/featured", getFeaturedListings);

router.get("/",getListings);
router.get("/:id",getListingById);

router.post("/",protect,authorizeRoles("owner"),upload.array("images",6),createListing)

router.put(
  "/:id",
  protect,
  authorizeRoles("owner"),
  upload.array("images", 6),
  updateListing
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("owner"),
  deleteListing
);



export default router;