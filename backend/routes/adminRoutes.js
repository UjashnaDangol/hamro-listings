import express from "express";

import {
  updateListingStatus,
  verifyAgent,
  blockUser,
  getReports,
  resolveReport,
  getUsers,
  getAllListings,
} from "../controllers/adminController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("admin"));

router.patch("/listing/:id", updateListingStatus);
router.patch("/agent/:id", verifyAgent);
router.patch("/block/:id", blockUser);
router.get("/reports", getReports);

router.patch("/reports/:id", resolveReport);

router.get("/users", getUsers);
router.get(
  "/listings",
  getAllListings
);

export default router;