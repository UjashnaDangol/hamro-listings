import express from "express";

import {
  createListing,
  getListing,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router()

router.get("/",getListing);
router.get("/:id",getListingById);

router.post("/",protect,authorizeRoles("landlord"),upload.array("images",6),createListing)

router.put(
  "/:id",
  protect,
  authorizeRoles("landlord"),
  upload.array("images", 6),
  updateListing
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("landlord"),
  deleteListing
);

export default router;